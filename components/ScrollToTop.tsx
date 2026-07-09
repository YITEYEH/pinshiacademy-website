"use client";

import { Suspense, useEffect, useLayoutEffect, useMemo } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { scheduleScrollToTop } from "@/lib/scroll-to-top";

function ScrollToTopInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const routeKey = useMemo(() => {
    const query = searchParams.toString();
    return query ? `${pathname}?${query}` : pathname;
  }, [pathname, searchParams]);

  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
  }, []);

  useLayoutEffect(() => {
    scheduleScrollToTop();
  }, [routeKey]);

  useEffect(() => {
    scheduleScrollToTop();
  }, [routeKey]);

  return null;
}

export function ScrollToTop() {
  return (
    <Suspense fallback={null}>
      <ScrollToTopInner />
    </Suspense>
  );
}
