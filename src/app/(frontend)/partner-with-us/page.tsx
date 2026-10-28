import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Handshake, Megaphone, Users } from "lucide-react";

import { Container, Display, Eyebrow, Script, Section } from "@/components/ds";
import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/ui/button";
import { PARTNERS } from "@/lib/partners";

export const metadata: Metadata = {
  title: "Partner with us",
  description:
    "Work with Purple Project as a business, school, clinic, funder or media partner and help us reach more people, sooner.",
};

const REASONS = [
  {
    icon: Users,
    title: "Reach people where they are",
    body: "Your audience already trusts you. A partnership turns that trust into a conversation about women’s health that could change an outcome.",
  },
  {
    icon: Megaphone,
    title: "Make the message louder",
    body: "Together we can put accurate information in front of more schools, workplaces and communities — and keep it there.",
  },
  {
    icon: Handshake,
    title: "Build something that lasts",
    body: "We are interested in relationships, not once-off logo placements. Bring your people, your skills and your reach, and let us build with care.",
  },
];

const WAYS = [
  {
    title: "Corporate partnerships",
    body: "CSI programmes, employee volunteering, workplace talks or a cause partnership tied to your business.",
  },
  {
    title: "Schools and clinics",
    body: "Bring a workshop, resource pack or awareness day to the young people and patients you already serve.",
  },
  {
    title: "Media and platforms",
    body: "Amplify the message through interviews, campaigns, content collaborations or donated media space.",
  },
  {
    title: "Funders and in-kind partners",
    body: "Fund a programme, cover a practical cost or donate the products and services that keep the work moving.",
  },
];

export default function PartnerWithUsPage() {
  return (
    <main className="flex flex-1 flex-col">
      <PageHero
        eyebrow="Partner with us"
        title="Partner with"
        accent="purpose."
        description="No one fights alone — and no single organisation can break the silence on its own. If you share our belief that women deserve information, dignity and earlier answers, let us talk."
        tone="night"
      >
        <Button
          variant="inverse"
          size="cta"
          nativeButton={false}
          render={
            <a href="mailto:hello@purpleproject.org.za?subject=Partnership%20with%20Purple%20Project" />
          }
        >
          Start a conversation
          <ArrowRight aria-hidden />
        </Button>
        <Button
          variant="inverse-outline"
          size="cta"
          nativeButton={false}
          render={<Link href="/partners" />}
        >
          Meet our partners
        </Button>
      </PageHero>

      <Section tone="light">
        <Container size="wide">
          <div className="max-w-2xl">
            <Eyebrow rule className="text-primary">
              Why partner
            </Eyebrow>
            <h2 className="mt-5 flex flex-col items-start">
              <Display as="span" size="sm" className="text-brand-950">
                Shared values,
              </Display>
              <Script size="sm" className="text-brand-700">
                shared reach.
              </Script>
            </h2>
          </div>

          <ul className="mt-12 grid gap-8 sm:grid-cols-3">
            {REASONS.map(({ icon: Icon, title, body }) => (
              <li key={title} className="border-t border-brand-200 pt-6">
                <Icon aria-hidden className="size-5 text-brand-700" />
                <h3 className="mt-4 font-heading text-lg font-bold tracking-tight text-brand-950">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {body}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section tone="lavender">
        <Container size="wide">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div>
              <Eyebrow rule className="text-brand-700">
                Ways to work together
              </Eyebrow>
              <h2 className="mt-5 flex flex-col items-start">
                <Display as="span" size="sm" className="text-brand-950">
                  Start where
                </Display>
                <Script size="sm" className="text-brand-700">
                  it makes sense.
                </Script>
              </h2>
              <p className="mt-6 text-base leading-relaxed text-brand-900/75">
                Every partnership looks different. Tell us what you have — time,
                reach, a venue, a budget or a skill — and we will shape something
                useful around it.
              </p>
            </div>

            <ul className="divide-y divide-brand-200 border-y border-brand-200">
              {WAYS.map((way) => (
                <li key={way.title} className="py-6 first:pt-0 last:pb-0">
                  <h3 className="font-heading text-xl font-bold tracking-tight text-brand-950">
                    {way.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-brand-900/75">
                    {way.body}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      <Section tone="light">
        <Container size="wide">
          <div className="flex flex-col items-center text-center">
            <Eyebrow rule className="text-primary">
              In good company
            </Eyebrow>
            <h2 className="mt-5 flex flex-col items-center">
              <Display as="span" size="sm" className="text-brand-950">
                Stronger
              </Display>
              <Script size="sm" className="text-brand-700">
                together.
              </Script>
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
              We are proud to work alongside organisations that share our goal.
            </p>

            <ul
              aria-label="Our partners"
              className="mt-12 grid w-full max-w-4xl items-center justify-items-center gap-y-10 sm:grid-cols-3 sm:gap-x-8 lg:gap-x-12"
            >
              {PARTNERS.map((partner) => (
                <li key={partner.src} className="flex w-full justify-center">
                  <Image
                    src={partner.src}
                    alt={partner.name}
                    width={partner.width}
                    height={partner.height}
                    className={`h-auto w-full ${partner.maxWidth}`}
                  />
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      <Section tone="brand" padding="none">
        <Container size="wide" className="py-16 text-center sm:py-20">
          <h2 className="flex flex-col items-center">
            <Display as="span" size="sm" className="text-white">
              Let us build
            </Display>
            <Script size="sm" className="text-brand-200">
              something together.
            </Script>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/80">
            Send us a short note about your organisation and what you have in
            mind. We will take it from there.
          </p>
          <Button
            variant="inverse"
            size="cta"
            className="mt-8"
            nativeButton={false}
            render={
              <a href="mailto:hello@purpleproject.org.za?subject=Partnership%20with%20Purple%20Project" />
            }
          >
            Email the team
          </Button>
        </Container>
      </Section>
    </main>
  );
}
