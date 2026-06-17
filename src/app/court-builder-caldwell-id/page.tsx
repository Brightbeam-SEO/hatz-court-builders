import { generatePmServiceMetadata, PmServicePage } from "@/lib/pm-service-page-route";

const SLUG = "court-builder-caldwell-id";

export const generateMetadata = () => generatePmServiceMetadata(SLUG);

export const dynamic = "force-dynamic";

export default function CourtBuilderCaldwellIdPage() {
  return <PmServicePage slug={SLUG} />;
}
