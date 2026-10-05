import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import '@/styles/globals.css';
import { AppShell } from '@/components/layout/app-shell';

const inter = Inter({ subsets: ['vietnamese', 'latin'], variable: '--font-inter', display: 'swap' });
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://cokhi-toolbox.vn'),
  title: {
    default: 'Cơ Khí Toolbox VN — Bộ công cụ cơ khí kỹ thuật số cho người Việt',
    template: '%s | Cơ Khí Toolbox VN',
  },
  description:
    'Tính tốc độ cắt, RPM, bước tiến, dung sai, bánh răng, tra vật liệu, ký hiệu bản vẽ — tất cả trong một trang.',
  keywords: ['cơ khí', 'tốc độ cắt', 'RPM', 'dung sai', 'bánh răng', 'vật liệu S45C', 'chip load', 'MRR'],
  authors: [{ name: 'Cơ Khí Toolbox VN' }],
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    siteName: 'Cơ Khí Toolbox VN',
    title: 'Cơ Khí Toolbox VN',
    description: 'Tính toán, tra cứu, học nhanh cơ khí — tất cả trong một trang.',
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#0D0F14',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-input focus:px-4 focus:py-2 focus:text-sm focus:text-white"
          style={{ backgroundColor: 'var(--accent)' }}
        >
          Bỏ qua tới nội dung chính
        </a>
        <AppShell>{children}</AppShell>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: 'Cơ Khí Toolbox VN',
              applicationCategory: 'EngineeringApplication',
              operatingSystem: 'Web',
              inLanguage: 'vi-VN',
              offers: { '@type': 'Offer', price: '0', priceCurrency: 'VND' },
            }),
          }}
        />
      </body>
    </html>
  );
}
