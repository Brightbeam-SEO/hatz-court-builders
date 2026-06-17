import { generatePmServiceMetadata, PmServicePage } from "@/lib/pm-service-page-route";

const SLUG = "tennis-court-construction";

export const generateMetadata = () => generatePmServiceMetadata(SLUG);

export const dynamic = "force-dynamic";

export default function TennisCourtConstructionPage() {
  return <PmServicePage slug={SLUG} />;
}
