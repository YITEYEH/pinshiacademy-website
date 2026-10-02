import { buildOpenApiDocument } from "@/lib/agent-discovery";

export function GET() {
  return Response.json(buildOpenApiDocument(), {
    headers: {
      "Content-Type": "application/openapi+json; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
