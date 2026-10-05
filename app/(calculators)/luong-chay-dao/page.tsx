import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { FavoriteToggle } from '@/components/ui/favorite-toggle';
import { FeedCalc } from '@/components/calculators/feed-calc';

export const metadata: Metadata = {
  title: 'Lượng chạy dao',
  description: 'Tính Vf từ chip load fz, số lưỡi cắt z và RPM. Thứ tự chọn đúng: Vc → n → fz → Vf.',
};

export default function Page() {
  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: 'Trang chủ', href: '/' }, { label: 'Tiện / Phay / Khoan' }, { label: 'Lượng chạy dao' }]} />
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-[2rem] font-bold leading-tight text-primary">Lượng chạy dao</h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-secondary">Tính Vf từ chip load fz, số lưỡi cắt z và RPM. Thứ tự chọn đúng: Vc → n → fz → Vf.</p>
        </div>
        <FavoriteToggle toolId="luong-chay-dao" toolName="Lượng chạy dao" />
      </div>
      <FeedCalc mode="vf" />
      <section aria-label="Công cụ liên quan">
        <h2 className="text-[1.125rem] font-semibold text-primary">Công cụ liên quan</h2>
        <div className="mt-3 flex flex-wrap gap-2">
              <Link href="/chip-load" className="rounded-input border px-3 py-2 text-xs font-medium text-secondary transition-colors hover:text-primary" style={{ borderColor: 'var(--border-subtle)' }}>Chip Load</Link>
              <Link href="/toc-do-cat" className="rounded-input border px-3 py-2 text-xs font-medium text-secondary transition-colors hover:text-primary" style={{ borderColor: 'var(--border-subtle)' }}>Tốc độ cắt</Link>
              <Link href="/mrr" className="rounded-input border px-3 py-2 text-xs font-medium text-secondary transition-colors hover:text-primary" style={{ borderColor: 'var(--border-subtle)' }}>MRR</Link>
        </div>
      </section>
    </div>
  );
}
