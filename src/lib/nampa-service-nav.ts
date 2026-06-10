import { servicePagePath } from "@/lib/service-pages";

/** Nampa massage landings — sidebar only (not header/footer). */
export const NAMPA_MASSAGE_SERVICE_LINKS = [
  { slug: "scalp-massage-nampa", label: "Scalp Massage Nampa" },
] as const;

export type NampaServiceSlug = (typeof NAMPA_MASSAGE_SERVICE_LINKS)[number]["slug"];

export const NAMPA_SERVICE_SLUGS: NampaServiceSlug[] = NAMPA_MASSAGE_SERVICE_LINKS.map(
  ({ slug }) => slug,
);

export function isNampaServiceSlug(slug: string): slug is NampaServiceSlug {
  return NAMPA_MASSAGE_SERVICE_LINKS.some((entry) => entry.slug === slug);
}

export type OtherServicesNavGroup = {
  id: string;
  label: string;
  links: readonly { href: string; label: string }[];
  defaultOpen?: boolean;
};

export function getNampaServiceSidebarGroups(): OtherServicesNavGroup[] {
  return [
    {
      id: "nampa-massage",
      label: "Massage Nampa",
      defaultOpen: true,
      links: NAMPA_MASSAGE_SERVICE_LINKS.map(({ slug, label }) => ({
        href: servicePagePath(slug),
        label,
      })),
    },
    { id: "nampa-healing", label: "Healing Nampa", links: [] },
    { id: "nampa-beauty", label: "Beauty Nampa", links: [] },
    { id: "nampa-pain", label: "Pain Nampa", links: [] },
  ];
}
