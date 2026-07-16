import type { Metadata } from "next";
import { Suspense } from "react";
import { BlogPage } from "@/components/blog/blog-page";
import { buildGpmPageMetadata } from "@/lib/gpm-sitemap-seo";
import {
  BLOG_FEATURED_LEAD_SLUG,
  BLOG_FEATURED_SECTION_MAX,
  BLOG_GRID_PAGE_SIZE,
  getBlogPostsForPage,
  type BlogPost,
} from "@/lib/blog";
import { getHomeContentForPage } from "@/sanity/fetch-home";

export const metadata: Metadata = buildGpmPageMetadata("/blog/");

function sortByDateDesc<T extends { publishedAt: string }>(a: T, b: T) {
  return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
}

function dedupePostsBySlug(posts: BlogPost[]): BlogPost[] {
  const seen = new Set<string>();
  return posts.filter((p) => {
    if (seen.has(p.slug)) return false;
    seen.add(p.slug);
    return true;
  });
}

/** Lead slug first, then CMS-featured, then pad with newest until `BLOG_FEATURED_SECTION_MAX`. */
function featuredPostsForIndex(sorted: BlogPost[]): BlogPost[] {
  const lead = sorted.find((p) => p.slug === BLOG_FEATURED_LEAD_SLUG);
  const cmsFeatured = sorted.filter((p) => p.featured && p.slug !== BLOG_FEATURED_LEAD_SLUG);
  let featured = dedupePostsBySlug(lead ? [lead, ...cmsFeatured] : [...cmsFeatured]);
  const used = new Set(featured.map((p) => p.slug));
  for (const p of sorted) {
    if (featured.length >= BLOG_FEATURED_SECTION_MAX) break;
    if (!used.has(p.slug)) {
      featured.push(p);
      used.add(p.slug);
    }
  }
  return featured.slice(0, BLOG_FEATURED_SECTION_MAX);
}

export default async function BlogPageRoute() {
  const [home, posts] = await Promise.all([getHomeContentForPage(), getBlogPostsForPage()]);
  const sorted = [...posts].sort(sortByDateDesc);
  const featured = featuredPostsForIndex(sorted);

  return (
    <Suspense fallback={null}>
      <BlogPage
        socialLinks={home.socialLinks}
        featuredPosts={featured}
        archivePosts={sorted}
        gridPageSize={BLOG_GRID_PAGE_SIZE}
        totalPostCount={posts.length}
      />
    </Suspense>
  );
}
