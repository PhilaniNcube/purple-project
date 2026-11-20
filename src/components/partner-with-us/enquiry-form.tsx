"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "cn";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DESK_EMAIL } from "@/lib/contact";
import { submitPartnerForm } from "@/lib/form-actions";
import {
  initialFormState,
  PARTNERSHIP_TYPES,
  type FormSubmissionState,
} from "@/lib/form-state";

/**
 * Partnership enquiry form.
 */
export function PartnerEnquiryForm() {
  const [selectedTypes, setSelectedTypes] = React.useState<string[]>([]);
  const [typeError, setTypeError] = React.useState(false);
  const [state, setState] = React.useState<FormSubmissionState>(initialFormState);
  const [isPending, startTransition] = React.useTransition();

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

    const formData = new FormData(event.currentTarget);

    startTransition(async () => {
      const result = await submitPartnerForm(formData);
      setState(result);
    });
  }

  function handleReset() {
    setState(initialFormState);
    setSelectedTypes([]);
    setTypeError(false);
  }

  if (state.status === "success") {
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
          Need to add anything else? You can also email us at{" "}
          <a
            href={`mailto:${DESK_EMAIL}?subject=Partnership%20enquiry`}
            className="font-medium text-brand-700 underline underline-offset-2"
          >
            {DESK_EMAIL}
          </a>
          .
        </p>

        <Button
          type="button"
          variant="brand-outline"
          size="cta"
          className="mt-8"
          onClick={handleReset}
        >
          Back to form
        </Button>
      </div>
    );
  }

  const activeTypeError = typeError
    ? "Please select at least one way you would like to partner."
    : state.errors?.partnership;

  return (
    <form onSubmit={handleSubmit} className="grid gap-6">
      {/* Honeypot: hidden from people, tempting to bots. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="partner-website">Website</label>
        <input
          id="partner-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

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
            aria-invalid={Boolean(state.errors?.name)}
            aria-describedby={
              state.errors?.name ? "partner-name-error" : undefined
            }
          />
          {state.errors?.name ? (
            <p id="partner-name-error" className="text-xs text-destructive">
              {state.errors.name}
            </p>
          ) : null}
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
            aria-invalid={Boolean(state.errors?.organisation)}
            aria-describedby={
              state.errors?.organisation
                ? "partner-organisation-error"
                : undefined
            }
          />
          {state.errors?.organisation ? (
            <p
              id="partner-organisation-error"
              className="text-xs text-destructive"
            >
              {state.errors.organisation}
            </p>
          ) : null}
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
            aria-invalid={Boolean(state.errors?.email)}
            aria-describedby={
              state.errors?.email ? "partner-email-error" : undefined
            }
          />
          {state.errors?.email ? (
            <p id="partner-email-error" className="text-xs text-destructive">
              {state.errors.email}
            </p>
          ) : null}
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
            aria-invalid={Boolean(state.errors?.phone)}
            aria-describedby={
              state.errors?.phone ? "partner-phone-error" : undefined
            }
          />
          {state.errors?.phone ? (
            <p id="partner-phone-error" className="text-xs text-destructive">
              {state.errors.phone}
            </p>
          ) : null}
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

        {activeTypeError ? (
          <p role="alert" className="text-xs text-destructive">
            {activeTypeError}
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
          aria-invalid={Boolean(state.errors?.message)}
          aria-describedby={
            state.errors?.message ? "partner-message-error" : undefined
          }
        />
        {state.errors?.message ? (
          <p id="partner-message-error" className="text-xs text-destructive">
            {state.errors.message}
          </p>
        ) : null}
      </div>

      {state.status === "error" && state.message ? (
        <div
          role="alert"
          className="border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive"
        >
          <p>{state.message}</p>
          <p className="mt-1 text-xs text-foreground/80">
            You can also email us directly at{" "}
            <a
              href={`mailto:${DESK_EMAIL}?subject=Partnership%20enquiry`}
              className="font-medium text-brand-700 underline underline-offset-2"
            >
              {DESK_EMAIL}
            </a>
            .
          </p>
        </div>
      ) : null}

      <div className="pt-2">
        <Button type="submit" variant="brand" size="cta" disabled={isPending}>
          {isPending ? "Sending…" : "Send enquiry"}
        </Button>
      </div>
    </form>
  );
}
