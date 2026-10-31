import Image from "next/image";
import Link from "next/link";
import { ArrowDown } from "lucide-react";

import { Container } from "@/components/ds";
import { Button } from "@/components/ui/button";

/**
 * Volunteer hero.
 *
 * Full-viewport opening band: two women embracing at an awareness walk,
 * washed to brand violet so the photograph reads as a warm, human ground for
 * the headline. The lockup keeps the brand's two voices — the stroke-only
 * "USE YOUR" answered by the italic serif "voice." — then the invitation in two
 * short measures: the promise, and what lending a voice actually means.
 *
 * The photograph is `fill` + `object-cover`, so it always covers the band
 * whatever the viewport. The neutral scrims darken the top and bottom edges so
 * the transparent nav and the scroll cue keep their contrast.
 */
export function VolunteerHero() {
  return (
    <section
      id="top"
      className="relative isolate flex min-h-svh w-full flex-col overflow-hidden bg-brand-900 text-white"
    >
      {/* Background photograph */}
      <Image
        src="/images/signs.webp"
        alt=""
        aria-hidden
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover object-[50%_38%]"
      />

      {/* Violet wash — brand hue over the photograph, then neutral scrims that
          hold the headline and the scroll cue steady. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-brand-700/60 mix-blend-multiply"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-linear-to-b from-brand-950/80 via-brand-900/30 to-brand-950/85"
      />

      <Container className="relative flex flex-1 flex-col items-center justify-center py-32 text-center">
        <h1 className="flex w-full flex-col items-center">
          {/* "USE YOUR" — stroke-only type. */}
          <span className="block font-heading text-display-lg uppercase tracking-[0.02em] text-white text-outline-2">
            Use your
          </span>

          <span className="mt-1 block font-display text-script-xl italic text-white sm:mt-2">
            voice.
          </span>
        </h1>

        <p className="mt-10 max-w-2xl text-lg leading-snug font-semibold text-balance text-white sm:text-xl">
          You don&rsquo;t need a medical background to make a difference.
        </p>

        <p className="mt-5 max-w-2xl text-base leading-relaxed text-pretty text-white/85">
          Share what you know. Start the conversation at work, at school or at
          home. Lend us your platform, or help us build new ones, to carry the
          purple message further.
        </p>

        <Button
          variant="inverse-outline"
          size="cta"
          nativeButton={false}
          className="mt-10"
          render={<Link href="#sign-up" />}
        >
          Sign me up
        </Button>
      </Container>

      <Link
        href="#ways"
        aria-label="Scroll to ways to help"
        className="relative mx-auto mb-10 flex size-14 shrink-0 items-center justify-center rounded-full border border-white/60 text-white transition-colors outline-none hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white/70"
      >
        <ArrowDown aria-hidden className="size-6 animate-float" />
      </Link>
    </section>
  );
}
