'use client';

import { Star } from 'lucide-react';
import { useFavorites } from '@/lib/hooks/useFavorites';

/** Danh dau yeu thich cong cu — hien tai o sidebar + trang chu. */
export function FavoriteToggle({ toolId, toolName }: { toolId: string; toolName: string }) {
  const { toggle, isFavorite } = useFavorites();
  const active = isFavorite(toolId);

  return (
    <button
      type="button"
      onClick={() => toggle(toolId)}
      aria-pressed={active}
      aria-label={active ? `Bỏ yêu thích ${toolName}` : `Yêu thích ${toolName}`}
      title={active ? 'Bỏ yêu thích' : 'Thêm vào yêu thích'}
      className={`inline-flex h-7 w-7 items-center justify-center rounded-badge border transition-colors ${
        active ? 'text-warning' : 'text-muted hover:text-primary'
      }`}
      style={{ borderColor: 'var(--border-default)' }}
    >
      <Star size={14} aria-hidden fill={active ? 'currentColor' : 'none'} />
    </button>
  );
}
