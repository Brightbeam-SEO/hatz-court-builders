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
          "Hatz Court Builders designs and builds tennis courts, basketball courts, pickleball courts, volleyball courts, futsal courts, bocce courts, padel courts, and multi-use courts for homes, schools, parks, and commercial properties.",
      },
      {
        question: "Do you serve both Idaho and Arizona?",
        answer:
          "Yes. We have service coverage through our Boise, Idaho and Scottsdale, Arizona locations, helping clients with custom court construction, resurfacing, repairs, and court design in both regions.",
      },
      {
        question: "Can you resurface an existing tennis or basketball court?",
        answer:
          "Yes. We provide court resurfacing, repairs, renovations, striping, and surface upgrades for existing tennis, basketball, pickleball, and multi-use courts.",
      },
      {
        question: "What makes Hatz different from other court companies?",
        answer:
          "We specialize in multiple court types and surface systems, not just one style of construction. Our team can help with acrylic, cushioned acrylic, modular, synthetic turf, asphalt, concrete, and full court components.",
      },
      {
        question: "Do you offer free consultations?",
        answer:
          "Yes. Contact Hatz Court Builders to talk through your court project, site needs, surface options, and next steps.",
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
          "Yes. We build courts for schools, parks, recreation departments, municipalities, HOAs, private clubs, and commercial facilities, along with residential backyard courts.",
      },
      {
        question: "What surfacing is best for pickleball courts?",
        answer:
          "Acrylic and cushioned acrylic are popular options for pickleball court construction because they provide a clean playing surface, strong ball response, and comfortable play. We can also review other surface options based on your space and goals.",
      },
      {
        question: "Can you add custom logos and striping?",
        answer:
          "Yes. We can include custom colors, logos, game lines, striping, and layout options for single-sport and multi-use courts.",
      },
      {
        question: "Do you handle site preparation and fencing?",
        answer:
          "Yes. Our team can help with site preparation, base work, surfacing, fencing, lighting, equipment, and finishing details depending on the project.",
      },
      {
        question: "How do I get started on a court project?",
        answer: `Call Hatz Court Builders at ${BUSINESS.phoneDisplay} or reach out online. We'll review your goals, location, court type, surface options, and project scope before recommending the best next step.`,
      },
    ],
  },
];
