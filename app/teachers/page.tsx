import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { TeachersClient } from "./TeachersClient";

export const metadata: Metadata = buildPageMetadata({
  path: "/teachers",
  title: "師資團隊介紹",
  description:
    "品識學苑師資團隊具備12年國教升學輔導經驗與教學應用能力，結合專業教學設計與系統化學習規劃，陪伴學生長期成長",
});

export default function TeachersPage() {
  return <TeachersClient />;
}

