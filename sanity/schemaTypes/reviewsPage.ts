import { defineField, defineType } from "sanity";

export const reviewsPage = defineType({
  name: "reviewsPage",
  title: "Reviews Page",
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
    defineField({
      name: "reviews",
      title: "Reviews",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", title: "Reviewer name", type: "string" },
            { name: "quote", title: "Quote", type: "text", rows: 4 },
            { name: "rating", title: "Rating (1-5)", type: "number" },
            { name: "image", title: "Avatar image path", type: "string" },
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
