import type { Metadata } from "next";

import { ShareStoryFormSection } from "@/components/share-your-story/form-section";
import { ShareStoryHero } from "@/components/share-your-story/hero";
import { SupportNote } from "@/components/share-your-story/support-note";

export const metadata: Metadata = {
  title: "Share your story",
  description:
    "Share your story of gynaecological cancer, caregiving or loss. You choose whether your name is used.",
};

export default function ShareYourStoryPage() {
  return (
    <main className="flex flex-1 flex-col">
      <ShareStoryHero />

      <ShareStoryFormSection />

      <SupportNote />
    </main>
  );
}
