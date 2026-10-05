import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { FavoriteToggle } from '@/components/ui/favorite-toggle';
import { GearCalc } from '@/components/calculators/gear-calc';

export const metadata: Metadata = {
  title: 'Bánh răng trụ',
  description: 'Module m, số răng z, đường kính vòng chia, đỉnh, chân và khoảng cách trục.',
};

export default function Page() {
  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: 'Trang chủ', href: '/' }, { label: 'Bánh răng' }, { label: 'Bánh răng trụ' }]} />
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-[2rem] font-bold leading-tight text-primary">Bánh răng trụ</h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-secondary">Module m, số răng z, đường kính vòng chia, đỉnh, chân và khoảng cách trục.</p>
        </div>
        <FavoriteToggle toolId="banh-rang" toolName="Bánh răng trụ" />
      </div>
      <GearCalc />
      <section aria-label="Công cụ liên quan">
        <h2 className="text-[1.125rem] font-semibold text-primary">Công cụ liên quan</h2>
        <div className="mt-3 flex flex-wrap gap-2">
              <Link href="/dung-sai" className="rounded-input border px-3 py-2 text-xs font-medium text-secondary transition-colors hover:text-primary" style={{ borderColor: 'var(--border-subtle)' }}>Dung sai</Link>
              <Link href="/khoi-luong" className="rounded-input border px-3 py-2 text-xs font-medium text-secondary transition-colors hover:text-primary" style={{ borderColor: 'var(--border-subtle)' }}>Khối lượng</Link>
              <Link href="/toc-do-cat" className="rounded-input border px-3 py-2 text-xs font-medium text-secondary transition-colors hover:text-primary" style={{ borderColor: 'var(--border-subtle)' }}>Tốc độ cắt</Link>
        </div>
      </section>
    </div>
  );
}
