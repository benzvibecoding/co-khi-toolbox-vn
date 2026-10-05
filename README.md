# Cơ Khí Toolbox VN — 100% Hoàn thiện (Phase 1 → 6)

Bộ công cụ cơ khí kỹ thuật số cho người Việt (Next.js 14 App Router + TypeScript strict + Tailwind v3).

## Chạy dự án

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build production (verified: 41 routes, 200 OK)
npm start        # chạy production
npm run typecheck # tsc --noEmit (sạch)
```

## Hoàn thành theo roadmap

- [x] **Phase 1 — Foundation:** cấu trúc thư mục, design system (CSS vars, Inter + JetBrains Mono), 12 component UI cốt lõi + ProGate, Header (Ctrl+K, toggle METRIC/INCH) + Sidebar 240px + Footer, trang chủ Hero text-only
- [x] **Phase 2 — Core Calculators:** `lib/formulas/` (cutting, feed, mrr, power, stress, mass, units — pure + JSDoc + throw tiếng Việt) + 8 trang: tốc độ cắt, RPM, lượng chạy dao, chip load, MRR, thời gian, công suất, mô-men (realtime debounce 300ms, validation inline, lưu lịch sử khi bấm Tính)
- [x] **Phase 3 — Specialized:** ren (M3–M30 + UNC/UNF, d1/d2/drill), dung sai ISO 286-1 (7 kiểu H7/g6…H7/s6), bánh răng (d/da/df/h/a)
- [x] **Phase 4 — Lookup:** 30 vật liệu + modal chi tiết (cơ tính, tương đương ISO/ASTM/DIN/GB, mẹo gia công), ký hiệu bản vẽ, thư viện công thức kèm ví dụ từng bước, bảng ren + dung sai
- [x] **Phase 5 — Content & UX:** 15 bài học nhanh (slug SSG + prev/next + link công cụ), tìm kiếm toàn site 5 nhóm (weighted 10/5/2), lịch sử IndexedDB (Dexie, max 200, fallback localStorage), yêu thích, SEO metadata + sitemap + robots + JSON-LD
- [x] **Phase 6 — Polish & Deploy:** responsive 375px→1440px, loading/error inline, `/pro` UI + ProGate demo, `vercel.json` (region sin1)
- [x] **Phase 7a — Auth:** Supabase Auth (đăng ký/đăng nhập/quên MK qua email, mật khẩu bcrypt), middleware khóa 14 công cụ (guest → `/dang-nhap?next=…`, đã test 307 thật), trang `/tai-khoan` (gói Pro, đổi MK, đăng xuất), UserMenu trên Header, `profiles` + RLS + trigger (`supabase/migrations/001_profiles.sql`)
- [x] **Phase 7b — Mua Pro:** bảng giá tháng/năm, `/thanh-toan` (tạo đơn pending + VietQR + nội dung CK), `orders` + RLS (`supabase/migrations/002_orders.sql`), lịch sử đơn trong Tài khoản; tính năng Pro thật: xuất CSV + In/PDF lịch sử, lịch sử 5000 bản ghi, `/tinh-hang-loat` (batch Vc + xuất CSV)

## Vận hành Auth & Pro (dành cho chủ shop)

```bash
# 1. Supabase Dashboard → SQL Editor → chạy lần lượt:
supabase/migrations/001_profiles.sql
supabase/migrations/002_orders.sql
# 2. Vercel → Environment Variables (xem .env.example):
NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY,
NEXT_PUBLIC_BANK_CODE, NEXT_PUBLIC_BANK_ACCOUNT, NEXT_PUBLIC_BANK_NAME
# 3. Authentication → URL Configuration → Site URL = domain production
```

**Duyệt đơn Pro:** Supabase → Table Editor → `orders`: `status` pending → `approved` (+ `decided_at` = now) → `profiles`: `is_pro` = true (+ `pro_since` = now) cho `user_id` tương ứng.

## Quy tắc code (đã áp dụng)

- Không `any` trong source (`tsc strict + noUncheckedIndexedAccess` sạch)
- Không `console.log` trong app/components/lib
- Format số tối đa 4 thập phân, bỏ 0 thừa (`lib/utils/format.ts`)
- Edge case: input ≤ 0 báo lỗi inline tiếng Việt, không show NaN/Infinity
- Mỗi component < 300 dòng, comment tiếng Việt cho logic nghiệp vụ
"# co-khi-toolbox-vn" 
