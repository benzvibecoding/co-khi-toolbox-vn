import type { Metadata } from 'next';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { FavoriteToggle } from '@/components/ui/favorite-toggle';
import { BatchCalc } from '@/components/pro/batch-calc';

export const metadata: Metadata = {
  title: 'Tính hàng loạt (Pro)',
  description: 'Tính tốc độ cắt Vc cho hàng trăm chi tiết cùng lúc từ bảng D, n — tính năng Pro.',
};

export default function Page() {
  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: 'Trang chủ', href: '/' }, { label: 'Pro' }, { label: 'Tính hàng loạt' }]} />
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-[2rem] font-bold leading-tight text-primary">Tính hàng loạt</h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-secondary">
            Dán bảng đường kính + vòng quay, nhận ngay Vc từng chi tiết và file CSV — chỉ dành cho gói Pro.
          </p>
        </div>
        <FavoriteToggle toolId="tinh-hang-loat" toolName="Tính hàng loạt" />
      </div>
      <BatchCalc />
    </div>
  );
}
