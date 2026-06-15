/** Normalize legacy HCB WebP paths to the current high-quality JPEG outputs. */
export function normalizeHcbImagePath(url: string): string {
  if (url.includes("/images/hcb/") && /\.webp$/i.test(url)) {
    return url.replace(/\.webp$/i, ".jpg");
  }
  return url;
}

export function isLocalHcbPhoto(src: string): boolean {
  return src.startsWith("/images/hcb/") && /\.(?:jpe?g|webp)$/i.test(src);
}
