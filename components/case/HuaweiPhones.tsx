'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

/**
 * HuaweiPhones — the colour-cycling device hero.
 *
 * Lifted out of app/cases/huawei/page.tsx, where it was 110 lines of
 * inline markup plus a 70-line timeline. Three things fixed on the
 * way out:
 *
 *  1. It looped forever (`repeat: -1`) with no reduced-motion guard.
 *     Now the loop only exists on the no-preference branch; reduced
 *     motion gets the green finish, held, with no cycling.
 *  2. It injected a <style> tag that wrote `--phone-*` onto :root,
 *     so a component was reaching out and restyling the document.
 *     Replaced with Tailwind responsive utilities.
 *  3. The decorative SVGs had no aria treatment, so a screen reader
 *     waded through two pattern-filled paths. Marked hidden.
 *
 * On the hex below: these are the device finishes and the gradients
 * that match them. They are content, the actual product colours, not
 * theme values, which is why they sit here as data rather than as
 * tokens. Nothing else in this file uses a raw colour.
 */

const FINISHES = [
  { id: 'green', stops: ['#02b09c', '#009d91', '#027b7f'], onLight: false },
  { id: 'orange', stops: ['#ff8400', '#ff6700', '#ff3602'], onLight: true },
  { id: 'black', stops: ['#7c7c7c', '#4a4a4a', '#000000'], onLight: false },
  { id: 'blue', stops: ['#d8edfc', '#a1daf8', '#4db4e7'], onLight: true },
] as const;

const INK = '#121212';
const WHITE = '#ffffff';

export function HuaweiPhones({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      const reset = () => {
        gsap.set('.front-phone, .back-phone', { autoAlpha: 0 });
        gsap.set('#green-front, #green-back', { autoAlpha: 1 });
        gsap.set('.hero-text', { color: WHITE });
        gsap.set('.hero-rule', { borderColor: WHITE });
      };

      mm.add('(prefers-reduced-motion: reduce)', () => {
        reset();
      });

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        reset();
        const tl = gsap.timeline({ repeat: -1 });

        FINISHES.forEach((finish, i) => {
          if (i === 0) return;
          const at = i * 2;
          const ink = finish.onLight ? INK : WHITE;

          finish.stops.forEach((stop, s) => {
            tl.to(
              `.bg-stop-${s + 1}`,
              { duration: 1.5, attr: { 'stop-color': stop }, ease: 'sine.inOut' },
              `${at}+=${s * 0.1}`,
            );
          });

          tl.to(
            [`#${finish.id}-front`, `#${finish.id}-back`],
            { duration: 1, autoAlpha: 1, ease: 'sine.inOut' },
            at,
          )
            .to('.hero-text', { duration: 1.5, color: ink, ease: 'power1.inOut', overwrite: 'auto' }, at)
            .to('.hero-rule', { duration: 1.5, borderColor: ink, ease: 'power1.inOut', overwrite: 'auto' }, at);
        });

        // Back to green.
        const end = FINISHES.length * 2;
        tl.to(
          FINISHES.slice(1).flatMap((f) => [`#${f.id}-front`, `#${f.id}-back`]),
          { duration: 0.5, autoAlpha: 0, ease: 'sine.inOut' },
          end,
        );
        FINISHES[0].stops.forEach((stop, s) => {
          tl.to(
            `.bg-stop-${s + 1}`,
            { duration: 0.5, attr: { 'stop-color': stop }, ease: 'sine.inOut' },
            `${end}+=${s * 0.1}`,
          );
        });
        tl.to('.hero-text', { duration: 0.5, color: WHITE, ease: 'power1.inOut', overwrite: 'auto' }, end)
          .to('.hero-rule', { duration: 0.5, borderColor: WHITE, ease: 'power1.inOut', overwrite: 'auto' }, end);

        return () => { tl.kill(); };
      });

      return () => mm.revert();
    }, root);

    return () => ctx.revert();
  }, []);

  const phone = (face: 'front' | 'back') => (
    <svg
      className={`h-screen w-auto ${face === 'front' ? 'mb-8 rotate-180' : 'mt-8'}`}
      viewBox="0 0 400 840"
      aria-hidden="true"
    >
      <defs>
        <pattern id={`${face}-pattern`} patternUnits="userSpaceOnUse" width="400" height="840">
          {FINISHES.map((f) => (
            <image
              key={f.id}
              id={`${f.id}-${face}`}
              className={`${face}-phone`}
              href={`/images/huawei/${f.id}_${face}.jpg`}
              width="400"
              height="840"
              opacity={f.id === 'green' ? 1 : 0}
            />
          ))}
        </pattern>
      </defs>
      <g fill={`url(#${face}-pattern)`}>
        <path
          d={
            face === 'front'
              ? 'M390.48,309.19c0-2-.21-3.55-2.87-3.11V272.84c2.4.27,2.87-1,2.87-3q-.08-46.68,0-93.36c0-2-.21-3.55-3-3.09v-2.64c0-36.74,0-69.56,0-106.3,0-5.26-.08-10.53-.44-15.77-.75-10.87-4.83-20.21-13.54-27.11-3.9-3.08-8.12-5.81-13.28-6.14-5.88-.37-11.77-.68-17.66-.68L200,14.68q-69,0-137.91,0c-7.58,0-15.17.19-22.75.41a17.33,17.33,0,0,0-5.55.93C23.22,20,16,27.38,12.45,38.15,9.78,46.3,9.53,54.79,9.53,63.28c0,235.24,0,466.56,0,701.81,0,9.11.38,18.23.79,27.34.38,8.77,3.15,16.74,9,23.42,4.46,5.1,9.81,9.24,16.64,10.22a126.62,126.62,0,0,0,17.86.91q73.08,0,146.18,0l143.35,0q6.86,0,13.69-.46a26.14,26.14,0,0,0,7.61-1.25A33.29,33.29,0,0,0,382.8,809c3.7-7.14,4.7-14.87,4.7-22.78q0-215.35,0-430.72v-3c2.4.27,3-.8,3-2.84Q390.39,329.42,390.48,309.19Z'
              : 'M9.52,309.19c0-2,.21-3.55,2.87-3.11V272.84c-2.4.27-2.87-1-2.87-3q.08-46.68,0-93.36c0-2,.21-3.55,3-3.09v-2.64c0-36.74,0-69.56,0-106.3,0-5.26.08-10.53.44-15.77.75-10.87,4.83-20.21,13.54-27.11,3.9-3.08,8.12-5.81,13.28-6.14,5.88-.37,11.77-.68,17.66-.68l142.57,0q69,0,137.91,0c7.58,0,15.17.19,22.75.41a17.33,17.33,0,0,1,5.55.93c10.57,4,17.82,11.35,21.34,22.12,2.67,8.15,2.92,16.64,2.92,25.13,0,235.24,0,466.56,0,701.81,0,9.11-.38,18.23-.79,27.34-.38,8.77-3.15,16.74-9,23.42-4.46,5.1-9.81,9.24-16.64,10.22a126.62,126.62,0,0,1-17.86.91Q273.1,827,200,827L56.65,827q-6.85,0-13.69-.46a26.14,26.14,0,0,1-7.61-1.25A33.29,33.29,0,0,1,17.2,809c-3.7-7.14-4.7-14.87-4.7-22.78q0-215.35,0-430.72v-3c-2.4.27-3-.8-3-2.84Q9.61,329.42,9.52,309.19Z'
          }
        />
      </g>
    </svg>
  );

  return (
    <section ref={root} className="relative min-h-screen overflow-hidden border-b border-line">
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="huawei-bg" cx="50%" cy="50%" r="50%">
            {FINISHES[0].stops.map((stop, i) => (
              <stop key={i} className={`bg-stop-${i + 1}`} offset={[0, 0.48, 1][i]} stopColor={stop} />
            ))}
          </radialGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#huawei-bg)" />
      </svg>

      <div
        className="absolute top-1/2 flex h-screen -translate-y-1/2 rotate-[25deg] flex-col items-center justify-center overflow-hidden
                   -right-[30%] w-full scale-[0.8]
                   md:-right-[10%] md:w-[70%] md:scale-[2]"
        aria-hidden="true"
      >
        {phone('front')}
        {phone('back')}
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl items-center px-5 sm:px-8">
        {children}
      </div>
    </section>
  );
}
