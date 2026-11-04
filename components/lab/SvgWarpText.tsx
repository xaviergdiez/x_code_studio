'use client';

import { useId, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useIsomorphicLayoutEffect } from '@/lib/motion';

gsap.registerPlugin(ScrollTrigger);

/**
 * Candidate 1: scroll-driven SVG filter on text.
 *
 * feTurbulence makes a noise field, feDisplacementMap pushes the
 * glyphs around by that field, and GSAP scrubs the displacement
 * `scale` attribute from a large value down to zero as the heading
 * crosses the viewport. The text resolves itself as you read it.
 *
 * Weight: zero. No library beyond the GSAP and ScrollTrigger already
 * on the page, and the filter itself is about twelve lines of markup.
 *
 * Two deliberate choices:
 *
 *  1. The filter is attached by JS, not in the markup. The resting
 *     state is therefore undistorted, so if the script never runs
 *     the heading is simply a heading. Doing it the other way round
 *     would leave the text permanently smeared on a JS failure.
 *  2. It ends at scale 0 rather than a low value. A filter left
 *     running costs a repaint on every scroll frame and leaves the
 *     glyph edges soft, and this heading has to stay readable.
 *
 * Cost note: filtering live text is the expensive variant. One
 * heading per viewport is fine. A page of filtered body copy is not,
 * and `will-change` will not save it.
 */
export function SvgWarpText({
  children,
  className = '',
}: {
  children: string;
  className?: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const turbRef = useRef<SVGFETurbulenceElement>(null);
  const dispRef = useRef<SVGFEDisplacementMapElement>(null);

  // useId is SSR-stable; the colons it contains are not valid in a
  // CSS url() reference, so they come out.
  const filterId = `warp-${useId().replace(/:/g, '')}`;

  useIsomorphicLayoutEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const target = wrap.querySelector<HTMLElement>('[data-warp-target]');
        const turb = turbRef.current;
        const disp = dispRef.current;
        if (!target || !turb || !disp) return;

        target.style.filter = `url(#${filterId})`;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: wrap,
            start: 'top 85%',
            end: 'bottom 45%',
            scrub: 0.6,
          },
        });

        tl.fromTo(
          disp,
          { attr: { scale: 80 } },
          { attr: { scale: 0 }, ease: 'power2.out' },
          0,
        ).fromTo(
          turb,
          { attr: { baseFrequency: 0.022 } },
          { attr: { baseFrequency: 0.006 }, ease: 'none' },
          0,
        );

        // Hand the glyphs back crisp when the branch is torn down.
        return () => {
          target.style.filter = '';
        };
      });
    }, wrap);

    return () => ctx.revert();
  }, [filterId]);

  return (
    <div ref={wrapRef} className={className}>
      <svg aria-hidden="true" className="absolute h-0 w-0" focusable="false">
        <defs>
          <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence
              ref={turbRef}
              type="fractalNoise"
              baseFrequency="0.022"
              numOctaves={2}
              seed={7}
              result="noise"
            />
            <feDisplacementMap
              ref={dispRef}
              in="SourceGraphic"
              in2="noise"
              scale={80}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      <p
        data-warp-target
        className="text-h1 font-bold tracking-hero text-fg md:text-display"
      >
        {children}
      </p>
    </div>
  );
}
