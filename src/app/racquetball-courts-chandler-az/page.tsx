import { generatePmServiceMetadata, PmServicePage } from "@/lib/pm-service-page-route";

const SLUG = "racquetball-courts-chandler-az";

export const generateMetadata = () => generatePmServiceMetadata(SLUG);

export const dynamic = "force-dynamic";

export default function RacquetballCourtsChandlerAzPage() {
  return <PmServicePage slug={SLUG} />;
}
