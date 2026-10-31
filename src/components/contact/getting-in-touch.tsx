import Link from "next/link";
import { ArrowDown, Briefcase, HeartHandshake, School, Stethoscope } from "lucide-react";

import { Container, Section } from "@/components/ds";

/** The four audiences from 02 WHO'S GETTING IN TOUCH? in the copy deck. */
const AUDIENCES = [
  {
    index: "01",
    icon: HeartHandshake,
    lead: "Patients",
    accent: "and families",
    body: "Looking for support or information? Reach out. We’ll listen first.",
  },
  {
    index: "02",
    icon: School,
    lead: "Parents",
    accent: "and schools",
    body: "Questions about the HPV vaccine, or want to bring a conversation to your school? Let’s talk.",
  },
  {
    index: "03",
    icon: Briefcase,
    lead: "Businesses",
    accent: "and partners",
    body: "Interested in collaborating, sponsoring or donating items? We’d love to hear your ideas.",
  },
  {
    index: "04",
    icon: Stethoscope,
    lead: "Healthcare",
    accent: "professionals",
    body: "Working in this space? Let’s connect.",
  },
] as const;

/**
 * "Who's getting in touch?" — Section 02 of the Contact page.
 *
 * Four audience columns that tell each visitor there is a place for them
 * before they reach the form. Visually mirrors the Donate page's
 * `TwoWaysToGive`: the two-voice headline lockup, the editorial dot grid,
 * oversized watermark numerals and the lavender wash that rises on hover.
 */
export function GettingInTouch() {
  return (
    <Section id="getting-in-touch" tone="light" className="scroll-mt-20">
      <Container size="wide">
        <div className="relative">
          {/* Decorative dot grid, echoing `TwoWaysToGive` */}
          <div
            aria-hidden
            className="pointer-events-none absolute top-0 right-0 hidden size-24 text-ink-300 sm:block"
            style={{
              backgroundImage:
                "radial-gradient(currentColor 1.5px, transparent 1.5px)",
              backgroundSize: "18px 18px",
            }}
          />

          <h2 className="flex w-full flex-col items-center text-center">
            <span className="block font-heading text-display-md tracking-[0.02em] text-brand-800 uppercase text-outline-2">
              Who&rsquo;s getting
            </span>
            <span className="mt-1 block font-display italic text-brand-700 sm:mt-2 lg:text-script-md">
              in touch?
            </span>
          </h2>
        </div>

        <ul className="mt-14 grid gap-px bg-brand-200/80 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {AUDIENCES.map((audience) => {
            const Icon = audience.icon;

            return (
              <li key={audience.index} className="bg-background">
                <Link
                  href="#contact-form"
                  className="group relative isolate flex h-full flex-col overflow-hidden p-6 pt-10 outline-none focus-visible:ring-2 focus-visible:ring-ring/50 sm:p-8 sm:pt-10"
                >
                  {/* Hover wash — rises from the foot of the column */}
                  <span
                    aria-hidden
                    className="absolute inset-x-0 bottom-0 -z-10 h-full translate-y-full bg-lavender/70 transition-transform duration-500 ease-brand group-hover:translate-y-0 group-focus-visible:translate-y-0 motion-reduce:transition-none"
                  />

                  {/* Watermark numeral */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute top-4 right-5 font-heading text-display-sm leading-none text-brand-100 select-none transition-colors duration-500 group-hover:text-brand-200"
                  >
                    {audience.index}
                  </span>

                  <span className="relative flex size-12 items-center justify-center bg-lavender text-brand-700 transition-colors duration-300 group-hover:bg-white">
                    <Icon aria-hidden className="size-5" strokeWidth={1.75} />
                  </span>

                  <h3 className="relative mt-6 font-heading text-xl font-bold tracking-tight text-brand-950 uppercase">
                    {audience.lead}{" "}
                    <span className="block font-display text-2xl font-normal normal-case tracking-normal text-brand-700 italic">
                      {audience.accent}
                    </span>
                  </h3>

                  <p className="relative mt-4 flex-1 text-base leading-relaxed text-pretty text-ink-700">
                    {audience.body}
                  </p>

                  <span className="relative mt-8 inline-flex items-center gap-2 font-heading text-[0.7rem] font-semibold tracking-[0.16em] text-brand-800 uppercase">
                    Get in touch
                    <ArrowDown
                      aria-hidden
                      className="size-3.5 transition-transform duration-300 group-hover:translate-y-0.5"
                    />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}

