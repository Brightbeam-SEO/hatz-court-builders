"use client";

import Image from "next/image";
import Link from "next/link";
import { BlogBookingStrip } from "@/components/blog/blog-article-lead-cta";
import { BlogHeroBand } from "@/components/blog/blog-hero-band";
import type { HomeContent, SocialLink } from "@/lib/home-content";
import { HeroTrustLogoMarquee } from "@/components/home/hero-trust-logo-marquee";
import { HomeContentProvider } from "@/components/home/home-content-context";
import { ServicesSection } from "@/components/home/services-section";
import { PageHeroCtaButtons } from "@/components/layout/page-hero-cta-buttons";
import { SiteBreadcrumbs } from "@/components/layout/site-breadcrumbs";
import { SiteFooterRegion } from "@/components/layout/site-footer-region";
import { SiteHeader } from "@/components/layout/site-header";
import { BUSINESS } from "@/lib/business";
import { defaultHomePageCopy } from "@/lib/home-page-copy";
import { additionalReviewsPageTestimonials } from "@/lib/reviews-testimonials";
import { gpmImageAlt } from "@/lib/gpm-gallery-images";
import { gpmPick } from "@/lib/gpm-pick-gallery";

const aboutHeroImage = gpmPick("outdoor multi court acrylic surfacing");
const aboutCollagePrimary = gpmPick("backyard pickleball basketball dual sport court");
const aboutCollageSecondary = gpmPick("indoor hardwood basketball court gym interior");
const aboutCollageFoot = gpmPick("tennis court resurface blue green acrylic");
const aboutWhyPanel = gpmPick("basketball tile court custom logo branding");

const closingShowcaseAvatars = additionalReviewsPageTestimonials.slice(0, 3);

const whyHomeownersItems = [
  {
    icon: "/images/about/family-owned-operated.svg",
    title: "All surface types",
    body: "Acrylic, cushioned acrylic, modular tile, hardwood, synthetic turf, asphalt, and concrete — not just one system.",
  },
  {
    icon: "/images/about/personally-managed.svg",
    title: "One-stop shop",
    body: "Design, construction, resurfacing, striping, fencing, lighting, and components from one trusted team.",
  },
  {
    icon: "/images/about/integrity-transparency.svg",
    title: "Residential & commercial",
    body: "Backyard courts, school facilities, parks & rec projects, and multi-court complexes across Idaho and Arizona.",
  },
  {
    icon: "/images/about/treasure-valley-focus.svg",
    title: "Idaho & Arizona",
    body: `Founded ${BUSINESS.foundedDate} — serving Boise, Scottsdale, and communities across both states.`,
  },
] as const;

function AboutTrustedLocalsCard() {
  const { closingShowcaseBragLine, closingShowcaseBragSubline } = defaultHomePageCopy;
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-4 text-left text-zen-espresso shadow-[0_18px_35px_rgba(21, 21, 21,0.18)]">
      <p className="font-heading text-sm font-semibold tracking-tight text-zen-crimson">
        Locally Owned
      </p>
      <p className="mt-1 text-xs leading-relaxed text-zen-taupe">
        Custom court construction in Idaho & Arizona since {BUSINESS.foundedYearLabel}.
      </p>
      <div className="mt-3 flex items-center gap-3">
        <div className="flex items-center">
          {closingShowcaseAvatars.map((review, idx) => (
            <div
              key={review.id}
              className={`relative h-8 w-8 overflow-hidden rounded-full border-2 border-white ${
                idx === 0 ? "" : "-ml-2.5"
              }`}
            >
              <Image
                src={review.image}
                alt=""
                fill
                className="object-cover"
                sizes="32px"
                unoptimized
              />
            </div>
          ))}
        </div>
        <div>
          <p className="text-[12px] leading-none text-zen-sage">{closingShowcaseBragLine}</p>
          <p className="mt-1 text-[11px] leading-none text-zen-taupe/90">{closingShowcaseBragSubline}</p>
        </div>
      </div>
    </div>
  );
}

export function AboutPage({
  homeContent,
  socialLinks,
}: {
  homeContent: HomeContent;
  socialLinks: SocialLink[];
}) {
  return (
    <div className="min-h-screen bg-zen-espresso text-white light:bg-transparent light:text-zen-espresso">
      <header className="relative z-[200] isolate min-h-0 overflow-x-clip bg-zen-espresso text-white light:bg-transparent light:text-zen-espresso">
        <SiteHeader anchorBase="/" />
      </header>

      <main className="bg-zen-espresso pb-16 light:bg-transparent">
        <SiteBreadcrumbs />
        <BlogHeroBand imageSrc={aboutHeroImage} imageAlt={gpmImageAlt(aboutHeroImage)}>
          <div className="min-w-0 w-full max-w-3xl">
            <h1 className="font-heading text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl">
              About Us
            </h1>
            <p className="mt-2 max-w-2xl text-sm font-medium text-white/90 md:text-base">
              {BUSINESS.nameFull} — {BUSINESS.legalNote}. Custom tennis, basketball, pickleball, and multi-use
              courts for homeowners, schools, and parks.
            </p>
            <PageHeroCtaButtons />
          </div>
        </BlogHeroBand>

        <section className="relative left-1/2 right-1/2 z-20 -ml-[50vw] -mr-[50vw] w-screen overflow-hidden border-y border-zen-gold/30 bg-zen-crimson text-white shadow-[0_18px_45px_rgba(21, 21, 21,0.12)]">
          <HeroTrustLogoMarquee logos={homeContent.copy.heroTrustStripLogos} showTopBorder={false} />
        </section>

        <section className="section-pad pb-0">
          <div className="shell">
            <div className="grid items-stretch gap-8 text-white light:text-zen-espresso sm:gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-12">
              <div className="grid min-h-[17.5rem] w-full min-w-0 grid-cols-2 grid-rows-[minmax(0,1fr)_minmax(0,1fr)_auto] gap-3 sm:min-h-[22rem] sm:gap-4 lg:min-h-[30rem]">
                <div className="relative col-start-1 row-span-2 row-start-1 min-h-0 overflow-hidden rounded-2xl">
                  <Image
                    src={aboutCollagePrimary}
                    alt={gpmImageAlt(aboutCollagePrimary)}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 45vw, 25vw"
                  />
                </div>
                <div className="relative col-start-2 row-span-2 row-start-1 min-h-0 overflow-hidden rounded-2xl">
                  <Image
                    src={aboutCollageSecondary}
                    alt={gpmImageAlt(aboutCollageSecondary)}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 45vw, 25vw"
                  />
                </div>
                <div className="col-start-1 row-start-3 min-w-0 self-stretch">
                  <AboutTrustedLocalsCard />
                </div>
                <div className="relative col-start-2 row-start-3 min-h-[7.5rem] self-stretch overflow-hidden rounded-2xl">
                  <Image
                    src={aboutCollageFoot}
                    alt={gpmImageAlt(aboutCollageFoot)}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 45vw, 25vw"
                  />
                </div>
              </div>

              <article className="flex min-w-0 flex-col">
                <h2 className="font-heading text-3xl font-bold leading-tight md:text-4xl">
                  About {BUSINESS.nameShort}
                </h2>
                <p className="mt-4 text-base leading-7 text-white/85 light:text-zen-taupe">
                  {BUSINESS.nameShort} opened {BUSINESS.foundedDate} as a trusted court builder serving Idaho and
                  Arizona. We specialize in sports construction for residential and commercial projects.
                </p>
                <p className="mt-4 text-base leading-7 text-white/85 light:text-zen-taupe">
                  {BUSINESS.descriptionShort} We also serve Phoenix, Scottsdale, Mesa, Gilbert, Chandler, and
                  surrounding Arizona communities with the same full design-build approach.
                </p>
                <PageHeroCtaButtons onDark={false} />
              </article>
            </div>
          </div>
        </section>

        <HomeContentProvider value={homeContent}>
          <ServicesSection layout="about" />
        </HomeContentProvider>

        <section className="section-pad">
          <div className="shell">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,3fr)_minmax(0,3fr)_minmax(0,4fr)] lg:grid-rows-[auto_auto_minmax(0,1fr)] lg:items-stretch lg:gap-x-10 lg:gap-y-8">
              <h2 className="font-heading text-3xl font-bold leading-tight text-white light:text-zen-espresso md:text-4xl lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:max-w-4xl lg:pr-4">
                Why Clients Choose {BUSINESS.nameShort}
              </h2>

              <div className="relative min-h-[16rem] w-full overflow-hidden rounded-3xl sm:min-h-[20rem] lg:col-start-3 lg:row-span-3 lg:row-start-1 lg:min-h-0 lg:self-stretch">
                <Image
                  src={aboutWhyPanel}
                  alt={gpmImageAlt(aboutWhyPanel)}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>

              <article className="flex min-w-0 flex-col rounded-3xl border border-zen-crimson/40 bg-zen-crimson p-6 text-white shadow-[0_28px_60px_rgba(18,84,155,0.35)] sm:p-8 lg:col-span-2 lg:col-start-1 lg:row-start-2">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/85">Vision</p>
                <p className="mt-2 text-sm leading-7 text-white/95 sm:text-base">
                  Every court project deserves a builder who understands surfacing, playability, and long-term
                  durability — not a one-size-fits-all approach.
                </p>
                <p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-white/85">
                  Mission
                </p>
                <p className="mt-2 text-sm leading-7 text-white/95 sm:text-base">
                  Deliver custom court construction and resurfacing with integrity — from backyard pickleball courts
                  to large multi-court facilities, with every component handled in-house.
                </p>
              </article>

              <ul className="grid min-w-0 grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-6 lg:col-span-2 lg:col-start-1 lg:row-start-3 lg:gap-x-8 lg:gap-y-8">
                {whyHomeownersItems.map((item) => (
                  <li key={item.title} className="flex min-w-0 gap-4">
                    <Image
                      src={item.icon}
                      alt=""
                      width={32}
                      height={32}
                      className="mt-1 h-8 w-8 shrink-0 object-contain"
                      unoptimized
                      aria-hidden
                    />
                    <div className="min-w-0">
                      <p className="font-heading text-base font-semibold text-white light:text-zen-espresso sm:text-lg">
                        {item.title}
                      </p>
                      <p className="mt-1 text-pretty text-sm leading-snug text-white/80 light:text-zen-taupe sm:text-base sm:leading-snug">
                        {item.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <BlogBookingStrip />
      </main>

      <SiteFooterRegion socialLinks={socialLinks} />
    </div>
  );
}
