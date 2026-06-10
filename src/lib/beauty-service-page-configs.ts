import { createServiceLandingConfig } from "@/lib/massage-service-page-configs";

export const FACIAL_PAGE_CONFIG = createServiceLandingConfig({
  slug: "facial",
  metaTitle: "Facials Eagle ID | No Appointments Needed | Zen Day Spa",
  metaDescription:
    "Professional facials in Eagle, Idaho—deep cleansing, hydration, anti-aging, and customized skincare at Zen Day Spa. Walk-ins welcome. Book today.",
  heroTitle: "Facials",
  heroSubtitle: "Boise Massage and Day Spa",
  heroImageSrc: "/services/facials.webp",
  heroImageAlt: "Facials at Zen Day Spa in Eagle, Idaho",
  bottomContactHeading: "Book Your Facial",
  bottomContactSubtext:
    "Call to schedule your personalized facial in Eagle—or walk in when we have openings.",
  shareTitle: "Facials | Zen Day Spa",
  faqHeading: "What to Know Before Booking a Facial In Eagle ID",
  faqIdPrefix: "facial-faq",
  faqItems: [
    {
      question: "Is a 30-minute facial worth it?",
      answer:
        "Yes, a 30-minute facial is worth it for relaxation and basic refresh, but it typically won't deliver significant skin-corrective results. For deeper skin benefits, treatments like peels or microneedling are more effective.",
    },
    {
      question: "What is the best monthly facial for aging skin?",
      answer:
        "HydraFacial is commonly recommended for aging skin because it can be customized to improve hydration, smooth texture, and support anti-aging results.",
    },
    {
      question: "What will happen if I do a facial every month?",
      answer:
        "Monthly facials help boost circulation, renew skin cells, reduce puffiness, and support lymphatic drainage, leading to healthier-looking skin over time.",
    },
    {
      question: "Which type of facial is best for skin?",
      answer:
        "The best facial depends on your skin goals. Popular options include HydraFacial, chemical peels, microneedling, LED light therapy, microdermabrasion, and dermaplaning, each targeting different skin concerns.",
    },
  ],
});

export const MICRONEEDLING_PAGE_CONFIG = createServiceLandingConfig({
  slug: "microneedling",
  metaTitle: "Microneedling Eagle ID | Same-Day Services Available | Zen",
  metaDescription:
    "Microneedling in Eagle, Idaho at Zen Day Spa stimulates collagen for smoother texture, improved tone, and rejuvenated skin. Book your session today.",
  heroTitle: "Microneedling",
  heroSubtitle:
    "Beautify your look with microneedling and achieve smoother, brighter, and visibly rejuvenated skin.",
  heroImageSrc: "/services/microneedling.webp",
  heroImageAlt: "Microneedling at Zen Day Spa in Eagle, Idaho",
  bottomContactHeading: "Book Your Microneedling Session",
  bottomContactSubtext:
    "Call to schedule your microneedling appointment in Eagle—or walk in when we have openings.",
  shareTitle: "Microneedling | Zen Day Spa",
  faqHeading: "Microneedling Treatment Facts Clients Want to Know",
  faqIdPrefix: "microneedling-faq",
  faqItems: [
    {
      question: "What does your face look like 2 days after microneedling?",
      answer:
        "Two days after treatment, you may notice redness or pinkness similar to a mild sunburn, along with dryness or light peeling as the skin begins to heal.",
    },
    {
      question: "How long will microneedling last?",
      answer:
        "Results typically last 4–6 weeks, with continued improvement as collagen production increases. After 3–5 treatments, results can last up to a year with proper maintenance.",
    },
    {
      question: "Does microneedling tighten skin?",
      answer:
        "Yes, microneedling stimulates collagen and elastin production, which can help improve skin firmness and create a tighter, smoother appearance over time.",
    },
    {
      question: "What is the best age to start microneedling?",
      answer:
        "Many people begin microneedling in their early twenties to thirties as a proactive way to support collagen production and address early signs of aging.",
    },
  ],
});

export const BEAUTY_SERVICE_PAGE_CONFIGS = {
  facial: FACIAL_PAGE_CONFIG,
  microneedling: MICRONEEDLING_PAGE_CONFIG,
} as const;
