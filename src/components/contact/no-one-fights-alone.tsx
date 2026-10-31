import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container, Section } from "@/components/ds";
import { Button } from "@/components/ui/button";

/**
 * "No one fights alone." — the Contact page's closing band.
 *
 * Mirrors the site-wide `JoinUs` closing call to action (full-bleed photograph
 * dimmed to a texture, centred two-voice lockup, a single outlined button that
 * fills on hover) but points visitors who came to give, volunteer, partner or
 * share a story onward to Get Involved rather than back to Contact.
 */
export function NoOneFightsAlone() {
  return (
    <Section
      id="no-one-fights-alone"
      tone="night"
      padding="none"
      className="isolate flex min-h-[50vh] items-center overflow-hidden"
    >
      <Image
        src="/images/hands.webp"
        alt=""
        aria-hidden
        fill
        sizes="100vw"
        className="-z-20 object-cover object-[50%_60%]"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-night/75" />

      <Container className="py-16 text-center sm:py-20 lg:py-24">
        <h2 className="flex flex-col items-center text-white">
          <span className="block font-heading text-display-md uppercase">
            No one
          </span>
          <span className="mt-2 block font-display text-script-lg italic sm:mt-3">
            fights alone.
          </span>
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
          Looking to donate, volunteer, partner with us or share your story?
          Head to Get Involved.
        </p>

        <Button
          variant="inverse-outline"
          size="cta"
          nativeButton={false}
          className="mt-10 hover:bg-white hover:text-brand-800 focus-visible:ring-white/70"
          render={<Link href="/get-involved" />}
        >
          Get Involved
          <ArrowRight
            aria-hidden
            className="ml-0 w-0 transition-all duration-300 ease-out group-hover/button:ml-2 group-hover/button:w-4"
          />
        </Button>
      </Container>
    </Section>
  );
}

