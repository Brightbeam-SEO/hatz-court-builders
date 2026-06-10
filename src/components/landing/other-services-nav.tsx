"use client";

import { useState } from "react";
import type { OtherServicesNavGroup } from "@/lib/boise-service-nav";

/** Points visitors back to the homepage service grid (standalone service landings removed). */
const OTHER_SERVICE_LINKS = [{ href: "/#services", label: "All services" }] as const;

/** Matches supporting links shown beside long-form service content. */
const otherServiceLinkClass =
  "block rounded-xl px-3 py-2 text-sm leading-snug text-white/85 transition hover:bg-zen-crimson/12 hover:text-zen-espresso light:text-zen-taupe light:hover:bg-zen-crimson/12 light:hover:text-zen-espresso";

const groupToggleClass =
  "flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm font-semibold leading-snug text-white transition hover:bg-zen-crimson/12 hover:text-zen-espresso light:text-zen-espresso light:hover:bg-zen-crimson/12";

/**
 * “Other services” menu — flat links or grouped collapsible sections (Boise landings).
 */
export function OtherServicesNav({
  panelId = "other-services-panel",
  links,
  groups,
}: {
  panelId?: string;
  links?: readonly { href: string; label: string }[];
  groups?: readonly OtherServicesNavGroup[];
}) {
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    groups?.forEach((group) => {
      initial[group.id] = group.defaultOpen ?? false;
    });
    return initial;
  });

  const toggleGroup = (id: string) => {
    setOpenGroups((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <nav aria-label="Other services" className="min-w-0">
      <p className="font-heading text-sm font-bold tracking-[0.12em] text-white light:text-zen-espresso">
        Other Services
      </p>
      <div
        id={panelId}
        className="relative mt-3 border-t border-white/10 pt-3 light:border-slate-200"
      >
        {groups ? (
          <ul className="space-y-1 pr-1">
            {groups.map((group) => {
              const isOpen = openGroups[group.id] ?? false;
              const hasLinks = group.links.length > 0;
              return (
                <li key={group.id}>
                  <button
                    type="button"
                    className={groupToggleClass}
                    onClick={() => toggleGroup(group.id)}
                    aria-expanded={hasLinks ? isOpen : undefined}
                    disabled={!hasLinks}
                  >
                    <span>{group.label}</span>
                    {hasLinks ? (
                      <svg
                        className={`h-4 w-4 shrink-0 transition ${isOpen ? "rotate-180" : ""}`}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden
                      >
                        <path d="M5.75 7.5L10 11.75L14.25 7.5" />
                      </svg>
                    ) : null}
                  </button>
                  {hasLinks && isOpen ? (
                    <ul className="mt-0.5 space-y-0.5 border-l border-white/15 pl-2 light:border-slate-200">
                      {group.links.map((item) => (
                        <li key={item.href}>
                          <a href={item.href} className={otherServiceLinkClass}>
                            {item.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              );
            })}
          </ul>
        ) : (
          <ul className="space-y-0.5 pr-1">
            {(links ?? OTHER_SERVICE_LINKS).map((item) => (
              <li key={item.href}>
                <a href={item.href} className={otherServiceLinkClass}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </nav>
  );
}
