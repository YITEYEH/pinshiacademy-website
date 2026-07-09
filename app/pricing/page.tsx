import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { buildPricingJsonLd } from "@/lib/pricing-schema";
import { PricingClient } from "./PricingClient";

export const metadata: Metadata = buildPageMetadata({
  path: "/pricing",
  title: "課程費用｜品識學苑一對一線上課程價格",
  description:
    "品識學苑提供國小、國中、高中一對一線上課程，查看 50 分鐘課程參考價格，並預約免費學習諮詢，了解最適合孩子的課程方案。",
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
