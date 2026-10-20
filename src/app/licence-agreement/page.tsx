import { LegalPage } from "@/components/legal/legal-page";
import { buildGpmPageMetadata } from "@/lib/gpm-sitemap-seo";
import { readLegalPageMarkdown } from "@/lib/legal-pages";
import { getHomeContentForPage } from "@/sanity/fetch-home";

export const dynamic = "force-dynamic";

export const metadata = buildGpmPageMetadata("/licence-agreement/");

export default async function LicenceAgreementPage() {
  const home = await getHomeContentForPage();
  return (
    <LegalPage
      title="Licence Agreement"
      markdown={readLegalPageMarkdown("licence-agreement")}
      socialLinks={home.socialLinks}
    />
  );
}