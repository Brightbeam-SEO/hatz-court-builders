import Image from "next/image";
import Link from "next/link";
import { getBlogPostPathFromPost } from "@/lib/blog-categories";
import type { BlogPost } from "@/lib/blog-types";
import { blogPanelCardClass } from "@/lib/blog-ui";

function formatCardDate(iso: string) {
  return new Date(iso)
    .toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    })
    .toUpperCase();
}

function RecommendedPostCard({ post }: { post: BlogPost }) {
  return (
    <article className={`${blogPanelCardClass} flex h-full flex-col ring-1 ring-white/10 light:ring-slate-200/50`}>
      <Link href={getBlogPostPathFromPost(post)} className="relative block aspect-[16/10] w-full shrink-0 overflow-hidden">
        <Image
          src={post.image}
          alt={post.imageAlt}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </Link>
      <div className="flex flex-1 flex-col px-6 py-7 sm:px-8 sm:py-8">
        <time
          className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400 light:text-zen-taupe"
          dateTime={post.publishedAt}
        >
          {formatCardDate(post.publishedAt)}
        </time>
        <h3 className="mt-3 font-heading text-lg font-bold leading-snug text-white light:text-zen-espresso sm:text-xl">
          <Link href={getBlogPostPathFromPost(post)} className="transition hover:text-zen-sage light:hover:text-zen-crimson">
            {post.title}
          </Link>
        </h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-400 light:text-zen-taupe sm:text-[15px] sm:leading-7">
          {post.excerpt}
        </p>
        <Link
          href={getBlogPostPathFromPost(post)}
          className="mt-6 inline-flex font-heading text-sm font-bold text-white transition hover:text-zen-sage light:text-zen-espresso light:hover:text-zen-crimson"
        >
          Read article →
        </Link>
      </div>
    </article>
  );
}

export function BlogRecommendedPosts({
  posts,
  className = "",
  bordered = true,
}: {
  posts: BlogPost[];
  className?: string;
  /** When false, omits top border (embedded in article layout). */
  bordered?: boolean;
}) {
  if (posts.length === 0) return null;

  const borderClass = bordered
    ? "border-t border-white/10 pt-10 light:border-slate-200"
    : "pt-2";

  return (
    <section
      className={`${borderClass} bg-zen-espresso text-white light:bg-transparent light:text-zen-espresso ${className}`.trim()}
      aria-labelledby="recommended-posts-heading"
    >
      <h2
        id="recommended-posts-heading"
        className="font-heading text-2xl font-bold tracking-tight text-white light:text-zen-espresso sm:text-3xl"
      >
        Recommended Posts
      </h2>
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {posts.map((post) => (
          <RecommendedPostCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
