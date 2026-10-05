'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { CalcInput } from '@/components/ui/calc-input';
import { createClient, isSupabaseConfigured } from '@/lib/supabase/client';

function ConfigWarning() {
  if (isSupabaseConfigured()) return null;
  return (
    <p role="alert" className="rounded-input border p-3 text-xs leading-relaxed" style={{ borderColor: 'var(--error)', color: 'var(--error)', backgroundColor: 'rgba(239,68,68,0.08)' }}>
      Chưa cấu hình Supabase. Tạo project tại supabase.com, chạy file <code>supabase/migrations/001_profiles.sql</code> trong SQL Editor,
      rồi thêm <code>NEXT_PUBLIC_SUPABASE_URL</code> + <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> vào Vercel Environment Variables.
    </p>
  );
}

/** Form dang nhap: email + mat khau, chuyen ve ?next= sau khi xong. */
export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get('next') ?? '/';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const supabase = createClient();
    if (!supabase) {
      setError('Chưa cấu hình Supabase — xem hướng dẫn phía trên.');
      return;
    }
    if (!email.trim() || !password) {
      setError('Vui lòng nhập đầy đủ email và mật khẩu.');
      return;
    }
    setLoading(true);
    const { error: err } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    setLoading(false);
    if (err) {
      setError(err.message === 'Invalid login credentials' ? 'Email hoặc mật khẩu chưa đúng.' : `Đăng nhập thất bại: ${err.message}`);
      return;
    }
    router.push(next);
    router.refresh();
  };

  return (
    <form onSubmit={submit} className="card rounded-card space-y-4 p-6" aria-label="Đăng nhập">
      <ConfigWarning />
      <CalcInput id="login-email" label="Email" type="email" autoComplete="email" placeholder="ban@example.com" value={email} onChange={(e) => setEmail(e.target.value)} error={null} />
      <CalcInput id="login-pass" label="Mật khẩu" type="password" autoComplete="current-password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} error={null} />
      {error ? <p role="alert" className="text-xs font-medium text-error">{error}</p> : null}
      <button type="submit" disabled={loading} className="btn-primary w-full">
        {loading ? 'Đang đăng nhập…' : 'Đăng nhập'}
      </button>
      <div className="flex items-center justify-between text-xs">
        <Link href="/quen-mat-khau" className="text-secondary hover:text-primary">Quên mật khẩu?</Link>
        <Link href={`/dang-ky${next !== '/' ? `?next=${encodeURIComponent(next)}` : ''}`} className="font-semibold" style={{ color: 'var(--accent)' }}>
          Chưa có tài khoản? Đăng ký
        </Link>
      </div>
    </form>
  );
}

/** Form dang ky: ten + email + mat khau (>= 8 ky tu), gui mail xac thuc. */
export function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get('next') ?? '/';
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const supabase = createClient();
    if (!supabase) {
      setError('Chưa cấu hình Supabase — xem hướng dẫn phía trên.');
      return;
    }
    if (!name.trim() || !email.trim() || !password) {
      setError('Vui lòng nhập đầy đủ họ tên, email và mật khẩu.');
      return;
    }
    if (password.length < 8) {
      setError('Mật khẩu phải từ 8 ký tự trở lên.');
      return;
    }
    setLoading(true);
    const { error: err } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        data: { full_name: name.trim() },
        emailRedirectTo: `${window.location.origin}/xac-thuc/callback?next=${encodeURIComponent(next)}`,
      },
    });
    setLoading(false);
    if (err) {
      setError(`Đăng ký thất bại: ${err.message}`);
      return;
    }
    setDone(true);
    void router;
  };

  if (done) {
    return (
      <div className="card rounded-card space-y-3 p-6 text-center" aria-live="polite">
        <p className="text-base font-bold text-primary">Kiểm tra hộp thư của bạn</p>
        <p className="text-sm leading-relaxed text-secondary">
          Đã gửi email xác thực tới <strong className="text-primary">{email}</strong>.
          Bấm link trong email để kích hoạt tài khoản rồi đăng nhập.
        </p>
        <Link href={`/dang-nhap${next !== '/' ? `?next=${encodeURIComponent(next)}` : ''}`} className="btn-primary inline-flex w-full">
          Tới trang đăng nhập
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="card rounded-card space-y-4 p-6" aria-label="Đăng ký">
      <ConfigWarning />
      <CalcInput id="reg-name" label="Họ tên" autoComplete="name" placeholder="VD: Nguyễn Văn A" value={name} onChange={(e) => setName(e.target.value)} error={null} />
      <CalcInput id="reg-email" label="Email" type="email" autoComplete="email" placeholder="ban@example.com" value={email} onChange={(e) => setEmail(e.target.value)} error={null} />
      <CalcInput id="reg-pass" label="Mật khẩu (≥ 8 ký tự)" type="password" autoComplete="new-password" placeholder="••••••••" hint="Mật khẩu được mã hóa một chiều (bcrypt), không ai đọc được." value={password} onChange={(e) => setPassword(e.target.value)} error={null} />
      {error ? <p role="alert" className="text-xs font-medium text-error">{error}</p> : null}
      <button type="submit" disabled={loading} className="btn-primary w-full">
        {loading ? 'Đang tạo tài khoản…' : 'Đăng ký'}
      </button>
      <p className="text-center text-xs text-secondary">
        Đã có tài khoản?{' '}
        <Link href={`/dang-nhap${next !== '/' ? `?next=${encodeURIComponent(next)}` : ''}`} className="font-semibold" style={{ color: 'var(--accent)' }}>
          Đăng nhập
        </Link>
      </p>
    </form>
  );
}

/** Form quen mat khau: gui link dat lai qua email. */
export function ForgotForm() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const supabase = createClient();
    if (!supabase) {
      setError('Chưa cấu hình Supabase — xem hướng dẫn ở trang đăng nhập.');
      return;
    }
    if (!email.trim()) {
      setError('Vui lòng nhập email.');
      return;
    }
    setLoading(true);
    const { error: err } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: `${window.location.origin}/xac-thuc/callback?next=/tai-khoan`,
    });
    setLoading(false);
    if (err) {
      setError(`Gửi thất bại: ${err.message}`);
      return;
    }
    setDone(true);
  };

  if (done) {
    return (
      <p className="card rounded-card p-6 text-center text-sm leading-relaxed text-secondary" aria-live="polite">
        Nếu email <strong className="text-primary">{email}</strong> đã đăng ký, bạn sẽ nhận được link đặt lại mật khẩu trong vài phút.
      </p>
    );
  }

  return (
    <form onSubmit={submit} className="card rounded-card space-y-4 p-6" aria-label="Quên mật khẩu">
      <CalcInput id="forgot-email" label="Email đăng ký" type="email" autoComplete="email" placeholder="ban@example.com" value={email} onChange={(e) => setEmail(e.target.value)} error={null} />
      {error ? <p role="alert" className="text-xs font-medium text-error">{error}</p> : null}
      <button type="submit" disabled={loading} className="btn-primary w-full">
        {loading ? 'Đang gửi…' : 'Gửi link đặt lại'}
      </button>
    </form>
  );
}
