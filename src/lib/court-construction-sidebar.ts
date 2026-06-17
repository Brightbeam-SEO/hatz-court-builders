import {
  COURT_CONSTRUCTION_NAV_LINKS,
  isCourtConstructionSlug,
} from "@/lib/court-construction-nav";

/** Sidebar: other court construction service pages. */
export function getCourtConstructionSidebarLinks(currentSlug: string) {
  if (!isCourtConstructionSlug(currentSlug)) return undefined;

  return COURT_CONSTRUCTION_NAV_LINKS.filter((link) => link.slug !== currentSlug).map(
    ({ href, label }) => ({ href, label }),
  );
}

export { isCourtConstructionSlug };
