import { BUSINESS } from "@/lib/business";
import { getCityGallerySection } from "@/lib/city-gallery-images";
import { googleMapsAreaEmbedSrc } from "@/lib/maps-embed";
import { gpmPick } from "@/lib/gpm-pick-gallery";
import { PROPERTY_MANAGEMENT_SERVICE_HIGHLIGHTS } from "@/lib/property-management-service-highlights";
import type { TreasureValleyFaqItem, TreasureValleyPressurePageConfig } from "@/lib/treasure-valley-pressure-page-config";

export type CityPropertyPageEntry = {
  slug: string;
  config: TreasureValleyPressurePageConfig;
  fallbackMarkdownPath: string;
};

/** Matches greenbeltpm.com page-sitemap for Treasure Valley city landings (except Meridian). */
const SITEMAP_CITY_PAGE_SEO = {
  metaTitle: "Greenbelt Property Management | Service Areas in Idaho",
  metaDescription:
    "Explore Greenbelt Property Management's service areas across Idaho. We provide property management services for residential and commercial properties statewide.",
} as const;

const SHARED_TIMELINE = {
  timelineHeading: "Our Property Management Process",
  timelineIntro: "A clear, personal process from first call to ongoing management.",
  timelineSteps: [
    {
      title: "Rental Analysis & Strategy",
      body: "We evaluate positioning and rental potential.",
    },
    {
      title: "Preparation & Pricing Alignment",
      body: "Recommendations to improve market readiness.",
    },
    {
      title: "Marketing & Screening",
      body: "Exposure, applicant review, lease execution.",
    },
    {
      title: "Move-In Documentation",
      body: "Condition tracking and tenant onboarding.",
    },
    {
      title: "Ongoing Management & Reporting",
      body: "Rent collection, maintenance coordination, inspections, reporting.",
    },
    {
      title: "Renewal or Turnover Optimization",
      body: "Lease renewal strategy or efficient re-leasing.",
    },
  ],
} as const;

function defaultFaqs(cityName: string): TreasureValleyFaqItem[] {
  return [
    {
      question: `How fast can you place a tenant in ${cityName}?`,
      answer:
        "Placement timelines depend on pricing strategy, condition, and seasonality. During your rental analysis, we provide a realistic leasing projection.",
    },
    {
      question: "How do you handle maintenance after hours?",
      answer:
        "Tenants submit requests through our system. Emergency issues are escalated appropriately and coordinated with vendors to protect property condition.",
    },
    {
      question: "How often are inspections?",
      answer:
        "Move-in and move-out inspections are standard. Routine inspection cadence is structured and discussed during onboarding.",
    },
    {
      question: "What happens if a tenant stops paying?",
      answer:
        "We follow documented communication procedures and, if necessary, coordinate eviction steps in compliance with Idaho regulations.",
    },
    {
      question: "What property types do you not manage?",
      answer:
        "We focus on residential properties. We do not manage large commercial properties or non-residential assets.",
    },
  ];
}

function buildConfig(input: {
  slug: string;
  cityName: string;
  metaTitle: string;
  metaDescription: string;
  heroTitle: string;
  heroSubtitle: string;
  heroImageFragment: string;
  mapQuery: string;
  bottomContactHeading: string;
  bottomContactSubtext: string;
  faqHeading: string;
  faqIntro: string;
  shareTitle: string;
}): TreasureValleyPressurePageConfig {
  const id = input.slug.replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  return {
    routeParam: input.slug,
    slug: input.slug,
    metaTitle: input.metaTitle,
    metaDescription: input.metaDescription,
    cityName: input.cityName,
    heroTitle: input.heroTitle,
    heroSubtitle: input.heroSubtitle,
    heroImageSrc: gpmPick(input.heroImageFragment),
    heroImageAlt: `${input.heroTitle} — ${BUSINESS.nameShort}`,
    heroContactFormId: `${id}-hero-contact-form`,
    heroFormName: `${input.cityName} city landing hero`,
    bottomContactSectionId: `${id}-contact`,
    bottomContactFormId: `${id}-page-contact-form`,
    bottomContactHeading: input.bottomContactHeading,
    bottomContactSubtext: input.bottomContactSubtext,
    bottomFormName: `${input.cityName} city landing contact`,
    bottomContactLayout: "blend",
    articleListBulletStyle: "crimson-check",
    timelineStepBadgeVariant: "crimson",
    splitTestimonialsAboveContact: true,
    testimonialsSectionId: `${id}-testimonials`,
    testimonialsSectionEyebrow: "What Owners Say",
    testimonialsSectionHeading: "What Clients Say",
    testimonialsSectionSubtext:
      "Real feedback from rental property owners who value responsive, personal management.",
    showCenteredContactSection: false,
    showHomeContactSection: true,
    gallerySection: getCityGallerySection(input.slug, input.cityName),
    shareTitle: input.shareTitle,
    sidebarPanelId: `${id}-other-services-desktop`,
    mapIframeTitle: `Map — ${input.cityName}, Idaho`,
    mapEmbedSrc: googleMapsAreaEmbedSrc(input.mapQuery),
    faqHeading: input.faqHeading,
    faqIntro: input.faqIntro,
    faqIdPrefix: `${id}-faq`,
    faqItems: defaultFaqs(input.cityName),
    serviceHighlightCards: PROPERTY_MANAGEMENT_SERVICE_HIGHLIGHTS,
    timelineHeading: SHARED_TIMELINE.timelineHeading,
    timelineIntro: SHARED_TIMELINE.timelineIntro,
    timelineSteps: [...SHARED_TIMELINE.timelineSteps],
  };
}

export const CITY_PROPERTY_PAGES: Record<string, CityPropertyPageEntry> = {
  "property-management-boise-id": {
    slug: "property-management-boise-id",
    fallbackMarkdownPath: "content/city/property-management-boise-id-body.md",
    config: buildConfig({
      slug: "property-management-boise-id",
      cityName: "Boise",
      metaTitle: SITEMAP_CITY_PAGE_SEO.metaTitle,
      metaDescription: SITEMAP_CITY_PAGE_SEO.metaDescription,
      heroTitle: "Property Management in Boise, ID",
      heroSubtitle:
        "Reduce vacancy. Protect the asset. Get your time back with accountable Boise rental property management from a local Meridian-based team.",
      heroImageFragment: "open concept living room rental property interior",
      mapQuery: "Boise, Idaho",
      bottomContactHeading: "Get Property Management in Boise",
      bottomContactSubtext:
        "Request a free rental analysis for your Boise investment — we respond personally and quickly.",
      faqHeading: "Frequently Asked Questions About Boise Property Management",
      faqIntro: "Straight answers for Boise rental owners — call if yours is not listed.",
      shareTitle: `Property Management Boise | ${BUSINESS.nameShort}`,
    }),
  },
  "property-management-eagle-id": {
    slug: "property-management-eagle-id",
    fallbackMarkdownPath: "content/city/property-management-eagle-id-body.md",
    config: buildConfig({
      slug: "property-management-eagle-id",
      cityName: "Eagle",
      metaTitle: SITEMAP_CITY_PAGE_SEO.metaTitle,
      metaDescription: SITEMAP_CITY_PAGE_SEO.metaDescription,
      heroTitle: "Property Management in Eagle, ID",
      heroSubtitle:
        "Protect your investment. Reduce vacancy. Remove the daily workload with structured Eagle rental management.",
      heroImageFragment: "rental home curb appeal exterior property management",
      mapQuery: "Eagle, Idaho",
      bottomContactHeading: "Get Property Management in Eagle",
      bottomContactSubtext:
        "Tell us about your Eagle rental — we'll outline placement, maintenance, and reporting clearly.",
      faqHeading: "Frequently Asked Questions About Eagle Property Management",
      faqIntro: "Straight answers for Eagle rental owners — call if yours is not listed.",
      shareTitle: `Property Management Eagle | ${BUSINESS.nameShort}`,
    }),
  },
  "property-management-in-middleton-id": {
    slug: "property-management-in-middleton-id",
    fallbackMarkdownPath: "content/city/property-management-in-middleton-id-body.md",
    config: buildConfig({
      slug: "property-management-in-middleton-id",
      cityName: "Middleton",
      metaTitle: SITEMAP_CITY_PAGE_SEO.metaTitle,
      metaDescription: SITEMAP_CITY_PAGE_SEO.metaDescription,
      heroTitle: "Property Management in Middleton, ID",
      heroSubtitle:
        "Protect your rental. Minimize vacancy. Stay out of daily management with accountable Middleton oversight.",
      heroImageFragment: "private fenced backyard rental home",
      mapQuery: "Middleton, Idaho",
      bottomContactHeading: "Get Property Management in Middleton",
      bottomContactSubtext:
        "Share your Middleton rental goals — we'll provide a clear management plan and rental analysis.",
      faqHeading: "Frequently Asked Questions About Middleton Property Management",
      faqIntro: "Straight answers for Middleton rental owners — call if yours is not listed.",
      shareTitle: `Property Management Middleton | ${BUSINESS.nameShort}`,
    }),
  },
  "property-management-in-nampa-id": {
    slug: "property-management-in-nampa-id",
    fallbackMarkdownPath: "content/city/property-management-in-nampa-id-body.md",
    config: buildConfig({
      slug: "property-management-in-nampa-id",
      cityName: "Nampa",
      metaTitle: SITEMAP_CITY_PAGE_SEO.metaTitle,
      metaDescription: SITEMAP_CITY_PAGE_SEO.metaDescription,
      heroTitle: "Property Management in Nampa, ID",
      heroSubtitle:
        "Protect your rental property. Reduce vacancy. Eliminate daily stress with structured Nampa rental management.",
      heroImageFragment: "spacious family room rental property interior",
      mapQuery: "Nampa, Idaho",
      bottomContactHeading: "Get Property Management in Nampa",
      bottomContactSubtext:
        "Request a free rental analysis for your Nampa property — consistent communication, no runaround.",
      faqHeading: "Frequently Asked Questions About Nampa Property Management",
      faqIntro: "Straight answers for Nampa rental owners — call if yours is not listed.",
      shareTitle: `Property Management Nampa | ${BUSINESS.nameShort}`,
    }),
  },
  "property-management-in-star-id": {
    slug: "property-management-in-star-id",
    fallbackMarkdownPath: "content/city/property-management-in-star-id-body.md",
    config: buildConfig({
      slug: "property-management-in-star-id",
      cityName: "Star",
      metaTitle: SITEMAP_CITY_PAGE_SEO.metaTitle,
      metaDescription: SITEMAP_CITY_PAGE_SEO.metaDescription,
      heroTitle: "Property Management in Star, ID",
      heroSubtitle:
        "Protect your property. Reduce vacancy. Eliminate daily management stress with clear Star rental oversight.",
      heroImageFragment: "single level rental home exterior",
      mapQuery: "Star, Idaho",
      bottomContactHeading: "Get Property Management in Star",
      bottomContactSubtext:
        "Let's discuss your Star rental — structured placement, maintenance, and reporting you can count on.",
      faqHeading: "Frequently Asked Questions About Star Property Management",
      faqIntro: "Straight answers for Star rental owners — call if yours is not listed.",
      shareTitle: `Property Management Star | ${BUSINESS.nameShort}`,
    }),
  },
  "property-management-in-kuna-id": {
    slug: "property-management-in-kuna-id",
    fallbackMarkdownPath: "content/city/property-management-in-kuna-id-body.md",
    config: buildConfig({
      slug: "property-management-in-kuna-id",
      cityName: "Kuna",
      metaTitle: SITEMAP_CITY_PAGE_SEO.metaTitle,
      metaDescription: SITEMAP_CITY_PAGE_SEO.metaDescription,
      heroTitle: "Property Management in Kuna, ID",
      heroSubtitle:
        "Protect your investment. Reduce vacancy. Stay out of daily management with hands-on Kuna rental oversight.",
      heroImageFragment: "new construction rental home exterior property management",
      mapQuery: "Kuna, Idaho",
      bottomContactHeading: "Get Property Management in Kuna",
      bottomContactSubtext:
        "Request a rental analysis for your Kuna home — we understand newer subdivisions and HOA dynamics.",
      faqHeading: "Frequently Asked Questions About Kuna Property Management",
      faqIntro: "Straight answers for Kuna rental owners — call if yours is not listed.",
      shareTitle: `Property Management Kuna | ${BUSINESS.nameShort}`,
    }),
  },
  "property-management-in-garden-city-id": {
    slug: "property-management-in-garden-city-id",
    fallbackMarkdownPath: "content/city/property-management-in-garden-city-id-body.md",
    config: buildConfig({
      slug: "property-management-in-garden-city-id",
      cityName: "Garden City",
      metaTitle: "Property Management Garden City ID | Greenbelt Property Management",
      metaDescription:
        "Property management in Garden City, Idaho. Boise-adjacent rentals, tenant placement, and maintenance coordination. Call (208) 863-8009.",
      heroTitle: "Property Management in Garden City, ID",
      heroSubtitle:
        "Protect your investment along the Greenbelt corridor with structured rental management and direct owner communication.",
      heroImageFragment: "covered patio outdoor living rental property",
      mapQuery: "Garden City, Idaho",
      bottomContactHeading: "Get Property Management in Garden City",
      bottomContactSubtext:
        "Request a free rental analysis for your Garden City property — responsive, local Treasure Valley management.",
      faqHeading: "Frequently Asked Questions About Garden City Property Management",
      faqIntro: "Straight answers for Garden City rental owners — call if yours is not listed.",
      shareTitle: `Property Management Garden City | ${BUSINESS.nameShort}`,
    }),
  },
};

export const CITY_PROPERTY_PAGE_SLUGS = Object.keys(CITY_PROPERTY_PAGES);

export function cityPagePath(slug: string): string {
  const clean = slug.replace(/^\/+|\/+$/g, "").replace(/^city\//, "");
  return `/city/${clean}/`;
}

export function getCityPropertyPage(slug: string): CityPropertyPageEntry | null {
  const clean = slug.replace(/^\/+|\/+$/g, "").replace(/^city\//, "");
  return CITY_PROPERTY_PAGES[clean] ?? null;
}

export function cityPropertyPageStaticParams(): { slug: string }[] {
  return CITY_PROPERTY_PAGE_SLUGS.map((slug) => ({ slug }));
}

export function isCityPropertyPageSlug(slug: string): boolean {
  return slug in CITY_PROPERTY_PAGES;
}
