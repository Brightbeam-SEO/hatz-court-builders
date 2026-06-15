"use client";

import { useEffect, useState } from "react";

/** True after the component has mounted (post-hydration). Use to defer client-only UI. */
export function useHasMounted(): boolean {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
}
