import { getCliClient } from "sanity/cli";
import { additionalReviewsPageTestimonials } from "../src/lib/reviews-testimonials";
import { makeKey } from "./lib/sanity-seed-utils";

type ReviewsPageDoc = {
  _id: string;
  _type: "reviewsPage";
  title: string;
  slug: { _type: "slug"; current: string };
  intro: string;
  reviews: Array<{
    _key: string;
    name: string;
    quote: string;
    rating: number;
    image: string;
  }>;
  seo: {
    metaTitle: string;
    metaDescription: string;
  };
};

async function main() {
  const client = getCliClient({ apiVersion: "2024-01-01" });

  const existing = await client.fetch<{ _id: string } | null>(
    '*[_type == "reviewsPage" && slug.current == "reviews"] | order(_updatedAt desc)[0]{_id}',
  );
  const docId = existing?._id ?? "reviewsPage";

  const doc: ReviewsPageDoc = {
    _id: docId,
    _type: "reviewsPage",
    title: "Reviews",
    slug: { _type: "slug", current: "reviews" },
    intro:
      "Read what rental property owners say about Greenbelt Property Management in Meridian, Idaho and the Treasure Valley.",
    reviews: additionalReviewsPageTestimonials.map((item, idx) => ({
      _key: makeKey("review", idx),
      name: item.name,
      quote: item.quote,
      rating: 5,
      image: item.image,
    })),
    seo: {
      metaTitle: "Reviews | Greenbelt Property Management",
      metaDescription:
        "Read what rental property owners say about Greenbelt Property Management in Meridian, Idaho and the Treasure Valley.",
    },
  };

  await client.createOrReplace(doc);
  console.log(`Seeded Sanity reviewsPage document: ${docId} (${doc.reviews.length} reviews)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
