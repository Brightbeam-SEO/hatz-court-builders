import { gpmPick } from "@/lib/gpm-pick-gallery";
import { pmServicePagePath } from "@/lib/pm-service-pages";

export type HomeServiceAccordionItem = {
  id: string;
  name: string;
  description: string;
  image: string;
  href: string;
};

export const SERVICES_SECTION_FEATURED_IMAGE = gpmPick("tennis court resurface crack repair");

export const HOME_SERVICES_ACCORDION: HomeServiceAccordionItem[] = [
  {
    id: "pickleball",
    name: "Pickleball Court Construction",
    description:
      "Custom pickleball courts built for smooth play, clean lines, and long-term performance.",
    image: gpmPick("pickleball court backyard modular tile"),
    href: pmServicePagePath("pickleball-court-construction"),
  },
  {
    id: "basketball",
    name: "Basketball Court Construction",
    description:
      "Backyard, school, and commercial basketball courts built for serious daily use.",
    image: gpmPick("basketball tile court modular hoop goal"),
    href: pmServicePagePath("basketball-court-construction"),
  },
  {
    id: "tennis",
    name: "Tennis Court Construction",
    description:
      "Professional tennis court construction with durable surfaces and precise layout.",
    image: gpmPick("tennis court resurface blue green acrylic"),
    href: pmServicePagePath("tennis-court-construction"),
  },
  {
    id: "volleyball",
    name: "Volleyball Court Construction",
    description:
      "Custom volleyball courts designed for homes, schools, parks, and recreation spaces.",
    image: gpmPick("multi sport outdoor backyard court"),
    href: pmServicePagePath("volleyball-court-construction"),
  },
  {
    id: "futsal-soccer",
    name: "Futsal / Soccer Court Construction",
    description:
      "Compact soccer and futsal courts built for fast play and heavy use.",
    image: gpmPick("indoor batting cage turf installation"),
    href: pmServicePagePath("futsal-soccer-court-construction"),
  },
  {
    id: "bocce",
    name: "Bocce Court Construction",
    description:
      "Clean, level bocce courts built for residential and commercial outdoor spaces.",
    image: gpmPick("tile shuffleboard court installation"),
    href: pmServicePagePath("bocce-court-construction"),
  },
  {
    id: "multi-court",
    name: "Multi-Court Construction",
    description:
      "Flexible court layouts built for multiple sports on one custom surface.",
    image: gpmPick("outdoor multi court pickleball basketball tennis"),
    href: pmServicePagePath("multi-court-construction"),
  },
  {
    id: "custom-court",
    name: "Custom Court Construction",
    description:
      "Complete court design and construction tailored to your space, sport, and goals.",
    image: gpmPick("modular court tile custom logo branding"),
    href: pmServicePagePath("custom-court-construction"),
  },
  {
    id: "commercial",
    name: "Commercial Court Construction",
    description:
      "Court construction for schools, parks, HOAs, recreation centers, and facilities.",
    image: gpmPick("pickleball post tension concrete commercial court"),
    href: pmServicePagePath("commercial-court-construction"),
  },
];
