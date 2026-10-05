import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

/** Duong dan cong cu — bat buoc dang nhap moi su dung duoc. */
const PROTECTED_PREFIXES = [
  '/toc-do-cat',
  '/rpm',
  '/luong-chay-dao',
  '/chip-load',
  '/mrr',
  '/thoi-gian-gia-cong',
  '/cong-suat-cat',
  '/mo-men-xoan',
  '/luc-ap-suat-ung-suat',
  '/khoi-luong',
  '/chuyen-doi-don-vi',
  '/ren',
  '/dung-sai',
  '/banh-rang',
  '/tai-khoan',
];

/** Trang xac thuc — user da login thi da ve trang chu. */
const AUTH_PAGES = ['/dang-nhap', '/dang-ky'];

export async function middleware(request: NextRequest) {
  const response = NextResponse.next({ request });
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Chua cau hinh Supabase (local chua co .env): cho qua, trang auth se bao loi ro rang.
  if (!url || !key) return response;

  const supabase = createServerClient(url, key, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
      },
    },
  });

  // Refresh session (bat buoc cho @supabase/ssr) + lay user server-side.
  // Supabase loi mang/cau hinh sai → coi nhu chua dang nhap (khong crash).
  let user: { id: string } | null = null;
  try {
    const { data } = await supabase.auth.getUser();
    user = data.user;
  } catch {
    user = null;
  }
  const path = request.nextUrl.pathname;

  const needsAuth = PROTECTED_PREFIXES.some((p) => path === p || path.startsWith(`${p}/`));
  if (needsAuth && !user) {
    const login = request.nextUrl.clone();
    login.pathname = '/dang-nhap';
    login.searchParams.set('next', `${path}${request.nextUrl.search}`);
    return NextResponse.redirect(login);
  }

  if (user && AUTH_PAGES.includes(path)) {
    const home = request.nextUrl.clone();
    home.pathname = '/';
    home.search = '';
    return NextResponse.redirect(home);
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
  ],
};
