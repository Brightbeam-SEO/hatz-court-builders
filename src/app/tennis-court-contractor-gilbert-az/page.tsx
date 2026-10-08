import { generatePmServiceMetadata, PmServicePage } from "@/lib/pm-service-page-route";

const SLUG = "tennis-court-contractor-gilbert-az";

export const generateMetadata = () => generatePmServiceMetadata(SLUG);

export const dynamic = "force-dynamic";

export default function TennisCourtContractorGilbertAzPage() {
  return <PmServicePage slug={SLUG} />;
}
