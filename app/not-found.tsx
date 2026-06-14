import type { Metadata } from "next";
import Link from "next/link";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...buildPageMetadata({
    path: "/404",
    title: "找不到頁面",
    description: "您所尋找的頁面不存在或已移除，請返回品識學苑首頁或學習專欄。",
    titleAbsolute: true,
  }),
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="max-w-lg mx-auto px-4 py-24 text-center">
      <p className="text-sm font-medium text-primary mb-2">404</p>
      <h1 className="text-2xl font-bold text-foreground mb-4">找不到此頁面</h1>
      <p className="text-muted-foreground mb-8">
        連結可能已失效，或網址輸入有誤。您可以返回首頁或瀏覽學習專欄。
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <Link
          href="/"
          className="inline-flex items-center rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white hover:bg-primary/90"
        >
          返回首頁
        </Link>
        <Link
          href="/blog"
          className="inline-flex items-center rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-foreground hover:bg-accent"
        >
          學習專欄
        </Link>
      </div>
    </div>
  );
}
