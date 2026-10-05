import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { FavoriteToggle } from '@/components/ui/favorite-toggle';
import { PowerTorqueCalc } from '@/components/calculators/power-torque-calc';

export const metadata: Metadata = {
  title: 'Công suất cắt',
  description: 'Tính kW từ lực cắt Fc và tốc độ cắt Vc. Kiểm tra máy có đủ khỏe trước khi cắt.',
};

export default function Page() {
  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: 'Trang chủ', href: '/' }, { label: 'Tiện / Phay / Khoan' }, { label: 'Công suất cắt' }]} />
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-[2rem] font-bold leading-tight text-primary">Công suất cắt</h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-secondary">Tính kW từ lực cắt Fc và tốc độ cắt Vc. Kiểm tra máy có đủ khỏe trước khi cắt.</p>
        </div>
        <FavoriteToggle toolId="cong-suat-cat" toolName="Công suất cắt" />
      </div>
      <PowerTorqueCalc mode="power" />
      <section aria-label="Công cụ liên quan">
        <h2 className="text-[1.125rem] font-semibold text-primary">Công cụ liên quan</h2>
        <div className="mt-3 flex flex-wrap gap-2">
              <Link href="/mo-men-xoan" className="rounded-input border px-3 py-2 text-xs font-medium text-secondary transition-colors hover:text-primary" style={{ borderColor: 'var(--border-subtle)' }}>Mô-men xoắn</Link>
              <Link href="/mrr" className="rounded-input border px-3 py-2 text-xs font-medium text-secondary transition-colors hover:text-primary" style={{ borderColor: 'var(--border-subtle)' }}>MRR</Link>
              <Link href="/toc-do-cat" className="rounded-input border px-3 py-2 text-xs font-medium text-secondary transition-colors hover:text-primary" style={{ borderColor: 'var(--border-subtle)' }}>Tốc độ cắt</Link>
        </div>
      </section>
    </div>
  );
}
