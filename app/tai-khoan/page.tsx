import Link from 'next/link';
import { redirect } from 'next/navigation';
import { LogOut } from 'lucide-react';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { SectionCard } from '@/components/ui/section-card';
import { createClient } from '@/lib/supabase/server';
import { SignOutButton, ChangePasswordForm } from '@/components/auth/account-actions';

export const metadata = {
  title: 'Tài khoản',
  description: 'Quản lý tài khoản, trạng thái Pro và bảo mật.',
};

/** Trang tai khoan — middleware da chan guest, day la lop bao ve thu 2 (server-side). */
export default async function AccountPage() {
  const supabase = createClient();
  if (!supabase) {
    return (
      <div className="mx-auto max-w-md space-y-6">
        <Breadcrumb items={[{ label: 'Trang chủ', href: '/' }, { label: 'Tài khoản' }]} />
        <p className="card rounded-card p-6 text-sm text-secondary">
          Chưa cấu hình Supabase. Xem hướng dẫn ở trang <Link href="/dang-nhap" className="underline" style={{ color: 'var(--accent)' }}>đăng nhập</Link>.
        </p>
      </div>
    );
  }

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/dang-nhap?next=/tai-khoan');

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, is_pro, pro_since, created_at')
    .eq('id', user.id)
    .single();

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <Breadcrumb items={[{ label: 'Trang chủ', href: '/' }, { label: 'Tài khoản' }]} />
      <div>
        <h1 className="text-[2rem] font-bold text-primary">Tài khoản</h1>
        <p className="mt-1 font-mono text-xs text-muted">{user.email}</p>
      </div>
      <SectionCard id="acc-pro" title="Gói sử dụng" description={profile?.is_pro ? 'Bạn đang dùng gói Pro — cảm ơn đã ủng hộ.' : 'Bạn đang dùng bản miễn phí.'}>
        {profile?.is_pro ? (
          <p className="inline-block rounded-badge px-2.5 py-1 text-xs font-bold text-white" style={{ backgroundColor: 'var(--accent)' }}>
            PRO{profile.pro_since ? ` từ ${new Date(profile.pro_since).toLocaleDateString('vi-VN')}` : ''}
          </p>
        ) : (
          <Link href="/pro" className="btn-primary inline-flex text-sm">
            Nâng cấp Pro
          </Link>
        )}
      </SectionCard>
      <SectionCard id="acc-security" title="Bảo mật" description="Đổi mật khẩu định kỳ giúp bảo vệ tài khoản.">
        <ChangePasswordForm />
      </SectionCard>
      <div className="flex items-center gap-2 text-sm text-muted">
        <LogOut size={14} aria-hidden />
        <SignOutButton />
      </div>
    </div>
  );
}
