/**
 * Purple Project — EFT banking details & registration identifiers.
 */

export const ORGANISATION_REGISTRATIONS = {
  npc: "2025/337525/08",
  npo: "326-102",
  pbo: "930089773",
} as const;

export type BankingDetailRow = {
  id: string;
  label: string;
  value: string;
  /** Raw value copied to clipboard when different from display formatting. */
  copyValue?: string;
  /** Renders in tabular monospace for account and branch numbers. */
  mono?: boolean;
};

export const BANKING_DETAILS: readonly BankingDetailRow[] = [
  {
    id: "account-holder",
    label: "Account holder",
    value: "Purple Project",
    copyValue: "Purple Project",
  },
  {
    id: "bank",
    label: "Bank",
    value: "First National Bank (FNB)",
  },
  {
    id: "account-type",
    label: "Account type",
    value: "Business Account",
  },
  {
    id: "account-number",
    label: "Account number",
    value: "63216237156",
    copyValue: "63216237156",
    mono: true,
  },
  {
    id: "branch-code",
    label: "Branch code",
    value: "250655",
    copyValue: "250655",
    mono: true,
  },
  {
    id: "reference",
    label: "Payment reference",
    value: "Your Name – Donation",
    copyValue: "Donation",
  },
];

/**
 * Formats the organisation's banking details as plain text for one-click copy.
 */
export function formatBankingDetailsText(): string {
  const header = `Purple Project — EFT Banking Details (NPC ${ORGANISATION_REGISTRATIONS.npc} · NPO ${ORGANISATION_REGISTRATIONS.npo} · PBO ${ORGANISATION_REGISTRATIONS.pbo})`;
  const rows = BANKING_DETAILS.map((row) => `${row.label}: ${row.value}`);
  return [header, ...rows].join("\n");
}
