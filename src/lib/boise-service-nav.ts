import { servicePagePath } from "@/lib/service-pages";

/** Boise massage landings — sidebar only (not header/footer). */
export const BOISE_MASSAGE_SERVICE_LINKS = [
  { slug: "scalp-massage-boise", label: "Scalp Massage Boise" },
  { slug: "hot-stone-massage-boise-id", label: "Hot Stone Massage Boise, ID" },
  { slug: "prenatal-massage-boise-id", label: "Prenatal Massage Boise, ID" },
  { slug: "deep-tissue-massage-boise-id", label: "Deep Tissue Massage Boise, ID" },
  { slug: "foot-massage-boise-id", label: "Foot Massage Boise, ID" },
  { slug: "couples-massage-boise-id", label: "Couples Massage Boise, Idaho" },
] as const;

export type BoiseServiceSlug = (typeof BOISE_MASSAGE_SERVICE_LINKS)[number]["slug"];

export const BOISE_SERVICE_SLUGS: BoiseServiceSlug[] = BOISE_MASSAGE_SERVICE_LINKS.map(
  ({ slug }) => slug,
);

export function isBoiseServiceSlug(slug: string): slug is BoiseServiceSlug {
  return BOISE_MASSAGE_SERVICE_LINKS.some((entry) => entry.slug === slug);
}

export type OtherServicesNavGroup = {
  id: string;
  label: string;
  links: readonly { href: string; label: string }[];
  defaultOpen?: boolean;
};

export function getBoiseServiceSidebarGroups(): OtherServicesNavGroup[] {
  return [
    {
      id: "boise-massage",
      label: "Massage Boise",
      defaultOpen: true,
      links: BOISE_MASSAGE_SERVICE_LINKS.map(({ slug, label }) => ({
        href: servicePagePath(slug),
        label,
      })),
    },
    { id: "boise-healing", label: "Healing Boise", links: [] },
    { id: "boise-beauty", label: "Beauty Boise", links: [] },
    { id: "boise-pain", label: "Pain Boise", links: [] },
  ];
}
