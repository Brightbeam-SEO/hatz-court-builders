import { defineField, defineType } from "sanity";

export const cityServicePage = defineType({
  name: "cityServicePage",
  title: "City Service Page",
  type: "document",
  description:
    "Deprecated. Live landings use the **locationPage** type — city pages under Location pages, services under City service pages.",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({ name: "city", title: "City", type: "string" }),
    defineField({ name: "service", title: "Service", type: "string" }),
    defineField({ name: "heroHeadline", title: "Hero headline", type: "string" }),
    defineField({ name: "intro", title: "Intro paragraph", type: "text", rows: 3 }),
    defineField({
      name: "sections",
      title: "Content sections",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "heading", title: "Heading", type: "string" },
            { name: "body", title: "Body", type: "array", of: [{ type: "block" }] },
          ],
        },
      ],
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "object",
      fields: [
        { name: "metaTitle", title: "Meta title", type: "string" },
        { name: "metaDescription", title: "Meta description", type: "text", rows: 3 },
      ],
    }),
  ],
});
