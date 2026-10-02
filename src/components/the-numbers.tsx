import Image from "next/image";

import { Container, Section } from "@/components/ds";

/**
 * "The numbers"
 *
 * A quiet statistics band. The headline is set as an oversized, low-contrast
 * watermark (heavy sans + italic serif, in a pale lavender) sitting behind a
 * four-up row of figures.
 *
 * Each figure is a two-sided card: the front shows only the figure, and
 * hovering (or keyboard-focusing) it turns 180° about the vertical hinge to
 * reveal the description on the reverse. A `perspective` on the card gives the
 * turn depth, so it reads as an object rotating in space rather than a flat
 * squash.
 *
 * The reverse face is pre-rotated by the same 180° (`back` below), so once the
 * shell finishes turning it lands upright and facing the viewer;
 * `backface-visibility: hidden` keeps it invisible until then.
 *
 * Motion is progressive: under `prefers-reduced-motion` the shell never
 * rotates and the description simply cross-fades in, so the copy stays
 * reachable without any movement.
 */

type Stat = {
  value: string;
  label: string;
  /** The figure's artwork, with the intrinsic size `next/image` needs. */
  icon: { src: string; width: number; height: number };
};

/** Placeholder figures — swap for the final dataset. */
const STATS: Stat[] = [
  {
    value: "76%",
    label: "76% of cervical cancers are caused by just two strains of HPV.",
    icon: { src: "/images/76-percent.svg", width: 141, height: 65 },
  },
  {
    value: "1 in 41",
    label: "The cancer South African women die from most.",
    icon: { src: "/images/1-in-4.svg", width: 188, height: 55 },
  },
  {
    value: "3 hours",
    label: "How often cervical cancer claims a South African woman.",
    icon: { src: "/images/3-hours.svg", width: 207, height: 65 },
  },
  {
    value: "1",
    label: "Vaccine dose is all it takes for strong, lasting protection.",
    icon: { src: "/images/1-dose.svg", width: 207, height: 65 },
  },
];

/**
 * The card turn, shared by every figure.
 *
 * - `shell` — the transform the card performs on hover/focus (plus its timing).
 * - `back`  — the same turn pre-applied to the reverse face so it lands upright
 *   and facing the viewer once the shell has turned.
 *
 * Both are `motion-safe:` so reduced-motion visitors are never rotated; the
 * cross-fade fallback lives on the faces.
 */
type Reveal = { shell: string; back: string };

const REVEAL: Reveal = {
  shell:
    "duration-500 ease-out-quart motion-safe:group-hover:[transform:rotateY(180deg)] motion-safe:group-focus-within:[transform:rotateY(180deg)]",
  back: "motion-safe:[transform:rotateY(180deg)]",
};

const FACE =
  "absolute inset-0 flex flex-col items-center justify-center rounded-2xl border p-4 text-center [backface-visibility:hidden] motion-reduce:transition-opacity";

function StatCard({ value, label, icon }: Stat) {
  return (
    // The card's own perspective gives its turn depth. It's focusable so the
    // description is reachable without a pointer.
    <div
      tabIndex={0}
      className="group rounded-2xl outline-none perspective:[1000px] focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
    >
      <div
        className={`relative min-h-44 transform-3d transition-transform will-change-transform motion-reduce:transition-none ${REVEAL.shell}`}
      >
        {/* Front — the figure alone. */}
        <div
          className={`${FACE} border-brand-200/70 bg-lavender/60 motion-reduce:group-hover:opacity-0 motion-reduce:group-focus-within:opacity-0`}
        >
          <span className="font-heading text-4xl font-extrabold tracking-tight text-primary sm:text-5xl">
            {value}
          </span>
        </div>

        {/* Reverse — the description, revealed by the turn. */}
        <div
          className={`${FACE} border-brand-800/30 bg-brand-700 text-white/95 shadow-brand motion-reduce:opacity-0 motion-reduce:group-hover:opacity-100 motion-reduce:group-focus-within:opacity-100 ${REVEAL.back}`}
        >
          <Image
            src={icon.src}
            alt=""
            aria-hidden
            width={icon.width}
            height={icon.height}
            className="h-auto max-w-full"
          />
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
            <StatCard key={index} {...stat} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
