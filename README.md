# 品識學苑（Pin Shi Academy）官方網站

以 **Next.js App Router + React + Tailwind** 重構的教育品牌網站，可部署於 **Vercel**，並具備基本 SEO 能力（Metadata、`sitemap.xml`、`robots.txt`）與可寫文章的 Blog（MDX/Markdown）。

## 開發

安裝依賴：

```bash
npm install
```

啟動開發伺服器：

```bash
npm run dev
```

Production build：

```bash
npm run build
npm run start
```

## 環境變數

複製範例檔：

```bash
cp .env.example .env.local
```

- `NEXT_PUBLIC_SITE_URL`: 網站正式網域（目前預設為 `https://pinshiacademy.com`）
- `WP_GRAPHQL_URL`: WordPress WPGraphQL endpoint（預設：`https://blog.pinshiacademy.com/graphql`）

（已內建「用環境變數開關」）
- **GA4**：`NEXT_PUBLIC_GA4_ID`（例如 `G-XXXXXXX`）— 會在 `app/layout.tsx` 自動載入 gtag
- **Google Search Console（HTML 標記驗證）**：`NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`（或 `GOOGLE_SITE_VERIFICATION`）— 會寫入 Next.js `metadata.verification.google`

## Blog（MDX/Markdown）

- 文章放在 `content/posts/*.mdx`
- frontmatter 欄位範例：`title`、`description`、`date`、`category`、`readTime`

## 備註

- `legacy/`：保留原本 Figma Make 匯出（Vite/React Router）程式碼，僅供對照，不參與 Next build。
- Logo 使用 `public/brand/logo.png`（由 `image/Logo.png` 匯入部署）；若要更換品牌圖檔，直接替換該檔案即可。

