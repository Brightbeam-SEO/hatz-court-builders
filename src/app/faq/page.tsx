import type { Metadata } from "next";
import { StructuredData } from "@/components/seo/structured-data";
import { FaqPage } from "@/components/faq/faq-page";
import { buildCanonicalPageMetadata, buildGpmPageMetadata } from "@/lib/gpm-sitemap-seo";
import { buildCanonicalUrl } from "@/lib/site-url";
import { getFaqContentForPage } from "@/sanity/fetch-faq";
import { getHomeContentForPage } from "@/sanity/fetch-home";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getFaqContentForPage();
  const fallback = buildGpmPageMetadata("/faq/");
  const title = content.seo?.metaTitle?.trim() || (typeof fallback.title === "string" ? fallback.title : undefined);
  const description =
    content.seo?.metaDescription?.trim() ||
    (typeof fallback.description === "string" ? fallback.description : undefined);

  if (!title || !description) return fallback;

  return buildCanonicalPageMetadata({
    path: "/faq/",
    title,
    description,
  });
}

export default async function FaqPageRoute() {
  const [home, faq] = await Promise.all([getHomeContentForPage(), getFaqContentForPage()]);
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${buildCanonicalUrl("/faq/")}#faq`,
    mainEntity: faq.categories.flatMap((category) =>
      category.faqs.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    ),
  };

  return (
    <>
      <StructuredData data={faqSchema} />
      <FaqPage socialLinks={home.socialLinks} content={faq} />
    </>
  );
}
