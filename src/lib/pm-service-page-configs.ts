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
  faqItems: TreasureValleyFaqItem[];
}): TreasureValleyPressurePageConfig {
  const stateName = input.stateName ?? "Idaho";
  const baseConfig = pmServiceConfig({
    slug: input.slug,
    serviceName: `Court Builder ${input.cityName}, ${stateName === "Arizona" ? "AZ" : "ID"}`,
    metaTitle: input.metaTitle,
    metaDescription: input.metaDescription,
    heroTitle: `Court Builder ${input.cityName}, ${stateName === "Arizona" ? "AZ" : "ID"}`,
    heroSubtitle:
      "Licensed and insured court builders with custom athletic court experience across the Treasure Valley.",
    heroImageFragment: input.heroImageFragment,
    bottomContactHeading: `Start Your ${input.cityName} Court Project`,
    bottomContactSubtext:
      "Request your free quote and we will map out the right layout, surface system, and construction approach for your property.",
    faqHeading: `Court Builder ${input.cityName} Questions`,
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
  return {
    ...baseConfig,
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

export const PM_BASKETBALL_COURT_CONSTRUCTION_CONFIG = courtConstructionServiceConfig({
  slug: "basketball-court-construction",
  serviceName: "Basketball Court Construction",
  metaTitle: "Basketball Court Construction | Custom Courts | Hatz",
  metaDescription:
    "Custom basketball court construction for homes, schools, HOAs, parks, gyms, and commercial properties. Call us today!",
  heroTitle: "Basketball Court Construction",
  heroSubtitle:
    "Professional basketball court construction for residential and commercial projects — backyard courts, half courts, full courts, schools, parks, and multi-use facilities.",
  heroImageFragment: "basketball tile court modular hoop goal",
  faqHeading: "Basketball Court Construction Questions",
  faqItems: [
    {
      question: "What types of basketball courts do you build?",
      answer:
        "We build backyard basketball courts, half-court basketball courts, full basketball courts, indoor basketball courts, outdoor basketball courts, school basketball courts, HOA basketball courts, park courts, church courts, and commercial basketball courts.",
    },
    {
      question: "Can you build a basketball court in a backyard?",
      answer:
        "Yes. Backyard Basketball Court Construction is a popular choice for homeowners who want a private space for family games, training, and daily practice.",
    },
    {
      question: "Is a half court better than a full court?",
      answer:
        "It depends on the available space and how the court will be used. A half court is great for smaller properties, shooting practice, and casual games. A full court is better for organized play, team drills, and larger facilities.",
    },
    {
      question: "Can a basketball court also be used for pickleball?",
      answer:
        "Yes. Many basketball courts can be designed as multi-use courts with pickleball lines. This gives one court area more flexibility.",
    },
    {
      question: "What surface is best for a basketball court?",
      answer:
        "The best surface depends on the project. Outdoor courts may use acrylic, cushioned acrylic, asphalt, concrete, modular surfaces, or specialty systems. Indoor courts may use hardwood, modular surfaces, or other indoor court systems.",
    },
    {
      question: "Do you build basketball courts for schools and parks?",
      answer:
        "Yes. Hatz Court Builders provides Basketball Court Construction for schools, parks, recreation centers, universities, municipalities, and public-use facilities.",
    },
    {
      question: "Can you add custom colors or logos?",
      answer:
        "Yes. Custom colors, striping, and logos can be added to many basketball court projects. This is popular for schools, gyms, clubs, and commercial facilities.",
    },
    {
      question: "Do you offer court resurfacing and repairs?",
      answer:
        "Yes. We help with basketball court resurfacing, repairs, renovations, restriping, equipment upgrades, and surface improvements.",
    },
    {
      question: "Can you add lighting and fencing?",
      answer:
        "Yes. Lighting and fencing can be included in many Basketball Court Construction projects depending on the property, layout, and goals.",
    },
    {
      question: "What makes Hatz Court Builders different?",
      answer:
        "Hatz Court Builders specializes in many types of sports construction. We build basketball courts, pickleball courts, tennis courts, volleyball courts, futsal courts, bocce courts, custom courts, commercial courts, and multi-court systems using a wide range of surface options.",
    },
  ],
});

export const PM_PICKLEBALL_COURT_CONSTRUCTION_CONFIG = courtConstructionServiceConfig({
  slug: "pickleball-court-construction",
  serviceName: "Pickleball Court Construction",
  metaTitle: "Pickleball Court Construction | One-Stop Shop | Hatz",
  metaDescription:
    "Professional pickleball court construction for homes, schools, HOAs, parks, clubs, and commercial properties. Call us today.",
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
  metaTitle: "Volleyball Court Construction | Custom Courts | Hatz",
  metaDescription:
    "Custom volleyball court construction for homes, schools, parks, HOAs, clubs, recreation centers, and commercial properties. Call us today!",
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
  metaTitle: "Futsal / Soccer Court Construction | Custom Courts | Hatz",
  metaDescription:
    "Custom futsal and soccer court construction for schools, parks, clubs, training facilities, HOAs, gyms, and commercial properties. Call us today!",
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
  metaTitle: "Tennis Court Construction | Custom Courts | Hatz",
  metaDescription:
    "Custom tennis court construction for homes, schools, clubs, HOAs, parks, and commercial properties. Call us today!",
  heroTitle: "Tennis Court Construction",
  heroSubtitle:
    "Professional tennis court construction for residential and commercial projects — private courts, school courts, club courts, park courts, and multi-use facilities.",
  heroImageFragment: "tennis court resurface blue and green acrylic",
  faqHeading: "Tennis Court Construction Questions",
  faqItems: [
    {
      question: "What types of tennis courts do you build?",
      answer:
        "We build backyard tennis courts, private tennis courts, school tennis courts, HOA tennis courts, park tennis courts, club tennis courts, resort tennis courts, commercial tennis courts, and multi-use tennis courts.",
    },
    {
      question: "Can you build a tennis court in a backyard?",
      answer:
        "Yes. Backyard Tennis Court Construction is a good option for homeowners with enough space for a full tennis court layout, safety zones, access, and any added features.",
    },
    {
      question: "Can a tennis court include pickleball lines?",
      answer:
        "Yes. Many tennis courts can include pickleball lines so the court can support more than one sport.",
    },
    {
      question: "Can an old tennis court be converted to pickleball courts?",
      answer:
        "Yes, in many cases. Some older tennis courts can be converted into dedicated pickleball courts depending on the size, surface condition, and layout.",
    },
    {
      question: "What surface is best for a tennis court?",
      answer:
        "The best surface depends on the project. Common options may include acrylic, cushioned acrylic, asphalt, concrete, modular surfaces, synthetic surfaces, and other specialty court systems.",
    },
    {
      question: "Do you build tennis courts for schools and clubs?",
      answer:
        "Yes. Hatz Court Builders provides Tennis Court Construction for schools, universities, private clubs, parks, recreation centers, resorts, and commercial properties.",
    },
    {
      question: "Do you offer tennis court resurfacing?",
      answer:
        "Yes. We help with tennis court resurfacing, repairs, renovations, restriping, color coating, net systems, and surface updates.",
    },
    {
      question: "Can you add fencing and lighting?",
      answer:
        "Yes. Fencing and lighting can be included in many Tennis Court Construction projects depending on the property, layout, and project goals.",
    },
    {
      question: "Can you add custom colors or logos?",
      answer:
        "Yes. Custom colors, striping, and logos can be added to many tennis court projects. This is popular for schools, clubs, resorts, and commercial facilities.",
    },
    {
      question: "What makes Hatz Court Builders different?",
      answer:
        "Hatz Court Builders specializes in many types of sports construction. We build tennis courts, pickleball courts, basketball courts, volleyball courts, futsal courts, bocce courts, custom courts, commercial courts, and multi-court systems using a wide range of surface options.",
    },
  ],
});

export const PM_COURT_BUILDERS_BOISE_CONFIG = courtBuilderCityConfig({
  slug: "court-builders-boise-id",
  cityName: "Boise",
  metaTitle: "Court Builders Boise, ID | Custom Court Builders | Hatz Court",
  metaDescription:
    "Best Boise court builders for custom basketball, pickleball, tennis, and multi-sport courts. Licensed and insured with 15+ years of experience.",
  heroImageFragment: "backyard gray basketball court installation",
  faqItems: [
    {
      question: "What types of courts do you build?",
      answer:
        "We build a wide range of courts including basketball, pickleball, tennis, and multi-sport, tennis, and other courts for both residential and commercial properties.",
    },
    {
      question: "How long does it take to build a court?",
      answer:
        "Project timelines vary based on size and complexity, but most courts are completed within a few weeks from start to finish.",
    },
    {
      question: "Do you offer custom court designs?",
      answer:
        "Yes, every court is fully customizable—from layout and colors to surfacing and accessories—to match your vision and needs.",
    },
    {
      question: "What materials do you use?",
      answer:
        "We use high-quality materials such as acrylic coatings, modular tiles, and hardwood surfaces to ensure durability and performance.",
    },
    {
      question: "Can you resurface or upgrade an existing court?",
      answer:
        "Absolutely. We offer resurfacing, repairs, and upgrades to restore and enhance your current court.",
    },
    {
      question: "Do you handle both residential and commercial projects?",
      answer:
        "Yes, we work on everything from backyard courts to large-scale commercial and recreational facilities.",
    },
    {
      question: "How much does a court project cost?",
      answer:
        "Costs vary depending on size, materials, and customization. We provide detailed, customized quotes to fit your budget.",
    },
    {
      question: "Do you offer warranties or guarantees?",
      answer:
        "Yes, we stand behind our work with quality guarantees to ensure long-lasting results and customer satisfaction.",
    },
  ],
});

export const PM_COURT_BUILDER_MERIDIAN_CONFIG = courtBuilderCityConfig({
  slug: "court-builder-meridian-id",
  cityName: "Meridian",
  metaTitle: "Court Builder Meridian ID | Custom Courts | Hatz Court",
  metaDescription:
    "Licensed and insured court builder in Meridian, Idaho for custom court design, construction, resurfacing, and upgrades.",
  heroImageFragment: "backyard pickleball basketball dual sport court",
  faqItems: [
    {
      question: "How do I know what type of court surface is best for my Meridian property?",
      answer:
        "The best surface depends on the sport, how often the court will be used, whether it is indoor or outdoor, and how much maintenance you want. Acrylic courts are popular for outdoor play, modular systems can work well for multi-sport spaces, and hardwood is often used for indoor athletic courts. Hatz Court Builders can review your property, goals, and budget before recommending a court system.",
    },
    {
      question: "Can Hatz Court Builders build Meridian pickleball courts for backyards?",
      answer:
        "Yes, Hatz Court Builders designs and builds custom pickleball courts for Meridian homeowners. The team can help with court size, layout, surfacing, line striping, net system installation, and color options. The court can be built as a dedicated pickleball court or as part of a larger multi-use court.",
    },
    {
      question: "What problems can poor drainage cause on an outdoor court in Meridian?",
      answer:
        "Poor drainage can leave standing water on the court, which can speed up surface wear and create unsafe playing conditions. Over time, water can also make cracks, settling, and base movement worse, especially during Idaho’s freeze-thaw season. Proper planning helps the court shed water better and last longer.",
    },
    {
      question: "Do you build indoor pickleball courts Meridian facilities can use year-round?",
      answer:
        "Hatz Court Builders can help with indoor pickleball court planning and construction for facilities, gyms, schools, and private spaces. Indoor courts may use hardwood, acrylic, modular, or other surface options based on the building, use level, and desired feel of play. The team can also help with lines, nets, posts, and court accessory installation.",
    },
    {
      question: "Can an old tennis court be converted into pickleball or basketball use?",
      answer:
        "Yes, many existing courts can be updated or converted if the base and surface are in workable condition. Hatz Court Builders can inspect the court, check for cracks or drainage problems, and recommend resurfacing, layout updates, new striping, or court conversions. This can be a practical way to make an older court more useful.",
    },
    {
      question: "How long does a custom court project usually take?",
      answer:
        "The timeline depends on the court size, surface type, site prep needs, weather, and whether the project is new construction or resurfacing. A simple resurfacing job is often faster than a full custom court construction project. Hatz Court Builders gives a clearer timeline after the site visit and design review.",
    },
    {
      question: "Can you build a Meridian basketball court for both kids and adults?",
      answer:
        "Yes, Hatz Court Builders can design a basketball court around the players, space, and goals for the property. Some homeowners want a half court for driveway-style play, while others want a larger backyard court with custom surfacing, line striping, and hoop installation. The layout can be planned for safety, daily use, and long-term value.",
    },
    {
      question: "Do commercial courts need different materials than residential courts?",
      answer:
        "Commercial courts often need materials and finishes that can handle heavier use from schools, parks, HOAs, and athletic facilities. Residential courts can still use strong materials, but the design may focus more on backyard fit, style, and family use. Hatz Court Builders helps choose the right system based on traffic, sport type, maintenance needs, and budget.",
    },
  ],
});

export const PM_COURT_BUILDER_NAMPA_CONFIG = courtBuilderCityConfig({
  slug: "court-builder-nampa-id",
  cityName: "Nampa",
  metaTitle: "Court Builder Nampa, ID | Custom Courts | Hatz Court Builders",
  metaDescription:
    "Top-rated court builder in Nampa, Idaho with 15+ years of experience in custom athletic court construction and resurfacing.",
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
  metaTitle: "Court Builder Caldwell, ID | Custom Courts | Hatz Court Builders",
  metaDescription:
    "Caldwell court builder services for residential and commercial courts, including design-build, resurfacing, and complete installations.",
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
  metaTitle: "Court Builder Middleton ID | Custom Courts | Hatz Court Builders",
  metaDescription:
    "Trusted court builder in Middleton, Idaho for custom athletic courts, resurfacing, repair, and complete design-build projects.",
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
  metaTitle: "Court Builder Star ID | Custom Courts | Hatz Court Builders",
  metaDescription:
    "Best court builder in Star, Idaho for custom tennis, basketball, pickleball, and multi-sport court construction.",
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
  metaTitle: "Court Builder Eagle, ID | Custom Courts | Hatz Court Builders",
  metaDescription:
    "Court builder in Eagle, Idaho with 15+ years of experience in custom court design, build, resurfacing, and repair.",
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
  metaTitle: "Court Builder Scottsdale AZ | Custom Courts | Hatz Court Builders",
  metaDescription:
    "Custom athletic court construction in Scottsdale, AZ with durable materials and layout planning for Arizona heat, drainage, and long-term play.",
  heroImageFragment: "outdoor multi court acrylic surfacing",
  faqItems: [
    {
      question: "What type of court can I build in my backyard?",
      answer:
        "Hatz Court Builders can design backyard courts for pickleball, basketball, tennis, volleyball, and multi-sport use. The best layout depends on your available space, grading, access, and how you plan to use the court.",
    },
    {
      question: "Are outdoor courts hard to maintain in Arizona heat?",
      answer:
        "Outdoor courts need the right surface, base prep, and finish to handle heat, sun, dust, and seasonal rain. Good prep helps reduce early cracking, fading, and low spots.",
    },
    {
      question: "Can you build a court for a school, HOA, or public park?",
      answer:
        "Yes. Hatz Court Builders builds and updates courts for schools, HOAs, parks, athletic facilities, and shared community spaces.",
    },
    {
      question: "Can you build or resurface tennis courts?",
      answer:
        "Yes. Hatz Court Builders works on new and existing tennis court projects for homes, schools, clubs, and shared facilities. Scottsdale tennis courts may need acrylic surfacing, crack repair, recoating, color updates, net post replacement, or new striping depending on the court’s condition.",
    },
    {
      question: "What is different about indoor and outdoor tennis courts?",
      answer:
        "Indoor courts are usually planned around flooring, lighting, spacing, and player comfort. Indoor tennis courts Scottsdale facilities build do not face the same sun and monsoon exposure as outdoor courts, but they still need the right surface and layout for safe play.",
    },
    {
      question: "Can older public tennis courts be repaired instead of replaced?",
      answer:
        "Many older courts can be repaired or resurfaced if the base is still in usable condition. Public tennis courts Scottsdale communities already have may need crack repair, surface recoating, line updates, or court conversion work before a full replacement is needed.",
    },
    {
      question: "What surface is best for a custom athletic court?",
      answer:
        "The best surface depends on the sport, location, budget, and amount of play. Acrylic court systems, cushioned acrylic systems, modular tile court systems, synthetic court surfaces, vinyl court surfaces, and hardwood court surfaces each fit different needs. Hatz Court Builders helps match the surface to the property, sport, and long-term use.",
    },
  ],
});

export const PM_TENNIS_COURT_CONTRACTOR_SCOTTSDALE_AZ_CONFIG = courtBuilderCityConfig({
  slug: "tennis-court-contractor-scottsdale-az",
  cityName: "Scottsdale",
  stateName: "Arizona",
  metaTitle: "Tennis Court Contractor Scottsdale AZ | Hatz Court Builders",
  metaDescription:
    "Trusted tennis court contractor in Scottsdale, AZ for custom courts, resurfacing, repairs, and full design-build service.",
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

export const PM_COURT_BUILDER_PHOENIX_AZ_CONFIG = courtBuilderCityConfig({
  slug: "court-builder-phoenix-az",
  cityName: "Phoenix",
  stateName: "Arizona",
  metaTitle: "Court Builder Phoenix AZ | Custom Courts | Hatz Court Builders",
  metaDescription:
    "Licensed and insured Phoenix court builder for custom athletic courts, resurfacing, upgrades, and design-build projects.",
  heroImageFragment: "pickleball basketball line striping on concrete",
  faqItems: [
    {
      question: "What type of court surface works best in Phoenix heat?",
      answer:
        "Acrylic and modular systems are common for outdoor play. The right system depends on sport, budget, sun exposure, and maintenance goals.",
    },
    {
      question: "Can you build a court in a small Phoenix backyard?",
      answer:
        "Yes. We design compact custom layouts for half courts, multi-use courts, and focused game areas.",
    },
    {
      question: "How does drainage affect outdoor court construction?",
      answer:
        "Proper slope and drainage planning help move water away from the surface and reduce premature wear and damage.",
    },
    {
      question: "Can an old court be resurfaced instead of replaced?",
      answer:
        "Many older courts can be resurfaced if the base is still in workable condition. Resurfacing may include crack repair, surface recoating, color updates, line striping, layout changes, and court restoration. If the court has major base failure or drainage problems, deeper repair may be needed first. A site review is the best way to know which option makes sense.",
    },
    {
      question: "Can you add more than one sport to the same court?",
      answer:
        "Yes, many Phoenix customers choose multi-use court construction so one space can support tennis, basketball, volleyball, or other games. The layout must be planned carefully so the lines, nets, hoops, and play zones do not feel crowded. Color choices can also help separate each sport. This is a strong option for families, schools, and community spaces that need more use from one court.",
    },
    {
      question: "Are outdoor courts a good fit for Phoenix properties?",
      answer:
        "Yes, outdoor pickleball courts in Phoenix and other outdoor athletic courts can work well when they are planned around heat, drainage, sun exposure, and surface wear. The right layout and materials help the court perform better through daily use and Arizona weather. Hatz Court Builders reviews the site before recommending the best court system.",
    },
    {
      question: "Why hire a Phoenix-based installer for a pickleball court?",
      answer:
        "A Phoenix pickleball court installer should understand local heat, dust, grading, monsoon drainage, and property layouts. These details affect the base, surface, lines, equipment, and long-term play quality. Hatz Court Builders plans each project around the site so the finished court fits the space and performs well.",
    },
  ],
});

export const PM_PICKLEBALL_COURT_BUILDER_PHOENIX_AZ_CONFIG = courtBuilderCityConfig({
  slug: "pickleball-court-builder-phoenix-az",
  cityName: "Phoenix",
  stateName: "Arizona",
  metaTitle: "Pickleball Court Builder Phoenix, AZ | Hatz Court Builders",
  metaDescription:
    "Custom pickleball court builder in Phoenix, AZ for backyard, HOA, school, and facility projects.",
  heroImageFragment: "outdoor pickleball court red and green surface",
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
  metaTitle: "Phoenix AZ Tennis Court Builders | Hatz Court Builders",
  metaDescription:
    "Licensed Phoenix tennis court builders for custom tennis courts, resurfacing, and repairs.",
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
  metaTitle: "Basketball Court Construction Phoenix AZ | Hatz Court Builders",
  metaDescription:
    "Basketball court construction in Phoenix for residential and commercial projects with full layout and surfacing support.",
  heroImageFragment: "basketball tile court modular hoop goal",
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
  metaTitle: "Bocce Court Installation Phoenix AZ | Custom Courts | Phoenix AZ",
  metaDescription:
    "Professional bocce court installation in Phoenix for residential and commercial properties.",
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
  metaTitle: "Padel Court Builder Phoenix AZ | Custom Courts | Hatz",
  metaDescription:
    "Padel court builder in Phoenix for custom court design, construction, and upgrades.",
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
  metaTitle: "Court Builder Mesa AZ | Custom Courts | Hatz Court Builders",
  metaDescription:
    "Licensed and insured court builder in Mesa, AZ for custom residential and commercial courts.",
  heroImageFragment: "pickleball court green and red surface",
  faqItems: [
    {
      question: "What type of court surface works best in Mesa heat?",
      answer:
        "Acrylic and modular surfaces are common depending on sport use, maintenance priorities, and drainage conditions.",
    },
    {
      question: "Can you build a court in a backyard with limited space?",
      answer:
        "Yes. We can plan custom court dimensions and multi-use layouts to fit tighter residential properties.",
    },
    {
      question: "Do Mesa courts need special drainage planning?",
      answer:
        "Yes. Drainage planning helps avoid standing water, cracking, and early wear after heavy rain events.",
    },
    {
      question: "Can Hatz Court Builders resurface an older court?",
      answer:
        "Yes, Hatz Court Builders provides court resurfacing, surface recoating, crack repair, and court restoration. Resurfacing can help improve color, play feel, surface protection, and line visibility. If the court has deeper base issues, the team can review whether repairs or a larger restoration plan is the better choice.",
    },
    {
      question: "Do you build courts for schools, HOAs, parks, and businesses?",
      answer:
        "Yes, Hatz Court Builders handles commercial court construction for schools, athletic facilities, parks, HOA community courts, and other shared-use spaces. These projects often need clear layouts, durable surfaces, safe equipment placement, and court systems made for steady traffic. The team can also help with layout updates and court conversions.",
    },
    {
      question: "Can one court be used for several sports?",
      answer:
        "Yes, multi-use court construction is a smart option for many homes, schools, and community spaces. One court can support basketball, pickleball, tennis practice, volleyball, or other games with the right layout and line plan. Hatz Court Builders can help choose colors, lines, net systems, hoops, and court accessories so the space stays easy to use.",
    },
    {
      question: "How long does a custom court project take?",
      answer:
        "The timeline depends on the court size, site prep, surface system, weather, and project details. A new build with grading, base work, surfacing, coating, line striping, and equipment installation will take longer than a resurfacing project. Hatz Court Builders provides a clearer schedule after the site review and design plan.",
    },
    {
      question: "What makes Hatz Court Builders different from a general contractor?",
      answer:
        "Hatz Court Builders focuses on athletic courts, not general outdoor flatwork. That means the team looks at playability, court layout, sport rules, surface finishing, coating systems, court components, and long-term performance.",
    },
  ],
});

export const PM_COURT_BUILDER_GILBERT_AZ_CONFIG = courtBuilderCityConfig({
  slug: "court-builder-gilbert-az",
  cityName: "Gilbert",
  stateName: "Arizona",
  metaTitle: "Court Builder Gilbert AZ | Custom Courts | Hatz Court Builders",
  metaDescription:
    "Custom athletic court builder in Gilbert, AZ with licensed and insured design-build and resurfacing support.",
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

export const PM_COURT_BUILDER_CHANDLER_AZ_CONFIG = courtBuilderCityConfig({
  slug: "court-builder-chandler-az",
  cityName: "Chandler",
  stateName: "Arizona",
  metaTitle: "Court Builder Chandler AZ | Custom Courts | Hatz Court Builders",
  metaDescription:
    "Court builder in Chandler, AZ for custom court construction, resurfacing, and court upgrades.",
  heroImageFragment: "gray pickleball basketball court backyard",
  faqItems: [
    {
      question: "What type of court surface works best for Chandler’s heat?",
      answer:
        "Acrylic and modular options are common outdoor choices. We recommend based on usage, budget, and site conditions.",
    },
    {
      question: "Can you build a court in a Chandler backyard with limited space?",
      answer:
        "Yes. We design compact and custom layouts around yard constraints, safety spacing, and desired sports.",
    },
    {
      question: "Do Chandler courts need special drainage planning?",
      answer:
        "Yes. Monsoon runoff and low spots can damage courts without proper grading and drainage.",
    },
    {
      question: "Can an old court be resurfaced instead of replaced?",
      answer:
        "Many worn courts can be resurfaced if the base is still stable. Resurfacing may include crack repair, surface recoating, color updates, line striping, and layout changes. If the court has major base movement or drainage failure, deeper repair work may be needed first.",
    },
    {
      question: "What sports can be included on one court?",
      answer:
        "A multi-use court can include basketball, pickleball, tennis hit areas, volleyball, or other game layouts depending on the space. The key is planning the lines, equipment, and playing zones so the court does not feel crowded. Hatz Court Builders can help choose a layout that matches how the court will be used most.",
    },
    {
      question: "Do you build courts for schools, HOAs, and parks?",
      answer:
        "Yes, Hatz Court Builders works on commercial courts, community courts, school courts, park courts, HOA community courts, and athletic facility courts. These projects often need stronger planning for traffic, safety, line clarity, and long-term maintenance. The court system should match the level of daily use.",
    },
    {
      question: "How long does a custom court project take?",
      answer:
        "Project timing depends on the court size, surface type, site prep, weather, materials, and any repairs needed before installation. A simple resurfacing project is usually different from a full custom court construction project. After the site review, Hatz Court Builders can give a clearer timeline.",
    },
    {
      question: "Can the court colors and game lines be customized?",
      answer:
        "Yes, color customization and line striping are part of many court projects. You can choose colors that fit the property, school, HOA, or facility style. Game lines can also be planned for one sport or for several sports on the same court.",
    },
  ],
});

export const PM_COURT_BUILDER_GLENDALE_AZ_CONFIG = courtBuilderCityConfig({
  slug: "court-builder-glendale-az",
  cityName: "Glendale",
  stateName: "Arizona",
  metaTitle: "Court Builder Glendale AZ | Custom Courts | Hatz Court Builders",
  metaDescription:
    "Trusted court builder in Glendale, AZ for custom athletic courts, resurfacing, and repair services.",
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
  metaTitle: "Court Builder Peoria AZ | Custom Courts | Hatz Court Builders",
  metaDescription:
    "Licensed court builder in Peoria, AZ for residential and commercial court construction and resurfacing.",
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
  metaTitle: "Court Builder Tempe AZ | Custom Courts | Hatz Court Builders",
  metaDescription:
    "Custom athletic court builder in Tempe, AZ for new court construction, resurfacing, and upgrades.",
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
