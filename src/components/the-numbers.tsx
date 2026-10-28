import Image from "next/image";
import Link from "next/link";

import { Container, Section } from "@/components/ds";
import { Button } from "@/components/ui/button";

/**
 * "The numbers"
 *
 * A quiet statistics band. The headline is set as an oversized, low-contrast
 * watermark (heavy sans + italic serif, in a pale lavender) sitting behind a
 * row of five figures.
 *
 * Each figure is a two-sided card. The front sets the figure as the brand's
 * two-voice lockup — a heavy display number with an italic serif accent — and
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
  /** The headline figure, set in the heavy display face. */
  value: string;
  /** The italic serif accent. Omitted for a bare figure. */
  accent?: string;
  /**
   * Where the accent sits: `inline` for a superscript-style unit beside the
   * figure, `below` for a caption tucked under it (e.g. "1.5" + "million+").
   * Defaults to `below`.
   */
  accentPlacement?: "inline" | "below";
  label: string;
  /** The figure's artwork, with the intrinsic size `next/image` needs. */
  icon: { src: string; width: number; height: number };
};

const STATS: Stat[] = [
  {
    value: "1.5",
    accent: "million+",
    label: "Girls reached by school-based HPV vaccination every year.",
    icon: { src: "/images/vaccination.svg", width: 56, height: 56 },
  },
  {
    value: "1.8",
    accent: "million+",
    label: "Women screened for cervical cancer every year.",
    icon: { src: "/images/screening.svg", width: 56, height: 56 },
  },
  {
    value: "90",
    accent: "70 · 90",
    label:
      "South Africa’s 2030 targets for vaccination, screening and treatment.",
    icon: { src: "/images/targets.svg", width: 56, height: 56 },
  },
  {
    value: "2030",
    label:
      "The year South Africa aims to eliminate cervical cancer as a public health problem.",
    icon: { src: "/images/calendar-2030.svg", width: 56, height: 56 },
  },
  {
    value: "1",
    label:
      "Cervical cancer is the leading cause of cancer-related death of women in South Africa.",
    icon: { src: "/images/ribbon.svg", width: 56, height: 56 },
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
  "absolute inset-0 flex flex-col items-center rounded-2xl border p-4 text-center [backface-visibility:hidden] motion-reduce:transition-opacity";

function StatCard({
  value,
  accent,
  accentPlacement = "below",
  label,
  icon,
}: Stat) {
  return (
    // The card's own perspective gives its turn depth. It's focusable so the
    // description is reachable without a pointer.
    <div
      tabIndex={0}
      className="group rounded-2xl outline-none perspective:[1000px] focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
    >
      <div
        className={`relative min-h-50 transform-3d transition-transform will-change-transform motion-reduce:transition-none ${REVEAL.shell}`}
      >
        {/* Front — the figure, set as the brand's two-voice lockup. */}
        <div
          className={`${FACE} justify-start border-brand-200/70 bg-lavender/60 motion-reduce:group-hover:opacity-0 motion-reduce:group-focus-within:opacity-0`}
        >
          {accentPlacement === "inline" ? (
            <span className="flex items-start font-heading text-display-lg text-primary">
              {value}
              {accent ? (
                <span className="mt-[0.06em] ml-0.5 font-display text-script-md italic text-brand-400">
                  {accent}
                </span>
              ) : null}
            </span>
          ) : (
            <span className="flex flex-col items-start">
              <span className="font-heading text-display-lg text-primary">
                {value}
              </span>
              {accent ? (
                <span className="-mt-[0.24em] font-display text-script-md italic text-brand-400">
                  {accent}
                </span>
              ) : null}
            </span>
          )}
        </div>

        {/* Reverse — the description, revealed by the turn. */}
        <div
          className={`${FACE} justify-center gap-4 border-brand-800/30 bg-brand-700 text-white/95 shadow-brand motion-reduce:opacity-0 motion-reduce:group-hover:opacity-100 motion-reduce:group-focus-within:opacity-100 ${REVEAL.back}`}
        >
          <Image
            src={icon.src}
            alt={value}
            aria-hidden
            width={icon.width}
            height={icon.height}
            className="h-auto max-w-full"
          />
          <span className="max-w-[28ch] text-sm leading-relaxed text-balance">
            {label}
          </span>
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
        <h2 className="font-heading text-display-lg leading-[0.85] select-none pt-10 lg:pt-14">
          <span className="uppercase">The numbers </span>
          <span className="font-display text-brand-800 font-medium italic">
            behind the silence
          </span>
        </h2>

        <p className="max-w-md text-sm leading-relaxed sm:text-base xl:pt-3">
          Behind every number is a woman who deserves to hear about this sooner.
        </p>

        {/* Five figures: two-up on small screens, then three over two, centred. */}
        <div className="mt-16 flex flex-wrap justify-center gap-10 lg:mt-24 lg:gap-12">
          {STATS.map((stat, index) => (
            <div
              key={index}
              className="w-full sm:w-[calc(50%-1.25rem)] lg:w-[calc(33.333%-2rem)]"
            >
              <StatCard {...stat} />
            </div>
          ))}
        </div>

        <div className="mt-14 flex justify-center lg:mt-20">
          <Button
            variant="brand"
            size="cta"
            nativeButton={false}
            render={<Link href="/get-the-facts" />}
          >
            Get the facts
          </Button>
        </div>
      </Container>
    </Section>
  );
}
