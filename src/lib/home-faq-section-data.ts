import type { Faq } from "@/lib/home-content";
import { BUSINESS } from "@/lib/business";

export type HomeFaqCategory = {
  id: "owner" | "resident";
  label: string;
  description: string;
  faqs: Faq[];
};

export const HOME_FAQ_CATEGORIES: HomeFaqCategory[] = [
  {
    id: "owner",
    label: "Homeowner FAQs",
    description: "Residential court projects",
    faqs: [
      {
        question: "What types of courts do you build?",
        answer:
          "We build tennis, basketball, pickleball, volleyball, and multi-use courts for residential and commercial properties. Surface options include acrylic, cushioned acrylic, modular tile, hardwood, synthetic turf, asphalt, and concrete.",
      },
      {
        question: "Do you serve both Idaho and Arizona?",
        answer: `${BUSINESS.nameShort} serves ${BUSINESS.serviceCitiesIdaho.slice(0, 6).join(", ")}, and communities across Idaho — plus Phoenix, Scottsdale, Mesa, Gilbert, Chandler, and surrounding Arizona areas.`,
      },
      {
        question: "Can you resurface an existing tennis or basketball court?",
        answer:
          "Yes. We handle crack repair, resurfacing, acrylic recoating, line striping, and color refreshes for existing courts at homes, schools, and parks.",
      },
      {
        question: "What makes Hatz Court Builders different from other court companies?",
        answer:
          "Most competitors focus on one surfacing type. We offer all major court systems — acrylic, modular, hardwood, turf, and more — plus fencing, lighting, custom logos, and full design-build from one team.",
      },
      {
        question: "Do you offer free consultations?",
        answer:
          "Yes. Contact us to discuss your backyard or commercial court project. We can also run 10% off specials when available.",
      },
    ],
  },
  {
    id: "resident",
    label: "Commercial FAQs",
    description: "Schools, parks & facilities",
    faqs: [
      {
        question: "Do you work with schools and parks & recreation departments?",
        answer:
          "Yes. We build and resurface courts for schools, parks, HOAs, and commercial facilities — from single courts to multi-court complexes.",
      },
      {
        question: "What surfacing is best for pickleball courts?",
        answer:
          "Pickleball acrylic is our most popular option, but modular tile, cushioned acrylic, and concrete systems each have advantages. We'll recommend the best fit for your budget, climate, and play style.",
      },
      {
        question: "Can you add custom logos and striping?",
        answer:
          "Yes. We provide professional line striping, color layouts, and custom logo branding on modular tile and acrylic courts.",
      },
      {
        question: "Do you handle site preparation and fencing?",
        answer:
          "Yes. We're a one-stop shop — site prep, surfacing, hoops, nets, fencing, lighting, and all court components from design through completion.",
      },
      {
        question: "How do I get started on a court project?",
        answer: `Call ${BUSINESS.phoneDisplay} or email ${BUSINESS.email} to schedule a free consultation for your Idaho or Arizona court project.`,
      },
    ],
  },
];
