'use client';

import { useCallback, useEffect, useState } from 'react';
import type { CalculationRecord } from '@/types/calculator';

const MAX_RECORDS = 200;

function makeId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

/**
 * Lich su phep tinh — luu IndexedDB (Dexie), fallback localStorage khi IDB loi.
 * API giu nguyen tu Phase 1: { records, allRecords, push, clear, remove }.
 */
export function useCalculatorHistory(toolId?: string) {
  const [records, setRecords] = useState<CalculationRecord[]>([]);

  // Tai lich su khi mount / doi toolId
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { getRecords } = await import('@/lib/db');
        const list = await getRecords(toolId, MAX_RECORDS);
        if (!cancelled) setRecords(list);
      } catch {
        // Fallback: doc localStorage cu (Phase 1)
        try {
          const raw = window.localStorage.getItem('ckh_history');
          const parsed = raw ? (JSON.parse(raw) as CalculationRecord[]) : [];
          const filtered = toolId ? parsed.filter((r) => r.toolId === toolId) : parsed;
          if (!cancelled) setRecords(filtered.slice(0, MAX_RECORDS));
        } catch {
          if (!cancelled) setRecords([]);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [toolId]);

  const push = useCallback(
    async (record: Omit<CalculationRecord, 'id' | 'timestamp'>) => {
      const entry: CalculationRecord = { ...record, id: makeId(), timestamp: Date.now() };
      setRecords((prev) => [entry, ...prev].slice(0, MAX_RECORDS));
      try {
        const { addRecord } = await import('@/lib/db');
        await addRecord(entry, MAX_RECORDS);
      } catch {
        // Bo qua — da cap nhat state, dong bo IDB that bai khong vo app
      }
    },
    [],
  );

  const clear = useCallback(async () => {
    setRecords([]);
    try {
      const { clearRecords } = await import('@/lib/db');
      await clearRecords(toolId);
    } catch {
      /* bo qua */
    }
  }, [toolId]);

  const remove = useCallback(async (id: string) => {
    setRecords((prev) => prev.filter((r) => r.id !== id));
    try {
      const { deleteRecord } = await import('@/lib/db');
      await deleteRecord(id);
    } catch {
      /* bo qua */
    }
  }, []);

  return { records, allRecords: records, push, clear, remove };
}
