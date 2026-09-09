"use client";

import type { ReactNode } from "react";
import { CONTACT } from "@/lib/contact";

/**
 * Cloudflare Email Obfuscation 會把 mailto 改成 /cdn-cgi/l/email-protection#…
 * 該路徑對爬蟲常回 404，Ahrefs 會報「全站連到壞掉的頁面」。
 * 用官方 <!--email_off--> 包住，避免被改寫。
 * 仍建議在 Cloudflare 關閉 Email Address Obfuscation。
 */
export function CfEmailOff({ children }: { children: ReactNode }) {
  return (
    <>
      <span dangerouslySetInnerHTML={{ __html: "<!--email_off-->" }} />
      {children}
      <span dangerouslySetInnerHTML={{ __html: "<!--/email_off-->" }} />
    </>
  );
}

type MailtoProps = {
  className?: string;
  onClick?: () => void;
  email?: string;
  children?: ReactNode;
};

export function MailtoLink({
  className,
  onClick,
  email = CONTACT.email,
  children,
}: MailtoProps) {
  return (
    <CfEmailOff>
      <a href={`mailto:${email}`} className={className} onClick={onClick}>
        {children ?? email}
      </a>
    </CfEmailOff>
  );
}
