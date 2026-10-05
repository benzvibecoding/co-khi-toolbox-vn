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

type Shape = 'tru' | 'hop';

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

/** Tính thể tích V (cm³) và khối lượng m (kg) cho phôi trụ/hộp. */
export function MassCalc() {
  const [shape, setShape] = useState<Shape>('tru');
  const [dStr, setDStr] = useState('');
  const [lenStr, setLenStr] = useState('');
  const [wStr, setWStr] = useState('');
  const [hStr, setHStr] = useState('');
  const [rhoStr, setRhoStr] = useState('7.85');
  const [vol, setVol] = useState<number | null>(null);
  const [mass, setMass] = useState<number | null>(null);
  const { push } = useCalculatorHistory('mass');

  // Hàm tính thuần túy (V cm³, m kg), dùng chung debounce + nút Tính.
  const compute = (): { v: number | null; m: number | null } => {
    const rho = toNum(rhoStr);
    if (rho === null || rho <= 0) return { v: null, m: null };
    let v: number | null = null;
    if (shape === 'tru') {
      const d = toNum(dStr);
      const l = toNum(lenStr);
      if (d === null || d <= 0 || l === null || l <= 0) return { v: null, m: null };
      // mm³ → cm³ chia 1000.
      v = ((Math.PI * d * d) / 4) * l / 1000;
    } else {
      const l = toNum(lenStr);
      const w = toNum(wStr);
      const h = toNum(hStr);
      if (l === null || l <= 0 || w === null || w <= 0 || h === null || h <= 0) return { v: null, m: null };
      v = (l * w * h) / 1000;
    }
    // g/cm³ × cm³ = g → kg chia 1000.
    return { v, m: (v * rho) / 1000 };
  };

  // Tính realtime với debounce 300ms.
  useEffect(() => {
    const t = setTimeout(() => {
      const r = compute();
      setVol(r.v);
      setMass(r.m);
    }, 300);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shape, dStr, lenStr, wStr, hStr, rhoStr]);

  // Bấm Tính: tính ngay + lưu lịch sử (không push trong debounce).
  const onCalculate = () => {
    const r = compute();
    setVol(r.v);
    setMass(r.m);
    if (r.v !== null && r.m !== null) {
      push({
        toolId: 'mass',
        toolName: shape === 'tru' ? 'Khối lượng phôi trụ' : 'Khối lượng phôi hộp',
        inputs: shape === 'tru'
          ? { shape, D: toNum(dStr) ?? 0, L: toNum(lenStr) ?? 0, rho: toNum(rhoStr) ?? 0 }
          : { shape, L: toNum(lenStr) ?? 0, W: toNum(wStr) ?? 0, H: toNum(hStr) ?? 0, rho: toNum(rhoStr) ?? 0 },
        outputs: { V: r.v, m: r.m },
      });
    }
  };

  const onReset = () => {
    setDStr('');
    setLenStr('');
    setWStr('');
    setHStr('');
    setRhoStr('7.85');
    setVol(null);
    setMass(null);
  };

  const errs = shape === 'tru'
    ? [errPositive(dStr, 'Đường kính D'), errPositive(lenStr, 'Chiều dài L'), errPositive(rhoStr, 'Khối lượng riêng ρ')]
    : [errPositive(lenStr, 'Dài L'), errPositive(wStr, 'Rộng W'), errPositive(hStr, 'Cao H'), errPositive(rhoStr, 'Khối lượng riêng ρ')];
  const valid = vol !== null && mass !== null && errs.every((e) => e === null);

  return (
    <div className="space-y-6">
      <FormulaBox
        formula={shape === 'tru' ? 'V = (π × D² / 4) × L  ;  m = V × ρ' : 'V = L × W × H  ;  m = V × ρ'}
        variables={[
          { symbol: 'V', name: 'Thể tích', unit: 'cm³' },
          { symbol: 'm', name: 'Khối lượng', unit: 'kg' },
          { symbol: 'ρ', name: 'Khối lượng riêng', unit: 'g/cm³' },
        ]}
      />
      <div className="grid gap-6 lg:grid-cols-2">
        <SectionCard title="Thông số đầu vào" action={<HistoryDrawer toolId="mass" />}>
          <div className="space-y-4">
            <UnitToggle<Shape>
              options={['tru', 'hop'] as const}
              value={shape}
              onChange={setShape}
              labels={{ tru: 'Phôi trụ', hop: 'Phôi hộp' }}
              ariaLabel="Chọn hình dạng phôi"
            />
            {shape === 'tru' ? (
              <>
                <CalcInput id="mass-d" label="Đường kính D" unit="mm" placeholder="vd: 50" value={dStr} onChange={(e) => setDStr(e.target.value)} error={errs[0]} />
                <CalcInput id="mass-l" label="Chiều dài L" unit="mm" placeholder="vd: 200" value={lenStr} onChange={(e) => setLenStr(e.target.value)} error={errs[1]} />
              </>
            ) : (
              <>
                <CalcInput id="mass-l" label="Dài L" unit="mm" placeholder="vd: 200" value={lenStr} onChange={(e) => setLenStr(e.target.value)} error={errs[0]} />
                <CalcInput id="mass-w" label="Rộng W" unit="mm" placeholder="vd: 100" value={wStr} onChange={(e) => setWStr(e.target.value)} error={errs[1]} />
                <CalcInput id="mass-h" label="Cao H" unit="mm" placeholder="vd: 50" value={hStr} onChange={(e) => setHStr(e.target.value)} error={errs[2]} />
              </>
            )}
            <CalcInput id="mass-rho" label="Khối lượng riêng ρ" unit="g/cm³" placeholder="7.85" hint="Thép 7.85 — nhôm 2.7 — đồng 8.96" value={rhoStr} onChange={(e) => setRhoStr(e.target.value)} error={errs[errs.length - 1]} />
            <div className="flex flex-wrap gap-3">
              <button type="button" className="btn-primary" onClick={onCalculate}>Tính</button>
              <ResetButton onReset={onReset} />
            </div>
          </div>
        </SectionCard>
        <SectionCard title="Kết quả">
          {valid && vol !== null && mass !== null ? (
            <CalcResult
              label="Khối lượng m"
              value={formatNumber(mass)}
              unit="kg"
              secondary={[{ label: 'Thể tích V', value: `${formatNumber(vol)} cm³` }]}
            />
          ) : (
            <p className="text-sm text-muted">Nhập đủ kích thước dương để xem kết quả realtime.</p>
          )}
        </SectionCard>
      </div>
      <SectionCard title="Hướng dẫn & ví dụ">
        <p className="text-sm leading-relaxed text-secondary">
          Ví dụ phôi trụ thép: D = 50 mm, L = 200 mm, ρ = 7.85 g/cm³ → V ≈ 392.7 cm³, m ≈ 3.083 kg.
        </p>
      </SectionCard>
    </div>
  );
}
