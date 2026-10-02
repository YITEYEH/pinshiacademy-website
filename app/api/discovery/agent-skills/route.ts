import { buildAgentSkillsIndex } from "@/lib/agent-discovery";

export function GET() {
  return Response.json(buildAgentSkillsIndex(), {
    headers: {
      "Cache-Control": "public, max-age=3600",
    },
  });
}
