import type { GoogleReview } from "@/lib/home-content";

/** Curated client reviews for Hatz Court Builders. */
export const additionalReviewsPageTestimonials: GoogleReview[] = [
  {
    id: "review-t-p",
    name: "T P",
    quote:
      "Hatz Court Builders transformed our backyard with an amazing cushioned acrylic pickleball court. The entire process was smooth from start to finish. Their team was professional and the quality of the court is outstanding. The cushioned surface makes it so much more comfortable to play on. We absolutely love having a professional-level court right at home and have already spent so much time enjoying it with family and friends. Hatz Court Builders does great work!",
    image: "/images/testimonials/t-p.png",
  },
  {
    id: "review-rj",
    name: "RJ",
    quote:
      "Hatz Court Builders did an outstanding job on a recent backyard tennis court project we collaborated on in Phoenix. As an interior designer, it's so important to work with contractors who are professional, reliable, and deliver quality results — and they exceeded expectations. The craftsmanship, communication, and attention to detail throughout the project were excellent. Most importantly, our client was thrilled with the finished court. They made us look great, and we look forward to working with them again. Highly recommend Hatz Court Builders for anyone looking to add a custom game court to their home!",
    image: "/images/testimonials/rj.png",
  },
  {
    id: "review-liana-viterbo",
    name: "Liana Viterbo",
    quote:
      "I didn't think my backyard in Fountain Hills had enough space for a pickleball court, but Hatz Court Builders proved me wrong. They designed and installed an acrylic court in a perfect spot that fits seamlessly into the yard. I now have plenty of room to play while still enjoying the rest of my outdoor space. The team was professional and great to work with throughout the entire process. Highly recommend!",
    image: "/images/testimonials/liana-viterbo.png",
  },
];

const BLOG_SIDEBAR_FEATURED_REVIEW_IDS = [
  "review-t-p",
  "review-rj",
  "review-liana-viterbo",
] as const;

export function blogSidebarFeaturedReviews(): GoogleReview[] {
  return BLOG_SIDEBAR_FEATURED_REVIEW_IDS.map((id) => {
    const r = additionalReviewsPageTestimonials.find((t) => t.id === id);
    if (!r) {
      throw new Error(`blogSidebarFeaturedReviews: missing review id "${id}"`);
    }
    return r;
  });
}

function dedupeReviews(reviews: GoogleReview[]): GoogleReview[] {
  const seen = new Set<string>();
  const unique: GoogleReview[] = [];
  for (const review of reviews) {
    const key =
      review.id?.trim() ||
      `${review.name.trim().toLowerCase()}|${review.quote.trim().toLowerCase().slice(0, 96)}`;
    if (seen.has(key)) continue;
    seen.add(key);
    unique.push(review);
  }
  return unique;
}

export function allReviewsPageTestimonials(googleReviews: GoogleReview[] | undefined | null): GoogleReview[] {
  return dedupeReviews([...(googleReviews ?? []), ...additionalReviewsPageTestimonials]);
}
