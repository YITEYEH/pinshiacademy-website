import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import { TeamClient } from "./TeamClient";

export const metadata: Metadata = {
  title: "營運團隊",
  description: "認識品識學苑的營運團隊：在教學背後提供完善支援，確保每個環節都能順暢運作。",
  alternates: { canonical: `${SITE.url}/team` },
};

export default function TeamPage() {
  return <TeamClient />;
}

