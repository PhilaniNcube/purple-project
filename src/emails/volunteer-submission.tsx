import * as React from "react";

import {
  BadgeList,
  DetailRow,
  EmailLayout,
  MessageBox,
} from "@/emails/components/email-layout";

export type VolunteerSubmissionEmailProps = {
  name: string;
  email: string;
  phone: string;
  ways: string[];
  about?: string;
  submittedAt: string;
};

export function VolunteerSubmissionEmail({
  name,
  email,
  phone,
  ways,
  about,
  submittedAt,
}: VolunteerSubmissionEmailProps) {
  const telHref = `tel:${phone.replace(/[^\d+]/g, "") || phone}`;

  return (
    <EmailLayout
      preview={`New volunteer sign-up from ${name}`}
      category="Volunteer sign-up"
      headingLead="New"
      headingAccent="volunteer."
      submittedAt={submittedAt}
      replyToName={name}
      replyToEmail={email}
    >
      <DetailRow label="Name" value={name} />
      <DetailRow label="Email" value={email} href={`mailto:${email}`} />
      <DetailRow label="Phone" value={phone} href={telHref} />
      <BadgeList label="How they would like to help" items={ways} />
      {about ? <MessageBox label="A little about them" body={about} /> : null}
    </EmailLayout>
  );
}

export default VolunteerSubmissionEmail;
