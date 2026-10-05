'use client';

import { useState } from 'react';
import { HelpCircle } from 'lucide-react';

interface TooltipProps {
  content: string;
}

/** Giai thich thuat ngu ky thuat khi hover/focus — CSS-only, khong lib nang. */
export function Tooltip({ content }: TooltipProps) {
  const [open, setOpen] = useState(false);
  return (
    <span
      className="relative inline-flex"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        aria-label={`Giải thích: ${content}`}
        aria-expanded={open}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-4 w-4 items-center justify-center rounded-full text-muted transition-colors hover:text-primary"
      >
        <HelpCircle size={14} strokeWidth={2} aria-hidden />
      </button>
      {open ? (
        <span
          role="tooltip"
          className="absolute left-1/2 top-full z-30 mt-2 w-52 -translate-x-1/2 rounded-input border px-3 py-2 text-xs leading-relaxed shadow-xl"
          style={{
            backgroundColor: 'var(--bg-elevated)',
            borderColor: 'var(--border-default)',
            color: 'var(--text-primary)',
          }}
        >
          {content}
        </span>
      ) : null}
    </span>
  );
}
