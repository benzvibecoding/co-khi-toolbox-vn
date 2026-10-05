import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { FavoriteToggle } from '@/components/ui/favorite-toggle';
import { StressCalc } from '@/components/calculators/stress-calc';

export const metadata: Metadata = {
  title: 'Lực / Áp suất / Ứng suất',
  description: 'Ứng suất σ = F/A và biến dạng ε. So với độ bền vật liệu để kiểm tra an toàn.',
};

export default function Page() {
  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: 'Trang chủ', href: '/' }, { label: 'Lực / Áp suất' }, { label: 'Lực / Áp suất / Ứng suất' }]} />
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-[2rem] font-bold leading-tight text-primary">Lực / Áp suất / Ứng suất</h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-secondary">Ứng suất σ = F/A và biến dạng ε. So với độ bền vật liệu để kiểm tra an toàn.</p>
        </div>
        <FavoriteToggle toolId="luc-ap-suat-ung-suat" toolName="Lực / Áp suất / Ứng suất" />
      </div>
      <StressCalc />
      <section aria-label="Công cụ liên quan">
        <h2 className="text-[1.125rem] font-semibold text-primary">Công cụ liên quan</h2>
        <div className="mt-3 flex flex-wrap gap-2">
              <Link href="/khoi-luong" className="rounded-input border px-3 py-2 text-xs font-medium text-secondary transition-colors hover:text-primary" style={{ borderColor: 'var(--border-subtle)' }}>Khối lượng</Link>
              <Link href="/chuyen-doi-don-vi" className="rounded-input border px-3 py-2 text-xs font-medium text-secondary transition-colors hover:text-primary" style={{ borderColor: 'var(--border-subtle)' }}>Đổi đơn vị</Link>
              <Link href="/cong-suat-cat" className="rounded-input border px-3 py-2 text-xs font-medium text-secondary transition-colors hover:text-primary" style={{ borderColor: 'var(--border-subtle)' }}>Công suất cắt</Link>
        </div>
      </section>
    </div>
  );
}
