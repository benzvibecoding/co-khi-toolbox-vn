import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { FavoriteToggle } from '@/components/ui/favorite-toggle';
import { UnitConverter } from '@/components/calculators/unit-converter';

export const metadata: Metadata = {
  title: 'Chuyển đổi đơn vị',
  description: 'Đổi mm/inch, m/min, MPa, N, kW, N·m. Đổi hết về một hệ trước khi tính.',
};

export default function Page() {
  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: 'Trang chủ', href: '/' }, { label: 'Đổi đơn vị' }, { label: 'Chuyển đổi đơn vị' }]} />
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-[2rem] font-bold leading-tight text-primary">Chuyển đổi đơn vị</h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-secondary">Đổi mm/inch, m/min, MPa, N, kW, N·m. Đổi hết về một hệ trước khi tính.</p>
        </div>
        <FavoriteToggle toolId="chuyen-doi-don-vi" toolName="Chuyển đổi đơn vị" />
      </div>
      <UnitConverter />
      <section aria-label="Công cụ liên quan">
        <h2 className="text-[1.125rem] font-semibold text-primary">Công cụ liên quan</h2>
        <div className="mt-3 flex flex-wrap gap-2">
              <Link href="/toc-do-cat" className="rounded-input border px-3 py-2 text-xs font-medium text-secondary transition-colors hover:text-primary" style={{ borderColor: 'var(--border-subtle)' }}>Tốc độ cắt</Link>
              <Link href="/luc-ap-suat-ung-suat" className="rounded-input border px-3 py-2 text-xs font-medium text-secondary transition-colors hover:text-primary" style={{ borderColor: 'var(--border-subtle)' }}>Ứng suất</Link>
              <Link href="/khoi-luong" className="rounded-input border px-3 py-2 text-xs font-medium text-secondary transition-colors hover:text-primary" style={{ borderColor: 'var(--border-subtle)' }}>Khối lượng</Link>
        </div>
      </section>
    </div>
  );
}
