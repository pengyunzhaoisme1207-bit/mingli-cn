# MÍNG LÌ (中文版) — Frontend

Next.js 15 App Router 命理报告生成网站。

## 技术栈

- Next.js 15.5.7 (App Router, dynamic catch-all routes)
- Tailwind CSS v3 + PostCSS (app/shared.css 全局样式)
- TypeScript strict mode
- SSE 流式报告生成

## 路由清单

| 路由 | 文件 | 类型 | 说明 |
|------|------|------|------|
| `/` | `app/page.tsx` | Static | 首页 |
| `/reading` | `app/reading/page.tsx` | Client | 解读表单 → 流式报告 |
| `/report/[id]` | `app/report/[id]/page.tsx` | Client | 已生成报告回看 |
| `/cases` | `app/cases/page.tsx` | Static | 案例展示 |
| `/what-is-bazi` | `app/what-is-bazi/page.tsx` | Static | 科普页 |
| `/sample-report` | `app/sample-report/page.tsx` | Client | 示例报告 |
| `/library` | `app/library/[[...slug]]/page.tsx` | Static/Server | 典籍文库 |

## 变现状态

- 支付系统已临时移除，当前为免费内测模式。
- `/reading` 生成完整 15 章报告，`/report/[id]` 回看完整报告。
- 不调用 `payment-center`，不读取 `NEXT_PUBLIC_PAYMENT_CENTER_URL`，不使用支付回跳页面。

## 关键约定

- **API 调用**：通过 `lib/api.ts`，`NEXT_PUBLIC_API_URL` 环境变量指定后端，fallback 到 Railway
- **报告生成**：SSE 流式传输，`reading/page.tsx` 解析 `data: {chunk}` 和 `data: {done}` 事件
- **报告存储**：完整报告存入 localStorage，键名为 `report_{id}`
- **15章结构**：对应十五步排盘总纲，chapterTitles 在 reading/report/sample-report 三处同步
- **地区数据**：`lib/regions.ts` 中国省份/城市/区县三级联动

## 红线

- 不硬编码 API 地址，使用 `NEXT_PUBLIC_API_URL` 环境变量
- 不混用 Tailwind v4 `@import "tailwindcss"` 语法，用 v3 `@tailwind` 指令
- 不修改 skill/ 目录下的命理知识库内容（位于后端项目）

## 部署

- 前端：Vercel，推送 main 自动构建
- 环境变量：`NEXT_PUBLIC_API_URL` = 后端 Railway 地址
