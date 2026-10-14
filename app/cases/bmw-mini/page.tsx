'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Section, SectionHeading, Card } from '@/components/ui/Section';
import { useScrollReveal } from '@/lib/motion';
import { CountUpStat } from '@/components/case/CountUpStat';
import { BannerWall } from '@/components/case/BannerWall';
import { BMW_BANNERS, BANNER_ORIGIN } from '@/lib/bmw-banners';

/**
 * BMW / MINI case study.
 *
 * Reference implementation for the case template. The portfolio's
 * version is the source of the idea and the assets, not the copy.
 * Differences worth knowing before you clone this for the other
 * three cases:
 *
 *  - Three numbers, not seven, and each one carries its method.
 *    The portfolio ran a stats bar and then a four-up results grid
 *    saying partly the same things in different units.
 *  - Headings are sentence case and plain. "Dynamic Asset
 *    Management Revolution" became "The problem", because the
 *    reader is a head of production, not a conference programme.
 *  - Attributed to Monks in the hero, not buried.
 *  - The hero visual is the work itself. Everything else on the
 *    page is subordinate to it.
 */

export default function BmwMiniCase() {
  const rootRef = useRef<HTMLElement>(null);
  useScrollReveal(rootRef);

  return (
    <main ref={rootRef} data-accent="bmw" className="bg-ink-800">
      {/* ─── HERO ─── */}
      <section className="relative flex min-h-[85vh] items-end overflow-hidden border-b border-line">
        <BannerWall
          banners={BMW_BANNERS}
          baseUrl={BANNER_ORIGIN}
          label="A field of the BMW and MINI display units produced for this campaign, shown running."
        />

        <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-16 sm:px-8">
          <Link
            href="/#work"
            className="terminal mb-8 inline-flex items-center gap-2 text-label uppercase tracking-label text-fg-subtle hover:text-accent"
          >
            <ArrowLeft size={12} aria-hidden="true" />
            case / bmw-mini
          </Link>

          <h1 data-split className="max-w-4xl text-h1 font-bold tracking-hero text-fg md:text-display">
            One master build, 27 markets.
          </h1>

          <p className="mt-6 max-w-2xl text-body text-fg-muted">
            BMW and MINI display production, rebuilt as an automated pipeline.
            Delivered as part of the team at Monks.
          </p>
        </div>
      </section>

      {/* ─── NUMBERS ─── */}
      <Section tone="raised">
        <ul className="grid gap-10 sm:grid-cols-3">
          <li>
            <CountUpStat
              value={34000}
              suffix="+"
              group
              label="Assets produced"
              method="Across the campaign run, every market and format."
            />
          </li>
          <li>
            <CountUpStat
              value={27}
              suffix="+"
              label="Markets served"
              method="Localised from a single master build."
            />
          </li>
          <li>
            <CountUpStat
              value={71}
              suffix="%"
              label="Lower cost per asset"
              method="Production cost before the pipeline against after."
            />
          </li>
        </ul>
      </Section>

      {/* ─── PROBLEM ─── */}
      <Section width="prose">
        <SectionHeading eyebrow="The problem">
          Every market was rebuilding the same banner
        </SectionHeading>
        <div className="space-y-5 text-body text-fg-muted">
          <p>
            BMW and MINI run campaigns across more than twenty-seven markets, each
            needing its own language, offer, pricing and legal line. The creative
            was the same. The rebuilding was not.
          </p>
          <p>
            Every market received a master, then recreated it locally. The same
            layout was assembled dozens of times, the same QA pass was run dozens
            of times, and every late copy change meant doing all of it again.
            Brand consistency was a matter of how carefully each team copied.
          </p>
        </div>
      </Section>

      {/* ─── APPROACH ─── */}
      <Section tone="raised" width="prose">
        <SectionHeading eyebrow="The approach">
          One build, fed by data
        </SectionHeading>
        <div className="space-y-5 text-body text-fg-muted">
          <p>
            We built the campaign once, as a template driven by a feed, and let
            the data vary instead of the markup. Copy, pricing, offers, legal
            lines and imagery all arrive at runtime, so a market is a row rather
            than a rebuild.
          </p>
        </div>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2">
          {[
            ['Feed-driven assembly', 'Markets are rows of data, not separate builds.'],
            ['Localisation at runtime', 'Copy and offers resolve when the ad serves.'],
            ['Brand rules in the template', 'Compliance is enforced, not reviewed.'],
            ['One deploy, every platform', 'The same build ships across the stack.'],
          ].map(([title, body]) => (
            <li key={title}>
              <Card>
                <h3 className="text-h3 font-bold text-fg">{title}</h3>
                <p className="mt-2 text-small text-fg-muted">{body}</p>
              </Card>
            </li>
          ))}
        </ul>

        <p className="mt-8 text-small text-fg-subtle">
          The template resolves to more than 300 million possible combinations of
          those variables. That figure is the size of the space, not a count of
          what was served.
        </p>
      </Section>

      {/* ─── OUTCOME ─── */}
      <Section width="prose">
        <SectionHeading eyebrow="The outcome">
          Production stopped scaling with market count
        </SectionHeading>
        <div className="space-y-5 text-body text-fg-muted">
          <p>
            Adding a market became a data entry task rather than a production
            task. The pipeline absorbed the twenty-eighth market at roughly the
            cost of the twenty-seventh, which is the whole point: the work stops
            growing in step with the footprint.
          </p>
          <p>
            The hero of this page is that output. Those are the real units,
            running, not screenshots of them.
          </p>
        </div>
      </Section>

      {/* ─── BUILT WITH ─── */}
      <Section tone="raised" width="prose">
        <SectionHeading eyebrow="Built with">Stack</SectionHeading>
        <ul className="flex flex-wrap gap-2">
          {['React', 'GSAP', 'HTML5 Canvas', 'Node.js', 'Figma API', 'Design tokens', 'Adobe CC'].map(
            (t) => (
              <li
                key={t}
                className="rounded-card border border-line bg-ink-600 px-3 py-1.5 text-small text-fg-muted"
              >
                {t}
              </li>
            ),
          )}
        </ul>
      </Section>

      {/* ─── NEXT ─── */}
      <Section width="prose">
        <SectionHeading>Have the same problem?</SectionHeading>
        <p className="mb-8 text-body text-fg-muted">
          If your markets are each rebuilding the same creative, the fix is the
          same shape every time. A workflow audit finds where it is costing you.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Button href="/offerings/audit">See what an audit covers</Button>
          <Button href="/#work" variant="secondary">
            Other work
          </Button>
        </div>
      </Section>
    </main>
  );
}
