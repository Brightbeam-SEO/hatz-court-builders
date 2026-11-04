import { generatePmServiceMetadata, PmServicePage } from "@/lib/pm-service-page-route";

const SLUG = "bocce-court-builder-chandler-az";

export const generateMetadata = () => generatePmServiceMetadata(SLUG);

export const dynamic = "force-dynamic";

export default function BocceCourtBuilderChandlerAzPage() {
  return <PmServicePage slug={SLUG} />;
}
