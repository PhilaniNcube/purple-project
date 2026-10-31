"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "cn";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const CONTACT_EMAIL = "hello@purpleproject.org.za";

/** The partnership routes listed in the enquiry form. */
const PARTNERSHIP_TYPES = [
  "Financial support",
  "In-kind gifts",
  "Campaign sponsorship",
  "Community outreach",
  "Not sure yet",
] as const;

/**
 * Partnership enquiry form.
 *
 * The site has no partnership inbox wired up yet, so the form composes a
 * pre-filled email in the visitor's own mail app. That keeps the enquiry
 * deliberate, gives the sender a copy of what they sent and means no company
 * or personal detail is stored on the website.
 */
export function PartnerEnquiryForm() {
  const [selectedTypes, setSelectedTypes] = React.useState<string[]>([]);
  const [typeError, setTypeError] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);

  function toggleType(type: string) {
    setSelectedTypes((current) => {
      const next = current.includes(type)
        ? current.filter((entry) => entry !== type)
        : [...current, type];

      if (next.length > 0) setTypeError(false);
      return next;
    });
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (selectedTypes.length === 0) {
      setTypeError(true);
      return;
    }

    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const organisation = String(data.get("organisation") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const subject = encodeURIComponent(
      `Partnership enquiry — ${organisation || name}`,
    );
    const body = encodeURIComponent(
      [
        `Name: ${name}`,
        `Organisation: ${organisation}`,
        `Email: ${email}`,
        `Phone: ${phone}`,
        `How would you like to partner?: ${selectedTypes.join(", ")}`,
        "",
        "Message:",
        message,
      ].join("\n"),
    );

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="flex flex-col items-start py-6"
      >
        <span className="flex size-12 items-center justify-center bg-brand-700 text-white">
          <Check aria-hidden className="size-6" strokeWidth={2.5} />
        </span>

        <p className="mt-6 max-w-xl font-display text-2xl leading-snug text-pretty text-brand-700 italic sm:text-3xl">
          Thank you for your interest in partnering with Purple Project.
        </p>

        <p className="mt-3 text-base leading-relaxed text-foreground">
          We&rsquo;ll be in touch shortly to talk through the possibilities.
        </p>

        <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
          Your email app should also open with your enquiry ready to send. If it
          did not open automatically, you can email us directly at{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}?subject=Partnership%20enquiry`}
            className="font-medium text-brand-700 underline underline-offset-2"
          >
            {CONTACT_EMAIL}
          </a>
          .
        </p>

        <Button
          type="button"
          variant="brand-outline"
          size="cta"
          className="mt-8"
          onClick={() => setSubmitted(false)}
        >
          Back to form
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="partner-name">Name</Label>
          <Input
            id="partner-name"
            name="name"
            required
            maxLength={100}
            autoComplete="name"
            placeholder="Your name"
            className="h-10"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="partner-organisation">Organisation</Label>
          <Input
            id="partner-organisation"
            name="organisation"
            required
            maxLength={160}
            autoComplete="organization"
            placeholder="Your organisation"
            className="h-10"
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="partner-email">Email</Label>
          <Input
            id="partner-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            className="h-10"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="partner-phone">Phone</Label>
          <Input
            id="partner-phone"
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            placeholder="e.g. 082 000 0000"
            className="h-10"
          />
        </div>
      </div>

      <fieldset className="grid gap-2.5">
        <legend className="text-sm leading-none font-medium text-foreground">
          How would you like to partner?
        </legend>

        <div className="mt-1 grid gap-2.5 sm:grid-cols-2">
          {PARTNERSHIP_TYPES.map((type) => {
            const checked = selectedTypes.includes(type);

            return (
              <label
                key={type}
                className={cn(
                  "flex cursor-pointer items-center gap-3 border px-3.5 py-3 text-sm transition-colors select-none has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring/50",
                  checked
                    ? "border-brand-700 bg-lavender/75 font-medium text-brand-950"
                    : "border-input bg-white text-foreground hover:border-brand-300 hover:bg-brand-50/50",
                )}
              >
                <input
                  type="checkbox"
                  name="partnership"
                  value={type}
                  checked={checked}
                  onChange={() => toggleType(type)}
                  className="sr-only"
                />
                <span
                  aria-hidden
                  className={cn(
                    "flex size-4 shrink-0 items-center justify-center border transition-colors",
                    checked
                      ? "border-brand-700 bg-brand-700 text-white"
                      : "border-ink-300 bg-white",
                  )}
                >
                  {checked ? (
                    <Check className="size-3" strokeWidth={3} />
                  ) : null}
                </span>
                <span>{type}</span>
              </label>
            );
          })}
        </div>

        {typeError ? (
          <p role="alert" className="text-xs text-destructive">
            Please select at least one way you would like to partner.
          </p>
        ) : null}
      </fieldset>

      <div className="grid gap-2">
        <Label htmlFor="partner-message">Message</Label>
        <Textarea
          id="partner-message"
          name="message"
          required
          rows={5}
          maxLength={2000}
          placeholder="Tell us a little about your organisation and what you have in mind"
        />
      </div>

      <div className="flex flex-wrap items-center gap-4 pt-2">
        <Button type="submit" variant="brand" size="cta">
          Send enquiry
        </Button>
        <p className="text-xs leading-relaxed text-muted-foreground">
          This opens your email app with your enquiry ready to send.
        </p>
      </div>
    </form>
  );
}
