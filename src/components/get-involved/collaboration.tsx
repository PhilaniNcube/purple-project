import Image from "next/image";
import Link from "next/link";

import { Container, Section } from "@/components/ds";
import { Button } from "@/components/ui/button";

/** The four ways a company or organisation can come on board. */
const PARTNERSHIPS = [
  {
    lead: "Financial",
    accent: "support",
    body: "Fund education, outreach and care.",
  },
  {
    lead: "In-kind",
    accent: "gifts",
    body: "Sanitary towels and toiletries for women in treatment.",
  },
  {
    lead: "Campaign",
    accent: "support",
    body: "Sponsor a social media campaign or printed educational materials.",
  },
  {
    lead: "Community",
    accent: "outreach",
    body: "Support the events and school sessions that take information to where it's needed.",
  },
];

/**
 * "Collaboration is key."
 *
 * The partner band. A stack of hands on a tree trunk fills the frame and is
 * dimmed hard, so the photograph reads as a dark ground with the forest only
 * just coming through — the cards and the type do the talking.
 *
 * The heading leads on the left in the two voices again — stroke-only
 * "COLLABORATION" over solid "IS KEY" — with the partnership promise beside it,
 * one bridging line across the middle, then the four kinds of support as dark
 * panels. The band closes on the Relate Bracelets route, which is an external
 * programme rather than one of our own.
 */
export function Collaboration() {
  return (
    <Section
      id="collaboration"
      tone="night"
      padding="none"
      className="isolate overflow-hidden"
    >
      {/* Background photograph */}
      <Image
        src="/images/collab.webp"
        alt=""
        aria-hidden
        fill
        sizes="100vw"
        className="-z-30 object-cover object-[50%_45%]"
      />

      {/* Scrims — settle the forest into a dark ground for the cards. */}
      <div aria-hidden className="absolute inset-0 -z-20 bg-black/65" />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-linear-to-b from-black/50 via-transparent to-black/55"
      />

      <Container size="wide" className="relative py-24 sm:py-28 lg:py-32">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-start lg:gap-16">
          <h2 className="font-heading text-display-sm uppercase">
            <span className="block text-outline-2">Collaboration</span>
            <span className="block">Is key</span>
          </h2>

          <p className="max-w-md text-base leading-relaxed text-pretty text-white lg:justify-self-end">
            Partnering with Purple Project means contributing directly to saving
            lives and to lasting health solutions for women in South Africa.
          </p>
        </div>

        <p className="mx-auto mt-10 max-w-3xl text-center text-sm leading-relaxed text-pretty text-white/80">
          Companies and organisations can help us close the gap to the 2030 goal
          of eliminating cervical cancer, and together we can leave a legacy of
          awareness, prevention and compassionate care.
        </p>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PARTNERSHIPS.map((item) => (
            <li
              key={item.lead}
              className="flex flex-col rounded-xl bg-black/55 p-6"
            >
              <h3 className="font-heading text-2xl leading-tight font-bold tracking-tight text-brand-400">
                <span className="block">{item.lead}</span>
                <span className="block font-display text-2xl font-medium normal-case italic">
                  {item.accent}
                </span>
              </h3>

              <p className="mt-4 flex-1 text-sm leading-relaxed text-pretty text-white/75">
                {item.body}
              </p>

              <Button
                variant="inverse-outline"
                size="lg"
                nativeButton={false}
                className="mt-6 w-fit px-3 text-xs"
                render={<Link href="/contact" />}
              >
                Send Enquiry
              </Button>
            </li>
          ))}
        </ul>

        <p className="mx-auto mt-12 max-w-2xl text-center text-sm leading-relaxed text-pretty text-white/80">
          You can also support Purple Project through Relate Bracelets. Find out
          how at relate.org.za.
        </p>

        <div className="mt-6 flex justify-center">
          <Button
            variant="inverse-outline"
            size="lg"
            nativeButton={false}
            className="px-5"
            render={<Link href="https://relate.org.za" />}
          >
            Visit Relate
          </Button>
        </div>
      </Container>
    </Section>
  );
}
