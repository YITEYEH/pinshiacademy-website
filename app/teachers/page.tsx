import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import { TeachersClient } from "./TeachersClient";

export const metadata: Metadata = {
  title: "師資團隊",
  description:
    "認識品識學苑的專業師資團隊：用心陪伴每位學生，從理解到成長，建立自信與成就感。",
  alternates: { canonical: `${SITE.url}/teachers` },
};

export default function TeachersPage() {
  return <TeachersClient />;
}

