import { createHash } from "node:crypto";
import { CONTACT } from "@/lib/contact";
import { LINE_LINKS, LINE_OA_BASIC_ID } from "@/lib/line-links";
import { SITE } from "@/lib/site";

export const AUTH_MD = `# auth.md

本站公開內容不需要代理註冊或憑證。

## 誰可以讀

任何代理或搜尋程式都可以讀取 https://www.pinshiacademy.com 的公開頁面、\`/llms.txt\`，以及 \`Accept: text/markdown\`（或路徑加 \`.md\`）的 Markdown。

## 沒有的東西

- 沒有代理帳號、OAuth 或 API token
- 沒有在這個網域代客付款的結帳 API（預錄課程與直播報名在 Teachify：https://pinshiacademy.tw）

## 家長諮詢

試聽與學習建議由真人透過 LINE 官方帳號 ${LINE_OA_BASIC_ID} 回覆，不是機器憑證。桌面短網址：${LINE_LINKS.consult}

信箱：${CONTACT.email}
`;

export const SITE_SKILL_NAME = "pinshi-public-site";

export const SITE_SKILL_MD = `---
name: ${SITE_SKILL_NAME}
description: Read Pin Shi Academy public pages as Markdown and cite the canonical site. This origin has no agent account or payment API.
---

# 品識學苑公開網站

## 怎麼讀

1. 先讀 ${SITE.url}/llms.txt
2. 頁面可加 \`.md\`，或送 \`Accept: text/markdown\`
3. 機器可讀目錄：${SITE.url}/.well-known/api-catalog
4. Markdown API 說明：${SITE.url}/openapi.json

## 引用

使用 ${SITE.url} 的網址，來源寫「品識學苑」。

## 不要做

- 不要尋找 OAuth、MCP 或 A2A 端點；這個網域沒有
- 不要在這個網域發起付款；購課在 Teachify（https://pinshiacademy.tw）
- 試聽請導向 LINE（${LINE_LINKS.consult}），由家長自行送出
`;

export function siteSkillDigest(): string {
  const hex = createHash("sha256").update(SITE_SKILL_MD, "utf8").digest("hex");
  return `sha256:${hex}`;
}

export function buildOpenApiDocument() {
  return {
    openapi: "3.1.0",
    info: {
      title: `${SITE.name} Markdown API`,
      version: "1.0.0",
      description:
        "公開頁面的 Markdown 表示。不需認證，也沒有付款操作。",
    },
    servers: [{ url: SITE.url }],
    paths: {
      "/api/markdown": {
        get: {
          operationId: "getHomeMarkdown",
          summary: "首頁 Markdown",
          responses: {
            "200": {
              description: "text/markdown",
              content: {
                "text/markdown": {
                  schema: { type: "string" },
                },
              },
            },
          },
        },
      },
      "/api/markdown/{path}": {
        get: {
          operationId: "getPageMarkdown",
          summary: "指定公開頁的 Markdown",
          parameters: [
            {
              name: "path",
              in: "path",
              required: true,
              schema: { type: "string" },
              description: "例如 courses 或 blog/some-slug",
            },
          ],
          responses: {
            "200": {
              description: "text/markdown",
              content: {
                "text/markdown": {
                  schema: { type: "string" },
                },
              },
            },
            "404": { description: "沒有這個頁面" },
          },
        },
      },
    },
  };
}

export function buildApiCatalog() {
  const origin = SITE.url;
  return {
    linkset: [
      {
        anchor: `${origin}/api/markdown`,
        "service-desc": [
          {
            href: `${origin}/openapi.json`,
            type: "application/openapi+json",
          },
        ],
        "service-doc": [
          {
            href: `${origin}/llms.txt`,
            type: "text/plain",
          },
        ],
      },
    ],
  };
}

export function buildAgentSkillsIndex() {
  return {
    $schema: "https://schemas.agentskills.io/discovery/0.2.0/schema.json",
    skills: [
      {
        name: SITE_SKILL_NAME,
        type: "skill-md",
        description:
          "Read Pin Shi Academy public pages as Markdown and cite the canonical site.",
        url: `${SITE.url}/.well-known/agent-skills/${SITE_SKILL_NAME}/SKILL.md`,
        digest: siteSkillDigest(),
      },
    ],
  };
}
