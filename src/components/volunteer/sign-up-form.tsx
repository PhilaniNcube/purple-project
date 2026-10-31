"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "cn";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const CONTACT_EMAIL = "hello@purpleproject.org.za";

/** The ways to help listed under "SIGN-UP FORM". */
const WAYS_TO_HELP = [
  "Spread the word",
  "Join us at events",
  "Pack dignity packs",
  "Start a conversation",
  "Something else",
] as const;

/**
 * Volunteer sign-up form.
 *
 * The site has no volunteer inbox wired up yet, so the form composes a
 * pre-filled email in the visitor's own mail app. That keeps the sign-up
 * deliberate, gives the visitor a copy of what they sent and means no personal
 * detail is stored on the website.
 */
export function VolunteerSignUpForm() {
  const [selectedWays, setSelectedWays] = React.useState<string[]>([]);
  const [wayError, setWayError] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);

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

    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const about = String(data.get("about") ?? "").trim();

    const subject = encodeURIComponent(
      `Volunteer sign-up${name ? ` — ${name}` : ""}`,
    );
    const body = encodeURIComponent(
      [
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone}`,
        `How would you like to help?: ${selectedWays.join(", ")}`,
        ...(about ? ["", "A little about me:", about] : []),
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

        <p className="mt-6 font-display text-2xl leading-snug text-pretty text-brand-700 italic sm:text-3xl">
          Thank you for stepping up.
        </p>

        <p className="mt-3 text-base leading-relaxed text-foreground">
          We&rsquo;ll be in touch soon to find the right fit.
        </p>

        <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
          Your email app should also open with your details ready to send. If it
          did not open automatically, you can email us directly at{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}?subject=Volunteer%20sign-up`}
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
          <Label htmlFor="volunteer-name">Name</Label>
          <Input
            id="volunteer-name"
            name="name"
            required
            maxLength={100}
            autoComplete="name"
            placeholder="Your name"
            className="h-10"
          />
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
          />
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
        />
      </div>

      <fieldset className="grid gap-2.5">
        <legend className="text-sm leading-none font-medium text-foreground">
          How would you like to help?
        </legend>

        <div className="mt-1 grid gap-2.5 sm:grid-cols-2">
          {WAYS_TO_HELP.map((way) => {
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

        {wayError ? (
          <p role="alert" className="text-xs text-destructive">
            Please select at least one way you would like to help.
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
        />
      </div>

      <div className="flex flex-wrap items-center gap-4 pt-2">
        <Button type="submit" variant="brand" size="cta">
          Sign me up
        </Button>
        <p className="text-xs leading-relaxed text-muted-foreground">
          This opens your email app with your details ready to send.
        </p>
      </div>
    </form>
  );
}
