import { generatePmServiceMetadata, PmServicePage } from "@/lib/pm-service-page-route";

const SLUG = "pickleball-court-builder-gilbert-az";

export const generateMetadata = () => generatePmServiceMetadata(SLUG);

export const dynamic = "force-dynamic";

export default function PickleballCourtBuilderGilbertAzPage() {
  return <PmServicePage slug={SLUG} />;
}
