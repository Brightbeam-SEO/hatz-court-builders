import { generatePmServiceMetadata, PmServicePage } from "@/lib/pm-service-page-route";

const SLUG = "basketball-court-builder-chandler-az";

export const generateMetadata = () => generatePmServiceMetadata(SLUG);

export const dynamic = "force-dynamic";

export default function BasketballCourtBuilderChandlerAzPage() {
  return <PmServicePage slug={SLUG} />;
}
