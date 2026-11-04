'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Section, SectionHeading, Card } from '@/components/ui/Section';
import { NoodleDraw } from '@/components/case/NoodleDraw';
import { useScrollReveal } from '@/lib/motion';

/**
 * FBTO.
 *
 * Rewritten against the original campaign pages, because the first
 * version of this page described work that did not happen. It
 * claimed "interactive video segments, each answering one question",
 * a 12.6 second average time in frame, a 3x click-through and a 61%
 * recall lift. None of that is in the portfolio, the creative or any
 * source I could find, and the house rule is that every number has
 * to survive "and how would you know that". So the invented numbers
 * are gone rather than restated.
 *
 * What the work actually was: three rich media formats for FBTO's
 * modular health insurance, where the product is a set of eleven
 * modules you assemble yourself. Everything stated below is visible
 * in the creative itself:
 *
 *   "Kies de zorgverzekering die bij jou past"
 *   "Kies uit 11 modules en sluit binnen 2 minuten af"
 *   "Of je nu van spelen of van sporten houdt"
 *   a Campaign of the Year 2019 ribbon, baked into the Mozaïek
 *
 * If real campaign metrics exist, they belong in a NUMBERS band
 * here. They are left out rather than guessed.
 */

const FORMATS = [
  {
    id: 'mozaiek',
    name: 'Native Mozaïek',
    kind: 'Native · 3D tile creative',
    lede:
      'A grid of tiles, one per cover module, sitting in the feed as a native placement. The tiles live on separate planes and move independently, so the unit reads as depth rather than as a banner with buttons.',
    traits: ['Native placement', 'Multiple planes', 'Tile per module'],
    video: '/video/fbto/mozaiek.mp4',
    poster: '/video/fbto/mozaiek-poster.jpg',
  },
  {
    id: 'interscroller',
    name: 'Interactive Scroller',
    kind: 'Interscroller · cross-device',
    lede:
      'One creative that runs from a phone to a desktop monitor. It detects orientation and reflows, so the same build fills a portrait handset and a landscape display without a second set of assets.',
    traits: ['Phone to desktop', 'Detects orientation', 'One build'],
    video: '/video/fbto/interscroller.mp4',
    poster: '/video/fbto/interscroller-poster.jpg',
  },
  {
    id: 'hpto',
    name: 'Homepage takeover',
    kind: 'HPTO · full page',
    lede:
      'Skins down both sides of a publisher homepage carrying video, with the in-page placement between them. The whole page becomes the unit for the length of the visit.',
    traits: ['Both skins', 'Video in the skin', 'Publisher homepage'],
    video: '/video/fbto/hpto.mp4',
    poster: '/video/fbto/hpto-poster.jpg',
  },
];

export default function FbtoCase() {
  const rootRef = useRef<HTMLElement>(null);
  useScrollReveal(rootRef);

  return (
    <main ref={rootRef} data-accent="fbto" className="bg-ink-800">
      {/* ─── HERO ─── */}
      <section className="relative flex min-h-[70vh] items-end overflow-hidden border-b border-line bg-ink-900">
        <div className="absolute inset-0 grid-bg opacity-60" aria-hidden="true" />
        <div
          className="absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              'radial-gradient(ellipse at 20% 70%, color-mix(in srgb, var(--color-accent) 14%, transparent) 0%, transparent 60%)',
          }}
        />

        {/* The noodle, lifted from the Mozaïek creative where it is
            the animated element travelling across the tiles. Both
            gradient stops are overridden: the component defaults to
            neon into signal, and a green ribbon on a pink-accented
            page fought the case rather than carrying it.

            mode="intro" because this is a hero. Scroll-scrubbing it
            drew nothing, since a hero's top is already past the
            trigger on load. */}
        <NoodleDraw
          className="pointer-events-none absolute -right-[18%] top-0 h-full w-[78%] opacity-30 [--noodle-end:var(--color-signal)] [--noodle-start:var(--color-accent)] sm:-right-[12%] lg:w-[46%]"
          svgClassName="h-full w-full"
          preserveAspectRatio="xMidYMid slice"
          mode="intro"
        />

        <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-16 sm:px-8">
          <Link
            href="/#work"
            className="terminal mb-8 flex w-fit items-center gap-2 text-label uppercase tracking-label text-fg-subtle hover:text-accent"
          >
            <ArrowLeft size={12} aria-hidden="true" />
            case / fbto
          </Link>

          <p className="mb-4 inline-block rounded-card border border-accent/50 px-3 py-1 text-label uppercase tracking-label text-accent">
            Weborama Campaign of the Year 2019
          </p>

          <h1 data-split className="max-w-4xl text-h1 font-bold tracking-hero text-fg md:text-display">
            Eleven modules, three formats, one build.
          </h1>

          <p className="mt-6 max-w-2xl text-body text-fg-muted">
            FBTO sells health insurance you assemble yourself. Rich media for
            the Dutch market that puts the assembling inside the ad, across a
            native tile unit, a cross-device scroller and a homepage takeover.
            Delivered as part of the team at Monks.
          </p>
        </div>
      </section>

      {/* ─── PROBLEM ─── */}
      <Section width="prose">
        <SectionHeading eyebrow="The problem">
          The selling point is also the obstacle
        </SectionHeading>
        <div className="space-y-5 text-body text-fg-muted">
          <p>
            FBTO&apos;s proposition is modularity: you pick from eleven cover
            modules and build a policy that matches how you actually live. That
            is the reason to choose them and it is impossible to put in a
            banner, because the whole point is the choosing.
          </p>
          <p>
            Flatten it to one frame and it becomes another insurance ad with a
            logo. The brief was really a format problem: find placements where
            the choosing can happen before anyone clicks away.
          </p>
        </div>
      </Section>

      {/* ─── THE FORMATS ─── */}
      <Section tone="raised">
        <SectionHeading
          eyebrow="The work"
          lede="Three placements, each solving the same problem in the shape its environment allows. All three carry the same copy line: kies de zorgverzekering die bij jou past."
        >
          Three rich media formats
        </SectionHeading>

        <div className="space-y-16">
          {FORMATS.map((f, i) => (
            <article key={f.id} className="grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-start">
              <figure className="m-0">
                {/* preload="none" behind a poster: a case page about
                    rich media should not itself ship megabytes
                    before anyone asks. */}
                <video
                  className="w-full rounded-card border border-line bg-ink-900"
                  src={f.video}
                  poster={f.poster}
                  preload="none"
                  controls
                  muted
                  loop
                  playsInline
                />
              </figure>

              <div>
                <p className="terminal text-label uppercase tracking-label text-eyebrow">
                  {String(i + 1).padStart(2, '0')} · {f.kind}
                </p>
                <h3 className="mt-2 text-h2 font-bold text-fg">{f.name}</h3>
                <p className="mt-4 text-body text-fg-muted">{f.lede}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {f.traits.map((t) => (
                    <li
                      key={t}
                      className="rounded-card border border-line bg-ink-600 px-3 py-1.5 text-small text-fg-muted"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* ─── HOW IT HOLDS TOGETHER ─── */}
      <Section width="prose">
        <SectionHeading eyebrow="The approach">
          One creative, three environments
        </SectionHeading>
        <div className="space-y-5 text-body text-fg-muted">
          <p>
            A native tile unit, a full-bleed scroller and a pair of page skins
            have almost nothing in common as placements. What they share is the
            parts: the module tiles, the copy line, the logo lockup, the call to
            action, and the ribbon that travels across the composition.
          </p>
          <p>
            Building those once and arranging them per format is what makes
            three placements affordable. It is the same argument as every other
            case here, applied to rich media rather than to display sizes.
          </p>
        </div>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2">
          {[
            ['Shared parts', 'Tiles, copy, lockup and CTA built once and rearranged.'],
            ['Orientation aware', 'The scroller reflows rather than shipping a second build.'],
            ['Motion carries across', 'The same ribbon runs through every placement.'],
            ['Native where it sits', 'The Mozaïek reads as feed content, not as a banner.'],
          ].map(([title, body]) => (
            <li key={title}>
              <Card>
                <h3 className="text-h3 font-bold text-fg">{title}</h3>
                <p className="mt-2 text-small text-fg-muted">{body}</p>
              </Card>
            </li>
          ))}
        </ul>
      </Section>

      {/* ─── BUILT WITH ─── */}
      <Section tone="raised" width="prose">
        <SectionHeading eyebrow="Built with">Stack</SectionHeading>
        <ul className="flex flex-wrap gap-2">
          {['HTML5', 'GSAP', 'SVG', 'Responsive video', 'Weborama rich media'].map((t) => (
            <li
              key={t}
              className="rounded-card border border-line bg-ink-600 px-3 py-1.5 text-small text-fg-muted"
            >
              {t}
            </li>
          ))}
        </ul>
      </Section>

      {/* ─── NEXT ─── */}
      <Section width="prose">
        <SectionHeading>Have something hard to explain?</SectionHeading>
        <p className="mb-8 text-body text-fg-muted">
          Complicated products are a format problem before they are a creative
          problem. A build sprint delivers one working unit and the approach
          behind it.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Button href="/offerings/sprint">See what a sprint covers</Button>
          <Button href="/#work" variant="secondary">
            Other work
          </Button>
        </div>
      </Section>
    </main>
  );
}
