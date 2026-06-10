import { HOMEPAGE_SIDEBAR_LABEL } from "@/lib/business";
import {
  PROPERTY_MANAGEMENT_SERVICE_NAV_LINKS,
  isPropertyManagementServiceSlug,
} from "@/lib/property-management-services-nav";

/** Sidebar: homepage plus other PM service pages. */
export function getPropertyManagementServiceSidebarLinks(currentSlug: string) {
  const meridian = { href: "/", label: HOMEPAGE_SIDEBAR_LABEL };
  const services = PROPERTY_MANAGEMENT_SERVICE_NAV_LINKS.filter(
    (link) => link.slug !== currentSlug,
  ).map(({ href, label }) => ({ href, label }));

  return [meridian, ...services];
}

export { isPropertyManagementServiceSlug };
