import { generatePmServiceMetadata, PmServicePage } from "@/lib/pm-service-page-route";

const SLUG = "padel-court-builder-scottsdale-az";

export const generateMetadata = () => generatePmServiceMetadata(SLUG);

export const dynamic = "force-dynamic";

export default function PadelCourtBuilderScottsdaleAzPage() {
  return <PmServicePage slug={SLUG} />;
}
