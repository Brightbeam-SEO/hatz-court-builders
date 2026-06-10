import { draftMode } from "next/headers";
import type { NextRequest } from "next/server";
import { redirect } from "next/navigation";
import { getBlogPostBySlug } from "@/lib/blog";
import { getBlogPostPathFromPost } from "@/lib/blog-categories";

/**
 * Enable draft mode then redirect to the blog post (or home).
 * Use from Sanity Studio “Open preview” or manually:
 * `/api/draft?secret=…&slug=massage-therapist-cost`
 *
 * Set `SANITY_PREVIEW_SECRET` in both Next.js and the Studio preview URL.
 */
export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");
  const slug = request.nextUrl.searchParams.get("slug");
  const expected = process.env.SANITY_PREVIEW_SECRET;

  if (!expected || secret !== expected) {
    return new Response("Invalid secret", { status: 401 });
  }

  const draft = await draftMode();
  draft.enable();

  if (slug && /^[a-z0-9-]+$/.test(slug)) {
    const post = await getBlogPostBySlug(slug);
    if (post) redirect(getBlogPostPathFromPost(post));
    redirect(`/blog/${slug}`);
  }

  redirect("/blog");
}
