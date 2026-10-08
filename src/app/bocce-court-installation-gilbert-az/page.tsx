import { generatePmServiceMetadata, PmServicePage } from "@/lib/pm-service-page-route";

const SLUG = "bocce-court-installation-gilbert-az";

export const generateMetadata = () => generatePmServiceMetadata(SLUG);

export const dynamic = "force-dynamic";

export default function BocceCourtInstallationGilbertAzPage() {
  return <PmServicePage slug={SLUG} />;
}
