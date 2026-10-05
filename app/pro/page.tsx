import type { Metadata } from 'next';
import { Check } from 'lucide-react';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { SectionCard } from '@/components/ui/section-card';
import { ProGate } from '@/components/ui/pro-gate';

export const metadata: Metadata = {
  title: 'Gói Pro',
  description: 'Gói Pro: xuất PDF/CSV, lịch sử không giới hạn, CNC nâng cao — UI giới thiệu, chưa có thanh toán ở MVP.',
};

const FEATURES = [
  { title: 'Xuất kết quả ra PDF / CSV', desc: 'Lưu biên bản tính toán cho hồ sơ công nghệ.' },
  { title: 'Lịch sử phép tính không giới hạn', desc: 'Vượt giới hạn 200 bản ghi của bản miễn phí.' },
  { title: 'Module CNC nâng cao', desc: 'Tối ưu tốc độ, chu trình khoan sâu, bù dao.' },
  { title: 'Tính hàng loạt (batch)', desc: 'Nhập bảng Excel, tính hàng trăm chi tiết một lúc.' },
];

export default function ProPage() {
  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: 'Trang chủ', href: '/' }, { label: 'Pro' }]} />
      <div>
        <h1 className="text-[2rem] font-bold text-primary">
          Cơ Khí Toolbox <span style={{ color: 'var(--accent)' }}>Pro</span>
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-secondary">
          Trang giới thiệu UI — chưa tích hợp thanh toán ở MVP. Các tính năng Pro được chặn bằng ProGate, mở khóa khi có quyền.
        </p>
      </div>
      <SectionCard id="pro-features" title="Tính năng Pro (giai đoạn 2)" description="Đăng ký sớm để nhận ưu đãi khi ra mắt.">
        <ul className="grid gap-3 md:grid-cols-2">
          {FEATURES.map((f) => (
            <li key={f.title} className="rounded-card border p-4" style={{ borderColor: 'var(--border-subtle)', backgroundColor: 'var(--bg-elevated)' }}>
              <p className="flex items-center gap-2 text-sm font-semibold text-primary">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-badge" style={{ backgroundColor: 'var(--result-subtle)', color: 'var(--result)' }} aria-hidden>
                  <Check size={13} />
                </span>
                {f.title}
              </p>
              <p className="mt-1.5 text-xs leading-relaxed text-secondary">{f.desc}</p>
            </li>
          ))}
        </ul>
        <button type="button" disabled className="btn-primary mt-5" title="Thanh toán sẽ mở ở giai đoạn 2">
          Sắp ra mắt
        </button>
      </SectionCard>
      <div className="grid gap-4 md:grid-cols-2">
        <ProGate feature="export_pdf" label="Xuất PDF">
          <div className="rounded-card border p-4" style={{ borderColor: 'var(--border-subtle)' }}>
            <p className="font-mono text-sm">Vc = 125.66 m/min</p>
            <p className="mt-1 text-xs text-muted">D = 50, n = 800</p>
          </div>
        </ProGate>
        <ProGate feature="batch_calculate" label="Tính hàng loạt">
          <div className="rounded-card border p-4" style={{ borderColor: 'var(--border-subtle)' }}>
            <p className="font-mono text-sm">240 chi tiết · MRR TB 48 cm³/min</p>
            <p className="mt-1 text-xs text-muted">Nhập từ Excel, xuất CSV</p>
          </div>
        </ProGate>
      </div>
    </div>
  );
}
