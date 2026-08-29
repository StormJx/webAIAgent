# 本地 FAQ 维护规则

本目录是 **Meta 文档答疑员** 的本地 FAQ 知识库（运行时真相源）。  
展示页 `public/data.js` 只是脱敏后的公开回放，**不是** FAQ；不要只改 `data.js` 而不改本目录。

字段定义见 [`SCHEMA.md`](./SCHEMA.md)。空白模板见 [`_template.yaml`](./_template.yaml)。

---

## 1. 核心原则

1. **同一套 Schema，不要另建「手动专用文档」**  
   手动条目与 Agent 自动回填共用 `verified/` / `pending/` / `archived/`，用 `source: manual | auto` 区分。

2. **本地 FAQ 是唯一运行时真相源**  
   飞书 Wiki（若后续接入）只做编辑层；同步方向应为 Wiki → 本地 FAQ，避免双真相源。

3. **宁可 `draft` / 转人工，也不写无出处结论**  
   与 Agent 岗位定义一致：可核查链接优先于「听起来对」。

4. **优先更新已有条目，禁止重复建条**  
   新增前先按 `id`、关键词、问法搜索本目录；同一问题只保留一条 `verified`。

---

## 2. 目录怎么用

| 目录 | 放什么 |
|------|--------|
| `verified/` | 已验收、可被 Agent 复用的条目（`status: verified`） |
| `pending/` | 未找到清单、草稿、待重查（`draft` / 待补 `sources`） |
| `archived/` | 明确废弃或被合并替代的旧条（`status: archived`） |

文件命名：`<id>.yaml`，与文件内 `id` 字段一致。

---

## 3. 手动新增流程

```
1. 搜索 verified/ 与 pending/，确认没有重复
2. 复制 _template.yaml → verified/<id>.yaml（未就绪则放到 pending/）
3. 填必填字段（见 SCHEMA.md）
4. 点开每一条 sources[].url，确认仍有效
5. status 保持 draft，自检验收清单
6. 通过后改为 verified，填写 verified_at / verified_by
7. （可选）挑优质案例脱敏后同步到 public/data.js 供展示页回放
```

### 手动条目特别容易漏的点

- **问法不够**：只有标准问、没有口语（如「绿标」「老被封号」）→ Agent 命不中  
- **只有结论、没有官方链接** → 不得标 `verified`  
- **该转人工的边界没写**（个案封号原因、退款）→ 写成 `scope: mixed` 或 `handoff` 并填 `handoff_note`  
- **敏感信息**：账号 ID、chat_id、内部路径、密钥 → 一律删除  

---

## 4. Agent 自动回填约定

Agent 答完一轮后回填时，应写入与本 Schema 相同的字段，并满足：

| 要求 | 说明 |
|------|------|
| `source: auto` | 标明来自自动回填 |
| `status` | 默认可为 `draft` 或经链接核验后 `verified`；不确定时用 `draft` 进 `pending/` |
| `sources` | 本轮实际采纳的官方 URL，带 `verified_at` |
| `question_patterns` | 至少包含用户原话 |
| 命中旧条且链接失效 | **更新原文件**，不要新建；在 `notes` 记录「链接迁移 / 结论修正」 |

「未找到」类问题：在 `pending/` 新增一条，`status: draft`，`notes` 写明检索过的关键词与日期，便于人工补文档或改岗位规则。

---

## 5. 更新与过期

| 场景 | 做法 |
|------|------|
| 官方文档改版 / 链接 404 | 将 `status` 改为 `stale`，重查后更新 `answer` / `sources`，再改回 `verified` |
| 结论被纠正（如绿标 → blue checkmark） | 更新同 `id` 文件，写 `notes`，刷新 `verified_at` |
| 两条合并 | 保留主 `id`，另一条改 `archived` 并移入 `archived/`，`notes` 写明替代 id |
| 超过约 90 天未复验 | 建议标 `stale` 或纳入定期复验清单 |

命中 `verified` 条目后，运行时仍应**再验一遍** `sources` 链接是否有效；失效则走重查，不得直接原文回复。

---

## 6. 与展示页的关系

| 位置 | 职责 |
|------|------|
| `faq/**/*.yaml` | Agent / 运营维护的知识库 |
| `public/data.js` | 公开展示回放（可含 `chip`、HTML `answer`、动画 `steps`） |

从 FAQ 同步到展示页时：

1. 脱敏（无内部 ID、路径）  
2. 回答可转为 HTML（展示页需要）  
3. 补 `chip`、`meta`、`steps` 等展示字段  
4. **先改 FAQ，再改 data.js**，避免只更新演示、知识库落后  

---

## 7. 飞书 Wiki（后续可选）

若用飞书知识库做人工编辑界面：

- Wiki 文档使用与本 Schema 对应的固定标题模板（问法 / 关键词 / 结论 / 来源 / 边界）  
- 同步脚本：**Wiki → 本地 FAQ（单向）**  
- 仅同步明确标为可发布的页面；Agent 自动回填进 Wiki「待审核」区，人工确认后再进 `verified/`  

当前阶段：**先维护本目录 YAML 即可**，不必强行上飞书同步。

---

## 8. 能力边界（写入时必须遵守）

以下内容**不得**写成可执行承诺或确定性结论：

- 登录用户 Meta / WhatsApp 后台查看具体账号状态  
- 方案选型（「适不适合我们」「买哪一档」）  
- 退款、赔偿、改合同  
- 无官方文档依据的「保证」「一定可以」  

对应写法：`scope: handoff` 或 `mixed`，并写清 `handoff_note`。

---

## 9. 现有条目

| id | 主题 | scope | source |
|----|------|-------|--------|
| `template-categories` | 消息模板三大类别 | doc_question | verified |
| `oba-vs-bv` | OBA 与企业认证 BV | doc_question | verified |
| `ban-appeal` | 封号机制与申诉（含转人工） | mixed | verified |
| `refund-handoff` | 退款/补偿诉求 | handoff | verified |

以上四条整理自 2026-08-15 飞书真实会话，并与展示页回放对齐。
