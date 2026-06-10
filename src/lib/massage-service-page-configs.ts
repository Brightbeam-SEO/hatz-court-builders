import { EAGLE_AREA_MAP } from "@/lib/maps-embed";
import type {
  TreasureValleyFaqItem,
  TreasureValleyPressurePageConfig,
  TreasureValleyTimelineStep,
} from "@/lib/treasure-valley-pressure-page-config";

type MassageServiceConfigInput = {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  cityName?: string;
  heroTitle: string;
  heroSubtitle: string;
  heroImageSrc: string;
  heroImageAlt: string;
  bottomContactHeading: string;
  bottomContactSubtext: string;
  shareTitle: string;
  faqHeading: string;
  faqIdPrefix: string;
  faqItems: TreasureValleyFaqItem[];
  timelineHeading?: string;
  timelineIntro?: string;
  timelineSteps?: TreasureValleyTimelineStep[];
  testimonialsSectionId?: string;
  mapEmbedSrc?: string;
  mapIframeTitle?: string;
};

export function createServiceLandingConfig(input: MassageServiceConfigInput): TreasureValleyPressurePageConfig {
  const key = input.slug.replace(/[^a-z0-9]+/g, "-");
  return {
    routeParam: input.slug,
    slug: input.slug,
    metaTitle: input.metaTitle,
    metaDescription: input.metaDescription,
    cityName: input.cityName ?? "Eagle",
    heroTitle: input.heroTitle,
    heroSubtitle: input.heroSubtitle,
    heroImageSrc: input.heroImageSrc,
    heroImageAlt: input.heroImageAlt,
    heroContactFormId: `${key}-hero-contact-form`,
    heroFormName: `${input.heroTitle} landing hero`,
    bottomContactSectionId: `${key}-contact`,
    bottomContactFormId: `${key}-page-contact-form`,
    bottomContactHeading: input.bottomContactHeading,
    bottomContactSubtext: input.bottomContactSubtext,
    bottomFormName: `${input.heroTitle} landing contact`,
    bottomContactLayout: "blend",
    articleListBulletStyle: "crimson-check",
    timelineStepBadgeVariant: "crimson",
    splitTestimonialsAboveContact: true,
    testimonialsSectionId: input.testimonialsSectionId ?? `${key}-testimonials`,
    testimonialsSectionHeading: "What Our Guests Say About Zen Day Spa",
    testimonialsSectionSubtext:
      "Real reviews from Eagle guests—same stories and photos you'll find on our reviews page.",
    showCenteredContactSection: true,
    centeredContactSectionId: `${key}-booking-contact`,
    centeredContactFormId: `${key}-booking-form`,
    shareTitle: input.shareTitle,
    sidebarPanelId: `${key}-other-services-desktop`,
    mapIframeTitle: input.mapIframeTitle ?? EAGLE_AREA_MAP.mapIframeTitle,
    mapEmbedSrc: input.mapEmbedSrc ?? EAGLE_AREA_MAP.mapEmbedSrc,
    faqHeading: input.faqHeading,
    faqIntro: "Straight answers—call if yours is not listed.",
    faqIdPrefix: input.faqIdPrefix,
    faqItems: input.faqItems,
    timelineHeading: input.timelineHeading ?? "",
    timelineIntro: input.timelineIntro ?? "",
    timelineSteps: input.timelineSteps ?? [],
  };
}

const createMassageServiceConfig = createServiceLandingConfig;

export const SCALP_MASSAGE_PAGE_CONFIG = createMassageServiceConfig({
  slug: "scalp-massage",
  metaTitle: "Scalp Massage & Wash Eagle ID | Same-Day Services | Zen",
  metaDescription:
    "Scalp massage and wash in Eagle ID help relieve tension, cleanse the scalp, and promote deep relaxation in a calming spa setting. Book today.",
  heroTitle: "Scalp Massage and Wash",
  heroSubtitle: "Waterfall head spa cleansing and scalp massage in Eagle, Idaho—walk-ins welcome when we have availability.",
  heroImageSrc: "/services/scalp-massage.webp",
  heroImageAlt: "Scalp massage and wash at Zen Day Spa in Eagle, Idaho",
  bottomContactHeading: "Book Your Scalp Massage",
  bottomContactSubtext:
    "Call to schedule your scalp massage and wash in Eagle—or walk in when we have openings.",
  shareTitle: "Scalp Massage and Wash | Zen Day Spa",
  faqHeading: "Frequently Asked Questions About Scalp Massage",
  faqIdPrefix: "scalp-massage-faq",
  faqItems: [
    {
      question: "What does a scalp massage do?",
      answer:
        "Scalp massage increases blood flow, softens the skin, and promotes relaxation. Improved circulation can support overall scalp health.",
    },
    {
      question: "Is it okay to massage my scalp?",
      answer:
        "Yes, gentle scalp massage is safe and may help stimulate blood flow to hair follicles, supporting scalp comfort and hair health.",
    },
    {
      question: "How long should a scalp massage be for hair growth?",
      answer:
        "A scalp massage of 5–10 minutes, once or twice daily, is commonly recommended. Consistency is more important than longer sessions.",
    },
    {
      question: "What happens if you massage your scalp every day?",
      answer:
        "Daily scalp massage may help reduce stress and improve mood by encouraging the release of serotonin.",
    },
    {
      question: "How often should you get a scalp massage?",
      answer:
        "Daily scalp massage works well for many people, but weekly scalp massages can be a better option for sensitive scalps to avoid irritation.",
    },
  ],
  timelineHeading: "What to Expect During Your Scalp Massage",
  timelineIntro: "From consultation to aftercare in our Eagle head spa suite.",
  timelineSteps: [
    {
      title: "Consultation and preparation",
      body: "We discuss your needs and adjust water temperature and flow for your comfort before you settle into the treatment chair.",
    },
    {
      title: "The treatment",
      body: "Our waterfall head spa delivers gentle, even water flow that massages your scalp while thoroughly rinsing your hair.",
    },
    {
      title: "Post-treatment care",
      body: "We share personalized scalp and hair care tips so you enjoy lasting benefits after your session.",
    },
  ],
});

export const BODY_MASSAGE_PAGE_CONFIG = createMassageServiceConfig({
  slug: "body-massage",
  metaTitle: "Body Massage Eagle ID | Walks-Ins Welcome | Zen Day Spa",
  metaDescription:
    "Body massage in Eagle ID offers balanced, head-to-toe care designed to restore comfort and relaxation. Experience true relief. Book now.",
  heroTitle: "Body Massage",
  heroSubtitle:
    "Personalized full-body massage in Eagle, Idaho—relaxation and therapeutic relief in a calm spa setting.",
  heroImageSrc: "/services/body-massage.webp",
  heroImageAlt: "Body massage at Zen Day Spa in Eagle, Idaho",
  bottomContactHeading: "Book Your Body Massage",
  bottomContactSubtext: "Call to schedule your body massage in Eagle—or walk in when we have openings.",
  shareTitle: "Body Massage | Zen Day Spa",
  faqHeading: "Frequently Asked Questions About Body Massage",
  faqIdPrefix: "body-massage-faq",
  faqItems: [
    {
      question: "Do you wear clothes for a full body massage?",
      answer:
        "Wear whatever makes you comfortable to your appointment. During the session, you'll undress to your comfort level and remain fully covered with linens at all times.",
    },
    {
      question: "What is not allowed after a massage?",
      answer:
        "After a massage, avoid intense workouts, hot showers or baths, alcohol, caffeine, and smoking. Focus on hydration and light activity to support recovery.",
    },
    {
      question: "Why can't you get wet after a massage?",
      answer:
        "Hot showers or baths can cause muscles to tense up, which may reduce the benefits of your massage and increase the risk of dehydration.",
    },
    {
      question: "What are off limits during a massage?",
      answer:
        "Any form of non-consensual or inappropriate contact is strictly prohibited. Massage therapy follows professional and ethical standards focused on respect and comfort.",
    },
    {
      question: "What happens if you don't drink water after a massage?",
      answer:
        "Skipping water may lead to thirst or dry mouth. Drinking water helps your body rehydrate and flush out byproducts released during the massage.",
    },
    {
      question: "How often should I get massages?",
      answer:
        "For general relaxation, once a month is often enough. Those with pain, stress, or high activity levels may benefit from weekly or bi-weekly sessions.",
    },
  ],
  timelineHeading: "What to Expect During Your Body Massage",
  timelineIntro: "A calm, personalized visit from greeting to post-treatment care.",
  timelineSteps: [
    {
      title: "Consultation and preparation",
      body: "We greet you in a calm environment, discuss your concerns, and tailor the session to areas that need extra attention.",
    },
    {
      title: "Customized body massage",
      body: "Rhythmic strokes and targeted pressure ease muscle tension, improve circulation, and promote deep relaxation.",
    },
    {
      title: "Post-treatment guidance",
      body: "We share stretching and hydration tips so you extend the benefits of your massage after you leave.",
    },
  ],
});

export const COUPLES_MASSAGE_PAGE_CONFIG = createMassageServiceConfig({
  slug: "couples-massage",
  metaTitle: "Couples Massage Eagle ID | Walk-Ins Welcome | Zen Day Spa",
  metaDescription:
    "Experience shared relaxation with couples massage in Eagle, ID at Zen Day Spa. Enjoy personalized treatments. Contact us now.",
  heroTitle: "Couples Massage",
  heroSubtitle: "Transform your stress into shared serenity with side-by-side massage in Eagle, Idaho.",
  heroImageSrc: "/services/couples-massage.webp",
  heroImageAlt: "Couples massage at Zen Day Spa in Eagle, Idaho",
  bottomContactHeading: "Book Your Couples Massage",
  bottomContactSubtext: "Call to schedule a couples massage in Eagle—or walk in when we have openings.",
  shareTitle: "Couples Massage | Zen Day Spa",
  faqHeading: "Frequently Asked Questions About Couples Massage",
  faqIdPrefix: "couples-massage-faq",
  faqItems: [
    {
      question: "What is a couples massage?",
      answer:
        "A couples massage is just like a regular massage, but both partners receive massages at the same time, on separate tables, from two different therapists, typically in a private room.",
    },
    {
      question: "Do you wear clothes during a couples massage?",
      answer:
        "You can wear loose, comfortable clothing to your appointment. During the massage, you'll undress to your comfort level and remain properly covered with linens throughout the session.",
    },
    {
      question: "What type of massage is best for couples?",
      answer:
        "Popular options include Swedish massage for relaxation, hot stone massage for deeper relaxation, aromatherapy for a sensory experience, and deep tissue massage for active couples.",
    },
    {
      question: "Do couples talk during a couples massage?",
      answer:
        "Yes, it's completely up to you. Couples may talk quietly or enjoy the session in silence, depending on personal preference.",
    },
    {
      question: "What happens at the end of a couples massage?",
      answer:
        "There's no set routine. Some couples enjoy holding hands, sharing a quiet moment, or simply relaxing together before the session concludes.",
    },
  ],
});

export const SWEDISH_MASSAGE_PAGE_CONFIG = createMassageServiceConfig({
  slug: "swedish-massage",
  metaTitle: "Swedish Massage Eagle ID | Same-Day Massages | Zen Day Spa",
  metaDescription:
    "Experience a calming Swedish massage in Eagle, ID at Zen Day Spa. Relax, improve circulation, and enjoy personalized care. Book now.",
  heroTitle: "Swedish Massage",
  heroSubtitle:
    "Discover true relaxation and a renewed sense of calm with Swedish massage in Eagle, Idaho.",
  heroImageSrc: "/services/body-massage.webp",
  heroImageAlt: "Swedish massage at Zen Day Spa in Eagle, Idaho",
  bottomContactHeading: "Book Your Swedish Massage",
  bottomContactSubtext: "Call to schedule your Swedish massage in Eagle—or walk in when we have openings.",
  shareTitle: "Swedish Massage | Zen Day Spa",
  faqHeading: "Frequently Asked Questions About Swedish Massage",
  faqIdPrefix: "swedish-massage-faq",
  faqItems: [
    {
      question: "What are the 5 types of Swedish massage techniques?",
      answer:
        "The five core Swedish massage techniques are effleurage, petrissage, tapotement, friction, and vibration, all designed to improve circulation and soften connective tissue.",
    },
    {
      question: "Do you wear clothes during a Swedish massage?",
      answer:
        "Wear whatever feels comfortable to your appointment. During the session, you'll undress to your comfort level and remain fully covered with linens throughout the massage.",
    },
    {
      question: "Does Swedish massage include buttocks?",
      answer:
        "Yes, Swedish massage typically works the arms, legs, hands, feet, back, neck, stomach, and buttocks. You can always let your therapist know if you prefer certain areas to be avoided.",
    },
    {
      question: "Which is better: Swedish massage or deep tissue massage?",
      answer:
        "Swedish massage is best for relaxation and general tension relief, while deep tissue massage is better for athletes, chronic pain, or injury recovery.",
    },
    {
      question: "Does Swedish massage include the front of the body?",
      answer:
        "Yes, a Swedish massage involves both the back and front of the body. Partway through the session, you'll be asked to turn face up to complete the treatment.",
    },
  ],
});

export const DEEP_TISSUE_MASSAGE_PAGE_CONFIG = createMassageServiceConfig({
  slug: "deep-tissue-massage",
  metaTitle: "Deep Tissue Massage Eagle ID | No Appointments Needed | Zen",
  metaDescription:
    "Experience effective deep tissue massage in Eagle, ID at Zen Day Spa. Relieve pain, improve mobility, and feel relaxed. Book now!",
  heroTitle: "Deep Tissue Massage",
  heroSubtitle:
    "Rediscover freedom from chronic tension with focused deep tissue massage in Eagle, Idaho.",
  heroImageSrc: "/services/deep-tissue-massage.webp",
  heroImageAlt: "Deep tissue massage at Zen Day Spa in Eagle, Idaho",
  bottomContactHeading: "Book Your Deep Tissue Massage",
  bottomContactSubtext:
    "Call to schedule your deep tissue massage in Eagle—or walk in when we have openings.",
  shareTitle: "Deep Tissue Massage | Zen Day Spa",
  faqHeading: "Frequently Asked Questions About Deep Tissue Massage",
  faqIdPrefix: "deep-tissue-massage-faq",
  faqItems: [
    {
      question: "Is a deep tissue massage good for tennis elbow?",
      answer:
        "Yes, deep tissue massage to the forearm can be very effective for easing tennis elbow by reducing muscle tension and supporting faster healing.",
    },
    {
      question: "What does a deep tissue massage include?",
      answer:
        "Deep tissue massage uses slow strokes and firm finger pressure to release tension in deeper muscle layers and connective tissues, focusing on areas of discomfort.",
    },
    {
      question: "Is deep tissue massage expensive?",
      answer:
        "Pricing varies by location, but deep tissue massage sessions typically cost more than relaxation massages due to the advanced techniques and pressure involved.",
    },
    {
      question: "Can tendonitis be massaged out?",
      answer:
        "Many tendon injuries respond well to massage therapy. Friction techniques can help break down scar tissue and support proper tendon healing.",
    },
    {
      question: "Who should not get a deep tissue massage?",
      answer:
        "People with blood clotting disorders, recent injuries or surgery, certain skin conditions, or circulatory issues should avoid deep tissue massage unless approved by a medical professional.",
    },
  ],
});

export const PREGNANCY_MASSAGE_PAGE_CONFIG = createMassageServiceConfig({
  slug: "pregnancy-massage",
  metaTitle: "Pregnancy Massage Eagle ID | Same-Day Massages | Zen",
  metaDescription:
    "Pregnancy massage in Eagle ID offers gentle relief for back pain, swelling, and stress while supporting prenatal comfort. Book today.",
  heroTitle: "Pregnancy Massage",
  heroSubtitle: "Soothing prenatal massage in Eagle, Idaho—safe, gentle care for expecting mothers.",
  heroImageSrc: "/services/pregnancy-massage.webp",
  heroImageAlt: "Pregnancy massage at Zen Day Spa in Eagle, Idaho",
  bottomContactHeading: "Book Your Pregnancy Massage",
  bottomContactSubtext:
    "Call to schedule your pregnancy massage in Eagle—or walk in when we have openings.",
  shareTitle: "Pregnancy Massage | Zen Day Spa",
  faqHeading: "Frequently Asked Questions About Pregnancy Massage",
  faqIdPrefix: "pregnancy-massage-faq",
  faqItems: [
    {
      question: "Are you allowed to get massages when pregnant?",
      answer:
        "Yes, massage is generally safe and beneficial during pregnancy for relieving pain, reducing stress, and improving mood. Always get your doctor's approval and see a therapist trained in prenatal massage.",
    },
    {
      question: "What week can I get a pregnancy massage?",
      answer:
        "Most providers recommend waiting until after the first trimester (12 weeks). Prenatal massage can then continue throughout pregnancy with medical approval.",
    },
    {
      question: "What type of massage is best for pregnancy?",
      answer:
        "Prenatal massage using gentle Swedish massage techniques is commonly recommended to relax muscles and improve circulation with light pressure.",
    },
    {
      question: "Which areas should I avoid massaging during pregnancy?",
      answer:
        "Only gentle strokes should be used on the abdomen, and deep pressure on the legs and upper arms should be avoided due to circulation-related risks during pregnancy.",
    },
    {
      question: "What is the protocol for pregnancy massage?",
      answer:
        "Pregnancy massage uses gentle, soothing strokes and light pressure to keep both mother and baby safe. Deep tissue techniques and specific pressure points are typically avoided.",
    },
  ],
  timelineHeading: "What to Expect During Your Pregnancy Massage",
  timelineIntro: "Safe, nurturing care tailored to each trimester.",
  timelineSteps: [
    {
      title: "Consultation",
      body: "We discuss your physical condition, areas of discomfort, and wellness goals before your session begins.",
    },
    {
      title: "Customized massage",
      body: "Gentle techniques focus on the lower back, hips, and legs—areas often strained during pregnancy.",
    },
    {
      title: "Post-treatment guidance",
      body: "We share stretches and self-care tips, and can connect you with our post-pregnancy massage when you're ready.",
    },
  ],
});

export const AROMATHERAPY_MASSAGE_PAGE_CONFIG = createMassageServiceConfig({
  slug: "aromatherapy-massage",
  metaTitle: "Aromatherapy Massage Eagle ID | No Appointments Needed | Zen",
  metaDescription:
    "Transform stress into serenity with aromatherapy massage in Eagle, ID. Essential oils and expert techniques for deep relaxation. Book today.",
  heroTitle: "Aromatherapy Massage Eagle ID",
  heroSubtitle:
    "Transform your stress into serenity with our aromatherapy massage—essential oils and skilled techniques in Eagle, Idaho.",
  heroImageSrc: "/services/aromatherapy-massage.webp",
  heroImageAlt: "Aromatherapy massage at Zen Day Spa in Eagle, Idaho",
  bottomContactHeading: "Book Your Aromatherapy Massage",
  bottomContactSubtext:
    "Call to schedule your aromatherapy massage in Eagle—or walk in when we have openings.",
  shareTitle: "Aromatherapy Massage Eagle ID | Zen Day Spa",
  faqHeading: "Frequently Asked Questions About Aromatherapy Massage",
  faqIdPrefix: "aromatherapy-massage-faq",
  faqItems: [
    {
      question: "What is aromatherapy massage?",
      answer:
        "Aromatherapy massage combines traditional massage with essential oils chosen for their therapeutic properties to enhance relaxation and emotional well-being.",
    },
    {
      question: "What essential oils are used in aromatherapy massage?",
      answer:
        "Common oils include lavender, eucalyptus, and chamomile, blended in a carrier oil and applied during your session based on your goals.",
    },
    {
      question: "What are the benefits of aromatherapy massage?",
      answer:
        "Benefits may include stress relief, reduced muscle tension, improved circulation, mood support, and better sleep quality.",
    },
    {
      question: "Is aromatherapy massage safe during pregnancy?",
      answer:
        "Some essential oils are not recommended during pregnancy. Always inform your therapist and get your doctor's approval before booking.",
    },
    {
      question: "How long does an aromatherapy massage session last?",
      answer:
        "Session length varies by appointment type. Call us to discuss options that fit your schedule and wellness goals.",
    },
  ],
});

export const HOT_STONE_MASSAGE_PAGE_CONFIG = createMassageServiceConfig({
  slug: "hot-stone-massage",
  metaTitle: "Hot Stone Massage Eagle ID | Walk-Ins Welcome | Zen Day Spa",
  metaDescription:
    "Discover deep relaxation with hot stone massage in Eagle, ID. Heated stones ease tension and improve circulation. Walk-ins welcome when available.",
  heroTitle: "Hot Stone Massage Eagle ID",
  heroSubtitle:
    "Discover a new level of relaxation and wellness with our hot stone massage at Zen Day Spa in Eagle, Idaho.",
  heroImageSrc: "/services/hot-stone-massage.webp",
  heroImageAlt: "Hot stone massage at Zen Day Spa in Eagle, Idaho",
  bottomContactHeading: "Book Your Hot Stone Massage",
  bottomContactSubtext:
    "Call to schedule your hot stone massage in Eagle—or walk in when we have openings.",
  shareTitle: "Hot Stone Massage Eagle ID | Zen Day Spa",
  faqHeading: "Frequently Asked Questions About Hot Stone Massage",
  faqIdPrefix: "hot-stone-massage-faq",
  faqItems: [
    {
      question: "What is hot stone massage?",
      answer:
        "Hot stone massage uses smooth, heated basalt stones placed on the body or used by the therapist to warm muscles, ease tension, and improve circulation.",
    },
    {
      question: "What are the benefits of hot stone massage?",
      answer:
        "Benefits include enhanced relaxation, improved circulation, pain relief in sore areas, stress reduction, and increased flexibility.",
    },
    {
      question: "Is hot stone massage safe?",
      answer:
        "Yes, when performed by a trained therapist who monitors stone temperature and adjusts pressure for your comfort.",
    },
    {
      question: "Who should avoid hot stone massage?",
      answer:
        "People with certain skin conditions, diabetes, heart disease, or recent injuries should consult a doctor before booking.",
    },
    {
      question: "Can I combine hot stone with other massage types?",
      answer:
        "Yes, hot stone therapy is often blended with Swedish or deep tissue techniques during a customized session.",
    },
  ],
});

export const THAI_MASSAGE_PAGE_CONFIG = createMassageServiceConfig({
  slug: "thai-massage",
  metaTitle: "Thai Massage | Same-Day Massages Available | Zen Day Spa",
  metaDescription:
    "Experience authentic Thai massage in Eagle, ID with assisted stretching and rhythmic pressure. Same-day appointments when available. Book now.",
  heroTitle: "Thai Massage",
  heroSubtitle:
    "Traditional Thai massage with assisted stretching and rhythmic pressure to increase flexibility and release tension in Eagle, Idaho.",
  heroImageSrc: "/services/thai-massage.webp",
  heroImageAlt: "Thai massage at Zen Day Spa in Eagle, Idaho",
  bottomContactHeading: "Book Your Thai Massage",
  bottomContactSubtext:
    "Call to schedule your Thai massage in Eagle—or walk in when we have openings.",
  shareTitle: "Thai Massage | Zen Day Spa",
  faqHeading: "Frequently Asked Questions About Thai Massage",
  faqIdPrefix: "thai-massage-faq",
  faqItems: [
    {
      question: "What is Thai massage?",
      answer:
        "Thai massage combines assisted stretching, acupressure, and rhythmic compression along energy lines to improve flexibility and relieve tension.",
    },
    {
      question: "Do you wear clothes during Thai massage?",
      answer:
        "Thai massage is typically performed fully clothed in loose, comfortable attire so you can move freely during stretches.",
    },
    {
      question: "Is Thai massage painful?",
      answer:
        "Pressure can be firm, but it should not be painful. Your therapist will adjust intensity based on your comfort and goals.",
    },
    {
      question: "What are the benefits of Thai massage?",
      answer:
        "Benefits may include improved flexibility, reduced muscle tension, better circulation, and enhanced energy and mobility.",
    },
    {
      question: "How is Thai massage different from Swedish massage?",
      answer:
        "Thai massage uses stretching and floor-based techniques with clothing on, while Swedish massage uses oil on the skin with flowing strokes on a table.",
    },
  ],
});

export const POST_PREGNANCY_MASSAGE_PAGE_CONFIG = createMassageServiceConfig({
  slug: "post-pregnancy-massage-eagle-id",
  metaTitle: "Post Pregnancy Massage Eagle ID | Same-Day Massage | Zen",
  metaDescription:
    "Recover with nurturing post pregnancy massage in Eagle ID. Relieve soreness, ease stress, and support healing. Schedule your session now.",
  heroTitle: "Post Pregnancy Massage Eagle",
  heroSubtitle: "Restore your body and spirit after childbirth with postpartum massage in Eagle, Idaho.",
  heroImageSrc: "/services/post-pregnancy-massage.webp",
  heroImageAlt: "Post pregnancy massage at Zen Day Spa in Eagle, Idaho",
  bottomContactHeading: "Book Your Post Pregnancy Massage",
  bottomContactSubtext:
    "Call to schedule your postpartum massage in Eagle—we welcome new mothers when you're ready.",
  shareTitle: "Post Pregnancy Massage Eagle | Zen Day Spa",
  faqHeading: "Frequently Asked Questions About Post Pregnancy Massage",
  faqIdPrefix: "post-pregnancy-massage-faq",
  faqItems: [
    {
      question: "How soon can I get a massage after giving birth?",
      answer:
        "Many people can get a postpartum massage as soon as they feel ready, even within a day or two after a vaginal birth. For C-sections or complicated deliveries, it's best to wait for doctor clearance, often 4–6 weeks, especially before abdominal work.",
    },
    {
      question: "Is massage good after pregnancy?",
      answer:
        "Yes, postpartum massage can provide physical and emotional benefits, including supporting recovery, reducing swelling, and improving circulation after birth.",
    },
    {
      question: "What massage is best for postpartum recovery?",
      answer:
        "Postpartum massage may include gentle techniques, reflexology, light abdominal therapy, C-section scar care (when cleared), lactation massage, and targeted relief for shoulders, wrists, and back.",
    },
    {
      question: "Can I get a massage if I'm breastfeeding?",
      answer:
        "Yes, massage is generally safe while breastfeeding. Therapists can adjust positioning and techniques to keep you comfortable during treatment.",
    },
    {
      question: "How do you do post-pregnancy massage?",
      answer:
        "Post-pregnancy massage focuses on gentle care, including light self-massage, warm soaks, and soothing techniques that support physical and emotional reconnection as the body heals.",
    },
  ],
});

export const MASSAGE_SERVICE_PAGE_CONFIGS = {
  "scalp-massage": SCALP_MASSAGE_PAGE_CONFIG,
  "body-massage": BODY_MASSAGE_PAGE_CONFIG,
  "couples-massage": COUPLES_MASSAGE_PAGE_CONFIG,
  "swedish-massage": SWEDISH_MASSAGE_PAGE_CONFIG,
  "deep-tissue-massage": DEEP_TISSUE_MASSAGE_PAGE_CONFIG,
  "pregnancy-massage": PREGNANCY_MASSAGE_PAGE_CONFIG,
  "post-pregnancy-massage-eagle-id": POST_PREGNANCY_MASSAGE_PAGE_CONFIG,
  "aromatherapy-massage": AROMATHERAPY_MASSAGE_PAGE_CONFIG,
  "hot-stone-massage": HOT_STONE_MASSAGE_PAGE_CONFIG,
  "thai-massage": THAI_MASSAGE_PAGE_CONFIG,
} as const;
