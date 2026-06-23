import type { GalleryContent, GalleryImageItem } from "@/lib/gallery-content";
import { GPM_GALLERY_IMAGE_PATHS, gpmImageAlt } from "@/lib/gpm-gallery-images";
import { gpmPick } from "@/lib/gpm-pick-gallery";
import { normalizeHcbImagePath } from "@/lib/hcb-image-path";

/** Hero band image — excluded from the masonry grid so it does not appear twice. */
export const GALLERY_HERO_IMAGE = gpmPick("outdoor multi court pickleball basketball tennis");

export function uniqueGalleryItemsByImage(items: GalleryImageItem[]): GalleryImageItem[] {
  const seen = new Set<string>();
  return items.filter((item) => {
    if (seen.has(item.image)) return false;
    seen.add(item.image);
    return true;
  });
}

function toGalleryItem(image: string): GalleryImageItem {
  return { image, alt: gpmImageAlt(image) };
}

/** Deterministic collage order for SSR/hydration (no shuffle). */
export function buildGalleryCollageItems(): GalleryImageItem[] {
  const paths = [...GPM_GALLERY_IMAGE_PATHS];

  const highlightPaths = [
    paths.find((p) => p.includes("modular-court-tile-custom-logo"))!,
    paths.find((p) => p.includes("backyard-pickleball-basketball-dual-sport"))!,
    paths.find((p) => p.includes("outdoor-multi-court-acrylic"))!,
    paths.find((p) => p.includes("tennis-court-resurface-blue-and-green"))!,
  ].filter(Boolean);

  const pinnedTop = [
    paths.find((p) => p.includes("basketball-tile-court-custom-logo"))!,
    paths.find((p) => p.includes("pickleball-court-backyard-modular-tile"))!,
    paths.find((p) => p.includes("indoor-hardwood-basketball-court-hoops-gym-interior"))!,
    paths.find((p) => p.includes("tennis-court-side-by-side-before-after"))!,
    paths.find((p) => p.includes("backyard-gray-basketball-court-installation"))!,
    paths.find((p) => p.includes("multicourt-modular-tile-backyard-installation"))!,
  ].filter(Boolean);

  const excluded = new Set<string>([
    GALLERY_HERO_IMAGE,
    ...highlightPaths,
    ...pinnedTop,
  ]);

  const collageRest = paths
    .filter((image) => !excluded.has(image))
    .sort()
    .map(toGalleryItem);

  return uniqueGalleryItemsByImage([...pinnedTop.map(toGalleryItem), ...collageRest]);
}

export function buildGalleryHighlightItems(): GalleryImageItem[] {
  const paths = [...GPM_GALLERY_IMAGE_PATHS];
  const highlightPaths = [
    paths.find((p) => p.includes("modular-court-tile-custom-logo"))!,
    paths.find((p) => p.includes("backyard-pickleball-basketball-dual-sport"))!,
    paths.find((p) => p.includes("outdoor-multi-court-acrylic"))!,
    paths.find((p) => p.includes("tennis-court-resurface-blue-and-green"))!,
  ].filter(Boolean);

  return highlightPaths.map(toGalleryItem);
}

/** Normalize paths and strip hero / highlight duplicates from the masonry grid. */
export function finalizeGalleryContent(content: GalleryContent): GalleryContent {
  const highlightItems = uniqueGalleryItemsByImage(
    content.highlightItems.map((item) => ({
      ...item,
      image: normalizeHcbImagePath(item.image),
    })),
  );
  const highlightImages = new Set(highlightItems.map((item) => item.image));

  const items = uniqueGalleryItemsByImage(
    content.items
      .map((item) => ({
        ...item,
        image: normalizeHcbImagePath(item.image),
      }))
      .filter(
        (item) => item.image !== GALLERY_HERO_IMAGE && !highlightImages.has(item.image),
      ),
  );

  return { ...content, highlightItems, items };
}
