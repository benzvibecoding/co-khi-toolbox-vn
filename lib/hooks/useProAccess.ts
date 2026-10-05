'use client';

import { useCallback, useEffect, useState } from 'react';
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

/**
 * Quyet dinh quyen Pro — uu tien doc tu Supabase profiles.is_pro khi da dang nhap,
 * fallback ve co localStorage (de test) khi chua cau hinh auth.
 */
export function useProAccess() {
  const [localPro] = useLocalStorage<boolean>(PRO_KEY, false);
  const [serverPro, setServerPro] = useState<boolean | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      // Import dong de Supabase khong lot vao bundle chinh.
      const { createClient, isSupabaseConfigured } = await import('@/lib/supabase/client');
      if (!isSupabaseConfigured()) return;
      const supabase = createClient();
      if (!supabase) return;
      const { data: { user } } = await supabase.auth.getUser();
      if (!user || cancelled) {
        if (!cancelled) setServerPro(false);
        return;
      }
      const { data } = await supabase.from('profiles').select('is_pro').eq('id', user.id).single();
      if (!cancelled) setServerPro((data as { is_pro?: boolean } | null)?.is_pro === true);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const isPro = serverPro ?? localPro;

  const canAccess = useCallback(
    (_feature: ProFeature | string) => isPro,
    [isPro],
  );

  return { isPro, canAccess };
}
