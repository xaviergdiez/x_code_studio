'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Section, SectionHeading, Card } from '@/components/ui/Section';
import { useScrollReveal } from '@/lib/motion';
import { HuaweiPhones } from '@/components/case/HuaweiPhones';
import { TwilightPhone } from '@/components/case/TwilightPhone';
import { HuaweiTakeover } from '@/components/case/HuaweiTakeover';

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
            Delivered as part of the team at This Page.
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

      {/* The approach, demonstrated rather than described. The two
          sections above explain that the phone is drawn and not
          photographed; this is the drawn phone. */}
      <Section>
        <SectionHeading
          eyebrow="The unit"
          lede="The Mate 20 Pro, drawn as one filled path rather than photographed. Move the pointer across it: the phone's hues shift one way, the backdrop's the other, and the specular highlight follows the cursor. That opposition is what makes the glass read as glass."
        >
          Turn it over
        </SectionHeading>

        <TwilightPhone />

        <p className="mt-6 max-w-2xl text-small text-fg-subtle">
          No video, no image sequence, no sprite sheet. All three were ruled out
          by the weight budget, and this is what was built instead.
        </p>
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

      {/* The 2019 follow-up. Same client, different hard problem:
          not one unit under a weight budget, but four separately
          served documents that had to agree.

          Recorded footage first, then the rebuild. The video is what
          actually ran on nu.nl and is the evidence; the interactive
          version below it explains the mechanism. Showing only the
          rebuild would be asking the reader to take the campaign on
          trust. */}
      <Section tone="raised">
        <SectionHeading
          eyebrow="The year after"
          lede="For the P30 Pro the choice moved out of the banner and onto the whole page. Four separately served ad slots, one finish, picked once."
        >
          One colour, four ad slots
        </SectionHeading>

        {/* preload="none" so nothing but the posters downloads until
            a visitor asks for it. The two clips are 442KB and 261KB,
            down from 6.1MB and 432KB of source: a case page arguing
            for a weight budget should not be the heaviest page on
            the site. */}
        <div className="grid gap-4 lg:grid-cols-[1.6fr_1fr] lg:items-start">
          <figure className="m-0">
            <video
              className="w-full rounded-card border border-line bg-ink-900"
              src="/video/huawei/hpto.mp4"
              poster="/video/huawei/hpto-poster.jpg"
              preload="none"
              controls
              muted
              loop
              playsInline
            />
            <figcaption className="mt-3 text-small text-fg-subtle">
              The live takeover on nu.nl. Masthead, both skins and the in-page
              rectangle moving together as the finish changes.
            </figcaption>
          </figure>

          <figure className="m-0">
            <video
              className="w-full rounded-card border border-line bg-ink-900"
              src="/video/huawei/picker.mp4"
              poster="/video/huawei/picker-poster.jpg"
              preload="none"
              controls
              muted
              loop
              playsInline
            />
            <figcaption className="mt-3 text-small text-fg-subtle">
              The 300x250 up close. Kies je kleur: the phone scales up and the
              whole surface takes its finish.
            </figcaption>
          </figure>
        </div>

        <h3 className="mt-16 text-h3 font-bold text-fg">Try the mechanism</h3>
        <p className="mb-6 mt-2 max-w-2xl text-small text-fg-muted">
          A rebuild of the same topology, so you can drive it. Pick a finish in
          the rectangle and the masthead and both skins follow. Twilight is in
          the picker too, drawn rather than photographed, which is the phone
          above arriving through the newer mechanism.
        </p>

        <HuaweiTakeover />

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <Card>
            <h3 className="text-h3 font-bold text-fg">Four documents, one state</h3>
            <p className="mt-2 text-small text-fg-muted">
              Every slot is served separately and none can see the others, so
              the rectangle never recolours itself. It reports the pick, the
              page fans it back to all four, and each applies it. That round
              trip is what keeps them in step instead of three agreeing and one
              drifting. Weborama&apos;s screenad API carried it on the live
              campaign; this rebuild uses real iframes and postMessage, which is
              the same topology.
            </p>
          </Card>
          <Card>
            <h3 className="text-h3 font-bold text-fg">Late slots get caught up</h3>
            <p className="mt-2 text-small text-fg-muted">
              Each slot announces itself on load and is answered with the
              current finish. Without that handshake, a skin that finished
              loading a second after the others came up on the default colour,
              which is the classic takeover failure: three surfaces agreeing and
              one insisting on blue.
            </p>
          </Card>
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
