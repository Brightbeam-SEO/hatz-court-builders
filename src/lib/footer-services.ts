import { HOME_SERVICES_ACCORDION } from "@/lib/home-services-accordion";

/** Footer “Services” column — mirrors home services accordion. */
export const FOOTER_SERVICE_LINKS = HOME_SERVICES_ACCORDION.map((service) => ({
  label: service.name,
  href: service.href,
}));
