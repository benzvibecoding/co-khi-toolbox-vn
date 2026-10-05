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

/** Tinh toc do cat Vc (m/min) hoac vong quay n (RPM). */
export function CuttingCalc({ mode }: { mode: 'vc' | 'rpm' }) {
  const [aStr, setAStr] = useState('');
  const [bStr, setBStr] = useState('');
  const [result, setResult] = useState<number | null>(null);
  const isVc = mode === 'vc';
  const toolId = isVc ? 'toc-do-cat' : 'rpm';
  const toolName = isVc ? 'Tốc độ cắt Vc' : 'Vòng quay trục chính';
  const formula = isVc ? 'Vc = (π × D × n) / 1000' : 'n = (1000 × Vc) / (π × D)';
  const { push } = useCalculatorHistory(toolId);

  // Ham tinh thuan, dung chung cho debounce va nut Tinh.
  const compute = (): number | null => {
    const a = toNum(aStr);
    const b = toNum(bStr);
    if (a === null || a <= 0 || b === null || b <= 0) return null;
    if (isVc) return (Math.PI * a * b) / 1000;
    return (1000 * a) / (Math.PI * b);
  };

  // Tinh realtime voi debounce 300ms.
  useEffect(() => {
    const t = setTimeout(() => setResult(compute()), 300);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [aStr, bStr, mode]);

  // Bam Tinh: tinh ngay + luu lich su (khong push trong debounce).
  const onCalculate = () => {
    const r = compute();
    setResult(r);
    if (r !== null) {
      if (isVc) {
        push({ toolId, toolName, inputs: { D: toNum(aStr) ?? 0, n: toNum(bStr) ?? 0 }, outputs: { Vc: r } });
      } else {
        push({ toolId, toolName, inputs: { Vc: toNum(aStr) ?? 0, D: toNum(bStr) ?? 0 }, outputs: { n: r } });
      }
    }
  };

  const onReset = () => {
    setAStr('');
    setBStr('');
    setResult(null);
  };

  const labelA = isVc ? 'Đường kính D' : 'Tốc độ cắt Vc';
  const labelB = isVc ? 'Số vòng quay n' : 'Đường kính D';
  const errs = [errPositive(aStr, labelA), errPositive(bStr, labelB)];
  const valid = result !== null && errs.every((e) => e === null);

  // Ket qua phu: ft/min hoac rps.
  const secondary =
    valid && result !== null
      ? isVc
        ? [{ label: 'Đổi sang ft/min', value: `${formatNumber(result * 3.28084)} ft/min` }]
        : [{ label: 'Đổi sang rps', value: `${formatNumber(result / 60)} rps` }]
      : [];

  return (
    <div className="space-y-6">
      <FormulaBox
        formula={formula}
        variables={
          isVc
            ? [
                { symbol: 'Vc', name: 'Tốc độ cắt', unit: 'm/min' },
                { symbol: 'D', name: 'Đường kính dao/phôi', unit: 'mm' },
                { symbol: 'n', name: 'Số vòng quay', unit: 'RPM' },
              ]
            : [
                { symbol: 'n', name: 'Số vòng quay', unit: 'RPM' },
                { symbol: 'Vc', name: 'Tốc độ cắt', unit: 'm/min' },
                { symbol: 'D', name: 'Đường kính dao/phôi', unit: 'mm' },
              ]
        }
      />
      <div className="grid gap-6 lg:grid-cols-2">
        <SectionCard title="Thông số đầu vào" action={<HistoryDrawer toolId={toolId} />}>
          <div className="space-y-4">
            <CalcInput id={isVc ? 'vc-D' : 'rpm-Vc'} label={labelA} unit={isVc ? 'mm' : 'm/min'} placeholder={isVc ? 'VD: 50' : 'VD: 120'} tooltip={isVc ? 'Đường kính dao phay hoặc phôi tiện (mm), phải > 0.' : 'Tra theo cặp vật liệu + dao. Thép S45C/carbide khoảng 100-160.'} value={aStr} onChange={(e) => setAStr(e.target.value)} error={errs[0]} />
            <CalcInput id={isVc ? 'vc-n' : 'rpm-D'} label={labelB} unit={isVc ? 'RPM' : 'mm'} placeholder={isVc ? 'VD: 800' : 'VD: 50'} value={bStr} onChange={(e) => setBStr(e.target.value)} error={errs[1]} />
            <div className="flex flex-wrap gap-3">
              <button type="button" className="btn-primary" onClick={onCalculate}>Tính</button>
              <ResetButton onReset={onReset} />
            </div>
          </div>
        </SectionCard>
        <SectionCard title="Kết quả">
          {valid && result !== null ? (
            <CalcResult
              label={isVc ? 'Tốc độ cắt Vc' : 'Vòng quay trục chính n'}
              value={formatNumber(result)}
              unit={isVc ? 'm/min' : 'RPM'}
              secondary={secondary}
              note={isVc ? 'Dao kêu rít hoặc phoi đổi màu → giảm Vc 15-20%.' : 'Đổi dao khác đường kính phải tính lại RPM để giữ Vc.'}
            />
          ) : (
            <p className="text-sm text-muted">Nhập đủ thông số dương để xem kết quả realtime.</p>
          )}
        </SectionCard>
      </div>
      <SectionCard title="Hướng dẫn & ví dụ">
        <p className="text-sm leading-relaxed text-secondary">
          {isVc ? 'Ví dụ: D = 50mm, n = 800 RPM → Vc = 125.66 m/min.' : 'Ví dụ: Vc = 120 m/min, D = 50mm → n = 763.94 RPM.'}
        </p>
      </SectionCard>
    </div>
  );
}
