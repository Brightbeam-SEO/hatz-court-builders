import {
  COURT_SURFACES_NAV_LINKS,
  isCourtSurfacesSlug,
} from "@/lib/court-surfaces-nav";

/** Sidebar: other court surfaces & systems service pages. */
export function getCourtSurfacesSidebarLinks(currentSlug: string) {
  if (!isCourtSurfacesSlug(currentSlug)) return undefined;

  return COURT_SURFACES_NAV_LINKS.filter((link) => link.slug !== currentSlug).map(
    ({ href, label }) => ({ href, label }),
  );
}

export { isCourtSurfacesSlug };
