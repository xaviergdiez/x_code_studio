'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Section, SectionHeading, Card } from '@/components/ui/Section';
import { CountUpStat } from '@/components/case/CountUpStat';
import { ThemeMatrix } from '@/components/case/ThemeMatrix';

/**
 * STANLEY Engineered Fastening — ad template library.
 *
 * The most recent work on the site and the only case that is not
 * Monks-era. It matters for three reasons beyond being new:
 *
 *  1. It is the positioning, delivered. One component, 120 variants.
 *     Every other case describes a pipeline; this one is a system
 *     the client's own team now operates.
 *  2. It evidences the teaching leg. The site claims Xavi teaches
 *     teams to run the pipeline, and since NEOLAND came off nothing
 *     on the site showed that. This shipped with documentation, a
 *     character-limit table, design rules and a workshop.
 *  3. It proves the design system offer. x-code.studio sells a
 *     design system sprint; this is that, for ads.
 *
 * CONFIDENTIALITY: everything on this page is the system and the
 * method. No campaign copy, no client photography, no logo artwork
 * and no performance figures. ThemeMatrix is schematic and drawn
 * with tokens. Confirm with SEF before this goes live anyway.
 */

export default function SefCase() {
  return (
    <main data-accent="sef" className="bg-ink-800">
      {/* ─── HERO ─── */}
      {/* 70vh left a large empty field above the copy, because unlike
          the BMW hero there is no wall of running units to fill it.
          56vh keeps the hero feeling like a hero without the dead
          space. */}
      <section className="relative flex min-h-[56vh] items-end overflow-hidden border-b border-line bg-ink-900">
        <div className="absolute inset-0 grid-bg opacity-50" aria-hidden="true" />
        <div
          className="absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              'radial-gradient(ellipse at 80% 20%, color-mix(in srgb, var(--color-accent) 10%, transparent) 0%, transparent 60%)',
          }}
        />

        <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-16 sm:px-8">
          {/* Breadcrumb and year on one deliberate row. Previously the
              inline-block year badge simply flowed up against the end
              of the breadcrumb and the two collided. */}
          <div className="mb-8 flex flex-wrap items-center gap-4">
            <Link
              href="/#work"
              className="terminal inline-flex items-center gap-2 text-label uppercase tracking-label text-fg-subtle hover:text-accent"
            >
              <ArrowLeft size={12} aria-hidden="true" />
              case / stanley-engineered-fastening
            </Link>
            <span className="rounded-card border border-accent/50 px-3 py-1 text-label uppercase tracking-label text-accent">
              2026
            </span>
          </div>

          <h1 className="max-w-4xl text-h1 font-bold tracking-hero text-fg md:text-display">
            Eight brands, one ad template.
          </h1>

          <p className="mt-6 max-w-2xl text-body text-fg-muted">
            A Figma library for STANLEY Engineered Fastening, part of Stanley Black
            &amp; Decker. Their content studio now builds every campaign from it
            without me.
          </p>
        </div>
      </section>

      {/* ─── NUMBERS ─── */}
      <Section tone="raised">
        <ul className="grid gap-10 sm:grid-cols-3">
          <li>
            <CountUpStat
              value={120}
              label="Variants in one component"
              method="8 themes × headline case × lockup × 4 surfaces."
            />
          </li>
          <li>
            <CountUpStat
              value={8}
              label="Brands carried"
              method="SEF, Tucker, Nelson, Pop, Avdel, Optia, Stanley AT, Integra."
            />
          </li>
          <li>
            <CountUpStat
              value={3}
              label="Platform families"
              method="Display, Google Performance Max and LinkedIn."
            />
          </li>
        </ul>
      </Section>

      {/* ─── PROBLEM ─── */}
      <Section width="prose">
        <SectionHeading eyebrow="The problem">
          One house, eight brands, no shared way to make an ad
        </SectionHeading>
        <div className="space-y-5 text-body text-fg-muted">
          <p>
            STANLEY Engineered Fastening is not one brand. It is eight, each with
            its own logo, colour and market, and each needing display, Performance
            Max and LinkedIn creative in a dozen sizes.
          </p>
          <p>
            Built the usual way that is eight parallel sets of files that drift
            apart the moment anyone edits one. A layout fix lands in the brand that
            asked for it and nowhere else, and nobody can say which version is
            current.
          </p>
        </div>
      </Section>

      {/* ─── APPROACH ─── */}
      <Section tone="raised">
        <SectionHeading
          eyebrow="The approach"
          lede="One layout. The brand is a setting, not a copy of the file. Switch a theme below and watch the same ad change hands."
        >
          Make the brand a dropdown
        </SectionHeading>

        <ThemeMatrix />

        <ul className="mt-14 grid gap-4 sm:grid-cols-2">
          {[
            ['Theme-agnostic base masters', 'Every variant is built from one layout, so a fix there reaches all of them.'],
            ['Brand as a variable mode', 'Adding a brand is a new mode plus its logo artwork, not a new file.'],
            ['Four surfaces per theme', 'Default, brand colour, white and black, with text and CTA inverting on their own.'],
            ['Character limits in the layer names', 'The limit is visible where the copy is typed, so overset is caught before export.'],
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

      {/* ─── HANDOVER ─── */}
      <Section width="prose">
        <SectionHeading eyebrow="The handover">
          A system nobody has to ask me about
        </SectionHeading>
        <div className="space-y-5 text-body text-fg-muted">
          <p>
            A library only works if the team can run it the week after you leave,
            so the documentation is part of the deliverable rather than a follow-up.
            It ships with how to use it, the layout rules, the character limit for
            every field in every size, a board showing each surface side by side,
            and a maintenance guide covering where to change what.
          </p>
          <p>
            Retired explorations stay in the file on a private archive page, so the
            reasoning behind the current design survives rather than being quietly
            deleted. The campaign workflow is written down as five steps, including
            the part everyone gets wrong: refilling one image layer updates every
            size at once.
          </p>
        </div>
      </Section>

      {/* ─── OUTCOME ─── */}
      <Section tone="raised" width="prose">
        <SectionHeading eyebrow="The outcome">
          Their team builds the campaigns now
        </SectionHeading>
        <div className="space-y-5 text-body text-fg-muted">
          <p>
            The content studio duplicates a campaign frame, sets four dropdowns,
            types the copy, refills one image, and has a full campaign across three
            platforms in every size. Adding the ninth brand is a variable mode and
            a logo, not another eight files.
          </p>
          <p>
            That is the whole point of the way I work: the pipeline is the
            deliverable, and the team owns it.
          </p>
        </div>
      </Section>

      {/* ─── BUILT WITH ─── */}
      <Section width="prose">
        <SectionHeading eyebrow="Built with">Stack</SectionHeading>
        <ul className="flex flex-wrap gap-2">
          {['Figma variables', 'Component variants', 'Variable modes', 'Published libraries', 'Design tokens'].map(
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
      <Section tone="raised" width="prose">
        <SectionHeading>Running several brands from one set of files?</SectionHeading>
        <p className="mb-8 text-body text-fg-muted">
          The drift is predictable and so is the fix. A build sprint delivers the
          library, the documentation and the handover.
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
