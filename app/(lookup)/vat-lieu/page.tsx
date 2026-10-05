import type { Metadata } from 'next';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { VatLieuExplorer } from '@/components/lookup/vat-lieu-explorer';

export const metadata: Metadata = {
  title: 'Tra cứu vật liệu cơ khí',
  description: 'Tra cứu 30 mác thép S45C, SUS304, SKD11: cơ tính, độ cứng, ứng dụng, gợi ý gia công, mác tương đương.',
};

export default function VatLieuPage({ searchParams }: { searchParams: { q?: string } }) {
  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: 'Trang chủ', href: '/' }, { label: 'Vật liệu' }]} />
      <div>
        <h1 className="text-[2rem] font-bold text-primary">Tra cứu vật liệu</h1>
        <p className="mt-2 max-w-2xl text-sm text-secondary">
          30 mác thép phổ biến tại Việt Nam — bấm vào từng thẻ để xem cơ tính đầy đủ, bảng tương đương ISO/ASTM/DIN/GB và gợi ý gia công.
        </p>
      </div>
      <VatLieuExplorer initialQ={searchParams.q ?? ''} />
    </div>
  );
}
