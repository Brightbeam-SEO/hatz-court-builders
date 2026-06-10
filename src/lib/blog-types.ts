import type { BlogArticleTocItem } from "@/components/blog/blog-article-types";
import type { BlogCategorySlug } from "@/lib/blog-categories";

export type BlogPost = {
  id: string;
  slug: string;
  /** URL category segment, e.g. `body-massage` → `/body-massage/[slug]/`. */
  category: BlogCategorySlug;
  title: string;
  excerpt: string;
  image: string;
  imageAlt: string;
  publishedAt: string;
  featured: boolean;
  /** Optional hero line under the title on full-article pages. */
  subtitle?: string;
  metaTitle?: string;
  metaDescription?: string;
  /**
   * `fullArticle` = long-form template (same shell as `/blog/massage-therapist-cost`).
   * `simple` = compact article layout.
   */
  layoutTemplate?: "fullArticle" | "simple";
  /** Markdown + limited HTML (h2/h3 with ids, links, lists) for `fullArticle` posts. */
  bodyMarkdown?: string | null;
  /** Sidebar / mobile TOC; optional if empty. */
  tocItems?: BlogArticleTocItem[];
};
