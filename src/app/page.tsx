import { HomePageWithContent } from "@/components/home/home-page-with-content";
import { buildGpmPageMetadata } from "@/lib/gpm-sitemap-seo";
import { getHomeContentForPage } from "@/sanity/fetch-home";

export const metadata = buildGpmPageMetadata("/");

/** Always refetch home + Sanity merge so CMS edits (e.g. FAQs) show without relying on stale static shell. */
export const dynamic = "force-dynamic";

export default async function Home() {
  const home = await getHomeContentForPage();
  return <HomePageWithContent value={home} />;
}
