import type { GalleryContent, GalleryImageItem, GalleryStatItem } from "@/lib/gallery-content";
import { getStaticGalleryContent } from "@/components/gallery/site-data";
import { getSanityClient } from "./client";
import { galleryPageQuery } from "./queries";

type SanityGalleryDoc = {
  title?: string | null;
  slug?: { current?: string | null } | null;
  heroSubheading?: string | null;
  overviewHeadline?: string | null;
  overviewBody?: string | null;
  overviewStats?: Array<Partial<GalleryStatItem> | null> | null;
  highlightsTitle?: string | null;
  highlightsIntro?: string | null;
  highlightItems?: Array<Partial<GalleryImageItem> | null> | null;
  items?: Array<Partial<GalleryImageItem> | null> | null;
  seo?: {
    metaTitle?: string | null;
    metaDescription?: string | null;
  } | null;
};

function isNonEmpty<T>(arr: T[] | null | undefined): arr is T[] {
  return Array.isArray(arr) && arr.length > 0;
}

function takeImageItem(item: Partial<GalleryImageItem> | null | undefined): GalleryImageItem | null {
  if (!item?.image || !item?.alt) return null;
  return {
    image: item.image,
    alt: item.alt,
    caption: item.caption,
  };
}

function takeStat(item: Partial<GalleryStatItem> | null | undefined): GalleryStatItem | null {
  if (!item?.value || !item?.label) return null;
  return { value: item.value, label: item.label };
}

export function mergeGalleryContent(
  staticContent: GalleryContent,
  remote: Partial<GalleryContent> | null,
): GalleryContent {
  if (!remote) return staticContent;

  const next: GalleryContent = { ...staticContent };
  if (remote.title) next.title = remote.title;
  if (remote.slug) next.slug = remote.slug;
  if (remote.heroSubheading) next.heroSubheading = remote.heroSubheading;
  if (remote.overviewHeadline) next.overviewHeadline = remote.overviewHeadline;
  if (remote.overviewBody) next.overviewBody = remote.overviewBody;
  if (remote.highlightsTitle) next.highlightsTitle = remote.highlightsTitle;
  if (remote.highlightsIntro) next.highlightsIntro = remote.highlightsIntro;
  if (isNonEmpty(remote.overviewStats)) next.overviewStats = remote.overviewStats;
  if (isNonEmpty(remote.highlightItems)) next.highlightItems = remote.highlightItems;
  if (isNonEmpty(remote.items)) next.items = remote.items;
  if (remote.seo) next.seo = remote.seo;
  return next;
}

export function sanityDocToGalleryPartial(doc: SanityGalleryDoc | null): Partial<GalleryContent> | null {
  if (!doc) return null;
  const items = (doc.items ?? []).map(takeImageItem).filter(Boolean) as GalleryImageItem[];
  const highlightItems = (doc.highlightItems ?? []).map(takeImageItem).filter(Boolean) as GalleryImageItem[];
  const overviewStats = (doc.overviewStats ?? []).map(takeStat).filter(Boolean) as GalleryStatItem[];

  return {
    title: doc.title ?? undefined,
    slug: doc.slug?.current ?? undefined,
    heroSubheading: doc.heroSubheading ?? undefined,
    overviewHeadline: doc.overviewHeadline ?? undefined,
    overviewBody: doc.overviewBody ?? undefined,
    overviewStats: overviewStats.length ? overviewStats : undefined,
    highlightsTitle: doc.highlightsTitle ?? undefined,
    highlightsIntro: doc.highlightsIntro ?? undefined,
    highlightItems: highlightItems.length ? highlightItems : undefined,
    items: items.length ? items : undefined,
    seo: doc.seo
      ? {
          metaTitle: doc.seo.metaTitle ?? undefined,
          metaDescription: doc.seo.metaDescription ?? undefined,
        }
      : undefined,
  };
}

export async function fetchSanityGalleryContent(): Promise<Partial<GalleryContent> | null> {
  const client = getSanityClient();
  if (!client) return null;
  try {
    const doc = (await client.fetch(galleryPageQuery, {}, { cache: "no-store" })) as SanityGalleryDoc | null;
    return sanityDocToGalleryPartial(doc);
  } catch {
    return null;
  }
}

export async function getGalleryContentForPage(): Promise<GalleryContent> {
  const staticContent = getStaticGalleryContent();
  const remote = await fetchSanityGalleryContent();
  if (remote) {
    return mergeGalleryContent(staticContent, remote);
  }
  if (process.env.SANITY_STRICT_MODE === "true") {
    throw new Error(
      "Sanity gallery content is required. Configure env vars and publish a galleryPage document.",
    );
  }
  return staticContent;
}
