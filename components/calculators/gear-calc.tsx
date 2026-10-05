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

interface GearOut { d: number; da: number; df: number; h: number; a: number | null }

/** Tính thông số bánh răng trụ răng thẳng: d, da, df, h và khoảng cách trục. */
export function GearCalc() {
  const [mStr, setMStr] = useState('');
  const [zStr, setZStr] = useState('');
  const [z2Str, setZ2Str] = useState('');
  const [result, setResult] = useState<GearOut | null>(null);
  const { push } = useCalculatorHistory('gear');

  // Hàm tính thuần túy, dùng chung cho debounce và nút Tính.
  const compute = (): GearOut | null => {
    const m = toNum(mStr);
    const z = toNum(zStr);
    if (m === null || m <= 0 || z === null || z <= 0) return null;
    const zi = Math.round(z);
    // z2 tùy chọn: để trống thì không tính khoảng cách trục.
    let a: number | null = null;
    if (z2Str.trim() !== '') {
      const z2 = toNum(z2Str);
      if (z2 === null || z2 <= 0) return null;
      a = (m * (zi + Math.round(z2))) / 2;
    }
    return { d: m * zi, da: (zi + 2) * m, df: (zi - 2.5) * m, h: 2.25 * m, a };
  };

  // Tính realtime với debounce 300ms.
  useEffect(() => {
    const t = setTimeout(() => setResult(compute()), 300);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mStr, zStr, z2Str]);

  // Bấm Tính: tính ngay + lưu lịch sử (không push trong debounce).
  const onCalculate = () => {
    const r = compute();
    setResult(r);
    if (r !== null) {
      push({
        toolId: 'gear',
        toolName: 'Bánh răng trụ răng thẳng',
        inputs: { m: toNum(mStr) ?? 0, z: toNum(zStr) ?? 0, z2: z2Str.trim() === '' ? '' : (toNum(z2Str) ?? 0) },
        outputs: { d: r.d, da: r.da, df: r.df, h: r.h, a: r.a ?? '' },
      });
    }
  };

  const onReset = () => {
    setMStr('');
    setZStr('');
    setZ2Str('');
    setResult(null);
  };

  const errM = errPositive(mStr, 'Module m');
  const errZ = errPositive(zStr, 'Số răng z');
  const errZ2 = z2Str.trim() === '' ? null : errPositive(z2Str, 'Số răng z2');
  const valid = result !== null && !errM && !errZ && !errZ2;

  return (
    <div className="space-y-6">
      <FormulaBox
        formula="d = m×z ; da = (z+2)×m ; df = (z−2.5)×m ; h = 2.25×m ; a = m×(z1+z2)/2"
        variables={[
          { symbol: 'm', name: 'Module', unit: 'mm' },
          { symbol: 'z', name: 'Số răng', unit: 'răng' },
          { symbol: 'd', name: 'Vòng chia', unit: 'mm' },
          { symbol: 'a', name: 'Khoảng cách trục', unit: 'mm' },
        ]}
      />
      <div className="grid gap-6 lg:grid-cols-2">
        <SectionCard title="Thông số đầu vào" action={<HistoryDrawer toolId="gear" />}>
          <div className="space-y-4">
            <CalcInput id="gr-m" label="Module m" unit="mm" placeholder="vd: 2" hint="Module tiêu chuẩn (1 — 1.5 — 2 — 2.5...)" value={mStr} onChange={(e) => setMStr(e.target.value)} error={errM} />
            <CalcInput id="gr-z" label="Số răng z" unit="răng" placeholder="vd: 20" value={zStr} onChange={(e) => setZStr(e.target.value)} error={errZ} />
            <CalcInput id="gr-z2" label="Số răng bánh 2 z2 (tùy chọn)" unit="răng" placeholder="vd: 40" hint="Nhập để tính khoảng cách trục a" value={z2Str} onChange={(e) => setZ2Str(e.target.value)} error={errZ2} />
            <div className="flex flex-wrap gap-3">
              <button type="button" className="btn-primary" onClick={onCalculate}>Tính</button>
              <ResetButton onReset={onReset} />
            </div>
          </div>
        </SectionCard>
        <SectionCard title="Kết quả">
          {valid && result !== null ? (
            <CalcResult
              label="Đường kính vòng chia d"
              value={formatNumber(result.d)}
              unit="mm"
              secondary={[
                { label: 'Vòng đỉnh da', value: `${formatNumber(result.da)} mm` },
                { label: 'Vòng chân df', value: `${formatNumber(result.df)} mm` },
                { label: 'Chiều cao răng h', value: `${formatNumber(result.h)} mm` },
                ...(result.a !== null ? [{ label: 'Khoảng cách trục a', value: `${formatNumber(result.a)} mm` }] : []),
              ]}
            />
          ) : (
            <p className="text-sm text-muted">Nhập module m và số răng z dương để xem kết quả realtime.</p>
          )}
        </SectionCard>
      </div>
      <SectionCard title="Hướng dẫn & ví dụ">
        <p className="text-sm leading-relaxed text-secondary">
          Ví dụ: m = 2, z = 20 → d = 40 mm, da = 44 mm, df = 35 mm, h = 4.5 mm.
          Thêm z2 = 40 → a = 60 mm.
        </p>
      </SectionCard>
    </div>
  );
}
