import { NextResponse, type NextRequest } from 'next/server';
import { extractTransferCode } from '@/lib/pro/plans';

/**
 * Webhook SePay — ngan hang bao TIEN VAO.
 * Cau hinh tren sepay.vn: URL = https://domain-cua-ban/api/sepay-webhook?token=<SEPAY_WEBHOOK_SECRET>
 *
 * Payload SePay (docs.sepay.vn):
 * { gateway, transactionDate, accountNumber, transferType: 'in'|'out',
 *   transferAmount: number, content: string, referenceCode, description }
 *
 * Luong xu ly: loc tien vao -> tach ma "CKH XXXXXXXX" -> tim don pending
 * khop ma + khop so tien -> duyet don + bat Pro (pro_until theo goi).
 * Idempotent: don khong con pending thi bo qua (SePay co the gui lai).
 */
export async function POST(request: NextRequest) {
  // 1. Xac thuc webhook bang token bi mat (khong phai ai cung goi duoc)
  const expected = process.env.SEPAY_WEBHOOK_SECRET;
  const token = request.nextUrl.searchParams.get('token');
  if (!expected || !token || token !== expected) {
    return NextResponse.json({ ok: false, error: 'Unauthorized.' }, { status: 401 });
  }

  // 2. Parse + validate payload
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON.' }, { status: 400 });
  }
  const payload = body as Record<string, unknown>;
  if (payload.transferType !== 'in') return NextResponse.json({ ok: true, skipped: 'not-incoming' });
  const amount = Number(payload.transferAmount);
  const content = String(payload.content ?? '');
  if (!Number.isFinite(amount) || amount <= 0 || !content) {
    return NextResponse.json({ ok: false, error: 'Missing transferAmount/content.' }, { status: 400 });
  }
  const code = extractTransferCode(content);
  if (!code) return NextResponse.json({ ok: true, skipped: 'no-code' });

  // 3. Tim don pending khop ma CK
  let service;
  try {
    const { createServiceClient } = await import('@/lib/supabase/service');
    service = createServiceClient();
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : 'Service misconfigured.' },
      { status: 500 },
    );
  }

  const { data: orders } = await service
    .from('orders')
    .select('id, user_id, plan, amount, status, transfer_content')
    .eq('status', 'pending')
    .limit(100);

  const { getTransferContent } = await import('@/lib/pro/plans');
  const match = (orders as { id: string; user_id: string; plan: string; amount: number; status: string }[] | null)
    ?.find((o) => getTransferContent(o.id).replace('CKH ', '') === code);

  if (!match) return NextResponse.json({ ok: true, skipped: 'no-matching-order' });

  // 4. Kiem tra so tien khop goi (sai tien -> de admin xu ly tay, khong tu duyet)
  if (match.amount !== amount) {
    await service.from('orders').update({ note: `Webhook: nhan ${amount}, don yeu cau ${match.amount}. Cho admin xu ly.` }).eq('id', match.id);
    return NextResponse.json({ ok: true, skipped: 'amount-mismatch' });
  }

  // 5. Duyet don + bat Pro co han theo goi
  const days = match.plan === 'yearly' ? 365 : 30;
  const proUntil = new Date(Date.now() + days * 24 * 3600 * 1000).toISOString();
  const now = new Date().toISOString();

  const { error: orderErr } = await service
    .from('orders')
    .update({ status: 'approved', decided_at: now, note: `Auto-approved qua SePay (${String(payload.referenceCode ?? '')}).` })
    .eq('id', match.id)
    .eq('status', 'pending'); // Chong race: chi duyet khi van pending
  if (orderErr) return NextResponse.json({ ok: false, error: orderErr.message }, { status: 500 });

  const { error: proErr } = await service
    .from('profiles')
    .update({ is_pro: true, pro_since: now, pro_until: proUntil })
    .eq('id', match.user_id);
  if (proErr) return NextResponse.json({ ok: false, error: proErr.message }, { status: 500 });

  return NextResponse.json({ ok: true, orderId: match.id, proUntil });
}
