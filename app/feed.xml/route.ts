import { getAllPosts, getPostBySlug } from "@/content/content-api/posts";
import { SITE } from "@/lib/site";

function escapeXml(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function escapeCdata(text: string) {
  return text.replace(/]]>/g, "]]]]><![CDATA[>");
}

export async function GET() {
  const summaries = await getAllPosts();

  const items = await Promise.all(
    summaries.map(async (post) => {
      const url = `${SITE.url}/blog/${post.slug}`;
      const pubDate = new Date(post.frontmatter.date).toUTCString();
      let contentEncoded = "";
      try {
        const full = await getPostBySlug(post.slug);
        contentEncoded = full.content;
      } catch {
        contentEncoded = `<p>${escapeXml(post.frontmatter.description)}</p>`;
      }

      const category = post.frontmatter.category
        ? `\n      <category>${escapeXml(post.frontmatter.category)}</category>`
        : "";
      const author = post.frontmatter.authorName
        ? `\n      <author>${escapeXml(post.frontmatter.authorName)}</author>`
        : "";

      return `    <item>
      <title>${escapeXml(post.frontmatter.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${escapeXml(post.frontmatter.description)}</description>${category}${author}
      <content:encoded><![CDATA[${escapeCdata(contentEncoded)}]]></content:encoded>
    </item>`;
    }),
  );

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:atom="http://www.w3.org/2005/Atom"
  xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>品識學苑學習專欄</title>
    <link>${SITE.url}/blog</link>
    <description>品識學苑關於12年國教升學規劃、學習方法與親子溝通的文章</description>
    <language>zh-TW</language>
    <atom:link href="${SITE.url}/feed.xml" rel="self" type="application/rss+xml"/>
${items.join("\n")}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120",
    },
  });
}

export const revalidate = 60;
