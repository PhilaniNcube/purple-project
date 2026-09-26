import { Container, Section } from "@/components/ds";

/**
 * "The numbers"
 *
 * A quiet statistics band. The headline is set as an oversized, low-contrast
 * watermark (heavy sans + italic serif, in a pale lavender) sitting behind a
 * four-up row of figures.
 *
 * Each figure is a two-sided card: the front shows only the figure, and
 * hovering (or keyboard-focusing) it turns the card over in 3D to reveal the
 * description on the reverse. Every card turns a *different* way — over the
 * horizontal hinge, the vertical hinge, a diagonal corner, and a quarter-turn
 * revolve — and each is given its own `perspective` so the turn reads as an
 * object rotating in space rather than a flat squash.
 *
 * The reverse face is pre-rotated by the inverse of its card's turn (`back`
 * below), so once the shell finishes rotating it lands upright and facing the
 * viewer; `backface-visibility: hidden` keeps it invisible until then.
 *
 * Motion is progressive: under `prefers-reduced-motion` the shell never
 * rotates and the description simply cross-fades in, so the copy stays
 * reachable without any movement.
 */

type Stat = { value: string; label: string };

/** Placeholder figures — swap for the final dataset. */
const STATS: Stat[] = [
  {
    value: "13,800",
    label: "New cases of cervical cancer annually reported in South Africa",
  },
  {
    value: "13,800",
    label: "New cases of cervical cancer annually reported in South Africa",
  },
  {
    value: "13,800",
    label: "New cases of cervical cancer annually reported in South Africa",
  },
  {
    value: "13,800",
    label: "New cases of cervical cancer annually reported in South Africa",
  },
];

/**
 * One hover "turn" per card.
 *
 * - `shell` — the transform the card performs on hover/focus (plus its timing).
 * - `back`  — the inverse pre-applied to the reverse face so it lands upright.
 * - `front` — any base transform the front face needs (only the revolve).
 *
 * `shell`/`back`/`front` are `motion-safe:` so reduced-motion visitors are
 * never rotated; the cross-fade fallback lives on the faces.
 */
type Reveal = { shell: string; front?: string; back: string };

const REVEALS: Reveal[] = [
  // 1 — lifts away on the horizontal hinge
  {
    shell:
      "duration-500 ease-brand motion-safe:group-hover:[transform:rotateX(-180deg)] motion-safe:group-focus-within:[transform:rotateX(-180deg)]",
    back: "motion-safe:[transform:rotateX(-180deg)]",
  },
  // 2 — turns on the vertical hinge
  {
    shell:
      "duration-500 ease-out-quart motion-safe:group-hover:[transform:rotateY(180deg)] motion-safe:group-focus-within:[transform:rotateY(180deg)]",
    back: "motion-safe:[transform:rotateY(180deg)]",
  },
  // 3 — tumbles over a diagonal corner
  {
    shell:
      "duration-700 ease-in-out-quart motion-safe:group-hover:[transform:rotate3d(1,1,0,-180deg)] motion-safe:group-focus-within:[transform:rotate3d(1,1,0,-180deg)]",
    back: "motion-safe:[transform:rotate3d(1,1,0,-180deg)]",
  },
  // 4 — revolves a quarter turn to present its reverse
  {
    shell:
      "duration-500 ease-brand motion-safe:group-hover:[transform:rotateY(-90deg)] motion-safe:group-focus-within:[transform:rotateY(-90deg)]",
    back: "motion-safe:[transform:rotateY(90deg)]",
  },
];

const FACE =
  "absolute inset-0 flex flex-col items-center justify-center rounded-2xl border p-4 text-center [backface-visibility:hidden] motion-reduce:transition-opacity";

function StatCard({ value, label, reveal }: Stat & { reveal: Reveal }) {
  return (
    // The card's own perspective gives its turn depth. It's focusable so the
    // description is reachable without a pointer.
    <div
      tabIndex={0}
      className="group rounded-2xl outline-none [perspective:1000px] focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
    >
      <div
        className={`relative min-h-44 [transform-style:preserve-3d] transition-transform will-change-transform motion-reduce:transition-none ${reveal.shell}`}
      >
        {/* Front — the figure alone. */}
        <div
          className={`${FACE} border-brand-200/70 bg-lavender/60 motion-reduce:group-hover:opacity-0 motion-reduce:group-focus-within:opacity-0 ${reveal.front ?? ""}`}
        >
          <span className="font-heading text-4xl font-extrabold tracking-tight text-primary sm:text-5xl">
            {value}
          </span>
        </div>

        {/* Reverse — the description, revealed by the turn. */}
        <div
          className={`${FACE} border-brand-800/30 bg-brand-700 text-white/95 shadow-brand motion-reduce:opacity-0 motion-reduce:group-hover:opacity-100 motion-reduce:group-focus-within:opacity-100 ${reveal.back}`}
        >
          <span className="max-w-[24ch] text-sm leading-relaxed">{label}</span>
        </div>
      </div>
    </div>
  );
}

export function TheNumbers() {
  return (
    <Section
      id="numbers"
      tone="light"
      padding="none"
      className="pb-20 sm:pb-28"
    >
      <Container>
        {/* Watermark headline — pale, oversized, bleeding slightly left */}
        <h2 className="font-heading text-display-xl leading-[0.85] text-brand-200 select-none lg:-ml-12">
          <span className="mr-[0.12em]">The</span>
          <span className="font-display font-medium italic">numbers</span>
        </h2>

        <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:mt-24 lg:grid-cols-4 lg:gap-16">
          {STATS.map((stat, index) => (
            <StatCard
              key={index}
              {...stat}
              reveal={REVEALS[index % REVEALS.length]}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
