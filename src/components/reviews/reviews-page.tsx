import type { CSSProperties } from "react";
import Image from "next/image";
import type { GoogleReview, SocialLink } from "@/lib/home-content";
import { BlogHeroBand } from "@/components/blog/blog-hero-band";
import { HomeContactSection } from "@/components/home/home-contact-section";
import { HomeSectionGridDecor } from "@/components/home/home-section-grid-decor";
import { PageHeroCtaButtons } from "@/components/layout/page-hero-cta-buttons";
import { SiteBreadcrumbs } from "@/components/layout/site-breadcrumbs";
import { SiteFooterRegion } from "@/components/layout/site-footer-region";
import { SiteHeader } from "@/components/layout/site-header";
import { ReviewsFeaturedCarousel } from "@/components/reviews/reviews-featured-carousel";
import { BUSINESS } from "@/lib/business";
import { gpmImageAlt } from "@/lib/gpm-gallery-images";
import { gpmPick } from "@/lib/gpm-pick-gallery";

const REVIEWS_HERO_IMAGE = gpmPick("backyard multi sport pickleball basketball court");

const reviewStarClass = "text-[#FFD54A] drop-shadow-[0_0_1px_rgba(0,0,0,0.35)]";

export function ReviewsPage({
  socialLinks,
  testimonials,
}: {
  socialLinks: SocialLink[];
  testimonials: GoogleReview[];
}) {
  return (
    <div className="min-h-screen bg-zen-espresso text-white light:bg-transparent light:text-zen-espresso">
      <header className="relative z-[200] isolate min-h-0 overflow-x-clip bg-zen-espresso text-white light:bg-transparent light:text-zen-espresso">
        <SiteHeader anchorBase="/" />
      </header>

      <main className="bg-zen-espresso pb-16 light:bg-transparent">
        <SiteBreadcrumbs />
        <BlogHeroBand imageSrc={REVIEWS_HERO_IMAGE} imageAlt={gpmImageAlt(REVIEWS_HERO_IMAGE)}>
          <div className="min-w-0 w-full max-w-3xl">
            <h1 className="font-heading text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl">
              Reviews
            </h1>
            <p className="mt-2 max-w-2xl text-sm font-medium text-white/90 md:text-base">
              See what homeowners and facilities say about working with {BUSINESS.nameShort}.
            </p>
            <PageHeroCtaButtons />
          </div>
        </BlogHeroBand>

        <section className="section-pad relative overflow-hidden bg-zen-espresso text-white light:bg-transparent light:text-zen-espresso">
          <HomeSectionGridDecor placement="reviews-featured-right" />
          <div className="shell relative z-10">
            <div className="mx-auto w-full max-w-5xl space-y-6 px-3 sm:px-4">
              <ReviewsFeaturedCarousel testimonials={testimonials} />

              <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
                {testimonials.map((review, index) => (
                  <article
                    key={review.id}
                    className="reviews-card-reveal hero-glass-light mb-4 break-inside-avoid rounded-2xl border border-white/25 bg-white/12 p-5 backdrop-blur-xl transition-transform duration-300 ease-out hover:-translate-y-0.5 hover:scale-[1.02] motion-reduce:hover:translate-y-0 motion-reduce:hover:scale-100 light:border-slate-200 light:bg-white/85 light:shadow-none"
                    style={{ "--reviews-enter-delay": `${index * 70}ms` } as CSSProperties}
                  >
                    <p className={`mt-1 ${reviewStarClass}`} aria-label="5 out of 5 stars">
                      ★★★★★
                    </p>
                    <blockquote className="mt-3 text-sm leading-7 text-white/90 light:text-zen-taupe">
                      {review.quote}
                    </blockquote>
                    <div className="mt-4 flex items-center gap-3 border-t border-white/15 pt-4 light:border-slate-200">
                      <div className="relative h-10 w-10 overflow-hidden rounded-full ring-1 ring-white/30 light:ring-slate-300">
                        <Image
                          src={review.image}
                          alt={review.name}
                          width={40}
                          height={40}
                          className="h-full w-full object-cover"
                          unoptimized
                        />
                      </div>
                      <div className="flex h-10 items-center">
                        <p className="font-heading text-base font-semibold text-white light:text-zen-espresso">
                          {review.name}
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2">
          <HomeContactSection formName="Reviews page contact section" />
        </div>
      </main>

      <SiteFooterRegion socialLinks={socialLinks} />
    </div>
  );
}
