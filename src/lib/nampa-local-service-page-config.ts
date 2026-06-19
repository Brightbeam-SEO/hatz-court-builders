import type {
  TreasureValleyFaqItem,
  TreasureValleyPressurePageConfig,
  TreasureValleyTimelineStep,
} from "@/lib/treasure-valley-pressure-page-config";
import { zenPick } from "@/lib/zen-pick-gallery";

function mapsEmbedNampa(): string {
  const q = encodeURIComponent("Nampa, ID");
  return `https://maps.google.com/maps?q=${q}&hl=en&z=11&output=embed`;
}

const NAMPA_MAP = {
  embedSrc: mapsEmbedNampa(),
  iframeTitle: "Map of Nampa, Idaho — Sol Pressure Washing service area",
} as const;

const IMG = {
  gasStation: zenPick("Spa Treatment Beds"),
  luxuryWin: zenPick("Serene Private Treatment Room"),
  gutter: zenPick("Hair Spa Scalp Therapy"),
} as const;

export const NAMPA_LOCAL_SERVICE_SLUGS = [
  "power-washing-nampa-id",
  "window-cleaning-nampa-id",
  "gutter-cleaning-nampa-id",
] as const;

export type NampaLocalServiceSlug = (typeof NAMPA_LOCAL_SERVICE_SLUGS)[number];

function faqsPower(): TreasureValleyFaqItem[] {
  return [
    {
      question: "What types of stains can power washing remove in Nampa?",
      answer:
        "Most dirt, algae, mildew, and surface staining lifts from concrete, patios, and tolerant cladding—ag dust and brake glaze often need detergent dwell plus wider fans rather than a single turbo pencil.",
    },
    {
      question: "Can power washing damage siding or concrete?",
      answer:
        "Not when pressure, heat, and chemistry match each substrate—vinyl and coated trims steer toward soft washing while slabs tolerate higher-flow rinses.",
    },
    {
      question: "Why do Nampa driveways darken so fast?",
      answer:
        "County-road fines, irrigation minerals, and tire compounds lodge in pores—hose rinses rarely evacuate what traffic pounds in weekly.",
    },
    {
      question: "How often should Nampa properties schedule power washing?",
      answer:
        "Many homes book annually; lots bordering open farmland or busy arterials like Garrity often prefer twice yearly flatwork refreshes.",
    },
    {
      question: "Do you handle large patios or commercial pads?",
      answer:
        "Yes—we phase cones, drains, and dry-window messaging so approaches stay workable while stains strip uniformly.",
    },
  ];
}

function faqsWindow(): TreasureValleyFaqItem[] {
  return [
    {
      question: "Why do Nampa windows streak after rain?",
      answer:
        "Rain spreads existing dust and sprinkler minerals instead of polishing glass—when it dries, the film reads worse under angled sun.",
    },
    {
      question: "Can sprinkler hard-water spots be removed?",
      answer:
        "Fresh spotting usually clears with disciplined blades and chemistry; years-old etching may lighten—expectations get set before acids engage coatings.",
    },
    {
      question: "Do larger or second-story layouts take longer?",
      answer:
        "Yes—South Nampa estates with tall grids need poles, ladders, or both staged safely before production speeds up.",
    },
    {
      question: "How often should windows be cleaned in Nampa?",
      answer:
        "Most schedules hit two to four passes yearly; dusty springs and heavy irrigation arcs push some homes toward the upper end.",
    },
    {
      question: "Why does glass look cloudy when it seems clean?",
      answer:
        "Ultra-fine dust and mineral haze bond into a sheet professional polishing lifts—household sprays often smear it wider.",
    },
  ];
}

function faqsGutter(): TreasureValleyFaqItem[] {
  return [
    {
      question: "How do I know gutters are clogged in Nampa?",
      answer:
        "Overflow lips during moderate rain, standing water in troughs, or downspouts that barely dribble usually signal debris or buried choke points.",
    },
    {
      question: "Can overflows hurt siding or foundations?",
      answer:
        "Yes—sheet flows stripe paint, beat mulch into trenches, and concentrate moisture against stem walls until drainage improves.",
    },
    {
      question: "Do you flush downspouts?",
      answer:
        "Always—elbows hide plugs that cause spooky overflows even when gutters look half-empty from the ladder.",
    },
    {
      question: "When is gutter cleaning busiest?",
      answer:
        "Fall leaf dumps peak volumes; spring clears winter grit plus blossoms—tree-heavy Greenhurst and Midland streets often book twice yearly.",
    },
    {
      question: "Why overflow when troughs look half empty?",
      answer:
        "Usually a blocked downspout—water stacks until it cascades over fascia instead of exiting the shoe.",
    },
  ];
}

function timeline(area: string): TreasureValleyTimelineStep[] {
  return [
    {
      title: "Consult & access",
      body: `We confirm dock traffic, HOA staging, and Canyon County soil mixes typical around ${area} before pumps fire.`,
    },
    {
      title: "Prep & protection",
      body: "Merchandise doors, planter strips, and breezeway glass get shielded—open farmland gusts still shove overspray if barriers rush.",
    },
    {
      title: "Clean & detail",
      body: "Oil-aware chemistry on pads; disciplined fans along Garrity-style arterials where brake dust reloads fast.",
    },
    {
      title: "Walkthrough",
      body: "Shaded alcoves and ADA ramps checked last—slip confidence matters as much as brightness.",
    },
  ];
}

export const NAMPA_LOCAL_SERVICE_PAGES: Record<NampaLocalServiceSlug, TreasureValleyPressurePageConfig> = {
  "power-washing-nampa-id": {
    routeParam: "power-washing-nampa-id",
    slug: "power-washing-nampa-id",
    metaTitle: "Power Washing Nampa ID | 24/7 Service, 5 Star Rated | Zen Day Spa",
    metaDescription:
      "Power washing in Nampa ID—farm dust, driveway stains, and patio buildup cleared by local crews. Fast Canyon County response. Call (208) 979-0002.",
    cityName: "Nampa",
    heroTitle: "Power Washing Nampa ID",
    heroSubtitle:
      "Greenhurst-to-Vineyard grime stacks faster beside open fields—we route heat-aware flatwork and cladding-safe rinse plans along I-84 loops without vague arrival windows.",
    heroImageSrc: IMG.gasStation,
    heroImageAlt: "Commercial concrete power washing — Nampa, Idaho area service",
    heroContactFormId: "pw-nampa-hero-form",
    heroFormName: "Power washing Nampa hero",
    bottomContactSectionId: "pw-nampa-contact",
    bottomContactFormId: "pw-nampa-page-form",
    bottomContactHeading: "Get Power Washing in Nampa",
    bottomContactSubtext:
      "Note Lake Lowell exposure, 12th Avenue storefronts, or Midland haul routes—we quote mobilization that matches Canyon County traffic reality.",
    bottomFormName: "Power washing Nampa contact",
    shareTitle: "Power Washing Nampa, Idaho | Zen Day Spa",
    sidebarPanelId: "pw-nampa-other-services",
    mapIframeTitle: NAMPA_MAP.iframeTitle,
    mapEmbedSrc: NAMPA_MAP.embedSrc,
    faqHeading: "Power Washing Nampa FAQs",
    faqIntro: "Stains, surface safety, driveway darkening, and scheduling cadence.",
    faqIdPrefix: "pw-nampa-faq",
    faqItems: faqsPower(),
    timelineHeading: "Your Nampa Power Washing Timeline",
    timelineIntro: "Retail urgency meets residential detail—same disciplined wrap-up.",
    timelineSteps: timeline("Nampa power washing"),
  },
  "window-cleaning-nampa-id": {
    routeParam: "window-cleaning-nampa-id",
    slug: "window-cleaning-nampa-id",
    metaTitle: "Window Cleaning Nampa ID | 24/7 Service, 5.0 Star Rated | Zen Day Spa",
    metaDescription:
      "Window cleaning in Nampa ID—farm dust, sprinkler spots, and hazy glass cleared fast. Residential & commercial. Call (208) 979-0002.",
    cityName: "Nampa",
    heroTitle: "Window Cleaning Nampa ID",
    heroSubtitle:
      "Sprinkler arcs and south-valley breezes haze big Vineyard sliders—we blend poles and ladders so reflections return without chewing silicone or dragging grit across frames.",
    heroImageSrc: IMG.luxuryWin,
    heroImageAlt: "Residential window cleaning — Nampa, Idaho",
    heroContactFormId: "win-nampa-hero-form",
    heroFormName: "Window cleaning Nampa hero",
    bottomContactSectionId: "win-nampa-contact",
    bottomContactFormId: "win-nampa-page-form",
    bottomContactHeading: "Get Window Cleaning in Nampa",
    bottomContactSubtext:
      "Share pane counts, hard-water history, and Ford Idaho Center proximity—we sequence screens when tracks demand deeper resets.",
    bottomFormName: "Window cleaning Nampa contact",
    shareTitle: "Window Cleaning Nampa, Idaho | Zen Day Spa",
    sidebarPanelId: "win-nampa-other-services",
    mapIframeTitle: NAMPA_MAP.iframeTitle,
    mapEmbedSrc: NAMPA_MAP.embedSrc,
    faqHeading: "Window Cleaning Nampa FAQs",
    faqIntro: "Rain streaks, minerals, tall glass, and realistic cadence.",
    faqIdPrefix: "win-nampa-faq",
    faqItems: faqsWindow(),
    timelineHeading: "Your Nampa Window Cleaning Timeline",
    timelineIntro: "Dust-season sequencing—edges checked in oblique sun.",
    timelineSteps: timeline("Nampa window cleaning"),
  },
  "gutter-cleaning-nampa-id": {
    routeParam: "gutter-cleaning-nampa-id",
    slug: "gutter-cleaning-nampa-id",
    metaTitle: "Gutter Cleaning Nampa ID | 24/7 Service, 5.0 Star Rated | Zen Day Spa",
    metaDescription:
      "Gutter cleaning in Nampa ID—leaves, roof grit, and clogged downspouts cleared. Overflow fixes & fast scheduling. Call (208) 979-0002.",
    cityName: "Nampa",
    heroTitle: "Gutter Cleaning Nampa ID",
    heroSubtitle:
      "Midland canopy streets shed debris into long runs—we hand-clear, surge-test outlets, and photograph splash zones before Canyon County storms stress your fascia.",
    heroImageSrc: IMG.gutter,
    heroImageAlt: "Gutter cleaning on a Nampa-area home — debris removal",
    heroContactFormId: "gut-nampa-hero-form",
    heroFormName: "Gutter cleaning Nampa hero",
    bottomContactSectionId: "gut-nampa-contact",
    bottomContactFormId: "gut-nampa-page-form",
    bottomContactHeading: "Get Gutter Cleaning in Nampa",
    bottomContactSubtext:
      "Attach sag photos or planter trenches—we ladder thoughtfully around irrigation heads and pet turf.",
    bottomFormName: "Gutter cleaning Nampa contact",
    shareTitle: "Gutter Cleaning Nampa, Idaho | Zen Day Spa",
    sidebarPanelId: "gut-nampa-other-services",
    mapIframeTitle: NAMPA_MAP.iframeTitle,
    mapEmbedSrc: NAMPA_MAP.embedSrc,
    faqHeading: "Gutter Cleaning Nampa FAQs",
    faqIntro: "Overflow clues, foundation risk, downspouts, and seasonal peaks.",
    faqIdPrefix: "gut-nampa-faq",
    faqItems: faqsGutter(),
    timelineHeading: "Your Nampa Gutter Cleaning Timeline",
    timelineIntro: "Flow-first mindset—invoices follow verified drains.",
    timelineSteps: timeline("Nampa gutter cleaning"),
  },
};

export function getNampaLocalServicePageConfig(slug: string): TreasureValleyPressurePageConfig | null {
  return NAMPA_LOCAL_SERVICE_PAGES[slug as NampaLocalServiceSlug] ?? null;
}

export function isNampaLocalServiceSlug(slug: string): slug is NampaLocalServiceSlug {
  return (NAMPA_LOCAL_SERVICE_SLUGS as readonly string[]).includes(slug);
}
