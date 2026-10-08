import { generatePmServiceMetadata, PmServicePage } from "@/lib/pm-service-page-route";

const SLUG = "padel-court-builder-gilbert-az";

export const generateMetadata = () => generatePmServiceMetadata(SLUG);

export const dynamic = "force-dynamic";

export default function PadelCourtBuilderGilbertAzPage() {
  return <PmServicePage slug={SLUG} />;
}
