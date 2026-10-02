import Image from "next/image";
import { ArrowRight } from "lucide-react";

import { Container, Section } from "@/components/ds";
import { Button } from "@/components/ui/button";

/**
 * Join us. Speak up. — the closing call to action.
 *
 * A full-bleed documentary photograph of women standing together, dimmed until
 * it reads almost as a texture, with the invitation centred on top: the heavy
 * uppercase display line, the italic serif accent, and a single Contact Us
 * button.
 *
 * The button is deliberately quieter than the headline — an outlined ghost at
 * rest that, on hover, fills white, darkens its label to the brand purple and
 * slides an arrow in beside it. The arrow is always in the layout (`w-0` →
 * `w-4`), so the label never shifts; only its box grows. `transition-all` on
 * the shared button base keeps the fill, label colour and arrow width as one
 * smooth motion.
 *
 * On desktop the band is held to at least 60vh and the content centred vertically
 * (via the Section's flex), so the photograph reads as a full-bleed backdrop
 * rather than a strip. The vertical padding below only ever adds to that floor,
 * it never defines the height.
 *
 * The three layers follow `straight-from`: `isolate` on the band gives it a
 * stacking context, so the photograph can sit at `-z-20` and the wash at `-z-10`
 * and both still paint above the Section's own background. Without the boundary
 * those negative layers would escape the section and fall behind the page's
 * white `<body>` — the image would load, measure correctly, and simply never be
 * seen. The content layer stays unpositioned so it lands in the normal flow and
 * paints above both.
 */
export function JoinUs() {
  return (
    <Section
      id="join-us"
      tone="night"
      padding="none"
      className="isolate flex min-h-[60vh] items-center overflow-hidden"
    >
      {/* Background — the line of women. `object-[50%_28%]` keeps the faces in
          frame when the tall portrait is cropped to the band's aspect. */}
      <Image
        src="/images/join-us.webp"
        alt=""
        aria-hidden
        fill
        sizes="100vw"
        className="-z-20 object-cover object-[50%_28%]"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-night/70" />

      <Container className="py-16 text-center sm:py-20 lg:py-24">
        <h2 className="flex flex-col items-center text-white">
          <span className="block font-heading text-display-md uppercase">
            Join us. Speak up.
          </span>
          <span className="mt-2 block font-display text-script-lg italic sm:mt-3">
            Change Everything
          </span>
        </h2>

        <Button
          variant="inverse-outline"
          size="cta"
          nativeButton={false}
          className="mt-10 hover:bg-white hover:text-brand-800 focus-visible:ring-white/70"
          render={<a href="/contact" />}
        >
          Contact Us
          <ArrowRight
            aria-hidden
            className="ml-0 w-0 transition-all duration-300 ease-out group-hover/button:ml-2 group-hover/button:w-4"
          />
        </Button>
      </Container>
    </Section>
  );
}
