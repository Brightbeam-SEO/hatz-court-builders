import { pmServicePagePath } from "@/lib/pm-service-pages";

export const SPECIALIZED_PROPERTY_MANAGEMENT_SLUGS = [
  "specialized-property-management",
  "multi-family-property-management",
  "hoa-community-management",
  "long-term-rental-management",
] as const;

export type SpecializedPropertyManagementSlug = (typeof SPECIALIZED_PROPERTY_MANAGEMENT_SLUGS)[number];

const LABELS: Record<SpecializedPropertyManagementSlug, string> = {
  "specialized-property-management": "Specialized Property Management",
  "multi-family-property-management": "Multi Family Property Management",
  "hoa-community-management": "HOA Community Management",
  "long-term-rental-management": "Long Term Rental Management",
};

/** All specialized PM pages (overview + specialty pages). */
export const SPECIALIZED_PROPERTY_MANAGEMENT_NAV_LINKS = SPECIALIZED_PROPERTY_MANAGEMENT_SLUGS.map(
  (slug) => ({
    slug,
    label: LABELS[slug],
    href: pmServicePagePath(slug),
  }),
);

/** Nested flyout under Services — specialty pages (overview linked from parent row). */
export const SPECIALIZED_PROPERTY_MANAGEMENT_SUB_NAV_LINKS =
  SPECIALIZED_PROPERTY_MANAGEMENT_NAV_LINKS.filter(
    (link) =>
      link.slug !== "specialized-property-management" &&
      link.slug !== "hoa-community-management",
  );

export function isSpecializedPropertyManagementSlug(
  slug: string,
): slug is SpecializedPropertyManagementSlug {
  return (SPECIALIZED_PROPERTY_MANAGEMENT_SLUGS as readonly string[]).includes(slug);
}
