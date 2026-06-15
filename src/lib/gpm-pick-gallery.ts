import { HCB_GALLERY_IMAGE_PATHS } from "@/lib/hcb-gallery-images";
import { normalizeHcbImagePath } from "@/lib/hcb-image-path";

const paths = HCB_GALLERY_IMAGE_PATHS as readonly string[];

/**
 * Pick the first gallery image whose filename contains every word in `fragment`
 * (case-insensitive; matches slugified WebP/JPEG names from `process-hcb-photos.mjs`).
 */
export function gpmPick(fragment: string): string {
  const words = fragment
    .toLowerCase()
    .split(/\s+/)
    .map((w) => w.replace(/[^a-z0-9]/g, ""))
    .filter(Boolean);
  if (words.length === 0) return normalizeHcbImagePath(paths[0]!);
  const hit = paths.find((p) => {
    const pl = p.toLowerCase();
    return words.every((w) => pl.includes(w));
  });
  return normalizeHcbImagePath(hit ?? paths[0]!);
}

/** Deterministic slot for layouts that need a stable index. */
export function gpmSlot(i: number): string {
  return normalizeHcbImagePath(paths[i % paths.length]!);
}

/** @deprecated Use {@link gpmPick} */
export const zenPick = gpmPick;

/** @deprecated Use {@link gpmSlot} */
export const zenSlot = gpmSlot;
