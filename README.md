# 抖音创作者运营大师

抖音创作者平台全流程运营自动化 CLI 工具，基于 Playwright 浏览器自动化，支持多账号管理。

> 这是一个 [OpenClaw](https://clawd.org.cn) Agent 技能包，可被 OpenClaw / Claude Code 等 Agent 自动调用。

## 功能模块

| 模块 | 说明 | 状态 |
|------|------|------|
| 登录与会话管理 | 扫码登录、多账号隔离、会话持久化 | ✅ 已实现 |
| 视频发布 | 上传视频、设置封面/话题/位置/定时发布 | 🚧 待实现 |
| 图文发布 | 多图上传、描述文案 | 🚧 待实现 |
| 文章发布 | 长文发布、Markdown 富文本排版 | 🚧 待实现 |
| 关注管理 | 查看关注列表、取消关注 | 🚧 待实现 |
| 粉丝管理 | 查看粉丝列表、移除粉丝、拉黑 | 🚧 待实现 |
| 评论管理 | 查看/回复/点赞/删除/置顶评论 | 🚧 待实现 |
| 弹幕管理 | 查看/删除弹幕 | 🚧 待实现 |
| 私信管理 | 朋友私信、陌生人私信、群消息 | 🚧 待实现 |
| 账号总览 | 核心数据指标概览 | 🚧 待实现 |
| 作品分析 | 播放量、互动数据、完播率 | 🚧 待实现 |
| 粉丝分析 | 粉丝画像（性别/年龄/地域/活跃时段） | 🚧 待实现 |
| 创作灵感 | 热门话题、创作任务 | 🚧 待实现 |
| 抖音指数 | 关键词热度查询、热搜榜 | 🚧 待实现 |

## 安装

```bash
npm install -g @openclaw-cn/douyin-creator
```

安装后会自动下载 Chromium 浏览器，若失败可手动执行：

```bash
npx playwright install chromium
```

## 快速开始

```bash
# 1. 扫码登录
douyin-creator auth login

# 2. 检查登录状态
douyin-creator auth check

# 3. 查看所有账号
douyin-creator auth list
```

## 多账号

所有命令支持 `--account <name>` 全局参数，省略时使用 `default` 账号。

```bash
# 登录第二个账号
douyin-creator --account work auth login

# 用指定账号操作
douyin-creator --account work auth check
```

每个账号的浏览器会话独立隔离，数据保存在 `~/.douyin-creator/accounts/<name>/`。

## 命令速查

### 登录管理

```bash
douyin-creator auth check              # 检测登录状态
douyin-creator auth login              # 扫码登录
douyin-creator auth logout             # 清除登录缓存
douyin-creator auth list               # 列出所有账号
```

### 内容发布

```bash
douyin-creator publish video --file "path" --title "标题"
douyin-creator publish image-text --images "img1,img2" --title "标题"
douyin-creator publish article --title "标题" --content "正文"
```

### 互动管理

```bash
douyin-creator interaction follow list
douyin-creator interaction fans list
douyin-creator interaction comment list [--with-replies]
douyin-creator interaction comment reply --comment-id "ID" --content "内容"
douyin-creator interaction danmaku list
douyin-creator interaction message list [--type friends|strangers|groups]
douyin-creator interaction message send --to "用户" --content "内容"
```

### 数据分析

```bash
douyin-creator analytics overview
douyin-creator analytics works [--type all|video|image-text]
douyin-creator analytics fans
douyin-creator analytics work-detail --work-id "ID"
```

### 创作中心

```bash
douyin-creator creation inspiration [--type hot-topic|task]
douyin-creator creation douyin-index --keyword "关键词"
```

## 通用选项

| 选项 | 说明 |
|------|------|
| `--account <name>` | 指定账号（默认 `default`），加在子命令前 |
| `--headless` | 无头模式运行（默认有头模式） |

## 技术栈

- **Node.js** — 运行环境
- **Commander.js** — CLI 命令解析
- **Playwright + Stealth** — 浏览器自动化（反检测）
- **Marked** — Markdown 渲染（富文本发布）

## 项目结构

```
douyin-creator/
├── SKILL.md                    # 技能入口文件
├── references/                 # 模块详细文档（14 个）
├── cli/
│   ├── package.json
│   ├── index.js                # CLI 主入口
│   └── src/
│       ├── browser.js          # 浏览器工具层
│       ├── auth.js             # 登录与会话管理
│       ├── auth-guard.js       # 登录守卫
│       ├── update-check.js     # 版本更新检查
│       ├── publish-video.js    # 视频发布
│       ├── publish-image-text.js # 图文发布
│       ├── publish-article.js  # 文章发布
│       ├── interaction.js      # 互动管理
│       ├── analytics.js        # 数据分析
│       └── creation.js         # 创作中心
└── README.md
```

## 许可证

MIT
