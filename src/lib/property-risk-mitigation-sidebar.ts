import { HOMEPAGE_SIDEBAR_LABEL } from "@/lib/business";
import {
  PROPERTY_RISK_MITIGATION_NAV_LINKS,
  isPropertyRiskMitigationSlug,
} from "@/lib/property-risk-mitigation-nav";

/** Sidebar: homepage plus other property risk mitigation pages. */
export function getPropertyRiskMitigationSidebarLinks(currentSlug: string) {
  const meridian = { href: "/", label: HOMEPAGE_SIDEBAR_LABEL };
  const services = PROPERTY_RISK_MITIGATION_NAV_LINKS.filter(
    (link) => link.slug !== currentSlug,
  ).map(({ href, label }) => ({ href, label }));

  return [meridian, ...services];
}

export { isPropertyRiskMitigationSlug };
