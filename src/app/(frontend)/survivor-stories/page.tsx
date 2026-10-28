import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, HeartHandshake, Megaphone, Package, Users } from "lucide-react";

import { Container, Display, Eyebrow, Script, Section } from "@/components/ds";
import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Stories and initiatives",
  description:
    "The stories behind Purple Project and the campaigns that carry the message into schools, clinics and communities.",
};

const STORY_THEMES = [
  {
    title: "Living with a diagnosis",
    body: "What it felt like to hear the words, what helped, and what you wish someone had said sooner.",
  },
  {
    title: "Caring for someone",
    body: "The view from beside the bed: the practicalities, the fear and the small moments that carried you.",
  },
  {
    title: "Speaking up",
    body: "Starting a conversation in your family, school, workplace or community — and what happened next.",
  },
];

const INITIATIVES = [
  {
    icon: Package,
    title: "Dignity drives",
    body: "Sanitary products and toiletries for women in cancer care, because dignity should not be a luxury.",
  },
  {
    icon: Users,
    title: "School and community talks",
    body: "Plain-language sessions on HPV, the signs of gynaecological cancer and when to ask for help.",
  },
  {
    icon: Megaphone,
    title: "Awareness month",
    body: "Every September we make more noise: sharing facts, amplifying stories and inviting others to join.",
  },
  {
    icon: HeartHandshake,
    title: "Workplace and clinic partnerships",
    body: "Bringing the conversation into the places where people already gather, work and receive care.",
  },
];

export default function SurvivorStoriesPage() {
  return (
    <main className="flex flex-1 flex-col">
      <PageHero
        eyebrow="Stories and initiatives"
        title="No one"
        accent="fights alone."
        description="Behind every statistic is a person, a family and a conversation that could have happened sooner. This is where we hold the stories and the work that carries them."
        tone="brand"
      >
        <Button
          variant="inverse"
          size="cta"
          nativeButton={false}
          render={<Link href="/share-your-story" />}
        >
          Share your story
          <ArrowRight aria-hidden />
        </Button>
      </PageHero>

      <Section tone="light">
        <Container size="wide">
          <div className="max-w-2xl">
            <Eyebrow rule className="text-primary">
              The stories
            </Eyebrow>
            <h2 className="mt-5 flex flex-col items-start">
              <Display as="span" size="sm" className="text-brand-950">
                Every story
              </Display>
              <Script size="sm" className="text-brand-700">
                matters.
              </Script>
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              We publish stories only with explicit consent, and only after the
              person has read and approved the final edit. Some people choose
              their name; others choose to stay anonymous. Both are welcome.
            </p>
          </div>

          <ul className="mt-12 grid gap-8 sm:grid-cols-3">
            {STORY_THEMES.map((theme, index) => (
              <li key={theme.title} className="border-t border-brand-200 pt-6">
                <span
                  aria-hidden
                  className="font-heading text-[0.7rem] font-bold tracking-[0.18em] text-brand-400 uppercase"
                >
                  0{index + 1}
                </span>
                <h3 className="mt-2 font-heading text-lg font-bold tracking-tight text-brand-950">
                  {theme.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {theme.body}
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-12 flex flex-wrap items-center gap-4 border-t border-border pt-6">
            <p className="text-sm leading-relaxed text-muted-foreground">
              Have a story you would like us to consider?
            </p>
            <Link
              href="/share-your-story"
              className="inline-flex items-center gap-2 font-heading text-[0.7rem] font-semibold tracking-[0.16em] text-brand-800 uppercase underline-offset-4 transition-colors outline-none hover:text-brand-600 hover:underline focus-visible:underline"
            >
              Tell us about it
              <ArrowRight aria-hidden className="size-3.5" />
            </Link>
          </div>
        </Container>
      </Section>

      <Section tone="lavender">
        <Container size="wide">
          <div className="max-w-2xl">
            <Eyebrow rule className="text-brand-700">
              Initiatives and campaigns
            </Eyebrow>
            <h2 className="mt-5 flex flex-col items-start">
              <Display as="span" size="sm" className="text-brand-950">
                The work
              </Display>
              <Script size="sm" className="text-brand-700">
                in motion.
              </Script>
            </h2>
            <p className="mt-6 text-base leading-relaxed text-brand-900/75">
              Awareness is not a single post. It is the pack handed over at a
              clinic, the question asked in a classroom and the conversation that
              continues at home.
            </p>
          </div>

          <ul className="mt-12 grid gap-px bg-brand-200 sm:grid-cols-2">
            {INITIATIVES.map(({ icon: Icon, title, body }) => (
              <li key={title} className="bg-lavender p-7 sm:p-9">
                <Icon aria-hidden className="size-5 text-brand-700" />
                <h3 className="mt-4 font-heading text-lg font-bold tracking-tight text-brand-950">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-900/75">
                  {body}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section tone="light" padding="none">
        <Container size="wide" className="py-12">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
              Want to bring an initiative to your school, workplace or community?
              We would love to hear from you.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button
                variant="brand"
                size="cta"
                nativeButton={false}
                render={<Link href="/contact" />}
              >
                Contact us
              </Button>
              <Button
                variant="brand-outline"
                size="cta"
                nativeButton={false}
                render={<Link href="/get-involved" />}
              >
                Get involved
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
