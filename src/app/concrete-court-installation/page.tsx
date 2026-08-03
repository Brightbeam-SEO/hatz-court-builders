import { generatePmServiceMetadata, PmServicePage } from "@/lib/pm-service-page-route";

const SLUG = "concrete-court-installation";

export const generateMetadata = () => generatePmServiceMetadata(SLUG);

export const dynamic = "force-dynamic";

export default function ConcreteCourtInstallationPage() {
  return <PmServicePage slug={SLUG} />;
}
