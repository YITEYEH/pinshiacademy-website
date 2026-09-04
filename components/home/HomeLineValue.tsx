"use client";

import { motion } from "motion/react";
import { LineCtaButton } from "@/components/LineCtaButton";
import { LineIcon } from "@/components/icons/LineIcon";
import { homeLineValue } from "@/content/home/page-copy";
import { LINE_LINKS } from "@/lib/line-links";

export function HomeLineValue() {
  const {
    id,
    titleLine1,
    titleLine2,
    body,
    steps,
    conversationLabel,
    parentMessage,
    advisorMessage,
    conversationHint,
    conversationCta,
  } = homeLineValue;

  return (
    <section id={id} className="scroll-mt-24 bg-[#f7f9f7] py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-10 max-w-3xl text-center sm:mb-12"
        >
          <h2 className="mb-5 text-2xl font-bold tracking-tight text-foreground text-balance sm:text-3xl lg:text-4xl">
            <span className="block">{titleLine1}</span>
            <span className="block">{titleLine2}</span>
          </h2>
          <p className="text-base leading-[1.85] text-muted-foreground sm:text-[1.0625rem]">
            {body}
          </p>
        </motion.div>

        <div className="mb-10 grid gap-4 sm:grid-cols-3 sm:gap-5">
          {steps.map((step) => (
            <div
              key={step.number}
              className="rounded-2xl border border-border bg-white p-5 sm:p-6"
            >
              <p className="mb-2 text-xs font-semibold tracking-wide text-primary">
                STEP {step.number}｜{step.label}
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                {step.example}
              </p>
            </div>
          ))}
        </div>

        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-md"
          role="complementary"
          aria-label={conversationLabel}
        >
          <p className="mb-4 text-center text-xs font-medium tracking-wide text-muted-foreground">
            {conversationLabel}
          </p>

          {/* LINE 風格對話示意（非真實截圖） */}
          <div className="overflow-hidden rounded-2xl border border-border shadow-sm">
            <div className="flex items-center gap-2 bg-[#06C755] px-4 py-3 text-white">
              <span
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20"
                aria-hidden
              >
                <LineIcon className="size-4" />
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">品識學苑</p>
                <p className="text-[11px] text-white/85">官方帳號</p>
              </div>
            </div>

            <div className="space-y-4 bg-[#8CABD9] px-3 py-5 sm:px-4">
              {/* 家長＝對方（左側白氣泡） */}
              <div className="flex items-end gap-2">
                <span
                  className="mb-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-xs font-bold text-muted-foreground shadow-sm"
                  aria-hidden
                >
                  家
                </span>
                <div className="max-w-[78%]">
                  <p className="mb-1 text-[11px] text-white/90">家長</p>
                  <div className="rounded-2xl rounded-tl-sm bg-white px-3.5 py-2.5 text-sm leading-relaxed text-foreground shadow-sm">
                    {parentMessage}
                  </div>
                </div>
              </div>

              {/* 品識學苑＝自己（右側綠氣泡） */}
              <div className="flex justify-end">
                <div className="max-w-[78%]">
                  <p className="mb-1 text-right text-[11px] text-white/90">
                    品識學苑
                  </p>
                  <div className="rounded-2xl rounded-tr-sm bg-[#06C755] px-3.5 py-2.5 text-sm leading-relaxed text-white shadow-sm">
                    {advisorMessage}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <p className="mt-5 text-center text-sm leading-relaxed text-muted-foreground sm:text-base">
            {conversationHint}
          </p>
          <div className="mt-6 text-center">
            <LineCtaButton
              href={LINE_LINKS.consult}
              analyticsLabel="home_conversation_example_line_consult"
              ctaLocation="conversation_example"
              label={conversationCta}
              className="px-8"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
