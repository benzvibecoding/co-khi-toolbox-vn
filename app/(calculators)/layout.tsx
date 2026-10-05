import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Công cụ tính toán',
  description: 'Các công cụ tính toán cơ khí: tốc độ cắt, RPM, dung sai, bánh răng.',
};

export default function CalculatorsLayout({ children }: { children: React.ReactNode }) {
  // Sidebar + breadcrumb da co trong AppShell; layout giu cho Phase 2 mo rong
  // (vi du: them related-tools, sticky TOC).
  return <div className="min-w-0">{children}</div>;
}
