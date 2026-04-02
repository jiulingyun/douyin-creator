# 图文发布

> **状态：预留模块，待实现。** 以下为接口设计草案，具体参数和流程需通过实际调试确认。

## 概述

通过浏览器自动化在抖音创作者平台完成图文内容发布（多图 + 文字描述），模拟真人操作。

## 命令

```bash
douyin-creator publish image-text --title "图文标题" --images "/path/to/img1.jpg,/path/to/img2.jpg"
```

## 预留参数

| 参数 | 必填 | 默认值 | 说明 |
|------|------|--------|------|
| `--images` | 是 | - | 图片文件路径，逗号分隔（支持 JPEG、PNG、WebP） |
| `--title` | 是 | - | 图文标题/描述文案 |
| `--topic` | 否 | - | 话题名称（不含 `#`） |
| `--location` | 否 | - | 添加位置信息 |
| `--visibility` | 否 | `public` | 可见性：`public` / `friends` / `private` |
| `--schedule` | 否 | - | 定时发布时间 |
| `--draft` | 否 | false | 存为草稿 |
| `--headless` | 否 | false | 无头模式运行 |

## 预期输出

```json
{
  "success": true,
  "action": "published",
  "title": "图文标题",
  "imageCount": 3,
  "url": "https://..."
}
```

## 待确认事项

- [ ] 图文发布页面 URL 和入口位置
- [ ] 图片上传的 input 元素定位和多图上传逻辑
- [ ] 图片排序和编辑功能
- [ ] 图文标题/描述的输入框定位
- [ ] 话题和位置的选择逻辑
- [ ] 发布成功后的确认方式
