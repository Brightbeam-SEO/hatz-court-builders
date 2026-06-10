import { gpmPick } from "@/lib/gpm-pick-gallery";
import { pmServicePagePath } from "@/lib/pm-service-pages";

export type HomeServiceAccordionItem = {
  id: string;
  name: string;
  description: string;
  image: string;
  href: string;
};

export const HOME_SERVICES_ACCORDION: HomeServiceAccordionItem[] = [
  {
    id: "property-management",
    name: "Court Construction Services",
    description:
      "Custom tennis, basketball, pickleball, and multi-use courts for residential and commercial projects in Idaho and Arizona.",
    image: gpmPick("modular court tile custom logo branding"),
    href: pmServicePagePath("property-management-services"),
  },
];

/** Split a service title for the expanded oval layout (lead | image | tail). */
export function splitServiceAccordionTitle(name: string): [string, string] {
  const words = name.trim().split(/\s+/);
  if (words.length <= 1) return [name, ""];
  const mid = Math.ceil(words.length / 2);
  return [words.slice(0, mid).join(" "), words.slice(mid).join(" ")];
}
