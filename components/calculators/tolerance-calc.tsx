'use client';

import { useEffect, useState } from 'react';
import { CalcInput } from '@/components/ui/calc-input';
import { CalcResult } from '@/components/ui/calc-result';
import { FormulaBox } from '@/components/ui/formula-box';
import { ResetButton } from '@/components/ui/reset-button';
import { HistoryDrawer } from '@/components/ui/history-drawer';
import { SectionCard } from '@/components/ui/section-card';
import { UnitToggle } from '@/components/ui/unit-toggle';
import { formatNumber } from '@/lib/utils/format';
import { useCalculatorHistory } from '@/lib/hooks/useCalculatorHistory';

// Bảng tra cứu RÚT GỌN (micron) — tham khảo ISO 286-1, chỉ dùng demo/ước lượng.
interface Row { max: number; it7: number; it6: number; gEs: number; fEs: number; kEi: number; nEi: number; pEi: number; rEi: number; sEi: number }
const TABLE: Row[] = [
  { max: 3, it7: 10, it6: 6, gEs: -2, fEs: -6, kEi: 0, nEi: 4, pEi: 6, rEi: 10, sEi: 14 },
  { max: 6, it7: 12, it6: 8, gEs: -4, fEs: -10, kEi: 1, nEi: 8, pEi: 12, rEi: 15, sEi: 19 },
  { max: 10, it7: 15, it6: 9, gEs: -5, fEs: -13, kEi: 1, nEi: 10, pEi: 15, rEi: 19, sEi: 23 },
  { max: 18, it7: 18, it6: 11, gEs: -6, fEs: -16, kEi: 1, nEi: 12, pEi: 18, rEi: 23, sEi: 28 },
  { max: 30, it7: 21, it6: 13, gEs: -7, fEs: -20, kEi: 2, nEi: 15, pEi: 22, rEi: 28, sEi: 35 },
  { max: 50, it7: 25, it6: 16, gEs: -9, fEs: -25, kEi: 2, nEi: 17, pEi: 26, rEi: 34, sEi: 43 },
  { max: 80, it7: 30, it6: 19, gEs: -10, fEs: -30, kEi: 2, nEi: 20, pEi: 32, rEi: 43, sEi: 59 },
  { max: 120, it7: 35, it6: 22, gEs: -12, fEs: -36, kEi: 3, nEi: 23, pEi: 37, rEi: 51, sEi: 72 },
  { max: 180, it7: 40, it6: 25, gEs: -14, fEs: -43, kEi: 3, nEi: 27, pEi: 43, rEi: 61, sEi: 88 },
  { max: 250, it7: 46, it6: 29, gEs: -15, fEs: -50, kEi: 4, nEi: 31, pEi: 50, rEi: 74, sEi: 106 },
  { max: 315, it7: 52, it6: 32, gEs: -17, fEs: -56, kEi: 4, nEi: 34, pEi: 56, rEi: 87, sEi: 124 },
  { max: 400, it7: 57, it6: 36, gEs: -18, fEs: -62, kEi: 5, nEi: 37, pEi: 62, rEi: 99, sEi: 144 },
];

const FITS = ['H7/g6', 'H7/f7', 'H7/k6', 'H7/n6', 'H7/p6', 'H7/r6', 'H7/s6'] as const;
type Fit = (typeof FITS)[number];

// Sai lệch trục (micron) từ kiểu lắp: g/f cho giới hạn trên, k–s cho giới hạn dưới.
function shaftDev(fit: Fit, row: Row): { es: number; ei: number } {
  const shaft = fit.split('/')[1];
  if (shaft === 'g6') return { es: row.gEs, ei: row.gEs - row.it6 };
  if (shaft === 'f7') return { es: row.fEs, ei: row.fEs - row.it7 };
  // Lấy giới hạn dưới ei cho k6–s6, giới hạn trên es = ei + IT6.
  const eiMap: Record<string, number> = { k6: row.kEi, n6: row.nEi, p6: row.pEi, r6: row.rEi, s6: row.sEi };
  const ei = eiMap[shaft ?? ''] ?? 0;
  return { es: ei + row.it6, ei };
}

// Chuyển chuỗi nhập thành số (chấp nhận dấu phẩy thập phân).
function toNum(raw: string): number | null {
  const t = raw.trim().replace(/,/g, '.');
  if (t === '') return null;
  const v = parseFloat(t);
  return Number.isFinite(v) ? v : null;
}

// Lỗi inline cho kích thước danh nghĩa (> 0).
function errPositive(raw: string, label: string): string | null {
  if (raw.trim() === '') return null;
  const v = toNum(raw);
  if (v === null) return `${label} phải là số hợp lệ`;
  if (v <= 0) return `${label} phải lớn hơn 0`;
  return null;
}

// Sai lệch tay (micron) được phép âm — chỉ cần là số hợp lệ.
function errDev(raw: string, label: string): string | null {
  if (raw.trim() === '') return null;
  return toNum(raw) === null ? `${label} phải là số hợp lệ` : null;
}

interface TolOut { holeMax: number; holeMin: number; shaftMax: number; shaftMin: number; clearMax: number; clearMin: number; kind: string }

/** Tính dung sai lắp ghép lỗ/trục, độ hở và kiểu lắp. */
export function ToleranceCalc() {
  const [src, setSrc] = useState<'chon' | 'tay'>('chon');
  const [nomStr, setNomStr] = useState('');
  const [fit, setFit] = useState<Fit>('H7/g6');
  const [esStr, setEsStr] = useState('');
  const [eiStr, setEiStr] = useState('');
  const [aesStr, setAesStr] = useState('');
  const [aeiStr, setAeiStr] = useState('');
  const [result, setResult] = useState<TolOut | null>(null);
  const { push } = useCalculatorHistory('tolerance');

  // Dựng kết quả từ sai lệch micron → mm.
  const build = (nom: number, ES: number, EI: number, es: number, ei: number): TolOut => {
    const holeMax = nom + ES / 1000;
    const holeMin = nom + EI / 1000;
    const shaftMax = nom + es / 1000;
    const shaftMin = nom + ei / 1000;
    const clearMax = holeMax - shaftMin;
    const clearMin = holeMin - shaftMax;
    const kind = shaftMax < holeMin ? 'Lắp lỏng (clearance)' : shaftMin > holeMax ? 'Lắp chặt (interference)' : 'Lắp trung gian (transition)';
    return { holeMax, holeMin, shaftMax, shaftMin, clearMax, clearMin, kind };
  };

  // Hàm tính thuần túy, dùng chung cho debounce và nút Tính.
  const compute = (): TolOut | null => {
    const nom = toNum(nomStr);
    if (nom === null || nom <= 0 || nom > 400) return null;
    if (src === 'chon') {
      const row = TABLE.find((r) => nom <= r.max);
      if (!row) return null;
      const { es, ei } = shaftDev(fit, row);
      return build(nom, row.it7, 0, es, ei);
    }
    const ES = toNum(esStr);
    const EI = toNum(eiStr);
    const es = toNum(aesStr);
    const ei = toNum(aeiStr);
    if (ES === null || EI === null || es === null || ei === null) return null;
    return build(nom, ES, EI, es, ei);
  };

  // Tính realtime với debounce 300ms.
  useEffect(() => {
    const t = setTimeout(() => setResult(compute()), 300);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nomStr, fit, src, esStr, eiStr, aesStr, aeiStr]);

  // Bấm Tính: tính ngay + lưu lịch sử (không push trong debounce).
  const onCalculate = () => {
    const r = compute();
    setResult(r);
    if (r !== null) {
      push({
        toolId: 'tolerance',
        toolName: src === 'chon' ? `Dung sai ${fit}` : 'Dung sai nhập tay',
        inputs: src === 'chon' ? { D: toNum(nomStr) ?? 0, fit } : { D: toNum(nomStr) ?? 0, ES: toNum(esStr) ?? 0, EI: toNum(eiStr) ?? 0, es: toNum(aesStr) ?? 0, ei: toNum(aeiStr) ?? 0 },
        outputs: { holeMax: r.holeMax, holeMin: r.holeMin, shaftMax: r.shaftMax, shaftMin: r.shaftMin, fit: r.kind },
      });
    }
  };

  const onReset = () => {
    setNomStr('');
    setEsStr('');
    setEiStr('');
    setAesStr('');
    setAeiStr('');
    setResult(null);
  };

  const errNom = errPositive(nomStr, 'Kích thước danh nghĩa');
  const manualErrs = src === 'tay' ? [errDev(esStr, 'ES'), errDev(eiStr, 'EI'), errDev(aesStr, 'es'), errDev(aeiStr, 'ei')] : [];
  const valid = result !== null && !errNom && manualErrs.every((e) => e === null);

  return (
    <div className="space-y-6">
      <FormulaBox
        formula="Dmax = D + ES ; Dmin = D + EI ; Hở max = Dmax − dmin ; Hở min = Dmin − dmax"
        variables={[
          { symbol: 'ES/EI', name: 'Sai lệch trên/dưới của lỗ', unit: 'µm' },
          { symbol: 'es/ei', name: 'Sai lệch trên/dưới của trục', unit: 'µm' },
        ]}
      />
      <div className="grid gap-6 lg:grid-cols-2">
        <SectionCard title="Thông số đầu vào" action={<HistoryDrawer toolId="tolerance" />}>
          <div className="space-y-4">
            <UnitToggle<'chon' | 'tay'>
              options={['chon', 'tay'] as const}
              value={src}
              onChange={setSrc}
              labels={{ chon: 'Chọn kiểu lắp', tay: 'Nhập tay' }}
              ariaLabel="Cách nhập dung sai"
            />
            <CalcInput id="tol-nom" label="Kích thước danh nghĩa" unit="mm" placeholder="vd: 40" hint="Phạm vi bảng rút gọn: 0–400 mm" value={nomStr} onChange={(e) => setNomStr(e.target.value)} error={errNom} />
            {src === 'chon' ? (
              <div>
                <label htmlFor="tol-fit" className="label-base">Kiểu lắp</label>
                <select id="tol-fit" className="input-base mt-1.5" value={fit} onChange={(e) => setFit(e.target.value as Fit)}>
                  {FITS.map((f) => (
                    <option key={f} value={f}>{f}</option>
                  ))}
                </select>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                <CalcInput id="tol-es" label="ES lỗ" unit="µm" placeholder="vd: 25" value={esStr} onChange={(e) => setEsStr(e.target.value)} error={manualErrs[0]} />
                <CalcInput id="tol-ei" label="EI lỗ" unit="µm" placeholder="vd: 0" value={eiStr} onChange={(e) => setEiStr(e.target.value)} error={manualErrs[1]} />
                <CalcInput id="tol-ses" label="es trục" unit="µm" placeholder="vd: -9" value={aesStr} onChange={(e) => setAesStr(e.target.value)} error={manualErrs[2]} />
                <CalcInput id="tol-sei" label="ei trục" unit="µm" placeholder="vd: -25" value={aeiStr} onChange={(e) => setAeiStr(e.target.value)} error={manualErrs[3]} />
              </div>
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
              label="Kiểu lắp"
              value={result.kind}
              secondary={[
                { label: 'Lỗ Dmax', value: `${formatNumber(result.holeMax)} mm` },
                { label: 'Lỗ Dmin', value: `${formatNumber(result.holeMin)} mm` },
                { label: 'Trục dmax', value: `${formatNumber(result.shaftMax)} mm` },
                { label: 'Trục dmin', value: `${formatNumber(result.shaftMin)} mm` },
                { label: 'Hở max', value: `${formatNumber(result.clearMax)} mm` },
                { label: 'Hở min (âm = chồng)', value: `${formatNumber(result.clearMin)} mm` },
              ]}
              note="Giá trị tra cứu rút gọn, tham khảo ISO 286-1 — kiểm tra lại bảng chuẩn trước khi gia công chính thức."
            />
          ) : (
            <p className="text-sm text-muted">Nhập kích thước danh nghĩa (0–400 mm) để xem kết quả realtime.</p>
          )}
        </SectionCard>
      </div>
      <SectionCard title="Hướng dẫn & ví dụ">
        <p className="text-sm leading-relaxed text-secondary">
          Ví dụ: Ø40 H7/g6 → lỗ 40–40.025 mm, trục ≈ 39.975–39.991 mm, lắp lỏng.
          Hở min âm nghĩa là có độ chồng (lắp chặt một phần).
        </p>
      </SectionCard>
    </div>
  );
}
