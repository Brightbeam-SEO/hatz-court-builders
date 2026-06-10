import { defineField, defineType } from "sanity";

export const galleryPage = defineType({
  name: "galleryPage",
  title: "Gallery Page",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({ name: "intro", title: "Intro", type: "text", rows: 3 }),
    defineField({ name: "heroSubheading", title: "Hero subheading", type: "text", rows: 2 }),
    defineField({ name: "overviewHeadline", title: "Overview headline", type: "string" }),
    defineField({ name: "overviewBody", title: "Overview body", type: "text", rows: 4 }),
    defineField({
      name: "overviewStats",
      title: "Overview stats",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "value", title: "Value", type: "string" },
            { name: "label", title: "Label", type: "string" },
          ],
        },
      ],
    }),
    defineField({ name: "highlightsTitle", title: "Highlights title", type: "string" }),
    defineField({ name: "highlightsIntro", title: "Highlights intro", type: "text", rows: 3 }),
    defineField({
      name: "highlightItems",
      title: "Highlight items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "image", title: "Image path", type: "string" },
            { name: "caption", title: "Caption", type: "string" },
            { name: "alt", title: "Alt text", type: "string" },
          ],
        },
      ],
    }),
    defineField({
      name: "items",
      title: "Gallery items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "image", title: "Image path", type: "string" },
            { name: "caption", title: "Caption", type: "string" },
            { name: "alt", title: "Alt text", type: "string" },
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
