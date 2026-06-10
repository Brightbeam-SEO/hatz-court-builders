import type { ReactNode } from "react";

export function SiteChrome({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-full min-w-0 flex-1 flex-col overflow-x-clip bg-zen-rice">
      {children}
    </div>
  );
}
