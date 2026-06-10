import type { BlogPost } from "@/lib/blog-types";
import { getLocalFallbackBlogPosts, mergeBlogPostsWithFallback } from "@/lib/blog-fallback";
import { fetchSanityBlogPostBySlug, fetchSanityBlogPosts } from "@/sanity/fetch-blog";
import { getSanityClient } from "@/sanity/client";

export type { BlogPost } from "@/lib/blog-types";
export {
  getBlogPostPath,
  getBlogPostPathFromPost,
  getBlogIndexHref,
  BLOG_CATEGORIES,
  isBlogCategorySlug,
  type BlogCategorySlug,
} from "@/lib/blog-categories";

/** Grid rows under the lead post: 3 columns × 3 rows per page. */
export const BLOG_GRID_PAGE_SIZE = 9;

/** First featured slot on /blog is reserved for this slug via `blog/page.tsx`. */
export const BLOG_FEATURED_LEAD_SLUG = "what-is-property-management";

/** Legacy slug → canonical slug (Sanity may still publish the old slug). */
export const BLOG_SLUG_ALIASES: Record<string, string> = {
  "property-management-meridian": "what-is-property-management",
};

/** Only these blog posts remain after the site trim. */
const ALLOWED_BLOG_SLUGS = new Set<string>([BLOG_FEATURED_LEAD_SLUG]);

function resolveBlogSlug(slug: string): string {
  return BLOG_SLUG_ALIASES[slug] ?? slug;
}

function isAllowedBlogPost(post: BlogPost): boolean {
  return ALLOWED_BLOG_SLUGS.has(resolveBlogSlug(post.slug));
}

function normalizeBlogPost(post: BlogPost): BlogPost {
  const canonicalSlug = resolveBlogSlug(post.slug);
  return canonicalSlug === post.slug ? post : { ...post, slug: canonicalSlug };
}

/** Collapse legacy + canonical slug duplicates; prefer the canonical slug record. */
function finalizeBlogPosts(posts: BlogPost[]): BlogPost[] {
  const bySlug = new Map<string, BlogPost>();
  for (const post of posts) {
    const normalized = normalizeBlogPost(post);
    const existing = bySlug.get(normalized.slug);
    if (!existing || post.slug === normalized.slug) {
      bySlug.set(normalized.slug, normalized);
    }
  }
  return [...bySlug.values()].filter(isAllowedBlogPost).sort(sortByDateDesc);
}

/** Featured grid columns (lg): lead slot + CMS `featured` + pad with newest until full. */
export const BLOG_FEATURED_SECTION_MAX = 3;

function sortByDateDesc(a: BlogPost, b: BlogPost) {
  return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
}

/** Newest `publishedAt` first; does not mutate the input array. */
export function selectMostRecentPostsExcluding(
  posts: readonly BlogPost[],
  excludeSlug: string,
  limit = 3,
): BlogPost[] {
  return [...posts].filter((p) => p.slug !== excludeSlug).sort(sortByDateDesc).slice(0, limit);
}

/**
 * Published posts from Sanity, merged with local markdown fallbacks for pricing-guide slugs
 * when those documents are missing. If Sanity is not configured, only fallback posts are returned.
 */
export async function getBlogPostsForPage(): Promise<BlogPost[]> {
  let posts: BlogPost[];
  if (!getSanityClient()) {
    posts = [...getLocalFallbackBlogPosts()];
  } else {
    const remote = await fetchSanityBlogPosts();
    posts = mergeBlogPostsWithFallback(remote);
  }
  return finalizeBlogPosts(posts);
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const canonicalSlug = resolveBlogSlug(slug);
  if (!ALLOWED_BLOG_SLUGS.has(canonicalSlug)) return null;

  const pick = (posts: BlogPost[]) =>
    posts.find((p) => p.slug === canonicalSlug) ??
    (slug !== canonicalSlug ? posts.find((p) => p.slug === slug) : undefined) ??
    null;

  if (!getSanityClient()) {
    return pick(getLocalFallbackBlogPosts());
  }

  const remote =
    (await fetchSanityBlogPostBySlug(canonicalSlug)) ??
    (slug !== canonicalSlug ? await fetchSanityBlogPostBySlug(slug) : null);
  if (remote) {
    return remote.slug === canonicalSlug ? remote : { ...remote, slug: canonicalSlug };
  }

  return pick(getLocalFallbackBlogPosts());
}
