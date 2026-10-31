import type { Metadata } from "next";

import { PartnerEnquiry } from "@/components/partner-with-us/enquiry";
import { PartnerHero } from "@/components/partner-with-us/hero";
import { Relate } from "@/components/partner-with-us/relate";
import { WaysToPartner } from "@/components/partner-with-us/ways-to-partner";

export const metadata: Metadata = {
  title: "Partner with us",
  description:
    "Partner with Purple Project through financial support, in-kind gifts, campaign support or community outreach.",
};

export default function PartnerWithUsPage() {
  return (
    <main className="flex flex-1 flex-col">
      <PartnerHero />

      <WaysToPartner />

      <Relate />

      <PartnerEnquiry />
    </main>
  );
}
