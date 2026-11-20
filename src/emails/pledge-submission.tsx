import * as React from "react";

import {
  BadgeList,
  DetailRow,
  EmailLayout,
  MessageBox,
} from "@/emails/components/email-layout";

export type PledgeSubmissionEmailProps = {
  name: string;
  email: string;
  phone: string;
  items: string[];
  quantity: string;
  handover: string;
  message?: string;
  submittedAt: string;
};

export function PledgeSubmissionEmail({
  name,
  email,
  phone,
  items,
  quantity,
  handover,
  message,
  submittedAt,
}: PledgeSubmissionEmailProps) {
  const telHref = `tel:${phone.replace(/[^\d+]/g, "") || phone}`;

  return (
    <EmailLayout
      preview={`New in-kind pledge from ${name}: ${items.join(", ")}`}
      category="In-kind pledge"
      headingLead="In-kind"
      headingAccent="pledge."
      submittedAt={submittedAt}
      replyToName={name}
      replyToEmail={email}
    >
      <DetailRow label="Name" value={name} />
      <DetailRow label="Email" value={email} href={`mailto:${email}`} />
      <DetailRow label="Phone" value={phone} href={telHref} />
      <BadgeList label="Items pledged" items={items} />
      <DetailRow label="Roughly how much" value={quantity} />
      <DetailRow label="Hand-over" value={handover} />
      {message ? <MessageBox label="Message" body={message} /> : null}
    </EmailLayout>
  );
}

export default PledgeSubmissionEmail;
