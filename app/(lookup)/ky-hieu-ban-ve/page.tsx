import type { Metadata } from 'next';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { SymbolExplorer } from '@/components/lookup/symbol-explorer';

export const metadata: Metadata = {
  title: 'Ký hiệu bản vẽ cơ khí',
  description: 'Tra cứu ký hiệu kích thước, dung sai hình học, độ nhám, ren, hàn trên bản vẽ kỹ thuật kèm ví dụ.',
};

export default function KyHieuPage() {
  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: 'Trang chủ', href: '/' }, { label: 'Ký hiệu bản vẽ' }]} />
      <div>
        <h1 className="text-[2rem] font-bold text-primary">Ký hiệu bản vẽ</h1>
        <p className="mt-2 max-w-2xl text-sm text-secondary">
          Ký hiệu Ø, Ra, M, ⊥, ∥… kèm giải thích tiếng Việt và ví dụ đọc bản vẽ thực tế.
        </p>
      </div>
      <SymbolExplorer />
    </div>
  );
}
