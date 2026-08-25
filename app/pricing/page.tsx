import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { buildPricingJsonLd } from "@/lib/pricing-schema";
import { PricingClient } from "./PricingClient";

export const metadata: Metadata = buildPageMetadata({
  path: "/pricing",
  title: "線上家教費用多少？品識學苑一對一價格公開",
  description:
    "想先知道上課要多少錢？查看國小、國中、高中線上一對一課程參考費用，每堂 50 分鐘，價格與方案先看清楚再決定",
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
