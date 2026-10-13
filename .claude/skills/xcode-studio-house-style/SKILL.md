---
name: xcode-studio-house-style
description: The design system and copy voice for the x-code.studio website. Use this whenever you touch anything in this repo — writing or editing a page, a component, marketing copy, a heading, a button label, an error message, or CSS. Also use it when adding a new page or section, when reviewing a diff, and when asked to "make this match the site." Do not write JSX or copy for this repo without reading it first; the defaults here are deliberate and were arrived at by fixing specific measured problems.
---

# x-code.studio house style

Two things are easy to break in this repo and expensive to fix later: the
colour tokens (because raw hex spreads fast) and the copy voice (because
the terminal aesthetic is seductive and it used to be applied to
everything). This skill is the guard rail for both.

## The positioning, in one sentence

**Manual ad production becomes an automated pipeline, and the team can run
it without me.**

Every offer is a tier of that sentence. If a new section cannot be traced
back to it, it does not belong on the homepage.

The differentiator is that Xavi is a practitioner who also teaches. Lead
with the shipped work at Monks (BMW, Google, Huawei), not with the tooling
and definitely not with the aesthetic.

## Copy rules

### Voice

Short, direct, warm. Second person. Specific over impressive.

| Write this | Not this |
|---|---|
| Stop rebuilding the same banner fifty times. | Strategic AdTech Consultancy |
| One reply within two working days. | Response time: 24-48 hours |
| See what is included | LEARN_MORE → |
| Automated variant generation lifted click-through by 45%. | 300% ad relevance increase |

### Hard rules

- **No em dashes.** They read as machine-written. Use a comma, a full
  stop, or a colon. This one is not negotiable.
- **Sentence case headings.** All-caps destroys word-shape recognition,
  which is the mechanism fluent readers actually use, and `UNDERSCORE_CASE`
  removes the word spacing that would otherwise substitute for it.
- **One CTA type per section.** If a section has a primary button, nothing
  else in it gets a primary button.
- **No price without a destination.** If it cannot be bought today, the
  card says so and collects an email instead. See `TOOLBOX_STATUS` in
  `app/page.tsx`. Promising an instant download that resolves to a contact
  form breaks the promise 100% of the time.
- **Two or three numbers on a page, maximum.** Nine consecutive
  superlatives train the reader to discount all of them. Every number
  kept must survive the question "and how would you know that."
- **Attribute the client work to Monks.** The BMW, GTECH, FBTO and Huawei
  work was delivered as part of the team at Monks. Saying so costs nothing,
  because Monks is the credential. Implying otherwise is the kind of gap a
  buyer notices and then stops trusting the rest of the page.
- **Do not reference NEOLAND.** Xavi no longer teaches there. Teaching can
  still be described generically ("teach your team to run it") but no
  institution is named and nothing is described as "certified."

### Terminal motif

The terminal look is an **accent**, not a chassis. It belongs in exactly
three places:

1. The hero eyebrow
2. The boot sequence
3. Code fragments and the wordmark

Everywhere else uses the sans stack in sentence case. The buyer is a
producer or head of production at an agency, not a developer. The costume
signals "this is for engineers" to precisely the person who needs to feel
it is for them.

When a heading does carry the `>_` prompt, the glyph must be
`aria-hidden`. Use `<SectionHeading>`, which handles this.

## Design system

Tokens live in `app/globals.css` under `@theme`. Tailwind v4 generates a
utility for each one.

### Colour

| Token | Utility | Use for |
|---|---|---|
| `--color-ink-800` | `bg-ink-800` | Page background |
| `--color-ink-700` | `bg-ink-700` | Alternating raised band |
| `--color-ink-600` | `bg-ink-600` | Card surface |
| `--color-line` | `border-line` | Decorative dividers only |
| `--color-line-strong` | `border-line-strong` | Inputs, focusable cards |
| `--color-fg` | `text-fg` | Headings, emphasis |
| `--color-fg-muted` | `text-fg-muted` | Body copy |
| `--color-fg-subtle` | `text-fg-subtle` | Labels, captions |
| `--color-neon` | `text-neon` `bg-neon` | Primary action, accent |
| `--color-signal` | `text-signal` | Eyebrows, secondary accent |

**Never write a raw hex in a `.tsx` file.** `text-[#00FF41]` is a
regression. The one permitted exception is inside the matrix rain canvas,
which paints via the 2D context and cannot read a CSS variable.

Every text token above passes WCAG AA (4.5:1) on ink-600, ink-700 and
ink-800. These were measured, not guessed. If you add a colour, measure it
before shipping. Tailwind's `gray-500` and `gray-600` were the previous
defaults for body copy and labels and they measured 3.88:1 and 2.48:1,
which is why they are gone.

`--color-signal` replaced `#007ACC`, which measured 4.15:1 and failed AA
for body text.

### Type

Use the semantic scale, not arbitrary sizes: `text-display`, `text-h1`,
`text-h2`, `text-h3`, `text-body`, `text-small`, `text-label`. Body copy
sits in a `prose`-width container (`max-w-3xl`) so the measure stays
readable.

### Components

Import from `components/ui/`. Do not hand-roll a button.

- `<Button variant="primary|secondary|ghost" size="sm|md|lg">` — renders
  `<a>` when `href` is set, `<button>` otherwise, never both. Has a
  `loading` state that swaps the label and blocks input.
- `<Section id tone="base|raised" width="prose|wide">` — vertical rhythm
  and surface banding.
- `<SectionHeading eyebrow lede>` — the one heading pattern.
- `<Card interactive highlighted>` — bordered surface.

If a new pattern is needed more than twice, promote it into
`components/ui/` rather than copying the markup.

### Motion

GSAP owns entrance animation. Wrap every tween in `gsap.matchMedia()` with
a `(prefers-reduced-motion: no-preference)` branch so the reduced-motion
path never creates the tween at all. `globals.css` handles the CSS-only
effects and hides the matrix rain, CRT overlay and noise layer outright.

The boot sequence runs once per session (`sessionStorage`), is skippable,
and does not run at all under reduced motion. It is personality, not a
toll gate. Four lines is the ceiling; twelve lines of ASCII before the
value proposition is how the previous version lost the eight-second
visitor.

## Accessibility floor

Non-negotiable on every change:

- Real `<label for>` on every field. Shell prompts (`> organization:`) are
  not labels.
- Visible `:focus-visible` ring. Never `outline: none` without a
  replacement.
- Decorative glyphs, icons and canvases get `aria-hidden="true"`.
- Live regions (`aria-live="polite"`) on values that change without a
  page load, such as the calculator result.
- Touch targets 44px or larger. The case-study copy claims WCAG AA
  compliance as a delivered outcome, so the site itself gets held to it.

## Before you call a change done

1. `npx tsc --noEmit` is clean.
2. `grep -n '#[0-9A-Fa-f]\{3,6\}' <changed .tsx files>` returns nothing.
3. No em dashes in any user-facing string.
4. Every heading you added is sentence case.
5. Every price you added has a real destination.
