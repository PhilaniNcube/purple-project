import type { Metadata } from "next";

import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Cookie policy",
  description:
    "The cookies Purple Project uses, what they do and how you can manage them.",
};

export default function CookiePolicyPage() {
  return (
    <LegalPage
      title="Cookie policy"
      intro="We keep cookies to a minimum. This page explains what they are, which ones the site uses and how you can control them."
      updated="28 October 2026"
      sections={[
        {
          heading: "What cookies are",
          paragraphs: [
            "Cookies are small text files that a website stores in your browser. They help a site remember something between visits — for example, that you have already liked a resource or that you are signed in to an admin account.",
          ],
        },
        {
          heading: "Cookies we use",
          paragraphs: [
            "pp_visitor: an anonymous identifier created when you like or comment on a resource. It remembers your like, is not shared for advertising, and expires after one year. It is set only when you use those features.",
            "Admin session cookie: if you sign in to the Purple Project admin area, a session cookie keeps you signed in. This applies to staff and editors, not to ordinary visitors.",
            "Essential hosting cookies: our hosting provider may set technical cookies needed to serve the site securely and reliably.",
          ],
        },
        {
          heading: "What we do not use",
          paragraphs: [
            "We do not currently use advertising cookies or third-party behavioural tracking cookies. If that changes, we will update this page and, where required, ask for your consent first.",
          ],
        },
        {
          heading: "Managing cookies",
          paragraphs: [
            "You can block or delete cookies through your browser settings. If you block the pp_visitor cookie, the site may not remember your likes. Blocking all cookies may affect how parts of the site work.",
            "For guidance, look for the privacy or cookie settings in your browser’s menu.",
          ],
        },
        {
          heading: "More information",
          paragraphs: [
            "For more about how we handle personal information, read our privacy policy. Questions can be sent to hello@purpleproject.org.za.",
          ],
        },
      ]}
    />
  );
}
