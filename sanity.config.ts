import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { LOCATION_PAGE_BOISE_TEMPLATE_ARTICLE_HINT } from "./sanity/constants/locationPageBoiseTemplateHint";
import { structure } from "./sanity/structure";
import { schemaTypes } from "./sanity/schemaTypes";
import { studioDataset, studioProjectId } from "./sanityStudioEnv";

if (!studioProjectId) {
  throw new Error(
    "Missing SANITY_STUDIO_PROJECT_ID. Add it to .env.local in the project root (same folder as sanity.config.ts), then restart `npm run studio`. See https://sanity.io/manage → your project.",
  );
}

const dataset = studioDataset ?? "production";

export default defineConfig({
  name: "greenbelt-property-management",
  title: "Greenbelt Property Management",
  projectId: studioProjectId,
  dataset,
  plugins: [structureTool({ structure }), visionTool()],
  schema: {
    types: schemaTypes,
    templates: (prev) => [
      ...prev.map((template) =>
        template.schemaType === "blogPost" && template.id === "blogPost"
          ? {
              ...template,
              title: "Blog post — full article (pricing guide layout)",
              description:
                "Full article layout: hero, Markdown body, TOC, sidebar CTA. Set slug (URL: /blog/[slug]/), hero image, heading ids + TOC, and SEO before publishing.",
            }
          : template,
      ),
      {
        id: "locationPage-city",
        title: "City location page (/city/…)",
        schemaType: "locationPage",
        description: "Treasure Valley city landing — slug e.g. property-management-boise-id",
        value: () => ({
          layoutTemplate: "pressureWashingBoise",
          pageCategory: "city",
          title: "",
          slug: { _type: "slug", current: "" },
          articleMarkdown: LOCATION_PAGE_BOISE_TEMPLATE_ARTICLE_HINT,
          seo: { metaTitle: "", metaDescription: "" },
        }),
      },
      {
        id: "locationPage-service",
        title: "Service page (site root)",
        schemaType: "locationPage",
        description: "PM service landing — slug e.g. property-management-services",
        value: () => ({
          layoutTemplate: "pressureWashingBoise",
          pageCategory: "service",
          title: "",
          slug: { _type: "slug", current: "" },
          articleMarkdown: LOCATION_PAGE_BOISE_TEMPLATE_ARTICLE_HINT,
          seo: { metaTitle: "", metaDescription: "" },
        }),
      },
    ],
  },
});
