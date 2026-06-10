"use client";

import Image from "next/image";
import { SiteFooterRegion } from "@/components/layout/site-footer-region";
import { HomeContactSection } from "./home-contact-section";
import { FaqSection } from "./faq-section";
import { ClosingShowcaseSection } from "./closing-showcase-section";
import { HeroSection } from "./hero-section";
import { LocalIntroSection } from "./local-intro-section";
import { ProcessTimelineSection } from "./process-timeline-section";
import { ServiceAreaSectionAlt } from "./service-area-section-alt";
import { ServicesSection } from "./services-section";
import { HomeSectionGridDecor } from "./home-section-grid-decor";
import { HomeTestimonialsFeatured } from "./home-testimonials-featured";
import { HomeActionButtons } from "./home-action-buttons";
import { additionalReviewsPageTestimonials } from "@/lib/reviews-testimonials";
import { gpmImageAlt } from "@/lib/gpm-gallery-images";
import { gpmSlot } from "@/lib/gpm-pick-gallery";
import { useHomeScrollReveal } from "@/hooks/use-home-scroll-reveal";
import { useHomeContent } from "./home-content-context";

const HOME_PROOF_RELAX = gpmSlot(3);

export function HomePage() {
  const { socialLinks, copy } = useHomeContent();
  const { ref: trustRef, animateClass: trustAnimateClass } = useHomeScrollReveal();
  return (
    <>
      <HeroSection />
      <main className="min-w-0 flex-1 overflow-x-clip">
        <LocalIntroSection>
          <p className="local-intro-eyebrow section-eyebrow">{copy.localIntroEyebrow}</p>
          <h2 className="mx-auto max-w-[46rem] font-heading text-3xl font-bold leading-[1.15] tracking-tight text-zen-espresso sm:text-4xl sm:leading-[1.12] md:text-[3rem] md:leading-[1.1] lg:mx-0 lg:max-w-none lg:text-[3.75rem] lg:leading-[1.08]">
            <span className="inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-2 lg:justify-start">
              <span className="text-pretty">
                <span className="text-zen-crimson">{copy.localIntroTitleLine1}</span>
                {copy.localIntroTitleLine2.trim() ? (
                  <>
                    {" "}
                    <span className="text-zen-espresso">{copy.localIntroTitleLine2}</span>
                  </>
                ) : null}
              </span>
              <span className="relative inline-flex h-11 w-20 shrink-0 overflow-hidden rounded-full border border-zen-gold/30 bg-white align-middle shadow-[0_10px_24px_rgba(21,21,21,0.08)] sm:h-12 sm:w-24">
                <Image
                  src={HOME_PROOF_RELAX}
                  alt={gpmImageAlt(HOME_PROOF_RELAX)}
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              </span>
            </span>
          </h2>
          <p className="local-intro-body mx-auto mt-5 max-w-2xl text-pretty leading-7 text-zen-taupe lg:mx-0 lg:max-w-none">
            {copy.localIntroBody}
          </p>
          <HomeActionButtons
            centered
            secondaryClassName="!border-zen-espresso !text-zen-espresso hover:!bg-zen-espresso hover:!text-white focus-visible:!outline-zen-espresso"
          />
        </LocalIntroSection>

        <ServicesSection />

        <section className="home-section-viewport home-section-viewport--center relative flex flex-col overflow-hidden bg-zen-rice pt-6 text-zen-espresso sm:pt-8 md:pt-10 lg:py-0">
          <HomeSectionGridDecor placement="left" />
          <div className="home-section-viewport-inner relative z-10 mx-auto w-full max-w-[95vw] shrink-0 px-2 sm:max-w-[min(80vw,100%)] sm:px-3 md:px-4">
            <ClosingShowcaseSection />
          </div>
        </section>

        <ProcessTimelineSection />

        <section
          ref={trustRef}
          className={`home-section-viewport home-section-viewport--center section-pad bg-zen-espresso text-white lg:min-h-[108dvh] lg:justify-start lg:!pt-16 lg:pb-8 xl:!pt-24 xl:min-h-[112dvh] 2xl:!pt-28 ${trustAnimateClass}`}
          id="trust"
        >
          <div className="shell mb-10 md:mb-14 lg:mb-16 xl:mb-20">
            <h2 className="trust-intro-reveal mx-auto max-w-4xl text-center font-heading text-3xl font-bold leading-[0.98] tracking-tight text-white md:text-4xl">
              {copy.trustMarqueeHeading}
            </h2>
            <p className="trust-intro-reveal mx-auto mt-4 max-w-3xl text-center text-base leading-7 text-white/88 sm:text-lg">
              {copy.trustMarqueeSubtext}
            </p>
            <div className="trust-carousel-reveal mt-12 lg:mt-14">
              <HomeTestimonialsFeatured testimonials={additionalReviewsPageTestimonials} />
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
