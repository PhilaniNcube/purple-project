# Project Purple — Design System

Design tokens and a component foundation for **Project Purple**, a movement
breaking the silence around gynaecological cancer.

Built with **Next.js 16** (App Router), **Tailwind CSS v4** and **shadcn**
(Base UI primitives). Derived from the `General` Figma prototype — the exported
reference frame lives in [`design-reference/`](./design-reference).

---

## Getting started

```bash
pnpm install
pnpm dev           # http://localhost:3000
pnpm build         # production build + type check
pnpm lint
pnpm design:lint   # validate DESIGN.md against the DESIGN.md spec
```

The home route (`/`) is the **living style guide**: every token and component
below is rendered there.

## DESIGN.md

[`DESIGN.md`](./DESIGN.md) is a machine-readable description of this design
system following the [DESIGN.md format](https://github.com/google-labs-code/design.md)
— YAML design tokens in the front matter, design rationale in the prose. It is
the artefact you hand to a coding agent (or a teammate) so they can reproduce
the visual identity without reading the source.

It is **derived from** `globals.css`; keep them in sync when tokens change.

```bash
pnpm design:lint                                   # validate + check contrast
npx -y -p @google/design.md designmd export \
  --format css-tailwind DESIGN.md                  # back out a Tailwind v4 theme
npx -y -p @google/design.md designmd export \
  --format dtcg DESIGN.md                          # W3C Design Tokens JSON
```

The linter reports **0 errors** and a set of `orphaned-tokens` warnings for
palette steps that no component references (e.g. `brand-300`, the blush/sky/sun
accents). Those are intentional: the full ramp is published for charts,
illustration and future surfaces, and it exports cleanly to Tailwind and DTCG.

---

## Where things live

```
DESIGN.md                # DESIGN.md-format spec (tokens + rationale)
design-reference/        # exported Figma frames the system was derived from
src/
├─ app/
│  ├─ globals.css          # ← single source of truth: all design tokens
│  ├─ layout.tsx           # fonts + metadata
│  └─ page.tsx             # the style guide / showcase
├─ components/
│  ├─ ds/                  # design-system primitives (Container, Section, …)
│  │  ├─ container.tsx
│  │  ├─ section.tsx
│  │  ├─ eyebrow.tsx
│  │  ├─ display.tsx
│  │  ├─ script.tsx
│  │  ├─ stat.tsx
│  │  ├─ quote.tsx
│  │  ├─ logo.tsx
│  │  └─ index.ts
│  └─ ui/                  # shadcn components (button, card, input, …)
└─ lib/
   └─ design-tokens.ts     # typed handles onto the CSS variables
```

**Rule of thumb:** raw values live only in `globals.css`. Everything else —
components, `design-tokens.ts`, the docs page — reads from those variables.

---

## Foundations

### Colour

A single violet ramp carries the brand, supported by purple-tinted neutrals and
three optional accents.

| Group     | Tokens                                                  | Used for                                  |
| --------- | ------------------------------------------------------- | ----------------------------------------- |
| `brand`   | `--color-brand-50 … 950` (`#eeebff` → `#2a0f4d`)        | Primary purple, CTAs, links, brand bands  |
| `ink`     | `--color-ink-50 … 950`                                  | Text, borders, the near-black night bands |
| `blush`   | `--color-blush-100/300/500`                             | Optional warm accent                      |
| `sky`     | `--color-sky-100/300/500`                               | Optional cool accent                      |
| `sun`     | `--color-sun-100/300/500`                               | Optional highlight accent                 |

Role-based (semantic) tokens sit on top and **swap with the colour scheme**
(`:root` = light, `.dark` = dark):

`background` · `foreground` · `card` · `popover` · `primary` · `secondary` ·
`muted` · `accent` · `destructive` · `border` · `input` · `ring` · `surface` ·
`lavender` · `night`

> `primary` resolves to `brand-700` (`#6e25d9`); `lavender` to `brand-100`.

### Typography

Three roles, loaded via `next/font` (self-hosted, no layout shift):

| Token           | Family             | Role                                          |
| --------------- | ------------------ | --------------------------------------------- |
| `font-heading`  | Archivo            | Heavy uppercase headlines, eyebrows, wordmark |
| `font-display`  | Playfair Display   | Italic serif accents (*"together."*)          |
| `font-sans`     | Inter              | Body copy, UI labels, controls                |
| `font-mono`     | Geist Mono         | Code and tabular data                         |

Two fluid scales (they scale with the viewport via `clamp()`):

- **Display** — `text-display-xs → xl` (heavy uppercase sans)
- **Script** — `text-script-sm → xl` (italic serif accent)
- **`text-eyebrow`** — small uppercase, wide tracking

Each size bundles its own line-height, letter-spacing and font-weight, so
`text-display-lg` is a complete style on its own.

### Shape, elevation & motion

- **Radii** derive from one base: `--radius` (`0.75rem`) → `rounded-sm … 4xl`.
  `rounded-arch` gives the window/arch image mask from the prototype.
- **Shadows** are tinted with the brand purple: `shadow-xs … xl`, plus
  `shadow-brand` for glow.
- **Easings** — `ease-brand`, `ease-out-quart`, `ease-in-out-quart`.
- **Animations** — `animate-fade-up`, `animate-fade-in`, `animate-float`,
  `animate-marquee`.

---

## Components

**Primitives** (`@/components/ds`)

| Component                          | Purpose                                              |
| ---------------------------------- | ---------------------------------------------------- |
| `Container`                        | Page gutters + max-width (`sm` / `default` / `wide`) |
| `Section`                          | Full-bleed band with a `tone` and `padding`          |
| `Display`                          | Heavy uppercase headline (`size`, `outline`)         |
| `Script`                           | Italic serif accent                                  |
| `Eyebrow`                          | Small uppercase label (`rule`)                       |
| `Stat`                             | Big-number statistic                                 |
| `Quote`                            | Centred pull-quote                                   |
| `Logo` / `ButterflyMark`           | Wordmark + placeholder mark                          |

`Section` tones: `light` · `surface` · `muted` · `lavender` · `brand` · `night`.

**shadcn** (`@/components/ui`) — `Button` (with brand variants `brand`,
`brand-outline`, `inverse`, `inverse-outline` and sizes `xl` / `cta`),
`Badge`, `Card`, `Input`, `Label`, `Textarea`, `Separator`.

### Composing the signature lockup

The prototype's headlines pair a solid uppercase line with an italic serif
accent:

```tsx
<Display size="lg">
  Shining a light on
  <Script className="ml-3 text-brand-600">together.</Script>
</Display>
```

Outline (stroke-only) headlines use the `outline` prop:

```tsx
<Display size="xl" outline>Share the knowledge</Display>
```

---

## Changing the brand

Because everything reads from `globals.css`, rebranding is a one-file change:

1. **Palette** — edit the `--color-brand-*` / `--color-ink-*` values in the
   `@theme` block.
2. **Semantic roles** — adjust the `:root` / `.dark` blocks if a role should
   point somewhere new.
3. **Type** — swap the `next/font` imports in `layout.tsx` and the
   `--font-*` tokens.
4. **Radii / shadows / motion** — single tokens near the bottom of `@theme`.

---

## Fidelity notes

- Colour values are **close approximations sampled from the exported frame**,
  not exported styles. Confirm against the Figma styles before shipping.
- `ButterflyMark` is a **placeholder** — replace it with the official logo SVG.
- The prototype's large butterfly/flower background graphic is brand artwork
  and is not reproduced here.

## Next steps

- Replace the placeholder logo and sample copy with real content.
- Add the remaining prototype sections (hero, founder, numbers, CTA) as
  composed patterns once content is available.
- Add `dark` class toggling if a dark theme is required in production.
- Consider a `/design-system` route (currently the style guide lives at `/`).
