'use client';

import { useMemo, useState } from 'react';
import { DRAWING_CATEGORIES, DRAWING_SYMBOLS } from '@/lib/data/drawing-symbols';

/** Tra cuu ky hieu ban ve: loc theo nhom + tim kiem realtime. */
export function SymbolExplorer({ initialQ = '' }: { initialQ?: string }) {
  const [q, setQ] = useState(initialQ);
  const [cat, setCat] = useState<string>('all');

  const results = useMemo(() => {
    const query = q.trim().toLowerCase();
    return DRAWING_SYMBOLS.filter((s) => {
      if (cat !== 'all' && s.category !== cat) return false;
      if (!query) return true;
      return `${s.symbol} ${s.name} ${s.description} ${s.example ?? ''}`.toLowerCase().includes(query);
    });
  }, [q, cat]);

  return (
    <div className="space-y-5">
      <label htmlFor="symbol-q" className="sr-only">Tìm ký hiệu</label>
      <input
        id="symbol-q"
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Tìm: Ø, Ra, M, vuông góc..."
        className="input-base max-w-xl"
        autoComplete="off"
      />
      <div className="flex flex-wrap gap-2" role="group" aria-label="Lọc nhóm ký hiệu">
        <button type="button" onClick={() => setCat('all')} aria-pressed={cat === 'all'} className={`rounded-input border px-3 py-1.5 text-xs font-semibold ${cat === 'all' ? 'text-white' : 'text-secondary hover:text-primary'}`} style={cat === 'all' ? { backgroundColor: 'var(--accent)', borderColor: 'var(--accent)' } : { borderColor: 'var(--border-default)' }}>
          Tất cả ({DRAWING_SYMBOLS.length})
        </button>
        {DRAWING_CATEGORIES.map((c) => {
          const active = cat === c.id;
          return (
            <button key={c.id} type="button" onClick={() => setCat(active ? 'all' : c.id)} aria-pressed={active} className={`rounded-input border px-3 py-1.5 text-xs font-semibold ${active ? 'text-white' : 'text-secondary hover:text-primary'}`} style={active ? { backgroundColor: 'var(--accent)', borderColor: 'var(--accent)' } : { borderColor: 'var(--border-default)' }}>
              {c.label}
            </button>
          );
        })}
      </div>
      <p className="text-sm text-secondary" aria-live="polite">Tìm thấy <strong className="text-primary">{results.length}</strong> ký hiệu</p>
      <ul className="grid gap-3 md:grid-cols-2">
        {results.map((s) => (
          <li key={s.id} className="card rounded-card p-4">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-input font-mono text-xl font-bold" style={{ backgroundColor: 'var(--accent-subtle)', color: 'var(--accent)' }} aria-hidden>
                {s.symbol}
              </span>
              <div>
                <p className="text-sm font-semibold text-primary">{s.name}</p>
                <p className="font-mono text-[0.7rem] text-muted">{DRAWING_CATEGORIES.find((c) => c.id === s.category)?.label}</p>
              </div>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-secondary">{s.description}</p>
            {s.example ? <p className="mt-2 rounded-input px-2.5 py-1.5 font-mono text-xs text-primary" style={{ backgroundColor: 'var(--bg-elevated)' }}>{s.example}</p> : null}
            {s.note ? <p className="mt-1.5 text-xs text-muted">{s.note}</p> : null}
          </li>
        ))}
      </ul>
    </div>
  );
}
