"use client";

import Link from "next/link";
import { motion } from "motion/react";
import {
  ArrowRight,
  CalendarRange,
  CheckCircle2,
  GraduationCap,
  User,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ExternalLinkOnce } from "@/components/ExternalLinkOnce";
import { PricingLevelTabs } from "@/components/PricingLevelTabs";
import {
  pricingDisclaimer,
  pricingIncludes,
  pricingMeta,
  pricingNotes,
  pricingPlans,
  pricingStructureDimensions,
  pricingStructureNote,
  pricingTrialIncludes,
} from "@/content/pricing";
import { LINE_LINKS } from "@/lib/line-links";

const structureIcons = [GraduationCap, Users, CalendarRange] as const;

const planIcons = [User, Users, CalendarRange] as const;

export function PricingClient() {
  return (
    <div className="w-full">
      <section className="bg-gradient-to-br from-[#e8f5ee] to-white py-20 lg:py-28">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="mb-4 text-4xl font-bold leading-tight text-foreground lg:text-5xl">
              {pricingMeta.title}
            </h1>
            <p className="mx-auto max-w-3xl text-lg leading-relaxed text-muted-foreground">
              {pricingMeta.intro}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="bg-[#f7f9f7] py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-2xl font-bold text-foreground">費用如何計算？</h2>
            <p className="mx-auto mt-3 max-w-2xl leading-relaxed text-muted-foreground">
              品識學苑課程費用依以下三個維度綜合評估
            </p>
          </motion.div>

          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {pricingStructureDimensions.map((item, index) => {
              const Icon = structureIcons[index];
              return (
                <motion.div
                  key={item.label}
                  initial={false}
                  animate={{ opacity: 1, y: 0 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.08 }}
                  className="rounded-xl border border-border bg-white p-6 text-center shadow-sm"
                >
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" aria-hidden />
                  </div>
                  <h3 className="font-semibold text-foreground">{item.label}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>

          <p className="mx-auto mt-8 max-w-2xl text-center text-sm leading-relaxed text-muted-foreground">
            {pricingStructureNote}
          </p>
        </div>
      </section>

      <section className="bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-10 text-center"
          >
            <h2 className="text-2xl font-bold text-foreground lg:text-3xl">
              班型方案
            </h2>
            <p className="mx-auto mt-3 max-w-xl leading-relaxed text-muted-foreground">
              依學習需求選擇適合的授課方式，費用計算方式各有不同
            </p>
          </motion.div>

          <div className="mb-12 grid gap-4 sm:grid-cols-3">
            {pricingPlans.map((plan, index) => {
              const PlanIcon = planIcons[index] ?? User;

              return (
                <motion.div
                  key={plan.name}
                  initial={false}
                  animate={{ opacity: 1, y: 0 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.06 }}
                  className="h-full"
                >
                  <article className="flex h-full flex-col rounded-xl border border-border bg-white p-6 text-center shadow-sm">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <PlanIcon className="h-6 w-6 text-primary" aria-hidden />
                    </div>

                    <h3 className="text-lg font-bold text-foreground">
                      {plan.name}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-primary">
                      {plan.billing}
                    </p>
                    <p className="mt-3 min-h-[3.75rem] text-sm leading-relaxed text-muted-foreground">
                      {plan.description}
                    </p>

                    <p className="mt-auto border-t border-border pt-4 text-sm text-foreground/80">
                      {plan.priceHint}
                    </p>
                  </article>
                </motion.div>
              );
            })}
          </div>

          <PricingLevelTabs />

          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            {pricingDisclaimer}
          </p>
        </div>
      </section>

      <section className="bg-[#f7f9f7] py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-2">
            <motion.div
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-xl border border-border bg-white p-8 shadow-sm"
            >
              <h2 className="text-xl font-bold text-foreground">課程內容包含</h2>
              <ul className="mt-6 space-y-3">
                {pricingIncludes.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2
                      className="mt-0.5 h-5 w-5 shrink-0 text-primary"
                      aria-hidden
                    />
                    <span className="text-sm text-foreground/80">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.08 }}
              className="rounded-xl border border-primary/15 bg-white p-8 shadow-sm"
            >
              <h2 className="text-xl font-bold text-foreground">
                首次免費學習診斷
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                了解孩子狀況後，再說明適合的課程與費用，無推銷壓力。
              </p>
              <ul className="mt-6 space-y-3">
                {pricingTrialIncludes.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2
                      className="mt-0.5 h-5 w-5 shrink-0 text-primary"
                      aria-hidden
                    />
                    <span className="text-sm text-foreground/80">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="mt-8 rounded-xl border border-border bg-white px-6 py-5"
          >
            <h3 className="text-sm font-semibold text-foreground">備註</h3>
            <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-muted-foreground">
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
              取得專屬課程報價
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-xl leading-relaxed text-white/90">
              預約免費學習診斷，由課程顧問依孩子程度與目標，提供透明報價與學習規劃建議。
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button
                size="lg"
                className="bg-white px-8 text-lg text-primary hover:bg-white/90"
                asChild
              >
                <ExternalLinkOnce
                  href={LINE_LINKS.coursesConsult}
                  analyticsLabel="pricing_line_consult"
                >
                  預約免費學習診斷
                  <ArrowRight className="ml-2 h-5 w-5" />
                </ExternalLinkOnce>
              </Button>
              <Button
                size="lg"
                className="border-2 border-white bg-transparent px-8 text-lg text-white transition-colors hover:bg-white hover:text-primary"
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
