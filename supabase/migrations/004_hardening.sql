-- Khoa 2 lo hong leo thang quyen. Chay trong Supabase SQL Editor.

-- 1. profiles: XOA policy update — khong code client nao can sua profile truc tiep
--    (full_name lay tu metadata luc signup; is_pro/pro_until chi service_role duoc sua).
--    De lai policy nay, user co the tu bat is_pro=true cho chinh minh!
drop policy if exists "profiles_update_own" on public.profiles;

-- 2. orders: chan sua amount/plan/user_id tren don pending.
--    Neu khong, ke xau sua amount thanh 1000d, CK dung ma + 1000d -> webhook van duyet!
create or replace function public.prevent_order_tampering()
returns trigger
language plpgsql
as $$
begin
  if new.amount is distinct from old.amount
    or new.plan is distinct from old.plan
    or new.user_id is distinct from old.user_id then
    raise exception 'Khong duoc thay doi amount/plan/user_id cua don hang.';
  end if;
  return new;
end;
$$;

drop trigger if exists trg_prevent_order_tampering on public.orders;
create trigger trg_prevent_order_tampering
  before update on public.orders
  for each row execute function public.prevent_order_tampering();
-- (Trigger chay ca voi service_role: webhook chi doi status/decided_at/note -> khong anh huong.)
