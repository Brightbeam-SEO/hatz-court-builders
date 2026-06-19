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
  luxuryWindows: zenPick("Serene Private Treatment Room"),
  commercialLift: zenPick("Zen Day Spa Massage Group Photo"),
  highRiseLift: zenPick("Relaxing Waterfall Scalp Massage"),
  interiorVaulted: zenPick("Peaceful Massage Room Setup With Decor"),
  hillsideRoof: zenPick("Spa Treatment Beds"),
} as const;

export const BOISE_WINDOW_SERVICE_SLUGS = [
  "window-cleaning-boise-id",
  "commercial-window-cleaning-boise-id",
  "high-rise-window-cleaning-boise-id",
  "residential-window-cleaning-boise-id",
  "solar-panel-cleaning-boise-id",
] as const;

export type BoiseWindowServiceSlug = (typeof BOISE_WINDOW_SERVICE_SLUGS)[number];

function baseTimeline(scopeLabel: string): TreasureValleyPressurePageConfig["timelineSteps"] {
  return [
    {
      title: "Glass audit & access plan",
      body: `We confirm pane heights, frame materials, seal condition, and whether pure-water poles or lifts fit your ${scopeLabel} safest.`,
    },
    {
      title: "Prep landscape & storefront traffic",
      body: "Drop cloths, wet-floor signage, and staggered crews keep walkways predictable—critical near Boise retail strips and tight HOA courts.",
    },
    {
      title: "Detail polish pass",
      body: "Edges, divided-lite grids, and mullions get blade discipline plus lint-safe detailing so reflections stay uniform—not zebra-striped.",
    },
    {
      title: "Final QC walkthrough",
      body: "We sight-check glass from multiple angles (sun-facing angles cheat streaks); touch-ups happen before gear packs away.",
    },
  ];
}

export const BOISE_WINDOW_SERVICE_PAGES: Record<BoiseWindowServiceSlug, TreasureValleyPressurePageConfig> = {
  "window-cleaning-boise-id": {
    routeParam: "window-cleaning-boise-id",
    slug: "window-cleaning-boise-id",
    metaTitle: "Window Cleaning Boise | Fast, Hassle-Free Quotes | Zen Day Spa",
    metaDescription:
      "Professional window cleaning in Boise—interior and exterior glass, tracks, screens, and hard-water spotting lifted safely. Insured crews. Call (208) 979-0002.",
    cityName: "Boise",
    heroTitle: "Window Cleaning Boise ID",
    heroSubtitle:
      "Crystal views without chalky halos—Boise pollen, irrigation minerals, and wildfire film rinsed off glass using ladder-safe setups and streak-conscious chemistry.",
    heroImageSrc: IMG.luxuryWindows,
    heroImageAlt: "Residential exterior window cleaning — Boise, Idaho",
    heroContactFormId: "window-boise-hero-form",
    heroFormName: "Window cleaning Boise hero",
    bottomContactSectionId: "window-boise-contact",
    bottomContactFormId: "window-boise-page-form",
    bottomContactHeading: "Get Window Cleaning in Boise",
    bottomContactSubtext:
      "Tell us pane counts, height quirks, and whether screens/tracks should bundle—we quote realistic crew-hours instead of mystery flats.",
    bottomFormName: "Window cleaning Boise contact",
    shareTitle: "Window Cleaning Boise, Idaho | Zen Day Spa",
    sidebarPanelId: "window-boise-other-services",
    mapIframeTitle: BOISE_MAP.iframeTitle,
    mapEmbedSrc: BOISE_MAP.embedSrc,
    faqHeading: "Common Questions About Window Cleaning in Boise",
    faqIntro: "Cadence, what’s included, and how we tackle Boise mineral spotting safely.",
    faqIdPrefix: "window-boise-faq",
    faqItems: [
      {
        question: "How often should I schedule professional window cleaning in Boise?",
        answer:
          "Many homes and offices stay brightest on a 3–6 month rhythm; heavy pollen springs or sprinkler-heavy lots may lean quarterly until buildup slows.",
      },
      {
        question: "Do you clean residential and commercial glass?",
        answer:
          "Yes—cottages to multi-story entries—we scale ladders, lifts, or pure-water poles to each façade.",
      },
      {
        question: "What’s included in a standard window cleaning visit?",
        answer:
          "Interior/exterior glass (per scope), squeegee polish, frames wiped down where reachable, and add-ons like screens or tracks when requested.",
      },
      {
        question: "Can you remove Boise hard-water staining?",
        answer:
          "Light mineral edging often lifts with glass-safe acids or polishing compounds; deep etching may lighten but not always erase—we preview realistic outcomes.",
      },
      {
        question: "Are tall or awkward windows safe for your team?",
        answer:
          "We use OSHA-minded setups—proper ladders, tie-offs when needed, lift coordination for mid-rise work—never improvised stools or risky reaches.",
      },
    ],
    timelineHeading: "Your Boise Window Cleaning Timeline",
    timelineIntro:
      "Designed around pollen calendars and storefront foot traffic—fewer callbacks, cleaner reflections.",
    timelineSteps: baseTimeline("Boise window cleaning"),
  },
  "commercial-window-cleaning-boise-id": {
    routeParam: "commercial-window-cleaning-boise-id",
    slug: "commercial-window-cleaning-boise-id",
    metaTitle: "Commercial Window Cleaning Boise | 24/7 Availability | Zen Day Spa",
    metaDescription:
      "Commercial window cleaning in Boise—retail glass, office parks, medical entries, and multi-story façades with eco-conscious products. Call (208) 979-0002.",
    cityName: "Boise",
    heroTitle: "Commercial Window Cleaning Boise ID",
    heroSubtitle:
      "Brand-ready reflections for entrances shoppers photograph—scheduled around openings, deliveries, and Boise wind gusts that love smearing half-dried panes.",
    heroImageSrc: IMG.commercialLift,
    heroImageAlt: "Commercial lift window cleaning — Boise, Idaho",
    heroContactFormId: "commercial-window-boise-hero-form",
    heroFormName: "Commercial window cleaning Boise hero",
    bottomContactSectionId: "commercial-window-boise-contact",
    bottomContactFormId: "commercial-window-boise-page-form",
    bottomContactHeading: "Get Commercial Window Cleaning in Boise",
    bottomContactSubtext:
      "Share tenant foot-traffic peaks, dock schedules, and façade square footage—we’ll propose cadence that keeps glass camera-ready.",
    bottomFormName: "Commercial window cleaning Boise contact",
    shareTitle: "Commercial Window Cleaning Boise, Idaho | Zen Day Spa",
    sidebarPanelId: "commercial-window-boise-other-services",
    mapIframeTitle: BOISE_MAP.iframeTitle,
    mapEmbedSrc: BOISE_MAP.embedSrc,
    faqHeading: "Commercial Window Cleaning FAQs — Boise",
    faqIntro: "Frequency for retail versus office, lift logistics, and pairing with exterior washing.",
    faqIdPrefix: "commercial-window-boise-faq",
    faqItems: [
      {
        question: "How often should Boise businesses schedule commercial window cleaning?",
        answer:
          "High-traffic storefronts often choose 4–6 week rhythms; lower-touch office parks may stretch to quarterly while still looking intentional.",
      },
      {
        question: "Can you service multi-story buildings?",
        answer:
          "Yes—boom lifts, staged poles, and rope-descent plans are matched to anchor points and property manager approvals.",
      },
      {
        question: "Are cleaning solutions safe for seals and tinted films?",
        answer:
          "We stick with biodegradable glass surfactants tested against typical aluminum caps and factory tint stacks—flag specialty coatings beforehand.",
      },
      {
        question: "Do you handle large retail spans or office campuses?",
        answer:
          "Crew scaling is part of the proposal—multiple belts and staggered zones keep wet glass away from peak arrivals.",
      },
      {
        question: "What pairs well with commercial glass programs?",
        answer:
          "Many portfolios add pressure washing, solar rinses, or gutter clears so façades read cohesive between quarterly visits.",
      },
    ],
    timelineHeading: "Your Boise Commercial Glass Timeline",
    timelineIntro: "Operations-aware sequencing—clean crews, marked cones, predictable drying zones.",
    timelineSteps: baseTimeline("commercial window cleaning"),
  },
  "high-rise-window-cleaning-boise-id": {
    routeParam: "high-rise-window-cleaning-boise-id",
    slug: "high-rise-window-cleaning-boise-id",
    metaTitle: "High Rise Window Cleaning Boise | 24/7 Availability | Zen Day Spa",
    metaDescription:
      "High-rise window cleaning in Boise—rope descent and lift programs for multi-story glass façades with documented safety planning. Call (208) 979-0002.",
    cityName: "Boise",
    heroTitle: "High-Rise Window Cleaning Boise ID",
    heroSubtitle:
      "Sunbelt glare and foothill dust settle fast on curtainwall—methodical descents and controlled detergents restore clarity without risking plaza pedestrians below.",
    heroImageSrc: IMG.highRiseLift,
    heroImageAlt: "High-rise exterior window cleaning from lift — Boise, Idaho",
    heroContactFormId: "highrise-window-boise-hero-form",
    heroFormName: "High-rise window cleaning Boise hero",
    bottomContactSectionId: "highrise-window-boise-contact",
    bottomContactFormId: "highrise-window-boise-page-form",
    bottomContactHeading: "Get High-Rise Window Cleaning in Boise",
    bottomContactSubtext:
      "Send elevation drawings or photos, roof anchor notes, and plaza-hour restrictions—we script lifts or rope stages accordingly.",
    bottomFormName: "High-rise window cleaning Boise contact",
    shareTitle: "High-Rise Window Cleaning Boise, Idaho | Zen Day Spa",
    sidebarPanelId: "highrise-window-boise-other-services",
    mapIframeTitle: BOISE_MAP.iframeTitle,
    mapEmbedSrc: BOISE_MAP.embedSrc,
    faqHeading: "High-Rise Window Cleaning FAQs — Boise",
    faqIntro: "Cadence, weather holds, access constraints, and eco rinses at altitude.",
    faqIdPrefix: "highrise-window-boise-faq",
    faqItems: [
      {
        question: "How often should high-rise glass be cleaned in Boise?",
        answer:
          "Windward exposures often demand 8–12 week cycles; sheltered elevations may extend toward quarterly depending on dust load and brand standards.",
      },
      {
        question: "What safety protocols do you follow?",
        answer:
          "Harnesses, descent backups, roof oversight, and exclusion zones under rope paths—work halts when gusts exceed documented thresholds.",
      },
      {
        question: "Are products eco-friendly at height?",
        answer:
          "Biodegradable concentrates capture soils without hazing coatings; rinse volumes respect plaza drains when properties require it.",
      },
      {
        question: "What if roof anchors are limited?",
        answer:
          "We engineer alternate stages—portable davits, boom reaches, or phased swing stages—documented before techs load ropes.",
      },
      {
        question: "How does Boise weather affect scheduling?",
        answer:
          "Ice films, valley inversions, and sudden gusts can pause exterior passes—we communicate bumps early so property teams can notify tenants.",
      },
    ],
    timelineHeading: "Your Boise High-Rise Glass Timeline",
    timelineIntro: "Engineering-first mindset—anchor verification before anyone swings glass.",
    timelineSteps: baseTimeline("high-rise window cleaning"),
  },
  "residential-window-cleaning-boise-id": {
    routeParam: "residential-window-cleaning-boise-id",
    slug: "residential-window-cleaning-boise-id",
    metaTitle: "Residential Window Cleaning Boise ID | 24/7 Local Service | Zen Day Spa",
    metaDescription:
      "Residential window cleaning in Boise—interior/exterior glass, vaulted panes, screens, and mineral spotting with gentle, eco-safe methods. Call (208) 979-0002.",
    cityName: "Boise",
    heroTitle: "Residential Window Cleaning Boise ID",
    heroSubtitle:
      "More daylight indoors without chalky edges—Boise tree pollen, construction dust, and sprinkler arcs wiped down from frames inward.",
    heroImageSrc: IMG.interiorVaulted,
    heroImageAlt: "Interior vaulted glass cleaning with ladder — Boise residential windows",
    heroContactFormId: "residential-window-boise-hero-form",
    heroFormName: "Residential window cleaning Boise hero",
    bottomContactSectionId: "residential-window-boise-contact",
    bottomContactFormId: "residential-window-boise-page-form",
    bottomContactHeading: "Get Residential Window Cleaning in Boise",
    bottomContactSubtext:
      "Tell us about divided lights, casements that crank inward, or dogs who patrol sunny spots—we choreograph ladders politely.",
    bottomFormName: "Residential window cleaning Boise contact",
    shareTitle: "Residential Window Cleaning Boise, Idaho | Zen Day Spa",
    sidebarPanelId: "residential-window-boise-other-services",
    mapIframeTitle: BOISE_MAP.iframeTitle,
    mapEmbedSrc: BOISE_MAP.embedSrc,
    faqHeading: "Residential Window Cleaning FAQs — Boise",
    faqIntro: "Inside/outside scopes, tricky heights, and why pros beat hose-offs.",
    faqIdPrefix: "residential-window-boise-faq",
    faqItems: [
      {
        question: "How often should Boise homeowners schedule residential window cleaning?",
        answer:
          "Twice yearly spring/fall passes suit many homes; construction-adjacent lots or dense canopy may prefer quarterly clarity boosts.",
      },
      {
        question: "Do you clean interior and exterior glass?",
        answer:
          "Yes—scope both sides when you want maximum brightness; we pad floors and respect shoe-off preferences indoors.",
      },
      {
        question: "Is cleaning safe for coatings and historic trim?",
        answer:
          "We avoid razor aggression on unknown coatings; delicate trim gets brush detailing instead of soaking cascades indoors.",
      },
      {
        question: "Can second-story glass be reached safely?",
        answer:
          "Water-fed poles and ladder setups with proper angle-offs reach most residential elevations without leaning gimmicks.",
      },
      {
        question: "Why hire professionals instead of DIY spray bottles?",
        answer:
          "Mineral films and pollen glue release faster with proper tools—without silicone streaks or scratched IG seals from cheap blades.",
      },
    ],
    timelineHeading: "Your Boise Residential Glass Timeline",
    timelineIntro: "Respectful of rugs, pets, and HOA sightlines—quiet ladders, crisp blades.",
    timelineSteps: baseTimeline("residential window cleaning"),
  },
  "solar-panel-cleaning-boise-id": {
    routeParam: "solar-panel-cleaning-boise-id",
    slug: "solar-panel-cleaning-boise-id",
    metaTitle: "Solar Panel Cleaning Boise ID | 24/7 Service, 5.0 Star Rated | Zen Day Spa",
    metaDescription:
      "Solar panel cleaning in Boise—pollen, dust, smoke residue, and bird mess rinsed without voiding warranties. Fast local scheduling. Call (208) 979-0002.",
    cityName: "Boise",
    heroTitle: "Solar Panel Cleaning Boise ID",
    heroSubtitle:
      "Restore lost kilowatts after Bench pollen waves or smoke weeks—low-pressure rinses, manufacturer-aware brushes, and rinse paths that protect roof boots.",
    heroImageSrc: IMG.hillsideRoof,
    heroImageAlt: "Residential rooftop exterior cleaning — solar panel maintenance context in Boise",
    heroContactFormId: "solar-panel-boise-hero-form",
    heroFormName: "Solar panel cleaning Boise hero",
    bottomContactSectionId: "solar-panel-boise-contact",
    bottomContactFormId: "solar-panel-boise-page-form",
    bottomContactHeading: "Get Solar Panel Cleaning in Boise",
    bottomContactSubtext:
      "Share array size, pitch, and known shading debris—we’ll advise rinse-only versus light surfactant passes per installer guidance.",
    bottomFormName: "Solar panel cleaning Boise contact",
    shareTitle: "Solar Panel Cleaning Boise, Idaho | Zen Day Spa",
    sidebarPanelId: "solar-panel-boise-other-services",
    mapIframeTitle: BOISE_MAP.iframeTitle,
    mapEmbedSrc: BOISE_MAP.embedSrc,
    faqHeading: "Solar Panel Cleaning FAQs — Boise",
    faqIntro: "Frequency, emergency washes after smoke, travel transparency, and output expectations.",
    faqIdPrefix: "solar-panel-boise-faq",
    faqItems: [
      {
        question: "How often should solar panels be cleaned in Boise?",
        answer:
          "Most residential arrays benefit from one to two professional rinses yearly; farms, construction zones, or heavy pollen pockets may need an extra mid-season pass.",
      },
      {
        question: "Do you offer emergency cleaning after smoke or windstorms?",
        answer:
          "Yes—ash films and debris loads block unevenly; fast rinses help normalize production once roofs are safe to access.",
      },
      {
        question: "Is there a travel fee outside Boise?",
        answer:
          "Nearby Treasure Valley routes typically ride standard pricing—confirm during quoting so dispatch stays transparent.",
      },
      {
        question: "Will cleaning improve energy production?",
        answer:
          "Removing opaque soils restores irradiance; gains vary with buildup severity—arrays caked in pollen often show the clearest bounce.",
      },
      {
        question: "How long does cleaning take?",
        answer:
          "Many homes finish within one to two hours depending on pitch, rail layouts, and how baked-on the grime became.",
      },
    ],
    timelineHeading: "Your Boise Solar Panel Cleaning Timeline",
    timelineIntro: "Safety-first roof protocols—arrays rinsed without chewing rail coatings.",
    timelineSteps: [
      {
        title: "Array inspection & shutoff reminders",
        body: "We verify footing, conduit guards, and whether homeowner prefers dawn temps for cooler glass before hoses engage.",
      },
      {
        title: "Dry debris removal",
        body: "Loose needles or mulch blows off first so grit doesn’t scratch modules during the wash pass.",
      },
      {
        title: "Low-impact wash & rinse",
        body: "Soft brushes or wide fans lift pollen and ash films without forcing water under junction boxes—rinse paths aim downslope.",
      },
      {
        title: "Production sanity check guidance",
        body: "We encourage monitoring inverter trends post-service so you can correlate cleanliness with kilowatt curves.",
      },
    ],
  },
};

export function getBoiseWindowServicePageConfig(slug: string): TreasureValleyPressurePageConfig | null {
  return BOISE_WINDOW_SERVICE_PAGES[slug as BoiseWindowServiceSlug] ?? null;
}

export function isBoiseWindowServiceSlug(slug: string): slug is BoiseWindowServiceSlug {
  return (BOISE_WINDOW_SERVICE_SLUGS as readonly string[]).includes(slug);
}
