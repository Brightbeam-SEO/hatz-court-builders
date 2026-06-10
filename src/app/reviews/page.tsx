import type { Metadata } from "next";
import { ReviewsPage } from "@/components/reviews/reviews-page";
import { HomeContentProvider } from "@/components/home/home-content-context";
import { allReviewsPageTestimonials } from "@/lib/reviews-testimonials";
import { getHomeContentForPage } from "@/sanity/fetch-home";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Reviews | Hatz Court Builders",
  description:
    "Read what homeowners and facilities say about Hatz Court Builders court construction and resurfacing in Idaho and Arizona.",
};

export default async function ReviewsPageRoute() {
  const home = await getHomeContentForPage();
  const testimonials = allReviewsPageTestimonials(home.googleReviews);

  return (
    <HomeContentProvider value={home}>
      <ReviewsPage socialLinks={home.socialLinks} testimonials={testimonials} />
    </HomeContentProvider>
  );
}
