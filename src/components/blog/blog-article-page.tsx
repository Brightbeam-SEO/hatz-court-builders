import Link from "next/link";
import { BlogHeroBand } from "@/components/blog/blog-hero-band";
import { BlogArticleSidebar, type BlogArticleAuthor } from "@/components/blog/blog-article-sidebar";
import { BlogArticleToc } from "@/components/blog/blog-article-toc";
import { BlogMarkdownArticle } from "@/components/blog/blog-markdown-article";
import { BlogRecommendedPosts } from "@/components/blog/blog-recommended-posts";
import { BlogReviewsFeaturedCard } from "@/components/blog/blog-reviews-featured-card";
import { getBlogPostPathFromPost } from "@/lib/blog-categories";
import type { BlogPost } from "@/lib/blog-types";
import type { SocialLink } from "@/lib/home-content";
import { PageHeroCtaButtons } from "@/components/layout/page-hero-cta-buttons";
import { SiteBreadcrumbs } from "@/components/layout/site-breadcrumbs";
import { SiteFooterRegion } from "@/components/layout/site-footer-region";
import { SiteHeader } from "@/components/layout/site-header";
import { BlogArticleLeadCta } from "@/components/blog/blog-article-lead-cta";
import { BUSINESS } from "@/lib/business";

function authorForPost(post: BlogPost): BlogArticleAuthor | null {
  if (post.layoutTemplate === "fullArticle") {
    return {
      name: BUSINESS.nameShort,
      bio: `${BUSINESS.nameShort} builds custom tennis, basketball, pickleball, and multi-use courts throughout Idaho and Arizona.`,
    };
  }
  return null;
}

export function BlogArticlePage({
  post,
  slug,
  socialLinks,
  recommendedPosts,
}: {
  post: BlogPost;
  slug: string;
  socialLinks: SocialLink[];
  recommendedPosts: BlogPost[];
}) {
  const toc = post.tocItems ?? [];
  const author = authorForPost(post);
  const bodyMarkdown = post.bodyMarkdown?.trim() ?? "";

  return (
    <div className="min-h-screen bg-zen-espresso text-white light:bg-transparent light:text-zen-espresso">
      <header className="relative z-[200] isolate min-h-0 overflow-x-clip bg-zen-espresso text-white light:bg-transparent light:text-zen-espresso">
        <SiteHeader anchorBase="/" />
      </header>

      <main className="bg-zen-espresso pb-16 light:bg-transparent">
        <SiteBreadcrumbs />
        <BlogHeroBand imageSrc={post.image} imageAlt={post.imageAlt}>
          <div className="min-w-0 w-full max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-wide text-white/75">Blog</p>
            <h1 className="mt-2 font-heading text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl lg:text-[2.75rem] lg:leading-[1.1]">
              {post.title}
            </h1>
            {post.subtitle ? (
              <p className="mt-3 max-w-2xl text-sm font-medium text-white/90 md:text-base">{post.subtitle}</p>
            ) : null}
            <PageHeroCtaButtons />
          </div>
        </BlogHeroBand>

        <section className="section-pad bg-zen-espresso text-white light:bg-transparent light:text-zen-espresso">
          <div className="shell">
            <div className="mx-auto w-full max-w-6xl">
              <div className="grid grid-cols-1 items-start gap-10 border-t border-white/10 pt-8 light:border-slate-200 lg:grid-cols-[minmax(0,1fr)_17.5rem] lg:gap-12 xl:grid-cols-[minmax(0,1fr)_19rem]">
                <article className="min-w-0 lg:col-start-1 lg:row-start-1">
                  {toc.length > 0 ? (
                    <div className="mb-8 lg:hidden">
                      <BlogArticleToc toc={toc} panelId="blog-toc-panel-mobile" />
                    </div>
                  ) : null}
                  {bodyMarkdown ? (
                    <BlogMarkdownArticle markdown={bodyMarkdown} />
                  ) : (
                    <p className="text-base text-white/70 light:text-zen-taupe">
                      Add article content in Sanity (Article body field) for this post.
                    </p>
                  )}
                </article>

                <aside className="flex min-w-0 flex-col gap-8 lg:col-start-2 lg:row-start-1 lg:self-start">
                  <BlogArticleSidebar
                    path={getBlogPostPathFromPost(post)}
                    shareTitle={post.title}
                    toc={toc}
                    author={author}
                  />
                </aside>
              </div>
            </div>
          </div>
        </section>

        <section className="section-pad bg-zen-espresso pt-0 text-white light:bg-transparent light:text-zen-espresso">
          <div className="shell">
            <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-stretch gap-8 md:grid-cols-2 md:gap-6 lg:gap-8">
              <div className="min-w-0">
                <BlogArticleLeadCta />
              </div>
              <div className="min-w-0">
                <BlogReviewsFeaturedCard />
              </div>
            </div>
          </div>
        </section>

        {recommendedPosts.length > 0 ? (
          <section className="section-pad bg-zen-espresso pt-0 text-white light:bg-transparent light:text-zen-espresso">
            <div className="shell">
              <div className="mx-auto w-full max-w-6xl">
                <BlogRecommendedPosts posts={recommendedPosts} bordered={false} />
              </div>
            </div>
          </section>
        ) : null}

      </main>

      <SiteFooterRegion socialLinks={socialLinks} />
    </div>
  );
}
