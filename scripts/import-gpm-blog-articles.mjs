/**
 * One-off: fetch live greenbeltpm.com blog posts → markdown + images.
 * Run: node scripts/import-gpm-blog-articles.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

const POSTS = [
  {
    slug: "top-property-management-services-in-idaho-what-you-need-to-know",
    url: "https://greenbeltpm.com/top-property-management-services-in-idaho-what-you-need-to-know/",
    imageFile: "top-property-management-services-idaho.jpg",
    imageUrl:
      "https://greenbeltpm.com/wp-content/uploads/2026/02/pexels-jakubzerdzicki-31424880-1024x683.jpg",
    imageAlt: "Property Management Service",
  },
  {
    slug: "expert-property-management-in-boise-id-your-complete-guide",
    url: "https://greenbeltpm.com/expert-property-management-in-boise-id-your-complete-guide/",
    imageFile: "expert-property-management-boise-id.jpg",
    imageUrl:
      "https://greenbeltpm.com/wp-content/uploads/2026/02/pexels-sora-shimazaki-5668501-1024x683.jpg",
    imageAlt: "Expert property management in Boise, Idaho",
  },
  {
    slug: "what-to-look-for-in-property-management-services-in-meridian-id",
    url: "https://greenbeltpm.com/what-to-look-for-in-property-management-services-in-meridian-id/",
    imageFile: "property-management-services-meridian-id.jpg",
    imageUrl:
      "https://greenbeltpm.com/wp-content/uploads/2026/02/pexels-kindelmedia-7578882-1024x577.jpg",
    imageAlt: "Property management services in Meridian, Idaho",
  },
];

function slugifyId(text) {
  return text
    .replace(/&[^;]+;/g, "")
    .replace(/<[^>]+>/g, "")
    .replace(/['']/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

function decodeHtml(text) {
  return text
    .replace(/&#8217;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#038;/g, "&")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&nbsp;/g, " ");
}

function stripTags(html) {
  return decodeHtml(html.replace(/<[^>]+>/g, "").trim());
}

function inlineToMarkdown(html) {
  let s = html;
  s = s.replace(/<strong><a\s+href="([^"]+)"[^>]*>([\s\S]*?)<\/a><\/strong>/gi, "**[$2]($1)**");
  s = s.replace(/<a\s+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi, "[$2]($1)");
  s = s.replace(/<strong>([\s\S]*?)<\/strong>/gi, "**$1**");
  s = s.replace(/<em>([\s\S]*?)<\/em>/gi, "*$1*");
  return stripTags(s)
    .replace(/(\S)\*\*\[/g, "$1 **[")
    .replace(/\*\*\s+\[/g, "**[")
    .replace(/\]\s+\*\*/g, "]**");
}

function extractPostContent(html) {
  const marker = 'data-widget_type="theme-post-content.default"';
  const startIdx = html.indexOf(marker);
  if (startIdx === -1) throw new Error("theme-post-content not found");
  const slice = html.slice(startIdx);
  const endMarker = 'data-widget_type="post-navigation.default"';
  const endIdx = slice.indexOf(endMarker);
  const block = endIdx === -1 ? slice : slice.slice(0, endIdx);
  return block;
}

function htmlToMarkdown(htmlBlock, localImagePath, imageAlt) {
  const lines = [];
  const re =
    /<figure class="wp-block-image">[\s\S]*?<\/figure>|<ul class="wp-block-list">([\s\S]*?)<\/ul>|<h([234]) class="wp-block-heading">([\s\S]*?)<\/h\2>|<p class="wp-block-paragraph">([\s\S]*?)<\/p>/gi;

  let m;
  let firstImageDone = false;
  while ((m = re.exec(htmlBlock)) !== null) {
    if (m[0].startsWith("<figure")) {
      if (!firstImageDone) {
        lines.push(`<img src="${localImagePath}" alt="${imageAlt}" />`, "");
        firstImageDone = true;
      }
      continue;
    }
    const listHtml = m[1];
    const level = m[2];
    const headingHtml = m[3];
    const paraHtml = m[4];

    if (listHtml !== undefined && m[0].startsWith("<ul")) {
      const items = [...listHtml.matchAll(/<li>([\s\S]*?)<\/li>/gi)].map((li) =>
        `- ${inlineToMarkdown(li[1]).replace(/<br\s*\/?>/gi, "").trim()}`,
      );
      if (items.length) lines.push(items.join("\n"), "");
      continue;
    }

    if (level) {
      const text = inlineToMarkdown(headingHtml).replace(/\*\*/g, "").trim();
      if (!text) continue;
      const id = slugifyId(text);
      const tag = level === "4" ? "h3" : level === "3" ? "h3" : "h2";
      lines.push(`<${tag} id="${id}">${text}</${tag}>`, "");
    } else if (paraHtml !== undefined) {
      const text = inlineToMarkdown(paraHtml);
      if (!text) continue;
      lines.push(text, "");
    }
  }

  return lines.join("\n").trim() + "\n";
}

function extractToc(markdown) {
  const toc = [];
  const re = /<h([23])\s+id="([^"]+)"[^>]*>([\s\S]*?)<\/h\1>/gi;
  let m;
  while ((m = re.exec(markdown)) !== null) {
    const level = Number(m[1]);
    const label = m[3].replace(/\*\*/g, "").trim();
    if (/^conclusion$/i.test(label)) continue;
    toc.push({ id: m[2], label, level });
  }
  return toc;
}

async function downloadImage(url, dest) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to download ${url}: ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, buf);
  console.log(`  image → ${path.relative(ROOT, dest)}`);
}

async function main() {
  const blogImgDir = path.join(ROOT, "public/images/blog");
  const contentDir = path.join(ROOT, "content/blog");
  fs.mkdirSync(blogImgDir, { recursive: true });
  fs.mkdirSync(contentDir, { recursive: true });

  const metaOut = [];

  for (const post of POSTS) {
    console.log(`\n${post.slug}`);
    const res = await fetch(post.url);
    if (!res.ok) throw new Error(`Fetch failed ${post.url}: ${res.status}`);
    const html = await res.text();

    const titleMatch = html.match(/<h1[^>]*class="[^"]*elementor-heading-title[^"]*"[^>]*>([\s\S]*?)<\/h1>/i);
    const title = titleMatch ? stripTags(titleMatch[1]) : post.slug;

    const metaTitleMatch = html.match(/<title>([^<]+)<\/title>/i);
    const metaTitle = metaTitleMatch ? stripTags(metaTitleMatch[1]) : title;

    const metaDescMatch = html.match(/<meta\s+name="description"\s+content="([^"]+)"/i);
    const metaDescription = metaDescMatch ? decodeHtml(metaDescMatch[1]) : "";

    const dateMatch = html.match(/"datePublished":"([^"]+)"/);
    const publishedAt = dateMatch
      ? new Date(dateMatch[1]).toISOString()
      : "2026-02-03T12:00:00.000Z";

    const imageDest = path.join(blogImgDir, post.imageFile);
    await downloadImage(post.imageUrl, imageDest);

    const block = extractPostContent(html);
    const localImage = `/images/blog/${post.imageFile}`;
    const markdown = htmlToMarkdown(block, localImage, post.imageAlt);
    const mdPath = path.join(contentDir, `${post.slug}-body.md`);
    fs.writeFileSync(mdPath, markdown, "utf8");
    console.log(`  body → ${path.relative(ROOT, mdPath)} (${markdown.length} chars)`);

    const firstPara = markdown.split("\n\n").find((l) => l && !l.startsWith("<") && !l.startsWith("!"));
    const excerptRaw = (firstPara ?? "")
      .replace(/\[[^\]]*]\([^)]*\)/g, "")
      .replace(/\*\*/g, "")
      .trim();
    const excerpt =
      excerptRaw.length > 200 ? `${excerptRaw.slice(0, 197).trimEnd()}…` : excerptRaw;
    metaOut.push({
      slug: post.slug,
      title,
      metaTitle,
      metaDescription,
      publishedAt,
      excerpt,
      image: localImage,
      imageAlt: post.imageAlt,
      mdFile: `${post.slug}-body.md`,
      tocItems: extractToc(markdown),
    });
  }

  fs.writeFileSync(
    path.join(ROOT, "scripts/.import-gpm-blog-meta.json"),
    JSON.stringify(metaOut, null, 2),
    "utf8",
  );
  console.log("\nWrote scripts/.import-gpm-blog-meta.json");

  const tsLines = [
    "/** Auto-generated by scripts/import-gpm-blog-articles.mjs */",
    'import type { BlogPost } from "@/lib/blog-types";',
    "",
    "type FallbackDef = Omit<BlogPost, \"bodyMarkdown\"> & {",
    "  mdFile: string;",
    "  tocItems: NonNullable<BlogPost[\"tocItems\"]>;",
    "};",
    "",
    "export const GPM_IMPORTED_BLOG_FALLBACK_DEFS: FallbackDef[] = ",
    JSON.stringify(
      metaOut.map((m) => ({
        id: `local-fallback-${m.slug}`,
        slug: m.slug,
        category: "property-management",
        title: m.title,
        subtitle: undefined,
        excerpt: m.excerpt,
        metaTitle: m.metaTitle,
        metaDescription: m.metaDescription,
        image: m.image,
        imageAlt: m.imageAlt,
        publishedAt: m.publishedAt,
        featured: false,
        layoutTemplate: "fullArticle",
        mdFile: m.mdFile,
        tocItems: m.tocItems,
      })),
      null,
      2,
    ),
    ";",
    "",
  ];
  const tsPath = path.join(ROOT, "src/lib/gpm-imported-blog-fallback.ts");
  fs.writeFileSync(tsPath, tsLines.join("\n"), "utf8");
  console.log(`Wrote ${path.relative(ROOT, tsPath)}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
