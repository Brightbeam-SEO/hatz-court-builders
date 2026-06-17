import { generatePmServiceMetadata, PmServicePage } from "@/lib/pm-service-page-route";

const SLUG = "court-builder-chandler-az";

export const generateMetadata = () => generatePmServiceMetadata(SLUG);

export const dynamic = "force-dynamic";

export default function CourtBuilderChandlerAzPage() {
  return <PmServicePage slug={SLUG} />;
}
