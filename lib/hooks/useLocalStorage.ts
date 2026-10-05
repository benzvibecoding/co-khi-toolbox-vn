'use client';

import { useCallback, useState } from 'react';

/**
 * Hook doc/ghi localStorage an toan (tranh loi SSR + JSON hong).
 * Tra ve [value, setValue] tuong tu useState.
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [stored, setStored] = useState<T>(() => {
    if (typeof window === 'undefined') return initialValue;
    try {
      const raw = window.localStorage.getItem(key);
      return raw !== null ? (JSON.parse(raw) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      setStored((prev) => {
        const next = value instanceof Function ? value(prev) : value;
        try {
          window.localStorage.setItem(key, JSON.stringify(next));
        } catch {
          // Bo qua loi quota — khong lam vo app
        }
        return next;
      });
    },
    [key],
  );

  return [stored, setValue] as const;
}
