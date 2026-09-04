"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { TeacherCard } from "@/components/teachers/TeacherCard";
import { homeTeachers } from "@/content/home/page-copy";
import { teachers } from "@/content/teachers-data";

export function HomeTeachersTrust() {
  const { title, subtitle, cta, ctaHref } = homeTeachers;

  return (
    <section className="bg-[#f7f9f7] py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center sm:mb-12"
        >
          <h2 className="mb-3 text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
            {title}
          </h2>
          <p className="text-muted-foreground">{subtitle}</p>
        </motion.div>

        <div className="mx-auto mb-10 grid max-w-4xl gap-4 sm:gap-5 md:grid-cols-2">
          {teachers.map((teacher) => (
            <TeacherCard key={teacher.slug} teacher={teacher} />
          ))}
        </div>

        <div className="text-center">
          <Link
            href={ctaHref}
            className="inline-flex items-center gap-2 text-base font-semibold text-primary hover:underline"
          >
            {cta}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
