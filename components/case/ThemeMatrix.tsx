'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * ThemeMatrix — one layout, every brand, switched live.
 *
 * The SEF library's whole argument is that a single component
 * carries 120 variants, so the case page should let the reader do
 * the switching rather than read a number. Clicking a brand
 * recolours the ad in place, which is exactly what the Theme
 * dropdown does in the Figma file.
 *
 * Deliberately schematic. These are not the delivered creatives:
 * no client copy, no photography, no logo artwork. It is the
 * mechanism, drawn with tokens, which is the part that is Xavi's
 * to show.
 *
 * Colours here are brand colours, so they are content rather than
 * theme values and sit in this file as data. They are only ever
 * used as a fill behind white or near-black text set by `onLight`.
 */

type Brand = {
  id: string;
  name: string;
  accent: string;
  /** true when the accent is light enough to need dark text on it */
  onLight: boolean;
};

const BRANDS: Brand[] = [
  { id: 'sef', name: 'SEF', accent: '#ffdf00', onLight: true },
  { id: 'nelson', name: 'NELSON', accent: '#c8102e', onLight: false },
  { id: 'pop', name: 'POP', accent: '#f26522', onLight: false },
  { id: 'tucker', name: 'TUCKER', accent: '#e4002b', onLight: false },
  { id: 'avdel', name: 'AVDEL', accent: '#0d6cb9', onLight: false },
  { id: 'optia', name: 'OPTIA', accent: '#29a3dc', onLight: false },
  { id: 'integra', name: 'INTEGRA', accent: '#0f8a7e', onLight: false },
  { id: 'at', name: 'STANLEY AT', accent: '#ffd400', onLight: true },
];

const SURFACES = ['Default', 'Brand', 'White', 'Black'] as const;
type Surface = (typeof SURFACES)[number];

export function ThemeMatrix() {
  const [brand, setBrand] = useState(0);
  const [surface, setSurface] = useState<Surface>('Default');
  const liveRef = useRef<HTMLParagraphElement>(null);
  const [auto, setAuto] = useState(true);

  // Cycles on its own until the reader takes over, so the page shows
  // what it does without requiring a click. Stops permanently on
  // first interaction, and never starts under reduced motion.
  useEffect(() => {
    if (!auto) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setInterval(() => setBrand((b) => (b + 1) % BRANDS.length), 2200);
    return () => window.clearInterval(id);
  }, [auto]);

  const take = (fn: () => void) => {
    setAuto(false);
    fn();
  };

  const b = BRANDS[brand];

  // Surface decides the card ground; the brand decides the accent.
  const ground =
    surface === 'Brand' ? b.accent : surface === 'White' ? '#f2f2f2' : surface === 'Black' ? '#0a0a0a' : 'var(--color-ink-600)';
  const onBrandLight = surface === 'Brand' ? b.onLight : surface === 'White';
  const ink = onBrandLight ? '#121212' : '#f2f2f2';
  const ctaBg = surface === 'Brand' ? (b.onLight ? '#121212' : '#ffffff') : b.accent;
  const ctaInk = surface === 'Brand' ? (b.onLight ? '#f2f2f2' : '#121212') : b.onLight ? '#121212' : '#ffffff';

  return (
    <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-start">
      {/* ── The ad ── */}
      <div>
        <div
          className="relative aspect-[300/250] w-full max-w-sm overflow-hidden rounded-card border border-line transition-colors duration-500"
          style={{ background: ground }}
        >
          <div className="flex h-full flex-col justify-between p-5">
            <span
              className="inline-flex w-fit items-center px-2 py-1 text-label font-bold tracking-label transition-colors duration-500"
              style={{
                background: surface === 'Brand' && b.onLight ? '#121212' : b.accent,
                color: surface === 'Brand' && b.onLight ? b.accent : b.onLight ? '#121212' : '#ffffff',
              }}
            >
              {b.name}
            </span>

            <div>
              {/* Placeholder copy, deliberately. The real campaign
                  headlines are SEF's, and the template's own rule is
                  that each field has a character limit, so showing the
                  limit demonstrates the system better than borrowing
                  their words would. */}
              <p
                className="text-h3 font-bold leading-tight transition-colors duration-500"
                style={{ color: ink }}
              >
                Headline sits here,
                <br />
                up to 35 characters
              </p>
              <span
                className="mt-4 inline-block px-3 py-1.5 text-label font-bold transition-colors duration-500"
                style={{ background: ctaBg, color: ctaInk }}
              >
                Call to action
              </span>
            </div>
          </div>
        </div>

        <p className="mt-3 text-label text-fg-subtle">
          300×250, schematic. One component, {BRANDS.length} themes × {SURFACES.length} surfaces.
        </p>
        <p ref={liveRef} aria-live="polite" className="sr-only">
          {b.name}, {surface} surface
        </p>
      </div>

      {/* ── The controls, mirroring the Figma dropdowns ── */}
      <div className="md:w-56">
        <p className="terminal mb-3 text-label uppercase tracking-label text-fg-subtle">Theme</p>
        <ul className="mb-7 flex flex-wrap gap-1.5">
          {BRANDS.map((x, i) => (
            <li key={x.id}>
              <button
                onClick={() => take(() => setBrand(i))}
                aria-pressed={i === brand}
                className={`rounded-sm border px-2.5 py-1.5 text-label transition-colors ${
                  i === brand
                    ? 'border-accent text-fg'
                    : 'border-line text-fg-subtle hover:border-line-strong hover:text-fg-muted'
                }`}
              >
                <span
                  aria-hidden="true"
                  className="mr-1.5 inline-block h-2 w-2 rounded-full align-middle"
                  style={{ background: x.accent }}
                />
                {x.name}
              </button>
            </li>
          ))}
        </ul>

        <p className="terminal mb-3 text-label uppercase tracking-label text-fg-subtle">Surface</p>
        <ul className="flex flex-wrap gap-1.5">
          {SURFACES.map((s) => (
            <li key={s}>
              <button
                onClick={() => take(() => setSurface(s))}
                aria-pressed={s === surface}
                className={`rounded-sm border px-2.5 py-1.5 text-label transition-colors ${
                  s === surface
                    ? 'border-accent text-fg'
                    : 'border-line text-fg-subtle hover:border-line-strong hover:text-fg-muted'
                }`}
              >
                {s}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
