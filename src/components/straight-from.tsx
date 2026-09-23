"use client";

import * as React from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";

import { Container, Section } from "@/components/ds";

gsap.registerPlugin(useGSAP, DrawSVGPlugin);

/**
 * "Straight from the founder."
 *
 * A dark editorial band: a black-rose photograph fills the background, a
 * two-line headline lockup sits top-left with the founder's bio top-right, and
 * a centred video poster anchors the composition.
 *
 * The headline is an `<h2>` of two spans, mirroring `shining-a-light`: the
 * first is the outline "STRAIGHT FROM" SVG (drawn on with GSAP's DrawSVGPlugin
 * as the band scrolls into view), the second is the italic serif accent. The
 * artwork is the same geometry as `public/images/STRAIGHT FROM.svg`, rendered
 * as strokes and split into its subpaths so each letter draws on in turn.
 */

/** Mask-path geometry from the exported "STRAIGHT FROM" artwork. */
const OUTLINE_PATH = "M20.8785 50.9027C14.0754 50.9027 9.06151 49.5264 5.8369 46.7737C2.6123 43.9816 0.999996 39.8526 0.999996 34.3865V32.9708H10.3789V35.5662C10.3789 38.2796 11.2047 40.2065 12.8563 41.3469C14.5079 42.4873 17.241 43.0575 21.0555 43.0575C24.2407 43.0575 26.5412 42.6446 27.9569 41.8188C29.4119 40.9536 30.1394 39.5576 30.1394 37.6307V36.569C30.1001 34.6814 29.4906 33.2854 28.3108 32.3809C27.1704 31.4765 25.0666 30.6703 21.9993 29.9625L13.3282 27.544C5.81724 25.3418 2.06176 20.9965 2.06176 14.508C2.06176 10.1036 3.57575 6.76104 6.60373 4.48022C9.67104 2.16008 14.154 1.00001 20.0527 1.00001C26.1087 1.00001 30.69 2.21907 33.7966 4.65718C36.9032 7.05597 38.4565 10.5558 38.4565 15.1568V16.8674H29.0777V14.8029C29.0777 12.64 28.3895 11.1064 27.0131 10.2019C25.6368 9.25814 23.3363 8.78625 20.1117 8.78625C17.1623 8.78625 14.9798 9.17949 13.5642 9.96598C12.1878 10.7131 11.4996 11.9322 11.4996 13.6232V14.331C11.4996 15.9433 12.1092 17.2213 13.3282 18.1651C14.5473 19.0696 16.3955 19.7971 18.873 20.3476L27.603 22.7071C31.6534 23.7689 34.6617 25.3418 36.6279 27.426C38.5942 29.4709 39.5773 32.4202 39.5773 36.274C39.5773 41.3862 38.0829 45.1024 35.0943 47.4225C32.145 49.7427 27.4064 50.9027 20.8785 50.9027ZM56.035 50.3129V9.67105H41.5243V1.58988H79.8066V9.67105H65.2959V50.3129H56.035ZM114.058 50.3129C113.586 49.7623 113.35 48.3073 113.35 45.9479V37.9257C113.35 34.0325 111.128 32.086 106.685 32.086H94.1796V50.3129H84.9777V1.58988H106.862C112.171 1.58988 116.123 2.76961 118.718 5.12908C121.353 7.44922 122.67 11.0474 122.67 15.9236V16.1596C122.67 22.6481 120.311 26.6002 115.592 28.0159C117.912 28.6844 119.662 29.9231 120.842 31.7321C122.061 33.541 122.67 35.7628 122.67 38.3976V45.9479C122.67 48.1893 122.906 49.6444 123.378 50.3129H114.058ZM94.1796 24.2997H106.685C108.926 24.2997 110.578 23.8082 111.64 22.8251C112.701 21.842 113.232 20.21 113.232 17.9292V15.3338C113.232 13.2103 112.682 11.6963 111.581 10.7918C110.519 9.84801 108.808 9.37612 106.449 9.37612H94.1796V24.2997ZM126.242 50.3129L141.461 1.58988H154.025L169.302 50.3129H159.57L157.21 42.2317H138.275L135.916 50.3129H126.242ZM140.576 34.2095H154.91L148.185 11.1457L147.772 9.907L147.3 11.1457L140.576 34.2095ZM172.212 50.3129V42.0547H182.063V9.84801H172.212V1.58988H201.057V9.84801H191.265V42.0547H201.057V50.3129H172.212ZM226.66 50.9027C220.25 50.9027 215.256 48.9365 211.677 45.0041C208.138 41.0716 206.369 35.9594 206.369 29.6675V22.3532C206.369 15.9826 208.197 10.8311 211.854 6.89868C215.511 2.96623 220.742 1.00001 227.545 1.00001C233.443 1.00001 238.221 2.61231 241.879 5.83692C245.575 9.0222 247.581 13.1709 247.895 18.2831L247.954 20.6426H238.398L238.339 17.1624C238.143 14.5669 237.061 12.5614 235.095 11.1457C233.168 9.73004 230.691 9.0222 227.663 9.0222C223.534 9.0222 220.525 10.1626 218.638 12.4434C216.75 14.6849 215.806 17.6146 215.806 21.2324V30.6113C215.806 34.2685 216.711 37.2375 218.52 39.5183C220.368 41.7598 223.199 42.8805 227.014 42.8805C233.424 42.8805 237.14 40.0099 238.162 34.2685V32.027H224.477V24.5357H247.954V50.3129H242.527L241.289 44.0603C238.064 48.6219 233.188 50.9027 226.66 50.9027ZM284.093 50.3129V29.9625H264.746V50.3129H255.544V1.58988H264.746V21.9403H284.093V1.58988H293.354V50.3129H284.093ZM313.065 50.3129V9.67105H298.554V1.58988H336.836V9.67105H322.326V50.3129H313.065ZM356.063 50.3129V1.58988H389.154V9.67105H365.265V23.7099H387.739V31.7321H365.265V50.3129H356.063ZM424.314 50.3129C423.842 49.7623 423.606 48.3073 423.606 45.9479V37.9257C423.606 34.0325 421.384 32.086 416.941 32.086H404.436V50.3129H395.234V1.58988H417.118C422.427 1.58988 426.379 2.76961 428.974 5.12908C431.609 7.44922 432.926 11.0474 432.926 15.9236V16.1596C432.926 22.6481 430.567 26.6002 425.848 28.0159C428.168 28.6844 429.918 29.9231 431.098 31.7321C432.317 33.541 432.926 35.7628 432.926 38.3976V45.9479C432.926 48.1893 433.162 49.6444 433.634 50.3129H424.314ZM404.436 24.2997H416.941C419.182 24.2997 420.834 23.8082 421.896 22.8251C422.957 21.842 423.488 20.21 423.488 17.9292V15.3338C423.488 13.2103 422.938 11.6963 421.837 10.7918C420.775 9.84801 419.064 9.37612 416.705 9.37612H404.436V24.2997ZM459.975 50.9027C453.368 50.9027 448.197 48.9168 444.461 44.9451C440.765 40.934 438.917 35.7628 438.917 29.4316V22.3532C438.917 16.0613 440.765 10.9294 444.461 6.95766C448.197 2.9859 453.368 1.00001 459.975 1.00001C466.542 1.00001 471.674 2.9859 475.37 6.95766C479.106 10.8901 480.974 16.0219 480.974 22.3532V29.4316C480.974 35.7628 479.106 40.934 475.37 44.9451C471.674 48.9168 466.542 50.9027 459.975 50.9027ZM448.295 30.6113C448.295 34.1898 449.259 37.1392 451.186 39.4593C453.152 41.7401 456.082 42.8805 459.975 42.8805C463.868 42.8805 466.778 41.7401 468.705 39.4593C470.632 37.1392 471.595 34.1898 471.595 30.6113V21.2324C471.595 17.7326 470.612 14.8226 468.646 12.5024C466.719 10.1823 463.829 9.0222 459.975 9.0222C456.082 9.0222 453.152 10.1823 451.186 12.5024C449.259 14.7832 448.295 17.6932 448.295 21.2324V30.6113ZM487.804 50.3129V1.58988H498.244L510.749 33.5607L523.255 1.58988H533.695V50.3129H524.965V19.4038L512.755 50.3129H508.744L496.534 19.4038V50.3129H487.804Z";

/**
 * The compound path split into its individual `M…Z` subpaths (one per glyph
 * contour). Dashing restarts per subpath, so each is animated separately.
 */
const OUTLINE_SUBPATHS = OUTLINE_PATH.match(/M[^M]+/g) ?? [];

export function StraightFrom() {
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
          defaults: { duration: 0.6, ease: "power2.out" },
        });
        // Draw the letters on one after another, left to right.
        timeline.to(paths, { drawSVG: "100%", stagger: 0.05 });

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
      tone="night"
      className="isolate overflow-hidden text-night-foreground lg:flex lg:min-h-[85vh] lg:flex-col lg:justify-center"
    >
      {/* No-JS fallback: reveal the outline paths that the stylesheet hides. */}
      <noscript>
        <style>{`[data-draw]{stroke-dasharray:none!important;stroke-dashoffset:0!important}`}</style>
      </noscript>

      {/* Background — black rose. The bloom sits ~18% down the artwork, so the
          crop is nudged down to keep it in frame behind the headline. */}
      <Image
        src="/images/flower.jpg"
        alt=""
        aria-hidden
        fill
        sizes="100vw"
        className="-z-20 object-cover object-[50%_25%]"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-night/45" />

      <Container size="wide" className="relative">
        <div ref={root}>
          <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_20rem] xl:items-start xl:gap-12">
            <h2 className="flex flex-col items-start text-white">
              {/* "STRAIGHT FROM" — stroke-only type, drawn on scroll */}
              <span className="block text-display-lg">
                <svg
                  viewBox="0 0 535 52"
                  fill="none"
                  preserveAspectRatio="xMinYMid meet"
                  role="img"
                  aria-label="Straight from"
                  className="block h-[0.72em] w-auto max-w-full"
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

              {/* Italic accent, tucked up and to the right of the outline type */}
              <span className="-mt-1 block font-display text-script-xl leading-[0.9] whitespace-nowrap italic sm:-mt-[0.42em] xl:ml-[36%]">
                the founder
              </span>
            </h2>

            <p className="max-w-sm text-sm leading-relaxed text-white/75 sm:text-base xl:pt-3">
              Dr. Melissa Pietersen is a respected expert in her field, known for
              her interdisciplinary approach and commitment.
            </p>
          </div>

          {/* Video poster — founder.png already carries the play affordance */}
          <div className="mt-12 flex justify-center sm:mt-16">
            <div className="relative w-full max-w-3xl overflow-hidden rounded-3xl shadow-2xl">
              <Image
                src="/images/founder.png"
                alt="Dr. Melissa Pietersen, the founder of Project Purple, speaking on camera"
                width={801}
                height={413}
                sizes="(min-width: 768px) 48rem, 100vw"
                className="h-auto w-full"
              />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
