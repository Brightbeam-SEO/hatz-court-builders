import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const SOURCE =
  process.argv[2] ??
  path.join(process.cwd(), "scripts", "logo-source", "HCB-horizontal-updated-colors.png");

const OUT_DIR = path.join(process.cwd(), "public", "images", "logo");
const OUT_PNG = path.join(OUT_DIR, "hatz-court-builders-logo.png");

function isBackgroundPixel(r, g, b, a) {
  if (a < 8) return true;
  return r < 42 && g < 42 && b < 42;
}

function floodFillBackground(pixels, width, height) {
  const visited = new Uint8Array(width * height);
  const queue = [];

  const pushIfBackground = (x, y) => {
    const idx = y * width + x;
    if (visited[idx]) return;
    const i = idx * 4;
    if (!isBackgroundPixel(pixels[i], pixels[i + 1], pixels[i + 2], pixels[i + 3])) return;
    visited[idx] = 1;
    queue.push(idx);
  };

  for (let x = 0; x < width; x += 1) {
    pushIfBackground(x, 0);
    pushIfBackground(x, height - 1);
  }
  for (let y = 0; y < height; y += 1) {
    pushIfBackground(0, y);
    pushIfBackground(width - 1, y);
  }

  while (queue.length > 0) {
    const idx = queue.pop();
    const x = idx % width;
    const y = (idx - x) / width;
    const i = idx * 4;
    pixels[i + 3] = 0;

    if (x > 0) pushIfBackground(x - 1, y);
    if (x < width - 1) pushIfBackground(x + 1, y);
    if (y > 0) pushIfBackground(x, y - 1);
    if (y < height - 1) pushIfBackground(x, y + 1);
  }
}

if (!fs.existsSync(SOURCE)) {
  console.error("Source logo not found:", SOURCE);
  process.exit(1);
}

fs.mkdirSync(OUT_DIR, { recursive: true });

const { data, info } = await sharp(SOURCE).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const pixels = Buffer.from(data);
floodFillBackground(pixels, info.width, info.height);

await sharp(pixels, { raw: { width: info.width, height: info.height, channels: 4 } })
  .trim()
  .png({ compressionLevel: 9, adaptiveFiltering: true })
  .toFile(OUT_PNG);

const meta = await sharp(OUT_PNG).metadata();
console.log("Wrote", OUT_PNG, `${meta.width}x${meta.height}`);
