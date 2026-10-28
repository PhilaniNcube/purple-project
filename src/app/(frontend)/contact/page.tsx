import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, AtSign, Handshake, Mail, MessageCircle } from "lucide-react";

import { Container, Display, Eyebrow, Script, Section } from "@/components/ds";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Purple Project by email or WhatsApp, or find us on social media.",
};

const SOCIALS = [
  {
    label: "Instagram",
    handle: "@purpleproject_za",
    href: "https://www.instagram.com/purpleproject_za/",
  },
  {
    label: "Facebook",
    handle: "Purple Project Cancer Awareness",
    href: "https://www.facebook.com/purpleprojectcancerawareness",
  },
  {
    label: "LinkedIn",
    handle: "Purple Project NPO",
    href: "https://www.linkedin.com/in/purple-project-npo-399782420/",
  },
  {
    label: "TikTok",
    handle: "@purpleproject_za",
    href: "https://www.tiktok.com/@purpleproject_za",
  },
];

const QUICK_LINKS = [
  { label: "Read the FAQs", href: "/faqs" },
  { label: "Take the quiz", href: "/quiz" },
  { label: "Volunteer with us", href: "/volunteer" },
  { label: "Share your story", href: "/share-your-story" },
];

export default function ContactPage() {
  return (
    <main className="flex flex-1 flex-col">
      <PageHero
        eyebrow="Contact"
        title="Talk to us."
        accent="We are listening."
        description="Questions, ideas, invitations or a simple hello — there is a real person on the other side of this page. Choose whichever way feels easiest."
        tone="light"
      />

      <Section tone="light" padding="none" className="pb-20 sm:pb-28">
        <Container size="wide">
          <div className="grid gap-px bg-brand-200 sm:grid-cols-2">
            {/* Email */}
            <div className="bg-white p-7 sm:p-9">
              <Mail aria-hidden className="size-5 text-brand-700" />
              <h2 className="mt-4 font-heading text-xl font-bold tracking-tight text-brand-950">
                Email us
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                The best way to reach the team for most questions, requests and
                documents.
              </p>
              <a
                href="mailto:hello@purpleproject.org.za"
                className="mt-4 inline-flex items-center gap-2 font-heading text-[0.7rem] font-semibold tracking-[0.16em] text-brand-800 uppercase underline-offset-4 transition-colors outline-none hover:text-brand-600 hover:underline focus-visible:underline"
              >
                hello@purpleproject.org.za
                <ArrowUpRight aria-hidden className="size-3.5" />
              </a>
            </div>

            {/* WhatsApp */}
            <div className="bg-white p-7 sm:p-9">
              <MessageCircle aria-hidden className="size-5 text-brand-700" />
              <h2 className="mt-4 font-heading text-xl font-bold tracking-tight text-brand-950">
                WhatsApp
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Send a quick message if you would rather chat than write an
                email.
              </p>
              <a
                href="https://wa.me/27000000000"
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-2 font-heading text-[0.7rem] font-semibold tracking-[0.16em] text-brand-800 uppercase underline-offset-4 transition-colors outline-none hover:text-brand-600 hover:underline focus-visible:underline"
              >
                Message us on WhatsApp
                <ArrowUpRight aria-hidden className="size-3.5" />
              </a>
            </div>

            {/* Social */}
            <div className="bg-white p-7 sm:p-9">
              <AtSign aria-hidden className="size-5 text-brand-700" />
              <h2 className="mt-4 font-heading text-xl font-bold tracking-tight text-brand-950">
                Follow along
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Awareness travels when it is shared. Find us where you already
                spend time.
              </p>
              <ul className="mt-4 grid gap-2">
                {SOCIALS.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group inline-flex flex-wrap items-baseline gap-x-2 text-sm text-muted-foreground transition-colors outline-none hover:text-brand-700 focus-visible:text-brand-700"
                    >
                      <span className="font-medium text-foreground group-hover:text-brand-700">
                        {social.label}
                      </span>
                      <span className="text-xs">{social.handle}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Partnerships */}
            <div className="bg-white p-7 sm:p-9">
              <Handshake aria-hidden className="size-5 text-brand-700" />
              <h2 className="mt-4 font-heading text-xl font-bold tracking-tight text-brand-950">
                Partnerships and media
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                For collaborations, interviews, speaking requests or funding
                conversations, tell us a little about what you have in mind.
              </p>
              <a
                href="mailto:hello@purpleproject.org.za?subject=Partnership%20or%20media%20enquiry"
                className="mt-4 inline-flex items-center gap-2 font-heading text-[0.7rem] font-semibold tracking-[0.16em] text-brand-800 uppercase underline-offset-4 transition-colors outline-none hover:text-brand-600 hover:underline focus-visible:underline"
              >
                Start a conversation
                <ArrowUpRight aria-hidden className="size-3.5" />
              </a>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="lavender">
        <Container size="wide">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
            <div>
              <Eyebrow rule className="text-brand-700">
                Looking for something?
              </Eyebrow>
              <h2 className="mt-5 flex flex-col items-start">
                <Display as="span" size="sm" className="text-brand-950">
                  Quick
                </Display>
                <Script size="sm" className="text-brand-700">
                  links.
                </Script>
              </h2>
              <p className="mt-6 max-w-md text-base leading-relaxed text-brand-900/75">
                Many questions are already answered. If yours is not, the inbox
                above is the right place.
              </p>
            </div>

            <ul className="grid gap-px bg-brand-200 sm:grid-cols-2">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex items-center justify-between gap-4 bg-lavender px-5 py-5 font-heading text-sm font-bold tracking-tight text-brand-900 transition-colors outline-none hover:bg-white focus-visible:bg-white"
                  >
                    {link.label}
                    <ArrowUpRight aria-hidden className="size-4 text-brand-700" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>
    </main>
  );
}
