import { BUSINESS } from "@/lib/business";
import { gpmPick } from "@/lib/gpm-pick-gallery";
import { googleMapsAreaEmbedSrc } from "@/lib/maps-embed";
import { PROPERTY_MANAGEMENT_GALLERY_COPY, PROPERTY_MANAGEMENT_GALLERY_IMAGES } from "@/lib/property-management-gallery-section";
import { PROPERTY_MANAGEMENT_SERVICE_HIGHLIGHTS } from "@/lib/property-management-service-highlights";
import { insertPmPricingFaqsAfterFirst } from "@/lib/pm-pricing-faq-items";
import type { TreasureValleyPressurePageConfig } from "@/lib/treasure-valley-pressure-page-config";

/** Primary services landing at `/services/foot-massage-reflexology/`. */
export const FOOT_MASSAGE_REFLEXOLOGY_PAGE_CONFIG: TreasureValleyPressurePageConfig = {
  routeParam: "foot-massage-reflexology",
  slug: "foot-massage-reflexology",
  metaTitle: "Property Management Meridian ID | Greenbelt Property Management",
  metaDescription:
    "Full-service long-term residential property management in Meridian, Idaho. Tenant placement, rent collection, and maintenance. Call (208) 863-8009.",
  cityName: "Meridian",
  heroTitle: "Residential Property Management",
  heroSubtitle:
    "Locally owned husband-and-wife team serving Meridian and the Treasure Valley with hands-on rental management you can reach directly.",
  heroImageSrc: gpmPick("outdoor multi court acrylic surfacing"),
  heroImageAlt: "Greenbelt Property Management — Meridian, Idaho",
  heroContactFormId: "property-management-hero-contact-form",
  heroFormName: "Property management landing hero",
  bottomContactSectionId: "property-management-contact",
  bottomContactFormId: "property-management-page-contact-form",
  bottomContactHeading: "Schedule Your Free Consultation",
  bottomContactSubtext:
    "Request a free on-site consultation and rental analysis for your Meridian or Treasure Valley rental property.",
  bottomFormName: "Property management landing contact",
  bottomContactLayout: "blend",
  articleListBulletStyle: "crimson-check",
  timelineStepBadgeVariant: "crimson",
  splitTestimonialsAboveContact: true,
  testimonialsSectionId: "property-management-testimonials",
  testimonialsSectionEyebrow: "What Owners Say",
  testimonialsSectionHeading: `What Owners Say About ${BUSINESS.nameShort}`,
  testimonialsSectionSubtext:
    "Real feedback from rental property owners who value responsive, personal management.",
  showCenteredContactSection: false,
  showHomeContactSection: true,
  gallerySection: {
    eyebrow: PROPERTY_MANAGEMENT_GALLERY_COPY.eyebrow,
    heading: PROPERTY_MANAGEMENT_GALLERY_COPY.heading,
    subheading: PROPERTY_MANAGEMENT_GALLERY_COPY.subheading,
    images: PROPERTY_MANAGEMENT_GALLERY_IMAGES,
  },
  centeredContactSectionId: "property-management-booking-contact",
  centeredContactFormId: "property-management-booking-form",
  shareTitle: `Property Management | ${BUSINESS.nameShort}`,
  sidebarPanelId: "property-management-other-services-desktop",
  mapIframeTitle: "Map — Meridian, Idaho",
  mapEmbedSrc: googleMapsAreaEmbedSrc("Meridian, Idaho"),
  faqHeading: "Frequently Asked Questions About Our Property Management",
  faqIntro: "Straight answers—call if yours is not listed.",
  faqIdPrefix: "property-management-faq",
  serviceHighlightCards: PROPERTY_MANAGEMENT_SERVICE_HIGHLIGHTS,
  faqItems: insertPmPricingFaqsAfterFirst("foot-massage-reflexology", [
    {
      question: "Do you manage long-term rentals?",
      answer:
        "Yes. We specialize in full-service long-term residential rental management throughout the Treasure Valley.",
    },
    {
      question: "Are you a real estate agent?",
      answer:
        "No. We are strictly a property management company—we do not buy, sell, or broker real estate.",
    },
    {
      question: "What makes Greenbelt different?",
      answer:
        "We are family owned, personally manage every property, and work directly with owners throughout the relationship. You can reach us easily—no layers of bureaucracy.",
    },
    {
      question: "What cities do you serve?",
      answer: `We are based in Meridian and serve the Treasure Valley, including ${BUSINESS.serviceCities.join(", ")}.`,
    },
    {
      question: "Do you offer free consultations?",
      answer:
        "Yes. We offer a free on-site consultation and a free rental analysis for qualifying properties.",
    },
  ]),
  timelineHeading: "How We Onboard Your Rental Property",
  timelineIntro: "A clear, personal process from first call to ongoing management.",
  timelineSteps: [
    {
      title: "Free consultation",
      body: "We meet on-site, review your property, and discuss your goals and management needs.",
    },
    {
      title: "Rental analysis",
      body: "We provide a free rental analysis so you understand market positioning and expectations.",
    },
    {
      title: "Marketing & placement",
      body: "Listing, showings, tenant screening with credit checks, and professional placement.",
    },
    {
      title: "Ongoing management",
      body: "Rent collection, inspections, maintenance coordination, and transparent owner reporting.",
    },
  ],
};
