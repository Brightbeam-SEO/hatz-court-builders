/**
 * Studio list filters for `locationPage` documents.
 * Court builder landings use pageCategory "city" → **Location pages** in Studio.
 */
const LOCATION_SLUG_MATCHES = [
  "court-builder*",
  "court-builders*",
  "*court-builder*",
  "*court-builders*",
  "*court-contractor*",
  "*court-construction*",
  "*court-installation*",
] as const;

const LOCATION_SLUG_MATCH_EXPR = LOCATION_SLUG_MATCHES.map(
  (glob) => `slug.current match "${glob}"`,
).join(" || ");

/** Court builder location pages → **Location pages** in Studio. */
export const CITY_LOCATION_FILTER = `_type == "locationPage" && pageCategory == "city"`;

/** Non-location landings (legacy / unused). */
export const SERVICE_LOCATION_FILTER = `_type == "locationPage" && pageCategory == "service"`;

export function isCourtLocationPageSlug(slug: string): boolean {
  return LOCATION_SLUG_MATCHES.some((glob) => {
    const pattern = glob
      .replace(/[.+?^${}()|[\]\\]/g, "\\$&")
      .replace(/\*/g, ".*");
    return new RegExp(`^${pattern}$`).test(slug);
  });
}

export function locationPagePreviewPath(slug: string, pageCategory?: string | null): string {
  if (!slug) return "Missing slug";
  void pageCategory;
  return `/${slug}/`;
}
