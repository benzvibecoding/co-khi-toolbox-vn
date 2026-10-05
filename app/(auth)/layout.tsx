export default function AuthLayout({ children }: { children: React.ReactNode }) {
  // Route group (auth) — khong anh huong URL, chi gom nhom trang xac thuc.
  return <div className="min-w-0">{children}</div>;
}
