import { readFileSync, writeFileSync } from "node:fs";

const LIVE_URLS = [
  "https://greenbeltpm.com/top-property-management-services-in-idaho-what-you-need-to-know/",
  "https://greenbeltpm.com/expert-property-management-in-boise-id-your-complete-guide/",
  "https://greenbeltpm.com/what-to-look-for-in-property-management-services-in-meridian-id/",
];

function decodeHtml(text) {
  return text
    .replace(/&#039;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\u2019/g, "'");
}

function extractMeta(html) {
  const title = decodeHtml(html.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1]?.trim() ?? "");
  const description = decodeHtml(
    html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i)?.[1]?.trim() ??
      html.match(/<meta[^>]+content=["']([^"']*)["'][^>]+name=["']description["']/i)?.[1]?.trim() ??
      "",
  );
  const canonical =
    html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']*)["']/i)?.[1]?.trim() ??
    html.match(/<link[^>]+href=["']([^"']*)["'][^>]+rel=["']canonical["']/i)?.[1]?.trim() ??
    "";
  const ogTitle = decodeHtml(
    html.match(/<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']*)["']/i)?.[1]?.trim() ??
      html.match(/<meta[^>]+content=["']([^"']*)["'][^>]+property=["']og:title["']/i)?.[1]?.trim() ??
      "",
  );
  return { title, description, canonical, ogTitle };
}

function extractArticleLinks(html) {
  const contentMatch =
    html.match(/class=["'][^"']*entry-content[^"']*["'][^>]*>([\s\S]*?)<\/div>\s*<\/div>\s*<\/article>/i) ??
    html.match(/<article[^>]*>([\s\S]*?)<\/article>/i);

  const content = contentMatch?.[1] ?? html;
  const links = [];
  for (const match of content.matchAll(/<a[^>]+href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi)) {
    const href = match[1].trim();
    const text = decodeHtml(match[2].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim());
    if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) continue;
    links.push({ href, text });
  }
  return links;
}

function extractArticleHtml(html) {
  const contentMatch =
    html.match(/class=["'][^"']*entry-content[^"']*["'][^>]*>([\s\S]*?)<\/div>\s*<\/div>\s*<\/article>/i) ??
    html.match(/<article[^>]*>([\s\S]*?)<\/article>/i);
  return contentMatch?.[1]?.trim() ?? "";
}

const results = [];
for (const url of LIVE_URLS) {
  const res = await fetch(url, { headers: { "User-Agent": "GPMBlogAudit/1.0" } });
  const html = await res.text();
  const slug = new URL(url).pathname.replace(/^\/|\/$/g, "");
  results.push({
    slug,
    liveUrl: url,
    localUrl: `http://localhost:3000/blog/${slug}/`,
    status: res.status,
    ...extractMeta(html),
    links: extractArticleLinks(html),
    contentHtmlLength: extractArticleHtml(html).length,
  });
  console.error(`OK ${slug} (${extractArticleLinks(html).length} links)`);
}

writeFileSync("scripts/blog-live-crawl.json", JSON.stringify(results, null, 2));
console.log(`Wrote ${results.length} posts to scripts/blog-live-crawl.json`);
