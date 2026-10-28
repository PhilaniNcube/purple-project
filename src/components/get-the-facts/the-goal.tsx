import Image from "next/image";
import Link from "next/link";

import { Container, Section } from "@/components/ds";
import { Button } from "@/components/ui/button";

/** The three 90-70-70 targets the WHO strategy rests on. */
const TARGETS = [
  {
    value: "90",
    label: "of girls vaccinated against HPV by age 15",
  },
  {
    value: "70",
    label: "of women screened with a high-performance test by ages 35 and 45",
  },
  {
    value: "70",
    label: "of women diagnosed with cervical disease receiving appropriate treatment",
  },
];

/**
 * "The goal — eliminating cervical cancer."
 *
 * The purple band that sets out the country's commitment. The artwork is a
 * three-dimensional render — a violet cell cluster and iridescent teal rings —
 * washed to brand violet with the same blend recipe as the colour story, so the
 * page's two purple bands rhyme.
 *
 * The top half pairs a two-line italic statement with the commitment it
 * explains. Beneath them the WHO's 90-70-70 targets sit in three translucent
 * cards, each number carried in the display face with a serif percent beside
 * it. The band closes centred, with the progress already made and the work left
 * to do.
 */
export function TheGoal() {
  return (
    <Section
      id="goal"
      tone="brand"
      padding="none"
      className="isolate overflow-hidden"
    >
      {/* Background artwork */}
      <Image
        src="/images/goal.webp"
        alt=""
        aria-hidden
        fill
        sizes="100vw"
        className="-z-30 object-cover object-[60%_40%]"
      />

      {/* Violet wash — brand hue over the render's light and shade, then a flat
          tint that lifts the deep purples of the cell cluster so the band reads
          as one field of colour behind the cards. */}
      <div aria-hidden className="absolute inset-0 -z-20 bg-brand-700 mix-blend-color" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-brand-600/70" />

      <Container size="wide" className="relative py-24 sm:py-28 lg:py-36">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-end lg:gap-16">
          <div>
            <p className="font-heading text-display-sm uppercase tracking-[0.04em] text-white/45">
              The goal
            </p>
            <h2 className="mt-2 font-display text-script-lg italic text-white">
              Eliminating
              <br />
              Cervical Cancer
            </h2>
          </div>

          <p className="max-w-md text-base leading-relaxed text-pretty text-white/85">
            South Africa has committed to eliminating cervical cancer as a public
            health problem by 2030, in line with the World Health
            Organization&rsquo;s global strategy. The plan rests on three
            targets:
          </p>
        </div>

        <ul className="mt-10 grid gap-6 sm:grid-cols-3">
          {TARGETS.map((target) => (
            <li
              key={target.value + target.label}
              className="rounded-2xl bg-brand-600 p-8 text-center"
            >
              <p className="font-heading text-display-lg leading-none text-white">
                {target.value}
                <span className="font-display text-5xl">%</span>
              </p>
              <p className="mx-auto mt-6 max-w-52 text-sm leading-snug text-pretty text-white/90">
                {target.label}
              </p>
            </li>
          ))}
        </ul>

        <div className="mx-auto mt-12 max-w-4xl space-y-4 text-center text-base leading-relaxed text-pretty text-white/85">
          <p>
            The country has already made progress: school-based vaccination
            reaching more than 1.5 million girls a year, more than 1.8 million
            women screened each year, and a national move to HPV DNA testing. The
            plan puts equity first, prioritising women living with HIV and women
            in rural areas and informal settlements.
          </p>
          <p>
            We still have far to go, and we&rsquo;re working to close the gap.
          </p>
        </div>

        <div className="mt-10 flex justify-center">
          <Button
            variant="inverse-outline"
            size="lg"
            nativeButton={false}
            className="px-5"
            render={<Link href="/get-the-facts#prevention" />}
          >
            Read about the vaccine
          </Button>
        </div>
      </Container>
    </Section>
  );
}
