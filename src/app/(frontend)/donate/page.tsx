import type { Metadata } from "next";

import { DonateHero } from "@/components/donate/hero";
import { PledgeForm } from "@/components/donate/pledge-form";
import { TwoWaysToGive } from "@/components/donate/two-ways-to-give";
import { WhereSupportGoes } from "@/components/donate/where-support-goes";
import { JoinUs } from "@/components/join-us";

export const metadata: Metadata = {
  title: "Donate",
  description:
    "Give what you can. Every gift helps a woman keep her dignity through treatment, and helps another recognise the signs sooner.",
};

// TODO: Cache Components adoption. Refactor this route so this opt-out can be removed.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

export default function DonatePage() {
  return (
    <main className="flex flex-1 flex-col">
      <DonateHero />

      <TwoWaysToGive />

      <WhereSupportGoes />

      <PledgeForm />

      <JoinUs />
    </main>
  );
}
