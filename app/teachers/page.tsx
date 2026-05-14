import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { TeachersClient } from "./TeachersClient";

export const metadata: Metadata = buildPageMetadata({
  path: "/teachers",
  title: "師資團隊介紹｜品識學苑國小國中高中升學輔導教師",
  description:
    "認識品識學苑的專業師資團隊：具備12年國教升學輔導與國文、數學等科目教學經驗，結合教學設計與系統化學習規劃，陪伴學生長期成長。",
  titleAbsolute: true,
});

export default function TeachersPage() {
  return <TeachersClient />;
}

