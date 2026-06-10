"use client";

import type { HomeContent } from "@/lib/home-content";
import { HomeContentProvider } from "./home-content-context";
import { HomePage } from "./home-page";

export function HomePageWithContent({ value }: { value: HomeContent }) {
  return (
    <HomeContentProvider value={value}>
      <HomePage />
    </HomeContentProvider>
  );
}
