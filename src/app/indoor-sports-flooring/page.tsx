import { generatePmServiceMetadata, PmServicePage } from "@/lib/pm-service-page-route";

const SLUG = "indoor-sports-flooring";

export const generateMetadata = () => generatePmServiceMetadata(SLUG);

export const dynamic = "force-dynamic";

export default function IndoorSportsFlooringPage() {
  return <PmServicePage slug={SLUG} />;
}
