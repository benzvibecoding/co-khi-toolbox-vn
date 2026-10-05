import { NextResponse, type NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';

/** Callback sau khi xac thuc email / OAuth: doi code lay session roi chuyen ve ?next=. */
export async function GET(request: NextRequest) {
  const url = request.nextUrl.clone();
  const code = url.searchParams.get('code');
  const next = url.searchParams.get('next') ?? '/';
  const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (code && baseUrl && anonKey) {
    const response = NextResponse.redirect(new URL(next, request.url));
    const supabase = createServerClient(baseUrl, anonKey, {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
        },
      },
    });
    await supabase.auth.exchangeCodeForSession(code);
    return response;
  }

  url.pathname = '/dang-nhap';
  url.searchParams.delete('code');
  return NextResponse.redirect(url);
}
