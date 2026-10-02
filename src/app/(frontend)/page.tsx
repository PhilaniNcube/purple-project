


import { Hero } from "@/components/hero";
import { JoinUs } from "@/components/join-us";
import { NoShame } from "@/components/no-shame";
import { ShareTheKnowledge } from "@/components/share-the-knowledge";
import { ShiningALight } from "@/components/shining-a-light";
import { StraightFrom } from "@/components/straight-from";
import { Testimonial } from "@/components/testimonial";
import { TheNumbers } from "@/components/the-numbers";









/* -------------------------------------------------------------------------- */
/* Page                                                                       */
/* -------------------------------------------------------------------------- */

export default function DesignSystemPage() {
  return (
    <main className="flex flex-1 flex-col">
      {/* ---------------------------------------------------------------- */}
      {/* Hero — the production homepage hero                              */}
      {/* ---------------------------------------------------------------- */}
      <Hero />

      {/* ---------------------------------------------------------------- */}
      {/* No shame — "No shame. Just support."                             */}
      {/* ---------------------------------------------------------------- */}
      <NoShame />

      {/* ---------------------------------------------------------------- */}
      {/* Mission — "Shining a light on women's health, together."         */}
      {/* ---------------------------------------------------------------- */}
      <ShiningALight />

      {/* ---------------------------------------------------------------- */}
      {/* Founder — "Straight from the founder."                           */}
      {/* ---------------------------------------------------------------- */}
      <StraightFrom />

      {/* ---------------------------------------------------------------- */}
      {/* Numbers — "The numbers" watermark band                           */}
      {/* ---------------------------------------------------------------- */}
      <TheNumbers />

      {/* ---------------------------------------------------------------- */}
      {/* Knowledge — "Share the knowledge. Protect women."                */}
      {/* ---------------------------------------------------------------- */}
      <ShareTheKnowledge />

      {/* ---------------------------------------------------------------- */}
      {/* Testimonial — "In their words."                                  */}
      {/* ---------------------------------------------------------------- */}
      <Testimonial />

      {/* ---------------------------------------------------------------- */}
      {/* Join us — the closing call to action                             */}
      {/* ---------------------------------------------------------------- */}
      <JoinUs />
    </main>
  );
}
