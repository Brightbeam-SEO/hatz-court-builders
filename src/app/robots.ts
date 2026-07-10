import type { MetadataRoute } from "next";

const SITE_ORIGIN = "https://hatzcourtbuilders.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE_ORIGIN}/sitemap.xml`,
  };
}
