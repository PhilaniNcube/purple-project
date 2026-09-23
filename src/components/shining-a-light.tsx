"use client";

import * as React from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";

import { Container, Section } from "@/components/ds";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(useGSAP, DrawSVGPlugin);

/**
 * "Shining a light on women's health, together."
 *
 * The band directly beneath the hero. An arched editorial photograph sits
 * opposite a three-line headline lockup, mirroring the hero's construction:
 * the first line is an outline SVG whose path is drawn on with GSAP as the
 * section scrolls into view, followed by the solid display line and the italic
 * serif accent.
 *
 * The artwork is the same geometry as `public/images/SHINING A LIGHT ON.svg`,
 * but rendered as strokes (`fill="none"`) rather than a masked fill so the
 * outline is a real, measurable path.
 *
 * Drawing is handled by GSAP's DrawSVGPlugin. The exported artwork is a
 * *compound* path (one `M…Z` run per glyph contour), and dashing restarts at
 * the start of every subpath — so drawing the compound path as a single unit
 * makes every letter flip from hidden to fully drawn at once. Instead the
 * compound path is split into its subpaths (`OUTLINE_SUBPATHS`) and each is
 * drawn on its own, staggered left to right, once the section scrolls in.
 */

/** Mask-path geometry from the exported "SHINING A LIGHT ON" artwork. */
const OUTLINE_PATH =
  "M14.48 34.8399C9.86669 34.8399 6.46669 33.9066 4.28002 32.0399C2.09335 30.1466 1.00002 27.3466 1.00002 23.6399V22.6799H7.36002V24.4399C7.36002 26.2799 7.92002 27.5866 9.04002 28.3599C10.16 29.1333 12.0134 29.5199 14.6 29.5199C16.76 29.5199 18.32 29.2399 19.28 28.6799C20.2667 28.0933 20.76 27.1466 20.76 25.8399V25.1199C20.7334 23.8399 20.32 22.8933 19.52 22.2799C18.7467 21.6666 17.32 21.1199 15.24 20.6399L9.36002 18.9999C4.26669 17.5066 1.72002 14.5599 1.72002 10.1599C1.72002 7.17327 2.74669 4.90661 4.80002 3.35994C6.88002 1.78661 9.92002 0.99994 13.92 0.99994C18.0267 0.99994 21.1334 1.82661 23.24 3.47994C25.3467 5.10661 26.4 7.47994 26.4 10.5999V11.7599H20.04V10.3599C20.04 8.89327 19.5734 7.85327 18.64 7.23994C17.7067 6.59994 16.1467 6.27994 13.96 6.27994C11.96 6.27994 10.48 6.54661 9.52002 7.07994C8.58669 7.58661 8.12002 8.41327 8.12002 9.55994V10.0399C8.12002 11.1333 8.53335 11.9999 9.36002 12.6399C10.1867 13.2533 11.44 13.7466 13.12 14.1199L19.04 15.7199C21.7867 16.4399 23.8267 17.5066 25.16 18.9199C26.4934 20.3066 27.16 22.3066 27.16 24.9199C27.16 28.3866 26.1467 30.9066 24.12 32.4799C22.12 34.0533 18.9067 34.8399 14.48 34.8399ZM50.9788 34.4399V20.6399H37.8588V34.4399H31.6188V1.39994H37.8588V15.1999H50.9788V1.39994H57.2588V34.4399H50.9788ZM61.985 34.4399V28.8399H68.665V6.99994H61.985V1.39994H81.545V6.99994H74.905V28.8399H81.545V34.4399H61.985ZM86.2672 34.4399V1.39994H92.2672L106.187 23.6399V1.39994H112.187V34.4399H106.147L92.2672 12.1999V34.4399H86.2672ZM116.907 34.4399V28.8399H123.587V6.99994H116.907V1.39994H136.467V6.99994H129.827V28.8399H136.467V34.4399H116.907ZM141.189 34.4399V1.39994H147.189L161.109 23.6399V1.39994H167.109V34.4399H161.069L147.189 12.1999V34.4399H141.189ZM185.509 34.8399C181.162 34.8399 177.775 33.5066 175.349 30.8399C172.949 28.1733 171.749 24.7066 171.749 20.4399V15.4799C171.749 11.1599 172.989 7.66661 175.469 4.99994C177.949 2.33327 181.495 0.99994 186.109 0.99994C190.109 0.99994 193.349 2.09327 195.829 4.27994C198.335 6.43994 199.695 9.25327 199.909 12.7199L199.949 14.3199H193.469L193.429 11.9599C193.295 10.1999 192.562 8.83994 191.229 7.87994C189.922 6.91994 188.242 6.43994 186.189 6.43994C183.389 6.43994 181.349 7.21327 180.069 8.75994C178.789 10.2799 178.149 12.2666 178.149 14.7199V21.0799C178.149 23.5599 178.762 25.5733 179.989 27.1199C181.242 28.6399 183.162 29.3999 185.749 29.3999C190.095 29.3999 192.615 27.4533 193.309 23.5599V22.0399H184.029V16.9599H199.949V34.4399H196.269L195.429 30.1999C193.242 33.2933 189.935 34.8399 185.509 34.8399ZM211.945 34.4399L222.265 1.39994H230.785L241.145 34.4399H234.545L232.945 28.9599H220.105L218.505 34.4399H211.945ZM221.665 23.5199H231.385L226.825 7.87994L226.545 7.03994L226.225 7.87994L221.665 23.5199ZM253.767 34.4399V1.39994H260.007V28.9599H275.567V34.4399H253.767ZM278.04 34.4399V28.8399H284.72V6.99994H278.04V1.39994H297.6V6.99994H290.96V28.8399H297.6V34.4399H278.04ZM314.962 34.8399C310.615 34.8399 307.229 33.5066 304.802 30.8399C302.402 28.1733 301.202 24.7066 301.202 20.4399V15.4799C301.202 11.1599 302.442 7.66661 304.922 4.99994C307.402 2.33327 310.949 0.99994 315.562 0.99994C319.562 0.99994 322.802 2.09327 325.282 4.27994C327.789 6.43994 329.149 9.25327 329.362 12.7199L329.402 14.3199H322.922L322.882 11.9599C322.749 10.1999 322.015 8.83994 320.682 7.87994C319.375 6.91994 317.695 6.43994 315.642 6.43994C312.842 6.43994 310.802 7.21327 309.522 8.75994C308.242 10.2799 307.602 12.2666 307.602 14.7199V21.0799C307.602 23.5599 308.215 25.5733 309.442 27.1199C310.695 28.6399 312.615 29.3999 315.202 29.3999C319.549 29.3999 322.069 27.4533 322.762 23.5599V22.0399H313.482V16.9599H329.402V34.4399H325.722L324.882 30.1999C322.695 33.2933 319.389 34.8399 314.962 34.8399ZM353.908 34.4399V20.6399H340.788V34.4399H334.548V1.39994H340.788V15.1999H353.908V1.39994H360.188V34.4399H353.908ZM373.555 34.4399V6.87994H363.715V1.39994H389.675V6.87994H379.835V34.4399H373.555ZM415.873 34.8399C411.393 34.8399 407.886 33.4933 405.353 30.7999C402.846 28.0799 401.593 24.5733 401.593 20.2799V15.4799C401.593 11.2133 402.846 7.73327 405.353 5.03994C407.886 2.34661 411.393 0.99994 415.873 0.99994C420.326 0.99994 423.806 2.34661 426.313 5.03994C428.846 7.70661 430.113 11.1866 430.113 15.4799V20.2799C430.113 24.5733 428.846 28.0799 426.313 30.7999C423.806 33.4933 420.326 34.8399 415.873 34.8399ZM407.953 21.0799C407.953 23.5066 408.606 25.5066 409.913 27.0799C411.246 28.6266 413.233 29.3999 415.873 29.3999C418.513 29.3999 420.486 28.6266 421.793 27.0799C423.099 25.5066 423.753 23.5066 423.753 21.0799V14.7199C423.753 12.3466 423.086 10.3733 421.753 8.79994C420.446 7.22661 418.486 6.43994 415.873 6.43994C413.233 6.43994 411.246 7.22661 409.913 8.79994C408.606 10.3466 407.953 12.3199 407.953 14.7199V21.0799ZM434.744 34.4399V1.39994H440.744L454.664 23.6399V1.39994H460.664V34.4399H454.624L440.744 12.1999V34.4399H434.744Z";

/**
 * The compound path split into its individual `M…Z` subpaths (one per glyph
 * contour). Dashing restarts per subpath, so each is animated separately.
 */
const OUTLINE_SUBPATHS = OUTLINE_PATH.match(/M[^M]+/g) ?? [];

export function ShiningALight() {
  const root = React.useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const paths = gsap.utils.toArray<SVGPathElement>(
        "[data-draw]",
        root.current,
      );
      const section = root.current;
      if (!paths.length || !section) return;

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(paths, { drawSVG: "0%" });

        const timeline = gsap.timeline({
          paused: true,
          defaults: { duration: 0.7, ease: "power2.out" },
        });
        // Draw the letters on one after another, left to right.
        timeline.to(paths, { drawSVG: "100%", stagger: 0.06 });

        const observer = new IntersectionObserver(
          (entries) => {
            if (entries.some((entry) => entry.isIntersecting)) {
              timeline.play();
              observer.disconnect();
            }
          },
          // Fire once the section has risen to roughly 72% of the viewport.
          { rootMargin: "0px 0px -28% 0px" },
        );
        observer.observe(section);

        return () => observer.disconnect();
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <Section id="mission" tone="light">
      {/* No-JS fallback: reveal the outline paths that the stylesheet hides. */}
      <noscript>
        <style>{`[data-draw]{stroke-dasharray:none!important;stroke-dashoffset:0!important}`}</style>
      </noscript>

      <Container>
        <div
          ref={root}
          className="grid gap-12 lg:grid-cols-2 lg:items-stretch lg:gap-16"
        >
          {/* Arched editorial photograph */}
          <div className="relative aspect-[560/518] overflow-hidden rounded-arch bg-muted lg:aspect-auto lg:h-full">
            <Image
              src="/images/womens-health.png"
              alt="Three women sitting together on a bed, looking up and out of frame"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>

          {/* Headline lockup + supporting copy */}
          <div className="relative">
            {/* Decorative dot grid, echoing the prototype */}
            <div
              aria-hidden
              className="pointer-events-none absolute top-0 right-0 hidden size-20 text-ink-300 sm:block"
              style={{
                backgroundImage:
                  "radial-gradient(currentColor 1.5px, transparent 1.5px)",
                backgroundSize: "16px 16px",
              }}
            />

            <h2 className="flex flex-col items-start font-heading text-display-sm uppercase text-foreground">
              {/* "SHINING A LIGHT ON" — stroke-only type, drawn on scroll */}
              <span className="block">
                <svg
                  viewBox="0 0 462 36"
                  fill="none"
                  role="img"
                  aria-label="Shining a light on"
                  className="block h-[0.72em] w-auto text-foreground"
                >
                  {OUTLINE_SUBPATHS.map((d, index) => (
                    <path
                      key={index}
                      data-draw
                      d={d}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      vectorEffect="non-scaling-stroke"
                    />
                  ))}
                </svg>
              </span>

              <span className="mt-[0.08em] block">Women&rsquo;s health,</span>

              <span className="block font-display text-script-md normal-case italic">
                together.
              </span>
            </h2>

            <div className="mt-8 max-w-xl space-y-5 text-base leading-relaxed text-muted-foreground">
              <p>
                Our mission is simple: to turn silence into strength. Whether
                you&rsquo;re a young person overwhelmed by health information, a
                mom looking for answers, or a donor wanting to make a real
                impact, this is your space. Gynaecological health is often
                overlooked, yet early awareness can save lives.
              </p>
              <p>
                By sharing knowledge about prevention, symptoms, and treatment,
                we empower women to take charge of their health.
              </p>
              <p className="font-semibold italic text-foreground">
                The colour purple &ndash; symbolic of gynaecological cancer,
                stand for courage, dignity, and hope.
              </p>
            </div>

            <Button variant="brand-outline" size="lg" className="mt-10 px-5">
              Learn more
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
