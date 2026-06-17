import { generatePmServiceMetadata, PmServicePage } from "@/lib/pm-service-page-route";

const SLUG = "pickleball-court-construction";

export const generateMetadata = () => generatePmServiceMetadata(SLUG);

export const dynamic = "force-dynamic";

export default function PickleballCourtConstructionPage() {
  return <PmServicePage slug={SLUG} />;
}
