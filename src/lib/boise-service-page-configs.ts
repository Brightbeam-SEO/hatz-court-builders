import { createServiceLandingConfig } from "@/lib/massage-service-page-configs";
import { BOISE_AREA_MAP } from "@/lib/maps-embed";

const boiseShared = {
  cityName: "Boise",
  ...BOISE_AREA_MAP,
  faqHeading: "Frequently Asked Questions",
  faqIdPrefix: "boise-service-faq",
};

export const SCALP_MASSAGE_BOISE_PAGE_CONFIG = createServiceLandingConfig({
  ...boiseShared,
  slug: "scalp-massage-boise",
  metaTitle: "Scalp Massage Boise | Same-Day Massages | Zen Day Spa",
  metaDescription:
    "Professional scalp massage in Boise for stress relief, hair health, and headache relief. Book same-day appointments at Zen Day Spa.",
  heroTitle: "Scalp Massage Boise",
  heroSubtitle: "Experience Deep Relaxation and Hair Health Benefit",
  heroImageSrc: "/services/scalp-massage.webp",
  heroImageAlt: "Scalp massage in Boise, Idaho at Zen Day Spa",
  bottomContactHeading: "Book Your Scalp Massage in Boise",
  bottomContactSubtext: "Call to schedule your scalp massage in Boise—or walk in when we have openings.",
  shareTitle: "Scalp Massage Boise | Zen Day Spa",
  faqIdPrefix: "scalp-massage-boise-faq",
  faqItems: [],
});

export const HOT_STONE_MASSAGE_BOISE_PAGE_CONFIG = createServiceLandingConfig({
  ...boiseShared,
  slug: "hot-stone-massage-boise-id",
  metaTitle: "Hot Stone Massage Boise ID | Walk-Ins Welcome | Zen",
  metaDescription:
    "Hot stone massage in Boise, Idaho uses heated stones and expert techniques to melt muscle tension and promote deep relaxation. Walk-ins welcome.",
  heroTitle: "Hot Stone Massage Boise, ID",
  heroSubtitle: "Deep Warmth and Gentle Pressure for Lasting Muscle Relief",
  heroImageSrc: "/services/hot-stone-massage.webp",
  heroImageAlt: "Hot stone massage in Boise, Idaho at Zen Day Spa",
  bottomContactHeading: "Book Your Hot Stone Massage in Boise",
  bottomContactSubtext: "Call to schedule your hot stone massage in Boise—or walk in when we have openings.",
  shareTitle: "Hot Stone Massage Boise, ID | Zen Day Spa",
  faqIdPrefix: "hot-stone-massage-boise-faq",
  faqItems: [],
});

export const PRENATAL_MASSAGE_BOISE_PAGE_CONFIG = createServiceLandingConfig({
  ...boiseShared,
  slug: "prenatal-massage-boise-id",
  metaTitle: "Prenatal Massage Boise ID | Same Day Massage | Zen Day Spa",
  metaDescription:
    "Safe, soothing prenatal massage in Boise for expecting mothers. Ease back pain, swelling, and stress with licensed therapists at Zen Day Spa.",
  heroTitle: "Prenatal Massage Boise, ID",
  heroSubtitle: "Safe, Soothing Care for You and Your Baby",
  heroImageSrc: "/services/pregnancy-massage.webp",
  heroImageAlt: "Prenatal massage in Boise, Idaho at Zen Day Spa",
  bottomContactHeading: "Book Your Prenatal Massage in Boise",
  bottomContactSubtext: "Call to schedule your prenatal massage in Boise—or walk in when we have openings.",
  shareTitle: "Prenatal Massage Boise, ID | Zen Day Spa",
  faqHeading: "What Expecting Mothers Ask About Our Prenatal Massage Boise",
  faqIdPrefix: "prenatal-massage-boise-faq",
  faqItems: [
    {
      question: "Is prenatal massage safe during pregnancy?",
      answer:
        "Yes, when performed by trained therapists. Prenatal massage uses gentle techniques and safe positioning to keep both mother and baby comfortable.",
    },
    {
      question: "When can I start a prenatal massage?",
      answer:
        "Many women begin prenatal massage during the second trimester, but it is best to ask a doctor before scheduling.",
    },
    {
      question: "What does prenatal massage help with?",
      answer:
        "Prenatal massage may help reduce back pain, swelling, muscle tension, and stress during pregnancy.",
    },
    {
      question: "How long does a prenatal massage session last?",
      answer: "Most sessions last between 60 and 90 minutes depending on the treatment plan.",
    },
    {
      question: "Can prenatal massage help with swelling in the legs and feet?",
      answer:
        "Yes. Massage techniques that improve circulation can help reduce fluid buildup and swelling.",
    },
  ],
});

export const DEEP_TISSUE_MASSAGE_BOISE_PAGE_CONFIG = createServiceLandingConfig({
  ...boiseShared,
  slug: "deep-tissue-massage-boise-id",
  metaTitle: "Deep Tissue Massage Boise ID | Walk-Ins Welcome | Zen",
  metaDescription:
    "Deep tissue massage in Boise targets chronic muscle tension and pain with slow, focused pressure. Walk-ins welcome at Zen Day Spa.",
  heroTitle: "Deep Tissue Massage Boise, ID",
  heroSubtitle: "Targeted Relief for Deep Muscle Tension and Chronic Pain",
  heroImageSrc: "/services/deep-tissue-massage.webp",
  heroImageAlt: "Deep tissue massage in Boise, Idaho at Zen Day Spa",
  bottomContactHeading: "Book Your Deep Tissue Massage in Boise",
  bottomContactSubtext: "Call to schedule your deep tissue massage in Boise—or walk in when we have openings.",
  shareTitle: "Deep Tissue Massage Boise, ID | Zen Day Spa",
  faqHeading: "What Boise Clients Ask About Deep Tissue Massage Therapy",
  faqIdPrefix: "deep-tissue-massage-boise-faq",
  faqItems: [
    {
      question: "What does deep tissue massage help with?",
      answer:
        "Deep tissue massage helps reduce muscle tension, stiffness, and pain. It focuses on deeper layers of muscle and connective tissue.",
    },
    {
      question: "Is deep tissue massage painful?",
      answer:
        "Some pressure may feel intense in tight areas, but therapists adjust pressure to keep clients comfortable.",
    },
    {
      question: "How long does a deep tissue massage session last?",
      answer: "Most sessions last between 60 and 90 minutes depending on the treatment plan.",
    },
    {
      question: "Who should get a deep tissue massage?",
      answer:
        "People with chronic muscle tension, athletes, and individuals with tight shoulders, back, or neck often benefit from this therapy.",
    },
    {
      question: "How often should I get a deep tissue massage?",
      answer:
        "Some people schedule sessions every few weeks to help manage muscle tension and support recovery.",
    },
  ],
});

export const FOOT_MASSAGE_BOISE_PAGE_CONFIG = createServiceLandingConfig({
  ...boiseShared,
  slug: "foot-massage-boise-id",
  metaTitle: "Foot Massage Boise Idaho | Same Day Massage | Zen Day Spa",
  metaDescription:
    "Foot massage in Boise, Idaho eases sore feet, improves circulation, and supports full-body relaxation. Same-day appointments at Zen Day Spa.",
  heroTitle: "Foot Massage Boise, ID",
  heroSubtitle: "Ease Foot Fatigue and Support Total Body Relaxation",
  heroImageSrc: "/services/foot-massage.webp",
  heroImageAlt: "Foot massage in Boise, Idaho at Zen Day Spa",
  bottomContactHeading: "Book Your Foot Massage in Boise",
  bottomContactSubtext: "Call to schedule your foot massage in Boise—or walk in when we have openings.",
  shareTitle: "Foot Massage Boise, ID | Zen Day Spa",
  faqHeading: "Foot Massage Boise Questions Answered by Licensed Massage Therapists",
  faqIdPrefix: "foot-massage-boise-faq",
  faqItems: [
    {
      question: "What does a foot massage help with?",
      answer:
        "Foot massage helps reduce tension in the feet and lower legs. It can also improve circulation and help the body relax.",
    },
    {
      question: "Is reflexology included in foot massage?",
      answer:
        "Many foot massage sessions include reflexology techniques. These focus on pressure points that connect to different areas of the body.",
    },
    {
      question: "How long does a foot massage session last?",
      answer: "Most sessions last between 30 and 60 minutes depending on the treatment selected.",
    },
    {
      question: "Can foot massage help with stress?",
      answer:
        "Yes. Foot massage helps calm the nervous system and relax muscles. Many people feel less stress after a session.",
    },
    {
      question: "Who should avoid foot massage?",
      answer:
        "People with certain medical conditions or foot injuries should talk with a therapist or doctor before scheduling treatment.",
    },
  ],
});

export const COUPLES_MASSAGE_BOISE_PAGE_CONFIG = createServiceLandingConfig({
  ...boiseShared,
  slug: "couples-massage-boise-id",
  metaTitle: "Couples Massage Boise Idaho | Same Day Massage | Zen",
  metaDescription:
    "Couples massage in Boise lets you relax together in a calm spa setting. Same-day appointments with licensed therapists at Zen Day Spa.",
  heroTitle: "Couples Massage Boise, Idaho",
  heroSubtitle: "Relax Together, Recharge Your Body, and Reconnect",
  heroImageSrc: "/services/couples-massage.webp",
  heroImageAlt: "Couples massage in Boise, Idaho at Zen Day Spa",
  bottomContactHeading: "Book Your Couples Massage in Boise",
  bottomContactSubtext: "Call to schedule your couples massage in Boise—or walk in when we have openings.",
  shareTitle: "Couples Massage Boise, Idaho | Zen Day Spa",
  faqHeading: "Common Couples Massage Boise Questions Answered by Experts",
  faqIdPrefix: "couples-massage-boise-faq",
  faqItems: [
    {
      question: "What happens during a couples massage?",
      answer:
        "Two people receive massage therapy in the same room at the same time. Each guest has their own therapist, and the treatment is customized to their needs.",
    },
    {
      question: "Are couples massages only for romantic partners?",
      answer: "No. Friends, family members, or anyone who wants to relax together can enjoy a couples massage.",
    },
    {
      question: "What type of massage is used during couples massage?",
      answer:
        "Most sessions use Swedish massage for relaxation, but therapists may also use deep tissue massage if clients want stronger pressure.",
    },
    {
      question: "How long does a couples massage session last?",
      answer: "Sessions usually last 60 to 90 minutes depending on the treatment chosen.",
    },
    {
      question: "Is couples massage good for stress relief?",
      answer:
        "Yes. Massage therapy relaxes muscles and calms the nervous system. Many clients feel less stress and better sleep after a session.",
    },
  ],
});

export const BOISE_SERVICE_PAGE_CONFIGS = {
  "scalp-massage-boise": SCALP_MASSAGE_BOISE_PAGE_CONFIG,
  "hot-stone-massage-boise-id": HOT_STONE_MASSAGE_BOISE_PAGE_CONFIG,
  "prenatal-massage-boise-id": PRENATAL_MASSAGE_BOISE_PAGE_CONFIG,
  "deep-tissue-massage-boise-id": DEEP_TISSUE_MASSAGE_BOISE_PAGE_CONFIG,
  "foot-massage-boise-id": FOOT_MASSAGE_BOISE_PAGE_CONFIG,
  "couples-massage-boise-id": COUPLES_MASSAGE_BOISE_PAGE_CONFIG,
} as const;
