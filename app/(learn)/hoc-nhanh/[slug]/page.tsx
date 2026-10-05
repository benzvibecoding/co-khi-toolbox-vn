import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, Wrench } from 'lucide-react';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { LEARN_POSTS, getPostBySlug } from '@/lib/data/learn-content';

export function generateStaticParams() {
  return LEARN_POSTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getPostBySlug(params.slug);
  return {
    title: post ? post.title : 'Bài học',
    description: post?.excerpt ?? 'Bài học nhanh cơ khí.',
  };
}

export default function SlugPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const idx = LEARN_POSTS.findIndex((p) => p.slug === post.slug);
  const prev = idx > 0 ? LEARN_POSTS[idx - 1] : undefined;
  const next = idx < LEARN_POSTS.length - 1 ? LEARN_POSTS[idx + 1] : undefined;

  return (
    <article className="mx-auto max-w-3xl space-y-6">
      <Breadcrumb
        items={[
          { label: 'Trang chủ', href: '/' },
          { label: 'Học nhanh', href: '/hoc-nhanh' },
          { label: post.title },
        ]}
      />
      <header>
        <p className="font-mono text-[0.7rem] uppercase tracking-widest text-muted">{post.tag}</p>
        <h1 className="mt-2 text-[2rem] font-bold leading-tight text-primary">{post.title}</h1>
        <p className="mt-2 text-sm leading-relaxed text-secondary">{post.excerpt}</p>
      </header>
      <div className="space-y-4">
        {post.content.map((para, i) => (
          <p key={i} className="text-[0.9375rem] leading-relaxed text-primary" style={{ color: i === 0 ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
            {para}
          </p>
        ))}
      </div>
      {post.relatedToolHref ? (
        <Link
          href={post.relatedToolHref}
          className="flex items-center gap-3 rounded-card border p-4 transition-colors hover:border-[var(--accent)]"
          style={{ borderColor: 'var(--border-default)', backgroundColor: 'var(--accent-subtle)' }}
        >
          <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-input text-white" style={{ backgroundColor: 'var(--accent)' }} aria-hidden>
            <Wrench size={18} />
          </span>
          <span>
            <span className="block text-sm font-semibold text-primary">Thực hành ngay với công cụ tính</span>
            <span className="mt-0.5 flex items-center gap-1 text-xs" style={{ color: 'var(--accent)' }}>
              Mở công cụ liên quan <ArrowRight size={12} aria-hidden />
            </span>
          </span>
        </Link>
      ) : null}
      <nav className="flex flex-wrap justify-between gap-2 border-t pt-5" style={{ borderColor: 'var(--border-subtle)' }} aria-label="Bài học khác">
        {prev ? (
          <Link href={`/hoc-nhanh/${prev.slug}`} className="inline-flex items-center gap-1.5 text-sm text-secondary hover:text-primary">
            <ArrowLeft size={14} aria-hidden /> {prev.title}
          </Link>
        ) : <span />}
        {next ? (
          <Link href={`/hoc-nhanh/${next.slug}`} className="inline-flex items-center gap-1.5 text-sm text-secondary hover:text-primary">
            {next.title} <ArrowRight size={14} aria-hidden />
          </Link>
        ) : null}
      </nav>
    </article>
  );
}
