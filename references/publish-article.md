# 文章发布

> **状态：预留模块，待实现。** 以下为接口设计草案，具体参数和流程需通过实际调试确认。

## 概述

通过浏览器自动化在抖音创作者平台完成图文文章（长文）发布，支持富文本排版。

## 命令

```bash
douyin-creator publish article --title "文章标题" --content "正文内容"
```

## 预留参数

| 参数 | 必填 | 默认值 | 说明 |
|------|------|--------|------|
| `--title` | 是 | - | 文章标题 |
| `--content` | 否* | - | 文章正文（支持 Markdown） |
| `--content-file` | 否* | - | 从文件读取正文 |
| `--format` | 否 | `markdown` | 正文格式：`markdown`（富文本）/ `text`（纯文本） |
| `--cover` | 否 | - | 封面图片路径 |
| `--topic` | 否 | - | 话题名称（不含 `#`） |
| `--visibility` | 否 | `public` | 可见性：`public` / `friends` / `private` |
| `--draft` | 否 | false | 存为草稿 |
| `--headless` | 否 | false | 无头模式运行 |

*`--content` 和 `--content-file` 至少提供一个。

## 预期输出

```json
{
  "success": true,
  "action": "published",
  "title": "文章标题",
  "url": "https://..."
}
```

## 待确认事项

- [ ] 抖音创作者平台是否支持长文/文章发布功能
- [ ] 文章发布页面 URL 和编辑器类型
- [ ] 富文本编辑器的操作方式（粘贴 HTML 还是其他方式）
- [ ] 封面图的设置逻辑
- [ ] 文章标题字数限制
- [ ] 发布成功后的确认方式
