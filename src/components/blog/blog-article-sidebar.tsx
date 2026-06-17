"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useState, type ReactNode } from "react";
import { BlogArticleToc } from "@/components/blog/blog-article-toc";
import type { BlogArticleTocItem } from "@/components/blog/blog-article-types";
import { PAGE_HERO_CTA_SECONDARY_LABEL } from "@/components/layout/page-hero-cta-buttons";
import { SiteSocialIcon } from "@/components/layout/site-social-icon";
import { BUSINESS } from "@/lib/business";
import { gpmPick } from "@/lib/gpm-pick-gallery";

const HERO_WORDMARK_SRC = BUSINESS.wordmarkSrc;

const BLOG_SIDEBAR_CTA_IMAGE_SRC = gpmPick("pickleball court backyard modular tile");

const shareIconButtonClass =
  "group hero-glass-light inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-0 bg-zen-rice/90 text-zen-espresso ring-1 ring-zen-sand transition hover:ring-0 hover:bg-zen-crimson hover:text-white light:border light:border-zen-sand/40 light:ring-0 light:backdrop-blur-xl light:hover:bg-zen-crimson light:hover:text-white light:hover:border-zen-crimson/40";

/** Stable for SSR + client (never use `window` in render — avoids hydration mismatch on share hrefs). */
function canonicalArticleOrigin() {
  const raw = process.env.NEXT_PUBLIC_SITE_URL ?? BUSINESS.website;
  return raw.replace(/\/$/, "");
}

function shareUrl(path: string) {
  return `${canonicalArticleOrigin()}${path.startsWith("/") ? path : `/${path}`}`;
}

export type BlogArticleAuthor = {
  name: string;
  bio: string;
};

export function BlogArticleSidebar({
  path,
  shareTitle,
  toc,
  author,
  showShare = true,
  asideMenu,
  showDesktopAsideFrom = "lg",
}: {
  path: string;
  shareTitle: string;
  toc: BlogArticleTocItem[];
  author?: BlogArticleAuthor | null;
  /** When false, hides Facebook / X / LinkedIn / copy link row. */
  showShare?: boolean;
  /** Optional desktop-only block in place of the in-page TOC (e.g. “Other services” links). */
  asideMenu?: ReactNode;
  /**
   * When `"xl"`, TOC / asideMenu / CTA use `xl:block` so they stay hidden until `xl` (matches a parent `aside` that is `xl`+ only).
   * Default `"lg"` matches the blog article layout.
   */
  showDesktopAsideFrom?: "lg" | "xl";
}) {
  const desktopAsideBlock = showDesktopAsideFrom === "xl" ? "xl:block" : "lg:block";

  const url = shareUrl(path);
  const [copied, setCopied] = useState(false);

  const onCopy = useCallback(async () => {
    const toCopy = typeof window !== "undefined" ? window.location.href : url;
    try {
      await navigator.clipboard.writeText(toCopy);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }, [url]);

  const encoded = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(shareTitle);

  return (
    <div className={`flex min-w-0 flex-col gap-8 ${showDesktopAsideFrom === "xl" ? "xl:self-start" : "lg:self-start"}`}>
      {author ? (
        <div className="p-0">
          <div className="relative mx-auto flex h-[5.25rem] w-[5.25rem] shrink-0 items-center justify-center overflow-hidden rounded-full bg-white ring-2 ring-zen-crimson">
            <Image
              src={HERO_WORDMARK_SRC}
              alt={`${author.name} wordmark`}
              width={250}
              height={100}
              className="h-[48%] w-[88%] object-contain object-center"
              sizes="84px"
            />
          </div>
          <p className="mt-3 text-center font-heading text-base font-bold text-white light:text-zen-espresso">
            {author.name}
          </p>
          <p className="mt-2 text-center text-sm leading-relaxed text-white/75 light:text-zen-taupe">{author.bio}</p>
        </div>
      ) : null}

      {showShare ? (
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-white/55 light:text-zen-taupe">Share</p>
          <ul className="mt-3 flex flex-wrap items-center gap-2.5">
            <li>
              <a
                className={shareIconButtonClass}
                href={`https://www.facebook.com/sharer/sharer.php?u=${encoded}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Share on Facebook"
                title="Facebook"
              >
                <SiteSocialIcon label="Facebook" />
                <span className="sr-only">Share on Facebook</span>
              </a>
            </li>
            <li>
              <a
                className={shareIconButtonClass}
                href={`https://twitter.com/intent/tweet?url=${encoded}&text=${encodedTitle}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Share on X"
                title="X"
              >
                <SiteSocialIcon label="X (Twitter)" />
                <span className="sr-only">Share on X</span>
              </a>
            </li>
            <li>
              <a
                className={shareIconButtonClass}
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encoded}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Share on LinkedIn"
                title="LinkedIn"
              >
                <SiteSocialIcon label="LinkedIn" />
                <span className="sr-only">Share on LinkedIn</span>
              </a>
            </li>
            <li>
              <button
                type="button"
                onClick={onCopy}
                className={shareIconButtonClass}
                aria-label={copied ? "Link copied" : "Copy link to clipboard"}
                title={copied ? "Copied" : "Copy link"}
              >
                <SiteSocialIcon label={copied ? "Copied" : "Copy link"} />
                <span className="sr-only">{copied ? "Link copied" : "Copy link"}</span>
              </button>
            </li>
          </ul>
        </div>
      ) : null}

      {asideMenu ? (
        <div className={`hidden min-w-0 ${desktopAsideBlock}`}>{asideMenu}</div>
      ) : toc.length > 0 ? (
        <div className={`hidden min-w-0 ${desktopAsideBlock}`}>
          <BlogArticleToc toc={toc} />
        </div>
      ) : null}

      <div
        className={`relative hidden rounded-3xl bg-zen-crimson p-3 text-center text-white shadow-lg ring-1 ring-white/25 sm:p-4 ${desktopAsideBlock}`}
      >
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-zen-crimson ring-1 ring-white/20">
          <Image
            src={BLOG_SIDEBAR_CTA_IMAGE_SRC}
            alt="Property manager leasing sign — tenant placement services in Meridian, Idaho"
            fill
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 17.5rem"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/5"
            aria-hidden
          />
        </div>
        <div className="relative px-2 pb-4 pt-4 sm:px-3 sm:pb-5">
          <div
            className="pointer-events-none absolute inset-0 opacity-15"
            aria-hidden
            style={{
              backgroundImage:
                "radial-gradient(ellipse 80% 50% at 20% 0%, rgba(255,255,255,0.35) 0%, transparent 55%), radial-gradient(ellipse 70% 55% at 100% 100%, rgba(255,255,255,0.2) 0%, transparent 50%)",
            }}
          />
          <p className="relative font-heading text-lg font-bold leading-snug text-white">
            Ready to Build Your Custom Court?
          </p>
          <p className="relative mx-auto mt-2 max-w-md text-sm leading-6 text-white/90">
            Get custom court construction, resurfacing, and design-build support from court builders serving
            Boise, Scottsdale, and surrounding areas.
          </p>
          <div className="relative mt-4 flex w-full flex-col items-center gap-3">
            <a className="btn-call blog-sidebar-cta-secondary" href={BUSINESS.phoneTel}>
              Call {BUSINESS.phoneDisplay}
            </a>
            <Link className="btn-alt blog-sidebar-cta-call" href="/contact/">
              {PAGE_HERO_CTA_SECONDARY_LABEL}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
