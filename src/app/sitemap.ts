import type { MetadataRoute } from "next";
import { BLOG_FEATURED_LEAD_SLUG, getBlogPostsForPage } from "@/lib/blog";
import { GPM_SITEMAP_SEO } from "@/lib/gpm-sitemap-seo";
import { PM_SERVICE_PAGES, pmServicePagePath } from "@/lib/pm-service-pages";
import { buildCanonicalUrl } from "@/lib/site-url";

function toAbsoluteUrl(path: string): string {
  return buildCanonicalUrl(path);
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const urls = new Set<string>();

  urls.add(toAbsoluteUrl("/"));

  for (const path of Object.keys(GPM_SITEMAP_SEO)) {
    urls.add(toAbsoluteUrl(path));
  }

  for (const entry of Object.values(PM_SERVICE_PAGES)) {
    urls.add(toAbsoluteUrl(pmServicePagePath(entry.slug)));
  }

  urls.add(toAbsoluteUrl("/blog/"));
  urls.add(toAbsoluteUrl(`/blog/${BLOG_FEATURED_LEAD_SLUG}/`));

  try {
    const posts = await getBlogPostsForPage();
    for (const post of posts) {
      urls.add(toAbsoluteUrl(`/blog/${post.slug}/`));
    }
  } catch {
    // Fall back to static blog URLs already added above.
  }

  const now = new Date();

  return [...urls].sort().map((url) => ({
    url,
    lastModified: now,
    changeFrequency: url === buildCanonicalUrl("/") ? "weekly" : "monthly",
    priority: url === buildCanonicalUrl("/") ? 1 : url.includes("/blog/") ? 0.6 : 0.8,
  }));
}
