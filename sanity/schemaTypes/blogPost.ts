import { defineField, defineType } from "sanity";
import {
  FULL_ARTICLE_BODY_STARTER,
  FULL_ARTICLE_TOC_STARTER,
} from "../constants/blogPostFullArticleStarter";

export const blogPost = defineType({
  name: "blogPost",
  title: "Blog post",
  type: "document",
  initialValue: () => ({
    layoutTemplate: "fullArticle",
    featured: false,
    subtitle: "Hero subtitle — one line under the title",
    excerpt: "Short summary for blog cards (shown on /blog and in previews).",
    featuredImage:
      "/images/gpm/modern-kitchen-interior-rental-property-marketing-meridian-idaho-greenbelt-property-management.webp",
    featuredImageAlt: "Greenbelt Property Management — Meridian, Idaho",
    publishedAt: new Date().toISOString(),
    bodyMarkdown: FULL_ARTICLE_BODY_STARTER,
    tocItems: FULL_ARTICLE_TOC_STARTER,
    seo: {
      metaTitle: "",
      metaDescription: "",
    },
  }),
  groups: [
    { name: "article", title: "Article", default: true },
    { name: "cards", title: "Cards & SEO" },
    { name: "settings", title: "Settings" },
  ],
  orderings: [
    {
      title: "Published date (newest first)",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
    {
      title: "Title A–Z",
      name: "titleAsc",
      by: [{ field: "title", direction: "asc" }],
    },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "article",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "article",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
      description: "Article slug only. Live URL: /blog/[slug]/",
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      group: "settings",
      options: {
        list: [
          { title: "Body Massage", value: "body-massage" },
          { title: "Facials", value: "facials" },
          { title: "Foot Massage – Reflexology", value: "foot-massage-reflexology" },
          { title: "Scalp Massage", value: "scalp-massage" },
        ],
        layout: "radio",
      },
      initialValue: "body-massage",
      validation: (r) => r.required(),
      description: "URL segment before the slug, e.g. /body-massage/massage-therapist-cost/",
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle (hero)",
      type: "string",
      group: "article",
      description: "Shown under the title on the hero for full-article posts.",
    }),
    defineField({
      name: "bodyMarkdown",
      title: "Article body (Markdown)",
      type: "text",
      group: "article",
      rows: 36,
      description:
        "This plain-text field powers the live blog (react-markdown). Use Markdown plus HTML for anchored headings, e.g. `<h2 id=\"intro\">Introduction</h2>`, lists, `---`, and `![alt](/images/...)` for images in `public/`.",
    }),
    defineField({
      name: "tocItems",
      title: "Table of contents",
      type: "array",
      group: "article",
      description: "Optional. Drives the sidebar / mobile TOC for full-article posts.",
      of: [
        {
          type: "object",
          name: "tocItem",
          fields: [
            defineField({ name: "id", title: "Anchor id", type: "string", validation: (r) => r.required() }),
            defineField({ name: "label", title: "Label", type: "string", validation: (r) => r.required() }),
            defineField({
              name: "level",
              title: "Level",
              type: "number",
              options: { list: [2, 3] },
              initialValue: 2,
              validation: (r) => r.required().min(2).max(3),
            }),
          ],
          preview: {
            select: { title: "label", subtitle: "id" },
            prepare({ title, subtitle }) {
              return { title: title ?? "Item", subtitle: subtitle ? `#${subtitle}` : "" };
            },
          },
        },
      ],
    }),
    defineField({ name: "excerpt", title: "Excerpt / card summary", type: "text", rows: 4, group: "cards" }),
    defineField({
      name: "featuredImage",
      title: "Featured image path",
      type: "string",
      group: "cards",
      description: "Public URL path served by Next.js, e.g. /images/gallery/photo.webp",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "featuredImageAlt",
      title: "Featured image alt text",
      type: "string",
      group: "cards",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "object",
      group: "cards",
      fields: [
        { name: "metaTitle", title: "Meta title", type: "string" },
        { name: "metaDescription", title: "Meta description", type: "text", rows: 4 },
      ],
    }),

    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      group: "settings",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "featured",
      title: "Featured on blog index (after lead slot)",
      type: "boolean",
      group: "settings",
      initialValue: false,
      description:
        "The `/blog` page always promotes `massage-therapist-cost` first; turn this on to pin additional posts in the Featured row when using Sanity as source.",
    }),
    defineField({
      name: "layoutTemplate",
      title: "Page layout",
      type: "string",
      group: "settings",
      options: {
        list: [
          {
            title: "Full article (Cost article template)",
            value: "fullArticle",
          },
          { title: "Simple article", value: "simple" },
        ],
        layout: "radio",
      },
      initialValue: "fullArticle",
      description:
        "Use **Full article** for long guides: same shell as `/blog/massage-therapist-cost` (hero, TOC, sidebar CTA, recommended posts). **Simple** is a compact layout without that shell.",
    }),
  ],
  preview: {
    select: {
      title: "title",
      slug: "slug.current",
      publishedAt: "publishedAt",
      subtitleHero: "subtitle",
    },
    prepare({ title, slug, publishedAt, subtitleHero }) {
      const date =
        publishedAt &&
        new Intl.DateTimeFormat("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }).format(new Date(publishedAt));
      const path = slug ? `/{category}/${slug}` : "";
      return {
        title: title ?? "Blog post",
        subtitle: [date, path, subtitleHero].filter(Boolean).join(" · ") || path,
      };
    },
  },
});
