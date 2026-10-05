import type { Metadata } from 'next';
import { Breadcrumb } from '@/components/ui/breadcrumb';

export const metadata: Metadata = {
  title: 'Tra cứu vật liệu, ký hiệu, công thức',
  description: 'Khung layout tra cứu — nội dung chi tiết ra mắt ở Phase 4.',
};

export default function LookupLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-w-0">{children}</div>;
}
