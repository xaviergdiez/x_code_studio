'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Section, SectionHeading, Card } from '@/components/ui/Section';
import { CountUpStat } from '@/components/case/CountUpStat';

/**
 * Google gTech case study. Follows the BMW template.
 *
 * This is the strongest credential on the site and the one the old
 * page wasted. It described a "data-to-creative pipeline" with a 45%
 * CTR number. The portfolio tells the real story: leading a display
 * team across three regions for Google's technical services org.
 * The audit's advice was to lead with the rare thing. Leading
 * delivery across AMER, EMEA and APAC is the rare thing.
 *
 * Two deliberate omissions, both flagged to Xavi:
 *
 *  - The portfolio's "$66M+ team revenue impact" is not here. It is
 *    the kind of figure a prospect asks you to substantiate, and a
 *    revenue claim on a commercial site carries more weight than the
 *    same claim on a personal portfolio. Add it if it can be stood
 *    behind; the slot is the fourth stat.
 *  - "GTECH" as a company name is gone. gTech is Google's Technical
 *    Services organisation, not a client called Gtech, and getting
 *    that wrong in front of an ad-tech buyer is costly.
 */

export default function GtechCase() {
  return (
    <main data-accent="gtech" className="bg-ink-800">
      {/* ─── HERO ─── */}
      <section className="relative flex min-h-[70vh] items-end overflow-hidden border-b border-line bg-ink-900">
        <div className="absolute inset-0 grid-bg-dense opacity-40" aria-hidden="true" />
        <div
          className="absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              'radial-gradient(ellipse at 75% 30%, color-mix(in srgb, var(--color-accent) 12%, transparent) 0%, transparent 60%)',
          }}
        />

        <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-16 sm:px-8">
          <Link
            href="/#work"
            className="terminal mb-8 inline-flex items-center gap-2 text-label uppercase tracking-label text-fg-subtle hover:text-accent"
          >
            <ArrowLeft size={12} aria-hidden="true" />
            case / google-gtech
          </Link>

          <h1 className="max-w-4xl text-h1 font-bold tracking-hero text-fg md:text-display">
            Display delivery across three regions, one standard.
          </h1>

          <p className="mt-6 max-w-2xl text-body text-fg-muted">
            Leading the display team serving Google gTech across AMER, EMEA and
            APAC. Delivered as part of the team at Monks.
          </p>
        </div>
      </section>

      {/* ─── NUMBERS ─── */}
      <Section tone="raised">
        <ul className="grid gap-10 sm:grid-cols-3">
          <li>
            <CountUpStat
              value={15}
              suffix="+"
              label="Developers led"
              method="Across three regional teams, at peak."
            />
          </li>
          <li>
            <CountUpStat
              value={95}
              suffix="+"
              label="Markets covered"
              method="EMEA footprint served by the team."
            />
          </li>
          <li>
            <CountUpStat
              value={230}
              suffix="%"
              label="Conversion lift"
              method="Dynamic remarketing against the previous static setup."
            />
          </li>
        </ul>
      </Section>

      {/* ─── PROBLEM ─── */}
      <Section width="prose">
        <SectionHeading eyebrow="The problem">
          Three regions solving the same problem three ways
        </SectionHeading>
        <div className="space-y-5 text-body text-fg-muted">
          <p>
            Display production for Google ran out of three regional hubs, each
            with its own developers, its own conventions and its own idea of what
            finished looked like. The work was good in all three. It was not the
            same in any two.
          </p>
          <p>
            That costs more than it looks. A technique proven in EMEA does not
            reach APAC. The same bug is fixed three times. A client who works
            across regions gets three different answers to one question, and
            quality becomes a matter of which hub picked up the brief.
          </p>
        </div>
      </Section>

      {/* ─── APPROACH ─── */}
      <Section tone="raised" width="prose">
        <SectionHeading eyebrow="The approach">
          Shared standard, regional ownership
        </SectionHeading>
        <div className="space-y-5 text-body text-fg-muted">
          <p>
            The fix was not centralising the work, which would have put every
            brief in one timezone. It was agreeing the standard once, then letting
            each region own delivery against it: shared build conventions, a
            common review bar, and techniques written down where the other hubs
            could find them.
          </p>
          <p>
            Each region kept the specialism its market demanded. What stopped
            varying was the floor.
          </p>
        </div>

        <ul className="mt-10 grid gap-4 sm:grid-cols-3">
          {[
            ['EMEA', '95+ markets', 'Dynamic creative and remarketing at the widest footprint.'],
            ['AMER', '15+ members', 'HTML5 build and Studio delivery.'],
            ['APAC', 'Round-the-clock', 'DV360 and mobile, covering the timezone gap.'],
          ].map(([region, scope, body]) => (
            <li key={region}>
              <Card>
                <p className="terminal text-label uppercase tracking-label text-accent">{region}</p>
                <h3 className="mt-2 text-h3 font-bold text-fg">{scope}</h3>
                <p className="mt-2 text-small text-fg-muted">{body}</p>
              </Card>
            </li>
          ))}
        </ul>
      </Section>

      {/* ─── OUTCOME ─── */}
      <Section width="prose">
        <SectionHeading eyebrow="The outcome">
          The floor stopped depending on the hub
        </SectionHeading>
        <div className="space-y-5 text-body text-fg-muted">
          <p>
            Dynamic remarketing built to the shared standard lifted conversion
            230% against the static setup it replaced. The number matters, but the
            durable part is that the technique behind it was written down, so the
            next team could use it without rediscovering it.
          </p>
          <p>
            This is the work that most directly informs what x-code.studio does
            now. Teaching a team to run the pipeline, rather than running it for
            them, is the same job at a different scale.
          </p>
        </div>
      </Section>

      {/* ─── BUILT WITH ─── */}
      <Section tone="raised" width="prose">
        <SectionHeading eyebrow="Built with">Stack</SectionHeading>
        <ul className="flex flex-wrap gap-2">
          {['DV360', 'Google Studio', 'Dynamic remarketing', 'HTML5', 'Feed architecture', 'Node.js'].map(
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
        <SectionHeading>Teams solving it three different ways?</SectionHeading>
        <p className="mb-8 text-body text-fg-muted">
          Inconsistency across teams is a standards problem, not a talent problem.
          A workflow audit finds where the floor is slipping and what it costs.
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
