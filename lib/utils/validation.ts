/** Validate input so cho calculator — tra ve chuoi loi tieng Viet hoac null neu hop le. */

/** Kiem tra gia tri bat buoc > 0 (duong kinh, RPM, ...). */
export function validatePositive(value: number | null, label: string): string | null {
  if (value === null || Number.isNaN(value)) return `${label} phải là số hợp lệ`;
  if (value <= 0) return `${label} phải lớn hơn 0`;
  return null;
}

/** Kiem tra gia tri >= 0 (cho phep bang 0). */
export function validateNonNegative(value: number | null, label: string): string | null {
  if (value === null || Number.isNaN(value)) return `${label} phải là số hợp lệ`;
  if (value < 0) return `${label} không được âm`;
  return null;
}

/** Kiem tra tong quat: hop le khi la so huu han. */
export function isValidNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value);
}
