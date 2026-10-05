interface FormulaBoxProps {
  formula: string;
  variables?: { symbol: string; name: string; unit: string }[];
}

/** Box hien thi cong thuc dang text/Unicode dep, kem bang bien so. */
export function FormulaBox({ formula, variables }: FormulaBoxProps) {
  return (
    <div
      className="rounded-card border p-4"
      style={{ borderColor: 'var(--border-subtle)', backgroundColor: 'var(--bg-elevated)' }}
    >
      <p className="text-[0.75rem] font-medium uppercase tracking-wider text-muted">Công thức</p>
      <p className="mt-1.5 font-mono text-base font-semibold text-primary">{formula}</p>
      {variables && variables.length > 0 ? (
        <ul className="mt-3 space-y-1 border-t pt-3 text-sm" style={{ borderColor: 'var(--border-subtle)' }}>
          {variables.map((v) => (
            <li key={v.symbol} className="flex items-center gap-2 text-secondary">
              <code className="min-w-10 rounded-badge bg-surface px-1.5 py-0.5 font-mono text-xs font-semibold text-primary">
                {v.symbol}
              </code>
              <span>{v.name}</span>
              <span className="ml-auto font-mono text-xs text-muted">{v.unit}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
