import { HOMEPAGE_SIDEBAR_LABEL } from "@/lib/business";
import { CITY_PROPERTY_PAGES } from "@/lib/city-property-pages";

export type CityPropertySlug = keyof typeof CITY_PROPERTY_PAGES;

/** Sidebar links after city pages were removed — homepage only. */
export function getCityPropertySidebarLinks(_currentSlug: string) {
  return [{ href: "/", label: HOMEPAGE_SIDEBAR_LABEL }];
}

export function isCityMassageSlug(slug: string): slug is CityPropertySlug {
  return slug in CITY_PROPERTY_PAGES;
}

/** @deprecated Use {@link getCityPropertySidebarLinks} */
export function getCityMassageSidebarLinks(slug: string) {
  return getCityPropertySidebarLinks(slug);
}

export const CITY_MASSAGE_NAV_LINKS: { slug: string; label: string }[] = [];

export const CITY_MASSAGE_NAV_HREFS: { href: string; label: string }[] = [];
