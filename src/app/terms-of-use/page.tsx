import { LegalPage } from "@/components/legal/legal-page";
import { buildGpmPageMetadata } from "@/lib/gpm-sitemap-seo";
import { readLegalPageMarkdown } from "@/lib/legal-pages";
import { getHomeContentForPage } from "@/sanity/fetch-home";

export const dynamic = "force-dynamic";

export const metadata = buildGpmPageMetadata("/terms-of-use/");

export default async function TermsOfUsePage() {
  const home = await getHomeContentForPage();
  return (
    <LegalPage
      title="Terms of Use"
      markdown={readLegalPageMarkdown("terms-of-use")}
      socialLinks={home.socialLinks}
    />
  );
}
