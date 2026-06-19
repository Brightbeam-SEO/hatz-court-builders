import type {
  TreasureValleyFaqItem,
  TreasureValleyPressurePageConfig,
  TreasureValleyTimelineStep,
} from "@/lib/treasure-valley-pressure-page-config";
import { zenPick } from "@/lib/zen-pick-gallery";

function mapsEmbedEagle(): string {
  const q = encodeURIComponent("Eagle, ID");
  return `https://maps.google.com/maps?q=${q}&hl=en&z=11&output=embed`;
}

const EAGLE_MAP = {
  embedSrc: mapsEmbedEagle(),
  iframeTitle: "Map of Eagle, Idaho — Sol Pressure Washing service area",
} as const;

const IMG = {
  gasStation: zenPick("Spa Treatment Beds"),
  luxuryWin: zenPick("Serene Private Treatment Room"),
  gutter: zenPick("Hair Spa Scalp Therapy"),
} as const;

export const EAGLE_LOCAL_SERVICE_SLUGS = [
  "power-washing-eagle-id",
  "window-cleaning-eagle-id",
  "gutter-cleaning-eagle-id",
] as const;

export type EagleLocalServiceSlug = (typeof EAGLE_LOCAL_SERVICE_SLUGS)[number];

function faqsPower(): TreasureValleyFaqItem[] {
  return [
    {
      question: "How often should Eagle properties schedule power washing?",
      answer:
        "Annual passes suit many homes; lots near open fields, Eagle Road traffic, or heavy tree drip may prefer a mid-year concrete rinse when dust reboots fast.",
    },
    {
      question: "How fast can crews reach Eagle?",
      answer:
        "Many requests route within 24 hours; urgent oil spills or pre-event refreshes often align same-day or next-day when weather cooperates.",
    },
    {
      question: "Are there travel fees for Eagle?",
      answer:
        "Treasure Valley routing typically bundles Eagle with standard pricing—confirm during quoting so dispatch stays transparent.",
    },
    {
      question: "What surfaces suit power washing versus soft washing?",
      answer:
        "Durable flatwork and brick tolerate heated or high-flow rinses; painted siding, vinyl, and many roofs shift to soft washing so finishes stay protected.",
    },
    {
      question: "Is professional power washing safe for my home?",
      answer:
        "Yes when pressure, fan geometry, and detergents match each substrate—test corners precede wide passes on sensitive materials.",
    },
  ];
}

function faqsWindow(): TreasureValleyFaqItem[] {
  return [
    {
      question: "Why do Eagle windows look cloudy after rain?",
      answer:
        "Fine valley dust plus sprinkler minerals smear across glass—rain often spreads films instead of rinsing them spot-free.",
    },
    {
      question: "Can hard-water spots from irrigation be removed?",
      answer:
        "Most mild spotting lifts with proper pads and chemistry; long-cured etching may lighten without disappearing—we set expectations early.",
    },
    {
      question: "How do you handle tall or wide Eagle layouts?",
      answer:
        "Water-fed poles, ladder setups with proper tie-offs, and teamwork on divided-lite grids keep finishes streak-free.",
    },
    {
      question: "Is cleaning safe for seals and frames?",
      answer:
        "Low-abrasion tools and controlled moisture protect seals; screens come out when tracks need detailing.",
    },
    {
      question: "Best seasons for Eagle window cleaning?",
      answer:
        "Spring clears winter grime; late summer tackles dust and sprinkler ghosts before fall debris arrives.",
    },
  ];
}

function faqsGutter(): TreasureValleyFaqItem[] {
  return [
    {
      question: "How do I know Eagle gutters are clogged?",
      answer:
        "Overflow during storms, sagging runs, or downspouts that dribble instead of gushing usually mean debris or underground choke points.",
    },
    {
      question: "Can overflow hurt foundations?",
      answer:
        "Yes—water dumping beside stem walls beats concentrated drainage; clearing troughs and flushing outlets restores intended paths.",
    },
    {
      question: "Do you flush downspouts?",
      answer:
        "Yes—hidden clogs there cause spooky overflows even when gutters look half-empty.",
    },
    {
      question: "Busiest gutter seasons in Eagle?",
      answer:
        "Fall leaf dumps and spring blossom storms drive most calls; mature canopy streets may need twice-yearly clears.",
    },
    {
      question: "Why overflow without packed gutters?",
      answer:
        "Often a blocked downspout elbow—backsplash climbs until it pours over lips.",
    },
  ];
}

function timeline(area: string): TreasureValleyTimelineStep[] {
  return [
    {
      title: "Consult & access",
      body: `We confirm HOA staging, gate codes, and surface mixes typical around ${area} before pumps engage.`,
    },
    {
      title: "Prep & protection",
      body: "Landscaping, storefront glass, and tight setbacks get shielded—foothill gusts punish rushed setups.",
    },
    {
      title: "Clean & detail",
      body: "Surface-matched detergents and disciplined rinses—edges matter along river-corridor entries.",
    },
    {
      title: "Walkthrough",
      body: "Photo-friendly touch-ups on shady pockets before hoses coil.",
    },
  ];
}

export const EAGLE_LOCAL_SERVICE_PAGES: Record<EagleLocalServiceSlug, TreasureValleyPressurePageConfig> = {
  "power-washing-eagle-id": {
    routeParam: "power-washing-eagle-id",
    slug: "power-washing-eagle-id",
    metaTitle: "Power Washing Eagle ID | 24/7 Service, 5.0 Star Rated | Zen Day Spa",
    metaDescription:
      "Local power washing in Eagle ID—wind dust, pollen, and winter road spray lifted from siding and concrete. Fast Treasure Valley dispatch. Call (208) 979-0002.",
    cityName: "Eagle",
    heroTitle: "Power Washing Eagle ID",
    heroSubtitle:
      "Banbury-to-Legacy dust cycles meet honest routing—we deploy heat-capable flatwork rinses and siding-safe soft protocols without out-of-town scheduling roulette.",
    heroImageSrc: IMG.gasStation,
    heroImageAlt: "Commercial and residential concrete power washing — Eagle, Idaho",
    heroContactFormId: "pw-eagle-hero-form",
    heroFormName: "Power washing Eagle hero",
    bottomContactSectionId: "pw-eagle-contact",
    bottomContactFormId: "pw-eagle-page-form",
    bottomContactHeading: "Get Power Washing in Eagle",
    bottomContactSubtext:
      "Mention Eagle Island corridors, State Street fronts, or Legacy lanes—we quote realistic mobilization from Boise/Meridian hubs.",
    bottomFormName: "Power washing Eagle contact",
    shareTitle: "Power Washing Eagle, Idaho | Zen Day Spa",
    sidebarPanelId: "pw-eagle-other-services",
    mapIframeTitle: EAGLE_MAP.iframeTitle,
    mapEmbedSrc: EAGLE_MAP.embedSrc,
    faqHeading: "Power Washing Eagle FAQs",
    faqIntro: "Cadence, dispatch speed, travel transparency, and surface safety.",
    faqIdPrefix: "pw-eagle-faq",
    faqItems: faqsPower(),
    timelineHeading: "Your Eagle Power Washing Timeline",
    timelineIntro: "Local trucks, Bench-aware gust planning, crisp wrap-ups.",
    timelineSteps: timeline("Eagle power washing"),
  },
  "window-cleaning-eagle-id": {
    routeParam: "window-cleaning-eagle-id",
    slug: "window-cleaning-eagle-id",
    metaTitle: "Window Cleaning Eagle ID | 24/7 Service, 5.0 Star Rated | Zen Day Spa",
    metaDescription:
      "Window cleaning in Eagle ID—dust, pollen, and sprinkler mineral spots lifted from residential and commercial glass. Call (208) 979-0002.",
    cityName: "Eagle",
    heroTitle: "Window Cleaning Eagle ID",
    heroSubtitle:
      "River-corridor breezes paste grit wide layouts faster—pure-water finishes and blade discipline bring Legacy views back without dragging ladders across manicured beds.",
    heroImageSrc: IMG.luxuryWin,
    heroImageAlt: "Residential window cleaning — Eagle, Idaho",
    heroContactFormId: "win-eagle-hero-form",
    heroFormName: "Window cleaning Eagle hero",
    bottomContactSectionId: "win-eagle-contact",
    bottomContactFormId: "win-eagle-page-form",
    bottomContactHeading: "Get Window Cleaning in Eagle",
    bottomContactSubtext:
      "Share irrigation quirks and multi-story glass counts—we coordinate screens and tracks when you want full refreshes.",
    bottomFormName: "Window cleaning Eagle contact",
    shareTitle: "Window Cleaning Eagle, Idaho | Zen Day Spa",
    sidebarPanelId: "win-eagle-other-services",
    mapIframeTitle: EAGLE_MAP.iframeTitle,
    mapEmbedSrc: EAGLE_MAP.embedSrc,
    faqHeading: "Window Cleaning Eagle FAQs",
    faqIntro: "Hard water, tall glass, seal safety, and seasonal timing.",
    faqIdPrefix: "win-eagle-faq",
    faqItems: faqsWindow(),
    timelineHeading: "Your Eagle Window Cleaning Timeline",
    timelineIntro: "Dust-aware sequencing—screens out before tracks flood.",
    timelineSteps: timeline("Eagle window cleaning"),
  },
  "gutter-cleaning-eagle-id": {
    routeParam: "gutter-cleaning-eagle-id",
    slug: "gutter-cleaning-eagle-id",
    metaTitle: "Gutter Cleaning Eagle | 24/7 Service, 5.0 Star Rated | Zen Day Spa",
    metaDescription:
      "Gutter cleaning in Eagle ID—needles, leaves, and roof grit cleared with flushed downspouts. Fast local service. Call (208) 979-0002.",
    cityName: "Eagle",
    heroTitle: "Gutter Cleaning Eagle ID",
    heroSubtitle:
      "Banbury and Two Rivers rooflines shed debris fast—we hand-clear, flush outlets, and document overflows before winter rains test your fascia.",
    heroImageSrc: IMG.gutter,
    heroImageAlt: "Gutter cleaning on an Eagle-area home — debris removal",
    heroContactFormId: "gut-eagle-hero-form",
    heroFormName: "Gutter cleaning Eagle hero",
    bottomContactSectionId: "gut-eagle-contact",
    bottomContactFormId: "gut-eagle-page-form",
    bottomContactHeading: "Get Gutter Cleaning in Eagle",
    bottomContactSubtext:
      "Attach photos of sag runs or planter splash—we sequence ladders so landscaping stays respectful.",
    bottomFormName: "Gutter cleaning Eagle contact",
    shareTitle: "Gutter Cleaning Eagle, Idaho | Zen Day Spa",
    sidebarPanelId: "gut-eagle-other-services",
    mapIframeTitle: EAGLE_MAP.iframeTitle,
    mapEmbedSrc: EAGLE_MAP.embedSrc,
    faqHeading: "Gutter Cleaning Eagle FAQs",
    faqIntro: "Overflow clues, downspout flushing, and seasonal urgency.",
    faqIdPrefix: "gut-eagle-faq",
    faqItems: faqsGutter(),
    timelineHeading: "Your Eagle Gutter Cleaning Timeline",
    timelineIntro: "Roof-smart clears—flows verified before invoices land.",
    timelineSteps: timeline("Eagle gutter cleaning"),
  },
};

export function getEagleLocalServicePageConfig(slug: string): TreasureValleyPressurePageConfig | null {
  return EAGLE_LOCAL_SERVICE_PAGES[slug as EagleLocalServiceSlug] ?? null;
}

export function isEagleLocalServiceSlug(slug: string): slug is EagleLocalServiceSlug {
  return (EAGLE_LOCAL_SERVICE_SLUGS as readonly string[]).includes(slug);
}
