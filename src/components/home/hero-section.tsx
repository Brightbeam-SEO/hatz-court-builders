"use client";

import Image from "next/image";
import { useHomeScrollReveal } from "@/hooks/use-home-scroll-reveal";
import { SiteHeader } from "@/components/layout/site-header";
import { BUSINESS } from "@/lib/business";
import { homeHeroContactFormHref, HOME_HERO_CONTACT_FORM_ID } from "@/lib/home-anchors";
import { HOME_HERO_VIDEO_SRC } from "@/lib/home-hero-video";
import { ContactForm } from "./contact-form";
import { HeroTrustLogoMarquee } from "./hero-trust-logo-marquee";
import { useHomeContent } from "./home-content-context";

const HERO_COURT_LINK = "#services";

const HERO_COURT_ITEMS = [
  { label: "Basketball", icon: "/images/hero/basketball.png" },
  { label: "Pickleball & Tennis", icon: "/images/hero/pickleball-tennis.png" },
  { label: "Volleyball", icon: "/images/hero/volleyball.png" },
  { label: "Custom Court", icon: "/images/hero/custom-court.png" },
] as const;

const heroCourtIconClass =
  "flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-white bg-zen-crimson shadow-[0_8px_24px_rgba(18,84,155,0.35)] transition-transform duration-200 group-hover:scale-105 xl:h-14 xl:w-14";

function HeroBottomBar() {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 hidden w-full px-[5%] pb-5 lg:block lg:pb-6">
      <div className="pointer-events-auto grid grid-cols-4 items-center gap-x-1 xl:gap-x-2">
        {HERO_COURT_ITEMS.map(({ label, icon }) => (
          <a
            key={label}
            href={HERO_COURT_LINK}
            className="group flex min-w-0 items-center justify-center gap-2 rounded-xl px-2 py-1 transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white xl:gap-2.5 xl:px-3"
          >
            <div className={heroCourtIconClass}>
              <Image
                src={icon}
                alt=""
                width={64}
                height={64}
                className="h-6 w-6 brightness-0 invert xl:h-7 xl:w-7"
                aria-hidden
                unoptimized
              />
            </div>
            <span className="min-w-0 text-center font-heading text-[0.7rem] font-bold leading-tight text-white xl:text-sm">
              {label}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}

function HomeHeroVideoBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
      <video
        key={HOME_HERO_VIDEO_SRC}
        className="absolute inset-0 h-full w-full object-cover"
        src={HOME_HERO_VIDEO_SRC}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />
      <div className="absolute inset-0 bg-black/30" />
    </div>
  );
}

const heroCourtLineClass = "pointer-events-none absolute bg-white/30";

function HeroCourtLinesOverlay() {
  return (
    <div className="pointer-events-none absolute inset-0 z-[5]" aria-hidden>
      <div className={`${heroCourtLineClass} inset-x-0 top-[15%] h-px`} />
      <div className={`${heroCourtLineClass} inset-x-0 bottom-[15%] h-px`} />
      <div
        className={`${heroCourtLineClass} left-1/2 top-[15%] bottom-[15%] w-px -translate-x-1/2`}
      />
      <div className={`${heroCourtLineClass} left-[5%] top-[15%] bottom-[15%] w-px`} />
      <div className={`${heroCourtLineClass} right-[5%] top-[15%] bottom-[15%] w-px`} />
    </div>
  );
}

const phoneHref = BUSINESS.phoneTel;

function HeroIntroCopy({ headingTag: HeadingTag = "h2" }: { headingTag?: "h1" | "h2" }) {
  const { copy } = useHomeContent();
  const { animateClass } = useHomeScrollReveal({ instant: true });
  return (
    <div
      className={`relative z-30 mx-auto flex w-full max-w-3xl flex-col items-center text-center lg:max-w-4xl ${animateClass}`}
    >
      <HeadingTag className="home-reveal home-reveal-d1 mt-2 font-heading text-[2.375rem] leading-[1.02] tracking-[-0.02em] text-white sm:mt-3 sm:text-[2.875rem] md:text-5xl lg:text-[3.625rem] xl:text-[4.75rem]">
        {copy.heroTitle}
      </HeadingTag>
      <p className="home-reveal home-reveal-d2 mt-5 max-w-2xl text-lg font-normal leading-[1.5] text-white/90 sm:mt-6 sm:text-xl">
        {copy.heroSubtitle}
      </p>

      <div className="home-reveal home-reveal-d3 relative z-40 mt-6 flex w-full flex-col items-center justify-center gap-4 pointer-events-auto sm:mt-8 sm:flex-row sm:flex-wrap">
        <a className="btn-call relative z-40" href={phoneHref}>
          {copy.ctaCallVerb} {BUSINESS.phoneDisplay}
        </a>
        <a className="btn-call btn-call-blue relative z-40 focus-visible:!outline-white" href={homeHeroContactFormHref}>
          {copy.ctaBookNowLabel}
        </a>
      </div>
    </div>
  );
}

export function HeroSection() {
  const { copy } = useHomeContent();
  const { ref: stripRef, animateClass: stripAnimateClass } = useHomeScrollReveal({
    threshold: 0.15,
    rootMargin: "0px 0px -4% 0px",
  });
  return (
    <header className="relative isolate min-h-0 overflow-x-clip bg-zen-rice text-zen-espresso">
      <div className="relative isolate min-h-[min(100vh,68rem)] sm:min-h-[min(100svh,68rem)] overflow-hidden">
        <HomeHeroVideoBackdrop />
        <HeroCourtLinesOverlay />

        <div className="relative z-10 flex min-h-[min(100vh,68rem)] flex-col sm:min-h-[min(100svh,68rem)]">
          <SiteHeader blendWithBackground />

          <div className="mx-auto flex w-full flex-1 flex-col items-center justify-center max-w-[95vw] px-2 sm:max-w-[min(80vw,100%)] sm:px-3 md:px-4">
            <section
              id="top"
              className="relative flex w-full flex-col items-center px-4 pb-20 sm:px-6 sm:pb-24 md:px-8 md:pb-28 lg:px-10 lg:pb-32"
            >
              <HeroIntroCopy headingTag="h1" />
            </section>
          </div>
        </div>

        <HeroBottomBar />
      </div>

      <div className="relative z-20 w-full">
        <div className="mx-auto w-full max-w-[95vw] sm:max-w-[min(80vw,100%)] px-2 sm:px-3 md:px-4">
          <section
            ref={stripRef}
            className={`relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen overflow-hidden border-b border-white/10 bg-zen-espresso text-white shadow-[0_18px_45px_rgba(21,21,21,0.35)] ${stripAnimateClass}`}
          >
            <div className="absolute inset-0 bg-zen-espresso" aria-hidden="true" />
            <div className="relative mx-auto w-full max-w-[95vw] px-2 py-6 sm:max-w-[min(80vw,100%)] sm:px-3 sm:py-8 md:px-4 md:py-8 lg:py-10">
              <div className="grid gap-6 lg:grid-cols-[minmax(0,0.4fr)_minmax(0,0.6fr)] lg:items-center lg:gap-8">
                <div className="home-reveal home-reveal-left home-reveal-d1 max-w-md text-left">
                  <h2 className="font-heading text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                    {copy.heroStripHeading}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-white/88 sm:text-base">{copy.heroStripSubheading}</p>
                </div>

                <div
                  className="home-reveal home-reveal-right home-reveal-d2 scroll-mt-28 lg:min-w-0"
                  id={HOME_HERO_CONTACT_FORM_ID}
                >
                  <ContactForm
                    variant="dark"
                    layout="compact-inline"
                    compactMessageSingleLine
                    formName="Homepage hero quick contact strip"
                    submitLabel={copy.contactFormSubmitLabel}
                  />
                </div>
              </div>
            </div>

            <HeroTrustLogoMarquee logos={copy.heroTrustStripLogos} />
          </section>
        </div>
      </div>
    </header>
  );
}
