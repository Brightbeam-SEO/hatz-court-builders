import type { FaqPageContent } from "@/lib/faq-page-content";
import { BUSINESS } from "@/lib/business";

const tennisCourtFaqs = [
  {
    question: "How much does it cost to build a full-size tennis court?",
    answer:
      "Tennis court costs depend on land preparation, surface material, labor, and features. Average costs range from around $50,000 for clay to $230,000 for concrete.",
  },
  {
    question: "What is the cheapest way to build a tennis court?",
    answer:
      "The cheapest way to build a tennis court is usually using compacted gravel with a ground-clay surface. This well-compacted surface with good drainage requires little maintenance in most climates.",
  },
  {
    question: "Is a tennis court a good investment?",
    answer:
      "Tennis courts can add value to a home and may provide strong returns. Some real estate professionals estimate that tennis courts can increase property value by $10,000 to $30,000, while basketball courts may add $5,000 to $15,000.",
  },
  {
    question: "How big of a lot do I need to build a tennis court?",
    answer:
      "A standard tennis court measures 78 feet long by 36 feet wide, but extra room is needed for movement, fencing, and surrounding space. For a full-size court, plan for at least 60 feet by 120 feet.",
  },
  {
    question: "How much does it cost to install a full-size tennis court?",
    answer:
      "Asphalt courts typically cost between $90,000 and $120,000. Post-tension concrete may range from $130,000 to $200,000. Clay surfaces may range from $60,000 to $150,000, depending on the type and drainage system.",
  },
  {
    question: "What is the lifespan of a tennis court?",
    answer:
      "Acrylic hard courts typically last 15–20 years. Asphalt hard courts last around 10–15 years. Natural clay courts usually last 5–10 years, while synthetic clay can last 10–15 years.",
  },
  {
    question: "How many tennis courts can fit in 1 acre?",
    answer:
      "One acre is about 4,046 square meters and can fit approximately 16 tennis courts, depending on layout and spacing.",
  },
  {
    question: "How much space is needed to build a tennis court?",
    answer:
      "A single tennis court is commonly recommended at 60 feet by 120 feet. The minimum playing dimensions are about 56 feet by 114 feet, while larger court complexes may need more space between courts.",
  },
];

const basketballCourtFaqs = [
  {
    question: "How many inches of concrete for a basketball court?",
    answer:
      "A basketball court typically requires a 4-inch-thick concrete slab to create a strong foundation that can handle foot traffic and equipment.",
  },
  {
    question: "How much does it cost to lay cement for a basketball court?",
    answer:
      "Most concrete slabs cost around $12 to $24 per square foot to install. This usually includes the concrete mix, basic prep work, framing, pouring, and finishing.",
  },
  {
    question: "Is 30x30 big enough for a basketball court?",
    answer:
      "Yes. A 30x30 half-court is large enough for a playable area above the key. It is one of the more popular half-court sizes.",
  },
  {
    question: "What is the cheapest option for an outdoor basketball court?",
    answer:
      "Asphalt is one of the cheapest options for many outdoor basketball courts. It has a lower initial cost, though it can be sensitive to temperature changes.",
  },
  {
    question: "What can you use instead of concrete for a basketball court?",
    answer:
      "Gravel pavers can be used as an alternative to concrete for an outdoor basketball court base. They create a flat, sturdy surface that can work with interlocking basketball court tiles.",
  },
  {
    question: "How much does it cost to set up a basketball court?",
    answer:
      "A full basketball court can range from $20,000 to $48,000. A half-court can range from $5,400 to $16,600.",
  },
];

const courtConstructionFaqs = [
  {
    question: "Can you make a tennis court out of concrete?",
    answer:
      "Yes. Concrete can be used for tennis courts and is known for durability and easier maintenance. It is usually more expensive, but a concrete tennis court can last longer when built properly.",
  },
  {
    question: "What is the best surface for a tennis court?",
    answer:
      "Hard court surfaces are one of the most common and popular tennis court surfaces. Acrylic hard courts are used for many competitive courts and provide a balance between speed, durability, and maintenance.",
  },
  {
    question: "How thick should concrete be for a tennis court?",
    answer:
      "Concrete for a tennis court is often 5 inches thick if the location experiences more than three freeze/thaw cycles annually. In milder climates, 4 inches may be used.",
  },
  {
    question: "What is the best concrete for a tennis court?",
    answer:
      "Post-tensioned concrete is a popular choice for outdoor tennis courts because it tends to provide better performance. It uses a slab poured over a grid of steel cables or tendons anchored around the perimeter.",
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
        id: "tennis-court",
        label: "Tennis Court FAQs",
        faqs: tennisCourtFaqs.map((f) => ({ ...f })),
      },
      {
        id: "basketball-court",
        label: "Basketball Court FAQs",
        faqs: basketballCourtFaqs.map((f) => ({ ...f })),
      },
      {
        id: "court-construction",
        label: "Court Construction",
        faqs: courtConstructionFaqs.map((f) => ({ ...f })),
      },
    ],
    seo: {
      metaTitle: `Court Construction FAQs | ${BUSINESS.nameShort}`,
      metaDescription:
        "Tennis and basketball court FAQs covering construction costs, concrete specs, court size, lifespan, and surfacing options in Idaho and Arizona.",
    },
  };
}
