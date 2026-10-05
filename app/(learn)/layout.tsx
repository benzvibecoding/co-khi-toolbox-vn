import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bài học cơ khí',
  description: 'Nội dung bài học nhanh — ra mắt ở Phase 5.',
};

export default function LearnLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-w-0">{children}</div>;
}
