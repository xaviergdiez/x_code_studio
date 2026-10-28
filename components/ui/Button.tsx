import Link from 'next/link';
import type { ReactNode } from 'react';

/**
 * Button — the single interactive primitive for the site.
 *
 * Variants
 *   primary   Neon fill. One per section, maximum. The thing you
 *             most want the visitor to do.
 *   secondary Outlined. Supporting action next to a primary.
 *   ghost     Text only with an underline on hover. Tertiary.
 *
 * Sizes
 *   sm  inline / card footers
 *   md  default
 *   lg  hero
 *
 * States: default, hover, focus-visible, disabled, loading.
 * `disabled` is styled and non-interactive; `loading` swaps the
 * label and blocks input.
 *
 * Renders <a> when `href` is set, <button> otherwise. Never both.
 */

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

const base =
  'inline-flex items-center justify-center gap-2 font-semibold text-center ' +
  'transition-colors duration-150 disabled:opacity-50 disabled:pointer-events-none';

const variants: Record<Variant, string> = {
  primary:
    'btn-primary magnetic-btn bg-neon text-on-neon hover:bg-neon-dim neon-box-glow',
  secondary:
    'magnetic-btn bg-ink-600 text-fg border border-line-strong hover:border-neon',
  ghost:
    'text-neon hover:underline underline-offset-4',
};

const sizes: Record<Size, string> = {
  sm: 'px-4 py-2 text-small',
  md: 'px-6 py-3 text-small',
  lg: 'px-8 py-4 text-body',
};

type Common = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
};

type Props = Common &
  (
    | { href: string; onClick?: never; type?: never; disabled?: never; loading?: never }
    | {
        href?: never;
        onClick?: () => void;
        type?: 'button' | 'submit';
        disabled?: boolean;
        loading?: boolean;
      }
  );

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...rest
}: Props) {
  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if ('href' in rest && rest.href) {
    const external = rest.href.startsWith('http') || rest.href.startsWith('mailto:');
    if (external) {
      return (
        <a href={rest.href} className={cls} rel="noopener noreferrer">
          {children}
        </a>
      );
    }
    return (
      <Link href={rest.href} className={cls}>
        {children}
      </Link>
    );
  }

  const { onClick, type = 'button', disabled, loading } = rest as {
    onClick?: () => void;
    type?: 'button' | 'submit';
    disabled?: boolean;
    loading?: boolean;
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={cls}
    >
      {loading ? 'Sending…' : children}
    </button>
  );
}
