import { pmServicePagePath } from "@/lib/pm-service-pages";

/** Property management specialty pages kept after site trim. */
export const PROPERTY_MANAGEMENT_SERVICE_SLUGS = ["property-management-services"] as const;

export type PropertyManagementServiceSlug = (typeof PROPERTY_MANAGEMENT_SERVICE_SLUGS)[number];

const SERVICE_LABELS: Record<PropertyManagementServiceSlug, string> = {
  "property-management-services": "Court Construction Services",
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
