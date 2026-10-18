"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import {
  DreamProse,
  DreamSection,
} from "@/components/dream-project/layout";
import {
  teachersFacultyCards,
  teachersFacultySection,
} from "@/content/teachers/page-copy";
import { getTeacherBySlug } from "@/content/teachers-data";
import { cn } from "@/components/ui/utils";

export function TeachersFaculty() {
  const { id, title, paragraphs } = teachersFacultySection;

  return (
    <DreamSection id={id} bg="muted" innerClassName="max-w-5xl">
      <motion.header
        initial={false}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto mb-8 max-w-3xl text-center sm:mb-10"
      >
        <h2 className="mb-3 text-2xl font-bold tracking-tight text-foreground text-balance sm:mb-4 sm:text-3xl">
          {title}
        </h2>
        <DreamProse paragraphs={paragraphs} className="text-left sm:text-center" />
      </motion.header>

      <div className="space-y-5 sm:space-y-6">
        {teachersFacultyCards.map((card) => {
          const teacher = getTeacherBySlug(card.slug);
          if (!teacher) return null;

          return (
            <motion.article
              key={card.slug}
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="rounded-2xl border border-border/70 bg-white p-4 shadow-sm sm:p-5 lg:p-6"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-5 lg:gap-6">
                <div className="relative mx-auto aspect-[3/4] w-[140px] shrink-0 overflow-hidden rounded-xl bg-[#e8f5ee] shadow-sm ring-1 ring-black/5 sm:mx-0 sm:w-[150px] lg:w-[160px]">
                  <ImageWithFallback
                    src={teacher.image}
                    alt={`${teacher.name}｜品識學苑${teacher.subject}核心教師`}
                    className={cn(
                      "absolute inset-0 h-full w-full object-cover",
                      teacher.imagePosition === "center"
                        ? "object-center"
                        : "object-top",
                    )}
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="mb-3 flex flex-wrap items-center gap-2">
                    <span className="rounded-md bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                      {teacher.subject}
                    </span>
                    <span className="text-xs text-muted-foreground sm:text-sm">
                      {teacher.grades}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                    {teacher.name}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {teacher.jobTitle}
                    <span className="mx-1.5 text-border" aria-hidden="true">
                      ·
                    </span>
                    {teacher.experience}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {card.featureTags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded bg-[#e8f5ee] px-2 py-0.5 text-xs font-medium text-primary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <blockquote className="mt-4 border-l-2 border-primary pl-3 text-[0.9375rem] font-medium leading-snug text-foreground sm:text-base sm:leading-relaxed">
                    {card.statement}
                  </blockquote>

                  <p className="mt-3 text-sm leading-[1.75] text-muted-foreground">
                    {card.body}
                  </p>

                  <p className="mt-3 rounded-lg bg-[#f7f9f7] px-3 py-2 text-sm leading-relaxed text-foreground/90">
                    <span className="font-medium text-primary">適合｜</span>
                    {card.suitableFor.replace(/^適合/, "")}
                  </p>

                  <Link
                    href={`/teachers/${teacher.slug}`}
                    className="mt-4 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
                  >
                    {card.profileCta}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>
    </DreamSection>
  );
}
