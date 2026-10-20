import "server-only";

import fs from "node:fs";
import path from "node:path";

export type LegalPageSlug = "terms-of-use" | "privacy-policy" | "licence-agreement";

export function readLegalPageMarkdown(slug: LegalPageSlug): string {
  const mdPath = path.join(process.cwd(), "content/legal", `${slug}.md`);
  return fs.readFileSync(mdPath, "utf8");
}
