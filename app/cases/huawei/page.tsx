'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Section, SectionHeading, Card } from '@/components/ui/Section';
import { useScrollReveal } from '@/lib/motion';
import { HuaweiPhones } from '@/components/case/HuaweiPhones';

/**
 * Huawei case study. Follows the BMW template.
 *
 * The hero keeps its colour-cycling device wall, which is the best
 * visual on the site after the banner wall, but the text inside it
 * is now sentence case and carries three numbers instead of a
 * stacked column of five. Figures are the portfolio's, per the
 * reconciliation: under 150KB, 52% engagement lift, 78% viewability.
 *
 * The hero text colour is animated by HuaweiPhones between white and
 * ink depending on the finish behind it, so it cannot use a fixed
 * token. That is the one place on the site where text colour is not
 * token-driven, and it is deliberate.
 */

const METRICS = [
  { value: 'Under 150KB', label: 'Total creative weight' },
  { value: '52%', label: 'Engagement lift' },
  { value: '78%', label: 'Viewability rate' },
];

export default function HuaweiCase() {
  const rootRef = useRef<HTMLElement>(null);
  useScrollReveal(rootRef);

  return (
    <main ref={rootRef} data-accent="huawei" className="bg-ink-800">
      <HuaweiPhones>
        <div className="max-w-xl space-y-6 py-20">
          <div className="flex flex-wrap items-center gap-3">
            <span className="hero-text hero-rule terminal inline-block border px-3 py-1 text-label uppercase tracking-label">
              case / huawei
            </span>
            <span className="hero-text hero-rule inline-block border bg-white/10 px-3 py-1 text-label uppercase tracking-label">
              Weborama APTO
            </span>
          </div>

          <h1 className="hero-text text-h1 font-bold tracking-hero md:text-display">
            A phone you can turn over, in under 150KB.
          </h1>

          <p className="hero-text text-body">
            The P30 Pro launch in the Netherlands, built as a rich media unit
            that let people explore every finish without leaving the ad.
            Delivered as part of the team at Monks.
          </p>

          <dl className="flex flex-col gap-3 pt-2 sm:flex-row sm:gap-4">
            {METRICS.map((m) => (
              <div key={m.label} className="hero-rule rounded-card border bg-white/10 px-5 py-3 backdrop-blur-sm">
                <dt className="sr-only">{m.label}</dt>
                <dd className="hero-text text-h2 font-bold">{m.value}</dd>
                <p className="hero-text mt-1 text-label">{m.label}</p>
              </div>
            ))}
          </dl>
        </div>
      </HuaweiPhones>

      <Section width="prose">
        <SectionHeading eyebrow="The problem">
          Rich media that loads like a static banner
        </SectionHeading>
        <div className="space-y-5 text-body text-fg-muted">
          <p>
            A phone launch is a colour story. The P30 Pro came in four finishes,
            and the whole pitch was how they looked. A static banner can show one
            of them.
          </p>
          <p>
            The obvious answer, a video, blows the weight budget and gives the
            viewer nothing to do. Dutch publisher limits left very little room,
            so the unit had to carry four finishes, both faces of the device and
            a full colour transition inside a footprint most teams spend on a
            single image.
          </p>
        </div>
      </Section>

      <Section tone="raised" width="prose">
        <SectionHeading eyebrow="The approach">
          Mask once, swap the fill
        </SectionHeading>
        <div className="space-y-5 text-body text-fg-muted">
          <p>
            The device outline is drawn once as an SVG path and filled with a
            pattern. Changing finish swaps which image inside that pattern is
            visible, so the silhouette never redraws and the transition costs a
            cross-fade rather than a new asset.
          </p>
          <p>
            The background gradient moves in step with the finish, which is what
            makes it read as the colour taking over the frame instead of a
            product shot being replaced. The same technique is running in this
            page hero.
          </p>
        </div>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2">
          {[
            ['One path, four finishes', 'The outline is drawn once and refilled.'],
            ['Gradient follows the device', 'Background and product shift together.'],
            ['No video, no sequence', 'Weight stays in single figures of KB per finish.'],
            ['Text adapts to the backdrop', 'Copy inverts as the finish goes light or dark.'],
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

      <Section width="prose">
        <SectionHeading eyebrow="The outcome">
          People stayed and turned the phone over
        </SectionHeading>
        <div className="space-y-5 text-body text-fg-muted">
          <p>
            Engagement rose 52% against the comparable static placement and
            viewability held at 78%, which for a unit this interactive is the
            number that matters: it was not just loaded, it stayed on screen.
          </p>
          <p>
            It took the Weborama APTO award for the Dutch market that year.
          </p>
        </div>
      </Section>

      <Section tone="raised" width="prose">
        <SectionHeading eyebrow="Built with">Stack</SectionHeading>
        <ul className="flex flex-wrap gap-2">
          {['SVG masking', 'GSAP', 'CSS 3D transforms', 'HTML5', 'Mobile optimisation'].map((t) => (
            <li
              key={t}
              className="rounded-card border border-line bg-ink-600 px-3 py-1.5 text-small text-fg-muted"
            >
              {t}
            </li>
          ))}
        </ul>
      </Section>

      <Section width="prose">
        <SectionHeading>Want a unit that does this?</SectionHeading>
        <p className="mb-8 text-body text-fg-muted">
          Rich media inside a tight weight budget is a craft problem with known
          answers. A build sprint delivers one working unit and the technique
          behind it.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Button href="/offerings/sprint">See what a sprint covers</Button>
          <Button href="/#work" variant="secondary">
            Other work
          </Button>
        </div>
        <Link
          href="/#work"
          className="mt-10 inline-flex items-center gap-2 text-small text-fg-subtle hover:text-accent"
        >
          <ArrowLeft size={14} aria-hidden="true" />
          Back to all work
        </Link>
      </Section>
    </main>
  );
}
