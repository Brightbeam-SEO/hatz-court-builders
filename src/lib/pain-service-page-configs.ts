import { createServiceLandingConfig } from "@/lib/massage-service-page-configs";

export const CHRONIC_INJURY_MASSAGE_PAGE_CONFIG = createServiceLandingConfig({
  slug: "chronic-injury-massage-eagle-id",
  metaTitle: "Chronic Injury Massage Eagle ID | Walk-Ins Welcome | Zen",
  metaDescription:
    "Chronic injury massage in Eagle, Idaho targets long-term pain, scar tissue, and mobility limits with specialized therapeutic care. Walk-ins welcome—book today.",
  heroTitle: "Chronic Injury Massage Eagle, ID",
  heroSubtitle: "Healing Touch for Long-Term Pain Relief",
  heroImageSrc: "/services/chronic-injury-massage.webp",
  heroImageAlt: "Chronic injury massage at Zen Day Spa in Eagle, Idaho",
  bottomContactHeading: "Book Your Chronic Injury Massage",
  bottomContactSubtext:
    "Call to schedule your chronic injury massage in Eagle—or walk in when we have openings.",
  shareTitle: "Chronic Injury Massage Eagle, ID | Zen Day Spa",
  faqHeading: "Chronic Injury Massage FAQs: What Helps and What to Avoid",
  faqIdPrefix: "chronic-injury-massage-faq",
  faqItems: [
    {
      question: "What type of massage is best for chronic pain?",
      answer:
        "Trigger point therapy is often recommended. It applies focused pressure to specific trigger points to reduce persistent pain and muscle tension.",
    },
    {
      question: "What type of massage is best for injuries?",
      answer:
        "Deep tissue massage is commonly used to relieve chronic tension, reduce stiffness, and improve mobility after injuries such as sports strains or falls.",
    },
    {
      question: "Under which conditions should you not get a massage?",
      answer:
        "Massage should be avoided or approved by a medical professional if you have fever or infection, recent surgery or injury, DVT, osteoporosis, heart disease, contagious skin conditions, blood clotting disorders, or varicose veins.",
    },
    {
      question: "How long should you wait for a massage after an injury?",
      answer:
        "It's usually best to wait 48 to 72 hours, or until swelling and inflammation from the acute phase have subsided, before starting massage therapy.",
    },
    {
      question: "What is a chronic massage?",
      answer:
        "Chronic pain massage is a therapeutic approach designed to address ongoing discomfort using gentle, focused techniques to reduce inflammation, ease muscle tension, and improve circulation.",
    },
  ],
});

export const SCIATICA_PAIN_MASSAGE_PAGE_CONFIG = createServiceLandingConfig({
  slug: "sciatica-pain-massage-eagle-id",
  metaTitle: "Sciatica Pain Massage Eagle ID | Same-Day Massages | Zen",
  metaDescription:
    "Sciatica pain massage in Eagle, Idaho relieves nerve compression, muscle tension, and radiating leg pain with targeted therapeutic care. Book today.",
  heroTitle: "Sciatica Pain Massage Eagle, ID",
  heroSubtitle: "Experience Natural Relief From Sciatic Nerve Pain",
  heroImageSrc: "/services/sciatica-pain-massage.webp",
  heroImageAlt: "Sciatica pain massage at Zen Day Spa in Eagle, Idaho",
  bottomContactHeading: "Book Your Sciatica Pain Massage",
  bottomContactSubtext:
    "Call to schedule your sciatica pain massage in Eagle—or walk in when we have openings.",
  shareTitle: "Sciatica Pain Massage Eagle, ID | Zen Day Spa",
  faqHeading: "Sciatica Pain Massage Eagle, ID Common Questions",
  faqIdPrefix: "sciatica-pain-massage-faq",
  faqItems: [
    {
      question: "Is it good to massage sciatica pain?",
      answer:
        "Yes, massage can help reduce sciatica pain by relaxing tight muscles (such as the piriformis, glutes, and lower back) that compress the sciatic nerve, improving blood flow and easing inflammation. It provides relief, though it may not fix the underlying cause.",
    },
    {
      question: "How can you help sciatic pain while pregnant?",
      answer:
        "Heating pads or cold packs may help, but physical therapy is often the most effective treatment. Pregnancy-safe massage and aquatic therapy can also provide relief when approved by a healthcare provider.",
    },
    {
      question: "Where is the best place to massage for sciatica pain?",
      answer:
        "Focus on the glutes (especially the piriformis), hamstrings, lower back, and calves. These areas often contribute to nerve compression. Avoid direct, intense pressure on the sciatic nerve itself.",
    },
    {
      question: "What should you not do with sciatica?",
      answer:
        "Avoid heavy lifting, twisting, prolonged sitting or lying down, high-impact activities, and deep forward bends that worsen symptoms. Do not use massage guns directly on an irritated nerve.",
    },
    {
      question: "Is reflexology good for sciatica?",
      answer:
        "Some people with sciatica find relief through reflexology, a gentle complementary therapy that may help reduce discomfort and support natural healing.",
    },
  ],
});

export const CHRONIC_PAIN_MASSAGE_PAGE_CONFIG = createServiceLandingConfig({
  slug: "chronic-pain-massage-eagle-id",
  metaTitle: "Chronic Pain Massage Eagle ID | Walk-ins Welcome | Zen",
  metaDescription:
    "Chronic pain massage in Eagle, Idaho offers targeted therapeutic relief for persistent discomfort, tension, and limited mobility. Walk-ins welcome—book now.",
  heroTitle: "Chronic Pain Massage Eagle, ID",
  heroSubtitle: "Find Lasting Relief Through Expert Therapeutic Touch",
  heroImageSrc: "/services/chronic-pain-massage.webp",
  heroImageAlt: "Chronic pain massage at Zen Day Spa in Eagle, Idaho",
  bottomContactHeading: "Book Your Chronic Pain Massage",
  bottomContactSubtext:
    "Call to schedule your chronic pain massage in Eagle—or walk in when we have openings.",
  shareTitle: "Chronic Pain Massage Eagle, ID | Zen Day Spa",
  faqHeading: "Chronic Pain Massage In Eagle, ID Common Questions",
  faqIdPrefix: "chronic-pain-massage-faq",
  faqItems: [
    {
      question: "What type of massage is best for chronic pain?",
      answer:
        "Trigger point therapy is often the most effective for chronic pain. It uses focused pressure on trigger points to reduce ongoing pain and muscle tension.",
    },
    {
      question: "In which disease should massage therapy be avoided?",
      answer:
        "Massage should be avoided if you have rashes, open wounds, or contagious skin conditions such as fungal infections or herpes, as massage can worsen symptoms or spread infection.",
    },
    {
      question: "How often should I get deep tissue massage for chronic pain?",
      answer:
        "For chronic pain or muscle tension, every 1–2 weeks is commonly recommended to address deep-rooted tightness and support longer-term relief.",
    },
    {
      question: "Which massage is best for pain relief?",
      answer:
        "Deep tissue massage is widely used for pain relief because it works through both surface and deeper muscle layers using focused pressure.",
    },
    {
      question: "Does massage reduce chronic inflammation?",
      answer:
        "Yes, massage can help improve circulation, reduce muscle stiffness, and decrease joint inflammation, which may ease chronic discomfort over time.",
    },
  ],
});

export const PAIN_SERVICE_PAGE_CONFIGS = {
  "chronic-injury-massage-eagle-id": CHRONIC_INJURY_MASSAGE_PAGE_CONFIG,
  "sciatica-pain-massage-eagle-id": SCIATICA_PAIN_MASSAGE_PAGE_CONFIG,
  "chronic-pain-massage-eagle-id": CHRONIC_PAIN_MASSAGE_PAGE_CONFIG,
} as const;
