#!/usr/bin/env bash
# 将本机 Hermes 运行时配置安全复制到仓库内的 local/hermes/（该目录已被 .gitignore）。
# 用法：在「实际运行 Hermes / 飞书机器人」的那台机器上执行：
#   bash scripts/sync-hermes-local.sh
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DEST="${ROOT}/local/hermes"
SRC="${HERMES_HOME:-${HOME}/.hermes}"

mkdir -p "${DEST}"

if [[ ! -d "${SRC}" ]]; then
  cat > "${DEST}/STATUS.md" <<EOF
# Hermes 本地镜像 — 未找到源目录

- 查找路径: \`${SRC}\`
- 时间: $(date -Iseconds)
- 结论: 当前机器没有 Hermes 配置目录。

飞书机器人配置通常在运行 Hermes 的机器上的 \`~/.hermes/\`（可用环境变量 \`HERMES_HOME\` 覆盖）。
请到那台机器打开本仓库后重新执行：

\`\`\`bash
bash scripts/sync-hermes-local.sh
\`\`\`
EOF
  echo "NOT_FOUND: ${SRC}" >&2
  echo "Wrote ${DEST}/STATUS.md" >&2
  exit 2
fi

# 复制常见文件；保留权限；不跟随无关键符号链接
rsync -a --delete \
  --exclude 'sessions/' \
  --exclude 'cron/' \
  --exclude '*.pyc' \
  --exclude '__pycache__/' \
  "${SRC}/" "${DEST}/source/"

# 再写一份脱敏清单（只列路径与是否存在，不含密钥内容）
{
  echo "# Hermes 镜像清单"
  echo
  echo "- 同步时间: $(date -Iseconds)"
  echo "- 源目录: \`${SRC}\`"
  echo "- 目标: \`local/hermes/source/\`（gitignored）"
  echo
  echo "## 关键文件"
  for f in config.yaml .env auth.json SOUL.md; do
    if [[ -e "${SRC}/${f}" ]]; then
      echo "- [x] ${f}"
    else
      echo "- [ ] ${f}（缺失）"
    fi
  done
  echo
  echo "## 目录"
  for d in memories skills logs sessions cron; do
    if [[ -d "${SRC}/${d}" ]]; then
      count=$(find "${SRC}/${d}" -type f 2>/dev/null | wc -l | tr -d ' ')
      echo "- [x] ${d}/ （${count} 个文件）"
    else
      echo "- [ ] ${d}/"
    fi
  done
  echo
  echo "## 飞书相关环境变量名（仅名称，不输出值）"
  if [[ -f "${SRC}/.env" ]]; then
    rg -N '^(FEISHU_|HERMES_FEISHU_)[A-Z0-9_]+=' "${SRC}/.env" -r '$1' || true
  else
    echo "（无 .env）"
  fi
  echo
  echo "## 最近日志尾部（若有，已存在于 source/logs，此处不重复粘贴密钥）"
  if [[ -f "${SRC}/logs/gateway.log" ]]; then
    echo "- gateway.log 行数: $(wc -l < "${SRC}/logs/gateway.log" | tr -d ' ')"
  fi
  if [[ -f "${SRC}/logs/errors.log" ]]; then
    echo "- errors.log 行数: $(wc -l < "${SRC}/logs/errors.log" | tr -d ' ')"
  fi
} > "${DEST}/INVENTORY.md"

# 运行状态探测
{
  echo "# Hermes 运行状态快照"
  echo
  echo "- 时间: $(date -Iseconds)"
  echo "- 主机: $(hostname 2>/dev/null || echo unknown)"
  echo
  echo "## 进程"
  if command -v pgrep >/dev/null 2>&1; then
    pgrep -af '[Hh]ermes|feishu|gateway' || echo "（未匹配到 hermes/feishu/gateway 进程）"
  else
    ps aux | rg -i 'hermes|feishu|gateway' || echo "（未匹配到进程）"
  fi
  echo
  echo "## hermes CLI"
  if command -v hermes >/dev/null 2>&1; then
    echo "- which: $(command -v hermes)"
    hermes --help 2>&1 | head -20 || true
  else
    echo "- hermes 命令不在 PATH"
  fi
} > "${DEST}/RUNTIME.md"

echo "OK: synced ${SRC} -> ${DEST}/source"
echo "See ${DEST}/INVENTORY.md and ${DEST}/RUNTIME.md"
