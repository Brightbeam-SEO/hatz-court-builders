import type { GalleryContent, GalleryImageItem } from "@/lib/gallery-content";
import { GPM_GALLERY_IMAGE_PATHS, gpmImageAlt } from "@/lib/gpm-gallery-images";
import { gpmPick } from "@/lib/gpm-pick-gallery";
import { normalizeHcbImagePath } from "@/lib/hcb-image-path";

/** Hero band image — excluded from the masonry grid so it does not appear twice. */
export const GALLERY_HERO_IMAGE = gpmPick("outdoor multi court pickleball basketball tennis");

/** Visually redundant photos omitted from the gallery collage. */
const GALLERY_DUPLICATE_FRAGMENTS = [
  "backyard-pickleball-basketball-court-blue-surfacing",
  "indoor-hardwood-basketball-court-wall-hoop-mount",
  "double-outdoor-pickleball-court-construction-blue-green",
] as const;

function pathsMatchingFragments(fragments: readonly string[], pool: readonly string[]): string[] {
  return fragments
    .map((fragment) => pool.find((path) => path.includes(fragment)))
    .filter((path): path is string => Boolean(path));
}

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
    paths.find((p) => p.includes("modular-court-tile-custom-logo-branding"))!,
    paths.find((p) => p.includes("backyard-pickleball-basketball-dual-sport-court"))!,
    paths.find((p) => p.includes("outdoor-multi-court-acrylic-surfacing"))!,
    paths.find((p) => p.includes("tennis-court-resurface-blue-and-green-acrylic"))!,
  ].filter(Boolean);

  const pinnedTop = [
    paths.find((p) => p.includes("vinyl-fence-residential"))!,
    paths.find((p) => p.includes("green-tan-basketball-half-court"))!,
    paths.find((p) => p.includes("mountain-view-outdoor-lighting"))!,
    paths.find((p) => p.includes("gray-blue-pickleball-basketball-multi-court"))!,
    paths.find((p) => p.includes("basketball-tile-court-custom-logo-branding"))!,
    paths.find((p) => p.includes("pickleball-court-backyard-modular-tile"))!,
    paths.find((p) => p.includes("indoor-hardwood-basketball-court-hoops-gym-interior"))!,
    paths.find((p) => p.includes("tennis-court-side-by-side-before-after-repair"))!,
    paths.find((p) => p.includes("backyard-gray-basketball-court-installation"))!,
    paths.find((p) => p.includes("aerial-commercial-pickleball-court-construction-six-court-blue-green"))!,
  ].filter(Boolean);

  const duplicatePaths = pathsMatchingFragments(GALLERY_DUPLICATE_FRAGMENTS, paths);

  const excluded = new Set<string>([
    GALLERY_HERO_IMAGE,
    ...highlightPaths,
    ...pinnedTop,
    ...duplicatePaths,
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
    paths.find((p) => p.includes("modular-court-tile-custom-logo-branding"))!,
    paths.find((p) => p.includes("backyard-pickleball-basketball-dual-sport-court"))!,
    paths.find((p) => p.includes("outdoor-multi-court-acrylic-surfacing"))!,
    paths.find((p) => p.includes("tennis-court-resurface-blue-and-green-acrylic"))!,
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
  const duplicateImages = new Set(
    pathsMatchingFragments(GALLERY_DUPLICATE_FRAGMENTS, GPM_GALLERY_IMAGE_PATHS),
  );

  const items = uniqueGalleryItemsByImage(
    content.items
      .map((item) => ({
        ...item,
        image: normalizeHcbImagePath(item.image),
      }))
      .filter(
        (item) =>
          item.image !== GALLERY_HERO_IMAGE &&
          !highlightImages.has(item.image) &&
          !duplicateImages.has(item.image),
      ),
  );

  return { ...content, highlightItems, items };
}
