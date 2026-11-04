import { generatePmServiceMetadata, PmServicePage } from "@/lib/pm-service-page-route";

const SLUG = "pickleball-court-builder-chandler-az";

export const generateMetadata = () => generatePmServiceMetadata(SLUG);

export const dynamic = "force-dynamic";

export default function PickleballCourtBuilderChandlerAzPage() {
  return <PmServicePage slug={SLUG} />;
}
