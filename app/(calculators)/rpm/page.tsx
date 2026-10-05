import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { FavoriteToggle } from '@/components/ui/favorite-toggle';
import { CuttingCalc } from '@/components/calculators/cutting-calc';

export const metadata: Metadata = {
  title: 'Vòng quay trục chính (RPM)',
  description: 'Tính n từ tốc độ cắt Vc và đường kính D. Đổi dao khác đường kính phải tính lại RPM.',
};

export default function Page() {
  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: 'Trang chủ', href: '/' }, { label: 'Tiện / Phay / Khoan' }, { label: 'Vòng quay trục chính (RPM)' }]} />
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-[2rem] font-bold leading-tight text-primary">Vòng quay trục chính (RPM)</h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-secondary">Tính n từ tốc độ cắt Vc và đường kính D. Đổi dao khác đường kính phải tính lại RPM.</p>
        </div>
        <FavoriteToggle toolId="rpm" toolName="Vòng quay trục chính (RPM)" />
      </div>
      <CuttingCalc mode="rpm" />
      <section aria-label="Công cụ liên quan">
        <h2 className="text-[1.125rem] font-semibold text-primary">Công cụ liên quan</h2>
        <div className="mt-3 flex flex-wrap gap-2">
              <Link href="/toc-do-cat" className="rounded-input border px-3 py-2 text-xs font-medium text-secondary transition-colors hover:text-primary" style={{ borderColor: 'var(--border-subtle)' }}>Tốc độ cắt</Link>
              <Link href="/luong-chay-dao" className="rounded-input border px-3 py-2 text-xs font-medium text-secondary transition-colors hover:text-primary" style={{ borderColor: 'var(--border-subtle)' }}>Lượng chạy dao</Link>
              <Link href="/mo-men-xoan" className="rounded-input border px-3 py-2 text-xs font-medium text-secondary transition-colors hover:text-primary" style={{ borderColor: 'var(--border-subtle)' }}>Mô-men xoắn</Link>
        </div>
      </section>
    </div>
  );
}
