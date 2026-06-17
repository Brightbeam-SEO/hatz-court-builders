import { generatePmServiceMetadata, PmServicePage } from "@/lib/pm-service-page-route";

const SLUG = "court-builder-eagle-id";

export const generateMetadata = () => generatePmServiceMetadata(SLUG);

export const dynamic = "force-dynamic";

export default function CourtBuilderEagleIdPage() {
  return <PmServicePage slug={SLUG} />;
}
