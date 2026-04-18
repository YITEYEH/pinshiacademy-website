import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import { HomeClient } from "./HomeClient";

export const metadata: Metadata = {
  title: "主頁",
  description: SITE.defaultDescription,
};

export default function HomePage() {
  return <HomeClient />;
}

