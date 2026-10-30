"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "cn";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const CONTACT_EMAIL = "hello@purpleproject.org.za";

/** Items listed under "What would you like to give?" in 04 PLEDGE FORM. */
const PLEDGE_ITEMS = [
  "Sanitary towels",
  "Soap and body wash",
  "Toothbrushes and toothpaste",
  "Deodorant and roll-on",
  "Body lotion",
  "Other",
] as const;

/** Hand-over options listed in 04 PLEDGE FORM. */
const HANDOVER_OPTIONS = [
  "I’ll drop it off",
  "Please arrange collection",
] as const;

/**
 * Interactive in-kind pledge form rendered inside `PledgeForm`.
 */
export function PledgeInKindForm() {
  const [selectedItems, setSelectedItems] = React.useState<string[]>([
    "Sanitary towels",
  ]);
  const [handover, setHandover] = React.useState<string>(HANDOVER_OPTIONS[0]);
  const [itemError, setItemError] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);

  function toggleItem(item: string) {
    setSelectedItems((prev) => {
      const next = prev.includes(item)
        ? prev.filter((entry) => entry !== item)
        : [...prev, item];
      if (next.length > 0) setItemError(false);
      return next;
    });
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (selectedItems.length === 0) {
      setItemError(true);
      return;
    }

    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const quantity = String(data.get("quantity") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const subject = encodeURIComponent(
      `In-kind pledge${name ? ` — ${name}` : ""}`,
    );
    const body = encodeURIComponent(
      [
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone}`,
        `What would you like to give?: ${selectedItems.join(", ")}`,
        `Roughly how much?: ${quantity}`,
        `Hand-over: ${handover}`,
        ...(message ? ["", "Message:", message] : []),
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

        <h3 className="mt-6 font-heading text-display-xs uppercase text-brand-950">
          Thank{" "}
          <span className="font-display text-script-sm normal-case italic text-brand-700">
            you.
          </span>
        </h3>

        <p className="mt-4 max-w-xl text-base leading-relaxed text-foreground">
          Thank you. Your pledge means a woman in treatment will feel cared for.
          We&rsquo;ll be in touch to arrange the hand-over.
        </p>

        <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
          Your email app should also open with your pledge ready to send. If it
          did not open automatically, you can email us directly at{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}?subject=In-kind%20pledge`}
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
          Make another pledge
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="pledge-name">Name</Label>
          <Input
            id="pledge-name"
            name="name"
            required
            maxLength={100}
            autoComplete="name"
            placeholder="Your name"
            className="h-10"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="pledge-email">Email</Label>
          <Input
            id="pledge-email"
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
        <Label htmlFor="pledge-phone">Phone</Label>
        <Input
          id="pledge-phone"
          name="phone"
          type="tel"
          required
          autoComplete="tel"
          placeholder="e.g. 082 000 0000"
          className="h-10"
        />
      </div>

      {/* What would you like to give? */}
      <fieldset className="grid gap-2.5">
        <legend className="text-sm leading-none font-medium text-foreground">
          What would you like to give?
        </legend>
        <div className="mt-1 grid gap-2.5 sm:grid-cols-2">
          {PLEDGE_ITEMS.map((item) => {
            const checked = selectedItems.includes(item);

            return (
              <label
                key={item}
                className={cn(
                  "flex cursor-pointer items-center gap-3 border px-3.5 py-3 text-sm transition-colors select-none",
                  checked
                    ? "border-brand-700 bg-lavender/75 font-medium text-brand-950"
                    : "border-input bg-white text-foreground hover:border-brand-300 hover:bg-brand-50/50",
                )}
              >
                <input
                  type="checkbox"
                  name="items"
                  value={item}
                  checked={checked}
                  onChange={() => toggleItem(item)}
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
                <span>{item}</span>
              </label>
            );
          })}
        </div>
        {itemError ? (
          <p role="alert" className="text-xs text-destructive">
            Please select at least one item you would like to give.
          </p>
        ) : null}
      </fieldset>

      {/* Roughly how much? */}
      <div className="grid gap-2">
        <Label htmlFor="pledge-quantity">Roughly how much?</Label>
        <Input
          id="pledge-quantity"
          name="quantity"
          required
          maxLength={200}
          placeholder="e.g. 20 packs, 1 box, or what you have in mind"
          className="h-10"
        />
      </div>

      {/* Hand-over */}
      <fieldset className="grid gap-2.5">
        <legend className="text-sm leading-none font-medium text-foreground">
          Hand-over
        </legend>
        <div className="mt-1 grid gap-2.5 sm:grid-cols-2">
          {HANDOVER_OPTIONS.map((option) => {
            const selected = handover === option;

            return (
              <label
                key={option}
                className={cn(
                  "flex cursor-pointer items-center gap-3 border px-3.5 py-3 text-sm transition-colors select-none",
                  selected
                    ? "border-brand-700 bg-lavender/75 font-medium text-brand-950"
                    : "border-input bg-white text-foreground hover:border-brand-300 hover:bg-brand-50/50",
                )}
              >
                <input
                  type="radio"
                  name="handover"
                  value={option}
                  checked={selected}
                  onChange={() => setHandover(option)}
                  className="sr-only"
                />
                <span
                  aria-hidden
                  className={cn(
                    "flex size-4 shrink-0 items-center justify-center border transition-colors",
                    selected
                      ? "border-brand-700 bg-brand-700"
                      : "border-ink-300 bg-white",
                  )}
                >
                  {selected ? <span className="size-1.5 bg-white" /> : null}
                </span>
                <span>{option}</span>
              </label>
            );
          })}
        </div>
      </fieldset>

      {/* Message */}
      <div className="grid gap-2">
        <Label htmlFor="pledge-message">Message</Label>
        <Textarea
          id="pledge-message"
          name="message"
          rows={4}
          maxLength={2000}
          placeholder="Any extra details about your items, area or preferred times"
        />
      </div>

      <div className="pt-2">
        <Button type="submit" variant="brand" size="cta">
          Send my pledge
        </Button>
      </div>
    </form>
  );
}

