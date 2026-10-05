import type { MetadataRoute } from 'next';
import { CALCULATORS } from '@/lib/data/site';
import { LEARN_POSTS } from '@/lib/data/learn-content';

/** Sitemap tu dong — cap nhat khi them calculator / bai hoc moi. */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://cokhi-toolbox.vn';
  const staticRoutes = ['', '/tim-kiem', '/pro', '/vat-lieu', '/ky-hieu-ban-ve', '/cong-thuc', '/hoc-nhanh'];
  return [
    ...staticRoutes.map((r) => ({ url: `${base}${r || '/'}`, lastModified: new Date() })),
    ...CALCULATORS.map((c) => ({ url: `${base}${c.href}`, lastModified: new Date() })),
    ...LEARN_POSTS.map((p) => ({ url: `${base}/hoc-nhanh/${p.slug}`, lastModified: new Date() })),
  ];
}
