import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/ds";
import { Button } from "@/components/ui/button";

/**
 * Partner with us hero.
 *
 * A stack of hands on a tree trunk fills the frame, washed to brand violet so
 * the photograph reads as a dark, collaborative ground for the headline. The
 * lockup keeps the brand's two voices — the stroke-only "COLLABORATION"
 * answered by the italic serif "is key." — then the invitation in two short
 * measures: what a partnership does, and what it can leave behind.
 *
 * The photograph is `fill` + `object-cover`, so it always covers the band
 * whatever the viewport. The scrims darken the top edge for the transparent nav
 * and hold the centre steady for the white type.
 */
export function PartnerHero() {
  return (
    <section
      id="top"
      className="relative isolate flex min-h-svh w-full flex-col overflow-hidden bg-brand-900 text-white"
    >
      <Image
        src="/images/collab.webp"
        alt=""
        aria-hidden
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover object-[50%_45%]"
      />

      {/* Violet wash, then neutral scrims for contrast. */}
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
          <span className="block font-heading text-display-md uppercase tracking-[0.02em] text-white text-outline-2 lg:text-display-lg">
            Collaboration
          </span>

          <span className="mt-1 block font-display text-script-xl italic text-white sm:mt-2">
            is key.
          </span>
        </h1>

        <p className="mt-10 max-w-3xl text-lg leading-snug font-semibold text-balance text-white sm:text-xl">
          Partnering with Purple Project means contributing directly to saving
          lives and to lasting health solutions for women in South Africa.
        </p>

        <p className="mt-5 max-w-2xl text-base leading-relaxed text-pretty text-white/85">
          Companies and organisations can help us close the gap to the 2030 goal
          of eliminating cervical cancer, and together we can leave a legacy of
          awareness, prevention and compassionate care.
        </p>

        <Button
          variant="inverse-outline"
          size="cta"
          nativeButton={false}
          className="mt-10"
          render={<Link href="#enquiry" />}
        >
          Send an enquiry
        </Button>
      </Container>
    </section>
  );
}
