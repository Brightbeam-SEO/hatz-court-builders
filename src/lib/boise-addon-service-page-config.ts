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
  gutter: zenPick("Soothing Green Light Water Scalp Therapy"),
  holidayHome: zenPick("Zen Day Spa Branding and Gift Card Display"),
} as const;

export const BOISE_ADDON_SERVICE_SLUGS = [
  "gutter-cleaning-boise-id",
  "christmas-light-installation-boise-id",
] as const;

export type BoiseAddonServiceSlug = (typeof BOISE_ADDON_SERVICE_SLUGS)[number];

const gutterTimeline: TreasureValleyPressurePageConfig["timelineSteps"] = [
  {
    title: "Roofline assessment",
    body: "We map needle dams, shingle grit, and planter splash zones before debris moves toward downspouts.",
  },
  {
    title: "Ladder staging & landscape shielding",
    body: "Pads protect gutters from denting; drip paths aim away from beds Boise irrigation already saturates.",
  },
  {
    title: "Clear, flush, verify flow",
    body: "Hands-and-tools clearing plus controlled flushing so underground drains reveal backups early—not during February thaw.",
  },
  {
    title: "Walkthrough & photo option",
    body: "Downspout exits get a final rush check; HOAs and landlords can receive quick proof sets.",
  },
];

const christmasTimeline: TreasureValleyPressurePageConfig["timelineSteps"] = [
  {
    title: "Design consult & measurement",
    body: "We sketch rooflines, fascia repeats, and walkway focal points—LED temps and bulb spacing sized to your architecture.",
  },
  {
    title: "Install & circuit sanity check",
    body: "Clips respect shingles and drip edges; GFCI-friendly plug maps avoid overloaded holiday circuits.",
  },
  {
    title: "Season tuning (optional)",
    body: "Wind events happen—quick revisits keep arcs balanced before guests arrive for Boise winter gatherings.",
  },
  {
    title: "Takedown & labeled storage",
    body: "Strings coil cleanly; totes labeled by elevation speed next autumn’s reinstall.",
  },
];

export const BOISE_ADDON_SERVICE_PAGES: Record<BoiseAddonServiceSlug, TreasureValleyPressurePageConfig> = {
  "gutter-cleaning-boise-id": {
    routeParam: "gutter-cleaning-boise-id",
    slug: "gutter-cleaning-boise-id",
    metaTitle: "Gutter Cleaning Boise | Fast, Hassle-Free Quotes | Zen Day Spa",
    metaDescription:
      "Professional gutter cleaning in Boise—clear troughs, flushed downspouts, and roof-safe ladder work. Protect siding and foundations. Call (208) 979-0002.",
    cityName: "Boise",
    heroTitle: "Gutter Cleaning Boise ID",
    heroSubtitle:
      "Keep spring blossoms and Bench pine needles moving past your foundation—honest hand clears, controlled flushing, and careful ladder etiquette.",
    heroImageSrc: IMG.gutter,
    heroImageAlt: "Gutter cleaning on a Boise-area home — debris removal and downspout care",
    heroContactFormId: "gutter-boise-hero-form",
    heroFormName: "Gutter cleaning Boise hero",
    bottomContactSectionId: "gutter-boise-contact",
    bottomContactFormId: "gutter-boise-page-form",
    bottomContactHeading: "Get Gutter Cleaning in Boise",
    bottomContactSubtext:
      "Send roofline photos and tree notes—we’ll quote realistic crew time when gutters are packed stem-to-spout.",
    bottomFormName: "Gutter cleaning Boise contact",
    shareTitle: "Gutter Cleaning Boise, Idaho | Zen Day Spa",
    sidebarPanelId: "gutter-boise-other-services",
    mapIframeTitle: BOISE_MAP.iframeTitle,
    mapEmbedSrc: BOISE_MAP.embedSrc,
    faqHeading: "Common Questions About Gutter Cleaning in Boise",
    faqIntro: "Frequency, risks of skipping visits, and bundling with glass or washing.",
    faqIdPrefix: "gutter-boise-faq",
    faqItems: [
      {
        question: "How often should gutters be cleaned in Boise?",
        answer:
          "Twice yearly—spring after blossoms drop and fall before winter storms—is the rhythm most Treasure Valley homes need; heavy canopy lots may want an extra mid-summer clear.",
      },
      {
        question: "What happens if gutters stay clogged?",
        answer:
          "Overflow can rot fascia, stain siding, spill toward foundations, and invite ice dams—much pricier than scheduled clears.",
      },
      {
        question: "Do you flush downspouts?",
        answer:
          "Yes—underground backups hide until rain hits; we verify outlets breathe after the trough is clean.",
      },
      {
        question: "Can I bundle gutter cleaning with window washing?",
        answer:
          "Popular pairing—one mobilization, tidy drip paths, and glass that stays cleaner once gutters stop bleeding grime.",
      },
      {
        question: "Is gutter cleaning safe for shingles and paint?",
        answer:
          "We avoid leaning troughs, skip aggressive blowing against grit beds, and stage ladders to protect drip edges.",
      },
    ],
    timelineHeading: "Your Boise Gutter Cleaning Timeline",
    timelineIntro: "Roof-smart clears—no mystery piles left on patios.",
    timelineSteps: gutterTimeline,
  },
  "christmas-light-installation-boise-id": {
    routeParam: "christmas-light-installation-boise-id",
    slug: "christmas-light-installation-boise-id",
    metaTitle: "Christmas Light Installation Boise ID | Free & Fast Estimates | Zen Day Spa",
    metaDescription:
      "Full-service holiday lighting in Boise—custom design, professional install, takedown, and storage. Premium LED displays for homes and businesses. Call (208) 979-0002.",
    cityName: "Boise",
    heroTitle: "Christmas Light Installation Boise ID",
    heroSubtitle:
      "Design, installation, takedown, and organized storage—commercial-grade LEDs and layouts tuned for Boise wind, frost, and the curb appeal you want neighbors to notice.",
    heroImageSrc: IMG.holidayHome,
    heroImageAlt: "Christmas light installation in progress on a Boise home exterior",
    heroContactFormId: "christmas-lights-boise-hero-form",
    heroFormName: "Christmas lights Boise hero",
    bottomContactSectionId: "christmas-lights-boise-contact",
    bottomContactFormId: "christmas-lights-boise-page-form",
    bottomContactHeading: "Book Holiday Lighting in Boise",
    bottomContactSubtext:
      "November slots fill fast—share roof peaks, tree wraps wanted, and colors you love; returning displays often qualify for loyalty pricing.",
    bottomFormName: "Christmas lights Boise contact",
    shareTitle: "Christmas Light Installation Boise, Idaho | Zen Day Spa",
    sidebarPanelId: "christmas-lights-boise-other-services",
    mapIframeTitle: BOISE_MAP.iframeTitle,
    mapEmbedSrc: BOISE_MAP.embedSrc,
    faqHeading: "Christmas Light Installation FAQs — Boise",
    faqIntro: "Why go pro, customization, materials, takedown, and winter-worth-it math.",
    faqIdPrefix: "christmas-lights-boise-faq",
    faqItems: [
      {
        question: "Why hire professionals for Christmas light installation?",
        answer:
          "Correct clips, grounded circuits, and ladder disciplines reduce shock and fall risk while delivering even brightness pros notice from the street.",
      },
      {
        question: "Do you provide lights and hardware?",
        answer:
          "Yes—premium LED strings, timers, and commercial-grade clips suited to fascia and shingles ship with install so you skip box-store guesswork.",
      },
      {
        question: "Can displays be customized?",
        answer:
          "Warm white classics, multi-color patterns, roof silhouettes, and wrapped trees are all fair game—we sketch before buckets lift.",
      },
      {
        question: "Is takedown and storage included?",
        answer:
          "Season-end removal is part of the worry-free package; cords coil into labeled totes so next year’s reinstall stays organized.",
      },
      {
        question: "Is professional lighting worth the investment?",
        answer:
          "You reclaim weekends, dodge icy ladder nights, and gain displays engineered for Boise freeze/thaw—often cheaper than ER bills or DIY do-overs.",
      },
    ],
    timelineHeading: "Your Boise Holiday Lighting Timeline",
    timelineIntro: "From first sketch to labeled storage—local crew, premium LEDs.",
    timelineSteps: christmasTimeline,
  },
};

export function getBoiseAddonServicePageConfig(slug: string): TreasureValleyPressurePageConfig | null {
  return BOISE_ADDON_SERVICE_PAGES[slug as BoiseAddonServiceSlug] ?? null;
}

export function isBoiseAddonServiceSlug(slug: string): slug is BoiseAddonServiceSlug {
  return (BOISE_ADDON_SERVICE_SLUGS as readonly string[]).includes(slug);
}
