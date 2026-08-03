import { generatePmServiceMetadata, PmServicePage } from "@/lib/pm-service-page-route";

const SLUG = "cushioned-court-systems";

export const generateMetadata = () => generatePmServiceMetadata(SLUG);

export const dynamic = "force-dynamic";

export default function CushionedCourtSystemsPage() {
  return <PmServicePage slug={SLUG} />;
}
