import type { Metadata } from 'next';
import { Suspense } from 'react';
import { CheckoutClient } from '@/components/pro/checkout-client';

export const metadata: Metadata = {
  title: 'Thanh toán Pro',
  description: 'Mua gói Pro Cơ Khí Toolbox VN qua chuyển khoản ngân hàng.',
};

export default function CheckoutPage() {
  return (
    <Suspense fallback={<p className="text-center text-sm text-muted">Đang tải…</p>}>
      <CheckoutClient />
    </Suspense>
  );
}
