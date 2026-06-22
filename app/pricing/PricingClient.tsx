"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ExternalLinkOnce } from "@/components/ExternalLinkOnce";
import { PricingTable } from "@/components/PricingTable";
import {
  pricingDisclaimer,
  pricingIncludes,
  pricingLevels,
  pricingMeta,
  pricingNotes,
  pricingStructureDimensions,
  pricingStructureNote,
  pricingTrialIncludes,
} from "@/content/pricing";
import { LINE_LINKS } from "@/lib/line-links";

export function PricingClient() {
  return (
    <div className="w-full">
      <section className="py-20 lg:py-28 bg-gradient-to-br from-[#e8f5ee] to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight">
              {pricingMeta.title}
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              {pricingMeta.subtitle}
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              {pricingMeta.intro}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl border border-border bg-[#f7f9f7] p-8"
          >
            <h2 className="text-xl font-bold text-foreground mb-2">
              費用如何計算？
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              品識學苑課程費用依以下三個維度綜合評估：
            </p>
            <div className="grid sm:grid-cols-3 gap-4 mb-6">
              {pricingStructureDimensions.map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl bg-white border border-border p-4"
                >
                  <p className="font-semibold text-foreground mb-1">
                    {item.label}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {pricingStructureNote}
            </p>
            <p className="mt-4 pt-4 border-t border-border text-sm text-foreground/80 leading-relaxed">
              {pricingDisclaimer}
            </p>
          </motion.div>

          {pricingLevels.map((level, levelIndex) => (
            <motion.div
              key={level.level}
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: levelIndex * 0.05 }}
            >
              <div className="mb-6 pb-3 border-b-2 border-primary">
                <h2 className="text-2xl font-bold text-foreground">
                  {level.level}
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  {level.sessionDuration}
                </p>
              </div>
              <PricingTable groups={level.groups} />
            </motion.div>
          ))}

          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl bg-[#f7f9f7] p-8"
          >
            <h2 className="text-2xl font-bold text-foreground mb-6">
              課程內容包含
            </h2>
            <ul className="grid sm:grid-cols-2 gap-3">
              {pricingIncludes.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-foreground/80">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl border border-primary/20 bg-[#e8f5ee]/50 p-8"
          >
            <h2 className="text-2xl font-bold text-foreground mb-3">
              首次免費學習診斷與試教體驗
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              首次提供免費學習診斷與試教體驗，內容包含：
            </p>
            <ul className="space-y-3">
              {pricingTrialIncludes.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-foreground/80">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-xl font-bold text-foreground mb-4">備註</h2>
            <ul className="list-disc list-outside pl-6 space-y-2 text-muted-foreground leading-relaxed">
              {pricingNotes.map((note) => (
                <li key={note}>{note}</li>
              ))}
              <li>
                退費相關規定請參閱{" "}
                <Link
                  href="/refund"
                  className="text-primary underline underline-offset-2 hover:text-primary/80"
                >
                  退費（款）辦法
                </Link>
                。
              </li>
            </ul>
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
              取得專屬課程報價
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
              預約免費學習診斷，由課程顧問依孩子程度與目標，提供透明報價與學習規劃建議。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-white/90 text-lg px-8"
                asChild
              >
                <ExternalLinkOnce
                  href={LINE_LINKS.coursesConsult}
                  analyticsLabel="pricing_line_consult"
                >
                  預約免費學習診斷
                  <ArrowRight className="ml-2 w-5 h-5" />
                </ExternalLinkOnce>
              </Button>
              <Button
                size="lg"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary text-lg px-8 transition-colors"
                asChild
              >
                <Link href="/contact">聯絡我們</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
