'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { SectionCard } from '@/components/ui/section-card';
import { createClient } from '@/lib/supabase/client';
import { PRO_PLANS, formatVND, getBankInfo, getVietQRUrl, getTransferContent } from '@/lib/pro/plans';

/**
 * Trang thanh toan: chon goi -> tao don pending -> hien QR/noi dung CK.
 * Admin duyet trong Supabase Dashboard (xem 002_orders.sql).
 */
export function CheckoutClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const planId = searchParams.get('plan') === 'yearly' ? 'yearly' : 'monthly';
  const plan = useMemo(() => PRO_PLANS.find((p) => p.id === planId) ?? PRO_PLANS[0], [planId]);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const bank = getBankInfo();

  const createOrder = async () => {
    setError(null);
    const supabase = createClient();
    if (!supabase || !plan) {
      setError('Chưa cấu hình Supabase.');
      return;
    }
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.push(`/dang-nhap?next=/thanh-toan?plan=${plan.id}`);
      return;
    }
    const { data, error: err } = await supabase
      .from('orders')
      .insert({ user_id: user.id, plan: plan.id, amount: plan.amount, method: 'bank_transfer', status: 'pending' })
      .select('id')
      .single();
    if (err || !data) {
      setError(`Tạo đơn thất bại: ${err?.message ?? 'lỗi không xác định'}. Đảm bảo đã chạy migration 002_orders.sql.`);
      setLoading(false);
      return;
    }
    const newId = (data as { id: string }).id;
    // Luu ma CK len don de webhook doi chieu (policy 003 cho phep sua don pending)
    const { getTransferContent } = await import('@/lib/pro/plans');
    await supabase.from('orders').update({ transfer_content: getTransferContent(newId) }).eq('id', newId);
    setLoading(false);
    setOrderId(newId);
  };

  if (!plan) return null;
  const content = orderId ? getTransferContent(orderId) : '';
  const qr = orderId ? getVietQRUrl(plan.amount, content) : null;

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <Breadcrumb items={[{ label: 'Trang chủ', href: '/' }, { label: 'Pro', href: '/pro' }, { label: 'Thanh toán' }]} />
      <div>
        <h1 className="text-[2rem] font-bold text-primary">Thanh toán Pro</h1>
        <p className="mt-1 text-sm text-secondary">
          Gói <strong className="text-primary">{plan.name}</strong> —{' '}
          <strong className="font-mono text-primary">{formatVND(plan.amount)}</strong> / {plan.durationDays} ngày.
        </p>
      </div>

      {!orderId ? (
        <SectionCard id="checkout-create" title="Bước 1 — Tạo đơn hàng" description="Đơn ở trạng thái chờ duyệt cho tới khi admin xác nhận tiền về.">
          {error ? <p role="alert" className="mb-3 text-xs font-medium text-error">{error}</p> : null}
          <button type="button" onClick={createOrder} disabled={loading} className="btn-primary w-full">
            {loading ? 'Đang tạo đơn…' : `Tạo đơn ${formatVND(plan.amount)}`}
          </button>
        </SectionCard>
      ) : (
        <div className="space-y-4" aria-live="polite">
          <SectionCard id="checkout-pay" title="Bước 2 — Chuyển khoản" description="Quét mã hoặc chuyển khoản thủ công đúng nội dung bên dưới.">
            {bank && qr ? (
              <div className="flex flex-col items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={qr} alt={`Mã VietQR ${formatVND(plan.amount)}`} width={280} height={280} className="rounded-card border" style={{ borderColor: 'var(--border-subtle)' }} />
                <p className="font-mono text-sm text-secondary">{bank.bank} · {bank.account} · {bank.name}</p>
              </div>
            ) : (
              <div className="space-y-2 rounded-input border p-4 font-mono text-sm" style={{ borderColor: 'var(--border-subtle)', backgroundColor: 'var(--bg-elevated)' }}>
                <p className="text-xs text-muted">Chủ shop chưa cấu hình tài khoản nhận tiền (env NEXT_PUBLIC_BANK_*).</p>
                <p className="text-primary">Số tiền: {formatVND(plan.amount)}</p>
                <p className="text-primary">Nội dung: {content}</p>
                <p className="text-xs text-muted">Liên hệ shop để lấy STK rồi chuyển khoản đúng nội dung trên.</p>
              </div>
            )}
            <dl className="mt-4 space-y-1.5 rounded-input border p-4 font-mono text-sm" style={{ borderColor: 'var(--border-subtle)', backgroundColor: 'var(--bg-elevated)' }}>
              <div className="flex justify-between"><dt className="text-muted">Số tiền</dt><dd className="font-bold text-primary">{formatVND(plan.amount)}</dd></div>
              <div className="flex justify-between"><dt className="text-muted">Nội dung</dt><dd className="font-bold" style={{ color: 'var(--accent)' }}>{content}</dd></div>
            </dl>
          </SectionCard>
          <SectionCard id="checkout-done" title="Bước 3 — Chờ kích hoạt" description="Admin duyệt trong Supabase Dashboard, Pro bật ngay sau đó (thường trong vài giờ).">
            <Link href="/tai-khoan" className="btn-ghost inline-flex text-xs">
              Xem trạng thái đơn trong Tài khoản →
            </Link>
          </SectionCard>
        </div>
      )}
    </div>
  );
}
