'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * MultiplyGrid — the hero visual.
 *
 * The idea: show the business instead of describing it. One master
 * unit on the left, the same creative resolved into every standard
 * IAB size on the right, with the market code cycling. That is
 * literally what the pipeline does, so the hero is a demonstration
 * rather than decoration.
 *
 * Why not a generic particle field or gradient: the buyer is a head
 * of production who has personally watched someone rebuild a 300x250
 * by hand. Showing the sizes they recognise does more than any
 * abstract visual, and it sets up the real banner wall on the BMW
 * case page.
 *
 * Motion rules:
 *  - Cells enter via CSS keyframes, so there is no frame where they
 *    paint visible before animating. No flash, no JS dependency.
 *  - The market cycling is JS, because it is a text swap on an
 *    interval. It does not run under reduced motion; the first
 *    market is shown and held.
 *  - Nothing loops forever except the market label, which is the
 *    one piece of motion that carries information.
 */

/** Real IAB sizes, which is the point: these are recognisable. */
const SIZES = [
  { w: 300, h: 250, name: 'Medium rectangle' },
  { w: 728, h: 90, name: 'Leaderboard' },
  { w: 300, h: 600, name: 'Half page' },
  { w: 160, h: 600, name: 'Wide skyscraper' },
  { w: 320, h: 50, name: 'Mobile banner' },
  { w: 970, h: 250, name: 'Billboard' },
  { w: 336, h: 280, name: 'Large rectangle' },
  { w: 320, h: 100, name: 'Large mobile' },
  { w: 250, h: 250, name: 'Square' },
  { w: 120, h: 600, name: 'Skyscraper' },
  { w: 468, h: 60, name: 'Full banner' },
  { w: 234, h: 60, name: 'Half banner' },
];

const MARKETS = ['NL', 'DE', 'FR', 'ES', 'IT', 'PL', 'SE', 'AT', 'BE', 'DK', 'PT', 'CZ'];

/** Scale factor so the largest unit fits the column. */
const SCALE = 0.17;

export function MultiplyGrid() {
  const [market, setMarket] = useState(0);
  const [cycling, setCycling] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setCycling(true);
    // Starts after the cells have finished entering.
    const start = window.setTimeout(() => {
      const id = window.setInterval(() => {
        setMarket((m) => (m + 1) % MARKETS.length);
      }, 1800);
      ref.current?.setAttribute('data-interval', String(id));
    }, 1600);

    return () => {
      window.clearTimeout(start);
      const id = ref.current?.getAttribute('data-interval');
      if (id) window.clearInterval(Number(id));
    };
  }, []);

  return (
    <div ref={ref} className="relative" aria-hidden="true">
      <div className="flex items-start gap-6 sm:gap-10">
        {/* ── The master ── */}
        <div className="shrink-0">
          <p className="terminal mb-2 text-label uppercase tracking-label text-fg-subtle">
            Master
          </p>
          <div
            className="relative overflow-hidden rounded-sm border border-neon/60 bg-ink-700 neon-box-glow"
            style={{ width: 300 * SCALE * 2.2, height: 250 * SCALE * 2.2 }}
          >
            <div className="grid-bg absolute inset-0 opacity-70" />
            <div className="absolute inset-0 flex flex-col justify-between p-2">
              <span className="terminal text-[9px] leading-none text-neon">
                300×250
              </span>
              <span className="terminal text-[9px] leading-none text-fg-subtle">
                1 build
              </span>
            </div>
          </div>
          <p className="terminal mt-3 text-label text-fg-subtle">
            market{' '}
            <span className="text-neon" style={{ minWidth: '2ch', display: 'inline-block' }}>
              {MARKETS[market]}
            </span>
          </p>
        </div>

        {/* ── Arrow ── */}
        <div className="mt-8 shrink-0 self-center">
          <span className="terminal text-h3 text-fg-subtle">→</span>
        </div>

        {/* ── The output ── */}
        <div className="min-w-0">
          <p className="terminal mb-2 text-label uppercase tracking-label text-fg-subtle">
            Output
          </p>
          <ul className="flex flex-wrap items-end gap-1.5">
            {SIZES.map((s, i) => (
              <li
                key={`${s.w}x${s.h}`}
                className="cell relative overflow-hidden rounded-sm border border-line-strong bg-ink-600"
                style={{
                  width: Math.max(s.w * SCALE, 10),
                  height: Math.max(s.h * SCALE, 8),
                  animationDelay: `${0.5 + i * 0.07}s`,
                }}
                title={`${s.name}, ${s.w} by ${s.h}`}
              >
                <div className="grid-bg absolute inset-0 opacity-40" />
              </li>
            ))}
          </ul>
          <p className="terminal mt-3 text-label text-fg-subtle">
            {SIZES.length} sizes × {MARKETS.length} markets ={' '}
            <span className="text-neon">{SIZES.length * MARKETS.length}</span> units
          </p>
        </div>
      </div>

      {!cycling && <span className="sr-only">One master build resolved into every standard size.</span>}
    </div>
  );
}
