"use client";

import * as React from "react";
import { type VariantProps } from "class-variance-authority";
import { Check, Copy, ExternalLink, Mail, X } from "lucide-react";
import { cn } from "cn";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogPopup,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  BANKING_DETAILS,
  formatBankingDetailsText,
  IS_PLACEHOLDER_BANKING_DETAILS,
  ORGANISATION_REGISTRATIONS,
} from "@/lib/banking";
import { DESK_EMAIL } from "@/lib/contact";

const PROOF_OF_PAYMENT_HREF = `mailto:${DESK_EMAIL}?subject=Online%20donation%20%E2%80%94%20Purple%20Project`;
const PAYMENT_PORTAL_URL = process.env.NEXT_PUBLIC_PAYMENT_URL;

export type DonateOnlineModalProps = VariantProps<typeof buttonVariants> & {
  className?: string;
  children: React.ReactNode;
};

/**
 * Trigger button and modal dialog presenting Purple Project's EFT banking
 * details, copy-to-clipboard actions, and proof-of-payment contact link.
 */
export function DonateOnlineModal({
  variant = "brand",
  size = "cta",
  className,
  children,
}: DonateOnlineModalProps) {
  const [open, setOpen] = React.useState(false);
  const [copiedFieldId, setCopiedFieldId] = React.useState<string | null>(null);
  const [copiedAll, setCopiedAll] = React.useState(false);
  const [manualCopyText, setManualCopyText] = React.useState<string | null>(
    null,
  );
  const timeoutRef = React.useRef<number | null>(null);

  const clearFeedbackTimeout = React.useCallback(() => {
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  React.useEffect(() => {
    return () => {
      clearFeedbackTimeout();
    };
  }, [clearFeedbackTimeout]);

  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen);
    if (!nextOpen) {
      clearFeedbackTimeout();
      setCopiedFieldId(null);
      setCopiedAll(false);
      setManualCopyText(null);
    }
  }

  async function copyText(value: string, fieldId?: string) {
    clearFeedbackTimeout();

    try {
      if (!navigator.clipboard) {
        throw new Error("Clipboard unavailable");
      }

      await navigator.clipboard.writeText(value);
      setManualCopyText(null);

      if (fieldId) {
        setCopiedAll(false);
        setCopiedFieldId(fieldId);
        timeoutRef.current = window.setTimeout(() => {
          setCopiedFieldId(null);
          timeoutRef.current = null;
        }, 2000);
      } else {
        setCopiedFieldId(null);
        setCopiedAll(true);
        timeoutRef.current = window.setTimeout(() => {
          setCopiedAll(false);
          timeoutRef.current = null;
        }, 2500);
      }
    } catch {
      setCopiedFieldId(null);
      setCopiedAll(false);
      setManualCopyText(formatBankingDetailsText());
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger
        render={
          <button
            type="button"
            data-slot="button"
            className={cn(
              buttonVariants({ variant, size, className }),
              "cursor-pointer active:scale-[0.97]",
            )}
          />
        }
      >
        {children}
      </DialogTrigger>

      <DialogPopup>
        {/* Fixed brand-purple header */}
        <div className="shrink-0 bg-brand-800 ps-6 pe-6 pbs-5 pbe-5 text-white sm:ps-8 sm:pe-8 sm:pbs-6 sm:pbe-6">
          <div className="flex items-start justify-between gap-4">
            <p className="font-heading text-[0.7rem] font-semibold tracking-[0.18em] text-brand-200 uppercase">
              EFT &amp; online giving · NPO {ORGANISATION_REGISTRATIONS.npo} · PBO{" "}
              {ORGANISATION_REGISTRATIONS.pbo}
            </p>

            <DialogClose
              aria-label="Close donation modal"
              className="inline-flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-none text-white/85 transition-colors hover:bg-white/10 hover:text-white active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <X aria-hidden className="size-5" />
            </DialogClose>
          </div>

          <DialogTitle className="mbs-2 text-white">
            <span className="font-heading text-display-xs uppercase text-white">
              Donate{" "}
            </span>
            <span className="font-display text-script-sm normal-case italic text-brand-200">
              online.
            </span>
          </DialogTitle>

          <DialogDescription className="mbs-2 [max-inline-size:32rem] text-sm leading-relaxed text-white/85">
            Support community workshops, early detection and dignified care for
            women in treatment via direct EFT.
          </DialogDescription>
        </div>

        {/* Scrollable body */}
        <div
          data-lenis-prevent=""
          className="[min-block-size:0px] flex-1 overflow-y-auto overscroll-contain ps-6 pe-6 pbs-6 pbe-6 [scrollbar-gutter:stable] sm:ps-8 sm:pe-8"
        >
          {IS_PLACEHOLDER_BANKING_DETAILS ? (
            <div
              role="note"
              className="mbe-5 border-is-3 border-brand-700 bg-lavender/75 ps-4 pe-4 pbs-3 pbe-3 text-xs leading-relaxed text-brand-950"
            >
              Placeholder banking details — official Purple Project account
              details are being finalised and will replace the placeholders
              below shortly.
            </div>
          ) : null}

          <dl className="divide-y divide-brand-200/80 border-bs border-be border-brand-200/80">
            {BANKING_DETAILS.map((row) => {
              const isCopied = copiedFieldId === row.id;

              return (
                <div
                  key={row.id}
                  className="flex flex-wrap items-center justify-between gap-3 pbs-3.5 pbe-3.5"
                >
                  <div className="[min-inline-size:0px]">
                    <dt className="font-heading text-[0.7rem] font-semibold tracking-[0.16em] text-ink-500 uppercase">
                      {row.label}
                    </dt>
                    <dd
                      className={cn(
                        "mbs-1 text-sm font-semibold text-brand-950 sm:text-base",
                        row.mono && "font-mono tracking-wider tabular-nums",
                      )}
                    >
                      {row.value}
                    </dd>
                  </div>

                  {row.copyValue ? (
                    <button
                      type="button"
                      onClick={() => copyText(row.copyValue!, row.id)}
                      aria-label={`Copy ${row.label}`}
                      aria-live="polite"
                      className="relative inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-none border border-brand-200 bg-white ps-2.5 pe-2.5 pbs-1.5 pbe-1.5 text-xs font-medium text-brand-800 transition-colors after:absolute after:inset-[min(0px,(100%-44px)/2)] hover:border-brand-400 hover:bg-lavender/60 active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
                    >
                      {isCopied ? (
                        <>
                          <Check aria-hidden className="size-3.5" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy aria-hidden className="size-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  ) : null}
                </div>
              );
            })}
          </dl>

          <p className="mbs-5 text-xs leading-relaxed text-ink-600">
            Please email your proof of payment or any Section 18A tax receipt
            enquiries to{" "}
            <a
              href={PROOF_OF_PAYMENT_HREF}
              className="font-medium text-brand-700 underline underline-offset-2 hover:text-brand-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
            >
              {DESK_EMAIL}
            </a>
            .
          </p>

          {PAYMENT_PORTAL_URL ? (
            <p className="mbs-3 text-xs leading-relaxed text-ink-600">
              Prefer card or instant EFT?{" "}
              <a
                href={PAYMENT_PORTAL_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 font-medium text-brand-700 underline underline-offset-2 hover:text-brand-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
              >
                <span>Open online payment portal</span>
                <ExternalLink aria-hidden className="size-3" />
              </a>
            </p>
          ) : null}

          {manualCopyText ? (
            <div className="mbs-4">
              <label
                htmlFor="manual-banking-copy"
                className="block text-xs font-medium text-brand-950"
              >
                Clipboard access is unavailable here. Select and copy the
                details below:
              </label>
              <Textarea
                id="manual-banking-copy"
                readOnly
                rows={8}
                value={manualCopyText}
                onFocus={(event) => event.currentTarget.select()}
                className="mbs-2 font-mono text-xs"
              />
            </div>
          ) : null}
        </div>

        {/* Fixed footer */}
        <div className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-bs border-brand-200 bg-ink-50 ps-6 pe-6 pbs-4 pbe-4 sm:ps-8 sm:pe-8 sm:pbs-5 sm:pbe-5">
          <Button
            type="button"
            variant="brand"
            size="cta"
            onClick={() => copyText(formatBankingDetailsText())}
            aria-live="polite"
            className="cursor-pointer active:scale-[0.97]"
          >
            {copiedAll ? (
              <>
                <Check aria-hidden className="size-4" />
                <span>Details copied</span>
              </>
            ) : (
              <>
                <Copy aria-hidden className="size-4" />
                <span>Copy all details</span>
              </>
            )}
          </Button>

          <Button
            variant="brand-outline"
            size="cta"
            nativeButton={false}
            className="active:scale-[0.97]"
            render={<a href={PROOF_OF_PAYMENT_HREF} />}
          >
            <Mail aria-hidden className="size-4" />
            <span>Email proof of payment</span>
          </Button>
        </div>
      </DialogPopup>
    </Dialog>
  );
}
