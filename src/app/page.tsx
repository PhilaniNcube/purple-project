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
      {/* Colour                                                           */}
      {/* ---------------------------------------------------------------- */}
      <Section id="colour" tone="light">
        <Container>
          <DocHeading eyebrow="Foundations" title="Colour">
            A single purple ramp carries the brand, supported by purple-tinted
            neutrals and three optional accents. Role-based tokens
            (background, primary, lavender, night) sit on top and swap with the
            colour scheme.
          </DocHeading>

          <div className="mt-14 space-y-14">
            {ramps.map(({ name, description, ramp }) => (
              <div key={name}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                  <SubHeading>{name}</SubHeading>
                  <p className="max-w-xl text-sm text-muted-foreground">
                    {description}
                  </p>
                </div>
                <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-11">
                  {Object.entries(ramp).map(([step, value]) => (
                    <Swatch key={step} name={step} value={value} />
                  ))}
                </div>
              </div>
            ))}

            <div>
              <SubHeading>Accents</SubHeading>
              <div className="mt-5 grid gap-6 sm:grid-cols-3">
                {accentRamps.map(({ name, ramp }) => (
                  <div key={name} className="grid grid-cols-3 gap-3">
                    {Object.entries(ramp).map(([step, value]) => (
                      <Swatch key={step} name={`${name}-${step}`} value={value} />
                    ))}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <SubHeading>Semantic roles</SubHeading>
              <div className="mt-5 rounded-none bg-muted p-4">
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                  {Object.entries(semantic).map(([name, value]) => (
                    <Swatch key={name} name={name} value={value} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Typography                                                       */}
      {/* ---------------------------------------------------------------- */}
      <Section id="typography" tone="lavender">
        <Container>
          <DocHeading eyebrow="Foundations" title="Typography">
            Three roles do all the work: a heavy uppercase sans for headlines, an
            italic serif for the emotional accents, and a neutral sans for body
            copy. Display sizes are fluid, so they scale with the viewport.
          </DocHeading>

          <div className="mt-14 grid gap-4 sm:grid-cols-2">
            {fontFamilies.map((family) => (
              <Card key={family.name}>
                <CardHeader>
                  <CardTitle className={family.className}>
                    <span className="text-2xl">{family.label}</span>
                  </CardTitle>
                  <CardDescription>
                    {family.stack} · <code className="font-mono text-xs">{family.name}</code>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{family.usage}</p>
                  <p
                    className={cn(
                      "mt-4 text-2xl",
                      family.className,
                      family.name === "font-heading" && "uppercase",
                    )}
                  >
                    Shining a light
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-14">
            <SubHeading>Scale</SubHeading>
            <div className="mt-5 overflow-hidden rounded-none bg-card ring-1 ring-foreground/10">
              {typeScale.map((style, index) => (
                <div key={style.label}>
                  {index > 0 ? <Separator /> : null}
                  <div className="flex flex-col gap-3 p-6 sm:flex-row sm:items-baseline sm:gap-8">
                    <div className="w-40 shrink-0">
                      <div className="text-sm font-semibold">{style.label}</div>
                      <code className="font-mono text-[0.7rem] text-muted-foreground">
                        {style.className}
                      </code>
                    </div>
                    <p
                      className={cn(
                        "min-w-0 flex-1",
                        style.family === "heading" && "font-heading uppercase",
                        style.family === "display" && "font-display italic",
                        style.className,
                      )}
                    >
                      {style.sample}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Shape, elevation & motion                                        */}
      {/* ---------------------------------------------------------------- */}
      <Section id="shape" tone="light">
        <Container>
          <DocHeading eyebrow="Foundations" title="Shape & motion">
            Every UI element is square — no corner radius — while shadows are
            tinted with the brand purple and every transition uses a shared
            easing curve. The radius scale below is retained for future product
            UI.
          </DocHeading>

          <div className="mt-14 grid gap-14 lg:grid-cols-3">
            <div>
              <SubHeading>Radii</SubHeading>
              <div className="mt-5 space-y-3">
                {radii.map((radius) => (
                  <div key={radius.name} className="flex items-center gap-4">
                    <div
                      className={cn(
                        "size-14 shrink-0 border-2 border-primary/40 bg-primary/10",
                        radius.className,
                      )}
                    />
                    <div>
                      <div className="text-sm font-semibold">{radius.name}</div>
                      <code className="font-mono text-[0.7rem] text-muted-foreground">
                        {radius.value}
                      </code>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <SubHeading>Elevation</SubHeading>
              <div className="mt-5 grid grid-cols-2 gap-4">
                {shadows.map((shadow) => (
                  <div
                    key={shadow.name}
                    className={cn(
                      "flex h-24 flex-col justify-end rounded-none bg-card p-4",
                      shadow.name,
                    )}
                  >
                    <div className="text-xs font-semibold">{shadow.name}</div>
                    <div className="text-[0.7rem] text-muted-foreground">
                      {shadow.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <SubHeading>Motion</SubHeading>
              <div className="mt-5 space-y-4">
                {easings.map((easing) => (
                  <div key={easing.name} className="rounded-none bg-muted p-4">
                    <div className="text-sm font-semibold">{easing.name}</div>
                    <code className="font-mono text-[0.7rem] text-muted-foreground">
                      {easing.value}
                    </code>
                    <div className="mt-3 h-1.5 overflow-hidden rounded-none bg-border">
                      <div
                        className="h-full w-1/2 rounded-none bg-primary"
                        style={{ transition: `transform 900ms ${easing.value}` }}
                      />
                    </div>
                  </div>
                ))}
                <p className="text-xs text-muted-foreground">
                  Animations: <code className="font-mono">animate-fade-up</code>,{" "}
                  <code className="font-mono">animate-float</code>,{" "}
                  <code className="font-mono">animate-marquee</code>.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Components                                                       */}
      {/* ---------------------------------------------------------------- */}
      <Section id="components" tone="muted">
        <Container>
          <DocHeading eyebrow="Library" title="Components">
            A small core set, themed entirely through the tokens above. Buttons
            and badges use Base UI primitives under the hood.
          </DocHeading>

          {/* Buttons */}
          <div className="mt-14 space-y-10">
            <div>
              <SubHeading>Buttons</SubHeading>
              <div className="mt-5 flex flex-wrap items-center gap-3 rounded-none bg-card p-6 ring-1 ring-foreground/10">
                <Button variant="brand" size="cta" className="rounded-none">
                  Learn more
                </Button>
                <Button variant="brand" size="xl">
                  Donate
                </Button>
                <Button variant="brand">Default</Button>
                <Button variant="brand-outline">Outline</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Neutral</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="link">Link</Button>
                <Button variant="brand" size="sm">
                  Small
                </Button>
                <Button variant="brand" size="xs">
                  Extra small
                </Button>
              </div>
            </div>

            <div>
              <SubHeading>On dark</SubHeading>
              <div className="mt-5 flex flex-wrap items-center gap-3 rounded-none bg-night p-6 text-night-foreground">
                <Button variant="inverse" size="cta" className="rounded-none">
                  Contact us
                </Button>
                <Button
                  variant="inverse-outline"
                  size="cta"
                  className="rounded-none"
                >
                  Take a quiz
                </Button>
                <Button variant="inverse-outline">Learn more</Button>
              </div>
            </div>

            {/* Badges */}
            <div>
              <SubHeading>Badges</SubHeading>
              <div className="mt-5 flex flex-wrap items-center gap-3 rounded-none bg-card p-6 ring-1 ring-foreground/10">
                <Badge>Default</Badge>
                <Badge variant="secondary">Awareness</Badge>
                <Badge variant="outline">Cervical</Badge>
                <Badge variant="ghost">Screening</Badge>
                <Badge variant="destructive">Urgent</Badge>
                <Badge variant="link">Read more</Badge>
              </div>
            </div>

            {/* Form */}
            <div className="grid gap-10 lg:grid-cols-2">
              <div>
                <SubHeading>Form controls</SubHeading>
                <Card className="mt-5">
                  <CardHeader>
                    <CardTitle>Get involved</CardTitle>
                    <CardDescription>
                      Tell us how you would like to support the movement.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-5">
                    <div className="space-y-2">
                      <Label htmlFor="ds-name">Full name</Label>
                      <Input id="ds-name" placeholder="Naledi Mokoena" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="ds-email">Email</Label>
                      <Input id="ds-email" type="email" placeholder="you@example.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="ds-message">Message</Label>
                      <Textarea
                        id="ds-message"
                        placeholder="I would like to volunteer…"
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="brand" className="w-full">
                      Send message
                    </Button>
                  </CardFooter>
                </Card>
              </div>

              {/* Cards */}
              <div>
                <SubHeading>Cards</SubHeading>
                <div className="mt-5 space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Know your body</CardTitle>
                      <CardDescription>
                        Recognise the symptoms and act early.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Gynaecological cancer is often overlooked, yet early
                        awareness can save lives.
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="brand-outline" size="sm">
                        Learn more
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card className="bg-brand-700 text-white ring-brand-800/40">
                    <CardHeader>
                      <CardTitle className="text-white">
                        Share the knowledge
                      </CardTitle>
                      <CardDescription className="text-white/70">
                        Protect women. Break the stigma.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-white/80">
                        By sharing knowledge about prevention, symptoms and
                        treatment, we empower women to take charge of their
                        health.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Patterns — composed from the primitives                          */}
      {/* ---------------------------------------------------------------- */}
      <Section tone="lavender">
        <Container>
          <Eyebrow className="text-brand-700" rule>
            Pattern · The numbers
          </Eyebrow>
          <Display size="md" className="mt-5">
            <Script size="md" className="mr-3 text-brand-600">
              The
            </Script>
            numbers
          </Display>
          <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <Stat
                key={index}
                value="13,800"
                label="New cases of cervical cancer annually reported in South Africa"
              />
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="light">
        <Container size="sm">
          <Quote>
            Project Purple is making a meaningful impact by advancing
            gynaecological cancer awareness and encouraging early detection
            through education and advocacy. Their work helps break stigma and
            save lives.
          </Quote>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Footer                                                           */}
      {/* ---------------------------------------------------------------- */}
      <Section as="footer" tone="night" padding="sm" className="mt-auto">
        <Container className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-sm">
            <Logo markClassName="text-brand-400" className="text-night-foreground" />
            <p className="mt-4 text-sm leading-relaxed text-night-foreground/70">
              Our mission is simple: raise awareness of gynaecological cancers
              and support those affected through sharing stories and
              information.
            </p>
          </div>
          <p className="text-xs text-night-foreground/60">
            © Project Purple {new Date().getFullYear()}
          </p>
        </Container>
      </Section>
    </main>
  );
}
