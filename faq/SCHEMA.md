# FAQ 字段规范（Schema）

本文件定义本地 FAQ 条目的**唯一合法结构**。手动新增与 Agent 自动回填必须使用同一套字段，用 `source` 区分来源，**不要**为手动条目另建一套文档格式。

文件格式：YAML（`.yaml`）。一条问答 = 一个文件。

---

## 必填字段

| 字段 | 类型 | 说明 |
|------|------|------|
| `id` | string | 唯一标识，kebab-case，如 `template-categories`。全局唯一，改内容时不要改 id。 |
| `status` | enum | 见下方「状态枚举」。只有 `verified` 才允许被 Agent 直接复用为最终答案。 |
| `source` | enum | `manual`（人工）或 `auto`（Agent 回填）。 |
| `created_at` | date | 首次写入日期，`YYYY-MM-DD`。 |
| `verified_at` | date | 最近一次人工或流程确认「结论 + 链接仍有效」的日期。 |
| `question` | string | 标准问法（用于展示与精确匹配）。 |
| `question_patterns` | string[] | 用户可能的说法；至少 2 条，含口语化问法。 |
| `keywords` | string[] | 检索关键词：中文词 + 官方英文术语混排。 |
| `conclusion` | string | 一句话结论，放在回答最前。 |
| `answer` | string (Markdown) | 完整回答正文。必须含官方链接；禁止无出处的确定性断言。 |
| `sources` | object[] | 官方文档来源列表，见下方结构。至少 1 条（`handoff` 纯转人工条目可为空数组，但须在 `handoff_note` 说明）。 |
| `scope` | enum | `doc_question` / `mixed` / `handoff`。 |
| `corpus` | enum | 知识来源库：`meta_developer_docs` 或 `whatsapp_help`。决定优先去哪一类官方站核验。 |
| `product` | enum | 产品层：`consumer` / `business_app` / `business_platform`。回答前必须分清，避免 App 与 Platform 混答。 |

## 推荐字段

| 字段 | 类型 | 说明 |
|------|------|------|
| `verified_by` | string | 最近验证人，如 `Jay` 或 `agent-auto`。 |
| `aliases` | map | 业界叫法 → 官方术语对照，如 `绿标: blue checkmark (OBA)`。 |
| `handoff_note` | string | 何时必须转人工；`scope` 为 `mixed`/`handoff` 时必填。 |
| `meta` | object | 可选运行元数据：`at`（飞书时间）、`cost`（耗时）、`calls`（模型调用次数）。 |
| `steps` | string[] | 可选；该轮真实/示意执行轨迹，供展示页或调试用。 |
| `tone` | string | 仅展示用；`handoff` 表示转人工气泡样式。 |
| `related_ids` | string[] | 相关 FAQ 的 `id`。 |
| `notes` | string | 维护备注（不对外展示），如「链接曾迁移」「2025-04 政策变更」。 |

## `sources[]` 结构

```yaml
sources:
  - title: "templates/overview"          # 短标题或文档路径名
    url: "https://developers.facebook.com/..."  # 必须可公网打开
    verified_at: 2026-08-28              # 该链接最近点开核验日期
```

## 状态枚举（`status`）

| 值 | 含义 | Agent 行为 |
|----|------|------------|
| `draft` | 草稿，未验收 | 不命中复用 |
| `verified` | 已验证，可复用 | 可命中；命中后仍须验链接是否失效 |
| `stale` | 过期或疑似过期 | 命中后必须重查官方文档再回答 |
| `archived` | 已废弃 | 不命中；文件移入 `archived/` |

## 范围枚举（`scope`）

| 值 | 含义 |
|----|------|
| `doc_question` | 全程可由官方文档支撑 |
| `mixed` | 部分可答，部分须转人工（须写 `handoff_note`） |
| `handoff` | 整题转人工，不做文档承诺 |

## 来源枚举（`source`）

| 值 | 含义 |
|----|------|
| `manual` | 人工按本规范写入 |
| `auto` | Agent 答完后回填 |

## 语料库枚举（`corpus`）

| 值 | 官方站点 | 典型内容 |
|----|----------|----------|
| `meta_developer_docs` | `developers.facebook.com/documentation/.../whatsapp/` | 模板类别、WABA、OBA、Cloud API、Platform 政策申诉 |
| `whatsapp_help` | `faq.whatsapp.com` | Business 应用操作：目录、标签、广播、离开消息、快捷回复等 |

**不要**把 Help Center 的操作步骤与开发者文档的 API/政策机制混在同一条结论里而不加区分。  
当前范围：**不收录**个人版隐私/安全类帮助（加密、Privacy checkup 等），除非岗位定义另行放开。

## 产品层枚举（`product`）

| 值 | 含义 |
|----|------|
| `consumer` | 个人版 WhatsApp（当前默认不收录） |
| `business_app` | 免费 WhatsApp Business 应用 |
| `business_platform` | WhatsApp Business Platform（Cloud API / BSP） |

同一主题（如「封号」）在 `business_app` 与 `business_platform` 下申诉入口不同，必须分成不同 `id` 的条目。

## 目录约定

```
faq/
├── SCHEMA.md          # 本文件
├── README.md          # 维护规则与流程
├── _template.yaml     # 复制用空白模板
├── verified/          # status: verified
├── pending/           # 待补充 / draft / 未找到清单
└── archived/          # status: archived
```

- `verified/` 内文件的 `status` 必须为 `verified`。
- 将条目标为 `stale` 时可仍留在 `verified/`，或移到 `pending/` 待重查；二选一须在 PR/提交说明里写清。
- `archived/` 内文件的 `status` 必须为 `archived`。

## 验收清单（写入 `verified/` 前）

- [ ] `id` 唯一且为 kebab-case
- [ ] `question_patterns` ≥ 2，含真实用户说法
- [ ] `keywords` 含中文 + 关键英文术语
- [ ] `conclusion` 与 `answer` 一致，结论先行
- [ ] 每条论断有对应 `sources` 链接（`handoff` 除外）
- [ ] 所有 `sources[].url` 已点开确认有效，`verified_at` 为今日或近日
- [ ] `corpus` / `product` 已填写，且与 `sources` 域名一致（Help → `faq.whatsapp.com`；开发者文档 → `developers.facebook.com`）
- [ ] `scope` / `handoff_note` 与能力边界一致（不承诺退款、不诊断个案账号）
- [ ] 正文无 API Key、账号 ID、chat_id、内部路径等敏感信息
- [ ] 未把 App 功能写成 Platform 能力，也未写入未在官文确认的数字/步骤
- [ ] `conclusion` 口语可读：不懂 API 的人也能懂大意
- [ ] `answer` 遵循「结论 → 是啥 → 怎么做 → 链接 → 坑」；前 3 行无缩写堆砌
