import type { MetadataRoute } from 'next';

const SITE = 'https://www.x-code.studio';

/**
 * robots.txt
 *
 * The site had none, which is why a private page sitting at an
 * unlisted URL had nothing standing between it and a crawler.
 * Unlisted is not private, so the real fix is that such pages do
 * not ship; this is the second line.
 *
 * The disallow entries below are belt and braces for paths that
 * have existed at some point. Keeping them costs nothing and
 * covers the window where a crawler saw the old URL.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/leads', '/offerings/director', '/new'],
    },
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  };
}
