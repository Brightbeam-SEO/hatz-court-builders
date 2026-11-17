import { LegalPage } from "@/components/legal/legal-page";
import { StructuredData } from "@/components/seo/structured-data";
import { buildArticleSchema, parseLegalLastUpdated } from "@/lib/article-schema";
import { GPM_SITEMAP_SEO, buildGpmPageMetadata } from "@/lib/gpm-sitemap-seo";
import { readLegalPageMarkdown } from "@/lib/legal-pages";
import { gpmPick } from "@/lib/gpm-pick-gallery";
import { getHomeContentForPage } from "@/sanity/fetch-home";

export const dynamic = "force-dynamic";

export const metadata = buildGpmPageMetadata("/licence-agreement/");

export default async function LicenceAgreementPage() {
  const home = await getHomeContentForPage();
  const markdown = readLegalPageMarkdown("licence-agreement");
  const updated = parseLegalLastUpdated(markdown) ?? "2026-10-20";
  const seo = GPM_SITEMAP_SEO["/licence-agreement/"];

  return (
    <>
      <StructuredData
        data={buildArticleSchema({
          pagePath: "/licence-agreement/",
          headline: "Licence Agreement",
          description: seo?.description,
          image: gpmPick("outdoor multi court acrylic surfacing"),
          datePublished: updated,
          dateModified: updated,
        })}
      />
      <LegalPage title="Licence Agreement" markdown={markdown} socialLinks={home.socialLinks} />
    </>
  );
}