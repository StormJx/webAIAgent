# 待补充清单（pending）

本目录存放：

1. **`draft`**：未写完、未验收、官方链接未核验
2. **`awaiting_confirm`**：已根据客户问题起草，**等客户确认已解决**（默认落点）
3. **「未找到」**：文档检索无果
4. **待重查**：从 `verified/` 标为 `stale` 的条目

## 客户案例（默认流程）

Agent 或人工刚处理完客户问题 → **先写在这里**，不要进 `verified/`。

```yaml
id: pending-topic-slug
status: awaiting_confirm
source: manual          # 或 auto
origin: customer_case
knowledge_type: field_practice   # 或 mixed
customer_confirmed: pending
created_at: YYYY-MM-DD
verified_at: YYYY-MM-DD
question: "脱敏后的问法"
question_patterns:
  - "脱敏后的问法"
keywords: []
conclusion: ""
answer: |
  （可先记处理步骤，待确认后再润色）
sources: []
scope: doc_question
corpus: field_practice           # 或 meta_ads_help / meta_developer_docs / whatsapp_help
product: business_platform       # 或 meta_ads / business_app
handoff_note: ""
notes: "等客户确认已解决。提问日期：YYYY-MM-DD。"
```

客户明确说已解决 → `customer_confirmed: yes`，填 `customer_confirmed_at`，脱敏后**移到** `../verified/`。  
客户未确认或仍未解决 → 留在本目录或归档，**禁止当成功案例，禁止上展示页**。

规则见 [`../README.md`](../README.md) §3.3。
