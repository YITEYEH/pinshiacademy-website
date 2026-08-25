import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { teachifyPurchaseUrl } from "@/content/teachify-courses";
import {
  getOnlineCourses,
  type OnlineCourseView,
} from "@/lib/get-online-courses";
import { OnlineCoursesClient } from "./OnlineCoursesClient";

export const revalidate = 3_600;

export const metadata: Metadata = buildPageMetadata({
  path: "/online-courses",
  title: "時間難固定？線上預錄課程讓學習照自己的步調",
  description:
    "按照自己的時間觀看與複習，聽不懂的地方可以再看一次；查看會考數學等預錄課程、授課老師、課程內容與上課方式",
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
