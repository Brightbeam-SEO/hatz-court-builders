import { generatePmServiceMetadata, PmServicePage } from "@/lib/pm-service-page-route";

const SLUG = "pickleball-court-builders-mesa-az";

export const generateMetadata = () => generatePmServiceMetadata(SLUG);

export const dynamic = "force-dynamic";

export default function PickleballCourtBuildersMesaAzPage() {
  return <PmServicePage slug={SLUG} />;
}
