import { readFileSync, writeFileSync } from "node:fs";

const xml = readFileSync(
  "C:/Users/Lenovo/.cursor/projects/c-Users-Lenovo-Downloads-Website-Projects-Greenbelt-Property-Management/uploads/page-sitemap-0.xml",
  "utf8",
);

const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

const localPaths = new Set([
  "/",
  "/rentals/",
  "/about/",
  "/contact/",
  "/tenant-placement-services/",
  "/property-management-services/",
  "/rental-property-marketing/",
  "/property-inspections/",
  "/property-maintenance-services/",
  "/specialized-property-management/",
  "/multi-family-property-management/",
  "/hoa-community-management/",
  "/long-term-rental-management/",
  "/property-risk-management-meridian-id/",
  "/condo-rentals-meridian-id/",
  "/home-rentals-meridian-id/",
  "/month-to-month-rentals-meridian-id/",
  "/real-estate-investment-consulting/",
  "/property-risk-mitigation/",
  "/city/property-management-boise-id/",
  "/city/property-management-eagle-id/",
  "/city/property-management-in-kuna-id/",
  "/city/property-management-in-middleton-id/",
  "/city/property-management-in-nampa-id/",
  "/city/property-management-in-star-id/",
  "/city/property-management-meridian-id/",
]);

const pathMap = { "/about/": "/about-us/", "/contact/": "/contact-us/" };
const skipLast = new Set([
  "sample-page",
  "privacy-policy",
  "terms-of-use",
  "thank-you",
  "short-term-rental-management",
  "commercial-property-management",
]);

function extractMeta(html) {
  const title = html.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1]?.trim() ?? "";
  const desc =
    html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i)?.[1]?.trim() ??
    html.match(/<meta[^>]+content=["']([^"']*)["'][^>]+name=["']description["']/i)?.[1]?.trim() ??
    "";
  const ogTitle =
    html.match(/<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']*)["']/i)?.[1]?.trim() ??
    html.match(/<meta[^>]+content=["']([^"']*)["'][^>]+property=["']og:title["']/i)?.[1]?.trim() ??
    "";
  const ogDesc =
    html.match(/<meta[^>]+property=["']og:description["'][^>]+content=["']([^"']*)["']/i)?.[1]?.trim() ??
    html.match(/<meta[^>]+content=["']([^"']*)["'][^>]+property=["']og:description["']/i)?.[1]?.trim() ??
    "";
  const canonical =
    html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']*)["']/i)?.[1]?.trim() ??
    html.match(/<link[^>]+href=["']([^"']*)["'][^>]+rel=["']canonical["']/i)?.[1]?.trim() ??
    "";
  return { title, description: desc, ogTitle, ogDescription: ogDesc, canonical };
}

const matched = [];
for (const url of urls) {
  const p = new URL(url).pathname;
  if (p === "/city/") continue;
  const last = p.split("/").filter(Boolean).pop() ?? "";
  if (skipLast.has(last)) continue;
  if (!localPaths.has(p) && !pathMap[p]) continue;
  matched.push({ livePath: p, localPath: pathMap[p] ?? p, url });
}

const results = [];
for (const item of matched) {
  try {
    const res = await fetch(item.url, { headers: { "User-Agent": "GreenbeltSEOAudit/1.0" } });
    const html = await res.text();
    results.push({ ...item, status: res.status, ...extractMeta(html) });
    process.stderr.write(`OK ${item.livePath}\n`);
  } catch (e) {
    results.push({ ...item, error: String(e) });
    process.stderr.write(`ERR ${item.livePath}\n`);
  }
}

writeFileSync("scripts/sitemap-live-meta.json", JSON.stringify(results, null, 2));
console.log(`Wrote ${results.length} entries`);
