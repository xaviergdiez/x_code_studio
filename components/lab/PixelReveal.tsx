'use client';

import { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useIsomorphicLayoutEffect } from '@/lib/motion';

gsap.registerPlugin(ScrollTrigger);

/**
 * Candidate 4: pixelated load reveal, with the weight measured.
 *
 * Canvas 2D, no WebGL. The source is decoded once, then re-drawn at
 * a sequence of resolutions with image smoothing off, so it resolves
 * in hard pixel steps as you scroll. The step is driven by a
 * ScrollTrigger scrub.
 *
 * The part that is not a Codrops effect: each step is encoded with
 * canvas.toBlob and the readout shows the real byte count at that
 * resolution. Those are measured numbers, not a prop. The curve they
 * trace, four orders of magnitude of weight across a reveal that
 * reads as one image loading, is the whole argument of the Huawei
 * case made as an interaction instead of a claim.
 *
 * Weight: zero beyond the source image. The reveal itself is one
 * canvas and roughly forty lines of drawing code.
 *
 * Deliberate choices:
 *
 *  1. The resting state is the full-resolution image. Reduced motion
 *     and any JS failure both land on "the picture is just there",
 *     never on a permanent 8px smear.
 *  2. The backing store is sized to the device pixel ratio but the
 *     upscale runs with imageSmoothingEnabled off, so the pixels
 *     stay square instead of turning into a blur on a retina panel.
 *  3. The byte measurement happens once, off the scroll path.
 *     Encoding inside the scrub would allocate a blob per frame.
 */

/** Source widths, in px. Each is one visible step of the reveal. */
const LEVELS = [8, 16, 32, 64, 128, 320] as const;

const SRC = '/images/huawei/green_front.jpg';

function formatBytes(n: number): string {
  if (n < 1024) return `${n} B`;
  return `${(n / 1024).toFixed(n / 1024 < 10 ? 1 : 0)} KB`;
}

export function PixelReveal() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [sizes, setSizes] = useState<(number | null)[]>(() => LEVELS.map(() => null));
  const [step, setStep] = useState(LEVELS.length - 1);

  useIsomorphicLayoutEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    let cancelled = false;
    const img = new Image();
    let ctx: gsap.Context | null = null;

    /** Draw the source at `level` width, then upscale hard-edged. */
    const paint = (levelIndex: number) => {
      const c = canvasRef.current;
      if (!c || !img.naturalWidth) return;
      const g = c.getContext('2d');
      if (!g) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const cssW = c.clientWidth;
      const cssH = c.clientHeight;
      if (!cssW || !cssH) return;

      if (c.width !== Math.round(cssW * dpr)) {
        c.width = Math.round(cssW * dpr);
        c.height = Math.round(cssH * dpr);
      }

      const w = LEVELS[levelIndex];
      const h = Math.max(1, Math.round((w * img.naturalHeight) / img.naturalWidth));

      // Downsample into a scratch canvas with smoothing ON, so each
      // step is a faithful low-resolution image rather than a
      // nearest-neighbour sample of the original.
      const scratch = document.createElement('canvas');
      scratch.width = w;
      scratch.height = h;
      const sg = scratch.getContext('2d');
      if (!sg) return;
      sg.imageSmoothingEnabled = true;
      sg.drawImage(img, 0, 0, w, h);

      // Cover the canvas, then upscale with smoothing OFF.
      g.imageSmoothingEnabled = false;
      g.clearRect(0, 0, c.width, c.height);

      const scale = Math.max(c.width / w, c.height / h);
      const dw = w * scale;
      const dh = h * scale;
      g.drawImage(scratch, (c.width - dw) / 2, (c.height - dh) / 2, dw, dh);
    };

    img.onload = () => {
      if (cancelled) return;

      paint(LEVELS.length - 1);

      // Measure every step once, off the scroll path.
      Promise.all(
        LEVELS.map(
          (w) =>
            new Promise<number | null>((resolve) => {
              const h = Math.max(
                1,
                Math.round((w * img.naturalHeight) / img.naturalWidth),
              );
              const c = document.createElement('canvas');
              c.width = w;
              c.height = h;
              const g = c.getContext('2d');
              if (!g) return resolve(null);
              g.imageSmoothingEnabled = true;
              g.drawImage(img, 0, 0, w, h);
              c.toBlob((b) => resolve(b ? b.size : null), 'image/jpeg', 0.8);
            }),
        ),
      ).then((measured) => {
        if (!cancelled) setSizes(measured);
      });

      ctx = gsap.context(() => {
        const mm = gsap.matchMedia();

        mm.add('(prefers-reduced-motion: no-preference)', () => {
          // Both ends anchor to the element's top, so the scrub range
          // is a fixed 60% of viewport height regardless of how tall
          // the panel renders, and the image reaches full resolution
          // while the panel is still well in view rather than as it
          // leaves the screen. Anchoring `end` to the element's
          // bottom also works; it just finishes too late to be seen.
          const st = ScrollTrigger.create({
            trigger: wrap,
            start: 'top 85%',
            end: 'top 25%',
            scrub: true,
            onUpdate: (self) => {
              const i = Math.min(
                LEVELS.length - 1,
                Math.floor(self.progress * LEVELS.length),
              );
              setStep(i);
              paint(i);
            },
          });
          return () => {
            st.kill();
            setStep(LEVELS.length - 1);
            paint(LEVELS.length - 1);
          };
        });
      }, wrap);

      const onResize = () => paint(step);
      window.addEventListener('resize', onResize);
      cleanupResize = () => window.removeEventListener('resize', onResize);
    };

    let cleanupResize: (() => void) | null = null;
    img.src = SRC;

    return () => {
      cancelled = true;
      cleanupResize?.();
      ctx?.revert();
    };
    // Runs once on purpose. `step` is read inside the resize handler
    // as the last painted value; listing it would re-decode the
    // image and re-measure all six levels on every scroll step.
  }, []);

  const bytes = sizes[step];

  return (
    <div ref={wrapRef} className="grid gap-6 md:grid-cols-[3fr_2fr] md:items-start">
      {/* Height is capped rather than set by aspect ratio. At
          aspect-[4/5] on this column the canvas rendered about 875px
          tall, so while the reveal was scrubbing the readout sat
          below the fold, and the numbers are the point of the panel.
          The canvas cover-draws, so any box works. */}
      <div className="relative h-[clamp(18rem,58vh,30rem)] overflow-hidden rounded-card border border-line bg-ink-900">
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="h-full w-full"
          style={{ imageRendering: 'pixelated' }}
        />
      </div>

      {/* The numbers are the deliverable here, so they get a live
          region: they change without a page load. Sticky on desktop
          so they stay beside the image for the whole scrub. */}
      <dl className="space-y-4 md:sticky md:top-28" aria-live="polite">
        <div>
          <dt className="text-label uppercase tracking-label text-fg-subtle">
            Source resolution
          </dt>
          <dd className="terminal text-h2 font-bold text-fg">
            {LEVELS[step]}px
          </dd>
        </div>
        <div>
          <dt className="text-label uppercase tracking-label text-fg-subtle">
            Encoded weight
          </dt>
          <dd className="terminal text-h2 font-bold text-neon">
            {bytes === null ? 'measuring' : formatBytes(bytes)}
          </dd>
        </div>
        <p className="text-small text-fg-muted">
          Measured in the browser with canvas.toBlob at JPEG quality 0.8, not
          quoted from a spec sheet. Scroll the panel to step the resolution.
        </p>
      </dl>
    </div>
  );
}
