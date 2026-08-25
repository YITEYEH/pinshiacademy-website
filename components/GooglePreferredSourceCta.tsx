import { ExternalLink } from "lucide-react";
import {
  getGooglePreferredSourceUrl,
  GOOGLE_PREFERRED_SOURCE_LABEL,
} from "@/lib/google-preferred-source";
import { cn } from "@/components/ui/utils";

type GooglePreferredSourceCtaProps = {
  className?: string;
  /** footer 深色底；blog 側欄與分類／標籤同層級 */
  variant?: "footer" | "panel";
};

/**
 * 引導讀者將本站設為 Google 搜尋偏好來源（焦點新聞／AI 摘要「偏好」徽章）
 */
export function GooglePreferredSourceCta({
  className,
  variant = "panel",
}: GooglePreferredSourceCtaProps) {
  const href = getGooglePreferredSourceUrl();

  if (variant === "footer") {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "text-sm text-white/60 transition-colors hover:text-white",
          className,
        )}
      >
        {GOOGLE_PREFERRED_SOURCE_LABEL}
      </a>
    );
  }

  return (
    <div className={cn("mt-8 border-t border-border/60 pt-6", className)}>
      <h2 className="mb-2 font-semibold text-foreground">Google 搜尋</h2>
      <p className="mb-3 text-xs leading-relaxed text-muted-foreground">
        將品識學苑設為偏好來源，更容易看到我們的學習內容
      </p>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary/80"
      >
        {GOOGLE_PREFERRED_SOURCE_LABEL}
        <ExternalLink className="h-3.5 w-3.5 shrink-0 opacity-70" aria-hidden />
      </a>
    </div>
  );
}
