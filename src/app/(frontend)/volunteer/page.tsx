import type { Metadata } from "next";
import Link from "next/link";
import {
  Briefcase,
  CalendarDays,
  ClipboardList,
  GraduationCap,
  Megaphone,
  Package,
} from "lucide-react";

import { Container, Display, Eyebrow, Script, Section } from "@/components/ds";
import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Volunteer",
  description:
    "Give your time to Purple Project — at events, in schools, behind the scenes or with the professional skills you already have.",
};

const ROLES = [
  {
    icon: CalendarDays,
    title: "Events and awareness days",
    body: "Help us set up, welcome people, hand out resources and make every conversation feel easy to start.",
  },
  {
    icon: GraduationCap,
    title: "School and community talks",
    body: "Support workshops with young people, parents and community groups — with training and materials provided.",
  },
  {
    icon: Megaphone,
    title: "Social media and content",
    body: "Help us write, design, film or schedule content that carries the message beyond the room.",
  },
  {
    icon: ClipboardList,
    title: "Admin and coordination",
    body: "The quiet work that holds a movement together: lists, logistics, follow-ups and organising supplies.",
  },
  {
    icon: Briefcase,
    title: "Professional skills",
    body: "Legal, design, health, fundraising, accounting or project management — tell us what you do and how you would like to use it.",
  },
  {
    icon: Package,
    title: "Dignity pack days",
    body: "Join a packing session, collect supplies or help us get packs to the clinics and women who need them.",
  },
];

const STEPS = [
  {
    title: "Tell us a little about yourself",
    body: "Send us an email with your name, where you are based and the kind of help you would like to offer.",
  },
  {
    title: "Have a quick chat",
    body: "We will talk through what is coming up, what you enjoy and what would be a good fit for both of us.",
  },
  {
    title: "Get oriented",
    body: "You will receive a short introduction to the work, our safeguarding approach and the materials you need.",
  },
  {
    title: "Show up, at your pace",
    body: "Give what you can, when you can. Consistency matters more than grand gestures, and we will not ask for more than you have.",
  },
];

export default function VolunteerPage() {
  return (
    <main className="flex flex-1 flex-col">
      <PageHero
        eyebrow="Volunteer"
        title="Lend your time."
        accent="Change a life."
        description="Volunteers make the work possible — not only the big event days, but the planning, the packing and the follow-up calls in between."
        tone="lavender"
      >
        <Button
          variant="brand"
          size="cta"
          nativeButton={false}
          render={
            <a href="mailto:hello@purpleproject.org.za?subject=I%27d%20like%20to%20volunteer" />
          }
        >
          Become a volunteer
        </Button>
        <Button
          variant="brand-outline"
          size="cta"
          nativeButton={false}
          render={<Link href="/contact" />}
        >
          Ask a question
        </Button>
      </PageHero>

      <Section tone="light">
        <Container size="wide">
          <div className="max-w-2xl">
            <Eyebrow rule className="text-primary">
              Where you can help
            </Eyebrow>
            <h2 className="mt-5 flex flex-col items-start">
              <Display as="span" size="sm" className="text-brand-950">
                Find your
              </Display>
              <Script size="sm" className="text-brand-700">
                place.
              </Script>
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              You do not need a health background. You need care, reliability
              and a willingness to meet people where they are.
            </p>
          </div>

          <ul className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {ROLES.map(({ icon: Icon, title, body }) => (
              <li key={title} className="border-t border-brand-200 pt-5">
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

      <Section tone="muted">
        <Container size="wide">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div>
              <Eyebrow rule className="text-primary">
                How it works
              </Eyebrow>
              <h2 className="mt-5 flex flex-col items-start">
                <Display as="span" size="sm" className="text-brand-950">
                  From hello to
                </Display>
                <Script size="sm" className="text-brand-700">
                  helping out.
                </Script>
              </h2>
            </div>

            <ol className="space-y-8">
              {STEPS.map((step, index) => (
                <li key={step.title} className="flex gap-5">
                  <span className="flex size-9 shrink-0 items-center justify-center bg-brand-700 font-heading text-xs font-bold text-white">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="font-heading text-lg font-bold tracking-tight text-brand-950">
                      {step.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                      {step.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </Section>

      <Section tone="night" padding="none">
        <Container size="wide" className="py-16 text-center sm:py-20">
          <h2 className="flex flex-col items-center">
            <Display as="span" size="sm" className="text-white">
              Ready when
            </Display>
            <Script size="sm" className="text-brand-300">
              you are.
            </Script>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/75">
            Tell us what you enjoy doing and how much time you have. We will find
            something that fits.
          </p>
          <Button
            variant="inverse"
            size="cta"
            className="mt-8"
            nativeButton={false}
            render={
              <a href="mailto:hello@purpleproject.org.za?subject=I%27d%20like%20to%20volunteer" />
            }
          >
            Email us
          </Button>
        </Container>
      </Section>
    </main>
  );
}
