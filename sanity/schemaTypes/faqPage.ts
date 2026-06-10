import { defineField, defineType } from "sanity";

export const faqPage = defineType({
  name: "faqPage",
  title: "FAQ Page",
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
    defineField({
      name: "heroSubheading",
      title: "Hero subheading",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "categories",
      title: "FAQ categories (tabs)",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "id",
              title: "Category ID",
              type: "string",
              description: "Stable key, e.g. basics — used internally for the tab.",
              validation: (r) => r.required(),
            }),
            defineField({
              name: "label",
              title: "Tab label",
              type: "string",
              validation: (r) => r.required(),
            }),
            defineField({
              name: "faqs",
              title: "Questions in this category",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    { name: "question", title: "Question", type: "string" },
                    { name: "answer", title: "Answer", type: "text", rows: 6 },
                  ],
                },
              ],
            }),
          ],
          preview: {
            select: { title: "label", subtitle: "id" },
          },
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
