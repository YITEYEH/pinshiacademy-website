"use client";

import { motion } from "motion/react";
import { Mail, MapPin, Building2, ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ExternalLinkOnce } from "@/components/ExternalLinkOnce";
import { CONTACT } from "@/lib/contact";
import { LINE_LINKS } from "@/lib/line-links";
import { trackContactEmail } from "@/lib/analytics";

export function ContactClient() {
  return (
    <div className="w-full">
      <section className="py-20 lg:py-28 bg-gradient-to-br from-[#e8f5ee] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
              聯絡我們
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              想了解課程規劃、預約諮詢或合作提案？歡迎透過 LINE
              或 Email 與我們聯繫，我們會盡快回覆。
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-[#f7f9f7] rounded-2xl p-8 lg:p-10"
          >
            <h2 className="text-2xl font-bold text-foreground mb-6">
              聯絡資訊
            </h2>
            <ul className="space-y-5">
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <div className="font-medium text-foreground">Email</div>
                  <a
                    href={`mailto:${CONTACT.email}`}
                    className="text-muted-foreground hover:text-primary transition-colors break-all"
                    onClick={() => trackContactEmail("contact_page")}
                  >
                    {CONTACT.email}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <div className="font-medium text-foreground">登記地址</div>
                  <p className="text-muted-foreground leading-relaxed">
                    {CONTACT.registeredAddress}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                    {CONTACT.registeredAddressNote}
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Building2 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <div className="font-medium text-foreground">
                    {CONTACT.companyName}
                  </div>
                  <p className="text-muted-foreground">
                    統一編號{" "}
                    <span className="tabular-nums">{CONTACT.taxId}</span>
                  </p>
                </div>
              </li>
            </ul>

            <div className="mt-10 pt-8 border-t border-border">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                最快取得回覆
              </h3>
              <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
                建議直接透過 LINE
                聯繫學習顧問，我們可即時了解孩子的學習需求並安排後續諮詢。
              </p>
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 w-full sm:w-auto"
                asChild
              >
                <ExternalLinkOnce
                  href={LINE_LINKS.consult}
                  analyticsLabel="contact_line_consult"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  LINE 聯繫學習顧問
                  <ArrowRight className="ml-2 w-5 h-5" />
                </ExternalLinkOnce>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
