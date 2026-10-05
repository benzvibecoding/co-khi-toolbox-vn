import type { Metadata } from 'next';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { FormulaLibrary } from '@/components/lookup/formula-library';

export const metadata: Metadata = {
  title: 'Thư viện công thức cơ khí',
  description: 'Tổng hợp công thức tiện, phay, khoan, dung sai, bánh răng kèm ví dụ tính từng bước.',
};

export default function CongThucPage() {
  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: 'Trang chủ', href: '/' }, { label: 'Thư viện công thức' }]} />
      <div>
        <h1 className="text-[2rem] font-bold text-primary">Thư viện công thức</h1>
        <p className="mt-2 max-w-2xl text-sm text-secondary">
          Mỗi công thức kèm bảng biến số và ví dụ số tính từng bước — lọc theo nhóm để học nhanh.
        </p>
      </div>
      <FormulaLibrary />
    </div>
  );
}
