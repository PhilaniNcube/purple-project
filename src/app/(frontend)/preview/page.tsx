import { JoinUs } from "@/components/join-us";
import { Testimonial } from "@/components/testimonial";

export default function PreviewPage() {
  return (
    <main className="flex flex-1 flex-col pt-24">
      <Testimonial />
      <JoinUs />
    </main>
  );
}
