import { revalidatePath } from "next/cache";
import type { NextRequest } from "next/server";
import groq from "groq";
import { getBlogPostsForPage } from "@/lib/blog";
import { getBlogPostPathFromPost } from "@/lib/blog-categories";
import { getSanityClient } from "@/sanity/client";

type SanityWebhookBody = {
  _type?: string;
  _id?: string;
  slug?: { current?: string };
  result?: { slug?: { current?: string }; _type?: string };
};

function slugFromWebhookPayload(body: SanityWebhookBody | null): string | undefined {
  const a = body?.slug?.current ?? body?.result?.slug?.current;
  if (typeof a === "string" && a.length > 0) return a;
  return undefined;
}

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");
  const expectedSecret = process.env.SANITY_REVALIDATE_SECRET;

  if (!expectedSecret || secret !== expectedSecret) {
    return Response.json({ ok: false, message: "Unauthorized" }, { status: 401 });
  }

  let body: SanityWebhookBody | null = null;
  try {
    body = (await request.json()) as SanityWebhookBody;
  } catch {
    body = null;
  }

  const type = body?._type;

  if (!type || type === "homePage") {
    revalidatePath("/");
  }

  if (type === "blogPost") {
    revalidatePath("/blog");
    const directSlug = slugFromWebhookPayload(body);
    if (directSlug) {
      revalidatePath(`/blog/${directSlug}`);
    }
    const posts = await getBlogPostsForPage();
    for (const post of posts) {
      revalidatePath(getBlogPostPathFromPost(post));
      revalidatePath(`/blog/${post.slug}`);
    }
  }

  if (type === "locationPage") {
    const directSlug = slugFromWebhookPayload(body);
    if (directSlug) {
      revalidatePath(`/${directSlug}`);
      revalidatePath(`/${directSlug}/`);
    }
    const client = getSanityClient();
    if (client) {
      const slugs = await client.fetch<string[]>(
        groq`*[_type == "locationPage" && defined(slug.current)].slug.current`,
      );
      for (const s of slugs) {
        revalidatePath(`/${s}`);
        revalidatePath(`/${s}/`);
      }
    }
  }

  return Response.json({
    ok: true,
    revalidated: true,
    type: type ?? "unknown",
    now: Date.now(),
  });
}
