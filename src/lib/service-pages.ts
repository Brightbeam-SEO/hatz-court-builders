import { FOOT_MASSAGE_REFLEXOLOGY_PAGE_CONFIG } from "@/lib/foot-massage-reflexology-page-config";
import { isPropertyManagementServiceSlug } from "@/lib/property-management-services-nav";
import { pmServicePagePath } from "@/lib/pm-service-pages";
import type { TreasureValleyPressurePageConfig } from "@/lib/treasure-valley-pressure-page-config";

/** Registry entry for a long-form `/services/[slug]/` landing page. */
export type ServicePageEntry = {
  slug: string;
  config: TreasureValleyPressurePageConfig;
  fallbackMarkdownPath: string;
  /** Sanity `locationPage` document slug (may match `slug`). */
  sanitySlug: string;
};

/** Active service landings under `/services/` (primary Meridian template only). */
export const SERVICE_PAGES: Record<string, ServicePageEntry> = {
  "foot-massage-reflexology": {
    slug: "foot-massage-reflexology",
    config: FOOT_MASSAGE_REFLEXOLOGY_PAGE_CONFIG,
    fallbackMarkdownPath: "content/blog/foot-massage-reflexology-body.md",
    sanitySlug: "foot-massage-reflexology",
  },
};

/** Homepage `#services` carousel titles → page slugs. */
const SERVICE_CAROUSEL_LABEL_TO_SLUG: Record<string, string> = {
  "Court Construction": "court-builders-boise-id",
  "Foot Massage & Reflexology": "foot-massage-reflexology",
};

/** Resolves a services-carousel card title to its landing page path. */
export function getServiceCarouselHrefByLabel(label: string): string | undefined {
  const slug = SERVICE_CAROUSEL_LABEL_TO_SLUG[label];
  if (!slug) return undefined;
  if (isPropertyManagementServiceSlug(slug)) return pmServicePagePath(slug);
  if (SERVICE_PAGES[slug]) return servicePagePath(slug);
  return undefined;
}

/** Canonical path for a `/services/[slug]/` landing (always trailing slash). */
export function servicePagePath(slug: string): string {
  const clean = slug.replace(/^\/+|\/+$/g, "").replace(/^services\//, "");
  return `/services/${clean}/`;
}

export function getServicePage(slug: string): ServicePageEntry | null {
  const clean = slug.replace(/^\/+|\/+$/g, "").replace(/^services\//, "");
  return SERVICE_PAGES[clean] ?? null;
}

export function servicePageStaticParams(): { slug: string }[] {
  return Object.keys(SERVICE_PAGES).map((slug) => ({ slug }));
}
