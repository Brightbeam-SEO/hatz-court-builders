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
    { title: "Quality Check & Finishing", body: "Line paint, final inspection, and walkthrough before handoff." },
    { title: "Ongoing Resurfacing & Repairs", body: "Crack repair, recoating, and maintenance when your court needs a refresh." },
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
