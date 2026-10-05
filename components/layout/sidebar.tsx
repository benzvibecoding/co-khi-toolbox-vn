'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { ChevronDown, Star } from 'lucide-react';
import { CALCULATOR_GROUPS, CALCULATORS, getCalculatorsByGroup } from '@/lib/data/site';
import { useFavorites } from '@/lib/hooks/useFavorites';
import { CloseMenuButton } from '@/components/layout/header';

/** Sidebar 240px: nhom expand/collapse + active state + yeu thich. */
export function Sidebar({ mobileOpen, onClose }: { mobileOpen: boolean; onClose: () => void }) {
  const pathname = usePathname();
  const { favorites } = useFavorites();
  const [expanded, setExpanded] = useState<string[]>(['cat-got']);

  const toggleGroup = (id: string) =>
    setExpanded((prev) => (prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]));

  const favTools = CALCULATORS.filter((c) => favorites.includes(c.id));

  const body = (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b p-4 lg:hidden" style={{ borderColor: 'var(--border-subtle)' }}>
        <p className="text-sm font-bold text-primary">Danh mục công cụ</p>
        <CloseMenuButton onClose={onClose} />
      </div>
      <nav className="flex-1 overflow-y-auto p-3" aria-label="Danh mục máy tính">
        {favTools.length > 0 ? (
          <div className="mb-4">
            <p className="flex items-center gap-1.5 px-2 pb-2 text-[0.7rem] font-semibold uppercase tracking-wider text-muted">
              <Star size={12} aria-hidden /> Yêu thích
            </p>
            <ul className="space-y-0.5">
              {favTools.map((t) => (
                <SidebarLink key={t.id} href={t.href} label={t.name} active={pathname === t.href} onNavigate={onClose} />
              ))}
            </ul>
          </div>
        ) : null}
        {CALCULATOR_GROUPS.map((g) => {
          const tools = getCalculatorsByGroup(g.id);
          const isOpen = expanded.includes(g.id);
          const hasActive = tools.some((t) => pathname === t.href);
          return (
            <div key={g.id} className="mb-1">
              <button
                type="button"
                onClick={() => toggleGroup(g.id)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between rounded-input px-2 py-2 text-left text-[0.8rem] font-semibold text-secondary transition-colors hover:text-primary"
              >
                {g.name}
                <ChevronDown
                  size={14}
                  aria-hidden
                  className={`shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                />
              </button>
              {isOpen ? (
                <ul className="mb-2 space-y-0.5">
                  {tools.map((t) => (
                    <SidebarLink
                      key={t.id}
                      href={t.href}
                      label={t.name}
                      active={pathname === t.href || (hasActive && pathname === t.href)}
                      onNavigate={onClose}
                    />
                  ))}
                </ul>
              ) : null}
            </div>
          );
        })}
        <div className="mt-4 border-t pt-4" style={{ borderColor: 'var(--border-subtle)' }}>
          <p className="px-2 pb-2 text-[0.7rem] font-semibold uppercase tracking-wider text-muted">Tra cứu</p>
          <ul className="space-y-0.5">
            <SidebarLink href="/vat-lieu" label="Vật liệu" active={pathname === '/vat-lieu'} onNavigate={onClose} />
            <SidebarLink href="/ky-hieu-ban-ve" label="Ký hiệu bản vẽ" active={pathname === '/ky-hieu-ban-ve'} onNavigate={onClose} />
            <SidebarLink href="/cong-thuc" label="Thư viện công thức" active={pathname === '/cong-thuc'} onNavigate={onClose} />
            <SidebarLink href="/hoc-nhanh" label="Học nhanh" active={pathname === '/hoc-nhanh'} onNavigate={onClose} />
          </ul>
        </div>
      </nav>
      <p className="border-t p-3 font-mono text-[0.65rem] text-muted" style={{ borderColor: 'var(--border-subtle)' }}>
        ISO 286-1 · JIS · TCVN
      </p>
    </div>
  );

  return (
    <>
      {/* Desktop: fixed trai 240px */}
      <aside
        className="sticky top-16 hidden h-[calc(100vh-4rem)] w-60 shrink-0 border-r lg:block"
        style={{ borderColor: 'var(--border-subtle)', backgroundColor: 'var(--bg-surface)' }}
        aria-label="Sidebar desktop"
      >
        {body}
      </aside>
      {/* Mobile: drawer */}
      {mobileOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Menu công cụ">
          <button type="button" aria-label="Đóng menu" onClick={onClose} className="absolute inset-0 bg-black/60" />
          <aside
            className="absolute left-0 top-0 h-full w-72 max-w-[85vw] border-r bg-surface"
            style={{ borderColor: 'var(--border-subtle)' }}
          >
            {body}
          </aside>
        </div>
      ) : null}
    </>
  );
}

function SidebarLink({
  href,
  label,
  active,
  onNavigate,
}: {
  href: string;
  label: string;
  active: boolean;
  onNavigate: () => void;
}) {
  return (
    <li>
      <Link
        href={href}
        onClick={onNavigate}
        aria-current={active ? 'page' : undefined}
        className="relative block rounded-input px-3 py-1.5 text-[0.83rem] transition-colors"
        style={
          active
            ? { color: 'var(--text-primary)', backgroundColor: 'var(--accent-subtle)' }
            : { color: 'var(--text-secondary)' }
        }
      >
        {active ? (
          <span
            aria-hidden
            className="absolute left-0 top-1/2 h-4 w-[3px] -translate-y-1/2 rounded-full"
            style={{ backgroundColor: 'var(--accent)' }}
          />
        ) : null}
        {label}
      </Link>
    </li>
  );
}
