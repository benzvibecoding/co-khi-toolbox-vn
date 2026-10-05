import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { FavoriteToggle } from '@/components/ui/favorite-toggle';
import { PowerTorqueCalc } from '@/components/calculators/power-torque-calc';

export const metadata: Metadata = {
  title: 'Mô-men xoắn',
  description: 'Tính mô-men từ công suất P và RPM. Cùng công suất, RPM thấp mô-men lớn.',
};

export default function Page() {
  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: 'Trang chủ', href: '/' }, { label: 'Tiện / Phay / Khoan' }, { label: 'Mô-men xoắn' }]} />
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-[2rem] font-bold leading-tight text-primary">Mô-men xoắn</h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-secondary">Tính mô-men từ công suất P và RPM. Cùng công suất, RPM thấp mô-men lớn.</p>
        </div>
        <FavoriteToggle toolId="mo-men-xoan" toolName="Mô-men xoắn" />
      </div>
      <PowerTorqueCalc mode="torque" />
      <section aria-label="Công cụ liên quan">
        <h2 className="text-[1.125rem] font-semibold text-primary">Công cụ liên quan</h2>
        <div className="mt-3 flex flex-wrap gap-2">
              <Link href="/cong-suat-cat" className="rounded-input border px-3 py-2 text-xs font-medium text-secondary transition-colors hover:text-primary" style={{ borderColor: 'var(--border-subtle)' }}>Công suất cắt</Link>
              <Link href="/rpm" className="rounded-input border px-3 py-2 text-xs font-medium text-secondary transition-colors hover:text-primary" style={{ borderColor: 'var(--border-subtle)' }}>RPM trục chính</Link>
              <Link href="/ren" className="rounded-input border px-3 py-2 text-xs font-medium text-secondary transition-colors hover:text-primary" style={{ borderColor: 'var(--border-subtle)' }}>Tra cứu ren</Link>
        </div>
      </section>
    </div>
  );
}
