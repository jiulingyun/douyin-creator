---
name: 抖音创作者运营大师
description: 抖音创作者平台全流程运营自动化。支持多账号管理、登录管理、视频/图文/文章发布、互动管理（关注、粉丝、评论、弹幕、私信）、数据分析（账号总览、作品分析、粉丝分析）、创作中心（创作灵感、抖音指数）。使用浏览器自动化模拟真人操作发布内容，浏览器内 API 获取数据。当用户需要运营抖音号、发布内容、查看数据或管理互动时使用此技能。
version: 0.1.0
icon: 🎵
metadata:
  clawdbot:
    emoji: 🎵
    requires:
      bins:
        - node
---

# 抖音创作者运营技能

完整的抖音创作者平台运营自动化工具，支持多账号管理，覆盖内容发布、互动管理、数据分析、创作中心全流程。

## 首次使用

1. 全局安装 CLI 工具：`npm install -g @openclaw-cn/douyin-creator`
2. 安装完成后会自动下载 Chromium 浏览器，若失败则手动执行：`npx playwright install chromium`
3. 登录：`douyin-creator auth login`（首次需抖音 APP 扫码）

## 多账号

所有命令支持 `--account <name>` 全局参数，省略时使用 `default` 账号。

```bash
# 登录第二个账号
douyin-creator --account work auth login

# 用指定账号发布视频
douyin-creator --account work publish video --title "..."

# 查看所有账号
douyin-creator auth list
```

每个账号的浏览器会话独立隔离，互不影响。

## 执行规则

- 任何操作前先执行 `douyin-creator auth check` 确认登录状态
- 如果未登录，先执行 `douyin-creator auth login`，将输出的二维码截图展示给用户扫码
- 发布类操作使用浏览器自动化（模拟真人），数据类操作使用浏览器内 API
- 所有命令输出 JSON 格式，方便解析

## 模块索引

执行前先读取对应模块文档：

### 登录与会话管理
- 登录、登出、状态检测、多账号管理 -> `references/auth.md`

### 内容发布
- 视频发布 -> `references/publish-video.md`
- 图文发布 -> `references/publish-image-text.md`
- 文章发布 -> `references/publish-article.md`

### 互动管理
- 关注管理 -> `references/interaction-follow.md`
- 粉丝管理 -> `references/interaction-fans.md`
- 评论管理（回复评论等） -> `references/interaction-comment.md`
- 弹幕管理 -> `references/interaction-danmaku.md`
- 私信管理（朋友私信、陌生人私信、群消息） -> `references/interaction-message.md`

### 数据管理
- 账号总览 -> `references/analytics-overview.md`
- 作品分析 -> `references/analytics-works.md`
- 粉丝分析 -> `references/analytics-fans.md`

### 创作中心
- 创作灵感 -> `references/creation-inspiration.md`
- 抖音指数 -> `references/creation-douyin-index.md`

## 命令速查

| 命令 | 说明 |
|------|------|
| `douyin-creator auth check` | 检测登录状态 |
| `douyin-creator auth login` | 扫码登录（输出二维码截图路径，需展示给用户） |
| `douyin-creator auth logout` | 清除指定账号的登录缓存 |
| `douyin-creator auth list` | 列出所有已保存的账号 |
| `douyin-creator publish video --title "..." --file "path"` | 发布视频 |
| `douyin-creator publish image-text --title "..." --images "path1,path2"` | 发布图文 |
| `douyin-creator publish article --title "..." --content "..."` | 发布文章 |
| `douyin-creator interaction follow list` | 查看关注列表 |
| `douyin-creator interaction fans list` | 查看粉丝列表 |
| `douyin-creator interaction comment list` | 查看评论列表 |
| `douyin-creator interaction comment reply --comment-id "..." --content "..."` | 回复评论 |
| `douyin-creator interaction danmaku list` | 查看弹幕列表 |
| `douyin-creator interaction message list` | 查看私信列表 |
| `douyin-creator interaction message send --to "..." --content "..."` | 发送私信 |
| `douyin-creator analytics overview` | 账号数据总览 |
| `douyin-creator analytics works` | 作品数据分析 |
| `douyin-creator analytics fans` | 粉丝数据分析 |
| `douyin-creator creation inspiration` | 创作灵感 |
| `douyin-creator creation douyin-index --keyword "..."` | 抖音指数查询 |

## 通用选项

- `--account <name>`：指定账号（默认 default），加在 `douyin-creator` 后、子命令前
- `--headless`：无头模式运行（默认有头模式）
