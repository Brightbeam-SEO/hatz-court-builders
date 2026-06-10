"use client";

import { ContactForm } from "@/components/home/contact-form";
import { HeroTrustLogoMarquee } from "@/components/home/hero-trust-logo-marquee";
import type { HomeTrustStripLogo } from "@/lib/home-page-copy";
import { SiteBreadcrumbs } from "@/components/layout/site-breadcrumbs";
import { SiteWordmarkFooter } from "@/components/layout/site-wordmark-footer";
import { PageHeroCtaButtons } from "@/components/layout/page-hero-cta-buttons";
import { PortalSignInButtons } from "@/components/layout/portal-sign-in-buttons";
import { RentalsListingSection } from "@/components/landing/rentals-listing-section";
import { SiteHeader } from "@/components/layout/site-header";
import { CenteredContactSection } from "@/components/contact/centered-contact-section";
import { HomeContactSection } from "@/components/home/home-contact-section";
import { BoiseBottomContactSection } from "@/components/landing/boise-bottom-contact-section";
import { BoiseLandingTestimonialsSection } from "@/components/landing/boise-landing-testimonials-section";
import { PropertyManagementGallerySection } from "@/components/landing/property-management-gallery-section";
import { PressureWashingBoiseArticleSection } from "@/components/landing/pressure-washing-boise-article-section";
import type { GoogleReview, SocialLink } from "@/lib/home-content";
import { BUSINESS } from "@/lib/business";
import { getBlogHeroBlendStyle } from "@/lib/homepage-hero-bg";
import type { TreasureValleyPressurePageConfig } from "@/lib/treasure-valley-pressure-page-config";
import { gpmPick } from "@/lib/gpm-pick-gallery";

const phoneHref = BUSINESS.phoneTel;
const defaultHeroSrc = gpmPick("multi sport outdoor backyard court");
const defaultHeroContactFormId = "hero-contact-form";

export function PressureWashingBoiseLanding({
  socialLinks,
  articleMarkdown,
  testimonials = [],
  heroTrustStripLogos = [],
  contactFormSubmitLabel = "Submit",
  cityPage,
}: {
  socialLinks: SocialLink[];
  /** Long-form Markdown (read on the server, serialized as a prop for stable SSR + hydration). */
  articleMarkdown: string;
  /** Same merged list as `/reviews` (Sanity Google reviews + hand-authored cards). */
  testimonials?: GoogleReview[] | null;
  heroTrustStripLogos?: HomeTrustStripLogo[];
  contactFormSubmitLabel?: string;
  /** Treasure Valley city overrides (Boise omits this). */
  cityPage?: TreasureValleyPressurePageConfig | null;
}) {
  const heroSrc = cityPage?.heroImageSrc ?? defaultHeroSrc;
  const heroAlt =
    cityPage?.heroImageAlt ??
    `Residential property management at ${BUSINESS.nameShort} in Meridian, Idaho`;
  const heroTitle =
    cityPage?.heroTitle ?? `${BUSINESS.nameShort} — Eagle, Idaho`;
  const heroSubtitle =
    cityPage?.heroSubtitle ??
    "Massage, reflexology, and scalp treatments in a tranquil spa setting. Walk-ins welcome; same-day and last-minute appointments often available.";
  const heroFormId = cityPage?.heroContactFormId ?? defaultHeroContactFormId;
  const heroFormName = cityPage?.heroFormName ?? "Homepage hero";
  const reviewList = testimonials ?? [];

  return (
    <div className="min-h-screen bg-zen-espresso text-white light:bg-transparent light:text-zen-espresso">
      <header className="relative z-[200] isolate min-h-0 overflow-x-clip bg-zen-espresso text-white light:bg-transparent light:text-zen-espresso">
        <SiteHeader anchorBase="/" />
      </header>

      <main className="bg-zen-espresso pb-16 light:bg-transparent">
        <SiteBreadcrumbs />

        <section
          aria-label={heroAlt}
          className="relative left-1/2 z-10 flex w-screen max-w-[100vw] -translate-x-1/2 flex-col justify-center bg-transparent min-h-[28rem] md:min-h-[30rem] lg:min-h-[32rem]"
          style={getBlogHeroBlendStyle(heroSrc)}
        >
          <div className="relative z-10 mx-auto w-full max-w-[95vw] px-2 py-8 sm:max-w-[min(80vw,100%)] sm:px-3 sm:py-10 md:px-4 md:py-12 lg:py-14">
            <div className="flex w-full flex-col gap-6 sm:gap-8 md:flex-row md:items-center md:justify-between md:gap-8 lg:gap-10">
              <div className="flex min-w-0 w-full max-w-3xl flex-col justify-center md:flex-1">
                <h1 className="font-heading text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl">
                  {heroTitle}
                </h1>
                <p className="mt-4 max-w-2xl text-sm font-medium text-white/90 md:text-base">
                  {heroSubtitle}
                </p>
                {cityPage?.heroCtaVariant === "portal-sign-in" ? (
                  <PortalSignInButtons className="mt-8 !mt-8" />
                ) : (
                  <PageHeroCtaButtons
                    className="mt-8 !mt-8"
                    secondaryHref={`#${heroFormId}`}
                  />
                )}
              </div>
              <div className="flex w-full flex-col items-stretch md:min-h-0 md:flex-1 md:basis-0 md:items-center md:justify-center md:pb-0">
                <div
                  id={heroFormId}
                  className="fade-up relative z-20 w-full max-w-xl scroll-mt-28 rounded-3xl border border-white/25 bg-zen-crimson p-6 text-left shadow-[0_24px_55px_rgba(21, 21, 21,0.35)] ring-1 ring-white/20 sm:p-8 md:mx-auto md:w-full md:max-w-sm lg:max-w-md"
                >
                  <ContactForm variant="dark" formName={heroFormName} />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative left-1/2 right-1/2 z-20 -ml-[50vw] -mr-[50vw] w-screen overflow-hidden border-y border-zen-gold/30 bg-zen-crimson text-white shadow-[0_18px_45px_rgba(21, 21, 21,0.12)]">
          <HeroTrustLogoMarquee logos={heroTrustStripLogos} showTopBorder={false} />
        </section>

        {cityPage?.articleLayout === "rentals-listing" && cityPage ? (
          <>
            <RentalsListingSection cityPage={cityPage} />
            {cityPage.splitTestimonialsAboveContact ? (
              <BoiseLandingTestimonialsSection
                testimonials={reviewList}
                sectionId={cityPage.testimonialsSectionId ?? "rentals-testimonials"}
                eyebrow={cityPage.testimonialsSectionEyebrow}
                heading={cityPage.testimonialsSectionHeading ?? "What Our Guests Say"}
                subtext={
                  cityPage.bottomContactSubtext ??
                  cityPage.testimonialsSectionSubtext ??
                  `Real reviews from rental property owners who work with ${BUSINESS.nameShort}.`
                }
                phoneHref={phoneHref}
                bookNowHref={`#${cityPage.centeredContactFormId ?? "property-management-booking-form"}`}
                reviewsDisplayMode="dual-marquee"
                theme="crimson"
              />
            ) : null}
            {cityPage.showHomeContactSection ? (
              <HomeContactSection
                variant="landing"
                formName={cityPage.bottomFormName}
                sectionId={cityPage.centeredContactSectionId ?? "property-management-booking-contact"}
                formWrapperId={cityPage.centeredContactFormId ?? "property-management-booking-form"}
              />
            ) : null}
          </>
        ) : articleMarkdown.trim() ? (
          <>
            <PressureWashingBoiseArticleSection
              markdown={articleMarkdown}
              cityPage={cityPage}
            />
            {cityPage?.gallerySection && !cityPage.hideGallerySection ? (
              <PropertyManagementGallerySection
                eyebrow={cityPage.gallerySection.eyebrow}
                heading={cityPage.gallerySection.heading}
                subheading={cityPage.gallerySection.subheading}
                images={cityPage.gallerySection.images}
              />
            ) : null}
            {cityPage?.splitTestimonialsAboveContact ? (
              <BoiseLandingTestimonialsSection
                testimonials={reviewList}
                sectionId={cityPage.testimonialsSectionId ?? "foot-massage-testimonials"}
                eyebrow={cityPage.testimonialsSectionEyebrow}
                heading={cityPage.testimonialsSectionHeading ?? "What Our Guests Say"}
                subtext={
                  cityPage.bottomContactSubtext ??
                  cityPage.testimonialsSectionSubtext ??
                  `Real reviews from rental owners who work with ${BUSINESS.nameShort}.`
                }
                phoneHref={phoneHref}
                bookNowHref={`#${cityPage.centeredContactFormId ?? "foot-massage-booking-form"}`}
                reviewsDisplayMode="dual-marquee"
                theme="crimson"
              />
            ) : null}
            {!cityPage?.splitTestimonialsAboveContact ? (
              <BoiseBottomContactSection
                testimonials={reviewList}
                includeTestimonials
                layout={cityPage?.bottomContactLayout ?? "card"}
                sectionId={cityPage?.bottomContactSectionId}
                heading={cityPage?.bottomContactHeading}
                subtext={cityPage?.bottomContactSubtext}
                formWrapperId={cityPage?.bottomContactFormId}
                formName={cityPage?.bottomFormName}
              />
            ) : null}
            {cityPage?.showHomeContactSection ? (
              <HomeContactSection
                variant="landing"
                formName={cityPage.bottomFormName}
                sectionId={cityPage.centeredContactSectionId ?? "property-management-booking-contact"}
                formWrapperId={cityPage.centeredContactFormId ?? "property-management-booking-form"}
              />
            ) : cityPage?.showCenteredContactSection ? (
              <CenteredContactSection
                theme="dark"
                sectionId={cityPage.centeredContactSectionId ?? "foot-massage-booking-contact"}
                heading={cityPage.bottomContactHeading}
                subtext={cityPage.bottomContactSubtext}
                formWrapperId={cityPage.centeredContactFormId ?? "foot-massage-booking-form"}
                formName={`${cityPage.bottomFormName} (centered)`}
                submitLabel={contactFormSubmitLabel}
              />
            ) : null}
          </>
        ) : null}
      </main>

      <SiteWordmarkFooter socialLinks={socialLinks} />
    </div>
  );
}
