import { pmServicePagePath } from "@/lib/pm-service-pages";

/** Footer “Services” column — labels and destinations. */
export const FOOTER_SERVICE_LINKS = [
  { label: "Court Construction Services", href: pmServicePagePath("property-management-services") },
] as const;
