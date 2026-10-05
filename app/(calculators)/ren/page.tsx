import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { FavoriteToggle } from '@/components/ui/favorite-toggle';
import { ThreadCalc } from '@/components/calculators/thread-calc';

export const metadata: Metadata = {
  title: 'Tra cứu ren',
  description: 'Bước ren, đường kính chân/trung bình, mũi khoan ta-rô hệ mét M3-M30 và UNC/UNF.',
};

export default function Page() {
  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: 'Trang chủ', href: '/' }, { label: 'Ren' }, { label: 'Tra cứu ren' }]} />
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-[2rem] font-bold leading-tight text-primary">Tra cứu ren</h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-secondary">Bước ren, đường kính chân/trung bình, mũi khoan ta-rô hệ mét M3-M30 và UNC/UNF.</p>
        </div>
        <FavoriteToggle toolId="ren" toolName="Tra cứu ren" />
      </div>
      <ThreadCalc />
      <section aria-label="Công cụ liên quan">
        <h2 className="text-[1.125rem] font-semibold text-primary">Công cụ liên quan</h2>
        <div className="mt-3 flex flex-wrap gap-2">
              <Link href="/mo-men-xoan" className="rounded-input border px-3 py-2 text-xs font-medium text-secondary transition-colors hover:text-primary" style={{ borderColor: 'var(--border-subtle)' }}>Mô-men xoắn</Link>
              <Link href="/chuyen-doi-don-vi" className="rounded-input border px-3 py-2 text-xs font-medium text-secondary transition-colors hover:text-primary" style={{ borderColor: 'var(--border-subtle)' }}>Đổi đơn vị</Link>
              <Link href="/dung-sai" className="rounded-input border px-3 py-2 text-xs font-medium text-secondary transition-colors hover:text-primary" style={{ borderColor: 'var(--border-subtle)' }}>Dung sai</Link>
        </div>
      </section>
    </div>
  );
}
