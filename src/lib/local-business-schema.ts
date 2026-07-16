import { BUSINESS, DEFAULT_SOCIAL_LINKS } from "@/lib/business";
import { buildCanonicalUrl } from "@/lib/site-url";

type LocalBusinessArea = "idaho" | "arizona";

function dayOfWeekUrls() {
  return [
    "https://schema.org/Monday",
    "https://schema.org/Tuesday",
    "https://schema.org/Wednesday",
    "https://schema.org/Thursday",
    "https://schema.org/Friday",
    "https://schema.org/Saturday",
    "https://schema.org/Sunday",
  ];
}

function citiesAsAreaServed(cities: readonly string[], state: string) {
  return cities.map((city) => ({
    "@type": "City",
    name: city,
    containedInPlace: { "@type": "State", name: state },
  }));
}

function postalAddressForArea(area: LocalBusinessArea) {
  if (area === "arizona") {
    return {
      "@type": "PostalAddress",
      addressLocality: "Scottsdale",
      addressRegion: "AZ",
      addressCountry: "US",
    };
  }
  return {
    "@type": "PostalAddress",
    addressLocality: "Boise",
    addressRegion: "ID",
    addressCountry: "US",
  };
}

/**
 * Standalone LocalBusiness JSON-LD.
 * Do not reference this node from WebPage.about / mainEntity — schema.org's
 * validator nests linked nodes under the parent and hides LocalBusiness as a
 * top-level detected type.
 */
export function buildLocalBusinessSchema(input: {
  pagePath: string;
  area: LocalBusinessArea;
  name?: string;
}) {
  const pageUrl = buildCanonicalUrl(input.pagePath);
  const logoUrl = buildCanonicalUrl(BUSINESS.logoSrc);
  const mapUrl =
    input.area === "arizona" ? BUSINESS.mapsGoogleUrlScottsdale : BUSINESS.mapsGoogleUrl;

  const areaServed =
    input.area === "arizona"
      ? citiesAsAreaServed(BUSINESS.serviceCitiesArizona, "Arizona")
      : citiesAsAreaServed(BUSINESS.serviceCitiesIdaho, "Idaho");

  const sameAs = [
    mapUrl,
    ...DEFAULT_SOCIAL_LINKS.map((link) => link.href).filter((href) => href !== mapUrl),
  ];

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    additionalType: "https://schema.org/GeneralContractor",
    "@id": `${pageUrl}#localbusiness`,
    name: input.name ?? BUSINESS.nameFull,
    url: pageUrl,
    telephone: BUSINESS.phoneTel.replace("tel:", ""),
    email: BUSINESS.email,
    description: BUSINESS.description,
    image: logoUrl,
    logo: logoUrl,
    address: postalAddressForArea(input.area),
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: dayOfWeekUrls(),
        opens: "00:00",
        closes: "23:59",
      },
    ],
    areaServed,
    sameAs,
    hasMap: mapUrl,
  };
}

export function buildWebPageSchema(input: {
  pagePath: string;
  name: string;
}) {
  const pageUrl = buildCanonicalUrl(input.pagePath);
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: input.name,
  };
}

export function buildFaqPageSchema(
  pagePath: string,
  items: readonly { question: string; answer: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${buildCanonicalUrl(pagePath)}#faq`,
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
