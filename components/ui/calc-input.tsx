'use client';

import type { InputHTMLAttributes } from 'react';
import { Tooltip } from '@/components/ui/tooltip';

interface CalcInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'id'> {
  id: string;
  label: string;
  unit?: string;
  hint?: string;
  error?: string | null;
  tooltip?: string;
}

/**
 * O nhap so cho calculator: label + don vi + tooltip + loi inline.
 * Luon co <label htmlFor> lien ket dung (a11y).
 */
export function CalcInput({ id, label, unit, hint, error, tooltip, ...rest }: CalcInputProps) {
  return (
    <div className="w-full">
      <div className="flex items-center gap-1.5">
        <label htmlFor={id} className="label-base !mb-0">
          {label}
          {unit ? <span className="ml-1 text-muted">({unit})</span> : null}
        </label>
        {tooltip ? <Tooltip content={tooltip} /> : null}
      </div>
      <div className="relative mt-1.5">
        <input
          id={id}
          type="number"
          inputMode="decimal"
          className={`input-base pr-3 ${error ? 'input-error' : ''}`}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
          {...rest}
        />
      </div>
      {error ? (
        <p id={`${id}-error`} role="alert" className="mt-1 text-xs font-medium text-error">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="mt-1 text-xs text-muted">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
