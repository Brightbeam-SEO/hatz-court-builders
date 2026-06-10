import { BUSINESS } from "@/lib/business";

export type PricingLineItem = {
  label: string;
  price: string;
};

export type PricingServiceGroup = {
  title: string;
  subtitle?: string;
  /** Matches `servicesCarousel[].name` for homepage service photos. */
  imageServiceName?: string;
  items: PricingLineItem[];
  includes?: string[];
};

export type PricingSpecialSection = {
  cardTitle: string;
  offerPrice: string;
  /** Matches `servicesCarousel[].name` for the card hero image. */
  imageServiceName?: string;
  massageTypes: string[];
  freeAddOnTitle: string;
  freeAddOns: string[];
  addOnTitle: string;
  addOns: string[];
};

export type PricingCategory =
  | {
      title: string;
      layout: "cards";
      groups: PricingServiceGroup[];
    }
  | {
      title: string;
      layout: "special";
      special: PricingSpecialSection;
    };

export const pricingCategories: PricingCategory[] = [
  {
    title: "Massage Services",
    layout: "cards",
    groups: [
      {
        title: "Body Massage",
        subtitle: "With Free Hot Stone",
        imageServiceName: "Body Massage",
        items: [
          { label: "30m Body Massage", price: "$50.00" },
          { label: "60m Body Massage", price: "$70.00" },
          { label: "90m Body Massage", price: "$100.00" },
          { label: "120m Body Massage", price: "$140.00" },
        ],
      },
      {
        title: "Foot Massage – Reflexology",
        subtitle: "With Free Chinese Herb Powder",
        imageServiceName: "Foot Massage & Reflexology",
        items: [
          { label: "30m Foot Massage", price: "$40.00" },
          { label: "60m Foot Massage", price: "$60.00" },
          { label: "90m Foot Massage", price: "$100.00" },
        ],
      },
      {
        title: "Combo Massage",
        subtitle: "With Free Hot Stone",
        imageServiceName: "Medical Massage",
        items: [
          { label: "30m Foot + 30m Body", price: "$70.00" },
          { label: "30m Foot + 60m Body", price: "$100.00" },
        ],
      },
      {
        title: "Fascial Tendon Beauty Therapy",
        imageServiceName: "Myofascial Massage",
        items: [
          { label: "30m", price: "$60.00" },
          { label: "60m", price: "$90.00" },
        ],
      },
      {
        title: "Luxury Lymphatic Detox Therapy",
        imageServiceName: "Lymphatic Massage",
        items: [
          { label: "60m", price: "$120.00" },
          { label: "90m", price: "$180.00" },
        ],
      },
      {
        title: "Prenatal Massage",
        subtitle: "Mother-to-Be Care",
        imageServiceName: "Pregnancy Massage",
        items: [
          { label: "60m", price: "$90.00" },
          { label: "90m", price: "$140.00" },
        ],
      },
    ],
  },
  {
    title: "Special",
    layout: "special",
    special: {
      cardTitle: "Special Massages",
      offerPrice: "$100 for 90 Minutes + Add On",
      imageServiceName: "Deep Tissue Massage",
      massageTypes: ["Swedish", "Deep Tissue", "Prenatal", "Shiatsu", "Backwalking"],
      freeAddOnTitle: "+ One Of These Free",
      freeAddOns: [
        "Foot Reflexology",
        "Abdominal Massage",
        "Fascial Massage",
        "Hot Stone Treatment",
        "Cupping",
        "Scraping",
      ],
      addOnTitle: "Add-Ons—$10",
      addOns: ["Sugar Scrub", "Ear Candling", "Aroma Therapy", "Paraffin Hand", "Paraffin Foot"],
    },
  },
  {
    title: "The Head Spa",
    layout: "cards",
    groups: [
      {
        title: "Scalp Therapy",
        imageServiceName: "Scalp Massage and Wash",
        items: [
          { label: "60m Deep Scalp Therapy", price: "$120.00" },
          { label: "90m Zen Signature", price: "$170.00" },
        ],
        includes: [
          "Scalp Analysis",
          "Scalp Massage & Shampoo",
          "Herbal Hair Bath",
          "Hair Treatment Mask",
          "Spa Mist Hair Treatment",
          "Hair Serum & Blow Dry",
        ],
      },
    ],
  },
];

export const pricingPageCopy = {
  heroSubheading:
    "Transparent massage and spa pricing in Eagle—session lengths, specialty services, and what to expect before you book.",
  introEyebrow: "Gift Certificates Available",
  introTitle: "Our Pricing",
  introBody: `Explore massage, specialty offers, and head spa services at ${BUSINESS.nameShort} in Eagle. Walk-ins are welcome when we have availability—call ahead for couples or same-day appointments.`,
};
