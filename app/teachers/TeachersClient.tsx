"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ArrowRight, Award, BookOpen, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TeacherCard } from "@/components/teachers/TeacherCard";
import { LineCtaButton } from "@/components/LineCtaButton";
import { TeacherSelectionProcess } from "@/components/TeacherSelectionProcess";
import { LINE_CTA_LABELS } from "@/lib/line-cta";
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

export function TeachersClient() {
  return (
    <div className="w-full">
      <section className="bg-gradient-to-br from-[#e8f5ee] to-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto mb-16 max-w-4xl text-center"
          >
            <h1 className="mb-6 text-4xl font-bold leading-tight text-foreground lg:text-5xl">
              專業師資團隊
            </h1>
            <p className="text-xl leading-relaxed text-muted-foreground">
              品識學苑的每位老師都具備豐富教學經驗與學科專業，更重要的是，他們真心關注每位學生的成長，用心陪伴每個學習旅程。
            </p>
          </motion.div>

          <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-3">
            {teacherCulture.map((item, index) => (
              <motion.div
                key={item.title}
                initial={false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                className="rounded-xl bg-white p-6 text-center shadow-sm"
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-lg bg-primary/10">
                  <item.icon className="h-7 w-7 text-primary" />
                </div>
                <h2 className="mb-2 text-lg font-semibold text-foreground">
                  {item.title}
                </h2>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <TeacherSelectionProcess sectionClassName="bg-[#f7f9f7]" />

      <section className="bg-[#f7f9f7] py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center sm:mb-12">
            <h2 className="mb-3 text-3xl font-bold text-foreground">
              認識我們的老師
            </h2>
            <p className="mx-auto max-w-xl text-muted-foreground">
              找到最適合孩子的老師，了解每位老師的教學理念、專長與教學特色。
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {teachers.map((teacher, index) => (
              <motion.div
                key={teacher.slug}
                initial={false}
                animate={{ opacity: 1, y: 0 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="h-full"
              >
                <TeacherCard teacher={teacher} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f7f9f7] py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mb-4 text-3xl font-bold text-foreground lg:text-4xl">
              對教育充滿熱情？
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
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
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-primary to-[#1a4d2e] py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mb-6 text-3xl font-bold text-white lg:text-4xl">
              想認識適合孩子的老師？
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-xl text-white/90">
              預約學習評估，我們將根據學生的學習需求，為您推薦最適合的師資
            </p>
            <LineCtaButton
              href={LINE_LINKS.consult}
              analyticsLabel="teachers_line_consult"
              label={LINE_CTA_LABELS.teachers}
              variant="inverse"
              className="px-8 text-lg"
            />
          </motion.div>
        </div>
      </section>
    </div>
  );
}
