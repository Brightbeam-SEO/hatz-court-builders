import { GalleryPage } from "@/components/gallery/gallery-page";
import { buildGpmPageMetadata } from "@/lib/gpm-sitemap-seo";
import { getGalleryContentForPage } from "@/sanity/fetch-gallery";
import { getHomeContentForPage } from "@/sanity/fetch-home";

export const dynamic = "force-dynamic";

export const metadata = buildGpmPageMetadata("/gallery/");

export default async function GalleryPageRoute() {
  const [home, gallery] = await Promise.all([getHomeContentForPage(), getGalleryContentForPage()]);
  return <GalleryPage socialLinks={home.socialLinks} content={gallery} />;
}
