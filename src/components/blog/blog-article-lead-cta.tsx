import { BlogReviewsFeaturedCard } from "@/components/blog/blog-reviews-featured-card";
import { HomeSectionGridDecor } from "@/components/home/home-section-grid-decor";
import { PageHeroCtaButtons } from "@/components/layout/page-hero-cta-buttons";
import { blogPanelLeadCtaClass } from "@/lib/blog-ui";

const DEFAULT_ARTICLE_LEAD = {
  title: "Request a Free Consultation",
  body: "Reach out today for a free consultation on your backyard or commercial court project in Idaho or Arizona.",
} as const;

export function BlogArticleLeadCta() {
  const lead = DEFAULT_ARTICLE_LEAD;
  return (
    <article className={blogPanelLeadCtaClass}>
      <h2 className="font-heading text-2xl font-bold text-white light:text-zen-espresso md:text-3xl">
        {lead.title}
      </h2>
      <p className="mt-3 text-base leading-7 text-white/85 light:text-zen-taupe">{lead.body}</p>
      <PageHeroCtaButtons onDark={false} secondaryClassName="blog-lead-cta-secondary" />
    </article>
  );
}

export function BlogBookingStrip() {
  return (
    <section className="section-pad relative overflow-hidden pt-0">
      <HomeSectionGridDecor placement="top-right" />
      <div className="shell relative z-10">
        <div className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 md:items-stretch md:gap-6 lg:gap-8">
          <div className="min-w-0">
            <BlogArticleLeadCta />
          </div>
          <div className="min-w-0">
            <BlogReviewsFeaturedCard />
          </div>
        </div>
      </div>
    </section>
  );
}
