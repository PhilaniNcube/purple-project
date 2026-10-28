import type { Metadata } from "next";
import { ColourPurple } from "@/components/get-the-facts/colour-purple";
import { FiveCancers } from "@/components/get-the-facts/five-cancers";
import { FactsHero } from "@/components/get-the-facts/hero";
import { PalliativeCare } from "@/components/get-the-facts/palliative-care";
import { Prevention } from "@/components/get-the-facts/prevention";
import { Signs } from "@/components/get-the-facts/signs";
import { TheGoal } from "@/components/get-the-facts/the-goal";

import { JoinUs } from "@/components/our-story/speak-up";

export const metadata: Metadata = {
  title: "Get the facts",
  description:
    "Know the signs of gynaecological cancer, understand your risk and learn how vaccination and screening can protect you.",
};



export default function GetTheFactsPage() {
  return (
    <main className="flex flex-1 flex-col">
      <FactsHero />
      <FiveCancers />
      <ColourPurple />
      <Prevention />
      <Signs />
      <PalliativeCare />
      <TheGoal />
      <JoinUs />
    </main>
  );
}
