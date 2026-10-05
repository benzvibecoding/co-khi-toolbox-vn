'use client';

import { useCallback, useEffect, useState } from 'react';
import type { CalculationRecord } from '@/types/calculator';
import { useProAccess } from '@/lib/hooks/useProAccess';
import { ProFeature } from '@/lib/hooks/useProAccess';

const FREE_LIMIT = 200;
const PRO_LIMIT = 5000;

function makeId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

/**
 * Lich su phep tinh — luu IndexedDB (Dexie), fallback localStorage khi IDB loi.
 * Pro (UNLIMITED_HISTORY): gioi han 5000 thay vi 200.
 * API giu nguyen: { records, allRecords, push, clear, remove, limit }.
 */
export function useCalculatorHistory(toolId?: string) {
  const [records, setRecords] = useState<CalculationRecord[]>([]);
  const { canAccess } = useProAccess();
  const limit = canAccess(ProFeature.UNLIMITED_HISTORY) ? PRO_LIMIT : FREE_LIMIT;

  // Tai lich su khi mount / doi toolId / doi goi Pro
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { getRecords } = await import('@/lib/db');
        const list = await getRecords(toolId, limit);
        if (!cancelled) setRecords(list);
      } catch {
        // Fallback: doc localStorage cu (Phase 1)
        try {
          const raw = window.localStorage.getItem('ckh_history');
          const parsed = raw ? (JSON.parse(raw) as CalculationRecord[]) : [];
          const filtered = toolId ? parsed.filter((r) => r.toolId === toolId) : parsed;
          if (!cancelled) setRecords(filtered.slice(0, limit));
        } catch {
          if (!cancelled) setRecords([]);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [toolId, limit]);

  const push = useCallback(
    async (record: Omit<CalculationRecord, 'id' | 'timestamp'>) => {
      const entry: CalculationRecord = { ...record, id: makeId(), timestamp: Date.now() };
      setRecords((prev) => [entry, ...prev].slice(0, limit));
      try {
        const { addRecord } = await import('@/lib/db');
        await addRecord(entry, limit);
      } catch {
        // Bo qua — da cap nhat state, dong bo IDB that bai khong vo app
      }
    },
    [limit],
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

  return { records, allRecords: records, push, clear, remove, limit };
}
