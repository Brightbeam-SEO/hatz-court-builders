import type { TreasureValleyFaqItem } from "@/lib/treasure-valley-pressure-page-config";

type PricingFaqPair = readonly [TreasureValleyFaqItem, TreasureValleyFaqItem];

/** Page-specific rephrasing of owner pricing FAQs — inserted after the first FAQ on each service landing. */
const PRICING_FAQS_BY_SLUG: Record<string, PricingFaqPair> = {
  "property-management-services": [
    {
      question: "Are there leasing fees, onboarding fees, or cancellation fees with your property management services?",
      answer:
        "No. Our property management services do not include leasing fees, onboarding fees, cancellation fees, or hidden charges. Pricing stays transparent so owners know what to expect from day one.",
    },
    {
      question: "Do you add markups to maintenance or vendor work under full-service management?",
      answer:
        "No. Maintenance and vendor invoices are passed through at cost. We only charge management fees when a tenant is in place and rent is being collected.",
    },
  ],
  "rental-property-marketing": [
    {
      question: "Does rental property marketing come with leasing, onboarding, or cancellation fees?",
      answer:
        "No. Marketing support is not bundled with leasing fees, onboarding fees, cancellation fees, or hidden add-ons. We keep the cost structure clear while your listing is active.",
    },
    {
      question: "If marketing leads to repairs, are vendor or maintenance costs marked up?",
      answer:
        "No. Vendor and maintenance expenses tied to getting a unit show-ready are not marked up. Owners pay the actual cost of the work, and management fees apply only when rent is being collected.",
    },
  ],
  "property-inspections": [
    {
      question: "Do property inspections include leasing, onboarding, or cancellation fees?",
      answer:
        "No. Inspection services are not tied to leasing fees, onboarding fees, cancellation fees, or surprise charges. Reporting and oversight stay priced in a straightforward way.",
    },
    {
      question: "When inspections identify repairs, do you markup maintenance or vendor bills?",
      answer:
        "No. We do not add markups to maintenance or vendor expenses found during inspections. Owners pay the actual cost of the service, and we only collect management fees when rent is being collected.",
    },
  ],
  "property-maintenance-services": [
    {
      question: "Are leasing, onboarding, or cancellation fees added to maintenance coordination?",
      answer:
        "No. Maintenance coordination does not come with leasing fees, onboarding fees, cancellation fees, or hidden charges. Our pricing stays simple and easy to follow.",
    },
    {
      question: "Do you markup maintenance or vendor expenses on repair work?",
      answer:
        "No. Owners pay the actual cost of maintenance and vendor work with no markup added. Management fees are collected only when a tenant is in place paying rent.",
    },
  ],
  "tenant-placement-services": [
    {
      question: "Do tenant placement services include separate leasing or onboarding fees?",
      answer:
        "No. Placement work does not include leasing fees, onboarding fees, cancellation fees, or hidden fees. Pricing stays clear from listing through move-in.",
    },
    {
      question: "Are turnover maintenance or vendor costs marked up during tenant placement?",
      answer:
        "No. Vendor and maintenance expenses related to placement or turnover are passed through at cost. We only collect management fees when the unit is occupied and rent is being collected.",
    },
  ],
  "specialized-property-management": [
    {
      question: "Does specialized property management include leasing, onboarding, or cancellation fees?",
      answer:
        "No. Specialized management does not add leasing fees, onboarding fees, cancellation fees, or hidden charges. Owners receive clear pricing whether the property is short-term or long-term.",
    },
    {
      question: "Do you markup maintenance or vendor expenses on specialized rentals?",
      answer:
        "No. Maintenance and vendor invoices are not marked up, regardless of rental type. Owners pay the actual cost of the work, and management fees apply only while rent is being collected.",
    },
  ],
  "multi-family-property-management": [
    {
      question: "Are there leasing, onboarding, or cancellation fees for multi-family property management?",
      answer:
        "No. Multi-family management does not include leasing fees, onboarding fees, cancellation fees, or hidden fees. Pricing stays transparent across every unit in the portfolio.",
    },
    {
      question: "Do you markup maintenance or vendor expenses across multi-unit properties?",
      answer:
        "No. Maintenance and vendor costs for shared systems, common areas, and individual units are passed through at cost. Management fees are collected only when units are occupied and paying rent.",
    },
  ],
  "hoa-community-management": [
    {
      question: "Does HOA community management include leasing, onboarding, or cancellation fees?",
      answer:
        "No. HOA support is not structured with leasing fees, onboarding fees, cancellation fees, or hidden charges. Boards receive clear, straightforward pricing for the services they need.",
    },
    {
      question: "Are community maintenance or vendor expenses marked up?",
      answer:
        "No. Vendor and maintenance invoices for common areas and community needs are not marked up. Communities pay the actual cost of the work performed.",
    },
  ],
  "long-term-rental-management": [
    {
      question: "Does long-term rental management include leasing, onboarding, or cancellation fees?",
      answer:
        "No. Long-term management does not include leasing fees, onboarding fees, cancellation fees, or hidden fees. Owners know the fee structure upfront before a lease begins.",
    },
    {
      question: "Do you markup maintenance or vendor expenses on long-term rentals?",
      answer:
        "No. Repair and vendor costs during a long-term lease are passed through at cost. We only collect management fees when a tenant is in place and rent is being collected.",
    },
  ],
  "property-risk-mitigation": [
    {
      question: "Are leasing, onboarding, or cancellation fees part of property risk mitigation services?",
      answer:
        "No. Risk mitigation support does not include leasing fees, onboarding fees, cancellation fees, or hidden charges. Pricing stays clear while screening, inspections, and oversight are in place.",
    },
    {
      question: "Do you markup maintenance or vendor expenses tied to risk-related repairs?",
      answer:
        "No. Maintenance and vendor work identified through inspections or risk reviews is not marked up. Owners pay the actual cost of the service needed to protect the property.",
    },
  ],
  "real-estate-investment-consulting": [
    {
      question: "Does real estate investment consulting include leasing, onboarding, or cancellation fees?",
      answer:
        "No. Consulting engagements are not bundled with leasing fees, onboarding fees, cancellation fees, or hidden add-ons. Investors receive clear pricing for the guidance they need.",
    },
    {
      question: "If consulting leads to managed repairs, are maintenance or vendor costs marked up?",
      answer:
        "No. When management follows consulting work, maintenance and vendor expenses remain at cost with no markup. Management fees apply only when a tenant is in place paying rent.",
    },
  ],
  "property-risk-management-meridian-id": [
    {
      question: "Does Meridian property risk management include leasing, onboarding, or cancellation fees?",
      answer:
        "No. Local risk management support does not include leasing fees, onboarding fees, cancellation fees, or hidden fees. Owners receive straightforward pricing for oversight in Meridian.",
    },
    {
      question: "Do you markup maintenance or vendor expenses on Meridian rental properties?",
      answer:
        "No. Maintenance and vendor invoices for Meridian-area rentals are passed through at cost. We only collect management fees when rent is actively being collected.",
    },
  ],
  rentals: [
    {
      question: "Are there leasing, onboarding, or cancellation fees for rental management in Meridian?",
      answer:
        "No. Rental management does not include leasing fees, onboarding fees, cancellation fees, or hidden charges. We keep pricing clear for owners across every rental type we support.",
    },
    {
      question: "Do you markup maintenance or vendor expenses on managed rentals?",
      answer:
        "No. Owners pay the actual cost of maintenance and vendor work with no markup added. Management fees are collected only when a tenant is in place paying rent.",
    },
  ],
  "condo-rentals-meridian-id": [
    {
      question: "Do Meridian condo rentals come with leasing, onboarding, or cancellation fees?",
      answer:
        "No. Condo management does not include leasing fees, onboarding fees, cancellation fees, or hidden fees. Owners receive clear pricing from listing through ongoing management.",
    },
    {
      question: "Are maintenance or vendor expenses marked up on condo rentals?",
      answer:
        "No. Repair and vendor costs for condo units are passed through at cost. We only collect management fees when the unit is occupied and rent is being collected.",
    },
  ],
  "home-rentals-meridian-id": [
    {
      question: "Are there leasing, onboarding, or cancellation fees for Meridian home rentals?",
      answer:
        "No. Home rental management does not include leasing fees, onboarding fees, cancellation fees, or hidden charges. Pricing stays straightforward for single-family owners.",
    },
    {
      question: "Do you markup maintenance or vendor expenses on rental homes?",
      answer:
        "No. Maintenance and vendor work on rental homes is billed at cost with no markup. Management fees apply only when a tenant is paying rent.",
    },
  ],
  "month-to-month-rentals-meridian-id": [
    {
      question: "Do month-to-month rentals include leasing, onboarding, or cancellation fees?",
      answer:
        "No. Flexible lease management does not add leasing fees, onboarding fees, cancellation fees, or hidden fees. Owners know the cost structure even with frequent turnover.",
    },
    {
      question: "Are turnover maintenance or vendor costs marked up on month-to-month units?",
      answer:
        "No. Cleaning, repairs, and vendor expenses between tenants are passed through at cost. Management fees are collected only while the unit is occupied and rent is being collected.",
    },
  ],
  "long-term-rentals-meridian-id": [
    {
      question: "Does long-term rental management in Meridian include leasing or cancellation fees?",
      answer:
        "No. Long-term rental support does not include leasing fees, onboarding fees, cancellation fees, or hidden charges. Owners receive clear pricing for steady lease oversight.",
    },
    {
      question: "Do you markup maintenance or vendor expenses on long-term Meridian rentals?",
      answer:
        "No. Maintenance and vendor invoices during a long-term lease are not marked up. We only collect management fees when a tenant is in place paying rent.",
    },
  ],
  "foot-massage-reflexology": [
    {
      question: "Does Greenbelt Property Management charge leasing, onboarding, or cancellation fees?",
      answer:
        "No. We do not charge leasing fees, onboarding fees, cancellation fees, or hidden fees. Our Meridian property management pricing stays clear and straightforward for owners.",
    },
    {
      question: "Do you markup maintenance or vendor expenses on managed properties?",
      answer:
        "No. Owners pay the actual cost of maintenance and vendor work with no markup added. We only collect management fees when a tenant is in place paying rent.",
    },
  ],
};

/** Inserts pricing FAQs after the first item when a page-specific pair exists. */
export function insertPmPricingFaqsAfterFirst(
  slug: string,
  faqItems: TreasureValleyFaqItem[],
): TreasureValleyFaqItem[] {
  const pair = PRICING_FAQS_BY_SLUG[slug];
  if (!pair || faqItems.length === 0) return faqItems;
  return [faqItems[0], ...pair, ...faqItems.slice(1)];
}
