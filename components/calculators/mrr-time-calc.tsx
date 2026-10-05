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

/** Tinh MRR (cm³/min) hoac thoi gian gia cong Tm (phut). */
export function MrrTimeCalc({ mode }: { mode: 'mrr' | 'time' }) {
  const [aStr, setAStr] = useState('');
  const [bStr, setBStr] = useState('');
  const [cStr, setCStr] = useState('');
  const [result, setResult] = useState<number | null>(null);
  const isMrr = mode === 'mrr';
  const toolId = isMrr ? 'mrr' : 'thoi-gian-gia-cong';
  const toolName = isMrr ? 'Tốc độ bóc tách MRR' : 'Thời gian gia công';
  const formula = isMrr ? 'MRR = ap × ae × Vf / 1000' : 'Tm = L / Vf';
  const { push } = useCalculatorHistory(toolId);

  // Ham tinh thuan, dung chung cho debounce va nut Tinh.
  const compute = (): number | null => {
    if (isMrr) {
      const ap = toNum(aStr);
      const ae = toNum(bStr);
      const vf = toNum(cStr);
      if (ap === null || ap <= 0 || ae === null || ae <= 0 || vf === null || vf <= 0) return null;
      return (ap * ae * vf) / 1000;
    }
    const l = toNum(aStr);
    const vf = toNum(bStr);
    if (l === null || l <= 0 || vf === null || vf <= 0) return null;
    return l / vf;
  };

  // Tinh realtime voi debounce 300ms.
  useEffect(() => {
    const t = setTimeout(() => setResult(compute()), 300);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [aStr, bStr, cStr, mode]);

  // Bam Tinh: tinh ngay + luu lich su (khong push trong debounce).
  const onCalculate = () => {
    const r = compute();
    setResult(r);
    if (r !== null) {
      if (isMrr) {
        push({ toolId, toolName, inputs: { ap: toNum(aStr) ?? 0, ae: toNum(bStr) ?? 0, Vf: toNum(cStr) ?? 0 }, outputs: { MRR: r } });
      } else {
        push({ toolId, toolName, inputs: { L: toNum(aStr) ?? 0, Vf: toNum(bStr) ?? 0 }, outputs: { Tm: r } });
      }
    }
  };

  const onReset = () => {
    setAStr('');
    setBStr('');
    setCStr('');
    setResult(null);
  };

  const errs = isMrr
    ? [errPositive(aStr, 'Chiều sâu ap'), errPositive(bStr, 'Chiều rộng ae'), errPositive(cStr, 'Lượng chạy dao Vf')]
    : [errPositive(aStr, 'Chiều dài L'), errPositive(bStr, 'Lượng chạy dao Vf')];
  const valid = result !== null && errs.every((e) => e === null);

  // Ket qua phu: cm³/h hoac giay.
  const secondary =
    valid && result !== null
      ? isMrr
        ? [{ label: 'Đổi sang cm³/h', value: `${formatNumber(result * 60)} cm³/h` }]
        : [{ label: 'Đổi sang giây', value: `${formatNumber(result * 60, 1)} s` }]
      : [];

  return (
    <div className="space-y-6">
      <FormulaBox
        formula={formula}
        variables={
          isMrr
            ? [
                { symbol: 'MRR', name: 'Tốc độ bóc tách', unit: 'cm³/min' },
                { symbol: 'ap', name: 'Chiều sâu cắt', unit: 'mm' },
                { symbol: 'ae', name: 'Chiều rộng cắt', unit: 'mm' },
                { symbol: 'Vf', name: 'Lượng chạy dao', unit: 'mm/min' },
              ]
            : [
                { symbol: 'Tm', name: 'Thời gian', unit: 'min' },
                { symbol: 'L', name: 'Chiều dài hành trình', unit: 'mm' },
                { symbol: 'Vf', name: 'Lượng chạy dao', unit: 'mm/min' },
              ]
        }
      />
      <div className="grid gap-6 lg:grid-cols-2">
        <SectionCard title="Thông số đầu vào" action={<HistoryDrawer toolId={toolId} />}>
          <div className="space-y-4">
            {isMrr ? (
              <>
                <CalcInput id="mrr-ap" label="Chiều sâu cắt ap" unit="mm" placeholder="VD: 3" tooltip="Chiều sâu mỗi pass theo hướng trục dao." value={aStr} onChange={(e) => setAStr(e.target.value)} error={errs[0]} />
                <CalcInput id="mrr-ae" label="Chiều rộng cắt ae" unit="mm" placeholder="VD: 20" tooltip="Chiều rộng ăn dao theo hướng ngang." value={bStr} onChange={(e) => setBStr(e.target.value)} error={errs[1]} />
                <CalcInput id="mrr-Vf" label="Lượng chạy dao Vf" unit="mm/min" placeholder="VD: 800" value={cStr} onChange={(e) => setCStr(e.target.value)} error={errs[2]} />
              </>
            ) : (
              <>
                <CalcInput id="tm-L" label="Chiều dài hành trình L" unit="mm" placeholder="VD: 200" tooltip="Tổng quãng dao di chuyển, gồm cả vào/ra dao." value={aStr} onChange={(e) => setAStr(e.target.value)} error={errs[0]} />
                <CalcInput id="tm-Vf" label="Lượng chạy dao Vf" unit="mm/min" placeholder="VD: 800" value={bStr} onChange={(e) => setBStr(e.target.value)} error={errs[1]} />
              </>
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
              label={isMrr ? 'Tốc độ bóc tách MRR' : 'Thời gian gia công Tm'}
              value={formatNumber(result)}
              unit={isMrr ? 'cm³/min' : 'min'}
              secondary={secondary}
              note={isMrr ? 'Máy nhỏ ép MRR quá cao gây rung, sai số.' : 'Chưa gồm thời gian thay dao, gá đặt. Cộng thêm 15-25% khi báo giá.'}
            />
          ) : (
            <p className="text-sm text-muted">Nhập đủ thông số dương để xem kết quả realtime.</p>
          )}
        </SectionCard>
      </div>
      <SectionCard title="Hướng dẫn & ví dụ">
        <p className="text-sm leading-relaxed text-secondary">
          {isMrr ? 'Ví dụ: ap = 3, ae = 20, Vf = 800 → MRR = 48 cm³/min.' : 'Ví dụ: L = 200, Vf = 800 → Tm = 0.25 min (≈ 15 giây).'}
        </p>
      </SectionCard>
    </div>
  );
}
