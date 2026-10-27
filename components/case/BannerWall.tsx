'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

/**
 * BannerWall — a packed field of real, running ad units behind a
 * case hero.
 *
 * Taken from the portfolio's masonry hero as an idea, rebuilt here.
 * What carried over is the packing algorithm, because it is good:
 * deterministic seeded placement into five zones, with an overlap
 * test and a scanline fallback, so the layout is identical on every
 * load and never reflows.
 *
 * What did not carry over:
 *  - The look. The portfolio floated these on a teal-and-cream page
 *    with a heavy multi-stop vignette. Here the wall sits on ink-900
 *    behind a single scrim, so the headline stays the brightest
 *    thing on screen.
 *  - Unlabeled frames. The portfolio shipped 19 iframes with no
 *    title, which a screen reader announces as 19 anonymous frames.
 *    Every frame here is titled, and the whole wall is marked
 *    decorative so AT skips straight to the headline.
 *  - Motion with no escape. Under reduced motion the wall renders
 *    in place with no fade and no rotation.
 *
 * Assets are not bundled. `baseUrl` points at wherever the units are
 * actually hosted, so moving them later is a one-line change here and
 * nothing else.
 */

export type Banner = {
  name: string;
  width: number;
  height: number;
  /** Path relative to baseUrl, e.g. "iframes/F65_300x600/index.html" */
  path: string;
};

const GRID = 1800;
const GAP = 30;

/** Deterministic pseudo-random so the wall packs identically every load. */
function seeded(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function overlaps(
  ax: number, ay: number, aw: number, ah: number,
  bx: number, by: number, bw: number, bh: number,
) {
  return !(
    ax + aw + GAP <= bx || bx + bw + GAP <= ax ||
    ay + ah + GAP <= by || by + bh + GAP <= ay
  );
}

type Placed = Banner & { x: number; y: number };

function pack(banners: Banner[]): Placed[] {
  const taken: { x: number; y: number; w: number; h: number }[] = [];
  const zones = [
    { x: 0, y: 0, w: GRID * 0.4, h: GRID * 0.4 },
    { x: GRID * 0.6, y: 0, w: GRID * 0.4, h: GRID * 0.4 },
    { x: 0, y: GRID * 0.6, w: GRID * 0.4, h: GRID * 0.4 },
    { x: GRID * 0.6, y: GRID * 0.6, w: GRID * 0.4, h: GRID * 0.4 },
    { x: GRID * 0.2, y: GRID * 0.2, w: GRID * 0.6, h: GRID * 0.6 },
  ];

  const place = (w: number, h: number, i: number) => {
    const preferred = zones[i % zones.length];
    const order = [preferred, ...zones.filter((_, z) => z !== i % zones.length)];

    for (const zone of order) {
      const step = 60;
      const x0 = Math.max(0, zone.x);
      const x1 = Math.min(GRID - w, zone.x + zone.w - w);
      const y0 = Math.max(0, zone.y);
      const y1 = Math.min(GRID - h, zone.y + zone.h - h);

      for (let attempt = 0; attempt < 20; attempt++) {
        const x = Math.round((x0 + seeded(i * 100 + attempt * 7) * (x1 - x0)) / step) * step;
        const y = Math.round((y0 + seeded(i * 150 + attempt * 11) * (y1 - y0)) / step) * step;
        if (x < 0 || y < 0 || x + w > GRID || y + h > GRID) continue;
        if (!taken.some((t) => overlaps(x, y, w, h, t.x, t.y, t.w, t.h))) return { x, y };
      }
    }

    // Scanline fallback.
    for (let y = 0; y <= GRID - h; y += 50) {
      for (let x = 0; x <= GRID - w; x += 50) {
        if (!taken.some((t) => overlaps(x, y, w, h, t.x, t.y, t.w, t.h))) return { x, y };
      }
    }

    const below = taken.length ? Math.max(...taken.map((t) => t.y + t.h)) + GAP : 0;
    return { x: Math.min(i * 100, GRID - w), y: Math.min(below, GRID - h) };
  };

  return banners.map((b, i) => {
    const { x, y } = place(b.width, b.height, i);
    taken.push({ x, y, w: b.width, h: b.height });
    return { ...b, x, y };
  });
}

export function BannerWall({
  banners,
  baseUrl,
  label,
}: {
  banners: Banner[];
  /** Origin the units are served from, no trailing slash. */
  baseUrl: string;
  /** What this wall shows, for the one AT-visible summary. */
  label: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [live, setLive] = useState(false);
  const placed = pack(banners);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    // Frames only mount after first paint, so the headline is never
    // waiting on 19 cross-origin documents.
    const id = requestAnimationFrame(() => setLive(true));

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(
          el,
          { opacity: 0, scale: 1.04 },
          { opacity: 1, scale: 1, duration: 1.6, ease: 'power2.out' },
        );
      });
      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(el, { opacity: 1, scale: 1, rotate: 0 });
      });
      return () => mm.revert();
    }, wrapRef);

    return () => {
      cancelAnimationFrame(id);
      ctx.revert();
    };
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden bg-ink-900">
      <div
        ref={wrapRef}
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 origin-center opacity-0 motion-safe:-rotate-[18deg]"
        style={{
          width: GRID,
          height: GRID,
          transform: 'translate(-50%, -50%)',
        }}
      >
        {placed.map((b, i) => (
          <div
            key={`${b.name}-${b.width}x${b.height}-${i}`}
            className="absolute overflow-hidden rounded-sm border border-line bg-ink-700"
            style={{ left: b.x, top: b.y, width: b.width, height: b.height }}
          >
            {live ? (
              <iframe
                src={`${baseUrl}/${b.path}`}
                title={`${b.name}, ${b.width} by ${b.height}`}
                loading="lazy"
                scrolling="no"
                tabIndex={-1}
                className="block h-full w-full border-0"
              />
            ) : (
              <span className="flex h-full w-full items-center justify-center text-label text-fg-subtle">
                {b.width}×{b.height}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Scrim.
          Earlier this was a flat ink-900/75 plus a radial on top, and
          between them the ads were a dark smudge. The wall is the only
          proof on the site that cannot be faked, so it has to be
          legible; the headline stays readable by darkening only where
          the headline actually sits rather than the whole frame.

          The gradient is strong at the bottom left, under the copy,
          and clears quickly across the rest of the wall. */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          backgroundImage: [
            'linear-gradient(to top, color-mix(in srgb, var(--color-ink-900) 94%, transparent) 0%, color-mix(in srgb, var(--color-ink-900) 70%, transparent) 28%, transparent 62%)',
            'linear-gradient(to right, color-mix(in srgb, var(--color-ink-900) 82%, transparent) 0%, transparent 55%)',
          ].join(', '),
        }}
      />

      {/* A light overall wash keeps the units from competing with the
          headline without hiding them. */}
      <div aria-hidden="true" className="absolute inset-0 bg-ink-900/25" />

      <p className="sr-only">{label}</p>
    </div>
  );
}
