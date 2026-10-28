import { JoinUs } from "@/components/join-us";
import { OurStoryFounder } from "@/components/our-story/founder";
import { OurStoryHero } from "@/components/our-story/hero";
import Initiatives from "@/components/our-story/initiatives";
import { OurStoryReason } from "@/components/our-story/reason";
import { OurStoryStronger } from "@/components/our-story/stronger";

export default function OurStoryPage({
  searchParams,
}: Pick<PageProps<"/our-story">, "searchParams">) {
  return (
    <main className="flex flex-1 flex-col">
      <OurStoryHero />
      <OurStoryFounder />
      <OurStoryReason />
      <OurStoryStronger />
      <Initiatives searchParams={searchParams} />
      <JoinUs />
    </main>
  );
}
