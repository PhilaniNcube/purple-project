import type { Metadata } from "next";

import { VolunteerHero } from "@/components/volunteer/hero";
import { VolunteerSignUp } from "@/components/volunteer/sign-up";
import { WaysToHelp } from "@/components/volunteer/ways-to-help";

export const metadata: Metadata = {
  title: "Volunteer",
  description:
    "Share what you know, join us at events, pack dignity packs or start a conversation. No medical background needed.",
};

export default function VolunteerPage() {
  return (
    <main className="flex flex-1 flex-col">
      <VolunteerHero />

      <WaysToHelp />

      <VolunteerSignUp />
    </main>
  );
}
