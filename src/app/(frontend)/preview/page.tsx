import { JoinUs } from "@/components/join-us";
import { Testimonial } from "@/components/testimonial";

// TODO: Cache Components adoption. Refactor this route so this opt-out can be removed.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

export default function PreviewPage() {
  return (
    <main className="flex flex-1 flex-col pt-24">
      <Testimonial />
      <JoinUs />
    </main>
  );
}
