/** @type {import('next').NextConfig} */
const csp = [
  "default-src 'self'",
  // Next.js can inline runtime scripts — giu unsafe-inline de khong vo app
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  // VietQR + bat ky anh https nao (logo bank) + data: cho SVG inline
  "img-src 'self' data: https:",
  // Supabase REST + Realtime (wss) + Vercel Speed Insights (neu bat)
  "connect-src 'self' https://*.supabase.co https://*.supabase.in wss://*.supabase.co wss://*.supabase.in https://vitals.vercel-insights.com",
  "form-action 'self'",
  "base-uri 'self'",
  // Chong clickjacking: khong cho nhung web vao iframe
  "frame-ancestors 'none'",
].join('; ');

const securityHeaders = [
  { key: 'Content-Security-Policy', value: csp },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=*, usb=()' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains' },
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
];

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }];
  },
};

module.exports = nextConfig;
