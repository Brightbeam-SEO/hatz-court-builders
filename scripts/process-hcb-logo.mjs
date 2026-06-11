import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const SOURCE =
  process.argv[2] ??
  path.join(process.cwd(), "scripts", "logo-source", "HCB-horizontal-updated-colors.png");

const OUT_DIR = path.join(process.cwd(), "public", "images", "logo");
const OUT_PNG = path.join(OUT_DIR, "hatz-court-builders-logo.png");

function isDarkPixel(r, g, b, a) {
  if (a < 8) return true;
  return r < 24 && g < 24 && b < 24;
}

/** Logo outlines are black too — only strip edge-connected dark pixels not touching brand colors. */
function touchesBrandColor(pixels, width, height, x, y) {
  for (const [dx, dy] of [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ]) {
    const nx = x + dx;
    const ny = y + dy;
    if (nx < 0 || nx >= width || ny < 0 || ny >= height) continue;
    const i = (ny * width + nx) * 4;
    if (pixels[i + 3] < 8) continue;
    const r = pixels[i];
    const g = pixels[i + 1];
    const b = pixels[i + 2];
    const isBlue = b > 70 && b > r + 18 && b > g + 8;
    const isGreen = g > 90 && g > r + 25;
    if (isBlue || isGreen) return true;
  }
  return false;
}

function isRemovableBackground(pixels, width, height, x, y) {
  const i = (y * width + x) * 4;
  if (!isDarkPixel(pixels[i], pixels[i + 1], pixels[i + 2], pixels[i + 3])) return false;
  return !touchesBrandColor(pixels, width, height, x, y);
}

function floodFillBackground(pixels, width, height) {
  const visited = new Uint8Array(width * height);
  const queue = [];

  const pushIfBackground = (x, y) => {
    const idx = y * width + x;
    if (visited[idx]) return;
    if (!isRemovableBackground(pixels, width, height, x, y)) return;
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
