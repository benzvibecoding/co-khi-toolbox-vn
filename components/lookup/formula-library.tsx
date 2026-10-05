'use client';

import { useMemo, useState } from 'react';
import { FORMULAS } from '@/lib/data/formulas-library';
import { FormulaBox } from '@/components/ui/formula-box';

/** Thu vien cong thuc: loc theo nhom + hien thi vi du tung buoc. */
export function FormulaLibrary() {
  const categories = useMemo(() => Array.from(new Set(FORMULAS.map((f) => f.category))), []);
  const [cat, setCat] = useState<string>('all');

  const list = cat === 'all' ? FORMULAS : FORMULAS.filter((f) => f.category === cat);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2" role="group" aria-label="Lọc nhóm công thức">
        <button type="button" onClick={() => setCat('all')} aria-pressed={cat === 'all'} className={`rounded-input border px-3 py-1.5 text-xs font-semibold ${cat === 'all' ? 'text-white' : 'text-secondary hover:text-primary'}`} style={cat === 'all' ? { backgroundColor: 'var(--accent)', borderColor: 'var(--accent)' } : { borderColor: 'var(--border-default)' }}>
          Tất cả ({FORMULAS.length})
        </button>
        {categories.map((c) => {
          const active = cat === c;
          return (
            <button key={c} type="button" onClick={() => setCat(active ? 'all' : c)} aria-pressed={active} className={`rounded-input border px-3 py-1.5 text-xs font-semibold ${active ? 'text-white' : 'text-secondary hover:text-primary'}`} style={active ? { backgroundColor: 'var(--accent)', borderColor: 'var(--accent)' } : { borderColor: 'var(--border-default)' }}>
              {c}
            </button>
          );
        })}
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        {list.map((f) => (
          <article key={f.id} className="card rounded-card space-y-3 p-5">
            <div>
              <p className="font-mono text-[0.7rem] uppercase tracking-widest text-muted">{f.category}</p>
              <h2 className="mt-1 text-[1.125rem] font-semibold text-primary">{f.name}</h2>
            </div>
            <FormulaBox formula={f.formula} variables={f.variables} />
            <div className="rounded-input p-3 text-xs leading-relaxed" style={{ backgroundColor: 'var(--bg-elevated)' }}>
              <p className="font-semibold text-primary">Ví dụ: {f.example.given}</p>
              <ol className="mt-1.5 list-decimal space-y-1 pl-5 text-secondary">
                {f.example.steps.map((s) => <li key={s}>{s}</li>)}
              </ol>
              <p className="mt-1.5 font-mono font-semibold text-result">→ {f.example.result}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
