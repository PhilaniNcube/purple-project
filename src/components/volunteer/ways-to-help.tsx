import Image from "next/image";

import { Container, Section } from "@/components/ds";

/** The four ways to help named on the page. */
const WAYS = [
  {
    title: "Spread the word.",
    body: "Share our posts and start conversations online and in your community.",
  },
  {
    title: "Join us at events.",
    body: "Help at our activations and outreach events.",
  },
  {
    title: "Pack with purpose.",
    body: "Help prepare dignity packs for women in treatment.",
  },
  {
    title: "Start a conversation.",
    body: "Bring a talk about women’s health to your workplace, school or group.",
  },
] as const;

/**
 * "Ways to help."
 *
 * The band beneath the volunteer hero. An arched editorial photograph on the
 * left keeps the page in the same visual rhythm as Our Story and Get the Facts,
 * while the four ways run as a numbered editorial list on the right — no cards,
 * no icons, just the action and what it involves.
 *
 * The heading uses the brand's two voices: the stroke-only "WAYS" answered by
 * the italic serif "to help".
 */
export function WaysToHelp() {
  return (
    <Section
      id="ways"
      tone="light"
      padding="none"
      className="scroll-mt-20 overflow-hidden bg-mist"
    >
      <Container
        size="wide"
        className="grid gap-12 py-20 sm:py-24 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-16 lg:py-28"
      >
        <div>
          <h2 className="flex flex-col items-start font-heading text-display-md uppercase">
            <span className="block text-outline-2 text-foreground">Ways</span>
            <span className="mt-1 block font-display text-script-lg normal-case italic text-brand-700 sm:mt-2">
              to help.
            </span>
          </h2>

          {/* Arched editorial photograph, echoing the Our Story and Get the
              Facts image treatments. */}
          <div className="relative mt-10 aspect-4/3 w-full max-w-md overflow-hidden rounded-arch bg-brand-200 sm:mt-12">
            <Image
              src="/images/our-story-hero.webp"
              alt="A group of women and a young girl talking together"
              fill
              sizes="(min-width: 1024px) 34vw, 90vw"
              className="object-cover object-[50%_30%]"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-brand-900/15 mix-blend-multiply"
            />
          </div>
        </div>

        <ol className="border-t border-brand-200">
          {WAYS.map((way, index) => (
            <li
              key={way.title}
              className="grid grid-cols-[2.5rem_1fr] gap-5 border-b border-brand-200 py-7 sm:grid-cols-[3.5rem_1fr] sm:gap-6 sm:py-8"
            >
              <span
                aria-hidden
                className="pt-1 font-heading text-sm font-bold tracking-[0.18em] text-brand-400"
              >
                {String(index + 1).padStart(2, "0")}
              </span>

              <div>
                <h3 className="font-heading text-xl font-bold tracking-tight text-brand-950 sm:text-2xl">
                  {way.title}
                </h3>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-pretty text-ink-700 sm:text-base">
                  {way.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
