"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import { Mail, MapPin, Building2 } from "lucide-react";
import { LineCtaButton } from "@/components/LineCtaButton";
import { LineIcon } from "@/components/icons/LineIcon";
import { CONTACT } from "@/lib/contact";
import { LINE_CTA_LABELS } from "@/lib/line-cta";
import { LINE_LINKS } from "@/lib/line-links";
import { trackContactEmail } from "@/lib/analytics";

type InfoCardProps = {
  icon: typeof Mail;
  title: string;
  children: ReactNode;
  className?: string;
  delay?: number;
};

function InfoCard({
  icon: Icon,
  title,
  children,
  className = "",
  delay = 0,
}: InfoCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay }}
      className={`rounded-2xl border border-border/70 bg-white p-6 shadow-sm transition-shadow duration-200 hover:shadow-md ${className}`}
    >
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#e8f5ee]">
        <Icon className="h-5 w-5 text-primary" aria-hidden />
      </div>
      <h3 className="text-base font-semibold text-foreground">{title}</h3>
      <div className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {children}
      </div>
    </motion.div>
  );
}

export function ContactClient() {
  return (
    <div className="w-full">
      <section className="bg-gradient-to-br from-[#e8f5ee] to-white py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-3xl text-center"
          >
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-foreground lg:text-5xl">
              聯絡我們
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground sm:text-xl">
              想了解課程規劃、預約諮詢或合作提案？歡迎透過 LINE 或 Email
              與我們聯繫，我們會盡快回覆。
            </p>
          </motion.div>
        </div>
      </section>

      <section className="bg-[#f7f9f7] py-16 lg:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-5 lg:items-stretch">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5 }}
              className="flex flex-col rounded-2xl bg-gradient-to-br from-primary to-[#1a4d2e] p-8 text-white shadow-[0_12px_40px_rgba(45,122,79,0.18)] lg:col-span-2 lg:p-9"
            >
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-white/15">
                <LineIcon className="size-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold tracking-tight">最快取得回覆</h2>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-white/85">
                建議直接透過 LINE
                聯繫學習顧問，我們可即時了解孩子的學習需求並安排後續諮詢。
              </p>
              <ul className="mt-6 space-y-2.5 text-sm text-white/80">
                <li className="flex items-center gap-2.5">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-white/60" />
                  即時回覆，無需等待 Email
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-white/60" />
                  首次諮詢免費
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-white/60" />
                  依孩子程度提供課程建議
                </li>
              </ul>
              <div className="mt-auto pt-8">
                <LineCtaButton
                  href={LINE_LINKS.consult}
                  analyticsLabel="contact_line_consult"
                  label={LINE_CTA_LABELS.contact}
                  variant="inverse"
                  size="default"
                  className="w-full sm:w-auto"
                />
              </div>
            </motion.div>

            <div className="grid gap-4 sm:grid-cols-2 lg:col-span-3">
              <InfoCard icon={Mail} title="Email" delay={0.05}>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="font-medium text-foreground transition-colors hover:text-primary break-all"
                  onClick={() => trackContactEmail("contact_page")}
                >
                  {CONTACT.email}
                </a>
              </InfoCard>

              <InfoCard icon={Building2} title="公司資訊" delay={0.1}>
                <p className="font-medium text-foreground">{CONTACT.companyName}</p>
                <p className="mt-1">
                  統一編號{" "}
                  <span className="tabular-nums font-medium text-foreground">
                    {CONTACT.taxId}
                  </span>
                </p>
              </InfoCard>

              <InfoCard
                icon={MapPin}
                title="登記地址"
                className="sm:col-span-2"
                delay={0.15}
              >
                <p className="font-medium text-foreground">
                  {CONTACT.registeredAddress}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground/90">
                  {CONTACT.registeredAddressNote}
                </p>
              </InfoCard>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
