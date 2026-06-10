"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { getBlogIndexHref, getBlogPostPathFromPost } from "@/lib/blog-categories";
import type { BlogPost } from "@/lib/blog-types";
import type { SocialLink } from "@/lib/home-content";
import { BlogBookingStrip } from "@/components/blog/blog-article-lead-cta";
import { BlogHeroBand } from "@/components/blog/blog-hero-band";
import { HomeSectionGridDecor } from "@/components/home/home-section-grid-decor";
import { PageHeroCtaButtons } from "@/components/layout/page-hero-cta-buttons";
import { SiteBreadcrumbs } from "@/components/layout/site-breadcrumbs";
import { SiteFooterRegion } from "@/components/layout/site-footer-region";
import { SiteHeader } from "@/components/layout/site-header";
import { BUSINESS } from "@/lib/business";
import {
  BLOG_LOCATION_LABEL,
  blogLocationPillClass,
  blogPanelCardClass,
  blogPanelCardInteractiveClass,
  blogPostBodySurfaceClass,
} from "@/lib/blog-ui";
import { zenImageAlt } from "@/lib/zen-gallery-images";
import { zenPick } from "@/lib/zen-pick-gallery";

const BLOG_HERO_IMAGE = zenPick("spa treatment beds relaxation room");

function formatPostDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function LocationPill({ className = "" }: { className?: string }) {
  return (
    <span className={`${blogLocationPillClass} ${className}`.trim()}>{BLOG_LOCATION_LABEL}</span>
  );
}

function BlogFeaturedCard({ post }: { post: BlogPost }) {
  return (
    <article className={`${blogPanelCardInteractiveClass} flex min-h-0 flex-col`}>
      <Link href={getBlogPostPathFromPost(post)} className="relative block aspect-[16/10] shrink-0 overflow-hidden">
        <Image
          src={post.image}
          alt={post.imageAlt}
          fill
          className="object-cover transition duration-500 group-hover:scale-[1.03]"
          sizes="(max-width: 1024px) 100vw, 33vw"
        />
      </Link>
      <div className={`flex min-h-0 flex-1 flex-col p-5 sm:p-6 ${blogPostBodySurfaceClass}`}>
        <time
          className="text-xs font-medium uppercase tracking-wide text-white/60 light:text-zen-taupe"
          dateTime={post.publishedAt}
        >
          {formatPostDate(post.publishedAt)}
        </time>
        <h3 className="mt-2 font-heading text-lg font-semibold leading-snug text-white light:text-zen-espresso sm:text-xl">
          <Link
            href={getBlogPostPathFromPost(post)}
            className="transition hover:text-zen-sage light:hover:text-zen-crimson"
          >
            {post.title}
          </Link>
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-white/80 light:text-zen-taupe sm:text-base">
          {post.excerpt}
        </p>
        <Link
          href={getBlogPostPathFromPost(post)}
          className="mt-4 inline-flex text-sm font-semibold text-zen-sage transition hover:text-zen-gold light:text-zen-crimson light:hover:text-zen-crimson-hover"
        >
          Read article →
        </Link>
      </div>
    </article>
  );
}

function BlogRecentLead({ post }: { post: BlogPost }) {
  return (
    <article
      className={`${blogPanelCardClass} mb-10 grid gap-6 lg:mb-12 lg:grid-cols-2 lg:items-stretch lg:gap-0`}
    >
      <Link
        href={getBlogPostPathFromPost(post)}
        className="relative order-1 block min-h-[14rem] w-full lg:min-h-[22rem]"
      >
        <Image
          src={post.image}
          alt={post.imageAlt}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
        />
      </Link>
      <div
        className={`order-2 flex flex-col justify-center px-5 py-6 sm:px-8 sm:py-8 lg:px-10 lg:py-10 ${blogPostBodySurfaceClass}`}
      >
        <div className="flex flex-wrap items-center gap-2 gap-y-2">
          <time
            className="text-xs font-medium uppercase tracking-wide text-white/65 light:text-zen-taupe"
            dateTime={post.publishedAt}
          >
            {formatPostDate(post.publishedAt)}
          </time>
          <LocationPill />
        </div>
        <h3 className="mt-4 font-heading text-2xl font-bold leading-tight text-white light:text-zen-espresso sm:text-3xl md:text-[1.75rem] md:leading-snug lg:text-4xl">
          <Link
            href={getBlogPostPathFromPost(post)}
            className="transition hover:text-zen-sage light:hover:text-zen-crimson"
          >
            {post.title}
          </Link>
        </h3>
        <p className="mt-4 text-base leading-7 text-white/85 light:text-zen-taupe sm:text-lg">
          {post.excerpt}
        </p>
        <div className="mt-8 border-t border-white/15 pt-6 light:border-slate-200">
          <p className="font-heading text-base font-semibold text-white light:text-zen-espresso">
            {BUSINESS.nameShort}
          </p>
          <p className="mt-1 text-sm text-white/70 light:text-zen-taupe">Editorial team</p>
        </div>
      </div>
    </article>
  );
}

function BlogGridCard({ post }: { post: BlogPost }) {
  return (
    <article className={`${blogPanelCardInteractiveClass} flex min-h-0 flex-col`}>
      <Link href={getBlogPostPathFromPost(post)} className="relative block aspect-[4/3] shrink-0 overflow-hidden">
        <Image
          src={post.image}
          alt={post.imageAlt}
          fill
          className="object-cover transition duration-500 group-hover:scale-[1.03]"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </Link>
      <div className={`flex min-h-0 flex-1 flex-col p-4 sm:p-5 ${blogPostBodySurfaceClass}`}>
        <div className="flex flex-wrap items-center gap-2">
          <time
            className="text-[11px] font-medium uppercase tracking-wide text-white/60 light:text-zen-taupe"
            dateTime={post.publishedAt}
          >
            {formatPostDate(post.publishedAt)}
          </time>
          <LocationPill />
        </div>
        <h3 className="mt-3 font-heading text-base font-semibold leading-snug text-white light:text-zen-espresso sm:text-lg">
          <Link
            href={getBlogPostPathFromPost(post)}
            className="transition hover:text-zen-sage light:hover:text-zen-crimson"
          >
            {post.title}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-white/75 light:text-zen-taupe">
          {post.excerpt}
        </p>
      </div>
    </article>
  );
}

function BlogPagination({
  page,
  totalPages,
  interactive,
}: {
  page: number;
  totalPages: number;
  interactive: boolean;
}) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const base =
    "inline-flex min-h-[2.5rem] min-w-[2.5rem] items-center justify-center rounded-lg px-3 text-sm font-semibold transition";
  const inactiveNav =
    "cursor-not-allowed text-white/35 light:text-slate-400 pointer-events-none";
  const activeNav = "text-white hover:text-white light:text-zen-espresso light:hover:text-zen-espresso";
  const pageInactive = "text-white/80 hover:bg-white/10 light:text-zen-taupe light:hover:bg-slate-100";
  const pageActive =
    "border border-slate-200/80 bg-white text-zen-espresso shadow-sm light:border-slate-200 light:bg-white";

  const prevHref = page > 1 ? getBlogIndexHref({ page: page - 1 }) : undefined;
  const nextHref = page < totalPages ? getBlogIndexHref({ page: page + 1 }) : undefined;

  const prevEl =
    interactive && prevHref ? (
      <Link href={prevHref} scroll={false} className={`${base} gap-1 ${activeNav}`}>
        <span aria-hidden>‹</span>
        Previous
      </Link>
    ) : (
      <span className={`${base} gap-1 ${inactiveNav}`} aria-disabled>
        <span aria-hidden>‹</span>
        Previous
      </span>
    );

  const nextEl =
    interactive && nextHref ? (
      <Link href={nextHref} scroll={false} className={`${base} gap-1 ${activeNav}`}>
        Next
        <span aria-hidden>›</span>
      </Link>
    ) : (
      <span className={`${base} gap-1 ${inactiveNav}`} aria-disabled>
        Next
        <span aria-hidden>›</span>
      </span>
    );

  return (
    <nav
      className="mt-10 flex flex-wrap items-center justify-center gap-2 sm:gap-3"
      aria-label="Blog pagination"
    >
      {prevEl}
      <div className="flex flex-wrap items-center justify-center gap-1.5 px-2">
        {pages.map((p) => {
          const isCurrent = p === page;
          if (interactive) {
            const href = getBlogIndexHref({ page: p === 1 ? undefined : p });
            return isCurrent ? (
              <span
                key={p}
                className={`${base} ${pageActive}`}
                aria-current="page"
                aria-label={`Page ${p}`}
              >
                {p}
              </span>
            ) : (
              <Link key={p} href={href} scroll={false} className={`${base} ${pageInactive}`}>
                {p}
              </Link>
            );
          }
          return (
            <span
              key={p}
              className={`${base} ${isCurrent ? pageActive : `${pageInactive} ${inactiveNav}`}`}
              aria-disabled
            >
              {p}
            </span>
          );
        })}
      </div>
      {nextEl}
    </nav>
  );
}

function parseArchiveSearchParams(searchParams: URLSearchParams) {
  const rawPage = parseInt(searchParams.get("page") ?? "1", 10);
  const page = Number.isFinite(rawPage) && rawPage >= 1 ? rawPage : 1;
  return { page };
}

export function BlogPage({
  socialLinks,
  featuredPosts,
  archivePosts,
  gridPageSize,
  totalPostCount,
}: {
  socialLinks: SocialLink[];
  featuredPosts: BlogPost[];
  archivePosts: BlogPost[];
  gridPageSize: number;
  totalPostCount: number;
}) {
  const searchParams = useSearchParams();

  const { page } = useMemo(() => parseArchiveSearchParams(searchParams), [searchParams]);

  const recentPost = page === 1 ? (archivePosts[0] ?? null) : null;
  const others = page === 1 ? archivePosts.slice(1) : archivePosts;
  const totalPages = Math.max(1, Math.ceil(others.length / gridPageSize));
  const safePage = Math.min(page, totalPages);
  const gridPosts = others.slice((safePage - 1) * gridPageSize, safePage * gridPageSize);

  const paginationInteractive = archivePosts.length > 10 && totalPages > 1;
  const hasListContent = archivePosts.length > 0;

  return (
    <div className="min-h-screen bg-zen-espresso text-white light:bg-transparent light:text-zen-espresso">
      <header className="relative z-[200] isolate min-h-0 overflow-x-clip bg-zen-espresso text-white light:bg-transparent light:text-zen-espresso">
        <SiteHeader anchorBase="/" />
      </header>

      <main className="bg-zen-espresso pb-16 light:bg-transparent">
        <SiteBreadcrumbs />
        <BlogHeroBand imageSrc={BLOG_HERO_IMAGE} imageAlt={zenImageAlt(BLOG_HERO_IMAGE)}>
          <div className="min-w-0 w-full max-w-3xl">
            <h1 className="font-heading text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl">
              Blog
            </h1>
            <p className="mt-2 max-w-2xl text-sm font-medium text-white/90 md:text-base">
              Property management insights, rental tips, and Treasure Valley market updates for Meridian
              property owners and real estate investors.
            </p>
            <PageHeroCtaButtons align="start" />
          </div>
        </BlogHeroBand>

        {featuredPosts.length > 0 ? (
          <section className="section-pad relative overflow-hidden bg-zen-espresso pb-10 text-white light:bg-transparent light:text-zen-espresso lg:pb-12">
            <HomeSectionGridDecor placement="top-left-cards" />
            <div className="shell relative z-10">
              <h2 className="font-heading text-2xl font-bold md:text-3xl">
                <span className="text-white light:text-zen-espresso">Featured</span>
                <span className="text-white light:text-zen-espresso"> Articles</span>
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-white/75 light:text-zen-taupe sm:text-base">
                Helpful resources for property owners looking to simplify rental management and protect
                their investments.
              </p>
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                {featuredPosts.map((post) => (
                  <BlogFeaturedCard key={post.id} post={post} />
                ))}
              </div>
            </div>
          </section>
        ) : null}

        <section className="section-pad bg-zen-espresso pt-0 text-white light:bg-transparent light:text-zen-espresso">
          <div className="shell">
            <h2 className="font-heading text-2xl font-bold text-white light:text-zen-espresso md:text-3xl">
              All Articles
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-white/75 light:text-zen-taupe sm:text-base">
              Explore all our property management articles, rental tips, and Treasure Valley market
              insights for property owners and real estate investors.
            </p>
            {hasListContent ? (
              <div className="mt-8 sm:mt-10">
                {recentPost ? <BlogRecentLead post={recentPost} /> : null}
                {gridPosts.length > 0 ? (
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                    {gridPosts.map((post) => (
                      <BlogGridCard key={post.id} post={post} />
                    ))}
                  </div>
                ) : null}
                {totalPages > 1 ? (
                  <BlogPagination
                    page={safePage}
                    totalPages={totalPages}
                    interactive={paginationInteractive}
                  />
                ) : null}
              </div>
            ) : (
              <p className="mt-8 text-base text-white/70 light:text-zen-taupe">
                No articles yet. Publish posts in your CMS to populate this section.
              </p>
            )}
          </div>
        </section>

        <BlogBookingStrip />
      </main>

      <SiteFooterRegion socialLinks={socialLinks} />
    </div>
  );
}
