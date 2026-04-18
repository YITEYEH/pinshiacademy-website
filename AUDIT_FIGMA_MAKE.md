## Figma Make 匯出專案盤點（可沿用 vs 需重寫）

### 現況摘要
- **目前技術棧**：Vite + React Router（`app/routes.tsx`、`app/App.tsx`）
- **UI / Design System**：Tailwind v4 + CSS variables token（`styles/theme.css`）+ 一套 shadcn/Radix 風格的 `app/components/ui/*`
- **動畫**：`motion/react`（Framer Motion 風格 API）
- **資產**：原本 `imports/品識Logo.png` 被程式碼引用（`Navbar.tsx`、`Footer.tsx`），但在解壓時因檔名編碼問題未寫入成功
- **頁面**：多數頁面屬於「靜態內容 + 少量互動 state」的行銷站，非常適合遷移到 Next App Router + SSR

### 可直接沿用（高）
- **視覺風格與 Tailwind tokens**：`styles/theme.css`、`styles/tailwind.css`（可移入 Next 的 `app/globals.css`）
- **通用 UI 元件**：`app/components/ui/*`（Button/Card/Accordion/...）大多可直接搬到 `components/ui/*`（注意路徑與少量環境差異）
- **大部分頁面 JSX 結構與內容**：`app/pages/*.tsx`（版面與文案基本可保留）
- **共用元件**：`app/components/Navbar.tsx`、`app/components/Footer.tsx`（需替換 Link/資產路徑）

### 需要重寫 / 改造（必要）
- **路由層**：React Router（`createBrowserRouter`、`RouterProvider`、`Link`、`Outlet`）需改為 Next App Router（`app/**/page.tsx` + `next/link` + `layout.tsx`）
- **SEO 能力**：目前沒有 Next 的 Metadata / sitemap / robots；需新增：
  - `app/layout.tsx`、各頁 `generateMetadata`
  - `app/sitemap.ts`、`app/robots.ts`
  -（文章頁）`Article` schema.org JSON-LD
- **Blog 架構**：目前 `app/pages/Blog.tsx` 是硬編的 `blogPosts` 陣列且 `link: "#"`，需改成：
  - `content/posts/*.mdx` + frontmatter
  - `content-api`（抽象層：先讀本機 MDX，未來可替換為 CMS provider）
  - `app/blog/page.tsx`（列表）與 `app/blog/[slug]/page.tsx`（內頁）
- **資產與圖片**：
  - 把 Logo 等圖片放到 `public/`（安全檔名，例如 `public/brand/logo.png`）
  - `img`/遠端圖改用 `next/image`（或先保留 `img`，再逐步優化）
- **依賴清理**：`package.json` 目前含大量 Radix/MUI/Emotion 依賴；遷移到 Next 後會依「實際使用」逐步瘦身，避免 bundle 過大

### 風險/注意事項
- `imports/品識Logo.png` 在你的 macOS/zip 解壓時因檔名編碼造成失敗；我會在重構時改用 `public/` 路徑並統一檔名，避免部署/CI 平台出現同類問題。

