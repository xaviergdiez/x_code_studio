'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * TimeInFrame — the FBTO hero visual.
 *
 * The case is that the unit let people choose what to read, so they
 * stayed. This shows that: a cursor works down four questions, each
 * opens, and the timer climbs to 12.6 seconds. It is a speed-up of
 * the idea, not a recording of the real unit, so the questions are
 * numbered rather than invented. The only figure shown is the case's
 * own measured 12.6s.
 *
 * The markup is the finished state (all open, 12.6s) and the loop
 * only exists on the no-preference branch, so reduced motion gets a
 * still frame. Pauses when off screen.
 */

const FINAL = 12.6;
const QUESTIONS = 4;

export function TimeInFrame() {
  const rootRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const root = rootRef.current;
      const out = countRef.current;
      if (!root || !out) return;

      const t = { v: 0 };
      const show = () => { out.textContent = t.v.toFixed(1); };
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.4 });

      tl.set(t, { v: 0, onComplete: show }, 0).call(show, [], 0);
      for (let i = 0; i < QUESTIONS; i++) {
        const at = i * 1.5;
        tl.to('.tf-cursor', { y: i * 52, duration: 0.45, ease: 'power3.inOut' }, at)
          .fromTo(`.tf-hot-${i}`, { opacity: 0 }, { opacity: 1, duration: 0.2 }, at + 0.4)
          .fromTo(`.tf-body-${i}`, { scaleY: 0, opacity: 0 }, { scaleY: 1, opacity: 1, duration: 0.3, ease: 'power2.out', transformOrigin: 'top' }, at + 0.4)
          .fromTo(`.tf-seg-${i}`, { scaleX: 0 }, { scaleX: 1, duration: 1.0, ease: 'none', transformOrigin: 'left' }, at + 0.4)
          .to(t, { v: (FINAL * (i + 1)) / QUESTIONS, duration: 1.1, ease: 'none', onUpdate: show }, at + 0.4)
          .to(`.tf-hot-${i}`, { opacity: 0.35, duration: 0.3 }, at + 1.45);
      }
      tl.to('.tf-readout', { scale: 1.12, duration: 0.2, yoyo: true, repeat: 1, ease: 'power2.out' }, QUESTIONS * 1.5)
        .to({}, { duration: 1.2 })
        .to('.tf-reset', { opacity: 0, duration: 0.3 })
        .set('.tf-reset', { opacity: 1 });

      ScrollTrigger.create({
        trigger: root,
        start: 'top bottom',
        end: 'bottom top',
        onToggle: (self) => tl.paused(!self.isActive),
      });
    });

    mm.add('(prefers-reduced-motion: reduce)', () => {
      if (countRef.current) countRef.current.textContent = FINAL.toFixed(1);
    });

    return () => mm.revert();
  }, []);

  return (
    <div ref={rootRef} aria-hidden="true" className="mx-auto w-full max-w-sm">
      <div className="border border-line-strong bg-ink-900 p-4">
        <div className="mb-4 flex items-end justify-between">
          <p className="terminal text-label uppercase tracking-label text-fg-subtle">Time in frame</p>
          <p className="tf-readout terminal text-h2 font-bold text-accent">
            <span ref={countRef}>0.0</span>
            <span className="text-h3">s</span>
          </p>
        </div>

        <div className="tf-reset relative">
          <span className="tf-cursor absolute -left-2 top-4 z-10 h-3 w-3 rounded-full bg-accent shadow-[0_0_12px_var(--color-accent)]" />
          <ul className="space-y-3">
            {Array.from({ length: QUESTIONS }, (_, i) => (
              <li key={i} className="relative h-10 border border-line bg-ink-700 px-3">
                <span className={`tf-hot-${i} pointer-events-none absolute inset-0 border border-accent bg-accent/10 opacity-35`} />
                <span className="terminal relative flex h-full items-center text-label text-fg-muted">
                  Question {i + 1}
                </span>
                <span className={`tf-body-${i} absolute inset-x-3 bottom-1.5 flex flex-col gap-1`}>
                  <span className="h-px w-3/4 bg-fg-subtle/50" />
                </span>
                <span className="absolute inset-x-0 bottom-0 h-[2px] bg-line">
                  <span className={`tf-seg-${i} block h-full w-full bg-accent`} />
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
