/**
 * Publication flags.
 *
 * ── SEF case ──────────────────────────────────────────────────────
 *
 * The fastening client has not approved public reference to the
 * work, so nothing on the site names them and the case route does
 * not exist. Their name is deliberately absent from this file too:
 * source maps carry comments, and the repository is public.
 *
 * The route is switched off by the folder name, not by this flag. A
 * folder prefixed with an underscore is private in the Next.js app
 * router: `app/cases/_sef` is not routed, not built and not bundled.
 * A flag alone would not be enough, because a route that renders a
 * 404 still ships its own client bundle, and the client name would
 * sit in that JavaScript for anyone who looked.
 *
 * This flag controls everything else: the homepage card, the sitemap
 * entry and the cross-links from the offering pages.
 *
 * TO PUBLISH, once SEF approve:
 *   1. Rename `app/cases/_sef` back to `app/cases/sef`.
 *   2. Set SEF_CASE_PUBLISHED to true here.
 *   3. Put the real client name in FASTENING_CLIENT below. It is
 *      used in the two places on /offerings/design-system that
 *      currently read "a fastening manufacturer".
 *
 * The page itself is unchanged and still typechecks, so nothing has
 * to be rebuilt.
 *
 * Note: the repository is public, so the case page source remains
 * readable on GitHub even while the route is off. That is a much
 * smaller exposure than a published, indexed page, and the same
 * description already circulates in the pitch deck, but it is worth
 * knowing rather than assuming otherwise. The case file does name
 * them; move it out of the repo if that matters.
 */
export const SEF_CASE_PUBLISHED = false;

/**
 * How the fastening client is described while unapproved. Accurate
 * and specific without naming them. Replace with the real name at
 * step 3 above.
 */
export const FASTENING_CLIENT = 'a fastening manufacturer with eight brands';
