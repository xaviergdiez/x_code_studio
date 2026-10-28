import type { ReactNode } from 'react';

/**
 * Section — vertical rhythm and surface banding.
 *
 * `tone` alternates the background so sections separate without
 * a border on every edge. `width` caps the measure: prose sections
 * use 'prose' (~65ch) so body copy stays readable.
 */
export function Section({
  id,
  children,
  tone = 'base',
  width = 'wide',
  className = '',
}: {
  id?: string;
  children: ReactNode;
  tone?: 'base' | 'raised';
  width?: 'prose' | 'wide';
  className?: string;
}) {
  const bg = tone === 'raised' ? 'bg-ink-700' : 'bg-ink-800';
  const measure = width === 'prose' ? 'max-w-3xl' : 'max-w-6xl';

  return (
    <section id={id} className={`${bg} py-section border-b border-line ${className}`}>
      <div className={`${measure} reveal mx-auto px-5 sm:px-8`}>{children}</div>
    </section>
  );
}

/**
 * SectionHeading — one heading pattern for the whole site.
 *
 * The `>_` prompt is decorative and hidden from assistive tech,
 * so a screen reader announces "The toolbox", not
 * "greater-than underscore T H E underscore T O O L B O X".
 * Headings are sentence case: all-caps destroys the word shapes
 * fluent readers rely on, and underscores remove the spacing
 * that would otherwise stand in for them.
 */
export function SectionHeading({
  children,
  eyebrow,
  lede,
  as: Tag = 'h2',
}: {
  children: ReactNode;
  eyebrow?: string;
  lede?: string;
  as?: 'h2' | 'h3';
}) {
  return (
    <header className="mb-12">
      {/* text-eyebrow defaults to signal, so pages without an accent
          keep their blue labels, and an accented case page points it
          at that accent. The eyebrow used to be fixed blue, which on
          the yellow SEF page fought every section it headed. */}
      {eyebrow && (
        <p className="text-label uppercase tracking-label text-eyebrow mb-3">
          {eyebrow}
        </p>
      )}
      <Tag data-split className="terminal-heading text-h2 font-bold text-fg">
        <span className="prompt" aria-hidden="true">
          {'>'}_{' '}
        </span>
        {children}
      </Tag>
      {lede && <p className="mt-4 max-w-2xl text-body text-fg-muted">{lede}</p>}
      <div className="mt-6 h-px w-16 bg-accent/60" />
    </header>
  );
}

/**
 * Card — bordered surface. `interactive` adds the hover affordance
 * and the stronger boundary required for focusable containers.
 */
export function Card({
  children,
  interactive = false,
  highlighted = false,
  className = '',
}: {
  children: ReactNode;
  interactive?: boolean;
  highlighted?: boolean;
  className?: string;
}) {
  const border = highlighted
    ? 'border-neon/50 neon-box-glow'
    : interactive
      ? 'border-line-strong hover:border-neon/60'
      : 'border-line';

  return (
    <div
      className={`relative flex h-full flex-col rounded-card border bg-ink-600 p-6 transition-colors duration-300 ${border} ${className}`}
    >
      {children}
    </div>
  );
}
