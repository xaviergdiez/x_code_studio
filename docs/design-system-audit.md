# Design system audit

Run against `main` before the rewrite. Numbers are measured, not estimated.
Contrast is sRGB relative luminance per WCAG 2.1, computed against the three
surfaces actually used on the site.

## Summary

| | Before | After |
|---|---|---|
| Design tokens defined | 8 CSS vars, barely referenced | 27, generating Tailwind utilities |
| Raw hex in `.tsx` | 570 instances across 13 files | 1 (canvas `fillStyle`, documented exception) |
| Body copy contrast | 3.88:1 (fails AA) | 9.84:1 |
| Label contrast | 2.48:1 (fails AA and AA-large) | 5.83:1 |
| Reusable UI primitives | 0 | 4 |
| Homepage copy | ~1,400 words | 394 words |
| `prefers-reduced-motion` support | none | CSS block plus `gsap.matchMedia()` |
| Visible focus indicator | none, `outline: none` on inputs | `:focus-visible` ring globally |

## Token coverage

| Category | Was | Now |
|---|---|---|
| Colour | 8 vars in `:root`, used in CSS only; TSX used arbitrary values | Semantic scale under `@theme`, utilities generated |
| Typography | Tailwind defaults plus arbitrary `text-[10px]` | 7-step semantic scale |
| Spacing | Ad hoc `py-24` everywhere | `--spacing-section` |
| Motion | Durations inline per animation | 3 durations, 1 easing |

Colour was the worst of these. `#00FF41` appeared 233 times as a literal,
`#333` 136 times. Any palette change meant a find-and-replace across 13 files
with no way to verify completeness.

## Contrast failures found

Measured against `#121212` (page), `#1a1a1a` (panel), `#1e1e1e` (card).
All three behave nearly identically, so the page background is shown.

| Colour | Where it was used | Ratio | Result |
|---|---|---|---|
| `text-gray-500` | All homepage body copy | 3.88:1 | Fails AA body |
| `text-gray-600` | Calculator labels, units, sub-labels | 2.48:1 | Fails AA and AA-large |
| `text-gray-700` | Input placeholders | 1.82:1 | Effectively invisible |
| `#007ACC` | Section eyebrows, every form label | 4.15:1 | Fails AA body |

The `#007ACC` finding matters most, because it was carrying form labels.
It was replaced with `--color-signal` `#4aa8e0` at 7.11:1.

The replacement text scale, verified on all three surfaces:

| Token | Value | Ratio on `ink-800` |
|---|---|---|
| `--color-fg` | `#f2f2f2` | 16.73:1 |
| `--color-fg-muted` | `#b8bcc4` | 9.84:1 |
| `--color-fg-subtle` | `#8a9099` | 5.83:1 |
| `--color-fg-placeholder` | `#6e747d` | 3.98:1 (placeholders only) |
| `--color-signal` | `#4aa8e0` | 7.11:1 |
| `--color-neon` | `#00ff41` | 13.72:1 |

`--color-line` `#333` is retained but demoted to decorative dividers only.
At 1.48:1 it cannot serve as an interactive boundary, so form fields and
focusable cards use `--color-line-strong` `#6e747d` at 3.98:1, which meets
the 3:1 floor in WCAG 1.4.11 for non-text UI components.

## Component completeness

| Component | States | Variants | Docs | Score |
|---|---|---|---|---|
| `Button` | default, hover, focus, disabled, loading | primary, secondary, ghost × 3 sizes | ✅ | 9/10 |
| `Section` | n/a | base, raised × prose, wide | ✅ | 8/10 |
| `SectionHeading` | n/a | with and without eyebrow, lede | ✅ | 8/10 |
| `Card` | default, hover | plain, interactive, highlighted | ✅ | 8/10 |

Before this pass there were no shared primitives at all. Every button on the
homepage was a bespoke `className` string, which is why nine of them had
slightly different padding and four had no focus state.

## Naming decisions

| Issue | Standard adopted |
|---|---|
| `--background` and `--charcoal` and `#121212` all meant the same surface | One `ink-` scale, 900 darkest to 600 lightest |
| `--foreground` used for both headings and body | Split into `fg`, `fg-muted`, `fg-subtle` by contrast role |
| `--border` used for dividers and input edges | Split into `line` (decorative) and `line-strong` (interactive) |

## Not done in this pass

Deliberately out of scope, listed so it is not forgotten:

1. **Sub-page migration.** `/cases/*` and `/offerings/*` still hold roughly
   480 raw hex values and still use `text-gray-500` for body copy. They
   render correctly but carry the old contrast failures. They need the same
   treatment, page by page.
2. **Checkout.** No token or copy change fixes the fact that nothing can be
   bought. The homepage now tells the truth about this instead of hiding it,
   which is a stopgap, not a solution.
3. **Body font shift.** `body` moved from monospace to the sans stack. Any
   sub-page that relied on the inherited monospace will look different. This
   is the intended direction but it should be reviewed page by page.
4. **Contrast verification in browser.** The ratios above are computed from
   the token values. Anything rendered over the grid, noise or CRT overlay
   should be spot-checked with a real contrast tool, since those layers sit
   above the background.
