import { HomePageWithContent } from "@/components/home/home-page-with-content";
import { StructuredData } from "@/components/seo/structured-data";
import { BUSINESS, DEFAULT_SOCIAL_LINKS } from "@/lib/business";
import { buildGpmPageMetadata } from "@/lib/gpm-sitemap-seo";
import { HOME_FAQ_CATEGORIES } from "@/lib/home-faq-section-data";
import { buildFaqPageSchema, buildLocalBusinessSchema } from "@/lib/local-business-schema";
import { buildCanonicalUrl } from "@/lib/site-url";
import { getHomeContentForPage } from "@/sanity/fetch-home";

export const metadata = buildGpmPageMetadata("/");

/** Always refetch home + Sanity merge so CMS edits (e.g. FAQs) show without relying on stale static shell. */
export const dynamic = "force-dynamic";

export default async function Home() {
  const home = await getHomeContentForPage();
  const homepageUrl = buildCanonicalUrl("/");
  const logoUrl = buildCanonicalUrl(BUSINESS.logoSrc);
  const sameAs = DEFAULT_SOCIAL_LINKS.map((link) => link.href);
  const faqItems = HOME_FAQ_CATEGORIES.flatMap((category) => category.faqs);

  const organizationGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${homepageUrl}#organization`,
        name: BUSINESS.nameFull,
        url: homepageUrl,
        email: BUSINESS.email,
        description: BUSINESS.description,
        logo: logoUrl,
        areaServed: [{ "@type": "State", name: "Idaho" }, { "@type": "State", name: "Arizona" }],
        sameAs,
      },
      {
        "@type": "WebSite",
        "@id": `${homepageUrl}#website`,
        url: homepageUrl,
        name: BUSINESS.nameFull,
        publisher: { "@id": `${homepageUrl}#organization` },
      },
      {
        "@type": "WebPage",
        "@id": `${homepageUrl}#webpage`,
        url: homepageUrl,
        name: BUSINESS.nameFull,
        isPartOf: { "@id": `${homepageUrl}#website` },
        about: { "@id": `${homepageUrl}#organization` },
      },
    ],
  };

  return (
    <>
      <StructuredData data={organizationGraph} />
      <StructuredData data={buildLocalBusinessSchema({ pagePath: "/", area: "home" })} />
      <StructuredData data={buildFaqPageSchema("/", faqItems)} />
      <HomePageWithContent value={home} />
    </>
  );
}
