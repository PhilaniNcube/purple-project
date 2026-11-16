import Image from "next/image";

import { Container, Display, Script, Section } from "@/components/ds";
import { Button } from "./ui/button";
import Link from "next/link";

/**
 * "No shame. Just support."
 *
 * The band directly beneath the hero. A full-bleed photograph of an empty
 * gallery — a lone leather chair against a white wall — doubles as the
 * section's ground: because the wall is the same white as the page, the image
 * dissolves into the band, leaving only the chair and the grey floor reading
 * as picture. The headline lockup sits centred near the top of the frame,
 * above the chair, in the brand's two voices: a heavy uppercase statement and
 * its italic serif counterweight, carried in the primary purple.
 *
 * As in `join-us` and `straight-from`, the band carries `isolate` so the
 * photograph at `-z-20` stays inside the section's stacking context and paints
 * above the page's white `<body>` rather than falling behind it. The artwork
 * is decorative, so it is hidden from assistive tech; the message lives in the
 * heading.
 */
export function NoShame() {
  return (
    <Section
      id="no-shame"
      tone="light"
      padding="none"
      className="isolate flex min-h-[max(60svh,30rem)] items-start justify-center overflow-clip sm:min-h-[max(60svh,34rem)] lg:min-h-200"
    >
      {/* Background — the chair. The band is at least tall enough that the
          chair always lands below the headline: an initial 60svh band, with
          a floor for short laptop/tablet windows, widening to a fixed 800px
          on desktop. The 46% focal point keeps the chair centred and clear of
          the copy on phones and desktop; the tighter 24% crop on tablets
          leaves more of the white wall above the chair for the lockup. */}
      <Image
        src="/images/chair.webp"
        alt=""
        aria-hidden
        fill
        sizes="100vw"
        className="-z-20 object-cover object-[50%_46%] sm:object-[50%_24%] lg:object-[50%_46%]"
      />

      <Container className="relative pt-[clamp(6rem,14vw,9.5rem)] text-center">
        <h2 className="flex flex-col items-center">
          <Display as="span" size="md">
            No shame.
          </Display>
          <span className="mt-1 translate-x-[clamp(1rem,6vw,4rem)] font-display text-[clamp(2.75rem,6.7vw,6rem)] leading-none italic text-primary sm:mt-2">
            Just support.
          </span>
        </h2>
        {/* <Button

          size="cta"
          nativeButton={false}
          className="mt-6"
          render={<Link href="/get-the-facts" />}
        >
          Learn More
        </Button> */}
      </Container>
    </Section>
  );
}
