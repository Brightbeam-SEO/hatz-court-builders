import type { GoogleReview } from "@/lib/home-content";

/** Curated client reviews for Hatz Court Builders. */
export const additionalReviewsPageTestimonials: GoogleReview[] = [
  {
    id: "review-marisa",
    name: "Marisa",
    quote:
      "We debated resurfacing our old tennis court for a while, and I'm so glad we did. Hatz Court Builders did an incredible job—the court looks amazing, plays great, and completely changed the feel of our backyard. I wouldn't hesitate to recommend them!",
    image: "/images/testimonials/marisa.png",
  },
  {
    id: "review-nikki-z",
    name: "Nikki Z",
    quote:
      "We are so happy with our new pickleball court in our backyard in Gilbert, AZ! The finished product looks amazing and we love the colors we chose. The team was friendly, quick to respond, and easy to work with from start to finish. It's great to support a local company that takes pride in their work. Highly recommend Hatz Court Builders!",
    image: "/images/testimonials/nikki-z.png",
  },
  {
    id: "review-taylor-giberson",
    name: "Taylor Giberson",
    quote:
      "I did a lot of research before choosing a contractor, and I'm glad I went with Hatz Court Builders. The process was smooth, the workmanship was excellent, and the pickleball court turned out even better than I expected. I highly recommend them!",
    image: "/images/testimonials/taylor-giberson.png",
  },
  {
    id: "review-brooke-redpath",
    name: "Brooke Redpath",
    quote:
      "We absolutely love our new multi-game court from Hatz Court Builders! It’s perfect for both pickleball and basketball and has completely transformed our backyard into a space our whole family can enjoy. The court turned out amazing, and the crew was fantastic—professional, friendly, and did a great job from start to finish. We couldn’t be happier with how it turned out!",
    image: "/images/testimonials/brooke-redpath.png",
  },
  {
    id: "review-joe-iaboni",
    name: "Joe Iaboni",
    quote:
      "We love our new multi-game court! My kids use it for basketball and I love having a dedicated space for pickleball. Being able to combine both sports into one beautiful court was exactly what our family wanted given the tight space we had. The finished product looks amazing, and the entire process was smooth and professional. Hatz Court Builders are the way to go!",
    image: "/images/testimonials/joe-iaboni.png",
  },
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
  "review-marisa",
  "review-nikki-z",
  "review-taylor-giberson",
  "review-brooke-redpath",
  "review-joe-iaboni",
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
