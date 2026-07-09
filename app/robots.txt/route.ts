import { SITE } from "@/lib/site";

export function GET() {
  const body = `# AI guidance: ${SITE.url}/llms.txt
# Extended: ${SITE.url}/llms-full.txt

User-agent: *
Allow: /
Disallow: /api/

Sitemap: ${SITE.url}/sitemap.xml
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
