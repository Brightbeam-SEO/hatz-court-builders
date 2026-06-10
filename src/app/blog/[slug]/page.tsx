import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { BlogArticlePage } from "@/components/blog/blog-article-page";
import { BlogHeroBand } from "@/components/blog/blog-hero-band";
import { getBlogPostPath } from "@/lib/blog-categories";
import { buildGpmBlogPageMetadata, GPM_BLOG_SEO } from "@/lib/gpm-sitemap-seo";
import {
  BLOG_SLUG_ALIASES,
  getBlogPostBySlug,
  getBlogPostsForPage,
  selectMostRecentPostsExcluding,
} from "@/lib/blog";
import { BUSINESS } from "@/lib/business";
import { PageHeroCtaButtons } from "@/components/layout/page-hero-cta-buttons";
import { SiteBreadcrumbs } from "@/components/layout/site-breadcrumbs";
import { SiteFooterRegion } from "@/components/layout/site-footer-region";
import { SiteHeader } from "@/components/layout/site-header";
import { getHomeContentForPage } from "@/sanity/fetch-home";

type Props = { params: Promise<{ slug: string }> | { slug: string } };

export const dynamicParams = true;

export async function generateStaticParams() {
  const posts = await getBlogPostsForPage();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params instanceof Promise ? await params : params;
  const fromLive = buildGpmBlogPageMetadata(slug);
  if (GPM_BLOG_SEO[slug]) return fromLive;

  const post = await getBlogPostBySlug(slug);
  if (!post) return { title: "Article | Greenbelt Property Management" };
  const title = post.metaTitle ?? `${post.title} | Greenbelt Property Management`;
  const description = post.metaDescription ?? post.excerpt;
  return { title, description };
}

export default async function BlogArticleRoute({ params }: Props) {
  const { slug } = params instanceof Promise ? await params : params;

  const canonicalSlug = BLOG_SLUG_ALIASES[slug];
  if (canonicalSlug) {
    redirect(getBlogPostPath(canonicalSlug));
  }

  const [post, home, allPosts] = await Promise.all([
    getBlogPostBySlug(slug),
    getHomeContentForPage(),
    getBlogPostsForPage(),
  ]);
  if (!post) notFound();

  const isFullArticle =
    post.layoutTemplate === "fullArticle" && Boolean(post.bodyMarkdown?.trim());

  if (isFullArticle) {
    const recommendedPosts = selectMostRecentPostsExcluding(allPosts, slug, 3);
    return (
      <BlogArticlePage
        post={post}
        slug={slug}
        socialLinks={home.socialLinks}
        recommendedPosts={recommendedPosts}
      />
    );
  }

  const dateLabel = new Date(post.publishedAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="min-h-screen bg-zen-espresso text-white light:bg-transparent light:text-zen-espresso">
      <header className="relative z-[200] isolate min-h-0 overflow-x-clip bg-zen-espresso text-white light:bg-transparent light:text-zen-espresso">
        <SiteHeader anchorBase="/" />
      </header>

      <main className="bg-zen-espresso pb-16 light:bg-transparent">
        <SiteBreadcrumbs />
        <BlogHeroBand imageSrc={post.image} imageAlt={post.imageAlt}>
          <div className="min-w-0 w-full max-w-3xl">
            <Link
              href="/blog"
              className="text-sm font-semibold text-zen-sage transition hover:text-zen-gold light:text-white/90 light:hover:text-white"
            >
              ← Back to blog
            </Link>
            <p className="mt-4 text-sm text-white/80">{dateLabel}</p>
            <h1 className="mt-2 font-heading text-3xl font-bold leading-tight text-white md:text-4xl">
              {post.title}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-white/90">{post.excerpt}</p>
            <PageHeroCtaButtons />
          </div>
        </BlogHeroBand>

        <article className="section-pad bg-zen-espresso pb-8 light:bg-transparent">
          <div className="shell max-w-3xl">
            <div className="mt-10 space-y-4 text-base leading-7 text-white/90 light:text-zen-taupe">
              <p>
                Full article content will load here from your CMS when connected. The route and
                metadata are already wired for each slug.
              </p>
            </div>
          </div>
        </article>
      </main>

      <SiteFooterRegion socialLinks={home.socialLinks} />
    </div>
  );
}
