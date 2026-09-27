import Image from "next/image";

import { Container, Section } from "@/components/ds";

/**
 * Testimonial — "In their words."
 *
 * The quiet lavender band that closes the story sections. It pairs the brand's
 * quotation glyph (`public/images/quotes.png`) with a left-aligned pull-quote,
 * set in the brand purple so the statement carries on its own.
 *
 * The crown of arches across the top is the site's arch motif (see
 * `rounded-arch`) flattened into a frieze: rounded-top panels standing on the
 * band's top edge, stepped in width, height and tone. As with the clover on the
 * knowledge band, the motif is a deeper tint of its own ground rather than a
 * second colour or a transparency. It is decorative only (`aria-hidden`) and is
 * clipped at the band edges.
 *
 * The glyph overlaps the arch crown and bleeds off the top-left, so the band
 * clips its overflow (`overflow-hidden`) while the copy keeps the page's
 * container rhythm.
 */



export function Testimonial() {
  return (
    <Section
      id="testimonial"
      tone="lavender"
      padding="none"
      className="relative overflow-hidden"
    >
    

      <Container className="relative pt-28 pb-20 sm:pt-36 sm:pb-28">
        <figure className="relative mx-auto max-w-4xl">
          {/* Brand quotation glyph — bleeds up over the arch crown. */}
          <Image
            src="/images/quotes.png"
            alt=""
            aria-hidden
            width={140}
            height={102}
            className="pointer-events-none h-16 w-auto select-none sm:absolute sm:-top-24 sm:left-0 sm:h-24 lg:h-28"
          />

          <blockquote className="mt-8 max-w-4xl text-xl leading-relaxed font-semibold text-brand-700 sm:mt-0 sm:pl-32 sm:text-2xl">
            Purple Project is making a meaningful impact by advancing
            gynaecological cancer awareness and encouraging early detection
            through education and advocacy. Their work helps break stigma and
            save lives.
          </blockquote>
        </figure>
      </Container>
    </Section>
  );
}
