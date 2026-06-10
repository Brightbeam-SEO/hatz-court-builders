import type { Metadata } from "next";
import { FaqPage } from "@/components/faq/faq-page";
import { getFaqContentForPage } from "@/sanity/fetch-faq";
import { getHomeContentForPage } from "@/sanity/fetch-home";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getFaqContentForPage();
  return {
    title: content.seo?.metaTitle ?? "Massage FAQs | Local Expert Answers | Zen Day Spa",
    description:
      content.seo?.metaDescription ??
      "Find answers to common massage questions, including session types, benefits, pricing, and what to expect at Zen Day Spa.",
  };
}

export default async function FaqPageRoute() {
  const [home, faq] = await Promise.all([getHomeContentForPage(), getFaqContentForPage()]);
  return <FaqPage socialLinks={home.socialLinks} content={faq} />;
}
