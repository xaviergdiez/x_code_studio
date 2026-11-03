/**
 * Pricing, in one place.
 *
 * Prices were previously hardcoded across five files and had already
 * drifted: the homepage sold a "build sprint" at €2,950 while the
 * design system page sold a 6 to 8 week engagement for €4,500. Any
 * price shown anywhere now comes from here.
 *
 * ── How these numbers were set ────────────────────────────────────
 *
 * Anchor: roughly €1,200 per working day.
 *
 * That sits in the Technical Director / Architect band (€120 to €160
 * per hour) rather than the Senior Creative Developer band (€85 to
 * €110), which is the whole point of the positioning: the site sells
 * architecture and judgement, not execution capacity. An Amsterdam
 * senior contractor day rate benchmarks around €650 for defined-scope
 * engineering work, and fixed-price delivery carries the overrun risk
 * that a day rate hands to the client, so it prices above that.
 *
 * The old prices were not merely low, they contradicted the site.
 * The audit was €995 for a week of work producing a 15 to 25 page
 * report, which implies about €31 per hour. The Dutch legal
 * presumption of employment (VBAR) is indexed at roughly €36 per hour
 * for 2026, and a rate below it is evidence *for* an employment
 * relationship. Every engagement on this site is scoped as a result
 * obligation specifically to establish independence, so pricing under
 * that threshold undermined the compliance argument the site makes.
 *
 * Every price below clears that threshold with room to spare.
 *
 * Changing a price: edit it here. Implied day and hour rates are
 * derived, so the comments stay honest.
 */

export type Price = {
  /** Shown to the reader, e.g. "€3,500". */
  label: string;
  /** Numeric value in euros, for deriving implied rates. */
  amount: number;
  /** Typical working days, used to sanity-check the implied rate. */
  days: number;
  /** "fixed" prints as "€3,500 fixed"; "from" prints as "from €14,500". */
  basis: 'fixed' | 'from';
};

const euro = (n: number) => `€${n.toLocaleString('en-GB')}`;

function price(amount: number, days: number, basis: Price['basis'] = 'fixed'): Price {
  return { label: euro(amount), amount, days, basis };
}

export const PRICING = {
  /** 4 days → ~€109/hr */
  audit: price(3500, 4),
  /** 5 days → ~€149/hr */
  sprint: price(5950, 5),
  /** 6 to 8 weeks elapsed, ~18 billable days → ~€100/hr */
  designSystem: price(14500, 18, 'from'),
  /** 2 days delivery plus preparation → ~€280/hr on delivery days */
  workshop: price(4500, 2),
} as const;

/** Rush and out-of-hours uplifts, kept proportional to the base. */
export const UPLIFTS = {
  /** Audit delivered in 3 days rather than the standard 5. */
  auditExpress: price(875, 0),
  /** Audit delivered in 2 days, starting Monday, delivered Wednesday. */
  auditRush: price(1750, 0),
  /** Sprint running Wed to Sun. */
  sprintWeekend: price(7450, 5),
  /** Sprint running Thu to Mon. */
  sprintShoulder: price(6950, 5),
  /** Engineering the system into a codebase, quoted separately. */
  implementation: price(7500, 0, 'from'),
} as const;

/**
 * The audit fee comes off a sprint or system build booked within this
 * window, which turns the audit from a cost into a deposit and keeps
 * it working as the entry to the ladder rather than a barrier.
 */
export const AUDIT_CREDIT_DAYS = 60;

/** "€3,500 fixed" or "from €14,500". */
export function priceLabel(p: Price): string {
  return p.basis === 'from' ? `from ${p.label}` : `${p.label} fixed`;
}

/** Implied hourly rate at 8h days, for internal sanity checks. */
export function impliedHourly(p: Price): number | null {
  return p.days > 0 ? Math.round(p.amount / (p.days * 8)) : null;
}
