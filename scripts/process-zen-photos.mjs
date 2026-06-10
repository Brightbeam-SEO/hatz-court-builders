/**
 * One-off pipeline: read Zen Day Spa photos from a local folder, compress to ≤1MB WebP,
 * rename with SEO-friendly stems (Windows-safe: no colons), write to public/images/zen/.
 *
 * Usage: node scripts/process-zen-photos.mjs
 * Override source: ZEN_PHOTOS_DIR="C:/path/to/ZDS Photos"
 */
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const DEFAULT_SOURCE = "C:/Users/Lenovo/Downloads/ZDS Photos";
const OUT_DIR_REL = "public/images/zen";
const MAX_BYTES = 1_000_000;
const MAX_EDGE = 2400;

/** URL-safe tail segment (matches `ZEN_SEO_FILENAME_SUFFIX` in generated TS). */
const SEO_SUFFIX_SLUG = "Eagle-Idaho-Zen-Day-Spa-Massage-Scalp-and-Reflexology";

const SKIP_EXT = new Set([".mov", ".mp4", ".psd", ".pdf", ".zip"]);

const INPUT_EXT = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".tif",
  ".tiff",
  ".webp",
  ".heic",
  ".HEIC",
  ".jpg",
]);

const treatmentRotation = [
  "Swedish relaxation massage therapy room",
  "Deep tissue therapeutic massage suite",
  "Couples massage retreat space quiet ambiance",
  "Foot reflexology and therapeutic foot massage lounge",
  "Hot stone massage preparation serene spa interior",
  "Scalp massage and scalp therapy LED lighting station",
  "Thai massage stretching-friendly floor treatment area",
  "Pregnancy massage supportive bolster spa setup",
  "Aromatherapy massage serene dimmable lighting suite",
  "Microneedling and facial wellness prep station view",
  "Medical massage therapeutic focused treatment room",
  "Walk-in friendly Zen spa lobby greeting space",
  "Same-day massage booking tranquil Eagle Idaho studio",
  "Luxury spa linens plush massage table styling",
  "Zen wellness branding boutique spa merchandise wall",
];

function sanitizeStem(raw, maxLen = 110) {
  let s = raw
    .replace(/\.[^/.]+$/, "")
    .replace(/^copy\s+of\s+/i, "")
    .replace(/\s+/g, " ")
    .trim();
  s = s.replace(/\s*[-–,]\s*eagle,?\s*id\s*[-–]\s*zen day spa.*$/i, "").trim();
  s = s.replace(/zen day spa eagle id/gi, "").trim();
  s = s.replace(/^[-–—]+|[-–—]+$/g, "").trim();
  if (!s || /^[a-f0-9]{16,}$/i.test(s)) return "";
  if (!s || /^img[_\s]?\d+/i.test(s)) return "";
  const illegal = /[\\/:*?"<>|#\x00-\x1f]/g;
  s = s.replace(illegal, " ").replace(/\s+/g, " ").trim();
  if (s.length > maxLen) s = s.slice(0, maxLen).replace(/\s+\S*$/, "").trim();
  return s;
}

function keywordFromBasename(basename, genericIndex) {
  const stem = sanitizeStem(basename);
  if (stem) return stem;
  const phrase =
    treatmentRotation[genericIndex % treatmentRotation.length] +
    ` Zen spa editorial photo ${genericIndex + 1}`;
  return phrase;
}

function slugifyKeywords(raw, maxLen = 115) {
  let s = raw
    .replace(/[—–]/g, "-")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  if (s.length > maxLen) s = s.slice(0, maxLen).replace(/-[^-]*$/, "").replace(/-$/, "");
  return s || "Zen-Day-Spa-wellness-photo";
}

function finalFilename(keywords) {
  const kw = slugifyKeywords(keywords);
  let base = `${kw}-${SEO_SUFFIX_SLUG}`;
  const maxTotal = 175;
  if (base.length > maxTotal) {
    const budget = Math.max(40, maxTotal - SEO_SUFFIX_SLUG.length - 2);
    base = `${slugifyKeywords(keywords, budget)}-${SEO_SUFFIX_SLUG}`;
  }
  return `${base}.webp`;
}

async function encodeUnderBudget(absInput, outPath) {
  const meta = await sharp(absInput).rotate().metadata();
  const w0 = meta.width ?? 2000;
  const h0 = meta.height ?? 2000;
  const scale = Math.min(1, MAX_EDGE / Math.max(w0, h0));
  let qw = Math.round(w0 * scale);
  let qh = Math.round(h0 * scale);
  let quality = 88;

  async function render(w, h, q) {
    return sharp(absInput)
      .rotate()
      .resize(w, h, { fit: "inside", withoutEnlargement: true })
      .webp({ quality: q, effort: 5, smartSubsample: true })
      .toBuffer();
  }

  let buf = await render(qw, qh, quality);
  while (buf.length > MAX_BYTES && quality > 52) {
    quality -= 4;
    buf = await render(qw, qh, quality);
  }
  while (buf.length > MAX_BYTES && Math.min(qw, qh) > 560) {
    qw = Math.round(qw * 0.88);
    qh = Math.round(qh * 0.88);
    quality = Math.min(quality + 2, 86);
    buf = await render(qw, qh, quality);
    while (buf.length > MAX_BYTES && quality > 48) {
      quality -= 3;
      buf = await render(qw, qh, quality);
    }
  }

  await fs.writeFile(outPath, buf);
  return buf.length;
}

async function main() {
  const projectRoot = path.resolve(import.meta.dirname, "..");
  const srcDir = process.env.ZEN_PHOTOS_DIR ?? DEFAULT_SOURCE;
  const outDir = path.join(projectRoot, OUT_DIR_REL);

  await fs.mkdir(outDir, { recursive: true });

  let entries;
  try {
    entries = await fs.readdir(srcDir, { withFileTypes: true });
  } catch (e) {
    console.error("Cannot read source dir:", srcDir, e.message);
    process.exit(1);
  }

  const files = entries
    .filter((d) => d.isFile())
    .map((d) => d.name)
    .filter((name) => {
      if (/pricing\s+poster/i.test(name)) return false;
      const ext = path.extname(name);
      if (SKIP_EXT.has(ext.toLowerCase())) return false;
      return INPUT_EXT.has(ext) || [".JPG", ".JPEG", ".PNG"].includes(ext);
    })
    .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }));

  /** @type {{ source: string; dest: string; bytes: number }[]} */
  const manifest = [];
  let genericCount = 0;
  const usedNames = new Set();

  for (const name of files) {
    const absIn = path.join(srcDir, name);
    let keywords = keywordFromBasename(name, genericCount);
    if (!sanitizeStem(name)) genericCount += 1;

    let fname = finalFilename(keywords);
    let destAbs = path.join(outDir, fname);
    let n = 2;
    while (usedNames.has(fname)) {
      const altKw = `${keywords} variation ${n}`;
      fname = finalFilename(altKw);
      destAbs = path.join(outDir, fname);
      n += 1;
    }
    usedNames.add(fname);

    try {
      const bytes = await encodeUnderBudget(absIn, destAbs);
      const relDest = path.posix.join("/images/zen", fname);
      manifest.push({
        source: absIn,
        dest: relDest,
        bytes,
      });
      console.log(relDest, `(${Math.round(bytes / 1024)} KB)`);
    } catch (err) {
      console.warn("SKIP", name, err.message ?? err);
    }
  }

  await fs.writeFile(
    path.join(projectRoot, "scripts", "zen-photo-manifest.json"),
    JSON.stringify(manifest, null, 2),
    "utf8",
  );

  const paths = manifest.map((m) => m.dest);
  const ts =
    `/** Auto-generated by scripts/process-zen-photos.mjs */\n` +
    `export const ZEN_SEO_FILENAME_SUFFIX = "${SEO_SUFFIX_SLUG}" as const;\n\n` +
    `export const ZEN_GALLERY_IMAGE_PATHS = ${JSON.stringify(paths, null, 2)} as const;\n\n` +
    `export function zenImageAlt(imagePath: string): string {\n` +
    `  const filename = imagePath.split("/").pop() ?? "";\n` +
    `  const stem = filename.replace(/\\.webp$/i, "");\n` +
    `  const suf = \`-\${ZEN_SEO_FILENAME_SUFFIX}\`;\n` +
    `  const i = stem.endsWith(suf) ? stem.length - suf.length : -1;\n` +
    `  const kw = i === -1 ? stem : stem.slice(0, i);\n` +
    `  return kw.replace(/-/g, " ").trim();\n` +
    `}\n`;
  await fs.writeFile(path.join(projectRoot, "src/lib/zen-gallery-images.ts"), ts);

  console.log("\nDone:", manifest.length, "files →", OUT_DIR_REL);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
