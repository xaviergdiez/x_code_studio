import type { Banner } from '@/components/case/BannerWall';

/**
 * The BMW/MINI units shown in the case hero, as produced at Monks.
 *
 * Generated from the portfolio's manifest.json. These are real,
 * running creatives, not screenshots, which is the whole point of
 * the wall: it is the only proof on the site that cannot be faked.
 *
 * The files themselves are not in this repo. At ~363MB (2,047 frame
 * JPGs across 19 units) they do not belong in a Next.js bundle.
 * BANNER_ORIGIN below is the one place that decides where they come
 * from. Point it at a CDN, a blob store, or an assets subdomain.
 */
/**
 * Where the running ad units are served from.
 *
 * Still whoisxavier.com by default, which means this site depends on
 * a domain that was earmarked for retirement. Moving the assets is
 * now a deploy-time change rather than a code change: set
 * NEXT_PUBLIC_BANNER_ORIGIN in Vercel (an assets subdomain, a blob
 * store, a CDN) and nothing here needs editing.
 *
 * Before retiring whoisxavier.com, move the assets and set that
 * variable, or the BMW hero goes blank.
 */
export const BANNER_ORIGIN =
  process.env.NEXT_PUBLIC_BANNER_ORIGIN?.replace(/\/$/, '') || 'https://whoisxavier.com';

export const BMW_BANNERS: Banner[] = [
  { name: "F65", width: 300, height: 600, path: "iframes/F65_300x600/index.html" },
  { name: "F65", width: 320, height: 100, path: "iframes/F65_320x100/index.html" },
  { name: "F66", width: 300, height: 600, path: "iframes/F66_300x600/index.html" },
  { name: "F66", width: 800, height: 250, path: "iframes/F66_800x250/index.html" },
  { name: "F67", width: 300, height: 250, path: "iframes/F67_300x250/index.html" },
  { name: "F67", width: 320, height: 480, path: "iframes/F67_320x480/index.html" },
  { name: "F67", width: 970, height: 250, path: "iframes/F67_970x250/index.html" },
  { name: "F70", width: 120, height: 600, path: "iframes/F70_120x600/index.html" },
  { name: "F70", width: 160, height: 600, path: "iframes/F70_160x600/index.html" },
  { name: "F70", width: 300, height: 250, path: "iframes/F70_300x250/index.html" },
  { name: "F70", width: 300, height: 600, path: "iframes/F70_300x600/index.html" },
  { name: "F70", width: 320, height: 50, path: "iframes/F70_320x50/index.html" },
  { name: "F70", width: 728, height: 90, path: "iframes/F70_728x90/index.html" },
  { name: "F70", width: 970, height: 250, path: "iframes/F70_970x250/index.html" },
  { name: "J01", width: 300, height: 250, path: "iframes/J01_300x250/index.html" },
  { name: "J01", width: 320, height: 100, path: "iframes/J01_320x100/index.html" },
  { name: "J01", width: 970, height: 250, path: "iframes/J01_970x250/index.html" },
  { name: "J05", width: 320, height: 320, path: "iframes/J05_320x320/index.html" },
  { name: "J05", width: 728, height: 90, path: "iframes/J05_728x90/index.html" },
];
