import NextImage, { type ImageProps } from "next/image";

/** Default Next/Image quality for HCB photography (Next.js default is 75). */
export const HCB_IMAGE_QUALITY = 90;

export function HcbImage({ quality = HCB_IMAGE_QUALITY, ...props }: ImageProps) {
  return <NextImage quality={quality} {...props} />;
}
