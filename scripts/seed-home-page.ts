import { getCliClient } from "sanity/cli";
import { getStaticHomeContent } from "../src/components/home/site-data";
import type { HomePageCopy } from "../src/lib/home-page-copy";

type HomePageDoc = {
  _id: string;
  _type: "homePage";
  title: string;
  pageCopy: HomePageCopy;
  navItems: string[];
  trustBarItems: string[];
  services: Array<{
    _key: string;
    name: string;
    blurb: string;
    image: string;
    hoverImage: string;
    cardIcon: string;
  }>;
  servicesCarousel: Array<{
    _key: string;
    name: string;
    image: string;
  }>;
  whyChooseUs: Array<{
    _key: string;
    title: string;
    body: string;
    icon: string;
  }>;
  processSteps: Array<{
    _key: string;
    step: string;
    title: string;
    body: string;
    icon: string;
  }>;
  googleReviews: Array<{
    _key: string;
    id: string;
    name: string;
    quote: string;
    image: string;
  }>;
  faqs: Array<{
    _key: string;
    question: string;
    answer: string;
  }>;
  socialLinks: Array<{
    _key: string;
    label: string;
    href: string;
  }>;
};

function makeKey(prefix: string, idx: number): string {
  return `${prefix}-${String(idx + 1).padStart(2, "0")}`;
}

function withKeys<T extends Record<string, unknown>>(
  items: T[],
  prefix: string,
): Array<T & { _key: string }> {
  return items.map((item, idx) => ({
    _key: makeKey(prefix, idx),
    ...item,
  }));
}

function buildPageCopy(copy: HomePageCopy): HomePageCopy & {
  heroTrustSignals: Array<HomePageCopy["heroTrustSignals"][number] & { _key: string }>;
  heroTrustStripLogos: Array<HomePageCopy["heroTrustStripLogos"][number] & { _key: string }>;
} {
  return {
    ...copy,
    heroTrustSignals: withKeys(copy.heroTrustSignals, "hero-stat"),
    heroTrustStripLogos: withKeys(copy.heroTrustStripLogos, "trust-logo"),
  };
}

async function main() {
  const client = getCliClient({ apiVersion: "2024-01-01" });
  const content = getStaticHomeContent();

  const existing = await client.fetch<{ _id: string } | null>(
    '*[_type == "homePage"] | order(_updatedAt desc)[0]{_id}',
  );
  const docId = existing?._id ?? "homePage";

  const doc: HomePageDoc = {
    _id: docId,
    _type: "homePage",
    title: "Home",
    pageCopy: buildPageCopy(content.copy),
    navItems: content.navItems,
    trustBarItems: content.trustBarItems,
    services: content.services.map((item, idx) => {
      const { href: _href, ...rest } = item;
      return {
        _key: makeKey("service", idx),
        ...rest,
      };
    }),
    servicesCarousel: content.servicesCarousel.map((item, idx) => ({
      _key: makeKey("carousel", idx),
      ...item,
    })),
    whyChooseUs: content.whyChooseUs.map((item, idx) => ({
      _key: makeKey("why", idx),
      ...item,
    })),
    processSteps: content.processSteps.map((item, idx) => ({
      _key: makeKey("process", idx),
      ...item,
    })),
    googleReviews: content.googleReviews.map((item, idx) => ({
      _key: makeKey("review", idx),
      ...item,
    })),
    faqs: content.faqs.map((item, idx) => ({
      _key: makeKey("faq", idx),
      ...item,
    })),
    socialLinks: content.socialLinks.map((item, idx) => ({
      _key: makeKey("social", idx),
      ...item,
    })),
  };

  await client.createOrReplace(doc);
  console.log(`Seeded Sanity homePage document: ${docId}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
