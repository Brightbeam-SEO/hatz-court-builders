/** Editable homepage marketing copy (wired from Sanity `homePage.pageCopy`). */
export type HomeHeroTrustSignal = {
  highlight: string;
  title: string;
};

export type HomeTrustStripLogo = {
  src: string;
  alt: string;
};

export type HomePageCopy = {
  heroEyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  heroTrustSignals: HomeHeroTrustSignal[];
  heroStripHeading: string;
  heroStripSubheading: string;
  localIntroEyebrow: string;
  localIntroTitleLine1: string;
  localIntroTitleLine2: string;
  localIntroBody: string;
  servicesHeading: string;
  servicesIntro: string;
  servicesExploreLabel: string;
  closingShowcaseEyebrow: string;
  closingShowcaseHeading: string;
  closingShowcaseBragLine: string;
  closingShowcaseBragSubline: string;
  closingShowcaseBody: string;
  closingShowcaseBullets: string[];
  processSectionEyebrow: string;
  processSectionHeadingLead: string;
  processSectionHeadingRest: string;
  processSectionSubtext: string;
  trustMarqueeHeading: string;
  trustMarqueeSubtext: string;
  serviceAreaEyebrow: string;
  serviceAreaHeading: string;
  serviceAreaSubheading: string;
  serviceAreaDescriptionIdaho: string;
  serviceAreaDescriptionArizona: string;
  serviceAreaBody: string;
  faqHeadingLine1: string;
  faqHeadingLine2: string;
  faqSubtext: string;
  faqIntroBeforeEmphasis: string;
  faqIntroEmphasis: string;
  faqIntroAfterEmphasis: string;
  faqIntroSubtext: string;
  contactEyebrow: string;
  contactHeading: string;
  contactSubtext: string;
  ctaCallVerb: string;
  ctaBookNowLabel: string;
  contactFormSubmitLabel: string;
  heroTrustStripLogos: HomeTrustStripLogo[];
};

export const defaultHeroTrustStripLogos: HomeTrustStripLogo[] = [
  { src: "/images/trust/google.png", alt: "Google reviews" },
  { src: "/images/trust/yelp.png", alt: "Yelp reviews" },
  { src: "/images/trust/boise.png", alt: "Boise" },
  { src: "/images/trust/hoa.svg", alt: "HOA communities" },
];

const REMOVED_TRUST_STRIP_LOGO = /\/trust\/(?:bbb|nextdoor)\.(png|svg|jpe?g|webp)$/i;

export function normalizeHeroTrustStripLogos(
  logos: HomeTrustStripLogo[] | undefined,
): HomeTrustStripLogo[] {
  if (!logos?.length) return defaultHeroTrustStripLogos;
  const filtered = logos.filter(
    (logo) => logo.src?.trim() && logo.alt?.trim() && !REMOVED_TRUST_STRIP_LOGO.test(logo.src),
  );
  if (filtered.length === 0) return defaultHeroTrustStripLogos;

  const seen = new Set(filtered.map((logo) => logo.src));
  const merged = [...filtered];
  for (const logo of defaultHeroTrustStripLogos) {
    if (!seen.has(logo.src)) {
      merged.push(logo);
      seen.add(logo.src);
    }
  }
  return merged;
}

export const defaultHomePageCopy: HomePageCopy = {
  heroEyebrow: "Residential & commercial · All surface types · Idaho & Arizona",
  heroTitle: "Best Court Builders in Boise & Scottsdale",
  heroSubtitle:
    "High-performance court construction for residential and commercial projects in Idaho and Arizona.",
  heroTrustSignals: [
    { highlight: "24/7", title: "Available" },
    { highlight: "All", title: "Surface Types" },
    { highlight: "ID & AZ", title: "Two Locations" },
  ],
  heroStripHeading: "Get a Free Court Construction Quote",
  heroStripSubheading:
    "Tell us about your project and we'll help you plan the right court system, surface, and layout.",
  localIntroEyebrow: "Idaho & Arizona Court Builder",
  localIntroTitleLine1: "Boise & Scottsdale Court Builder",
  localIntroTitleLine2: "for Athletic Courts",
  localIntroBody:
    "From backyard courts to multi-court facilities, Hatz Court Builders handles court design, construction, resurfacing, repairs, striping, lighting, fencing, and site prep.",
  servicesHeading: "Boise & Scottsdale Court Builder Services",
  servicesIntro:
    "Hatz Court Builders builds, resurfaces, repairs, and designs custom athletic courts for homes, schools, parks, recreation spaces, and commercial properties.",
  servicesExploreLabel: "Learn more",
  closingShowcaseEyebrow: "Why Choose Hatz",
  closingShowcaseHeading: "A One-Stop Court Builder for Every Surface, Sport, and Space",
  closingShowcaseBragLine: "",
  closingShowcaseBragSubline: "",
  closingShowcaseBody:
    "Hatz Court Builders gives homeowners, schools, parks, and commercial properties one team for court design, construction, resurfacing, components, and finishing details.",
  closingShowcaseBullets: [
    "Custom Court Design",
    "All Surface Types",
    "Residential Court Construction",
    "Commercial Court Construction",
    "Pickleball Court Specialists",
    "Tennis Court Construction",
    "Basketball Court Construction",
    "Multi-Use Court Layouts",
    "Resurfacing & Repairs",
    "Fencing, Lighting & Components",
  ],
  processSectionEyebrow: "Our Court Construction Process",
  processSectionHeadingLead: "How Our Court Builders Bring Your Project to Life",
  processSectionHeadingRest: "",
  processSectionSubtext:
    "From the first site visit to the final walkthrough, Hatz Court Builders handles court design, surfacing, construction, and finishing for residential and commercial projects in Boise, Scottsdale, and surrounding areas.",
  trustMarqueeHeading: "Trusted Court Builders for Homes, Schools, and Parks",
  trustMarqueeSubtext:
    "Hatz Court Builders helps residential and commercial clients create high-quality courts with the right surface, layout, equipment, and finishing details for long-term play.",
  serviceAreaEyebrow: "Service Areas",
  serviceAreaHeading: "Court Builders Serving Boise & Scottsdale",
  serviceAreaSubheading: "",
  serviceAreaDescriptionIdaho:
    "Custom court construction for homes, schools, parks, and commercial properties across Idaho.",
  serviceAreaDescriptionArizona:
    "High-quality tennis, basketball, pickleball, and multi-use court construction across Arizona.",
  serviceAreaBody:
    "Idaho: Boise, Meridian, Nampa, Caldwell, Eagle, Star, Kuna, Middleton, Twin Falls, McCall, Sun Valley, and more. Arizona: Phoenix, Scottsdale, Fountain Hills, Mesa, Gilbert, Chandler, Tempe, Peoria, Arcadia, and Anthem.",
  faqHeadingLine1: "Answers From a Trusted Court Builder in Boise & Scottsdale",
  faqHeadingLine2: "",
  faqSubtext:
    "Common questions about custom court construction, surface options, resurfacing, and residential and commercial court projects in Idaho and Arizona.",
  faqIntroBeforeEmphasis: "Have ",
  faqIntroEmphasis: "Questions",
  faqIntroAfterEmphasis: " About Your Court Project?",
  faqIntroSubtext:
    "Straight answers about surfaces, timelines, and service areas — so you can plan your court with confidence.",
  contactEyebrow: "Contact Hatz Court Builders",
  contactHeading: "Talk With Top Rated Court Builders in Boise & Scottsdale",
  contactSubtext:
    "Our court builders in Boise and Scottsdale will help you review your space, surface options, and next steps.",
  ctaCallVerb: "Call",
  ctaBookNowLabel: "Get A Court Estimate",
  contactFormSubmitLabel: "Submit",
  heroTrustStripLogos: defaultHeroTrustStripLogos,
};

const STALE_ZEN_HERO_COPY =
  /massage|reflexology|spa services|spa experience|calming spa|walk-ins|same-day appointments|zen day spa|book your massage|scalp treatments|relax[,\s]*&\s*recharge|feel your best|around how you feel|in eagle|schedule your massage|tell us your needs/i;

const STALE_PM_HERO_COPY =
  /property management|rental (property|analysis|owners?)|greenbelt|tenant placement|rent collection|meridian,?\s*idaho|treasure valley rental|hands-on (service|management)|free rental analysis|locally owned and personally managed|responsive communication/i;

const STALE_SUPERSEDED_HERO_COPY =
  /request your free court consultation|tell us about your backyard, school, park, or commercial project|custom tennis, basketball, pickleball, and multi-use courts/i;

const STALE_SUPERSEDED_LOCAL_INTRO_COPY =
  /custom court construction|from design to completion|specializes in sports construction for homeowners/i;

export function isStaleZenHeroCopy(value: string | undefined): boolean {
  if (!value?.trim()) return false;
  return (
    STALE_ZEN_HERO_COPY.test(value) ||
    STALE_PM_HERO_COPY.test(value) ||
    STALE_SUPERSEDED_HERO_COPY.test(value)
  );
}

export function isStaleSupersededLocalIntroCopy(value: string | undefined): boolean {
  if (!value?.trim()) return false;
  return STALE_SUPERSEDED_LOCAL_INTRO_COPY.test(value);
}

const STALE_SERVICES_HEADING = /court construction & resurfacing services/i;
const STALE_SERVICES_INTRO =
  /residential long-term rentals only|credit checks, inspections, maintenance, marketing, tenant screening, rent collection, and owner reporting|tenant screening, rent collection|pickleball, basketball, tennis, and multi-use courts for residential and commercial properties/i;

export function isStaleServicesHeading(value: string | undefined): boolean {
  if (!value?.trim()) return false;
  return STALE_SERVICES_HEADING.test(value);
}

export function isStaleServicesIntro(value: string | undefined): boolean {
  if (!value?.trim()) return false;
  return STALE_SERVICES_INTRO.test(value);
}

const STALE_LOCAL_INTRO_EYEBROW = /locally owned in meridian|free on-site consultations/i;
const STALE_LOCAL_INTRO_TITLE_LINE2 = /for the treasure valley|for custom athletic courts/i;
const STALE_LOCAL_INTRO_BODY =
  /greenbelt property management|property management meridian|long-term residential rental|tenant placement|rent collection/i;

export function isStaleLocalIntroEyebrow(value: string | undefined): boolean {
  if (!value?.trim()) return false;
  return STALE_LOCAL_INTRO_EYEBROW.test(value);
}

export function isStaleLocalIntroTitleLine2(value: string | undefined): boolean {
  if (!value?.trim()) return false;
  return STALE_LOCAL_INTRO_TITLE_LINE2.test(value);
}

export function isStaleLocalIntroBody(value: string | undefined): boolean {
  if (!value?.trim()) return false;
  return STALE_LOCAL_INTRO_BODY.test(value);
}

const STALE_CONTACT_HEADING =
  /speak with a meridian|property management expert|request your (court estimate|free consultation)/i;

export function isStaleContactHeading(value: string | undefined): boolean {
  if (!value?.trim()) return false;
  return isStaleZenHeroCopy(value) || STALE_CONTACT_HEADING.test(value);
}

const STALE_CONTACT_SUBTEXT =
  /tell us about your court project and we'll follow up promptly/i;

export function isStaleContactSubtext(value: string | undefined): boolean {
  if (!value?.trim()) return false;
  return isStaleZenHeroCopy(value) || STALE_CONTACT_SUBTEXT.test(value);
}

const STALE_FAQ_SUBTEXT =
  /common questions about court construction, surfacing options, resurfacing, and our service areas/i;

export function isStaleFaqSubtext(value: string | undefined): boolean {
  if (!value?.trim()) return false;
  return isStaleZenHeroCopy(value) || STALE_FAQ_SUBTEXT.test(value);
}

const STALE_SERVICE_AREA_HEADING =
  /meridian home base|treasure valley service area|court construction throughout idaho/i;

export function isStaleServiceAreaHeading(value: string | undefined): boolean {
  if (!value?.trim()) return false;
  return isStaleZenHeroCopy(value) || STALE_SERVICE_AREA_HEADING.test(value);
}

const STALE_CLOSING_SHOWCASE_COPY =
  /locally owned|husband & wife|personally managed|long-term rental|property management|greenbelt|one stop shop for every court surface|founded june 19, 2024/i;

export function isStaleClosingShowcaseCopy(value: string | undefined): boolean {
  if (!value?.trim()) return false;
  return isStaleZenHeroCopy(value) || STALE_CLOSING_SHOWCASE_COPY.test(value);
}

export function isStaleZenHeroTrustSignal(signal: HomeHeroTrustSignal): boolean {
  const combined = `${signal.highlight ?? ""} ${signal.title ?? ""}`.trim();
  if (!combined) return true;
  return (
    isStaleZenHeroCopy(combined) ||
    /years of wellness|happy clients|walk-ins welcome|family owned|owner service|open for owners/i.test(
      combined,
    )
  );
}

export function mergeHomePageCopy(
  base: HomePageCopy,
  remote: Partial<HomePageCopy> | null | undefined,
): HomePageCopy {
  if (!remote) return base;
  const next: HomePageCopy = { ...base };
  const assign = <K extends keyof HomePageCopy>(key: K, val: HomePageCopy[K] | undefined) => {
    if (val === undefined || val === null) return;
    if (typeof val === "string") {
      if (val.trim() === "") return;
      next[key] = val;
      return;
    }
    if (Array.isArray(val)) {
      if (val.length === 0) return;
      next[key] = val;
    }
  };

  if (!isStaleZenHeroCopy(remote.heroEyebrow)) assign("heroEyebrow", remote.heroEyebrow);
  if (!isStaleZenHeroCopy(remote.heroTitle)) assign("heroTitle", remote.heroTitle);
  if (!isStaleZenHeroCopy(remote.heroSubtitle)) assign("heroSubtitle", remote.heroSubtitle);
  if (remote.heroTrustSignals && remote.heroTrustSignals.length > 0) {
    const mapped = remote.heroTrustSignals.filter(
      (s) => s.highlight?.trim() && s.title?.trim() && !isStaleZenHeroTrustSignal(s),
    ) as HomeHeroTrustSignal[];
    if (mapped.length > 0) next.heroTrustSignals = mapped;
  }
  if (!isStaleZenHeroCopy(remote.heroStripHeading)) assign("heroStripHeading", remote.heroStripHeading);
  if (!isStaleZenHeroCopy(remote.heroStripSubheading)) assign("heroStripSubheading", remote.heroStripSubheading);
  if (!isStaleZenHeroCopy(remote.localIntroEyebrow) && !isStaleLocalIntroEyebrow(remote.localIntroEyebrow)) {
    assign("localIntroEyebrow", remote.localIntroEyebrow);
  }
  if (
    !isStaleZenHeroCopy(remote.localIntroTitleLine1) &&
    !isStaleSupersededLocalIntroCopy(remote.localIntroTitleLine1)
  ) {
    assign("localIntroTitleLine1", remote.localIntroTitleLine1);
  }
  if (
    !isStaleZenHeroCopy(remote.localIntroTitleLine2) &&
    !isStaleLocalIntroTitleLine2(remote.localIntroTitleLine2) &&
    !isStaleSupersededLocalIntroCopy(remote.localIntroTitleLine2)
  ) {
    assign("localIntroTitleLine2", remote.localIntroTitleLine2);
  }
  if (
    !isStaleZenHeroCopy(remote.localIntroBody) &&
    !isStaleLocalIntroBody(remote.localIntroBody) &&
    !isStaleSupersededLocalIntroCopy(remote.localIntroBody)
  ) {
    assign("localIntroBody", remote.localIntroBody);
  }
  if (
    !isStaleZenHeroCopy(remote.servicesHeading) &&
    !isStaleServicesHeading(remote.servicesHeading)
  ) {
    assign("servicesHeading", remote.servicesHeading);
  }
  if (!isStaleZenHeroCopy(remote.servicesIntro) && !isStaleServicesIntro(remote.servicesIntro)) {
    assign("servicesIntro", remote.servicesIntro);
  }
  if (
    remote.servicesExploreLabel?.trim() &&
    !/^explore our services$/i.test(remote.servicesExploreLabel.trim())
  ) {
    assign("servicesExploreLabel", remote.servicesExploreLabel);
  }
  if (
    !isStaleZenHeroCopy(remote.closingShowcaseEyebrow) &&
    !isStaleClosingShowcaseCopy(remote.closingShowcaseEyebrow)
  ) {
    assign("closingShowcaseEyebrow", remote.closingShowcaseEyebrow);
  }
  if (
    !isStaleZenHeroCopy(remote.closingShowcaseHeading) &&
    !isStaleClosingShowcaseCopy(remote.closingShowcaseHeading)
  ) {
    assign("closingShowcaseHeading", remote.closingShowcaseHeading);
  }
  if (
    !isStaleZenHeroCopy(remote.closingShowcaseBragLine) &&
    !isStaleClosingShowcaseCopy(remote.closingShowcaseBragLine)
  ) {
    assign("closingShowcaseBragLine", remote.closingShowcaseBragLine);
  }
  if (
    !isStaleZenHeroCopy(remote.closingShowcaseBragSubline) &&
    !isStaleClosingShowcaseCopy(remote.closingShowcaseBragSubline)
  ) {
    assign("closingShowcaseBragSubline", remote.closingShowcaseBragSubline);
  }
  if (
    !isStaleZenHeroCopy(remote.closingShowcaseBody) &&
    !isStaleClosingShowcaseCopy(remote.closingShowcaseBody)
  ) {
    assign("closingShowcaseBody", remote.closingShowcaseBody);
  }
  if (remote.closingShowcaseBullets && remote.closingShowcaseBullets.length > 0) {
    const bullets = remote.closingShowcaseBullets
      .map((b) => b.trim())
      .filter(Boolean)
      .filter((b) => !isStaleZenHeroCopy(b) && !isStaleClosingShowcaseCopy(b));
    if (bullets.length > 0) next.closingShowcaseBullets = bullets;
  }
  if (!isStaleZenHeroCopy(remote.processSectionEyebrow)) {
    assign("processSectionEyebrow", remote.processSectionEyebrow);
  }
  if (!isStaleZenHeroCopy(remote.processSectionHeadingLead)) {
    assign("processSectionHeadingLead", remote.processSectionHeadingLead);
  }
  if (!isStaleZenHeroCopy(remote.processSectionHeadingRest) && !/^works$/i.test(remote.processSectionHeadingRest?.trim() ?? "")) {
    assign("processSectionHeadingRest", remote.processSectionHeadingRest);
  }
  if (!isStaleZenHeroCopy(remote.processSectionSubtext)) {
    assign("processSectionSubtext", remote.processSectionSubtext);
  }
  if (!isStaleZenHeroCopy(remote.trustMarqueeHeading)) {
    assign("trustMarqueeHeading", remote.trustMarqueeHeading);
  }
  if (!isStaleZenHeroCopy(remote.trustMarqueeSubtext)) {
    assign("trustMarqueeSubtext", remote.trustMarqueeSubtext);
  }
  if (!isStaleServiceAreaHeading(remote.serviceAreaHeading)) assign("serviceAreaHeading", remote.serviceAreaHeading);
  if (!isStaleZenHeroCopy(remote.serviceAreaSubheading)) assign("serviceAreaSubheading", remote.serviceAreaSubheading);
  if (!isStaleZenHeroCopy(remote.serviceAreaDescriptionIdaho)) {
    assign("serviceAreaDescriptionIdaho", remote.serviceAreaDescriptionIdaho);
  }
  if (!isStaleZenHeroCopy(remote.serviceAreaDescriptionArizona)) {
    assign("serviceAreaDescriptionArizona", remote.serviceAreaDescriptionArizona);
  }
  if (!isStaleZenHeroCopy(remote.serviceAreaBody)) assign("serviceAreaBody", remote.serviceAreaBody);
  if (!isStaleZenHeroCopy(remote.faqHeadingLine1)) assign("faqHeadingLine1", remote.faqHeadingLine1);
  if (!isStaleZenHeroCopy(remote.faqHeadingLine2)) assign("faqHeadingLine2", remote.faqHeadingLine2);
  if (!isStaleFaqSubtext(remote.faqSubtext)) assign("faqSubtext", remote.faqSubtext);
  if (!isStaleZenHeroCopy(remote.faqIntroBeforeEmphasis)) assign("faqIntroBeforeEmphasis", remote.faqIntroBeforeEmphasis);
  if (!isStaleZenHeroCopy(remote.faqIntroEmphasis)) assign("faqIntroEmphasis", remote.faqIntroEmphasis);
  if (!isStaleZenHeroCopy(remote.faqIntroAfterEmphasis)) assign("faqIntroAfterEmphasis", remote.faqIntroAfterEmphasis);
  if (!isStaleZenHeroCopy(remote.faqIntroSubtext)) assign("faqIntroSubtext", remote.faqIntroSubtext);
  if (!isStaleContactHeading(remote.contactHeading)) assign("contactHeading", remote.contactHeading);
  if (!isStaleContactSubtext(remote.contactSubtext)) assign("contactSubtext", remote.contactSubtext);
  if (remote.contactEyebrow?.trim()) assign("contactEyebrow", remote.contactEyebrow);
  assign("ctaCallVerb", remote.ctaCallVerb);
  if (!isStaleZenHeroCopy(remote.ctaBookNowLabel) && remote.ctaBookNowLabel?.trim() !== "Book Now") {
    assign("ctaBookNowLabel", remote.ctaBookNowLabel);
  }
  assign("contactFormSubmitLabel", remote.contactFormSubmitLabel);
  next.heroTrustStripLogos = normalizeHeroTrustStripLogos(remote.heroTrustStripLogos);
  return next;
}
