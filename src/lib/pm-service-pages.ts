import { PM_PROPERTY_MANAGEMENT_SERVICES_CONFIG } from "@/lib/pm-service-page-configs";
import type { TreasureValleyPressurePageConfig } from "@/lib/treasure-valley-pressure-page-config";

export type PmServicePageEntry = {
  slug: string;
  config: TreasureValleyPressurePageConfig;
  fallbackMarkdownPath: string;
  sanitySlug: string;
};

/** Root-level PM service landings kept after site trim. */
export const PM_SERVICE_PAGES: Record<string, PmServicePageEntry> = {
  "property-management-services": {
    slug: "property-management-services",
    config: PM_PROPERTY_MANAGEMENT_SERVICES_CONFIG,
    fallbackMarkdownPath: "content/services/property-management-services-body.md",
    sanitySlug: "property-management-services",
  },
};

/** Canonical path at site root, e.g. `/property-management-services/`. */
export function pmServicePagePath(slug: string): string {
  const clean = slug.replace(/^\/+|\/+$/g, "");
  return `/${clean}/`;
}

export function getPmServicePage(slug: string): PmServicePageEntry | null {
  const clean = slug.replace(/^\/+|\/+$/g, "");
  return PM_SERVICE_PAGES[clean] ?? null;
}
