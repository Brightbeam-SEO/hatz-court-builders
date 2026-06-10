import { servicePagePath } from "@/lib/service-pages";

type HealingNavLink = { slug: string; label: string };

/** Healing service landings shown in header “Services → Healing” and article sidebars. */
export const HEALING_SERVICE_NAV_LINKS: readonly HealingNavLink[] = [];

export type HealingServiceSlug = string;

export const HEALING_SERVICE_NAV_HREFS = HEALING_SERVICE_NAV_LINKS.map(({ slug, label }) => ({
  href: servicePagePath(slug),
  label,
}));

export function isHealingServiceSlug(_slug: string): _slug is HealingServiceSlug {
  return HEALING_SERVICE_NAV_LINKS.some((entry) => entry.slug === _slug);
}
