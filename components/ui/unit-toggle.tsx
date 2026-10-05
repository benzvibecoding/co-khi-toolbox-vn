'use client';

interface UnitToggleProps<T extends string> {
  options: readonly T[];
  value: T;
  onChange: (v: T) => void;
  labels?: Partial<Record<T, string>>;
  ariaLabel?: string;
}

/** Toggle doi don vi (mm/inch, m/min — ft/min...). Hoat dong bang phim day du. */
export function UnitToggle<T extends string>({
  options,
  value,
  onChange,
  labels,
  ariaLabel = 'Chọn đơn vị',
}: UnitToggleProps<T>) {
  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className="inline-flex rounded-input border p-0.5"
      style={{ borderColor: 'var(--border-default)', backgroundColor: 'var(--bg-elevated)' }}
    >
      {options.map((opt) => {
        const active = opt === value;
        return (
          <button
            key={opt}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(opt)}
            className={`rounded-[4px] px-3 py-1.5 font-mono text-xs font-semibold transition-colors ${
              active ? 'text-white' : 'text-secondary hover:text-primary'
            }`}
            style={active ? { backgroundColor: 'var(--accent)' } : undefined}
          >
            {labels?.[opt] ?? opt}
          </button>
        );
      })}
    </div>
  );
}
