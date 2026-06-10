import { gpmPick } from "@/lib/gpm-pick-gallery";

export type PropertyManagementServiceHighlight = {
  title: string;
  items: readonly string[];
  imageSrc: string;
  imageAlt: string;
  /** Overlay tone on top of the background photo. */
  variant: "green" | "dark" | "light";
};

export const PROPERTY_MANAGEMENT_SERVICE_HIGHLIGHTS: PropertyManagementServiceHighlight[] = [
  {
    title: "Court Resurfacing & Repairs",
    imageSrc: gpmPick("tennis court crack repair resurfacing"),
    imageAlt: "Tennis court crack repair and resurfacing — Hatz Court Builders",
    variant: "green",
    items: [
      "Crack repair and surface restoration",
      "Acrylic and cushioned system recoating",
      "Line striping and color refresh",
      "Before-and-after damage assessment",
    ],
  },
  {
    title: "Custom Court Construction",
    imageSrc: gpmPick("pickleball court backyard modular tile"),
    imageAlt: "Custom backyard pickleball court construction — Hatz Court Builders",
    variant: "dark",
    items: [
      "Pickleball, basketball, and tennis courts",
      "Modular tile and acrylic surfacing",
      "Residential and commercial builds",
      "Multi-use court design",
    ],
  },
  {
    title: "Full Design-Build Projects",
    imageSrc: gpmPick("modular court tile custom logo branding"),
    imageAlt: "Custom logo modular court installation — Hatz Court Builders",
    variant: "light",
    items: [
      "Site preparation and grading",
      "Fencing, lighting, and components",
      "Custom logos and branding",
      "One-stop sports construction",
    ],
  },
];
