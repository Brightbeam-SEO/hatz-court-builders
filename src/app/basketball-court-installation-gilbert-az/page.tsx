import { generatePmServiceMetadata, PmServicePage } from "@/lib/pm-service-page-route";

const SLUG = "basketball-court-installation-gilbert-az";

export const generateMetadata = () => generatePmServiceMetadata(SLUG);

export const dynamic = "force-dynamic";

export default function BasketballCourtInstallationGilbertAzPage() {
  return <PmServicePage slug={SLUG} />;
}
