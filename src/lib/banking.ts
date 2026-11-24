/**
 * Purple Project — EFT banking details & registration identifiers.
 *
 * Replace the placeholder values in `BANKING_DETAILS` and set
 * `IS_PLACEHOLDER_BANKING_DETAILS = false` once the official bank account
 * details are confirmed.
 */

export const ORGANISATION_REGISTRATIONS = {
  npo: "326-102",
  pbo: "930089773",
} as const;

export const IS_PLACEHOLDER_BANKING_DETAILS = true;

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
    value: "Purple Project NPO",
    copyValue: "Purple Project NPO",
  },
  {
    id: "bank",
    label: "Bank",
    value: "Bank Name (Placeholder)",
  },
  {
    id: "account-type",
    label: "Account type",
    value: "NPO Current / Cheque Account",
  },
  {
    id: "account-number",
    label: "Account number",
    value: "0000 0000 000",
    copyValue: "00000000000",
    mono: true,
  },
  {
    id: "branch-code",
    label: "Branch code",
    value: "000000",
    copyValue: "000000",
    mono: true,
  },
  {
    id: "swift-code",
    label: "SWIFT / BIC code",
    value: "XXXXXXXX",
    copyValue: "XXXXXXXX",
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
  const header = `Purple Project — EFT Banking Details (NPO ${ORGANISATION_REGISTRATIONS.npo} · PBO ${ORGANISATION_REGISTRATIONS.pbo})`;
  const rows = BANKING_DETAILS.map((row) => `${row.label}: ${row.value}`);
  return [header, ...rows].join("\n");
}
