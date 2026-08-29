# Meta 文档答疑员 · 公开展示页

一个纯静态展示站，用来对外介绍「Meta 文档答疑员」Agent。

## 它包含什么

- 首屏主按钮「添加飞书机器人」，导向飞书官方 AppLink
- 三步添加说明；演示输入框命中回放库则回放，未命中则引导去飞书
- 仿飞书聊天窗口的**真实问答回放**（4 组，全部取自 2026-08-15 实际会话原文）
- 能力范围、工作流程、能力边界、运行记录、技术构成、隐私声明

## 安全设计

- 纯静态 HTML/CSS/JS，**没有后端，没有任何可调用接口**
- **不接模型 API**：答案是录制内容，点击即回放，不产生调用，他人无法借用额度
- 页面内**不含** API Key、App Secret、用户 open_id、chat_id、会话 ID、本机路径
- 添加按钮使用飞书官方公开协议 `applink.feishu.cn/client/bot/open`（App ID 是该协议的公开参数，不是密钥）
- 无表单提交、无第三方统计脚本、无 Cookie
- 外链仅指向飞书官方协议和 Meta 官方文档站

## 文件

| 文件 | 作用 |
|------|------|
| `public/index.html` | 页面结构与全部文案 |
| `public/styles.css` | 样式 |
| `public/app.js` | 对话回放、关键词匹配与飞书引流 |
| `public/data.js` | 展示用问答数据（真实会话摘录，已脱敏） |
| `faq/` | **本地 FAQ 知识库**（运行时真相源；含字段规范与维护规则） |
| `vercel.json` | 部署配置与安全响应头 |

## 本地 FAQ

Agent 可复用的已验证问答在 `faq/verified/`。手动新增与自动回填**共用同一套字段**，规则见：

- [`faq/README.md`](faq/README.md) — 维护流程、过期策略、与展示页关系
- [`faq/SCHEMA.md`](faq/SCHEMA.md) — 字段定义与验收清单
- [`faq/_template.yaml`](faq/_template.yaml) — 复制用空白模板

**注意：** 更新知识内容时先改 `faq/`，再按需脱敏同步到 `public/data.js`；不要只改展示页。

## 本地预览

```bash
cd meta-docs-qa-showcase
python3 -m http.server 8899
# 打开 http://localhost:8899
```

## 部署到 Vercel

```bash
cd meta-docs-qa-showcase
vercel login      # 首次，浏览器完成授权
vercel --prod     # 部署并输出公开链接
```

## 更新内容

- **增删 FAQ（优先）：** 按 `faq/README.md` 在 `faq/verified/` 或 `faq/pending/` 增改 YAML
- 增删展示问答：编辑 `data.js` 里的数组，每项含 `chip`（按钮文案）、`question`、`meta`（时间/耗时/调用次数）、`steps`（执行轨迹）、`answer`（HTML）；内容应与对应 FAQ 条目一致
- 改文案与章节：编辑 `index.html`
- 改完执行 `vercel --prod` 重新发布

**注意：** 往 `faq/` 或 `data.js` 里加内容时，先确认不含账号 ID、聊天 ID、内部路径或任何凭证。

## Hermes / 飞书机器人（本地机密）

飞书答疑机器人由本机 Hermes 运行，配置在 `~/.hermes/`，**不在**本静态站仓库的业务代码里。  
如何把配置安全镜像到 `local/hermes/`（且永不进 GitHub）：见 [`docs/hermes-runtime.md`](docs/hermes-runtime.md)。
