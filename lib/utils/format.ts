/**
 * Format so ket qua theo quy tac Phase 1:
 * - Toi da 4 chu so thap phan, bo so 0 thua cuoi.
 * - Tra ve "Không hợp lệ" khi Infinity / NaN.
 */

/** Format so thanh chuoi hien thi tieng Viet (giữ dấu chấm thập phân cho mono font). */
export function formatNumber(value: number, maxDecimals = 4): string {
  if (!Number.isFinite(value)) return 'Không hợp lệ';
  // Lam tron toi maxDecimals roi loai bo so 0 thua
  const rounded = Number(value.toFixed(maxDecimals));
  if (!Number.isFinite(rounded)) return 'Không hợp lệ';
  return String(rounded);
}

/** Format so kem don vi, vd: formatWithUnit(125.6, 'm/min') -> "125.6 m/min". */
export function formatWithUnit(value: number, unit: string, maxDecimals = 4): string {
  if (!unit) return formatNumber(value, maxDecimals);
  return `${formatNumber(value, maxDecimals)} ${unit}`;
}

/** Parse chuoi nhap lieu cua nguoi dung (chap nhan ca dau phay). */
export function parseInput(raw: string): number | null {
  const normalized = raw.trim().replace(',', '.');
  if (normalized === '' || normalized === '-' || normalized === '.') return null;
  const n = Number(normalized);
  return Number.isFinite(n) ? n : null;
}
