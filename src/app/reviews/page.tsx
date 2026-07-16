import { ReviewsPage } from "@/components/reviews/reviews-page";
import { HomeContentProvider } from "@/components/home/home-content-context";
import { buildGpmPageMetadata } from "@/lib/gpm-sitemap-seo";
import { allReviewsPageTestimonials } from "@/lib/reviews-testimonials";
import { getHomeContentForPage } from "@/sanity/fetch-home";

export const dynamic = "force-dynamic";

export const metadata = buildGpmPageMetadata("/reviews/");

export default async function ReviewsPageRoute() {
  const home = await getHomeContentForPage();
  const testimonials = allReviewsPageTestimonials(home.googleReviews);

  return (
    <HomeContentProvider value={home}>
      <ReviewsPage socialLinks={home.socialLinks} testimonials={testimonials} />
    </HomeContentProvider>
  );
}
