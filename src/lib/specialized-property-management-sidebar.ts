import { HOMEPAGE_SIDEBAR_LABEL } from "@/lib/business";
import {
  SPECIALIZED_PROPERTY_MANAGEMENT_NAV_LINKS,
  isSpecializedPropertyManagementSlug,
} from "@/lib/specialized-property-management-nav";

/** Sidebar: homepage plus other specialized PM pages. */
export function getSpecializedPropertyManagementSidebarLinks(currentSlug: string) {
  const meridian = { href: "/", label: HOMEPAGE_SIDEBAR_LABEL };
  const services = SPECIALIZED_PROPERTY_MANAGEMENT_NAV_LINKS.filter(
    (link) => link.slug !== currentSlug,
  ).map(({ href, label }) => ({ href, label }));

  return [meridian, ...services];
}

export { isSpecializedPropertyManagementSlug };
