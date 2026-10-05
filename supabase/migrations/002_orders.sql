-- Don mua Pro (chuyen khoan thu cong + admin duyet). Chay trong Supabase SQL Editor.

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  plan text not null check (plan in ('monthly', 'yearly')),
  amount integer not null check (amount > 0),
  method text not null default 'bank_transfer',
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected', 'cancelled')),
  note text,
  created_at timestamptz not null default now(),
  decided_at timestamptz
);

alter table public.orders enable row level security;

-- User: xem don cua minh, tao don moi, huy don dang pending.
drop policy if exists "orders_select_own" on public.orders;
create policy "orders_select_own"
  on public.orders for select
  using (auth.uid() = user_id);

drop policy if exists "orders_insert_own" on public.orders;
create policy "orders_insert_own"
  on public.orders for insert
  with check (auth.uid() = user_id);

drop policy if exists "orders_cancel_own" on public.orders;
create policy "orders_cancel_own"
  on public.orders for update
  using (auth.uid() = user_id and status = 'pending')
  with check (status = 'cancelled');

-- Admin duyet don TRUC TIEP trong Supabase Dashboard (Table Editor):
--   1. orders: status pending -> approved, decided_at = now()
--   2. profiles: is_pro = true, pro_since = now() cho user_id tuong ung
-- (Khong cap quyen update rong hon cho client de tranh tu kich hoat Pro.)
