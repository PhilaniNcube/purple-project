import { OurStoryFounder } from "@/components/our-story/founder";
import { OurStoryHero } from "@/components/our-story/hero";

export default function OurStoryPage() {
  return (
    <main className="flex flex-1 flex-col">
      <OurStoryHero />
      <OurStoryFounder />
    </main>
  );
}
