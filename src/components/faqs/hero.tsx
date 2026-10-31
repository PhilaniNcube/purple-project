import Image from "next/image";
import Link from "next/link";
import { ArrowDown } from "lucide-react";

import { Button } from "@/components/ui/button";

/**
 * FAQs hero — "Questions, answered."
 *
 * Full-viewport opening band in the same family as the Get The Facts hero: a
 * single rose against black, washed to brand violet so it reads as a quiet,
 * reflective ground for the page's plain answers.
 *
 * The lockup keeps the brand's two voices — the stroke-only uppercase
 * "QUESTIONS," answered by its italic serif counterweight "answered." — then a
 * one-line reassurance, a jump to the answers and the floating scroll cue.
 */
export function FaqsHero() {
  return (
    <section
      id="top"
      className="relative isolate flex min-h-svh w-full flex-col overflow-hidden bg-brand-950 text-white"
    >
      {/* Background photograph */}
      <Image
        src="/images/flower.jpg"
        alt=""
        aria-hidden
        fill
        priority
        sizes="100vw"
        className="-z-30 object-cover object-[50%_35%]"
      />

      {/* Violet wash & scrims */}
      <div
        aria-hidden
        className="absolute inset-0 -z-20 bg-brand-600 mix-blend-color"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-brand-900/55" />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-linear-to-b from-black/60 via-transparent to-brand-950/80"
      />

      <div className="relative flex flex-1 flex-col items-center justify-center px-5 py-32 text-center sm:px-8">
        <h1 className="flex w-full flex-col items-center">
          <span className="block font-heading text-display-lg tracking-[0.02em] uppercase text-white text-outline-2">
            Questions,
          </span>
          <span className="mt-1 block font-display text-script-xl italic text-white sm:mt-2">
            answered.
          </span>
        </h1>

        <p className="mt-10 max-w-2xl text-base leading-relaxed text-pretty text-white/85 sm:mt-12 sm:text-lg">
          The things people ask us most, answered plainly. If yours isn&rsquo;t
          here, ask us. No question is too awkward.
        </p>

        <Button
          variant="inverse-outline"
          size="cta"
          nativeButton={false}
          className="mt-10"
          render={<Link href="/contact" />}
        >
          Ask us directly
        </Button>
      </div>

      <Link
        href="#questions"
        aria-label="Scroll to the questions"
        className="relative mx-auto mb-10 flex size-14 shrink-0 items-center justify-center rounded-full border border-white/60 text-white transition-colors outline-none hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white/70"
      >
        <ArrowDown aria-hidden className="size-6 animate-float" />
      </Link>
    </section>
  );
}

