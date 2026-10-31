import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/ds";
import { Button } from "@/components/ui/button";

/**
 * Quiz hero.
 *
 * The microscopic cell artwork from Get the Facts, washed to brand violet and
 * dimmed so the headline stays legible. The lockup keeps the brand's two
 * voices — the stroke-only "THINK YOU KNOW" answered by the italic serif
 * "the facts?" — then the invitation in one short measure and a single start
 * action that carries the visitor to the first question.
 */
export function QuizHero() {
  return (
    <section
      id="top"
      className="relative isolate flex min-h-svh w-full flex-col overflow-hidden bg-brand-950 text-white"
    >
      <Image
        src="/images/facts-hero.webp"
        alt=""
        aria-hidden
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover object-center"
      />

      {/* Violet wash, then neutral scrims for contrast. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-brand-700/45 mix-blend-color"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-brand-950/45" />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-linear-to-b from-black/75 via-transparent to-black/65"
      />

      <Container className="relative flex flex-1 flex-col items-center justify-center py-32 text-center">
        <h1 className="flex w-full flex-col items-center">
          <span className="block font-heading text-display-md uppercase tracking-[0.02em] text-white text-outline-2 lg:text-display-lg">
            Think you know
          </span>

          <span className="mt-1 block font-display text-script-xl italic text-white sm:mt-2">
            the facts?
          </span>
        </h1>

        <p className="mt-8 max-w-2xl text-base leading-relaxed text-pretty text-white/85 sm:text-lg">
          Seven quick questions, no judgement. Find out what you know, and
          what&rsquo;s worth knowing.
        </p>

        <Button
          variant="inverse-outline"
          size="cta"
          nativeButton={false}
          className="mt-10"
          render={<Link href="#quiz" />}
        >
          Start the quiz
        </Button>
      </Container>
    </section>
  );
}
