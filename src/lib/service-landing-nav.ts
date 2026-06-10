import { BEAUTY_SERVICE_NAV_HREFS } from "@/lib/beauty-service-nav";
import { isBeautyServiceSlug } from "@/lib/beauty-service-nav";
import { HEALING_SERVICE_NAV_HREFS } from "@/lib/healing-service-nav";
import { MASSAGE_SERVICE_NAV_HREFS } from "@/lib/massage-service-nav";
import { PAIN_SERVICE_NAV_HREFS } from "@/lib/pain-service-nav";
import { isHealingServiceSlug } from "@/lib/healing-service-nav";
import { isMassageServiceSlug } from "@/lib/massage-service-nav";
import { isPainServiceSlug } from "@/lib/pain-service-nav";

export type ServiceNavLink = { href: string; label: string };

const ALL_SERVICE_NAV_HREFS: ServiceNavLink[] = [
  ...MASSAGE_SERVICE_NAV_HREFS,
  ...HEALING_SERVICE_NAV_HREFS,
  ...BEAUTY_SERVICE_NAV_HREFS,
  ...PAIN_SERVICE_NAV_HREFS,
];

/** Homepage services carousel: link only when the card title matches a main-nav service label. */
export function getServiceNavHrefByLabel(label: string): string | undefined {
  return ALL_SERVICE_NAV_HREFS.find((item) => item.label === label)?.href;
}

/** Other Services sidebar: same category only (matches header Massage / Healing / Beauty / Pain). */
export function getServiceLandingSidebarLinks(slug: string): ServiceNavLink[] | undefined {
  if (isMassageServiceSlug(slug)) return [...MASSAGE_SERVICE_NAV_HREFS];
  if (isBeautyServiceSlug(slug)) return [...BEAUTY_SERVICE_NAV_HREFS];
  // Healing before pain — craniosacral-therapy is in both header menus but uses Healing sidebar here.
  if (isHealingServiceSlug(slug)) return [...HEALING_SERVICE_NAV_HREFS];
  if (isPainServiceSlug(slug)) return [...PAIN_SERVICE_NAV_HREFS];
  return undefined;
}

export function isServiceLandingSlug(slug: string): boolean {
  return getServiceLandingSidebarLinks(slug) !== undefined;
}
