import Link from 'next/link';
import { redirect } from 'next/navigation';
import { LogOut } from 'lucide-react';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { SectionCard } from '@/components/ui/section-card';
import { createClient } from '@/lib/supabase/server';
import { SignOutButton, ChangePasswordForm } from '@/components/auth/account-actions';
import { OrderHistory } from '@/components/pro/order-history';

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
    .select('full_name, is_pro, pro_since, pro_until, created_at')
    .eq('id', user.id)
    .single();

  const proActive =
    (profile as { is_pro?: boolean; pro_until?: string | null } | null)?.is_pro === true &&
    (!(profile as { pro_until?: string | null } | null)?.pro_until ||
      new Date((profile as { pro_until?: string } | null)?.pro_until ?? '').getTime() > Date.now());

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <Breadcrumb items={[{ label: 'Trang chủ', href: '/' }, { label: 'Tài khoản' }]} />
      <div>
        <h1 className="text-[2rem] font-bold text-primary">Tài khoản</h1>
        <p className="mt-1 font-mono text-xs text-muted">{user.email}</p>
      </div>
      <SectionCard id="acc-pro" title="Gói sử dụng" description={proActive ? 'Bạn đang dùng gói Pro — cảm ơn đã ủng hộ.' : 'Bạn đang dùng bản miễn phí.'}>
        {proActive ? (
          <p className="inline-block rounded-badge px-2.5 py-1 text-xs font-bold text-white" style={{ backgroundColor: 'var(--accent)' }}>
            PRO{(profile as { pro_until?: string | null } | null)?.pro_until
              ? ` đến ${new Date((profile as { pro_until: string }).pro_until).toLocaleDateString('vi-VN')}`
              : (profile as { pro_since?: string | null } | null)?.pro_since
                ? ` từ ${new Date((profile as { pro_since: string }).pro_since).toLocaleDateString('vi-VN')}`
                : ''}
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
      <SectionCard id="acc-orders" title="Đơn mua Pro" description="Trạng thái duyệt đơn của bạn.">
        <OrderHistory />
      </SectionCard>
      <div className="flex items-center gap-2 text-sm text-muted">
        <LogOut size={14} aria-hidden />
        <SignOutButton />
      </div>
    </div>
  );
}
