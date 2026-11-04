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
import { TwilightPhone } from '@/components/case/TwilightPhone';
import { NoodleDraw } from '@/components/case/NoodleDraw';
import { HuaweiTakeover } from '@/components/case/HuaweiTakeover';

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

      {/* ─── 05 · HUAWEI, ONE CASE IN TWO PIECES ─── */}
      <Section>
        <SectionHeading
          eyebrow="05 · not from Codrops"
          lede="Two campaigns, one client, two different hard problems. The 2018 Mate 20 Pro banner had to make glass out of almost no bytes. The 2019 P30 Pro takeover had to keep four separately served documents telling the same story. Both are below, because neither one alone is the case."
        >
          Huawei, in two pieces
        </SectionHeading>

        <h3 className="text-h3 font-bold text-fg">
          2018 · a phone you can turn over
        </h3>
        <p className="mb-6 mt-2 max-w-2xl text-small text-fg-muted">
          Ported from GSAP 2 to GSAP 3. Move the pointer across it: the
          phone&apos;s hues shift one way, the backdrop&apos;s the other, and the
          highlight follows your cursor.
        </p>

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
              delivered as part of the team at ThisPageAmsterdam.
            </p>
          </Card>
        </div>

        {/* ─── the 2019 half ─── */}
        <div className="mt-20">
          <h3 className="text-h3 font-bold text-fg">
            2019 · a colour you pick once
          </h3>
          <p className="mb-6 mt-2 max-w-2xl text-small text-fg-muted">
            The P30 Pro homepage takeover. Pick a finish in the 300x250 and the
            masthead and both skins follow.
          </p>

          <HuaweiTakeover />

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <Card highlighted>
              <h3 className="text-h3 font-bold text-fg">These are real iframes</h3>
              <p className="mt-2 text-small text-fg-muted">
                The easy version of this panel is one React tree with four divs
                and a useState. It would look the same and prove nothing,
                because the recolouring was never the hard part. Each slot here
                is a separate document with its own script and no access to the
                others, and postMessage stands in for Weborama&apos;s screenad
                API. Same topology as the original, same failure modes.
              </p>
            </Card>
            <Card>
              <h3 className="text-h3 font-bold text-fg">No slot recolours itself</h3>
              <p className="mt-2 text-small text-fg-muted">
                Click a swatch and the rectangle does not change on its own. It
                reports the pick to the page, the page fans it back to all four,
                and each slot applies it. That round trip is what keeps four
                documents in step instead of three plus one that drifted.
              </p>
            </Card>
            <Card>
              <h3 className="text-h3 font-bold text-fg">Late frames get caught up</h3>
              <p className="mt-2 text-small text-fg-muted">
                Every slot announces itself when it loads and is sent the
                current finish in reply. Without that handshake a skin that
                finished loading a second after the others would come up on the
                default colour, which is the classic takeover bug: three
                surfaces agreeing and one insisting on blue.
              </p>
            </Card>
            <Card>
              <h3 className="text-h3 font-bold text-fg">Why this belongs on the case</h3>
              <p className="mt-2 text-small text-fg-muted">
                The Huawei case page currently runs an automatic colour loop. It
                shows the finishes and hides the work: the real unit was a
                choice that propagated across four independently served
                documents. A loop is decoration, a picker is evidence.
              </p>
            </Card>
          </div>
        </div>
      </Section>

      {/* ─── 06 · NOODLE ─── */}
      <Section tone="raised">
        <SectionHeading
          eyebrow="06 · also not from Codrops"
          lede="One path from the 2018 FBTO page, stroked at 95 units with round caps so it reads as a ribbon rather than a line. Scroll to push it into frame."
        >
          Three hundred bytes of shape
        </SectionHeading>

        <NoodleDraw />

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <Card highlighted>
            <h3 className="text-h3 font-bold text-fg">Why it is worth reviving</h3>
            <p className="mt-2 text-small text-fg-muted">
              The FBTO case is the one case page with no shape of its own. It
              runs on a time chart and three counters, which is the same
              furniture every other page has. This gives it a silhouette, and
              it costs 303 bytes of path data plus a plugin already loaded for
              the hero.
            </p>
          </Card>
          <Card>
            <h3 className="text-h3 font-bold text-fg">The gradient was already yours</h3>
            <p className="mt-2 text-small text-fg-muted">
              The original stroke ran green into blue. That is close enough to
              neon into signal that nothing needed inventing, so the stops
              point at the tokens instead of at FBTO&apos;s brand colours. A page
              that wants its own accent on the ribbon overrides one variable.
            </p>
          </Card>
          <Card>
            <h3 className="text-h3 font-bold text-fg">Scrubbed, not looped</h3>
            <p className="mt-2 text-small text-fg-muted">
              The original ran a 2.2 second yoyo forever. A ribbon cycling in
              the corner of a page competes with reading, so this is tied to
              scroll position: the reader pushes it in and can stop it halfway.
            </p>
          </Card>
          <Card>
            <h3 className="text-h3 font-bold text-fg">Where it goes next</h3>
            <p className="mt-2 text-small text-fg-muted">
              Behind the FBTO case hero at low opacity, with the copy on top.
              At full strength beside a section it is a graphic; behind the
              headline it is a page identity, which is the thing that case is
              missing.
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
