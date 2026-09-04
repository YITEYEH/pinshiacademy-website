"use client";

import { Button } from "@/components/ui/button";
import { ExternalLinkOnce } from "@/components/ExternalLinkOnce";
import { LineCtaLabel } from "@/components/LineCtaLabel";
import { cn } from "@/components/ui/utils";
import { trackLineConsultClick } from "@/lib/analytics";
import { LINE_CTA_LABEL } from "@/lib/line-cta";

type LineCtaButtonProps = {
  href: string;
  analyticsLabel: string;
  /** 若提供，額外發送 line_consult_click（cta_location） */
  ctaLocation?: string;
  label?: string;
  size?: "default" | "lg" | "sm";
  variant?: "primary" | "inverse" | "outline";
  fullWidth?: boolean;
  className?: string;
};

export function LineCtaButton({
  href,
  analyticsLabel,
  ctaLocation,
  label = LINE_CTA_LABEL,
  size = "lg",
  variant = "primary",
  fullWidth = false,
  className,
}: LineCtaButtonProps) {
  const iconSize =
    size === "lg" ? "size-5" : size === "sm" ? "size-4" : "size-4";

  return (
    <Button
      size={size === "sm" ? "sm" : size === "lg" ? "lg" : "default"}
      variant={variant === "outline" ? "outline" : "default"}
      className={cn(
        "rounded-full font-semibold shadow-sm transition-all duration-200 hover:shadow-md",
        fullWidth && "w-full",
        size === "lg" && "h-12 px-8 text-base sm:text-lg",
        size === "default" && "h-11 px-6 text-sm sm:text-base",
        variant === "primary" &&
          "bg-primary text-primary-foreground hover:bg-primary/90",
        variant === "inverse" &&
          "bg-white text-primary hover:bg-white/95",
        variant === "outline" &&
          "border-primary text-primary hover:bg-primary/5",
        className,
      )}
      asChild
    >
      <ExternalLinkOnce
        href={href}
        analyticsLabel={analyticsLabel}
        onClick={() => {
          if (ctaLocation) trackLineConsultClick(ctaLocation);
        }}
      >
        <LineCtaLabel iconClassName={iconSize} label={label} />
      </ExternalLinkOnce>
    </Button>
  );
}
