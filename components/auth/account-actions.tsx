'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CalcInput } from '@/components/ui/calc-input';
import { createClient } from '@/lib/supabase/client';

/** Nut dang xuat (dung trong trang tai khoan). */
export function SignOutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const signOut = async () => {
    const supabase = createClient();
    if (!supabase) return;
    setLoading(true);
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  };

  return (
    <button type="button" onClick={signOut} disabled={loading} className="btn-ghost !py-2 text-xs">
      {loading ? 'Đang đăng xuất…' : 'Đăng xuất khỏi tất cả phiên trên trình duyệt này'}
    </button>
  );
}

/** Doi mat khau khi da dang nhap (yeu cau mat khau moi >= 8 ky tu). */
export function ChangePasswordForm() {
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg(null);
    if (password.length < 8) {
      setMsg({ ok: false, text: 'Mật khẩu mới phải từ 8 ký tự trở lên.' });
      return;
    }
    const supabase = createClient();
    if (!supabase) {
      setMsg({ ok: false, text: 'Chưa cấu hình Supabase.' });
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (error) {
      setMsg({ ok: false, text: `Đổi thất bại: ${error.message}` });
      return;
    }
    setPassword('');
    setMsg({ ok: true, text: 'Đổi mật khẩu thành công.' });
  };

  return (
    <form onSubmit={submit} className="max-w-sm space-y-3" aria-label="Đổi mật khẩu">
      <CalcInput id="acc-new-pass" label="Mật khẩu mới (≥ 8 ký tự)" type="password" autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} error={null} />
      {msg ? (
        <p role="alert" className="text-xs font-medium" style={{ color: msg.ok ? 'var(--result)' : 'var(--error)' }}>
          {msg.text}
        </p>
      ) : null}
      <button type="submit" disabled={loading} className="btn-ghost !py-2 text-xs">
        {loading ? 'Đang đổi…' : 'Đổi mật khẩu'}
      </button>
    </form>
  );
}
