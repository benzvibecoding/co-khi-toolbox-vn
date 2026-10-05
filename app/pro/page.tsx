import type { Metadata } from 'next';
import Link from 'next/link';
import { Check } from 'lucide-react';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { SectionCard } from '@/components/ui/section-card';
import { ProGate } from '@/components/ui/pro-gate';
import { PRO_PLANS, formatVND } from '@/lib/pro/plans';

export const metadata: Metadata = {
  title: 'Gói Pro',
  description: 'Nâng cấp Pro: xuất CSV, lịch sử 5000 bản ghi, tính hàng loạt. Thanh toán chuyển khoản, kích hoạt trong vài giờ.',
};

const FEATURES = [
  { title: 'Xuất kết quả ra CSV / In PDF', desc: 'Lưu biên bản tính toán cho hồ sơ công nghệ, ngay trong ngăn lịch sử.' },
  { title: 'Lịch sử 5000 phép tính', desc: 'Gấp 25 lần bản miễn phí (200), đồng bộ trên trình duyệt qua IndexedDB.' },
  { title: 'Tính hàng loạt', desc: 'Dán bảng D,n — nhận Vc hàng trăm chi tiết + file CSV một lúc.' },
  { title: 'Ưu tiên tính năng CNC nâng cao', desc: 'Truy cập sớm module tối ưu tốc độ, chu trình khoan sâu khi ra mắt.' },
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
          Thanh toán chuyển khoản ngân hàng (VietQR), admin kích hoạt trong vài giờ. Cần đăng nhập trước khi mua.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {PRO_PLANS.map((p) => (
          <article key={p.id} className="card relative rounded-card p-6">
            {p.badge ? (
              <span className="absolute right-4 top-4 rounded-badge px-2 py-0.5 text-[0.7rem] font-bold text-white" style={{ backgroundColor: 'var(--result)' }}>
                {p.badge}
              </span>
            ) : null}
            <h2 className="text-[1.125rem] font-semibold text-primary">{p.name}</h2>
            <p className="mt-2 font-mono text-[1.75rem] font-bold text-result">{formatVND(p.amount)}</p>
            <p className="mt-1 text-xs text-muted">/ {p.durationDays} ngày sử dụng</p>
            <p className="mt-3 text-sm leading-relaxed text-secondary">{p.description}</p>
            <Link href={`/thanh-toan?plan=${p.id}`} className="btn-primary mt-5 inline-flex w-full text-sm">
              Mua {p.name}
            </Link>
          </article>
        ))}
      </div>
      <SectionCard id="pro-features" title="Tính năng Pro" description="Mở khóa ngay khi đơn được duyệt.">
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
        <Link href="/tinh-hang-loat" className="btn-ghost mt-5 inline-flex text-xs">
          Xem trước tính hàng loạt →
        </Link>
      </SectionCard>
      <div className="grid gap-4 md:grid-cols-2">
        <ProGate feature="export_csv" label="Xuất CSV">
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
