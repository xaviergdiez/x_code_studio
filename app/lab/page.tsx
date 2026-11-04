'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Section, SectionHeading, Card } from '@/components/ui/Section';
import { useScrollReveal } from '@/lib/motion';
import { SvgWarpText } from '@/components/lab/SvgWarpText';
import { GridCrosshair } from '@/components/lab/GridCrosshair';
import { DistortLinks } from '@/components/lab/DistortLinks';
import { PixelReveal } from '@/components/lab/PixelReveal';
import { TwilightPhone } from '@/components/lab/TwilightPhone';

/**
 * Motion lab.
 *
 * Four candidate effects from the Codrops audit, wired to the real
 * tokens so they can be judged here rather than on a demo reel with
 * someone else's typeface and someone else's background.
 *
 * All four are Class A: SVG filters and canvas 2D, no WebGL, no new
 * dependency beyond the GSAP and ScrollTrigger already on every
 * page. Combined cost is roughly 9KB of component code, which is
 * why they were shortlisted ahead of the Three.js demos. Adding
 * ~170KB of WebGL runtime to a site whose flagship case is "a phone
 * you can turn over, in under 150KB" argues against the case.
 *
 * Each card states what it costs and what it gives up. The ones with
 * a real tradeoff say so, because a lab that only flatters its
 * candidates is not worth building.
 */
export default function Lab() {
  const rootRef = useRef<HTMLElement>(null);
  useScrollReveal(rootRef);

  return (
    <main ref={rootRef} className="bg-ink-800">
      {/* ─── HERO ─── */}
      <section className="relative flex min-h-[48vh] items-end overflow-hidden border-b border-line bg-ink-900">
        <div className="absolute inset-0 grid-bg opacity-40" aria-hidden="true" />
        <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-16 sm:px-8">
          <Link
            href="/"
            className="terminal mb-8 inline-flex min-h-[44px] items-center gap-2 text-label uppercase tracking-label text-fg-subtle hover:text-neon"
          >
            <ArrowLeft size={12} aria-hidden="true" />
            internal / motion lab
          </Link>

          <h1 className="max-w-4xl text-h1 font-bold tracking-hero text-fg md:text-display">
            Four candidates, on the real tokens.
          </h1>

          <p className="mt-6 max-w-2xl text-body text-fg-muted">
            Shortlisted from the Codrops catalogue on one rule: it has to look
            expensive and weigh nothing. No WebGL, no new dependency. Scroll
            each panel and judge it here, not on a demo reel.
          </p>

          <p className="terminal mt-8 text-label text-fg-subtle">
            Not indexed, not linked, not in the sitemap. Delete the route once
            these are picked.
          </p>
        </div>
      </section>

      {/* ─── 01 · SVG WARP TEXT ─── */}
      <Section>
        <SectionHeading
          eyebrow="01 · scroll-driven SVG filter"
          lede="feTurbulence makes a noise field, feDisplacementMap pushes the glyphs by it, and GSAP scrubs the displacement to zero as the heading crosses the viewport. The text resolves itself as you read it."
        >
          Text that settles as you scroll
        </SectionHeading>

        <div className="relative py-10">
          <SvgWarpText>Stop rebuilding the same banner fifty times.</SvgWarpText>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <Card>
            <h3 className="text-h3 font-bold text-fg">What it costs</h3>
            <p className="mt-2 text-small text-fg-muted">
              Twelve lines of SVG markup and one timeline. No library beyond
              what the page already loads. The filter is attached by script, so
              the resting state is an ordinary heading and a JS failure leaves
              the text crisp rather than permanently smeared.
            </p>
          </Card>
          <Card>
            <h3 className="text-h3 font-bold text-fg">Where it breaks</h3>
            <p className="mt-2 text-small text-fg-muted">
              Filtering live text is the expensive variant: one heading per
              viewport is fine, a page of filtered body copy is not. It also
              ends at exactly zero, because a filter left running costs a
              repaint every scroll frame and leaves the glyph edges soft.
            </p>
          </Card>
        </div>
      </Section>

      {/* ─── 02 · GRID CROSSHAIR ─── */}
      <Section tone="raised">
        <SectionHeading
          eyebrow="02 · pointer, snapped to the lattice"
          lede="Two hairlines track the pointer and snap to the same 40px grid the background already paints, with a coordinate readout. Move the pointer across the panel."
        >
          The grid becomes a coordinate space
        </SectionHeading>

        <GridCrosshair className="rounded-card border border-line bg-ink-900">
          <div className="grid-bg relative min-h-[22rem] p-8 sm:p-12">
            <div className="relative z-10 max-w-md">
              <p className="text-label uppercase tracking-label text-eyebrow">
                300 × 250
              </p>
              <p className="mt-3 text-h2 font-bold text-fg">
                An ad unit is a fixed pixel box.
              </p>
              <p className="mt-4 text-small text-fg-muted">
                This is the one place the terminal motif earns its keep. The
                grid stops being wallpaper and starts being the thing you
                measure against, which is how this work is actually done.
              </p>
            </div>
          </div>
        </GridCrosshair>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <Card>
            <h3 className="text-h3 font-bold text-fg">Why it snaps</h3>
            <p className="mt-2 text-small text-fg-muted">
              Unsnapped it is just a cursor follower, and there are a thousand
              of those. Snapping to the 40px lattice is what makes it read as
              engineered rather than decorative, and it costs one call to
              gsap.utils.snap.
            </p>
          </Card>
          <Card>
            <h3 className="text-h3 font-bold text-fg">Two departures from the demo</h3>
            <p className="mt-2 text-small text-fg-muted">
              The native cursor stays visible as a real crosshair instead of
              being hidden, because a vanished pointer is hostile if the script
              stalls. And it is scoped to this panel: a site-wide custom cursor
              fights every button and text selection on the page.
            </p>
          </Card>
        </div>
      </Section>

      {/* ─── 03 · DISTORT LINKS ─── */}
      <Section>
        <SectionHeading
          eyebrow="03 · distortion on hover and focus"
          lede="The same filter pair, pulsed once on pointer enter instead of scrubbed. Hover the list, then tab through it with the keyboard."
        >
          Links that ripple once and settle
        </SectionHeading>

        <div className="max-w-2xl">
          <DistortLinks />
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <Card>
            <h3 className="text-h3 font-bold text-fg">The accessibility fix</h3>
            <p className="mt-2 text-small text-fg-muted">
              The filter is on an inner span, not the anchor. Put it on the
              anchor and the focus ring gets displaced along with the text,
              which turns the one affordance a keyboard user depends on into a
              smear. Focus pulses it too, so tabbing is not a dead nav.
            </p>
          </Card>
          <Card highlighted>
            <h3 className="text-h3 font-bold text-fg">The honest objection</h3>
            <p className="mt-2 text-small text-fg-muted">
              Distortion costs legibility for the 400ms it runs. On a nav the
              reader already knows, fair trade. On a label someone is reading
              for the first time, it is not. This is the candidate I would cut
              first, and it is here so you can disagree with real labels in
              front of you.
            </p>
          </Card>
        </div>
      </Section>

      {/* ─── 04 · PIXEL REVEAL ─── */}
      <Section tone="raised">
        <SectionHeading
          eyebrow="04 · pixelated load, measured"
          lede="Canvas 2D, no WebGL. The image resolves in hard pixel steps as you scroll, and every step reports the bytes it actually encodes to."
        >
          The weight curve, as an interaction
        </SectionHeading>

        <PixelReveal />

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <Card highlighted>
            <h3 className="text-h3 font-bold text-fg">Why this is the one to build</h3>
            <p className="mt-2 text-small text-fg-muted">
              The reveal is a borrowed effect. The readout is not. Those byte
              counts are measured in the browser with canvas.toBlob, so the
              panel demonstrates the Huawei argument instead of asserting it.
              No Codrops demo can do that, because no Codrops demo has your
              case studies behind it.
            </p>
          </Card>
          <Card>
            <h3 className="text-h3 font-bold text-fg">What it costs</h3>
            <p className="mt-2 text-small text-fg-muted">
              One canvas and about forty lines of drawing code. The image is
              decoded once and the six measurements run once, off the scroll
              path, because encoding inside the scrub would allocate a blob per
              frame. Resting state is full resolution, so reduced motion and a
              script failure both land on a finished picture.
            </p>
          </Card>
        </div>
      </Section>

      {/* ─── 05 · TWILIGHT PHONE ─── */}
      <Section>
        <SectionHeading
          eyebrow="05 · not from Codrops"
          lede="The Mate 20 Pro unit that shipped at Monks in 2018, ported from GSAP 2 to GSAP 3. Move the pointer across it: the phone's hues shift one way, the backdrop's the other, and the highlight follows your cursor."
        >
          A phone you can turn over
        </SectionHeading>

        <TwilightPhone />

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <Card highlighted>
            <h3 className="text-h3 font-bold text-fg">Why this outranks the other four</h3>
            <p className="mt-2 text-small text-fg-muted">
              The others are techniques borrowed from a demo reel. This is the
              case study itself. The homepage claims a phone you can turn over
              in under 150KB, and a visitor can now turn it over. No competitor
              can copy this panel, because the thing behind it is the work.
            </p>
          </Card>
          <Card>
            <h3 className="text-h3 font-bold text-fg">How the finish is made</h3>
            <p className="mt-2 text-small text-fg-muted">
              One filled path, not a photograph. The Twilight finish is an
              eight-stop gradient whose stops animate individually, so the
              colour travels up the body instead of cross-fading.
              feSpecularLighting adds the sheen from a point light that tracks
              the pointer, which is the one thing the original could not do
              inside a 300x600 iframe.
            </p>
          </Card>
          <Card>
            <h3 className="text-h3 font-bold text-fg">What tilt is actually doing</h3>
            <p className="mt-2 text-small text-fg-muted">
              Phone and backdrop shift in opposite directions. That opposition
              is what makes the glass read as glass: real Twilight changes
              against its surroundings as you turn it, and two gradients moving
              the same way would just look like a global colour wash.
            </p>
          </Card>
          <Card>
            <h3 className="text-h3 font-bold text-fg">Ported, not copied</h3>
            <p className="mt-2 text-small text-fg-muted">
              TweenMax and cycle are gone, easings are v3, and the geometry was
              extracted from the original file rather than retyped. The Huawei
              wordmark, the client CTA and the Dutch copy are all left out: the
              technique transfers, the client&apos;s ad does not. The work was
              delivered as part of the team at Monks.
            </p>
          </Card>
        </div>
      </Section>

      {/* ─── WHAT WAS CUT ─── */}
      <Section width="prose">
        <SectionHeading eyebrow="Rejected" lede="Recorded so the same ground is not covered twice.">
          What did not make the shortlist
        </SectionHeading>

        <div className="space-y-5 text-body text-fg-muted">
          <p>
            Every WebGL candidate, for now: lens refraction, flowmap
            deformation, GPGPU grid displacement, gooey hover,
            grid-to-fullscreen. Each needs 170KB of Three.js or a smaller
            runtime like OGL at roughly 20 to 30KB, plus a GPU and a fallback
            path. Worth exactly one surface on this site, and only measured.
          </p>
          <p>
            Shader-artist material outright: twisted spheres, water and wave
            distortion, audio-reactive effects, HTML-in-canvas. The buyer is a
            head of production who needs to believe a deadline will be hit, not
            a judge of GLSL.
          </p>
          <p>
            Infinite loop scrolling for the case list. There are five cases.
            Infinite scroll on a finite list is a lie the interaction tells,
            and this site sells not doing that.
          </p>
        </div>
      </Section>
    </main>
  );
}
