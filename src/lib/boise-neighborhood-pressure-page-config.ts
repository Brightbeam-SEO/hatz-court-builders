import type {
  TreasureValleyFaqItem,
  TreasureValleyPressurePageConfig,
  TreasureValleyTimelineStep,
} from "@/lib/treasure-valley-pressure-page-config";
import { zenPick } from "@/lib/zen-pick-gallery";

function mapsEmbedSrc(placeQuery: string): string {
  const q = encodeURIComponent(placeQuery);
  return `https://maps.google.com/maps?q=${q}&hl=en&z=11&output=embed`;
}

const BOISE_MAP = {
  embedSrc: mapsEmbedSrc("Boise, ID"),
  iframeTitle: "Map of Boise, Idaho — Sol Pressure Washing service area",
} as const;

const IMG = {
  house: zenPick("Private Spa Room"),
  driveway: zenPick("Foot Massage Services"),
  hillside: zenPick("Peaceful Massage Room Setup"),
  siding: zenPick("Cozy Massage Room"),
  sidewalk: zenPick("Red Rose On Spa Bed"),
  rinse: zenPick("Relaxing Massage Room Interior"),
  luxury: zenPick("Tranquil Treatment Room"),
  commercial: zenPick("Spa Treatment Beds"),
} as const;

export const BOISE_NEIGHBORHOOD_PRESSURE_SLUGS = [
  "pressure-washing-north-end-boise-id",
  "pressure-washing-collister-boise-id",
  "pressure-washing-quail-ridge-boise-id",
  "pressure-washing-winstead-park-boise-id",
  "pressure-washing-west-bench-boise-id",
  "pressure-washing-morris-hill-boise-id",
  "pressure-washing-boise-bench-boise-id",
  "pressure-washing-central-bench-boise-id",
  "pressure-washing-warm-springs-mesa-boise-id",
] as const;

export type BoiseNeighborhoodPressureSlug = (typeof BOISE_NEIGHBORHOOD_PRESSURE_SLUGS)[number];

function idKey(slug: BoiseNeighborhoodPressureSlug): string {
  return slug
    .replace(/^pressure-washing-/, "")
    .replace(/-boise-id$/, "")
    .replace(/-/g, "");
}

function neighborhoodFaqs(area: string): TreasureValleyFaqItem[] {
  return [
    {
      question: `How often should homes in ${area} schedule pressure washing?`,
      answer:
        "Annual service suits many properties; heavy canopy cover, irrigation spotting, or alley dust patterns may warrant a spring refresh plus a lighter fall rinse.",
    },
    {
      question: `Is pressure washing safe for older homes around ${area}?`,
      answer:
        "Yes—pressure, fan width, and chemistry shift per cladding type. Delicate facets often lean on soft washing while concrete still receives restorative rinses.",
    },
    {
      question: "What season works best in Boise?",
      answer:
        "Spring after pollen peaks and early fall before freeze cycles are popular—mid-summer visits still happen when algae returns fast on shaded walks.",
    },
    {
      question: "Do I need to be home?",
      answer:
        "Not always—clear hose access, closed windows, and gate codes let crews finish walkthroughs via photo sets when you prefer remote coordination.",
    },
    {
      question: "What problems does regular washing help prevent?",
      answer:
        "Slippery organic film on entries, siding stains that bake in, and HOA reminders about dingy approaches—all lift faster before etching sets.",
    },
  ];
}

function neighborhoodTimeline(area: string): TreasureValleyTimelineStep[] {
  return [
    {
      title: "Consult & scope",
      body: `We note driveway drainage, tree drip lines, and HOA staging expectations common around ${area} before detergents touch siding.`,
    },
    {
      title: "Prep & protection",
      body: "Screens, delicate beds, and neighboring vehicles get rinsed or cordoned—Bench gusts and foothill breezes respect nobody rushing skips.",
    },
    {
      title: "Clean & detail",
      body: "Surface-matched tips on concrete, disciplined ladder pulls on elevations, and edge-aware rinses along walks.",
    },
    {
      title: "Walkthrough",
      body: "Spot-check shady pockets where algae sneaks back first—touch-ups finish before hoses coil.",
    },
  ];
}

function mkNeighborhoodPage(
  slug: BoiseNeighborhoodPressureSlug,
  cityName: string,
  opts: {
    metaTitle: string;
    metaDescription: string;
    heroTitle: string;
    heroSubtitle: string;
    heroImageSrc: string;
    heroImageAlt: string;
    timelineIntro: string;
    faqIntro: string;
  },
): TreasureValleyPressurePageConfig {
  const key = idKey(slug);
  return {
    routeParam: slug,
    slug,
    metaTitle: opts.metaTitle,
    metaDescription: opts.metaDescription,
    cityName,
    heroTitle: opts.heroTitle,
    heroSubtitle: opts.heroSubtitle,
    heroImageSrc: opts.heroImageSrc,
    heroImageAlt: opts.heroImageAlt,
    heroContactFormId: `${key}-nb-hero-form`,
    heroFormName: `${cityName} neighborhood hero`,
    bottomContactSectionId: `${key}-nb-contact`,
    bottomContactFormId: `${key}-nb-page-form`,
    bottomContactHeading: `Get Pressure Washing in ${cityName}`,
    bottomContactSubtext: `Send photos of shady sidewalks, garage-wing algae, or storefront pads—we quote realistic crew routes across ${cityName}.`,
    bottomFormName: `${cityName} neighborhood contact`,
    shareTitle: `Pressure Washing ${cityName}, Boise Idaho | Zen Day Spa`,
    sidebarPanelId: `${key}-nb-other-services`,
    mapIframeTitle: BOISE_MAP.iframeTitle,
    mapEmbedSrc: BOISE_MAP.embedSrc,
    faqHeading: `Pressure Washing Questions — ${cityName}`,
    faqIntro: opts.faqIntro,
    faqIdPrefix: `${key}-nb-faq`,
    faqItems: neighborhoodFaqs(cityName),
    timelineHeading: `Your ${cityName} Pressure Washing Timeline`,
    timelineIntro: opts.timelineIntro,
    timelineSteps: neighborhoodTimeline(cityName),
  };
}

export const BOISE_NEIGHBORHOOD_PRESSURE_PAGES: Record<
  BoiseNeighborhoodPressureSlug,
  TreasureValleyPressurePageConfig
> = {
  "pressure-washing-north-end-boise-id": mkNeighborhoodPage(
    "pressure-washing-north-end-boise-id",
    "North End",
    {
      metaTitle: "Pressure Washing North End Boise ID | 24/7 Service | Zen Day Spa",
      metaDescription:
        "Pressure washing for North End Boise—tree shade, sidewalks, and vintage siding cleaned safely. Insured local crews. Call (208) 927-3160.",
      heroTitle: "Pressure Washing North End Boise ID",
      heroSubtitle:
        "Shaded sidewalks, gracious setbacks, and steady foot traffic mean grime films return quickly—we dial chemistry for mature canopy drip lines without trading curb appeal.",
      heroImageSrc: IMG.hillside,
      heroImageAlt: "Residential exterior cleaning near Boise North End — pressure washing",
      timelineIntro:
        "Historic grids reward ladder courtesy—crews stage hoses tight to sidewalks neighbors still need dry.",
      faqIntro: "Cadence for leafy blocks, older cladding, and spring blossom fallout.",
    },
  ),
  "pressure-washing-collister-boise-id": mkNeighborhoodPage(
    "pressure-washing-collister-boise-id",
    "Collister",
    {
      metaTitle: "Pressure Washing Collister Boise ID | 24/7 Service | Zen Day Spa",
      metaDescription:
        "Collister Boise pressure washing—shade-heavy patios, driveways, and siding freed from algae and foothill moisture film. Call (208) 927-3160.",
      heroTitle: "Pressure Washing Collister Boise ID",
      heroSubtitle:
        "Extra shade keeps moisture on concrete longer—green slip hazards and patio grout stains lift best when detergents match foothill pollen mixes.",
      heroImageSrc: IMG.siding,
      heroImageAlt: "Siding and exterior cleaning — Collister area Boise",
      timelineIntro: "Built for tree-heavy lots where moss creeps across pavers before owners notice.",
      faqIntro: "Moisture pockets, driveway moss, and safe refreshes near landscaped beds.",
    },
  ),
  "pressure-washing-quail-ridge-boise-id": mkNeighborhoodPage(
    "pressure-washing-quail-ridge-boise-id",
    "Quail Ridge",
    {
      metaTitle: "Pressure Washing Quail Ridge Boise ID | 24/7 Service | Zen Day Spa",
      metaDescription:
        "Quail Ridge Boise pressure washing—driveways, walks, and elevations tuned for suburban setbacks and HOA-ready curb appeal. Call (208) 927-3160.",
      heroTitle: "Pressure Washing Quail Ridge Boise ID",
      heroSubtitle:
        "Curving courts and cul-de-sacs catch pollen differently than grid streets—we route fans so irrigation arcs don’t reset stains overnight.",
      heroImageSrc: IMG.driveway,
      heroImageAlt: "Driveway pressure washing — Quail Ridge Boise residential area",
      timelineIntro: "Neighbor-conscious rinses—dry paths stay predictable between passes.",
      faqIntro: "Corner lots, sprinkler spotting, and bundled patio refreshes.",
    },
  ),
  "pressure-washing-winstead-park-boise-id": mkNeighborhoodPage(
    "pressure-washing-winstead-park-boise-id",
    "Winstead Park",
    {
      metaTitle: "Pressure Washing Winstead Park Boise ID | 24/7 Service | Zen Day Spa",
      metaDescription:
        "Winstead Park Boise pressure washing near foothill access—entries, garages, and patios cleared of dust and algae. Call (208) 927-3160.",
      heroTitle: "Pressure Washing Winstead Park Boise ID",
      heroSubtitle:
        "Foothill breezes push grit faster onto garages and north faces—we chase streak-free rinses before Bench gusts dry detergent unevenly.",
      heroImageSrc: IMG.rinse,
      heroImageAlt: "High-reach house rinse — Winstead Park Boise exterior cleaning",
      timelineIntro: "Elevation washes timed around windy afternoons—quality beats rushing gusty fins.",
      faqIntro: "Dust reboots, garage-wing algae, and concrete traction near parks.",
    },
  ),
  "pressure-washing-west-bench-boise-id": mkNeighborhoodPage(
    "pressure-washing-west-bench-boise-id",
    "West Bench",
    {
      metaTitle: "Pressure Washing West Bench Boise ID | 24/7 Service | Zen Day Spa",
      metaDescription:
        "West Bench Boise pressure washing—Fairview/Five Mile corridors, shaded walks, winter runoff stains lifted safely. Call (208) 927-3160.",
      heroTitle: "Pressure Washing West Bench Boise ID",
      heroSubtitle:
        "Bench runoff and mature street trees gang up on sidewalks near arterials—we strip algae rings without chewing aggregate.",
      heroImageSrc: IMG.sidewalk,
      heroImageAlt: "Sidewalk concrete cleaning — West Bench Boise",
      timelineIntro: "Commercial-paced corridors meet residential courtesy—cones and rinses stay orderly.",
      faqIntro: "Busy-road dust, park-adjacent slime, and spring thaw grime.",
    },
  ),
  "pressure-washing-morris-hill-boise-id": mkNeighborhoodPage(
    "pressure-washing-morris-hill-boise-id",
    "Morris Hill",
    {
      metaTitle: "Pressure Washing Morris Hill Boise ID | 24/7 Service | Zen Day Spa",
      metaDescription:
        "Morris Hill Boise pressure washing—Bench runoff, shade-heavy walks, and compact lots refreshed safely. Call (208) 927-3160.",
      heroTitle: "Pressure Washing Morris Hill Boise ID",
      heroSubtitle:
        "Moisture hangs near Bench transitions—Owyhee-area walks and Morris Hill Park loops polish best when crews sequence shady slabs last.",
      heroImageSrc: IMG.house,
      heroImageAlt: "House washing — Morris Hill Boise residential pressure washing",
      timelineIntro: "Parking-tight streets mean deliberate hose pulls—no draped lines across neighbor roses.",
      faqIntro: "Runoff staining, apartment breezeways nearby, and algae-prone entries.",
    },
  ),
  "pressure-washing-boise-bench-boise-id": mkNeighborhoodPage(
    "pressure-washing-boise-bench-boise-id",
    "Boise Bench",
    {
      metaTitle: "Pressure Washing Boise Bench Boise ID | 24/7 Service | Zen Day Spa",
      metaDescription:
        "Boise Bench pressure washing—arterial dust, tight setbacks, and mixed-era siding cleaned with Bench-aware methods. Call (208) 927-3160.",
      heroTitle: "Pressure Washing Boise Bench Boise ID",
      heroSubtitle:
        "Emerald-to-Overland corridors move dust fast—fan discipline keeps siding crisp while flatwork loses winter brine ghosts.",
      heroImageSrc: IMG.commercial,
      heroImageAlt: "Commercial and residential concrete cleaning — Boise Bench",
      timelineIntro: "Routes optimized for Bench arterials—crew staging respects alley exits.",
      faqIntro: "Mixed housing stock, oil shadows near garages, and HOA strips.",
    },
  ),
  "pressure-washing-central-bench-boise-id": mkNeighborhoodPage(
    "pressure-washing-central-bench-boise-id",
    "Central Bench",
    {
      metaTitle: "Pressure Washing Central Bench Boise ID | 24/7 Service | Zen Day Spa",
      metaDescription:
        "Central Bench Boise pressure washing—Vista corridor grit, mature landscapes, and breezeway concrete detailed locally. Call (208) 927-3160.",
      heroTitle: "Pressure Washing Central Bench Boise ID",
      heroSubtitle:
        "Central Bench picks up Vista-driven dust and sprinkler filming—we separate elevation soft washes from aggressive driveway passes.",
      heroImageSrc: IMG.luxury,
      heroImageAlt: "Luxury home exterior cleaning — Central Bench Boise",
      timelineIntro: "Designed for busy Bench calendars—clear scopes before ladders touch gutters.",
      faqIntro: "Hard-water edging, retrofit siding, and bundled window days.",
    },
  ),
  "pressure-washing-warm-springs-mesa-boise-id": mkNeighborhoodPage(
    "pressure-washing-warm-springs-mesa-boise-id",
    "Warm Springs Mesa",
    {
      metaTitle: "Pressure Washing Warm Springs Mesa Boise ID | 24/7 | Zen Day Spa",
      metaDescription:
        "Warm Springs Mesa Boise pressure washing—foothill dust, golf-course pollen, river-corridor moisture controlled safely. Call (208) 927-3160.",
      heroTitle: "Pressure Washing Warm Springs Mesa Boise ID",
      heroSubtitle:
        "Warm Springs Avenue traffic and foothill upslope dust twin-team your siding—we rinse stone, stucco, and aggregate without zebra-striping sunny slabs.",
      heroImageSrc: IMG.hillside,
      heroImageAlt: "Hillside residential exterior — Warm Springs Mesa Boise cleaning",
      timelineIntro: "River-corridor humidity informs dwell times—finishes dry evenly before evening dew.",
      faqIntro: "Golf-course pollen weeks, clinic entries, and hillside drainage quirks.",
    },
  ),
};

export function getBoiseNeighborhoodPressurePageConfig(
  slug: string,
): TreasureValleyPressurePageConfig | null {
  return BOISE_NEIGHBORHOOD_PRESSURE_PAGES[slug as BoiseNeighborhoodPressureSlug] ?? null;
}

export function isBoiseNeighborhoodPressureSlug(slug: string): slug is BoiseNeighborhoodPressureSlug {
  return (BOISE_NEIGHBORHOOD_PRESSURE_SLUGS as readonly string[]).includes(slug);
}
