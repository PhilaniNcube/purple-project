import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Container, Display, Eyebrow, Script, Section } from "@/components/ds";
import { JoinUs } from "@/components/join-us";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Get involved",
  description:
    "Give, volunteer, partner or share your story — there is a place for you in the Purple Project movement.",
};

const WAYS = [
  {
    index: "01",
    title: "Donate",
    body: "Fund dignity packs, school workshops and the practical work that helps women keep their dignity through treatment.",
    href: "/donate",
    cta: "Give today",
  },
  {
    index: "02",
    title: "Volunteer",
    body: "Lend your time at events, in classrooms, behind a screen or on the days when the work simply needs hands.",
    href: "/volunteer",
    cta: "Join the team",
  },
  {
    index: "03",
    title: "Partner with us",
    body: "Bring your business, school, clinic or platform on board and help us reach more people, sooner.",
    href: "/partner-with-us",
    cta: "Start a partnership",
  },
  {
    index: "04",
    title: "Share your story",
    body: "Your experience could help someone feel less alone, ask a question sooner or finally book the appointment.",
    href: "/share-your-story",
    cta: "Tell your story",
  },
];

const MORE_WAYS = [
  "Follow us and share a post — awareness travels further when you pass it on.",
  "Host a talk at your workplace, school, church or book club.",
  "Fundraise for Purple Project at a birthday, race or community event.",
  "Donate sanitary products, toiletries or practical supplies for dignity packs.",
];

export default function GetInvolvedPage() {
  return (
    <main className="flex flex-1 flex-col">
      <PageHero
        eyebrow="Get involved"
        title="Be part of"
        accent="the movement."
        description="No one fights alone. Whether you have money, time, a platform or a story, there is a way for you to help break the silence around gynaecological cancer."
        tone="brand"
      >
        <Link
          href="#ways"
          className="inline-flex h-11 items-center border border-white/45 px-7 font-heading text-[0.72rem] tracking-[0.18em] text-white uppercase transition-colors outline-none hover:border-white/80 hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white/70"
        >
          Find your place
        </Link>
      </PageHero>

      <Section id="ways" tone="light" className="scroll-mt-24">
        <Container size="wide">
          <div className="max-w-2xl">
            <Eyebrow rule className="text-primary">
              Four ways in
            </Eyebrow>
            <h2 className="mt-5 flex flex-col items-start">
              <Display as="span" size="sm" className="text-brand-950">
                Choose how you
              </Display>
              <Script size="sm" className="text-brand-700">
                show up.
              </Script>
            </h2>
          </div>

          <ul className="mt-12 grid gap-px bg-brand-200 sm:grid-cols-2">
            {WAYS.map((way) => (
              <li key={way.href} className="group relative bg-white">
                <div className="relative flex h-full flex-col p-7 sm:p-10">
                  <span
                    aria-hidden
                    className="pointer-events-none absolute top-5 right-6 font-heading text-display-md leading-none text-brand-100 select-none transition-colors duration-300 group-hover:text-brand-200"
                  >
                    {way.index}
                  </span>

                  <Display as="h3" size="xs" className="relative text-brand-700">
                    {way.title}
                  </Display>
                  <p className="relative mt-4 flex-1 text-base leading-relaxed text-muted-foreground">
                    {way.body}
                  </p>

                  <Link
                    href={way.href}
                    className="relative mt-8 inline-flex items-center gap-2 font-heading text-[0.7rem] font-semibold tracking-[0.16em] text-brand-800 uppercase transition-colors outline-none hover:text-brand-600 focus-visible:underline"
                  >
                    {way.cta}
                    <ArrowUpRight aria-hidden className="size-3.5" />
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section tone="lavender">
        <Container size="wide">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div>
              <Eyebrow rule className="text-brand-700">
                Smaller gestures, real impact
              </Eyebrow>
              <h2 className="mt-5 flex flex-col items-start">
                <Display as="span" size="sm" className="text-brand-950">
                  More ways to
                </Display>
                <Script size="sm" className="text-brand-700">
                  help.
                </Script>
              </h2>
              <p className="mt-6 max-w-md text-base leading-relaxed text-brand-900/75">
                You do not need a big platform or a big budget. Consistency,
                care and a willingness to start the conversation are enough.
              </p>
            </div>

            <ul className="divide-y divide-brand-200 border-y border-brand-200">
              {MORE_WAYS.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-4 py-5 text-sm leading-relaxed text-brand-900/80"
                >
                  <span
                    aria-hidden
                    className="mt-2 size-1.5 shrink-0 bg-brand-700"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      <JoinUs />
    </main>
  );
}
