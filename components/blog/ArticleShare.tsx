"use client";

import { useState } from "react";
import { Check, Copy, Facebook } from "lucide-react";

type Props = {
  url: string;
  title: string;
};

function shareUrl(platform: "facebook" | "line", url: string) {
  const encoded = encodeURIComponent(url);
  if (platform === "facebook") {
    return `https://www.facebook.com/sharer/sharer.php?u=${encoded}`;
  }
  return `https://social-plugins.line.me/lineit/share?url=${encoded}`;
}

export function ArticleShare({ url, title }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("複製以下連結分享給朋友：", url);
    }
  };

  const openShare = (platform: "facebook" | "line") => {
    window.open(
      shareUrl(platform, url),
      "_blank",
      "noopener,noreferrer,width=600,height=520",
    );
  };

  return (
    <div
      role="complementary"
      aria-label="分享文章"
      className="mt-12 max-w-[42rem] mx-auto rounded-xl border border-border bg-[#f7f9f7] p-6"
    >
      <p className="text-sm font-semibold text-foreground mb-1">
        覺得這篇文章有幫助？
      </p>
      <p className="text-sm text-muted-foreground mb-4">
        分享給需要的家長或朋友
      </p>
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-2 rounded-lg border border-border bg-white px-4 py-2.5 text-sm font-medium text-foreground hover:border-primary/30 hover:text-primary transition-colors"
        >
          {copied ? (
            <Check className="w-4 h-4 text-primary" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
          {copied ? "已複製連結" : "複製連結"}
        </button>
        <button
          type="button"
          onClick={() => openShare("facebook")}
          className="inline-flex items-center gap-2 rounded-lg bg-[#1877F2] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#1877F2]/90 transition-colors"
          aria-label={`分享「${title}」到 Facebook`}
        >
          <Facebook className="w-4 h-4" />
          Facebook
        </button>
        <button
          type="button"
          onClick={() => openShare("line")}
          className="inline-flex items-center gap-2 rounded-lg bg-[#06C755] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#06C755]/90 transition-colors"
          aria-label={`分享「${title}」到 LINE`}
        >
          <span className="text-xs font-bold tracking-wide">LINE</span>
        </button>
      </div>
    </div>
  );
}
