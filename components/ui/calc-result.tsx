'use client';

import { CopyButton } from '@/components/ui/copy-button';

interface CalcResultProps {
  label: string;
  value: string;
  unit?: string;
  secondary?: { label: string; value: string }[];
  note?: string;
}

/**
 * Hien thi ket qua noi bat: so mono xanh la + nut copy + aria-live.
 */
export function CalcResult({ label, value, unit, secondary, note }: CalcResultProps) {
  return (
    <div
      className="rounded-card border p-5"
      style={{ borderColor: 'var(--border-subtle)', backgroundColor: 'var(--result-subtle)' }}
      aria-live="polite"
    >
      <p className="text-[0.75rem] font-medium uppercase tracking-wider text-secondary">{label}</p>
      <div className="mt-2 flex flex-wrap items-baseline gap-x-2 gap-y-1">
        <span className="font-mono text-[1.75rem] font-bold leading-none text-result">{value}</span>
        {unit ? <span className="font-mono text-sm text-secondary">{unit}</span> : null}
        <span className="ml-auto">
          <CopyButton text={`${value}${unit ? ` ${unit}` : ''}`} />
        </span>
      </div>
      {secondary && secondary.length > 0 ? (
        <dl className="mt-4 space-y-2 border-t pt-4" style={{ borderColor: 'var(--border-subtle)' }}>
          {secondary.map((s) => (
            <div key={s.label} className="flex items-center justify-between text-sm">
              <dt className="text-secondary">{s.label}</dt>
              <dd className="font-mono font-semibold text-primary">{s.value}</dd>
            </div>
          ))}
        </dl>
      ) : null}
      {note ? <p className="mt-3 text-xs leading-relaxed text-muted">{note}</p> : null}
    </div>
  );
}
