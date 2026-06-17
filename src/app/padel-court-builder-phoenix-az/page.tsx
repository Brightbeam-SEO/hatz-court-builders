import { generatePmServiceMetadata, PmServicePage } from "@/lib/pm-service-page-route";

const SLUG = "padel-court-builder-phoenix-az";

export const generateMetadata = () => generatePmServiceMetadata(SLUG);

export const dynamic = "force-dynamic";

export default function PadelCourtBuilderPhoenixAzPage() {
  return <PmServicePage slug={SLUG} />;
}
