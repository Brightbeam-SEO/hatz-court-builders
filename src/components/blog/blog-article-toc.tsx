"use client";

import { useState } from "react";
import type { BlogArticleTocItem } from "@/components/blog/blog-article-types";

/** How many TOC rows stay visible when collapsed (rest via “Show all…”). */
const TOC_PREVIEW_COUNT = 4;

export function BlogArticleToc({
  toc,
  panelId = "blog-toc-panel",
}: {
  toc: BlogArticleTocItem[];
  /** Unique when TOC is rendered twice (e.g. mobile + desktop). */
  panelId?: string;
}) {
  const [tocExpanded, setTocExpanded] = useState(false);

  if (toc.length === 0) return null;

  return (
    <nav aria-label="Table of contents" className="min-w-0">
      <p className="font-heading text-sm font-bold uppercase tracking-[0.12em] text-white light:text-zen-espresso">
        Table of contents
      </p>
      <div
        id={panelId}
        className="relative mt-3 border-t border-white/10 pt-3 light:border-slate-200"
      >
        <ul
          className={`space-y-1 pr-1 [-webkit-overflow-scrolling:touch] [scrollbar-color:rgba(148,163,184,0.55)_transparent] [scrollbar-width:thin] light:[scrollbar-color:rgba(100,116,139,0.45)_transparent] ${
            tocExpanded
              ? "max-h-[min(42vh,17.5rem)] overflow-y-auto overscroll-y-contain"
              : "max-h-[9.25rem] overflow-hidden"
          }`}
          style={tocExpanded ? { scrollbarGutter: "stable" } : undefined}
        >
          {(tocExpanded ? toc : toc.slice(0, TOC_PREVIEW_COUNT)).map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`block rounded-md py-1 text-sm leading-snug text-white/80 transition hover:bg-white/10 hover:text-white light:text-zen-taupe light:hover:bg-slate-100 light:hover:text-zen-espresso ${
                  item.level === 3 ? "pl-3.5 text-white/70 light:text-zen-taupe" : ""
                }`}
              >
                {item.level === 3 ? (
                  <span className="inline-flex items-start gap-1.5">
                    <span
                      className="mt-0.5 shrink-0 font-sans text-xs text-white/45 light:text-slate-400"
                      aria-hidden
                    >
                      ›
                    </span>
                    <span>{item.label}</span>
                  </span>
                ) : (
                  item.label
                )}
              </a>
            </li>
          ))}
        </ul>
        {!tocExpanded && toc.length > TOC_PREVIEW_COUNT ? (
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-zen-espresso via-zen-espresso/80 to-transparent light:from-zen-rice light:via-zen-rice/90 light:to-transparent"
            aria-hidden
          />
        ) : null}
      </div>
      {toc.length > TOC_PREVIEW_COUNT ? (
        <button
          type="button"
          className="mt-3 w-full text-left text-sm font-medium text-zen-sage underline decoration-zen-sage/80 underline-offset-2 transition hover:text-zen-gold hover:decoration-zen-gold/80 light:text-zen-crimson light:decoration-zen-gold/60 light:hover:text-zen-crimson-hover"
          onClick={() => setTocExpanded((v) => !v)}
          aria-expanded={tocExpanded}
          aria-controls={panelId}
        >
          {tocExpanded ? "Hide all table of contents" : "Show all table of contents"}
        </button>
      ) : null}
    </nav>
  );
}
