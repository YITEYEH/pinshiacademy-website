import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  BookOpen,
  ClipboardList,
  GraduationCap,
  Map,
  MessageCircle,
  Search,
  Video,
} from "lucide-react";
import { pricingIncludedSection } from "@/content/pricing";

const iconMap: Record<(typeof pricingIncludedSection.items)[number]["icon"], LucideIcon> =
  {
    video: Video,
    book: BookOpen,
    clipboard: ClipboardList,
    search: Search,
    map: Map,
    message: MessageCircle,
    graduation: GraduationCap,
    chart: BarChart3,
  };

export function PricingIncludedGrid() {
  return (
    <section className="py-20 lg:py-24 bg-[#fafbfa]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {pricingIncludedSection.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            {pricingIncludedSection.subtitle}
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {pricingIncludedSection.items.map((item) => {
            const Icon = iconMap[item.icon];
            return (
              <div
                key={item.title}
                className="rounded-2xl border border-border/80 bg-white p-5 shadow-sm transition-shadow hover:shadow-md sm:p-6"
              >
                <div className="mb-4 flex size-10 items-center justify-center rounded-xl bg-accent text-primary">
                  <Icon className="size-5" strokeWidth={1.75} />
                </div>
                <h3 className="text-[0.9375rem] font-semibold leading-snug text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
