import {
  BarChart3,
  BookOpen,
  CalendarDays,
  GraduationCap,
  UserRound,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { pricingExplanationSection } from "@/content/pricing";
import { cn } from "@/components/ui/utils";

const factorIcons: LucideIcon[] = [
  GraduationCap,
  BookOpen,
  BarChart3,
  UserRound,
  CalendarDays,
  Users,
];

export function PricingFactorsCard() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-primary/15 bg-white shadow-[0_10px_40px_rgba(45,122,79,0.08)]">
      <div
        className="h-1 w-full bg-gradient-to-r from-primary/80 to-primary/30"
        aria-hidden
      />

      <div className="p-6 sm:p-8">
        <h3 className="text-lg font-bold tracking-tight text-foreground sm:text-xl">
          {pricingExplanationSection.factorsTitle}
        </h3>

        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {pricingExplanationSection.factors.map((factor, index) => {
            const Icon = factorIcons[index] ?? BookOpen;

            return (
              <li
                key={factor.label}
                className={cn(
                  "flex items-center gap-3 rounded-xl border border-border/60 bg-[#f7f9f7]/80 px-4 py-3.5",
                  "transition-colors duration-200 hover:border-primary/20 hover:bg-[#eef5f0]",
                )}
              >
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="size-4" strokeWidth={1.75} aria-hidden />
                </span>
                <span className="text-[0.9375rem] font-medium leading-snug text-foreground">
                  {factor.label}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
