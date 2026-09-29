import { cn } from "cn";

import {
  Container,
  Display,
  Eyebrow,
  Logo,
  Quote,
  Script,
  Section,
  Stat,
} from "@/components/ds";
import { Hero } from "@/components/hero";
import { JoinUs } from "@/components/join-us";
import { ShareTheKnowledge } from "@/components/share-the-knowledge";
import { ShiningALight } from "@/components/shining-a-light";
import { StraightFrom } from "@/components/straight-from";
import { Testimonial } from "@/components/testimonial";
import { TheNumbers } from "@/components/the-numbers";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  accentRamps,
  easings,
  fontFamilies,
  ramps,
  radii,
  semantic,
  shadows,
  typeScale,
} from "@/lib/design-tokens";

/* -------------------------------------------------------------------------- */
/* Doc scaffolding                                                            */
/* -------------------------------------------------------------------------- */

function DocHeading({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="max-w-2xl">
      <Eyebrow className="text-primary" rule>
        {eyebrow}
      </Eyebrow>
      <Display size="sm" className="mt-5">
        {title}
      </Display>
      {children ? (
        <p className="mt-5 text-base leading-relaxed text-muted-foreground">
          {children}
        </p>
      ) : null}
    </div>
  );
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="font-heading text-xs font-bold tracking-[0.18em] uppercase">
      {children}
    </h3>
  );
}

function Swatch({ name, value }: { name: string; value: string }) {
  return (
    <div className="overflow-hidden rounded-none ring-1 ring-foreground/10">
      <div className="h-16 w-full" style={{ background: value }} />
      <div className="bg-card px-2.5 py-2">
        <div className="text-[0.7rem] font-semibold">{name}</div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Page                                                                       */
/* -------------------------------------------------------------------------- */

export default function DesignSystemPage() {
  return (
    <main className="flex flex-1 flex-col">
      {/* ---------------------------------------------------------------- */}
      {/* Hero — the production homepage hero                              */}
      {/* ---------------------------------------------------------------- */}
      <Hero />

      {/* ---------------------------------------------------------------- */}
      {/* Mission — "Shining a light on women's health, together."         */}
      {/* ---------------------------------------------------------------- */}
      <ShiningALight />

      {/* ---------------------------------------------------------------- */}
      {/* Founder — "Straight from the founder."                           */}
      {/* ---------------------------------------------------------------- */}
      <StraightFrom />

      {/* ---------------------------------------------------------------- */}
      {/* Numbers — "The numbers" watermark band                           */}
      {/* ---------------------------------------------------------------- */}
      <TheNumbers />

      {/* ---------------------------------------------------------------- */}
      {/* Knowledge — "Share the knowledge. Protect women."                */}
      {/* ---------------------------------------------------------------- */}
      <ShareTheKnowledge />

      {/* ---------------------------------------------------------------- */}
      {/* Testimonial — "In their words."                                  */}
      {/* ---------------------------------------------------------------- */}
      <Testimonial />

      {/* ---------------------------------------------------------------- */}
      {/* Join us — the closing call to action                             */}
      {/* ---------------------------------------------------------------- */}
      <JoinUs />
    </main>
  );
}
