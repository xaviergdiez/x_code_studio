'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { setLenis } from '@/lib/motion';

/**
 * Site-wide motion that is not tied to one page: inertial smooth
 * scroll (Lenis, driven by the GSAP ticker so ScrollTrigger pins stay
 * in sync) and the magnetic pull on `.magnetic-btn`. Both are off
 * under reduced motion; the magnetic pull is also pointer-fine only.
 */
export function MotionProvider() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const lenis = new Lenis({ lerp: 0.1 });
      setLenis(lenis);
      lenis.on('scroll', ScrollTrigger.update);
      const tick = (t: number) => lenis.raf(t * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      return () => {
        gsap.ticker.remove(tick);
        lenis.destroy();
        setLenis(null);
      };
    });

    mm.add('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)', () => {
      const btn = (e: Event) => (e.target as Element | null)?.closest?.<HTMLElement>('.magnetic-btn') ?? null;
      const onMove = (e: PointerEvent) => {
        const el = btn(e);
        if (!el) return;
        const r = el.getBoundingClientRect();
        gsap.to(el, {
          x: (e.clientX - (r.left + r.width / 2)) * 0.25,
          y: (e.clientY - (r.top + r.height / 2)) * 0.3,
          duration: 0.4,
          ease: 'power3.out',
          overwrite: 'auto',
        });
      };
      const onOut = (e: PointerEvent) => {
        const el = btn(e);
        if (el && !el.contains(e.relatedTarget as Node | null)) {
          gsap.to(el, { x: 0, y: 0, duration: 0.8, ease: 'elastic.out(1, 0.4)', overwrite: 'auto' });
        }
      };
      document.addEventListener('pointermove', onMove);
      document.addEventListener('pointerout', onOut);
      return () => {
        document.removeEventListener('pointermove', onMove);
        document.removeEventListener('pointerout', onOut);
      };
    });

    return () => mm.revert();
  }, []);

  return null;
}
