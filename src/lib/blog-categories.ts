/** Internal CMS category (not used in public URLs). */
export const BLOG_CATEGORY_SLUGS = ["property-management"] as const;

export type BlogCategorySlug = (typeof BLOG_CATEGORY_SLUGS)[number];

export type BlogCategory = {
  slug: BlogCategorySlug;
  label: string;
};

export const BLOG_CATEGORIES: BlogCategory[] = [
  { slug: "property-management", label: "Property Management" },
];

const CATEGORY_SLUG_SET = new Set<string>(BLOG_CATEGORY_SLUGS);

/** Default category when CMS omits the field. */
const SLUG_CATEGORY_FALLBACK: Record<string, BlogCategorySlug> = {
  "what-is-property-management": "property-management",
  "property-management-meridian": "property-management",
  "top-property-management-services-in-idaho-what-you-need-to-know": "property-management",
  "expert-property-management-in-boise-id-your-complete-guide": "property-management",
  "what-to-look-for-in-property-management-services-in-meridian-id": "property-management",
  "massage-therapist-cost": "property-management",
};

export function isBlogCategorySlug(value: string): value is BlogCategorySlug {
  return CATEGORY_SLUG_SET.has(value);
}

export function resolveBlogCategorySlug(
  slug: string,
  categoryFromSource?: string | null,
): BlogCategorySlug {
  if (categoryFromSource && isBlogCategorySlug(categoryFromSource)) {
    return categoryFromSource;
  }
  return SLUG_CATEGORY_FALLBACK[slug] ?? "property-management";
}

export function getBlogCategoryLabel(categorySlug: BlogCategorySlug): string {
  return BLOG_CATEGORIES.find((c) => c.slug === categorySlug)?.label ?? "Property Management";
}

/** Canonical public path, e.g. `/blog/property-management-meridian/` */
export function getBlogPostPath(slug: string): string {
  return `/blog/${slug}/`;
}

export function getBlogPostPathFromPost(post: { slug: string }): string {
  return getBlogPostPath(post.slug);
}

/** Blog index URL with optional pagination. */
export function getBlogIndexHref(options?: { page?: number }): string {
  const params = new URLSearchParams();
  if (options?.page && options.page > 1) params.set("page", String(options.page));
  const query = params.toString();
  return query ? `/blog?${query}` : "/blog";
}

/** Legacy path before category segments were removed from URLs. */
export function getLegacyBlogPostPath(slug: string, category: BlogCategorySlug): string {
  return `/${category}/${slug}/`;
}
