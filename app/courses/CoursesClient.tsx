"use client";

import { motion } from "motion/react";
import Link from "next/link";
import {
  Book,
  Globe,
  Calculator,
  Leaf,
  Beaker,
  CheckCircle2,
  GraduationCap,
  User,
  Video,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { LineCtaButton } from "@/components/LineCtaButton";
import { LineCtaLabel } from "@/components/LineCtaLabel";
import { ExternalLinkOnce } from "@/components/ExternalLinkOnce";
import { StickyLineCta } from "@/components/StickyLineCta";
import { courseLineCtaLabel, LINE_CTA_LABELS } from "@/lib/line-cta";
import { LINE_LINKS } from "@/lib/line-links";
import {
  CTA_LINE_ON_DARK_CLASS,
  CTA_ROW_CLASS,
  CTA_SECONDARY_ON_DARK_CLASS,
} from "@/lib/cta-button-styles";
import { scheduleScrollToTop } from "@/lib/scroll-to-top";
import { useState } from "react";

const SUBJECT_CARD_CLASS =
  "rounded-2xl border border-border bg-[#f7f9f7] p-8 lg:p-10";

const courses = [
  {
    icon: Book,
    name: "國文",
    englishName: "Chinese",
    features: [
      "理解勝過記憶：深入解析文意與寫作技巧",
      "培養閱讀素養：從古文到現代文的全方位訓練",
      "表達能力提升：作文結構與修辭手法實戰",
      "考試策略指導：掌握答題技巧與時間分配",
    ],
    highlights: "透過文本分析與討論，培養獨立思考與文學鑑賞能力",
    lineHref: LINE_LINKS.humanities,
  },
  {
    icon: Globe,
    name: "英文",
    englishName: "English",
    features: [
      "建立語感：從聽說讀寫全方位提升英語能力",
      "活用單字：透過情境學習，不再死背單字",
      "文法理解：系統化建構文法觀念與應用",
      "閱讀策略：掌握長篇文章的理解與分析技巧",
    ],
    highlights: "重視實際應用，讓英文成為溝通工具而非考試科目",
    lineHref: LINE_LINKS.humanities,
  },
  {
    icon: Calculator,
    name: "數學",
    englishName: "Mathematics",
    features: [
      "建立思路：理解數學概念，而非死記公式",
      "解題策略：培養邏輯推理與問題拆解能力",
      "錯誤分析：從錯誤中學習，找出盲點突破",
      "靈活應用：將數學概念應用於各類題型",
    ],
    highlights: "從基礎概念出發，循序漸進建立完整的數學思維",
    lineHref: LINE_LINKS.stem,
  },
  {
    icon: Leaf,
    name: "社會",
    englishName: "Social Studies",
    features: [
      "理解脈絡：連結歷史、地理與公民的整合學習",
      "時事連結：將課本知識與現實世界結合",
      "圖表判讀：培養資料分析與批判思考能力",
      "記憶技巧：透過理解與聯想，有效記憶重點",
    ],
    highlights: "不只是背誦，更要理解社會現象背後的因果關係",
    lineHref: LINE_LINKS.stem,
  },
  {
    icon: Beaker,
    name: "自然",
    englishName: "Science",
    features: [
      "探索原理：從實驗與觀察理解科學概念",
      "邏輯推理：培養科學思維與假設驗證能力",
      "生活應用：將科學知識連結日常生活經驗",
      "圖表分析：掌握實驗數據與圖表判讀技巧",
    ],
    highlights: "激發好奇心，培養探索自然世界的科學精神",
    lineHref: LINE_LINKS.stem,
  },
  {
    icon: GraduationCap,
    name: "升學策略",
    englishName: "Academic Planning",
    features: [
      "目標設定：根據興趣與能力，規劃升學方向",
      "資源整合：有效運用學習資源，優化讀書計畫",
      "考試策略：掌握各類升學考試的準備方法",
      "時間管理：建立高效率的學習與複習節奏",
    ],
    highlights: "從目標設定到考試準備，完整的升學規劃與諮詢",
    lineHref: LINE_LINKS.stem,
  },
];

type CourseFormatId = "oneOnOne" | "smallGroup" | "recorded";

const courseFormats: Record<
  CourseFormatId,
  {
    label: string;
    icon: typeof User;
    title: string;
    tagline: string;
    description: string;
    features: string[];
  }
> = {
  oneOnOne: {
    label: "一對一課程",
    icon: User,
    title: "一對一課程",
    tagline: "每一堂課，都只為孩子而設計",
    description:
      "根據學生的程度、學習目標與學習節奏調整教學內容，打造真正適合每位學生的一對一學習體驗",
    features: [
      "即時互動提問，問題當下解決",
      "客製化教學安排，依程度調整進度",
      "定期追蹤學習成效",
      "LINE 課後學習支援",
    ],
  },
  smallGroup: {
    label: "小班互動課程",
    icon: Users,
    title: "小班互動課程",
    tagline: "在互動中學習，在討論中成長",
    description:
      "透過小班教學兼顧老師引導與同儕互動，讓每位學生都有發言、思考與練習的機會",
    features: [
      "小班互動教學，提升學習參與感",
      "即時提問與課堂討論",
      "同儕交流，激發學習動力",
      "老師即時回饋與觀念修正",
    ],
  },
  recorded: {
    label: "預錄課程",
    icon: Video,
    title: "預錄課程",
    tagline: "不受時間限制，依自己的步調學習",
    description:
      "把學習安排在最適合自己的時間，遇到不懂的地方可以反覆觀看，真正理解每個觀念",
    features: [
      "彈性安排學習時間",
      "課程可反覆觀看",
      "系統化章節規劃",
      "線上課業支援，不怕卡關",
    ],
  },
};

const courseFormatOrder: CourseFormatId[] = [
  "oneOnOne",
  "smallGroup",
  "recorded",
];

export function CoursesClient() {
  const [courseType, setCourseType] = useState<CourseFormatId>("oneOnOne");
  const activeFormat = courseFormats[courseType];
  const FormatIcon = activeFormat.icon;

  const handleCourseTypeChange = (id: CourseFormatId) => {
    setCourseType(id);

    if (window.matchMedia("(max-width: 767px)").matches) {
      scheduleScrollToTop();
    }
  };

  return (
    <div className="w-full pb-24 md:pb-0">
      <section className="py-20 lg:py-28 bg-gradient-to-br from-[#e8f5ee] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
              孩子努力了，成績卻還是上不來？
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              我們不只是教科目，而是幫孩子建立真正能進步的學習方法
            </p>
            <div className="mb-8 flex flex-wrap justify-center gap-3">
              {courseFormatOrder.map((id) => {
                const format = courseFormats[id];
                const Icon = format.icon;
                const isActive = courseType === id;

                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => handleCourseTypeChange(id)}
                    className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all sm:px-6 sm:py-3 sm:text-base ${
                      isActive
                        ? "bg-primary text-white shadow-lg"
                        : "bg-white text-muted-foreground hover:bg-white/80"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    {format.label}
                  </button>
                );
              })}
            </div>

            <div className="mx-auto mb-8 max-w-3xl rounded-2xl bg-white p-6 text-left shadow-sm sm:p-8">
              <div className="mb-4 flex items-center gap-2">
                <FormatIcon className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-semibold text-foreground sm:text-xl">
                  {activeFormat.title}
                </h2>
              </div>
              <p className="mb-2 text-base font-medium text-foreground">
                {activeFormat.tagline}
              </p>
              <p className="mb-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
                {activeFormat.description}
              </p>
              <div className="grid gap-3 md:grid-cols-2">
                {activeFormat.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span className="text-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={`${CTA_ROW_CLASS} justify-center`}>
              <LineCtaButton
                href={LINE_LINKS.coursesConsult}
                analyticsLabel="courses_hero_line_consult"
                label={LINE_CTA_LABELS.coursesBottom}
                className="w-full bg-primary px-8 text-lg hover:bg-primary/90 sm:w-auto"
              />
              {courseType === "recorded" ? (
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 w-full rounded-full border-primary px-8 text-lg text-primary hover:bg-primary/5 sm:w-auto"
                  asChild
                >
                  <Link href="/online-courses">瀏覽預錄課程</Link>
                </Button>
              ) : (
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 w-full rounded-full border-primary px-8 text-lg text-primary hover:bg-primary/5 sm:w-auto"
                  asChild
                >
                  <Link href="/pricing">查看課程費用</Link>
                </Button>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {courses.map((course, index) => (
              <motion.div
                key={course.name}
                initial={false}
                animate={{ opacity: 1, y: 0 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={SUBJECT_CARD_CLASS}
              >
                <div className="grid lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-1">
                    <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary shadow-lg">
                      <course.icon className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="text-3xl font-bold text-foreground mb-2">
                      {course.name}
                    </h3>
                    <div className="text-lg text-muted-foreground mb-4">
                      {course.englishName}
                    </div>
                    <div className="mb-6 flex flex-wrap gap-2">
                      <span className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-sm font-medium text-primary">
                        <User className="h-3 w-3" />
                        一對一
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-sm font-medium text-primary">
                        <Users className="h-3 w-3" />
                        小班
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-sm font-medium text-primary">
                        <Video className="h-3 w-3" />
                        預錄
                      </span>
                    </div>
                    <p className="text-foreground/80 italic border-l-4 border-primary pl-4">
                      {course.highlights}
                    </p>
                  </div>

                  <div className="lg:col-span-2">
                    <h4 className="text-xl font-semibold text-foreground mb-6">
                      教學特色
                    </h4>
                    <ul className="space-y-4 mb-8">
                      {course.features.map((feature, i) => {
                        const [title, ...rest] = feature.split("：");
                        const description = rest.join("：");
                        return (
                          <li key={i} className="flex items-start gap-3">
                            <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                            <div>
                              <span className="font-semibold text-foreground">
                                {title}
                              </span>
                              {description && (
                                <>
                                  <span className="text-foreground">：</span>
                                  <span className="text-foreground/80">
                                    {description}
                                  </span>
                                </>
                              )}
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                    <Button
                      variant="outline"
                      className="border-primary text-primary hover:bg-primary hover:text-white"
                      asChild
                    >
                      <ExternalLinkOnce
                        href={course.lineHref}
                        analyticsLabel={`courses_${course.name}_line`}
                      >
                        <LineCtaLabel
                          iconClassName="size-4"
                          label={courseLineCtaLabel(course.name)}
                        />
                      </ExternalLinkOnce>
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-primary to-[#1a4d2e]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              孩子現在的學習方式，真的適合他嗎？
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              多數孩子不是不努力，而是沒有找到對的方法
              <br />
              我們用專業診斷，幫你找出最適合的學習路徑
            </p>
            <div className={`${CTA_ROW_CLASS} justify-center`}>
              <LineCtaButton
                href={LINE_LINKS.coursesConsult}
                analyticsLabel="courses_line_consult"
                label={LINE_CTA_LABELS.coursesBottom}
                variant="inverse"
                className={`text-lg px-8 ${CTA_LINE_ON_DARK_CLASS}`}
              />
              <Button size="lg" className={CTA_SECONDARY_ON_DARK_CLASS} asChild>
                <Link href="/pricing">查看課程費用</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <StickyLineCta
        analyticsLabel="courses_sticky_line_consult"
        dismissKey="psa_courses_sticky_line_dismissed"
      />
    </div>
  );
}
