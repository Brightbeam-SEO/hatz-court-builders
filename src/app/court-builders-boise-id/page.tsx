import { generatePmServiceMetadata, PmServicePage } from "@/lib/pm-service-page-route";
import { StructuredData } from "@/components/seo/structured-data";
import { buildLocalBusinessSchema, buildWebPageSchema } from "@/lib/local-business-schema";

const SLUG = "court-builders-boise-id";

export const generateMetadata = () => generatePmServiceMetadata(SLUG);

export const dynamic = "force-dynamic";

export default function CourtBuildersBoiseIdPage() {
  return (
    <>
      <StructuredData
        data={buildLocalBusinessSchema({
          pagePath: `/${SLUG}/`,
          area: "idaho",
          name: "Hatz Court Builders",
        })}
      />
      <StructuredData
        data={buildWebPageSchema({
          pagePath: `/${SLUG}/`,
          name: "Hatz Court Builders Boise, Idaho",
        })}
      />
      <PmServicePage slug={SLUG} />
    </>
  );
}
