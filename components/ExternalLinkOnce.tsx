"use client";

import { useRef } from "react";
import type React from "react";

type Props = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "type" | "onClick"
> & {
  href: string;
  cooldownMs?: number;
  newTab?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export function ExternalLinkOnce({
  href,
  cooldownMs = 1200,
  newTab = false,
  onClick,
  ...props
}: Props) {
  const lockRef = useRef(false);
  const lastTsRef = useRef(0);

  const globalLockIfNeeded = (now: number) => {
    const w = window as unknown as {
      __pinshiExternalOpenLock?: Record<string, number>;
    };
    const map = (w.__pinshiExternalOpenLock ??= {});
    const last = map[href] ?? 0;
    if (last && now - last < cooldownMs) return true;
    map[href] = now;
    return false;
  };

  const lockIfNeeded = (e: React.SyntheticEvent) => {
    const now = Date.now();
    if (lockRef.current && now - lastTsRef.current < cooldownMs) {
      e.preventDefault();
      e.stopPropagation();
      return true;
    }
    lockRef.current = true;
    lastTsRef.current = now;
    return false;
  };

  return (
    <button
      type="button"
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented) return;
        if (lockIfNeeded(e)) return;

        const now = Date.now();
        if (globalLockIfNeeded(now)) {
          return;
        }

        if (newTab) {
          window.open(href, "_blank", "noopener,noreferrer");
        } else {
          window.location.assign(href);
        }
        window.setTimeout(() => {
          lockRef.current = false;
        }, cooldownMs);
      }}
      onKeyDown={(e) => {
        // 讓鍵盤操作也能開啟
        if (e.key !== "Enter" && e.key !== " ") return;
        if (lockIfNeeded(e)) return;
        e.preventDefault();
        const now = Date.now();
        if (globalLockIfNeeded(now)) {
          return;
        }
        if (newTab) {
          window.open(href, "_blank", "noopener,noreferrer");
        } else {
          window.location.assign(href);
        }
        window.setTimeout(() => {
          lockRef.current = false;
        }, cooldownMs);
      }}
      {...props}
    />
  );
}

