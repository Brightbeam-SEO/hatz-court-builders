import { notFound, redirect } from "next/navigation";
import { getBlogPostBySlug, getBlogPostsForPage } from "@/lib/blog";
import { getBlogPostPath, isBlogCategorySlug } from "@/lib/blog-categories";

type Props = { params: Promise<{ category: string; slug: string }> | { category: string; slug: string } };

export const dynamicParams = true;

export async function generateStaticParams() {
  const posts = await getBlogPostsForPage();
  return posts.map((p) => ({ category: p.category, slug: p.slug }));
}

/** Legacy `/{category}/{slug}/` URLs redirect to `/blog/{slug}/`. */
export default async function LegacyCategoryBlogRedirect({ params }: Props) {
  const { category, slug } = params instanceof Promise ? await params : params;
  if (!isBlogCategorySlug(category)) notFound();
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();
  redirect(getBlogPostPath(slug));
}
