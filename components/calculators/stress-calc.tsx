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

/** Tính ứng suất kéo/nén σ (MPa) và biến dạng tương đối ε (tùy chọn). */
export function StressCalc() {
  const [fStr, setFStr] = useState('');
  const [aStr, setAStr] = useState('');
  const [dlStr, setDlStr] = useState('');
  const [l0Str, setL0Str] = useState('');
  const [sigma, setSigma] = useState<number | null>(null);
  const [epsilon, setEpsilon] = useState<number | null>(null);
  const { push } = useCalculatorHistory('stress');

  // Hàm tính σ thuần túy, dùng chung cho debounce và nút Tính.
  const computeSigma = (f: string, a: string): number | null => {
    const fv = toNum(f);
    const av = toNum(a);
    if (fv === null || fv <= 0 || av === null || av <= 0) return null;
    return fv / av;
  };

  // Hàm tính ε thuần túy (optional, có thể null).
  const computeEpsilon = (dl: string, l0: string): number | null => {
    if (dl.trim() === '' && l0.trim() === '') return null;
    const d = toNum(dl);
    const l = toNum(l0);
    if (d === null || d < 0 || l === null || l <= 0) return null;
    return d / l;
  };

  // Tính realtime với debounce 300ms.
  useEffect(() => {
    const t = setTimeout(() => {
      setSigma(computeSigma(fStr, aStr));
      setEpsilon(computeEpsilon(dlStr, l0Str));
    }, 300);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fStr, aStr, dlStr, l0Str]);

  // Bấm Tính: tính ngay + lưu lịch sử (không push trong debounce).
  const onCalculate = () => {
    const s = computeSigma(fStr, aStr);
    const e = computeEpsilon(dlStr, l0Str);
    setSigma(s);
    setEpsilon(e);
    if (s !== null) {
      push({
        toolId: 'stress',
        toolName: 'Ứng suất kéo/nén',
        inputs: { F: toNum(fStr) ?? 0, A: toNum(aStr) ?? 0 },
        outputs: e !== null ? { sigma: s, epsilon: e } : { sigma: s },
      });
    }
  };

  const onReset = () => {
    setFStr('');
    setAStr('');
    setDlStr('');
    setL0Str('');
    setSigma(null);
    setEpsilon(null);
  };

  const errF = errPositive(fStr, 'Lực F');
  const errA = errPositive(aStr, 'Diện tích A');
  // Biến dạng ε: cho phép để trống, nhưng nếu nhập phải hợp lệ.
  const errDl = dlStr.trim() === '' ? null : (() => {
    const v = toNum(dlStr);
    if (v === null) return 'ΔL phải là số hợp lệ';
    if (v < 0) return 'ΔL không được âm';
    return null;
  })();
  const errL0 = l0Str.trim() === '' ? null : errPositive(l0Str, 'Chiều dài L0');
  const valid = sigma !== null && !errF && !errA;

  return (
    <div className="space-y-6">
      <FormulaBox
        formula="σ = F / A  ;  ε = ΔL / L0"
        variables={[
          { symbol: 'σ', name: 'Ứng suất', unit: 'MPa (N/mm²)' },
          { symbol: 'F', name: 'Lực kéo/nén', unit: 'N' },
          { symbol: 'A', name: 'Diện tích mặt cắt', unit: 'mm²' },
          { symbol: 'ε', name: 'Biến dạng tương đối', unit: 'không thứ nguyên' },
        ]}
      />
      <div className="grid gap-6 lg:grid-cols-2">
        <SectionCard title="Thông số đầu vào" action={<HistoryDrawer toolId="stress" />}>
          <div className="space-y-4">
            <CalcInput id="st-f" label="Lực F" unit="N" placeholder="vd: 10000" value={fStr} onChange={(e) => setFStr(e.target.value)} error={errF} />
            <CalcInput id="st-a" label="Diện tích A" unit="mm²" placeholder="vd: 100" hint="Diện tích mặt cắt chịu lực" value={aStr} onChange={(e) => setAStr(e.target.value)} error={errA} />
            <div className="flex flex-wrap gap-3">
              <button type="button" className="btn-primary" onClick={onCalculate}>Tính</button>
              <ResetButton onReset={onReset} />
            </div>
          </div>
        </SectionCard>
        <SectionCard title="Kết quả">
          {valid && sigma !== null ? (
            <CalcResult
              label="Ứng suất σ"
              value={formatNumber(sigma)}
              unit="MPa"
              secondary={epsilon !== null ? [{ label: 'Biến dạng ε', value: formatNumber(epsilon) }] : []}
              note="So sánh σ với giới hạn bền/chảy của vật liệu và chia cho hệ số an toàn trước khi kết luận."
            />
          ) : (
            <p className="text-sm text-muted">Nhập lực F và diện tích A dương để xem kết quả realtime.</p>
          )}
        </SectionCard>
      </div>
      <SectionCard title="Biến dạng ε (tùy chọn)">
        <div className="grid gap-4 sm:grid-cols-2">
          <CalcInput id="st-dl" label="Độ giãn ΔL" unit="mm" placeholder="vd: 0,5" value={dlStr} onChange={(e) => setDlStr(e.target.value)} error={errDl} />
          <CalcInput id="st-l0" label="Chiều dài ban đầu L0" unit="mm" placeholder="vd: 200" value={l0Str} onChange={(e) => setL0Str(e.target.value)} error={errL0} />
        </div>
      </SectionCard>
      <SectionCard title="Hướng dẫn & ví dụ">
        <p className="text-sm leading-relaxed text-secondary">
          Ví dụ: F = 10000 N kéo thanh tiết diện A = 100 mm² → σ = 100 MPa.
          So với thép C45 (giới hạn chảy ≈ 340 MPa) thì còn an toàn nếu hệ số an toàn ≥ 2.
        </p>
      </SectionCard>
    </div>
  );
}
