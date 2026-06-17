import { generatePmServiceMetadata, PmServicePage } from "@/lib/pm-service-page-route";

const SLUG = "court-builder-middleton-id";

export const generateMetadata = () => generatePmServiceMetadata(SLUG);

export const dynamic = "force-dynamic";

export default function CourtBuilderMiddletonIdPage() {
  return <PmServicePage slug={SLUG} />;
}
