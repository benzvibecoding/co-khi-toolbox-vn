'use client';

import Link from 'next/link';
import { Download, Lock, Printer } from 'lucide-react';
import { ProFeature, useProAccess } from '@/lib/hooks/useProAccess';
import { downloadCSV } from '@/lib/utils/export-csv';
import type { CalculationRecord } from '@/types/calculator';

/**
 * Nut xuat CSV + In/PDF lich su — tinh nang Pro that.
 * Guest/non-Pro thay teaser + link nang cap (khong dung ProGate blur o day
 * vi lich su la du lieu cua chinh user).
 */
export function HistoryExportButtons({ records, toolId }: { records: CalculationRecord[]; toolId?: string }) {
  const { canAccess } = useProAccess();
  const allowed = canAccess(ProFeature.EXPORT_CSV);
  const empty = records.length === 0;

  if (!allowed) {
    return (
      <Link
        href="/pro"
        className="inline-flex items-center gap-1.5 rounded-input border px-2.5 py-1.5 text-xs font-semibold text-warning"
        style={{ borderColor: 'var(--border-default)' }}
        title="Nâng cấp Pro để xuất CSV và in ấn"
      >
        <Lock size={13} aria-hidden /> Xuất CSV (Pro)
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        disabled={empty}
        onClick={() => downloadCSV(`lich-su-${toolId ?? 'tat-ca'}-${new Date().toISOString().slice(0, 10)}`, records)}
        className="btn-ghost !px-2.5 !py-1.5 text-xs disabled:opacity-40"
        title={empty ? 'Chưa có dữ liệu' : `Xuất ${records.length} dòng ra CSV`}
      >
        <Download size={14} aria-hidden /> CSV
      </button>
      <button
        type="button"
        disabled={empty}
        onClick={() => window.print()}
        className="btn-ghost !px-2.5 !py-1.5 text-xs disabled:opacity-40"
        title={empty ? 'Chưa có dữ liệu' : 'In / lưu PDF'}
      >
        <Printer size={14} aria-hidden /> In
      </button>
    </div>
  );
}
