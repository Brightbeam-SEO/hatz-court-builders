import { generatePmServiceMetadata, PmServicePage } from "@/lib/pm-service-page-route";

const SLUG = "modular-court-surfaces";

export const generateMetadata = () => generatePmServiceMetadata(SLUG);

export const dynamic = "force-dynamic";

export default function ModularCourtSurfacesPage() {
  return <PmServicePage slug={SLUG} />;
}
