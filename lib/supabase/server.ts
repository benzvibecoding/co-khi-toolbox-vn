import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

/**
 * Supabase client cho Server Component / Route Handler.
 * Doc session tu httpOnly cookie — token khong bao gio lo ra client JS.
 * Tra ve null khi chua cau hinh env (trang auth se hien thi huong dan).
 */
export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  const store = cookies();
  return createServerClient(url, key, {
    cookies: {
      getAll() {
        return store.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => store.set(name, value, options));
        } catch {
          // Bo qua khi goi tu Server Component (chi Route Handler/Middleware moi set duoc)
        }
      },
    },
  });
}
