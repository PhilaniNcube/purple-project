# Purple Project — Marketing Site & Design System

The marketing site for **Purple Project**, a movement breaking the silence
around gynaecological cancer.

Built with **Next.js 16** (App Router), **Tailwind CSS v4** and **shadcn**
(Base UI primitives). Derived from the `General` Figma prototype — the exported
reference frames belong in [`design-reference/`](./design-reference).

---

## Getting started

```bash
pnpm install
pnpm dev           # http://localhost:3000
pnpm build         # production build + type check
pnpm lint
pnpm design:lint   # validate DESIGN.md against the DESIGN.md spec
```

The home route (`/`) currently doubles as the **living style guide** — every
token and component below is rendered there, alongside the production sections.

## Content management (Payload CMS)

Resources are managed in **Payload**, mounted at `/admin`. It lives in its own
route group (`src/app/(payload)`) and shares **no navigation or UI** with the
marketing site — crossing between the two is a full page load by design. The
public side of the CMS is the filterable `/resources` listing and the
`/resources/[slug]` detail pages, both rendered from Payload data.

Resource detail pages also carry lightweight engagement — **likes, sharing and
moderated comments** — with no visitor account required:

- **Likes** are anonymous. A random id is stored in an httpOnly cookie and a
  compound unique index on `resource + visitorId` keeps one like per visitor.
  The toggle and its counter are optimistic, then reconciled with the server.
- **Comments** are written as `pending` and only appear once a member of the
  team approves them under the **Engagement** group in the admin panel.
- **Sharing** uses the native Web Share sheet where available, with a copy-link
  fallback.

- **Database** — Turso (libSQL) through `@payloadcms/db-sqlite`; set
  `TURSO_DATABASE_URL` and `TURSO_ACCESS_TOKEN`. In development Payload pushes
  schema changes automatically. Production should use migrations
  (`pnpm payload migrate:create` / `payload migrate`).
- **Auth** — Payload's built-in email/password auth. The first account created
  at `/admin` becomes an **admin**; everyone else can be invited as an
  **editor**. Admins manage people and settings, editors manage content only.
- **Media** — uploads are written to `/media` on local disk. Add the five `R2_*`
  variables and the S3 storage adapter switches to Cloudflare R2 automatically,
  with no code change.
- **Drafts** — resources have draft/published status, so anonymous visitors only
  ever see published resources.

```bash
pnpm payload generate:types      # after changing collections
pnpm payload generate:importmap  # after adding admin components
```

Copy `.env.example` to `.env.local` and fill in the values.

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
public/
├─ images/                # brand artwork + editorial photography
└─ videos/                # hero background footage
src/
├─ app/
│  ├─ (frontend)/           # the marketing site — site chrome lives here
│  │  ├─ layout.tsx         # fonts + metadata + nav/footer + smooth scroll
│  │  ├─ globals.css        # ← single source of truth: all design tokens
│  │  ├─ page.tsx           # homepage (production sections + style guide)
│  │  └─ resources/         # public resources listing + detail pages
│  └─ (payload)/            # Payload admin + REST/GraphQL API (own root layout)
├─ collections/             # Payload collections (Users, Media, Categories, Resources, Comments, Likes)
├─ access/                  # role-based access-control helpers
├─ fields/                  # reusable Payload field helpers (slug)
├─ components/
│  ├─ hero.tsx              # production sections …
│  ├─ shining-a-light.tsx
│  ├─ straight-from.tsx
│  ├─ the-numbers.tsx
│  ├─ share-the-knowledge.tsx
│  ├─ resources/            # resource card + like / share / comment UI
│  ├─ navigation.tsx        # site chrome
│  ├─ smooth-scroll.tsx     # Lenis provider
│  ├─ ds/                   # design-system primitives (Container, Section, …)
│  └─ ui/                   # shadcn components (button, card, input, …)
├─ lib/
│  ├─ design-tokens.ts      # typed handles onto the CSS variables
│  ├─ payload.ts            # cached Payload client for server components
│  ├─ engagement*.ts        # cached engagement data + like/comment actions
│  └─ resource-*.ts         # shared resource types + formatting
├─ payload.config.ts        # Payload config (Turso + R2 + collections)
└─ payload-types.ts         # generated by Payload — do not edit
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

## Sections

| Section       | File                              | Notes                                                                |
| ------------- | --------------------------------- | -------------------------------------------------------------------- |
| `Hero`        | `components/hero.tsx`             | Looping video band; "AGAINST" is inline SVG so its outline is a path |
| `ShiningALight` | `components/shining-a-light.tsx` | Arched photo + outline type drawn on scroll                          |
| `StraightFrom` | `components/straight-from.tsx`   | Dark editorial band; outline type drawn on scroll                    |
| `TheNumbers`  | `components/the-numbers.tsx`      | Watermark headline over a four-up statistic row                      |
| `ShareTheKnowledge` | `components/share-the-knowledge.tsx` | Scroll-linked clover backdrop; outline type drawn on scroll |

> `design-reference/` is currently empty — drop the exported Figma frames in
> there so the artwork provenance stays with the repo.

### Scroll-driven animation

Sections that animate on scroll all follow the same pattern:

- **GSAP** with `@gsap/react`'s `useGSAP` hook, scoped to a ref. Plugins are
  registered once at module scope (`gsap.registerPlugin(...)`).
- **`gsap.matchMedia()`** gates every effect on
  `(prefers-reduced-motion: no-preference)`, with a static fallback for
  reduced motion. The stylesheet hides `[data-draw]` paths only under that
  same query, and each section ships a `<noscript>` override so the outline
  type is fully drawn with no JS at all.
- **DrawSVGPlugin** draws the stroke-only headlines (`data-draw` paths, split
  per `M…Z` subpath so each glyph animates independently) once the section
  reaches ~72% of the viewport.
- **ScrollTrigger** drives true scroll-linked effects. Scrub-based triggers
  are kept in sync with the site's Lenis smooth scroll via
  `useLenis(() => ScrollTrigger.update())`.

`ShareTheKnowledge` is the reference implementation: the four-leaf clover
artwork grows on a scrubbed timeline as the band rises into view, bleeding past
the band's edges onto the sections above and below. It carries `isolate z-10`
with `overflow-x-clip` so the spill paints *over* its neighbours horizontally
clipped but vertically free, uses `perspective` so the animated `rotateX` reads
with depth, and `will-change: transform` to keep the artwork on its own
compositor layer. The clover's own `-z-10` keeps it behind the headline.

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

Outline (stroke-only) headlines use the `outline` prop for live type:

```tsx
<Display size="xl" outline>Share the knowledge</Display>
```

…or an inline SVG when the outline needs to be an animatable path (see
`shining-a-light.tsx` and `straight-from.tsx`). Those embed the stroke-only
geometry from the exports in `public/images/`, split into subpaths and stroked
with `vectorEffect="non-scaling-stroke"` so the outline weight stays constant
as the artwork scales.

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
- The exported outline artwork in `public/images/` has its own viewBoxes, which
  do not always contain the full path. Where a component needs the whole shape
  it re-derives the viewBox from the path's true bounds — see `CLOVER_PATH`
  and the `viewBox` on `share-the-knowledge.tsx`.
- Section copy and the statistics in `the-numbers.tsx` are **placeholders**.
- Media in `public/videos/` is sample footage; swap the `src` for a hosted URL
  when the final cut is ready.

## Next steps

- Replace the placeholder logo, copy and statistics with real content.
- Swap the hero footage and founder poster for the final assets.
- Split the style guide out of `/` into its own `/design-system` route, so the
  homepage renders only production sections.
- Point the navigation at real routes — the `primaryNav` links
  (`/our-story`, `/know-your-body`, …) are not yet built.
- Add `dark` class toggling if a dark theme is required in production.
