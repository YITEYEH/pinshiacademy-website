import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { teachifyPurchaseUrl } from "@/content/teachify-courses";
import {
  getOnlineCourses,
  type OnlineCourseView,
} from "@/lib/get-online-courses";
import { OnlineCoursesClient } from "./OnlineCoursesClient";

export const revalidate = 28_800;

export const metadata: Metadata = buildPageMetadata({
  path: "/online-courses",
  title: "線上課程｜會考學測預錄精選｜品識學苑",
  description:
    "品識學苑線上精選課程：會考數學歷屆試題解析等預錄課程，由資深師資授課。於官網瀏覽課程資訊，購買與上課於品識學苑 Teachify 平台完成。",
  titleAbsolute: true,
});

function buildOnlineCoursesJsonLd(courses: OnlineCourseView[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "品識學苑線上課程",
    url: `${SITE.url}/online-courses`,
    itemListElement: courses.map((course, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Course",
        name: course.title,
        description: course.subtitle,
        url: teachifyPurchaseUrl(course.purchaseUrl),
        provider: {
          "@type": "Organization",
          name: SITE.name,
          url: SITE.url,
        },
        offers: {
          "@type": "Offer",
          price: course.priceFrom,
          priceCurrency: "TWD",
          url: teachifyPurchaseUrl(course.purchaseUrl),
        },
      },
    })),
  };
}

export default async function OnlineCoursesPage() {
  const courses = await getOnlineCourses();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildOnlineCoursesJsonLd(courses)),
        }}
      />
      <OnlineCoursesClient courses={courses} />
    </>
  );
}
