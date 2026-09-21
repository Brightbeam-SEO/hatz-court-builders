import { generatePmServiceMetadata, PmServicePage } from "@/lib/pm-service-page-route";

const SLUG = "bocce-court-builder-scottsdale-az";

export const generateMetadata = () => generatePmServiceMetadata(SLUG);

export const dynamic = "force-dynamic";

export default function BocceCourtBuilderScottsdaleAzPage() {
  return <PmServicePage slug={SLUG} />;
}
