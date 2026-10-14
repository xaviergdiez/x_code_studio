'use client';

import { useEffect, type RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import type Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger, SplitText);

/**
 * Shared scroll motion.
 *
 * Two things every page gets from `useScrollReveal`:
 *
 *  1. `[data-split]` headings reveal line by line when they scroll
 *     into view. The hidden starting state is CSS (see globals.css),
 *     because GSAP runs after first paint and a gsap.from() on its
 *     own would flash. A CSS failsafe un-hides them if JS never runs.
 *  2. `.reveal` containers (Section renders one) stagger their direct
 *     children in. Mark list items with `data-reveal-item` to stagger
 *     those instead, optionally "left", "right" or "scale" for
 *     variety. A `contents` wrapper is looked through.
 *
 * Everything sits behind prefers-reduced-motion: no-preference, so
 * the reduced-motion path creates no tweens and nothing is hidden.
 */

let lenis: Lenis | null = null;
export const setLenis = (l: Lenis | null) => { lenis = l; };

/** Smooth-scroll to an element id, through Lenis when it is running. */
export function scrollToId(id: string, offset = -80) {
  const el = document.getElementById(id);
  if (!el) return;
  if (lenis) {
    lenis.scrollTo(el, { offset });
    return;
  }
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + offset });
}

function revealTargets(el: Element): Element[] {
  const out: Element[] = [];
  for (const child of Array.from(el.children)) {
    if (child.matches('header')) continue;
    if (child.classList.contains('contents')) out.push(...revealTargets(child));
    else {
      const items = child.querySelectorAll('[data-reveal-item]');
      if (items.length) out.push(...Array.from(items));
      else out.push(child);
    }
  }
  return out;
}

export function useScrollReveal(rootRef: RefObject<HTMLElement | null>, enabled = true) {
  useEffect(() => {
    const root = rootRef.current;
    if (!enabled || !root) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.utils.toArray<HTMLElement>('[data-split]').forEach((el) => {
          SplitText.create(el, {
            type: 'lines',
            autoSplit: true,
            linesClass: 'split-line',
            onSplit: (self) => {
              gsap.set(el, { visibility: 'visible' });
              return gsap.from(self.lines, {
                yPercent: 70,
                autoAlpha: 0,
                duration: 0.9,
                ease: 'power4.out',
                stagger: 0.12,
                scrollTrigger: { trigger: el, start: 'top 90%', once: true },
              });
            },
          });
        });

        gsap.utils.toArray<HTMLElement>('.reveal').forEach((el) => {
          const targets = revealTargets(el);
          if (!targets.length) return;
          gsap.from(targets, {
            y: (_, t: HTMLElement) => (['left', 'right'].includes(t.dataset.revealItem ?? '') ? 0 : 40),
            x: (_, t: HTMLElement) => ({ left: -60, right: 60 })[t.dataset.revealItem ?? ''] ?? 0,
            scale: (_, t: HTMLElement) => (t.dataset.revealItem === 'scale' ? 0.92 : 1),
            autoAlpha: 0,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.1,
            scrollTrigger: { trigger: el, start: 'top 82%', once: true },
          });
        });
      });
    }, root);

    return () => ctx.revert();
  }, [rootRef, enabled]);
}
