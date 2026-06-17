import { pmServicePagePath } from "@/lib/pm-service-pages";

/** Sport-specific court construction landings under Services → Court Construction. */
export const COURT_CONSTRUCTION_SLUGS = [
  "basketball-court-construction",
  "pickleball-court-construction",
  "volleyball-court-construction",
  "futsal-soccer-court-construction",
  "tennis-court-construction",
] as const;

export type CourtConstructionSlug = (typeof COURT_CONSTRUCTION_SLUGS)[number];

const LABELS: Record<CourtConstructionSlug, string> = {
  "basketball-court-construction": "Basketball Court Construction",
  "pickleball-court-construction": "Pickleball Court Construction",
  "volleyball-court-construction": "Volleyball Court Construction",
  "futsal-soccer-court-construction": "Futsal / Soccer Court Construction",
  "tennis-court-construction": "Tennis Court Construction",
};

export const COURT_CONSTRUCTION_NAV_LINKS = COURT_CONSTRUCTION_SLUGS.map((slug) => ({
  slug,
  label: LABELS[slug],
  href: pmServicePagePath(slug),
}));

export function isCourtConstructionSlug(slug: string): slug is CourtConstructionSlug {
  return (COURT_CONSTRUCTION_SLUGS as readonly string[]).includes(slug);
}
