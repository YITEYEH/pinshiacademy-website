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
        className="mx-auto mb-12 max-w-3xl text-center sm:mb-16"
      >
        <h2 className="mb-5 text-2xl font-bold tracking-tight text-foreground text-balance sm:mb-6 sm:text-3xl lg:text-4xl">
          {title}
        </h2>
        <DreamProse paragraphs={paragraphs} className="text-left sm:text-center" />
      </motion.header>

      <div className="space-y-14 sm:space-y-20">
        {teachersFacultyCards.map((card, index) => {
          const teacher = getTeacherBySlug(card.slug);
          if (!teacher) return null;
          const imageFirst = index % 2 === 0;

          return (
            <motion.article
              key={card.slug}
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.05 }}
              className={cn(
                "grid items-center gap-8 lg:grid-cols-2 lg:gap-12",
              )}
            >
              <div
                className={cn(
                  "relative aspect-[3/4] overflow-hidden rounded-2xl bg-[#e8f5ee]",
                  !imageFirst && "lg:order-2",
                )}
              >
                <ImageWithFallback
                  src={teacher.image}
                  alt={`${teacher.name}｜品識學苑${teacher.subject}核心教師`}
                  className={cn(
                    "h-full w-full object-cover",
                    teacher.imagePosition === "center"
                      ? "object-center"
                      : "object-top",
                  )}
                />
              </div>

              <div className={cn(!imageFirst && "lg:order-1")}>
                <p className="mb-2 text-sm font-medium tracking-wide text-primary">
                  {teacher.subject} · {teacher.grades}
                </p>
                <h3 className="mb-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                  {teacher.name}
                </h3>
                <p className="mb-5 text-sm text-muted-foreground sm:text-base">
                  {teacher.jobTitle} · {teacher.experience}
                </p>

                <p className="mb-5 text-sm tracking-wide text-muted-foreground sm:text-base">
                  {card.featureTags.join("　｜　")}
                </p>

                <blockquote className="mb-4 border-l-2 border-primary/40 pl-4 text-base font-medium leading-relaxed text-foreground sm:text-lg">
                  {card.statement}
                </blockquote>

                <p className="mb-5 text-sm leading-[1.85] text-muted-foreground sm:text-base">
                  {card.body}
                </p>

                <p className="mb-6 text-sm leading-relaxed text-foreground sm:text-base">
                  {card.suitableFor}
                </p>

                <Link
                  href={`/teachers/${teacher.slug}`}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-primary/80 sm:text-base"
                >
                  {card.profileCta}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.article>
          );
        })}
      </div>
    </DreamSection>
  );
}
