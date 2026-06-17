import { pmServicePagePath } from "@/lib/pm-service-pages";

/** Court builder location pages. */
export const PROPERTY_MANAGEMENT_SERVICE_SLUGS = [
  "court-builders-boise-id",
  "court-builder-meridian-id",
  "court-builder-nampa-id",
  "court-builder-caldwell-id",
  "court-builder-middleton-id",
  "court-builder-star-id",
  "court-builder-eagle-id",
  "court-builder-scottsdale-az",
  "tennis-court-contractor-scottsdale-az",
  "court-builder-phoenix-az",
  "pickleball-court-builder-phoenix-az",
  "tennis-court-builders-phoenix-az",
  "basketball-court-construction-phoenix-az",
  "bocce-court-installation-phoenix-az",
  "padel-court-builder-phoenix-az",
  "court-builder-mesa-az",
  "court-builder-gilbert-az",
  "court-builder-chandler-az",
  "court-builder-glendale-az",
  "court-builder-peoria-az",
  "court-builder-tempe-az",
] as const;

export type PropertyManagementServiceSlug = (typeof PROPERTY_MANAGEMENT_SERVICE_SLUGS)[number];

const SERVICE_LABELS: Record<PropertyManagementServiceSlug, string> = {
  "court-builders-boise-id": "Court Builders Boise, ID",
  "court-builder-meridian-id": "Court Builder Meridian, ID",
  "court-builder-nampa-id": "Court Builder Nampa, ID",
  "court-builder-caldwell-id": "Court Builder Caldwell, ID",
  "court-builder-middleton-id": "Court Builder Middleton, ID",
  "court-builder-star-id": "Court Builder Star, ID",
  "court-builder-eagle-id": "Court Builder Eagle, ID",
  "court-builder-scottsdale-az": "Court Builder Scottsdale, AZ",
  "tennis-court-contractor-scottsdale-az": "Tennis Court Contractor Scottsdale, AZ",
  "court-builder-phoenix-az": "Court Builder Phoenix, AZ",
  "pickleball-court-builder-phoenix-az": "Pickleball Court Builder Phoenix, AZ",
  "tennis-court-builders-phoenix-az": "Tennis Court Builders Phoenix, AZ",
  "basketball-court-construction-phoenix-az": "Basketball Court Construction Phoenix, AZ",
  "bocce-court-installation-phoenix-az": "Bocce Court Installation Phoenix, AZ",
  "padel-court-builder-phoenix-az": "Padel Court Builder Phoenix, AZ",
  "court-builder-mesa-az": "Court Builder Mesa, AZ",
  "court-builder-gilbert-az": "Court Builder Gilbert, AZ",
  "court-builder-chandler-az": "Court Builder Chandler, AZ",
  "court-builder-glendale-az": "Court Builder Glendale, AZ",
  "court-builder-peoria-az": "Court Builder Peoria, AZ",
  "court-builder-tempe-az": "Court Builder Tempe, AZ",
};

export const PROPERTY_MANAGEMENT_SERVICE_NAV_LINKS = PROPERTY_MANAGEMENT_SERVICE_SLUGS.map(
  (slug) => ({
    slug,
    label: SERVICE_LABELS[slug],
    href: pmServicePagePath(slug),
  }),
);

/** Nested flyout under Services — empty after site trim (overview linked from parent row). */
export const PROPERTY_MANAGEMENT_SERVICE_SUB_NAV_LINKS: typeof PROPERTY_MANAGEMENT_SERVICE_NAV_LINKS =
  [];

export function isPropertyManagementServiceSlug(slug: string): slug is PropertyManagementServiceSlug {
  return (PROPERTY_MANAGEMENT_SERVICE_SLUGS as readonly string[]).includes(slug);
}
