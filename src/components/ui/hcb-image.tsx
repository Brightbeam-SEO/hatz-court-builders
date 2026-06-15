import NextImage, { type ImageProps } from "next/image";
import { isLocalHcbPhoto, normalizeHcbImagePath } from "@/lib/hcb-image-path";

/** Default Next/Image quality for HCB photography (Next.js default is 75). */
export const HCB_IMAGE_QUALITY = 95;

export function HcbImage({ quality = HCB_IMAGE_QUALITY, src, unoptimized, ...props }: ImageProps) {
  const srcString = typeof src === "string" ? normalizeHcbImagePath(src) : src;
  const serveOriginal =
    unoptimized ?? (typeof srcString === "string" && isLocalHcbPhoto(srcString));

  return (
    <NextImage
      quality={quality}
      src={srcString}
      unoptimized={serveOriginal}
      {...props}
    />
  );
}
