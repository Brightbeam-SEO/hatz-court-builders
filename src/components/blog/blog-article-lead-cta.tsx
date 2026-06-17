import { BlogReviewsFeaturedCard } from "@/components/blog/blog-reviews-featured-card";
import { HomeContactSection } from "@/components/home/home-contact-section";
import { PageHeroCtaButtons } from "@/components/layout/page-hero-cta-buttons";
import { blogPanelLeadCtaClass } from "@/lib/blog-ui";

const DEFAULT_ARTICLE_LEAD = {
  title: "Get A Free Court Estimate",
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

export function BlogBookingStrip({ showLead = true }: { showLead?: boolean }) {
  return (
    <>
      {showLead ? (
        <section className="relative overflow-hidden pb-16 pt-24 md:pb-24 md:pt-32">
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
      ) : null}

      <div className="relative left-1/2 -mb-16 w-screen max-w-[100vw] -translate-x-1/2">
        <HomeContactSection formName="Blog booking contact section" />
      </div>
    </>
  );
}
