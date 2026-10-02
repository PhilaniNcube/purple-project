import { JoinUs } from "@/components/join-us";
import { OurStoryFounder } from "@/components/our-story/founder";
import { OurStoryHero } from "@/components/our-story/hero";
import { OurStoryReason } from "@/components/our-story/reason";

export default function OurStoryPage() {
  return (
    <main className="flex flex-1 flex-col">
      <OurStoryHero />
      <OurStoryFounder />
      <OurStoryReason />
      <JoinUs />
    </main>
  );
}
