import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import path from "node:path";

const MARKER = "<!--SOL_BOISE_MAP_EMBED-->";
const dir = path.join(process.cwd(), "content", "blog");

function normalizeArticleMarkdown(text) {
  return text
    .replace(/\r\n/g, "\n")
    .replaceAll(MARKER, "")
    .replace(/\n+---\n+(?=<h)/gi, "\n\n")
    .replace(/\n{3,}/g, "\n\n")
    .trimEnd()
    .concat("\n");
}

for (const file of readdirSync(dir)) {
  if (!file.endsWith("-body.md")) continue;
  const filePath = path.join(dir, file);
  const original = readFileSync(filePath, "utf8");
  const next = normalizeArticleMarkdown(original);
  if (next !== original) {
    writeFileSync(filePath, next, "utf8");
    console.log("normalized", file);
  }
}
