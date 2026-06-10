import { GalleryPage } from "@/components/gallery/gallery-page";
import { getGalleryContentForPage } from "@/sanity/fetch-gallery";
import { getHomeContentForPage } from "@/sanity/fetch-home";

export const dynamic = "force-dynamic";

export default async function GalleryPageRoute() {
  const [home, gallery] = await Promise.all([getHomeContentForPage(), getGalleryContentForPage()]);
  return <GalleryPage socialLinks={home.socialLinks} content={gallery} />;
}
