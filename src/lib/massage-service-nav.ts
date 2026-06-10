import { servicePagePath } from "@/lib/service-pages";

/** Massage service landings shown in header “Services” and article sidebars. */
export const MASSAGE_SERVICE_NAV_LINKS = [
  { slug: "foot-massage-reflexology", label: "Foot Massage & Reflexology" },
] as const;

export type MassageServiceSlug = (typeof MASSAGE_SERVICE_NAV_LINKS)[number]["slug"];

export const MASSAGE_SERVICE_NAV_HREFS = MASSAGE_SERVICE_NAV_LINKS.map(({ slug, label }) => ({
  href: servicePagePath(slug),
  label,
}));

export function isMassageServiceSlug(slug: string): slug is MassageServiceSlug {
  return MASSAGE_SERVICE_NAV_LINKS.some((entry) => entry.slug === slug);
}
