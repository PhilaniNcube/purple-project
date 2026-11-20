import * as React from "react";

import {
  BadgeList,
  DetailRow,
  EmailLayout,
  MessageBox,
} from "@/emails/components/email-layout";

export type PartnerSubmissionEmailProps = {
  name: string;
  organisation: string;
  email: string;
  phone: string;
  partnershipTypes: string[];
  message: string;
  submittedAt: string;
};

export function PartnerSubmissionEmail({
  name,
  organisation,
  email,
  phone,
  partnershipTypes,
  message,
  submittedAt,
}: PartnerSubmissionEmailProps) {
  const telHref = `tel:${phone.replace(/[^\d+]/g, "") || phone}`;

  return (
    <EmailLayout
      preview={`Partnership enquiry from ${organisation} (${name})`}
      category="Partnership enquiry"
      headingLead="Partner"
      headingAccent="enquiry."
      submittedAt={submittedAt}
      replyToName={name}
      replyToEmail={email}
    >
      <DetailRow label="Name" value={name} />
      <DetailRow label="Organisation" value={organisation} />
      <DetailRow label="Email" value={email} href={`mailto:${email}`} />
      <DetailRow label="Phone" value={phone} href={telHref} />
      <BadgeList
        label="How they would like to partner"
        items={partnershipTypes}
      />
      <MessageBox label="Message" body={message} />
    </EmailLayout>
  );
}

export default PartnerSubmissionEmail;
