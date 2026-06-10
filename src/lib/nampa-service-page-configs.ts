import { createServiceLandingConfig } from "@/lib/massage-service-page-configs";
import { NAMPA_AREA_MAP } from "@/lib/maps-embed";

const nampaShared = {
  cityName: "Nampa",
  ...NAMPA_AREA_MAP,
  faqHeading: "Frequently Asked Questions",
  faqIdPrefix: "nampa-service-faq",
  faqItems: [] as [],
};

export const SCALP_MASSAGE_NAMPA_PAGE_CONFIG = createServiceLandingConfig({
  ...nampaShared,
  slug: "scalp-massage-nampa",
  metaTitle: "Scalp Massage Nampa | Same-Day Massages | Zen Day Spa",
  metaDescription:
    "Professional scalp massage in Nampa for stress relief, hair health, and scalp wellness. Book same-day appointments at Zen Day Spa.",
  heroTitle: "Scalp Massage Nampa",
  heroSubtitle: "Experience Deep Relaxation and Hair Health Enhancement",
  heroImageSrc: "/services/scalp-massage.webp",
  heroImageAlt: "Scalp massage in Nampa, Idaho at Zen Day Spa",
  bottomContactHeading: "Book Your Scalp Massage in Nampa",
  bottomContactSubtext: "Call to schedule your scalp massage in Nampa—or walk in when we have openings.",
  shareTitle: "Scalp Massage Nampa | Zen Day Spa",
  faqIdPrefix: "scalp-massage-nampa-faq",
});

export const NAMPA_SERVICE_PAGE_CONFIGS = {
  "scalp-massage-nampa": SCALP_MASSAGE_NAMPA_PAGE_CONFIG,
} as const;
