import { generatePmServiceMetadata, PmServicePage } from "@/lib/pm-service-page-route";

const SLUG = "tennis-court-builders-phoenix-az";

export const generateMetadata = () => generatePmServiceMetadata(SLUG);

export const dynamic = "force-dynamic";

export default function TennisCourtBuildersPhoenixAzPage() {
  return <PmServicePage slug={SLUG} />;
}
