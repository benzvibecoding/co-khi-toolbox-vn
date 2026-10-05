'use client';

import { useState } from 'react';
import { History, Trash2, X } from 'lucide-react';
import { useCalculatorHistory } from '@/lib/hooks/useCalculatorHistory';

/**
 * Ngan keo lich su phep tinh — lazy render khi mo.
 * Phase 5 nang cap luu tru sang IndexedDB, giu API.
 */
export function HistoryDrawer({ toolId }: { toolId?: string }) {
  const [open, setOpen] = useState(false);
  const { records, clear, remove } = useCalculatorHistory(toolId);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className="btn-ghost text-xs">
        <History size={14} aria-hidden />
        Lịch sử ({records.length})
      </button>
      {open ? (
        <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Lịch sử phép tính">
          <button
            type="button"
            aria-label="Đóng lịch sử"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-black/60"
          />
          <aside
            className="absolute right-0 top-0 flex h-full w-full max-w-sm flex-col border-l bg-surface"
            style={{ borderColor: 'var(--border-subtle)' }}
          >
            <div className="flex items-center justify-between border-b p-4" style={{ borderColor: 'var(--border-subtle)' }}>
              <h2 className="text-base font-semibold text-primary">Lịch sử phép tính</h2>
              <div className="flex items-center gap-2">
                {records.length > 0 ? (
                  <button
                    type="button"
                    onClick={clear}
                    className="inline-flex items-center gap-1 text-xs text-muted hover:text-error"
                  >
                    <Trash2 size={13} aria-hidden /> Xóa hết
                  </button>
                ) : null}
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Đóng"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-input text-secondary hover:text-primary"
                >
                  <X size={16} aria-hidden />
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              {records.length === 0 ? (
                <p className="text-sm text-muted">Chưa có phép tính nào. Kết quả bạn tính sẽ hiện ở đây.</p>
              ) : (
                <ul className="space-y-3">
                  {records.map((r) => (
                    <li
                      key={r.id}
                      className="rounded-card border p-3 text-sm"
                      style={{ borderColor: 'var(--border-subtle)', backgroundColor: 'var(--bg-elevated)' }}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <p className="font-medium text-primary">{r.toolName}</p>
                        <button
                          type="button"
                          onClick={() => remove(r.id)}
                          aria-label="Xóa dòng lịch sử này"
                          className="text-muted hover:text-error"
                        >
                          <X size={13} aria-hidden />
                        </button>
                      </div>
                      <p className="mt-1 font-mono text-xs text-secondary">
                        {new Date(r.timestamp).toLocaleString('vi-VN')}
                      </p>
                      <p className="mt-1 font-mono text-xs text-muted">
                        In: {JSON.stringify(r.inputs)} → Out: {JSON.stringify(r.outputs)}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </aside>
        </div>
      ) : null}
    </>
  );
}
