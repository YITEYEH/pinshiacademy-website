import { SITE_SKILL_MD } from "@/lib/agent-discovery";

export function GET() {
  return new Response(SITE_SKILL_MD, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
