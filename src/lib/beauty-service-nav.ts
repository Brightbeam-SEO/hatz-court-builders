import { servicePagePath } from "@/lib/service-pages";

type BeautyNavLink = { slug: string; label: string };

/** Beauty service landings shown in header “Services → Beauty” and article sidebars. */
export const BEAUTY_SERVICE_NAV_LINKS: readonly BeautyNavLink[] = [];

export type BeautyServiceSlug = string;

export const BEAUTY_SERVICE_NAV_HREFS = BEAUTY_SERVICE_NAV_LINKS.map(({ slug, label }) => ({
  href: servicePagePath(slug),
  label,
}));

export function isBeautyServiceSlug(_slug: string): _slug is BeautyServiceSlug {
  return BEAUTY_SERVICE_NAV_LINKS.some((entry) => entry.slug === _slug);
}
