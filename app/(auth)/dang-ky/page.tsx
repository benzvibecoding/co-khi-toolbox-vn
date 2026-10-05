import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { RegisterForm } from '@/components/auth/auth-forms';

export const metadata: Metadata = {
  title: 'Đăng ký',
  description: 'Tạo tài khoản Cơ Khí Toolbox VN miễn phí — mật khẩu mã hóa, thông tin bảo mật.',
};

export default function RegisterPage() {
  return (
    <div className="mx-auto max-w-md space-y-6">
      <Breadcrumb items={[{ label: 'Trang chủ', href: '/' }, { label: 'Đăng ký' }]} />
      <div className="text-center">
        <h1 className="text-[2rem] font-bold text-primary">Đăng ký miễn phí</h1>
        <p className="mt-1 text-sm text-secondary">Mất 30 giây — chỉ cần họ tên, email và mật khẩu.</p>
      </div>
      <Suspense fallback={<p className="text-center text-sm text-muted">Đang tải…</p>}>
        <RegisterForm />
      </Suspense>
    </div>
  );
}
