import type { GoogleReview } from "@/lib/home-content";

/** Curated Google reviews for Greenbelt Property Management. */
export const additionalReviewsPageTestimonials: GoogleReview[] = [
  {
    id: "review-loryssa-quintero",
    name: "Loryssa Quintero",
    quote:
      "We've had a great experience working with Greenbelt Property Management. Their team is professional, communicative, and truly cares about maintaining their properties to a high standard. It's always a smooth and positive process working alongside them—highly recommend!",
    image: "/images/testimonials/loryssa-quintero.png",
  },
  {
    id: "review-joey-virrueta",
    name: "Joey Virrueta",
    quote:
      "Brandon is very responsive in text and was easy to deal with. He was helpful every step of the way.",
    image: "/images/testimonials/joey-virrueta.png",
  },
  {
    id: "review-zola-grief",
    name: "Zola Grief and Bereavement Coaching",
    quote:
      "Brandon and Julia have been wonderful. They respond to our questions and concerns in an extremely timely manner and have been so kind.",
    image: "/images/testimonials/zola-grief-bereavement-coaching.png",
  },
  {
    id: "review-baptiste-menon",
    name: "Baptiste Menon",
    quote:
      "Greenbelt Property Management, Brandon has been working on renting my property in Boise for a few months, his process is clear, simple, super professional, and super convenient. It's really a stress-free deal to let him handle all your property needs.",
    image: "/images/testimonials/baptiste-menon.png",
  },
  {
    id: "review-trevin-christensen",
    name: "Trevin Christensen",
    quote:
      "Been working with Brandon a short period of time, but I can tell you in that short period of time that he cares and pays attention to detail. Would definitely recommend this company to anyone who's looking for someone to take care of their properties.",
    image: "/images/testimonials/trevin-christensen.png",
  },
  {
    id: "review-mckall-cameron",
    name: "Mckall Cameron",
    quote:
      "Highly highly recommend working with Brandon for your next move in the Treasure Valley!! We rented a beautiful home and the process was simple, quick and my husband and I have felt so taken care of! Brandon even met us at the house on move in day with a personalized gift basket and a card!! Even better - no hidden fees and our expectations have been exceeded. Thank you Brandon and Julia 😃",
    image: "/images/testimonials/mckall-cameron.png",
  },
  {
    id: "review-mke-construction",
    name: "MKE Construction",
    quote:
      "Brandon is a prompt communicator and a pleasure to work with. He takes great pride in his properties and makes sure they are taken care of to the highest standard. I would definitely work with Brandon at Greenbelt Property Management Meridian again.",
    image: "/images/testimonials/mke-construction.png",
  },
  {
    id: "review-alex-mckean",
    name: "Alex McKean",
    quote:
      "Signing up with Brandon was a very easy process. We met at my property to discuss my needs and how he could help me. Brandon is very thorough in his assessment of the property and the current rental market. I really appreciate his flexibility for me to be as involved as I want to be. From day 1, I haven't had to worry about anything. He keeps me updated on what matters most to me on a consistent basis. I will definitely be recommending him and Greenbelt Property Management Meridian!!",
    image: "/images/testimonials/alex-mckean.png",
  },
];

const BLOG_SIDEBAR_FEATURED_REVIEW_IDS = [
  "review-loryssa-quintero",
  "review-mckall-cameron",
  "review-alex-mckean",
  "review-trevin-christensen",
  "review-baptiste-menon",
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
