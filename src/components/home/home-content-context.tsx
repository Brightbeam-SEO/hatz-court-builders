"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { HomeContent } from "@/lib/home-content";
import { getStaticHomeContent } from "./site-data";

const HomeContentContext = createContext<HomeContent | null>(null);

export function HomeContentProvider({
  value,
  children,
}: {
  value: HomeContent;
  children: ReactNode;
}) {
  return (
    <HomeContentContext.Provider value={value}>{children}</HomeContentContext.Provider>
  );
}

export function useHomeContent(): HomeContent {
  const ctx = useContext(HomeContentContext);
  if (ctx) return ctx;
  return getStaticHomeContent();
}
