import type { ReactNode } from "react";
import { cn } from "@/components/ui/utils";

type DreamSectionProps = {
  id?: string;
  bg?: "white" | "muted";
  children: ReactNode;
  className?: string;
  innerClassName?: string;
};

const bgClass = {
  white: "bg-white",
  muted: "bg-[#f7f9f7]",
} as const;

export function DreamSection({
  id,
  bg = "white",
  children,
  className,
  innerClassName,
}: DreamSectionProps) {
  return (
    <section
      id={id}
      className={cn("scroll-mt-24 py-16 sm:py-20", bgClass[bg], className)}
    >
      <div
        className={cn(
          "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",
          innerClassName,
        )}
      >
        {children}
      </div>
    </section>
  );
}

type DreamSectionHeaderProps = {
  title: string;
  eyebrow?: string;
  lead?: string;
  body?: string;
  paragraphs?: readonly string[];
  align?: "center" | "left";
  className?: string;
};

export function DreamSectionHeader({
  title,
  eyebrow,
  lead,
  body,
  paragraphs,
  align = "center",
  className,
}: DreamSectionHeaderProps) {
  const centered = align === "center";

  return (
    <header
      className={cn(
        "mb-12",
        centered && "mx-auto max-w-3xl text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p
          className={cn(
            "mb-3 text-sm font-medium tracking-wide text-primary",
            centered && "mx-auto",
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mb-4 text-2xl font-bold tracking-tight text-foreground text-balance sm:text-3xl lg:text-4xl">
        {title}
      </h2>
      {lead ? (
        <p className="mb-4 text-lg font-medium leading-relaxed text-foreground">
          {lead}
        </p>
      ) : null}
      {paragraphs && paragraphs.length > 0 ? (
        <div className="space-y-4 text-base leading-[1.85] text-muted-foreground sm:text-[1.0625rem]">
          {paragraphs.map((p, index) => (
            <p
              key={p}
              className={
                !lead && index === 0 ? "text-lg leading-relaxed" : undefined
              }
            >
              {p}
            </p>
          ))}
        </div>
      ) : body ? (
        <p className="mt-3 text-base leading-[1.85] text-muted-foreground sm:text-[1.0625rem]">
          {body}
        </p>
      ) : null}
    </header>
  );
}

export function DreamProse({
  paragraphs,
  className,
}: {
  paragraphs: readonly string[];
  className?: string;
}) {
  return (
    <div
      className={cn(
        "space-y-5 text-base leading-[1.85] text-muted-foreground sm:text-[1.0625rem]",
        className,
      )}
    >
      {paragraphs.map((p) => (
        <p key={p}>{p}</p>
      ))}
    </div>
  );
}

export function DreamQuote({
  children,
  className,
  centered = false,
}: {
  children: ReactNode;
  className?: string;
  centered?: boolean;
}) {
  return (
    <blockquote
      className={cn(
        "rounded-xl border border-primary/15 bg-[#e8f5ee] px-4 py-4 text-[15px] font-medium leading-relaxed text-foreground sm:px-6 sm:py-5 sm:text-base",
        centered && "text-center",
        className,
      )}
    >
      {children}
    </blockquote>
  );
}

export function DreamCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-white shadow-sm",
        className,
      )}
    >
      {children}
    </div>
  );
}
