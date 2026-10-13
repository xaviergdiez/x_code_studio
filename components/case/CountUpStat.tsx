'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * CountUpStat — a figure that counts up when scrolled into view.
 *
 * Translated from the portfolio's stat bar, not copied. Three
 * differences, all deliberate:
 *
 *  1. The portfolio renders the figure with no method behind it.
 *     Here `method` is a required prop. The house rule is that
 *     every number kept must survive "and how would you know
 *     that", so the component will not let you ship a bare number.
 *  2. Reduced motion skips the count entirely and renders the
 *     final value, rather than animating faster.
 *  3. The live value is not announced on every frame. Screen
 *     readers get the final figure once, from a static node.
 *
 * The portfolio's gallery had a bug worth not inheriting: a
 * counter with data-target="34000" and a "K" suffix, which
 * renders "34000K". Pass the value you actually want shown.
 */
export function CountUpStat({
  value,
  suffix = '',
  prefix = '',
  label,
  method,
  decimals = 0,
  group = false,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  /** How this number was arrived at. Shown under the label. */
  method: string;
  decimals?: number;
  /** Thousands separators, e.g. 34,000 */
  group?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [display, setDisplay] = useState<string | null>(null);

  const format = (n: number) => {
    const fixed = n.toFixed(decimals);
    return group ? Number(fixed).toLocaleString('en-GB') : fixed;
  };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const obj = { v: 0 };
        setDisplay(format(0));
        gsap.to(obj, {
          v: value,
          duration: 1.4,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
          onUpdate: () => setDisplay(format(obj.v)),
          onComplete: () => setDisplay(null),
        });
      });

      return () => mm.revert();
    }, ref);

    return () => ctx.revert();
  }, [value, decimals, group]);

  const final = `${prefix}${format(value)}${suffix}`;

  return (
    <div ref={ref}>
      {/* The animating figure is decorative; AT reads `final` below. */}
      {display !== null ? (
        <p className="text-display font-bold text-accent tabular-nums" aria-hidden="true">
          {prefix}
          {display}
          {suffix}
        </p>
      ) : (
        <p className="text-display font-bold text-accent tabular-nums">{final}</p>
      )}
      {display !== null && <span className="sr-only">{final}</span>}

      <p className="mt-2 text-small font-medium text-fg">{label}</p>
      <p className="mt-1 text-label text-fg-subtle">{method}</p>
    </div>
  );
}
