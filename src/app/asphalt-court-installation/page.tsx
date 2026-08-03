import { generatePmServiceMetadata, PmServicePage } from "@/lib/pm-service-page-route";

const SLUG = "asphalt-court-installation";

export const generateMetadata = () => generatePmServiceMetadata(SLUG);

export const dynamic = "force-dynamic";

export default function AsphaltCourtInstallationPage() {
  return <PmServicePage slug={SLUG} />;
}
