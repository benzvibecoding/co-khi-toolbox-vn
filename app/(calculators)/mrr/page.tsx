import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { FavoriteToggle } from '@/components/ui/favorite-toggle';
import { MrrTimeCalc } from '@/components/calculators/mrr-time-calc';

export const metadata: Metadata = {
  title: 'Tốc độ bóc tách (MRR)',
  description: 'Lưu lượng phoi bóc tách mỗi phút. Cân bằng giữa năng suất và độ cứng vững của máy.',
};

export default function Page() {
  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: 'Trang chủ', href: '/' }, { label: 'Tiện / Phay / Khoan' }, { label: 'Tốc độ bóc tách (MRR)' }]} />
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-[2rem] font-bold leading-tight text-primary">Tốc độ bóc tách (MRR)</h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-secondary">Lưu lượng phoi bóc tách mỗi phút. Cân bằng giữa năng suất và độ cứng vững của máy.</p>
        </div>
        <FavoriteToggle toolId="mrr" toolName="Tốc độ bóc tách (MRR)" />
      </div>
      <MrrTimeCalc mode="mrr" />
      <section aria-label="Công cụ liên quan">
        <h2 className="text-[1.125rem] font-semibold text-primary">Công cụ liên quan</h2>
        <div className="mt-3 flex flex-wrap gap-2">
              <Link href="/thoi-gian-gia-cong" className="rounded-input border px-3 py-2 text-xs font-medium text-secondary transition-colors hover:text-primary" style={{ borderColor: 'var(--border-subtle)' }}>Thời gian gia công</Link>
              <Link href="/luong-chay-dao" className="rounded-input border px-3 py-2 text-xs font-medium text-secondary transition-colors hover:text-primary" style={{ borderColor: 'var(--border-subtle)' }}>Lượng chạy dao</Link>
              <Link href="/cong-suat-cat" className="rounded-input border px-3 py-2 text-xs font-medium text-secondary transition-colors hover:text-primary" style={{ borderColor: 'var(--border-subtle)' }}>Công suất cắt</Link>
        </div>
      </section>
    </div>
  );
}
