-- Tu dong kich hoat Pro qua webhook SePay. Chay trong Supabase SQL Editor.

-- 1. Han Pro (de goi thang/nam tu het han thay vi vinh vien)
alter table public.profiles
  add column if not exists pro_until timestamptz;

-- 2. Luu ma noi dung CK tren don (de webhook doi chieu + admin de nhin)
alter table public.orders
  add column if not exists transfer_content text;

-- 3. Mo rong quyen update: user duoc sua don pending (luu ma CK, huy don)
drop policy if exists "orders_cancel_own" on public.orders;
create policy "orders_update_own_pending"
  on public.orders for update
  using (auth.uid() = user_id and status = 'pending')
  with check (auth.uid() = user_id and status in ('pending', 'cancelled'));

-- 4. Don duoc duyet tu dong qua service_role (webhook) — khong can policy them
--    vi service_role bypass RLS. Tuyen doi KHONG expose service key ra client.
