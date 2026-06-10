import type { TreasureValleyPressurePageConfig } from "@/lib/treasure-valley-pressure-page-config";
import { zenPick } from "@/lib/zen-pick-gallery";

function mapBoiseEmbed(): string {
  const q = encodeURIComponent("Boise, ID");
  return `https://maps.google.com/maps?q=${q}&hl=en&z=11&output=embed`;
}

const BOISE_MAP = {
  embedSrc: mapBoiseEmbed(),
  iframeTitle: "Map of Boise, Idaho — Sol Pressure Washing service area",
} as const;

const IMG = {
  house: zenPick("Private Spa Room Products Massage Bed"),
  rinse: zenPick("Relaxing Massage Room Interior"),
  driveway: zenPick("our foot massage services"),
  sidewalk: zenPick("Red Rose On Spa Bed"),
  gasStation: zenPick("Spa Treatment Beds"),
  luxury: zenPick("Tranquil Treatment Room"),
} as const;

export const BOISE_POWER_SERVICE_SLUGS = [
  "power-washing-boise-id",
  "house-power-washing-in-boise-id",
  "driveway-power-washing-in-boise-id",
  "apartment-power-washing-company-in-boise-id",
  "commercial-power-washing-company-in-boise-id",
  "patio-power-washing-company-in-boise-id",
] as const;

export type BoisePowerServiceSlug = (typeof BOISE_POWER_SERVICE_SLUGS)[number];

function baseTimeline(serviceLabel: string): TreasureValleyPressurePageConfig["timelineSteps"] {
  return [
    {
      title: "Site walk & soil read",
      body: `We identify grease loads, algae pockets, and fragile substrates before choosing rinse heat, fan width, and detergents for your ${serviceLabel} scope.`,
    },
    {
      title: "Protect what shouldn’t get blasted",
      body: "Landscaping, storefront glazing, resident parking, and neighbor setbacks get rinsed, flagged, or cordoned—especially when Boise winds pick up.",
    },
    {
      title: "Power wash & detail pass",
      body: "Controlled passes strip tire films, pollen paste, and winter brine without carving joints or fuzzing coatings—then we chase edges and drains intentionally.",
    },
    {
      title: "Final walkthrough",
      body: "Slip-prone transitions and shade lines get a second look; photo sets available when managers need documentation for boards or brand standards.",
    },
  ];
}

export const BOISE_POWER_SERVICE_PAGES: Record<BoisePowerServiceSlug, TreasureValleyPressurePageConfig> = {
  "power-washing-boise-id": {
    routeParam: "power-washing-boise-id",
    slug: "power-washing-boise-id",
    metaTitle: "Power Washing Boise ID | Free Estimate | Zen Day Spa",
    metaDescription:
      "Residential and commercial power washing in Boise and the Treasure Valley—heated rinse capability when buildup needs it, insured crews, fast scheduling. Call (208) 927-3160.",
    cityName: "Boise",
    heroTitle: "Power Washing Boise ID",
    heroSubtitle:
      "High-flow rinses and selective heat knock down stubborn films on concrete and durable exteriors—paired with soft-touch methods wherever Boise siding says “easy does it.”",
    heroImageSrc: IMG.gasStation,
    heroImageAlt: "Commercial concrete power washing — crew serving Boise, Idaho",
    heroContactFormId: "power-wash-boise-hero-form",
    heroFormName: "Power washing Boise hero",
    bottomContactSectionId: "power-wash-boise-contact",
    bottomContactFormId: "power-wash-boise-page-form",
    bottomContactHeading: "Get Power Washing in Boise",
    bottomContactSubtext:
      "Send photos of oil shadows, algae stripes, or breezeway grime—we’ll tell you when heated rinses help versus when a gentler wash protects trim.",
    bottomFormName: "Power washing Boise contact",
    shareTitle: "Power Washing Boise, Idaho | Zen Day Spa",
    sidebarPanelId: "power-wash-boise-other-services",
    mapIframeTitle: BOISE_MAP.iframeTitle,
    mapEmbedSrc: BOISE_MAP.embedSrc,
    faqHeading: "FAQs About Power Washing in Boise",
    faqIntro: "How heat and pressure differ, what we wash, and how often Treasure Valley properties stay ahead of grime.",
    faqIdPrefix: "power-wash-boise-faq",
    faqItems: [
      {
        question: "What’s the difference between power washing and pressure washing?",
        answer:
          "Both move water under pressure; power washing adds heat that cuts grease, gum, and cured films faster on tolerant surfaces. We deploy heat only where substrate and drainage make sense.",
      },
      {
        question: "How often should Boise homes schedule power washing?",
        answer:
          "Most homeowners align one deep exterior refresh yearly, with a mid-year concrete rinse if pollen or irrigation spotting returns quickly on drives and patios.",
      },
      {
        question: "Is power washing safe for siding and roofs?",
        answer:
          "Often we blend approaches—low-pressure chemistry on cladding and panels, power-focused work on flatwork and durable masonry—so shine never trades away flashing or granules.",
      },
      {
        question: "Do you handle commercial lots and storefront approaches?",
        answer:
          "Yes—night-or-weekend windows, cone choreography, and oil-aware pad treatments keep pedestrian lanes predictable while finishes dry evenly.",
      },
      {
        question: "Can you bundle window or gutter help with power washing?",
        answer:
          "Absolutely—pairing glass and gutter clears after flatwork cuts repeat mobilization and keeps runoff paths predictable before storm season.",
      },
    ],
    timelineHeading: "Your Boise Power Washing Timeline",
    timelineIntro:
      "Heat when it earns its keep, restraint where Boise microclimates punish rash blasting—clear scopes before hoses uncurl.",
    timelineSteps: baseTimeline("Boise power washing"),
  },
  "house-power-washing-in-boise-id": {
    routeParam: "house-power-washing-in-boise-id",
    slug: "house-power-washing-in-boise-id",
    metaTitle: "House Power Washing in Boise | 5 Star Rated | Zen Day Spa",
    metaDescription:
      "Professional house power washing in Boise—north-wall mildew, garage wings, and mixed cladding cleaned with surface-smart pressure and detergents. Call (208) 927-3160.",
    cityName: "Boise",
    heroTitle: "House Power Washing Boise ID",
    heroSubtitle:
      "Strip pollen haze and sprinkler spotting from elevations that can take mechanical rinses—while routing delicate facets toward softer chemistry before paint pays the price.",
    heroImageSrc: IMG.rinse,
    heroImageAlt: "High-reach residential rinse during house power washing in Boise, Idaho",
    heroContactFormId: "house-power-boise-hero-form",
    heroFormName: "House power washing Boise hero",
    bottomContactSectionId: "house-power-boise-contact",
    bottomContactFormId: "house-power-boise-page-form",
    bottomContactHeading: "Get House Power Washing in Boise",
    bottomContactSubtext:
      "Attach elevation photos and note last wash dates—we’ll estimate ladder hours, detergent dwell, and whether bundled driveway work saves a trip.",
    bottomFormName: "House power washing Boise contact",
    shareTitle: "House Power Washing Boise, Idaho | Zen Day Spa",
    sidebarPanelId: "house-power-boise-other-services",
    mapIframeTitle: BOISE_MAP.iframeTitle,
    mapEmbedSrc: BOISE_MAP.embedSrc,
    faqHeading: "House Power Washing Questions for Boise Homeowners",
    faqIntro: "Frequency, surface safety, and what else we can bundle on the same day.",
    faqIdPrefix: "house-power-boise-faq",
    faqItems: [
      {
        question: "How often should I schedule house power washing in Boise?",
        answer:
          "Annual passes suit many homes; dense canopy, gravel shoulders, or busy arterials may warrant a spring algae treatment plus a lighter fall rinse.",
      },
      {
        question: "Can house power washing damage siding or roofs?",
        answer:
          "Not when crews match fan angles, pressure, and chemistry to each cladding type—delicate sections shift to soft washing while durable trim still gets crisp detailing.",
      },
      {
        question: "Do you offer roof washing?",
        answer:
          "Yes—low-pressure rinses target moss and streaks with granule preservation in mind; we verify drip paths so decks below stay protected.",
      },
      {
        question: "What else can you clean on the same visit?",
        answer:
          "Fences, patios, aggregate drives, and breezeway concrete pair naturally—one coordinated dry window beats staggered DIY rentals.",
      },
      {
        question: "How long does a typical house wash take?",
        answer:
          "Most single-family jobs finish within a few hours depending on stories, buildup depth, and how many attachments need slower passes.",
      },
    ],
    timelineHeading: "Your Boise House Power Washing Timeline",
    timelineIntro: "Ladder plans first, detergents second, cosmetic rinses last—corners stay sharp from the curb.",
    timelineSteps: baseTimeline("house power washing"),
  },
  "driveway-power-washing-in-boise-id": {
    routeParam: "driveway-power-washing-in-boise-id",
    slug: "driveway-power-washing-in-boise-id",
    metaTitle: "Driveway Power Washing in Boise | Fast Quotes | Zen Day Spa",
    metaDescription:
      "Driveway and sidewalk power washing in Boise—oil-aware concrete treatments, crisp joints, safer footing. Free estimates. Call (208) 927-3160.",
    cityName: "Boise",
    heroTitle: "Driveway Power Washing Boise ID",
    heroSubtitle:
      "Wake up tire stripes, fertilizer ghosts, and winter brine with fan-disciplined passes—edges along walks and garage aprons stay deliberate, not scribbled.",
    heroImageSrc: IMG.driveway,
    heroImageAlt: "Driveway and sidewalk cleaning — power washing in Boise, Idaho",
    heroContactFormId: "driveway-power-boise-hero-form",
    heroFormName: "Driveway power washing Boise hero",
    bottomContactSectionId: "driveway-power-boise-contact",
    bottomContactFormId: "driveway-power-boise-page-form",
    bottomContactHeading: "Get Driveway Power Washing in Boise",
    bottomContactSubtext:
      "Mention HOA striping rules or rust drips—we’ll sequence pretreatment, heat, and rinse so neighbors see uniform brightness.",
    bottomFormName: "Driveway power washing Boise contact",
    shareTitle: "Driveway Power Washing Boise, Idaho | Zen Day Spa",
    sidebarPanelId: "driveway-power-boise-other-services",
    mapIframeTitle: BOISE_MAP.iframeTitle,
    mapEmbedSrc: BOISE_MAP.embedSrc,
    faqHeading: "Driveway Power Washing FAQs — Boise",
    faqIntro: "Concrete care, stain realism, and pairing walks with the apron in one visit.",
    faqIdPrefix: "driveway-power-boise-faq",
    faqItems: [
      {
        question: "How often should driveways be power washed?",
        answer:
          "Once or twice yearly keeps organic film from locking in; corner lots battling dust may appreciate a mid-season refresh after heavy wind events.",
      },
      {
        question: "Will power washing hurt concrete?",
        answer:
          "Professional tip selection and distance protect aggregate; we avoid rookie pencil jets that leave chatter marks or expose stone prematurely.",
      },
      {
        question: "Do you clean sidewalks and approaches together?",
        answer:
          "Yes—combined mobilization delivers even brightness from curb to porch and eliminates halo stripes between slabs washed on different days.",
      },
      {
        question: "What’s included in a driveway service?",
        answer:
          "Surface pretreatment when stains demand it, controlled washing across the full pad, joint debris clearing, and a tidy rinse toward drains.",
      },
      {
        question: "How long does a driveway job take?",
        answer:
          "Many residential drives finish in one to two hours; larger courts or heavy oil chemistry extend dwell time before final rinses.",
      },
    ],
    timelineHeading: "Your Boise Driveway Power Wash Timeline",
    timelineIntro: "Oil chemistry staged thoughtfully—heat only where it accelerates release without chasing hydrocarbons into planter beds.",
    timelineSteps: baseTimeline("driveway power washing"),
  },
  "apartment-power-washing-company-in-boise-id": {
    routeParam: "apartment-power-washing-company-in-boise-id",
    slug: "apartment-power-washing-company-in-boise-id",
    metaTitle: "Apartment Power Washing Company in Boise | Fast Quotes | Zen Day Spa",
    metaDescription:
      "Apartment and multi-family power washing in Boise—breezeways, stairs, parking approaches, and dumpster pads with resident-conscious scheduling. Call (208) 927-3160.",
    cityName: "Boise",
    heroTitle: "Apartment Power Washing Boise ID",
    heroSubtitle:
      "Refresh corridors tenants touch daily—pollen paste on railings, drip lines under balconies, and breezeway algae without turning weekends into a hose maze.",
    heroImageSrc: IMG.luxury,
    heroImageAlt: "Multi-family exterior cleaning — apartment power washing in Boise, Idaho",
    heroContactFormId: "apartment-power-boise-hero-form",
    heroFormName: "Apartment power washing Boise hero",
    bottomContactSectionId: "apartment-power-boise-contact",
    bottomContactFormId: "apartment-power-boise-page-form",
    bottomContactHeading: "Get Apartment Power Washing in Boise",
    bottomContactSubtext:
      "Share gate rules, peak foot traffic, and whether multiple buildings need one coordinated sweep—we’ll phase rinses around leases and events.",
    bottomFormName: "Apartment power washing Boise contact",
    shareTitle: "Apartment Power Washing Boise, Idaho | Zen Day Spa",
    sidebarPanelId: "apartment-power-boise-other-services",
    mapIframeTitle: BOISE_MAP.iframeTitle,
    mapEmbedSrc: BOISE_MAP.embedSrc,
    faqHeading: "Apartment Power Washing FAQs — Boise",
    faqIntro: "Frequency for multifamily, surfaces we cover, and minimizing disruption.",
    faqIdPrefix: "apartment-power-boise-faq",
    faqItems: [
      {
        question: "How often should apartment exteriors be power washed?",
        answer:
          "Most communities schedule once or twice yearly; high-traffic breezeways near landscaping may need an extra mid-season algae pass.",
      },
      {
        question: "Which areas can you clean?",
        answer:
          "Siding and stair towers, walks and pool decks, parking lanes, dumpster pads, railings, and many canopy undersides—scoped per substrate.",
      },
      {
        question: "Is the process safe for residents and plantings?",
        answer:
          "We communicate wet-floor timing, shield delicate beds, and pick detergents sized to runoff paths Boise sites already manage.",
      },
      {
        question: "Can multiple buildings run in one mobilization?",
        answer:
          "Yes—sequenced phases keep hoses moving efficiently while leaving dry corridors between occupied wings.",
      },
      {
        question: "How do we schedule?",
        answer:
          "Call or submit photos with unit counts and trouble spots—we’ll propose rotation maps and hours that respect quiet policies.",
      },
    ],
    timelineHeading: "Your Boise Apartment Wash Timeline",
    timelineIntro: "Manager sign-offs, cone scripts, and rinse timing that respects peak arrivals.",
    timelineSteps: baseTimeline("apartment power washing"),
  },
  "commercial-power-washing-company-in-boise-id": {
    routeParam: "commercial-power-washing-company-in-boise-id",
    slug: "commercial-power-washing-company-in-boise-id",
    metaTitle: "Commercial Power Washing Company in Boise | 24/7 | Zen Day Spa",
    metaDescription:
      "Commercial power washing in Boise—retail pads, restaurants, warehouses, and office entries with flexible hours and slip-conscious finishes. Call (208) 927-3160.",
    cityName: "Boise",
    heroTitle: "Commercial Power Washing Boise ID",
    heroSubtitle:
      "Keep approaches camera-ready for customers and inspectors—grease-wise pads, gum-aware sidewalks, and disciplined drying when Boise afternoons stay breezy.",
    heroImageSrc: IMG.gasStation,
    heroImageAlt: "Commercial lot and concrete power washing — Boise, Idaho",
    heroContactFormId: "commercial-power-boise-hero-form",
    heroFormName: "Commercial power washing Boise hero",
    bottomContactSectionId: "commercial-power-boise-contact",
    bottomContactFormId: "commercial-power-boise-page-form",
    bottomContactHeading: "Get Commercial Power Washing in Boise",
    bottomContactSubtext:
      "Note peak foot traffic, hood-cleaning neighbors, and whether night rinses fit—you’ll get a written scope tied to surfaces and soil loads.",
    bottomFormName: "Commercial power washing Boise contact",
    shareTitle: "Commercial Power Washing Boise, Idaho | Zen Day Spa",
    sidebarPanelId: "commercial-power-boise-other-services",
    mapIframeTitle: BOISE_MAP.iframeTitle,
    mapEmbedSrc: BOISE_MAP.embedSrc,
    faqHeading: "Commercial Power Washing FAQs — Boise",
    faqIntro: "Property types, cadence, and how clean entries protect brand impressions.",
    faqIdPrefix: "commercial-power-boise-faq",
    faqItems: [
      {
        question: "What commercial properties do you wash?",
        answer:
          "Retail strips, medical entries, flex warehouses, hospitality ports, and mixed-use garages—each scoped for grease chemistry versus pedestrian timing.",
      },
      {
        question: "How often should businesses schedule service?",
        answer:
          "Quarterly or biannual rhythms fit busy pads; lighter-use sites often sustain annual refreshes with spot treatments between.",
      },
      {
        question: "Is commercial washing safe for varied substrates?",
        answer:
          "Pressure, heat, and detergents adjust per brick, coated concrete, metal panels, or EIFS—we test discreet corners before wide passes.",
      },
      {
        question: "Do you handle parking lots and sidewalks?",
        answer:
          "Yes—gum, tire films, and fryer-adjacent stains lift with targeted pretreatment before uniform rinses tie the lot together.",
      },
      {
        question: "Why invest in professional washing?",
        answer:
          "Clean entries signal maintenance discipline, reduce slip hazards, and slow costly buildup that etches finishes between capital cycles.",
      },
    ],
    timelineHeading: "Your Boise Commercial Power Wash Timeline",
    timelineIntro: "Operations-first sequencing—crews stage where deliveries still flow.",
    timelineSteps: baseTimeline("commercial power washing"),
  },
  "patio-power-washing-company-in-boise-id": {
    routeParam: "patio-power-washing-company-in-boise-id",
    slug: "patio-power-washing-company-in-boise-id",
    metaTitle: "Patio Power Washing Company in Boise | 24/7 Service | Zen Day Spa",
    metaDescription:
      "Patio and deck power washing in Boise—pavers, stamped concrete, wood, and composite outdoor rooms without wrecking joints. Call (208) 927-3160.",
    cityName: "Boise",
    heroTitle: "Patio Power Washing Boise ID",
    heroSubtitle:
      "Strip shady algae and barbecue drip lines from outdoor rooms—fan geometry respects polymeric sand while wood and composite decks get softer, grain-aware passes.",
    heroImageSrc: IMG.sidewalk,
    heroImageAlt: "Patio concrete cleaning in progress — Boise patio power washing",
    heroContactFormId: "patio-power-boise-hero-form",
    heroFormName: "Patio power washing Boise hero",
    bottomContactSectionId: "patio-power-boise-contact",
    bottomContactFormId: "patio-power-boise-page-form",
    bottomContactHeading: "Get Patio Power Washing in Boise",
    bottomContactSubtext:
      "Mention outdoor kitchens, heaters, or pet traffic—we’ll plan furniture shifts and rinse paths before we dial pressure.",
    bottomFormName: "Patio power washing Boise contact",
    shareTitle: "Patio Power Washing Boise, Idaho | Zen Day Spa",
    sidebarPanelId: "patio-power-boise-other-services",
    mapIframeTitle: BOISE_MAP.iframeTitle,
    mapEmbedSrc: BOISE_MAP.embedSrc,
    faqHeading: "Patio & Deck Power Washing FAQs — Boise",
    faqIntro: "Surface differences, algae removal, and why pro equipment beats box-store rentals.",
    faqIdPrefix: "patio-power-boise-faq",
    faqItems: [
      {
        question: "How often should patios be power washed?",
        answer:
          "Annual service suits many homes; heavy shade or frequent entertaining may pair spring pollen relief with a pre-winter rinse.",
      },
      {
        question: "How does patio washing differ from deck washing?",
        answer:
          "Stone and brushed concrete tolerate firmer fans along joints; wood and composite decks receive reduced pressure and detergents aimed at grain-safe lifts.",
      },
      {
        question: "Is power washing safe for wood decks?",
        answer:
          "Yes—with conservative tips, grain-aligned passes, and dwell-managed cleaners that brighten boards without feathering soft cedar.",
      },
      {
        question: "Can you remove algae and slick films?",
        answer:
          "Organic buildup releases with surfactants plus measured pressure—restoring grip underfoot without blasting away stabilizing sand.",
      },
      {
        question: "Why hire professionals instead of DIY?",
        answer:
          "Correct flow rates, heat discipline, and edging judgment prevent etched rings and stranded puddles that rental units often leave behind.",
      },
    ],
    timelineHeading: "Your Boise Patio Power Wash Timeline",
    timelineIntro: "Outdoor living stays usable—minimal downtime, maximal contrast on slabs and rails.",
    timelineSteps: baseTimeline("patio power washing"),
  },
};

export function getBoisePowerServicePageConfig(slug: string): TreasureValleyPressurePageConfig | null {
  return BOISE_POWER_SERVICE_PAGES[slug as BoisePowerServiceSlug] ?? null;
}

export function isBoisePowerServiceSlug(slug: string): slug is BoisePowerServiceSlug {
  return (BOISE_POWER_SERVICE_SLUGS as readonly string[]).includes(slug);
}
