import { defineField, defineType } from "sanity";

export const homePage = defineType({
  name: "homePage",
  title: "Home page",
  type: "document",
  groups: [
    { name: "copy", title: "Copy & headings", default: true },
    { name: "lists", title: "Lists (services, FAQs, reviews…)" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Label",
      type: "string",
      description: "Internal name (optional).",
      group: "copy",
    }),
    defineField({
      name: "pageCopy",
      title: "Homepage copy",
      type: "object",
      group: "copy",
      description:
        "Hero headlines, section titles, body text, CTAs, and crimson-strip trust logos. Matches the live site when seeded.",
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({ name: "heroEyebrow", title: "Hero eyebrow", type: "string" }),
        defineField({ name: "heroTitle", title: "Hero headline", type: "string" }),
        defineField({ name: "heroSubtitle", title: "Hero supporting text", type: "text", rows: 3 }),
        defineField({ name: "localIntroEyebrow", title: "Intro — eyebrow", type: "string" }),
        defineField({
          name: "heroTrustSignals",
          title: "Hero stat cards (right column)",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                { name: "highlight", type: "string", title: "Big number / word" },
                { name: "title", type: "string", title: "Label" },
              ],
            },
          ],
        }),
        defineField({ name: "heroStripHeading", title: "Crimson strip — heading", type: "string" }),
        defineField({
          name: "heroStripSubheading",
          title: "Crimson strip — supporting text",
          type: "text",
          rows: 3,
        }),
        defineField({
          name: "heroTrustStripLogos",
          title: "Crimson strip — scrolling trust logos",
          type: "array",
          description: "Image paths under /public (e.g. /images/trust/google.png).",
          of: [
            {
              type: "object",
              fields: [
                {
                  name: "src",
                  type: "string",
                  title: "Image path",
                  description: "e.g. /images/trust/yelp.png",
                },
                { name: "alt", type: "string", title: "Alt text" },
              ],
            },
          ],
        }),
        defineField({
          name: "ctaCallVerb",
          title: "Call button — word before phone",
          type: "string",
          description: 'Shown as: “{this} {phone}”. Example: “Call”.',
          initialValue: "Call",
        }),
        defineField({
          name: "ctaBookNowLabel",
          title: "Book / secondary button label",
          type: "string",
          initialValue: "Book Now",
        }),
        defineField({
          name: "contactFormSubmitLabel",
          title: "Contact form submit button",
          type: "string",
          initialValue: "Submit",
        }),
        defineField({ name: "localIntroTitleLine1", title: "Intro — title line 1", type: "string" }),
        defineField({ name: "localIntroTitleLine2", title: "Intro — title line 2", type: "string" }),
        defineField({ name: "localIntroBody", title: "Intro — paragraph", type: "text", rows: 4 }),
        defineField({ name: "servicesHeading", title: "Services section — heading", type: "string" }),
        defineField({ name: "servicesIntro", title: "Services section — intro", type: "text", rows: 3 }),
        defineField({
          name: "servicesExploreLabel",
          title: "Services carousel — footer label",
          type: "string",
        }),
        defineField({ name: "closingShowcaseEyebrow", title: "Showcase — small label", type: "string" }),
        defineField({ name: "closingShowcaseHeading", title: "Showcase — heading", type: "string" }),
        defineField({ name: "closingShowcaseBragLine", title: "Showcase — stars line", type: "string" }),
        defineField({ name: "closingShowcaseBragSubline", title: "Showcase — under stars", type: "string" }),
        defineField({ name: "closingShowcaseBody", title: "Showcase — paragraph", type: "text", rows: 4 }),
        defineField({
          name: "closingShowcaseBullets",
          title: "Showcase — bullet list",
          type: "array",
          of: [{ type: "string" }],
        }),
        defineField({ name: "processSectionEyebrow", title: "Process — eyebrow", type: "string" }),
        defineField({
          name: "processSectionHeadingLead",
          title: "Process — emphasized part of heading",
          type: "string",
          description: "Shown with brush underline before the rest of the heading.",
        }),
        defineField({
          name: "processSectionHeadingRest",
          title: "Process — rest of heading",
          type: "string",
        }),
        defineField({ name: "processSectionSubtext", title: "Process — subtext", type: "string" }),
        defineField({ name: "trustMarqueeHeading", title: "Testimonials band — heading", type: "string" }),
        defineField({
          name: "trustMarqueeSubtext",
          title: "Testimonials band — subtext",
          type: "text",
          rows: 3,
        }),
        defineField({ name: "serviceAreaHeading", title: "Service area — heading", type: "string" }),
        defineField({ name: "serviceAreaBody", title: "Service area — body", type: "text", rows: 4 }),
        defineField({ name: "faqHeadingLine1", title: "FAQ band — heading line 1", type: "string" }),
        defineField({ name: "faqHeadingLine2", title: "FAQ band — heading line 2 (crimson)", type: "string" }),
        defineField({ name: "faqSubtext", title: "FAQ band — subtext", type: "text", rows: 3 }),
        defineField({
          name: "faqIntroBeforeEmphasis",
          title: "FAQ intro — text before emphasis word",
          type: "string",
        }),
        defineField({ name: "faqIntroEmphasis", title: "FAQ intro — emphasized word", type: "string" }),
        defineField({
          name: "faqIntroAfterEmphasis",
          title: "FAQ intro — text after emphasis word",
          type: "string",
        }),
        defineField({ name: "faqIntroSubtext", title: "FAQ intro — supporting text", type: "text", rows: 3 }),
        defineField({ name: "contactHeading", title: "Contact section — heading", type: "string" }),
        defineField({ name: "contactSubtext", title: "Contact section — supporting text", type: "text", rows: 2 }),
      ],
    }),
    defineField({
      name: "navItems",
      title: "Navigation labels",
      type: "array",
      of: [{ type: "string" }],
      group: "lists",
    }),
    defineField({
      name: "trustBarItems",
      title: "Trust bar items",
      type: "array",
      of: [{ type: "string" }],
      group: "lists",
    }),
    defineField({
      name: "services",
      title: "Service cards (grid)",
      type: "array",
      group: "lists",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", type: "string", title: "Name" },
            { name: "blurb", type: "text", title: "Blurb" },
            {
              name: "image",
              type: "string",
              title: "Illustration path",
              description: "Public URL path, e.g. /images/services/pressure-washing.svg",
            },
            {
              name: "hoverImage",
              type: "string",
              title: "Photo path",
              description: "Shown on hover, e.g. /images/services/pressure-washing-photo.jpg",
            },
            {
              name: "cardIcon",
              type: "string",
              title: "Card icon path",
              description: "Small icon in the service card",
            },
          ],
        },
      ],
    }),
    defineField({
      name: "servicesCarousel",
      title: "Services image carousel",
      type: "array",
      group: "lists",
      description: "Horizontal scrolling cards on the red services band (name + image path under /public).",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", type: "string", title: "Title on card" },
            {
              name: "image",
              type: "string",
              title: "Image path",
              description: "e.g. /services/foot-massage.webp",
            },
          ],
        },
      ],
    }),
    defineField({
      name: "whyChooseUs",
      title: "Why choose us",
      type: "array",
      group: "lists",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", type: "string" },
            { name: "body", type: "text" },
            {
              name: "icon",
              type: "string",
              title: "Icon path",
            },
          ],
        },
      ],
    }),
    defineField({
      name: "processSteps",
      title: "Process steps",
      type: "array",
      group: "lists",
      of: [
        {
          type: "object",
          fields: [
            { name: "step", type: "string", title: "Step number" },
            { name: "title", type: "string" },
            { name: "body", type: "text" },
            { name: "icon", type: "string", title: "Icon path" },
          ],
        },
      ],
    }),
    defineField({
      name: "googleReviews",
      title: "Google reviews",
      type: "array",
      group: "lists",
      of: [
        {
          type: "object",
          fields: [
            { name: "id", type: "string", title: "Stable id (slug)" },
            { name: "name", type: "string" },
            { name: "quote", type: "text" },
            {
              name: "image",
              type: "string",
              title: "Avatar path",
              description: "e.g. /images/testimonials/ashley-johnson-v2.png",
            },
          ],
        },
      ],
    }),
    defineField({
      name: "faqs",
      title: "FAQs",
      type: "array",
      group: "lists",
      of: [
        {
          type: "object",
          fields: [
            { name: "question", type: "string" },
            { name: "answer", type: "text" },
          ],
        },
      ],
    }),
    defineField({
      name: "socialLinks",
      title: "Social links",
      type: "array",
      group: "lists",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", type: "string" },
            { name: "href", type: "string", title: "URL" },
          ],
        },
      ],
    }),
  ],
});
