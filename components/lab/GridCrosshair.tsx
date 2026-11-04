'use client';

import { useRef, type ReactNode } from 'react';
import gsap from 'gsap';
import { useIsomorphicLayoutEffect } from '@/lib/motion';

/**
 * Candidate 2: a crosshair that snaps to the grid.
 *
 * Two hairlines track the pointer and snap to the same 40px lattice
 * that `.grid-bg` paints, with a coordinate readout in mono. The
 * grid stops being wallpaper and becomes a coordinate space, which
 * is the one place the terminal motif earns its keep: an ad unit is
 * a fixed pixel box, and this is how you look at one.
 *
 * Weight: zero. Two divs and gsap.utils.snap.
 *
 * Three deliberate choices:
 *
 *  1. `cursor: crosshair`, not `cursor: none`. Codrops hides the
 *     native cursor, which looks better in a demo and is hostile in
 *     use: the pointer disappears if the JS stalls or the pointer
 *     leaves the container mid-animation. The native crosshair is
 *     also the semantically correct cursor here, so this costs
 *     nothing and keeps a real pointer on screen.
 *  2. Scoped to a container rather than the document. A site-wide
 *     custom cursor fights every button and text selection on the
 *     page.
 *  3. quickTo, not a fresh tween per pointermove. One tween object
 *     is reused, which is the difference between this holding 60fps
 *     and allocating a tween for every event.
 *
 * Snapping is what makes it feel engineered rather than decorative.
 * Unsnapped, it is just a cursor follower.
 */
const GRID = 40;

export function GridCrosshair({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  const zoneRef = useRef<HTMLDivElement>(null);
  const vRef = useRef<HTMLDivElement>(null);
  const hRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const zone = zoneRef.current;
    if (!zone) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add(
        '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)',
        () => {
          const v = vRef.current;
          const h = hRef.current;
          const tag = tagRef.current;
          if (!v || !h || !tag) return;

          const snap = gsap.utils.snap(GRID);
          const xTo = gsap.quickTo([v, tag], 'x', { duration: 0.18, ease: 'power3.out' });
          const yTo = gsap.quickTo([h, tag], 'y', { duration: 0.18, ease: 'power3.out' });

          const onMove = (e: PointerEvent) => {
            const r = zone.getBoundingClientRect();
            const x = snap(e.clientX - r.left);
            const y = snap(e.clientY - r.top);
            xTo(x);
            yTo(y);
            tag.textContent = `x ${x} · y ${y}`;
          };

          const show = () => gsap.to([v, h, tag], { autoAlpha: 1, duration: 0.2 });
          const hide = () => gsap.to([v, h, tag], { autoAlpha: 0, duration: 0.3 });

          zone.addEventListener('pointermove', onMove);
          zone.addEventListener('pointerenter', show);
          zone.addEventListener('pointerleave', hide);

          return () => {
            zone.removeEventListener('pointermove', onMove);
            zone.removeEventListener('pointerenter', show);
            zone.removeEventListener('pointerleave', hide);
          };
        },
      );
    }, zone);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={zoneRef}
      className={`relative overflow-hidden [cursor:crosshair] ${className}`}
    >
      {/* Hairlines and readout are decoration over real content. They
          start at opacity 0 so nothing shows before the pointer
          arrives, and so a device with no fine pointer never sees
          them at all. */}
      <div
        ref={vRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-20 w-px bg-neon/40 opacity-0"
      />
      <div
        ref={hRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-20 h-px bg-neon/40 opacity-0"
      />
      <div
        ref={tagRef}
        aria-hidden="true"
        className="terminal pointer-events-none absolute left-0 top-0 z-20 ml-2 mt-2 bg-ink-900/80 px-2 py-1 text-label text-neon opacity-0"
      />
      {children}
    </div>
  );
}
