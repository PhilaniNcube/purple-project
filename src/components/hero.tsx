import { ArrowDown } from "lucide-react";

import { Container } from "@/components/ds";
import Link from "next/link";

/**
 * Homepage hero.
 *
 * Full-viewport brand band: a looping video washed in Purple Project, the
 * three-line headline lockup (italic serif → outline SVG → display sans) and a
 * scroll cue. The site navigation floats transparently above it.
 *
 * The headline lines are plain `<span>`s carrying the type utilities directly
 * (rather than the `<Script />` / `<Display />` wrappers) so the hero reads as
 * a single, exactly-controlled lockup. "AGAINST" is inline SVG so its outline
 * is a real, animatable path — see the note on the `<path>` below.
 *
 * Swap the `src` below for a hosted URL when the final footage is ready.
 */
export function Hero() {
  return (
    <section
      id="top"
      className="relative isolate flex min-h-svh w-full flex-col overflow-hidden bg-brand-900 text-white"
    >
      {/* Background footage */}
      <video
        className="absolute inset-0 -z-20 size-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster="/images/womens-health.png"
        aria-hidden
      >
        <source src="/videos/purple-video.mp4" type="video/mp4" />
      </video>

      {/* Brand wash — unifies the footage with the violet palette */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-brand-700/60 mix-blend-multiply"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-linear-to-b from-brand-900/70 via-brand-800/20 to-brand-950/80"
      />

      <Container className="relative flex flex-1 flex-col items-center justify-center py-32 text-center">
        <h1 className="flex w-full flex-col items-center">
          <span className="block font-display text-script-xl italic text-white">
            Join the fight
          </span>

          {/* "AGAINST" — stroke-only outline type. The path is filled with
              `none` and stroked, so the outline can be drawn on later with
              `stroke-dasharray` / `stroke-dashoffset` (or its width, colour and
              dash pattern transitioned). */}
          <svg
            viewBox="0 0 202 51"
            fill="none"
            role="img"
            aria-label="Against"
            className="mt-1 block h-[0.792em] w-auto text-display-md text-white"
          >
            <path
              d="M24.845 1.97926L31.7863 48.6098H19.3726L18.7677 40.2284H14.4186L13.6986 48.6098H1.14087L7.30452 1.97926H24.845ZM18.4221 31.9622C17.8077 26.6818 17.1932 20.163 16.5788 12.4056C15.3499 21.3151 14.5818 27.8339 14.2746 31.9622H18.4221ZM61.6829 19.1453H49.5572V14.9114C49.5572 12.2424 49.442 10.5719 49.2116 9.89983C48.9811 9.22778 48.4339 8.89176 47.5698 8.89176C46.821 8.89176 46.3121 9.17978 46.0433 9.75582C45.7745 10.3319 45.6401 11.8104 45.6401 14.1913V36.5706C45.6401 38.6635 45.7745 40.046 46.0433 40.7181C46.3121 41.3709 46.8498 41.6973 47.6562 41.6973C48.5395 41.6973 49.1348 41.3229 49.442 40.5741C49.7684 39.8252 49.9316 38.3659 49.9316 36.1961V30.6661H47.4834V23.5808H61.6829V48.6098H54.0503L52.927 45.2688C52.1014 46.7089 51.0549 47.7938 49.7876 48.5234C48.5395 49.2339 47.061 49.5891 45.3521 49.5891C43.3167 49.5891 41.4062 49.0995 39.6205 48.1202C37.8539 47.1217 36.5098 45.8928 35.5882 44.4335C34.6665 42.9742 34.0905 41.4477 33.86 39.854C33.6296 38.2411 33.5144 35.8313 33.5144 32.6247V18.7709C33.5144 14.3162 33.7544 11.0807 34.2345 9.06457C34.7145 7.04843 36.0874 5.20509 38.3532 3.53457C40.6381 1.84485 43.5856 0.999988 47.1954 0.999988C50.7477 0.999988 53.6951 1.72964 56.0377 3.18895C58.3802 4.64825 59.9067 6.38598 60.6172 8.40212C61.3276 10.3991 61.6829 13.3081 61.6829 17.1292V19.1453ZM87.3455 1.97926L94.2868 48.6098H81.8731L81.2683 40.2284H76.9192L76.1991 48.6098H63.6414L69.8051 1.97926H87.3455ZM80.9227 31.9622C80.3082 26.6818 79.6938 20.163 79.0793 12.4056C77.8504 21.3151 77.0824 27.8339 76.7752 31.9622H80.9227ZM108.486 1.97926V48.6098H96.3606V1.97926H108.486ZM140.428 1.97926V48.6098H129.8L123.492 27.4115V48.6098H113.354V1.97926H123.492L130.289 22.976V1.97926H140.428ZM171.016 16.0923H159.754V12.636C159.754 11.0231 159.61 9.99584 159.322 9.55421C159.034 9.11258 158.554 8.89176 157.882 8.89176C157.152 8.89176 156.595 9.18938 156.211 9.78462C155.846 10.3799 155.664 11.2823 155.664 12.492C155.664 14.0473 155.875 15.2186 156.298 16.0059C156.701 16.7931 157.843 17.7436 159.725 18.8573C165.121 22.0639 168.519 24.6945 169.921 26.7491C171.323 28.8036 172.024 32.1158 172.024 36.6858C172.024 40.0076 171.63 42.4558 170.843 44.0303C170.075 45.6048 168.577 46.9297 166.35 48.005C164.122 49.0611 161.53 49.5891 158.573 49.5891C155.328 49.5891 152.553 48.9747 150.249 47.7458C147.964 46.5169 146.467 44.952 145.756 43.051C145.046 41.1501 144.69 38.4523 144.69 34.9576V31.9046H155.952V37.5786C155.952 39.326 156.106 40.4492 156.413 40.9485C156.739 41.4477 157.306 41.6973 158.112 41.6973C158.919 41.6973 159.514 41.3805 159.898 40.7469C160.301 40.1132 160.503 39.1723 160.503 37.9243C160.503 35.1785 160.128 33.3831 159.38 32.5383C158.611 31.6934 156.72 30.2821 153.706 28.3044C150.691 26.3074 148.694 24.8577 147.715 23.9552C146.735 23.0528 145.919 21.8047 145.266 20.211C144.633 18.6173 144.316 16.5819 144.316 14.1049C144.316 10.5335 144.767 7.92209 145.67 6.27077C146.591 4.61945 148.07 3.33296 150.105 2.41129C152.141 1.47042 154.598 0.999988 157.479 0.999988C160.628 0.999988 163.306 1.50883 165.514 2.5265C167.742 3.54417 169.211 4.83067 169.921 6.38598C170.651 7.92209 171.016 10.5431 171.016 14.2489V16.0923ZM200.278 1.97926V11.3111H193.078V48.6098H180.952V11.3111H173.781V1.97926H200.278Z"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              strokeLinejoin="round"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          <span className="mt-2 block font-heading text-display-md uppercase text-white lg:whitespace-nowrap">
            Gynaecological Cancer
          </span>
        </h1>

        <p className="mt-8 max-w-md text-base leading-relaxed text-white/80 sm:text-lg">
          Join a movement breaking the stigma around gynaecological cancer and
          sparking life-saving conversations.
        </p>
      </Container>

      <Link
        href="#mission"
        aria-label="Scroll to explore"
        className="relative mx-auto mb-10 rounded-full flex size-14 shrink-0 items-center justify-center border border-white/60 text-white transition-colors outline-none hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white/70"
      >
        <ArrowDown aria-hidden className="size-6 animate-float" />
      </Link>
    </section>
  );
}
