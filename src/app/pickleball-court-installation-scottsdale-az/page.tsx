import { generatePmServiceMetadata, PmServicePage } from "@/lib/pm-service-page-route";

const SLUG = "pickleball-court-installation-scottsdale-az";

export const generateMetadata = () => generatePmServiceMetadata(SLUG);

export const dynamic = "force-dynamic";

export default function PickleballCourtInstallationScottsdaleAzPage() {
  return <PmServicePage slug={SLUG} />;
}
