import { pmServicePagePath } from "@/lib/pm-service-pages";
import { RENTALS_NAV_LINKS } from "@/lib/rentals-nav";

/** “Other Services” links on the main /rentals/ page (matches main Services menu). */
export const RENTALS_OTHER_SERVICES_LINKS = [
  { label: "Property Management Services", href: pmServicePagePath("property-management-services") },
  { label: "Rental Property Marketing", href: pmServicePagePath("rental-property-marketing") },
  { label: "Property Inspections", href: pmServicePagePath("property-inspections") },
  { label: "Property Maintenance Services", href: pmServicePagePath("property-maintenance-services") },
  { label: "Tenant Placement Services", href: pmServicePagePath("tenant-placement-services") },
  { label: "Specialized Property Management", href: pmServicePagePath("specialized-property-management") },
  { label: "Property Risk Mitigation", href: pmServicePagePath("property-risk-mitigation") },
  { label: "Real Estate Investment Consulting", href: pmServicePagePath("real-estate-investment-consulting") },
] as const;

/** Sidebar on rental pages: /rentals/ shows core PM services; specialty pages show sibling rental links. */
export function getRentalsSidebarLinks(currentSlug: string) {
  if (currentSlug === "rentals") {
    return RENTALS_OTHER_SERVICES_LINKS.map(({ href, label }) => ({ href, label }));
  }
  return RENTALS_NAV_LINKS.filter(({ slug }) => slug !== currentSlug).map(({ href, label }) => ({
    href,
    label,
  }));
}

export { isRentalsSlug } from "@/lib/rentals-nav";
