'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Cog, Menu, X } from 'lucide-react';
import { SearchBar } from '@/components/ui/search-bar';
import { useUnitSystem } from '@/lib/hooks/useUnitSystem';

/** Header: logo + search + nav + toggle don vi + menu mobile. */
export function Header({ onMenuClick }: { onMenuClick: () => void }) {
  const { system, toggle } = useUnitSystem();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Shortcut Ctrl+K / Cmd+K focus vao o search
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        document.getElementById('site-search')?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <header
      className="sticky top-0 z-40 border-b"
      style={{
        borderColor: 'var(--border-subtle)',
        backgroundColor: 'rgba(13,15,20,0.92)',
        backdropFilter: 'blur(10px)',
        boxShadow: scrolled ? '0 4px 24px rgba(0,0,0,0.35)' : 'none',
      }}
    >
      <div className="container-content flex h-16 items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Mở menu công cụ"
          className="inline-flex h-9 w-9 items-center justify-center rounded-input text-secondary hover:text-primary lg:hidden"
        >
          <Menu size={20} aria-hidden />
        </button>
        <Link href="/" className="flex shrink-0 items-center gap-2.5" aria-label="Cơ Khí Toolbox VN — Trang chủ">
          <span
            className="inline-flex h-9 w-9 items-center justify-center rounded-input text-white"
            style={{ backgroundColor: 'var(--accent)' }}
            aria-hidden
          >
            <Cog size={20} />
          </span>
          <span className="leading-tight">
            <span className="block text-[0.95rem] font-bold text-primary">Cơ Khí Toolbox</span>
            <span className="block font-mono text-[0.65rem] uppercase tracking-widest text-muted">VN · kỹ thuật số</span>
          </span>
        </Link>
        <div className="ml-4 hidden min-w-0 flex-1 md:block">
          <SearchBar />
        </div>
        <nav className="ml-auto hidden items-center gap-1 text-sm lg:flex" aria-label="Điều hướng chính">
          <Link href="/vat-lieu" className="rounded-input px-3 py-2 text-secondary transition-colors hover:text-primary">
            Vật liệu
          </Link>
          <Link href="/ky-hieu-ban-ve" className="rounded-input px-3 py-2 text-secondary transition-colors hover:text-primary">
            Ký hiệu
          </Link>
          <Link href="/cong-thuc" className="rounded-input px-3 py-2 text-secondary transition-colors hover:text-primary">
            Công thức
          </Link>
          <Link href="/hoc-nhanh" className="rounded-input px-3 py-2 text-secondary transition-colors hover:text-primary">
            Học nhanh
          </Link>
          <Link
            href="/pro"
            className="ml-1 rounded-input px-3 py-1.5 text-xs font-bold text-white"
            style={{ backgroundColor: 'var(--accent)' }}
          >
            PRO
          </Link>
        </nav>
        <button
          type="button"
          onClick={toggle}
          aria-label={`Đang dùng hệ ${system === 'metric' ? 'mét' : 'inch'} — bấm để đổi`}
          title="Đổi hệ đơn vị toàn site"
          className="ml-2 shrink-0 rounded-input border px-2.5 py-1.5 font-mono text-xs font-semibold text-secondary transition-colors hover:text-primary"
          style={{ borderColor: 'var(--border-default)' }}
        >
          {system === 'metric' ? 'METRIC' : 'INCH'}
        </button>
      </div>
      <div className="container-content pb-3 md:hidden">
        <SearchBar />
      </div>
    </header>
  );
}

/** Nut dong drawer mobile (render trong Sidebar). */
export function CloseMenuButton({ onClose }: { onClose: () => void }) {
  return (
    <button
      type="button"
      onClick={onClose}
      aria-label="Đóng menu"
      className="inline-flex h-9 w-9 items-center justify-center rounded-input text-secondary hover:text-primary lg:hidden"
    >
      <X size={20} aria-hidden />
    </button>
  );
}
