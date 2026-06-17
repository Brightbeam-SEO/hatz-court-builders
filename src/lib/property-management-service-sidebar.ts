import { HOMEPAGE_SIDEBAR_LABEL } from "@/lib/business";
import {
  PROPERTY_MANAGEMENT_SERVICE_NAV_LINKS,
  isPropertyManagementServiceSlug,
} from "@/lib/property-management-services-nav";

const SCOTTSDALE_CHILD_SLUGS = new Set(["tennis-court-contractor-scottsdale-az"]);
const PHOENIX_CHILD_SLUGS = new Set([
  "pickleball-court-builder-phoenix-az",
  "tennis-court-builders-phoenix-az",
  "basketball-court-construction-phoenix-az",
  "bocce-court-installation-phoenix-az",
  "padel-court-builder-phoenix-az",
]);

/** Sidebar: homepage plus other PM service pages. */
export function getPropertyManagementServiceSidebarLinks(currentSlug: string) {
  const isArizonaPage = currentSlug.includes("-az");
  const isIdahoCityPage =
    currentSlug === "court-builders-boise-id" || currentSlug.startsWith("court-builder-");
  const isCourtBuilderCityPage =
    currentSlug.startsWith("court-builder-") ||
    currentSlug === "court-builders-boise-id" ||
    isArizonaPage;
  const homeLinkLabel = isCourtBuilderCityPage ? "Best Court Builders" : HOMEPAGE_SIDEBAR_LABEL;
  const meridian = { href: "/", label: homeLinkLabel };
  const services = PROPERTY_MANAGEMENT_SERVICE_NAV_LINKS.filter(
    (link) => link.slug !== currentSlug,
  )
    .filter((link) => {
      if (currentSlug === "tennis-court-contractor-scottsdale-az") {
        return link.slug === "court-builder-scottsdale-az";
      }
      if (isIdahoCityPage && !isArizonaPage) {
        return (
          link.slug === "court-builders-boise-id" ||
          (link.slug.startsWith("court-builder-") && link.slug.endsWith("-id"))
        );
      }
      if (!isArizonaPage) return true;
      if (!link.slug.includes("-az")) return false;
      if (PHOENIX_CHILD_SLUGS.has(currentSlug)) {
        return link.slug === "court-builder-phoenix-az" || PHOENIX_CHILD_SLUGS.has(link.slug);
      }
      if (
        SCOTTSDALE_CHILD_SLUGS.has(link.slug) &&
        currentSlug !== "court-builder-scottsdale-az"
      ) {
        return false;
      }
      const currentIsPhoenixHubOrChild =
        currentSlug === "court-builder-phoenix-az" || PHOENIX_CHILD_SLUGS.has(currentSlug);
      if (PHOENIX_CHILD_SLUGS.has(link.slug) && !currentIsPhoenixHubOrChild) {
        return false;
      }
      return true;
    })
    .map(({ href, label }) => ({ href, label }));

  return [meridian, ...services];
}

export { isPropertyManagementServiceSlug };
