import { pmServicePagePath } from "@/lib/pm-service-pages";

export const PROPERTY_RISK_MITIGATION_SLUGS = [
  "property-risk-mitigation",
  "real-estate-investment-consulting",
  "property-risk-management-meridian-id",
] as const;

export type PropertyRiskMitigationSlug = (typeof PROPERTY_RISK_MITIGATION_SLUGS)[number];

const LABELS: Record<PropertyRiskMitigationSlug, string> = {
  "property-risk-mitigation": "Property Risk Mitigation",
  "real-estate-investment-consulting": "Real Estate Investment Consulting",
  "property-risk-management-meridian-id": "Property Risk Management",
};

export const PROPERTY_RISK_MITIGATION_NAV_LINKS = PROPERTY_RISK_MITIGATION_SLUGS.map((slug) => ({
  slug,
  label: LABELS[slug],
  href: pmServicePagePath(slug),
}));

/** Nested flyout under Services — specialty pages (overview linked from parent row). */
export const PROPERTY_RISK_MITIGATION_SUB_NAV_LINKS = PROPERTY_RISK_MITIGATION_NAV_LINKS.filter(
  (link) => link.slug !== "property-risk-mitigation",
);

export function isPropertyRiskMitigationSlug(slug: string): slug is PropertyRiskMitigationSlug {
  return (PROPERTY_RISK_MITIGATION_SLUGS as readonly string[]).includes(slug);
}
