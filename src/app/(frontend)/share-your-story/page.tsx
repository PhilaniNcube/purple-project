import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";

import { Container, Display, Eyebrow, Script, Section } from "@/components/ds";
import { PageHero } from "@/components/page-hero";
import { ShareStoryForm } from "@/components/share-story-form";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Share your story",
  description:
    "Share your experience of gynaecological cancer, caregiving or advocacy. You choose how your story is credited.",
};

const LOOKING_FOR = [
  "Living with or beyond a gynaecological cancer diagnosis.",
  "Caring for someone who has been through treatment.",
  "Advocating in your community, school, clinic or workplace.",
  "Working in healthcare and seeing the gaps firsthand.",
];

const PROMISES = [
  "We will ask before we publish anything.",
  "You can choose to stay anonymous.",
  "You can read and approve the final edit.",
  "You can change your mind and withdraw your story.",
];

export default function ShareYourStoryPage() {
  return (
    <main className="flex flex-1 flex-col">
      <PageHero
        eyebrow="Share your story"
        title="Your story"
        accent="could help someone feel less alone."
        description="The conversations that change outcomes often start with someone saying, “that happened to me too.” If you have a story to share, we would be honoured to hear it."
        tone="lavender"
      />

      <Section tone="light">
        <Container size="wide">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <Eyebrow rule className="text-primary">
                What we are looking for
              </Eyebrow>
              <h2 className="mt-5 flex flex-col items-start">
                <Display as="span" size="sm" className="text-brand-950">
                  Any experience
                </Display>
                <Script size="sm" className="text-brand-700">
                  counts.
                </Script>
              </h2>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                You do not need a neat ending or a public platform. A few honest
                sentences about what you wish you had known, or what helped, can
                be enough.
              </p>
              <ul className="mt-8 space-y-3">
                {LOOKING_FOR.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm leading-relaxed text-foreground"
                  >
                    <span
                      aria-hidden
                      className="mt-0.5 flex size-5 shrink-0 items-center justify-center bg-brand-700 text-white"
                    >
                      <Check className="size-3" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="border border-brand-200 bg-brand-50/60 p-7 sm:p-10">
              <Eyebrow rule className="text-brand-700">
                Our promise
              </Eyebrow>
              <h2 className="mt-5 font-heading text-2xl font-bold tracking-tight text-brand-950 sm:text-3xl">
                Your story stays yours.
              </h2>
              <ul className="mt-6 space-y-4">
                {PROMISES.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm leading-relaxed text-brand-900/80"
                  >
                    <span
                      aria-hidden
                      className="mt-2 size-1.5 shrink-0 bg-brand-700"
                    />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-8 border-t border-brand-200 pt-5 text-xs leading-relaxed text-muted-foreground">
                We are not able to offer counselling through this form. If you
                need urgent medical help, contact your doctor or local emergency
                services.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="lavender">
        <Container size="wide">
          <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
            <div>
              <Eyebrow rule className="text-brand-700">
                Tell us
              </Eyebrow>
              <h2 className="mt-5 flex flex-col items-start">
                <Display as="span" size="sm" className="text-brand-950">
                  Start with
                </Display>
                <Script size="sm" className="text-brand-700">
                  what feels right.
                </Script>
              </h2>
              <p className="mt-6 text-base leading-relaxed text-brand-900/75">
                Share as much or as little as you like. A member of the team will
                read it and reply to you personally before anything goes further.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-brand-900/75">
                Prefer to write separately? Email{" "}
                <a
                  href="mailto:hello@purpleproject.org.za?subject=Share%20your%20story"
                  className="font-medium text-brand-700 underline underline-offset-2"
                >
                  hello@purpleproject.org.za
                </a>
                .
              </p>
            </div>

            <div className="border border-brand-200 bg-white p-7 sm:p-10">
              <ShareStoryForm />
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="light" padding="none">
        <Container size="wide" className="border-t border-border py-10">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm leading-relaxed text-muted-foreground">
              Looking for information instead? The facts page covers signs,
              screening and prevention.
            </p>
            <Button
              variant="brand-outline"
              size="cta"
              nativeButton={false}
              render={<Link href="/get-the-facts" />}
            >
              Get the facts
            </Button>
          </div>
        </Container>
      </Section>
    </main>
  );
}
