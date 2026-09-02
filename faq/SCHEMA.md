# FAQ 字段规范（Schema）

本文件定义本地 FAQ 条目的**唯一合法结构**。手动新增与 Agent 自动回填必须使用同一套字段，用 `source` 区分写入方式，用 `origin` / `knowledge_type` 区分知识性质。**不要**为手动条目另建一套文档格式。

文件格式：YAML（`.yaml`）。一条问答 = 一个文件。

---

## 必填字段

| 字段 | 类型 | 说明 |
|------|------|------|
| `id` | string | 唯一标识，kebab-case，如 `template-categories`。全局唯一，改内容时不要改 id。 |
| `status` | enum | 见下方「状态枚举」。只有 `verified` 才允许被 Agent 直接复用为最终答案。 |
| `source` | enum | `manual`（人工）或 `auto`（Agent 回填）。回填默认只能进 `pending/`。 |
| `origin` | enum | 这条知识从哪来：`official_docs` / `customer_case` / `internal_ops`。 |
| `knowledge_type` | enum | `official` / `field_practice` / `mixed`。实践经验不得标成官方规定。 |
| `customer_confirmed` | enum | `n/a` / `pending` / `yes`。来自客户问题的案例，只有 `yes` 才能进 `verified/`。 |
| `created_at` | date | 首次写入日期，`YYYY-MM-DD`。 |
| `verified_at` | date | 最近一次人工确认「仍可对外复用」的日期。 |
| `question` | string | 标准问法（用于展示与精确匹配）。 |
| `question_patterns` | string[] | 用户可能的说法；至少 2 条，含口语化问法。 |
| `keywords` | string[] | 检索关键词：中文词 + 官方英文术语混排。 |
| `conclusion` | string | 一句话结论，放在回答最前。 |
| `answer` | string (Markdown) | 完整回答。官方类须有出处链接；实践类须标明「实践经验，不是官方规定」。 |
| `sources` | object[] | 来源列表。官方类至少 1 条可打开的 URL；纯实践类可为 `[]`，但须填 `practice_note`。 |
| `scope` | enum | `doc_question` / `mixed` / `handoff`。 |
| `corpus` | enum | `meta_developer_docs` / `whatsapp_help` / `meta_ads_help` / `meta_marketing_api` / `field_practice`。 |
| `product` | enum | `consumer` / `business_app` / `business_platform` / `meta_ads`。 |

## 推荐字段

| 字段 | 类型 | 说明 |
|------|------|------|
| `customer_confirmed_at` | date | 客户确认「问题已解决」的日期；`customer_confirmed: yes` 时必填。 |
| `confirmed_by` | string | 记录确认人（内部），如 `Jay`。不要写客户姓名、公司名、open_id。 |
| `practice_note` | string | 实践经验摘要：在什么场景、做了什么、为何有效。禁止写成「此为 Meta 官方要求」。 |
| `verified_by` | string | 最近验证人，如 `Jay` 或 `agent-auto`。 |
| `aliases` | map | 业界叫法 → 官方术语对照。 |
| `handoff_note` | string | 何时必须转人工；`scope` 为 `mixed`/`handoff` 时必填。 |
| `meta` | object | 可选运行元数据：`at`、`cost`、`calls`。 |
| `steps` | string[] | 可选执行轨迹。 |
| `tone` | string | 仅展示用；`handoff` 表示转人工气泡。 |
| `related_ids` | string[] | 相关 FAQ 的 `id`。 |
| `notes` | string | 维护备注（不对外展示）。 |

## `sources[]` 结构

```yaml
sources:
  - type: official                    # official | practice
    title: "templates/overview"
    url: "https://developers.facebook.com/..."
    verified_at: 2026-08-28
```

纯实践条目可以没有 `url`，但 `type` 必须为 `practice`，且 `answer` 里写明不是官方规定。

## 状态枚举（`status`）

| 值 | 含义 | Agent 行为 |
|----|------|------------|
| `draft` | 草稿，未验收 | 不命中复用 |
| `awaiting_confirm` | 已有草稿，等待客户确认已解决 | 不命中复用，不得进展示页 |
| `verified` | 已验证，可复用 | 可命中；有官方链接的仍须验链接 |
| `stale` | 过期或疑似过期 | 命中后必须重查再回答 |
| `archived` | 已废弃 | 不命中；文件移入 `archived/` |

## 范围枚举（`scope`）

| 值 | 含义 |
|----|------|
| `doc_question` | 全程可由官方文档或已确认实践支撑 |
| `mixed` | 部分可答，部分须转人工（须写 `handoff_note`） |
| `handoff` | 整题转人工，不做文档承诺 |

## 写入方式（`source`）

| 值 | 含义 |
|----|------|
| `manual` | 人工按本规范写入 |
| `auto` | Agent 答完后回填；**只能**写入 `pending/`，不得直接 `verified` |

## 知识来源（`origin`）

| 值 | 含义 | 进 `verified/` 的额外门槛 |
|----|------|---------------------------|
| `official_docs` | 整理自 Meta / WhatsApp / 广告帮助中心官方页面 | 链接有效即可；`customer_confirmed` 用 `n/a` |
| `customer_case` | 来自真实客户提问与处理过程 | **必须** `customer_confirmed: yes`，且客户明确表示问题已解决 |
| `internal_ops` | 内部运营/对接中反复验证的做法，不绑单一客户 | 须写 `practice_note`；仍不得冒充官方 |

## 知识性质（`knowledge_type`）

| 值 | 含义 | 对外怎么说 |
|----|------|------------|
| `official` | 结论能落到官方文档 | 可写「官方要求 / 官方说明」 |
| `field_practice` | 官方没写清，实践中验证过 | 必须写「这是我们实践中的做法，不是 Meta 官方规定」 |
| `mixed` | 官方能支撑一部分，实践补缺口 | 两段分开写，禁止混成一句官方结论 |

## 客户确认（`customer_confirmed`）

| 值 | 含义 |
|----|------|
| `n/a` | 不是客户案例（官方文档整理、岗位边界说明等） |
| `pending` | 来自客户问题，尚未得到「已解决」确认 |
| `yes` | 客户已确认该问题已解决，才允许沉淀为可复用案例 |

**硬规则：客户问题不能因为「Agent 已经答过」就进案例库。**  
未确认解决 → `pending/` + `status: awaiting_confirm`。客户反口「没解决」→ 不得标 `verified`，必要时 `archived`。

## 语料库枚举（`corpus`）

| 值 | 站点 / 含义 |
|----|-------------|
| `meta_developer_docs` | `developers.facebook.com/documentation/.../whatsapp/` |
| `whatsapp_help` | `faq.whatsapp.com`（Business 应用操作） |
| `meta_ads_help` | `facebook.com/business/help/...`（广告管理工具 / 商务套件操作） |
| `meta_marketing_api` | `developers.facebook.com/docs/marketing-api/`（广告 Marketing API，给开发对照） |
| `field_practice` | 无对应官方页，或官方页覆盖不了的实践缺口 |

当前范围：**不收录**个人版隐私/安全类帮助。广告配置以 Business Help 为主；Marketing API 仅作开发对照，不要把接口字段写成后台按钮。

## 产品层枚举（`product`）

| 值 | 含义 |
|----|------|
| `consumer` | 个人版 WhatsApp（当前默认不收录） |
| `business_app` | 免费 WhatsApp Business 应用 |
| `business_platform` | WhatsApp Business Platform |
| `meta_ads` | Meta 广告（广告管理工具、商务资产组合、像素等） |

同一主题在 App / Platform / 广告下入口不同时，必须分成不同 `id`。  
尤其是「企业验证」：广告侧商务套件验证 ≠ WhatsApp 企业认证 / 绿标。

## 目录约定

```
faq/
├── SCHEMA.md
├── README.md
├── _template.yaml
├── verified/          # 仅 verified
├── pending/           # draft / awaiting_confirm / 未找到
└── archived/
```

## 验收清单（写入 `verified/` 前）

- [ ] `id` 唯一且为 kebab-case
- [ ] `origin` / `knowledge_type` / `customer_confirmed` 已填
- [ ] 若 `origin: customer_case`：客户已确认解决（`customer_confirmed: yes` + 日期）；未确认一律留在 `pending/`
- [ ] 若 `knowledge_type` 含实践：正文已标明「实践经验，不是官方规定」；未写「此为 Meta 官方要求」
- [ ] `question_patterns` ≥ 2
- [ ] `conclusion` 口语可读
- [ ] 官方类：每条论断有有效 `sources` 链接
- [ ] `corpus` / `product` 正确：未把 App 写成 Platform，也未把广告企业验证写成 WhatsApp 绿标
- [ ] 无账号 ID、chat_id、客户姓名、公司名、内部路径、密钥
- [ ] 未把未确认个案写成可复用结论
