import type { Metadata } from "next";
import { StructuredData } from "@/components/seo/structured-data";
import { FaqPage } from "@/components/faq/faq-page";
import { buildCanonicalPageMetadata, buildGpmPageMetadata } from "@/lib/gpm-sitemap-seo";
import { buildFaqPageSchema } from "@/lib/local-business-schema";
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
  const faqItems = faq.categories.flatMap((category) => category.faqs);
  const faqSchema = buildFaqPageSchema("/faq/", faqItems);

  return (
    <>
      <StructuredData data={faqSchema} />
      <FaqPage socialLinks={home.socialLinks} content={faq} />
    </>
  );
}
