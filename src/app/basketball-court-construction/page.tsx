import { generatePmServiceMetadata, PmServicePage } from "@/lib/pm-service-page-route";

const SLUG = "basketball-court-construction";

export const generateMetadata = () => generatePmServiceMetadata(SLUG);

export const dynamic = "force-dynamic";

export default function BasketballCourtConstructionPage() {
  return <PmServicePage slug={SLUG} />;
}
