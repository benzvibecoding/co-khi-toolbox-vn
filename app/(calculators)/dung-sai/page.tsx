import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { FavoriteToggle } from '@/components/ui/favorite-toggle';
import { ToleranceCalc } from '@/components/calculators/tolerance-calc';

export const metadata: Metadata = {
  title: 'Dung sai lắp ghép',
  description: 'Kích thước giới hạn và kiểu lắp theo ISO 286-1. 7 kiểu lắp phổ biến H7/g6…H7/s6.',
};

export default function Page() {
  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: 'Trang chủ', href: '/' }, { label: 'Dung sai' }, { label: 'Dung sai lắp ghép' }]} />
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-[2rem] font-bold leading-tight text-primary">Dung sai lắp ghép</h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-secondary">Kích thước giới hạn và kiểu lắp theo ISO 286-1. 7 kiểu lắp phổ biến H7/g6…H7/s6.</p>
        </div>
        <FavoriteToggle toolId="dung-sai" toolName="Dung sai lắp ghép" />
      </div>
      <ToleranceCalc />
      <section aria-label="Công cụ liên quan">
        <h2 className="text-[1.125rem] font-semibold text-primary">Công cụ liên quan</h2>
        <div className="mt-3 flex flex-wrap gap-2">
              <Link href="/ren" className="rounded-input border px-3 py-2 text-xs font-medium text-secondary transition-colors hover:text-primary" style={{ borderColor: 'var(--border-subtle)' }}>Tra cứu ren</Link>
              <Link href="/banh-rang" className="rounded-input border px-3 py-2 text-xs font-medium text-secondary transition-colors hover:text-primary" style={{ borderColor: 'var(--border-subtle)' }}>Bánh răng</Link>
              <Link href="/khoi-luong" className="rounded-input border px-3 py-2 text-xs font-medium text-secondary transition-colors hover:text-primary" style={{ borderColor: 'var(--border-subtle)' }}>Khối lượng</Link>
        </div>
      </section>
    </div>
  );
}
