"use client";

import * as React from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";

import { Container, Script, Section } from "@/components/ds";

gsap.registerPlugin(useGSAP, DrawSVGPlugin);

/**
 * "Meet our Founder" — the band directly beneath the Our Story hero.
 *
 * A light lavender band split into two columns on desktop: the editorial
 * heading lockup and the founder's bio on the left, a cut-out portrait of
 * Dr. Melissa Pietersen on the right. The heading uses the brand's two
 * voices — an outlined uppercase statement ("MEET OUR") answered by its
 * italic serif counterweight ("Founder").
 *
 * "MEET OUR" is the outline SVG, drawn on with GSAP's DrawSVGPlugin as the
 * band scrolls into view — the same construction as `shining-a-light` and
 * `straight-from`. The artwork is generated from the Archivo 800 face (the
 * site's `font-heading`): a *compound* path, one `M…Z` run per glyph
 * contour. Dashing restarts at the start of every subpath, so drawing the
 * compound path as a single unit would flip every letter from hidden to
 * fully drawn at once; instead it is split into its subpaths and each is
 * drawn on its own, staggered left to right.
 *
 * The portrait (`founder-2.png`) is a transparent cut-out that already
 * carries the purple disc, so it needs no masking and simply dissolves into
 * the lavender band. The Section's bottom padding is removed so the cut-out
 * sits flush against the band's bottom edge; the top padding is kept so the
 * heading still clears the hero. The image's wrapper carries
 * `mr-[calc(50%-50vw)]` (`justify-end`): percentage margins resolve against
 * the Container's content box, so the negative right margin cancels the
 * centring gutter and anchors the artwork to the viewport's right edge on
 * every breakpoint. The Section's `overflow-hidden` keeps that bleed from
 * creating a horizontal scrollbar.
 */

/** Mask-path geometry generated from Archivo 800 for "MEET OUR". */
const OUTLINE_PATH =
  "M75 699L75 12L336 12L419 318C422.3 328.7 426.3 343.2 431 361.5C435.7 379.8 440.3 399 445 419C449.7 439 453.7 457 457 473L465 473C467.7 460.3 471 445.2 475 427.5C483 392.2 493 350.3 501 317L585 12L839 12L839 699L665 699L665 406C665 377.3 665.2 348.3 665.5 319C665.8 289.7 666.3 263 667 239C667.7 215 668 197.7 668 187L660 187C658 197 654.8 211.5 650.5 230.5C646.2 249.5 641.5 269.2 636.5 289.5C631.5 309.8 627 327.3 623 342L523 699L379 699L278 342C271.3 315.3 261.2 275.7 252.5 237C248.2 217.7 244.3 201.3 241 188L233 188C233.7 205.3 234.3 226.5 235 251.5C236.3 301.5 238 358 238 406L238 699ZM1011 699L1011 12L1578 12L1578 152L1190 152L1190 281L1529 281L1529 418L1190 418L1190 559L1585 559L1585 699ZM1730 699L1730 12L2297 12L2297 152L1909 152L1909 281L2248 281L2248 418L1909 418L1909 559L2304 559L2304 699ZM2619 699L2619 159L2396 159L2396 12L3021 12L3021 159L2798 159L2798 699ZM3681 711C3530.3 711 3421.3 658.3 3364 553C3335.3 500.3 3321 434.3 3321 355C3321 196.3 3380.2 92.2 3487.5 39.5C3541.2 13.2 3605.7 0 3681 0C3831.7 0 3940.7 52.8 3998 157.5C4026.7 209.8 4041 275.7 4041 355C4041 513.7 3981.8 618.8 3874.5 671.5C3820.8 697.8 3756.3 711 3681 711ZM3681 571C3738.3 571 3782.5 553.3 3812.5 520C3842.5 486.7 3857 438 3857 378L3857 334C3857 272.7 3842.5 224.3 3812.5 191C3782.5 157.7 3738.3 140 3681 140C3563.7 140 3505 211.3 3505 334L3505 378C3505 438 3519.7 486.7 3549 520C3578.3 553.3 3622.3 571 3681 571ZM4497 711C4365 711 4267.7 669.7 4217 587C4191.7 545.7 4179 494.3 4179 433L4179 12L4359 12L4359 429C4359 473 4370.7 507.7 4394 533C4417.3 558.3 4451.7 571 4497 571C4542.3 571 4577 558.3 4601 533C4625 507.7 4637 473 4637 429L4637 12L4816 12L4816 433C4816 494.3 4803.3 545.7 4778 587C4727.3 669.7 4631.7 711 4497 711ZM4984 699L4984 12L5383 12C5484.3 12 5552.5 52.5 5586.5 118.5C5603.5 151.5 5612 188.3 5612 229C5612 273 5601.8 312.2 5581.5 346.5C5561.2 380.8 5532.7 407.7 5496 427L5634 699L5434 699L5320 457L5163 457L5163 699ZM5163 324L5348 324C5372.7 324 5392.5 315.8 5407.5 299.5C5422.5 283.2 5430 261.3 5430 234C5430 216 5426.7 200.7 5420 188C5406.7 162.7 5382.7 148 5348 148L5163 148Z";

/**
 * The compound path split into its individual `M…Z` subpaths (one per glyph
 * contour). Dashing restarts per subpath, so each is animated separately.
 */
const OUTLINE_SUBPATHS = OUTLINE_PATH.match(/M[^M]+/g) ?? [];

export function OurStoryFounder() {
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
          // Fire once the band has risen to roughly 72% of the viewport.
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
    <Section
      id="founder"
      tone="lavender"
      padding="none"
      className="overflow-hidden pt-20 sm:pt-28"
    >
      {/* No-JS fallback: reveal the outline paths that the stylesheet hides. */}
      <noscript>
        <style>{`[data-draw]{stroke-dasharray:none!important;stroke-dashoffset:0!important}`}</style>
      </noscript>

      <Container size="wide">
        <div
          ref={root}
          className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16 mr-[calc(50%-50vw)]"
        >
          {/* Copy — extra bottom padding lifts the copy off the band's bottom
              edge, independent of the portrait, which stays flush. */}
          <div className="pb-10 sm:pb-14 lg:pb-16">
            <h2 className="flex flex-col items-start">
              {/* "MEET OUR" — stroke-only type, drawn on scroll */}
              <span className="block text-display-lg">
                {/* The viewBox carries a ~2% margin on every side (the path
                    itself is tight to the glyphs at `0 0 5679 711`) so the
                    1.5px stroke isn't clipped at the rounded bottoms of the
                    O and U. */}
                <svg
                  viewBox="-24 -24 5727 759"
                  fill="none"
                  role="img"
                  aria-label="Meet our"
                  className="block h-[0.75em] w-auto max-w-full"
                >
                  {OUTLINE_SUBPATHS.map((d, index) => (
                    <path
                      key={index}
                      data-draw
                      d={d}
                      fill="none"
                      stroke="black"
                      strokeWidth={1.5}
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      vectorEffect="non-scaling-stroke"
                    />
                  ))}
                </svg>
              </span>

              {/* Italic accent, tucked beneath the outline type */}
              <Script
                as="span"
                size="xl"
                style={{ color: "black" }}
                className="mt-1 ml-[18%] sm:ml-[24%]"
              >
                Founder
              </Script>
            </h2>

            <p className="mt-8 max-w-xl text-lg leading-snug font-semibold text-primary sm:mt-10 sm:text-xl">
              With more than 10 years of experience, Melissa Peterson has
              significantly contributed to research, teaching and applied
              science.
            </p>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-foreground/80">
              After earning her doctorate from a leading university, Dr
              Pietersen established herself as a thought leader through her work
              in both academic and professional settings. Her research has been
              published in several peer reviewed journals and cited for its
              originality and practical relevance.
            </p>
          </div>

          {/* Portrait — anchored to the right edge at every breakpoint. The
              negative `mr-[calc(50%-50vw)]` cancels the Container's centring
              gutter, so the cut-out sits flush against the viewport's right
              edge on mobile and desktop alike. The Section's `overflow-hidden`
              keeps the bleed from creating a horizontal scrollbar. */}
          <div className="flex justify-end">
            <Image
              src="/images/founder-2.png"
              alt="Dr. Melissa Pietersen, founder of Purple Project, speaking at an event"
              width={595}
              height={562}
              sizes="(min-width: 1024px) 34rem, (min-width: 640px) 32rem, 100vw"
              className="h-auto w-full max-w-md sm:max-w-lg lg:max-w-136"
              loading="eager"
            />
          </div>
        </div>
      </Container>
    </Section>
  );
}
