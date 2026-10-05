import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { FavoriteToggle } from '@/components/ui/favorite-toggle';
import { MrrTimeCalc } from '@/components/calculators/mrr-time-calc';

export const metadata: Metadata = {
  title: 'Thời gian gia công',
  description: 'Ước lượng thời gian cắt gọt Tm từ chiều dài hành trình và lượng chạy dao.',
};

export default function Page() {
  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: 'Trang chủ', href: '/' }, { label: 'Tiện / Phay / Khoan' }, { label: 'Thời gian gia công' }]} />
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-[2rem] font-bold leading-tight text-primary">Thời gian gia công</h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-secondary">Ước lượng thời gian cắt gọt Tm từ chiều dài hành trình và lượng chạy dao.</p>
        </div>
        <FavoriteToggle toolId="thoi-gian-gia-cong" toolName="Thời gian gia công" />
      </div>
      <MrrTimeCalc mode="time" />
      <section aria-label="Công cụ liên quan">
        <h2 className="text-[1.125rem] font-semibold text-primary">Công cụ liên quan</h2>
        <div className="mt-3 flex flex-wrap gap-2">
              <Link href="/mrr" className="rounded-input border px-3 py-2 text-xs font-medium text-secondary transition-colors hover:text-primary" style={{ borderColor: 'var(--border-subtle)' }}>MRR</Link>
              <Link href="/luong-chay-dao" className="rounded-input border px-3 py-2 text-xs font-medium text-secondary transition-colors hover:text-primary" style={{ borderColor: 'var(--border-subtle)' }}>Lượng chạy dao</Link>
              <Link href="/cong-suat-cat" className="rounded-input border px-3 py-2 text-xs font-medium text-secondary transition-colors hover:text-primary" style={{ borderColor: 'var(--border-subtle)' }}>Công suất cắt</Link>
        </div>
      </section>
    </div>
  );
}
