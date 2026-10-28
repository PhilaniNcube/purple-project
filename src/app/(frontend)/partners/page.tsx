import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container, Display, Eyebrow, Script, Section } from "@/components/ds";
import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/ui/button";
import { PARTNERS } from "@/lib/partners";

export const metadata: Metadata = {
  title: "Partners",
  description:
    "The organisations Purple Project works alongside in the fight against gynaecological cancer.",
};

const DESCRIPTIONS: Record<string, string> = {
  "Cancer Alliance":
    "A South African coalition working to reduce the impact of cancer through advocacy, collaboration and patient support.",
  "Project Flamingo":
    "A South African organisation working to improve cancer care and support for patients and their families.",
  "CANSA — Cancer Association of South Africa":
    "The Cancer Association of South Africa, providing support, information and advocacy for people affected by cancer.",
};

export default function PartnersPage() {
  return (
    <main className="flex flex-1 flex-col">
      <PageHero
        eyebrow="Partners"
        title="Stronger"
        accent="together."
        description="We work alongside organisations that share our goal: fewer late diagnoses, more honest conversations and better support for women across South Africa."
        tone="night"
      >
        <Button
          variant="inverse"
          size="cta"
          nativeButton={false}
          render={<Link href="/partner-with-us" />}
        >
          Partner with us
          <ArrowRight aria-hidden />
        </Button>
      </PageHero>

      <Section tone="light">
        <Container size="wide">
          <div className="max-w-2xl">
            <Eyebrow rule className="text-primary">
              In good company
            </Eyebrow>
            <h2 className="mt-5 flex flex-col items-start">
              <Display as="span" size="sm" className="text-brand-950">
                The people
              </Display>
              <Script size="sm" className="text-brand-700">
                beside us.
              </Script>
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              No single organisation can break the silence alone. These
              partnerships help us reach further, share trusted information and
              keep the conversation going.
            </p>
          </div>

          <ul className="mt-12 grid gap-px bg-brand-200 sm:grid-cols-3">
            {PARTNERS.map((partner) => (
              <li
                key={partner.src}
                className="flex flex-col bg-white p-7 sm:p-9"
              >
                <div className="flex h-24 items-center">
                  <Image
                    src={partner.src}
                    alt={partner.name}
                    width={partner.width}
                    height={partner.height}
                    className={`h-auto w-full ${partner.maxWidth}`}
                  />
                </div>
                <h3 className="mt-6 font-heading text-lg font-bold tracking-tight text-brand-950">
                  {partner.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {DESCRIPTIONS[partner.name]}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section tone="lavender">
        <Container size="wide">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16">
            <div>
              <Eyebrow rule className="text-brand-700">
                What partnership means
              </Eyebrow>
              <h2 className="mt-5 flex flex-col items-start">
                <Display as="span" size="sm" className="text-brand-950">
                  More than
                </Display>
                <Script size="sm" className="text-brand-700">
                  a logo.
                </Script>
              </h2>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-brand-900/75">
                We build relationships that put something useful into the world:
                a workshop in a school, a resource in a clinic, a conversation in
                a workplace. If you have reach, skills or resources, there is a
                way to use them well.
              </p>
            </div>

            <div className="flex flex-col gap-4 border border-brand-200 bg-white p-7 sm:p-9">
              <p className="font-heading text-[0.7rem] font-bold tracking-[0.18em] text-brand-700 uppercase">
                Start a conversation
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Tell us about your organisation and what you would like to make
                possible. We will reply with a practical next step.
              </p>
              <Button
                variant="brand"
                size="cta"
                className="mt-2 self-start"
                nativeButton={false}
                render={<Link href="/partner-with-us" />}
              >
                Explore partnership
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
