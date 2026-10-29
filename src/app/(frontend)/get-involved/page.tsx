import type { Metadata } from "next";

import { Collaboration } from "@/components/get-involved/collaboration";
import { Give } from "@/components/get-involved/give";
import { InvolvedHero } from "@/components/get-involved/hero";
import { UseYourVoice } from "@/components/get-involved/use-your-voice";
import { WaysToStart } from "@/components/get-involved/ways-to-start";
import { JoinUs } from "@/components/join-us";

export const metadata: Metadata = {
  title: "Get involved",
  description:
    "Give, volunteer, partner or share your story — there is a place for you in the Purple Project movement.",
};

export default function GetInvolvedPage() {
  return (
    <main className="flex flex-1 flex-col">
      <InvolvedHero />

      <WaysToStart />

      <Give />

      <UseYourVoice />

      <Collaboration />

      <JoinUs />
    </main>
  );
}
