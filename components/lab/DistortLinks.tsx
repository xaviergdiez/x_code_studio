'use client';

import { useId, useRef } from 'react';
import gsap from 'gsap';
import { useIsomorphicLayoutEffect } from '@/lib/motion';

/**
 * Candidate 3: distorted link effect on hover and focus.
 *
 * The same feTurbulence and feDisplacementMap pair as candidate 1,
 * but pulsed on pointer enter rather than scrubbed by scroll: the
 * displacement runs up and straight back to zero, so the label
 * ripples once and settles crisp.
 *
 * Weight: zero, and one filter is shared by every link in the list
 * rather than one per link.
 *
 * Three deliberate choices, all of them accessibility:
 *
 *  1. The filter sits on an inner span, not on the anchor. Put it on
 *     the anchor and the focus ring gets displaced along with the
 *     text, which turns the one affordance a keyboard user depends
 *     on into a smear.
 *  2. focus-visible pulses it too, so a keyboard user gets the same
 *     feedback a mouse user does instead of a dead nav.
 *  3. It returns to exactly 0 and the filter is dropped afterwards.
 *     A link parked at a low displacement is permanently slightly
 *     wrong, which reads as a rendering bug rather than as style.
 *
 * Honest caveat, which is the point of putting it here rather than
 * shipping it: distortion costs legibility for the ~400ms it runs.
 * On a nav the reader already knows, that is a fair trade. On a
 * label someone is reading for the first time, it is not. Judge it
 * on the real labels below, not on a Codrops demo reel.
 */
const LINKS = [
  { label: 'Workflow audit', href: '/offerings/audit' },
  { label: 'Pipeline tooling', href: '/offerings/tooling' },
  { label: 'Ad system build', href: '/offerings/design-system' },
  { label: 'Automation sprint', href: '/offerings/sprint' },
];

export function DistortLinks() {
  const rootRef = useRef<HTMLDivElement>(null);
  const turbRef = useRef<SVGFETurbulenceElement>(null);
  const dispRef = useRef<SVGFEDisplacementMapElement>(null);

  const filterId = `ripple-${useId().replace(/:/g, '')}`;

  useIsomorphicLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const disp = dispRef.current;
        const turb = turbRef.current;
        if (!disp || !turb) return;

        const pulse = (e: Event) => {
          const label = (e.target as Element | null)
            ?.closest?.('[data-distort-link]')
            ?.querySelector<HTMLElement>('[data-distort-label]');
          if (!label) return;

          label.style.filter = `url(#${filterId})`;

          gsap.timeline({
            onComplete: () => {
              // Crisp again, and the filter is no longer in the
              // paint path for this element.
              label.style.filter = '';
            },
          })
            .fromTo(
              disp,
              { attr: { scale: 0 } },
              { attr: { scale: 22 }, duration: 0.18, ease: 'power2.out' },
            )
            .to(disp, { attr: { scale: 0 }, duration: 0.3, ease: 'power2.in' })
            .fromTo(
              turb,
              { attr: { baseFrequency: 0.03 } },
              { attr: { baseFrequency: 0.05 }, duration: 0.48, ease: 'none' },
              0,
            );
        };

        root.addEventListener('pointerenter', pulse, true);
        root.addEventListener('focusin', pulse);

        return () => {
          root.removeEventListener('pointerenter', pulse, true);
          root.removeEventListener('focusin', pulse);
        };
      });
    }, root);

    return () => ctx.revert();
  }, [filterId]);

  return (
    <div ref={rootRef}>
      <svg aria-hidden="true" className="absolute h-0 w-0" focusable="false">
        <defs>
          <filter id={filterId} x="-15%" y="-40%" width="130%" height="180%">
            <feTurbulence
              ref={turbRef}
              type="fractalNoise"
              baseFrequency="0.03"
              numOctaves={1}
              seed={3}
              result="noise"
            />
            <feDisplacementMap
              ref={dispRef}
              in="SourceGraphic"
              in2="noise"
              scale={0}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      <ul className="divide-y divide-line border-y border-line">
        {LINKS.map((l) => (
          <li key={l.href}>
            <a
              href={l.href}
              data-distort-link
              className="flex min-h-[44px] items-center justify-between gap-4 py-4 text-h3 font-bold text-fg transition-colors hover:text-neon focus-visible:text-neon"
            >
              <span data-distort-label>{l.label}</span>
              <span className="terminal text-label text-fg-subtle" aria-hidden="true">
                {'->'}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
