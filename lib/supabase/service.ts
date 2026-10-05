import { createClient } from '@supabase/supabase-js';

/**
 * Supabase client QUYEN CAO (service_role) — CHI dung server-side
 * (Route Handler webhook, cron). Khong bao gio import vao client component.
 * Bypass RLS de duyet don + bat Pro tu dong.
 */
export function createServiceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) {
    throw new Error('Thiếu NEXT_PUBLIC_SUPABASE_URL hoặc SUPABASE_SERVICE_ROLE_KEY.');
  }
  return createClient(url, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
