import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { FavoriteToggle } from '@/components/ui/favorite-toggle';
import { MassCalc } from '@/components/calculators/mass-calc';

export const metadata: Metadata = {
  title: 'Khối lượng chi tiết',
  description: 'Tính từ thể tích và khối lượng riêng. Dùng báo giá vật liệu và chọn thiết bị nâng.',
};

export default function Page() {
  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: 'Trang chủ', href: '/' }, { label: 'Khối lượng' }, { label: 'Khối lượng chi tiết' }]} />
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-[2rem] font-bold leading-tight text-primary">Khối lượng chi tiết</h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-secondary">Tính từ thể tích và khối lượng riêng. Dùng báo giá vật liệu và chọn thiết bị nâng.</p>
        </div>
        <FavoriteToggle toolId="khoi-luong" toolName="Khối lượng chi tiết" />
      </div>
      <MassCalc />
      <section aria-label="Công cụ liên quan">
        <h2 className="text-[1.125rem] font-semibold text-primary">Công cụ liên quan</h2>
        <div className="mt-3 flex flex-wrap gap-2">
              <Link href="/chuyen-doi-don-vi" className="rounded-input border px-3 py-2 text-xs font-medium text-secondary transition-colors hover:text-primary" style={{ borderColor: 'var(--border-subtle)' }}>Đổi đơn vị</Link>
              <Link href="/luc-ap-suat-ung-suat" className="rounded-input border px-3 py-2 text-xs font-medium text-secondary transition-colors hover:text-primary" style={{ borderColor: 'var(--border-subtle)' }}>Ứng suất</Link>
              <Link href="/vat-lieu" className="rounded-input border px-3 py-2 text-xs font-medium text-secondary transition-colors hover:text-primary" style={{ borderColor: 'var(--border-subtle)' }}>Tra cứu vật liệu</Link>
        </div>
      </section>
    </div>
  );
}
