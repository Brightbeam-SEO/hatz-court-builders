import { pmServicePagePath } from "@/lib/pm-service-pages";

/** Sport-specific court construction landings under Services → Court Construction. */
export const COURT_CONSTRUCTION_SLUGS = [
  "pickleball-court-construction",
  "basketball-court-construction",
  "tennis-court-construction",
  "volleyball-court-construction",
  "futsal-soccer-court-construction",
  "bocce-court-construction",
  "multi-court-construction",
  "custom-court-construction",
  "commercial-court-construction",
  "court-expansion",
  "custom-court-design",
] as const;

export type CourtConstructionSlug = (typeof COURT_CONSTRUCTION_SLUGS)[number];

const LABELS: Record<CourtConstructionSlug, string> = {
  "pickleball-court-construction": "Pickleball Court Construction",
  "basketball-court-construction": "Basketball Court Construction",
  "tennis-court-construction": "Tennis Court Construction",
  "volleyball-court-construction": "Volleyball Court Construction",
  "futsal-soccer-court-construction": "Futsal / Soccer Court Construction",
  "bocce-court-construction": "Bocce Court Construction",
  "multi-court-construction": "Multi-Court Construction",
  "custom-court-construction": "Custom Court Construction",
  "commercial-court-construction": "Commercial Court Construction",
  "court-expansion": "Court Expansion",
  "custom-court-design": "Court Design",
};

export const COURT_CONSTRUCTION_NAV_LINKS = COURT_CONSTRUCTION_SLUGS.map((slug) => ({
  slug,
  label: LABELS[slug],
  href: pmServicePagePath(slug),
}));

export function isCourtConstructionSlug(slug: string): slug is CourtConstructionSlug {
  return (COURT_CONSTRUCTION_SLUGS as readonly string[]).includes(slug);
}
