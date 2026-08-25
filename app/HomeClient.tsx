"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "motion/react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  XCircle,
  Book,
  Globe,
  Calculator,
  Leaf,
  Beaker,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Video,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { LineCtaButton } from "@/components/LineCtaButton";
import { StickyLineCta } from "@/components/StickyLineCta";
import { LearningProcess } from "@/components/LearningProcess";
import { LINE_CTA_LABELS } from "@/lib/line-cta";
import { LINE_LINKS } from "@/lib/line-links";
import { page as studentSuccessPage } from "@/content/student-success/page-copy";
import { dreamProjectHomePromo } from "@/content/dream-project/page-copy";
import type { BlogPostSummary } from "@/content/content-api/types";
import type { FaqItem } from "@/content/faq-data";

type HomeClientProps = {
  latestPosts: BlogPostSummary[];
  faqPreview: FaqItem[];
};

const coreValues = [
  {
    icon: "品",
    title: "品德",
    subtitle: "Character",
    description: "培養面對人生的責任感與選擇能力",
  },
  {
    icon: "知",
    title: "知識",
    subtitle: "Knowledge",
    description: "建立紮實學科基礎與學習方法",
  },
  {
    icon: "見",
    title: "見識",
    subtitle: "Vision",
    description: "拓展視野與獨立思考的能力",
  },
  {
    icon: "膽",
    title: "膽識",
    subtitle: "Courage",
    description: "勇於面對挑戰與克服困難",
  },
];

const painPoints = [
  {
    problem: "很努力讀書，成績卻卡關",
    solution: "建立清晰思路，理解不再只是死記",
  },
  {
    problem: "越讀越沒自信，開始懷疑自己",
    solution: "小步前進，讓孩子重新找回成就感",
  },
  {
    problem: "不知道自己到底哪裡不會",
    solution: "精準診斷，找出真正卡關原因",
  },
  {
    problem: "試過很多方法，卻都沒效果",
    solution: "客製化策略，讓學習開始有效",
  },
];

const subjects = [
  {
    icon: Book,
    name: "國文",
    description: "理解文意，培養閱讀與表達能力",
  },
  {
    icon: Globe,
    name: "英文",
    description: "建立語感，活用而非死背單字",
  },
  {
    icon: Calculator,
    name: "數學",
    description: "理解概念，建立解題思維",
  },
  {
    icon: Leaf,
    name: "社會",
    description: "連結時事，理解脈絡而非背誦",
  },
  {
    icon: Beaker,
    name: "自然",
    description: "理解原理，題目不再靠猜",
  },
  {
    icon: GraduationCap,
    name: "升學策略",
    description: "規劃升學方向，掌握考試策略",
  },
];

const stats = [
  { value: "95%", label: "學生在3個月內看到進步" },
  { value: "4.8", label: "平均滿意度" },
  { value: "500+", label: "輔導學生數" },
  { value: "5", label: "核心學科涵蓋" },
];

const homeParents = studentSuccessPage.parents;

function HomeParentsCarousel({
  items,
}: {
  items: typeof homeParents;
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "center",
    loop: true,
    slidesToScroll: 1,
  });
  const [selected, setSelected] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelected(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const sync = () => {
      setScrollSnaps(emblaApi.scrollSnapList());
      onSelect();
    };
    sync();
    emblaApi.on("reInit", sync);
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("reInit", sync);
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y">
          {items.map((item) => (
            <div
              key={`${item.name}-${item.quote.slice(0, 16)}`}
              className="min-w-0 flex-[0_0_100%] px-1"
            >
              <figure className="rounded-2xl border border-border bg-gradient-to-br from-[#e8f5ee] to-white p-6 sm:p-8 lg:p-10">
                <p className="mb-4 text-sm font-medium text-primary">
                  家長回饋
                </p>
                <blockquote className="text-left text-base leading-[1.85] text-foreground sm:text-lg">
                  「{item.quote}」
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-border/60 pt-5">
                  <span
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-white text-sm font-semibold text-primary"
                    aria-hidden
                  >
                    {item.name.slice(0, 1)}
                  </span>
                  <span className="text-left">
                    <span className="block text-sm font-semibold text-foreground sm:text-base">
                      {item.name}
                      <span className="font-normal text-muted-foreground">
                        {" "}
                        · {item.role}
                      </span>
                    </span>
                    <span className="block text-sm text-muted-foreground">
                      {item.context}
                    </span>
                  </span>
                </figcaption>
              </figure>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 flex items-center justify-center gap-3">
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="rounded-full"
          onClick={() => emblaApi?.scrollPrev()}
          aria-label="上一則家長推薦"
        >
          <ChevronLeft className="size-5" />
        </Button>

        <p className="min-w-[4.5rem] text-center text-sm tabular-nums text-muted-foreground">
          {selected + 1} / {scrollSnaps.length || items.length}
        </p>

        <Button
          type="button"
          variant="outline"
          size="icon"
          className="rounded-full"
          onClick={() => emblaApi?.scrollNext()}
          aria-label="下一則家長推薦"
        >
          <ChevronRight className="size-5" />
        </Button>
      </div>
    </div>
  );
}

export function HomeClient({ latestPosts, faqPreview }: HomeClientProps) {
  return (
    <div className="w-full pb-24 md:pb-0">
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              為什麼我們不只在教成績？
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              因為真正能讓孩子長期進步的，從來不只是分數
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreValues.map((value, index) => (
              <motion.div
                key={value.title}
                initial={false}
                animate={{ opacity: 1, y: 0 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <span className="text-white text-3xl font-bold">
                    {value.icon}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {value.title}
                </h3>
                <div className="text-sm text-primary mb-3">
                  {value.subtitle}
                </div>
                <p className="text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#f7f9f7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={false}
              animate={{ opacity: 1, x: 0 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-8">
                努力讀書，成績還是上不去？
              </h2>
              <div className="space-y-4">
                {painPoints.map((point, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-4 bg-white rounded-lg"
                  >
                    <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{point.problem}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={false}
              animate={{ opacity: 1, x: 0 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-8">
                我們怎麼幫學生突破卡關？
              </h2>
              <div className="space-y-4">
                {painPoints.map((point, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-4 bg-[#e8f5ee] rounded-lg border border-primary/20"
                  >
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground font-medium">
                      {point.solution}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              每個科目，都有對的方法
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              提供預錄課程與家教制課程，從學科到升學規劃，全方位陪伴學習成長
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
            {subjects.map((subject, index) => (
              <motion.div
                key={subject.name}
                initial={false}
                animate={{ opacity: 1, y: 0 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.06 }}
                className="h-full rounded-xl border border-border bg-[#f7f9f7] p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-border/70 bg-white">
                    <subject.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="mb-1.5 text-lg font-semibold text-foreground">
                      {subject.name}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {subject.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-16">
            <h3 className="text-2xl font-bold text-foreground text-center mb-8">
              孩子適合哪種學習方式？
            </h3>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
              <motion.div
                initial={false}
                animate={{ opacity: 1, x: 0 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-xl p-6 border-2 border-primary/20"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="text-xl font-semibold text-foreground">
                    家教制課程
                  </h4>
                </div>
                <p className="text-muted-foreground mb-4">
                  小班制即時互動教學，老師充分關注每位學生，即時解答疑問
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-sm text-foreground">
                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>每班不超過8人</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-foreground">
                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>即時互動問答</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-foreground">
                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>個人化進度調整</span>
                  </li>
                </ul>
              </motion.div>

              <motion.div
                initial={false}
                animate={{ opacity: 1, x: 0 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex h-full flex-col rounded-xl border-2 border-primary/20 bg-white p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Video className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="text-xl font-semibold text-foreground">
                    預錄課程
                  </h4>
                </div>
                <p className="text-muted-foreground mb-4">
                  高品質錄製課程，隨時隨地學習，依照自己的步調反覆觀看
                </p>
                <ul className="mb-4 space-y-2">
                  <li className="flex items-start gap-2 text-sm text-foreground">
                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>彈性學習時間</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-foreground">
                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>無限次重複觀看</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-foreground">
                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>配套練習題庫</span>
                  </li>
                </ul>
                <Link
                  href="/online-courses"
                  className="mt-auto inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                >
                  瀏覽線上預錄課程
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
            </div>
          </div>

          <div className="text-center space-y-4">
            <div className={`flex flex-col items-center gap-3 sm:flex-row sm:justify-center`}>
              <LineCtaButton
                href={LINE_LINKS.consult}
                analyticsLabel="home_subjects_line_consult"
                label={LINE_CTA_LABELS.homeHero}
                className="w-full bg-primary px-8 text-lg hover:bg-primary/90 sm:w-auto"
              />
              <Button
                size="lg"
                variant="outline"
                className="h-12 w-full rounded-full border-primary px-8 text-lg text-primary hover:bg-primary/5 sm:w-auto"
                asChild
              >
                <Link href="/courses">
                  查看完整課程內容
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm">
              <Link
                href="/live-events"
                className="font-medium text-primary hover:underline"
              >
                免費直播公開課
              </Link>
              <Link
                href="/online-courses"
                className="font-medium text-primary hover:underline"
              >
                線上預錄課程
              </Link>
            </div>
          </div>
        </div>
      </section>

      <LearningProcess showCta analyticsLabel="home_learning_process_line_consult" />

      <section className="py-20 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-center text-white mb-12 max-w-3xl mx-auto leading-snug">
            這些數據，來自我們實際帶過的學生
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl lg:text-5xl font-bold mb-2">
                  {stat.value}
                </div>
                <div className="text-white/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-10 text-center"
          >
            <h2 className="mb-3 text-3xl font-bold text-foreground lg:text-4xl">
              {studentSuccessPage.parentsTitle}
            </h2>
            <p className="text-muted-foreground">
              {studentSuccessPage.parentsNote}
            </p>
          </motion.div>

          <div className="mx-auto max-w-3xl">
            <HomeParentsCarousel items={homeParents} />
          </div>

          <div className="mt-12 space-y-4 text-center">
            <LineCtaButton
              href={LINE_LINKS.consult}
              analyticsLabel="home_parents_line_consult"
              label={LINE_CTA_LABELS.homeHero}
              className="px-8 text-lg"
            />
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
              <Link
                href="/teachers"
                className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
              >
                認識完整師資團隊
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/student-success"
                className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
              >
                查看更多學生成果
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f7f9f7] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl text-center"
          >
            <p className="mb-3 text-sm font-medium text-primary">
              {dreamProjectHomePromo.tagline}
            </p>
            <h2 className="mb-4 text-3xl font-bold text-foreground lg:text-4xl">
              {dreamProjectHomePromo.title}
            </h2>
            <div className="mb-8 space-y-3 text-base leading-relaxed text-muted-foreground sm:text-lg">
              {dreamProjectHomePromo.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <Button
              size="lg"
              className="rounded-full bg-primary px-8 text-primary-foreground hover:bg-primary/90"
              asChild
            >
              <Link href="/dream-project">
                {dreamProjectHomePromo.cta}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {(latestPosts.length > 0 || faqPreview.length > 0) && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid items-stretch gap-12 lg:grid-cols-2">
              {latestPosts.length > 0 && (
                <div className="flex h-full min-h-0 flex-col">
                  <h2 className="mb-6 shrink-0 text-2xl font-bold text-foreground">
                    最新學習專欄
                  </h2>
                  <ul className="min-h-0 flex-1 space-y-4">
                    {latestPosts.map((post) => (
                      <li key={post.slug}>
                        <Link
                          href={`/blog/${post.slug}`}
                          className="block rounded-lg border border-border bg-white p-4 transition-all hover:border-primary/30 hover:shadow-sm"
                        >
                          <div className="mb-1 text-xs text-muted-foreground">
                            {post.frontmatter.date}
                          </div>
                          <div className="leading-snug font-medium text-foreground">
                            {post.frontmatter.title}
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/blog"
                    className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-medium text-primary hover:underline"
                  >
                    瀏覽全部文章
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              )}

              {faqPreview.length > 0 && (
                <div className="flex h-full min-h-0 flex-col">
                  <h2 className="mb-6 shrink-0 text-2xl font-bold text-foreground">
                    常見問題
                  </h2>
                  <ul className="min-h-0 flex-1 space-y-4">
                    {faqPreview.map((item) => (
                      <li
                        key={item.q}
                        className="rounded-lg border border-border bg-white p-4"
                      >
                        <p className="mb-2 font-medium text-foreground">
                          {item.q}
                        </p>
                        <p className="line-clamp-2 text-sm text-muted-foreground">
                          {item.a}
                        </p>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/faq"
                    className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-medium text-primary hover:underline"
                  >
                    查看全部 FAQ
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <div className="pt-6 text-center sm:text-left">
                    <LineCtaButton
                      href={LINE_LINKS.consult}
                      analyticsLabel="home_faq_preview_line_consult"
                      label={LINE_CTA_LABELS.homeHero}
                      size="default"
                      className="w-full sm:w-auto"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

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
              孩子成績卡住，不知道問題在哪？
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              免費學習評估，幫你找出真正的卡關點，給你明確方向
            </p>
            <LineCtaButton
              href={LINE_LINKS.consult}
              analyticsLabel="home_cta_line_assessment"
              label={LINE_CTA_LABELS.homeAssessment}
              variant="inverse"
              className="text-lg px-8"
            />
          </motion.div>
        </div>
      </section>

      <StickyLineCta
        analyticsLabel="home_sticky_line_consult"
        dismissKey="psa_home_sticky_line_dismissed"
      />
    </div>
  );
}

