import { generatePmServiceMetadata, PmServicePage } from "@/lib/pm-service-page-route";

const SLUG = "volleyball-court-construction";

export const generateMetadata = () => generatePmServiceMetadata(SLUG);

export const dynamic = "force-dynamic";

export default function VolleyballCourtConstructionPage() {
  return <PmServicePage slug={SLUG} />;
}
