import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  BookOpen,
  Boxes,
  Cog,
  Gauge,
  Layers,
  Nut,
  Repeat,
  Ruler,
  Weight,
  Zap,
} from 'lucide-react';
import { SearchBar } from '@/components/ui/search-bar';
import { SectionCard } from '@/components/ui/section-card';
import { FavoriteToggle } from '@/components/ui/favorite-toggle';
import { CALCULATOR_GROUPS, CALCULATORS } from '@/lib/data/site';

export const metadata: Metadata = {
  title: 'Cơ Khí Toolbox VN — Bộ công cụ cơ khí kỹ thuật số cho người Việt',
  description:
    'Tính tốc độ cắt, RPM, bước tiến, MRR, dung sai ISO 286-1, bánh răng, tra vật liệu S45C/SUS304 — miễn phí, tiếng Việt.',
};

const GROUP_ICONS: Record<string, React.ReactNode> = {
  'cat-got': <Gauge size={22} aria-hidden />,
  ren: <Nut size={22} aria-hidden />,
  'dung-sai': <Ruler size={22} aria-hidden />,
  'banh-rang': <Cog size={22} aria-hidden />,
  luc: <Weight size={22} aria-hidden />,
  'khoi-luong': <Boxes size={22} aria-hidden />,
  'don-vi': <Repeat size={22} aria-hidden />,
};

// 3 quick tool noi bat tren Hero
const QUICK_TOOLS = ['toc-do-cat', 'rpm', 'dung-sai'];

export default function HomePage() {
  const quickTools = QUICK_TOOLS.map((id) => CALCULATORS.find((c) => c.id === id)).filter(
    (t): t is NonNullable<typeof t> => Boolean(t),
  );

  return (
    <div className="space-y-10">
      {/* Hero — text layout, khong anh background */}
      <section aria-labelledby="hero-title" className="pt-4">
        <p className="inline-block rounded-badge border px-2.5 py-1 font-mono text-[0.7rem] uppercase tracking-widest text-secondary" style={{ borderColor: 'var(--border-default)' }}>
          Miễn phí · Tiếng Việt · Chuẩn ISO
        </p>
        <h1 id="hero-title" className="mt-4 max-w-3xl text-[2rem] font-bold leading-tight text-primary">
          Bộ công cụ cơ khí kỹ thuật số cho người Việt
        </h1>
        <p className="mt-3 max-w-2xl text-[0.9375rem] leading-relaxed text-secondary">
          Tính toán, tra cứu, học nhanh — tất cả trong một trang.
        </p>
        <div className="mt-6">
          <SearchBar size="lg" />
        </div>
        <div className="mt-5 flex flex-wrap gap-3">
          {quickTools.map((t) => (
            <Link
              key={t.id}
              href={t.href}
              className="group inline-flex items-center gap-2 rounded-input border px-4 py-2.5 text-sm font-medium text-primary transition-colors"
              style={{ borderColor: 'var(--border-default)', backgroundColor: 'var(--accent-subtle)' }}
            >
              {t.name}
              <ArrowRight size={15} aria-hidden className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          ))}
        </div>
      </section>

      {/* Grid danh muc */}
      <section aria-labelledby="groups-title">
        <h2 id="groups-title" className="text-[1.5rem] font-semibold text-primary">
          Danh mục công cụ
        </h2>
        <p className="mt-1 text-sm text-secondary">14 công cụ tính toán + 4 bộ tra cứu — theo đúng roadmap Phase 2–4.</p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {CALCULATOR_GROUPS.map((g) => {
            const count = CALCULATORS.filter((c) => c.group === g.id).length;
            const first = CALCULATORS.find((c) => c.group === g.id);
            return (
              <Link
                key={g.id}
                href={first ? first.href : '/tim-kiem'}
                className="card group rounded-card p-5 transition-colors hover:border-[var(--border-default)]"
              >
                <span
                  className="inline-flex h-11 w-11 items-center justify-center rounded-input"
                  style={{ backgroundColor: 'var(--accent-subtle)', color: 'var(--accent)' }}
                  aria-hidden
                >
                  {GROUP_ICONS[g.id] ?? <Layers size={22} />}
                </span>
                <span className="mt-4 block text-[1.125rem] font-semibold text-primary">{g.name}</span>
                <span className="mt-1 block text-sm text-secondary">{g.description}</span>
                <span className="mt-3 block font-mono text-xs text-muted">
                  {count} công cụ →
                </span>
              </Link>
            );
          })}
          <Link href="/vat-lieu" className="card group rounded-card p-5 transition-colors">
            <span
              className="inline-flex h-11 w-11 items-center justify-center rounded-input"
              style={{ backgroundColor: 'var(--result-subtle)', color: 'var(--result)' }}
              aria-hidden
            >
              <Layers size={22} />
            </span>
            <span className="mt-4 block text-[1.125rem] font-semibold text-primary">Tra cứu vật liệu</span>
            <span className="mt-1 block text-sm text-secondary">30+ mác thép phổ biến tại Việt Nam</span>
            <span className="mt-3 block font-mono text-xs text-muted">S45C · SUS304 · SKD11 →</span>
          </Link>
        </div>
      </section>

      {/* Tat ca cong cu */}
      <section aria-labelledby="all-tools-title">
        <h2 id="all-tools-title" className="text-[1.5rem] font-semibold text-primary">
          Tất cả công cụ
        </h2>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {CALCULATORS.map((t) => (
            <div
              key={t.id}
              className="card flex items-center gap-3 rounded-card p-4"
            >
              <Link href={t.href} className="min-w-0 flex-1">
                <span className="block truncate text-sm font-semibold text-primary hover:underline">{t.name}</span>
                <span className="mt-0.5 block truncate text-xs text-secondary">{t.description}</span>
                <span className="mt-1 block truncate font-mono text-[0.7rem] text-muted">{t.formula}</span>
              </Link>
              <FavoriteToggle toolId={t.id} toolName={t.name} />
            </div>
          ))}
        </div>
      </section>

      {/* Tra cuu nhanh + Hoc nhanh */}
      <div className="grid gap-4 lg:grid-cols-2">
        <SectionCard
          id="lookup"
          title="Tra cứu nhanh vật liệu"
          description="S45C, SS400, SUS304, SKD11… đầy đủ cơ tính và gợi ý gia công ở Phase 4."
          action={
            <Link href="/vat-lieu" className="btn-ghost !py-2 text-xs">
              Mở tra cứu <ArrowRight size={13} aria-hidden />
            </Link>
          }
        >
          <ul className="grid grid-cols-2 gap-2 font-mono text-sm">
            {['S45C', 'SS400', 'SUS304', 'SKD11', 'SCM440', 'A6061'].map((m) => (
              <li key={m}>
                <Link
                  href={`/vat-lieu?q=${m}`}
                  className="block rounded-input border px-3 py-2 text-center font-semibold text-primary transition-colors hover:border-[var(--accent)]"
                  style={{ borderColor: 'var(--border-subtle)', backgroundColor: 'var(--bg-elevated)' }}
                >
                  {m}
                </Link>
              </li>
            ))}
          </ul>
        </SectionCard>
        <SectionCard
          id="learn"
          title="Học nhanh cơ khí"
          description="200–400 từ mỗi bài, có ví dụ số cụ thể — ra mắt ở Phase 5."
          action={
            <Link href="/hoc-nhanh" className="btn-ghost !py-2 text-xs">
              Xem tất cả <ArrowRight size={13} aria-hidden />
            </Link>
          }
        >
          <ul className="space-y-2.5 text-sm">
            {[
              { q: 'RPM là gì?', href: '/hoc-nhanh/rpm-la-gi' },
              { q: 'Tại sao cần tính Chip Load?', href: '/hoc-nhanh/tai-sao-can-tinh-chip-load' },
              { q: 'H7/g6 nghĩa là gì?', href: '/hoc-nhanh/h7-g6-nghia-la-gi' },
            ].map((a) => (
              <li key={a.href}>
                <Link
                  href={a.href}
                  className="flex items-center gap-2.5 rounded-input border px-3 py-2.5 text-secondary transition-colors hover:text-primary"
                  style={{ borderColor: 'var(--border-subtle)' }}
                >
                  <BookOpen size={15} aria-hidden className="shrink-0 text-muted" />
                  {a.q}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-3 flex items-center gap-1.5 text-xs text-muted">
            <Zap size={12} aria-hidden /> 15+ bài học đang được biên soạn theo chuẩn Phase 5.
          </p>
        </SectionCard>
      </div>
    </div>
  );
}
