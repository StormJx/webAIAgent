# Hermes 运行时配置（本地镜像说明）

## 结论（当前 Cloud Agent 环境）

本 Cloud Agent 虚拟机里 **没有** Hermes 安装，也没有 `~/.hermes/`。

飞书机器人由 **Hermes Gateway** 在你实际运行 Agent 的那台电脑/服务器上处理消息。  
因此：

- 在这里 **无法** 直接读取 `FEISHU_APP_ID` / WebSocket 状态 / `gateway.log`
- 刚才「已读但晚几分钟才回」应到那台机器的 Hermes 日志里查

官方约定路径（见 [Hermes 配置文档](https://hermes-agent.nousresearch.com/docs/zh-Hans/user-guide/configuration)）：

```text
~/.hermes/
├── config.yaml     # 非机密设置
├── .env            # FEISHU_APP_ID / SECRET 等机密
├── auth.json
├── SOUL.md
├── memories/
├── skills/
├── logs/           # gateway.log、errors.log
└── …
```

飞书相关变量一般在 `~/.hermes/.env`（`FEISHU_APP_ID`、`FEISHU_APP_SECRET`、`FEISHU_CONNECTION_MODE=websocket` 等）。

## 如何同步到本仓库（且绝不上传 GitHub）

1. 在 **运行 Hermes 的那台机器** 打开本仓库  
2. 执行：

```bash
bash scripts/sync-hermes-local.sh
```

3. 配置会出现在 `local/hermes/source/`（已被 `.gitignore` 忽略）  
4. 再用 Cursor / Cloud Agent 打开同一仓库时，即可在 `local/hermes/` 排查，而不会被 `git push` 带走

可用 `HERMES_HOME=/自定义路径 bash scripts/sync-hermes-local.sh` 覆盖源目录。

## 安全

| 路径 | 是否进 Git |
|------|------------|
| `local/hermes/**` | **否**（`.gitignore`） |
| `scripts/sync-hermes-local.sh` | 是（无密钥） |
| 本文档 | 是（无密钥） |

推送前自检：`git status` 不应出现 `local/hermes/` 或任何 `.env`。
