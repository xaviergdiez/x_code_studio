/**
 * HeroFeed — the volume layer of the hero.
 *
 * Tilted columns of ad formats drifting past, drawn as schematics:
 * ink fills, hairline neon strokes, registration marks, a crossed
 * placeholder where the image goes, and the size called out in mono.
 * One in six is lit (neon wash, solid CTA) so the field has a pulse
 * without introducing any colour outside the site palette.
 *
 * Server component, pure markup. Motion lives in the pinned scene in
 * app/page.tsx (columns drift via .hs-track, tilt and scrim are
 * scrubbed). Each track holds its cards COPIES times so a one-copy
 * loop is seamless. Decorative: aria-hidden.
 */

type Format = { w: number; h: number };

const FORMATS: Format[] = [
  { w: 300, h: 250 }, { w: 300, h: 600 }, { w: 336, h: 280 }, { w: 320, h: 480 },
  { w: 250, h: 250 }, { w: 320, h: 100 }, { w: 300, h: 600 }, { w: 320, h: 50 },
];
const MARKETS = ['NL', 'DE', 'FR', 'ES', 'IT', 'PL', 'SE', 'AT', 'BE', 'DK', 'PT', 'CZ'];
const COLUMNS = 8;
const PER_COLUMN = 6;
/** Copies per track. The loop shifts by exactly one copy, and four keep a tall mobile hero covered. */
const COPIES = 4;

/** Registration mark in each corner. */
const Marks = () => (
  <>
    {['left-1.5 top-1.5 border-l border-t', 'right-1.5 top-1.5 border-r border-t', 'left-1.5 bottom-1.5 border-l border-b', 'right-1.5 bottom-1.5 border-r border-b'].map((c) => (
      <span key={c} className={`absolute h-2 w-2 border-neon/60 ${c}`} />
    ))}
  </>
);

function Card({ f, lit, market }: { f: Format; lit: boolean; market: string }) {
  const wide = f.w / f.h > 2.5;
  return (
    <div
      className={`relative overflow-hidden rounded-md border ${lit ? 'border-neon/70 bg-neon/10' : 'border-neon/25 bg-ink-900/80'}`}
      style={{ aspectRatio: `${f.w} / ${f.h}` }}
    >
      <Marks />
      <div className={`absolute inset-0 flex gap-2 p-4 ${wide ? 'flex-row items-center' : 'flex-col'}`}>
        <span className="terminal text-[10px] leading-4 text-neon">{market}</span>
        {!wide && (
          <span className="relative min-h-0 flex-1 border border-neon/25">
            <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 100" fill="none">
              <path d="M0 0L100 100M100 0L0 100" className="stroke-neon/25" strokeWidth="1" vectorEffect="non-scaling-stroke" />
            </svg>
          </span>
        )}
        <span className={`flex flex-col gap-1.5 ${wide ? 'flex-1' : ''}`}>
          <span className="block h-px w-4/5 bg-fg/70" />
          <span className="block h-px w-1/2 bg-fg/40" />
        </span>
        <span className="flex items-center justify-between gap-2">
          <span className={`block h-4 w-16 rounded-full border ${lit ? 'border-neon bg-neon' : 'border-neon/60'}`} />
          {!wide && <span className="terminal text-[9px] text-fg-subtle">{f.w}×{f.h}</span>}
        </span>
      </div>
    </div>
  );
}

export function HeroFeed() {
  return (
    <div className="hs-feed absolute inset-0 z-[2] overflow-hidden" aria-hidden="true">
      <div className="enter enter-5 absolute inset-0">
        <div className="hs-tilt absolute -inset-x-[22%] -inset-y-[25%] flex gap-3">
          {Array.from({ length: COLUMNS }, (_, c) => {
            const cards = Array.from({ length: PER_COLUMN }, (_, i) => {
              const n = c * 5 + i * 3;
              return { f: FORMATS[n % FORMATS.length], lit: (c * 3 + i * 5) % 6 === 0, market: MARKETS[(n + c) % MARKETS.length] };
            });
            return (
              <div key={c} className={`hs-col flex-1 ${c % 2 ? 'hs-col-up' : 'hs-col-down'} ${c >= 4 ? 'max-lg:hidden' : ''}`} style={{ paddingTop: c % 2 ? 0 : 60 }}>
                <div className="hs-track flex flex-col gap-3">
                  {Array.from({ length: COPIES }, (_, copy) => copy).flatMap((copy) => cards.map((card, i) => <Card key={`${copy}-${i}`} {...card} />))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Copy sits on this: solid under the headline (left on desktop, top on mobile), dimmed behind the device. Styled in globals.css; scrubbed away by the desktop scene. */}
      <div className="hs-scrim absolute inset-0" />

      <div className="hw-caption absolute inset-0 flex items-center justify-center opacity-0 max-lg:items-end max-lg:pb-[34svh]">
        <div className="rounded-3xl border border-line-strong bg-ink-900/85 px-8 py-7 text-center backdrop-blur-md lg:px-12 lg:py-10">
          <p className="text-h1 font-bold tracking-hero text-fg lg:text-display">
            <span className="hw-count text-neon neon-glow-strong">0</span> units
          </p>
          <p className="terminal mt-3 text-label uppercase tracking-label text-fg-muted">
            12 sizes × 12 markets, one build
          </p>
        </div>
      </div>
    </div>
  );
}
