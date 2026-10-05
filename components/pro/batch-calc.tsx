'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { CalcResult } from '@/components/ui/calc-result';
import { FormulaBox } from '@/components/ui/formula-box';
import { SectionCard } from '@/components/ui/section-card';
import { ProGate, ProFeature } from '@/components/ui/pro-gate';
import { useProAccess } from '@/lib/hooks/useProAccess';
import { downloadCSV } from '@/lib/utils/export-csv';
import { formatNumber } from '@/lib/utils/format';

interface BatchRow { line: number; d: number; n: number; vc: number; error?: undefined }
interface BatchError { line: number; error: string; d?: undefined }

/** Parse text: moi dong "D, n" (chap nhan dau phay/cham phay/tab). */
function parseBatch(raw: string): (BatchRow | BatchError)[] {
  return raw
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l !== '')
    .map((l, i) => {
      const parts = l.split(/[,;\t]+/).map((p) => p.trim().replace(',', '.'));
      if (parts.length < 2 || parts[0] === undefined || parts[1] === undefined)
        return { line: i + 1, error: 'Mỗi dòng cần 2 số: D, n' };
      const d = Number(parts[0]);
      const n = Number(parts[1]);
      if (!Number.isFinite(d) || !Number.isFinite(n))
        return { line: i + 1, error: 'Giá trị không phải số' };
      if (d <= 0 || n <= 0) return { line: i + 1, error: 'D và n phải > 0' };
      return { line: i + 1, d, n, vc: (Math.PI * d * n) / 1000 };
    });
}

/** Tinh toc do cat hang loat tu bang D,n — tinh nang Pro that. */
export function BatchCalc() {
  const { canAccess } = useProAccess();
  const allowed = canAccess(ProFeature.BATCH_CALCULATE);
  const [raw, setRaw] = useState('50, 800\n32, 1200\n80, 500');
  const rows = useMemo(() => parseBatch(raw), [raw]);
  const okRows = rows.filter((r): r is BatchRow => r.d !== undefined);
  const avg = okRows.length > 0 ? okRows.reduce((s, r) => s + r.vc, 0) / okRows.length : null;

  const exportAll = () => {
    downloadCSV(`batch-vc-${new Date().toISOString().slice(0, 10)}`, okRows.map((r, i) => ({
      id: `batch-${i}`,
      toolId: 'tinh-hang-loat',
      toolName: 'Tính hàng loạt Vc',
      inputs: { D: r.d, n: r.n },
      outputs: { Vc: Number(r.vc.toFixed(4)) },
      timestamp: Date.now(),
    })));
  };

  return (
    <div className="space-y-5">
      <FormulaBox
        formula="Vc = (π × D × n) / 1000 — áp cho từng dòng"
        variables={[
          { symbol: 'Vc', name: 'Tốc độ cắt', unit: 'm/min' },
          { symbol: 'D', name: 'Đường kính', unit: 'mm' },
          { symbol: 'n', name: 'Vòng quay', unit: 'RPM' },
        ]}
      />
      {!allowed ? (
        <ProGate feature={ProFeature.BATCH_CALCULATE} label="Tính hàng loạt">
          <div className="rounded-card border p-4 font-mono text-sm" style={{ borderColor: 'var(--border-subtle)' }}>
            240 chi tiết · Vc trung bình 118.4 m/min
          </div>
        </ProGate>
      ) : (
        <div className="grid gap-5 lg:grid-cols-2">
          <SectionCard id="batch-input" title="Dữ liệu vào" description="Mỗi dòng một cặp: đường kính D (mm), vòng quay n (RPM) — cách nhau bởi dấu phẩy.">
            <label htmlFor="batch-text" className="sr-only">Bảng D, n mỗi dòng một cặp</label>
            <textarea
              id="batch-text"
              value={raw}
              onChange={(e) => setRaw(e.target.value)}
              rows={10}
              spellCheck={false}
              placeholder={'50, 800\n32, 1200'}
              className="input-base min-h-48 font-mono text-sm"
            />
            <div className="mt-3 flex flex-wrap gap-2">
              <button type="button" onClick={exportAll} disabled={okRows.length === 0} className="btn-primary text-sm disabled:opacity-40">
                Xuất CSV ({okRows.length} dòng)
              </button>
              <button type="button" onClick={() => setRaw('')} className="btn-ghost text-sm">
                Xóa
              </button>
            </div>
          </SectionCard>
          <div className="space-y-4">
            {avg !== null ? (
              <CalcResult label="Vc trung bình" value={formatNumber(avg)} unit="m/min" secondary={[{ label: 'Số chi tiết hợp lệ', value: `${okRows.length}/${rows.length}` }]} />
            ) : (
              <div className="card rounded-card p-5 text-sm text-muted">Nhập ít nhất 1 dòng hợp lệ để xem kết quả.</div>
            )}
            {rows.length > 0 ? (
              <div className="card rounded-card overflow-x-auto p-0">
                <table className="w-full font-mono text-xs">
                  <thead>
                    <tr className="text-left text-muted">
                      <th className="px-3 py-2 font-medium">Dòng</th>
                      <th className="px-3 py-2 font-medium">D (mm)</th>
                      <th className="px-3 py-2 font-medium">n (RPM)</th>
                      <th className="px-3 py-2 font-medium">Vc (m/min)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((r) => (
                      <tr key={r.line} className="border-t" style={{ borderColor: 'var(--border-subtle)' }}>
                        <td className="px-3 py-1.5 text-muted">{r.line}</td>
                        {r.d !== undefined ? (
                          <>
                            <td className="px-3 py-1.5 text-primary">{r.d}</td>
                            <td className="px-3 py-1.5 text-primary">{r.n}</td>
                            <td className="px-3 py-1.5 font-bold text-result">{formatNumber(r.vc)}</td>
                          </>
                        ) : (
                          <td colSpan={3} className="px-3 py-1.5 text-error">{r.error}</td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : null}
            <p className="text-xs text-muted">
              Cần tính loại khác (RPM, MRR)? Mở{' '}
              <Link href="/toc-do-cat" className="underline" style={{ color: 'var(--accent)' }}>Tốc độ cắt</Link>{' '}
              cho từng chi tiết lẻ.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
