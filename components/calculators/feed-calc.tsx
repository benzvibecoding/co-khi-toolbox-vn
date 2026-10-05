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

// Chuyen chuoi nhap thanh so (chap nhan dau phay thap phan).
function toNum(raw: string): number | null {
  const t = raw.trim().replace(/,/g, '.');
  if (t === '') return null;
  const v = parseFloat(t);
  return Number.isFinite(v) ? v : null;
}

// Loi inline khi da nhap ma gia tri khong > 0.
function errPositive(raw: string, label: string): string | null {
  if (raw.trim() === '') return null;
  const v = toNum(raw);
  if (v === null) return `${label} phải là số hợp lệ`;
  if (v <= 0) return `${label} phải lớn hơn 0`;
  return null;
}

/** Tinh luong chay dao Vf (mm/min) hoac chip load fz (mm/rang). */
export function FeedCalc({ mode }: { mode: 'vf' | 'fz' }) {
  const [xStr, setXStr] = useState('');
  const [zStr, setZStr] = useState('4');
  const [nStr, setNStr] = useState('');
  const [result, setResult] = useState<number | null>(null);
  const isVf = mode === 'vf';
  const toolId = isVf ? 'luong-chay-dao' : 'chip-load';
  const toolName = isVf ? 'Lượng chạy dao Vf' : 'Chip load fz';
  const formula = isVf ? 'Vf = fz × z × n' : 'fz = Vf / (z × n)';
  const { push } = useCalculatorHistory(toolId);

  // Ham tinh thuan, dung chung cho debounce va nut Tinh.
  const compute = (): number | null => {
    const x = toNum(xStr);
    const z = toNum(zStr);
    const n = toNum(nStr);
    if (x === null || x <= 0 || z === null || z <= 0 || n === null || n <= 0) return null;
    if (isVf) return x * z * n;
    return x / (z * n);
  };

  // Tinh realtime voi debounce 300ms.
  useEffect(() => {
    const t = setTimeout(() => setResult(compute()), 300);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [xStr, zStr, nStr, mode]);

  // Bam Tinh: tinh ngay + luu lich su (khong push trong debounce).
  const onCalculate = () => {
    const r = compute();
    setResult(r);
    if (r !== null) {
      if (isVf) {
        push({ toolId, toolName, inputs: { fz: toNum(xStr) ?? 0, z: toNum(zStr) ?? 0, n: toNum(nStr) ?? 0 }, outputs: { Vf: r } });
      } else {
        push({ toolId, toolName, inputs: { Vf: toNum(xStr) ?? 0, z: toNum(zStr) ?? 0, n: toNum(nStr) ?? 0 }, outputs: { fz: r } });
      }
    }
  };

  const onReset = () => {
    setXStr('');
    setZStr('4');
    setNStr('');
    setResult(null);
  };

  const labelX = isVf ? 'Chip load fz' : 'Lượng chạy dao Vf';
  const errs = [errPositive(xStr, labelX), errPositive(zStr, 'Số lưỡi z'), errPositive(nStr, 'Vòng quay n')];
  const valid = result !== null && errs.every((e) => e === null);

  return (
    <div className="space-y-6">
      <FormulaBox
        formula={formula}
        variables={[
          { symbol: 'Vf', name: 'Lượng chạy dao', unit: 'mm/min' },
          { symbol: 'fz', name: 'Chip load', unit: 'mm/răng' },
          { symbol: 'z', name: 'Số lưỡi cắt', unit: 'răng' },
          { symbol: 'n', name: 'Vòng quay', unit: 'RPM' },
        ]}
      />
      <div className="grid gap-6 lg:grid-cols-2">
        <SectionCard title="Thông số đầu vào" action={<HistoryDrawer toolId={toolId} />}>
          <div className="space-y-4">
            <CalcInput id={isVf ? 'vf-fz' : 'fz-Vf'} label={labelX} unit={isVf ? 'mm/răng' : 'mm/min'} placeholder={isVf ? 'VD: 0.1' : 'VD: 800'} tooltip={isVf ? 'Lượng ăn dao mỗi răng. Dao nhỏ chọn 0.02-0.05, dao lớn 0.1-0.2.' : undefined} value={xStr} onChange={(e) => setXStr(e.target.value)} error={errs[0]} />
            <CalcInput id="feed-z" label="Số lưỡi cắt z" unit="răng" placeholder="VD: 4" value={zStr} onChange={(e) => setZStr(e.target.value)} error={errs[1]} />
            <CalcInput id="feed-n" label="Vòng quay n" unit="RPM" placeholder="VD: 2000" value={nStr} onChange={(e) => setNStr(e.target.value)} error={errs[2]} />
            <div className="flex flex-wrap gap-3">
              <button type="button" className="btn-primary" onClick={onCalculate}>Tính</button>
              <ResetButton onReset={onReset} />
            </div>
          </div>
        </SectionCard>
        <SectionCard title="Kết quả">
          {valid && result !== null ? (
            <CalcResult
              label={isVf ? 'Lượng chạy dao Vf' : 'Chip load fz'}
              value={formatNumber(result, isVf ? 2 : 4)}
              unit={isVf ? 'mm/min' : 'mm/răng'}
              note="fz quá nhỏ gây chai dao, quá lớn gây gãy. Giữ trong dải hãng dao khuyến nghị."
            />
          ) : (
            <p className="text-sm text-muted">Nhập đủ thông số dương để xem kết quả realtime.</p>
          )}
        </SectionCard>
      </div>
      <SectionCard title="Hướng dẫn & ví dụ">
        <p className="text-sm leading-relaxed text-secondary">
          {isVf ? 'Ví dụ: fz = 0.1, z = 4, n = 2000 → Vf = 800 mm/min.' : 'Ví dụ: Vf = 800, z = 4, n = 2000 → fz = 0.1 mm/răng.'}
        </p>
      </SectionCard>
    </div>
  );
}
