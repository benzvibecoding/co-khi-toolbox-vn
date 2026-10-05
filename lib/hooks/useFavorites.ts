'use client';

import { useCallback } from 'react';
import { useLocalStorage } from '@/lib/hooks/useLocalStorage';

const FAVORITES_KEY = 'ckh_favorites';

/** Quan ly danh sach cong cu yeu thich (luu localStorage). */
export function useFavorites() {
  const [favorites, setFavorites] = useLocalStorage<string[]>(FAVORITES_KEY, []);

  const toggle = useCallback(
    (toolId: string) => {
      setFavorites((prev) =>
        prev.includes(toolId) ? prev.filter((id) => id !== toolId) : [...prev, toolId],
      );
    },
    [setFavorites],
  );

  const isFavorite = useCallback((toolId: string) => favorites.includes(toolId), [favorites]);

  return { favorites, toggle, isFavorite };
}
