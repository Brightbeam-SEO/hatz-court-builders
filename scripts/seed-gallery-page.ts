import { getCliClient } from "sanity/cli";
import { getStaticGalleryContent } from "../src/components/gallery/site-data";

type GalleryPageDoc = {
  _id: string;
  _type: "galleryPage";
  title: string;
  slug: { _type: "slug"; current: string };
  intro: string;
  heroSubheading: string;
  overviewHeadline: string;
  overviewBody: string;
  overviewStats: Array<{
    _key: string;
    value: string;
    label: string;
  }>;
  highlightsTitle: string;
  highlightsIntro: string;
  highlightItems: Array<{
    _key: string;
    image: string;
    caption?: string;
    alt: string;
  }>;
  items: Array<{
    _key: string;
    image: string;
    caption?: string;
    alt: string;
  }>;
  seo: {
    metaTitle?: string;
    metaDescription?: string;
  };
};

function makeKey(prefix: string, idx: number): string {
  return `${prefix}-${String(idx + 1).padStart(2, "0")}`;
}

async function main() {
  const client = getCliClient({ apiVersion: "2024-01-01" });
  const content = getStaticGalleryContent();

  const existing = await client.fetch<{ _id: string } | null>(
    '*[_type == "galleryPage" && slug.current == "gallery"] | order(_updatedAt desc)[0]{_id}',
  );
  const docId = existing?._id ?? "galleryPage";

  const doc: GalleryPageDoc = {
    _id: docId,
    _type: "galleryPage",
    title: content.title,
    slug: { _type: "slug", current: content.slug },
    intro: content.heroSubheading,
    heroSubheading: content.heroSubheading,
    overviewHeadline: content.overviewHeadline,
    overviewBody: content.overviewBody,
    overviewStats: content.overviewStats.map((item, idx) => ({
      _key: makeKey("stat", idx),
      value: item.value,
      label: item.label,
    })),
    highlightsTitle: content.highlightsTitle,
    highlightsIntro: content.highlightsIntro,
    highlightItems: content.highlightItems.map((item, idx) => ({
      _key: makeKey("highlight", idx),
      image: item.image,
      alt: item.alt,
      caption: item.caption,
    })),
    items: content.items.map((item, idx) => ({
      _key: makeKey("item", idx),
      image: item.image,
      alt: item.alt,
      caption: item.caption,
    })),
    seo: {
      metaTitle: content.seo?.metaTitle,
      metaDescription: content.seo?.metaDescription,
    },
  };

  await client.createOrReplace(doc);
  console.log(`Seeded Sanity galleryPage document: ${docId}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
