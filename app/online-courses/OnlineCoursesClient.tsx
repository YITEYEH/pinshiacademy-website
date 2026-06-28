"use client";

import Link from "next/link";
import {
  ArrowRight,
  Clock,
  GraduationCap,
  PlayCircle,
  Sparkles,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ExternalLinkOnce } from "@/components/ExternalLinkOnce";
import { LINE_LINKS } from "@/lib/line-links";
import {
  teachifyPlatformUrl,
  teachifyPurchaseUrl,
} from "@/content/teachify-courses";
import type { OnlineCourseView } from "@/lib/get-online-courses";

type Props = {
  courses: OnlineCourseView[];
};

const faqItems = [
  {
    q: "我要在哪裡購買課程？",
    a: "本頁提供課程介紹，點選「查看課程」或「立即購買」後，將前往品識學苑官方課程平台完成選課、付款與觀看課程。",
  },
  {
    q: "線上課程與一對一／小班輔導有什麼不同？",
    a: "線上預錄課程適合希望依照自己的步調學習、反覆觀看重點內容的學生；一對一與小班輔導則提供老師即時互動、個別化指導與問題解答。\n\n若希望兼顧自主學習與老師陪伴，也可以搭配使用，學習效果更完整。",
  },
  {
    q: "購買後如何開始上課？",
    a: "完成購買後，依照系統指示註冊或登入，即可於課程平台觀看已購買的課程。若課程包含陪跑、直播或提問服務，將依各課程頁面說明使用即可。",
  },
];

function formatPrice(amount: number) {
  return `NT$${amount.toLocaleString("zh-TW")}`;
}

function discountPercent(from: number, original: number) {
  return Math.round((1 - from / original) * 100);
}

function CourseCard({ course }: { course: OnlineCourseView }) {
  const purchaseHref = teachifyPurchaseUrl(course.purchaseUrl);
  const savings =
    course.priceOriginal && course.priceOriginal > course.priceFrom
      ? course.priceOriginal - course.priceFrom
      : null;
  const discount =
    course.priceOriginal && course.priceOriginal > course.priceFrom
      ? discountPercent(course.priceFrom, course.priceOriginal)
      : null;
  const leadInstructor = course.instructors[0];

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-white shadow-sm transition-all duration-300 hover:border-primary/20 hover:shadow-md">
      {/* 封面：上圖下文，固定 16:9 完整顯示寬幅封面 */}
      <a
        href={purchaseHref}
        target="_blank"
        rel="noopener noreferrer"
        className="group/cover relative block aspect-video w-full overflow-hidden bg-[#e8f5ee]"
      >
        {course.coverImageUrl ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={course.coverImageUrl}
            alt={course.title}
            className="h-full w-full object-cover object-center transition-transform duration-500 group-hover/cover:scale-[1.02]"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary to-[#1a5535]">
            <GraduationCap className="h-14 w-14 text-white/30" aria-hidden />
          </div>
        )}
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-black/5 to-transparent"
          aria-hidden
        />
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          {course.badge && (
            <span className="rounded-md bg-primary px-2 py-0.5 text-[10px] font-bold text-white shadow-sm">
              {course.badge}
            </span>
          )}
          {discount ? (
            <span className="inline-flex items-center gap-0.5 rounded-md bg-amber-400 px-2 py-0.5 text-[10px] font-bold text-amber-950 shadow-sm">
              <Sparkles className="h-2.5 w-2.5" aria-hidden />
              {discount}% OFF
            </span>
          ) : null}
        </div>
      </a>

      <div className="flex flex-1 flex-col p-4">
        {leadInstructor && (
          <p className="line-clamp-1 text-xs text-muted-foreground">
            <span className="font-medium text-foreground">{leadInstructor.name}</span>
          </p>
        )}

        <h2 className="mt-1.5 line-clamp-2 text-base font-bold leading-snug text-foreground transition-colors group-hover:text-primary">
          {course.title}
        </h2>
        <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
          {course.subtitle}
        </p>

        <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
          <li className="inline-flex items-center gap-1">
            <PlayCircle className="h-3.5 w-3.5 shrink-0 text-primary" aria-hidden />
            {course.lectureCount} 堂
          </li>
          <li className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5 shrink-0 text-primary" aria-hidden />
            {course.videoHours}
          </li>
        </ul>

        <div className="mt-auto border-t border-border pt-4">
          <div className="flex flex-wrap items-baseline gap-x-1.5 gap-y-0.5">
            <span className="text-lg font-bold tabular-nums text-primary">
              {formatPrice(course.priceFrom)}
            </span>
            {course.priceOriginal ? (
              <span className="text-xs text-muted-foreground line-through">
                {formatPrice(course.priceOriginal)}
              </span>
            ) : null}
          </div>
          {savings ? (
            <p className="mt-0.5 text-[11px] font-medium text-primary/85">
              現省 {formatPrice(savings)}
            </p>
          ) : null}
          <Button
            size="sm"
            className="mt-3 w-full bg-primary hover:bg-primary/90"
            asChild
          >
            <ExternalLinkOnce
              href={purchaseHref}
              newTab
              analyticsLabel={`online_course_${course.id}`}
            >
              立即上課
              <ArrowRight className="ml-2 h-4 w-4" />
            </ExternalLinkOnce>
          </Button>
        </div>
      </div>
    </article>
  );
}

export function OnlineCoursesClient({ courses }: Props) {
  const platformHref = teachifyPlatformUrl();

  return (
    <div className="w-full">
      <section className="bg-gradient-to-br from-[#e8f5ee] to-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-primary/15 bg-white/80 px-4 py-1.5 text-sm text-primary">
            <GraduationCap className="h-4 w-4" aria-hidden />
            線上精選課程
          </div>
          <h1 className="mt-6 text-4xl font-bold leading-tight text-foreground lg:text-5xl">
            隨時學習，真正把每個觀念讀懂
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            品識學苑師資精心錄製的預錄課程，適合自主學習、課後複習與考前衝刺，可依照自己的步調反覆觀看，讓每一次學習都更加扎實。
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
              <ExternalLinkOnce
                href={platformHref}
                newTab
                analyticsLabel="online_courses_all_teachify"
              >
                前往品識學苑課程平台
                <ArrowRight className="ml-2 h-5 w-5" />
              </ExternalLinkOnce>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/courses">直播一對一／小班輔導</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-[#f7f9f7] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold text-foreground lg:text-3xl">精選課程</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              點選課程卡片前往 Teachify 選擇方案並完成購買
            </p>
          </div>

          <div
            className={
              courses.length === 1
                ? "mx-auto max-w-xs sm:max-w-sm"
                : "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            }
          >
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-white py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl font-bold text-foreground">
            線上課程 vs 直播輔導
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-[#f7f9f7] p-6">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <PlayCircle className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground">線上預錄課程</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                依照自己的步調學習，隨時複習、反覆觀看，適合自主學習、課後複習與考前衝刺。購買後即可立即開始學習。
              </p>
              <ExternalLinkOnce
                href={platformHref}
                newTab
                analyticsLabel="online_courses_compare_teachify"
                className="mt-3 inline-flex text-sm font-medium text-primary hover:underline"
              >
                前往品識學苑課程平台 →
              </ExternalLinkOnce>
            </div>
            <div className="rounded-xl border border-border bg-[#f7f9f7] p-6">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground">直播一對一／小班</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                與老師即時互動，針對個人學習狀況提供個別化指導，適合需要即時解惑、建立扎實觀念的學生。
              </p>
              <Link
                href="/courses"
                className="mt-3 inline-flex text-sm font-medium text-primary hover:underline"
              >
                了解直播輔導課程 →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl font-bold text-foreground">
            常見問題
          </h2>
          <Accordion type="single" collapsible className="mt-10 space-y-4">
            {faqItems.map((item, index) => (
              <AccordionItem
                key={item.q}
                value={`faq-${index}`}
                className="rounded-xl border border-border bg-[#f7f9f7] px-6 border-none"
              >
                <AccordionTrigger className="py-5 text-left hover:no-underline">
                  <span className="pr-4 font-semibold text-foreground">
                    {item.q}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="whitespace-pre-line pb-5 text-sm leading-relaxed text-muted-foreground">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="bg-gradient-to-br from-primary to-[#1a4d2e] py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white">
            不確定該選線上課還是直播輔導？
          </h2>
          <p className="mt-4 text-white/85">
            歡迎預約免費諮詢，我們依孩子程度與目標協助規劃。
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-white/90"
              asChild
            >
              <ExternalLinkOnce
                href={LINE_LINKS.consult}
                analyticsLabel="online_courses_line_consult"
              >
                預約免費諮詢
                <ArrowRight className="ml-2 h-5 w-5" />
              </ExternalLinkOnce>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white bg-transparent text-white hover:border-white hover:bg-white hover:text-primary"
              asChild
            >
              <ExternalLinkOnce
                href={platformHref}
                newTab
                analyticsLabel="online_courses_footer_teachify"
              >
                瀏覽全部線上課程
              </ExternalLinkOnce>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
