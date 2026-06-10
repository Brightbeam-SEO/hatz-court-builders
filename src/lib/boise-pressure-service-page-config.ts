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
  sidingSoft: zenPick("Cozy Massage Room"),
  house: zenPick("Private Spa Room"),
  hillside: zenPick("Peaceful Massage Room Setup"),
  commercial: zenPick("Massage Group Photo"),
  gasStation: zenPick("Spa Treatment Beds"),
  driveway: zenPick("Our Body Massage Process"),
  sidewalk: zenPick("Red Rose On Spa Bed"),
  rinse: zenPick("Relaxing Massage Room Interior"),
} as const;

export const BOISE_PRESSURE_SERVICE_SLUGS = [
  "soft-washing-in-boise-id",
  "house-pressure-washing-boise-id",
  "commercial-pressure-washing-boise-id",
  "patio-pressure-washing-company-in-boise-id",
  "driveway-pressure-washing-boise-id",
  "graffiti-removal-boise-id",
  "heavy-equipment-fleet-pressure-washing",
] as const;

export type BoisePressureServiceSlug = (typeof BOISE_PRESSURE_SERVICE_SLUGS)[number];

function baseTimeline(serviceLabel: string): TreasureValleyPressurePageConfig["timelineSteps"] {
  return [
    {
      title: "Scope & surface read",
      body: `We confirm material types, drainage, and HOA or storefront constraints before detergents or pressure touch your ${serviceLabel} job.`,
    },
    {
      title: "Prep & protection",
      body: "Landscaping, vehicles, storefront glass, and neighboring walks get masked or rinsed first—especially on windy Bench afternoons.",
    },
    {
      title: "Clean & detail",
      body: "Surface-matched tips, dwell-controlled chemistry, and disciplined rinse paths so finishes read even—not striped or etched.",
    },
    {
      title: "Walkthrough",
      body: "Final spot check on shade lines and high-traffic edges; photo pass available when managers or landlords want documentation.",
    },
  ];
}

export const BOISE_PRESSURE_SERVICE_PAGES: Record<BoisePressureServiceSlug, TreasureValleyPressurePageConfig> = {
  "soft-washing-in-boise-id": {
    routeParam: "soft-washing-in-boise-id",
    slug: "soft-washing-in-boise-id",
    metaTitle: "Soft Washing in Boise | 100% Satisfaction Guaranteed | Sol",
    metaDescription:
      "Safe, low-pressure soft washing in Boise for siding, roofs, and delicate exteriors—eco-conscious detergents and insured crews. Call (208) 927-3160 for a free estimate.",
    cityName: "Boise",
    heroTitle: "Soft Washing in Boise ID",
    heroSubtitle:
      "Lift mildew and pollen film without trading curb appeal for siding damage—gentle chemistry, controlled rinses, and HOA-ready finishes across Ada County.",
    heroImageSrc: IMG.hillside,
    heroImageAlt: "Soft washing on a Boise-area home exterior — gentle low-pressure cleaning",
    heroContactFormId: "soft-wash-boise-hero-form",
    heroFormName: "Soft washing Boise hero",
    bottomContactSectionId: "soft-wash-boise-contact",
    bottomContactFormId: "soft-wash-boise-page-form",
    bottomContactHeading: "Get Soft Washing in Boise",
    bottomContactSubtext:
      "Tell us about north-wall algae, stucco chalking, or shaded roof lines—we’ll recommend dwell times and protect landscaping before hoses roll.",
    bottomFormName: "Soft washing Boise contact",
    shareTitle: "Soft Washing in Boise, Idaho | Zen Day Spa",
    sidebarPanelId: "soft-wash-boise-other-services",
    mapIframeTitle: BOISE_MAP.iframeTitle,
    mapEmbedSrc: BOISE_MAP.embedSrc,
    faqHeading: "Everything to Know About Soft Washing in Boise",
    faqIntro: "Straight answers on chemistry, frequency, and what stays gentle on Boise exteriors.",
    faqIdPrefix: "soft-wash-boise-faq",
    faqItems: [
      {
        question: "What’s the difference between soft washing and pressure washing?",
        answer:
          "Soft washing leans on detergents and low-pressure rinse paths to lift organic film; pressure washing uses higher mechanical energy on durable flatwork. We pick the approach that matches each substrate.",
      },
      {
        question: "Is soft washing safe for my home’s exterior?",
        answer:
          "Yes when crews dial pressure, pre-wet plants, and choose surfactants suited to paint, vinyl, or coated masonry. Delicate areas get test passes before full passes.",
      },
      {
        question: "How often should I schedule soft washing in Boise?",
        answer:
          "Many Boise homes benefit every 12–18 months; tree-heavy lots or irrigation-heavy corners may want a spring algae pass plus a lighter fall rinse.",
      },
      {
        question: "Can you clean roofs and solar panels with soft washing?",
        answer:
          "Often yes—granular roofs and panel glass need conservative pressure, controlled dwell, and rinse discipline so coatings stay intact.",
      },
      {
        question: "Why choose Sol for soft washing in Boise?",
        answer:
          "Local dispatch, transparent scopes, and crews trained on Treasure Valley dust and pollen cycles—not one-size-fits-all blasting from out of town.",
      },
    ],
    timelineHeading: "Your Boise Soft Washing Timeline",
    timelineIntro: "Designed for siding-safe chemistry, tidy overspray control, and finishes that hold through pollen season.",
    timelineSteps: baseTimeline("soft washing"),
  },
  "house-pressure-washing-boise-id": {
    routeParam: "house-pressure-washing-boise-id",
    slug: "house-pressure-washing-boise-id",
    metaTitle: "House Pressure Washing Near You Boise | Local Experts | Sol",
    metaDescription:
      "Professional house pressure washing in Boise—siding, trim, and hard-to-reach elevations cleaned safely with insured, review-backed crews. Call (208) 927-3160.",
    cityName: "Boise",
    heroTitle: "House Pressure Washing Boise ID",
    heroSubtitle:
      "Reset curb appeal on engineered siding, older clapboard, and mixed-texture elevations—fan discipline and detergent strategy tuned to Boise wind and shade.",
    heroImageSrc: IMG.rinse,
    heroImageAlt: "High-reach house rinse during residential pressure washing in Boise, Idaho",
    heroContactFormId: "house-wash-boise-hero-form",
    heroFormName: "House washing Boise hero",
    bottomContactSectionId: "house-wash-boise-contact",
    bottomContactFormId: "house-wash-boise-page-form",
    bottomContactHeading: "Get House Pressure Washing in Boise",
    bottomContactSubtext:
      "Send elevation photos and last-wash notes—we’ll quote realistic crew hours for full wraps, gable accents, and attached garage faces.",
    bottomFormName: "House washing Boise contact",
    shareTitle: "House Pressure Washing Boise, Idaho | Zen Day Spa",
    sidebarPanelId: "house-wash-boise-other-services",
    mapIframeTitle: BOISE_MAP.iframeTitle,
    mapEmbedSrc: BOISE_MAP.embedSrc,
    faqHeading: "House Pressure Washing FAQs for Boise Homeowners",
    faqIntro: "Scheduling, safety, and how we approach multi-story Boise lots.",
    faqIdPrefix: "house-wash-boise-faq",
    faqItems: [
      {
        question: "How often should I schedule house pressure washing in Boise?",
        answer:
          "Once a year works for many homes; properties under dense canopy or along dusty arterials may prefer twice-yearly rinses to stay ahead of algae and film.",
      },
      {
        question: "Can you pressure wash siding without causing damage?",
        answer:
          "Yes—by matching pressure, fan width, and chemistry to each cladding type, pre-soaking oxidized trim, and keeping wand angles shallow along lap joints.",
      },
      {
        question: "Do you offer roof washing for Boise homes?",
        answer:
          "We handle many roof types with low-pressure methods aimed at moss and streaks—granule preservation and flashing protection stay the priority.",
      },
      {
        question: "Can you clean fences and outdoor wood structures too?",
        answer:
          "Absolutely—wood, vinyl, and composite benefit from softer passes and mildew-focused detergents so grain and coatings stay intact.",
      },
      {
        question: "What makes Sol different from other house washers near me?",
        answer:
          "Local routing, documented methods, and crews who read Boise microclimates—from Bench wind to irrigation spotting—before picking tools.",
      },
    ],
    timelineHeading: "Your Boise House Washing Timeline",
    timelineIntro: "Clear communication before ladders go up; finishes you can photograph from the street.",
    timelineSteps: baseTimeline("house washing"),
  },
  "commercial-pressure-washing-boise-id": {
    routeParam: "commercial-pressure-washing-boise-id",
    slug: "commercial-pressure-washing-boise-id",
    metaTitle: "Commercial Pressure Washing Boise | 24/7 Availability | Sol",
    metaDescription:
      "Storefronts, lots, warehouses, and fleet bays—commercial pressure washing in Boise with flexible scheduling and slip-conscious rinses. Call (208) 927-3160.",
    cityName: "Boise",
    heroTitle: "Commercial Pressure Washing Boise ID",
    heroSubtitle:
      "Keep approaches, breezeways, and loading zones tenant-safe—night-or-weekend windows, cone choreography, and oil-aware concrete passes when traffic demands it.",
    heroImageSrc: IMG.gasStation,
    heroImageAlt: "Commercial concrete and lot cleaning — pressure washing in Boise, Idaho",
    heroContactFormId: "commercial-boise-hero-form",
    heroFormName: "Commercial pressure washing Boise hero",
    bottomContactSectionId: "commercial-boise-contact",
    bottomContactFormId: "commercial-boise-page-form",
    bottomContactHeading: "Get Commercial Pressure Washing in Boise",
    bottomContactSubtext:
      "Share grease-load notes, drain expectations, and peak foot traffic—we’ll stage detergents and rinse timing around your operations.",
    bottomFormName: "Commercial pressure washing Boise contact",
    shareTitle: "Commercial Pressure Washing Boise, Idaho | Zen Day Spa",
    sidebarPanelId: "commercial-boise-other-services",
    mapIframeTitle: BOISE_MAP.iframeTitle,
    mapEmbedSrc: BOISE_MAP.embedSrc,
    faqHeading: "Commercial Pressure Washing FAQs for Boise Businesses",
    faqIntro: "Property types, frequency, and how we minimize downtime.",
    faqIdPrefix: "commercial-boise-faq",
    faqItems: [
      {
        question: "What types of commercial properties do you pressure wash?",
        answer:
          "Retail pads, medical entries, flex warehouses, apartment breezeways, and industrial approaches—each gets a written scope tied to surface and soil load.",
      },
      {
        question: "How often should a business schedule commercial washing?",
        answer:
          "Quarterly or biannual rhythms are common for high-traffic pads; lighter-use sites may stay on an annual refresh with spot treatments between.",
      },
      {
        question: "Can you clean semi trucks and large fleets in Boise?",
        answer:
          "Yes—degreasers and high-volume rinses tuned for decals, aluminum, and mud flaps, with containment-minded staging when lots are tight.",
      },
      {
        question: "Is commercial washing safe for concrete and siding?",
        answer:
          "We adjust pressure, fan tips, and dwell per substrate—powerful on oil shadows, conservative on coated EIFS or painted metal panels.",
      },
      {
        question: "Do you offer after-hours washing?",
        answer:
          "Evening and weekend slots are available when pedestrian safety or tenant comfort makes daytime rinses impractical.",
      },
    ],
    timelineHeading: "Your Boise Commercial Wash Timeline",
    timelineIntro: "Built around tenant traffic, manager sign-offs, and predictable dry windows.",
    timelineSteps: baseTimeline("commercial wash"),
  },
  "patio-pressure-washing-company-in-boise-id": {
    routeParam: "patio-pressure-washing-company-in-boise-id",
    slug: "patio-pressure-washing-company-in-boise-id",
    metaTitle: "Patio Pressure Washing Company in Boise | 24/7 Service | Sol",
    metaDescription:
      "Patio and deck pressure washing in Boise—pavers, stamped concrete, and outdoor living spaces cleaned without blowing out joint sand. Call (208) 927-3160.",
    cityName: "Boise",
    heroTitle: "Patio Pressure Washing Boise ID",
    heroSubtitle:
      "Strip pollen paste and shady algae from outdoor rooms—controlled fan work on joints, furniture-safe rinses, and crisp edges along lawn transitions.",
    heroImageSrc: IMG.sidewalk,
    heroImageAlt: "Sidewalk and patio concrete cleaning in progress — Boise patio pressure washing",
    heroContactFormId: "patio-boise-hero-form",
    heroFormName: "Patio pressure washing Boise hero",
    bottomContactSectionId: "patio-boise-contact",
    bottomContactFormId: "patio-boise-page-form",
    bottomContactHeading: "Get Patio Pressure Washing in Boise",
    bottomContactSubtext:
      "Tell us if polymeric sand is new, if heaters or kitchens sit close to spray paths, and whether pets use the space—we plan accordingly.",
    bottomFormName: "Patio pressure washing Boise contact",
    shareTitle: "Patio Pressure Washing Boise, Idaho | Zen Day Spa",
    sidebarPanelId: "patio-boise-other-services",
    mapIframeTitle: BOISE_MAP.iframeTitle,
    mapEmbedSrc: BOISE_MAP.embedSrc,
    faqHeading: "FAQs About Patio Pressure Washing in Boise",
    faqIntro: "Frequency, surface types, and why pro gear beats box-store rentals.",
    faqIdPrefix: "patio-boise-faq",
    faqItems: [
      {
        question: "How often should patios be pressure washed in Boise?",
        answer:
          "Many homeowners schedule once or twice yearly after pollen and before winter moisture locks in organic film on shaded slabs.",
      },
      {
        question: "Do you offer deck pressure washing too?",
        answer:
          "Yes—wood and composite decks get softer passes, grain-safe detergents, and rail detail work so fasteners and coatings stay protected.",
      },
      {
        question: "Is patio washing safe for pavers and stamped concrete?",
        answer:
          "We vary pressure and keep fans off mounded joints so sand beds and release textures stay intact while still lifting algae.",
      },
      {
        question: "How long does a typical patio cleaning take?",
        answer:
          "Most residential patios finish in a few hours depending on size, furniture moves, and how deep organic film has set.",
      },
      {
        question: "Why hire professionals instead of DIY?",
        answer:
          "Commercial heat and flow, edge discipline, and slip-conscious finishing beat consumer units that often etch or leave patchy rings.",
      },
    ],
    timelineHeading: "Your Boise Patio & Deck Wash Timeline",
    timelineIntro: "Outdoor living stays usable—minimal disruption, maximum contrast on concrete and railings.",
    timelineSteps: baseTimeline("patio wash"),
  },
  "driveway-pressure-washing-boise-id": {
    routeParam: "driveway-pressure-washing-boise-id",
    slug: "driveway-pressure-washing-boise-id",
    metaTitle: "Driveway Pressure Washing Boise ID | Quick Results | Sol",
    metaDescription:
      "Driveway and sidewalk pressure washing in Boise—oil-aware concrete passes, crisp expansion joints, and safer footing. Call (208) 927-3160.",
    cityName: "Boise",
    heroTitle: "Driveway Pressure Washing Boise ID",
    heroSubtitle:
      "Lift tire films, winter brine, and irrigation ghosts from concrete—stain-aware chemistry on oil shadows with tidy edging along walks and garage lips.",
    heroImageSrc: IMG.driveway,
    heroImageAlt: "Driveway and sidewalk pressure washing — Boise, Idaho",
    heroContactFormId: "driveway-boise-hero-form",
    heroFormName: "Driveway pressure washing Boise hero",
    bottomContactSectionId: "driveway-boise-contact",
    bottomContactFormId: "driveway-boise-page-form",
    bottomContactHeading: "Get Driveway Pressure Washing in Boise",
    bottomContactSubtext:
      "Send photos of rust stripes, fertilizer burns, or HOA striping rules—we’ll align fan work and dry times with your schedule.",
    bottomFormName: "Driveway pressure washing Boise contact",
    shareTitle: "Driveway Pressure Washing Boise, Idaho | Zen Day Spa",
    sidebarPanelId: "driveway-boise-other-services",
    mapIframeTitle: BOISE_MAP.iframeTitle,
    mapEmbedSrc: BOISE_MAP.embedSrc,
    faqHeading: "Common Questions About Driveway Pressure Washing in Boise",
    faqIntro: "Concrete care, stain removal, and combined walk + drive visits.",
    faqIdPrefix: "driveway-boise-faq",
    faqItems: [
      {
        question: "How often should driveways and sidewalks be washed?",
        answer:
          "Annual or twice-yearly visits keep oil and organic film from etching; corner lots facing dust may want a lighter mid-season rinse.",
      },
      {
        question: "Can pressure washing remove tough oil or rust stains?",
        answer:
          "Many stains lift with targeted pretreatment and controlled pressure; we set expectations early when a shadow has cured for years.",
      },
      {
        question: "Is driveway washing safe for concrete and pavers?",
        answer:
          "Yes—fan tips and distance protect aggregate exposure while still cutting through tire films and slip hazards.",
      },
      {
        question: "Can you clean driveway and sidewalks in one visit?",
        answer:
          "Combined passes are popular for uniform brightness from curb to porch—single mobilization, one dry window.",
      },
      {
        question: "Why choose Sol for driveway cleaning?",
        answer:
          "Local crews, documented methods, and detergents chosen for Treasure Valley soils—not generic blast-and-run service.",
      },
    ],
    timelineHeading: "Your Boise Driveway Wash Timeline",
    timelineIntro: "Oil-aware sequencing, neighbor-conscious overspray control, walkthrough-ready edges.",
    timelineSteps: baseTimeline("driveway wash"),
  },
  "graffiti-removal-boise-id": {
    routeParam: "graffiti-removal-boise-id",
    slug: "graffiti-removal-boise-id",
    metaTitle: "Graffiti Removal Boise ID | 24/7 Service, 5.0 Star Rated | Sol",
    metaDescription:
      "Fast graffiti removal in Boise for brick, stucco, concrete, and storefronts—same-day dispatch when possible. Call (208) 927-3160.",
    cityName: "Boise",
    heroTitle: "Graffiti Removal Boise ID",
    heroSubtitle:
      "Spray paint on fences, alley garages, or retail glass—photo-first triage, solvent strategy matched to porosity, and rinse control that protects neighbors.",
    heroImageSrc: IMG.commercial,
    heroImageAlt: "Commercial exterior cleaning — graffiti removal and pressure washing in Boise",
    heroContactFormId: "graffiti-boise-hero-form",
    heroFormName: "Graffiti removal Boise hero",
    bottomContactSectionId: "graffiti-boise-contact",
    bottomContactFormId: "graffiti-boise-page-form",
    bottomContactHeading: "Get Graffiti Removal in Boise",
    bottomContactSubtext:
      "Send location photos and surface type—we’ll advise dwell limits, HOA documentation, and whether same-day response is available.",
    bottomFormName: "Graffiti removal Boise contact",
    shareTitle: "Graffiti Removal Boise, Idaho | Zen Day Spa",
    sidebarPanelId: "graffiti-boise-other-services",
    mapIframeTitle: BOISE_MAP.iframeTitle,
    mapEmbedSrc: BOISE_MAP.embedSrc,
    faqHeading: "Graffiti Removal Boise Answers for Local Property Owners",
    faqIntro: "Response times, surface safety, and how to limit repeat tagging.",
    faqIdPrefix: "graffiti-boise-faq",
    faqItems: [
      {
        question: "How quickly can you handle graffiti removal in Boise?",
        answer:
          "Many calls route same day when reported early—fresh paint releases faster before porosity locks it in.",
      },
      {
        question: "Are there travel fees outside Boise?",
        answer:
          "Nearby Treasure Valley cities are typically bundled into standard routing; distant mountain routes are quoted upfront if travel applies.",
      },
      {
        question: "Will removal damage brick, concrete, or siding?",
        answer:
          "We pair solvent chemistry with conservative pressure and test patches on sensitive masonry or painted surfaces before full passes.",
      },
      {
        question: "Do businesses get ongoing programs?",
        answer:
          "Yes—rapid response agreements and recurring exterior rounds help discourage repeat tagging and keep storefronts camera-ready.",
      },
      {
        question: "What should I do right after graffiti appears?",
        answer:
          "Photograph it, avoid DIY paint-over that can ghost, and call quickly—early treatment improves complete removal odds.",
      },
    ],
    timelineHeading: "Your Boise Graffiti Response Timeline",
    timelineIntro: "Fast triage, chemistry-first lifts, and disciplined rinses on high-visibility walls.",
    timelineSteps: baseTimeline("graffiti removal"),
  },
  "heavy-equipment-fleet-pressure-washing": {
    routeParam: "heavy-equipment-fleet-pressure-washing",
    slug: "heavy-equipment-fleet-pressure-washing",
    metaTitle: "Heavy Equipment & Fleet Pressure Washing | Treasure Valley",
    metaDescription:
      "Heavy equipment and fleet washing for Treasure Valley contractors—demucking, brine and road film removal, and job-ready finishes. Call (208) 927-3160.",
    cityName: "Treasure Valley",
    heroTitle: "Heavy Equipment & Fleet Washing",
    heroSubtitle:
      "Excavators to semi fleets—cut mud, clay, and winter brine without chewing decals or slowing the next dispatch. On-site staging planned around hose runs and water supply.",
    heroImageSrc: IMG.commercial,
    heroImageAlt: "Heavy equipment and fleet pressure washing — Treasure Valley, Idaho",
    heroContactFormId: "fleet-boise-hero-form",
    heroFormName: "Fleet and heavy equipment hero",
    bottomContactSectionId: "fleet-boise-contact",
    bottomContactFormId: "fleet-boise-page-form",
    bottomContactHeading: "Get Fleet & Equipment Washing",
    bottomContactSubtext:
      "Tell us about pit access, washout expectations, and peak idle windows—we’ll crew and chemistry to match production schedules.",
    bottomFormName: "Fleet and heavy equipment contact",
    shareTitle: "Heavy Equipment & Fleet Pressure Washing | Zen Day Spa",
    sidebarPanelId: "fleet-boise-other-services",
    mapIframeTitle: BOISE_MAP.iframeTitle,
    mapEmbedSrc: BOISE_MAP.embedSrc,
    faqHeading: "Fleet & Heavy Equipment Washing FAQs",
    faqIntro: "Scheduling, water handling, and what we clean on-site.",
    faqIdPrefix: "fleet-boise-faq",
    faqItems: [
      {
        question: "Can you wash on active jobsites?",
        answer:
          "Yes—crews coordinate around trenching, traffic control, and refill logistics so production keeps moving.",
      },
      {
        question: "What about environmental and washwater expectations?",
        answer:
          "We discuss containment, berming, and disposal preferences up front so site supers know how rinses will be managed.",
      },
      {
        question: "Do you handle both rubber-tired loaders and highway semis?",
        answer:
          "Equipment mix is common—we adjust tips for chassis, undercarriage, and fifth wheels while protecting wiring looms.",
      },
      {
        question: "Can you set recurring fleet programs?",
        answer:
          "Weekly, biweekly, monthly, and on-demand plans keep corrosion-prone fleets presentable and inspection-ready.",
      },
      {
        question: "Will detergents harm decals or wrapped graphics?",
        answer:
          "We choose surfactants and dwell limits that cut road film without lifting fleet branding—spot checks on aged graphics first.",
      },
    ],
    timelineHeading: "Your Fleet & Equipment Wash Timeline",
    timelineIntro: "Mobilization, demuck passes, and final spot-free rinse discipline for rolling stock.",
    timelineSteps: baseTimeline("fleet wash"),
  },
};

export function getBoisePressureServicePageConfig(slug: string): TreasureValleyPressurePageConfig | null {
  return BOISE_PRESSURE_SERVICE_PAGES[slug as BoisePressureServiceSlug] ?? null;
}

export function isBoisePressureServiceSlug(slug: string): slug is BoisePressureServiceSlug {
  return (BOISE_PRESSURE_SERVICE_SLUGS as readonly string[]).includes(slug);
}
