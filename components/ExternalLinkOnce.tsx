"use client";

import { trackOutboundClick } from "@/lib/analytics";
import {
  isLikelyMobileDevice,
  resolveLineHrefForDevice,
} from "@/lib/line-links";
import { forwardRef, useEffect, useRef, useState } from "react";
import type React from "react";

type Props = Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  "href" | "onClick"
> & {
  href: string;
  /** 手機專用連結；未傳且 href 為 LINE CTA 時，自動改 oaMessage 預填 */
  mobileHref?: string;
  cooldownMs?: number;
  newTab?: boolean;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  /** GA4 事件標籤 */
  analyticsLabel?: string;
};

/**
 * 外連 CTA：必須是真實 <a href>。
 * LINE：桌面維持 lin.ee；手機改 oaMessage 預填訊息。
 */
export const ExternalLinkOnce = forwardRef<HTMLAnchorElement, Props>(
  function ExternalLinkOnce(
    {
      href,
      mobileHref,
      cooldownMs = 1200,
      newTab = false,
      onClick,
      analyticsLabel,
      ...props
    },
    ref,
  ) {
    const lockRef = useRef(false);
    const lastTsRef = useRef(0);
    // SSR／首屏用桌面連結，避免 hydration mismatch；掛載後再依裝置切換
    const [activeHref, setActiveHref] = useState(href);

    useEffect(() => {
      if (mobileHref) {
        setActiveHref(isLikelyMobileDevice() ? mobileHref : href);
        return;
      }
      setActiveHref(resolveLineHrefForDevice(href));
    }, [href, mobileHref]);

    const globalLockIfNeeded = (now: number) => {
      const w = window as unknown as {
        __pinshiExternalOpenLock?: Record<string, number>;
      };
      const map = (w.__pinshiExternalOpenLock ??= {});
      const last = map[activeHref] ?? 0;
      if (last && now - last < cooldownMs) return true;
      map[activeHref] = now;
      return false;
    };

    return (
      <a
        ref={ref}
        href={activeHref}
        {...(newTab
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
        {...props}
        onClick={(e) => {
          onClick?.(e);
          if (e.defaultPrevented) return;

          const now = Date.now();
          if (lockRef.current && now - lastTsRef.current < cooldownMs) {
            e.preventDefault();
            e.stopPropagation();
            return;
          }
          if (globalLockIfNeeded(now)) {
            e.preventDefault();
            return;
          }

          lockRef.current = true;
          lastTsRef.current = now;

          if (analyticsLabel) {
            trackOutboundClick(analyticsLabel, activeHref);
          }

          window.setTimeout(() => {
            lockRef.current = false;
          }, cooldownMs);
        }}
      />
    );
  },
);
