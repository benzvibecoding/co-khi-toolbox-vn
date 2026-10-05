import type { CalculationRecord } from '@/types/calculator';

/** Chuyen 1 record lich su thanh 1 hang CSV phang (inputs/outputs JSON). */
export function recordsToCSV(records: CalculationRecord[]): string {
  const header = 'thoi_gian,cong_cu,inputs,outputs';
  const esc = (s: string) => `"${s.replace(/"/g, '""')}"`;
  const rows = records.map((r) =>
    [
      new Date(r.timestamp).toLocaleString('vi-VN'),
      r.toolName,
      JSON.stringify(r.inputs),
      JSON.stringify(r.outputs),
    ].map(esc).join(','),
  );
  return ['\uFEFF' + header, ...rows].join('\n');
}

/** Tai file CSV ve may (them BOM de Excel hien thi tieng Viet dung). */
export function downloadCSV(filename: string, records: CalculationRecord[]): void {
  const blob = new Blob([recordsToCSV(records)], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename.endsWith('.csv') ? filename : `${filename}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
