import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, Heart, Mail, Package } from "lucide-react";

import { Container, Display, Eyebrow, Script, Section } from "@/components/ds";
import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Donate",
  description:
    "Support Purple Project with a once-off gift, a monthly contribution or practical supplies for dignity packs.",
};

const IMPACT = [
  {
    icon: Package,
    title: "Dignity packs",
    body: "Sanitary products and toiletries for women going through cancer treatment — small items that protect dignity at a vulnerable time.",
  },
  {
    icon: BookOpen,
    title: "Education and workshops",
    body: "School talks, community sessions and resources that help people recognise the signs and know when to seek care.",
  },
  {
    icon: Heart,
    title: "Reaching further",
    body: "Transport, printing, venue hire and the everyday costs that let a small team keep showing up where it matters.",
  },
];

const GIVING = [
  {
    title: "Once-off gift",
    body: "A single contribution helps us respond where the need is greatest right now.",
  },
  {
    title: "Monthly giving",
    body: "Regular support lets us plan workshops and reach more schools and clinics through the year.",
  },
  {
    title: "In-kind support",
    body: "Sanitary products, toiletries, printing, transport, venue hire or professional skills are all welcome.",
  },
];

export default function DonatePage() {
  return (
    <main className="flex flex-1 flex-col">
      <PageHero
        eyebrow="Donate"
        title="Give dignity."
        accent="Fund change."
        description="Every contribution helps us put practical support in someone’s hands and accurate information in front of more people. No shame, just support."
        tone="brand"
      >
        <Button
          variant="inverse"
          size="cta"
          nativeButton={false}
          render={
            <a href="mailto:hello@purpleproject.org.za?subject=I%27d%20like%20to%20donate" />
          }
        >
          <Mail aria-hidden />
          Arrange a donation
        </Button>
        <Button
          variant="inverse-outline"
          size="cta"
          nativeButton={false}
          render={<Link href="/contact" />}
        >
          Talk to us
        </Button>
      </PageHero>

      <Section tone="light">
        <Container size="wide">
          <div className="max-w-2xl">
            <Eyebrow rule className="text-primary">
              Where it goes
            </Eyebrow>
            <h2 className="mt-5 flex flex-col items-start">
              <Display as="span" size="sm" className="text-brand-950">
                What your support
              </Display>
              <Script size="sm" className="text-brand-700">
                makes possible.
              </Script>
            </h2>
          </div>

          <ul className="mt-12 grid gap-8 sm:grid-cols-3">
            {IMPACT.map(({ icon: Icon, title, body }) => (
              <li key={title} className="border-t border-brand-200 pt-6">
                <span className="flex size-10 items-center justify-center bg-lavender text-brand-700">
                  <Icon aria-hidden className="size-5" />
                </span>
                <h3 className="mt-5 font-heading text-lg font-bold tracking-tight text-brand-950">
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
                Ways to give
              </Eyebrow>
              <h2 className="mt-5 flex flex-col items-start">
                <Display as="span" size="sm" className="text-brand-950">
                  Choose what
                </Display>
                <Script size="sm" className="text-brand-700">
                  works for you.
                </Script>
              </h2>
              <p className="mt-6 text-base leading-relaxed text-brand-900/75">
                To arrange a gift, email us and we will send the current banking
                details and a receipt. If you would rather give supplies or
                skills, tell us what you have in mind.
              </p>
              <Button
                variant="brand"
                size="cta"
                className="mt-8"
                nativeButton={false}
                render={
                  <a href="mailto:hello@purpleproject.org.za?subject=I%27d%20like%20to%20donate" />
                }
              >
                Email the team
              </Button>
            </div>

            <ul className="divide-y divide-brand-200 border-y border-brand-200">
              {GIVING.map((option) => (
                <li key={option.title} className="py-6 first:pt-0 last:pb-0">
                  <h3 className="font-heading text-xl font-bold tracking-tight text-brand-950">
                    {option.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-brand-900/75">
                    {option.body}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      <Section tone="light">
        <Container size="wide">
          <div className="grid gap-8 border border-brand-200 bg-brand-50/60 p-8 sm:p-12 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="font-heading text-eyebrow text-brand-700 uppercase">
                Transparency
              </p>
              <h2 className="mt-3 font-heading text-2xl font-bold tracking-tight text-brand-950 sm:text-3xl">
                Every rand is treated with care.
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                Donations go towards programme delivery and the practical costs
                of running it. If you would like more detail before you give, ask
                us — we are happy to explain where the money goes.
              </p>
            </div>
            <Button
              variant="brand-outline"
              size="cta"
              nativeButton={false}
              render={<Link href="/contact" />}
            >
              Ask a question
            </Button>
          </div>
        </Container>
      </Section>
    </main>
  );
}
