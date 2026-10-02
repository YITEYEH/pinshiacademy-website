"use client";

import { useEffect } from "react";
import { AGENT_PUBLIC_PATHS } from "@/lib/agent-public-paths";
import { CONTACT } from "@/lib/contact";
import { LINE_LINKS, LINE_OA_BASIC_ID } from "@/lib/line-links";

type ToolInput = Record<string, unknown>;

type WebMcpTool = {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
  execute: (input: ToolInput) => Promise<unknown> | unknown;
};

type ModelContext = {
  registerTool: (tool: WebMcpTool, options?: { signal?: AbortSignal }) => unknown;
};

function modelContext(): ModelContext | null {
  const nav = navigator as Navigator & { modelContext?: ModelContext };
  if (!nav.modelContext || typeof nav.modelContext.registerTool !== "function") {
    return null;
  }
  return nav.modelContext;
}

const tools: WebMcpTool[] = [
  {
    name: "list_public_pages",
    description: "列出品識學苑官網可公開閱讀的路徑。",
    inputSchema: {
      type: "object",
      properties: {},
      additionalProperties: false,
    },
    execute: () => ({ pages: AGENT_PUBLIC_PATHS }),
  },
  {
    name: "open_public_page",
    description: "在這個分頁開啟一個公開路徑，例如 /courses 或 /contact。",
    inputSchema: {
      type: "object",
      properties: {
        path: {
          type: "string",
          description: "站內路徑，必須是公開頁清單中的一項。",
        },
      },
      required: ["path"],
      additionalProperties: false,
    },
    execute: (input) => {
      const path = typeof input.path === "string" ? input.path : "";
      const allowed = (AGENT_PUBLIC_PATHS as readonly string[]).includes(path);
      if (!allowed) {
        return { ok: false, error: "path_not_allowed", pages: AGENT_PUBLIC_PATHS };
      }
      window.location.assign(path);
      return { ok: true, path };
    },
  },
  {
    name: "get_contact",
    description: "取得聯絡信箱與 LINE 試聽連結。試聽由家長自行送出，沒有站內付款。",
    inputSchema: {
      type: "object",
      properties: {},
      additionalProperties: false,
    },
    execute: () => ({
      email: CONTACT.email,
      lineId: LINE_OA_BASIC_ID,
      lineUrl: LINE_LINKS.consult,
    }),
  },
];

export function WebMcpTools() {
  useEffect(() => {
    const mc = modelContext();
    if (!mc) return;
    const controller = new AbortController();
    for (const tool of tools) {
      try {
        void mc.registerTool(tool, { signal: controller.signal });
      } catch {
        // 瀏覽器尚未提供 WebMCP 時略過
      }
    }
    return () => controller.abort();
  }, []);

  return null;
}
