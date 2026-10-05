'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

/** Nut copy text/so vao clipboard, doi icon bao thanh cong 1.5s. */
export function CopyButton({ text, label = 'Sao chép kết quả' }: { text: string; label?: string }) {
  const [done, setDone] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Fallback cho trinh duyet cu: textarea tam
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    setDone(true);
    window.setTimeout(() => setDone(false), 1500);
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={label}
      title={label}
      className="btn-ghost !border-0 !px-2.5 !py-1.5 text-xs"
    >
      {done ? <Check size={14} aria-hidden className="text-result" /> : <Copy size={14} aria-hidden />}
      <span className="sr-only sm:not-sr-only sm:inline">{done ? 'Đã copy' : 'Copy'}</span>
    </button>
  );
}
