import Image from "next/image";

import { Container, Display, Script, Section } from "@/components/ds";

/**
 * "Why the Colour Purple?"
 *
 * The purple band that follows the five-cancer roll call. The photograph — a
 * hand holding a ribbon against the chest — is washed to brand violet so the
 * pink ribbon reads as the Purple Project's own, and the copy sits over it in
 * two columns: the brand's two-voice headline lockup on the left, the reason
 * for the colour on the right, bottom-aligned with the italic line.
 *
 * The wash is done with blend modes rather than a flat scrim so the photograph
 * keeps its depth: `mix-blend-color` takes hue and saturation from the brand
 * purple while leaving the image's own light and shade, then a multiply pass
 * settles the whole band dark enough for white type. The image is decorative,
 * so it is hidden from assistive tech.
 */
export function ColourPurple() {
  return (
    <Section
      id="why-purple"
      tone="brand"
      padding="none"
      className="isolate overflow-hidden"
    >
      {/* Background photograph */}
      <Image
        src="/images/colour-purple.webp"
        alt=""
        aria-hidden
        fill
        sizes="100vw"
        className="-z-30 object-cover object-[50%_38%]"
      />

      {/* Violet wash — the brand hue over the photograph's own luminance, held
          back from full strength so the ribbon and hand keep their shape, then a
          multiply pass that pulls the photo's highlights down far enough for the
          white type to hold its contrast. */}
      <div aria-hidden className="absolute inset-0 -z-20 bg-brand-700/80 mix-blend-color" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-brand-800/50 mix-blend-multiply" />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-linear-to-r from-brand-950/45 via-transparent to-brand-950/30"
      />

      <Container
        size="wide"
        className="relative flex py-24 sm:py-28 lg:min-h-[41rem] lg:items-center lg:py-32"
      >
        <div className="grid w-full gap-y-10 lg:grid-cols-2 lg:items-end lg:gap-x-0">
          <h2 className="flex flex-col items-start lg:pl-36">
            {/* Colour is inherited from the `brand` tone, so the size utilities
                are not dropped by the class merge. */}
            <Display as="span" size="md">
              Why the
            </Display>
            <Script size="md">Colour Purple?</Script>
          </h2>

          <p className="max-w-[30rem] text-base leading-snug text-pretty text-white/90">
            Purple is the umbrella colour representing this group of cancers,
            and our aim is to make it as well known as pink. It also honours
            caregivers and cancer survivors, and everything the colour stands
            for: courage, dignity and hope.
          </p>
        </div>
      </Container>
    </Section>
  );
}
