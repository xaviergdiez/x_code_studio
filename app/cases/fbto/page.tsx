'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Section, SectionHeading, Card } from '@/components/ui/Section';
import { CountUpStat } from '@/components/case/CountUpStat';

/**
 * FBTO case study. Follows the BMW template.
 *
 * Figures are the portfolio's, per the reconciliation: 3x CTR
 * against static, 12.6s time-in-frame, 61% brand recall lift. The
 * old x-code.studio page claimed 250% engagement and an 85%
 * conversion bump, neither of which appears anywhere in the
 * portfolio and both of which read as round numbers with no method.
 * They are gone.
 *
 * Time-in-frame is the strongest number here and the least
 * fashionable, which is exactly why it leads. 12.6 seconds is a
 * measurement, not a multiple.
 */

export default function FbtoCase() {
  return (
    <main data-accent="fbto" className="bg-ink-800">
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

        <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-16 sm:px-8">
          <Link
            href="/#work"
            className="terminal mb-8 inline-flex items-center gap-2 text-label uppercase tracking-label text-fg-subtle hover:text-accent"
          >
            <ArrowLeft size={12} aria-hidden="true" />
            case / fbto
          </Link>

          <p className="mb-4 inline-block rounded-card border border-accent/50 px-3 py-1 text-label uppercase tracking-label text-accent">
            Weborama Campaign of the Year
          </p>

          <h1 className="max-w-4xl text-h1 font-bold tracking-hero text-fg md:text-display">
            Twelve seconds inside an insurance ad.
          </h1>

          <p className="mt-6 max-w-2xl text-body text-fg-muted">
            Rich media for FBTO in the Netherlands, built to explain a product
            nobody wants to read about. Delivered as part of the team at Monks.
          </p>
        </div>
      </section>

      {/* ─── NUMBERS ─── */}
      <Section tone="raised">
        <ul className="grid gap-10 sm:grid-cols-3">
          <li>
            <CountUpStat
              value={12.6}
              suffix="s"
              decimals={1}
              label="Average time in frame"
              method="Measured against the campaign's served impressions."
            />
          </li>
          <li>
            <CountUpStat
              value={3}
              suffix="x"
              label="Click-through against static"
              method="Compared with the static placement in the same flight."
            />
          </li>
          <li>
            <CountUpStat
              value={61}
              suffix="%"
              label="Brand recall lift"
              method="Post-campaign recall study against a control group."
            />
          </li>
        </ul>
      </Section>

      {/* ─── PROBLEM ─── */}
      <Section width="prose">
        <SectionHeading eyebrow="The problem">
          Nobody wants to learn about health insurance
        </SectionHeading>
        <div className="space-y-5 text-body text-fg-muted">
          <p>
            FBTO sells a product that is genuinely complicated and genuinely
            boring to the person seeing the ad. The things that differentiate it
            are the details of what is covered, and details do not fit in a
            banner.
          </p>
          <p>
            The usual response is to stop trying: show a smiling family, show the
            logo, hope the brand does the work. That tests fine and explains
            nothing, so the actual proposition never lands.
          </p>
        </div>
      </Section>

      {/* ─── APPROACH ─── */}
      <Section tone="raised" width="prose">
        <SectionHeading eyebrow="The approach">
          Make the explanation the interaction
        </SectionHeading>
        <div className="space-y-5 text-body text-fg-muted">
          <p>
            Rather than compressing the proposition into one frame, the unit let
            people walk through it. Interactive video segments, each answering one
            question, with the viewer choosing which to open rather than sitting
            through a sequence.
          </p>
          <p>
            That changes what you are optimising for. A static banner wants the
            fastest possible click. This wanted the opposite: time spent, because
            time spent is the only way the product gets explained.
          </p>
        </div>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2">
          {[
            ['Viewer picks the path', 'Segments open on demand, not in sequence.'],
            ['One question per segment', 'Each answers a single thing clearly.'],
            ['Video inside the unit', 'No click-out, no landing page needed first.'],
            ['Built for dwell, not clicks', 'Success measured in seconds held.'],
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

      {/* ─── OUTCOME ─── */}
      <Section width="prose">
        <SectionHeading eyebrow="The outcome">
          People stayed twelve seconds
        </SectionHeading>
        <div className="space-y-5 text-body text-fg-muted">
          <p>
            12.6 seconds of average time in frame is a long while for display.
            Click-through still came in at three times the static placement in the
            same flight, which was the part nobody expected: optimising for dwell
            did not cost clicks, it produced them.
          </p>
          <p>
            Recall lifted 61% against control, and the campaign took Weborama
            Campaign of the Year.
          </p>
        </div>
      </Section>

      {/* ─── BUILT WITH ─── */}
      <Section tone="raised" width="prose">
        <SectionHeading eyebrow="Built with">Stack</SectionHeading>
        <ul className="flex flex-wrap gap-2">
          {['HTML5 Canvas', 'GSAP', 'SVG', 'Interactive video', 'Rich media'].map((t) => (
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
