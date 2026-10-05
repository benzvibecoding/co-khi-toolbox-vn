import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { LEARN_POSTS, LEARN_TAGS } from '@/lib/data/learn-content';

export const metadata: Metadata = {
  title: 'Học nhanh cơ khí',
  description: 'Bài học ngắn 200–400 từ: RPM là gì, chip load, dung sai H7/g6… kèm ví dụ số cụ thể.',
};

export default function HocNhanhPage({ searchParams }: { searchParams: { tag?: string } }) {
  const activeTag = searchParams.tag ?? 'all';
  const list = activeTag === 'all' ? LEARN_POSTS : LEARN_POSTS.filter((p) => p.tag === activeTag);

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: 'Trang chủ', href: '/' }, { label: 'Học nhanh' }]} />
      <div>
        <h1 className="text-[2rem] font-bold text-primary">Học nhanh cơ khí</h1>
        <p className="mt-2 max-w-2xl text-sm text-secondary">
          {LEARN_POSTS.length} bài học ngắn — mỗi bài 200–400 từ kèm ví dụ số và link công cụ thực hành.
        </p>
      </div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Lọc chủ đề">
        <Link href="/hoc-nhanh" aria-current={activeTag === 'all' ? 'page' : undefined} className={`rounded-input border px-3 py-1.5 text-xs font-semibold ${activeTag === 'all' ? 'text-white' : 'text-secondary hover:text-primary'}`} style={activeTag === 'all' ? { backgroundColor: 'var(--accent)', borderColor: 'var(--accent)' } : { borderColor: 'var(--border-default)' }}>
          Tất cả
        </Link>
        {LEARN_TAGS.map((t) => (
          <Link key={t} href={`/hoc-nhanh?tag=${encodeURIComponent(t)}`} aria-current={activeTag === t ? 'page' : undefined} className={`rounded-input border px-3 py-1.5 text-xs font-semibold ${activeTag === t ? 'text-white' : 'text-secondary hover:text-primary'}`} style={activeTag === t ? { backgroundColor: 'var(--accent)', borderColor: 'var(--accent)' } : { borderColor: 'var(--border-default)' }}>
            {t}
          </Link>
        ))}
      </div>
      <ul className="grid gap-3 md:grid-cols-2">
        {list.map((p) => (
          <li key={p.slug} className="card rounded-card p-5">
            <p className="font-mono text-[0.7rem] uppercase tracking-widest text-muted">{p.tag}</p>
            <Link href={`/hoc-nhanh/${p.slug}`} className="mt-2 block font-semibold text-primary hover:underline">
              {p.title}
            </Link>
            <p className="mt-1.5 line-clamp-2 text-sm text-secondary">{p.excerpt}</p>
            <Link href={`/hoc-nhanh/${p.slug}`} className="mt-3 inline-flex items-center gap-1 text-xs font-semibold" style={{ color: 'var(--accent)' }}>
              Đọc bài <ArrowRight size={12} aria-hidden />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
