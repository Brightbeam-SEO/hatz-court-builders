import { generatePmServiceMetadata, PmServicePage } from "@/lib/pm-service-page-route";
import { StructuredData } from "@/components/seo/structured-data";
import { BUSINESS, DEFAULT_SOCIAL_LINKS } from "@/lib/business";
import { buildCanonicalUrl } from "@/lib/site-url";

const SLUG = "court-builders-boise-id";

export const generateMetadata = () => generatePmServiceMetadata(SLUG);

export const dynamic = "force-dynamic";

export default function CourtBuildersBoiseIdPage() {
  const pageUrl = buildCanonicalUrl(`/${SLUG}/`);
  const homepageUrl = buildCanonicalUrl("/");
  const localBusinessId = `${pageUrl}#localbusiness`;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "GeneralContractor",
        "@id": localBusinessId,
        name: BUSINESS.nameFull,
        url: pageUrl,
        telephone: BUSINESS.phoneTel.replace("tel:", ""),
        email: BUSINESS.email,
        description: BUSINESS.description,
        parentOrganization: { "@id": `${homepageUrl}#organization` },
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [
              "https://schema.org/Monday",
              "https://schema.org/Tuesday",
              "https://schema.org/Wednesday",
              "https://schema.org/Thursday",
              "https://schema.org/Friday",
              "https://schema.org/Saturday",
              "https://schema.org/Sunday",
            ],
            opens: "00:00",
            closes: "23:59",
          },
        ],
        areaServed: BUSINESS.serviceCitiesIdaho.map((city) => ({
          "@type": "City",
          name: city,
          containedInPlace: { "@type": "State", name: "Idaho" },
        })),
        sameAs: [BUSINESS.mapsGoogleUrl, ...DEFAULT_SOCIAL_LINKS.map((link) => link.href)],
        hasMap: BUSINESS.mapsGoogleUrl,
      },
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: "Hatz Court Builders Boise, Idaho",
        about: { "@id": localBusinessId },
        isPartOf: { "@id": `${homepageUrl}#website` },
      },
    ],
  };

  return (
    <>
      <StructuredData data={schema} />
      <PmServicePage slug={SLUG} />
    </>
  );
}
