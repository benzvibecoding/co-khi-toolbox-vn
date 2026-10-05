'use client';

import { createContext, useCallback, useContext, useMemo } from 'react';
import type { ReactNode } from 'react';
import { useLocalStorage } from '@/lib/hooks/useLocalStorage';
import type { UnitSystem } from '@/types/calculator';

const UNIT_SYSTEM_KEY = 'ckh_unit_system';

interface UnitSystemContextValue {
  system: UnitSystem;
  setSystem: (s: UnitSystem) => void;
  toggle: () => void;
  isMetric: boolean;
}

const UnitSystemContext = createContext<UnitSystemContextValue | null>(null);

/** Provider he don vi toan site (metric | imperial). */
export function UnitSystemProvider({ children }: { children: ReactNode }) {
  const [system, setStored] = useLocalStorage<UnitSystem>(UNIT_SYSTEM_KEY, 'metric');

  const setSystem = useCallback((s: UnitSystem) => setStored(s), [setStored]);
  const toggle = useCallback(
    () => setStored((prev) => (prev === 'metric' ? 'imperial' : 'metric')),
    [setStored],
  );

  const value = useMemo<UnitSystemContextValue>(
    () => ({ system, setSystem, toggle, isMetric: system === 'metric' }),
    [system, setSystem, toggle],
  );

  return <UnitSystemContext.Provider value={value}>{children}</UnitSystemContext.Provider>;
}

/** Hook doc he don vi hien tai. */
export function useUnitSystem(): UnitSystemContextValue {
  const ctx = useContext(UnitSystemContext);
  if (!ctx) throw new Error('useUnitSystem phải dùng trong <UnitSystemProvider>');
  return ctx;
}
