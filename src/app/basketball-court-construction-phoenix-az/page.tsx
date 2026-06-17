import { generatePmServiceMetadata, PmServicePage } from "@/lib/pm-service-page-route";

const SLUG = "basketball-court-construction-phoenix-az";

export const generateMetadata = () => generatePmServiceMetadata(SLUG);

export const dynamic = "force-dynamic";

export default function BasketballCourtConstructionPhoenixAzPage() {
  return <PmServicePage slug={SLUG} />;
}
