import { generatePmServiceMetadata, PmServicePage } from "@/lib/pm-service-page-route";

const SLUG = "acrylic-court-systems";

export const generateMetadata = () => generatePmServiceMetadata(SLUG);

export const dynamic = "force-dynamic";

export default function AcrylicCourtSystemsPage() {
  return <PmServicePage slug={SLUG} />;
}
