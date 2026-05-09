# MÍNG LÌ (中文版) 完整部署指南

本文档记录了 `mingli-cn` (前端) 和 `mingli-backend-cn` (后端) 的完整物理隔离部署流程。整体按"前端占位 -> 后端部署 -> 前后端联调 -> 域名绑定"的顺序进行。

## 阶段一：前端初始部署 (Vercel)

1. **导入项目**：打开 vercel.com/new，找到 `pengyunzhaoisme1207-bit/mingli-cn` 并点击 Import。
2. **执行部署**：所有配置保持默认，直接点击 Deploy。
3. **获取临时域名**：等待部署完成，记录下 Vercel 分配的初始域名备用。

## 阶段二：后端部署 (Railway)

1. **导入项目**：打开 railway.app，点击 New Project -> Deploy from GitHub repo，选择 `pengyunzhaoisme1207-bit/mingli-backend-cn`。
2. **配置环境变量**：进入项目后，点击 `Variables` 标签页，添加：
   - `DASHSCOPE_API_KEY` = [你的阿里云百炼/通义千问 API Key]
3. **获取服务域名**：点击 `Settings` -> `Networking`，点击 Generate Domain，记录下 Railway 生成的后端 URL（例如：`https://web-production-6e525.up.railway.app`）。

## 阶段三：前后端联调与代码更新 (使用 Claude Code)

在后端域名生成后，需要将前端的 API 指向该后端。

**操作命令（在本地终端通过 Claude Code 执行）：**
请把 `mingli-cn` 前端项目里所有调用 `http://localhost:8000` 的地方，全部替换为最新的 Railway 后端地址：`https://web-production-6e525.up.railway.app`。
（重点检查 `app/reading/page.tsx` 和 `lib/api.ts` 等文件）。

替换完成后，推送到 GitHub：

```bash
cd /Users/jacky.peng/mingli-cn
git add .
git commit -m "fix: connect frontend to Railway backend"
git push origin main
```

**Vercel 环境变量补全：**
代码推送后，Vercel 会自动重新构建。为确保万无一失，进入 Vercel 的 `mingli-cn` 项目 -> `Settings` -> `Environment Variables`，添加：
- `NEXT_PUBLIC_API_URL` = `https://web-production-6e525.up.railway.app`
保存后，在 `Deployments` 中触发一次 Redeploy。

## 阶段四：自定义域名绑定 (Cloudflare + Vercel)

1. **Vercel 端添加域名**：
   - 进入 `mingli-cn` 的 `Settings` -> `Domains`。
   - 输入 `cn.next-happy.com` 并点击 Add（此时会提示 Invalid Configuration）。
2. **Cloudflare 端解析域名**：
   - 登录 Cloudflare，进入主域名 `next-happy.com` 的 DNS 解析页面。
   - 添加一条 CNAME 记录：
     - **Name**: `cn`
     - **Target**: `cname.vercel-dns.com`
     - **Proxy status**: 关闭橙色云朵，设为 `DNS only`（仅 DNS）。
3. **验证生效**：
   - 等待几分钟后刷新 Vercel Domains 页面，状态变为 `Valid Configuration` 即可。
   - 最终访问 `cn.next-happy.com` 测试纯中文报告生成。
