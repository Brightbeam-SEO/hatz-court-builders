/**
 * Studio list filters for `locationPage` documents.
 * City landings use `/city/{slug}/`; PM services use `/{slug}/` at site root (no `/services/`).
 */
export const CITY_LOCATION_SLUG_GLOB = "property-management-*-id";

/** Treasure Valley city pages → **Location pages** in Studio. */
export const CITY_LOCATION_FILTER = `_type == "locationPage" && slug.current match "${CITY_LOCATION_SLUG_GLOB}"`;

/** PM service landings at site root → **Service pages** in Studio. */
export const SERVICE_LOCATION_FILTER = `_type == "locationPage" && !(slug.current match "${CITY_LOCATION_SLUG_GLOB}")`;

export function locationPagePreviewPath(slug: string, pageCategory?: string | null): string {
  if (!slug) return "Missing slug";
  if (pageCategory === "city" || slug.match(/^property-management-.+-id$/)) {
    return `/city/${slug}/`;
  }
  return `/${slug}/`;
}
