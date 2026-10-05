import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { LoginForm } from '@/components/auth/auth-forms';

export const metadata: Metadata = {
  title: 'Đăng nhập',
  description: 'Đăng nhập Cơ Khí Toolbox VN để sử dụng đầy đủ công cụ tính toán.',
};

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-md space-y-6">
      <Breadcrumb items={[{ label: 'Trang chủ', href: '/' }, { label: 'Đăng nhập' }]} />
      <div className="text-center">
        <h1 className="text-[2rem] font-bold text-primary">Đăng nhập</h1>
        <p className="mt-1 text-sm text-secondary">Đăng nhập để sử dụng đầy đủ 14 công cụ tính toán.</p>
      </div>
      <Suspense fallback={<p className="text-center text-sm text-muted">Đang tải…</p>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
