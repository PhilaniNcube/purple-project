import { ArrowUpRight, Mail } from "lucide-react";

import { ContactMessageForm } from "@/components/contact/contact-message-form";
import { Container, Section } from "@/components/ds";
import { FacebookIcon, InstagramIcon } from "@/components/footer";
import { CONTACT_EMAIL } from "@/lib/contact";

/** Channels listed under 04 FIND US in the copy deck. */
const CHANNELS = [
  {
    label: "Email",
    handle: CONTACT_EMAIL,
    href: `mailto:${CONTACT_EMAIL}`,
    icon: Mail,
    external: false,
  },
  {
    label: "Instagram",
    handle: "@purpleproject_za",
    href: "https://www.instagram.com/purpleproject_za/",
    icon: InstagramIcon,
    external: true,
  },
  {
    label: "Facebook",
    handle: "/purpleprojectcancerawareness",
    href: "https://www.facebook.com/purpleprojectcancerawareness",
    icon: FacebookIcon,
    external: true,
  },
] as const;

/**
 * Contact form + Find us — Sections 03 and 04 of the Contact page.
 *
 * Follows the Donate page's `PledgeForm` layout: an editorial left column
 * carrying the two-voice headline lockup, then a sharp, square-cornered form
 * panel on the right. The left column also holds the "Find us" channels, so
 * visitors who would rather email or DM directly see those options alongside
 * the form instead of below it.
 */
export function ContactFormSection() {
  return (
    <Section id="contact-form" tone="lavender" className="scroll-mt-20">
      <Container size="wide">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-16">
          {/* Editorial intro column */}
          <div>
            <h2 className="flex w-full flex-col items-start">
              <span className="block font-heading text-display-md tracking-[0.02em] text-brand-800 uppercase text-outline-2">
                Say hello
              </span>
              <span className="mt-1 block font-display italic text-brand-700 sm:mt-2 lg:text-script-md">
                we&rsquo;re listening
              </span>
            </h2>

            <p className="mt-6 max-w-md text-base leading-relaxed text-pretty text-brand-900/80">
              Tell us a little about who you are and what&rsquo;s on your mind.
              A real person reads every message.
            </p>

            {/* 04 FIND US */}
            <div className="mt-12">
              <p className="font-heading text-[0.7rem] font-bold tracking-[0.18em] text-brand-700 uppercase">
                Find us
              </p>

              <ul className="mt-4 grid gap-px bg-brand-200">
                {CHANNELS.map((channel) => {
                  const Icon = channel.icon;

                  return (
                    <li key={channel.label}>
                      <a
                        href={channel.href}
                        {...(channel.external
                          ? { target: "_blank", rel: "noreferrer" }
                          : {})}
                        className="group flex items-center gap-4 bg-lavender px-1 py-4 transition-colors outline-none hover:bg-white/60 focus-visible:bg-white/60 sm:px-3"
                      >
                        <span className="flex size-10 shrink-0 items-center justify-center bg-white text-brand-700 transition-colors group-hover:bg-brand-700 group-hover:text-white">
                          <Icon aria-hidden className="size-4" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block font-heading text-[0.65rem] font-semibold tracking-[0.16em] text-brand-700 uppercase">
                            {channel.label}
                          </span>
                          <span className="block truncate text-sm font-medium text-brand-950">
                            {channel.handle}
                          </span>
                        </span>
                        <ArrowUpRight
                          aria-hidden
                          className="size-4 shrink-0 text-brand-700 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          {/* Form panel */}
          <div className="border border-brand-200 bg-white p-7 shadow-xs sm:p-10">
            <ContactMessageForm />
          </div>
        </div>
      </Container>
    </Section>
  );
}
