import NextImage, { type ImageProps } from "next/image";
import { normalizeHcbImagePath } from "@/lib/hcb-image-path";

/** High-quality web delivery — Next.js serves responsive WebP/AVIF at the requested width. */
export const HCB_IMAGE_QUALITY = 85;

export function HcbImage({ quality = HCB_IMAGE_QUALITY, src, unoptimized = false, ...props }: ImageProps) {
  const srcString = typeof src === "string" ? normalizeHcbImagePath(src) : src;

  return (
    <NextImage
      quality={quality}
      src={srcString}
      unoptimized={unoptimized}
      {...props}
    />
  );
}
