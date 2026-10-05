import { NextResponse, type NextRequest } from 'next/server';
import { extractTransferCode } from '@/lib/pro/plans';

/** Chong spam webhook: toi da 30 req/phut/IP/instance (best-effort; Vercel Firewall lo DDoS lon). */
const RATE_LIMIT = 30;
const WINDOW_MS = 60_000;
const hits = new Map<string, { count: number; reset: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now > entry.reset) {
    if (hits.size > 1000) hits.clear(); // Chong tran bo nho
    hits.set(ip, { count: 1, reset: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > RATE_LIMIT;
}

function clientIp(request: NextRequest): string {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    request.headers.get('x-real-ip') ??
    'unknown'
  );
}

/**
 * Webhook SePay — ngan hang bao TIEN VAO.
 * Cau hinh tren sepay.vn (khuyen dung header, vi token trong URL co the lo vao log):
 *   URL: https://domain-cua-ban/api/sepay-webhook
 *   Header: Authorization: Bearer <SEPAY_WEBHOOK_SECRET>
 * (Van ho tro ?token= de tuong thich nguoc.)
 */
export async function POST(request: NextRequest) {
  if (isRateLimited(clientIp(request))) {
    return NextResponse.json({ ok: false, error: 'Too many requests.' }, { status: 429 });
  }

  // 1. Xac thuc: uu tien header Authorization (khong lo vao log nhu query param)
  const expected = process.env.SEPAY_WEBHOOK_SECRET;
  const authHeader = request.headers.get('authorization');
  const bearer = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;
  const queryToken = request.nextUrl.searchParams.get('token');
  const provided = bearer ?? queryToken;
  if (!expected || !provided || provided !== expected) {
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
  } catch {
    // Loi cau hinh server — tra ve chung chung, khong lo chi tiet ha tang
    return NextResponse.json({ ok: false, error: 'Internal error.' }, { status: 500 });
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
    .update({ status: 'approved', decided_at: now, note: 'Auto-approved qua SePay.' })
    .eq('id', match.id)
    .eq('status', 'pending'); // Chong race: chi duyet khi van pending
  if (orderErr) return NextResponse.json({ ok: false, error: 'Internal error.' }, { status: 500 });

  const { error: proErr } = await service
    .from('profiles')
    .update({ is_pro: true, pro_since: now, pro_until: proUntil })
    .eq('id', match.user_id);
  if (proErr) return NextResponse.json({ ok: false, error: 'Internal error.' }, { status: 500 });

  return NextResponse.json({ ok: true, orderId: match.id, proUntil });
}
