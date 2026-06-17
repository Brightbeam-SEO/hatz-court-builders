import { getBoiseServiceSidebarGroups, isBoiseServiceSlug } from "@/lib/boise-service-nav";
import type { OtherServicesNavGroup } from "@/lib/boise-service-nav";
import { getCourtConstructionSidebarLinks } from "@/lib/court-construction-sidebar";
import { isCourtConstructionSlug } from "@/lib/court-construction-nav";
import { getCityPropertySidebarLinks } from "@/lib/city-massage-nav";
import { getNampaServiceSidebarGroups, isNampaServiceSlug } from "@/lib/nampa-service-nav";
import { getPropertyManagementServiceSidebarLinks } from "@/lib/property-management-service-sidebar";
import { isPropertyManagementServiceSlug } from "@/lib/property-management-services-nav";
import { getPropertyRiskMitigationSidebarLinks } from "@/lib/property-risk-mitigation-sidebar";
import { isPropertyRiskMitigationSlug } from "@/lib/property-risk-mitigation-nav";
import { getRentalsSidebarLinks } from "@/lib/rentals-sidebar";
import { isRentalsSlug } from "@/lib/rentals-nav";
import { getSpecializedPropertyManagementSidebarLinks } from "@/lib/specialized-property-management-sidebar";
import { isSpecializedPropertyManagementSlug } from "@/lib/specialized-property-management-nav";
import { getServiceLandingSidebarLinks } from "@/lib/service-landing-nav";

/** Flat “Other Services” links for service or city landing pages. */
export function getOtherServicesSidebarLinks(slug: string) {
  if (isBoiseServiceSlug(slug) || isNampaServiceSlug(slug)) return undefined;
  if (isRentalsSlug(slug)) {
    return getRentalsSidebarLinks(slug);
  }
  if (isPropertyRiskMitigationSlug(slug)) {
    return getPropertyRiskMitigationSidebarLinks(slug);
  }
  if (isSpecializedPropertyManagementSlug(slug)) {
    return getSpecializedPropertyManagementSidebarLinks(slug);
  }
  if (isCourtConstructionSlug(slug)) {
    return getCourtConstructionSidebarLinks(slug);
  }
  if (isPropertyManagementServiceSlug(slug)) {
    return getPropertyManagementServiceSidebarLinks(slug);
  }
  const cityLinks = getCityPropertySidebarLinks(slug);
  if (cityLinks?.length) return cityLinks;
  if (slug === "foot-massage-reflexology") {
    return getPropertyManagementServiceSidebarLinks(slug);
  }
  return getServiceLandingSidebarLinks(slug);
}

/** Grouped sidebar for Boise or Nampa service landings. */
export function getOtherServicesSidebarGroups(slug: string): OtherServicesNavGroup[] | undefined {
  if (isBoiseServiceSlug(slug)) return getBoiseServiceSidebarGroups();
  if (isNampaServiceSlug(slug)) return getNampaServiceSidebarGroups();
  return undefined;
}
