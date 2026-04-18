"use client";

import { motion } from "motion/react";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ExternalLinkOnce } from "@/components/ExternalLinkOnce";

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
              想了解課程規劃、預約諮詢或合作提案？歡迎留下訊息，我們會盡快與你聯繫。
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={false}
              animate={{ opacity: 1, x: 0 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-[#f7f9f7] rounded-2xl p-8"
            >
              <h2 className="text-2xl font-bold text-foreground mb-6">
                聯絡資訊
              </h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <div className="font-medium text-foreground">電話</div>
                    <div className="text-muted-foreground">(02) 1234-5678</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <div className="font-medium text-foreground">Email</div>
                    <div className="text-muted-foreground">
                      contact@pinshi.edu.tw
                    </div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <div className="font-medium text-foreground">地址</div>
                    <div className="text-muted-foreground">
                      台北市信義區信義路五段7號
                    </div>
                  </div>
                </li>
              </ul>

              <div className="mt-8">
                <Button className="bg-primary hover:bg-primary/90" asChild>
                  <ExternalLinkOnce href="https://lin.ee/8nQNuYl">
                    聯繫學習顧問
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </ExternalLinkOnce>
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={false}
              animate={{ opacity: 1, x: 0 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-white rounded-2xl border border-border p-8">
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  留下訊息
                </h2>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    window.open("https://lin.ee/8nQNuYl", "_blank", "noopener,noreferrer");
                  }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      姓名
                    </label>
                    <input
                      className="w-full rounded-lg border border-border bg-input-background px-4 py-3 outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
                      name="name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Email
                    </label>
                    <input
                      className="w-full rounded-lg border border-border bg-input-background px-4 py-3 outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
                      type="email"
                      name="email"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      需求/想詢問的內容
                    </label>
                    <textarea
                      className="w-full rounded-lg border border-border bg-input-background px-4 py-3 outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 min-h-[140px]"
                      name="message"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90"
                  >
                    送出（導向 LINE 諮詢）
                  </Button>
                  <div className="text-xs text-muted-foreground">
                    目前表單會導向 LINE 諮詢；之後可改成寄信或串接表單服務/後端 API。
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

