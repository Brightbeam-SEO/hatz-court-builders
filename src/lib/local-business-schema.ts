import { BUSINESS, DEFAULT_SOCIAL_LINKS } from "@/lib/business";
import { buildCanonicalUrl } from "@/lib/site-url";

type LocalBusinessArea = "home" | "idaho" | "arizona";

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

/** Standalone LocalBusiness JSON-LD (not merged into Organization/WebSite). */
export function buildLocalBusinessSchema(input: {
  pagePath: string;
  area: LocalBusinessArea;
  name?: string;
}) {
  const pageUrl = buildCanonicalUrl(input.pagePath);
  const homepageUrl = buildCanonicalUrl("/");
  const logoUrl = buildCanonicalUrl(BUSINESS.logoSrc);
  const mapUrl =
    input.area === "arizona" ? BUSINESS.mapsGoogleUrlScottsdale : BUSINESS.mapsGoogleUrl;

  const areaServed =
    input.area === "arizona"
      ? citiesAsAreaServed(BUSINESS.serviceCitiesArizona, "Arizona")
      : input.area === "idaho"
        ? citiesAsAreaServed(BUSINESS.serviceCitiesIdaho, "Idaho")
        : [
            { "@type": "State", name: "Idaho" },
            { "@type": "State", name: "Arizona" },
          ];

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
    parentOrganization: { "@id": `${homepageUrl}#organization` },
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
