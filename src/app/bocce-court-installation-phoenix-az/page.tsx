import { generatePmServiceMetadata, PmServicePage } from "@/lib/pm-service-page-route";

const SLUG = "bocce-court-installation-phoenix-az";

export const generateMetadata = () => generatePmServiceMetadata(SLUG);

export const dynamic = "force-dynamic";

export default function BocceCourtInstallationPhoenixAzPage() {
  return <PmServicePage slug={SLUG} />;
}
