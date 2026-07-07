import { LineIcon } from "@/components/icons/LineIcon";
import { cn } from "@/components/ui/utils";
import { LINE_CTA_LABEL } from "@/lib/line-cta";

type LineCtaLabelProps = {
  label?: string;
  className?: string;
  iconClassName?: string;
};

export function LineCtaLabel({
  label = LINE_CTA_LABEL,
  className,
  iconClassName,
}: LineCtaLabelProps) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <LineIcon className={iconClassName} />
      {label}
    </span>
  );
}
