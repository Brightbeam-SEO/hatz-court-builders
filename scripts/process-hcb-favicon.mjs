import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
import pngToIco from "png-to-ico";

const SOURCE =
  process.argv[2] ??
  path.join(process.cwd(), "scripts", "logo-source", "HCB-favicon.png");

const PUBLIC_DIR = path.join(process.cwd(), "public");
const APP_DIR = path.join(process.cwd(), "src", "app");

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

async function loadTransparentPng() {
  const { data, info } = await sharp(SOURCE).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const pixels = Buffer.from(data);
  floodFillBackground(pixels, info.width, info.height);
  return sharp(pixels, { raw: { width: info.width, height: info.height, channels: 4 } })
    .trim()
    .png();
}

async function writeSize(pipeline, size, outPath) {
  await pipeline.clone().resize(size, size, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toFile(outPath);
  console.log("Wrote", outPath);
}

if (!fs.existsSync(SOURCE)) {
  console.error("Source favicon not found:", SOURCE);
  process.exit(1);
}

fs.mkdirSync(PUBLIC_DIR, { recursive: true });
fs.mkdirSync(APP_DIR, { recursive: true });

const base = await loadTransparentPng();

const sizes = [
  [16, path.join(PUBLIC_DIR, "favicon-16x16.png")],
  [32, path.join(PUBLIC_DIR, "favicon-32x32.png")],
  [48, path.join(PUBLIC_DIR, "favicon-48x48.png")],
  [96, path.join(PUBLIC_DIR, "favicon-96x96.png")],
  [192, path.join(PUBLIC_DIR, "favicon-192x192.png")],
  [180, path.join(PUBLIC_DIR, "apple-touch-icon.png")],
  [512, path.join(APP_DIR, "icon.png")],
  [180, path.join(APP_DIR, "apple-icon.png")],
];

for (const [size, outPath] of sizes) {
  await writeSize(base, size, outPath);
}

const icoInputs = [
  path.join(PUBLIC_DIR, "favicon-16x16.png"),
  path.join(PUBLIC_DIR, "favicon-32x32.png"),
  path.join(PUBLIC_DIR, "favicon-48x48.png"),
];
const icoOut = path.join(PUBLIC_DIR, "favicon.ico");

try {
  const icoBuffer = await pngToIco(icoInputs);
  fs.writeFileSync(icoOut, icoBuffer);
  console.log("Wrote", icoOut, `(${icoBuffer.length} bytes)`);
} catch (error) {
  console.warn("png-to-ico failed, using 32px PNG fallback:", error);
  await sharp(path.join(PUBLIC_DIR, "favicon-32x32.png")).toFile(icoOut);
  console.log("Wrote", icoOut, "(32px PNG fallback)");
}
