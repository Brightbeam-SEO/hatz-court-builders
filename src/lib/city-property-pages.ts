import type { TreasureValleyPressurePageConfig } from "@/lib/treasure-valley-pressure-page-config";

export type CityPropertyPageEntry = {
  slug: string;
  config: TreasureValleyPressurePageConfig;
  fallbackMarkdownPath: string;
};

/** Legacy `/city/…` property-management landings — removed from Hatz Court Builders. */
export const CITY_PROPERTY_PAGES: Record<string, CityPropertyPageEntry> = {};

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
