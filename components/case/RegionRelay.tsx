'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * RegionRelay — the gTech hero visual.
 *
 * A 24-hour dial. Three regions each own an arc, the baton (the hand)
 * sweeps round, and every handover sends out a ripple. The centre
 * never moves: that is the shared standard, the thing that stopped
 * varying while delivery rotated round the clock.
 *
 * Arcs and labels are static markup, so reduced motion shows the
 * finished dial with every region lit. The loop only exists on the
 * no-preference branch and pauses when off screen.
 */

const CX = 180;
const CY = 180;
const R = 128;

const polar = (deg: number, r = R) => {
  const a = ((deg - 90) * Math.PI) / 180;
  // Rounded so server and client markup match exactly.
  return [+(CX + r * Math.cos(a)).toFixed(2), +(CY + r * Math.sin(a)).toFixed(2)] as const;
};
const arc = (a0: number, a1: number) => {
  const [x0, y0] = polar(a0);
  const [x1, y1] = polar(a1);
  return `M ${x0} ${y0} A ${R} ${R} 0 ${a1 - a0 > 180 ? 1 : 0} 1 ${x1} ${y1}`;
};

/** Order follows the sun: APAC, then EMEA, then AMER. 10° overlap is the handover. */
const REGIONS = [
  { id: 'APAC', from: -10, to: 125, at: 0, until: 3.1 },
  { id: 'EMEA', from: 115, to: 250, at: 2.9, until: 6.2 },
  { id: 'AMER', from: 240, to: 375, at: 6.0, until: 9 },
];
const LOOP = 9;

export function RegionRelay() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const root = rootRef.current;
      if (!root) return;

      const tl = gsap.timeline({ repeat: -1 });
      tl.fromTo('.rr-hand', { rotation: 0, svgOrigin: `${CX} ${CY}` }, { rotation: 360, svgOrigin: `${CX} ${CY}`, duration: LOOP, ease: 'none' }, 0);

      REGIONS.forEach((r, i) => {
        const mid = ((r.from + r.to) / 2 / 360) * LOOP;
        tl.fromTo(`.rr-arc-${i}`, { opacity: 0.18 }, { opacity: 1, duration: 0.35 }, r.at)
          .to(`.rr-arc-${i}`, { opacity: 0.18, duration: 0.35 }, r.until - 0.35)
          .fromTo(`.rr-label-${i}`, { opacity: 0.4 }, { opacity: 1, duration: 0.35 }, r.at)
          .to(`.rr-label-${i}`, { opacity: 0.4, duration: 0.35 }, r.until - 0.35)
          .fromTo(
            `.rr-ripple-${i}`,
            { scale: 0.2, opacity: 0.9, svgOrigin: polar((r.from + r.to) / 2).join(' ') },
            { scale: 1.8, opacity: 0, duration: 1.1, ease: 'power2.out', svgOrigin: polar((r.from + r.to) / 2).join(' ') },
            Math.max(mid - 0.1, 0),
          );
      });

      ScrollTrigger.create({
        trigger: root,
        start: 'top bottom',
        end: 'bottom top',
        onToggle: (self) => tl.paused(!self.isActive),
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <div ref={rootRef} aria-hidden="true">
      <svg viewBox="0 0 360 360" className="h-auto w-full" fill="none">
        {/* Dial and hour ticks */}
        <circle cx={CX} cy={CY} r={R + 22} className="stroke-line" strokeWidth="1" />
        {Array.from({ length: 24 }, (_, h) => {
          const [x0, y0] = polar(h * 15, R + 22);
          const [x1, y1] = polar(h * 15, R + (h % 6 === 0 ? 12 : 17));
          return <line key={h} x1={x0} y1={y0} x2={x1} y2={y1} className="stroke-line-strong" strokeWidth="1" />;
        })}

        {/* Region arcs */}
        {REGIONS.map((r, i) => (
          <path key={r.id} d={arc(r.from, r.to)} className={`rr-arc-${i} stroke-accent`} strokeWidth="14" strokeLinecap="round" />
        ))}

        {/* Handover ripples */}
        {REGIONS.map((r, i) => {
          const [x, y] = polar((r.from + r.to) / 2);
          return <circle key={r.id} cx={x} cy={y} r="22" className={`rr-ripple-${i} stroke-accent`} strokeWidth="1.5" opacity="0" />;
        })}

        {/* Labels */}
        {REGIONS.map((r, i) => {
          const [x, y] = polar((r.from + r.to) / 2, R - 30);
          return (
            <text key={r.id} x={x} y={y} textAnchor="middle" dominantBaseline="middle" className={`rr-label-${i} terminal fill-accent`} fontSize="11" letterSpacing="2">
              {r.id}
            </text>
          );
        })}

        {/* The baton */}
        <g className="rr-hand">
          <line x1={CX} y1={CY} x2={CX} y2={CY - R + 6} className="stroke-accent" strokeWidth="1" opacity="0.5" />
          <circle cx={CX} cy={CY - R} r="6" className="fill-fg" />
        </g>

        {/* The standard: never moves */}
        <circle cx={CX} cy={CY} r="44" className="fill-ink-800 stroke-accent" strokeWidth="1" strokeDasharray="3 4" />
        <text x={CX} y={CY - 4} textAnchor="middle" className="terminal fill-fg" fontSize="10" letterSpacing="2">ONE</text>
        <text x={CX} y={CY + 10} textAnchor="middle" className="terminal fill-fg" fontSize="10" letterSpacing="2">STANDARD</text>
      </svg>
    </div>
  );
}
