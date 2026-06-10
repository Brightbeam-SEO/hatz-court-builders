/**
 * Process GPM source photos → public/images/gpm/*.webp (≤1MB, SEO filenames).
 * Run: node scripts/process-gpm-photos.mjs
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const SOURCE_DIR = path.resolve("c:/Users/Lenovo/Downloads/GPM Photos");
const OUT_DIR = path.resolve("public/images/gpm");
const SUFFIX = "Meridian Idaho - Greenbelt Property Management";
const MAX_BYTES = 1024 * 1024;
const MAX_WIDTH = 1920;

/** Source filename → keyword description (without suffix). */
const DESCRIPTION_BY_SOURCE = {
  "Copy of 11-web-or-mls-DSC03095.jpg":
    "Open concept living room rental property interior",
  "Copy of 11-web-or-mls-IMG_0799.JPG":
    "Updated kitchen rental home interior staging",
  "Copy of 15-web-or-mls-IMG_0794.JPG":
    "Primary bedroom rental property interior",
  "Copy of 16-web-or-mls-16_DSC01989.jpg":
    "Clean bathroom rental home interior",
  "Copy of 16-web-or-mls-IMG_0777.JPG":
    "Dining area rental property interior",
  "Copy of 17-web-or-mls-17_DSC01994.jpg":
    "Welcoming entryway rental home interior",
  "Copy of 18-web-or-mls-IMG_6738.jpg":
    "Spacious family room rental property interior",
  "Copy of 19-web-or-mls-DSC03240.jpg":
    "Rental home curb appeal exterior property management",
  "Copy of 24-web-or-mls-DSC03275.jpg":
    "Well maintained rental home exterior",
  "Copy of 30-web-or-mls-26_DSC02059.jpg":
    "Covered patio outdoor living rental property",
  "Copy of 30-web-or-mls-DSC08707.jpg":
    "Private fenced backyard rental home",
  "Copy of 30-web-or-mls-IMG_6784.jpg":
    "Laundry room rental property interior",
  "Copy of 41-web-or-mls-DJI_0586.jpg":
    "Aerial view Treasure Valley rental neighborhood",
  "Copy of 43-web-or-mls-DJI_0592.jpg":
    "Drone aerial rental property overview",
  "Copy of 6812178611992476596.jpg":
    "Property management team client consultation",
  "Copy of 8-web-or-mls-05_DSC01884.jpg":
    "Staircase and hallway rental home interior",
  "Copy of 9-web-or-mls-DSC08743.jpg":
    "Side yard and exterior rental property",
  "Copy of backyard 2.jpg":
    "Rental home backyard property maintenance",
  "Copy of IMG_5081.heic": "Modern rental home interior living space",
  "Copy of IMG_5304.heic": "Rental property kitchen and dining area",
  "Copy of IMG_5309.heic": "Single family rental home exterior",
  "Copy of mls-17.jpg": "Updated bathroom rental listing photography",
  "Copy of mls-34.jpg": "Bright kitchen rental property marketing photo",
  "Copy of mls-54.jpg": "Comfortable living room rental property staging",
  "Copy of mls-9.jpg": "Guest bedroom rental property interior",
  "Modern Gated Townhome with Resort-Style Amenities in Star.png":
    "Gated townhome short term rental property Star Idaho",
  "Modern Kitchen Interior Rental Property Marketing - Meridian Idaho - Greenbelt Property Management Meridian.jpg":
    "Modern kitchen interior rental property marketing",
  "New Construction Rental Home Exterior and Property Management - Meridian Idaho - Greenbelt Property Management Meridian.jpg":
    "New construction rental home exterior property management",
  "Property Management Branding and Contact Information - Meridian Idaho - Greenbelt Property Management Meridian.JPG":
    "Property management branding and contact information",
  "Property Manager Leasing Sign and Tenant Placement Services - Meridian Idaho - Greenbelt Property Management Meridian.jpg":
    "Property manager leasing sign tenant placement services",
  "Rental Home Backyard and Property Maintenance Services - Meridian Idaho - Greenbelt Property Management Meridian.JPG":
    "Rental home backyard property maintenance services",
  "Spacious Bedroom Interior Rental Property Listing - Meridian Idaho - Greenbelt Property Management Meridian.jpeg":
    "Spacious bedroom interior rental property listing",
  "Stunning Single Level Home in Prime Star Location.jpg":
    "Single level rental home exterior Star Idaho",
};

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/['']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function normalizeDashes(text) {
  return text.replace(/[\u2010-\u2015\u2212]/g, "-");
}

function extractDescriptionFromFilename(name) {
  const normalizedName = normalizeDashes(name);
  const base = normalizeDashes(path.parse(normalizedName).name);
  const mapped = DESCRIPTION_BY_SOURCE[name] ?? DESCRIPTION_BY_SOURCE[normalizedName];
  if (mapped) return mapped;
  let desc = base
    .replace(/\s*-\s*Meridian Idaho\s*-\s*Greenbelt Property Management Meridian\s*$/i, "")
    .replace(/\s*-\s*Meridian Idaho\s*-\s*Greenbelt Property Management\s*$/i, "")
    .replace(/\s*-\s*Greenbelt Property Management Meridian\s*$/i, "")
    .trim();
  if (desc !== base) return desc;
  const meridianIdx = base.indexOf(" - Meridian Idaho");
  if (meridianIdx > 0) return base.slice(0, meridianIdx).trim();
  return base.replace(/^Copy of /i, "").trim();
}

function outputFilename(description) {
  return `${slugify(description)}-${slugify(SUFFIX)}.webp`;
}

async function encodeUnderLimit(sharpInstance) {
  let quality = 82;
  let width = MAX_WIDTH;
  let buffer = await sharpInstance
    .clone()
    .resize({ width, withoutEnlargement: true })
    .webp({ quality, effort: 4 })
    .toBuffer();
  for (let pass = 0; buffer.length > MAX_BYTES && pass < 24; pass++) {
    if (quality > 36) quality -= 5;
    else width = Math.max(720, Math.round(width * 0.88));
    buffer = await sharpInstance
      .clone()
      .resize({ width, withoutEnlargement: true })
      .webp({ quality, effort: 4 })
      .toBuffer();
  }
  if (buffer.length > MAX_BYTES) {
    throw new Error(`Could not compress below 1MB (got ${buffer.length} bytes)`);
  }
  return buffer;
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const sources = fs.readdirSync(SOURCE_DIR).filter((f) => /\.(jpe?g|png|heic|webp)$/i.test(f));
  const manifest = [];

  for (const sourceName of sources) {
    if (/\.heic$/i.test(sourceName)) {
      console.warn(`SKIP (HEIC unsupported)\t${sourceName}`);
      continue;
    }
    const description = extractDescriptionFromFilename(sourceName);
    const outName = outputFilename(description);
    const outPath = path.join(OUT_DIR, outName);
    const srcPath = path.join(SOURCE_DIR, sourceName);

    try {
      const input = sharp(srcPath, { failOn: "none" }).rotate();
      const buffer = await encodeUnderLimit(input);
      fs.writeFileSync(outPath, buffer);

      const webPath = `/images/gpm/${outName}`;
      manifest.push({ sourceName, description, webPath, bytes: buffer.length });
      console.log(`${(buffer.length / 1024).toFixed(0)}KB\t${outName}`);
    } catch (err) {
      console.warn(`SKIP\t${sourceName}\t${err instanceof Error ? err.message : err}`);
    }
  }

  manifest.sort((a, b) => a.webPath.localeCompare(b.webPath));
  const paths = manifest.map((m) => m.webPath);
  const tsContent = `/** Auto-generated by scripts/process-gpm-photos.mjs — do not edit by hand. */
export const GPM_SEO_FILENAME_SUFFIX = ${JSON.stringify(SUFFIX)} as const;

export const GPM_GALLERY_IMAGE_PATHS = [
${paths.map((p) => `  ${JSON.stringify(p)},`).join("\n")}
] as const;

export type GpmGalleryImagePath = (typeof GPM_GALLERY_IMAGE_PATHS)[number];

export function gpmImageAlt(imagePath: string): string {
  const filename = imagePath.split("/").pop() ?? "";
  const stem = filename.replace(/\.webp$/i, "");
  const suf = \`-\${slugifySuffix(GPM_SEO_FILENAME_SUFFIX)}\`;
  const i = stem.endsWith(suf) ? stem.length - suf.length : -1;
  const kw = i === -1 ? stem : stem.slice(0, i);
  return kw.replace(/-/g, " ").trim();
}

function slugifySuffix(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}
`;

  fs.writeFileSync(path.resolve("src/lib/gpm-gallery-images.ts"), tsContent);
  fs.writeFileSync(
    path.resolve("scripts/gpm-photos-manifest.json"),
    JSON.stringify(manifest, null, 2),
  );
  console.log(`\nWrote ${paths.length} images → ${OUT_DIR}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
