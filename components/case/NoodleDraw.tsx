'use client';

import { useId, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { useIsomorphicLayoutEffect } from '@/lib/motion';

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);

/**
 * Candidate 6: the FBTO noodle.
 *
 * One path, 303 bytes of curve data, stroked at 95 units in an
 * 802-wide viewBox with round caps and joins. At that width the
 * stroke stops reading as a drawn line and starts reading as a
 * ribbon pushing into frame, which is the whole reason it works.
 * DrawSVG does the rest.
 *
 * Taken from the 2018 FBTO portfolio page. Two changes:
 *
 *  1. Scroll-scrubbed rather than a 2.2s infinite yoyo. A ribbon
 *     looping forever in the corner of a page competes with reading,
 *     and scrubbing hands the motion to the reader, who then
 *     controls a shape rather than waiting out a cycle.
 *  2. The stroke gradient is pointed at the design tokens. The
 *     original ran #37e474 to #06adff, green into blue, which is
 *     already neon into signal near enough that nothing had to be
 *     invented. A case page that sets data-accent gets its accent
 *     at the head of the ribbon instead.
 *
 * Weight: the path, a two-stop gradient, and one tween. DrawSVG was
 * already registered for AdaptiveStage, so this adds no plugin.
 */

const NOODLE_VIEWBOX = '0 0 802.11 1009.5';

const NOODLE_D =
  'M47.5,962Q132,881.21,93,775c-38.9-106.28-5.33-165.6,44.45-195.74S263.74,545,320,635.11,434.78,713.18,464,698s48.74-50.23,41.15-91.41c-16.79-91.07-134-76.87-143.35-161.73s89.17-131,164.89-64.39c78.74,69.23,169.56,36.41,203.68-21.54,56.39-95.71,12.7-197.7-113.37-233.82C558.83,109,512.55,81.62,481.11,47.5';

export function NoodleDraw({
  className = 'relative',
  svgClassName = 'mx-auto block h-[clamp(18rem,56vh,28rem)] w-auto overflow-visible',
  preserveAspectRatio = 'xMidYMid meet',
}: {
  /** Wrapper. Also where to set --noodle-start / --noodle-end. */
  className?: string;
  /** Sizing for the svg itself, so it can fill a hero instead of
   *  sitting centred at its own height. */
  svgClassName?: string;
  /** 'slice' fills and crops, for use as a full-bleed backdrop. */
  preserveAspectRatio?: string;
} = {}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const gradId = `noodle-${useId().replace(/[^a-zA-Z0-9]/g, '')}`;

  useIsomorphicLayoutEffect(() => {
    const wrap = wrapRef.current;
    const path = pathRef.current;
    if (!wrap || !path) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Resting state is the finished ribbon, so reduced motion and
      // any script failure both land on a drawn shape rather than on
      // an empty box.
      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(path, { drawSVG: '0% 100%' });
      });

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const tw = gsap.fromTo(
          path,
          { drawSVG: '0% 0%' },
          {
            drawSVG: '0% 100%',
            ease: 'none',
            scrollTrigger: {
              trigger: wrap,
              start: 'top 80%',
              end: 'top 25%',
              scrub: 0.5,
            },
          },
        );
        return () => {
          tw.scrollTrigger?.kill();
          tw.kill();
          gsap.set(path, { drawSVG: '0% 100%' });
        };
      });
    }, wrap);

    return () => ctx.revert();
  }, [gradId]);

  return (
    <div ref={wrapRef} className={className}>
      <svg
        viewBox={NOODLE_VIEWBOX}
        preserveAspectRatio={preserveAspectRatio}
        className={svgClassName}
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <linearGradient
            id={gradId}
            x1="47.5"
            y1="962"
            x2="481.11"
            y2="47.5"
            gradientUnits="userSpaceOnUse"
          >
            {/* Token-driven, so the ribbon follows the site rather
                than carrying FBTO's literal brand colours. neon into
                signal is the same green-into-blue the original ran.

                Not var(--color-accent) with a signal fallback: the
                fallback can never fire, because @theme already
                defines --color-accent as neon. That painted the
                whole ribbon one flat green. A page that wants its
                accent here overrides --noodle-end. */}
            <stop offset="0" style={{ stopColor: 'var(--noodle-start, var(--color-neon))' }} />
            <stop offset="1" style={{ stopColor: 'var(--noodle-end, var(--color-signal))' }} />
          </linearGradient>
        </defs>

        <path
          ref={pathRef}
          d={NOODLE_D}
          fill="none"
          stroke={`url(#${gradId})`}
          strokeWidth="95"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
