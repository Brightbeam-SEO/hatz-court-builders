import { defineField, defineType } from "sanity";
import { locationPagePreviewPath } from "../constants/locationPageFilters";

/**
 * Long-form city (`/city/[slug]/`) and service (`/[slug]/`) landings (Markdown + embed markers).
 */
export const locationPage = defineType({
  name: "locationPage",
  title: "Location pages",
  type: "document",
  description:
    "City pages → **Location pages** (`/city/…/`). Service pages → **Service pages** (site root, e.g. `/property-management-services/`). Run `npm run seed:sanity-location-pages` to sync Markdown from the repo.",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "layoutTemplate",
      title: "Page layout",
      type: "string",
      group: "content",
      options: {
        list: [
          {
            title: "Service / city landing (hero + Markdown article)",
            value: "pressureWashingBoise",
          },
        ],
        layout: "radio",
      },
      initialValue: "pressureWashingBoise",
      validation: (r) => r.required(),
      description:
        "New locations should keep this option unless we add another React template. Markdown embed markers (see Article markdown) control FAQs, map, process timeline, etc.",
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "content",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "content",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
      description:
        "URL slug only — must match the site registry (e.g. `property-management-services`, `property-management-boise-id`).",
    }),
    defineField({
      name: "pageCategory",
      title: "Page type",
      type: "string",
      group: "content",
      options: {
        list: [
          { title: "Location page — city (/city/…)", value: "city" },
          { title: "Service page — site root (/[slug]/)", value: "service" },
        ],
        layout: "radio",
      },
      validation: (r) => r.required(),
      description:
        "Location page → **Location pages** in Studio. Service page → **Service pages** (URL is `greenbeltpm.com/{slug}/`, not `/services/`).",
    }),
    defineField({
      name: "locationName",
      title: "Location name",
      type: "string",
      group: "content",
      description: "Optional display label for editors (hero copy still lives in Markdown unless wired later).",
    }),
    defineField({
      name: "heroHeadline",
      title: "Hero headline",
      type: "string",
      group: "content",
      hidden: ({ document }) => document?.layoutTemplate === "pressureWashingBoise",
      description: "Reserved for future templates; Boise-style landing uses fixed hero in code.",
    }),
    defineField({
      name: "heroSubheadline",
      title: "Hero subheadline",
      type: "text",
      rows: 3,
      group: "content",
      hidden: ({ document }) => document?.layoutTemplate === "pressureWashingBoise",
    }),
    defineField({
      name: "servicesOffered",
      title: "Services offered",
      type: "array",
      of: [{ type: "string" }],
      group: "content",
      hidden: ({ document }) => document?.layoutTemplate === "pressureWashingBoise",
    }),
    defineField({
      name: "articleMarkdown",
      title: "Article body (Markdown)",
      type: "text",
      group: "content",
      rows: 36,
      hidden: ({ document }) => document?.layoutTemplate !== "pressureWashingBoise",
      description:
        "Powers the article column (react-markdown). Keep embed markers: `<!--SOL_BOISE_PROCESS_TIMELINE-->`, `<!--SOL_BOISE_FAQ-->`, etc. Run `npm run seed:sanity-location-pages` to sync from repo Markdown.",
    }),
    defineField({
      name: "body",
      title: "Body (Portable Text — legacy)",
      type: "array",
      of: [{ type: "block" }],
      group: "content",
      hidden: ({ document }) => document?.layoutTemplate === "pressureWashingBoise",
      description: "Not used for Boise-style pages; use Article markdown instead.",
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "object",
      group: "seo",
      fields: [
        { name: "metaTitle", title: "Meta title", type: "string" },
        { name: "metaDescription", title: "Meta description", type: "text", rows: 3 },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      slug: "slug.current",
      pageCategory: "pageCategory",
    },
    prepare({ title, slug, pageCategory }) {
      return {
        title: title ?? "Location page",
        subtitle: locationPagePreviewPath(slug ?? "", pageCategory),
      };
    },
  },
});
