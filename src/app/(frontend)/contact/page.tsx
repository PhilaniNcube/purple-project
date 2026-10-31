import type { Metadata } from "next";

import { ContactFormSection } from "@/components/contact/contact-form";
import { GettingInTouch } from "@/components/contact/getting-in-touch";
import { ContactHero } from "@/components/contact/hero";
import { NoOneFightsAlone } from "@/components/contact/no-one-fights-alone";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "A question, a story, an idea, or something you’ve been afraid to ask. No question is too awkward here. No shame, just support.",
};

export default function ContactPage() {
  return (
    <main className="flex flex-1 flex-col">
      <ContactHero />

      <GettingInTouch />

      <ContactFormSection />

      <NoOneFightsAlone />
    </main>
  );
}
