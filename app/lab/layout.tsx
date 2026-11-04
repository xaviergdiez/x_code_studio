import type { Metadata } from 'next';
import type { ReactNode } from 'react';

/**
 * /lab is a working surface, not a page for visitors.
 *
 * It ships to production because judging motion on the real tokens,
 * real type and real scroll container is the entire point, and a
 * local-only preview would be judged in a different browser to the
 * one the site runs in. But it is not part of the site:
 *
 *   - noindex, nofollow here
 *   - disallowed in robots.ts
 *   - absent from sitemap.ts
 *   - nothing links to it
 *
 * That is three independent measures rather than one, because the
 * last unlisted page on this site was reachable for nine days.
 * Unlisted is not private. The reason this is acceptable and /leads
 * was not: there is nothing here but four effects and some prose
 * about them.
 *
 * Delete the route once the candidates are picked.
 */
export const metadata: Metadata = {
  title: 'Motion lab · x-code.studio',
  description: 'Internal. Candidate scroll and pointer effects on the real design tokens.',
  robots: { index: false, follow: false },
};

export default function LabLayout({ children }: { children: ReactNode }) {
  return children;
}
