# Meta 文档答疑员 · 公开展示页

**[Live demo](https://web-ai-agent.vercel.app/)** · 仓库：[`StormJx/webAIAgent`](https://github.com/StormJx/webAIAgent)

这是「Meta 文档答疑员」的静态展示站，不是答疑引擎本身。  
真正查 Meta 官方文档、给出可核查结论，发生在**飞书私聊**里。本页只回放已验证问答，并引导访问者去飞书。

This repository is the **public showcase** for a Feishu-based Meta WhatsApp / WABA docs agent. The site is static: it replays recorded answers and does not call any model API.

## English

A document-checking agent for Meta WhatsApp Business Platform (WABA / Cloud API) docs.

- Users ask in Feishu. The agent searches only the current official docs tree and returns a conclusion **with a live official URL**.
- If it cannot pin the claim to a page, it says “not found” or hands off to a human. It does not invent policy.
- Typical docs lookup: about **15 minutes → 1–2 minutes**.
- This website is a funnel: recorded Feishu Q&A replay, keyword match, then “Add the Feishu bot”. No backend, no secrets, no visitor tracking.

**Positioning:** generic AI explains; this agent verifies against official docs.

## 它是什么

面向 WhatsApp Business / Cloud API 支持场景的**文档核对员**，不是通用聊天机器人。

- 飞书收文字问题，只在 Meta 现行官方文档树检索核验
- 每条论断必须落到可打开、内容确实支持该论断的官方链接
- 方案选型、退款投诉、个案诊断在岗位规则里写死转人工
- 网站引流，飞书成交；本仓库只包含展示页

## 本页包含什么

- 首屏主按钮「添加飞书机器人」（飞书官方 AppLink）
- 三步添加说明；输入框命中演示库则回放，未命中则引导去飞书
- 仿飞书窗口的真实问答回放（4 组，录制于 2026-08-15，已脱敏）
- 能力范围、工作流程、能力边界、运行记录、技术构成

## 安全设计

- 纯静态 HTML/CSS/JS，没有后端，没有任何可调用接口
- 不接模型 API：答案是录制内容，点击即回放
- 页面不含 API Key、App Secret、open_id、chat_id、会话 ID、本机路径
- 添加按钮使用飞书官方公开协议 `applink.feishu.cn/client/bot/open`（App ID 是该协议的公开参数，不是密钥）
- 无表单、无第三方统计、无 Cookie
- 外链只指向飞书官方协议和 Meta 官方文档

## 文件

| 文件 | 作用 |
|------|------|
| `public/index.html` | 页面结构与文案 |
| `public/styles.css` | 样式 |
| `public/app.js` | 对话回放、关键词匹配、飞书引流 |
| `public/data.js` | 展示用问答（真实会话摘录，已脱敏） |
| `vercel.json` | 部署配置与安全响应头 |

## 本地预览

```bash
cd public
python3 -m http.server 8899
# http://localhost:8899
```

## 部署

生产地址：https://web-ai-agent.vercel.app/

```bash
vercel --prod
```

增删展示问答：编辑 `public/data.js`。改文案：编辑 `public/index.html`。  
写入 `data.js` 前确认答案不含账号 ID、聊天 ID、内部路径或任何凭证。
