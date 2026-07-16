import { generatePmServiceMetadata, PmServicePage } from "@/lib/pm-service-page-route";
import { StructuredData } from "@/components/seo/structured-data";
import { buildLocalBusinessSchema, buildWebPageSchema } from "@/lib/local-business-schema";

const SLUG = "court-builder-scottsdale-az";

export const generateMetadata = () => generatePmServiceMetadata(SLUG);

export const dynamic = "force-dynamic";

export default function CourtBuilderScottsdaleAzPage() {
  return (
    <>
      <StructuredData
        data={buildLocalBusinessSchema({
          pagePath: `/${SLUG}/`,
          area: "arizona",
          name: "Hatz Court Builders",
        })}
      />
      <StructuredData
        data={buildWebPageSchema({
          pagePath: `/${SLUG}/`,
          name: "Hatz Court Builders Scottsdale, Arizona",
        })}
      />
      <PmServicePage slug={SLUG} />
    </>
  );
}
