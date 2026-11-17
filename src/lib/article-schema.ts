import { BUSINESS } from "@/lib/business";
import { buildCanonicalUrl } from "@/lib/site-url";

const MONTHS: Record<string, string> = {
  january: "01",
  february: "02",
  march: "03",
  april: "04",
  may: "05",
  june: "06",
  july: "07",
  august: "08",
  september: "09",
  october: "10",
  november: "11",
  december: "12",
};

/** ISO date from a legal page's `**Last Updated: Month D, YYYY**` line. */
export function parseLegalLastUpdated(markdown: string): string | null {
  const match = markdown.match(/\*\*Last Updated:\s*([A-Za-z]+)\s+(\d{1,2}),\s*(\d{4})\*\*/);
  if (!match) return null;
  const month = MONTHS[match[1].toLowerCase()];
  if (!month) return null;
  return `${match[3]}-${month}-${match[2].padStart(2, "0")}`;
}

function absoluteUrl(src: string): string {
  if (/^https?:\/\//i.test(src)) return src;
  return buildCanonicalUrl(src);
}

export function buildArticleSchema(input: {
  type?: "Article" | "BlogPosting";
  pagePath: string;
  headline: string;
  description?: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
}) {
  const pageUrl = buildCanonicalUrl(input.pagePath);
  const publisherUrl = buildCanonicalUrl("/");
  const logoUrl = absoluteUrl(BUSINESS.logoSrc);
  const dateModified = input.dateModified ?? input.datePublished;

  return {
    "@context": "https://schema.org",
    "@type": input.type ?? "Article",
    "@id": `${pageUrl}#article`,
    headline: input.headline,
    ...(input.description ? { description: input.description } : {}),
    ...(input.image ? { image: [absoluteUrl(input.image)] } : {}),
    datePublished: input.datePublished,
    dateModified,
    author: {
      "@type": "Organization",
      name: BUSINESS.nameFull,
      url: publisherUrl,
    },
    publisher: {
      "@type": "Organization",
      name: BUSINESS.nameFull,
      url: publisherUrl,
      logo: {
        "@type": "ImageObject",
        url: logoUrl,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": pageUrl,
    },
    url: pageUrl,
  };
}
