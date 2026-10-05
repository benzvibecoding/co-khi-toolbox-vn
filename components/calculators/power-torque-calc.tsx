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

/** Tính công suất cắt P (kW) hoặc mô-men xoắn T (N·m). */
export function PowerTorqueCalc({ mode }: { mode: 'power' | 'torque' }) {
  const [fcStr, setFcStr] = useState('');
  const [vcStr, setVcStr] = useState('');
  const [pStr, setPStr] = useState('');
  const [nStr, setNStr] = useState('');
  const [result, setResult] = useState<number | null>(null);
  const toolId = mode === 'power' ? 'cutting-power' : 'torque';
  const { push } = useCalculatorHistory(toolId);

  const isPower = mode === 'power';
  const toolName = isPower ? 'Công suất cắt P' : 'Mô-men xoắn T';
  const formula = isPower ? 'P = (Fc × Vc) / 60000' : 'T = (P × 9550) / n';

  // Hàm tính thuần túy, dùng chung cho debounce và nút Tính.
  const compute = (): number | null => {
    if (isPower) {
      const fc = toNum(fcStr);
      const vc = toNum(vcStr);
      if (fc === null || fc <= 0 || vc === null || vc <= 0) return null;
      return (fc * vc) / 60000;
    }
    const p = toNum(pStr);
    const n = toNum(nStr);
    if (p === null || p <= 0 || n === null || n <= 0) return null;
    return (p * 9550) / n;
  };

  // Tính realtime với debounce 300ms.
  useEffect(() => {
    const t = setTimeout(() => setResult(compute()), 300);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fcStr, vcStr, pStr, nStr, mode]);

  // Bấm Tính: tính ngay + lưu lịch sử (không push trong debounce).
  const onCalculate = () => {
    const r = compute();
    setResult(r);
    if (r !== null) {
      if (isPower) {
        push({ toolId, toolName, inputs: { Fc: toNum(fcStr) ?? 0, Vc: toNum(vcStr) ?? 0 }, outputs: { P: r } });
      } else {
        push({ toolId, toolName, inputs: { P: toNum(pStr) ?? 0, n: toNum(nStr) ?? 0 }, outputs: { T: r } });
      }
    }
  };

  const onReset = () => {
    setFcStr('');
    setVcStr('');
    setPStr('');
    setNStr('');
    setResult(null);
  };

  const errs = isPower
    ? [errPositive(fcStr, 'Lực cắt Fc'), errPositive(vcStr, 'Vận tốc cắt Vc')]
    : [errPositive(pStr, 'Công suất P'), errPositive(nStr, 'Vòng quay n')];
  const valid = result !== null && errs.every((e) => e === null);

  // Kết quả phụ: kW sang HP, hoặc N·m sang kgf·m.
  const secondary = valid && result !== null
    ? isPower
      ? [{ label: 'Đổi sang HP', value: `${formatNumber(result * 1.341)} HP` }]
      : [{ label: 'Đổi sang kgf·m', value: `${formatNumber(result / 9.80665)} kgf·m` }]
    : [];

  return (
    <div className="space-y-6">
      <FormulaBox
        formula={formula}
        variables={
          isPower
            ? [
                { symbol: 'P', name: 'Công suất cắt', unit: 'kW' },
                { symbol: 'Fc', name: 'Lực cắt chính', unit: 'N' },
                { symbol: 'Vc', name: 'Vận tốc cắt', unit: 'm/min' },
              ]
            : [
                { symbol: 'T', name: 'Mô-men xoắn', unit: 'N·m' },
                { symbol: 'P', name: 'Công suất', unit: 'kW' },
                { symbol: 'n', name: 'Vòng quay', unit: 'RPM' },
              ]
        }
      />
      <div className="grid gap-6 lg:grid-cols-2">
        <SectionCard title="Thông số đầu vào" action={<HistoryDrawer toolId={toolId} />}>
          <div className="space-y-4">
            {isPower ? (
              <>
                <CalcInput id="pow-fc" label="Lực cắt Fc" unit="N" placeholder="vd: 1500" hint="Lực cắt chính theo dynamometer" value={fcStr} onChange={(e) => setFcStr(e.target.value)} error={errs[0]} />
                <CalcInput id="pow-vc" label="Vận tốc cắt Vc" unit="m/min" placeholder="vd: 120" value={vcStr} onChange={(e) => setVcStr(e.target.value)} error={errs[1]} />
              </>
            ) : (
              <>
                <CalcInput id="tq-p" label="Công suất P" unit="kW" placeholder="vd: 5.5" value={pStr} onChange={(e) => setPStr(e.target.value)} error={errs[0]} />
                <CalcInput id="tq-n" label="Vòng quay n" unit="RPM" placeholder="vd: 1450" value={nStr} onChange={(e) => setNStr(e.target.value)} error={errs[1]} />
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
              label={isPower ? 'Công suất cắt P' : 'Mô-men xoắn T'}
              value={formatNumber(result)}
              unit={isPower ? 'kW' : 'N·m'}
              secondary={secondary}
              note={isPower ? 'Chọn động cơ lớn hơn kết quả khoảng 20–30% để có dự phòng.' : undefined}
            />
          ) : (
            <p className="text-sm text-muted">Nhập đủ thông số dương để xem kết quả realtime.</p>
          )}
        </SectionCard>
      </div>
      <SectionCard title="Hướng dẫn & ví dụ">
        <p className="text-sm leading-relaxed text-secondary">
          {isPower
            ? 'Ví dụ: Fc = 1500 N, Vc = 120 m/min → P = 3 kW (≈ 4.023 HP).'
            : 'Ví dụ: P = 5.5 kW, n = 1450 RPM → T ≈ 36.22 N·m.'}
        </p>
      </SectionCard>
    </div>
  );
}
