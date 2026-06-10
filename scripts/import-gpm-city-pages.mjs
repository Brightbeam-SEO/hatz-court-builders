/**
 * Fetch live greenbeltpm.com city pages → markdown bodies.
 * Run: node scripts/import-gpm-city-pages.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT_DIR = path.join(ROOT, "content", "city");

const PAGES = [
  {
    slug: "property-management-boise-id",
    url: "https://greenbeltpm.com/city/property-management-boise-id/",
  },
  {
    slug: "property-management-eagle-id",
    url: "https://greenbeltpm.com/city/property-management-eagle-id/",
  },
  {
    slug: "property-management-in-middleton-id",
    url: "https://greenbeltpm.com/city/property-management-in-middleton-id/",
  },
  {
    slug: "property-management-in-nampa-id",
    url: "https://greenbeltpm.com/city/property-management-in-nampa-id/",
  },
  {
    slug: "property-management-in-star-id",
    url: "https://greenbeltpm.com/city/property-management-in-star-id/",
  },
  {
    slug: "property-management-in-kuna-id",
    url: "https://greenbeltpm.com/city/property-management-in-kuna-id/",
  },
];

const SKIP_HEADINGS = new Set([
  "maintenance & repairs",
  "inspections & asset protection",
  "owner reporting & communication",
  "what clients say",
  "frequently asked questions",
  "our property management process",
]);

function decodeHtml(text) {
  return text
    .replace(/&#8217;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#038;/g, "&")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&nbsp;/g, " ");
}

function stripTags(html) {
  return decodeHtml(html.replace(/<[^>]+>/g, "").trim());
}

function normalizeHref(href) {
  if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:"))
    return href;
  try {
    const u = new URL(href, "https://greenbeltpm.com/");
    if (!u.hostname.includes("greenbeltpm.com")) return href;
    let p = u.pathname;
    if (!p.endsWith("/")) p += "/";
    if (p === "/contact/" || p === "/contact-us/") return "/contact-us/";
    if (p.startsWith("/city/")) return p;
    if (p.startsWith("/blog/")) return p;
    if (p === "/" || p === "/home/") return "/";
    return p;
  } catch {
    return href;
  }
}

function inlineToMarkdown(html) {
  let s = html;
  s = s.replace(/<strong><a\s+href="([^"]+)"[^>]*>([\s\S]*?)<\/a><\/strong>/gi, (_, href, t) => {
    return `**[${stripTags(t)}](${normalizeHref(href)})**`;
  });
  s = s.replace(/<a\s+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi, (_, href, t) => {
    return `[${stripTags(t)}](${normalizeHref(href)})`;
  });
  s = s.replace(/<strong>([\s\S]*?)<\/strong>/gi, "**$1**");
  s = s.replace(/<em>([\s\S]*?)<\/em>/gi, "*$1*");
  return stripTags(s);
}

function htmlToMarkdown(html) {
  let s = html;
  s = s.replace(/<h1[^>]*>([\s\S]*?)<\/h1>/gi, (_, t) => `# ${inlineToMarkdown(t)}\n\n`);
  s = s.replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, (_, t) => `## ${inlineToMarkdown(t)}\n\n`);
  s = s.replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, (_, t) => `### ${inlineToMarkdown(t)}\n\n`);
  s = s.replace(/<h4[^>]*>([\s\S]*?)<\/h4>/gi, (_, t) => `#### ${inlineToMarkdown(t)}\n\n`);
  s = s.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, (_, t) => `- ${inlineToMarkdown(t)}\n`);
  s = s.replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, (_, t) => {
    const line = inlineToMarkdown(t);
    return line ? `${line}\n\n` : "";
  });
  s = s.replace(/<br\s*\/?>/gi, "\n");
  s = stripTags(s);
  return s.replace(/\n{3,}/g, "\n\n").trim();
}

function extractMainHtml(pageHtml) {
  const marker = 'data-widget_type="theme-post-content.default"';
  const idx = pageHtml.indexOf(marker);
  if (idx === -1) return null;
  const slice = pageHtml.slice(idx);
  const open = slice.indexOf('class="elementor-widget-container">');
  if (open === -1) return null;
  const start = slice.indexOf(">", open) + 1;
  const end = slice.indexOf("</div>", start);
  return slice.slice(start, end > start ? end : undefined);
}

function filterSections(md) {
  const lines = md.split("\n");
  const out = [];
  let skip = false;
  for (const line of lines) {
    const h2 = line.match(/^## (.+)$/);
    if (h2) {
      const title = h2[1].replace(/\*+/g, "").trim().toLowerCase();
      skip = SKIP_HEADINGS.has(title);
      if (skip) continue;
      if (title.startsWith("ready for professional property management")) {
        out.push("\n<!--SOL_BOISE_PROCESS_TIMELINE-->\n");
        out.push("\n<!--SOL_BOISE_GET_STARTED_CTA-->\n");
        out.push("\n<!--SOL_BOISE_FAQ-->\n");
        skip = true;
        continue;
      }
    }
    if (!skip) out.push(line);
  }
  return out.join("\n").replace(/\n{3,}/g, "\n\n").trim();
}

async function fetchPage(url) {
  const res = await fetch(url, {
    headers: { "User-Agent": "GreenbeltPM-Import/1.0" },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return res.text();
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  for (const { slug, url } of PAGES) {
    console.log(`Importing ${slug}…`);
    const html = await fetchPage(url);
    const mainHtml = extractMainHtml(html);
    if (!mainHtml) {
      console.warn(`  No content for ${slug}`);
      continue;
    }
    let md = htmlToMarkdown(mainHtml);
    md = md.replace(/^# .+\n\n/, "");
    md = filterSections(md);
    const outPath = path.join(OUT_DIR, `${slug}-body.md`);
    fs.writeFileSync(outPath, `${md}\n`, "utf8");
    console.log(`  Wrote ${outPath}`);
  }
  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
