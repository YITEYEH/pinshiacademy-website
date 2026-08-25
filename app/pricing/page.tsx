import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { buildPricingJsonLd } from "@/lib/pricing-schema";
import { PricingClient } from "./PricingClient";

export const metadata: Metadata = buildPageMetadata({
  path: "/pricing",
  title: "線上一對一費用｜國小到高中參考價｜品識學苑",
  description:
    "想先知道大概要花多少？看國小／國中／高中每堂 50 分鐘起價與方案說明，費用公開透明，也可先預約免費學習諮詢",
  titleAbsolute: true,
});

export default function PricingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildPricingJsonLd()),
        }}
      />
      <PricingClient />
    </>
  );
}
