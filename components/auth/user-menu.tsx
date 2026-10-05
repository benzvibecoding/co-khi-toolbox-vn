'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LogOut, User } from 'lucide-react';
import { createClient, isSupabaseConfigured } from '@/lib/supabase/client';

/** Menu nguoi dung tren Header: nut Dang nhap hoac email + dropdown. */
export function UserMenu() {
  const router = useRouter();
  const [email, setEmail] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!isSupabaseConfigured()) {
      setReady(true);
      return;
    }
    const supabase = createClient();
    if (!supabase) {
      setReady(true);
      return;
    }
    supabase.auth.getUser().then(({ data }) => {
      setEmail(data.user?.email ?? null);
      setReady(true);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setEmail(session?.user?.email ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  if (!ready) return <span className="w-20" aria-hidden />;

  if (!email) {
    return (
      <Link
        href="/dang-nhap"
        className="shrink-0 rounded-input px-3.5 py-2 text-sm font-semibold text-white transition-colors"
        style={{ backgroundColor: 'var(--accent)' }}
      >
        Đăng nhập
      </Link>
    );
  }

  const signOut = async () => {
    const supabase = createClient();
    if (supabase) await supabase.auth.signOut();
    setOpen(false);
    router.push('/');
    router.refresh();
  };

  return (
    <div className="relative shrink-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={`Tài khoản ${email}`}
        className="inline-flex h-9 w-9 items-center justify-center rounded-input border text-secondary transition-colors hover:text-primary"
        style={{ borderColor: 'var(--border-default)', backgroundColor: 'var(--bg-elevated)' }}
      >
        <User size={17} aria-hidden />
      </button>
      {open ? (
        <>
          <button type="button" aria-label="Đóng menu" onClick={() => setOpen(false)} className="fixed inset-0 z-40 cursor-default" />
          <div className="absolute right-0 z-50 mt-2 w-60 rounded-card border p-2 shadow-xl" style={{ borderColor: 'var(--border-default)', backgroundColor: 'var(--bg-elevated)' }}>
            <p className="truncate px-3 py-2 font-mono text-xs text-muted">{email}</p>
            <Link href="/tai-khoan" onClick={() => setOpen(false)} className="block rounded-input px-3 py-2 text-sm text-secondary hover:text-primary">
              Tài khoản & gói Pro
            </Link>
            <button type="button" onClick={signOut} className="flex w-full items-center gap-2 rounded-input px-3 py-2 text-left text-sm text-secondary hover:text-primary">
              <LogOut size={14} aria-hidden /> Đăng xuất
            </button>
          </div>
        </>
      ) : null}
    </div>
  );
}
