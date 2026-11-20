"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "cn";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DESK_EMAIL } from "@/lib/contact";
import { submitVolunteerForm } from "@/lib/form-actions";
import {
  initialFormState,
  VOLUNTEER_WAYS,
  type FormSubmissionState,
} from "@/lib/form-state";

/**
 * Volunteer sign-up form.
 */
export function VolunteerSignUpForm() {
  const [selectedWays, setSelectedWays] = React.useState<string[]>([]);
  const [wayError, setWayError] = React.useState(false);
  const [state, setState] = React.useState<FormSubmissionState>(initialFormState);
  const [isPending, startTransition] = React.useTransition();

  function toggleWay(way: string) {
    setSelectedWays((current) => {
      const next = current.includes(way)
        ? current.filter((entry) => entry !== way)
        : [...current, way];

      if (next.length > 0) setWayError(false);
      return next;
    });
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (selectedWays.length === 0) {
      setWayError(true);
      return;
    }

    const formData = new FormData(event.currentTarget);

    startTransition(async () => {
      const result = await submitVolunteerForm(formData);
      setState(result);
    });
  }

  function handleReset() {
    setState(initialFormState);
    setSelectedWays([]);
    setWayError(false);
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

        <p className="mt-6 font-display text-2xl leading-snug text-pretty text-brand-700 italic sm:text-3xl">
          Thank you for stepping up.
        </p>

        <p className="mt-3 text-base leading-relaxed text-foreground">
          We&rsquo;ll be in touch soon to find the right fit.
        </p>

        <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
          Need to add anything else? You can also email us at{" "}
          <a
            href={`mailto:${DESK_EMAIL}?subject=Volunteer%20sign-up`}
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

  const activeWaysError = wayError
    ? "Please select at least one way you would like to help."
    : state.errors?.ways;

  return (
    <form onSubmit={handleSubmit} className="grid gap-6">
      {/* Honeypot: hidden from people, tempting to bots. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="volunteer-website">Website</label>
        <input
          id="volunteer-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="volunteer-name">Name</Label>
          <Input
            id="volunteer-name"
            name="name"
            required
            maxLength={100}
            autoComplete="name"
            placeholder="Your name"
            className="h-10"
            aria-invalid={Boolean(state.errors?.name)}
            aria-describedby={
              state.errors?.name ? "volunteer-name-error" : undefined
            }
          />
          {state.errors?.name ? (
            <p id="volunteer-name-error" className="text-xs text-destructive">
              {state.errors.name}
            </p>
          ) : null}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="volunteer-email">Email</Label>
          <Input
            id="volunteer-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            className="h-10"
            aria-invalid={Boolean(state.errors?.email)}
            aria-describedby={
              state.errors?.email ? "volunteer-email-error" : undefined
            }
          />
          {state.errors?.email ? (
            <p id="volunteer-email-error" className="text-xs text-destructive">
              {state.errors.email}
            </p>
          ) : null}
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="volunteer-phone">Phone</Label>
        <Input
          id="volunteer-phone"
          name="phone"
          type="tel"
          required
          autoComplete="tel"
          placeholder="e.g. 082 000 0000"
          className="h-10"
          aria-invalid={Boolean(state.errors?.phone)}
          aria-describedby={
            state.errors?.phone ? "volunteer-phone-error" : undefined
          }
        />
        {state.errors?.phone ? (
          <p id="volunteer-phone-error" className="text-xs text-destructive">
            {state.errors.phone}
          </p>
        ) : null}
      </div>

      <fieldset className="grid gap-2.5">
        <legend className="text-sm leading-none font-medium text-foreground">
          How would you like to help?
        </legend>

        <div className="mt-1 grid gap-2.5 sm:grid-cols-2">
          {VOLUNTEER_WAYS.map((way) => {
            const checked = selectedWays.includes(way);

            return (
              <label
                key={way}
                className={cn(
                  "flex cursor-pointer items-center gap-3 border px-3.5 py-3 text-sm transition-colors select-none has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring/50",
                  checked
                    ? "border-brand-700 bg-lavender/75 font-medium text-brand-950"
                    : "border-input bg-white text-foreground hover:border-brand-300 hover:bg-brand-50/50",
                )}
              >
                <input
                  type="checkbox"
                  name="ways"
                  value={way}
                  checked={checked}
                  onChange={() => toggleWay(way)}
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
                <span>{way}</span>
              </label>
            );
          })}
        </div>

        {activeWaysError ? (
          <p role="alert" className="text-xs text-destructive">
            {activeWaysError}
          </p>
        ) : null}
      </fieldset>

      <div className="grid gap-2">
        <Label htmlFor="volunteer-about">Tell us a little about you</Label>
        <Textarea
          id="volunteer-about"
          name="about"
          rows={4}
          maxLength={1500}
          placeholder="What you enjoy doing, and how much time you have"
          aria-invalid={Boolean(state.errors?.about)}
          aria-describedby={
            state.errors?.about ? "volunteer-about-error" : undefined
          }
        />
        {state.errors?.about ? (
          <p id="volunteer-about-error" className="text-xs text-destructive">
            {state.errors.about}
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
              href={`mailto:${DESK_EMAIL}?subject=Volunteer%20sign-up`}
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
          {isPending ? "Sending…" : "Sign me up"}
        </Button>
      </div>
    </form>
  );
}
