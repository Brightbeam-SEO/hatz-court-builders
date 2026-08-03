import { generatePmServiceMetadata, PmServicePage } from "@/lib/pm-service-page-route";

const SLUG = "synthetic-courts";

export const generateMetadata = () => generatePmServiceMetadata(SLUG);

export const dynamic = "force-dynamic";

export default function SyntheticCourtsPage() {
  return <PmServicePage slug={SLUG} />;
}
