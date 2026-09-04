import { SITE } from "@/lib/site";

/** 404／找不到內容時給 agents 的恢復路徑 */
export const AGENT_RECOVERY_LINKS = [
  { href: "/sitemap.xml", label: "Sitemap" },
  { href: "/llms.txt", label: "llms.txt (AI index)" },
  { href: "/llms-full.txt", label: "llms-full.txt" },
  { href: "/", label: "Home" },
  { href: "/courses", label: "Courses" },
  { href: "/teachers", label: "Teachers" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
  { href: "/blog", label: "Blog" },
] as const;

export function absoluteAgentUrl(path: string): string {
  if (path.startsWith("http")) return path;
  const base = SITE.url.replace(/\/$/, "");
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Markdown body for HTTP 404 responses (agents + Accept: text/markdown) */
export function buildNotFoundMarkdown(pathname = "/unknown"): string {
  const lines = [
    "# 404 Not Found",
    "",
    `The path \`${pathname}\` does not exist on ${SITE.name} (${SITE.englishName}).`,
    "",
    "This is a real HTTP 404. Do not treat this URL as a valid page.",
    "",
    "## Where to look next",
    "",
  ];

  for (const link of AGENT_RECOVERY_LINKS) {
    lines.push(`- [${link.label}](${absoluteAgentUrl(link.href)})`);
  }

  lines.push(
    "",
    "## Brand",
    "",
    `- Canonical site: ${SITE.url}`,
    `- Name: ${SITE.name} / ${SITE.englishName} / pinshiacademy`,
    "",
  );

  return lines.join("\n");
}
