import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { SearchBar } from '@/components/ui/search-bar';
import { CALCULATORS } from '@/lib/data/site';
import { MATERIALS } from '@/lib/data/materials';
import { DRAWING_SYMBOLS } from '@/lib/data/drawing-symbols';
import { FORMULAS } from '@/lib/data/formulas-library';
import { LEARN_POSTS } from '@/lib/data/learn-content';

export const metadata: Metadata = {
  title: 'Tìm kiếm',
  description: 'Tìm kiếm công cụ, vật liệu, ký hiệu, công thức, bài học trên toàn site.',
};

interface Hit { title: string; desc: string; href: string; score: number; }

/**
 * Tim kiem toan site: substring + weighted score.
 * Khop dung ten: 10 | tu khoa/id: 5 | mo ta: 2 | noi dung: 1.
 */
function searchAll(q: string): { tools: Hit[]; materials: Hit[]; symbols: Hit[]; formulas: Hit[]; posts: Hit[] } {
  const query = q.trim().toLowerCase();
  const empty = { tools: [], materials: [], symbols: [], formulas: [], posts: [] };
  if (!query) return empty;

  const score = (exact: string, mid: string, weak: string): number => {
    let s = 0;
    if (exact.toLowerCase() === query) s += 10;
    if (exact.toLowerCase().includes(query)) s += 10;
    if (mid.toLowerCase().includes(query)) s += 5;
    if (weak.toLowerCase().includes(query)) s += 2;
    return s;
  };

  const tools = CALCULATORS.map((t) => ({
    title: t.name, desc: t.description, href: t.href,
    score: score(t.name, `${t.id} ${t.formula}`, t.description),
  })).filter((r) => r.score > 0).sort((a, b) => b.score - a.score);

  const materials = MATERIALS.map((m) => ({
    title: `${m.name} — ${m.fullName}`, desc: `${m.standard} · Bền kéo ${m.tensileStrength} MPa · ${m.hardness}`, href: `/vat-lieu?q=${encodeURIComponent(m.name)}`,
    score: score(m.name, `${m.standard} ${m.searchTags.join(' ')}`, `${m.fullName} ${m.applications.join(' ')}`),
  })).filter((r) => r.score > 0).sort((a, b) => b.score - a.score).slice(0, 8);

  const symbols = DRAWING_SYMBOLS.map((s) => ({
    title: `${s.symbol} — ${s.name}`, desc: s.description, href: '/ky-hieu-ban-ve',
    score: score(s.name, s.symbol, `${s.description} ${s.example ?? ''}`),
  })).filter((r) => r.score > 0).sort((a, b) => b.score - a.score).slice(0, 8);

  const formulas = FORMULAS.map((f) => ({
    title: f.name, desc: f.formula, href: '/cong-thuc',
    score: score(f.name, `${f.id} ${f.formula}`, f.category),
  })).filter((r) => r.score > 0).sort((a, b) => b.score - a.score).slice(0, 8);

  const posts = LEARN_POSTS.map((p) => ({
    title: p.title, desc: p.excerpt, href: `/hoc-nhanh/${p.slug}`,
    score: score(p.title, `${p.slug} ${p.tag}`, `${p.excerpt} ${p.content.join(' ')}`),
  })).filter((r) => r.score > 0).sort((a, b) => b.score - a.score).slice(0, 8);

  return { tools, materials, symbols, formulas, posts };
}

function Group({ title, hits }: { title: string; hits: Hit[] }) {
  if (hits.length === 0) return null;
  return (
    <section aria-label={title}>
      <h2 className="text-[1.125rem] font-semibold text-primary">{title} ({hits.length})</h2>
      <ul className="mt-3 grid gap-3 md:grid-cols-2">
        {hits.map((h) => (
          <li key={`${title}-${h.href}-${h.title}`} className="card rounded-card p-4">
            <Link href={h.href} className="block font-semibold text-primary hover:underline">{h.title}</Link>
            <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-secondary">{h.desc}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function SearchPage({ searchParams }: { searchParams: { q?: string } }) {
  const q = searchParams.q ?? '';
  const r = searchAll(q);
  const total = r.tools.length + r.materials.length + r.symbols.length + r.formulas.length + r.posts.length;

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: 'Trang chủ', href: '/' }, { label: 'Tìm kiếm' }]} />
      <div>
        <h1 className="text-[2rem] font-bold text-primary">Tìm kiếm</h1>
        <p className="mt-1 text-sm text-secondary">Khớp tên (10đ) · từ khóa (5đ) · mô tả (2đ) — trên công cụ, vật liệu, ký hiệu, công thức, bài học.</p>
      </div>
      <SearchBar size="lg" defaultValue={q} />
      {q ? (
        <div className="space-y-8" aria-live="polite">
          <p className="text-sm text-secondary">
            {total > 0 ? (
              <>Tìm thấy <strong className="text-primary">{total}</strong> kết quả cho “{q}”</>
            ) : (
              <>Không tìm thấy kết quả cho “{q}”. Thử “cắt”, “S45C”, “Ø”, “M10”, “RPM”.</>
            )}
          </p>
          <Group title="Công cụ" hits={r.tools} />
          <Group title="Vật liệu" hits={r.materials} />
          <Group title="Ký hiệu bản vẽ" hits={r.symbols} />
          <Group title="Công thức" hits={r.formulas} />
          <Group title="Bài học" hits={r.posts} />
        </div>
      ) : (
        <p className="text-sm text-muted">Nhập từ khóa ở ô trên để bắt đầu tìm kiếm.</p>
      )}
    </div>
  );
}
