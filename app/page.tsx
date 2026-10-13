'use client';

import { useState, useRef, useEffect, useLayoutEffect, useCallback } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle, ChevronDown, ExternalLink, Linkedin, Menu, X } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useForm } from '@formspree/react';
import { Button } from '@/components/ui/Button';
import { Section, SectionHeading, Card } from '@/components/ui/Section';
import { MultiplyGrid } from '@/components/home/MultiplyGrid';

/**
 * x-code.studio — homepage
 *
 * One promise: manual ad production becomes an automated pipeline,
 * and the team can run it without me. Everything below is a tier
 * of that promise.
 *
 * Copy rules for this file:
 *   - Sentence case headings. The terminal motif is the hero and
 *     the boot sequence only.
 *   - Every price on this page must have a real destination. If
 *     something cannot be bought yet it says so and collects an
 *     email instead.
 *   - Colour, type and spacing come from tokens in globals.css.
 *     No raw hex.
 */

/**
 * useLayoutEffect on the client, useEffect on the server.
 *
 * The animation setup must run before paint to avoid the flash, but
 * Next.js server-renders this component and React warns that
 * useLayoutEffect does nothing on the server. This is the same guard
 * GSAP's own useGSAP hook uses.
 */
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

// ─── Business facts. Update in one place. ────────────────────────
const BUSINESS = {
  kvk: null as string | null,   // set once registered, e.g. '12345678'
  btw: null as string | null,   // set once issued, e.g. 'NL001234567B01'
  email: 'hello@x-code.studio',
  city: 'Amsterdam, NL',
};

// Products have no checkout yet. Until they do, the toolbox
// collects a waitlist rather than promising an instant download.
const TOOLBOX_STATUS: 'waitlist' | 'live' = 'waitlist';

// ═════════════════════════════════════════════════════════════════
// MATRIX RAIN
// ═════════════════════════════════════════════════════════════════
function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*<>/|';
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array(columns).fill(1).map(() => Math.random() * -100);

    const draw = () => {
      ctx.fillStyle = 'rgba(18, 18, 18, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#00FF41';
      ctx.font = `${fontSize}px monospace`;
      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.globalAlpha = Math.random() * 0.5 + 0.1;
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i] += 0.5 + Math.random() * 0.5;
      }
    };

    const interval = setInterval(draw, 50);
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="matrix-canvas" aria-hidden="true" />;
}

// ═════════════════════════════════════════════════════════════════
// ANIMATED LOGO
// ═════════════════════════════════════════════════════════════════
function AnimatedLogo({ size = 28 }: { size?: number }) {
  const h = size * (1029 / 1235);
  return (
    <svg width={size} height={h} viewBox="0 0 1235 1029" fill="none" aria-hidden="true">
      <path d="M218.067 1029L726.89 512.587L218.067 0H0.000162074L504.997 506.849V518.325L0.000162074 1029H218.067Z" fill="currentColor" />
      <path d="M1016.93 1029L508.11 512.587L1016.93 0H1235L730.003 506.849V518.325L1235 1029H1016.93Z" fill="var(--color-neon)" />
    </svg>
  );
}

// ═════════════════════════════════════════════════════════════════
// BOOT SEQUENCE
// Four lines, skippable, once per session, and skipped entirely
// under prefers-reduced-motion. It is personality, not a toll gate.
// ═════════════════════════════════════════════════════════════════
const BOOT_LINES = [
  { text: 'x-code.studio · ad-tech production tooling', cls: 'dim' },
  { text: 'loading: automation · DCO · GSAP ............ ok', cls: '' },
  { text: 'operator: Javier Garcia Diez, Amsterdam NL', cls: 'accent' },
  { text: 'ready.', cls: '' },
];

function BootSequence({ onComplete }: { onComplete: () => void }) {
  const bootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!bootRef.current) return;
    const lines = bootRef.current.querySelectorAll('.boot-line');
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(bootRef.current, { opacity: 0, duration: 0.35, delay: 0.2, onComplete });
      },
    });
    lines.forEach((line, i) => tl.to(line, { opacity: 1, duration: 0.02 }, i * 0.14));
    return () => { tl.kill(); };
  }, [onComplete]);

  return (
    <div ref={bootRef} className="boot-screen" role="status" aria-label="Loading">
      <div className="mx-auto w-full max-w-3xl">
        {BOOT_LINES.map((line, i) => (
          <div key={i} className={`boot-line ${line.cls}`}>{line.text}</div>
        ))}
        <button
          onClick={onComplete}
          className="mt-8 text-label uppercase tracking-label text-fg-subtle hover:text-neon"
        >
          Skip
        </button>
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════
// COST ESTIMATOR
//
// The old model compared 2 hours per asset against 0.1 hours and
// produced a 95% saving, which no buyer believes. This one bills
// the pipeline build as real work and assumes automation removes
// 75% of per-asset handling rather than all of it. Defaults land
// around 65%, and the assumptions are printed under the number.
// ═════════════════════════════════════════════════════════════════
const PIPELINE_SETUP_HOURS = 8;
const PER_ASSET_REDUCTION = 0.75;

function CostEstimator() {
  const [assets, setAssets] = useState(50);
  const [hoursPerAsset, setHoursPerAsset] = useState(2);
  const [rate, setRate] = useState(85);

  const manualCost = assets * hoursPerAsset * rate;
  const automatedHours = PIPELINE_SETUP_HOURS + assets * hoursPerAsset * (1 - PER_ASSET_REDUCTION);
  const automatedCost = automatedHours * rate;
  const saving = Math.max(0, manualCost - automatedCost);
  const percent = manualCost > 0 ? Math.round((saving / manualCost) * 100) : 0;

  const fill = (v: number, min: number, max: number) => {
    const pct = ((v - min) / (max - min)) * 100;
    return `linear-gradient(to right, var(--color-neon) ${pct}%, var(--color-line-strong) ${pct}%)`;
  };

  const sliders = [
    { id: 'assets', label: 'Assets per campaign', value: assets, set: setAssets, min: 10, max: 500, step: 1, suffix: '' },
    { id: 'hours', label: 'Manual hours per asset', value: hoursPerAsset, set: setHoursPerAsset, min: 0.5, max: 5, step: 0.5, suffix: 'hrs' },
    { id: 'rate', label: 'Blended hourly rate', value: rate, set: setRate, min: 40, max: 200, step: 5, suffix: '€/hr' },
  ];

  return (
    <div className="grid gap-10 md:grid-cols-2">
      <div>
        <p className="text-body text-fg-muted">
          Move the sliders. The number on the right is your campaign, not a case study.
        </p>
        <dl className="mt-8 space-y-4 border-t border-line pt-6">
          <div className="flex justify-between text-small">
            <dt className="text-fg-subtle">Manual cost</dt>
            <dd className="text-fg">€{manualCost.toLocaleString('en-GB', { maximumFractionDigits: 0 })}</dd>
          </div>
          <div className="flex justify-between text-small">
            <dt className="text-fg-subtle">With a pipeline</dt>
            <dd className="text-fg">€{automatedCost.toLocaleString('en-GB', { maximumFractionDigits: 0 })}</dd>
          </div>
        </dl>
        <p className="mt-6 text-small text-fg-subtle">
          Assumes a one-off pipeline build of {PIPELINE_SETUP_HOURS} hours, billed at your own
          rate, and a {PER_ASSET_REDUCTION * 100}% cut in per-asset handling after that. It does
          not assume the manual work disappears, because it does not.
        </p>
      </div>

      <Card highlighted>
        <div className="space-y-7">
          {sliders.map((s) => (
            <div key={s.id}>
              <label
                htmlFor={s.id}
                className="mb-3 block text-label uppercase tracking-label text-fg-subtle"
              >
                {s.label}
              </label>
              <input
                id={s.id}
                type="range"
                min={s.min}
                max={s.max}
                step={s.step}
                value={s.value}
                onChange={(e) => s.set(Number(e.target.value))}
                style={{ background: fill(s.value, s.min, s.max) }}
              />
              <output htmlFor={s.id} className="mt-3 block text-right text-h3 text-fg">
                {s.value} <span className="text-small text-fg-subtle">{s.suffix}</span>
              </output>
            </div>
          ))}

          <div className="border-t border-line pt-6" aria-live="polite">
            <p className="text-label uppercase tracking-label text-fg-subtle">
              Estimated saving per campaign
            </p>
            <p className="mt-2 text-display font-bold text-neon neon-glow-strong">
              €{saving.toLocaleString('en-GB', { maximumFractionDigits: 0 })}
            </p>
            <p className="mt-2 text-small text-fg-muted">
              {percent}% of what you spend now.
            </p>
            <Button href="#toolbox" size="md" className="mt-6 w-full">
              See what fixes this <ArrowRight size={16} aria-hidden="true" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════
// DATA
// ═════════════════════════════════════════════════════════════════
const TIERS = [
  {
    id: 'tools',
    name: 'Tools you download',
    price: 'From €100',
    body: 'Automation scripts, GSAP templates and DCO blueprints, packaged with setup docs. Buy once, use forever.',
    includes: ['Banner automation kit', 'GSAP animation library', 'DCO implementation blueprint'],
    cta: TOOLBOX_STATUS === 'waitlist' ? 'Join the waitlist' : 'Browse the toolbox',
    href: TOOLBOX_STATUS === 'waitlist' ? '#contact' : '/toolbox',
    status: TOOLBOX_STATUS === 'waitlist' ? 'In build' : null,
    highlighted: false,
  },
  {
    id: 'audit',
    name: 'Workflow audit',
    price: '€995 fixed',
    body: 'One week inside your production process. You get a written report naming the bottlenecks and a roadmap ordered by payback.',
    includes: ['Written audit report', 'Roadmap ordered by payback', 'No retainer, no hourly'],
    cta: 'See what is included',
    href: '/offerings/audit',
    status: null,
    highlighted: true,
  },
  {
    id: 'sprint',
    name: 'Build sprint',
    price: '€2,950 fixed',
    body: 'One week, one deliverable. A working pipeline, a rebuilt design system, or a DCO setup, with documentation and handover.',
    includes: ['Working deliverable, not a deck', 'Full documentation', 'Your team owns the result'],
    cta: 'See what is included',
    href: '/offerings/design-system',
    status: null,
    highlighted: false,
  },
];

const TESTIMONIALS = [
  { quote: 'As a cornerstone of our development team he was instrumental in creating high-quality HTML ads for key Google clients. He built new workflows that improved the team\u2019s efficiency and directly contributed to exceeding client ROI expectations.', name: 'Kristina Brown', role: 'Senior Program Manager, Monks', initials: 'KB' },
  { quote: 'From building automated pipelines to writing smart scripts, Xavier always finds a way to add value. On a large client project his framework let us render assets at massive scale in a fraction of the time.', name: 'Tim Wolters', role: 'Design Lead, Monks', initials: 'TW' },
  { quote: 'He organises and delivers large-scale projects so they are built to scale. Beyond the technical skill in areas like web animation, Xavi is a natural leader who supports the development of his colleagues.', name: 'Pablo Carreira', role: 'Lead Display Developer', initials: 'PC' },
  { quote: 'A focused professional who bridges business objectives with client needs, making sure expectations are met with precision. His leadership sets the standard.', name: 'Jordan Maders', role: 'Director, Post Production', initials: 'JM' },
];

const CASES = [
  {
    slug: 'bmw-mini',
    client: 'BMW / MINI',
    accent: 'bmw',
    headline: 'One master build, 27 markets',
    body: 'Display production rebuilt as a feed-driven pipeline, so adding a market became a data entry task instead of a production task.',
    figures: [
      { value: '34,000', label: 'Assets produced' },
      { value: '27+', label: 'Markets served' },
      { value: '71%', label: 'Lower cost per asset' },
    ],
  },
  {
    slug: 'gtech',
    client: 'Google gTech',
    accent: 'gtech',
    headline: 'Display delivery across three regions, one standard',
    body: 'Leading the display team across AMER, EMEA and APAC, where three hubs had been solving the same problem three different ways.',
    figures: [
      { value: '15+', label: 'Developers led' },
      { value: '95+', label: 'Markets covered' },
      { value: '230%', label: 'Conversion lift' },
    ],
  },
  {
    slug: 'fbto',
    client: 'FBTO',
    accent: 'fbto',
    headline: 'Twelve seconds inside an insurance ad',
    body: 'Rich media that explained a complicated product by letting people walk through it, optimised for dwell rather than clicks.',
    award: 'Weborama Campaign of the Year',
    figures: [
      { value: '12.6s', label: 'Time in frame' },
      { value: '3x', label: 'CTR vs static' },
      { value: '61%', label: 'Recall lift' },
    ],
  },
  {
    slug: 'huawei',
    client: 'Huawei',
    accent: 'huawei',
    headline: 'A phone you can turn over, in under 150KB',
    body: 'Four finishes and both faces of the device in a rich media unit, built with one masked path refilled rather than four assets.',
    award: 'Weborama APTO',
    figures: [
      { value: '<150KB', label: 'Creative weight' },
      { value: '52%', label: 'Engagement lift' },
      { value: '78%', label: 'Viewability' },
    ],
  },
];

// ═════════════════════════════════════════════════════════════════
// PAGE
// ═════════════════════════════════════════════════════════════════
export default function Home() {
  const [booted, setBooted] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [state, handleSubmit] = useForm('xdkqvorr');

  const finishBoot = useCallback(() => {
    setBooted(true);
    try { sessionStorage.setItem('xcs-booted', '1'); } catch { /* private mode */ }
  }, []);

  // Boot only on a first visit this session, and never when the
  // visitor has asked for reduced motion.
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let seen = true;
    try { seen = sessionStorage.getItem('xcs-booted') === '1'; } catch { /* private mode */ }
    if (!reduced && !seen) setBooted(false);
  }, []);

  // ─── Animation. Wrapped in matchMedia so the reduced-motion
  //     branch never creates the tweens at all.
  //
  //     useLayoutEffect, not useEffect: it runs synchronously before
  //     the browser paints, so a gsap.from() never shows the frame
  //     where the element is still visible. useEffect runs after
  //     paint, which is what made the page flash. ────────────────
  useIsomorphicLayoutEffect(() => {
    if (!booted) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        if (progressRef.current) {
          gsap.set(progressRef.current, { scaleX: 0 });
          gsap.to(progressRef.current, {
            scaleX: 1,
            ease: 'none',
            scrollTrigger: { trigger: document.body, start: 'top top', end: 'bottom bottom', scrub: 0.3 },
          });
        }

        // Hero entrance is CSS (.enter in globals.css). gsap.from()
        // here caused a flash: useEffect runs after first paint, so
        // the hero painted visible, then snapped to opacity 0.

        if (heroRef.current) {
          gsap.to('.hero-content', {
            y: -80,
            opacity: 0,
            ease: 'none',
            scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: true },
          });
        }

        gsap.utils.toArray<Element>('.reveal').forEach((el) => {
          gsap.from(el, {
            y: 40,
            opacity: 0,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          });
        });
      });

      return () => mm.revert();
    }, rootRef);

    return () => ctx.revert();
  }, [booted]);

  const goTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({
      top: el.getBoundingClientRect().top + window.scrollY - 80,
      behavior: reduced ? 'auto' : 'smooth',
    });
    setMenuOpen(false);
  };

  const NAV = [
    { label: 'The cost', id: 'cost' },
    { label: 'Ways to work', id: 'toolbox' },
    { label: 'Work', id: 'work' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <div ref={rootRef} className="min-h-screen overflow-x-hidden bg-ink-800 text-fg-muted noise-overlay">
      {!booted && <BootSequence onComplete={finishBoot} />}
      <div className="crt-overlay" aria-hidden="true" />
      <div ref={progressRef} className="scroll-progress w-full" aria-hidden="true" />

      <a
        href="#main"
        className="sr-only-focusable absolute left-4 top-4 z-[80] bg-neon px-4 py-2 text-on-neon"
      >
        Skip to content
      </a>

      {/* ─── NAV ─── */}
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-line bg-ink-800/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
          <button onClick={() => goTo('top')} className="flex items-center gap-3 text-fg">
            <AnimatedLogo size={24} />
            <span className="terminal text-h3 font-bold">x-code.studio</span>
          </button>

          <div className="hidden items-center gap-6 md:flex">
            {NAV.map((item) => (
              <button
                key={item.id}
                onClick={() => goTo(item.id)}
                className="text-small text-fg-muted transition-colors hover:text-neon"
              >
                {item.label}
              </button>
            ))}
            <Button onClick={() => goTo('cost')} size="sm">
              Check your numbers
            </Button>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 text-fg-muted md:hidden"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {menuOpen && (
          <div className="border-b border-line bg-ink-600 md:hidden">
            <div className="space-y-1 px-5 py-3">
              {NAV.map((item) => (
                <button
                  key={item.id}
                  onClick={() => goTo(item.id)}
                  className="block w-full py-3 text-left text-body text-fg-muted hover:text-neon"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      <main id="main" className="pt-16">
        {/* ─── HERO ─── */}
        <section
          ref={heroRef}
          id="top"
          className="relative flex min-h-[88vh] items-center overflow-hidden border-b border-line"
        >
          <MatrixRain />
          <div className="absolute inset-0 z-[1] grid-bg" aria-hidden="true" />

          <div className="hero-content relative z-10 mx-auto grid w-full max-w-6xl gap-14 px-5 sm:px-8 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-16">
            <div>
              <p className="enter enter-1 terminal mb-6 inline-block border border-neon/50 px-3 py-1 text-label uppercase tracking-label text-neon">
                Ad-tech production tooling
              </p>

              <h1 className="enter enter-2 text-h1 font-bold tracking-hero text-fg md:text-display">
                Build it once.
                <br />
                Ship it{' '}
                <span className="text-neon neon-glow-strong">everywhere</span>.
              </h1>

              <p className="enter enter-3 mt-6 max-w-xl text-body text-fg-muted md:text-h3">
                I build the pipelines that turn one master creative into every size and
                every market, then teach your team to run them. Eighteen years shipping
                campaigns for BMW, Google and Huawei at Monks.
              </p>

              <div className="enter enter-4 mt-10 flex flex-col gap-4 sm:flex-row">
                <Button onClick={() => goTo('cost')} size="lg">
                  See what manual production costs you
                </Button>
                <Button onClick={() => goTo('work')} variant="secondary" size="lg">
                  See the work
                </Button>
              </div>
            </div>

            <div className="enter enter-5 lg:justify-self-end">
              <MultiplyGrid />
            </div>
          </div>

          <div
            className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center text-fg-subtle"
            aria-hidden="true"
          >
            <span className="mb-2 text-label uppercase tracking-label">Scroll</span>
            <ChevronDown size={16} className="scroll-indicator" />
          </div>
        </section>

        {/* ─── COST ─── */}
        <Section id="cost" tone="raised">
          <div className="reveal">
            <SectionHeading
              eyebrow="Start here"
              lede="Agencies lose most of their production margin in the versioning phase, and almost nobody measures it."
            >
              What manual versioning costs you
            </SectionHeading>
            <CostEstimator />
          </div>
        </Section>

        {/* ─── PROOF ─── */}
        <Section id="proof">
          <div className="reveal">
            <SectionHeading lede="Four colleagues from Monks, quoted from LinkedIn.">
              What the people I built this with say
            </SectionHeading>

            <ul className="grid gap-6 md:grid-cols-2">
              {TESTIMONIALS.map((t) => (
                <li key={t.name}>
                  <Card interactive>
                    <Linkedin size={16} className="absolute right-5 top-5 text-signal" aria-hidden="true" />
                    <blockquote className="pr-8 text-small leading-relaxed text-fg-muted">
                      {t.quote}
                    </blockquote>
                    <footer className="mt-6 flex items-center gap-3">
                      <span
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-line-strong bg-ink-700 text-label font-bold text-neon"
                        aria-hidden="true"
                      >
                        {t.initials}
                      </span>
                      <span>
                        <span className="block text-small font-bold text-fg">{t.name}</span>
                        <span className="block text-label text-fg-subtle">{t.role}</span>
                      </span>
                    </footer>
                  </Card>
                </li>
              ))}
            </ul>
          </div>
        </Section>

        {/* ─── TIERS ─── */}
        <Section id="toolbox" tone="raised">
          <div className="reveal">
            <SectionHeading lede="One promise underneath all three: manual ad production becomes an automated pipeline, and your team can run it without me.">
              Three ways to work with this
            </SectionHeading>

            <ul className="grid gap-6 md:grid-cols-3">
              {TIERS.map((tier) => (
                <li key={tier.id}>
                  <Card highlighted={tier.highlighted} interactive={!tier.highlighted}>
                    {tier.status && (
                      <span className="absolute right-0 top-0 bg-signal px-2 py-0.5 text-label font-bold uppercase tracking-label text-ink-800">
                        {tier.status}
                      </span>
                    )}
                    <h3 className="text-h3 font-bold text-fg">{tier.name}</h3>
                    <p className="mt-1 text-small text-fg-subtle">{tier.price}</p>
                    <p className="mt-4 border-b border-line pb-5 text-small text-fg-muted">
                      {tier.body}
                    </p>
                    <ul className="my-6 flex-grow space-y-2">
                      {tier.includes.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-small text-fg-muted">
                          <CheckCircle size={14} className="mt-1 shrink-0 text-signal" aria-hidden="true" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <Button
                      href={tier.href}
                      variant={tier.highlighted ? 'primary' : 'secondary'}
                      size="sm"
                      className="w-full"
                    >
                      {tier.cta}
                    </Button>
                  </Card>
                </li>
              ))}
            </ul>

            {TOOLBOX_STATUS === 'waitlist' && (
              <p className="mt-6 text-small text-fg-subtle">
                The downloadable tools are still being packaged. Rather than take your money for
                something I cannot deliver today, the button collects an email and you hear from me
                when it ships.
              </p>
            )}
          </div>
        </Section>

        {/* ─── WORK ─── */}
        <Section id="work">
          <div className="reveal">
            <SectionHeading lede="Four campaigns, delivered as part of the team at Monks. The pipelines I build now came out of this work.">
              The work behind it
            </SectionHeading>

            <ul className="space-y-6">
              {CASES.map((c) => (
                <li key={c.slug} data-accent={c.accent}>
                  <Link href={`/cases/${c.slug}`} className="group block">
                    <Card interactive className="md:flex-row md:items-center md:gap-10">
                      <div className="md:flex-1">
                        <div className="flex flex-wrap items-center gap-3">
                          <p className="text-label uppercase tracking-label text-accent">{c.client}</p>
                          {c.award && (
                            <p className="rounded-card border border-accent/40 px-2 py-0.5 text-label text-accent">
                              {c.award}
                            </p>
                          )}
                        </div>
                        <h3 className="mt-3 text-h2 font-bold text-fg">{c.headline}</h3>
                        <p className="mt-3 max-w-xl text-small text-fg-muted">{c.body}</p>
                        <span className="mt-5 flex items-center gap-2 text-small font-bold text-accent">
                          Read the case
                          <ArrowRight
                            size={14}
                            className="transition-transform group-hover:translate-x-1"
                            aria-hidden="true"
                          />
                        </span>
                      </div>

                      <dl className="mt-8 grid shrink-0 grid-cols-3 gap-6 border-t border-line pt-6 md:mt-0 md:w-72 md:border-l md:border-t-0 md:pl-10 md:pt-0">
                        {c.figures.map((f) => (
                          <div key={f.label}>
                            <dt className="sr-only">{f.label}</dt>
                            <dd className="text-h3 font-bold text-fg tabular-nums">{f.value}</dd>
                            <p className="mt-1 text-label text-fg-subtle">{f.label}</p>
                          </div>
                        ))}
                      </dl>
                    </Card>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Section>

        {/* ─── CONTACT ─── */}
        <Section id="contact" tone="raised" width="prose">
          <div className="reveal">
            {state.succeeded ? (
              <div className="rounded-card border border-neon/40 bg-neon/5 p-10 text-center">
                <CheckCircle size={48} className="mx-auto mb-4 text-neon" aria-hidden="true" />
                <h2 className="text-h2 font-bold text-fg">Got it</h2>
                <p className="mt-2 text-body text-fg-muted">
                  You will hear back from me within two working days.
                </p>
              </div>
            ) : (
              <>
                <SectionHeading lede="One reply from me within two working days. If it is not something I can fix, I will say so.">
                  Tell me what is broken
                </SectionHeading>

                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="mb-2 block text-small font-medium text-fg">
                        Your name
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        autoComplete="name"
                        placeholder="Jane Doe"
                        className="w-full rounded-card border border-line-strong bg-ink-800 p-3 text-small text-fg placeholder:text-fg-placeholder focus:border-neon"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="mb-2 block text-small font-medium text-fg">
                        Work email
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        placeholder="jane@agency.com"
                        className="w-full rounded-card border border-line-strong bg-ink-800 p-3 text-small text-fg placeholder:text-fg-placeholder focus:border-neon"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="need" className="mb-2 block text-small font-medium text-fg">
                      What do you need
                    </label>
                    <select
                      id="need"
                      name="need"
                      required
                      defaultValue=""
                      className="w-full rounded-card border border-line-strong bg-ink-800 p-3 text-small text-fg focus:border-neon"
                    >
                      <option value="" disabled>Choose one</option>
                      <option value="waitlist">Tell me when the tools launch</option>
                      <option value="audit">A workflow audit (€995)</option>
                      <option value="sprint">A build sprint (€2,950)</option>
                      <option value="workshop">Team training</option>
                      <option value="other">Something else</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="mb-2 block text-small font-medium text-fg">
                      What is the situation
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      required
                      placeholder="Roughly how many assets per campaign, and where it currently gets stuck."
                      className="w-full resize-y rounded-card border border-line-strong bg-ink-800 p-3 text-small text-fg placeholder:text-fg-placeholder focus:border-neon"
                    />
                  </div>

                  <Button type="submit" size="lg" loading={state.submitting}>
                    Send
                  </Button>
                </form>
              </>
            )}
          </div>
        </Section>

        {/* ─── FOOTER ─── */}
        <footer className="bg-ink-800 pb-28 pt-20">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div className="mb-12 grid gap-12 md:grid-cols-2">
              <div>
                <div className="mb-5 flex items-center gap-3 text-fg">
                  <AnimatedLogo size={28} />
                  <span className="terminal text-h2 font-bold">x-code.studio</span>
                </div>
                <p className="max-w-md text-small text-fg-muted">
                  Ad-tech production tooling. I turn manual ad production into automated
                  pipelines, and teach teams to run them.
                </p>
                <a
                  href={`mailto:${BUSINESS.email}`}
                  className="mt-5 inline-block text-small text-neon hover:underline"
                >
                  {BUSINESS.email}
                </a>
              </div>

              <nav aria-label="Footer" className="md:text-right">
                <h2 className="mb-5 text-h3 font-bold text-fg">Elsewhere</h2>
                <ul className="flex flex-col gap-3 md:items-end">
                  <li>
                    <a
                      href="https://linkedin.com/in/xavier-garcia-diez"
                      className="inline-flex items-center gap-2 text-small text-fg-muted hover:text-fg"
                    >
                      LinkedIn <ExternalLink size={12} aria-hidden="true" />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://github.com/xaviergdiez"
                      className="inline-flex items-center gap-2 text-small text-fg-muted hover:text-fg"
                    >
                      GitHub <ExternalLink size={12} aria-hidden="true" />
                    </a>
                  </li>
                  {BUSINESS.kvk && (
                    <li className="mt-3 text-label text-fg-subtle">
                      KVK {BUSINESS.kvk}
                      {BUSINESS.btw ? ` · BTW ${BUSINESS.btw}` : ''}
                    </li>
                  )}
                </ul>
              </nav>
            </div>

            <div className="flex flex-col gap-4 border-t border-line pt-8 text-label text-fg-subtle sm:flex-row sm:justify-between">
              <p>© {new Date().getFullYear()} x-code.studio · {BUSINESS.city}</p>
              <ul className="flex gap-6">
                <li><Link href="/privacy" className="hover:text-neon">Privacy</Link></li>
                <li><Link href="/terms" className="hover:text-neon">Terms</Link></li>
              </ul>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
