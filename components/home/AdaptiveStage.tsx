'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin';

/**
 * AdaptiveStage — the hero device, drawn as a schematic.
 *
 * One outline that redraws itself as a phone, tablet, laptop and
 * display, with a whole interface inside it that genuinely reflows:
 * the nav pills collapse to a hamburger on mobile, the hero stacks or
 * splits, the cards go from a column to a row to a sidebar. Every
 * piece is a path built by the same rounded-rect function, so the
 * point counts match and MorphSVG can carry all of them at once.
 *
 * Between morphs the content is alive: headlines type in (scaleX
 * from the left), thumbnails flick on, a cursor travels to the CTA
 * and clicks it, a scan line sweeps the screen, and the screen swaps
 * its finish (ink, neon wash, hatch) through a growing circular mask.
 * Dimension lines morph with the body and the ruler tracks the
 * viewport width. DrawSVG draws the outline, brackets and ruler on.
 *
 * Eases are varied on purpose: expo for the body, power4 for the
 * blocks, elastic for the settle, so nothing moves in lockstep.
 *
 * Flash rule: the hidden starting state is CSS (.as-* in
 * globals.css) because GSAP runs after paint. Under reduced motion
 * none of it applies and the mobile layout is shown still.
 */

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin, MorphSVGPlugin);

const rr = (x: number, y: number, w: number, h: number, r: number) => {
  r = Math.min(r, w / 2, h / 2);
  return `M${x + r} ${y}H${x + w - r}A${r} ${r} 0 0 1 ${x + w} ${y + r}V${y + h - r}A${r} ${r} 0 0 1 ${x + w - r} ${y + h}H${x + r}A${r} ${r} 0 0 1 ${x} ${y + h - r}V${y + r}A${r} ${r} 0 0 1 ${x + r} ${y}Z`;
};
const ln = (x0: number, y0: number, x1: number, y1: number) => `M${x0} ${y0}L${x1} ${y1}`;

/** Every device lays out the same 22 shapes, in this order. */
const KEYS = [
  'hdr', 'logo', 'nav0', 'nav1', 'nav2',
  'hero', 'media', 'x0', 'x1', 'h0', 'h1', 'cta',
  'c0', 'c1', 'c2', 't0', 't1', 't2', 'l0', 'l1', 'l2',
] as const;
type Key = (typeof KEYS)[number];
type Shapes = Record<Key, string>;

type Device = {
  name: string;
  px: number;
  body: [number, number, number, number, number]; // x, y, w, h, r
  extra?: 'laptop' | 'desk';
  /** screen-wipe origin */
  wipe: [number, number];
};

const DEVICES: Device[] = [
  { name: 'Mobile', px: 390, body: [315, 100, 170, 360, 30], wipe: [400, 300] },
  { name: 'Tablet', px: 820, body: [250, 90, 300, 380, 20], wipe: [260, 470] },
  { name: 'Laptop', px: 1440, body: [185, 95, 430, 280, 14], extra: 'laptop', wipe: [190, 380] },
  { name: 'Display', px: 1920, body: [110, 80, 580, 330, 14], extra: 'desk', wipe: [690, 90] },
];

/**
 * The interface for a device.
 *
 * Containers (header, hero, cards) are world-space paths that morph
 * with the body. Details (logo, nav, media, text, CTA, thumbnails) are
 * drawn centred on their own origin, or left-aligned for text, inside
 * a <g> that carries nothing but the translate. GSAP only ever scales
 * the inner path about its own centre (or left edge), so the pivot can
 * never go stale. Details scale to nothing, swap path and translate
 * while invisible, then pop back in.
 */
type Layout = {
  shapes: Shapes;
  /** translate for every detail, in world space */
  place: Partial<Record<Key, [number, number]>>;
  /** stroke width of each text line (they are drawn as strokes, not fills) */
  weight: Partial<Record<Key, number>>;
  cta: [number, number];
};

function layout(i: number): Layout {
  const [bx, by, bw, bh] = DEVICES[i].body;
  const x = bx + 14, y = by + 14, w = bw - 28;
  const shapes = {} as Shapes;
  const place: Layout['place'] = {};
  const weight: Layout['weight'] = {};

  /** Detail centred on (cx, cy). */
  const det = (k: Key, cx: number, cy: number, dw: number, dh: number, r: number) => {
    shapes[k] = rr(-dw / 2, -dh / 2, dw, dh, r);
    place[k] = [cx, cy];
  };
  /** Text line starting at (left, cy), drawn as a stroke so DrawSVG can type it in with no transform. */
  const detL = (k: Key, left: number, cy: number, dw: number, dh: number) => {
    shapes[k] = `M0 0H${dw}`;
    place[k] = [left, cy];
    weight[k] = dh;
  };
  const diag = (k: Key, x0: number, y0: number, x1: number, y1: number) => {
    const cx = (x0 + x1) / 2, cy = (y0 + y1) / 2;
    shapes[k] = ln(x0 - cx, y0 - cy, x1 - cx, y1 - cy);
    place[k] = [cx, cy];
  };
  const media = (mx: number, my: number, mw: number, mh: number) => {
    det('media', mx + mw / 2, my + mh / 2, mw, mh, 8);
    diag('x0', mx + 4, my + 4, mx + mw - 4, my + mh - 4);
    diag('x1', mx + mw - 4, my + 4, mx + 4, my + mh - 4);
  };
  const pills = (px: number, py: number, pw: number, ph: number, gap: number) =>
    [0, 1, 2].forEach((n) => det(`nav${n}` as Key, px + pw / 2 + n * gap, py + ph / 2, pw, ph, ph / 2));
  const card = (n: number, cx: number, cy: number, cw: number, ch: number, thumb: [number, number, number, number], line: [number, number, number]) => {
    shapes[`c${n}` as Key] = rr(cx, cy, cw, ch, 8);
    det(`t${n}` as Key, cx + thumb[0] + thumb[2] / 2, cy + thumb[1] + thumb[3] / 2, thumb[2], thumb[3], 5);
    detL(`l${n}` as Key, cx + line[0], cy + line[1] + 2.5, line[2], 5);
  };
  let cta: [number, number];

  if (i === 0) {
    // Mobile: hamburger, stacked hero, card column.
    shapes.hdr = rr(x, y, w, 22, 6);
    det('logo', x + 11, y + 11, 10, 10, 5);
    [0, 1, 2].forEach((n) => det(`nav${n}` as Key, x + w - 15, y + 7 + n * 4 + 1, 14, 2, 1));
    shapes.hero = rr(x, y + 30, w, 134, 8);
    media(x + 8, y + 38, w - 16, 54);
    detL('h0', x + 8, y + 104.5, w * 0.7, 5);
    detL('h1', x + 8, y + 114.5, w * 0.45, 5);
    det('cta', x + 32, y + 139, 48, 18, 9);
    cta = [x + 32, y + 139];
    [0, 1, 2].forEach((n) => card(n, x, y + 172 + n * 50, w, 44, [6, 6, 32, 32], [46, 14, w - 60]));
  } else if (i === 1) {
    // Tablet: nav pills appear, hero splits, cards sit in a row.
    shapes.hdr = rr(x, y, w, 24, 6);
    det('logo', x + 13, y + 12, 10, 10, 5);
    pills(x + w - 96, y + 8, 24, 8, 30);
    shapes.hero = rr(x, y + 32, w, 150, 10);
    media(x + w - 128, y + 40, 120, 134);
    detL('h0', x + 12, y + 67, 100, 6);
    detL('h1', x + 12, y + 81, 70, 6);
    det('cta', x + 40, y + 112, 56, 20, 10);
    cta = [x + 40, y + 112];
    const cw = (w - 16) / 3;
    [0, 1, 2].forEach((n) => card(n, x + n * (cw + 8), y + 190, cw, 148, [6, 6, cw - 12, 76], [6, 92, cw * 0.6]));
  } else if (i === 2) {
    // Laptop: full nav, wide hero with media on the right, three cards.
    shapes.hdr = rr(x, y, w, 24, 6);
    det('logo', x + 13, y + 12, 10, 10, 5);
    pills(x + w - 106, y + 8, 28, 8, 34);
    shapes.hero = rr(x, y + 32, w, 120, 10);
    media(x + w - 152, y + 40, 144, 104);
    detL('h0', x + 14, y + 65.5, 170, 7);
    detL('h1', x + 14, y + 81.5, 116, 7);
    det('cta', x + 47, y + 113, 66, 22, 11);
    cta = [x + 47, y + 113];
    const cw = (w - 16) / 3;
    [0, 1, 2].forEach((n) => card(n, x + n * (cw + 8), y + 160, cw, 92, [6, 6, cw - 12, 50], [8, 66, cw * 0.55]));
  } else {
    // Display: hero takes the left, cards become a sidebar.
    shapes.hdr = rr(x, y, w, 26, 6);
    det('logo', x + 15, y + 13, 10, 10, 5);
    pills(x + w - 144, y + 9, 36, 8, 46);
    shapes.hero = rr(x, y + 34, 340, 268, 10);
    media(x + 10, y + 44, 320, 156);
    detL('h0', x + 16, y + 220, 230, 8);
    detL('h1', x + 16, y + 238, 160, 8);
    det('cta', x + 58, y + 269, 84, 26, 13);
    cta = [x + 58, y + 269];
    [0, 1, 2].forEach((n) => card(n, x + 348, y + 34 + n * 93, w - 348, 84, [8, 8, 68, 68], [86, 30, 100]));
  }
  return { shapes, place, weight, cta };
}

const POP_KEYS: Key[] = ['logo', 'nav0', 'nav1', 'nav2', 'media', 'x0', 'x1', 'cta', 't0', 't1', 't2'];
const TYPE_KEYS: Key[] = ['h0', 'h1', 'l0', 'l1', 'l2'];

const LAYOUTS = DEVICES.map((_, i) => layout(i));
const bodyPath = (d: Device) => rr(...d.body);

/** Dimension lines (width above, height at the right), same structure for every device. */
const dimW = (d: Device) => {
  const [x, y, w] = d.body, yy = y - 30;
  return `M${x} ${yy}v8M${x} ${yy + 4}H${x + w}M${x + w} ${yy}v8`;
};
const dimH = (d: Device) => {
  const [x, y, w, h] = d.body, xx = x + w + 24;
  return `M${xx} ${y}h8M${xx + 4} ${y}V${y + h}M${xx} ${y + h}h8`;
};

const LAPTOP_BASE = 'M150 392H650';
const DESK_STAND = 'M400 410V462M316 474H484';
const CURSOR = 'M0 0V15L4.2 11.4L6.9 17.2L9.2 16.2L6.5 10.5H11.8Z';

const RULER_X0 = 150;
const RULER_W = 500;
const rulerX = (px: number) => RULER_X0 + (px / 1920) * RULER_W;

/** Look of each shape: containers are outlines, content is lines and washes. */
const STYLE: Record<Key, string> = {
  hdr: 'fill-ink-900/60 stroke-neon/45', logo: 'fill-neon/40 stroke-neon', nav0: 'fill-neon/25 stroke-neon/60', nav1: 'fill-neon/25 stroke-neon/60', nav2: 'fill-neon/25 stroke-neon/60',
  hero: 'fill-ink-900/50 stroke-neon/45', media: 'fill-neon/8 stroke-neon/45', x0: 'stroke-neon/35', x1: 'stroke-neon/35', h0: 'fill-none stroke-fg/55', h1: 'fill-none stroke-fg/30', cta: 'fill-neon stroke-neon',
  c0: 'fill-ink-900/60 stroke-neon/40', c1: 'fill-ink-900/60 stroke-neon/40', c2: 'fill-ink-900/60 stroke-neon/40',
  t0: 'fill-neon/20 stroke-neon/55', t1: 'fill-neon/20 stroke-neon/55', t2: 'fill-neon/20 stroke-neon/55',
  l0: 'fill-none stroke-fg/40', l1: 'fill-none stroke-fg/40', l2: 'fill-none stroke-fg/40',
};

export function AdaptiveStage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<SVGTextElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const root = rootRef.current;
      const label = labelRef.current;
      if (!root || !label) return;

      const w = { px: DEVICES[0].px };
      const setLabel = () => {
        const nearest = DEVICES.reduce((a, b) => (Math.abs(b.px - w.px) < Math.abs(a.px - w.px) ? b : a));
        label.textContent = `${nearest.name} · ${Math.round(w.px)} px`;
        gsap.set('.as-marker', { x: rulerX(w.px) - rulerX(DEVICES[0].px) });
      };

      const layerEls = gsap.utils.toArray<SVGGElement>('.as-layer');
      const wipe = (tl: gsap.core.Timeline, k: number, from: [number, number], at: number, dur: number) => {
        const layer = layerEls[k];
        const circle = root.querySelector(`#as-mask-${k} circle`);
        tl.call(() => { layer.parentNode?.appendChild(layer); }, [], at)
          .set(circle, { attr: { cx: from[0], cy: from[1], r: 0 } }, at)
          .to(circle, { attr: { r: 900 }, duration: dur, ease: 'power3.inOut' }, at);
      };

      /**
       * Containers (header, hero, cards) stay glued to the body: same
       * ease, same duration, so nothing floats. Everything inside them
       * shrinks to nothing, swaps layout while invisible, then pops back
       * with a bounce in reading order.
       */
      const CONTAINERS: Key[] = ['hdr', 'hero', 'c0', 'c1', 'c2'];
      const POP = POP_KEYS;
      const TYPE = TYPE_KEYS;

      const popIn = (tl: gsap.core.Timeline, at: number) => {
        POP.forEach((k, n) =>
          tl.fromTo(`.as-ui-${k}`, { scale: 0 }, { scale: 1, duration: 0.8, ease: 'back.out(2.6)', immediateRender: false, transformOrigin: 'center center' }, at + n * 0.055),
        );
        TYPE.forEach((k, n) =>
          tl.fromTo(`.as-ui-${k}`, { drawSVG: '0% 0%' }, { drawSVG: '0% 100%', duration: 0.6, ease: 'power3.out', immediateRender: false }, at + 0.25 + n * 0.09),
        );
      };

      const popOut = (tl: gsap.core.Timeline, at: number) => {
        tl.to(POP.map((k) => `.as-ui-${k}`), { scale: 0, duration: 0.28, ease: 'power3.in', transformOrigin: 'center center', stagger: { each: 0.012, from: 'end' } }, at)
          .to(TYPE.map((k) => `.as-ui-${k}`), { drawSVG: '100% 100%', duration: 0.22, ease: 'power2.in', stagger: 0.02 }, at);
      };

      /** Once the layout has settled: the cursor travels to the CTA and clicks it. */
      const content = (tl: gsap.core.Timeline, i: number, at: number) => {
        const [cx, cy] = LAYOUTS[i].cta;
        tl.to('.as-cursor', { x: cx, y: cy, autoAlpha: 1, duration: 1, ease: 'power3.inOut' }, at)
          .set('.as-click', { attr: { cx, cy }, scale: 0, opacity: 0.9, svgOrigin: `${cx} ${cy}` }, at + 1.05)
          .to('.as-click', { scale: 2.6, opacity: 0, duration: 0.6, ease: 'power2.out' }, at + 1.05)
          .to('.as-ui-cta', { scale: 0.86, duration: 0.1, yoyo: true, repeat: 1, ease: 'power2.inOut', transformOrigin: 'center center' }, at + 1.05)
          .to('.as-cursor', { scale: 0.85, duration: 0.1, yoyo: true, repeat: 1, transformOrigin: '0% 0%' }, at + 1.05);
      };

      const DUR = 1.5;
      const morphTo = (tl: gsap.core.Timeline, i: number, at: number) => {
        const d = DEVICES[i];
        const sh = LAYOUTS[i].shapes;
        tl.to('.as-cursor', { autoAlpha: 0, duration: 0.25 }, at);
        popOut(tl, at);
        // Body and containers move as one.
        const start = at + 0.25;
        tl.to('.as-body', { morphSVG: bodyPath(d), duration: DUR, ease: 'expo.inOut' }, start);
        CONTAINERS.forEach((k) => tl.to(`.as-ui-${k}`, { morphSVG: sh[k], duration: DUR, ease: 'expo.inOut' }, start));
        // Invisible details jump to their new positions.
        [...POP, ...TYPE].forEach((k) => {
          const [px, py] = LAYOUTS[i].place[k]!;
          // Only once popOut has fully finished (0.28s + stagger), so nothing is seen jumping.
          tl.set(`.as-det-${k}`, { attr: { transform: `translate(${px} ${py})` } }, at + 0.62)
            .set(`.as-ui-${k}`, { attr: { d: sh[k], ...(LAYOUTS[i].weight[k] ? { 'stroke-width': LAYOUTS[i].weight[k] } : {}) } }, at + 0.62);
        });
        tl.to('.as-dim-w', { morphSVG: dimW(d), duration: DUR, ease: 'expo.inOut' }, start)
          .to('.as-dim-h', { morphSVG: dimH(d), duration: DUR, ease: 'expo.inOut' }, start)
          .to(w, { px: d.px, duration: DUR, ease: 'power3.inOut', onUpdate: setLabel }, start)
          // The device squeezes in, then settles out with spring.
          .to('.as-device', { scale: 0.9, skewX: -4, duration: 0.5, ease: 'power2.in', transformOrigin: '400px 300px' }, start)
          .to('.as-device', { scale: 1, skewX: 0, duration: 1.1, ease: 'elastic.out(1, 0.55)' }, start + 0.5);
        wipe(tl, i % 3, d.wipe, start + 0.1, DUR + 0.2);
        popIn(tl, start + DUR - 0.45);
        return start + DUR + 0.55; // when the layout has fully popped in
      };

      /**
       * One cycle, built fresh each time. A repeating timeline rewinds
       * finished tweens to their start values, which strands the details
       * in the wrong layout after the first loop. Rebuilding from the
       * live state each cycle avoids rewinding altogether.
       */
      let alive = true;
      let current: gsap.core.Timeline | null = null;
      let visible = true;
      const cycle = () => {
        const loop = gsap.timeline({ onComplete: () => { if (alive) current = cycle(); } });
        const HOLD = 2.4;
        let t = 0.3;
        DEVICES.forEach((d, i) => {
          if (i === 0) return;
          if (DEVICES[i - 1].extra === 'laptop') loop.to('.as-ex-laptop', { drawSVG: '100% 100%', duration: 0.5, ease: 'power3.in' }, t);
          if (DEVICES[i - 1].extra === 'desk') loop.to('.as-ex-desk', { drawSVG: '100% 100%', duration: 0.5, ease: 'power3.in' }, t);
          const settled = morphTo(loop, i, t);
          if (d.extra === 'laptop') loop.to('.as-ex-laptop', { drawSVG: '0% 100%', duration: 0.9, ease: 'power3.out' }, t + 1);
          if (d.extra === 'desk') loop.to('.as-ex-desk', { drawSVG: '0% 100%', duration: 0.9, ease: 'power3.out' }, t + 1);
          content(loop, i, settled);
          t = settled + HOLD;
        });
        loop.to('.as-ex-desk', { drawSVG: '100% 100%', duration: 0.5, ease: 'power3.in' }, t);
        const back = morphTo(loop, 0, t);
        content(loop, 0, back);
        loop.to({}, { duration: HOLD }, back);
        loop.paused(!visible);
        return loop;
      };

      const intro = gsap.timeline();
      intro
        .set(['.as-outline', '.as-corner', '.as-ex-laptop', '.as-ex-desk'], { autoAlpha: 1 })
        .set('.as-ex-laptop, .as-ex-desk', { drawSVG: '100% 100%' })
        .set('.as-cursor', { x: 640, y: 540 })
        .fromTo('.as-corner', { drawSVG: '50% 50%' }, { drawSVG: '0% 100%', duration: 1, stagger: 0.12, ease: 'power3.out' }, 0)
        .fromTo('.as-outline', { drawSVG: '50% 50%' }, { drawSVG: '0% 100%', duration: 1.5, ease: 'power3.inOut' }, 0.3)
        .to('.as-fill', { autoAlpha: 1, duration: 0.9, ease: 'power2.out' }, 1.2)
        .fromTo(
          '.as-ui',
          { autoAlpha: 0, scale: 0, transformOrigin: 'center center' },
          { autoAlpha: 1, scale: 1, duration: 0.8, stagger: 0.04, ease: 'back.out(2.2)' },
          1.5,
        )
        .to('.as-dim', { autoAlpha: 1, duration: 0.6 }, 2)
        .fromTo('.as-ruler', { drawSVG: '50% 50%', autoAlpha: 1 }, { drawSVG: '0% 100%', duration: 1, ease: 'power3.out' }, 1.7)
        .to(['.as-marker', '.as-label'], { autoAlpha: 1, duration: 0.5 }, 2.2)
        .call(setLabel, [], 2.2);
      content(intro, 0, 3);
      intro.call(() => { current = cycle(); }, [], '+=2.4');

      // A scan line sweeps the screen, forever.
      const sweep = gsap.fromTo('.as-sweep', { x: 90 }, { x: 710, duration: 3.4, ease: 'power1.inOut', repeat: -1, repeatDelay: 0.8 });

      ScrollTrigger.create({
        trigger: root,
        start: 'top bottom',
        end: 'bottom top',
        onToggle: (self) => {
          visible = self.isActive;
          intro.paused(!visible);
          current?.paused(!visible);
          sweep.paused(!visible);
        },
      });

      return () => {
        alive = false;
        intro.kill();
        sweep.kill();
        // Cycles are created after the context ran, so revert() can't see them: kill and restore layout 0 by hand.
        current?.kill();
        gsap.killTweensOf(root.querySelectorAll('*'));
        const q = (sel: string) => root.querySelectorAll<SVGElement>(sel);
        const L = LAYOUTS[0];
        q('.as-body').forEach((e) => e.setAttribute('d', bodyPath(DEVICES[0])));
        q('.as-dim-w').forEach((e) => e.setAttribute('d', dimW(DEVICES[0])));
        q('.as-dim-h').forEach((e) => e.setAttribute('d', dimH(DEVICES[0])));
        [...CONTAINERS, ...POP, ...TYPE].forEach((k) => {
          q(`.as-ui-${k}`).forEach((e) => {
            e.setAttribute('d', L.shapes[k]);
            if (L.weight[k]) e.setAttribute('stroke-width', String(L.weight[k]));
          });
          const pl = L.place[k];
          if (pl) q(`.as-det-${k}`).forEach((e) => e.setAttribute('transform', `translate(${pl[0]} ${pl[1]})`));
        });
        gsap.set(root.querySelectorAll('.as-device, .as-ui, .as-ex-laptop, .as-ex-desk'), { clearProps: 'transform,opacity,visibility,strokeDasharray,strokeDashoffset' });
      };
    }, rootRef);

    return () => mm.revert();
  }, []);

  const d0 = DEVICES[0];
  const L0 = LAYOUTS[0].shapes;
  const P0 = LAYOUTS[0].place;
  const W0 = LAYOUTS[0].weight;

  return (
    <div ref={rootRef} aria-hidden="true" className="w-full">
      <svg viewBox="0 0 800 640" className="h-auto w-full overflow-visible" fill="none">
        <defs>
          <clipPath id="as-clip">
            <path d={bodyPath(d0)} className="as-body" />
          </clipPath>
          <pattern id="as-hatch" width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="9" className="stroke-neon/20" strokeWidth="1" />
          </pattern>
          {[0, 1, 2].map((i) => (
            <mask key={i} id={`as-mask-${i}`} maskUnits="userSpaceOnUse" x="0" y="0" width="800" height="640">
              <circle cx="400" cy="300" r={i === 0 ? 900 : 0} fill="white" />
            </mask>
          ))}
          <radialGradient id="as-glow">
            <stop offset="0" style={{ stopColor: 'var(--color-neon)', stopOpacity: 0.3 }} />
            <stop offset="1" style={{ stopColor: 'var(--color-neon)', stopOpacity: 0 }} />
          </radialGradient>
        </defs>

        {['M30 70V30H70', 'M730 30H770V70', 'M770 570V610H730', 'M70 610H30V570'].map((d) => (
          <path key={d} d={d} className="as-corner stroke-neon/60" strokeWidth="2" strokeLinecap="round" />
        ))}

        <ellipse cx="400" cy="520" rx="260" ry="34" fill="url(#as-glow)" className="as-fill" />

        {/* Dimension lines */}
        <path d={dimW(d0)} className="as-dim as-dim-w stroke-fg-subtle" strokeWidth="1" />
        <path d={dimH(d0)} className="as-dim as-dim-h stroke-fg-subtle" strokeWidth="1" />

        <g className="as-device">
          <path d={LAPTOP_BASE} className="as-ex-laptop stroke-neon" strokeWidth="3" strokeLinecap="round" />
          <path d={DESK_STAND} className="as-ex-desk stroke-neon" strokeWidth="3" strokeLinecap="round" />

          {/* Screen: ink underlay, finishes clipped to the body, scan line, UI, then the drawn outline */}
          <path d={bodyPath(d0)} className="as-body as-fill fill-ink-900" />
          <g clipPath="url(#as-clip)" className="as-fill">
            {['fill-ink-900', 'fill-neon/10', ''].map((c, i) => (
              <g key={i} className="as-layer" mask={`url(#as-mask-${i})`}>
                <rect x="0" y="0" width="800" height="640" className={c} fill={i === 2 ? 'url(#as-hatch)' : undefined} />
              </g>
            ))}
            <rect className="as-sweep fill-neon/25" x="0" y="0" width="2" height="640" />
          </g>
          <g clipPath="url(#as-clip)">
          {KEYS.map((k) => {
            const at = P0[k];
            const wt = W0[k];
            const path = (
              <path
                d={L0[k]}
                className={`as-ui as-ui-${k} ${STYLE[k]}`}
                strokeWidth={wt ?? 1}
                strokeLinecap={wt ? 'butt' : 'round'}
              />
            );
            return at ? (
              <g key={k} className={`as-det-${k}`} transform={`translate(${at[0]} ${at[1]})`}>
                {path}
              </g>
            ) : (
              <g key={k}>{path}</g>
            );
          })}
          </g>
          <path d={bodyPath(d0)} className="as-body as-outline stroke-neon" strokeWidth="2.5" />
        </g>

        <circle className="as-click stroke-neon" r="14" cx="0" cy="0" strokeWidth="2" />
        <path d={CURSOR} className="as-cursor fill-ink-900 stroke-fg" strokeWidth="1.2" strokeLinejoin="round" />

        <path d={`M${RULER_X0} 590H${RULER_X0 + RULER_W}`} className="as-ruler stroke-line-strong" strokeWidth="2" strokeLinecap="round" />
        <circle cx={rulerX(d0.px)} cy="590" r="6" className="as-marker fill-neon" />
        <text ref={labelRef} x="400" y="626" textAnchor="middle" fontSize="14" letterSpacing="1.5" className="as-label terminal fill-fg stroke-ink-900" strokeWidth="5" paintOrder="stroke">
          {d0.name} · {d0.px} px
        </text>
      </svg>
    </div>
  );
}
