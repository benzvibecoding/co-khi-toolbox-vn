import Link from 'next/link';

/** Footer gon: gioi thieu + lien ket nhom + chuan ap dung. */
export function Footer() {
  return (
    <footer className="border-t" style={{ borderColor: 'var(--border-subtle)', backgroundColor: 'var(--bg-surface)' }}>
      <div className="container-content grid gap-8 py-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="text-sm font-bold text-primary">Cơ Khí Toolbox VN</p>
          <p className="mt-2 text-sm leading-relaxed text-secondary">
            Bộ công cụ cơ khí kỹ thuật số cho người Việt — tính toán, tra cứu, học nhanh trong một trang.
          </p>
          <p className="mt-3 font-mono text-[0.7rem] text-muted">Công thức theo chuẩn quốc tế ISO · JIS</p>
        </div>
        <nav aria-label="Công cụ cắt gọt">
          <p className="text-[0.75rem] font-semibold uppercase tracking-wider text-muted">Cắt gọt</p>
          <ul className="mt-3 space-y-2 text-sm text-secondary">
            <li><Link href="/toc-do-cat" className="hover:text-primary">Tốc độ cắt</Link></li>
            <li><Link href="/rpm" className="hover:text-primary">RPM trục chính</Link></li>
            <li><Link href="/luong-chay-dao" className="hover:text-primary">Lượng chạy dao</Link></li>
            <li><Link href="/mrr" className="hover:text-primary">MRR</Link></li>
          </ul>
        </nav>
        <nav aria-label="Tra cứu">
          <p className="text-[0.75rem] font-semibold uppercase tracking-wider text-muted">Tra cứu</p>
          <ul className="mt-3 space-y-2 text-sm text-secondary">
            <li><Link href="/vat-lieu" className="hover:text-primary">Vật liệu cơ khí</Link></li>
            <li><Link href="/ky-hieu-ban-ve" className="hover:text-primary">Ký hiệu bản vẽ</Link></li>
            <li><Link href="/cong-thuc" className="hover:text-primary">Thư viện công thức</Link></li>
            <li><Link href="/dung-sai" className="hover:text-primary">Dung sai lắp ghép</Link></li>
          </ul>
        </nav>
        <nav aria-label="Khác">
          <p className="text-[0.75rem] font-semibold uppercase tracking-wider text-muted">Khác</p>
          <ul className="mt-3 space-y-2 text-sm text-secondary">
            <li><Link href="/hoc-nhanh" className="hover:text-primary">Học nhanh</Link></li>
            <li><Link href="/tim-kiem" className="hover:text-primary">Tìm kiếm</Link></li>
            <li><Link href="/pro" className="hover:text-primary">Gói Pro</Link></li>
          </ul>
        </nav>
      </div>
      <div className="border-t" style={{ borderColor: 'var(--border-subtle)' }}>
        <div className="container-content flex flex-wrap items-center justify-between gap-2 py-4 text-xs text-muted">
          <p>© 2026 Cơ Khí Toolbox VN — Dùng cho học tập và tham khảo kỹ thuật.</p>
          <p className="font-mono">Phase 1 · Foundation</p>
        </div>
      </div>
    </footer>
  );
}
