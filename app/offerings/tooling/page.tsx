'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Section, SectionHeading, Card } from '@/components/ui/Section';
import { PRICING, priceLabel, AUDIT_CREDIT_DAYS } from '@/lib/pricing';

/**
 * Pipeline tooling.
 *
 * Replaces the "Tools you download, from €100" tier, which had been
 * marked "In build" for a month, had no checkout, and sat oddly
 * beside a €14,500 system build. A €100 download next to that makes
 * the system build look arbitrary rather than making the download
 * look cheap.
 *
 * The honest version of that tier is bespoke tooling: a Figma plugin,
 * a build and preview pipeline, an automated delivery step, built for
 * one team's workflow and priced like the engineering it is.
 *
 * ── On the npm packages ──────────────────────────────────────────
 *
 * The display toolchain listed here is real and published under the
 * @whoisxavier scope. Four of the five packages are MIT forks of
 * MediaMonks' open-source display tooling, and the repositories
 * already carry "Based on the original work by MediaMonks (MIT
 * License)" with MediaMonks' copyright intact in the licence files.
 *
 * The copy below says "maintain", never "built". Claiming someone
 * else's open-source work would be the same credibility failure as
 * taking sole credit for the Monks client work, and the honest
 * version is a stronger claim anyway: maintaining a production
 * toolchain is evidence of knowing it deeply.
 *
 * Two repositories are missing licence files (display-ads-recorder
 * and generator-display-boilerplate). Worth fixing in those repos.
 */

const TOOLS = [
  {
    name: 'Figma plugins',
    body: 'Enforce the rules a library depends on: character limits per field and size, export presets per channel, bulk theme and surface switching, naming conventions checked before handoff.',
    note: 'Built against your own library',
  },
  {
    name: 'Build and preview pipelines',
    body: 'Local dev server for display units, multi-vendor compilation, and a preview anyone can open. One command instead of a folder of per-vendor builds.',
    note: 'display-dev-server, display-temple',
  },
  {
    name: 'Automated delivery',
    body: 'Push finished units to ad platforms and storage from the command line rather than through a sequence of upload forms.',
    note: 'display-upload',
  },
  {
    name: 'Video and GIF variants',
    body: 'Record HTML units to video and animated GIF, which is what social and Performance Max placements need from the same master.',
    note: 'display-ads-recorder',
  },
  {
    name: 'Feed generators',
    body: 'Turn a campaign spreadsheet into the feed your templates read, with the column map and validation that stops a bad row reaching production.',
    note: 'Built per feed spec',
  },
];

export default function ToolingOffering() {
  return (
    <main className="bg-ink-800">
      {/* ─── HERO ─── */}
      <section className="relative flex min-h-[56vh] items-end overflow-hidden border-b border-line bg-ink-900">
        <div className="absolute inset-0 grid-bg-dense opacity-40" aria-hidden="true" />
        <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-16 sm:px-8">
          <Link
            href="/"
            className="terminal mb-8 inline-flex items-center gap-2 text-label uppercase tracking-label text-fg-subtle hover:text-neon"
          >
            <ArrowLeft size={12} aria-hidden="true" />
            offering / pipeline tooling
          </Link>

          <h1 className="max-w-4xl text-h1 font-bold tracking-hero text-fg md:text-display">
            Tools built for your pipeline, not sold off a shelf.
          </h1>

          <p className="mt-6 max-w-2xl text-body text-fg-muted">
            A Figma plugin, a build and preview pipeline, an automated delivery step.
            Scoped to the way your team actually works, and yours to keep.
          </p>

          <p className="mt-8 text-h3 font-bold text-neon">{priceLabel(PRICING.tooling)}</p>
          <p className="mt-1 text-small text-fg-subtle">
            Per tool, fixed price, quoted once the shape is clear.
          </p>
        </div>
      </section>

      {/* ─── WHY NOT A DOWNLOAD ─── */}
      <Section tone="raised" width="prose">
        <SectionHeading eyebrow="Why bespoke">
          A generic script solves a generic problem
        </SectionHeading>
        <div className="space-y-5 text-body text-fg-muted">
          <p>
            Production bottlenecks are specific. They sit in the gap between the way
            your files are named, the platforms you deliver to and the approvals you
            have to pass. A tool bought off a shelf fits none of that, so it gets
            used twice and abandoned.
          </p>
          <p>
            Everything here is built against your library, your naming and your
            delivery targets, then handed over with the source and documentation.
          </p>
        </div>
      </Section>

      {/* ─── WHAT GETS BUILT ─── */}
      <Section>
        <SectionHeading
          eyebrow="What gets built"
          lede="Most requests land in one of these. The named packages are the open-source display toolchain I maintain, which is usually the starting point rather than a blank page."
        >
          Five kinds of tool
        </SectionHeading>

        <ul className="grid gap-4 md:grid-cols-2">
          {TOOLS.map((t) => (
            <li key={t.name}>
              <Card>
                <h3 className="text-h3 font-bold text-fg">{t.name}</h3>
                <p className="mt-2 flex-grow text-small text-fg-muted">{t.body}</p>
                <p className="terminal mt-4 text-label text-fg-subtle">{t.note}</p>
              </Card>
            </li>
          ))}
        </ul>
      </Section>

      {/* ─── THE TOOLCHAIN ─── */}
      <Section tone="raised" width="prose">
        <SectionHeading eyebrow="The toolchain">
          Published, and kept working
        </SectionHeading>
        <div className="space-y-5 text-body text-fg-muted">
          <p>
            I maintain a distribution of the open-source display toolchain on npm
            under the <span className="terminal text-fg">@whoisxavier</span> scope:
            the dev server, the unit templates, the uploader and the ads recorder.
            They are MIT forks of the toolchain MediaMonks released, kept current
            and extended where client work needs it.
          </p>
          <p>
            That matters for two reasons. Your tool usually starts from working code
            rather than a blank repository, and the person building it has been
            inside that toolchain long enough to maintain it in public.
          </p>
        </div>
      </Section>

      {/* ─── KEEPING IT ALIVE ─── */}
      <Section>
        <SectionHeading
          eyebrow="Keeping it working"
          lede="Optional, renewable, cancellable. It buys a working tool rather than my availability, so there is no retainer and no commitment to be on call."
        >
          Tool care, {priceLabel(PRICING.toolCare)}
        </SectionHeading>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <h3 className="text-h3 font-bold text-fg">Why a tool needs it</h3>
            <p className="mt-2 text-small text-fg-muted">
              Ad platform specifications change, the Figma plugin API changes, and
              the Node ecosystem underneath moves constantly. A tool built this year
              stops working next year without anyone touching it.
            </p>
          </Card>
          <Card>
            <h3 className="text-h3 font-bold text-fg">What it covers</h3>
            <p className="mt-2 text-small text-fg-muted">
              Keeping the tool running against those changes, dependency and security
              updates, and a defined budget of small changes across the year. Larger
              additions are quoted as their own build.
            </p>
          </Card>
        </div>

        <p className="mt-6 text-small text-fg-subtle">
          Priced at roughly a quarter of a build per year, which is the usual band
          for software maintenance. Decline it and the tool is still yours, with the
          source and the documentation.
        </p>
      </Section>

      {/* ─── NEXT ─── */}
      <Section tone="raised" width="prose">
        <SectionHeading>Not sure which tool you need?</SectionHeading>
        <p className="mb-8 text-body text-fg-muted">
          That is what the audit is for. One week inside the process, a written
          report naming where the time actually goes, and a scoped proposal. The fee
          comes off whatever gets built within {AUDIT_CREDIT_DAYS} days.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Button href="/offerings/audit">See what the audit covers</Button>
          <Button href="/#contact" variant="secondary">
            Tell me what is broken
          </Button>
        </div>
        <Link
          href="/cases/sef"
          className="mt-10 inline-flex items-center gap-2 text-small text-fg-subtle hover:text-neon"
        >
          See a system built this way
          <ArrowRight size={14} aria-hidden="true" />
        </Link>
      </Section>
    </main>
  );
}
