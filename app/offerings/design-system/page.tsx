'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Section, SectionHeading, Card } from '@/components/ui/Section';
import { PRICING, UPLIFTS, priceLabel, AUDIT_CREDIT_DAYS } from '@/lib/pricing';

/**
 * Ad system build.
 *
 * This page used to sell something else. It described "bridging Figma
 * and React, living style guides, atomic components to dark-mode
 * architecture", which is a product design system for a web app. That
 * is not the work: SEF was an ad production system, and so is what
 * the studio pitches. The top-priced offer was describing a service
 * the studio does not lead with, and the SEF case now links here, so
 * the mismatch was about to be visible to a reader.
 *
 * Structure follows the four layers used in client pitches, because
 * that is the actual mental model of the work: tokens carry brand,
 * components carry the parts, templates carry the formats, and a
 * campaign is one instance with dropdowns. Feed-readiness is in from
 * the start, since retrofitting it is the expensive version.
 *
 * The route stays /offerings/design-system so existing links and the
 * SEF case keep working. Renaming it to /offerings/ad-system would
 * read better and needs a redirect, which is a separate decision.
 */

const LAYERS = [
  {
    n: '01',
    name: 'Tokens',
    body: 'Colour, type, spacing and logo sizing as variables, with a mode per product, language and partner. A brand is a mode, not a copy of the file.',
  },
  {
    n: '02',
    name: 'Components',
    body: 'Headline block, CTA, price and offer tag, image slot, partner logo slot, legal line. Each one reusable and each one bound to the tokens.',
  },
  {
    n: '03',
    name: 'Templates',
    body: 'Every format built from those components with Auto Layout, so safe zones, margins and copy limits hold at every size.',
  },
  {
    n: '04',
    name: 'Campaign',
    body: 'One instance per campaign. Dropdowns switch product, language, partner and surface across every size at once.',
  },
];

const FEED = [
  { step: 'feed.csv', body: 'One row per variant: product, market, language, partner, copy, price, image.' },
  { step: 'Bound layers', body: 'Every text and image layer named and mapped to a column.' },
  { step: 'Variants', body: 'Rows times formats generated together, with the layout rules applied.' },
  { step: 'Review', body: 'Designers check, adjust and export per channel.' },
];

const PHASES = [
  {
    n: '01',
    name: 'Audit and foundations',
    body: 'Review the current templates and guidelines, set up tokens and core components, ship the first template family so there is something working early.',
  },
  {
    n: '02',
    name: 'Templates and localisation',
    body: 'The remaining format families, language and partner modes, and the campaign switcher.',
  },
  {
    n: '03',
    name: 'Feed scaling',
    body: 'Feed specification, bound layers tested against a real campaign sheet, and the path to generated variants.',
  },
  {
    n: '04',
    name: 'Handoff',
    body: 'In-file documentation, a step-by-step guide, a hands-on workshop and library publishing.',
  },
];

const DELIVERABLES = [
  ['Figma library', 'Tokens, components, templates and the campaign switcher, published to your team.'],
  ['Feed specification', 'Column map, a sample feed and naming rules for every bound layer.'],
  ['Documentation', 'In-file docs beside the templates, plus a step-by-step guide.'],
  ['Training', 'A hands-on workshop for the people who will run it.'],
  ['Maintenance rules', 'Who edits what, how to add a product, language or partner, how to publish.'],
];

export default function AdSystemOffering() {
  return (
    <main className="bg-ink-800">
      {/* ─── HERO ─── */}
      <section className="relative flex min-h-[56vh] items-end overflow-hidden border-b border-line bg-ink-900">
        <div className="absolute inset-0 grid-bg opacity-50" aria-hidden="true" />
        <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-16 sm:px-8">
          <Link
            href="/"
            className="terminal mb-8 inline-flex items-center gap-2 text-label uppercase tracking-label text-fg-subtle hover:text-neon"
          >
            <ArrowLeft size={12} aria-hidden="true" />
            offering / ad system
          </Link>

          <h1 className="max-w-4xl text-h1 font-bold tracking-hero text-fg md:text-display">
            An ad system your team runs without you.
          </h1>

          <p className="mt-6 max-w-2xl text-body text-fg-muted">
            Tokens, components and templates in one Figma library, built feed-ready,
            so a campaign is a set of dropdowns rather than a folder of files.
          </p>

          <p className="mt-8 text-h3 font-bold text-neon">
            {priceLabel(PRICING.designSystem)}
          </p>
          <p className="mt-1 text-small text-fg-subtle">
            Phase one, fixed price. The full programme is scoped after the audit.
          </p>
        </div>
      </section>

      {/* ─── WHO IT IS FOR ─── */}
      <Section tone="raised" width="prose">
        <SectionHeading eyebrow="Who it is for">
          Teams whose asset count grows faster than the team
        </SectionHeading>
        <div className="space-y-5 text-body text-fg-muted">
          <p>
            Every campaign is products times languages times formats times partners.
            Add a market and the work multiplies; add a channel and it multiplies
            again. The design is not the bottleneck, the versioning is.
          </p>
          <p>
            This is the fix: build the campaign once as a system, and let the data
            vary instead of the files.
          </p>
        </div>
      </Section>

      {/* ─── THE FOUR LAYERS ─── */}
      <Section>
        <SectionHeading
          eyebrow="How it is built"
          lede="Four layers, each built on the one below. Change a token or a component once and every template and campaign follows at the next library publish."
        >
          One system, four layers
        </SectionHeading>

        <ol className="grid gap-4 md:grid-cols-2">
          {LAYERS.map((l) => (
            <li key={l.n}>
              <Card>
                <p className="terminal text-label uppercase tracking-label text-signal">{l.n}</p>
                <h3 className="mt-2 text-h3 font-bold text-fg">{l.name}</h3>
                <p className="mt-2 text-small text-fg-muted">{l.body}</p>
              </Card>
            </li>
          ))}
        </ol>
      </Section>

      {/* ─── FEED READY ─── */}
      <Section tone="raised">
        <SectionHeading
          eyebrow="Feed-ready from day one"
          lede="Built to be filled from a spreadsheet whether or not you start that way. Manual campaigns first, then filled from a sheet, then generated. No rebuild between steps."
        >
          From a row to every format
        </SectionHeading>

        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEED.map((f, i) => (
            <li key={f.step} className="relative">
              <Card>
                <p className="terminal text-label text-signal">
                  {String(i + 1).padStart(2, '0')}
                </p>
                <h3 className="mt-2 text-h3 font-bold text-fg">{f.step}</h3>
                <p className="mt-2 text-small text-fg-muted">{f.body}</p>
              </Card>
            </li>
          ))}
        </ol>
      </Section>

      {/* ─── BEYOND DISPLAY ─── */}
      <Section width="prose">
        <SectionHeading eyebrow="Scope">
          Display first, then the channels that share the same parts
        </SectionHeading>
        <div className="space-y-5 text-body text-fg-muted">
          <p>
            Display, Performance Max and LinkedIn come from the same master in phase
            one, because they share the most structure. Social, motion and web run as
            parallel tracks or follow-on phases once the foundation holds.
          </p>
          <p>
            They are worth doing on the same tokens rather than separately: a new
            colourway or a product launch then reaches ads, social and the site
            together instead of three times.
          </p>
        </div>
      </Section>

      {/* ─── WHAT YOU GET ─── */}
      <Section tone="raised">
        <SectionHeading eyebrow="What you get">A system, not a folder</SectionHeading>
        <dl className="grid gap-4 md:grid-cols-2">
          {DELIVERABLES.map(([name, body]) => (
            <div key={name}>
              <Card>
                <dt className="text-h3 font-bold text-fg">{name}</dt>
                <dd className="mt-2 text-small text-fg-muted">{body}</dd>
              </Card>
            </div>
          ))}
        </dl>
        <p className="mt-6 text-small text-fg-subtle">
          The same package delivered for STANLEY Engineered Fastening: library, docs,
          guide and team training.
        </p>
      </Section>

      {/* ─── PHASES ─── */}
      <Section>
        <SectionHeading
          eyebrow="How it runs"
          lede="Four phases, with something usable at the end of the first. Timeline and fee for the later phases are scoped together once the audit is done."
        >
          Value from phase one
        </SectionHeading>

        <ol className="space-y-4">
          {PHASES.map((p) => (
            <li key={p.n}>
              <Card className="md:flex-row md:gap-8">
                <p className="terminal shrink-0 text-h2 font-bold text-signal md:w-16">{p.n}</p>
                <div>
                  <h3 className="text-h3 font-bold text-fg">{p.name}</h3>
                  <p className="mt-2 text-small text-fg-muted">{p.body}</p>
                </div>
              </Card>
            </li>
          ))}
        </ol>
      </Section>

      {/* ─── HOW IT IS PRICED ─── */}
      <Section tone="raised" width="prose">
        <SectionHeading eyebrow="Price">Fixed, per phase</SectionHeading>
        <div className="space-y-5 text-body text-fg-muted">
          <p>
            Phase one is {priceLabel(PRICING.designSystem)}, fixed. Later phases are
            quoted as their own fixed-price deliverables once the audit has shown the
            real format count, language count and partner count.
          </p>
          <p>
            Every engagement is scoped as a deliverable rather than availability. No
            retainer, no hourly billing and no commitment to be on call, which keeps
            the arrangement clean for both sides under Dutch contracting rules.
          </p>
          <p>
            A {PRICING.audit.label} workflow audit is the usual way in, and its fee
            comes off a build booked within {AUDIT_CREDIT_DAYS} days. Engineering the
            system into a codebase is a separate engagement from{' '}
            {UPLIFTS.implementation.label}.
          </p>
        </div>
      </Section>

      {/* ─── PROOF ─── */}
      <Section width="prose">
        <SectionHeading eyebrow="Proof">Built for eight brands at once</SectionHeading>
        <p className="mb-8 text-body text-fg-muted">
          STANLEY Engineered Fastening runs eight brands across display, Performance
          Max and LinkedIn from one component with 120 variants. Their content studio
          builds every campaign from it.
        </p>
        <Link
          href="/cases/sef"
          className="inline-flex items-center gap-2 text-small font-bold text-neon hover:underline"
        >
          Read the SEF case
          <ArrowRight size={14} aria-hidden="true" />
        </Link>
      </Section>

      {/* ─── NEXT ─── */}
      <Section tone="raised" width="prose">
        <SectionHeading>Start with the audit</SectionHeading>
        <p className="mb-8 text-body text-fg-muted">
          One week inside your current process, a written report naming what the
          versioning actually costs, and a scoped proposal for the build. The fee
          comes off the build.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Button href="/offerings/audit">See what the audit covers</Button>
          <Button href="/#contact" variant="secondary">
            Tell me what is broken
          </Button>
        </div>
      </Section>
    </main>
  );
}
