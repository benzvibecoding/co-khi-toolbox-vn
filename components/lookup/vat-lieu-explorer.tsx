'use client';

import { useMemo, useState } from 'react';
import { X } from 'lucide-react';
import { MATERIALS, MATERIAL_GROUPS, searchMaterials } from '@/lib/data/materials';
import type { Material } from '@/lib/data/materials';
import { SearchBar } from '@/components/ui/search-bar';

/** Tra cuu vat lieu: tim kiem + loc nhom + modal chi tiet. */
export function VatLieuExplorer({ initialQ = '' }: { initialQ?: string }) {
  const [q, setQ] = useState(initialQ);
  const [group, setGroup] = useState<string>('all');
  const [selected, setSelected] = useState<Material | null>(null);

  const results = useMemo(() => {
    const base = q.trim() ? searchMaterials(q) : MATERIALS;
    return group === 'all' ? base : base.filter((m) => m.group === group);
  }, [q, group]);

  const groupLabel = (id: string) => MATERIAL_GROUPS.find((g) => g.id === id)?.label ?? id;

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3">
        <SearchBar size="lg" defaultValue={initialQ} placeholder="Nhập tên vật liệu, tiêu chuẩn, ứng dụng..." />
        {/* O tim kiem dong bo: input phu de loc realtime */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <label htmlFor="vat-lieu-q" className="sr-only">Lọc vật liệu</label>
          <input
            id="vat-lieu-q"
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Lọc nhanh: S45C, 304, khuôn..."
            className="input-base max-w-xl"
            autoComplete="off"
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Lọc nhóm vật liệu">
        <button
          type="button"
          onClick={() => setGroup('all')}
          aria-pressed={group === 'all'}
          className={`rounded-input border px-3 py-1.5 text-xs font-semibold transition-colors ${group === 'all' ? 'text-white' : 'text-secondary hover:text-primary'}`}
          style={group === 'all' ? { backgroundColor: 'var(--accent)', borderColor: 'var(--accent)' } : { borderColor: 'var(--border-default)' }}
        >
          Tất cả ({MATERIALS.length})
        </button>
        {MATERIAL_GROUPS.map((g) => {
          const active = group === g.id;
          const count = MATERIALS.filter((m) => m.group === g.id).length;
          return (
            <button
              key={g.id}
              type="button"
              onClick={() => setGroup(active ? 'all' : g.id)}
              aria-pressed={active}
              className={`rounded-input border px-3 py-1.5 text-xs font-semibold transition-colors ${active ? 'text-white' : 'text-secondary hover:text-primary'}`}
              style={active ? { backgroundColor: 'var(--accent)', borderColor: 'var(--accent)' } : { borderColor: 'var(--border-default)' }}
            >
              {g.label} ({count})
            </button>
          );
        })}
      </div>
      <p className="text-sm text-secondary" aria-live="polite">
        {results.length > 0 ? (
          <>Tìm thấy <strong className="text-primary">{results.length}</strong> vật liệu</>
        ) : (
          <>Không có kết quả — thử từ khóa khác như “S45C”, “inox”, “khuôn”, “A36”.</>
        )}
      </p>
      {results.length > 0 ? (
        <ul className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {results.map((m) => (
            <li key={m.id}>
              <button
                type="button"
                onClick={() => setSelected(m)}
                className="card block w-full rounded-card p-4 text-left transition-colors hover:border-[var(--border-default)]"
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="font-mono text-lg font-bold text-primary">{m.name}</p>
                  <span className="rounded-badge px-1.5 py-0.5 text-[0.65rem] font-semibold text-secondary" style={{ backgroundColor: 'var(--bg-elevated)' }}>
                    {groupLabel(m.group)}
                  </span>
                </div>
                <p className="mt-0.5 text-xs text-muted">{m.fullName} · {m.standard}</p>
                <dl className="mt-3 grid grid-cols-2 gap-2 font-mono text-xs">
                  <div><dt className="text-muted">Bền kéo</dt><dd className="font-semibold text-primary">{m.tensileStrength} MPa</dd></div>
                  <div><dt className="text-muted">Độ cứng</dt><dd className="font-semibold text-primary">{m.hardness}</dd></div>
                </dl>
              </button>
            </li>
          ))}
        </ul>
      ) : null}
      {selected ? (
        <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label={`Chi tiết ${selected.name}`}>
          <button type="button" aria-label="Đóng chi tiết" onClick={() => setSelected(null)} className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-x-4 top-[5vh] mx-auto max-h-[90vh] max-w-2xl overflow-y-auto rounded-card border bg-surface p-6" style={{ borderColor: 'var(--border-subtle)' }}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="font-mono text-2xl font-bold text-primary">{selected.name}</h2>
                <p className="mt-1 text-sm text-secondary">{selected.fullName} · {selected.standard} · {groupLabel(selected.group)}</p>
              </div>
              <button type="button" onClick={() => setSelected(null)} aria-label="Đóng" className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-input text-secondary hover:text-primary">
                <X size={16} aria-hidden />
              </button>
            </div>
            <dl className="mt-4 grid grid-cols-2 gap-3 rounded-card border p-4 sm:grid-cols-4" style={{ borderColor: 'var(--border-subtle)', backgroundColor: 'var(--bg-elevated)' }}>
              <div><dt className="text-xs text-muted">Khối lượng riêng</dt><dd className="font-mono font-bold text-primary">{selected.density} g/cm³</dd></div>
              <div><dt className="text-xs text-muted">Bền kéo</dt><dd className="font-mono font-bold text-primary">{selected.tensileStrength} MPa</dd></div>
              <div><dt className="text-xs text-muted">Chảy</dt><dd className="font-mono font-bold text-primary">{selected.yieldStrength} MPa</dd></div>
              <div><dt className="text-xs text-muted">Độ cứng</dt><dd className="font-mono font-bold text-primary">{selected.hardness}</dd></div>
            </dl>
            <div className="mt-4 space-y-3 text-sm">
              <div><p className="font-semibold text-primary">Đặc tính</p><ul className="mt-1 list-disc space-y-1 pl-5 text-secondary">{selected.characteristics.map((c) => <li key={c}>{c}</li>)}</ul></div>
              <div><p className="font-semibold text-primary">Ứng dụng</p><ul className="mt-1 list-disc space-y-1 pl-5 text-secondary">{selected.applications.map((c) => <li key={c}>{c}</li>)}</ul></div>
              <div><p className="font-semibold text-primary">Gợi ý gia công</p><ul className="mt-1 list-disc space-y-1 pl-5 text-secondary">{selected.machiningTips.map((c) => <li key={c}>{c}</li>)}</ul></div>
              <div>
                <p className="font-semibold text-primary">Mác tương đương</p>
                <p className="mt-1 font-mono text-xs text-secondary">
                  {[
                    selected.equivalents.iso && `ISO: ${selected.equivalents.iso}`,
                    selected.equivalents.astm && `ASTM: ${selected.equivalents.astm}`,
                    selected.equivalents.din && `DIN: ${selected.equivalents.din}`,
                    selected.equivalents.gb && `GB: ${selected.equivalents.gb}`,
                  ].filter(Boolean).join(' · ') || '—'}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
