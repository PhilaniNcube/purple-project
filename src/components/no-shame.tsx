import Image from "next/image";

import { Container, Display, Script, Section } from "@/components/ds";

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
      className="isolate flex min-h-[60vh] items-start justify-center overflow-hidden  lg:min-h-200"
    >
      {/* Background — the chair. The band's ~1.9:1 aspect against the 4:3
          artwork crops a sliver off the top (which is where the windows sit)
          and bottom, framing the chair in the lower half with a strip of floor
          beneath it, as in the reference. The 46% focal point keeps the chair
          centred horizontally and just below the headline lockup. */}
      <Image
        src="/images/chair.webp"
        alt=""
        aria-hidden
        fill
        sizes="100vw"
        className="-z-20 object-cover object-[50%_46%]"
      />

      <Container className="relative pt-24 text-center sm:pt-32 lg:pt-44">
        <h2 className="flex flex-col items-center">
          <Display as="span" size="md">
            No shame.
          </Display>
          <span  className="mt-1 font-display italic text-5xl sm:text-6xl lg:text-7xl translate-x-8 md:translate-x-10 lg:translate-x-16 text-primary sm:mt-2">
            Just support.
          </span>
        </h2>
      </Container>
    </Section>
  );
}
