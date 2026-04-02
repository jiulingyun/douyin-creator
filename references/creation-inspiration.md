# 创作灵感

> **状态：预留模块，待实现。** 以下为接口设计草案，具体参数和流程需通过实际调试确认。

## 概述

从抖音创作者平台获取创作灵感，包括热门话题、创作任务、热门音乐、热门模板等，帮助创作者获取内容方向。

## 命令

```bash
douyin-creator creation inspiration [--type hot-topic]
```

## 预留参数

| 参数 | 必填 | 默认值 | 说明 |
|------|------|--------|------|
| `--type` | 否 | `hot-topic` | 灵感类型：`hot-topic`（热门话题）/ `task`（创作任务）/ `hot-music`（热门音乐）/ `template`（热门模板） |
| `--category` | 否 | - | 分类筛选（视具体灵感类型而定） |
| `--headless` | 否 | false | 无头模式运行 |

## 预期输出

### hot-topic（热门话题）

```json
{
  "success": true,
  "type": "hot-topic",
  "items": [
    {
      "title": "话题标题",
      "viewCount": "1234万播放",
      "participantCount": "5678人参与",
      "link": "https://..."
    }
  ],
  "count": 20
}
```

### task（创作任务）

```json
{
  "success": true,
  "type": "task",
  "items": [
    {
      "title": "任务标题",
      "description": "任务描述",
      "reward": "奖励信息",
      "deadline": "2026-04-30",
      "link": "https://..."
    }
  ],
  "count": 10
}
```

## 待确认事项

- [ ] 创作灵感页面 URL 和入口位置
- [ ] 可用的灵感类型和分类
- [ ] 数据获取方式（API 拦截 / DOM 提取）
- [ ] 热门话题、创作任务等的具体数据结构
- [ ] 是否有个性化推荐
