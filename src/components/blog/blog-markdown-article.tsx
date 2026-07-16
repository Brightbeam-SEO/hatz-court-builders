"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Children,
  createContext,
  isValidElement,
  useContext,
  useMemo,
  type LiHTMLAttributes,
  type ReactNode,
} from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import remarkGfm from "remark-gfm";
import type { Components } from "react-markdown";
import { SunsetCheckBullet } from "@/components/sunset-check-bullet";
import { BUSINESS, SITE_INTERNAL_HOSTNAMES } from "@/lib/business";
import { SITE_CANONICAL_HOSTS } from "@/lib/site-url";

const businessNameHomeLinkClass =
  "font-semibold text-white underline decoration-white/40 underline-offset-2 transition hover:text-zen-sage light:text-zen-espresso light:decoration-zen-crimson/45 light:hover:text-zen-crimson";

function plainText(children: ReactNode): string {
  return Children.toArray(children)
    .map((child) => {
      if (typeof child === "string") return child;
      if (typeof child === "number") return String(child);
      if (isValidElement<{ children?: ReactNode }>(child)) {
        return plainText(child.props.children);
      }
      return "";
    })
    .join("");
}

function isBusinessNameHomeLink(text: string): boolean {
  const normalized = text.trim();
  return normalized === BUSINESS.nameFull || normalized === BUSINESS.nameShort;
}

const linkGold =
  "font-semibold text-zen-sage underline decoration-zen-sage/80 underline-offset-2 transition hover:text-zen-gold light:text-zen-crimson light:decoration-zen-gold/55 light:hover:text-zen-crimson-hover";
const linkTeal =
  "font-semibold text-zen-gold underline decoration-zen-gold/70 underline-offset-2 transition hover:text-zen-sage light:text-zen-taupe light:decoration-zen-gold/50 light:hover:text-zen-espresso";

const p = "text-base leading-7 text-white/90 light:text-zen-taupe";
const h2 =
  "font-heading scroll-mt-28 text-2xl font-bold text-white light:text-zen-espresso md:text-3xl";
const h3 = "font-heading scroll-mt-28 text-xl font-semibold text-white light:text-zen-espresso";
const ul =
  "mt-4 list-disc space-y-2 pl-5 text-base leading-7 text-white/90 marker:text-zen-crimson light:text-zen-taupe light:marker:text-zen-crimson";

const sanitizeSchema = {
  ...defaultSchema,
  /** Preserve explicit `id` on headings for TOC links (default prefix breaks `#anchor` nav). */
  clobberPrefix: "",
  tagNames: [...(defaultSchema.tagNames ?? []), "img"],
  attributes: {
    ...defaultSchema.attributes,
    img: ["src", "alt", "title", "loading"],
    h2: [...((defaultSchema.attributes?.h2 as string[] | undefined) ?? []), "id"],
    h3: [...((defaultSchema.attributes?.h3 as string[] | undefined) ?? []), "id"],
    a: ["href", "name", "target", "rel", "title"],
  },
};

const INTERNAL_HOSTS = new Set<string>([
  "solpressurewash.com",
  "www.solpressurewash.com",
  ...SITE_INTERNAL_HOSTNAMES,
  ...SITE_CANONICAL_HOSTS,
]);

function configuredSiteHost(): string | null {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) return null;
  try {
    return new URL(raw).hostname.toLowerCase();
  } catch {
    return null;
  }
}

function normalizeInternalHref(href: string | undefined): string | undefined {
  if (!href) return href;
  // Keep already-relative links untouched so they always follow current domain.
  if (href.startsWith("/") || href.startsWith("#") || href.startsWith("?")) return href;
  // Preserve non-http schemes.
  if (/^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(href) && !href.startsWith("http://") && !href.startsWith("https://")) {
    return href;
  }
  try {
    const parsed = new URL(href);
    const host = parsed.hostname.toLowerCase();
    const configured = configuredSiteHost();
    if (INTERNAL_HOSTS.has(host) || (configured !== null && host === configured)) {
      return `${parsed.pathname}${parsed.search}${parsed.hash}` || "/";
    }
    return href;
  } catch {
    return href;
  }
}

function linkClassForHref(href: string | undefined): string {
  if (!href) return linkTeal;
  if (href.startsWith("tel:")) return linkTeal;
  if (href.includes("foot-massage-reflexology") || href.includes("/services/")) return linkGold;
  if (
    href === "https://zenspaidaho.com/" ||
    href === "https://zenspaidaho.com" ||
    href === "/services/foot-massage-reflexology/" ||
    href === "/services/foot-massage-reflexology"
  )
    return linkGold;
  return linkTeal;
}

/** When set, `<li>` in unordered lists renders a check bullet of the given variant. */
const MarkdownCheckBulletContext = createContext<"sunset" | "crimson" | null>(null);

function MarkdownLi({ children, ...props }: LiHTMLAttributes<HTMLLIElement>) {
  const { className: _className, ...rest } = props;
  const checkVariant = useContext(MarkdownCheckBulletContext);
  if (checkVariant) {
    return (
      <li {...rest} className="flex items-start gap-3 text-base leading-7 text-white/90 light:text-zen-taupe [&>p]:my-0">
        <SunsetCheckBullet variant={checkVariant} />
        <div className="min-w-0 flex-1 [&_p]:my-0">{children}</div>
      </li>
    );
  }
  return (
    <li className="[&>p]:my-0" {...rest}>
      {children}
    </li>
  );
}

export type BlogMarkdownListBulletStyle = "disc" | "sunset-check" | "crimson-check";

function checkBulletVariant(
  listBulletStyle: BlogMarkdownListBulletStyle,
): "sunset" | "crimson" | null {
  if (listBulletStyle === "crimson-check") return "crimson";
  if (listBulletStyle === "sunset-check") return "sunset";
  return null;
}

function markdownComponentsFor(listBulletStyle: BlogMarkdownListBulletStyle): Components {
  const checkVariant = checkBulletVariant(listBulletStyle);
  const useCheckList = checkVariant !== null;
  return {
    p: ({ children }) => (
      <p className={p}>
        {children}
      </p>
    ),
    h2: ({ children, id }) => (
      <h2 id={id} className={h2}>
        {children}
      </h2>
    ),
    h3: ({ children, id }) => (
      <h3 id={id} className={h3}>
        {children}
      </h3>
    ),
    ul: ({ children }) =>
      useCheckList ? (
        <ul
          className="mt-4 list-none space-y-2 pl-0 text-base leading-7 text-white/90 light:text-zen-taupe"
        >
          <MarkdownCheckBulletContext.Provider value={checkVariant}>{children}</MarkdownCheckBulletContext.Provider>
        </ul>
      ) : (
        <ul className={ul}>
          {children}
        </ul>
      ),
    ol: ({ children }) =>
      useCheckList ? (
        <ol
          className="mt-4 list-decimal space-y-2 pl-5 text-base leading-7 text-white/90 light:text-zen-taupe marker:text-white/90 light:marker:text-zen-taupe"
        >
          <MarkdownCheckBulletContext.Provider value={null}>{children}</MarkdownCheckBulletContext.Provider>
        </ol>
      ) : (
        <ol
          className={`${ul} list-decimal marker:text-zen-crimson light:marker:text-zen-crimson`}
        >
          {children}
        </ol>
      ),
    li: MarkdownLi,
    hr: () => <hr className="my-10 border-0 border-t border-white/15 light:border-slate-200" />,
    strong: ({ children }) => {
      const text = plainText(children);
      if (isBusinessNameHomeLink(text)) {
        return (
          <Link href="/" className={businessNameHomeLinkClass}>
            {children}
          </Link>
        );
      }
      return <strong className="text-white light:text-zen-espresso">{children}</strong>;
    },
    a: ({ href, children, node: _node, ...props }) => (
      <a href={normalizeInternalHref(href)} className={linkClassForHref(href)} {...props}>
        {children}
      </a>
    ),
    img: ({ src, alt }) => {
      if (!src || typeof src !== "string") return null;
      if (src.startsWith("/")) {
        return (
          <span className="relative mt-6 block aspect-[16/10] w-full max-w-2xl overflow-hidden rounded-2xl">
            <Image src={src} alt={alt ?? ""} fill className="object-cover" sizes="(max-width: 768px) 100vw, 42rem" />
          </span>
        );
      }
      return <img src={src} alt={alt ?? ""} className="mt-6 max-h-96 w-full max-w-2xl rounded-2xl object-cover" loading="lazy" />;
    },
  };
}

export function BlogMarkdownArticle({
  markdown,
  listBulletStyle = "disc",
}: {
  markdown: string;
  /** `sunset-check` / `crimson-check`: unordered lists use check bullets instead of discs. */
  listBulletStyle?: BlogMarkdownListBulletStyle;
}) {
  const components = useMemo(() => markdownComponentsFor(listBulletStyle), [listBulletStyle]);

  return (
    <div className="flex max-w-none flex-col gap-6">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, [rehypeSanitize, sanitizeSchema]]}
        components={components}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
