import { pmServicePagePath } from "@/lib/pm-service-pages";

/** Surface & system landings under Services → Court Surfaces & Systems. */
export const COURT_SURFACES_SLUGS = [
  "asphalt-court-installation",
  "concrete-court-installation",
  "acrylic-court-systems",
  "synthetic-courts",
  "modular-court-surfaces",
  "cushioned-court-systems",
  "indoor-sports-flooring",
] as const;

export type CourtSurfacesSlug = (typeof COURT_SURFACES_SLUGS)[number];

const LABELS: Record<CourtSurfacesSlug, string> = {
  "asphalt-court-installation": "Asphalt Court Installation",
  "concrete-court-installation": "Concrete Court Installation",
  "acrylic-court-systems": "Acrylic Court Systems",
  "synthetic-courts": "Synthetic Courts",
  "modular-court-surfaces": "Modular Court Surfaces",
  "cushioned-court-systems": "Cushioned Court Systems",
  "indoor-sports-flooring": "Indoor Sports Flooring",
};

export const COURT_SURFACES_NAV_LINKS = COURT_SURFACES_SLUGS.map((slug) => ({
  slug,
  label: LABELS[slug],
  href: pmServicePagePath(slug),
}));

export function isCourtSurfacesSlug(slug: string): slug is CourtSurfacesSlug {
  return (COURT_SURFACES_SLUGS as readonly string[]).includes(slug);
}
