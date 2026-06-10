import { pmServicePagePath } from "@/lib/pm-service-pages";

export const RENTALS_SLUGS = [
  "rentals",
  "condo-rentals-meridian-id",
  "home-rentals-meridian-id",
  "month-to-month-rentals-meridian-id",
  "long-term-rentals-meridian-id",
] as const;

export type RentalsSlug = (typeof RENTALS_SLUGS)[number];

const LABELS: Record<RentalsSlug, string> = {
  rentals: "Rentals",
  "condo-rentals-meridian-id": "Condo Rentals",
  "home-rentals-meridian-id": "Home Rentals",
  "month-to-month-rentals-meridian-id": "Month To Month Rentals",
  "long-term-rentals-meridian-id": "Long Term Rentals",
};

export const RENTALS_NAV_LINKS = RENTALS_SLUGS.map((slug) => ({
  slug,
  label: LABELS[slug],
  href: pmServicePagePath(slug),
}));

/** Nested flyout under Services — rental specialty pages (overview linked from parent row). */
export const RENTALS_SUB_NAV_LINKS = RENTALS_NAV_LINKS.filter((link) => link.slug !== "rentals");

export function isRentalsSlug(slug: string): slug is RentalsSlug {
  return (RENTALS_SLUGS as readonly string[]).includes(slug);
}
