import { generatePmServiceMetadata, PmServicePage } from "@/lib/pm-service-page-route";

const SLUG = "basketball-court-installation-scottsdale-az";

export const generateMetadata = () => generatePmServiceMetadata(SLUG);

export const dynamic = "force-dynamic";

export default function BasketballCourtInstallationScottsdaleAzPage() {
  return <PmServicePage slug={SLUG} />;
}
