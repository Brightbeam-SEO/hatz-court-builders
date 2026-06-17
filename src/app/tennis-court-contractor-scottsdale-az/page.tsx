import { generatePmServiceMetadata, PmServicePage } from "@/lib/pm-service-page-route";

const SLUG = "tennis-court-contractor-scottsdale-az";

export const generateMetadata = () => generatePmServiceMetadata(SLUG);

export const dynamic = "force-dynamic";

export default function TennisCourtContractorScottsdaleAzPage() {
  return <PmServicePage slug={SLUG} />;
}
