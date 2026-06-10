import { servicePagePath } from "@/lib/service-pages";

type PainNavLink = { slug: string; label: string };

/** Pain service landings shown in header “Services → Pain” and article sidebars. */
export const PAIN_SERVICE_NAV_LINKS: readonly PainNavLink[] = [];

export type PainServiceSlug = string;

export const PAIN_SERVICE_NAV_HREFS = PAIN_SERVICE_NAV_LINKS.map(({ slug, label }) => ({
  href: servicePagePath(slug),
  label,
}));

export function isPainServiceSlug(_slug: string): _slug is PainServiceSlug {
  return PAIN_SERVICE_NAV_LINKS.some((entry) => entry.slug === _slug);
}
