import Image from "next/image";
import Link from "next/link";
import { ArrowDown } from "lucide-react";

import { Container } from "@/components/ds";
import { Button } from "@/components/ui/button";

/**
 * Donate hero — "Give what you can."
 *
 * Picks up directly from the "Give" band on Get Involved: the hands holding a
 * warm tangle of fairy lights fill the viewport, washed in deep brand violet so
 * the points of light read as warmth against a rich purple ground.
 *
 * The headline lockup pairs the stroke-only uppercase "GIVE" with its italic
 * serif counterweight "what you can.", followed by the single sentence of
 * purpose, quick-jump actions for the two ways to give, and the floating scroll
 * cue that leads into the page.
 */
export function DonateHero() {
  return (
    <section
      id="top"
      className="relative isolate flex min-h-svh w-full flex-col overflow-hidden bg-brand-900 text-white"
    >
      {/* Background photograph — picks up from "Give" on Get Involved */}
      <Image
        src="/images/hands.webp"
        alt=""
        aria-hidden
        fill
        priority
        sizes="100vw"
        className="-z-30 object-cover object-[50%_60%]"
      />

      {/* Violet wash & scrims — unify the photograph with the brand palette
          while keeping the top navigation and centred headline crisp. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-20 bg-brand-600 mix-blend-color"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-brand-900/70" />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-linear-to-b from-black/65 via-brand-900/20 to-brand-950/85"
      />

      <Container className="relative flex flex-1 flex-col items-center justify-center py-28 text-center">
        <h1 className="flex w-full flex-col items-center">
          <span className="block font-heading text-display-lg tracking-[0.02em] uppercase text-white text-outline-2">
            Give
          </span>
          <span className="mt-1 block font-display text-script-xl italic text-white sm:mt-2">
            what you can.
          </span>
        </h1>

        <p className="mt-10 max-w-2xl text-base leading-relaxed text-pretty text-white/85 sm:mt-12 sm:text-lg">
          Every gift helps a woman keep her dignity through treatment, and helps
          another recognise the signs sooner.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button
            variant="inverse"
            size="cta"
            nativeButton={false}
            render={<Link href="#ways-to-give" />}
          >
            Donate online
          </Button>
          <Button
            variant="inverse-outline"
            size="cta"
            nativeButton={false}
            render={<Link href="#pledge-form" />}
          >
            Pledge items
          </Button>
        </div>
      </Container>

      <Link
        href="#ways-to-give"
        aria-label="Scroll to ways to give"
        className="relative mx-auto mb-10 flex size-14 shrink-0 items-center justify-center rounded-full border border-white/60 text-white transition-colors outline-none hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white/70"
      >
        <ArrowDown aria-hidden className="size-6 animate-float" />
      </Link>
    </section>
  );
}

