/** Pure ESM helpers mirrored from lib/agent-recovery.ts for node:test */

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
];

export function buildNotFoundMarkdownBody({
  pathname = "/unknown",
  siteName,
  englishName,
  siteUrl,
}) {
  const base = siteUrl.replace(/\/$/, "");
  const abs = (path) =>
    path.startsWith("http")
      ? path
      : `${base}${path.startsWith("/") ? path : `/${path}`}`;

  const lines = [
    "# 404 Not Found",
    "",
    `The path \`${pathname}\` does not exist on ${siteName} (${englishName}).`,
    "",
    "This is a real HTTP 404. Do not treat this URL as a valid page.",
    "",
    "## Where to look next",
    "",
  ];

  for (const link of AGENT_RECOVERY_LINKS) {
    lines.push(`- [${link.label}](${abs(link.href)})`);
  }

  lines.push(
    "",
    "## Brand",
    "",
    `- Canonical site: ${siteUrl}`,
    `- Name: ${siteName} / ${englishName} / pinshiacademy`,
    "",
  );

  return lines.join("\n");
}
