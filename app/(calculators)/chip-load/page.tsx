import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { FavoriteToggle } from '@/components/ui/favorite-toggle';
import { FeedCalc } from '@/components/calculators/feed-calc';

export const metadata: Metadata = {
  title: 'Chip Load',
  description: 'Lượng ăn dao trên mỗi răng fz. Quá nhỏ gây chai dao, quá lớn gây gãy.',
};

export default function Page() {
  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: 'Trang chủ', href: '/' }, { label: 'Tiện / Phay / Khoan' }, { label: 'Chip Load' }]} />
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-[2rem] font-bold leading-tight text-primary">Chip Load</h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-secondary">Lượng ăn dao trên mỗi răng fz. Quá nhỏ gây chai dao, quá lớn gây gãy.</p>
        </div>
        <FavoriteToggle toolId="chip-load" toolName="Chip Load" />
      </div>
      <FeedCalc mode="fz" />
      <section aria-label="Công cụ liên quan">
        <h2 className="text-[1.125rem] font-semibold text-primary">Công cụ liên quan</h2>
        <div className="mt-3 flex flex-wrap gap-2">
              <Link href="/luong-chay-dao" className="rounded-input border px-3 py-2 text-xs font-medium text-secondary transition-colors hover:text-primary" style={{ borderColor: 'var(--border-subtle)' }}>Lượng chạy dao</Link>
              <Link href="/rpm" className="rounded-input border px-3 py-2 text-xs font-medium text-secondary transition-colors hover:text-primary" style={{ borderColor: 'var(--border-subtle)' }}>RPM trục chính</Link>
              <Link href="/mrr" className="rounded-input border px-3 py-2 text-xs font-medium text-secondary transition-colors hover:text-primary" style={{ borderColor: 'var(--border-subtle)' }}>MRR</Link>
        </div>
      </section>
    </div>
  );
}
