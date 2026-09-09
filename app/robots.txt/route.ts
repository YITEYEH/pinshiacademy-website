import { SITE } from "@/lib/site";

/**
 * 注意：若 Cloudflare「AI Crawl Control / Managed robots」有注入規則，
 * 會出現在本檔內容之前，並可能 Disallow GPTBot／ClaudeBot 等。
 * Ahrefs「Inconsistent AI training bot policy／blocked from AI search bots」
 * 需在 Cloudflare 儀表板調整，無法單靠此 route 覆寫 Cloudflare 注入段。
 */
export function GET() {
  const body = `# AI guidance: ${SITE.url}/llms.txt
# Extended: ${SITE.url}/llms-full.txt
#
# Content signals (search OK; training restricted; reference use OK)
# Cloudflare may prepend additional User-agent rules — keep them aligned
# with these signals in the Cloudflare dashboard.

User-agent: *
Allow: /
Disallow: /api/

# Prefer AI search / assistant crawlers to read public pages + llms.txt
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Applebot-Extended
Allow: /

Sitemap: ${SITE.url}/sitemap.xml
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
