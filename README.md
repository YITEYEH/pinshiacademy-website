# 品識學苑（Pin Shi Academy）官方網站

以 **Next.js App Router + React + Tailwind** 重構的教育品牌網站，可部署於 **Vercel**，並具備基本 SEO 能力（Metadata、`sitemap.xml`、`robots.txt`）與可寫文章的 Blog（MDX/Markdown）。

## 開發

安裝依賴：

```bash
npm install
```

啟動開發伺服器（**macOS / Linux 會先釋放 3000 埠**，避免舊 `next` 佔用導致靜態檔 404）：

```bash
npm run dev
```

若懷疑快取或 `.next` 損毀（例如改動路由、換分支後行為異常），可先清再開：

```bash
npm run dev:fresh
```

需要連埠號一併清乾淨、避免多個 `next` 搶同一埠（macOS）時：

```bash
npm run dev:clean
```

Production build：

```bash
npm run build
npm run start
```

**務必**先 `build` 再 `start`，否則 `.next` 與執行檔可能不一致。

### 開發時出現 `/_next/static/...` 404（layout.css、main-app.js、page.js 等）

多半是 **瀏覽器仍用舊的 HTML**（內含舊的 `?v=…` 靜態網址），但本機 `.next` 已換成新一輪建置，請求就會 404。**不是程式架構壞掉**，依序試：

1. **同一埠只跑一個** `next dev`：終端機執行 `lsof -i :3000`，結束多餘的 `node` 行程後再 `npm run dev`。
2. 瀏覽器對 `http://localhost:3000` **強制重新整理**（`⌘`+`Shift`+`R`）或改用 **無痕視窗**。
3. 仍異常時執行 `npm run dev:fresh` 或 `npm run dev:clean`，再重開分頁。
4. 與其他專案分開時可改埠：`PORT=3005 npm run dev`，改開 `http://localhost:3005`。

## 環境變數

複製範例檔：

```bash
cp .env.example .env.local
```

- `NEXT_PUBLIC_SITE_URL`: 網站正式網域（目前預設為 `https://pinshiacademy.com`）
- `WP_GRAPHQL_URL`: WordPress WPGraphQL endpoint（預設：`https://blog.pinshiacademy.com/graphql`）

（已內建「用環境變數開關」）
- **GA4**：`NEXT_PUBLIC_GA4_ID`（例如 `G-XXXXXXX`）— 會在 `app/layout.tsx` 自動載入 gtag；已追蹤 `outbound_click`（LINE 等外部 CTA）、`contact_email_click`（聯絡頁 Email）
- **Google Search Console（HTML 標記驗證）**：`NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`（或 `GOOGLE_SITE_VERIFICATION`）— 會寫入 Next.js `metadata.verification.google`

## SEO 與 AI 可發現性

本站已具備：

- 集中式 metadata（`lib/seo.ts`）、`sitemap.xml`、`robots.txt`（封鎖 `/api/`）
- JSON-LD：`EducationalOrganization`、`Course`、`Person`、`FAQPage`、`Article`、`Blog` 等
- RSS 全文 feed：`/feed.xml`（含 `content:encoded`），head 有 RSS autodiscovery
- AI 指引：`/llms.txt`（核心頁面、引用政策、聯絡方式）

### Search Console 建議流程

1. 在 [Google Search Console](https://search.google.com/search-console) 新增資源 `https://www.pinshiacademy.com`
2. 設定 `.env.local` 的 `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`，部署後以 HTML 標記驗證
3. 提交 Sitemap：**必須含 `.xml`** → `https://www.pinshiacademy.com/sitemap.xml`（勿填 `/sitemap`，否則 GSC 會收到 404 HTML）
4. Vercel 的 `NEXT_PUBLIC_SITE_URL` 請設 `https://www.pinshiacademy.com`（與慣用網域一致）
5. 每週檢視「效能 → 查詢」：曝光、CTR、排名；依數據調整 title/description 與 Blog 主題

### GA4 建議事件（已實作）

測量 ID：`G-CKT21WVCLP`。設定方式見 [`docs/analytics-setup.md`](docs/analytics-setup.md)。

| 事件 | 觸發 |
|------|------|
| `outbound_click` | LINE 諮詢、招募外連、Footer 社群（`link_label` 區分位置） |
| `contact_email_click` | 聯絡頁 / Footer Email（`link_label`: `contact_page` / `footer_email`） |
| `share_click` | 文章分享：複製連結、Facebook、LINE（`share_method`） |

可在 GA4 建立自訂探索，觀察諮詢轉換路徑；建議將 `outbound_click` 標為 Key event。

### 內容與站外（營運）

- **Blog**：建議每週 1–2 篇，主題對準會考、學測、分科、各科讀書方法
- **WordPress**：`blog.pinshiacademy.com` 維持 noindex；對外 canonical 為 `www.pinshiacademy.com/blog/`
- **Backlinks**：教育媒體投稿、家長社團、升學講座；Google 商家檔案用「服務區域」型態，勿填假實體教室地址

## Blog（MDX/Markdown）

- 文章放在 `content/posts/*.mdx`
- frontmatter 欄位範例：`title`、`description`、`date`、`category`、`readTime`

## 備註

- Logo 使用 `public/brand/logo.png`（可由 `image/Logo.png` 等設計稿匯入）；若要更換品牌圖檔，直接替換該檔案即可。

