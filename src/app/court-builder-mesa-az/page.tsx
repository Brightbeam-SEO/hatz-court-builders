import { generatePmServiceMetadata, PmServicePage } from "@/lib/pm-service-page-route";

const SLUG = "court-builder-mesa-az";

export const generateMetadata = () => generatePmServiceMetadata(SLUG);

export const dynamic = "force-dynamic";

export default function CourtBuilderMesaAzPage() {
  return <PmServicePage slug={SLUG} />;
}
