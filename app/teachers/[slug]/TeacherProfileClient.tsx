"use client";

import Link from "next/link";
import { motion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  HelpCircle,
  Lightbulb,
  MessageCircle,
  Quote,
  Search,
  Star,
  Target,
  User,
  Users,
  Video,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import { cn } from "@/components/ui/utils";
import { TeacherCard } from "@/components/teachers/TeacherCard";
import { LineCtaButton } from "@/components/LineCtaButton";
import { LINE_CTA_LABELS } from "@/lib/line-cta";
import { LINE_LINKS } from "@/lib/line-links";
import type { Teacher } from "@/content/teachers-data";
import { teachers } from "@/content/teachers-data";
import type { TeacherProfileContent } from "@/content/teacher-profiles";

type TeacherProfileClientProps = {
  teacher: Teacher;
  profile: TeacherProfileContent;
};

const featureIcons: LucideIcon[] = [
  MessageCircle,
  Search,
  ClipboardList,
  Lightbulb,
  Target,
];

const courseFormatIcons: LucideIcon[] = [User, Users, Video];

function SectionHeading({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-8 text-center sm:mb-10">
      <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
        {title}
      </h2>
      {description ? (
        <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
          {description}
        </p>
      ) : null}
    </div>
  );
}

export function TeacherProfileClient({
  teacher,
  profile,
}: TeacherProfileClientProps) {
  const otherTeachers = teachers.filter((t) => t.slug !== teacher.slug);

  return (
    <div className="w-full">
      {/* 1. Hero */}
      <section className="bg-gradient-to-br from-[#e8f5ee] to-white py-10 sm:py-14 lg:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <nav
            aria-label="breadcrumb"
            className="mb-6 text-sm text-muted-foreground"
          >
            <ol className="flex flex-wrap items-center gap-1.5">
              <li>
                <Link
                  href="/"
                  className="transition-colors hover:text-primary"
                >
                  首頁
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link
                  href="/teachers"
                  className="transition-colors hover:text-primary"
                >
                  師資團隊
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-foreground/80">{teacher.name}</li>
            </ol>
          </nav>

          <Link
            href="/teachers"
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            返回師資團隊
          </Link>

          <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,280px)_1fr] lg:gap-12">
            <motion.div
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mx-auto w-full max-w-[280px] overflow-hidden rounded-2xl border border-border bg-white shadow-sm lg:mx-0"
            >
              <div className="aspect-[2/3] bg-[#e8f5ee]">
                <ImageWithFallback
                  src={teacher.image}
                  alt={teacher.name}
                  className={cn(
                    "h-full w-full object-cover",
                    teacher.imagePosition === "center"
                      ? "object-center"
                      : "object-top",
                  )}
                />
              </div>
            </motion.div>

            <motion.div
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                  {teacher.subject}
                </span>
                <span className="rounded-full bg-white px-3 py-1 text-sm text-muted-foreground shadow-sm">
                  {teacher.grades}
                </span>
              </div>

              <h1 className="mb-1 text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
                {teacher.name}
              </h1>
              <p className="mb-4 text-base text-muted-foreground sm:text-lg">
                {teacher.jobTitle}
              </p>

              <div className="mb-5 flex flex-wrap gap-2">
                {profile.experienceHighlights.map((item) => (
                  <span
                    key={item}
                    className="rounded-lg bg-white px-3 py-1.5 text-sm text-foreground shadow-sm"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div className="mb-5 flex flex-wrap gap-2">
                {teacher.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded bg-[#e8f5ee] px-2.5 py-1 text-xs font-medium text-primary sm:text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <blockquote className="mb-6 border-l-4 border-primary pl-4 text-base italic leading-relaxed text-foreground/90 sm:text-lg">
                {teacher.philosophy}
              </blockquote>

              <div className="flex flex-row gap-2.5 sm:gap-3">
                <LineCtaButton
                  href={LINE_LINKS.consult}
                  analyticsLabel={`teacher_profile_${teacher.slug}_hero`}
                  label={LINE_CTA_LABELS.teacherProfileHero}
                  size="default"
                  className="h-11 min-w-0 flex-1 px-3 text-sm sm:h-12 sm:flex-none sm:px-8 sm:text-lg"
                />
                <Button
                  size="default"
                  variant="outline"
                  className="h-11 min-w-0 flex-1 rounded-full border-primary px-3 text-sm text-primary hover:bg-primary hover:text-white sm:h-12 sm:flex-none sm:px-8 sm:text-base"
                  asChild
                >
                  <Link href="/courses">了解課程</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. 關於老師 */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="關於老師"
            description={`認識 ${teacher.name} 老師的教學理念與陪伴方式`}
          />
          <div className="space-y-5 rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-8">
            {profile.aboutParagraphs.map((paragraph) => (
              <p
                key={paragraph.slice(0, 24)}
                className="text-base leading-relaxed text-muted-foreground"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* 3. 教學特色 */}
      <section className="bg-[#f7f9f7] py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="教學特色"
            description="從理解到應用，建立屬於學生自己的學習方法"
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:gap-5">
            {profile.teachingFeatures.map((feature, index) => {
              const Icon = featureIcons[index % featureIcons.length];
              return (
                <motion.div
                  key={feature.title}
                  initial={false}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="rounded-2xl border border-border bg-white p-5 shadow-sm sm:p-6"
                >
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#e8f5ee]">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. 適合哪些學生 */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="適合哪些學生"
            description="無論衝刺考試或重建基礎，都能找到適合的學習起點"
          />
          <div className="grid gap-3 sm:grid-cols-2">
            {profile.suitableStudents.map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 rounded-xl border border-border bg-white px-4 py-3.5 shadow-sm"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <span className="text-sm leading-relaxed text-foreground sm:text-base">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. 上課方式 */}
      <section className="bg-[#f7f9f7] py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="上課方式"
            description="依學習需求與生活節奏，選擇最適合的課程形式"
          />
          <div className="grid gap-5 md:grid-cols-3">
            {profile.courseFormats.map((format, index) => {
              const Icon = courseFormatIcons[index];
              return (
                <div
                  key={format.title}
                  className="flex h-full flex-col rounded-2xl border border-border bg-white p-6 shadow-sm"
                >
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#e8f5ee]">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-foreground">
                    {format.title}
                  </h3>
                  <p className="mb-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {format.description}
                  </p>
                  <p className="text-xs font-medium text-primary sm:text-sm">
                    {format.suitableFor}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. 教學流程 */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="教學流程"
            description="從諮詢到追蹤，每一步都為學習成效著想"
          />
          <div className="space-y-4">
            {profile.teachingProcess.map((step, index) => (
              <div
                key={step.title}
                className="flex gap-4 rounded-2xl border border-border bg-white p-5 shadow-sm sm:items-center sm:gap-5 sm:p-6"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                  {index + 1}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-base font-semibold text-foreground sm:text-lg">
                    {step.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>
                {index < profile.teachingProcess.length - 1 ? (
                  <ArrowRight className="hidden h-5 w-5 shrink-0 text-muted-foreground/40 lg:block" />
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. 學生評價 */}
      <section className="bg-[#f7f9f7] py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <SectionHeading title="學生評價" />
          <div className="rounded-2xl border border-border bg-white p-8 shadow-sm sm:p-10">
            <div className="mb-4 flex items-center gap-2">
              <Quote className="h-5 w-5 text-primary" />
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>
            </div>
            <p className="text-lg leading-relaxed text-foreground/90 sm:text-xl">
              「{teacher.studentReview}」
            </p>
            <p className="mt-5 text-sm text-muted-foreground">— 品識學苑學生</p>
          </div>
        </div>
      </section>

      {/* 8. FAQ */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-center justify-center gap-2 sm:mb-10">
            <HelpCircle className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              常見問題
            </h2>
          </div>
          <Accordion
            type="single"
            collapsible
            className="rounded-2xl border border-border bg-white px-5 shadow-sm sm:px-6"
          >
            {profile.faq.map((item, index) => (
              <AccordionItem key={item.question} value={`faq-${index}`}>
                <AccordionTrigger className="py-5 text-left text-base font-medium text-foreground hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-[0.9375rem] leading-relaxed text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* 其他老師 */}
      {otherTeachers.length > 0 ? (
        <section className="border-t border-border bg-[#f7f9f7] py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 flex items-end justify-between gap-4">
              <h2 className="text-2xl font-bold text-foreground">認識其他老師</h2>
              <Link
                href="/teachers"
                className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-[#1a4d2e]"
              >
                查看全部
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {otherTeachers.map((other) => (
                <TeacherCard key={other.slug} teacher={other} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* 9. 頁尾 CTA */}
      <section className="bg-gradient-to-br from-primary to-[#1a4d2e] py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
            {profile.footerCta.title}
          </h2>
          <p className="mb-8 text-lg leading-relaxed text-white/90">
            {profile.footerCta.description}
          </p>
          <LineCtaButton
            href={LINE_LINKS.consult}
            analyticsLabel={`teacher_profile_${teacher.slug}_footer`}
            label={LINE_CTA_LABELS.teacherProfileFooter}
            variant="inverse"
            className="px-8 text-lg"
          />
        </div>
      </section>
    </div>
  );
}
