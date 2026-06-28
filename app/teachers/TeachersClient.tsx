"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ArrowRight, Star, Award, BookOpen, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import { ExternalLinkOnce } from "@/components/ExternalLinkOnce";
import { TeacherSelectionProcess } from "@/components/TeacherSelectionProcess";
import { LINE_LINKS } from "@/lib/line-links";
import { teachers } from "@/content/teachers-data";

const teacherCulture = [
  {
    icon: Award,
    title: "專業資格",
    description: "具備教學經驗與學科專業背景",
  },
  {
    icon: BookOpen,
    title: "持續成長",
    description: "定期研習與教學方法精進",
  },
  {
    icon: Users,
    title: "用心陪伴",
    description: "關注每位學生的學習狀況與心理需求",
  },
];

const teacherCultureItems = teacherCulture;

export function TeachersClient() {
  return (
    <div className="w-full">
      <section className="py-20 lg:py-28 bg-gradient-to-br from-[#e8f5ee] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto mb-16"
          >
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
              專業師資團隊
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              品識學苑的每位老師都具備豐富教學經驗與學科專業，更重要的是，他們真心關注每位學生的成長，用心陪伴每個學習旅程。
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {teacherCultureItems.map((item, index) => (
              <motion.div
                key={item.title}
                initial={false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-sm text-center"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-7 h-7 text-primary" />
                </div>
                <h2 className="text-lg font-semibold text-foreground mb-2">
                  {item.title}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <TeacherSelectionProcess sectionClassName="bg-[#f7f9f7]" />

      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-5 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {teachers.map((teacher, index) => (
              <motion.div
                key={teacher.name}
                initial={false}
                animate={{ opacity: 1, y: 0 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="overflow-hidden rounded-xl border border-border bg-white transition-shadow hover:shadow-lg"
              >
                <div className="flex gap-4 p-4 md:block md:p-0">
                  <div className="aspect-[3/4] w-28 shrink-0 overflow-hidden rounded-lg bg-[#f7f9f7] sm:w-32 md:aspect-[3/4] md:w-full md:rounded-none">
                    <ImageWithFallback
                      src={teacher.image}
                      alt={teacher.name}
                      className="h-full w-full object-cover object-[50%_18%]"
                    />
                  </div>

                  <div className="min-w-0 flex-1 md:hidden">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="text-lg font-bold text-foreground">
                          {teacher.name}
                        </h3>
                        <div className="text-sm text-muted-foreground">
                          {teacher.experience}
                        </div>
                      </div>
                      <div className="shrink-0 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                        {teacher.subject}
                      </div>
                    </div>

                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {teacher.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded bg-[#f7f9f7] px-2 py-0.5 text-xs text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <p className="mt-2 line-clamp-3 text-sm italic leading-relaxed text-foreground/80">
                      {teacher.philosophy}
                    </p>
                  </div>
                </div>

                <div className="px-4 pb-4 md:p-6">
                  <div className="mb-3 hidden items-start justify-between gap-3 md:flex">
                    <div>
                      <h3 className="text-xl font-bold text-foreground">
                        {teacher.name}
                      </h3>
                      <div className="text-sm text-muted-foreground">
                        {teacher.experience}
                      </div>
                    </div>
                    <div className="shrink-0 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                      {teacher.subject}
                    </div>
                  </div>

                  <div className="mb-3 hidden flex-wrap gap-2 md:mb-4 md:flex">
                    {teacher.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded bg-[#f7f9f7] px-2 py-1 text-xs text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <p className="mb-3 hidden border-l-2 border-primary pl-3 text-sm italic leading-relaxed text-foreground/80 md:mb-4 md:block">
                    {teacher.philosophy}
                  </p>

                  <div className="rounded-lg bg-[#e8f5ee] p-3 md:p-4">
                    <div className="mb-1.5 flex items-center gap-1 md:mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-3 w-3 fill-amber-400 text-amber-400"
                        />
                      ))}
                    </div>
                    <p className="text-sm leading-relaxed text-foreground/80">
                      {teacher.studentReview}
                    </p>
                    <div className="mt-2 text-xs text-muted-foreground">
                      — 學生評價
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#f7f9f7]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              對教育充滿熱情？
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              品識學苑正在尋找志同道合的教育夥伴，一起為學生創造更好的學習體驗
            </p>
            <Button
              size="lg"
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-white"
              asChild
            >
              <Link href="/teacher-recruitment">
                了解師資招募
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </motion.div>
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
              想認識適合孩子的老師？
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              預約免費諮詢，我們將根據學生的學習需求，為您推薦最適合的師資
            </p>
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-white/90 text-lg px-8"
              asChild
            >
              <ExternalLinkOnce
                href={LINE_LINKS.consult}
                analyticsLabel="teachers_line_consult"
              >
                預約免費諮詢
                <ArrowRight className="ml-2 w-5 h-5" />
              </ExternalLinkOnce>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

