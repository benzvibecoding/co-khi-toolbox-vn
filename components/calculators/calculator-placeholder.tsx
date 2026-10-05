import { Breadcrumb } from '@/components/ui/breadcrumb';
import { FormulaBox } from '@/components/ui/formula-box';
import { HistoryDrawer } from '@/components/ui/history-drawer';
import { FavoriteToggle } from '@/components/ui/favorite-toggle';

interface PlaceholderProps {
  toolId: string;
  title: string;
  description: string;
  formula: string;
  groupName: string;
  groupHref?: string;
}

/**
 * Template trang calculator dung chung Phase 1 (cho SEO + routing som).
 * Phase 2/3 thay body form bang logic that, giu nguyen Breadcrumb + FormulaBox.
 */
export function CalculatorPlaceholder({ toolId, title, description, formula, groupName }: PlaceholderProps) {
  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: 'Trang chủ', href: '/' }, { label: groupName }, { label: title }]} />
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-[2rem] font-bold leading-tight text-primary">{title}</h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-secondary">{description}</p>
        </div>
        <FavoriteToggle toolId={toolId} toolName={title} />
      </div>
      <FormulaBox formula={formula} />
      <div className="card rounded-card border-dashed p-6 text-center" style={{ borderColor: 'var(--border-default)' }}>
        <p className="font-mono text-sm text-secondary">Giao diện tính toán đang hoàn thiện ở Phase 2–3</p>
        <p className="mx-auto mt-2 max-w-md text-xs leading-relaxed text-muted">
          Form nhập liệu realtime (debounce 300ms), validation inline, kết quả aria-live và lưu lịch sử
          sẽ xuất hiện khi build tới phase của công cụ này.
        </p>
      </div>
      <div>
        <HistoryDrawer toolId={toolId} />
      </div>
    </div>
  );
}
