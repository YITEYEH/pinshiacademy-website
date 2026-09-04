import {
  MARKDOWN_CACHE_CONTROL,
  MARKDOWN_CONTENT_TYPE,
} from "@/lib/accept-markdown";
import { getMarkdownForPath } from "@/lib/markdown-pages";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug?: string[] }> },
) {
  const { slug } = await params;
  const result = getMarkdownForPath(slug);

  return new Response(result.body, {
    status: result.status,
    headers: {
      "Content-Type": MARKDOWN_CONTENT_TYPE,
      Vary: "Accept",
      "Cache-Control": MARKDOWN_CACHE_CONTROL,
    },
  });
}
