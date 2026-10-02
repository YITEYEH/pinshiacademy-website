import { buildApiCatalog } from "@/lib/agent-discovery";

export function GET() {
  return new Response(JSON.stringify(buildApiCatalog()), {
    headers: {
      "Content-Type": "application/linkset+json; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
