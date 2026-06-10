import type { FaqPageContent } from "@/lib/faq-page-content";
import { BUSINESS } from "@/lib/business";

const homeownerFaqs = [
  {
    question: "What types of courts do you build?",
    answer:
      "We build tennis, basketball, pickleball, volleyball, and multi-use courts for residential and commercial properties using acrylic, cushioned acrylic, modular tile, hardwood, synthetic turf, asphalt, and concrete.",
  },
  {
    question: "What is the best surface for a backyard pickleball court?",
    answer:
      "Pickleball acrylic is our most popular option for durability and playability, but modular tile and cushioned systems are great alternatives depending on your budget, climate, and design goals.",
  },
  {
    question: "Can you resurface an existing tennis court?",
    answer:
      "Yes. We handle crack repair, resurfacing, acrylic recoating, and professional line striping for existing tennis, basketball, and multi-use courts.",
  },
  {
    question: "Do you install custom logos and striping?",
    answer:
      "Yes. We provide professional line striping, color layouts, and custom logo branding on modular tile and acrylic courts.",
  },
  {
    question: "What areas do you serve?",
    answer: `${BUSINESS.nameShort} serves ${BUSINESS.serviceCities.slice(0, 8).join(", ")}, and communities across Idaho — plus Phoenix, Scottsdale, Mesa, Gilbert, Chandler, and surrounding Arizona areas.`,
  },
];

const commercialFaqs = [
  {
    question: "Do you work with schools and parks & recreation departments?",
    answer:
      "Yes. We build and resurface courts for schools, parks, HOAs, and commercial facilities — from single courts to multi-court complexes.",
  },
  {
    question: "Do you handle fencing, lighting, and site preparation?",
    answer:
      "Yes. We're a one-stop shop for site prep, surfacing, hoops, nets, fencing, lighting, and all court components from design through completion.",
  },
  {
    question: "What makes Hatz Court Builders different from other court companies?",
    answer:
      "Most competitors focus on one surfacing type. We offer all major court systems plus components, custom logos, and full design-build — including cushioned and standard hardcourt acrylic.",
  },
  {
    question: "Do you offer commercial and residential services?",
    answer: "Yes. We build courts for homeowners, schools, parks & recreation, and commercial facilities throughout Idaho and Arizona.",
  },
  {
    question: "Can I contact you after hours?",
    answer: `Yes. ${BUSINESS.nameShort} is available 24/7. Call ${BUSINESS.phoneDisplay} or email ${BUSINESS.email}.`,
  },
];

const processFaqs = [
  {
    question: "How does a free court consultation work?",
    answer:
      "We discuss your space, sports mix, surfacing preferences, and budget — then recommend the right court system and layout for your project.",
  },
  {
    question: "How long does court construction take?",
    answer:
      "Timelines depend on site conditions, court size, and surfacing type. We'll provide a realistic schedule during your consultation.",
  },
  {
    question: "Do you offer promotions or specials?",
    answer:
      "We can run 10% off specials when available. Ask about current offers when you request your free consultation.",
  },
  {
    question: "Are you licensed in Idaho?",
    answer: `Yes. ${BUSINESS.legalNote}.`,
  },
  {
    question: "What sports can go on a multi-use court?",
    answer:
      "Tennis, basketball, pickleball, volleyball, futsal, and more — we design layouts and striping for the sport mix you need on one surface.",
  },
];

export function getStaticFaqPageContent(): FaqPageContent {
  return {
    title: "FAQ",
    slug: "faq",
    heroSubheading:
      "Answers about court construction, surfacing options, and our service areas in Boise, Scottsdale, and nearby communities",
    categories: [
      {
        id: "property-owners",
        label: "Homeowner FAQs",
        faqs: homeownerFaqs.map((f) => ({ ...f })),
      },
      {
        id: "residents",
        label: "Commercial & Facility FAQs",
        faqs: commercialFaqs.map((f) => ({ ...f })),
      },
      {
        id: "process",
        label: "Court Construction Process",
        faqs: processFaqs.map((f) => ({ ...f })),
      },
    ],
    seo: {
      metaTitle: `Court Construction FAQs | ${BUSINESS.nameShort}`,
      metaDescription:
        "FAQs about pickleball, basketball, and tennis court construction, resurfacing, surfacing options, and service areas in Idaho and Arizona.",
    },
  };
}
