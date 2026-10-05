'use client';

import Link from 'next/link';
import { Lock } from 'lucide-react';
import { ProFeature, useProAccess } from '@/lib/hooks/useProAccess';
import type { ReactNode } from 'react';

/** Chan tinh nang Pro — hien thi teaser + link /pro khi chua co quyen. */
export function ProGate({ feature, children, label }: { feature: ProFeature | string; children: ReactNode; label: string }) {
  const { canAccess } = useProAccess();

  if (canAccess(feature)) return <>{children}</>;

  return (
    <div
      className="relative overflow-hidden rounded-card border p-5"
      style={{ borderColor: 'var(--border-subtle)', backgroundColor: 'var(--bg-surface)' }}
    >
      <div className="pointer-events-none opacity-40 blur-[1px]" aria-hidden>
        {children}
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4 text-center">
        <span
          className="inline-flex items-center gap-1.5 rounded-badge px-2.5 py-1 text-xs font-bold text-white"
          style={{ backgroundColor: 'var(--accent)' }}
        >
          <Lock size={12} aria-hidden /> PRO
        </span>
        <p className="text-sm font-medium text-primary">{label} là tính năng Pro</p>
        <Link href="/pro" className="text-xs font-semibold underline" style={{ color: 'var(--accent)' }}>
          Tìm hiểu gói Pro →
        </Link>
      </div>
    </div>
  );
}

export { ProFeature };
