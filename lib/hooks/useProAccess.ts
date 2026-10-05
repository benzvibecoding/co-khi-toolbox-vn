'use client';

import { useCallback } from 'react';
import { useLocalStorage } from '@/lib/hooks/useLocalStorage';

/** Cac tinh nang Pro (giai doan 2) — dinh nghia nen tang, chua thu phi o MVP. */
export enum ProFeature {
  EXPORT_PDF = 'export_pdf',
  EXPORT_CSV = 'export_csv',
  UNLIMITED_HISTORY = 'unlimited_history',
  ADVANCED_CNC = 'advanced_cnc',
  BATCH_CALCULATE = 'batch_calculate',
}

const PRO_KEY = 'ckh_pro';

/** Quyet dinh quyen Pro — MVP luon false, mo khoa bang localStorage khi test. */
export function useProAccess() {
  const [isPro] = useLocalStorage<boolean>(PRO_KEY, false);

  const canAccess = useCallback(
    (_feature: ProFeature | string) => isPro,
    [isPro],
  );

  return { isPro, canAccess };
}
