import { AboutPage } from "@/components/about/about-page";
import { buildGpmPageMetadata } from "@/lib/gpm-sitemap-seo";
import { getHomeContentForPage } from "@/sanity/fetch-home";

export const metadata = buildGpmPageMetadata("/about/");

export default async function AboutPageRoute() {
  const home = await getHomeContentForPage();
  return (
    <AboutPage homeContent={home} socialLinks={home.socialLinks} />
  );
}
