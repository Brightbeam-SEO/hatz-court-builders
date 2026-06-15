import type { Faq, GoogleReview, HomeContent, ProcessItem, ServiceCarouselSlide } from "@/lib/home-content";
import { defaultHomePageCopy } from "@/lib/home-page-copy";
import { HOME_FAQ_CATEGORIES } from "@/lib/home-faq-section-data";
import { additionalReviewsPageTestimonials } from "@/lib/reviews-testimonials";
import { DEFAULT_SOCIAL_LINKS } from "@/lib/business";
import { gpmPick } from "@/lib/gpm-pick-gallery";

const SERVICE_HREF = "/property-management-services/";

export const navItems = ["Court Construction"];

export const trustBarItems = [
  "Open 24 hours",
  "Free consultation",
  "Residential & commercial",
  "All surface types",
  "Design-build projects",
];

export const services = [
  {
    name: "Pickleball court construction",
    blurb:
      "Custom backyard and commercial pickleball courts with acrylic, modular tile, and cushioned surfacing systems.",
    image: gpmPick("pickleball court backyard modular tile"),
    hoverImage: gpmPick("backyard pickleball basketball dual sport court"),
    cardIcon: gpmPick("pickleball court green blue backyard"),
    href: SERVICE_HREF,
  },
  {
    name: "Basketball court construction",
    blurb:
      "Residential and commercial basketball courts with modular tile, acrylic, hardwood, and custom logo branding.",
    image: gpmPick("basketball tile court modular hoop goal"),
    hoverImage: gpmPick("backyard gray basketball court installation"),
    cardIcon: gpmPick("basketball tile court custom logo branding"),
    href: SERVICE_HREF,
  },
  {
    name: "Tennis court resurfacing",
    blurb:
      "Tennis court crack repair, resurfacing, acrylic recoating, and line striping for schools, parks, and homes.",
    image: gpmPick("tennis court resurface blue green acrylic"),
    hoverImage: gpmPick("tennis court crack repair resurfacing"),
    cardIcon: gpmPick("tennis court side by side before after repair"),
    href: SERVICE_HREF,
  },
  {
    name: "Multi-use court design-build",
    blurb:
      "Full design-build projects for multi-sport courts — pickleball, basketball, tennis, and more on one surface.",
    image: gpmPick("outdoor multi court pickleball basketball tennis"),
    hoverImage: gpmPick("modular court tile custom logo branding"),
    cardIcon: gpmPick("multi sport outdoor backyard court"),
    href: SERVICE_HREF,
  },
];

export const servicesCarousel: ServiceCarouselSlide[] = [
  { name: "Pickleball Courts", image: gpmPick("pickleball court backyard modular tile") },
  { name: "Basketball Courts", image: gpmPick("basketball tile court modular hoop goal") },
  { name: "Tennis Courts", image: gpmPick("tennis court resurface blue green acrylic") },
  { name: "Multi-Use Courts", image: gpmPick("outdoor multi court acrylic surfacing") },
  { name: "Court Resurfacing", image: gpmPick("tennis court crack repair resurfacing") },
];

export const whyChooseUs = [
  {
    title: "All Surface Types",
    body: "Choose from acrylic, cushioned acrylic, modular, synthetic turf, asphalt, concrete, and other court systems based on your sport, budget, and play style.",
    icon: "/images/why-choose/icons/licensed-insured.svg",
  },
  {
    title: "Complete Court Construction",
    body: "From site prep and base work to surfacing, striping, equipment, and final walkthrough, our team manages the full build from start to finish.",
    icon: "/images/why-choose/icons/residential-commercial.svg",
  },
  {
    title: "Residential & Commercial Projects",
    body: "We build backyard courts, school courts, park courts, HOA courts, private club courts, and commercial multi-court facilities.",
    icon: "/images/why-choose/icons/reliable-scheduling.svg",
  },
  {
    title: "Custom Design-Build Approach",
    body: "Every court is planned around your space, goals, surface needs, colors, game lines, logos, and long-term use.",
    icon: "/images/why-choose/icons/surface-specific-cleaning.svg",
  },
];

export const processSteps: ProcessItem[] = [
  {
    step: "01",
    title: "Consultation & Site Evaluation",
    body: "We review your space, goals, sport preferences, drainage, access, and project needs to recommend the right court construction plan.",
    icon: "/images/process/steps/step-1.svg",
  },
  {
    step: "02",
    title: "Court Design & Surface Selection",
    body: "Choose the layout, court type, colors, surfacing system, fencing, lighting, logos, and components that fit your property and style of play.",
    icon: "/images/process/steps/step-2.svg",
  },
  {
    step: "03",
    title: "Site Prep & Court Construction",
    body: "Our team handles grading, base work, surfacing, installation, striping, equipment, and finishing details from start to finish.",
    icon: "/images/process/steps/step-3.svg",
  },
  {
    step: "04",
    title: "Final Walkthrough & Ready for Play",
    body: "We complete the final inspection, review the finished court with you, and make sure everything is clean, accurate, and ready for use.",
    icon: "/images/process/steps/step-4.svg",
  },
];

export const googleReviews: GoogleReview[] = additionalReviewsPageTestimonials;

export const faqs: Faq[] = HOME_FAQ_CATEGORIES.flatMap((category) => category.faqs);

export function getStaticHomeContent(): HomeContent {
  return {
    copy: defaultHomePageCopy,
    socialLinks: DEFAULT_SOCIAL_LINKS,
    services,
    servicesCarousel,
    whyChooseUs,
    processSteps,
    googleReviews,
    faqs,
    trustBarItems,
    navItems,
  };
}
