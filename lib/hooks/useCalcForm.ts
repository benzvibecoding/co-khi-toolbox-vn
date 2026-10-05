'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Quan ly form calculator: inputs dang string + debounce 300ms.
 * Tra ve [values, setField, reset].
 */
export function useCalcForm<T extends Record<string, string>>(initial: T) {
  const [values, setValues] = useState<T>(initial);
  const setField = (key: keyof T, v: string) =>
    setValues((prev) => ({ ...prev, [key]: v }));
  const reset = () => setValues(initial);
  return { values, setField, reset };
}

/** Parse so tu input (chap nhan dau phay). Null neu rong/khong hop le. */
export function num(raw: string): number | null {
  const s = raw.trim().replace(',', '.');
  if (s === '' || s === '-' || s === '.') return null;
  const n = Number(s);
  return Number.isFinite(n) ? n : null;
}

/** validation > 0, tra ve loi tieng Viet hoac null. */
export function errPositive(v: number | null, label: string): string | null {
  if (v === null) return `${label} phải là số hợp lệ`;
  if (v <= 0) return `${label} phải lớn hơn 0`;
  return null;
}

/** Debounce 300ms: goi onChange sau khi values dung thay doi. */
export function useDebouncedEffect(values: unknown, fn: () => void, delay = 300): void {
  const ref = useRef(fn);
  ref.current = fn;
  useEffect(() => {
    const t = window.setTimeout(() => ref.current(), delay);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values, delay]);
}
