import { getCliClient } from "sanity/cli";
import { getStaticFaqPageContent } from "../src/components/faq/site-data";

type FaqPageDoc = {
  _id: string;
  _type: "faqPage";
  title: string;
  slug: { _type: "slug"; current: string };
  heroSubheading: string;
  categories: Array<{
    _key: string;
    id: string;
    label: string;
    faqs: Array<{
      _key: string;
      question: string;
      answer: string;
    }>;
  }>;
  seo: {
    metaTitle?: string;
    metaDescription?: string;
  };
};

function makeKey(prefix: string, idx: number): string {
  return `${prefix}-${String(idx + 1).padStart(2, "0")}`;
}

async function main() {
  const client = getCliClient({ apiVersion: "2024-01-01" });
  const content = getStaticFaqPageContent();

  const existing = await client.fetch<{ _id: string } | null>(
    '*[_type == "faqPage" && slug.current == "faq"] | order(_updatedAt desc)[0]{_id}',
  );
  const docId = existing?._id ?? "faqPage";

  const doc: FaqPageDoc = {
    _id: docId,
    _type: "faqPage",
    title: content.title,
    slug: { _type: "slug", current: content.slug },
    heroSubheading: content.heroSubheading,
    categories: content.categories.map((cat, catIdx) => ({
      _key: makeKey("cat", catIdx),
      id: cat.id,
      label: cat.label,
      faqs: cat.faqs.map((item, idx) => ({
        _key: makeKey(`${cat.id}-faq`, idx),
        question: item.question,
        answer: item.answer,
      })),
    })),
    seo: {
      metaTitle: content.seo?.metaTitle,
      metaDescription: content.seo?.metaDescription,
    },
  };

  await client.createOrReplace(doc);
  console.log(`Seeded Sanity faqPage document: ${docId}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
