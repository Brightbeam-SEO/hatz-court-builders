"use client";

import { useHomeScrollReveal } from "@/hooks/use-home-scroll-reveal";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteSocialIcon } from "@/components/layout/site-social-icon";
import { BUSINESS } from "@/lib/business";
import { homeHeroContactFormHref, HOME_HERO_CONTACT_FORM_ID } from "@/lib/home-anchors";
import { HOME_HERO_VIDEO_SRC } from "@/lib/home-hero-video";
import type { SocialLink } from "@/lib/home-content";
import { ContactForm } from "./contact-form";
import { HeroTrustLogoMarquee } from "./hero-trust-logo-marquee";
import { useHomeContent } from "./home-content-context";

const HERO_SOCIAL_LABELS = ["Google Business", "Facebook", "Instagram"] as const;

const heroSocialBtnClass =
  "group inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/25 bg-white/15 text-white shadow-[0_8px_28px_rgba(0,0,0,0.18)] backdrop-blur-xl transition-colors duration-200 hover:border-zen-crimson hover:bg-zen-crimson hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

function HeroBottomBar({ socialLinks }: { socialLinks: SocialLink[] }) {
  const heroSocials = HERO_SOCIAL_LABELS.flatMap((label) => {
    const link = socialLinks.find((social) => social.label === label);
    return link ? [link] : [];
  });

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 hidden w-full px-4 pb-6 sm:px-6 sm:pb-8 md:px-8 md:pb-10 lg:block lg:px-10">
      <div className="flex w-full items-end justify-between gap-4 sm:gap-6">
        <div className="pointer-events-auto min-w-0 flex-1 text-white">
          <div className="flex w-full min-w-0 flex-col gap-3 sm:flex-row sm:items-start sm:gap-5 md:gap-8">
            <p className="shrink-0 font-heading text-base font-bold leading-[1.15] sm:text-lg md:text-xl lg:text-2xl">
              <span className="block whitespace-nowrap">Custom Courts</span>
              <span className="block whitespace-nowrap">Built to Last</span>
            </p>
            <p className="min-w-0 max-w-[18rem] text-xs leading-relaxed text-white/90 sm:max-w-[15rem] sm:flex-none sm:text-sm md:max-w-[17rem] md:text-[0.95rem] lg:max-w-xs xl:max-w-sm">
              Tennis, basketball, pickleball, and multi-use courts with every major surfacing system —
              from backyard builds to commercial facilities.
            </p>
          </div>
        </div>

        {heroSocials.length > 0 ? (
          <ul className="pointer-events-auto ml-2 flex shrink-0 flex-col gap-2.5 sm:ml-4">
            {heroSocials.map((social) => (
              <li key={social.label}>
                <a
                  className={heroSocialBtnClass}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  title={social.label}
                >
                  <SiteSocialIcon label={social.label} className="h-5 w-5 text-white" />
                  <span className="sr-only">{social.label}</span>
                </a>
              </li>
            ))}
          </ul>
        ) : null}
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
      <div className="hero-cinematic-scrim absolute inset-0" />
    </div>
  );
}

const phoneHref = BUSINESS.phoneTel;

function HeroIntroCopy({ headingTag: HeadingTag = "h2" }: { headingTag?: "h1" | "h2" }) {
  const { copy } = useHomeContent();
  const { animateClass } = useHomeScrollReveal({ instant: true });
  return (
    <div
      className={`relative z-30 mx-auto flex w-full max-w-3xl -translate-y-2 flex-col items-center text-center sm:-translate-y-3 lg:max-w-4xl ${animateClass}`}
    >
      <HeadingTag className="home-reveal home-reveal-d1 mt-2 font-heading text-[2.375rem] leading-[1.02] tracking-[-0.02em] text-zen-espresso sm:mt-3 sm:text-[2.875rem] md:text-5xl lg:text-[3.625rem] xl:text-[4.75rem]">
        {copy.heroTitle}
      </HeadingTag>
      <p className="home-reveal home-reveal-d2 mt-5 max-w-2xl text-lg font-normal leading-[1.5] text-zen-espresso/90 sm:mt-6 sm:text-xl">
        {copy.heroSubtitle}
      </p>

      <div className="home-reveal home-reveal-d3 relative z-40 mt-6 flex w-full flex-col items-center justify-center gap-4 pointer-events-auto sm:mt-8 sm:flex-row sm:flex-wrap">
        <a className="btn-call relative z-40" href={phoneHref}>
          {copy.ctaCallVerb} {BUSINESS.phoneDisplay}
        </a>
        <a className="btn-alt relative z-40" href={homeHeroContactFormHref}>
          {copy.ctaBookNowLabel}
        </a>
      </div>
    </div>
  );
}

export function HeroSection() {
  const { copy, socialLinks } = useHomeContent();
  const { ref: stripRef, animateClass: stripAnimateClass } = useHomeScrollReveal({
    threshold: 0.15,
    rootMargin: "0px 0px -4% 0px",
  });
  return (
    <header className="relative isolate min-h-0 overflow-x-clip bg-zen-rice text-zen-espresso">
      <div className="relative isolate min-h-[min(100vh,68rem)] sm:min-h-[min(100svh,68rem)] overflow-hidden">
        <HomeHeroVideoBackdrop />

        <div className="relative z-10">
          <SiteHeader blendWithBackground />

          <div className="mx-auto w-full max-w-[95vw] px-2 sm:max-w-[min(80vw,100%)] sm:px-3 md:px-4">
            <section
              id="top"
              className="relative flex flex-col items-center px-4 pb-24 pt-2 sm:px-6 sm:pb-28 sm:pt-3 md:px-8 md:pb-32 md:pt-4 lg:px-10 lg:pb-36"
            >
              <HeroIntroCopy headingTag="h1" />
            </section>
          </div>
        </div>

        <HeroBottomBar socialLinks={socialLinks} />
      </div>

      <div className="relative z-20 w-full">
        <div className="mx-auto w-full max-w-[95vw] sm:max-w-[min(80vw,100%)] px-2 sm:px-3 md:px-4">
          <section
            ref={stripRef}
            className={`relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen overflow-hidden border-b border-white/10 bg-zen-espresso text-white shadow-[0_18px_45px_rgba(0,0,0,0.25)] ${stripAnimateClass}`}
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
