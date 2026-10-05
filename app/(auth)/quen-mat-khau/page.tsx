import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { ForgotForm } from '@/components/auth/auth-forms';

export const metadata: Metadata = {
  title: 'Quên mật khẩu',
  description: 'Đặt lại mật khẩu tài khoản Cơ Khí Toolbox VN qua email.',
};

export default function ForgotPage() {
  return (
    <div className="mx-auto max-w-md space-y-6">
      <Breadcrumb items={[{ label: 'Trang chủ', href: '/' }, { label: 'Quên mật khẩu' }]} />
      <div className="text-center">
        <h1 className="text-[2rem] font-bold text-primary">Quên mật khẩu</h1>
        <p className="mt-1 text-sm text-secondary">Nhập email đăng ký, chúng tôi gửi link đặt lại cho bạn.</p>
      </div>
      <Suspense fallback={<p className="text-center text-sm text-muted">Đang tải…</p>}>
        <ForgotForm />
      </Suspense>
    </div>
  );
}
