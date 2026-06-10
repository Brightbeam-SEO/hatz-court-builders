import sharp from "sharp";

/** Header wordmark — PNG avoids iOS Safari blur from raster-in-SVG exports. */
const headerSvgPath = "public/images/logo/greenbelt-logo.svg";
const headerPngPath = "public/images/logo/greenbelt-logo.png";

await sharp(headerSvgPath)
  .resize(1920, 750, { fit: "fill" })
  .png({ compressionLevel: 9, adaptiveFiltering: true })
  .toFile(headerPngPath);

const headerMeta = await sharp(headerPngPath).metadata();
console.log("Wrote", headerPngPath, headerMeta.width, "x", headerMeta.height);

const svgPath = "public/images/logo/greenbelt-property-management-logo.svg";
const pngPath = "public/images/logo/greenbelt-property-management-logo.png";

const { data, info } = await sharp(svgPath)
  .resize(750, 750, { fit: "inside", withoutEnlargement: false })
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const pixels = data;
for (let i = 0; i < pixels.length; i += 4) {
  const r = pixels[i];
  const g = pixels[i + 1];
  const b = pixels[i + 2];
  // Treat near-black background as transparent.
  if (r < 28 && g < 28 && b < 28) {
    pixels[i + 3] = 0;
  }
}

await sharp(pixels, { raw: { width: info.width, height: info.height, channels: 4 } })
  .png({ compressionLevel: 9, adaptiveFiltering: true })
  .toFile(pngPath);

const outMeta = await sharp(pngPath).metadata();
console.log("Wrote", pngPath, outMeta.width, "x", outMeta.height);
