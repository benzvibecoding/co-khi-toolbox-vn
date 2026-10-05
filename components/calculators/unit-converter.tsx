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

// Bảng hệ số đổi về đơn vị base của từng loại (nhân value với hệ số).
const FACTORS: Record<string, Record<string, number>> = {
  'Chiều dài': { mm: 1, cm: 10, m: 1000, inch: 25.4, ft: 304.8 },
  'Tốc độ': { 'm/min': 1, 'ft/min': 0.3048, 'm/s': 60 },
  'Áp suất': { MPa: 1, GPa: 1000, psi: 0.00689476, 'kgf/cm²': 0.0980665 },
  'Lực': { N: 1, kN: 1000, kgf: 9.80665, lbf: 4.44822 },
  'Khối lượng': { g: 1, kg: 1000, lb: 453.592, oz: 28.3495 },
  'Công suất': { W: 1, kW: 1000, HP: 745.7 },
  'Mô-men': { 'N·m': 1, 'kN·m': 1000, 'kgf·m': 9.80665, 'lbf·ft': 1.35582 },
};

// Chuyển chuỗi nhập thành số (chấp nhận dấu phẩy thập phân).
function toNum(raw: string): number | null {
  const t = raw.trim().replace(/,/g, '.');
  if (t === '') return null;
  const v = parseFloat(t);
  return Number.isFinite(v) ? v : null;
}

// Danh sách đơn vị của một nhóm (mảng rỗng nếu nhóm lạ).
function unitsOf(kind: string): string[] {
  return Object.keys(FACTORS[kind] ?? {});
}

/** Đổi đơn vị kỹ thuật cơ khí qua 7 nhóm đại lượng. */
export function UnitConverter() {
  const kinds = Object.keys(FACTORS);
  const [kind, setKind] = useState<string>('Chiều dài');
  const [from, setFrom] = useState('mm');
  const [to, setTo] = useState('inch');
  const units = unitsOf(kind);
  const [valStr, setValStr] = useState('');
  const [result, setResult] = useState<number | null>(null);
  const { push } = useCalculatorHistory('unit-converter');

  // Khi đổi nhóm: reset cặp from/to về 2 đơn vị đầu.
  const onKindChange = (k: string) => {
    setKind(k);
    const u = unitsOf(k);
    setFrom(u[0] ?? '');
    setTo(u[1] ?? u[0] ?? '');
    setResult(null);
  };

  // Hàm đổi thuần túy: value × (from/to) theo hệ số base.
  const compute = (v: string, f: string, t: string, k: string): number | null => {
    const num = toNum(v);
    const table = FACTORS[k] ?? {};
    const ff = table[f] ?? 0;
    const tt = table[t] ?? 0;
    if (num === null || ff <= 0 || tt <= 0) return null;
    return (num * ff) / tt;
  };

  // Tính realtime với debounce 300ms.
  useEffect(() => {
    const t = setTimeout(() => setResult(compute(valStr, from, to, kind)), 300);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valStr, from, to, kind]);

  // Bấm Tính: tính ngay + lưu lịch sử (không push trong debounce).
  const onCalculate = () => {
    const r = compute(valStr, from, to, kind);
    setResult(r);
    if (r !== null) {
      push({
        toolId: 'unit-converter',
        toolName: `Đổi đơn vị ${kind}`,
        inputs: { kind, value: toNum(valStr) ?? 0, from, to },
        outputs: { result: r },
      });
    }
  };

  const onReset = () => {
    setValStr('');
    setResult(null);
  };

  // Converter chấp nhận cả số âm (nhiệt chênh lệch...) nên chỉ báo lỗi khi không phải số.
  const errVal = valStr.trim() === '' ? null : toNum(valStr) === null ? 'Giá trị phải là số hợp lệ' : null;
  const valid = result !== null && errVal === null;

  const selectCls = 'input-base mt-1.5';

  return (
    <div className="space-y-6">
      <FormulaBox
        formula="Giá trị đích = Giá trị nguồn × (hệ số nguồn / hệ số đích)"
        variables={[{ symbol: kind, name: 'Nhóm đại lượng đang đổi', unit: `${from} → ${to}` }]}
      />
      <div className="grid gap-6 lg:grid-cols-2">
        <SectionCard title="Thông số đầu vào" action={<HistoryDrawer toolId="unit-converter" />}>
          <div className="space-y-4">
            <div>
              <label htmlFor="uc-kind" className="label-base">Nhóm đại lượng</label>
              <select id="uc-kind" className={selectCls} value={kind} onChange={(e) => onKindChange(e.target.value)}>
                {kinds.map((k) => (
                  <option key={k} value={k}>{k}</option>
                ))}
              </select>
            </div>
            <CalcInput id="uc-val" label="Giá trị" placeholder="vd: 100" value={valStr} onChange={(e) => setValStr(e.target.value)} error={errVal} />
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="uc-from" className="label-base">Từ đơn vị</label>
                <select id="uc-from" className={selectCls} value={from} onChange={(e) => setFrom(e.target.value)}>
                  {units.map((u) => (
                    <option key={u} value={u}>{u}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="uc-to" className="label-base">Sang đơn vị</label>
                <select id="uc-to" className={selectCls} value={to} onChange={(e) => setTo(e.target.value)}>
                  {units.map((u) => (
                    <option key={u} value={u}>{u}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <button type="button" className="btn-primary" onClick={onCalculate}>Tính</button>
              <ResetButton onReset={onReset} />
            </div>
          </div>
        </SectionCard>
        <SectionCard title="Kết quả">
          {valid && result !== null ? (
            <CalcResult label={`Kết quả (${to})`} value={formatNumber(result)} unit={to} />
          ) : (
            <p className="text-sm text-muted">Nhập giá trị số để xem kết quả realtime.</p>
          )}
        </SectionCard>
      </div>
      <SectionCard title="Hướng dẫn & ví dụ">
        <p className="text-sm leading-relaxed text-secondary">
          Ví dụ: 100 m/min → ft/min ≈ 328.084; 1 inch = 25.4 mm; 1 HP = 745.7 W.
        </p>
      </SectionCard>
    </div>
  );
}
