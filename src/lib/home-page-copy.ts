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
  serviceAreaHeading: string;
  serviceAreaBody: string;
  faqHeadingLine1: string;
  faqHeadingLine2: string;
  faqSubtext: string;
  faqIntroBeforeEmphasis: string;
  faqIntroEmphasis: string;
  faqIntroAfterEmphasis: string;
  faqIntroSubtext: string;
  contactHeading: string;
  contactSubtext: string;
  ctaCallVerb: string;
  ctaBookNowLabel: string;
  contactFormSubmitLabel: string;
  heroTrustStripLogos: HomeTrustStripLogo[];
};

export const defaultHeroTrustStripLogos: HomeTrustStripLogo[] = [
  { src: "/images/trust/google.png", alt: "Google reviews" },
  { src: "/images/trust/hoa.svg", alt: "HOA communities" },
];

const REMOVED_TRUST_STRIP_LOGO = /\/trust\/(?:boise|bbb|nextdoor)\.(png|svg|jpe?g|webp)$/i;

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
    "Custom tennis, basketball, pickleball, and multi-use courts — acrylic, modular tile, hardwood, turf, asphalt, and concrete. Resurfacing, repairs, striping, and full design-build from one trusted team.",
  heroTrustSignals: [
    { highlight: "24/7", title: "Available" },
    { highlight: "All", title: "Surface Types" },
    { highlight: "ID & AZ", title: "Two Locations" },
  ],
  heroStripHeading: "Request Your Free Court Consultation",
  heroStripSubheading:
    "Tell us about your backyard, school, park, or commercial project in Boise, Scottsdale, or anywhere we serve — we'll help you choose the right court system and surface.",
  localIntroEyebrow: "Idaho & Arizona Court Builder",
  localIntroTitleLine1: "Custom Court Construction",
  localIntroTitleLine2: "From Design to Completion",
  localIntroBody:
    "Hatz Court Builders specializes in sports construction for homeowners, parks & recreation, and schools. We install pickleball, basketball, tennis, volleyball, and multi-use courts with acrylic, cushioned acrylic, modular tile, hardwood, synthetic turf, asphalt, and concrete — plus resurfacing, repairs, striping, custom logos, lighting, fencing, and site prep. Unlike competitors who focus on one surfacing option, we're a one-stop shop for every component of your court project.",
  servicesHeading: "Court Construction & Resurfacing Services",
  servicesIntro:
    "Pickleball, basketball, tennis, and multi-use courts for residential and commercial properties — every major surfacing system and full design-build support.",
  servicesExploreLabel: "Explore Our Services",
  closingShowcaseEyebrow: "Why Hatz Court Builders",
  closingShowcaseHeading: "One Stop Shop for Every Court Surface & Component",
  closingShowcaseBragLine: "★★★★★",
  closingShowcaseBragSubline: "Trusted by homeowners, schools, and parks across Idaho & Arizona",
  closingShowcaseBody:
    "Founded June 19, 2024, Hatz Court Builders serves Boise, Meridian, Nampa, Eagle, and communities across Idaho — plus Phoenix, Scottsdale, Mesa, Gilbert, Chandler, and the greater Arizona metro. Licensed Idaho Public Works #9471850. We build everything from backyard pickleball courts to large multi-court facilities.",
  closingShowcaseBullets: [
    "All Surface Types — Acrylic, Modular, Hardwood, Turf & More",
    "Pickleball, Basketball, Tennis & Multi-Use Courts",
    "Court Resurfacing, Repairs & Line Striping",
    "Custom Logos, Lighting, Fencing & Site Prep",
    "Residential & Commercial Design-Build",
    "Cushioned & Standard Hardcourt Acrylic Options",
  ],
  processSectionEyebrow: "Our Process",
  processSectionHeadingLead: "How We Build Your Court",
  processSectionHeadingRest: "",
  processSectionSubtext: "From consultation to your first game",
  trustMarqueeHeading: "See Why Clients Trust Hatz Court Builders",
  trustMarqueeSubtext:
    "Homeowners, parks & rec departments, and schools choose us for quality surfacing, honest guidance, and courts built to last.",
  serviceAreaHeading: "Boise & Scottsdale · Idaho & Arizona Service Areas",
  serviceAreaBody:
    "Idaho: Boise, Meridian, Nampa, Caldwell, Eagle, Star, Kuna, Middleton, Twin Falls, McCall, Sun Valley, and more. Arizona: Phoenix, Scottsdale, Fountain Hills, Mesa, Gilbert, Chandler, Tempe, Peoria, Arcadia, and Anthem.",
  faqHeadingLine1: "Answers From a Trusted Court Builder",
  faqHeadingLine2: "in Boise & Scottsdale",
  faqSubtext:
    "Common questions about court construction, surfacing options, resurfacing, and our service areas in Idaho and Arizona.",
  faqIntroBeforeEmphasis: "Have ",
  faqIntroEmphasis: "Questions",
  faqIntroAfterEmphasis: " About Your Court Project?",
  faqIntroSubtext:
    "Straight answers about surfaces, timelines, and service areas — so you can plan your court with confidence.",
  contactHeading: "Request Your Court Estimate",
  contactSubtext: "Tell us about your court project and we'll follow up promptly.",
  ctaCallVerb: "Call",
  ctaBookNowLabel: "Get A Court Estimate",
  contactFormSubmitLabel: "Submit",
  heroTrustStripLogos: defaultHeroTrustStripLogos,
};

const STALE_ZEN_HERO_COPY =
  /massage|reflexology|spa services|spa experience|calming spa|walk-ins|same-day appointments|zen day spa|book your massage|scalp treatments|relax[,\s]*&\s*recharge|feel your best|around how you feel|in eagle|schedule your massage|tell us your needs/i;

const STALE_PM_HERO_COPY =
  /property management|rental (property|analysis|owners?)|greenbelt|tenant placement|rent collection|meridian,?\s*idaho|treasure valley rental|hands-on (service|management)|free rental analysis/i;

export function isStaleZenHeroCopy(value: string | undefined): boolean {
  if (!value?.trim()) return false;
  return STALE_ZEN_HERO_COPY.test(value) || STALE_PM_HERO_COPY.test(value);
}

const STALE_SERVICES_INTRO =
  /residential long-term rentals only|credit checks, inspections, maintenance, marketing, tenant screening, rent collection, and owner reporting|tenant screening, rent collection/i;

export function isStaleServicesIntro(value: string | undefined): boolean {
  if (!value?.trim()) return false;
  return STALE_SERVICES_INTRO.test(value);
}

const STALE_LOCAL_INTRO_EYEBROW = /locally owned in meridian|free on-site consultations/i;
const STALE_LOCAL_INTRO_TITLE_LINE2 = /for the treasure valley/i;
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
  if (!isStaleZenHeroCopy(remote.localIntroTitleLine1)) {
    assign("localIntroTitleLine1", remote.localIntroTitleLine1);
  }
  if (
    !isStaleZenHeroCopy(remote.localIntroTitleLine2) &&
    !isStaleLocalIntroTitleLine2(remote.localIntroTitleLine2)
  ) {
    assign("localIntroTitleLine2", remote.localIntroTitleLine2);
  }
  if (!isStaleZenHeroCopy(remote.localIntroBody) && !isStaleLocalIntroBody(remote.localIntroBody)) {
    assign("localIntroBody", remote.localIntroBody);
  }
  if (!isStaleZenHeroCopy(remote.servicesHeading)) assign("servicesHeading", remote.servicesHeading);
  if (!isStaleZenHeroCopy(remote.servicesIntro) && !isStaleServicesIntro(remote.servicesIntro)) {
    assign("servicesIntro", remote.servicesIntro);
  }
  assign("servicesExploreLabel", remote.servicesExploreLabel);
  if (!isStaleZenHeroCopy(remote.closingShowcaseEyebrow)) {
    assign("closingShowcaseEyebrow", remote.closingShowcaseEyebrow);
  }
  if (!isStaleZenHeroCopy(remote.closingShowcaseHeading)) {
    assign("closingShowcaseHeading", remote.closingShowcaseHeading);
  }
  if (!isStaleZenHeroCopy(remote.closingShowcaseBragLine)) {
    assign("closingShowcaseBragLine", remote.closingShowcaseBragLine);
  }
  if (!isStaleZenHeroCopy(remote.closingShowcaseBragSubline)) {
    assign("closingShowcaseBragSubline", remote.closingShowcaseBragSubline);
  }
  if (!isStaleZenHeroCopy(remote.closingShowcaseBody)) assign("closingShowcaseBody", remote.closingShowcaseBody);
  if (remote.closingShowcaseBullets && remote.closingShowcaseBullets.length > 0) {
    const bullets = remote.closingShowcaseBullets
      .map((b) => b.trim())
      .filter(Boolean)
      .filter((b) => !isStaleZenHeroCopy(b));
    if (bullets.length > 0) next.closingShowcaseBullets = bullets;
  }
  if (!isStaleZenHeroCopy(remote.processSectionEyebrow)) {
    assign("processSectionEyebrow", remote.processSectionEyebrow);
  }
  if (!isStaleZenHeroCopy(remote.processSectionHeadingLead)) {
    assign("processSectionHeadingLead", remote.processSectionHeadingLead);
  }
  if (!isStaleZenHeroCopy(remote.processSectionHeadingRest)) {
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
  if (!isStaleZenHeroCopy(remote.serviceAreaHeading)) assign("serviceAreaHeading", remote.serviceAreaHeading);
  if (!isStaleZenHeroCopy(remote.serviceAreaBody)) assign("serviceAreaBody", remote.serviceAreaBody);
  if (!isStaleZenHeroCopy(remote.faqHeadingLine1)) assign("faqHeadingLine1", remote.faqHeadingLine1);
  if (!isStaleZenHeroCopy(remote.faqHeadingLine2)) assign("faqHeadingLine2", remote.faqHeadingLine2);
  if (!isStaleZenHeroCopy(remote.faqSubtext)) assign("faqSubtext", remote.faqSubtext);
  if (!isStaleZenHeroCopy(remote.faqIntroBeforeEmphasis)) assign("faqIntroBeforeEmphasis", remote.faqIntroBeforeEmphasis);
  if (!isStaleZenHeroCopy(remote.faqIntroEmphasis)) assign("faqIntroEmphasis", remote.faqIntroEmphasis);
  if (!isStaleZenHeroCopy(remote.faqIntroAfterEmphasis)) assign("faqIntroAfterEmphasis", remote.faqIntroAfterEmphasis);
  if (!isStaleZenHeroCopy(remote.faqIntroSubtext)) assign("faqIntroSubtext", remote.faqIntroSubtext);
  if (!isStaleZenHeroCopy(remote.contactHeading)) assign("contactHeading", remote.contactHeading);
  if (!isStaleZenHeroCopy(remote.contactSubtext)) assign("contactSubtext", remote.contactSubtext);
  assign("ctaCallVerb", remote.ctaCallVerb);
  if (!isStaleZenHeroCopy(remote.ctaBookNowLabel) && remote.ctaBookNowLabel?.trim() !== "Book Now") {
    assign("ctaBookNowLabel", remote.ctaBookNowLabel);
  }
  assign("contactFormSubmitLabel", remote.contactFormSubmitLabel);
  next.heroTrustStripLogos = normalizeHeroTrustStripLogos(remote.heroTrustStripLogos);
  return next;
}
