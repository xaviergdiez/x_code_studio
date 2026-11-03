import type { MetadataRoute } from 'next';
import { SEF_CASE_PUBLISHED } from '@/lib/flags';

const SITE = 'https://www.x-code.studio';

/**
 * sitemap.xml
 *
 * Listed explicitly rather than generated from the filesystem, so
 * adding a route is a deliberate decision to publish it. A
 * filesystem crawl would have happily listed /leads.
 */
const ROUTES: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
  { path: '/', priority: 1, changeFrequency: 'monthly' },
  { path: '/offerings/audit', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/offerings/sprint', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/offerings/tooling', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/offerings/design-system', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/cases/bmw-mini', priority: 0.7, changeFrequency: 'yearly' },
  { path: '/cases/gtech', priority: 0.7, changeFrequency: 'yearly' },
  { path: '/cases/fbto', priority: 0.7, changeFrequency: 'yearly' },
  { path: '/cases/huawei', priority: 0.7, changeFrequency: 'yearly' },
  { path: '/privacy', priority: 0.2, changeFrequency: 'yearly' },
  { path: '/terms', priority: 0.2, changeFrequency: 'yearly' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const routes = SEF_CASE_PUBLISHED
    ? [...ROUTES, { path: '/cases/sef', priority: 0.7, changeFrequency: 'yearly' as const }]
    : ROUTES;
  return routes.map(({ path, priority, changeFrequency }) => ({
    url: `${SITE}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
