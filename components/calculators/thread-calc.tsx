'use client';

import { useEffect, useState } from 'react';
import { CalcInput } from '@/components/ui/calc-input';
import { CalcResult } from '@/components/ui/calc-result';
import { FormulaBox } from '@/components/ui/formula-box';
import { ResetButton } from '@/components/ui/reset-button';
import { HistoryDrawer } from '@/components/ui/history-drawer';
import { SectionCard } from '@/components/ui/section-card';
import { formatNumber } from '@/lib/utils/format';
import { useCalculatorHistory } from '@/lib/hooks/useCalculatorHistory';

// Bảng bước ren thô ISO cho M3–M30 (đủ tra nhanh demo).
const METRIC_THREADS: { label: string; d: number; p: number }[] = [
  { label: 'M3 × 0.5', d: 3, p: 0.5 },
  { label: 'M4 × 0.7', d: 4, p: 0.7 },
  { label: 'M5 × 0.8', d: 5, p: 0.8 },
  { label: 'M6 × 1', d: 6, p: 1 },
  { label: 'M8 × 1.25', d: 8, p: 1.25 },
  { label: 'M10 × 1.5', d: 10, p: 1.5 },
  { label: 'M12 × 1.75', d: 12, p: 1.75 },
  { label: 'M14 × 2', d: 14, p: 2 },
  { label: 'M16 × 2', d: 16, p: 2 },
  { label: 'M18 × 2.5', d: 18, p: 2.5 },
  { label: 'M20 × 2.5', d: 20, p: 2.5 },
  { label: 'M22 × 2.5', d: 22, p: 2.5 },
  { label: 'M24 × 3', d: 24, p: 3 },
  { label: 'M27 × 3', d: 27, p: 3 },
  { label: 'M30 × 3.5', d: 30, p: 3.5 },
  { label: 'Nhập tay D, p', d: 0, p: 0 },
];

// Ren mặc định khi mở trang.
const DEFAULT_THREAD = 'M10 × 1.5';

// Chuyển chuỗi nhập thành số (chấp nhận dấu phẩy thập phân).
function toNum(raw: string): number | null {
  const t = raw.trim().replace(/,/g, '.');
  if (t === '') return null;
  const v = parseFloat(t);
  return Number.isFinite(v) ? v : null;
}

// Lỗi inline khi đã nhập mà giá trị không > 0.
function errPositive(raw: string, label: string): string | null {
  if (raw.trim() === '') return null;
  const v = toNum(raw);
  if (v === null) return `${label} phải là số hợp lệ`;
  if (v <= 0) return `${label} phải lớn hơn 0`;
  return null;
}

interface ThreadOut { d1: number; d2: number; drill: number }

/** Tính ren mét: đường kính trong d1, trung bình d2 và mũi khoan taro. */
export function ThreadCalc() {
  const [sel, setSel] = useState(DEFAULT_THREAD);
  const [dStr, setDStr] = useState('');
  const [pStr, setPStr] = useState('');
  const [result, setResult] = useState<ThreadOut | null>(null);
  const { push } = useCalculatorHistory('thread');

  const manual = sel === 'Nhập tay D, p';
  // D, p hiệu dụng: lấy từ bảng chọn hoặc ô nhập tay.
  const effD = manual ? dStr : String(METRIC_THREADS.find((t) => t.label === sel)?.d ?? '');
  const effP = manual ? pStr : String(METRIC_THREADS.find((t) => t.label === sel)?.p ?? '');

  // Hàm tính thuần túy, dùng chung cho debounce và nút Tính.
  const compute = (dRaw: string, pRaw: string): ThreadOut | null => {
    const d = toNum(dRaw);
    const p = toNum(pRaw);
    if (d === null || d <= 0 || p === null || p <= 0) return null;
    return { d1: d - 1.0825 * p, d2: d - 0.6495 * p, drill: d - p };
  };

  // Tính realtime với debounce 300ms.
  useEffect(() => {
    const t = setTimeout(() => setResult(compute(effD, effP)), 300);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [effD, effP, sel]);

  // Bấm Tính: tính ngay + lưu lịch sử (không push trong debounce).
  const onCalculate = () => {
    const r = compute(effD, effP);
    setResult(r);
    if (r !== null) {
      push({
        toolId: 'thread',
        toolName: `Ren mét ${manual ? `${effD}×${effP}` : sel}`,
        inputs: { D: toNum(effD) ?? 0, p: toNum(effP) ?? 0 },
        outputs: { d1: r.d1, d2: r.d2, drill: r.drill },
      });
    }
  };

  const onReset = () => {
    setSel(DEFAULT_THREAD);
    setDStr('');
    setPStr('');
    setResult(null);
  };

  const errD = manual ? errPositive(dStr, 'Đường kính D') : null;
  const errP = manual ? errPositive(pStr, 'Bước ren p') : null;
  const valid = result !== null && !errD && !errP;

  return (
    <div className="space-y-6">
      <FormulaBox
        formula="d1 = D − 1.0825×p  ;  d2 = D − 0.6495×p  ;  mũi khoan = D − p"
        variables={[
          { symbol: 'D', name: 'Đường kính ngoài ren', unit: 'mm' },
          { symbol: 'p', name: 'Bước ren', unit: 'mm' },
          { symbol: 'd1', name: 'Đường kính trong', unit: 'mm' },
          { symbol: 'd2', name: 'Đường kính trung bình', unit: 'mm' },
        ]}
      />
      <div className="grid gap-6 lg:grid-cols-2">
        <SectionCard title="Thông số đầu vào" action={<HistoryDrawer toolId="thread" />}>
          <div className="space-y-4">
            <div>
              <label htmlFor="th-sel" className="label-base">Chọn ren mét</label>
              <select id="th-sel" className="input-base mt-1.5" value={sel} onChange={(e) => setSel(e.target.value)}>
                {METRIC_THREADS.map((t) => (
                  <option key={t.label} value={t.label}>{t.label}</option>
                ))}
              </select>
            </div>
            {manual ? (
              <>
                <CalcInput id="th-d" label="Đường kính D" unit="mm" placeholder="vd: 12" value={dStr} onChange={(e) => setDStr(e.target.value)} error={errD} />
                <CalcInput id="th-p" label="Bước ren p" unit="mm" placeholder="vd: 1,75" value={pStr} onChange={(e) => setPStr(e.target.value)} error={errP} />
              </>
            ) : (
              <p className="text-sm text-secondary">D = {effD} mm — p = {effP} mm (theo bảng ren thô ISO).</p>
            )}
            <div className="flex flex-wrap gap-3">
              <button type="button" className="btn-primary" onClick={onCalculate}>Tính</button>
              <ResetButton onReset={onReset} />
            </div>
          </div>
        </SectionCard>
        <SectionCard title="Kết quả">
          {valid && result !== null ? (
            <CalcResult
              label="Mũi khoan taro"
              value={formatNumber(result.drill)}
              unit="mm"
              secondary={[
                { label: 'Đường kính trong d1', value: `${formatNumber(result.d1)} mm` },
                { label: 'Đường kính trung bình d2', value: `${formatNumber(result.d2)} mm` },
              ]}
            />
          ) : (
            <p className="text-sm text-muted">Chọn cỡ ren hoặc nhập D, p để xem kết quả realtime.</p>
          )}
        </SectionCard>
      </div>
      <SectionCard title="Bảng tra nhanh (ren thô ISO)">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-muted">
                <th className="py-1 pr-4 font-medium">Ren</th>
                <th className="py-1 pr-4 font-medium">d1 (mm)</th>
                <th className="py-1 pr-4 font-medium">d2 (mm)</th>
                <th className="py-1 font-medium">Khoan (mm)</th>
              </tr>
            </thead>
            <tbody className="font-mono text-secondary">
              {METRIC_THREADS.filter((t) => t.d > 0).map((t) => (
                <tr key={t.label} className="border-t" style={{ borderColor: 'var(--border-subtle)' }}>
                  <td className="py-1 pr-4">{t.label}</td>
                  <td className="py-1 pr-4">{formatNumber(t.d - 1.0825 * t.p)}</td>
                  <td className="py-1 pr-4">{formatNumber(t.d - 0.6495 * t.p)}</td>
                  <td className="py-1">{formatNumber(t.d - t.p)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
      <SectionCard title="Hướng dẫn & ví dụ">
        <p className="text-sm leading-relaxed text-secondary">Ví dụ: M10 × 1.5 → d1 ≈ 8.376 mm, d2 ≈ 9.026 mm, khoan taro 8.5 mm.</p>
      </SectionCard>
    </div>
  );
}
