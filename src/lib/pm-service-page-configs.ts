import { BUSINESS } from "@/lib/business";
import { googleMapsAreaEmbedSrc } from "@/lib/maps-embed";
import { gpmPick } from "@/lib/gpm-pick-gallery";
import { insertPmPricingFaqsAfterFirst } from "@/lib/pm-pricing-faq-items";
import { PROPERTY_MANAGEMENT_SERVICE_HIGHLIGHTS } from "@/lib/property-management-service-highlights";
import { getServiceGallerySection } from "@/lib/service-gallery-images";
import type { TreasureValleyFaqItem, TreasureValleyPressurePageConfig } from "@/lib/treasure-valley-pressure-page-config";

const MERIDIAN_MAP = googleMapsAreaEmbedSrc("Meridian, Idaho");

export function pmServiceConfig(input: {
  slug: string;
  serviceName: string;
  metaTitle: string;
  metaDescription: string;
  heroTitle: string;
  heroSubtitle: string;
  heroImageFragment: string;
  bottomContactHeading: string;
  bottomContactSubtext: string;
  faqHeading: string;
  faqIntro: string;
  timelineHeading: string;
  timelineIntro: string;
  timelineSteps: { title: string; body: string }[];
  faqItems: TreasureValleyFaqItem[];
  articleLayout?: "default" | "rentals-listing";
  heroCtaVariant?: "default" | "portal-sign-in";
  hideGallerySection?: boolean;
}): TreasureValleyPressurePageConfig {
  const id = input.slug.replace(/[^a-z0-9]+/g, "-");
  return {
    routeParam: input.slug,
    slug: input.slug,
    metaTitle: input.metaTitle,
    metaDescription: input.metaDescription,
    cityName: "Boise",
    heroTitle: input.heroTitle,
    heroSubtitle: input.heroSubtitle,
    heroImageSrc: gpmPick(input.heroImageFragment),
    heroImageAlt: `${input.heroTitle} — ${BUSINESS.nameShort}`,
    heroContactFormId: `${id}-hero-contact-form`,
    heroFormName: `${input.serviceName} service hero`,
    bottomContactSectionId: `${id}-contact`,
    bottomContactFormId: `${id}-page-contact-form`,
    bottomContactHeading: input.bottomContactHeading,
    bottomContactSubtext: input.bottomContactSubtext,
    bottomFormName: `${input.serviceName} service contact`,
    bottomContactLayout: "blend",
    articleListBulletStyle: "crimson-check",
    timelineStepBadgeVariant: "crimson",
    splitTestimonialsAboveContact: true,
    testimonialsSectionId: `${id}-testimonials`,
    testimonialsSectionEyebrow: "What Owners Say",
    testimonialsSectionHeading: "What Clients Say",
    testimonialsSectionSubtext:
      "Real feedback from homeowners and facilities who trust us for quality court construction.",
    showCenteredContactSection: false,
    showHomeContactSection: true,
    gallerySection: input.hideGallerySection
      ? undefined
      : getServiceGallerySection(input.slug, input.serviceName),
    articleLayout: input.articleLayout,
    heroCtaVariant: input.heroCtaVariant,
    hideGallerySection: input.hideGallerySection,
    shareTitle: `${input.serviceName} | ${BUSINESS.nameShort}`,
    sidebarPanelId: `${id}-other-services-desktop`,
    mapIframeTitle: "Map — Meridian, Idaho",
    mapEmbedSrc: MERIDIAN_MAP,
    faqHeading: input.faqHeading,
    faqIntro: input.faqIntro,
    faqIdPrefix: `${id}-faq`,
    faqItems: insertPmPricingFaqsAfterFirst(input.slug, input.faqItems),
    serviceHighlightCards: PROPERTY_MANAGEMENT_SERVICE_HIGHLIGHTS,
    timelineHeading: input.timelineHeading,
    timelineIntro: input.timelineIntro,
    timelineSteps: input.timelineSteps,
  };
}

export const PM_PROPERTY_MANAGEMENT_SERVICES_CONFIG = pmServiceConfig({
  slug: "property-management-services",
  serviceName: "Court Construction Services",
  metaTitle: "Court Construction Services | Hatz Court Builders Boise & Scottsdale",
  metaDescription:
    "Custom tennis, basketball, pickleball, and multi-use courts in Idaho and Arizona. Acrylic, modular, hardwood, turf, resurfacing, and design-build. Free consultation.",
  heroTitle: "Court Construction Services",
  heroSubtitle:
    "Custom tennis, basketball, pickleball, and multi-use courts for residential and commercial projects — every major surfacing system from one trusted Idaho and Arizona court builder.",
  heroImageFragment: "backyard multi sport pickleball basketball court",
  bottomContactHeading: "Start Your Court Project",
  bottomContactSubtext:
    "Request a free consultation — we'll walk through surfacing options, layout, and a plan for your backyard, school, park, or commercial facility.",
  faqHeading: "Questions About Court Construction",
  faqIntro: "Straight answers for homeowners and facilities — call if yours is not listed.",
  timelineHeading: "Our Court Construction Process",
  timelineIntro: "A clear path from first call to your first game.",
  timelineSteps: [
    { title: "Consultation & Site Evaluation", body: "We review your space, sports mix, and surfacing goals." },
    { title: "Design & Surface Selection", body: "Choose acrylic, modular tile, hardwood, turf, or concrete with custom colors and layout." },
    { title: "Site Preparation", body: "Grading, base work, fencing, and component planning." },
    { title: "Construction & Installation", body: "Surfacing, hoops, nets, striping, and custom logos installed by our crew." },
  ],
  faqItems: [
    {
      question: "What court surfaces do you install?",
      answer:
        "We install acrylic, cushioned acrylic, modular tile, hardwood, synthetic turf, asphalt, and concrete court systems for residential and commercial projects.",
    },
    {
      question: "Do you build pickleball courts?",
      answer:
        "Yes. Pickleball acrylic courts are our most popular option, but we also build modular tile, cushioned, and concrete pickleball courts for backyards and facilities.",
    },
    {
      question: "Can you resurface an existing tennis or basketball court?",
      answer:
        "Yes. We handle crack repair, resurfacing, acrylic recoating, and professional line striping for existing courts.",
    },
    {
      question: "Do you serve Arizona as well as Idaho?",
      answer:
        "Yes. We serve Boise, Meridian, Eagle, and communities across Idaho — plus Phoenix, Scottsdale, Mesa, Gilbert, Chandler, and surrounding Arizona areas.",
    },
    {
      question: "What makes Hatz Court Builders different?",
      answer:
        "Most competitors focus on one surfacing type. We offer all major court systems plus fencing, lighting, custom logos, and full design-build — a true one-stop shop.",
    },
  ],
});

function courtBuilderCityConfig(input: {
  slug: string;
  cityName: string;
  stateName?: string;
  metaTitle: string;
  metaDescription: string;
  heroImageFragment: string;
  heroTitle?: string;
  heroSubtitle?: string;
  serviceName?: string;
  faqHeading?: string;
  faqItems: TreasureValleyFaqItem[];
}): TreasureValleyPressurePageConfig {
  const stateName = input.stateName ?? "Idaho";
  const isArizona = stateName === "Arizona";
  const stateAbbr = isArizona ? "AZ" : "ID";
  const defaultLabel = `Court Builder ${input.cityName}, ${stateAbbr}`;
  const defaultHeroSubtitle = isArizona
    ? `Custom athletic court builders serving ${input.cityName}, Maricopa County, and the greater Phoenix area.`
    : "Licensed and insured court builders with custom athletic court experience across the Treasure Valley.";
  const baseConfig = pmServiceConfig({
    slug: input.slug,
    serviceName: input.serviceName ?? defaultLabel,
    metaTitle: input.metaTitle,
    metaDescription: input.metaDescription,
    heroTitle: input.heroTitle ?? defaultLabel,
    heroSubtitle: input.heroSubtitle ?? defaultHeroSubtitle,
    heroImageFragment: input.heroImageFragment,
    bottomContactHeading: `Start Your ${input.cityName} Court Project`,
    bottomContactSubtext:
      "Request your free quote and we will map out the right layout, surface system, and construction approach for your property.",
    faqHeading: input.faqHeading ?? `Court Builder ${input.cityName} Questions`,
    faqIntro: "Straight answers from a local court construction team.",
    timelineHeading: `How Our ${input.cityName} Court Build Process Works`,
    timelineIntro: "Clear planning, durable materials, and a clean final walkthrough.",
    timelineSteps: [
      { title: "Site Visit & Measurements", body: "We inspect grade, drainage, access, and available space." },
      { title: "Custom Court Plan", body: "Layout, colors, surfacing, line striping, and equipment are planned to fit your goals." },
      { title: "Construction & Surfacing", body: "Our crew handles site prep, installation, and finish details." },
      { title: "Final Walkthrough", body: "We review the finished court with you and leave it play-ready." },
    ],
    faqItems: input.faqItems,
  });
  const gallerySection = baseConfig.gallerySection
    ? isArizona
      ? {
          ...baseConfig.gallerySection,
          heading: "Custom Courts Built Across Arizona",
          subheading: `Pickleball, basketball, tennis, and multi-use courts for homeowners, schools, HOAs, and parks across ${input.cityName} and the greater Phoenix area.`,
        }
      : {
          ...baseConfig.gallerySection,
          heading: "Custom Courts Built Across Idaho",
          subheading: `Pickleball, basketball, tennis, and multi-use courts for homeowners, schools, and parks — including ${(input.serviceName ?? defaultLabel).toLowerCase()} throughout the Treasure Valley.`,
        }
    : undefined;
  const nearbyRegion = isArizona ? "Phoenix-area" : "Treasure Valley";
  return {
    ...baseConfig,
    gallerySection,
    homeContactHeading: `Talk With Top Rated Court Builders in ${input.cityName}, ${stateAbbr}`,
    homeContactSubtext: `Our court builders serving ${input.cityName} and nearby ${nearbyRegion} communities will help you review your space, surface options, and next steps.`,
    cityName: input.cityName,
    mapIframeTitle: `Map — ${input.cityName}, ${stateName}`,
    mapEmbedSrc: googleMapsAreaEmbedSrc(`${input.cityName}, ${stateName}`),
  };
}

function courtConstructionServiceConfig(input: {
  slug: string;
  serviceName: string;
  metaTitle: string;
  metaDescription: string;
  heroTitle: string;
  heroSubtitle: string;
  heroImageFragment: string;
  faqHeading: string;
  faqItems: TreasureValleyFaqItem[];
}): TreasureValleyPressurePageConfig {
  return pmServiceConfig({
    slug: input.slug,
    serviceName: input.serviceName,
    metaTitle: input.metaTitle,
    metaDescription: input.metaDescription,
    heroTitle: input.heroTitle,
    heroSubtitle: input.heroSubtitle,
    heroImageFragment: input.heroImageFragment,
    bottomContactHeading: `Start Your ${input.serviceName} Project`,
    bottomContactSubtext:
      "Request your free quote and we will map out the right layout, surface system, and construction approach for your property.",
    faqHeading: input.faqHeading,
    faqIntro: "Straight answers from our court construction team.",
    timelineHeading: "How Our Court Construction Process Works",
    timelineIntro: "Clear planning, durable materials, and a clean final walkthrough.",
    timelineSteps: [
      { title: "Site Visit & Measurements", body: "We inspect grade, drainage, access, and available space." },
      { title: "Custom Court Plan", body: "Layout, colors, surfacing, line striping, and equipment are planned to fit your goals." },
      { title: "Construction & Surfacing", body: "Our crew handles site prep, installation, and finish details." },
      { title: "Final Walkthrough", body: "We review the finished court with you and leave it play-ready." },
    ],
    faqItems: input.faqItems,
  });
}

function courtSurfacesServiceConfig(input: {
  slug: string;
  serviceName: string;
  metaTitle: string;
  metaDescription: string;
  heroTitle: string;
  heroSubtitle: string;
  heroImageFragment: string;
  faqHeading: string;
  faqItems: TreasureValleyFaqItem[];
}): TreasureValleyPressurePageConfig {
  return pmServiceConfig({
    slug: input.slug,
    serviceName: input.serviceName,
    metaTitle: input.metaTitle,
    metaDescription: input.metaDescription,
    heroTitle: input.heroTitle,
    heroSubtitle: input.heroSubtitle,
    heroImageFragment: input.heroImageFragment,
    bottomContactHeading: `Get a Quote for ${input.serviceName}`,
    bottomContactSubtext:
      "Tell us about your court, sport mix, and site conditions — we’ll recommend the right surface system and install plan for your property.",
    faqHeading: input.faqHeading,
    faqIntro: "Straight answers from our court surfaces team.",
    timelineHeading: "How Our Court Surface Process Works",
    timelineIntro: "From site review to play-ready finish — planned for performance and longevity.",
    timelineSteps: [
      { title: "Site & Surface Assessment", body: "We evaluate the base, drainage, existing pavement or slab, and how the court will be used." },
      { title: "Surface System Plan", body: "We recommend materials, cushion layers, colors, and striping matched to your sport and climate." },
      { title: "Prep & Installation", body: "Our crew handles repairs, leveling, installation, coatings, and finish details." },
      { title: "Final Inspection", body: "We walk the finished surface with you and confirm the court is ready for play." },
    ],
    faqItems: input.faqItems,
  });
}

export const PM_BASKETBALL_COURT_CONSTRUCTION_CONFIG = courtConstructionServiceConfig({
  slug: "basketball-court-construction",
  serviceName: "Basketball Court Construction",
  metaTitle: "Basketball Court Construction | Indoor & Outdoor Courts",
  metaDescription:
    "Build a basketball court tailored to your space and playing needs. We construct residential and commercial courts with custom layouts and durable surfaces.",
  heroTitle: "Basketball Court Construction",
  heroSubtitle: "Basketball Courts Designed Around Your Property and Playing Goals",
  heroImageFragment: "basketball tile court modular hoop goal",
  faqHeading: "Five Questions to Help You Plan Your Basketball Court Installation",
  faqItems: [
    {
      question: "How much does it cost to build a basketball court?",
      answer:
        "For preliminary budgeting, a professionally constructed backyard basketball half-court measuring approximately 30 by 50 feet may cost $30,000 to $67,500, while a full-size outdoor basketball court may require $67,500 to $150,000 or more. The total depends on site preparation, foundation requirements, surface materials, basketball equipment, drainage, fencing, and lighting. These figures are conservative planning allowances rather than fixed installation rates. Contact Hatz Court Builders for project-specific pricing.",
    },
    {
      question: "How thick should concrete be for a basketball court?",
      answer:
        "A concrete slab approximately 4 inches thick is a common starting reference for certain residential basketball court installations. However, the necessary thickness depends on soil conditions, slab dimensions, anticipated loads, reinforcement requirements, drainage, and local environmental conditions. Permanent basketball hoop systems may also require separate structural footings. The final foundation specifications should be determined according to the property's actual construction requirements.",
    },
    {
      question: "What is the best surface for an outdoor basketball court?",
      answer:
        "Standard acrylic is a common choice for outdoor basketball courts because it can provide consistent ball rebound, suitable traction, and traditional hardcourt playing characteristics. Cushioned acrylic offers additional surface resilience, while modular athletic flooring provides another option for customized backyard and multi-sport courts. The most suitable surface depends on the intended playing experience, foundation conditions, local climate, maintenance requirements, and available budget.",
    },
    {
      question: "What is a good size for a backyard basketball court?",
      answer:
        "A backyard basketball court measuring approximately 30 by 50 feet can provide a practical recreational half-court layout for shooting practice and small-group games. Smaller areas, such as 20 by 20 feet or 25 by 30 feet, may be suitable for basic shooting practice. A regulation NBA half-court measures 47 by 50 feet. Additional space beyond the playing boundaries should be considered for player movement, equipment, fencing, and access.",
    },
    {
      question: "How long does it take to build a basketball court?",
      answer:
        "A new outdoor basketball court may take approximately three to eight weeks or longer, depending on its dimensions, site preparation, foundation construction, material curing, weather, and additional features. Installing athletic flooring over a suitable existing base may require less time. Larger commercial facilities and indoor basketball courts may need more extensive construction planning. Hatz Court Builders can discuss anticipated timelines according to your project's specific requirements.",
    },
  ],
});

export const PM_PICKLEBALL_COURT_CONSTRUCTION_CONFIG = courtConstructionServiceConfig({
  slug: "pickleball-court-construction",
  serviceName: "Pickleball Court Construction",
  metaTitle: "Pickleball Court Construction & Custom Court Installation",
  metaDescription:
    "Build a custom pickleball court for your backyard, school or sports facility. We handle court design, construction and surface installation. Request a quote.",
  heroTitle: "Pickleball Court Construction",
  heroSubtitle:
    "Pickleball court construction for homes, schools, HOAs, parks, clubs, and businesses — dedicated courts, conversions, and multi-sport recreation areas.",
  heroImageFragment: "pickleball court backyard modular tile",
  faqHeading: "Pickleball Court Construction Questions",
  faqItems: [
    {
      question: "What sports courts do you build?",
      answer:
        "We provide Pickleball Court Construction, Basketball Court Construction, Tennis Court Construction, Volleyball Court Construction, Futsal / Soccer Court Construction, Bocce Court Construction, Multi-Court Construction, Custom Court Construction, and Commercial Court Construction.",
    },
    {
      question: "Can you build multi-sport courts?",
      answer:
        "Yes. Multi-Court Construction is one of our most popular services and allows multiple sports to share the same court area.",
    },
    {
      question: "Do you offer court expansion services?",
      answer:
        "Yes. We provide Court Expansion services for facilities that need additional courts or expanded recreation areas.",
    },
    {
      question: "Can you design the court as well?",
      answer:
        "Absolutely. Court Design is included in our planning process to ensure the court fits the property and intended use.",
    },
    {
      question: "Do you build commercial sports courts?",
      answer:
        "Yes. We specialize in Commercial Court Construction for schools, parks, clubs, resorts, HOAs, and recreation facilities.",
    },
    {
      question: "Can existing courts be converted for pickleball?",
      answer:
        "In many cases, yes. Existing tennis and basketball courts can often be modified or restriped to accommodate pickleball.",
    },
  ],
});

export const PM_VOLLEYBALL_COURT_CONSTRUCTION_CONFIG = courtConstructionServiceConfig({
  slug: "volleyball-court-construction",
  serviceName: "Volleyball Court Construction",
  metaTitle: "Volleyball Court Construction | Indoor & Outdoor Courts",
  metaDescription:
    "Create a volleyball court suited to your property or sports facility. We offer indoor and outdoor court construction with customized layouts and surfaces.",
  heroTitle: "Volleyball Court Construction",
  heroSubtitle:
    "Professional volleyball court construction for residential and commercial projects — backyard courts, school courts, park courts, resort amenities, and multi-use facilities.",
  heroImageFragment: "outdoor multi court pickleball basketball",
  faqHeading: "Volleyball Court Construction Questions",
  faqItems: [
    {
      question: "What types of volleyball courts do you build?",
      answer:
        "We build backyard volleyball courts, school volleyball courts, park volleyball courts, HOA volleyball courts, church volleyball courts, club volleyball courts, resort volleyball courts, commercial volleyball courts, and multi-use volleyball courts.",
    },
    {
      question: "Can you build a volleyball court in a backyard?",
      answer:
        "Yes. Backyard Volleyball Court Construction is a good option for homeowners who want a private space for games, practice, and outdoor recreation.",
    },
    {
      question: "Can volleyball be added to a multi-use court?",
      answer:
        "Yes. Volleyball can often be added to a multi-use court with basketball, pickleball, or other sports depending on the space, surface, and layout.",
    },
    {
      question: "What surface is best for a volleyball court?",
      answer:
        "The best surface depends on the project. Outdoor courts may use acrylic, cushioned acrylic, asphalt, concrete, modular surfaces, or specialty systems. Indoor courts may use hardwood, modular surfaces, synthetic surfaces, or other indoor court systems.",
    },
    {
      question: "Do you build volleyball courts for schools and parks?",
      answer:
        "Yes. Hatz Court Builders provides Volleyball Court Construction for schools, parks, recreation centers, universities, municipalities, and public-use facilities.",
    },
    {
      question: "Can you add lighting and fencing?",
      answer:
        "Yes. Lighting and fencing can be included in many Volleyball Court Construction projects depending on the property, layout, and project goals.",
    },
    {
      question: "Can you add custom colors or logos?",
      answer:
        "Yes. Custom colors, striping, and logos can be added to many volleyball court projects. This is popular for schools, clubs, gyms, resorts, and commercial facilities.",
    },
    {
      question: "Do you offer court resurfacing and repairs?",
      answer:
        "Yes. We help with volleyball court resurfacing, repairs, renovations, restriping, equipment upgrades, and surface improvements.",
    },
    {
      question: "Can a volleyball court be combined with basketball?",
      answer:
        "Yes. Volleyball and basketball are common multi-court combinations. We can help plan the layout so both sports work well in the same space.",
    },
    {
      question: "What makes Hatz Court Builders different?",
      answer:
        "Hatz Court Builders specializes in many types of sports construction. We build volleyball courts, basketball courts, pickleball courts, tennis courts, futsal courts, bocce courts, custom courts, commercial courts, and multi-court systems using a wide range of surface options.",
    },
  ],
});

export const PM_FUTSAL_SOCCER_COURT_CONSTRUCTION_CONFIG = courtConstructionServiceConfig({
  slug: "futsal-soccer-court-construction",
  serviceName: "Futsal / Soccer Court Construction",
  metaTitle: "Futsal & Soccer Court Construction | Custom Court Builders",
  metaDescription:
    "Build a dedicated space for training and recreational play with futsal and soccer court construction. Explore custom layouts and surfaces for your facility.",
  heroTitle: "Futsal / Soccer Court Construction",
  heroSubtitle:
    "Professional futsal and soccer court construction for residential and commercial projects — futsal courts, mini soccer courts, training courts, school courts, and multi-use facilities.",
  heroImageFragment: "multicourt modular tile backyard installation",
  faqHeading: "Futsal / Soccer Court Construction Questions",
  faqItems: [
    {
      question: "What types of futsal and soccer courts do you build?",
      answer:
        "We build futsal courts, mini soccer courts, backyard soccer courts, school soccer courts, park soccer courts, club training courts, indoor soccer courts, outdoor soccer courts, commercial soccer courts, and multi-use soccer courts.",
    },
    {
      question: "Can you build a futsal court for a school or club?",
      answer:
        "Yes. Hatz Court Builders provides Futsal / Soccer Court Construction for schools, soccer clubs, training facilities, parks, recreation centers, and commercial properties.",
    },
    {
      question: "Can you build a soccer court in a backyard?",
      answer:
        "Yes. Backyard soccer courts and mini soccer courts are good options for homeowners who want a private space for training, games, and outdoor activity.",
    },
    {
      question: "What is the difference between futsal and mini soccer court construction?",
      answer:
        "Futsal is usually built for fast play on a hard court surface. Mini soccer courts can vary more in layout, surface, and use. Both are designed for smaller spaces than a full-size soccer field.",
    },
    {
      question: "Can futsal be added to a multi-use court?",
      answer:
        "Yes. Futsal can often be included in a multi-use court with basketball, volleyball, pickleball, or other sports depending on the space, surface, and layout.",
    },
    {
      question: "What surface is best for a futsal court?",
      answer:
        "The best surface depends on the project. Outdoor futsal courts may use acrylic, cushioned acrylic, asphalt, concrete, modular surfaces, or specialty systems. Some soccer training courts may use synthetic turf.",
    },
    {
      question: "Do you build indoor futsal courts?",
      answer:
        "Yes. We can help with indoor futsal and soccer court projects for gyms, training facilities, schools, clubs, and commercial recreation spaces.",
    },
    {
      question: "Can you add fencing and lighting?",
      answer:
        "Yes. Lighting and fencing can be included in many Futsal / Soccer Court Construction projects depending on the property, layout, and project goals.",
    },
    {
      question: "Do you offer court resurfacing and repairs?",
      answer:
        "Yes. We help with futsal and soccer court resurfacing, repairs, renovations, restriping, equipment upgrades, and surface improvements.",
    },
    {
      question: "What makes Hatz Court Builders different?",
      answer:
        "Hatz Court Builders specializes in many types of sports construction. We build futsal courts, soccer courts, basketball courts, pickleball courts, tennis courts, volleyball courts, bocce courts, custom courts, commercial courts, and multi-court systems using a wide range of surface options.",
    },
  ],
});

export const PM_TENNIS_COURT_CONSTRUCTION_CONFIG = courtConstructionServiceConfig({
  slug: "tennis-court-construction",
  serviceName: "Tennis Court Construction",
  metaTitle: "Tennis Court Construction | Custom Tennis Court Builders",
  metaDescription:
    "From private tennis courts to commercial facilities, we provide custom tennis court construction with carefully planned layouts and surfaces. Get a quote.",
  heroTitle: "Tennis Court Construction",
  heroSubtitle: "Professional Tennis Court Building for Homes and Athletic Facilities",
  heroImageFragment: "tennis court resurface blue and green acrylic",
  faqHeading: "What Property Owners Want to Know Before Building a Tennis Court",
  faqItems: [
    {
      question: "How much does it cost to build a tennis court?",
      answer:
        "For preliminary budgeting, a professionally constructed full-size outdoor tennis court may require approximately $75,000 to $180,000, including a conservative planning allowance. The total depends on foundation materials, excavation, grading, drainage, acrylic or cushioned surfacing, fencing, and equipment. Lighting, specialized foundations, and challenging terrain may increase the overall cost. Contact Hatz Court Builders for pricing based on your property and preferred tennis court design.",
    },
    {
      question: "What is the cheapest way to build a tennis court?",
      answer:
        "Reusing an existing structurally sound concrete or asphalt foundation can be one of the more economical ways to develop a tennis court. When new construction is necessary, a straightforward asphalt or concrete hardcourt with standard acrylic surfacing and essential equipment may help limit project costs. Certain clay or compacted aggregate systems can also have lower initial construction expenses, but their long-term maintenance requirements should be considered. Avoid compromising essential drainage and foundation preparation.",
    },
    {
      question: "How much land is needed for a tennis court?",
      answer:
        "A regulation doubles tennis court measures 36 by 78 feet, while a singles court measures 27 by 78 feet. However, an overall playing surface of approximately 60 by 120 feet, or 7,200 square feet, is commonly used for full-size tennis court planning. Additional property space may be required for fencing, lighting, drainage, walkways, setbacks, and surrounding landscaping.",
    },
    {
      question: "What is the best surface for a tennis court?",
      answer:
        "Standard acrylic is a popular choice for residential and commercial tennis courts because it can provide consistent ball response, customizable court speed, and manageable maintenance requirements. Cushioned acrylic offers an alternative with additional surface resilience. Clay, grass, and modular systems provide different playing experiences and maintenance needs. The best tennis court surface depends on the intended level of play, local climate, foundation conditions, and property owner's preferences.",
    },
    {
      question: "Does a tennis court add value to your home?",
      answer:
        "A well-designed and maintained private tennis court may increase a property's recreational appeal, particularly in luxury residential markets where buyers value outdoor athletic amenities. However, its effect on resale value depends on the local real estate market, property size, court condition, maintenance requirements, and buyer preferences. Homeowners should consider the long-term enjoyment and functionality of the court rather than assuming construction costs will be fully recovered when selling the property.",
    },
  ],
});

export const PM_BOCCE_COURT_CONSTRUCTION_CONFIG = courtConstructionServiceConfig({
  slug: "bocce-court-construction",
  serviceName: "Bocce Court Construction",
  metaTitle: "Bocce Court Construction | Custom Bocce Ball Court Builders",
  metaDescription:
    "Enjoy consistent play with custom bocce court construction. We handle court layout, base preparation and surface installation for your property. Get a quote.",
  heroTitle: "Bocce Court Builder",
  heroSubtitle: "Custom Bocce Courts for Homes, Parks, and Recreational Properties",
  heroImageFragment: "modular court tile custom logo branding",
  faqHeading: "Questions to Help You Plan Your Bocce Ball Court",
  faqItems: [
    {
      question: "How do I build a bocce court?",
      answer:
        "Building a bocce court involves selecting suitable dimensions, excavating and preparing the site, installing a stable aggregate base, planning drainage, and constructing secure perimeter boundaries. The finished surface may consist of crushed oyster shell, decomposed granite, specialized aggregate, or synthetic turf. The playing area should remain smooth and level to support predictable ball movement. Hatz Court Builders provides custom court design, site preparation, and construction services for residential and commercial projects.",
    },
    {
      question: "What is the best surface for bocce ball courts?",
      answer:
        "Crushed oyster shell blends are often preferred for traditional bocce play because they can provide a smooth, controlled ball roll when properly installed and maintained. Synthetic bocce turf is a suitable alternative for property owners who prioritize consistent playing conditions and reduced routine grooming. Decomposed granite and other specially prepared aggregate materials may also work well. The best surface depends on playing preferences, local climate, drainage, and maintenance expectations.",
    },
    {
      question: "How wide should a bocce ball court be?",
      answer:
        "Many traditional competition-style bocce courts are approximately 13 feet wide, while residential recreational courts commonly measure 10 to 12 feet wide. Smaller courts may be suitable for properties with limited available space, although narrower layouts can restrict certain playing strategies. Additional room should be allowed around the playing area for perimeter boards, access, seating, and maintenance. Hatz Court Builders can customize court dimensions according to your property and recreational goals.",
    },
    {
      question: "How much would it cost to build a bocce court?",
      answer:
        "For preliminary budgeting, a bocce court project may range from approximately $3,000 to $37,500 or more, with mid-range installations potentially falling between $7,500 and $18,000. Larger professionally constructed courts with specialized surfaces, extensive groundwork, drainage, lighting, and premium perimeter materials may require a higher budget. These figures are conservative planning allowances rather than fixed installation rates. Contact Hatz Court Builders for pricing based on your property's conditions and preferred court design.",
    },
    {
      question: "What is a bocce court called?",
      answer:
        "A dedicated playing area for bocce is commonly called a bocce court or bocce ball court. The term court bocce may also be used to distinguish games played within a defined rectangular court from casual bocce played on lawns or beaches. A traditional bocce court typically includes a level playing surface, sideboards, end boards, and markings appropriate to the rules being followed.",
    },
  ],
});

export const PM_MULTI_COURT_CONSTRUCTION_CONFIG = courtConstructionServiceConfig({
  slug: "multi-court-construction",
  serviceName: "Multi-Court Construction",
  metaTitle: "Multi-Court Construction | Custom Multi-Use Court Builders",
  metaDescription:
    "Make the most of your available space with multi-use court construction for homes, schools, parks and athletic facilities. Discuss your court project with us.",
  heroTitle: "Multi-Court Construction",
  heroSubtitle:
    "Multi-court construction that combines pickleball, basketball, tennis, volleyball, futsal, and more into one efficient recreation space.",
  heroImageFragment: "outdoor multi court pickleball basketball tennis",
  faqHeading: "Multi-Court Construction Questions",
  faqItems: [
    {
      question: "What is multi-court construction?",
      answer:
        "Multi-Court Construction creates one court area that supports more than one sport through shared surfacing, striping, equipment planning, and layout design.",
    },
    {
      question: "What sport combinations work best?",
      answer:
        "Popular combinations include pickleball and basketball, tennis and pickleball, basketball and volleyball, futsal and basketball, and larger multi-sport recreation complexes.",
    },
    {
      question: "Can one surface support multiple sports?",
      answer:
        "Yes, when the layout, striping colors, equipment placement, and safety zones are planned correctly. We help choose a surface that works for the sports you want most.",
    },
    {
      question: "Is a multi-court cheaper than separate courts?",
      answer:
        "Often yes, because one base, surface, and site prep package can support multiple activities. The final cost still depends on size, surface, fencing, lighting, and equipment.",
    },
    {
      question: "Do you build multi-court facilities for schools and HOAs?",
      answer:
        "Yes. Multi-Court Construction is a strong fit for schools, HOAs, parks, apartment communities, clubs, and commercial recreation facilities.",
    },
    {
      question: "Can an existing court become a multi-court?",
      answer:
        "In many cases, yes. Existing tennis, basketball, or recreation courts can often be restriped, expanded, or upgraded to support additional sports.",
    },
  ],
});

export const PM_CUSTOM_COURT_CONSTRUCTION_CONFIG = courtConstructionServiceConfig({
  slug: "custom-court-construction",
  serviceName: "Custom Court Construction",
  metaTitle: "Custom Athletic Court Construction | Design & Installation",
  metaDescription:
    "Bring your athletic court vision to life with custom court construction. Choose your layout, playing surface and court features to suit your space and sport.",
  heroTitle: "Custom Court Construction",
  heroSubtitle:
    "Custom court construction built around your property, sport mix, colors, surface system, and long-term use goals.",
  heroImageFragment: "backyard modular tile sport court custom logo",
  faqHeading: "Custom Court Construction Questions",
  faqItems: [
    {
      question: "What makes a court project custom?",
      answer:
        "Custom Court Construction covers unique layouts, color schemes, logos, multi-sport striping, specialty surfaces, fencing, lighting, and design details tailored to the property.",
    },
    {
      question: "What sports can you build custom courts for?",
      answer:
        "We build custom pickleball, basketball, tennis, volleyball, futsal, bocce, and multi-use courts for homes, schools, parks, clubs, and commercial properties.",
    },
    {
      question: "Can I choose custom colors and logos?",
      answer:
        "Yes. Custom colors, branded logos, specialty striping, and unique court graphics are available on many projects.",
    },
    {
      question: "Do you handle design and construction together?",
      answer:
        "Yes. Our design-build approach covers site planning, surface selection, layout, construction, striping, and finish details in one process.",
    },
    {
      question: "Are custom courts only for commercial clients?",
      answer:
        "No. Homeowners, HOAs, schools, clubs, resorts, and commercial facilities all use Custom Court Construction when they want a court built around specific goals.",
    },
    {
      question: "What surfaces can you use on a custom court?",
      answer:
        "We work with acrylic, cushioned acrylic, modular tile, hardwood, synthetic turf, asphalt, concrete, and other specialty court systems.",
    },
  ],
});

export const PM_COMMERCIAL_COURT_CONSTRUCTION_CONFIG = courtConstructionServiceConfig({
  slug: "commercial-court-construction",
  serviceName: "Commercial Court Construction",
  metaTitle: "Commercial Court Construction | Athletic Court Builders",
  metaDescription:
    "Develop durable athletic facilities with commercial court construction for schools, HOAs, parks and recreational properties. Discuss your project with us.",
  heroTitle: "Commercial Court Construction",
  heroSubtitle:
    "Commercial court construction for schools, parks, HOAs, clubs, resorts, apartment communities, and high-use recreation facilities.",
  heroImageFragment: "pickleball post tension concrete commercial court",
  faqHeading: "Commercial Court Construction Questions",
  faqItems: [
    {
      question: "Who do you build commercial courts for?",
      answer:
        "We build commercial courts for schools, universities, parks, recreation centers, HOAs, athletic clubs, resorts, apartment communities, churches, and municipal facilities.",
    },
    {
      question: "How is commercial court construction different?",
      answer:
        "Commercial courts usually need stronger planning for daily traffic, safety, access, durability, multi-user schedules, equipment, and long-term maintenance.",
    },
    {
      question: "Can you build multi-court commercial facilities?",
      answer:
        "Yes. Many commercial projects include multiple courts, shared recreation areas, lighting, fencing, seating, and multi-sport layouts.",
    },
    {
      question: "Do you work with schools and municipalities?",
      answer:
        "Yes. Hatz Court Builders provides Commercial Court Construction for school campuses, parks, public recreation spaces, and municipal athletic facilities.",
    },
    {
      question: "Can commercial courts include branding or logos?",
      answer:
        "Yes. Custom colors, logos, and branded striping are popular for schools, clubs, resorts, and commercial recreation centers.",
    },
    {
      question: "Do you offer resurfacing for commercial courts?",
      answer:
        "Yes. We help with commercial court resurfacing, repairs, restriping, renovations, equipment upgrades, and facility expansions.",
    },
  ],
});

export const PM_COURT_EXPANSION_CONFIG = courtConstructionServiceConfig({
  slug: "court-expansion",
  serviceName: "Court Expansion",
  metaTitle: "Athletic Court Expansion | Court Additions & Upgrades",
  metaDescription:
    "Need more playing space? Our athletic court expansion services help extend existing courts and accommodate additional recreational activities. Plan your upgrade.",
  heroTitle: "Court Expansion",
  heroSubtitle:
    "Court expansion for facilities that need more playing space, additional courts, multi-sport upgrades, or larger recreation areas.",
  heroImageFragment: "double pickleball court blue green surface",
  faqHeading: "Court Expansion Questions",
  faqItems: [
    {
      question: "What is court expansion?",
      answer:
        "Court Expansion adds playing space to an existing facility — new courts, larger layouts, multi-sport additions, or upgraded recreation areas connected to what you already have.",
    },
    {
      question: "Can you expand a backyard court?",
      answer:
        "Yes. Homeowners often expand a half court into a larger court, add pickleball lines, or create a multi-use recreation area beside an existing court.",
    },
    {
      question: "Can schools and HOAs expand existing courts?",
      answer:
        "Yes. Schools, HOAs, parks, and clubs commonly add courts, convert unused space, or enlarge recreation areas to support more players.",
    },
    {
      question: "Do you evaluate the existing court first?",
      answer:
        "Yes. We review the current surface, base, drainage, fencing, lighting, and available space before recommending expansion, resurfacing, or a rebuild.",
    },
    {
      question: "Can expansion include a different sport?",
      answer:
        "Yes. Many Court Expansion projects add pickleball, basketball, volleyball, futsal, bocce, or multi-court layouts next to an existing sport court.",
    },
    {
      question: "Is expansion always better than building new?",
      answer:
        "Not always. Expansion works well when the site and existing court are in good condition. If the base or drainage is failing, a rebuild or new court may be the better option.",
    },
  ],
});

export const PM_CUSTOM_COURT_DESIGN_CONFIG = courtConstructionServiceConfig({
  slug: "custom-court-design",
  serviceName: "Court Design",
  metaTitle: "Custom Court Design | Athletic Court Layout & Planning",
  metaDescription:
    "Plan your ideal athletic court with custom court design services. Explore layouts, surface materials and playing features suited to your space and intended use.",
  heroTitle: "Custom Court Design",
  heroSubtitle:
    "Custom court design that plans layout, drainage, surfacing, striping, fencing, lighting, and equipment before construction begins.",
  heroImageFragment: "basketball tile court custom logo branding",
  faqHeading: "Custom Court Design Questions",
  faqItems: [
    {
      question: "What is included in court design?",
      answer:
        "Court Design includes site planning, court layout, surface recommendations, color selection, striping plans, lighting design, fencing design, equipment placement, and multi-court planning.",
    },
    {
      question: "Why does court design matter before construction?",
      answer:
        "Good design prevents drainage problems, tight playing space, poor orientation, incorrect striping, and equipment placement issues that are expensive to fix later.",
    },
    {
      question: "Can you design multi-sport courts?",
      answer:
        "Yes. We design multi-court layouts with clear striping plans, shared equipment zones, and safety space for each sport.",
    },
    {
      question: "Do you design residential and commercial courts?",
      answer:
        "Yes. We provide Custom Court Design for backyard courts, school facilities, HOA amenities, parks, clubs, resorts, and commercial recreation spaces.",
    },
    {
      question: "Can design include custom colors and logos?",
      answer:
        "Yes. Color schemes, branded logos, specialty graphics, and unique striping layouts can be planned during the design phase.",
    },
    {
      question: "Do you handle construction after design?",
      answer:
        "Yes. Hatz Court Builders can take a project from Custom Court Design through full construction, surfacing, striping, and final walkthrough.",
    },
  ],
});

export const PM_ASPHALT_COURT_INSTALLATION_CONFIG = courtSurfacesServiceConfig({
  slug: "asphalt-court-installation",
  serviceName: "Asphalt Court Installation",
  metaTitle: "Asphalt Court Installation | Athletic Court Construction",
  metaDescription:
    "Create a durable foundation for tennis, basketball or pickleball with asphalt court installation. We build court bases with drainage and performance in mind.",
  heroTitle: "Asphalt Court Installation in Boise & Scottsdale",
  heroSubtitle:
    "Asphalt court installation for residential and commercial projects — a durable paved base for acrylic coatings, multi-sport layouts, and long-term outdoor play.",
  heroImageFragment: "tennis court resurface blue and green acrylic",
  faqHeading: "Asphalt Court Installation FAQs",
  faqItems: [
    {
      question: "What sports work on an asphalt court?",
      answer:
        "Asphalt is a strong base for tennis, pickleball, basketball, volleyball, futsal, and multi-use recreation courts when paired with the right coating or surface system.",
    },
    {
      question: "How long does asphalt court installation take?",
      answer:
        "Timelines vary with site prep, weather, and curing. Many residential projects move from prep to play-ready coating over several weeks; larger commercial builds can take longer.",
    },
    {
      question: "Do you install asphalt only, or full court systems?",
      answer:
        "We can install the asphalt base and complete the court with acrylic coatings, cushion systems, striping, fencing, and equipment as needed.",
    },
    {
      question: "Is asphalt better than concrete for outdoor courts?",
      answer:
        "Both can work well. Asphalt is often preferred for outdoor sport courts because it can be easier to slope for drainage and pair with acrylic surface systems. We recommend based on your site and sport.",
    },
    {
      question: "What does asphalt court installation typically cost?",
      answer:
        "Cost depends on size, grade work, drainage, thickness, access, and whether coatings or fencing are included. We provide project-specific quotes after a site review.",
    },
    {
      question: "Do you serve Idaho and Arizona?",
      answer:
        "Yes. Hatz Court Builders installs asphalt courts for homeowners, schools, HOAs, and commercial properties across the Boise and Scottsdale service areas.",
    },
  ],
});

export const PM_CONCRETE_COURT_INSTALLATION_CONFIG = courtSurfacesServiceConfig({
  slug: "concrete-court-installation",
  serviceName: "Concrete Court Installation",
  metaTitle: "Concrete Court Installation | Court Slabs & Foundations",
  metaDescription:
    "Build a stable foundation for your backyard or commercial athletic court with concrete court installation. Explore slabs suited to acrylic and modular surfaces.",
  heroTitle: "Concrete Court Installation in Boise & Scottsdale",
  heroSubtitle:
    "Concrete court installation for homes, schools, HOAs, and commercial facilities — stable slabs designed for acrylic systems, modular surfaces, and multi-sport play.",
  heroImageFragment: "pickleball post tension concrete commercial court",
  faqHeading: "Concrete Court Slab FAQs",
  faqItems: [
    {
      question: "When is concrete the right choice for a court?",
      answer:
        "Concrete is a strong option when you want a rigid slab, indoor-capable structure, or a base for modular tiles, acrylic coatings, or specialty indoor sports flooring.",
    },
    {
      question: "Can concrete courts be used outdoors?",
      answer:
        "Yes. Outdoor concrete courts need proper slope, joints, drainage, and a suitable surface coating or overlay for safe, consistent play.",
    },
    {
      question: "Do you pour post-tension concrete courts?",
      answer:
        "We plan concrete court slabs around your sport, climate, and site. Options may include reinforced or specialty slab systems when the project calls for them.",
    },
    {
      question: "How long before I can play on a concrete court?",
      answer:
        "Concrete needs curing time before coatings or overlays are applied. Total timeline depends on slab size, weather, and the finish system you choose.",
    },
    {
      question: "What is the typical price range?",
      answer:
        "Pricing depends on slab thickness, reinforcement, site grading, drainage, finish system, and accessories like fencing or lighting. We quote after evaluating the property.",
    },
    {
      question: "Can you resurface an existing concrete court?",
      answer:
        "Often yes. We can repair cracks, level low spots, and apply acrylic, cushioned, modular, or indoor surface systems over a sound concrete base.",
    },
  ],
});

export const PM_ACRYLIC_COURT_SYSTEMS_CONFIG = courtSurfacesServiceConfig({
  slug: "acrylic-court-systems",
  serviceName: "Acrylic Court Systems",
  metaTitle: "Acrylic Court Surfacing | Pickleball & Tennis Court Systems",
  metaDescription:
    "Enhance court performance with acrylic court systems for tennis, pickleball and multi-use play. Explore surface coatings, color options and traction.",
  heroTitle: "Acrylic Court Systems in Boise & Scottsdale",
  heroSubtitle:
    "Acrylic court systems that deliver color, traction, and weather-ready performance over asphalt or concrete bases for residential and commercial courts.",
  heroImageFragment: "tennis court resurface blue and green acrylic",
  faqHeading: "Acrylic Court Coating FAQs",
  faqItems: [
    {
      question: "What are acrylic court systems used for?",
      answer:
        "Acrylic systems are widely used on tennis, pickleball, basketball, and multi-use outdoor courts for color coating, texture, and consistent ball response.",
    },
    {
      question: "Can acrylic be applied over existing courts?",
      answer:
        "Yes, when the asphalt or concrete base is structurally sound. We repair cracks and surface issues before applying new acrylic layers.",
    },
    {
      question: "How long do acrylic court coatings last?",
      answer:
        "Lifespan depends on climate, usage, and maintenance. Many courts perform well for years before needing a refresh coat or full resurfacing.",
    },
    {
      question: "Do acrylic systems include cushion layers?",
      answer:
        "Standard acrylic is a hard-court finish. For more shock absorption, we can pair acrylic coatings with cushioned court systems.",
    },
    {
      question: "What colors and line options are available?",
      answer:
        "We offer a range of court colors and sport-specific striping, including multi-sport line layouts for shared recreation spaces.",
    },
    {
      question: "How much do acrylic court systems cost?",
      answer:
        "Cost varies with court size, number of coats, prep work, cushion options, and striping complexity. We provide clear quotes after a site assessment.",
    },
  ],
});

export const PM_SYNTHETIC_COURTS_CONFIG = courtSurfacesServiceConfig({
  slug: "synthetic-courts",
  serviceName: "Synthetic Courts",
  metaTitle: "Synthetic Athletic Courts | Turf & Specialty Surfaces",
  metaDescription:
    "Explore synthetic court installation for residential properties, training spaces and athletic facilities. Discover turf and specialty playing surface options.",
  heroTitle: "Synthetic Courts in Boise & Scottsdale",
  heroSubtitle:
    "Synthetic court surfaces for training, multi-sport recreation, and specialty play — engineered for consistent footing, lower maintenance, and year-round use.",
  heroImageFragment: "multicourt modular tile backyard installation",
  faqHeading: "Synthetic Court Surface FAQs",
  faqItems: [
    {
      question: "What are synthetic courts best for?",
      answer:
        "Synthetic systems are a strong fit for soccer training areas, multi-sport pads, specialty recreation courts, and projects that need consistent footing with manageable upkeep.",
    },
    {
      question: "Are synthetic courts only for outdoor use?",
      answer:
        "No. Some synthetic systems work indoors as well. For dedicated indoor athletic spaces, we also install indoor sports flooring systems.",
    },
    {
      question: "How do synthetic courts compare to acrylic?",
      answer:
        "Acrylic is typically preferred for traditional hard-court tennis and pickleball. Synthetic surfaces shine when you want turf-like play, training versatility, or a different sport feel.",
    },
    {
      question: "What maintenance do synthetic courts need?",
      answer:
        "Maintenance usually includes brushing, debris removal, and periodic inspections. Exact care depends on the product and how heavily the court is used.",
    },
    {
      question: "Can synthetic courts include custom markings?",
      answer:
        "Yes. We can plan sport lines, logos, and multi-use layouts into the design so the court supports the activities you need most.",
    },
    {
      question: "What is the typical project timeline?",
      answer:
        "Timelines depend on base prep, product selection, and weather. Many synthetic court installs complete faster than full pavement builds once the base is ready.",
    },
  ],
});

export const PM_MODULAR_COURT_SURFACES_CONFIG = courtSurfacesServiceConfig({
  slug: "modular-court-surfaces",
  serviceName: "Modular Court Surfaces",
  metaTitle: "Modular Court Surfaces | Interlocking Athletic Court Tiles",
  metaDescription:
    "Upgrade your playing area with modular court surfaces and interlocking athletic tiles. Explore versatile flooring options for backyard and commercial courts.",
  heroTitle: "Modular Court Surfaces",
  heroSubtitle: "Upgrade Your Athletic Court With Custom Interlocking Flooring Systems",
  heroImageFragment: "basketball tile court modular hoop goal",
  faqHeading: "Frequently Asked Questions About Interlocking Athletic Court Tiles",
  faqItems: [
    {
      question: "How much do sport court tiles cost per square foot?",
      answer:
        "For preliminary budgeting, professionally installed modular athletic court tiles may cost approximately $10.50 to $18 per square foot over an existing suitable foundation. A 1,500-square-foot backyard basketball court may require approximately $15,750 to $27,000 for modular flooring installation. New foundation construction, drainage, premium flooring systems, fencing, lighting, and athletic equipment may increase the total cost. Contact Hatz Court Builders for project-specific pricing.",
    },
    {
      question: "How long do sport court tiles last?",
      answer:
        "Many quality outdoor modular athletic tiles can remain functional for 15 years or longer when properly installed and maintained. Actual service life depends on material quality, UV exposure, seasonal temperatures, foundation stability, usage frequency, and maintenance. Individual damaged tiles may also be replaceable, depending on the system and availability of compatible components.",
    },
    {
      question: "Can sport court tiles be installed over existing concrete?",
      answer:
        "Yes. Many modular athletic flooring systems are designed for installation over suitable existing concrete surfaces. The slab should be structurally sound, sufficiently even, and properly drained. Significant cracks, settlement, heaving, or persistent standing water may require repairs before installation. The existing concrete must also meet the selected flooring manufacturer's requirements.",
    },
    {
      question: "Can you put sport court tiles directly on grass?",
      answer:
        "Most modular athletic court tiles should not be installed directly over grass for a permanent recreational court. Grass and underlying soil can shift, settle, retain moisture, and create uneven playing conditions. Concrete, asphalt, or a specifically approved alternative base is generally more suitable. Hatz Court Builders provides site preparation and foundation construction services for new modular athletic courts.",
    },
    {
      question: "Are modular tiles as good as acrylic for pickleball?",
      answer:
        "Modular tiles can be appropriate for recreational pickleball and certain multi-use courts, provided the product offers suitable ball response and traction. However, acrylic is generally preferred for traditional pickleball hardcourt performance. The best choice depends on the intended level of play, flooring specifications, available foundation, maintenance preferences, and budget. Hatz Court Builders offers both modular and acrylic systems.",
    },
  ],
});

export const PM_CUSHIONED_COURT_SYSTEMS_CONFIG = courtSurfacesServiceConfig({
  slug: "cushioned-court-systems",
  serviceName: "Cushioned Court Systems",
  metaTitle: "Cushioned Court Surfacing | Acrylic Athletic Court Systems",
  metaDescription:
    "Improve playing comfort with cushioned court systems for tennis, pickleball and multi-use courts. Explore acrylic surface options designed to absorb impact.",
  heroTitle: "Cushioned Court Systems in Boise & Scottsdale",
  heroSubtitle:
    "Cushioned court systems that add shock absorption under acrylic color coats — built for player comfort on tennis, pickleball, and multi-use outdoor courts.",
  heroImageFragment: "double pickleball court blue green surface",
  faqHeading: "Cushioned Court System FAQs",
  faqItems: [
    {
      question: "What is a cushioned court system?",
      answer:
        "A cushioned court system adds resilient layers beneath acrylic color coats to absorb impact, improve comfort, and support longer play sessions.",
    },
    {
      question: "Who benefits most from cushioned courts?",
      answer:
        "Players who want softer landings — recreational athletes, frequent tennis or pickleball players, clubs, and facilities focused on comfort and return play.",
    },
    {
      question: "Can cushioning be added to an existing court?",
      answer:
        "Yes, when the asphalt or concrete base is in good condition. We repair the surface first, then install the cushion and acrylic finish layers.",
    },
    {
      question: "Does cushioning change ball bounce?",
      answer:
        "Cushion layers can slightly soften the feel underfoot while still delivering a predictable hard-court response when installed correctly.",
    },
    {
      question: "How much more does a cushioned system cost?",
      answer:
        "Cushioned systems cost more than standard acrylic because of the added layers and labor. The upgrade is often worth it for comfort and player retention.",
    },
    {
      question: "Are cushioned courts only for tennis?",
      answer:
        "No. They are also popular for pickleball and multi-use outdoor courts where players want a more forgiving surface.",
    },
  ],
});

export const PM_INDOOR_SPORTS_FLOORING_CONFIG = courtSurfacesServiceConfig({
  slug: "indoor-sports-flooring",
  serviceName: "Indoor Sports Flooring",
  metaTitle: "Indoor Sports Flooring | Gymnasium & Athletic Court Flooring",
  metaDescription:
    "Create a functional indoor athletic space with sports flooring for gyms, schools and training facilities. Explore basketball and multi-use flooring options.",
  heroTitle: "Indoor Sports Flooring in Boise & Scottsdale",
  heroSubtitle:
    "Indoor sports flooring for gyms, schools, clubs, and training facilities — performance floors built for basketball, multi-sport play, and heavy daily use.",
  heroImageFragment: "outdoor multi court pickleball basketball",
  faqHeading: "Indoor Athletic Flooring FAQs",
  faqItems: [
    {
      question: "What types of indoor sports flooring do you install?",
      answer:
        "We install indoor systems suited to basketball, multi-sport gyms, training spaces, and recreation facilities — including modular and specialty athletic flooring options.",
    },
    {
      question: "Can indoor flooring support multiple sports?",
      answer:
        "Yes. Many gym and recreation floors are designed for basketball, volleyball, futsal, and multi-sport striping in one space.",
    },
    {
      question: "How long does indoor sports flooring installation take?",
      answer:
        "Indoor timelines depend on slab condition, product type, and facility access. Many projects are scheduled around school or club calendars to minimize downtime.",
    },
    {
      question: "Do you work in existing gyms and new builds?",
      answer:
        "Yes. We install flooring in new construction and upgrade existing indoor athletic spaces when the slab and moisture conditions are suitable.",
    },
    {
      question: "What maintenance does indoor sports flooring need?",
      answer:
        "Most systems need regular cleaning, periodic inspections, and care guidelines specific to the flooring product. We review maintenance expectations before install.",
    },
    {
      question: "What affects indoor sports flooring cost?",
      answer:
        "Cost depends on square footage, flooring system, moisture mitigation, line striping, logos, and any required floor prep. We provide project-specific pricing.",
    },
  ],
});

export const PM_COURT_BUILDERS_BOISE_CONFIG = courtBuilderCityConfig({
  slug: "court-builders-boise-id",
  cityName: "Boise",
  heroTitle: "Court Builder Boise, ID",
  heroSubtitle: "Custom Athletic Courts Built for Boise Homes and Facilities",
  metaTitle: "Court Builders Boise, ID | Custom Athletic Court Construction",
  metaDescription:
    "Build your ideal athletic court with Hatz Court Builders in Boise, ID. We specialize in pickleball, basketball, tennis and multi-use courts. Request a quote.",
  heroImageFragment: "backyard gray basketball court installation",
  faqHeading: "What to Know Before Hiring a Court Builder in Boise",
  faqItems: [
    {
      question: "How much does it cost to build a backyard sports court?",
      answer:
        "For preliminary budgeting, a custom backyard athletic court in Boise may require approximately $30,000 to $90,000, depending on its dimensions, playing surface, foundation, and additional features. Smaller recreational courts may require a lower budget, while larger multi-sport facilities with extensive groundwork, lighting, and fencing may cost more. These figures include a conservative planning allowance rather than representing fixed installation rates. Contact Hatz Court Builders for project-specific pricing.",
    },
    {
      question: "What is the best surface for an outdoor sports court?",
      answer:
        "Standard acrylic is commonly used for outdoor tennis, pickleball, and basketball hardcourts because it can provide consistent ball response and suitable playing characteristics. Cushioned acrylic offers an alternative for customers seeking additional surface resilience, while modular flooring can be appropriate for certain recreational and multi-use courts. In Boise, the surface should also be selected with consideration for freezing temperatures, drainage, expected usage, and foundation conditions.",
    },
    {
      question: "How much space do you need for a backyard sports court?",
      answer:
        "The space required depends on the sports you want to play. A compact basketball practice court can be customized around a smaller yard, while a standard pickleball court measures 20 by 44 feet and typically needs additional surrounding space. A total playing surface of approximately 30 by 60 feet is a common minimum planning reference for pickleball. Multi-use and tennis courts may require larger construction footprints.",
    },
    {
      question: "How long does it take to build a sports court?",
      answer:
        "Athletic court construction can take several weeks or longer, depending on the court dimensions, site preparation, foundation requirements, surfacing system, and weather. Projects involving concrete bases must also allow appropriate curing before subsequent surface installation. Larger commercial facilities, extensive grading, drainage improvements, lighting, and fencing may increase the construction timeline.",
    },
    {
      question: "Can you build a sports court for multiple sports?",
      answer:
        "Yes. A custom multi-use court can accommodate basketball, pickleball, volleyball, and other compatible recreational activities when the dimensions, equipment, surface, and markings are planned accordingly. Different line colors and removable net systems can help distinguish between sports. Hatz Court Builders designs and constructs multi-use athletic courts for Boise homeowners, schools, parks, and commercial properties.",
    },
  ],
});

export const PM_PICKLEBALL_COURT_BUILDER_BOISE_ID_CONFIG = courtBuilderCityConfig({
  slug: "pickleball-court-builder-boise-id",
  cityName: "Boise",
  serviceName: "Pickleball Court Builder Boise, Idaho",
  heroTitle: "Pickleball Court Builder Boise, Idaho",
  heroSubtitle: "Bring Pickleball Into Your Boise Backyard or Recreation Facility",
  metaTitle: "Pickleball Court Builder Boise, Idaho | Custom Court Installation",
  metaDescription:
    "Looking for a pickleball court builder in Boise, Idaho? We provide custom court installation, acrylic surfacing and repairs. Start planning your court.",
  heroImageFragment: "backyard pickleball court pool patio residential",
  faqHeading: "Your Boise Pickleball Court Questions, Answered Before Construction",
  faqItems: [
    {
      question: "What are the standard dimensions for a pickleball court?",
      answer:
        "A regulation pickleball playing area measures 20 feet wide by 44 feet long. Additional space around the court is recommended so players can move beyond the boundary lines during games. The final layout should account for the available property space.",
    },
    {
      question: "Can a pickleball court be installed in a Boise backyard?",
      answer:
        "Yes. Hatz Court Builders provides residential pickleball court construction in Boise. The size and layout of your backyard will help determine whether a dedicated court can fit and what site preparation may be required.",
    },
    {
      question: "What is the difference between acrylic and cushioned pickleball courts?",
      answer:
        "Standard acrylic provides a firm playing surface, while cushioned acrylic includes added layers that create a different feel underfoot. Hatz Court Builders offers both options for custom court projects.",
    },
    {
      question: "Can an existing tennis court be turned into a pickleball playing area?",
      answer:
        "Some tennis courts can accommodate pickleball markings or a modified playing layout. The available options depend on the existing court dimensions, surface condition, and intended use. Our team provides court renovations and striping services.",
    },
    {
      question: "Does Hatz Court Builders repair damaged pickleball courts in Boise?",
      answer:
        "Yes. We offer court resurfacing, repairs, and renovations. The type of work needed depends on the existing surface, the extent of the damage, and the improvements planned.",
    },
    {
      question: "Can you build multiple pickleball courts for a school or community facility?",
      answer:
        "Yes. We provide commercial court construction for schools, parks, and other recreational properties. Projects can include multiple playing areas and related features such as fencing, lighting, and court markings.",
    },
    {
      question: "Are pickleball court installs available outside Boise, Idaho?",
      answer:
        "Yes. Our Idaho service areas include Meridian, Eagle, Nampa, Caldwell, Kuna, Star, Middleton, Twin Falls, and nearby communities.",
    },
    {
      question: "How do I start planning a pickleball court installation in Boise?",
      answer:
        "Contact Hatz Court Builders at (208) 979-0002 or info@hatzcourtbuilders.com. Tell us about your property, the type of court you want, and any additional features you're interested in so we can discuss your project.",
    },
  ],
});

export const PM_COURT_BUILDER_MERIDIAN_CONFIG = courtBuilderCityConfig({
  slug: "court-builder-meridian-id",
  cityName: "Meridian",
  heroTitle: "Court Builder Meridian, ID",
  heroSubtitle: "Custom Playing Spaces Built Around Your Meridian Property",
  metaTitle: "Court Builder Meridian, ID | Court Design & Installation",
  metaDescription:
    "Create a custom athletic court with our court builders in Meridian, ID. We handle court design, construction, resurfacing and upgrades. Discuss your project.",
  heroImageFragment: "backyard pickleball basketball dual sport court",
  faqHeading: "Common Questions About Custom Court Construction in Meridian",
  faqItems: [
    {
      question: "How much does it cost to build a backyard court?",
      answer:
        "A professionally constructed backyard athletic court may require a preliminary budget of approximately $30,000 to $75,000, depending on the court size, foundation requirements, surface material, and additional features. Larger courts, extensive grading, lighting, and fencing may increase the total cost. An individual construction proposal is needed to determine the cost of your Meridian project.",
    },
    {
      question: "How much space do you need for a backyard court?",
      answer:
        "The required space depends on the sport and intended playing layout. A regulation pickleball court measures 20 by 44 feet, with a minimum total playing surface of 30 by 60 feet. Basketball shooting courts and recreational half-courts can be customized for smaller properties, while tennis requires a larger footprint and additional playing clearance.",
    },
    {
      question: "Is concrete or asphalt better for an outdoor athletic court?",
      answer:
        "Both concrete and asphalt can provide suitable foundations when properly designed and constructed. Concrete provides a rigid base, while asphalt is a more flexible pavement material. The best option depends on soil conditions, drainage, the selected athletic surface, construction requirements, and long-term maintenance considerations.",
    },
    {
      question: "How long does it take to build a backyard court?",
      answer:
        "Custom backyard court construction can take several weeks, with the overall schedule depending on site preparation, foundation installation, curing requirements, surface application, equipment installation, and weather. HOA approvals and applicable permits may also affect the start date. Renovations over suitable existing foundations may require less time than entirely new construction.",
    },
    {
      question: "Do you need a permit to build a backyard court in Meridian, Idaho?",
      answer:
        "Permit requirements depend on the construction scope and property location. Certain electrical installations, fencing, grading, or structural components may require municipal review. Homeowners living in planned communities may also need HOA approval. Confirm applicable requirements with the City of Meridian and your homeowners association before construction begins.",
    },
  ],
});

export const PM_COURT_BUILDER_NAMPA_CONFIG = courtBuilderCityConfig({
  slug: "court-builder-nampa-id",
  cityName: "Nampa",
  metaTitle: "Nampa Court Builders | Custom Athletic Court Construction",
  metaDescription:
    "Upgrade your property with custom athletic court construction in Nampa, ID. From new installations to court resurfacing, we bring your vision to life.",
  heroImageFragment: "multi sport outdoor backyard court",
  faqItems: [
    {
      question: "What should I look for in a Nampa court builder?",
      answer:
        "Look for a licensed and insured court builder with real experience in layout planning, surface options, drainage, and full court construction. A good builder should explain how the court will fit your property, what material options make sense, and how the court will hold up over time. Hatz Court Builders brings more than 15 years of court construction experience to residential and commercial projects.",
    },
    {
      question: "Can Hatz Court Builders build pickleball courts Nampa homeowners can use year-round?",
      answer:
        "Yes, Hatz Court Builders can design and build pickleball courts for backyards, HOA spaces, schools, and other properties in Nampa. Outdoor courts need the right layout, surface system, drainage plan, and line striping so the court plays well through hot summers and colder months. The team can also help with net system installation, color choices, and multi-use layouts.",
    },
    {
      question: "What surface works best for tennis courts in Nampa?",
      answer:
        "Tennis courts in Nampa need careful surface planning because sun, temperature changes, drainage, and ground movement can affect long-term play. Hatz Court Builders can help compare acrylic court systems, cushioned acrylic options, resurfacing needs, and line layouts based on the court’s use. Proper planning helps reduce early wear, standing water, and poor ball response.",
    },
    {
      question: "Can one court be used for basketball, pickleball, and volleyball?",
      answer:
        "Yes, many Nampa customers choose multi-use court construction when they want one space for several sports. Hatz Court Builders can plan court layout design, line striping, equipment placement, and surface choices so the court stays clean and easy to use. This is a good option for families, schools, parks, and HOA community courts.",
    },
    {
      question: "When should an older court be resurfaced instead of replaced?",
      answer:
        "Court resurfacing may be a good fit when the base is still solid but the surface has fading, small cracks, worn coatings, or outdated game lines. If the court has major drainage issues, large structural cracks, or uneven areas, more repair work may be needed first. Hatz Court Builders can review the court and explain whether resurfacing, crack repair, court restoration, or a new build makes more sense.",
    },
    {
      question: "Do you work on commercial court construction in Nampa?",
      answer:
        "Yes, Hatz Court Builders works with commercial clients, schools, athletic facilities, parks, and HOA communities. Commercial courts often need strong planning for daily use, safety, game lines, equipment, and long-term surface performance. The team can help with commercial court construction, resurfacing, components, and court conversions.",
    },
    {
      question: "What court surface options are available?",
      answer:
        "Hatz Court Builders offers several court system options, including acrylic courts, cushioned acrylic court systems, hardwood court surfaces, modular tile court systems, synthetic court surfaces, and vinyl court surfaces. The best choice depends on whether the court is indoor or outdoor, what sports will be played, how often it will be used, and what feel the customer wants. The team helps match the surface to the property and sport.",
    },
    {
      question: "How does the court construction process start?",
      answer:
        "The first step is a site review, where Hatz Court Builders looks at the property, measures the space, talks through the court type, and checks layout needs. From there, the team can prepare a design plan, material options, pricing, and a build path. This gives the customer a clear view of what the finished court can look like before construction starts.",
    },
  ],
});

export const PM_COURT_BUILDER_CALDWELL_CONFIG = courtBuilderCityConfig({
  slug: "court-builder-caldwell-id",
  cityName: "Caldwell",
  metaTitle: "Court Builder Caldwell, ID | Residential & Commercial Courts",
  metaDescription:
    "Plan your next athletic court with our court builders in Caldwell, ID. We provide residential and commercial court design, installation and resurfacing.",
  heroImageFragment: "outdoor pickleball court red and green surface",
  faqItems: [
    {
      question: "What surface works best for outdoor courts in Caldwell?",
      answer:
        "Many outdoor courts in Caldwell work well with acrylic court systems because they offer a clean playing surface, strong color options, and good performance for tennis, basketball, pickleball, and multi-use play. The right surface also depends on drainage, sun exposure, the sport, and how often the court will be used. Hatz Court Builders reviews these details before making a surface recommendation.",
    },
    {
      question: "Can you build Caldwell pickleball courts for backyard use?",
      answer:
        "Yes, Hatz Court Builders can design and build Caldwell pickleball courts for backyards, residential communities, schools, and other properties. We look at the available space, court orientation, access, surface type, net system, and line striping so the court feels right for daily play. Pickleball can also be added as part of a multi-use court.",
    },
    {
      question: "Do Caldwell courts need special drainage planning?",
      answer:
        "Drainage planning is a key part of court construction in Caldwell because water that sits on or near a court can lead to surface wear, cracking, soft spots, and unsafe play. Some properties also have slope, irrigation runoff, or soil that needs careful prep. A site review helps identify these issues before construction starts.",
    },
    {
      question: "Can an old court be resurfaced instead of rebuilt?",
      answer:
        "In many cases, an older court can be resurfaced if the base is still stable and the damage is mostly on the surface. Court resurfacing may include cleaning, crack repair, surface recoating, line updates, color changes, and surface sealing. If the base has major movement or drainage problems, a larger repair or rebuild may be the better path.",
    },
    {
      question: "Do you build courts for schools, HOAs, and parks near Caldwell?",
      answer:
        "Yes, Hatz Court Builders works on commercial court construction for schools, HOAs, parks, athletic facilities, and other shared-use spaces. These projects often need clear layouts, durable surfaces, safe spacing, and components that can handle steady use. We help plan the court around the type of players and the amount of traffic the court will get.",
    },
    {
      question: "Can one court be used for more than one sport?",
      answer:
        "Yes, a multi-use court can be built for several sports when the layout is planned well. Common options include basketball with pickleball, tennis with pickleball, or volleyball lines added to a larger court area. The key is placing game lines, equipment, and surface choices in a way that keeps the court easy to use.",
    },
    {
      question: "How long does a custom court project take?",
      answer:
        "The timeline depends on the size of the court, site prep, surface type, weather, materials, and whether the project is new construction or resurfacing. A simple resurfacing project is usually faster than a full custom court build. Hatz Court Builders gives a clearer timeline after the site review and design plan are complete.",
    },
    {
      question: "What should I know before calling a court builder in Caldwell?",
      answer:
        "It helps to know the sports you want to play, the space you have available, and whether the court will be for home, school, HOA, or commercial use. You do not need to have the layout or materials figured out first. Hatz Court Builders can review your property, explain the options, and help you choose a court system that fits your goals.",
    },
  ],
});

export const PM_COURT_BUILDER_MIDDLETON_CONFIG = courtBuilderCityConfig({
  slug: "court-builder-middleton-id",
  cityName: "Middleton",
  metaTitle: "Court Builder Middleton, ID | Construction & Resurfacing",
  metaDescription:
    "Transform your outdoor space with custom athletic courts in Middleton, ID. We provide complete court construction, resurfacing and repairs. Get a quote.",
  heroImageFragment: "pickleball court green blue backyard",
  faqItems: [
    {
      question: "What should I plan for before building a court in Middleton?",
      answer:
        "Before building a court in Middleton, think about the sport, court size, access, slope, drainage, and how often the court will be used. Local lots can vary a lot, so a site review helps decide the right surface, layout, and prep work. Hatz Court Builders can review the property and explain which options fit the space best.",
    },
    {
      question: "Can one court be used for tennis, pickleball, and basketball?",
      answer:
        "Yes, a multi-use court can be planned for several sports when the layout is designed the right way. The key is choosing court dimensions, line colors, hoop locations, net systems, and surface type before construction starts. This helps the court feel clean and easy to use instead of crowded or confusing.",
    },
    {
      question: "What court surface works well for outdoor use in Idaho?",
      answer:
        "Acrylic court systems are often used for outdoor courts because they offer a clean playing surface, strong color options, and good performance for several sports. Modular court surfaces may also work well for some homes, schools, and HOA areas. The best choice depends on the sport, budget, drainage, and how much maintenance the owner wants.",
    },
    {
      question: "Do Middleton courts need drainage planning?",
      answer:
        "Yes, drainage planning matters for outdoor courts in Middleton. Rain, irrigation runoff, snow melt, and freeze-thaw conditions can lead to puddles, cracking, and surface damage if water is not handled well. Proper grading, base prep, surface sealing, and layout planning help the court last longer.",
    },
    {
      question: "Can Hatz Court Builders resurface an older court?",
      answer:
        "Yes, Hatz Court Builders provides court resurfacing, surface recoating, crack repair, layout updates, and court restoration. If the base is still in good shape, resurfacing can improve play, color, grip, and overall appearance. A site review helps decide whether the court needs repairs, new coatings, or a larger restoration.",
    },
    {
      question: "Do you build courts for schools, parks, and HOAs near Middleton?",
      answer:
        "Yes, Hatz Court Builders works on commercial courts for schools, parks, HOA communities, athletic facilities, and local recreation spaces. These projects may need careful planning for traffic, safety, sport layout, components, and long-term surface wear. The team can build or upgrade courts for both daily use and shared community play.",
    },
    {
      question: "How long does a custom court project take?",
      answer:
        "The timeline depends on the size of the court, site prep, surface type, weather, materials, and project scope. A simple resurfacing job is different from a full custom court construction project with grading, components, surfacing, and striping. Hatz Court Builders gives a clearer timeline after reviewing the site and final design.",
    },
    {
      question: "Can I choose court colors and game lines?",
      answer:
        "Yes, Hatz Court Builders offers color customization and line striping for tennis, basketball, pickleball, volleyball, and multi-use courts. The team can help choose colors that look good on the property and keep the game lines easy to read. This is helpful for backyard courts, school courts, park courts, and HOA community courts.",
    },
  ],
});

export const PM_COURT_BUILDER_STAR_CONFIG = courtBuilderCityConfig({
  slug: "court-builder-star-id",
  cityName: "Star",
  metaTitle: "Court Builder Star, ID | Pickleball, Tennis & Basketball",
  metaDescription:
    "Create a dedicated space for your favorite sports with our court builders in Star, ID. Explore custom pickleball, tennis, basketball and multi-use courts.",
  heroImageFragment: "pickleball court backyard modular tile",
  faqItems: [
    {
      question: "What should I plan before building a court in Star, Idaho?",
      answer:
        "Start with the space, slope, drainage, sport use, and nearby landscaping or irrigation. Star properties can have grading and water flow issues that need to be checked before the base and surface are planned. A good court plan should also include safe play zones, court orientation, surface type, and any hoops, nets, posts, or accessories.",
    },
    {
      question: "Can one court be used for tennis, basketball, and pickleball?",
      answer:
        "Yes, many Star property owners choose a multi-use court when they want more play options in one space. The layout has to be planned with the right court size, line striping, color breaks, and equipment placement. Hatz Court Builders can help decide which sports work best together based on the space you have.",
    },
    {
      question: "What court surface works best for Idaho weather?",
      answer:
        "Acrylic court systems, cushioned acrylic court systems, modular court surfaces, and other synthetic court surfaces can all work well when matched to the property and use. Idaho heat, winter cold, and freeze-thaw cycles make base prep, drainage, surface sealing, and material choice very important. The best option depends on your sport, budget, maintenance goals, and whether the court is indoor or outdoor.",
    },
    {
      question: "Do you build both residential and commercial courts?",
      answer:
        "Yes. Hatz Court Builders builds residential courts for backyards and private properties, plus commercial courts for schools, parks, HOAs, athletic facilities, and recreation spaces. Commercial projects often need stronger planning for traffic, access, safety, and long-term surface wear.",
    },
    {
      question: "Can an old court be resurfaced instead of rebuilt?",
      answer:
        "Sometimes, yes. If the base is still in good condition, court resurfacing, surface recoating, crack repair, court restoration, or layout updates may be a good fit. If the court has major settling, deep cracking, or drainage problems, more repair work may be needed before a new finish is added.",
    },
    {
      question: "How long does a custom court project take?",
      answer:
        "The timeline depends on the court size, surface type, weather, site prep needs, and whether the project includes components like hoops, nets, posts, hardware, or accessories. A simple resurfacing project is usually different from a full design and build project. Hatz Court Builders can give a clearer schedule after the site visit and court plan.",
    },
    {
      question: "Can you help with color customization and game lines?",
      answer:
        "Yes. Hatz Court Builders can help with color customization, professional coating systems, court finishing, and line striping for tennis, basketball, pickleball, volleyball, or multi-use courts. Clear color breaks and accurate lines make the court easier to use and give it a clean finished look.",
    },
    {
      question: "Do I need drainage planning for a backyard court in Star?",
      answer:
        "Yes, drainage should be part of the plan for most outdoor courts. Standing water can lead to surface wear, slick spots, cracking, and early repairs. Proper grading, base prep, and surface planning help the court perform better through Boise-area storms, irrigation runoff, and winter freeze-thaw cycles.",
    },
  ],
});

export const PM_COURT_BUILDER_EAGLE_CONFIG = courtBuilderCityConfig({
  slug: "court-builder-eagle-id",
  cityName: "Eagle",
  metaTitle: "Eagle Court Builders | Custom Athletic Court Design & Build",
  metaDescription:
    "Bring your athletic court project to life with court builders in Eagle, ID. We handle custom design, construction, resurfacing and repairs. Plan your build.",
  heroImageFragment: "pickleball court hoa community blue gray",
  faqItems: [
    {
      question: "What kind of courts can Hatz Court Builders build in Eagle?",
      answer:
        "Hatz Court Builders can design and build tennis courts, basketball courts, pickleball courts, volleyball courts, multi-use courts, residential courts, commercial courts, acrylic courts, hardwood courts, and modular courts. The right option depends on your property, sport goals, surface preference, and how often the court will be used.",
    },
    {
      question: "How does Eagle weather affect outdoor court construction?",
      answer:
        "Eagle courts need good base prep, drainage planning, surface protection, and material selection because outdoor courts deal with sun, seasonal temperature swings, rain, snow, and freeze-thaw cycles. A court that is not planned for those conditions may crack, hold water, or wear down sooner than expected.",
    },
    {
      question: "Can an older court in Eagle be resurfaced instead of rebuilt?",
      answer:
        "Yes, many older courts can be resurfaced if the base is still stable and the damage is mostly on the playing surface. Hatz Court Builders can review the court for cracking, low spots, coating wear, fading, and layout needs before recommending resurfacing, crack repair, court restoration, or a larger rebuild.",
    },
    {
      question: "Do you build backyard courts for homes in Eagle?",
      answer:
        "Yes, Hatz Court Builders builds backyard courts for homeowners who want a private space for basketball, pickleball, tennis, volleyball, or multi-sport play. The layout is planned around yard size, access, slope, drainage, family use, and the style of the home.",
    },
    {
      question: "What surface is best for a custom court in Eagle?",
      answer:
        "The best surface depends on the sport, budget, maintenance goals, and whether the court is indoor or outdoor. Acrylic court systems are common for outdoor play, cushioned acrylic courts add more comfort, modular tile court systems work well for many multi-use courts, and hardwood court surfaces are often used indoors.",
    },
    {
      question: "Can one court be used for more than one sport?",
      answer:
        "Yes, Hatz Court Builders can plan multi-use court construction with layout updates, line striping, court conversions, net systems, hoops, posts, and hardware. This is a strong option for Eagle families, schools, HOAs, and recreation spaces that want more play from one court.",
    },
    {
      question: "How long does a court project take?",
      answer:
        "The timeline depends on court size, surface type, site prep, weather, equipment needs, and whether the project is new construction, resurfacing, or repair. After the site visit, Hatz Court Builders can give a clearer schedule based on the property and court design.",
    },
    {
      question: "Does Hatz Court Builders serve areas outside Eagle?",
      answer:
        "Yes, Hatz Court Builders serves Eagle, Boise, Meridian, Nampa, Star, Caldwell, Middleton, Kuna, and other Idaho communities. The company works with both residential and commercial clients across the Treasure Valley and nearby service areas.",
    },
  ],
});

export const PM_COURT_BUILDER_SCOTTSDALE_AZ_CONFIG = courtBuilderCityConfig({
  slug: "court-builder-scottsdale-az",
  cityName: "Scottsdale",
  stateName: "Arizona",
  heroTitle: "Court Builder Scottsdale, AZ",
  heroSubtitle: "Create a Custom Playing Space for Your Scottsdale Property",
  metaTitle: "Court Builder Scottsdale, AZ | Custom Athletic Court Construction",
  metaDescription:
    "Build an athletic court suited to Arizona's climate with our court builders in Scottsdale, AZ. Explore custom layouts, durable surfaces and installation.",
  heroImageFragment: "outdoor multi court acrylic surfacing",
  faqHeading: "What Scottsdale Property Owners Ask Before Investing in an Athletic Court",
  faqItems: [
    {
      question: "How much does it cost to build a backyard sports court?",
      answer:
        "For preliminary budgeting, a professionally constructed backyard athletic court in the Scottsdale area may require approximately $30,000 to $112,500 or more, including a conservative planning allowance. The total depends on court dimensions, foundation requirements, surface materials, drainage, equipment, fencing, and lighting. Luxury residential developments or properties requiring extensive groundwork may need a larger budget. Contact Hatz Court Builders for project-specific pricing.",
    },
    {
      question: "How much space do you need for a backyard sports court?",
      answer:
        "The required space depends on the sports you want to accommodate. A compact basketball practice court can be customized around a smaller backyard, while a standard pickleball court measures 20 by 44 feet and typically needs a total playing surface of at least 30 by 60 feet. Tennis courts require a larger footprint. Scottsdale homeowners should also account for setbacks, fencing, player clearance, and existing outdoor features.",
    },
    {
      question: "What is the best surface for an outdoor sports court?",
      answer:
        "Standard acrylic is commonly used for outdoor tennis, pickleball, and basketball because it can provide consistent ball response and suitable playing characteristics. Cushioned acrylic offers an alternative with additional resilient layers, while modular flooring may be suitable for certain multi-use recreational courts. In Scottsdale, material selection should also consider UV exposure, surface temperatures, drainage, and long-term maintenance requirements.",
    },
    {
      question: "How long does it take to install a backyard sports court?",
      answer:
        "A complete backyard athletic court can take several weeks or longer, depending on the court size, ground preparation, foundation construction, surface system, and additional features. Concrete curing, permits, material availability, and weather conditions may affect the installation schedule. Scottsdale's summer heat and monsoon season should also be considered when planning construction activities.",
    },
    {
      question: "How do you maintain an outdoor sports court?",
      answer:
        "Regular outdoor court maintenance includes removing dust and debris, checking for cracks or worn coatings, monitoring drainage, and inspecting sports equipment and fencing. Cleaning methods should be appropriate for the installed surface system. In Scottsdale, periodic inspections following monsoon storms and prolonged summer heat can help identify concerns before more extensive repairs are needed.",
    },
  ],
});

export const PM_TENNIS_COURT_CONTRACTOR_SCOTTSDALE_AZ_CONFIG = courtBuilderCityConfig({
  slug: "tennis-court-contractor-scottsdale-az",
  cityName: "Scottsdale",
  stateName: "Arizona",
  metaTitle: "Tennis Court Contractor Scottsdale, AZ | Construction & Resurfacing",
  metaDescription:
    "Work with a tennis court contractor in Scottsdale, AZ, for new court construction, resurfacing and repairs. Customize your court layout and playing surface.",
  heroImageFragment: "tennis court resurface blue and green acrylic",
  faqItems: [
    {
      question: "How does Scottsdale heat affect tennis court construction?",
      answer:
        "Scottsdale heat can be hard on court surfaces, coatings, color, and crack control. A good build starts with proper site prep, drainage review, and surface selection for outdoor use.",
    },
    {
      question: "Can you build a tennis court in a Scottsdale backyard with limited space?",
      answer:
        "Yes. Many residential courts are planned around tight or custom spaces with adjusted layouts or multi-use planning.",
    },
    {
      question: "What surface works best for an outdoor tennis court in Arizona?",
      answer:
        "Acrylic courts are a common choice for outdoor tennis, and cushioned acrylic systems can add comfort. The right choice depends on use, budget, shade, and maintenance goals.",
    },
    {
      question: "Do you handle tennis court resurfacing and repairs?",
      answer:
        "Yes, Hatz Court Builders handles court resurfacing, crack repair, surface recoating, court restoration, layout updates, and court conversions. Resurfacing can help when the court has fading, worn texture, light cracking, or outdated game lines. Larger structural issues may need deeper repair before the new finish is applied.",
    },
    {
      question: "Can one court be used for tennis and pickleball?",
      answer:
        "Yes, many Scottsdale property owners want one court for more than one sport. A multi-use layout can include tennis, pickleball, basketball, volleyball, or other game lines when the space allows it. Careful line planning keeps the court useful without making the surface feel cluttered.",
    },
    {
      question: "Do you build courts for schools, HOAs, and commercial sites?",
      answer:
        "Yes, Hatz Court Builders works on school courts, HOA community courts, park courts, athletic facility courts, and other commercial courts. These projects often need strong surfaces, clear layouts, safe access, and components made for frequent use. Planning also includes how the court will be used by groups, students, residents, or guests.",
    },
    {
      question: "What happens during the first court construction visit?",
      answer:
        "The first visit usually includes a site review, measurements, access check, surface discussion, and project goals. The team looks at slope, drainage, space, and the type of court you want. This gives the project a better starting point before pricing and design details are set.",
    },
    {
      question: "Can an old tennis court be changed into a pickleball court?",
      answer:
        "Yes, many older tennis courts can be updated for pickleball through layout updates, line striping, surface repair, and net system changes. The existing court condition matters because cracks, low spots, or worn coatings should be addressed first. A site review will show whether resurfacing or deeper repairs are needed before the conversion.",
    },
  ],
});

export const PM_BASKETBALL_COURT_INSTALLATION_SCOTTSDALE_AZ_CONFIG = courtBuilderCityConfig({
  slug: "basketball-court-installation-scottsdale-az",
  cityName: "Scottsdale",
  stateName: "Arizona",
  serviceName: "Basketball Court Installation Scottsdale",
  heroTitle: "Basketball Court Installation Scottsdale, AZ",
  heroSubtitle:
    "Basketball court installation for Scottsdale homes, schools, HOAs, and commercial sites, built for desert heat and daily play.",
  metaTitle: "Basketball Court Installation Scottsdale, AZ | Custom Courts",
  metaDescription:
    "Create a backyard or facility basketball court in Scottsdale, AZ. We install custom basketball courts with acrylic and modular surfaces. Request a quote.",
  faqHeading: "Scottsdale Basketball Court Installation Questions",
  heroImageFragment: "backyard green tan basketball half court",
  faqItems: [
    {
      question: "Do you offer basketball court installation in Scottsdale?",
      answer:
        "Yes. Hatz Court Builders installs basketball courts for residential and commercial properties in Scottsdale and nearby Maricopa County communities.",
    },
    {
      question: "Can you build a half-court basketball pad in a smaller Scottsdale yard?",
      answer:
        "Yes. Many Scottsdale homes use a half-court or multi-use layout when space is limited. We measure the lot and plan a safe playing area with the right run-off.",
    },
    {
      question: "What surfaces do you use for outdoor basketball courts in Scottsdale?",
      answer:
        "Common options include acrylic systems, cushioned acrylic, modular tiles, asphalt bases, and concrete pads. We match the surface to heat exposure, use level, and budget.",
    },
    {
      question: "Do you resurface worn basketball courts in Scottsdale?",
      answer:
        "Yes. We handle court resurfacing, crack repair, recoating, and new striping when the existing pad is still sound enough for an update.",
    },
    {
      question: "Do you work with homeowners, schools, and HOAs?",
      answer:
        "Yes. We build for homeowners, schools, parks and recreation sites, HOAs, and other commercial properties that need basketball or multi-use courts.",
    },
    {
      question: "How do I get a free quote for basketball court installation in Scottsdale?",
      answer:
        "Call (208) 979-0002 or send a request online. Share your Scottsdale location, preferred court size, and surface goals so we can plan the next step.",
    },
    {
      question: "What nearby cities do you serve from Scottsdale?",
      answer:
        "We serve Scottsdale plus Fountain Hills, Phoenix, Mesa, Gilbert, Chandler, Tempe, and other Maricopa County communities.",
    },
  ],
});

export const PM_PICKLEBALL_COURT_INSTALLATION_SCOTTSDALE_AZ_CONFIG = courtBuilderCityConfig({
  slug: "pickleball-court-installation-scottsdale-az",
  cityName: "Scottsdale",
  stateName: "Arizona",
  serviceName: "Pickleball Court Installation Scottsdale",
  heroTitle: "Pickleball Court Installation Scottsdale, AZ",
  heroSubtitle:
    "Pickleball court installation for Scottsdale backyards, HOAs, schools, and facilities with heat-ready surfaces and clean game lines.",
  metaTitle: "Pickleball Court Installation Scottsdale, AZ | Custom Court Builders",
  metaDescription:
    "Build your ideal pickleball court in Scottsdale, AZ. We install backyard and community courts with acrylic, cushioned and modular surfaces. Request a quote.",
  faqHeading: "Questions on Pickleball Court Installation in Scottsdale",
  heroImageFragment: "multi court pickleball basketball green blue mountain view",
  faqItems: [
    {
      question: "Do you install pickleball courts in Scottsdale?",
      answer:
        "Yes. Hatz Court Builders provides pickleball court installation for residential and commercial properties across Scottsdale and nearby cities.",
    },
    {
      question: "How much space do I need for a backyard pickleball court?",
      answer:
        "A standard pickleball playing area is 20 by 44 feet, with extra run-off space for safer play. We can also plan custom layouts for tighter Scottsdale lots.",
    },
    {
      question: "What surface works well for outdoor pickleball in Scottsdale?",
      answer:
        "Acrylic and cushioned acrylic systems are common outdoor choices. Modular surfaces can also fit some pads. We recommend based on heat, use, and maintenance goals.",
    },
    {
      question: "Can one court include pickleball and basketball lines?",
      answer:
        "Yes. Many Scottsdale owners want multi-use striping so one pad supports pickleball and basketball. Clear line planning keeps the court easy to read.",
    },
    {
      question: "Do you resurface existing pickleball courts?",
      answer:
        "Yes. We resurface worn coatings, repair cracks when needed, and update kitchen lines and boundaries for cleaner play.",
    },
    {
      question: "How do I request a free pickleball court quote in Scottsdale?",
      answer:
        "Call (208) 979-0002 or contact us online with your address and project goals. We will review options and provide a free quote.",
    },
    {
      question: "Which nearby areas do you serve?",
      answer:
        "Besides Scottsdale, we serve Fountain Hills, Phoenix, Mesa, Gilbert, Chandler, Tempe, and other Maricopa County locations.",
    },
  ],
});

export const PM_BOCCE_COURT_BUILDER_SCOTTSDALE_AZ_CONFIG = courtBuilderCityConfig({
  slug: "bocce-court-builder-scottsdale-az",
  cityName: "Scottsdale",
  stateName: "Arizona",
  serviceName: "Bocce Court Builder Scottsdale",
  heroTitle: "Bocce Court Builder Scottsdale, AZ",
  heroSubtitle:
    "Bocce court builder services for Scottsdale homes, resorts, and gathering spaces that need a level outdoor court.",
  metaTitle: "Bocce Court Builder Scottsdale, AZ | Custom Bocce Courts",
  metaDescription:
    "Enjoy a dedicated outdoor playing space with our bocce court builders in Scottsdale, AZ. We handle site preparation, court construction and resurfacing.",
  faqHeading: "Bocce Court Builder Answers for Scottsdale Clients",
  heroImageFragment: "tile shuffleboard court installation modular",
  faqItems: [
    {
      question: "Do you build bocce courts in Scottsdale?",
      answer:
        "Yes. Hatz Court Builders is a bocce court builder for Scottsdale residential yards, HOAs, resorts, and commercial outdoor spaces.",
    },
    {
      question: "What is included in bocce court installation?",
      answer:
        "Projects typically include site review, leveling, surface work, borders, and finish details. Lighting or fencing can be added when the property needs them.",
    },
    {
      question: "Can a bocce court fit beside a pool or patio in Scottsdale?",
      answer:
        "Often yes. We plan dimensions and edges around existing hardscape and landscaping so the court fits the outdoor flow of the property.",
    },
    {
      question: "Do you offer bocce court resurfacing?",
      answer:
        "Yes. If the court bed has worn or uneven spots, resurfacing and leveling work can restore a smoother roll.",
    },
    {
      question: "Do you serve commercial and residential clients?",
      answer:
        "Yes. We work with homeowners, resorts, HOAs, schools, and other commercial properties that want outdoor bocce courts.",
    },
    {
      question: "How do I get a free quote?",
      answer:
        "Call (208) 979-0002 or request a quote online. Share your Scottsdale location and preferred court size so we can outline next steps.",
    },
    {
      question: "What areas near Scottsdale do you cover?",
      answer:
        "We serve Scottsdale and nearby cities such as Fountain Hills, Phoenix, Mesa, Gilbert, Chandler, Tempe, and Peoria in Maricopa County.",
    },
  ],
});

export const PM_PADEL_COURT_BUILDER_SCOTTSDALE_AZ_CONFIG = courtBuilderCityConfig({
  slug: "padel-court-builder-scottsdale-az",
  cityName: "Scottsdale",
  stateName: "Arizona",
  serviceName: "Padel Court Builder Scottsdale",
  heroTitle: "Padel Court Builder Scottsdale, AZ",
  heroSubtitle:
    "Padel court builder services for Scottsdale estates, clubs, and facilities that want enclosed outdoor padel play.",
  metaTitle: "Padel Court Builder Scottsdale, AZ | Design & Installation",
  metaDescription:
    "Plan a custom padel court in Scottsdale, AZ, with complete design and construction support. Explore court enclosures, playing surfaces and lighting options.",
  faqHeading: "Padel Court Builder FAQs for Scottsdale",
  heroImageFragment: "outdoor multi court acrylic surfacing pickleball basketball tennis",
  faqItems: [
    {
      question: "Do you build padel courts in Scottsdale?",
      answer:
        "Yes. Hatz Court Builders provides padel court builder services for residential and commercial properties in Scottsdale and nearby cities.",
    },
    {
      question: "What does padel court installation include?",
      answer:
        "A typical project includes site planning, prep, surfacing, striping, and coordination for enclosure and lighting details based on the property goals.",
    },
    {
      question: "Can padel share a campus with pickleball or tennis?",
      answer:
        "Yes. Larger Scottsdale properties often place padel beside pickleball, tennis, basketball, or bocce areas as part of a multi-court plan.",
    },
    {
      question: "Do you help with design before construction?",
      answer:
        "Yes. We offer custom court design and full design-build support so footprint, access, and surface choices are clear before work starts.",
    },
    {
      question: "Do you work with clubs and private homes?",
      answer:
        "Yes. We serve homeowners, clubs, schools, and commercial recreation properties that want padel courts.",
    },
    {
      question: "How do I request a free padel court quote in Scottsdale?",
      answer:
        "Call (208) 979-0002 or contact us online. Tell us about your lot size and goals and we will provide a free quote path.",
    },
    {
      question: "Which nearby cities do you serve?",
      answer:
        "We serve Scottsdale plus Fountain Hills, Phoenix, Mesa, Gilbert, Chandler, Tempe, Glendale, and other Maricopa County communities.",
    },
  ],
});

export const PM_COURT_BUILDER_PHOENIX_AZ_CONFIG = courtBuilderCityConfig({
  slug: "court-builder-phoenix-az",
  cityName: "Phoenix",
  stateName: "Arizona",
  heroTitle: "Court Builder Phoenix, AZ",
  heroSubtitle: "Turn Your Available Space Into a Place to Practice, Play, and Compete",
  metaTitle: "Phoenix Court Builders | Athletic Court Construction & Resurfacing",
  metaDescription:
    "Work with licensed and insured court builders in Phoenix, AZ, for custom athletic court construction, resurfacing and upgrades. Discuss your project with us.",
  heroImageFragment: "pickleball basketball line striping on concrete",
  faqHeading: "Frequently Raised Questions About Building a Court in Phoenix",
  faqItems: [
    {
      question: "How much does it cost to build a multi-use backyard court?",
      answer:
        "A comprehensive residential multi-use court may require a preliminary budgeting allowance of approximately $82,500 to $180,000, depending on its dimensions, foundation construction, surfacing, and additional features. Smaller installations or projects using existing foundations may cost considerably less. A site-specific construction proposal is necessary to determine the actual cost of your Phoenix court.",
    },
    {
      question: "How long does it take to build a court?",
      answer:
        "Residential athletic court construction commonly takes several weeks. The schedule depends on groundwork, foundation construction, curing periods, surface installation, equipment, and weather conditions. Larger commercial facilities or projects requiring extensive grading and property approvals may take longer. Phoenix's summer heat and monsoon weather can also influence construction scheduling.",
    },
    {
      question: "Can you build a court on sloped or uneven ground?",
      answer:
        "Yes, depending on the property's conditions. Sloped or uneven land may require excavation, grading, additional foundation preparation, drainage improvements, or other site-specific construction work. The amount of preparation depends on the existing elevation changes, soil conditions, and proposed court dimensions.",
    },
    {
      question: "Can one court be used for basketball and pickleball?",
      answer:
        "Yes. Basketball and pickleball can share a multi-use playing area when the court dimensions, surface material, equipment, and markings are compatible. Contrasting line colors and appropriately positioned equipment can help distinguish the two playing layouts. The design should still provide sufficient clearance and appropriate playing conditions for both activities.",
    },
    {
      question: "What is the best surface for an outdoor court in Arizona?",
      answer:
        "Standard acrylic is a widely used option for outdoor tennis, pickleball, and basketball courts. Cushioned acrylic and certain modular athletic flooring systems may also be appropriate, depending on the intended sports. The best choice depends on playing characteristics, foundation conditions, sunlight exposure, maintenance requirements, and the specifications of the selected flooring system.",
    },
  ],
});

export const PM_PICKLEBALL_COURT_BUILDER_PHOENIX_AZ_CONFIG = courtBuilderCityConfig({
  slug: "pickleball-court-builder-phoenix-az",
  cityName: "Phoenix",
  stateName: "Arizona",
  metaTitle: "Pickleball Court Builder Phoenix, AZ | Backyard & Commercial Courts",
  metaDescription:
    "Create a custom pickleball court in Phoenix, AZ, for your home, HOA, school or sports facility. We provide court construction and resurfacing. Get a quote.",
  heroImageFragment: "backyard pickleball court pool patio residential",
  faqItems: [
    {
      question: "How much space do I need for a backyard pickleball court?",
      answer:
        "A standard pickleball playing area is 20 by 44 feet, with additional run-off space needed for safe play.",
    },
    {
      question: "Can a tennis court be converted into pickleball courts?",
      answer:
        "Yes. Many tennis courts can be converted using layout updates, resurfacing, and net system changes.",
    },
    {
      question: "What surface works well for pickleball courts in Phoenix?",
      answer:
        "Acrylic systems are common for outdoor pickleball, and cushioned systems can be used when comfort is prioritized.",
    },
    {
      question: "Do you build courts for HOAs, schools, and recreation spaces?",
      answer:
        "Yes, Hatz Court Builders works with both residential and commercial clients. That can include private homes, schools, athletic facilities, parks, clubs, and HOA community courts. These projects often need smart layout planning, durable surfaces, clear lines, and strong components because more players will use the court.",
    },
    {
      question: "Can my pickleball court also be used for other sports?",
      answer:
        "Yes, many clients choose a multi-use court when they want more value from one space. Pickleball can often be planned with basketball, volleyball, tennis practice, or other games depending on the court size. Hatz Court Builders also handles related specialty builds, including bocce court installation in Phoenix and padel court builder Phoenix services when the property calls for a different court style.",
    },
    {
      question: "How long does pickleball court construction take?",
      answer:
        "The timeline depends on the site, access, grading, surface system, weather, and project size. A new build usually takes longer than resurfacing or line updates because the base and layout need careful prep. Hatz Court Builders gives a project plan after the site review so you know what to expect before work starts.",
    },
    {
      question: "Why should I hire a Phoenix pickleball court installer instead of a general contractor?",
      answer:
        "A court has to play correctly, drain correctly, and hold up under real use. A general contractor may not know court slope, surface coatings, line spacing, net placement, or sport-specific layout needs. Hiring a Phoenix pickleball court installer gives you a team focused on court performance from the start.",
    },
    {
      question: "What signs mean my existing court needs resurfacing?",
      answer:
        "Common signs include fading color, cracks, slippery areas, low spots, puddles, rough patches, and worn game lines. In Phoenix, sun exposure and heat can make surface wear more noticeable over time. A site review can show whether the court needs recoating, crack repair, full resurfacing, or a larger restoration plan.",
    },
  ],
});

export const PM_TENNIS_COURT_BUILDERS_PHOENIX_AZ_CONFIG = courtBuilderCityConfig({
  slug: "tennis-court-builders-phoenix-az",
  cityName: "Phoenix",
  stateName: "Arizona",
  metaTitle: "Phoenix Tennis Court Builders | Construction & Resurfacing",
  metaDescription:
    "Build or restore your tennis court with our Phoenix, AZ, tennis court builders. We offer custom construction, resurfacing, crack repair and full court rebuilds.",
  heroImageFragment: "tennis court repair school facility",
  faqItems: [
    {
      question: "What should I know before hiring a tennis court contractor in Phoenix?",
      answer:
        "A contractor should review site grading, drainage, surface options, court dimensions, and long-term performance before buildout.",
    },
    {
      question: "Can you handle full tennis court construction in Phoenix?",
      answer:
        "Yes. We provide custom design, base prep, surfacing, striping, equipment installation, and final walkthrough.",
    },
    {
      question: "When does tennis court resurfacing make sense?",
      answer:
        "Resurfacing is typically a fit when the base remains sound but the top layer has fading, wear, cracking, or line visibility issues.",
    },
    {
      question: "Can one court be used for more than tennis?",
      answer:
        "Yes, many Phoenix property owners choose multi-use court construction so one space can support tennis, pickleball, basketball, volleyball, or other games. The layout, line striping, net systems, hoops, and surface type need to be planned before work starts. This helps the court feel clean, safe, and easy to use.",
    },
    {
      question: "What surface options are available?",
      answer:
        "Hatz Court Builders offers acrylic court systems, cushioned acrylic court systems, hardwood court surfaces, modular tile court systems, synthetic court surfaces, and vinyl court surfaces. The right choice depends on indoor or outdoor use, budget, maintenance needs, sport type, and desired play feel. Outdoor Phoenix courts often need surface systems that handle sun, heat, and regular use well.",
    },
    {
      question: "Are public and community courts different from private courts?",
      answer:
        "Yes, public tennis courts in Phoenix and community courts often need stronger planning for heavier use, clear access, safety, and long-term maintenance. Parks, schools, and HOAs may also need court conversions, layout updates, surface protection, and accessory installation. Private backyard courts can be more personal in layout, color, and sport mix.",
    },
    {
      question: "How long does a court project take?",
      answer:
        "Project time depends on the court size, site prep, surface type, weather, layout, and whether the project is new construction, repair, or resurfacing. A simple surface recoating is usually faster than a full custom court construction project. Hatz Court Builders gives a clearer timeline after the site review and project plan.",
    },
  ],
});

export const PM_BASKETBALL_COURT_CONSTRUCTION_PHOENIX_AZ_CONFIG = courtBuilderCityConfig({
  slug: "basketball-court-construction-phoenix-az",
  cityName: "Phoenix",
  stateName: "Arizona",
  metaTitle: "Basketball Court Construction Phoenix, AZ | Custom Court Builders",
  metaDescription:
    "Design a basketball court around your space and playing needs in Phoenix, AZ. We handle residential and commercial court construction, layouts and surfacing.",
  heroImageFragment: "community park pickleball tennis basketball multi court",
  faqItems: [
    {
      question: "How long does a basketball court take to build in Phoenix?",
      answer:
        "Timeline depends on site prep, court size, materials, and weather. We provide a schedule after property review.",
    },
    {
      question: "What court surface works best for Phoenix heat?",
      answer:
        "Acrylic, cushioned acrylic, and modular systems are common options depending on use and maintenance expectations.",
    },
    {
      question: "Can you build a basketball court in a small backyard?",
      answer:
        "Yes. Compact shooting and half-court layouts are possible with careful spacing and equipment placement.",
    },
    {
      question: "Do Phoenix basketball courts need special drainage planning?",
      answer:
        "Yes, drainage matters because monsoon rain can move fast across hard surfaces. A court with poor slope or low spots may hold water, wear faster, or become unsafe after storms. Proper grading and surface planning help the court dry better and last longer.",
    },
    {
      question: "Can you add pickleball or volleyball lines to a basketball court?",
      answer:
        "Yes, many basketball courts can be planned as multi-use courts with added game lines. The layout needs to be clean so the markings do not feel confusing during play. This works well for families, schools, HOAs, and parks that want more value from one space.",
    },
    {
      question: "Do you repair or resurface old basketball courts?",
      answer:
        "Yes, Hatz Court Builders offers resurfacing, recoating, crack repair, court restoration, and layout updates. This can help a faded or worn court look better and play better without always starting from scratch. The right repair plan depends on the condition of the base and surface.",
    },
    {
      question: "Can you install basketball hoops and court accessories?",
      answer:
        "Yes, court components can be included with the project. This may include basketball hoop installation, net systems, posts, hardware, and other court accessories. Planning these items early helps the finished court look cleaner and play better.",
    },
    {
      question: "Do you build basketball courts for schools and HOAs?",
      answer:
        "Yes, Hatz Court Builders works with residential and commercial clients, including schools, HOAs, parks, athletic facilities, and community spaces. These projects often need durable surfaces, clear striping, safe layouts, and low-maintenance systems. The court can be planned around heavy use and long-term performance.",
    },
  ],
});

export const PM_BOCCE_COURT_INSTALLATION_PHOENIX_AZ_CONFIG = courtBuilderCityConfig({
  slug: "bocce-court-installation-phoenix-az",
  cityName: "Phoenix",
  stateName: "Arizona",
  metaTitle: "Bocce Court Installation Phoenix, AZ | Custom Bocce Ball Courts",
  metaDescription:
    "Upgrade your outdoor recreation area with bocce court installation in Phoenix, AZ. Explore custom court dimensions, playing surfaces and drainage solutions.",
  heroImageFragment: "modular court tile custom logo branding",
  faqItems: [
    {
      question: "How much space do I need for a backyard bocce court?",
      answer:
        "Sizing depends on formal or casual use. We can design a court footprint to fit available yard and circulation space.",
    },
    {
      question: "What surface works best for a bocce court in Phoenix?",
      answer:
        "Surface selection depends on drainage, maintenance goals, sun exposure, and how often the court will be played.",
    },
    {
      question: "Can a bocce court be added near a pool or patio?",
      answer:
        "Yes. We can plan clearances, safe edges, and drainage so the bocce layout integrates with outdoor living spaces.",
    },
    {
      question: "Can an old bocce court be repaired or resurfaced?",
      answer:
        "Yes, many worn bocce courts can be restored if the base is still in fair shape. Repairs may include crack repair, surface recoating, sealing, layout updates, or finish work. A site review helps decide if resurfacing or a full rebuild is the better choice.",
    },
    {
      question: "How does Phoenix weather affect bocce court construction?",
      answer:
        "Phoenix sun, heat, dust, and seasonal monsoon rain can affect the base, surface, color, and drainage plan. A court that is not graded well may hold water or wear unevenly. Proper prep helps the court stay more stable and easier to maintain.",
    },
    {
      question: "Can you build other courts with a bocce court project?",
      answer:
        "Yes, Hatz Court Builders also handles tennis court construction, basketball court construction, pickleball court construction, volleyball court construction, multi-use court construction, court surfacing, line striping, surface sealing, and court conversions. Some properties pair bocce with a multi-sport court or other backyard play space.",
    },
    {
      question: "What makes Hatz Court Builders a good choice for bocce court installation?",
      answer:
        "Hatz Court Builders brings over 15 years of experience, licensed and insured service, and a full design-build approach. The team helps with planning, layout, materials, surfacing, components, installation, cleanup, and final review. That gives the project a clear path from the first visit to the finished court.",
    },
  ],
});

export const PM_PADEL_COURT_BUILDER_PHOENIX_AZ_CONFIG = courtBuilderCityConfig({
  slug: "padel-court-builder-phoenix-az",
  cityName: "Phoenix",
  stateName: "Arizona",
  metaTitle: "Padel Court Builder Phoenix, AZ | Custom Court Construction",
  metaDescription:
    "Build a custom padel court in Phoenix, AZ, for your home, club or commercial property. We offer court design, construction, fencing and upgrades. Get a quote.",
  heroImageFragment: "outdoor multi court pickleball basketball tennis",
  faqItems: [
    {
      question: "How much space do I need for a padel court in Phoenix?",
      answer:
        "Padel needs room for the court, fencing, glass, gates, and safe movement paths. We confirm fit during site review.",
    },
    {
      question: "Can a padel court handle Phoenix heat?",
      answer:
        "Yes, with correct base prep, surface selection, and drainage planning for sustained outdoor conditions.",
    },
    {
      question: "Do you build padel courts for both homes and businesses?",
      answer:
        "Yes. We build residential padel courts and commercial projects for clubs, schools, HOAs, and facilities.",
    },
    {
      question: "Can an older court be converted into a padel or multi-use court?",
      answer:
        "In some cases, yes. Hatz Court Builders can review older courts for resurfacing, surface protection, crack repair, surface recoating, layout updates, and court conversions. The existing base, slope, size, and condition will decide what is realistic.",
    },
    {
      question: "Do you install court components too?",
      answer:
        "Yes. Hatz Court Builders can include net systems, posts and hardware, basketball hoop installation, court accessory installation, color customization, surface sealing, and line striping as part of the project. These details help the court look clean and play the way it should.",
    },
    {
      question: "What should I ask before hiring a padel court builder?",
      answer:
        "Ask about court layout, drainage, base prep, surface options, past court experience, licensing, insurance, and how the builder handles Phoenix weather conditions. A good builder should explain the plan in plain language before construction starts. Hatz Court Builders gives clear guidance so owners know what they are getting before the build begins.",
    },
  ],
});

export const PM_COURT_BUILDER_MESA_AZ_CONFIG = courtBuilderCityConfig({
  slug: "court-builder-mesa-az",
  cityName: "Mesa",
  stateName: "Arizona",
  heroTitle: "Court Builder Mesa, AZ",
  heroSubtitle: "Custom Court Construction for Mesa Homes and Recreational Facilities",
  metaTitle: "Court Builder Mesa, AZ | Residential & Commercial Courts",
  metaDescription:
    "Create a custom athletic court with licensed and insured court builders in Mesa, AZ. We build tennis, pickleball, basketball and multi-use courts. Get a quote.",
  heroImageFragment: "pickleball court green and red surface",
  faqHeading: "Five Questions to Consider Before Building Your Mesa Athletic Court",
  faqItems: [
    {
      question: "How much does it cost to build a backyard sports court?",
      answer:
        "For preliminary budgeting, a professionally constructed basic backyard sports court may cost approximately $27,000 to $48,000, while larger multi-sport courts may require $82,500 to $180,000 or more. The total depends on dimensions, foundation requirements, surface materials, grading, drainage, equipment, fencing, and lighting. These figures include a conservative planning allowance rather than representing official installation rates. Contact Hatz Court Builders for pricing based on your Mesa property and project scope.",
    },
    {
      question: "How much space do you need for a backyard sports court?",
      answer:
        "The amount of space depends on the sport and intended level of play. A compact basketball practice area may fit within approximately 25 by 30 feet, while a pickleball court requires a marked playing area of 20 by 44 feet and a minimum total playing surface of 30 by 60 feet. New pickleball installations are preferably planned with additional clearance. Tennis courts generally require more land. Property setbacks, fencing, equipment, drainage, and surrounding access should also be considered.",
    },
    {
      question: "What is the best surface for a backyard sports court?",
      answer:
        "Standard acrylic is commonly used for outdoor basketball, tennis, and pickleball because it can provide consistent ball response and appropriate playing characteristics. Cushioned acrylic offers additional surface resilience, while modular flooring may be suitable for certain basketball and multi-sport courts. In Mesa, the best surface should also account for heat exposure, UV resistance, drainage, maintenance requirements, and compatibility with the supporting foundation.",
    },
    {
      question: "Can you build a sports court on uneven ground?",
      answer:
        "Yes, many uneven properties can accommodate an athletic court after suitable excavation, grading, and foundation preparation. The amount of work depends on the existing slope, soil stability, drainage conditions, and proposed court dimensions. Steeper sites may require additional structural improvements or engineering. Hatz Court Builders provides site preparation services and can discuss the groundwork required for your Mesa court project.",
    },
    {
      question: "Can one backyard court be used for multiple sports?",
      answer:
        "Yes. A custom multi-use court can support basketball, pickleball, recreational volleyball, badminton, and other compatible activities when its dimensions, surface, markings, and equipment are planned accordingly. Contrasting playing lines and removable net systems can make switching between activities more convenient. The primary sport should guide the overall court design to ensure the shared playing area remains functional.",
    },
  ],
});

export const PM_PICKLEBALL_COURT_BUILDERS_MESA_AZ_CONFIG = courtBuilderCityConfig({
  slug: "pickleball-court-builders-mesa-az",
  cityName: "Mesa",
  stateName: "Arizona",
  serviceName: "Pickleball Court Builders Mesa AZ",
  heroTitle: "Pickleball Court Builders Mesa AZ",
  heroSubtitle:
    "Pickleball court builders for Mesa backyards, HOAs, schools, and facilities with heat-ready surfaces and clean game lines.",
  metaTitle: "Pickleball Court Builders Mesa, AZ | Custom Court Installation",
  metaDescription:
    "Bring pickleball to your backyard or athletic facility in Mesa, AZ. We construct custom pickleball courts with acrylic, cushioned and modular surface options.",
  faqHeading: "Mesa AZ Pickleball Court Builder Questions",
  heroImageFragment: "outdoor pickleball court red and green surface",
  faqItems: [
    {
      question: "Do you serve Mesa as pickleball court builders?",
      answer:
        "Yes. Hatz Court Builders builds pickleball courts for residential and commercial properties across Mesa and nearby East Valley cities.",
    },
    {
      question: "What pickleball court services are available in Mesa?",
      answer:
        "We handle new builds, resurfacing, acrylic and cushioned coatings, modular surfaces, striping, nets, fencing, lighting, and full design-build support.",
    },
    {
      question: "How much space do I need for a backyard pickleball court in Mesa?",
      answer:
        "A standard pickleball playing area is 20 by 44 feet, with extra run-off space for safer play. We can also plan custom layouts for tighter Mesa lots.",
    },
    {
      question: "What surface works well for outdoor pickleball in Mesa?",
      answer:
        "Acrylic and cushioned acrylic systems are common outdoor choices. Modular surfaces can also fit some pads. We recommend based on heat, use, and maintenance goals.",
    },
    {
      question: "Can one court include pickleball and basketball lines?",
      answer:
        "Yes. Many Mesa owners want multi-use striping so one pad supports pickleball and basketball. Clear line planning keeps the court easy to read.",
    },
    {
      question: "Do you work with residential and commercial clients in Mesa?",
      answer:
        "Yes. We work with homeowners, HOAs, schools, parks, and commercial recreation sites that need pickleball courts.",
    },
    {
      question: "How do I request a free pickleball court quote in Mesa?",
      answer:
        "Call (208) 979-0002 or contact us online with your address and project goals. We will review options and provide a free quote.",
    },
    {
      question: "Which nearby areas do you serve from Mesa?",
      answer:
        "Besides Mesa, we serve Gilbert, Chandler, Tempe, Phoenix, Scottsdale, Fountain Hills, and other Maricopa County locations.",
    },
  ],
});

export const PM_COURT_BUILDER_GILBERT_AZ_CONFIG = courtBuilderCityConfig({
  slug: "court-builder-gilbert-az",
  cityName: "Gilbert",
  stateName: "Arizona",
  metaTitle: "Gilbert Court Builders | Custom Court Design & Construction",
  metaDescription:
    "Transform your property with custom athletic court construction in Gilbert, AZ. Our team handles court design, installation and resurfacing. Request a quote.",
  heroImageFragment: "pickleball court modular tile surfacing",
  faqItems: [
    {
      question: "What surface works best for outdoor courts in Gilbert?",
      answer:
        "Acrylic and modular systems are common choices depending on sport type, surface heat, drainage, and maintenance goals.",
    },
    {
      question: "Can you build a court in a smaller Gilbert backyard?",
      answer:
        "Yes. Custom layout planning makes compact and multi-use courts possible in many residential lots.",
    },
    {
      question: "How does Arizona heat affect a court surface?",
      answer:
        "Heat and UV can stress coatings and color. Proper prep, sealing, and material selection improve long-term performance.",
    },
    {
      question: "Do you handle court resurfacing and repairs?",
      answer:
        "Yes, Hatz Court Builders handles court resurfacing, surface recoating, crack repair, court restoration, layout updates, and court conversions. This can help an older court look better, play smoother, and match a new sport layout. The repair plan depends on the current surface, cracking, coating wear, and drainage.",
    },
    {
      question: "Can one court be used for multiple sports?",
      answer:
        "Yes, a multi-use court can support tennis, pickleball, basketball, volleyball, or other games when the layout is planned from the start. We look at line colors, net systems, hoop placement, spacing, and player movement so the court does not feel crowded.",
    },
    {
      question: "Do you install hoops, nets, posts, and accessories?",
      answer:
        "Yes, court accessory installation can include basketball hoop installation, net system installation, posts and hardware installation, and related court components. These pieces need the right placement and support so the court plays well and looks clean. We match the equipment to the sport, court size, and expected use.",
    },
    {
      question: "What should I know before starting a commercial court project?",
      answer:
        "Commercial courts for schools, HOAs, parks, clubs, and athletic facilities need clear planning around traffic, safety space, surface choice, layout, and long-term upkeep. It helps to decide the sports, user groups, schedule, and any access needs before the design is finalized. A clear plan can reduce change orders and keep the build focused.",
    },
    {
      question: "How long does a Gilbert court project take?",
      answer:
        "The timeline depends on the court size, surface type, site prep, weather, access, and whether the project is a new build or resurfacing work. Smaller resurfacing jobs may move faster than full custom court construction. After the property review, Hatz Court Builders can give a clearer schedule based on the actual site and project scope.",
    },
  ],
});

export const PM_BOCCE_COURT_INSTALLATION_GILBERT_AZ_CONFIG = courtBuilderCityConfig({
  slug: "bocce-court-installation-gilbert-az",
  cityName: "Gilbert",
  stateName: "Arizona",
  serviceName: "Bocce Court Installation Gilbert",
  heroTitle: "Bocce Court Installation Gilbert, AZ",
  heroSubtitle:
    "Bocce court installation for Gilbert backyards, HOAs, and gathering spaces with level beds, solid borders, and smart drainage.",
  metaTitle: "Bocce Court Installation Gilbert, AZ | Residential & Commercial",
  metaDescription:
    "Create an inviting recreation space with bocce court installation in Gilbert, AZ. We build courts for homes, HOAs and commercial properties. Get a free quote.",
  faqHeading: "Gilbert Bocce Court Installation Questions",
  heroImageFragment: "tile shuffleboard court installation modular",
  faqItems: [
    {
      question: "Do you offer bocce court installation in Gilbert?",
      answer:
        "Yes. Hatz Court Builders installs bocce courts for homes, HOAs, and commercial properties across Gilbert and nearby East Valley cities.",
    },
    {
      question: "Are you a bocce court builder for both homes and businesses?",
      answer:
        "Yes. We build bocce courts for backyards, HOA common areas, schools, parks, and commercial gathering spaces.",
    },
    {
      question: "Can irrigation near my yard affect a bocce court?",
      answer:
        "It can. Extra water near the court can soften the base and push edges out of line. We review irrigation and drainage before we build.",
    },
    {
      question: "Can you resurface an old bocce court?",
      answer:
        "Yes. We can refresh worn play beds, fix low spots, and repair borders so the ball rolls true again.",
    },
    {
      question: "Can you add lighting to a Gilbert bocce court?",
      answer:
        "Yes. Court lighting makes cooler evening games easy, which helps during Gilbert summers.",
    },
    {
      question: "How do I get a free bocce court quote?",
      answer:
        "Call (208) 979-0002 or contact us online with your Gilbert address and goals. We will review your site and send a free quote.",
    },
    {
      question: "What areas near Gilbert do you serve?",
      answer:
        "Besides Gilbert, we serve Mesa, Chandler, Tempe, Phoenix, Scottsdale, and other Maricopa County locations.",
    },
  ],
});

export const PM_BASKETBALL_COURT_INSTALLATION_GILBERT_AZ_CONFIG = courtBuilderCityConfig({
  slug: "basketball-court-installation-gilbert-az",
  cityName: "Gilbert",
  stateName: "Arizona",
  serviceName: "Basketball Court Installation Gilbert",
  heroTitle: "Basketball Court Installation Gilbert, AZ",
  heroSubtitle:
    "Basketball court installation for Gilbert homes, schools, HOAs, and facilities, built for Arizona heat and everyday play.",
  metaTitle: "Basketball Court Installation Gilbert, AZ | Half & Full Courts",
  metaDescription:
    "Build a custom basketball court in Gilbert, AZ, with half-court, full-court and multi-use layouts. Explore acrylic, modular and cushioned playing surfaces.",
  faqHeading: "Basketball Court Builder Gilbert FAQs",
  heroImageFragment: "backyard green tan basketball half court",
  faqItems: [
    {
      question: "Do you install basketball courts in Gilbert?",
      answer:
        "Yes. Hatz Court Builders is a basketball court builder for Gilbert homes, schools, HOAs, and commercial sites.",
    },
    {
      question: "Can you build a half court in a Gilbert backyard?",
      answer:
        "Yes. We plan half courts and custom sizes to fit your lot, pool, and HOA rules.",
    },
    {
      question: "What surfaces do you offer for basketball courts?",
      answer:
        "We install acrylic, cushioned acrylic, modular tiles, concrete, and asphalt systems. We help you pick based on use, heat, and upkeep.",
    },
    {
      question: "Can my basketball court include pickleball lines?",
      answer:
        "Yes. Many Gilbert families add pickleball striping so one pad works for both games.",
    },
    {
      question: "Do you add custom logos and team colors?",
      answer:
        "Yes. We can add custom logos and colors to match your home, school, or team.",
    },
    {
      question: "Do you resurface old basketball courts?",
      answer:
        "Yes. We handle crack repair, resurfacing, and new striping for worn courts.",
    },
    {
      question: "How do I request a free quote in Gilbert?",
      answer:
        "Call (208) 979-0002 or reach us online. Share your address and goals, and we will review options and send a free quote.",
    },
  ],
});

export const PM_PADEL_COURT_BUILDER_GILBERT_AZ_CONFIG = courtBuilderCityConfig({
  slug: "padel-court-builder-gilbert-az",
  cityName: "Gilbert",
  stateName: "Arizona",
  serviceName: "Padel Court Builder Gilbert",
  heroTitle: "Padel Court Builder Gilbert, AZ",
  heroSubtitle:
    "Padel court builder services for Gilbert homes, clubs, and facilities, from site prep and surfacing to lighting and fencing.",
  metaTitle: "Padel Court Builder Gilbert, AZ | Custom Courts & Lighting",
  metaDescription:
    "Create a dedicated padel court in Gilbert, AZ, for your home or sports club. We coordinate site preparation, court construction, surfacing and lighting.",
  faqHeading: "Padel Court Installation Gilbert Questions",
  heroImageFragment: "outdoor multi court acrylic surfacing pickleball basketball tennis",
  faqItems: [
    {
      question: "Do you build padel courts in Gilbert?",
      answer:
        "Yes. Hatz Court Builders handles padel court installation for homes, clubs, and commercial properties in Gilbert and nearby cities.",
    },
    {
      question: "What surface is used on a padel court?",
      answer:
        "Synthetic turf with sand infill is the most common choice. Acrylic is another option for owners who want a hard surface.",
    },
    {
      question: "How much space does a padel court need?",
      answer:
        "A standard padel court is smaller than a tennis court. We review your lot and plan the layout, walls, and access around your space.",
    },
    {
      question: "Can you add lighting to a padel court?",
      answer:
        "Yes. Lighting lets Gilbert players enjoy cooler evening games.",
    },
    {
      question: "Do you handle site prep and drainage?",
      answer:
        "Yes. We handle grading, base work, and drainage planning so the court stays flat and dries well after monsoon rain.",
    },
    {
      question: "Do you work with residential and commercial clients?",
      answer:
        "Yes. We build padel courts for homeowners, HOAs, clubs, and commercial recreation sites.",
    },
    {
      question: "How do I get a free padel court quote in Gilbert?",
      answer:
        "Call (208) 979-0002 or contact us online with your address and project goals. We will review the site and provide a free quote.",
    },
  ],
});

export const PM_PICKLEBALL_COURT_BUILDER_GILBERT_AZ_CONFIG = courtBuilderCityConfig({
  slug: "pickleball-court-builder-gilbert-az",
  cityName: "Gilbert",
  stateName: "Arizona",
  serviceName: "Pickleball Court Builder Gilbert",
  heroTitle: "Pickleball Court Builder Gilbert, AZ",
  heroSubtitle:
    "Pickleball court builder services for Gilbert backyards, HOAs, schools, and facilities with hard and cushioned acrylic options.",
  metaTitle: "Pickleball Court Builder Gilbert, AZ | Backyard Court Installation",
  metaDescription:
    "Enjoy pickleball at home or in your community with custom court construction in Gilbert, AZ. Choose from acrylic, cushioned acrylic and modular surfaces.",
  faqHeading: "Pickleball Court Installation Gilbert FAQs",
  heroImageFragment: "outdoor pickleball court red and green surface",
  faqItems: [
    {
      question: "Are you a pickleball court builder in Gilbert?",
      answer:
        "Yes. Hatz Court Builders handles pickleball court installation for homes, HOAs, schools, and facilities across Gilbert.",
    },
    {
      question: "How much space do I need for a backyard pickleball court?",
      answer:
        "A standard pickleball playing area is 20 by 44 feet, with extra run-off space for safer play. We can plan custom layouts for smaller Gilbert lots.",
    },
    {
      question: "What is the difference between hard and cushioned acrylic?",
      answer:
        "Hard acrylic gives a fast, steady bounce. Cushioned acrylic adds soft layers under the color coat for more comfort underfoot.",
    },
    {
      question: "Can you add pickleball lines to my tennis court?",
      answer:
        "Yes. We can stripe pickleball lines in a different color so both games stay easy to read.",
    },
    {
      question: "Do you resurface worn pickleball courts?",
      answer:
        "Yes. We fix cracks, recoat faded surfaces, and update kitchen lines and boundaries.",
    },
    {
      question: "Do you install nets, lighting, and fencing?",
      answer:
        "Yes. We can add nets, court lighting, and fencing to complete your Gilbert pickleball court.",
    },
    {
      question: "How do I get a free pickleball court quote in Gilbert?",
      answer:
        "Call (208) 979-0002 or contact us online. Share your address and goals, and we will send a free quote.",
    },
    {
      question: "Which nearby areas do you serve?",
      answer:
        "Besides Gilbert, we serve Mesa, Chandler, Tempe, Phoenix, Scottsdale, and other Maricopa County locations.",
    },
  ],
});

export const PM_TENNIS_COURT_CONTRACTOR_GILBERT_AZ_CONFIG = courtBuilderCityConfig({
  slug: "tennis-court-contractor-gilbert-az",
  cityName: "Gilbert",
  stateName: "Arizona",
  serviceName: "Tennis Court Contractor Gilbert",
  heroTitle: "Tennis Court Contractor Gilbert, AZ",
  heroSubtitle:
    "Tennis court contractor services for Gilbert homes, HOAs, schools, and clubs, from new builds to resurfacing and repairs.",
  metaTitle: "Tennis Court Contractor Gilbert, AZ | Installation & Resurfacing",
  metaDescription:
    "Restore an aging tennis court or build a new one in Gilbert, AZ. We provide tennis court construction, repairs and acrylic or cushioned resurfacing systems.",
  faqHeading: "Tennis Court Builder Gilbert Questions",
  heroImageFragment: "tennis court resurface blue and green acrylic",
  faqItems: [
    {
      question: "Are you a tennis court contractor serving Gilbert?",
      answer:
        "Yes. Hatz Court Builders builds, resurfaces, and repairs tennis courts for homes, HOAs, schools, and clubs in Gilbert.",
    },
    {
      question: "Do you handle new tennis court installation in Gilbert?",
      answer:
        "Yes. We handle grading, base work, surfacing, striping, nets, lighting, and fencing for new courts.",
    },
    {
      question: "What are signs my tennis court needs resurfacing?",
      answer:
        "Faded color, cracks, puddles after rain, slick spots, and worn lines are common signs. A site review shows whether you need repairs or full resurfacing.",
    },
    {
      question: "Can you add pickleball lines to a tennis court?",
      answer:
        "Yes. Many Gilbert communities add pickleball lines so one court can serve both sports.",
    },
    {
      question: "Do you offer cushioned tennis court surfaces?",
      answer:
        "Yes. We install cushioned acrylic systems as well as standard hardcourt acrylic.",
    },
    {
      question: "Do you work on HOA and school tennis courts?",
      answer:
        "Yes. We work with residential and commercial clients, including HOAs, schools, parks, and clubs.",
    },
    {
      question: "How do I request a free tennis court quote in Gilbert?",
      answer:
        "Call (208) 979-0002 or contact us online with your address and court details. We will review options and send a free quote.",
    },
  ],
});

export const PM_BASKETBALL_COURT_BUILDER_CHANDLER_AZ_CONFIG = courtBuilderCityConfig({
  slug: "basketball-court-builder-chandler-az",
  cityName: "Chandler",
  stateName: "Arizona",
  serviceName: "Basketball Court Builder Chandler",
  heroTitle: "Basketball Court Builder Chandler, AZ",
  heroSubtitle:
    "Basketball court builder services for Chandler homes, schools, HOAs, and facilities, built for Arizona heat and everyday play.",
  metaTitle: "Basketball Court Builder Chandler, AZ | Custom Half & Full Courts",
  metaDescription:
    "Bring basketball to your backyard or facility in Chandler, AZ. We build half courts, full courts and multi-use courts with customizable surface options.",
  faqHeading: "Basketball Court Installation Chandler FAQs",
  heroImageFragment: "backyard green tan basketball half court",
  faqItems: [
    {
      question: "Do you build basketball courts in Chandler?",
      answer:
        "Yes. Hatz Court Builders is a basketball court builder for Chandler homes, schools, HOAs, and commercial sites.",
    },
    {
      question: "Can you handle basketball court installation in a Chandler backyard?",
      answer:
        "Yes. We plan half courts and custom sizes to fit your lot, pool, and HOA rules.",
    },
    {
      question: "What surfaces do you offer for basketball courts?",
      answer:
        "We install acrylic, cushioned acrylic, modular tiles, concrete, and asphalt systems. We help you pick based on use, heat, and upkeep.",
    },
    {
      question: "Can my basketball court include pickleball lines?",
      answer:
        "Yes. Many Chandler families add pickleball striping so one pad works for both games.",
    },
    {
      question: "Do you add custom logos and team colors?",
      answer:
        "Yes. We can add custom logos and colors to match your home, school, or team.",
    },
    {
      question: "Do you resurface old basketball courts?",
      answer:
        "Yes. We handle crack repair, resurfacing, and new striping for worn courts.",
    },
    {
      question: "How do I request a free quote in Chandler?",
      answer:
        "Call (208) 979-0002 or reach us online. Share your address and goals, and we will review options and send a free quote.",
    },
  ],
});

export const PM_TENNIS_COURT_BUILDER_CHANDLER_AZ_CONFIG = courtBuilderCityConfig({
  slug: "tennis-court-builder-chandler-az",
  cityName: "Chandler",
  stateName: "Arizona",
  serviceName: "Tennis Court Builder Chandler",
  heroTitle: "Tennis Court Builder Chandler, AZ",
  heroSubtitle:
    "Tennis court contractor services for Chandler homes, HOAs, schools, and clubs, from new builds to resurfacing and repairs.",
  metaTitle: "Tennis Court Builder Chandler, AZ | Construction & Resurfacing",
  metaDescription:
    "Plan a new tennis court or upgrade an existing one in Chandler, AZ. We provide custom construction, acrylic surfacing and cushioned systems. Get a quote.",
  faqHeading: "Tennis Court Contractor Chandler Questions",
  heroImageFragment: "tennis court resurface blue and green acrylic",
  faqItems: [
    {
      question: "Are you a tennis court contractor serving Chandler?",
      answer:
        "Yes. Hatz Court Builders builds, resurfaces, and repairs tennis courts for homes, HOAs, schools, and clubs in Chandler.",
    },
    {
      question: "Do you handle tennis court installation in Chandler?",
      answer:
        "Yes. We handle grading, base work, surfacing, striping, nets, lighting, and fencing for new courts.",
    },
    {
      question: "Do you offer tennis court construction for commercial sites?",
      answer:
        "Yes. We work with residential and commercial clients, including HOAs, schools, parks, and clubs.",
    },
    {
      question: "What are signs my tennis court needs resurfacing?",
      answer:
        "Faded color, cracks, puddles after rain, slick spots, and worn lines are common signs. A site review shows whether you need repairs or full resurfacing.",
    },
    {
      question: "Can you add pickleball lines to a tennis court?",
      answer:
        "Yes. Many Chandler communities add pickleball lines so one court can serve both sports.",
    },
    {
      question: "Do you offer cushioned tennis court surfaces?",
      answer:
        "Yes. We install cushioned acrylic systems as well as standard hardcourt acrylic.",
    },
    {
      question: "How do I request a free tennis court quote in Chandler?",
      answer:
        "Call (208) 979-0002 or contact us online with your address and court details. We will review options and send a free quote.",
    },
  ],
});

export const PM_PICKLEBALL_COURT_BUILDER_CHANDLER_AZ_CONFIG = courtBuilderCityConfig({
  slug: "pickleball-court-builder-chandler-az",
  cityName: "Chandler",
  stateName: "Arizona",
  serviceName: "Pickleball Court Builder Chandler",
  heroTitle: "Pickleball Court Builder Chandler, AZ",
  heroSubtitle:
    "Pickleball court builder services for Chandler backyards, HOAs, schools, and facilities with hard and cushioned acrylic options.",
  metaTitle: "Chandler Pickleball Court Builders | Custom Court Construction",
  metaDescription:
    "Build a pickleball court suited to your backyard or community in Chandler, AZ. We offer custom layouts, acrylic, cushioned and modular surfaces. Get a quote.",
  faqHeading: "Pickleball Court Installation Chandler FAQs",
  heroImageFragment: "outdoor pickleball court red and green surface",
  faqItems: [
    {
      question: "Are you pickleball court builders Chandler AZ homeowners can call?",
      answer:
        "Yes. Hatz Court Builders handles pickleball court installation for homes, HOAs, schools, and facilities across Chandler.",
    },
    {
      question: "How much space do I need for a backyard pickleball court?",
      answer:
        "A standard pickleball playing area is 20 by 44 feet, with extra run-off space for safer play. We can plan custom layouts for smaller Chandler lots.",
    },
    {
      question: "What is the difference between hard and cushioned acrylic?",
      answer:
        "Hard acrylic gives a fast, steady bounce. Cushioned acrylic adds soft layers under the color coat for more comfort underfoot.",
    },
    {
      question: "Can you add pickleball lines to my tennis court?",
      answer:
        "Yes. We can stripe pickleball lines in a different color so both games stay easy to read.",
    },
    {
      question: "Do you resurface worn pickleball courts?",
      answer:
        "Yes. We fix cracks, recoat faded surfaces, and update kitchen lines and boundaries.",
    },
    {
      question: "Do you install nets, lighting, and fencing?",
      answer:
        "Yes. We can add nets, court lighting, and fencing to complete your Chandler pickleball court.",
    },
    {
      question: "How do I get a free pickleball court quote in Chandler?",
      answer:
        "Call (208) 979-0002 or contact us online. Share your address and goals, and we will send a free quote.",
    },
    {
      question: "Which nearby areas do you serve?",
      answer:
        "Besides Chandler, we serve Gilbert, Mesa, Tempe, Phoenix, Scottsdale, and other Maricopa County locations.",
    },
  ],
});

export const PM_PADEL_COURT_BUILDER_CHANDLER_AZ_CONFIG = courtBuilderCityConfig({
  slug: "padel-court-builder-chandler-az",
  cityName: "Chandler",
  stateName: "Arizona",
  serviceName: "Padel Court Builder Chandler",
  heroTitle: "Padel Court Builder Chandler, AZ",
  heroSubtitle:
    "Padel court builder services for Chandler homes, clubs, and facilities, from site prep and surfacing to lighting and fencing.",
  metaTitle: "Padel Court Builder Chandler, AZ | Court Design & Construction",
  metaDescription:
    "Develop a custom padel court in Chandler, AZ, for residential or club use. We handle court planning, site preparation, surface installation and lighting.",
  faqHeading: "Padel Court Installation Chandler Questions",
  heroImageFragment: "outdoor multi court acrylic surfacing pickleball basketball tennis",
  faqItems: [
    {
      question: "Do you build padel courts in Chandler?",
      answer:
        "Yes. Hatz Court Builders handles padel court installation for homes, clubs, and commercial properties in Chandler and nearby cities.",
    },
    {
      question: "What surface is used on a padel court?",
      answer:
        "Synthetic turf with sand infill is the most common choice. Acrylic is another option for owners who want a hard surface.",
    },
    {
      question: "How much space does a padel court need?",
      answer:
        "A standard padel court is smaller than a tennis court. We review your lot and plan the layout, walls, and access around your space.",
    },
    {
      question: "Can you add lighting to a padel court?",
      answer:
        "Yes. Lighting lets Chandler players enjoy cooler evening games.",
    },
    {
      question: "Do you handle site prep and drainage?",
      answer:
        "Yes. We handle grading, base work, and drainage planning so the court stays flat and dries well after monsoon rain.",
    },
    {
      question: "Do you work with residential and commercial clients?",
      answer:
        "Yes. We build padel courts for homeowners, HOAs, clubs, and commercial recreation sites.",
    },
    {
      question: "How do I get a free padel court quote in Chandler?",
      answer:
        "Call (208) 979-0002 or contact us online with your address and project goals. We will review the site and provide a free quote.",
    },
  ],
});

export const PM_BOCCE_COURT_BUILDER_CHANDLER_AZ_CONFIG = courtBuilderCityConfig({
  slug: "bocce-court-builder-chandler-az",
  cityName: "Chandler",
  stateName: "Arizona",
  serviceName: "Bocce Court Builder Chandler",
  heroTitle: "Bocce Court Builder Chandler, AZ",
  heroSubtitle:
    "Bocce court installation for Chandler backyards, HOAs, and gathering spaces with level beds, solid borders, and smart drainage.",
  metaTitle: "Bocce Court Builder Chandler, AZ | Custom Bocce Ball Installation",
  metaDescription:
    "Add a custom bocce court to your Chandler, AZ, property. We provide site preparation, level court construction and resurfacing for homes and communities.",
  faqHeading: "Bocce Court Installation Chandler Questions",
  heroImageFragment: "tile shuffleboard court installation modular",
  faqItems: [
    {
      question: "Do you offer bocce court installation in Chandler?",
      answer:
        "Yes. Hatz Court Builders installs bocce courts for homes, HOAs, and commercial properties across Chandler and nearby East Valley cities.",
    },
    {
      question: "Are you a bocce court builder for both homes and businesses?",
      answer:
        "Yes. We build bocce courts for backyards, HOA common areas, schools, parks, and commercial gathering spaces.",
    },
    {
      question: "Can irrigation near my yard affect a bocce court?",
      answer:
        "It can. Extra water near the court can soften the base and push edges out of line. We review irrigation and drainage before we build.",
    },
    {
      question: "Can you resurface an old bocce court?",
      answer:
        "Yes. We can refresh worn play beds, fix low spots, and repair borders so the ball rolls true again.",
    },
    {
      question: "Can you add lighting to a Chandler bocce court?",
      answer:
        "Yes. Court lighting makes cooler evening games easy, which helps during Chandler summers.",
    },
    {
      question: "How do I get a free bocce court quote?",
      answer:
        "Call (208) 979-0002 or contact us online with your Chandler address and goals. We will review your site and send a free quote.",
    },
    {
      question: "What areas near Chandler do you serve?",
      answer:
        "Besides Chandler, we serve Gilbert, Mesa, Tempe, Phoenix, Scottsdale, and other Maricopa County locations.",
    },
  ],
});

export const PM_RACQUETBALL_COURTS_CHANDLER_AZ_CONFIG = courtBuilderCityConfig({
  slug: "racquetball-courts-chandler-az",
  cityName: "Chandler",
  stateName: "Arizona",
  serviceName: "Racquetball Courts Chandler AZ",
  heroTitle: "Racquetball Courts Chandler, AZ",
  heroSubtitle:
    "Racquetball court planning for Chandler homes, clubs, and facilities, with indoor sports flooring, hardwood, acrylic options, and design-build support.",
  metaTitle: "Racquetball Court Construction Chandler, AZ | Indoor Courts",
  metaDescription:
    "Build a dedicated racquetball court in Chandler, AZ, for your home, club or training facility. Explore indoor flooring, court striping and custom design.",
  faqHeading: "Racquetball Courts Chandler AZ Questions",
  heroImageFragment: "indoor hardwood basketball court gym interior",
  faqItems: [
    {
      question: "Do you build racquetball courts in Chandler, AZ?",
      answer:
        "Yes. Hatz Court Builders plans racquetball courts for homes, clubs, and commercial recreation spaces as part of our sports construction work.",
    },
    {
      question: "What surfaces can work for an indoor racquetball court?",
      answer:
        "Hardwood and other indoor sports flooring systems are common choices. Acrylic hard surfaces can also fit some room plans.",
    },
    {
      question: "Can you convert an existing room into a racquetball court?",
      answer:
        "Often yes. We review the room size, access, flooring needs, lighting, and layout before recommending a plan.",
    },
    {
      question: "Do you work with residential and commercial clients?",
      answer:
        "Yes. We serve homeowners, clubs, schools, and commercial facilities across Chandler and nearby Maricopa County cities.",
    },
    {
      question: "Can a racquetball project include lighting and striping?",
      answer:
        "Yes. Lighting and court striping are part of many indoor court projects so the room plays clearly and safely.",
    },
    {
      question: "How do I get a free quote for racquetball courts in Chandler?",
      answer:
        "Call (208) 979-0002 or contact us online with your address and space details. We will review options and send a free quote.",
    },
    {
      question: "What nearby areas do you serve?",
      answer:
        "Besides Chandler, we serve Gilbert, Mesa, Tempe, Phoenix, Scottsdale, and other Maricopa County locations.",
    },
  ],
});

export const PM_COURT_BUILDER_CHANDLER_AZ_CONFIG = courtBuilderCityConfig({
  slug: "court-builder-chandler-az",
  cityName: "Chandler",
  stateName: "Arizona",
  heroTitle: "Court Builder Chandler, AZ",
  heroSubtitle: "Make More of Your Chandler Property With a Custom Athletic Court",
  metaTitle: "Court Builder Chandler, AZ | Custom Athletic Court Installation",
  metaDescription:
    "Build a custom athletic court in Chandler, AZ. We specialize in tennis, basketball and pickleball court construction, resurfacing, repairs and court upgrades.",
  heroImageFragment: "gray pickleball basketball court backyard",
  faqHeading: "Answers to Your Chandler Sports Court Construction Questions",
  faqItems: [
    {
      question: "How much does it cost to build a backyard sports court?",
      answer:
        "For preliminary budgeting, a backyard sports court may cost approximately $6 to $25.50 per square foot, with certain residential multi-sport installations ranging from $5,400 to $53,550 or more. Larger courts, premium athletic surfaces, specialized foundations, extensive grading, lighting, and fencing may require substantially higher budgets. These figures are general planning allowances rather than official installation rates. Contact Hatz Court Builders for pricing based on your Chandler property and project requirements.",
    },
    {
      question: "What is the cheapest way to make a sports court?",
      answer:
        "Using an existing structurally sound concrete surface may be one of the more economical ways to create a recreational court. Compatible athletic coatings, playing lines, portable equipment, and compact court dimensions can help limit construction requirements. However, the existing surface must have suitable drainage, dimensions, and structural conditions. If a new court is required, reducing optional accessories may be preferable to compromising essential groundwork or foundation preparation.",
    },
    {
      question: "How long does it take to build a sports court?",
      answer:
        "A new sports court may take approximately four to six weeks or longer, depending on the size, materials, site preparation, permitting, and additional equipment involved. Concrete foundations also require appropriate curing before athletic surfacing can begin. Chandler's extreme summer temperatures and monsoon rainfall may influence certain construction stages. Larger commercial developments generally require project-specific scheduling.",
    },
    {
      question: "How long does a sports court last?",
      answer:
        "A well-constructed and maintained athletic court may remain functional for 15 to 25 years or longer, although the foundation and finished playing surface have different service lives. Outdoor acrylic coatings may require resurfacing considerably sooner, depending on usage, material quality, UV exposure, and surface condition. In Chandler, regular cleaning, drainage inspections, and timely repairs can help preserve court performance.",
    },
    {
      question: "What sports can you play on a multi-use court?",
      answer:
        "A custom multi-use court can accommodate basketball, pickleball, volleyball, badminton, and other compatible recreational activities. The available dimensions, surface materials, court markings, and equipment determine which sports can share the playing area. Hatz Court Builders designs multi-use courts around the property's available space and the activities homeowners, schools, or commercial facilities want to support.",
    },
  ],
});

export const PM_COURT_BUILDER_GLENDALE_AZ_CONFIG = courtBuilderCityConfig({
  slug: "court-builder-glendale-az",
  cityName: "Glendale",
  stateName: "Arizona",
  metaTitle: "Court Builder Glendale, AZ | Custom Multi-Use Court Construction",
  metaDescription:
    "Create a versatile athletic space with our court builders in Glendale, AZ. We construct tennis, pickleball and basketball courts and provide resurfacing.",
  heroImageFragment: "outdoor multi court acrylic surfacing",
  faqItems: [
    {
      question: "What should I know before building a court in Glendale?",
      answer:
        "Site grading, drainage, sun exposure, and sport layout all affect long-term playability and maintenance.",
    },
    {
      question: "Can one court be used for more than one sport?",
      answer:
        "Yes. Multi-use layouts can combine sports with clear line planning and proper equipment spacing.",
    },
    {
      question: "When does a court need resurfacing instead of a full rebuild?",
      answer:
        "Resurfacing is often suitable when base condition is stable and wear is primarily in the surface layer.",
    },
    {
      question: "Do you build courts for homes and commercial properties?",
      answer:
        "Yes, Hatz Court Builders works on residential court construction and commercial court construction. Projects may include backyard courts, school courts, athletic facility courts, park courts, and HOA community courts. Each project is planned around the space, users, and long-term maintenance needs.",
    },
    {
      question: "Can you install court accessories and game equipment?",
      answer:
        "Yes, court accessory installation can be included with the project. This may include net system installation, basketball hoop installation, posts and hardware installation, surface protection, and game line setup. Good equipment placement helps the court feel safer and easier to use.",
    },
    {
      question: "How do Glendale weather conditions affect court planning?",
      answer:
        "Strong sun, heat, dust, and seasonal storms can affect surface wear, color, drainage, and maintenance. That is why material selection, surface sealing, slope, and prep work matter. A court built for Arizona conditions will usually be easier to care for over time.",
    },
    {
      question: "Can an older court be converted for pickleball or another sport?",
      answer:
        "Yes, many older courts can be updated through court restoration, layout updates, resurfacing, and court conversions. A tennis court, basketball area, or worn multi-use court may be changed to better support pickleball or shared play. The first step is checking the surface, size, and base condition.",
    },
  ],
});

export const PM_COURT_BUILDER_PEORIA_AZ_CONFIG = courtBuilderCityConfig({
  slug: "court-builder-peoria-az",
  cityName: "Peoria",
  stateName: "Arizona",
  metaTitle: "Athletic Court Builders Peoria, AZ | Construction & Resurfacing",
  metaDescription:
    "Work with licensed court builders in Peoria, AZ, for residential and commercial athletic court construction and resurfacing. Start planning your project.",
  heroImageFragment: "pickleball line striping on concrete",
  faqItems: [
    {
      question: "What should I know before building a court in Peoria?",
      answer:
        "Planning for sun exposure, drainage, grading, and sport-specific layout is key for long-term court performance.",
    },
    {
      question: "Can one court be used for more than one sport?",
      answer:
        "Yes. We can design multi-use layouts for basketball, pickleball, tennis, volleyball, and related game lines.",
    },
    {
      question: "What court surface works well in Arizona heat?",
      answer:
        "Acrylic, cushioned acrylic, modular tile, and synthetic systems can all work when matched to site and use.",
    },
    {
      question: "Do you handle court resurfacing in Peoria?",
      answer:
        "Yes, Hatz Court Builders handles court resurfacing, surface recoating, crack repair, court restoration, layout updates, and court conversions. Resurfacing can improve play, color, grip, and appearance when the base is still in workable shape. A site review helps decide if repair or a full rebuild is the better choice.",
    },
    {
      question: "Can you build courts for schools, parks, and HOAs?",
      answer:
        "Yes, we build school courts, athletic facility courts, park courts, HOA community courts, and other commercial court projects. These spaces often need strong surfaces, clear game lines, safe equipment placement, and layouts that support heavy use. Planning is based on traffic, sport type, access, and long-term upkeep.",
    },
    {
      question: "How long does a custom court project take?",
      answer:
        "The timeline depends on court size, surface type, site prep, weather, materials, and project scope. A simple backyard court may move faster than a large commercial court or a full court conversion. After the property review, Hatz Court Builders can give a clearer schedule for design, prep, buildout, and finishing.",
    },
  ],
});

export const PM_COURT_BUILDER_TEMPE_AZ_CONFIG = courtBuilderCityConfig({
  slug: "court-builder-tempe-az",
  cityName: "Tempe",
  stateName: "Arizona",
  metaTitle: "Tempe Court Builders | Custom Athletic Courts & Installation",
  metaDescription:
    "Build or upgrade your athletic court in Tempe, AZ. We offer custom tennis, pickleball and basketball court construction, resurfacing and court improvements.",
  heroImageFragment: "pickleball court hoa line paint and coating",
  faqItems: [
    {
      question: "What should I know before building a court in Tempe?",
      answer:
        "A site review should evaluate grading, drainage, access, and sun exposure before selecting layout and surface.",
    },
    {
      question: "Which court surfaces work well in Arizona heat?",
      answer:
        "Acrylic, cushioned acrylic, modular tile, and synthetic systems are common depending on usage and maintenance goals.",
    },
    {
      question: "Can one court be used for tennis, basketball, and pickleball?",
      answer:
        "Yes. Multi-use line planning allows one court to support multiple sports when spacing is designed correctly.",
    },
    {
      question: "Do you handle court resurfacing in Tempe?",
      answer:
        "Yes, Hatz Court Builders handles court resurfacing, surface recoating, crack repair, court restoration, layout updates, and court conversions. Resurfacing can help improve play, color, traction, and appearance when the base is still in usable condition. A site review helps decide whether resurfacing or a larger repair is the better option.",
    },
    {
      question: "How long does a custom court project take?",
      answer:
        "The timeline depends on the court size, surface type, site prep needs, weather, access, and selected components. A small residential court may move faster than a large commercial court or athletic facility project. After the property review, Hatz Court Builders can provide a clearer schedule based on the actual build plan.",
    },
    {
      question: "Can you build courts for schools, HOAs, and parks?",
      answer:
        "Yes, Hatz Court Builders works on residential and commercial court construction, including school courts, park courts, HOA community courts, backyard courts, and athletic facility courts. These projects often need strong layout planning, durable surfaces, clean game lines, and safe equipment placement for daily use.",
    },
    {
      question: "What causes outdoor courts to crack or wear out early?",
      answer:
        "Outdoor courts can crack or wear early when the base is not prepared well, drainage is poor, materials are mismatched, or the surface is not protected. Arizona sun can also fade and dry out certain finishes faster when the wrong system is used. Good prep, proper coating systems, and regular maintenance help extend court life.",
    },
    {
      question: "Can I choose the court colors and game lines?",
      answer:
        "Yes, color customization and line striping are part of the design process. You can plan colors around the property, school, facility, or sport use. Hatz Court Builders can also help with layout updates when converting an older court for new sports or mixed play.",
    },
  ],
});

export const PM_RENTAL_MARKETING_CONFIG = pmServiceConfig({
  slug: "rental-property-marketing",
  serviceName: "Rental Property Marketing",
  metaTitle: "Rental Property Marketing | Local Experts | Greenbelt",
  metaDescription:
    "Rental property marketing that attracts qualified tenants and reduces vacancy. Get better listing results. Request your rental analysis.",
  heroTitle: "Rental Property Marketing",
  heroSubtitle:
    "Fill vacancies faster. Attract better tenants. Stop guessing what works with structured rental property marketing.",
  heroImageFragment: "property manager leasing sign tenant placement",
  bottomContactHeading: "Improve Your Rental Property Marketing",
  bottomContactSubtext:
    "Tell us about your listing — we'll review positioning, photos, and platform exposure for your Meridian-area rental.",
  faqHeading: "Questions About Rental Property Marketing",
  faqIntro: "Straight answers for property owners — call if yours is not listed.",
  timelineHeading: "Our Structured Rental Property Marketing System",
  timelineIntro: "A repeatable process from market review through performance adjustments.",
  timelineSteps: [
    { title: "Market Review and Positioning", body: "We study local demand and decide how the property should be presented." },
    { title: "Property Preparation", body: "We recommend small changes that help the listing stand out." },
    { title: "Listing Creation", body: "We build clear, detailed listings with strong photos and descriptions." },
    { title: "Multi-Platform Promotion", body: "We publish the listing across platforms renters actively use." },
    { title: "Lead Management and Screening", body: "We handle inquiries, review applicants, and filter for quality tenants." },
    { title: "Performance Tracking and Adjustments", body: "We monitor results and adjust the listing to improve response." },
  ],
  faqItems: [
    {
      question: "How do you market a rental property effectively?",
      answer:
        "We position the property based on location and demand, then list it across multiple platforms. Strong photos and clear descriptions help attract attention.",
    },
    {
      question: "Where are rental listings posted?",
      answer:
        "Listings are shared across popular rental platforms where tenants actively search. This helps increase visibility and reach.",
    },
    {
      question: "How do you attract better tenants through marketing?",
      answer:
        "Good marketing filters the right audience. When listings are clear and accurate, they attract applicants who are a better fit.",
    },
    {
      question: "How quickly can marketing generate inquiries?",
      answer:
        "It depends on pricing and demand, but well-positioned listings usually start getting attention quickly.",
    },
    {
      question: "Do you adjust the listing if it's not performing?",
      answer: "Yes. We track performance and make changes to improve visibility and response.",
    },
  ],
});

export const PM_INSPECTIONS_CONFIG = pmServiceConfig({
  slug: "property-inspections",
  serviceName: "Property Inspections",
  metaTitle: "Property Inspections | Accurate Reporting | Greenbelt",
  metaDescription:
    "Property inspections with clear reporting and consistent oversight. Stay informed and protect your rental. Request your rental analysis now.",
  heroTitle: "Property Inspections",
  heroSubtitle:
    "Catch issues early. Keep records clear. Protect your rental long term with structured property inspections.",
  heroImageFragment: "updated bathroom rental listing photography",
  bottomContactHeading: "Schedule Property Inspections",
  bottomContactSubtext:
    "Learn how our inspection process creates clear visibility into your rental's condition over time.",
  faqHeading: "Common Questions on Property Inspections",
  faqIntro: "Straight answers for property owners — call if yours is not listed.",
  timelineHeading: "Our Detailed Approach to Property Inspections",
  timelineIntro: "Consistent scheduling, documentation, and follow-through on every visit.",
  timelineSteps: [
    { title: "Inspection Scheduling", body: "We set routine inspection timelines based on the property and lease terms." },
    { title: "Pre-Inspection Review", body: "We review past reports and known issues before visiting the property." },
    { title: "On-Site Inspection", body: "We check key areas of the home for condition, damage, and maintenance needs." },
    { title: "Photo Documentation", body: "We capture detailed images to support condition reporting." },
    { title: "Report Creation", body: "We organize findings into a clear, easy-to-read report." },
    { title: "Follow-Up Actions", body: "We coordinate any needed maintenance or next steps based on findings." },
  ],
  faqItems: [
    {
      question: "How often are property inspections done?",
      answer:
        "Inspections are typically scheduled at key points, such as during tenancy and at move-in or move-out. Timing depends on the property and lease terms.",
    },
    {
      question: "What is included in a property inspection?",
      answer:
        "We review the overall condition of the property, including interior spaces, exterior areas, and key systems like plumbing and HVAC.",
    },
    {
      question: "Do tenants need to be present during inspections?",
      answer:
        "Not always, but proper notice is given. Inspections are handled in a way that respects tenant occupancy.",
    },
    {
      question: "Will I receive a report after the inspection?",
      answer: "Yes. You receive a report with notes and photos showing the property's condition.",
    },
    {
      question: "What happens if damage is found?",
      answer: "We document the issue and coordinate next steps, including repairs if needed.",
    },
  ],
});

export const PM_MAINTENANCE_CONFIG = pmServiceConfig({
  slug: "property-maintenance-services",
  serviceName: "Property Maintenance Services",
  metaTitle: "Property Maintenance Services | Fast Repairs | Greenbelt",
  metaDescription:
    "Property maintenance services focused on fast response and quality repairs. Request your rental analysis today.",
  heroTitle: "Property Maintenance Services",
  heroSubtitle:
    "Fix issues fast. Prevent bigger problems. Keep your rental in working order with coordinated maintenance.",
  heroImageFragment: "rental home backyard property maintenance services",
  bottomContactHeading: "Get Property Maintenance Services",
  bottomContactSubtext:
    "Share your maintenance concerns — we'll explain how requests are tracked and resolved.",
  faqHeading: "Questions About Property Maintenance Services",
  faqIntro: "Straight answers for property owners — call if yours is not listed.",
  timelineHeading: "Our Coordinated System for Property Maintenance Services",
  timelineIntro: "From request intake through documentation and owner updates.",
  timelineSteps: [
    { title: "Request Intake", body: "We receive and log maintenance requests from tenants." },
    { title: "Issue Assessment", body: "We review the problem and determine the best solution." },
    { title: "Vendor Coordination", body: "We schedule trusted vendors to complete the work." },
    { title: "Repair Execution", body: "The issue is fixed with focus on quality and timing." },
    { title: "Work Verification", body: "We confirm the job is completed correctly." },
    { title: "Documentation and Reporting", body: "We record the work and update the owner with details." },
  ],
  faqItems: [
    {
      question: "How are maintenance requests handled?",
      answer:
        "Tenants submit requests, and we review and coordinate the repair. Each request is tracked from start to finish.",
    },
    {
      question: "Do you handle emergency maintenance?",
      answer: "Yes. Urgent issues are addressed quickly to prevent further damage or risk.",
    },
    {
      question: "How do you choose contractors?",
      answer:
        "We work with trusted local vendors who meet our standards for quality and reliability.",
    },
    {
      question: "Will I be updated during repairs?",
      answer: "Yes. You receive updates on the status and completion of maintenance work.",
    },
    {
      question: "Do you handle preventive maintenance?",
      answer: "Yes. We look for ways to address issues early before they become larger problems.",
    },
  ],
});

export const PM_TENANT_PLACEMENT_CONFIG = pmServiceConfig({
  slug: "tenant-placement-services",
  serviceName: "Tenant Placement Services",
  metaTitle: "Tenant Placement Services | Local Meridian Experts | Greenbelt",
  metaDescription:
    "Tenant placement services built to find reliable tenants and reduce risk. Start your lease the right way. Request your rental analysis now.",
  heroTitle: "Tenant Placement Services",
  heroSubtitle:
    "Find the right tenant. Avoid costly mistakes. Start the lease with confidence through structured placement.",
  heroImageFragment: "welcoming entryway rental home interior",
  bottomContactHeading: "Get Tenant Placement Services",
  bottomContactSubtext:
    "Request a rental analysis — we'll walk through marketing, screening, and lease execution for your property.",
  faqHeading: "Tenant Placement Service Questions Owners Ask",
  faqIntro: "Straight answers for property owners — call if yours is not listed.",
  timelineHeading: "Our Screening Process for Tenant Placement Services",
  timelineIntro: "From rental evaluation through move-in coordination.",
  timelineSteps: [
    { title: "Rental Evaluation", body: "We review the property and determine how to position it in the market." },
    { title: "Property Readiness", body: "We recommend small updates that help improve appeal and showings." },
    { title: "Listing and Promotion", body: "We create and publish listings across platforms renters use." },
    { title: "Applicant Screening", body: "We review applications, verify information, and filter for quality tenants." },
    { title: "Lease Preparation", body: "We prepare lease agreements with clear terms and expectations." },
    { title: "Tenant Move-In Coordination", body: "We finalize the process and prepare the tenant for a smooth move-in." },
  ],
  faqItems: [
    {
      question: "What do tenant placement services include?",
      answer:
        "They cover listing the property, handling inquiries, screening applicants, and preparing the lease. The goal is to place a qualified tenant.",
    },
    {
      question: "How do you screen tenants before placement?",
      answer:
        "We review credit, background, income, and rental history. This helps reduce risk and find reliable tenants.",
    },
    {
      question: "How long does it take to place a tenant?",
      answer:
        "Timing depends on pricing and demand, but properly positioned listings usually attract applicants faster.",
    },
    {
      question: "Do you handle showings and communication?",
      answer:
        "Yes. We manage inquiries, schedule showings, and communicate with applicants throughout the process.",
    },
    {
      question: "Can tenant placement help reduce vacancy?",
      answer:
        "Yes. Strong marketing and quick response times help fill units faster without lowering standards.",
    },
  ],
});
