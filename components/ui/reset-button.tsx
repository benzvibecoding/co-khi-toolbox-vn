'use client';

import { RotateCcw } from 'lucide-react';

/** Nut xoa toan bo form calculator ve mac dinh. */
export function ResetButton({ onReset, label = 'Đặt lại' }: { onReset: () => void; label?: string }) {
  return (
    <button type="button" onClick={onReset} className="btn-ghost">
      <RotateCcw size={15} aria-hidden />
      {label}
    </button>
  );
}
