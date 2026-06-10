import { ContactPage } from "@/components/contact/contact-page";
import { buildGpmPageMetadata } from "@/lib/gpm-sitemap-seo";
import { getHomeContentForPage } from "@/sanity/fetch-home";

export const metadata = buildGpmPageMetadata("/contact/");

export default async function ContactPageRoute() {
  const home = await getHomeContentForPage();
  return (
    <ContactPage
      socialLinks={home.socialLinks}
      heroTrustStripLogos={home.copy.heroTrustStripLogos}
    />
  );
}
