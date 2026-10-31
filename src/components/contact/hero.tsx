import Image from "next/image";
import Link from "next/link";
import { ArrowDown } from "lucide-react";

import { Container } from "@/components/ds";
import { Button } from "@/components/ui/button";

/**
 * Contact hero — "We'd love to hear from you."
 *
 * Picks up from the closing "Join us. Speak up. Change everything." band: the
 * same line of women standing together fills the viewport, washed to deep
 * brand violet so the page opens as a continuation of that invitation.
 *
 * The lockup keeps the brand's two voices — the stroke-only uppercase
 * "WE'D LOVE" answered by its italic serif counterweight "to hear from you." —
 * followed by the reassurance line, the jump to the form and the floating
 * scroll cue used on the Donate hero.
 */
export function ContactHero() {
  return (
    <section
      id="top"
      className="relative isolate flex min-h-svh w-full flex-col overflow-hidden bg-brand-900 text-white"
    >
      {/* Background photograph — picks up from the "Join us" closing band */}
      <Image
        src="/images/join-us.webp"
        alt=""
        aria-hidden
        fill
        priority
        sizes="100vw"
        className="-z-30 object-cover object-[50%_28%]"
      />

      {/* Violet wash & scrims */}
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
            We&rsquo;d love
          </span>
          <span className="mt-1 block font-display text-script-xl italic text-white sm:mt-2">
            to hear from you.
          </span>
        </h1>

        <p className="mt-10 max-w-2xl text-base leading-relaxed text-pretty text-white/85 sm:mt-12 sm:text-lg">
          A question, a story, an idea, or something you&rsquo;ve been afraid to
          ask. No question is too awkward here. No shame, just support.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button
            variant="inverse"
            size="cta"
            nativeButton={false}
            render={<Link href="#contact-form" />}
          >
            Send a message
          </Button>
          <Button
            variant="inverse-outline"
            size="cta"
            nativeButton={false}
            render={<Link href="/faqs" />}
          >
            Read the FAQs
          </Button>
        </div>
      </Container>

      <Link
        href="#getting-in-touch"
        aria-label="Scroll to who's getting in touch"
        className="relative mx-auto mb-10 flex size-14 shrink-0 items-center justify-center rounded-full border border-white/60 text-white transition-colors outline-none hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white/70"
      >
        <ArrowDown aria-hidden className="size-6 animate-float" />
      </Link>
    </section>
  );
}

