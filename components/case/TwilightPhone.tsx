'use client';

import { useId, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { useIsomorphicLayoutEffect } from '@/lib/motion';
import {
  PHONE_VIEWBOX,
  PHONE_BODY,
  PHONE_OUTER,
  PHONE_INNER,
  PHONE_PHOTO,
  PHONE_PHOTO_SRC,
} from './huaweiPaths';

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);

/**
 * Candidate 5: the Twilight phone, ported from the 2018 banner.
 *
 * This is not a Codrops effect. It is the Huawei Mate 20 Pro unit
 * that shipped at ThisPageAmsterdam, brought forward from GSAP 2 to GSAP 3 and
 * rewired for the site. It earns its place over the borrowed effects
 * because it is the case study rather than an illustration of it:
 * "a phone you can turn over, in under 150KB" is a claim on the
 * homepage, and this is the thing that backs it.
 *
 * How the finish is made, which is the whole trick:
 *
 *   - The phone is one filled path. No photograph of a phone.
 *   - Its Twilight finish is an eight-stop linear gradient. The
 *     stops are animated individually, so the colour ramp travels
 *     up the body instead of cross-fading.
 *   - Tilt shifts the phone's hues one way and the background's the
 *     opposite way, which is what makes the glass read as glass:
 *     real Twilight shifts against its surroundings as you turn it.
 *   - feSpecularLighting with a point light adds the sheen. In the
 *     original the light sat fixed at the centre; here it tracks the
 *     pointer, which is the one thing the banner could not do inside
 *     a 300x600 iframe with no pointer of its own.
 *
 * No video, no image sequence, no sprite sheet. That is the point:
 * all three were ruled out by the weight budget, and this is what
 * was built instead.
 *
 * Ported, not copied: GSAP 2's TweenMax and `cycle` are gone, easing
 * names are v3, and the Huawei wordmark, the client CTA and the
 * Dutch copy are all left out. The technique is transferable, the
 * client's ad is theirs.
 */

/** Resting Twilight ramp, bottom of the phone to the top. */
const RAMP: readonly [number, number, number][] = [
  [212, 30, 8],
  [219, 29, 9],
  [237, 30, 12],
  [248, 38, 16],
  [253, 45, 22],
  [240, 51, 48],
  [204, 95, 60],
  [197, 94, 79],
];

/** Stop positions, carried over from the shipped unit. */
const OFFSETS = [0, 0.1, 0.18, 0.26, 0.32, 0.6, 0.87, 1] as const;

/** The dark state every stop starts from, before the ramp travels up. */
const DARK = 'hsl(212, 30%, 8%)';

/**
 * One stop's colour at a given tilt. `dir` is +1 for the phone and
 * -1 for the background, which is what opposes the two shifts.
 * The first stop takes the raw yaw and the rest take three times it,
 * exactly as the original did: the anchor stop stays put while the
 * ramp above it swings, so the gradient bends rather than slides.
 */
function stopColor(i: number, yaw: number, pitch: number, dir: 1 | -1): string {
  const [h, s, l] = RAMP[i];
  const hue = h + dir * yaw * (i === 0 ? 1 : 3);
  const sat = gsap.utils.clamp(0, 100, s + dir * pitch);
  const lum = gsap.utils.clamp(0, 100, l + dir * pitch);
  return `hsl(${hue}, ${sat}%, ${lum}%)`;
}

export function TwilightPhone() {
  const wrapRef = useRef<HTMLDivElement>(null);
  // The two gradients and the light are held by ref rather than
  // looked up by selector. Generated ids plus gsap.context scoping
  // gave a silent partial failure here: the phone's stops animated
  // and the backdrop's did not, with no error anywhere. A ref cannot
  // miss.
  const phoneGradRef = useRef<SVGLinearGradientElement>(null);
  const backGradRef = useRef<SVGLinearGradientElement>(null);
  const lightRef = useRef<SVGFEPointLightElement>(null);

  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  const gPhone = `tw-phone-${uid}`;
  const gBack = `tw-back-${uid}`;
  const fLight = `tw-light-${uid}`;
  const fShadow = `tw-shadow-${uid}`;
  const pPhoto = `tw-photo-${uid}`;

  useIsomorphicLayoutEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      const phoneStops = () =>
        Array.from(phoneGradRef.current?.querySelectorAll('stop') ?? []);
      const backStops = () =>
        Array.from(backGradRef.current?.querySelectorAll('stop') ?? []);

      // ── Reduced motion: paint the finished state, animate nothing.
      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set('[data-tw-body], [data-tw-photo]', { autoAlpha: 1 });
        gsap.set('[data-tw-outline]', { autoAlpha: 0 });
        phoneStops().forEach((s, i) =>
          gsap.set(s, { stopColor: stopColor(i, 0, 0, 1) }),
        );
        backStops().forEach((s, i) =>
          gsap.set(s, { stopColor: stopColor(i, 0, 0, -1) }),
        );
      });

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // ── Build state. The body is hidden and both ramps are flat
        //    dark, so the reveal starts from an unlit slab.
        gsap.set('[data-tw-body], [data-tw-photo]', { autoAlpha: 0 });
        gsap.set(['[data-tw-outer]', '[data-tw-inner]'], { drawSVG: '0% 0%' });
        gsap.set([...phoneStops(), ...backStops()], { stopColor: DARK });

        const tl = gsap.timeline({
          scrollTrigger: { trigger: wrap, start: 'top 75%', once: true },
        });

        tl.to(['[data-tw-outer]', '[data-tw-inner]'], {
          drawSVG: '0% 100%',
          duration: 1.1,
          ease: 'none',
          stagger: 0.25,
        })
          .to('[data-tw-body], [data-tw-photo]', { autoAlpha: 1, duration: 1, ease: 'sine.inOut' }, '-=0.5')
          // The ramp travels up the body: stop 0 moves first, stop 7
          // last. A single tween on all eight would cross-fade and
          // lose the travel, which is the whole effect.
          .to(
            phoneStops(),
            {
              stopColor: (i: number) => stopColor(i, 0, 0, 1),
              duration: 1.6,
              ease: 'sine.inOut',
              stagger: 0.2,
            },
            '-=1',
          )
          .to(
            backStops(),
            {
              stopColor: (i: number) => stopColor(i, 0, 0, -1),
              duration: 1.6,
              ease: 'sine.inOut',
              stagger: 0.2,
            },
            '<',
          )
          .to('[data-tw-outline]', { autoAlpha: 0, duration: 0.8, ease: 'sine.inOut' }, '-=1.2');

        return () => {
          tl.scrollTrigger?.kill();
          tl.kill();
        };
      });

      // ── Tilt. Pointer-fine only; a touch device gets the resting
      //    finish rather than a jitter from the first tap.
      mm.add(
        '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)',
        () => {
          const light = lightRef.current;
          const tilt = wrap.querySelector<SVGSVGElement>('[data-tw-tilt]');
          const ps = phoneStops();
          const bs = backStops();
          if (!ps.length || !bs.length) return;

          // x and y on fePointLight are attributes, not CSS. The
          // plain quickSetter(light, 'x') form writes a transform and
          // the light never moves, which is what happened first time.
          const setLight = light
            ? (gsap.quickSetter(light, 'attr') as (v: Record<string, number>) => void)
            : null;

          const onMove = (e: PointerEvent) => {
            const r = wrap.getBoundingClientRect();
            const nx = (e.clientX - r.left) / r.width - 0.5;
            const ny = (e.clientY - r.top) / r.height - 0.5;
            const yaw = 10 * nx;
            const pitch = 10 * ny;

            if (tilt) {
              gsap.to(tilt, {
                rotationY: yaw,
                rotationX: -pitch,
                transformPerspective: 900,
                duration: 0.4,
                ease: 'power1.out',
                overwrite: 'auto',
              });
            }

            ps.forEach((s, i) =>
              gsap.to(s, {
                stopColor: stopColor(i, yaw, pitch, 1),
                duration: 0.3,
                ease: 'sine.out',
                overwrite: 'auto',
              }),
            );
            bs.forEach((s, i) =>
              gsap.to(s, {
                stopColor: stopColor(i, yaw, pitch, -1),
                duration: 0.3,
                ease: 'sine.out',
                overwrite: 'auto',
              }),
            );

            // Light tracks the pointer across the 600x1200 viewBox.
            setLight?.({
              x: Math.round(((e.clientX - r.left) / r.width) * 600),
              y: Math.round(((e.clientY - r.top) / r.height) * 1200),
            });
          };

          const onLeave = () => {
            if (tilt) {
              gsap.to(tilt, {
                rotationY: 0,
                rotationX: 0,
                duration: 0.9,
                ease: 'power3.out',
                overwrite: 'auto',
              });
            }
            ps.forEach((s, i) =>
              gsap.to(s, { stopColor: stopColor(i, 0, 0, 1), duration: 0.6, overwrite: 'auto' }),
            );
            bs.forEach((s, i) =>
              gsap.to(s, { stopColor: stopColor(i, 0, 0, -1), duration: 0.6, overwrite: 'auto' }),
            );
            setLight?.({ x: 300, y: 600 });
          };

          wrap.addEventListener('pointermove', onMove);
          wrap.addEventListener('pointerleave', onLeave);
          return () => {
            wrap.removeEventListener('pointermove', onMove);
            wrap.removeEventListener('pointerleave', onLeave);
          };
        },
      );
    }, wrap);

    return () => ctx.revert();
  }, [gPhone, gBack, fLight, pPhoto]);

  return (
    <div
      ref={wrapRef}
      className="relative overflow-hidden rounded-card border border-line bg-ink-900"
    >
      {/* Backdrop, in its own stretched layer.

          It was originally a <rect> inside the phone's SVG, which
          looked wrong: that SVG keeps the 1:2 aspect of the ad unit,
          so the backdrop painted as a bright vertical band with bare
          panel either side. Splitting it out lets it cover the panel
          with preserveAspectRatio="none" while the phone keeps its
          proportions. It stays an SVG gradient rather than a CSS one
          because the eight stops have to stay individually
          animatable. */}
      <svg
        viewBox={PHONE_VIEWBOX}
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full opacity-40"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <linearGradient
            ref={backGradRef}
            id={gBack}
            x1="445.77"
            y1="1143.37"
            x2="156.92"
            y2="65.38"
            gradientUnits="userSpaceOnUse"
          >
            {OFFSETS.map((o, i) => (
              <stop key={i} offset={o} stopColor={DARK} />
            ))}
          </linearGradient>
        </defs>
        <rect width="600" height="1200" fill={`url(#${gBack})`} />
      </svg>

      {/* Vignette. The backdrop is held at 40% and darkened at the
          edges so the phone stays the subject. At full strength the
          two gradients are the same ramp, so the phone dissolved
          into its own background: in the shipped banner that
          separation came from four shine and shadow paths that are
          not worth carrying here. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_45%,transparent,var(--color-ink-900))]"
      />

      {/* The phone. Decorative artwork: the surrounding prose carries
          the meaning, and a path list is not useful alternative
          text. */}
      <svg
        viewBox={PHONE_VIEWBOX}
        className="relative mx-auto block h-[clamp(20rem,62vh,34rem)] w-auto"
        aria-hidden="true"
        focusable="false"
        data-tw-tilt
      >
        <defs>
          <linearGradient
            ref={phoneGradRef}
            id={gPhone}
            x1="445.77"
            y1="1143.37"
            x2="156.92"
            y2="65.38"
            gradientUnits="userSpaceOnUse"
          >
            {OFFSETS.map((o, i) => (
              <stop key={i} offset={o} stopColor={DARK} />
            ))}
          </linearGradient>

          <filter id={fShadow} x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="26" />
          </filter>

          {/* The device photograph, at exactly the viewBox size, so
              the pattern lines up one to one with the geometry. */}
          <pattern
            id={pPhoto}
            patternUnits="userSpaceOnUse"
            width="600"
            height="1200"
            x="0"
            y="0"
          >
            <image href={PHONE_PHOTO_SRC} width="600" height="1200" x="0" y="0" />
          </pattern>

          {/* Blur, then a specular highlight from a movable point
              light, composited back over the source. This is what
              makes a flat fill read as curved glass. */}
          <filter id={fLight} x="-20%" y="-20%" width="140%" height="140%" filterUnits="userSpaceOnUse">
            <feGaussianBlur stdDeviation="10" result="blur1" />
            {/* lighting-color is the one literal colour here. It is
                artwork, not theme: it is the colour of the light
                falling on the glass, and changing it with the site
                palette would change the product finish. Same
                exception the house style already makes for the
                canvas that cannot read a CSS variable. */}
            <feSpecularLighting result="spec1" in="blur1" specularExponent="60" lightingColor="#ccc">
              <fePointLight ref={lightRef} data-tw-pointlight x="300" y="600" z="0" />
            </feSpecularLighting>
            <feComposite
              in="SourceGraphic"
              in2="spec1"
              operator="arithmetic"
              k1="0"
              k2="1"
              k3="1"
              k4="0"
            />
          </filter>
        </defs>

        {/* Drop shadow: the same silhouette, blurred and offset,
            which is how the original lifted the phone off its
            backdrop. Cheaper than the four shine and shadow paths
            and reads the same at this size. */}
        <path
          d={PHONE_BODY}
          fill="#000"
          opacity="0.55"
          filter={`url(#${fShadow})`}
          transform="translate(6 26)"
        />

        {/* The photograph, under the gradient. PHONE_BODY above
            has the camera module cut out of it, so the lenses, the
            Leica text and the side buttons come from here while the
            gradient paints the glass around them. */}
        <path data-tw-photo d={PHONE_PHOTO} fill={`url(#${pPhoto})`} />

        {/* The Twilight finish, painted over the photograph. */}
        <path data-tw-body d={PHONE_BODY} fill={`url(#${gPhone})`} filter={`url(#${fLight})`} />

        {/* Stroke-only outline, drawn on first and retired once the
            body has faded up. */}
        <g data-tw-outline className="text-fg">
          <path
            data-tw-outer
            d={PHONE_OUTER}
            fill="transparent"
            stroke="currentColor"
            strokeMiterlimit="10"
          />
          <path
            data-tw-inner
            d={PHONE_INNER}
            fill="transparent"
            stroke="currentColor"
            strokeMiterlimit="10"
          />
        </g>
      </svg>
    </div>
  );
}
