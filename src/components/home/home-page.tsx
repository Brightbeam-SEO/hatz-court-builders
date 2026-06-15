"use client";

import { SiteFooterRegion } from "@/components/layout/site-footer-region";
import { HomeContactSection } from "./home-contact-section";
import { FaqSection } from "./faq-section";
import { VercepFeatureSection } from "@/components/ui/vercep-feature-1";
import { HeroSection } from "./hero-section";
import { LocalIntroSection } from "./local-intro-section";
import { ProcessTimelineSection } from "./process-timeline-section";
import { ServiceAreaSectionAlt } from "./service-area-section-alt";
import { ServicesSection } from "./services-section";
import { HomeTestimonialsFeatured } from "./home-testimonials-featured";
import { HomeActionButtons } from "./home-action-buttons";
import { additionalReviewsPageTestimonials } from "@/lib/reviews-testimonials";
import { gpmImageAlt } from "@/lib/gpm-gallery-images";
import { gpmPick } from "@/lib/gpm-pick-gallery";
import {
  LOCAL_INTRO_CAROUSEL_PATHS,
  LOCAL_INTRO_DESKTOP_CAROUSEL_PATHS,
} from "@/lib/local-intro-carousel";
import { useHomeScrollReveal } from "@/hooks/use-home-scroll-reveal";
import { useHomeContent } from "./home-content-context";

const LOCAL_INTRO_LEFT_IMAGE = gpmPick("backyard multi sport pickleball basketball court");

export function HomePage() {
  const { socialLinks, copy } = useHomeContent();
  const { ref: trustRef, animateClass: trustAnimateClass } = useHomeScrollReveal();
  return (
    <>
      <HeroSection />
      <main className="min-w-0 flex-1 overflow-x-clip">
        <LocalIntroSection
          leftImageSrc={LOCAL_INTRO_LEFT_IMAGE}
          leftImageAlt={gpmImageAlt(LOCAL_INTRO_LEFT_IMAGE)}
          rightImageSrc={LOCAL_INTRO_CAROUSEL_PATHS[1]}
          rightImageAlt={gpmImageAlt(LOCAL_INTRO_CAROUSEL_PATHS[1])}
          rightCarouselImages={LOCAL_INTRO_DESKTOP_CAROUSEL_PATHS}
          eyebrow={
            <p className="local-intro-eyebrow section-eyebrow max-lg:mx-auto">{copy.localIntroEyebrow}</p>
          }
          heading={
            <h2 className="mx-auto max-w-[46rem] font-heading text-4xl font-bold leading-[1.15] tracking-tight text-zen-espresso sm:text-5xl sm:leading-[1.12] md:text-[3.375rem] md:leading-[1.1] lg:mx-0 lg:ml-auto lg:max-w-none lg:text-[4.25rem] lg:leading-[1.08]">
              <span className="text-pretty">
                <span className="text-zen-crimson">{copy.localIntroTitleLine1}</span>
                {copy.localIntroTitleLine2.trim() ? (
                  <>
                    {" "}
                    <span className="text-zen-espresso">{copy.localIntroTitleLine2}</span>
                  </>
                ) : null}
              </span>
            </h2>
          }
          body={
            <p className="local-intro-body mx-auto max-w-2xl text-pretty leading-7 text-zen-taupe max-lg:text-center lg:mx-0 lg:max-w-none lg:text-left">
              {copy.localIntroBody}
            </p>
          }
          actionButtonsSecondaryClassName="!border-zen-espresso !text-zen-espresso hover:!bg-zen-espresso hover:!text-white focus-visible:!outline-zen-espresso"
        />

        <ServicesSection />

        <section className="home-section-viewport home-section-viewport--center relative flex flex-col overflow-hidden bg-zen-rice pt-6 pb-6 text-zen-espresso sm:pt-8 sm:pb-8 md:pt-10 md:pb-10 lg:py-24 xl:py-28">
          <div className="home-section-viewport-inner relative z-10 mx-auto w-full max-w-[95vw] shrink-0 px-2 sm:max-w-[min(80vw,100%)] sm:px-3 md:px-4">
            <VercepFeatureSection />
          </div>
        </section>

        <ProcessTimelineSection />

        <section
          ref={trustRef}
          className={`home-section-viewport home-section-viewport--center section-pad bg-zen-espresso text-white ${trustAnimateClass}`}
          id="trust"
        >
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 xl:px-10">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,30%)_minmax(0,70%)] lg:items-center lg:gap-8 xl:gap-12">
              <div className="trust-intro-reveal mx-auto max-w-xl text-center lg:mx-0 lg:max-w-none lg:text-left">
                <h2 className="font-heading text-4xl font-bold leading-[0.98] tracking-tight text-white md:text-5xl lg:text-[2.75rem] lg:leading-[1.02] xl:text-5xl">
                  {copy.trustMarqueeHeading}
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-white/88 sm:text-lg lg:mx-0 lg:max-w-[22rem] xl:max-w-[26rem]">
                  {copy.trustMarqueeSubtext}
                </p>
                <HomeActionButtons centered secondaryClassName="btn-alt-inverse" />
              </div>
              <div className="trust-carousel-reveal min-w-0 lg:w-full">
                <HomeTestimonialsFeatured testimonials={additionalReviewsPageTestimonials} />
              </div>
            </div>
          </div>
        </section>

        <ServiceAreaSectionAlt />

        <FaqSection />

        <HomeContactSection />

      </main>

      <SiteFooterRegion socialLinks={socialLinks} />
    </>
  );
}
