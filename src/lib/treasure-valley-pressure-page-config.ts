import { gpmPick } from "@/lib/gpm-pick-gallery";
import type { PropertyManagementServiceHighlight } from "@/lib/property-management-service-highlights";

/** Shared props for Treasure Valley city landing pages (Boise template with localized copy). */

export type TreasureValleyFaqItem = {
  question: string;
  answer: string;
};

export type TreasureValleyTimelineStep = {
  title: string;
  body: string;
};

export type TreasureValleyGallerySection = {
  eyebrow: string;
  heading: string;
  subheading: string;
  images: readonly { src: string; alt: string }[];
};

export type TreasureValleyPressurePageConfig = {
  /** Dynamic segment after `pressure-washing-` (e.g. `eagle-id`). */
  routeParam: string;
  /** Full URL slug including prefix (e.g. `pressure-washing-eagle-id`). */
  slug: string;
  metaTitle: string;
  metaDescription: string;
  /** Display name for headings (“Eagle”, “Garden City”). */
  cityName: string;
  heroTitle: string;
  heroSubtitle: string;
  heroImageSrc: string;
  heroImageAlt: string;
  heroContactFormId: string;
  heroFormName: string;
  bottomContactSectionId: string;
  bottomContactFormId: string;
  bottomContactHeading: string;
  bottomContactSubtext: string;
  bottomFormName: string;
  /** `blend` = no gradient card; sits flush on page background (spa service landings). */
  bottomContactLayout?: "card" | "blend";
  articleListBulletStyle?: "sunset-check" | "crimson-check";
  timelineStepBadgeVariant?: "gradient" | "crimson";
  /** Homepage-style centered contact block below the split testimonials section. */
  splitTestimonialsAboveContact?: boolean;
  testimonialsSectionId?: string;
  testimonialsSectionHeading?: string;
  testimonialsSectionSubtext?: string;
  testimonialsSectionEyebrow?: string;
  showCenteredContactSection?: boolean;
  centeredContactSectionId?: string;
  centeredContactFormId?: string;
  shareTitle: string;
  sidebarPanelId: string;
  mapIframeTitle: string;
  mapEmbedSrc: string;
  faqHeading: string;
  faqIntro: string;
  faqItems: TreasureValleyFaqItem[];
  faqIdPrefix: string;
  /** Image highlight cards shown above the FAQ block in the article column. */
  serviceHighlightCards?: readonly PropertyManagementServiceHighlight[];
  /** Standalone masonry gallery between article and testimonials. */
  gallerySection?: TreasureValleyGallerySection;
  /** Homepage-style contact block instead of {@link CenteredContactSection}. */
  showHomeContactSection?: boolean;
  /** `rentals-listing` replaces markdown article with available-rentals cards. */
  articleLayout?: "default" | "rentals-listing";
  /** Hero CTAs: portal sign-in buttons instead of call + rental analysis. */
  heroCtaVariant?: "default" | "portal-sign-in";
  /** Skips masonry gallery below the article (rentals overview). */
  hideGallerySection?: boolean;
  timelineHeading: string;
  timelineIntro: string;
  timelineSteps: TreasureValleyTimelineStep[];
};

function mapsEmbedSrc(placeQuery: string): string {
  const q = encodeURIComponent(placeQuery);
  return `https://maps.google.com/maps?q=${q}&hl=en&z=11&output=embed`;
}

export const TREASURE_VALLEY_PRESSURE_PAGE_ORDER = [
  "eagle-id",
  "nampa-id",
  "meridian-id",
  "middleton-id",
  "caldwell-id",
  "kuna-id",
  "garden-city-id",
  "star-id",
] as const;

export type TreasureValleyPressureRouteParam = (typeof TREASURE_VALLEY_PRESSURE_PAGE_ORDER)[number];

const IMG = {
  house: gpmPick("backyard pickleball court backyard blue gray"),
  driveway: gpmPick("backyard gray basketball court installation"),
  hillside: gpmPick("multi sport outdoor backyard court"),
  siding: gpmPick("outdoor pickleball court red green surface"),
  sidewalk: gpmPick("pickleball line striping on concrete"),
  rinse: gpmPick("tennis court resurface crack repair"),
  luxury: gpmPick("indoor hardwood pickleball basketball court interior"),
  commercial: gpmPick("pickleball post tension concrete commercial court"),
} as const;

export const TREASURE_VALLEY_PRESSURE_PAGES: Record<
  TreasureValleyPressureRouteParam,
  TreasureValleyPressurePageConfig
> = {
  "eagle-id": {
    routeParam: "eagle-id",
    slug: "pressure-washing-eagle-id",
    metaTitle: "Pressure Washing Eagle ID | Free Estimate | Zen Day Spa",
    metaDescription:
      "House washing, concrete cleaning, and soft washing for Eagle homes and estates near the Boise River and foothills—insured crews and fast scheduling. Call (208) 979-0002.",
    cityName: "Eagle",
    heroTitle: "Pressure Washing Eagle ID",
    heroSubtitle:
      "Foothill dust, river-corridor pollen, and irrigation films — we reset siding, concrete, and HOA-ready curb appeal without risky one-pressure-fits-all blasting.",
    heroImageSrc: IMG.hillside,
    heroImageAlt: "Soft washing on a hillside home exterior — pressure washing service near Eagle, Idaho",
    heroContactFormId: "eagle-hero-contact-form",
    heroFormName: "Eagle landing hero",
    bottomContactSectionId: "eagle-contact",
    bottomContactFormId: "eagle-page-contact-form",
    bottomContactHeading: "Get Pressure Washing in Eagle",
    bottomContactSubtext:
      "Tell us about siding film, driveway staining, or courtyard concrete — we’ll propose soft washing or pressure washing that fits Eagle wind and shade patterns.",
    bottomFormName: "Eagle landing contact",
    shareTitle: "Pressure Washing Eagle, Idaho | Zen Day Spa",
    sidebarPanelId: "eagle-other-services-desktop",
    mapIframeTitle: "Map of Eagle, Idaho — Sol Pressure Washing service area",
    mapEmbedSrc: mapsEmbedSrc("Eagle, ID"),
    faqHeading: "FAQs About Pressure Washing in Eagle",
    faqIntro: "Straight answers for Ada County river-corridor homes — call if yours isn’t listed.",
    faqIdPrefix: "eagle-faq",
    faqItems: [
      {
        question: "How often should Eagle homes schedule exterior washing?",
        answer:
          "Most properties look best on a once- or twice-a-year rhythm; homes tucked against foothill dust or dense shade may want spring algae control plus a fall rinse before winter.",
      },
      {
        question: "Can you clean large driveways and courtyard concrete safely?",
        answer:
          "Yes — we stage wand work so joints and decorative borders stay crisp, then detail expansion strips and garage approaches where tires track films inward.",
      },
      {
        question: "Is soft washing better for stucco or painted trim near the river?",
        answer:
          "Often yes — controlled detergents lift mildew without ramming water behind flashings; we still pressure-wash durable flatwork where the surface calls for it.",
      },
      {
        question: "Do you coordinate with HOAs around Eagle?",
        answer:
          "We note timing windows, hose-route rules, and parking expectations up front so approvals stay predictable — photos help when boards want before/after proof.",
      },
      {
        question: "What happens if foothill gusts kick up mid-job?",
        answer:
          "We pause rinses, reposition barriers, and communicate delays early — finish quality matters more than rushing through gusty afternoons.",
      },
    ],
    timelineHeading: "Your Eagle Pressure Washing Timeline",
    timelineIntro:
      "Built for busy households near the river and foothills — clear scopes, tidy hose runs, walkthrough-ready finishes.",
    timelineSteps: [
      {
        title: "Consult & scope",
        body: "We confirm surfaces, gate access, parked trailers or RV pads, and whether chemical-soft washing fits shady north walls.",
      },
      {
        title: "Prep & protection",
        body: "Landscaping, outlets, and delicate finishes get rinsed or masked first — important when foothill breezes move overspray.",
      },
      {
        title: "Clean & detail",
        body: "Matched detergents and fan patterns on siding; tighter pencil work on aggregate drives and paver joints.",
      },
      {
        title: "Walkthrough",
        body: "Final rinse pass, debris tidy-up, and optional photo set for HOA boards or listing timelines.",
      },
    ],
  },
  "nampa-id": {
    routeParam: "nampa-id",
    slug: "pressure-washing-nampa-id",
    metaTitle: "Pressure Washing Nampa ID | Free Estimate | Zen Day Spa",
    metaDescription:
      "Residential and commercial washing across Nampa — storefront concrete, fleet grime, and Canyon County dust control with insured Treasure Valley crews. Call (208) 979-0002.",
    cityName: "Nampa",
    heroTitle: "Pressure Washing Nampa ID",
    heroSubtitle:
      "From agrarian dust to grocery-lot traffic films — we reset siding, parking approaches, and neighborhood concrete with schedules that respect Canyon County weather swings.",
    heroImageSrc: IMG.commercial,
    heroImageAlt: "Commercial concrete cleaning in progress — pressure washing crew serving Nampa, Idaho",
    heroContactFormId: "nampa-hero-contact-form",
    heroFormName: "Nampa landing hero",
    bottomContactSectionId: "nampa-contact",
    bottomContactFormId: "nampa-page-contact-form",
    bottomContactHeading: "Get Pressure Washing in Nampa",
    bottomContactSubtext:
      "Share photos of oil shadows, breezeway algae, or warehouse bays — we’ll quote realistic turnaround before trucks roll.",
    bottomFormName: "Nampa landing contact",
    shareTitle: "Pressure Washing Nampa, Idaho | Zen Day Spa",
    sidebarPanelId: "nampa-other-services-desktop",
    mapIframeTitle: "Map of Nampa, Idaho — Sol Pressure Washing service area",
    mapEmbedSrc: mapsEmbedSrc("Nampa, ID"),
    faqHeading: "FAQs About Pressure Washing in Nampa",
    faqIntro: "Canyon County jobs move smoother when expectations are clear — ask anything else by phone.",
    faqIdPrefix: "nampa-faq",
    faqItems: [
      {
        question: "Do you handle busy retail pads and safety-conscious storefront rinses?",
        answer:
          "Yes — we coordinate cone placement, night-or-early-morning windows when helpful, and edge detailing so approaches stay inviting for foot traffic.",
      },
      {
        question: "Can agricultural dust be cleaned without streaking garage doors?",
        answer:
          "We pre-rinse loose soils, then lift clingy films with detergents sized to your cladding — brute-force blasting usually causes more problems than it solves.",
      },
      {
        question: "What about irrigation-hard-water spotting on glass adjacent to washes?",
        answer:
          "Flag sensitive glazing — we can bundle controlled rinses or recommend pure-water finishes where spotting history shows up after every storm.",
      },
      {
        question: "Is fleet washing available for Canyon County contractors?",
        answer:
          "Road film and winter brine compound quickly — we stage bay-style rinses when space allows and document trouble spots on mud flaps and tanks.",
      },
      {
        question: "How quickly can you quote multi-building HOAs?",
        answer:
          "Send gate rules and rough square footage; we’ll route a scoped proposal instead of ballpark numbers that change on-site.",
      },
    ],
    timelineHeading: "Your Nampa Pressure Washing Timeline",
    timelineIntro:
      "Commercial urgency meets residential detail — everyone sees the same disciplined rinse-and-walkthrough cadence.",
    timelineSteps: [
      {
        title: "Consult & scope",
        body: "We separate pedestrian zones from wash lanes, confirm drain sensitivities, and pick detergents for Canyon County dust mixes.",
      },
      {
        title: "Prep & protection",
        body: "Vegetation buffers, storefront signage, and merchandise doors get shielded before detergents hit masonry or EIFS.",
      },
      {
        title: "Clean & detail",
        body: "Oil-aware concrete passes, breezeway algae control, and crisp edging along curbs that shoppers cross daily.",
      },
      {
        title: "Walkthrough",
        body: "Managers sign off on slip-test zones; homeowners get photo-ready finishes on siding and drives.",
      },
    ],
  },
  "meridian-id": {
    routeParam: "meridian-id",
    slug: "pressure-washing-meridian-id",
    metaTitle: "Pressure Washing Meridian ID | Free Estimate | Zen Day Spa",
    metaDescription:
      "Fast-growing Meridian neighborhoods deserve siding-safe washing and crisp concrete — soft washing, driveway detailing, and HOA-friendly crews. Call (208) 979-0002.",
    cityName: "Meridian",
    heroTitle: "Pressure Washing Meridian ID",
    heroSubtitle:
      "Newer builds, tighter lots, and endless parade-of-homes expectations — we lift pollen films and driveway stripes without trashing delicate trim packages.",
    heroImageSrc: IMG.siding,
    heroImageAlt: "Exterior siding soft wash — residential cleaning in Meridian, Idaho",
    heroContactFormId: "meridian-hero-contact-form",
    heroFormName: "Meridian landing hero",
    bottomContactSectionId: "meridian-contact",
    bottomContactFormId: "meridian-page-contact-form",
    bottomContactHeading: "Get Pressure Washing in Meridian",
    bottomContactSubtext:
      "Whether you’re resetting concrete before hosting or refreshing siding for an appraisal, we’ll match chemistry and pressure to today’s engineered materials.",
    bottomFormName: "Meridian landing contact",
    shareTitle: "Pressure Washing Meridian, Idaho | Zen Day Spa",
    sidebarPanelId: "meridian-other-services-desktop",
    mapIframeTitle: "Map of Meridian, Idaho — Sol Pressure Washing service area",
    mapEmbedSrc: mapsEmbedSrc("Meridian, ID"),
    faqHeading: "FAQs About Pressure Washing in Meridian",
    faqIntro: "Neighborhood standards climb fast here — we stay transparent on methods and dry times.",
    faqIdPrefix: "meridian-faq",
    faqItems: [
      {
        question: "Are newer siding profiles safe for pressure washing?",
        answer:
          "Yes when crews dial fan angles and detergents — many Meridian elevations respond better to soft washing first, then targeted rinses on hardy trim.",
      },
      {
        question: "Can you work around narrow side yards and RV pads?",
        answer:
          "We map hose routes and protection before detergents flow — tight setbacks just mean more communication, not corner-cutting.",
      },
      {
        question: "Do you clean community fences for HOAs?",
        answer:
          "Coordinated days keep disruption predictable — we section washes so pets, sprinklers, and mail carriers stay unaffected.",
      },
      {
        question: "How do you handle stubborn sprinkler overspray stains?",
        answer:
          "We identify mineral buildup versus organic film, then choose brushes or detergents that lift it without etching decorative concrete.",
      },
      {
        question: "What’s the difference between your house wash and driveway day?",
        answer:
          "House washes prioritize gentle chemistry up high; driveway visits emphasize fan tips, oil-aware passes, and edge detailing along walks.",
      },
    ],
    timelineHeading: "Your Meridian Pressure Washing Timeline",
    timelineIntro:
      "Designed for packed calendars — scoped arrivals, tidy exits, photo-ready finishes before guests arrive.",
    timelineSteps: [
      {
        title: "Consult & scope",
        body: "We confirm HOA packets, corner-lot exposure, and whether bundled window or gutter help makes sense.",
      },
      {
        title: "Prep & protection",
        body: "Screens, lights, and backyard kitchens get shielded — newer communities often pack delicate accents tight against siding.",
      },
      {
        title: "Clean & detail",
        body: "Controlled soft wash elevations; driveway sessions emphasize stripe removal and expansion-joint debris clearing.",
      },
      {
        title: "Walkthrough",
        body: "Spot-check shady pockets where algae sneaks back fastest — we’d rather touch up now than hear about it later.",
      },
    ],
  },
  "middleton-id": {
    routeParam: "middleton-id",
    slug: "pressure-washing-middleton-id",
    metaTitle: "Pressure Washing Middleton ID | Free Estimate | Zen Day Spa",
    metaDescription:
      "Small-town routes and agricultural-adjacent dust — house washing, barn pads, and farmhouse concrete detailing throughout Middleton. Call (208) 979-0002.",
    cityName: "Middleton",
    heroTitle: "Pressure Washing Middleton ID",
    heroSubtitle:
      "County-road dust, hobby-farm mud tracks, and sprinkler-hard-water haze — we reset curb appeal for cottages and acreage-style lots alike.",
    heroImageSrc: IMG.driveway,
    heroImageAlt: "Driveway and sidewalk pressure washing — Middleton, Idaho residential service",
    heroContactFormId: "middleton-hero-contact-form",
    heroFormName: "Middleton landing hero",
    bottomContactSectionId: "middleton-contact",
    bottomContactFormId: "middleton-page-contact-form",
    bottomContactHeading: "Get Pressure Washing in Middleton",
    bottomContactSubtext:
      "Send gate codes, animal notes, and photos of shop floors — we’ll plan rinses that respect rural pacing and neighborhood quiet hours.",
    bottomFormName: "Middleton landing contact",
    shareTitle: "Pressure Washing Middleton, Idaho | Zen Day Spa",
    sidebarPanelId: "middleton-other-services-desktop",
    mapIframeTitle: "Map of Middleton, Idaho — Sol Pressure Washing service area",
    mapEmbedSrc: mapsEmbedSrc("Middleton, ID"),
    faqHeading: "FAQs About Pressure Washing in Middleton",
    faqIntro: "Rural edges mean dust reboots faster — here’s how we stay ahead of it.",
    faqIdPrefix: "middleton-faq",
    faqItems: [
      {
        question: "Can you wash shop floors without flooding gravel drives?",
        answer:
          "Yes — we berm runoff thoughtfully, switch to fan tips that lift oils instead of carving trenches, and stage extraction help when spills demand it.",
      },
      {
        question: "Will fertilizers or animal waste affect cleaning chemistry?",
        answer:
          "Tell us what’s nearby — we adjust detergents and rinses so runoff stays predictable around pastures and raised beds.",
      },
      {
        question: "Do you handle vinyl fences weathered by irrigation?",
        answer:
          "Soft washing lifts chalky films without fuzzing plastic; we detail posts where sprinklers spike calcium streaks.",
      },
      {
        question: "Can scheduling align with county-road dust storms?",
        answer:
          "If winds spike mid-week, we’d rather bump a day than deliver a freshly rinsed home under another brown-out.",
      },
      {
        question: "Are lengthy gravel approaches a problem for gear?",
        answer:
          "We scout turning radius and water supply up front — longer pulls just mean earlier staging, not surprise fees.",
      },
    ],
    timelineHeading: "Your Middleton Pressure Washing Timeline",
    timelineIntro:
      "Straightforward scopes for spread-out lots — fewer surprises, cleaner hose etiquette.",
    timelineSteps: [
      {
        title: "Consult & scope",
        body: "We log well-house access, animal zones, equipment sheds, and whether dusty county roads affect rinse timing.",
      },
      {
        title: "Prep & protection",
        body: "Hay hooks, low wires, and decorative fencing get flagged — agricultural parcels hide obstacles suburban templates miss.",
      },
      {
        title: "Clean & detail",
        body: "Driveway oil passes alternate with siding soft washes so airborne grit doesn’t reset finishes mid-job.",
      },
      {
        title: "Walkthrough",
        body: "Owners verify shop bays and courtyard pavers — we photograph trouble spots for seasonal comparisons.",
      },
    ],
  },
  "caldwell-id": {
    routeParam: "caldwell-id",
    slug: "pressure-washing-caldwell-id",
    metaTitle: "Pressure Washing Caldwell ID | Free Estimate | Zen Day Spa",
    metaDescription:
      "Industrial-road films, alley approaches, and ranch-property resets — soft washing and concrete detailing across Caldwell & Canyon County. Call (208) 979-0002.",
    cityName: "Caldwell",
    heroTitle: "Pressure Washing Caldwell ID",
    heroSubtitle:
      "Blend agrarian grit with Main Street curb appeal — we lift brake dust, alley grime, and sprinkler stains without trading speed for surface damage.",
    heroImageSrc: IMG.sidewalk,
    heroImageAlt: "Sidewalk concrete cleaning in progress — pressure washing near Caldwell, Idaho",
    heroContactFormId: "caldwell-hero-contact-form",
    heroFormName: "Caldwell landing hero",
    bottomContactSectionId: "caldwell-contact",
    bottomContactFormId: "caldwell-page-contact-form",
    bottomContactHeading: "Get Pressure Washing in Caldwell",
    bottomContactSubtext:
      "Industrial tenants and ranch gates welcome — share square footage, surface types, and preferred rinse windows.",
    bottomFormName: "Caldwell landing contact",
    shareTitle: "Pressure Washing Caldwell, Idaho | Zen Day Spa",
    sidebarPanelId: "caldwell-other-services-desktop",
    mapIframeTitle: "Map of Caldwell, Idaho — Sol Pressure Washing service area",
    mapEmbedSrc: mapsEmbedSrc("Caldwell, ID"),
    faqHeading: "FAQs About Pressure Washing in Caldwell",
    faqIntro: "Canyon County diversity keeps us adaptable — here’s what property owners ask first.",
    faqIdPrefix: "caldwell-faq",
    faqItems: [
      {
        question: "Can you degrease dumpster pads near restaurants?",
        answer:
          "Yes — we pretreat organic buildup, adjust detergents for grease chemistry, and rinse toward approved drains or vacuum assist when required.",
      },
      {
        question: "Will irrigation-heavy lawns stain freshly washed concrete?",
        answer:
          "We discuss sprinkler timers beforehand — sometimes shifting a cycle beats chasing fresh mineral spots the next morning.",
      },
      {
        question: "Do you soft wash older wood siding common on rural roads?",
        answer:
          "Low-pressure detergents lift mildew without splintering fiber — we avoid aggressive tips unless the substrate proves hardy.",
      },
      {
        question: "Are weekend washes possible for retail strips?",
        answer:
          "When codes allow, yes — early Saturdays beat midday heat for detergents that need dwell time without flashing dry.",
      },
      {
        question: "How do you price multi-acre drives?",
        answer:
          "We measure workable footage, note turnaround constraints, and bundle gate-to-house segments so proposals stay apples-to-apples.",
      },
    ],
    timelineHeading: "Your Caldwell Pressure Washing Timeline",
    timelineIntro:
      "Industrial grit or farmhouse charm — same disciplined communication before hoses uncurl.",
    timelineSteps: [
      {
        title: "Consult & scope",
        body: "We separate tenant zones, confirm alley access, and flag hydraulic leaks that change detergent picks.",
      },
      {
        title: "Prep & protection",
        body: "Parked trailers, merchandise cages, and propane cages get cordoned — busy corridors need choreography.",
      },
      {
        title: "Clean & detail",
        body: "Oil-gradient concrete work pairs with siding rinses timed around wind shifts off open farmland.",
      },
      {
        title: "Walkthrough",
        body: "Owners inspect shaded retaining walls where algae hides longest — touch-ups happen before wrap.",
      },
    ],
  },
  "kuna-id": {
    routeParam: "kuna-id",
    slug: "pressure-washing-kuna-id",
    metaTitle: "Pressure Washing Kuna ID | Free Estimate | Zen Day Spa",
    metaDescription:
      "South Valley growth meets desert breezes — driveway detailing, siding-safe washing, and athletic-complex concrete around Kuna. Call (208) 979-0002.",
    cityName: "Kuna",
    heroTitle: "Pressure Washing Kuna ID",
    heroSubtitle:
      "Open-country winds and new subdivisions share the same headache: fine dust that clings to siding and stripes decorative concrete — we reset both.",
    heroImageSrc: IMG.rinse,
    heroImageAlt: "High-reach house rinse — exterior pressure washing serving Kuna, Idaho",
    heroContactFormId: "kuna-hero-contact-form",
    heroFormName: "Kuna landing hero",
    bottomContactSectionId: "kuna-contact",
    bottomContactFormId: "kuna-page-contact-form",
    bottomContactHeading: "Get Pressure Washing in Kuna",
    bottomContactSubtext:
      "From Falcon-inspired arterials to acreage lanes, we quote realistic dry times and detergent picks for Ada County’s south-end grit.",
    bottomFormName: "Kuna landing contact",
    shareTitle: "Pressure Washing Kuna, Idaho | Zen Day Spa",
    sidebarPanelId: "kuna-other-services-desktop",
    mapIframeTitle: "Map of Kuna, Idaho — Sol Pressure Washing service area",
    mapEmbedSrc: mapsEmbedSrc("Kuna, ID"),
    faqHeading: "FAQs About Pressure Washing in Kuna",
    faqIntro: "South Valley weather swings fast — here’s how we keep finishes consistent.",
    faqIdPrefix: "kuna-faq",
    faqItems: [
      {
        question: "Does blowing desert dust mean more frequent driveway washes?",
        answer:
          "Often yes for exposed corner lots — we can set maintenance reminders or bundle lighter rinses between deeper stain treatments.",
      },
      {
        question: "Can you wash stucco or cultured stone common on newer builds?",
        answer:
          "Soft washing lifts films without scarring textures — pressure spikes wait for flatwork where thickness proves forgiving.",
      },
      {
        question: "Do athletic venues need slip-conscious rinses?",
        answer:
          "Absolutely — we communicate closures, post rinse protocols, and detail ADA ramps where algae creeps in shaded entries.",
      },
      {
        question: "What about homes beside active agricultural fields?",
        answer:
          "Tell us spray schedules when known — we pick rinse windows that avoid conflicting with aerial or pivot drift.",
      },
      {
        question: "Can you coordinate with schools or churches on tight timelines?",
        answer:
          "We stage early mornings or holiday breaks so sidewalks welcome visitors without hoses across peak arrivals.",
      },
    ],
    timelineHeading: "Your Kuna Pressure Washing Timeline",
    timelineIntro:
      "Built for neighborhoods that still feel rural — respectful arrivals, tidy staging, crisp wrap-ups.",
    timelineSteps: [
      {
        title: "Consult & scope",
        body: "We log athletic-field proximity, dust-fetch exposure, and bundle opportunities with fence or patio resets.",
      },
      {
        title: "Prep & protection",
        body: "Basketball pads, playground mulch, and pollinator beds get shielded before lateral sprays begin.",
      },
      {
        title: "Clean & detail",
        body: "Elevation washes alternate orientation so desert gusts don’t sandblast fresh detergent streaks.",
      },
      {
        title: "Walkthrough",
        body: "Facility managers and homeowners both sign off on slip-prone transitions — extra passes beat callbacks.",
      },
    ],
  },
  "garden-city-id": {
    routeParam: "garden-city-id",
    slug: "pressure-washing-garden-city-id",
    metaTitle: "Pressure Washing Garden City ID | Free Estimate | Zen Day Spa",
    metaDescription:
      "Boise-adjacent corridors, river recreation traffic, and tight residential lots — washing for Garden City homes & brick-and-mortar shops. Call (208) 979-0002.",
    cityName: "Garden City",
    heroTitle: "Pressure Washing Garden City ID",
    heroSubtitle:
      "Greenbelt grit, brewery districts, and eclectic cottages — we detail alley-facing garages and river-corridor storefronts with HOA-level polish.",
    heroImageSrc: IMG.luxury,
    heroImageAlt: "Luxury home exterior cleaning — soft washing and pressure washing in Garden City, Idaho",
    heroContactFormId: "garden-city-hero-contact-form",
    heroFormName: "Garden City landing hero",
    bottomContactSectionId: "garden-city-contact",
    bottomContactFormId: "garden-city-page-contact-form",
    bottomContactHeading: "Get Pressure Washing in Garden City",
    bottomContactSubtext:
      "Share creek-adjacent drainage notes or brewery loading docks — we’ll choreograph hoses around pedestrians and cyclists.",
    bottomFormName: "Garden City landing contact",
    shareTitle: "Pressure Washing Garden City, Idaho | Zen Day Spa",
    sidebarPanelId: "garden-city-other-services-desktop",
    mapIframeTitle: "Map of Garden City, Idaho — Sol Pressure Washing service area",
    mapEmbedSrc: mapsEmbedSrc("Garden City, ID"),
    faqHeading: "FAQs About Pressure Washing in Garden City",
    faqIntro: "Compact lots + recreation traffic = unique rinse puzzles — we’ve handled plenty.",
    faqIdPrefix: "garden-city-faq",
    faqItems: [
      {
        question: "Can you navigate alley-only garage access?",
        answer:
          "Yes — we scout hose pulls, note neighbor gates, and communicate parking swaps before detergents touch siding.",
      },
      {
        question: "Will river-corridor humidity worsen mildew between washes?",
        answer:
          "Shade pockets near the Greenbelt can — we document them and recommend slightly shorter maintenance intervals when needed.",
      },
      {
        question: "Are mixed-use storefronts priced differently than houses?",
        answer:
          "Often yes — pedestrian safety, night-hour premiums, and grease-load pads change chemistry and crew sizing.",
      },
      {
        question: "Can soft washing protect painted murals or signage?",
        answer:
          "We mask sensitive art, drop pressure, and test inconspicuous corners before committing to full passes.",
      },
      {
        question: "Do cyclists affect scheduling along busy corridors?",
        answer:
          "We coordinate cone placement and rinse timing so bike lanes stay predictable — communication beats surprises.",
      },
    ],
    timelineHeading: "Your Garden City Pressure Washing Timeline",
    timelineIntro:
      "Urban-adjacent finesse — tight setbacks still deserve disciplined protection and dry-window clarity.",
    timelineSteps: [
      {
        title: "Consult & scope",
        body: "We chart alley pulls, note creek drainage paths, and confirm brewery or studio loading schedules.",
      },
      {
        title: "Prep & protection",
        body: "Murals, patios, and tight fencing get barriers — tourists and locals shouldn’t detour around careless overspray.",
      },
      {
        title: "Clean & detail",
        body: "Sidewalk gum and tire films lift before vertical rinses reset cladding facing busy corridors.",
      },
      {
        title: "Walkthrough",
        body: "Owners verify alley exits and courtyard pavers — nightlife districts need slip-confidence after washing.",
      },
    ],
  },
  "star-id": {
    routeParam: "star-id",
    slug: "pressure-washing-star-id",
    metaTitle: "Pressure Washing Star ID | Free Estimate | Zen Day Spa",
    metaDescription:
      "Country-club curb appeal and semi-rural estates — driveway revivals, soft washing, and perimeter fencing resets throughout Star. Call (208) 979-0002.",
    cityName: "Star",
    heroTitle: "Pressure Washing Star ID",
    heroSubtitle:
      "Wide lots, carriage lanes, and clubhouse sightlines — we lift pollen blankets and stripe-y concrete without rushing delicate trim.",
    heroImageSrc: IMG.house,
    heroImageAlt: "Residential house washing — pressure washing service in Star, Idaho",
    heroContactFormId: "star-hero-contact-form",
    heroFormName: "Star landing hero",
    bottomContactSectionId: "star-contact",
    bottomContactFormId: "star-page-contact-form",
    bottomContactHeading: "Get Pressure Washing in Star",
    bottomContactSubtext:
      "Hosting at the club or listing an estate? Tell us your timeline — we’ll sequence elevations, flatwork, and fence lines accordingly.",
    bottomFormName: "Star landing contact",
    shareTitle: "Pressure Washing Star, Idaho | Zen Day Spa",
    sidebarPanelId: "star-other-services-desktop",
    mapIframeTitle: "Map of Star, Idaho — Sol Pressure Washing service area",
    mapEmbedSrc: mapsEmbedSrc("Star, ID"),
    faqHeading: "FAQs About Pressure Washing in Star",
    faqIntro: "Semi-rural polish still demands technical restraint — ask us anything.",
    faqIdPrefix: "star-faq",
    faqItems: [
      {
        question: "How do you protect carriage-house doors and decorative lighting?",
        answer:
          "We bag fixtures, tape vulnerable seams, and soft-wash verticals before aggressive flatwork kicks dust into the air.",
      },
      {
        question: "Can large circular drives be done in one session?",
        answer:
          "Usually — we rotate quadrants so rinse water doesn’t puddle against garage seals overnight.",
      },
      {
        question: "What about wrought iron or ornamental fencing?",
        answer:
          "Soft brushes plus detergents lift rust streaks migrating onto nearby pillars — pressure waits for concrete footings.",
      },
      {
        question: "Do clubhouse-adjacent homes need special scheduling?",
        answer:
          "When events loom, we anchor washes earlier in the week and avoid peak cart traffic windows.",
      },
      {
        question: "Is roof drip-edge mildew common here?",
        answer:
          "Shade trees plus irrigation can feed streaks — we treat fascia carefully and recommend gutter clears when overflows feed the problem.",
      },
    ],
    timelineHeading: "Your Star Pressure Washing Timeline",
    timelineIntro:
      "Estate-scale courtesy — fewer hose scars on landscaping, more clarity on finish expectations.",
    timelineSteps: [
      {
        title: "Consult & scope",
        body: "We log courtyard water features, sport courts, and guest-house exposures before picking detergents.",
      },
      {
        title: "Prep & protection",
        body: "Feature lighting, climbing roses, and audio wiring tucked along fascia get shielded first.",
      },
      {
        title: "Clean & detail",
        body: "Circular drives receive quadrant rinses; siding passes hug shady elevations where mildew stubbornly returns.",
      },
      {
        title: "Walkthrough",
        body: "Marketing-ready photo sets optional — listing agents appreciate crisp comparisons without filter tricks.",
      },
    ],
  },
};

export function getTreasureValleyPressurePageConfig(
  routeParam: string,
): TreasureValleyPressurePageConfig | null {
  return TREASURE_VALLEY_PRESSURE_PAGES[routeParam as TreasureValleyPressureRouteParam] ?? null;
}

export function treasureValleyPressureStaticParams(): { city: string }[] {
  return TREASURE_VALLEY_PRESSURE_PAGE_ORDER.map((city) => ({ city }));
}
