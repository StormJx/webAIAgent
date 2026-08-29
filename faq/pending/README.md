# 待补充清单（pending）

本目录存放：

1. **`status: draft`** 的草稿条目（含人工未验收、Agent 自动回填未确认）
2. **「未找到」问题**：文档检索无果，等待补官方来源或改写岗位规则
3. **待重查**：已从 `verified/` 标为 `stale`、尚未完成复验的条目（可选放这里）

## 怎么新增一条「未找到」

复制 [`../_template.yaml`](../_template.yaml)，保存为 `<简短-id>.yaml`，至少填写：

```yaml
id: pending-topic-slug
status: draft
source: manual   # 或 auto
created_at: YYYY-MM-DD
verified_at: YYYY-MM-DD
question: "用户原话"
question_patterns:
  - "用户原话"
keywords: []
conclusion: ""
answer: |
  （可空）待补充。
sources: []
scope: doc_question
handoff_note: ""
notes: "未找到。检索日期：YYYY-MM-DD。试过关键词：…"
```

补齐 `sources` 与 `answer` 并验收后：将 `status` 改为 `verified`，**移动文件到** `../verified/`。

规则详见 [`../README.md`](../README.md)。
