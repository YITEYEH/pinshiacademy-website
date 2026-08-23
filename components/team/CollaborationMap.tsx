"use client";

import { motion } from "motion/react";
import { BookOpen, MessageCircle, Target, User } from "lucide-react";
import {
  DreamProse,
  DreamSection,
  DreamSectionHeader,
} from "@/components/dream-project/layout";
import { threeTeachersCollaboration } from "@/content/team/page-copy";

const NODE_ICONS = {
  teaching: BookOpen,
  advisor: Target,
  guidance: MessageCircle,
} as const;

export function CollaborationMap() {
  const { eyebrow, title, nodes, studentLabel, sees, closing } =
    threeTeachersCollaboration;

  return (
    <DreamSection bg="muted" innerClassName="max-w-5xl overflow-x-clip">
      <DreamSectionHeader eyebrow={eyebrow} title={title} />

      <motion.div
        initial={false}
        animate={{ opacity: 1, y: 0 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {/* Mobile / tablet: centered stacked cards */}
        <div className="mx-auto max-w-lg lg:hidden">
          <ul className="overflow-hidden rounded-2xl border border-border/80 bg-white">
            {nodes.map((node, index) => {
              const Icon = NODE_ICONS[node.id];
              return (
                <li
                  key={node.id}
                  className={`flex flex-col items-center px-4 py-5 text-center sm:px-5 sm:py-6 ${
                    index < nodes.length - 1 ? "border-b border-border/70" : ""
                  }`}
                >
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#e8f5ee]">
                    <Icon className="h-5 w-5 text-primary" aria-hidden />
                  </div>
                  <p className="font-semibold text-foreground">{node.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {node.question}
                  </p>
                </li>
              );
            })}
          </ul>

          <p className="mt-6 mb-3 text-center text-xs font-medium tracking-wide text-primary">
            共同關注
          </p>

          <div className="flex flex-col items-center rounded-2xl border border-primary/25 bg-white px-4 py-5 text-center sm:px-5 sm:py-6">
            <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-primary text-white">
              <User className="h-5 w-5" aria-hidden />
            </div>
            <p className="text-lg font-bold text-foreground">{studentLabel}</p>
            <p className="mt-1 text-sm text-muted-foreground">
              三個角色，看見同一個孩子
            </p>
          </div>
        </div>

        {/* Desktop: three roles → shared student */}
        <div className="mx-auto hidden max-w-4xl lg:block">
          <div className="relative">
            <div className="grid grid-cols-3 gap-4 xl:gap-5">
              {nodes.map((node) => {
                const Icon = NODE_ICONS[node.id];
                return (
                  <article
                    key={node.id}
                    className="rounded-2xl border border-border/80 bg-white p-5 text-center xl:p-6"
                  >
                    <div className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-[#e8f5ee]">
                      <Icon className="h-5 w-5 text-primary" aria-hidden />
                    </div>
                    <p className="text-xs font-medium tracking-wider text-primary">
                      {node.english}
                    </p>
                    <h3 className="mt-2 text-base font-semibold text-foreground xl:text-lg">
                      {node.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {node.question}
                    </p>
                  </article>
                );
              })}
            </div>

            <div aria-hidden className="relative mx-auto h-16 w-full max-w-3xl">
              <div className="absolute left-[16.66%] top-0 h-8 w-px -translate-x-1/2 bg-primary/25" />
              <div className="absolute left-1/2 top-0 h-8 w-px -translate-x-1/2 bg-primary/25" />
              <div className="absolute left-[83.34%] top-0 h-8 w-px -translate-x-1/2 bg-primary/25" />
              <div className="absolute inset-x-[16.66%] top-8 h-px bg-primary/25" />
              <div className="absolute left-1/2 top-8 h-8 w-px -translate-x-1/2 bg-primary/30" />
            </div>

            <div className="mx-auto flex max-w-sm flex-col items-center text-center">
              <p className="mb-3 text-xs font-medium tracking-wide text-primary">
                共同關注
              </p>
              <div className="flex w-full flex-col items-center rounded-2xl border border-primary/25 bg-white px-8 py-6">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white">
                  <User className="h-5 w-5" aria-hidden />
                </div>
                <p className="text-xl font-bold text-foreground">
                  {studentLabel}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  三個角色，看見同一個孩子
                </p>
              </div>
            </div>
          </div>
        </div>

        <ul className="mx-auto mt-10 max-w-2xl space-y-2.5 border-t border-border/70 pt-8 text-center sm:mt-12 sm:space-y-3 sm:pt-10">
          {sees.map((line) => (
            <li
              key={line}
              className="text-sm font-medium leading-relaxed text-foreground sm:text-base lg:text-lg"
            >
              {line}
            </li>
          ))}
        </ul>

        <div className="mx-auto mt-6 max-w-2xl sm:mt-8">
          <DreamProse paragraphs={closing} className="text-center" />
        </div>
      </motion.div>
    </DreamSection>
  );
}
