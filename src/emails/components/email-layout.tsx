import * as React from "react";
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "react-email";

const FONT_SANS =
  'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';
const FONT_SERIF = 'Georgia, "Times New Roman", serif';

const COLORS = {
  brand50: "#f7f6ff",
  brand100: "#eeebff",
  brand200: "#ded7ff",
  brand700: "#6e25d9",
  brand800: "#591cb4",
  brand950: "#301064",
  ink50: "#fafafb",
  ink200: "#e5e5e8",
  ink500: "#737377",
  ink700: "#403f44",
  ink900: "#131215",
  white: "#ffffff",
} as const;

type EmailLayoutProps = {
  preview: string;
  category: string;
  headingLead: string;
  headingAccent: string;
  submittedAt: string;
  replyToName?: string;
  replyToEmail: string;
  children: React.ReactNode;
};

/**
 * Shared Purple Project transactional email frame.
 *
 * Uses inline styles and hex colour values from `DESIGN.md` with square
 * corners so email clients render the brand identity reliably without CSS
 * variables or `oklch()`.
 */
export function EmailLayout({
  preview,
  category,
  headingLead,
  headingAccent,
  submittedAt,
  replyToName,
  replyToEmail,
  children,
}: EmailLayoutProps) {
  const replyTarget = replyToName
    ? `${replyToName} (${replyToEmail})`
    : replyToEmail;

  return (
    <Html lang="en">
      <Head />
      <Preview>{preview}</Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          {/* Top brand bar */}
          <Section style={styles.topBar}>
            <Text style={styles.brandMark}>PURPLE PROJECT</Text>
            <Text style={styles.categoryLabel}>{category}</Text>
          </Section>

          {/* Lavender intro band with two-voice lockup */}
          <Section style={styles.introBand}>
            <Heading as="h1" style={styles.heading}>
              <span style={styles.headingLead}>{headingLead} </span>
              <span style={styles.headingAccent}>{headingAccent}</span>
            </Heading>
            <Text style={styles.timestamp}>Received {submittedAt}</Text>
          </Section>

          {/* Submission details */}
          <Section style={styles.contentSection}>
            {children}

            <Section style={styles.replyBox}>
              <Text style={styles.replyBoxText}>
                <strong style={styles.replyBoxStrong}>Reply directly:</strong>{" "}
                hit Reply in your mail app to write back to {replyTarget}.
              </Text>
            </Section>
          </Section>

          {/* Footer */}
          <Section style={styles.footer}>
            <Text style={styles.footerMission}>
              Purple Project · No Shame, Just Support. No One Fights Alone.
            </Text>
            <Text style={styles.footerReg}>
              NPO 326-102 · PBO 930089773
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

type DetailRowProps = {
  label: string;
  value: string;
  href?: string;
};

/** Labelled single-value detail block. */
export function DetailRow({ label, value, href }: DetailRowProps) {
  return (
    <Section style={styles.detailRow}>
      <Text style={styles.fieldLabel}>{label}</Text>
      {href ? (
        <Text style={styles.fieldValue}>
          <Link href={href} style={styles.link}>
            {value}
          </Link>
        </Text>
      ) : (
        <Text style={styles.fieldValue}>{value}</Text>
      )}
    </Section>
  );
}

type MessageBoxProps = {
  label: string;
  body: string;
};

/** Bordered callout for longer visitor messages and stories. */
export function MessageBox({ label, body }: MessageBoxProps) {
  return (
    <Section style={styles.messageSection}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <Section style={styles.messageBox}>
        <Text style={styles.messageText}>{body}</Text>
      </Section>
    </Section>
  );
}

type BadgeListProps = {
  label: string;
  items: readonly string[] | string[];
};

/** Group of square lavender badges for multi-select options. */
export function BadgeList({ label, items }: BadgeListProps) {
  return (
    <Section style={styles.detailRow}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <Text style={styles.badgeContainer}>
        {items.map((item) => (
          <span key={item} style={styles.badge}>
            {item}
          </span>
        ))}
      </Text>
    </Section>
  );
}

/** Highlighted notice box (e.g. anonymity reminders). */
export function NoticeBox({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  return (
    <Section style={styles.noticeBox}>
      <Text style={styles.noticeTitle}>{title}</Text>
      <Text style={styles.noticeBody}>{body}</Text>
    </Section>
  );
}

const styles = {
  body: {
    backgroundColor: COLORS.brand50,
    fontFamily: FONT_SANS,
    margin: "0",
    padding: "32px 16px",
  },
  container: {
    backgroundColor: COLORS.white,
    border: `1px solid ${COLORS.brand200}`,
    borderRadius: "0px",
    margin: "0 auto",
    maxWidth: "600px",
    width: "100%",
  },
  topBar: {
    backgroundColor: COLORS.brand800,
    padding: "20px 32px",
  },
  brandMark: {
    color: COLORS.white,
    fontFamily: FONT_SANS,
    fontSize: "13px",
    fontWeight: "800",
    letterSpacing: "0.2em",
    lineHeight: "1.2",
    margin: "0",
    textTransform: "uppercase" as const,
  },
  categoryLabel: {
    color: COLORS.brand200,
    fontFamily: FONT_SANS,
    fontSize: "11px",
    fontWeight: "600",
    letterSpacing: "0.18em",
    lineHeight: "1.4",
    margin: "6px 0 0 0",
    textTransform: "uppercase" as const,
  },
  introBand: {
    backgroundColor: COLORS.brand100,
    borderBottom: `1px solid ${COLORS.brand200}`,
    padding: "28px 32px",
  },
  heading: {
    margin: "0",
    lineHeight: "1.15",
  },
  headingLead: {
    color: COLORS.brand950,
    fontFamily: FONT_SANS,
    fontSize: "24px",
    fontWeight: "800",
    letterSpacing: "-0.015em",
    textTransform: "uppercase" as const,
  },
  headingAccent: {
    color: COLORS.brand700,
    fontFamily: FONT_SERIF,
    fontSize: "26px",
    fontStyle: "italic",
    fontWeight: "500",
    textTransform: "none" as const,
  },
  timestamp: {
    color: COLORS.ink700,
    fontFamily: FONT_SANS,
    fontSize: "12px",
    lineHeight: "1.4",
    margin: "10px 0 0 0",
  },
  contentSection: {
    padding: "28px 32px",
  },
  detailRow: {
    borderBottom: `1px solid ${COLORS.ink200}`,
    paddingBottom: "14px",
    marginBottom: "14px",
  },
  fieldLabel: {
    color: COLORS.brand700,
    fontFamily: FONT_SANS,
    fontSize: "11px",
    fontWeight: "700",
    letterSpacing: "0.16em",
    lineHeight: "1.3",
    margin: "0 0 5px 0",
    textTransform: "uppercase" as const,
  },
  fieldValue: {
    color: COLORS.ink900,
    fontFamily: FONT_SANS,
    fontSize: "15px",
    lineHeight: "1.55",
    margin: "0",
  },
  link: {
    color: COLORS.brand700,
    textDecoration: "underline",
  },
  badgeContainer: {
    margin: "4px 0 0 0",
    lineHeight: "1.8",
  },
  badge: {
    backgroundColor: COLORS.brand100,
    border: `1px solid ${COLORS.brand200}`,
    borderRadius: "0px",
    color: COLORS.brand950,
    display: "inline-block",
    fontFamily: FONT_SANS,
    fontSize: "13px",
    fontWeight: "600",
    marginRight: "6px",
    marginBottom: "6px",
    padding: "4px 10px",
  },
  messageSection: {
    marginBottom: "20px",
  },
  messageBox: {
    backgroundColor: COLORS.ink50,
    borderLeft: `3px solid ${COLORS.brand700}`,
    padding: "14px 16px",
  },
  messageText: {
    color: COLORS.ink900,
    fontFamily: FONT_SANS,
    fontSize: "15px",
    lineHeight: "1.65",
    margin: "0",
    whiteSpace: "pre-wrap" as const,
  },
  noticeBox: {
    backgroundColor: COLORS.brand100,
    border: `1px solid ${COLORS.brand200}`,
    borderLeft: `3px solid ${COLORS.brand800}`,
    marginBottom: "18px",
    padding: "12px 16px",
  },
  noticeTitle: {
    color: COLORS.brand950,
    fontFamily: FONT_SANS,
    fontSize: "11px",
    fontWeight: "700",
    letterSpacing: "0.16em",
    lineHeight: "1.3",
    margin: "0 0 4px 0",
    textTransform: "uppercase" as const,
  },
  noticeBody: {
    color: COLORS.brand950,
    fontFamily: FONT_SANS,
    fontSize: "13px",
    lineHeight: "1.5",
    margin: "0",
  },
  replyBox: {
    backgroundColor: COLORS.brand50,
    border: `1px solid ${COLORS.brand200}`,
    marginTop: "20px",
    padding: "14px 18px",
  },
  replyBoxText: {
    color: COLORS.ink700,
    fontFamily: FONT_SANS,
    fontSize: "13px",
    lineHeight: "1.5",
    margin: "0",
  },
  replyBoxStrong: {
    color: COLORS.brand950,
  },
  footer: {
    borderTop: `1px solid ${COLORS.ink200}`,
    padding: "20px 32px",
  },
  footerMission: {
    color: COLORS.ink500,
    fontFamily: FONT_SANS,
    fontSize: "12px",
    lineHeight: "1.5",
    margin: "0",
  },
  footerReg: {
    color: COLORS.ink500,
    fontFamily: FONT_SANS,
    fontSize: "11px",
    letterSpacing: "0.08em",
    lineHeight: "1.5",
    margin: "4px 0 0 0",
  },
} as const;
