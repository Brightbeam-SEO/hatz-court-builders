import fs from "node:fs/promises";
import path from "node:path";

export function makeKey(prefix: string, idx: number): string {
  return `${prefix}-${String(idx + 1).padStart(2, "0")}`;
}

export async function readMarkdown(relativePath: string): Promise<string> {
  const mdPath = path.join(process.cwd(), relativePath);
  try {
    return await fs.readFile(mdPath, "utf8");
  } catch {
    console.warn(`  ⚠ No markdown at ${relativePath}`);
    return "";
  }
}
