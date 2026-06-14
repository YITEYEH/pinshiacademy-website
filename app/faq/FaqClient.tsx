"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ExternalLinkOnce } from "@/components/ExternalLinkOnce";
import { faqCategories } from "@/content/faq-data";
import { LINE_LINKS } from "@/lib/line-links";

export function FaqClient() {
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
              常見問題
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              整理家長與學生最常詢問的問題，幫助您快速了解品識學苑
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {faqCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.category}
                initial={false}
                animate={{ opacity: 1, y: 0 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              >
                <h2 className="text-2xl font-bold text-foreground mb-6 pb-3 border-b-2 border-primary">
                  {category.category}
                </h2>

                <Accordion type="single" collapsible className="space-y-4">
                  {category.questions.map((item, index) => (
                    <AccordionItem
                      key={index}
                      value={`${categoryIndex}-${index}`}
                      className="bg-[#f7f9f7] rounded-lg px-6 border-none"
                    >
                      <AccordionTrigger className="text-left hover:no-underline py-4">
                        <span className="font-semibold text-foreground pr-4">
                          {item.q}
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground pb-4">
                        {item.aHtml ? (
                          <div
                            className="[&_a]:text-primary [&_a]:underline [&_a]:underline-offset-2"
                            dangerouslySetInnerHTML={{ __html: item.aHtml }}
                          />
                        ) : (
                          item.a
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-16 rounded-2xl bg-gradient-to-br from-primary to-[#1a4d2e] p-8 lg:p-10 text-center text-white"
          >
            <h2 className="text-2xl font-bold mb-3">還有疑問？</h2>
            <p className="text-white/90 mb-6 max-w-lg mx-auto leading-relaxed">
              歡迎預約免費諮詢，由學習顧問協助評估孩子的學習狀況與適合的課程規劃。
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-white/90"
                asChild
              >
                <ExternalLinkOnce
                  href={LINE_LINKS.consult}
                  analyticsLabel="faq_line_consult"
                >
                  預約免費諮詢
                  <ArrowRight className="ml-2 w-5 h-5" />
                </ExternalLinkOnce>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 bg-transparent"
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
