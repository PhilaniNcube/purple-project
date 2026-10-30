import Image from "next/image";
import { Check } from "lucide-react";

import { Container, Section } from "@/components/ds";

/** The three pillars from 03 WHERE YOUR SUPPORT GOES in the copy deck. */
const SUPPORT_PILLARS = [
  {
    index: "01",
    lead: "Protect more young people.",
    body: "Support vaccination initiatives that help prevent HPV-related cancers.",
    icon: { src: "/images/vaccination.svg", width: 56, height: 56 },
  },
  {
    index: "02",
    lead: "Bring screening closer.",
    body: "Help more women access cervical screening, especially in underserved regions.",
    icon: { src: "/images/screening.svg", width: 56, height: 56 },
  },
  {
    index: "03",
    lead: "Stand with women in treatment.",
    body: "Fund emotional and medical support, and compassionate care at the end of life.",
    icon: { src: "/images/ribbon.svg", width: 56, height: 56 },
  },
] as const;

/**
 * "Where your support goes." — Section 03 of the Donate page.
 *
 * A full-bleed brand-violet band washed over editorial photography, pairing the
 * two-voice headline lockup ("WHERE YOUR SUPPORT" + italic "goes.") with the
 * three areas every contribution funds: HPV vaccination, cervical screening and
 * dignified care through treatment.
 */
export function WhereSupportGoes() {
  return (
    <Section
      id="where-support-goes"
      tone="brand"
      padding="none"
      className="isolate overflow-hidden"
    >
      {/* Background photograph washed to brand violet */}
      <Image
        src="/images/colour-purple.webp"
        alt=""
        aria-hidden
        fill
        sizes="100vw"
        className="-z-30 object-cover object-[50%_38%]"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-20 bg-brand-700/85 mix-blend-color"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-brand-800/75 mix-blend-multiply"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-linear-to-b from-brand-950/50 via-transparent to-brand-950/60"
      />

      <Container size="wide" className="relative py-24 sm:py-28 lg:py-32">
        <div className="max-w-3xl">


          <h2 className="flex w-full flex-col items-start">
            <span className="block font-heading text-display-md lg:text-display-md text-white tracking-[0.02em] uppercase text-outline-2">
              Where Your Support
            </span>
            <span className="mt-1 block font-display lg:text-script-md italic text-white sm:mt-2">
              Goes
            </span>
          </h2>
        </div>

        <ul className="mt-14 grid gap-6 sm:mt-16 lg:grid-cols-3">
          {SUPPORT_PILLARS.map((pillar) => (
            <li
              key={pillar.lead}
              className="group relative flex flex-col justify-between border border-white/15 bg-brand-950/65 p-8 backdrop-blur-xs transition-colors duration-300 hover:border-white/30 hover:bg-brand-950/80"
            >
              <div>
                <div className="flex items-start justify-between gap-4">
                  <Image
                    src={pillar.icon.src}
                    alt=""
                    aria-hidden
                    width={pillar.icon.width}
                    height={pillar.icon.height}
                    className="size-12 shrink-0"
                  />
                  <span
                    aria-hidden
                    className="font-heading text-xs font-bold tracking-[0.2em] text-brand-300/70 uppercase"
                  >
                    {pillar.index}
                  </span>
                </div>

                <h3 className="mt-8 font-heading text-xl leading-snug font-bold tracking-tight text-white sm:text-2xl">
                  {pillar.lead}
                </h3>

                <p className="mt-3 text-base leading-relaxed text-pretty text-white/80">
                  {pillar.body}
                </p>
              </div>

              <div className="mt-8 flex items-center gap-2.5 border-t border-white/10 pt-5 text-xs font-medium tracking-wide text-brand-200">
                <span
                  aria-hidden
                  className="flex size-4 shrink-0 items-center justify-center bg-white text-brand-800"
                >
                  <Check className="size-3" strokeWidth={3.5} />
                </span>
                <span>Direct programme impact</span>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

