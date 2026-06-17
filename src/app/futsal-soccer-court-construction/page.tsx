import { generatePmServiceMetadata, PmServicePage } from "@/lib/pm-service-page-route";

const SLUG = "futsal-soccer-court-construction";

export const generateMetadata = () => generatePmServiceMetadata(SLUG);

export const dynamic = "force-dynamic";

export default function FutsalSoccerCourtConstructionPage() {
  return <PmServicePage slug={SLUG} />;
}
