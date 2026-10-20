import { LegalPage } from "@/components/legal/legal-page";
import { buildGpmPageMetadata } from "@/lib/gpm-sitemap-seo";
import { readLegalPageMarkdown } from "@/lib/legal-pages";
import { getHomeContentForPage } from "@/sanity/fetch-home";

export const dynamic = "force-dynamic";

export const metadata = buildGpmPageMetadata("/privacy-policy/");

export default async function PrivacyPolicyPage() {
  const home = await getHomeContentForPage();
  return (
    <LegalPage
      title="Privacy Policy"
      markdown={readLegalPageMarkdown("privacy-policy")}
      socialLinks={home.socialLinks}
    />
  );
}
