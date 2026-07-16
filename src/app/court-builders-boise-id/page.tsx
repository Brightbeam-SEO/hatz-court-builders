import { generatePmServiceMetadata, PmServicePage } from "@/lib/pm-service-page-route";
import { StructuredData } from "@/components/seo/structured-data";
import { buildLocalBusinessSchema } from "@/lib/local-business-schema";
import { buildCanonicalUrl } from "@/lib/site-url";

const SLUG = "court-builders-boise-id";

export const generateMetadata = () => generatePmServiceMetadata(SLUG);

export const dynamic = "force-dynamic";

export default function CourtBuildersBoiseIdPage() {
  const pageUrl = buildCanonicalUrl(`/${SLUG}/`);
  const homepageUrl = buildCanonicalUrl("/");
  const localBusinessId = `${pageUrl}#localbusiness`;

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: "Hatz Court Builders Boise, Idaho",
    about: { "@id": localBusinessId },
    isPartOf: { "@id": `${homepageUrl}#website` },
  };

  return (
    <>
      <StructuredData
        data={buildLocalBusinessSchema({
          pagePath: `/${SLUG}/`,
          area: "idaho",
          name: "Hatz Court Builders",
        })}
      />
      <StructuredData data={webPageSchema} />
      <PmServicePage slug={SLUG} />
    </>
  );
}
