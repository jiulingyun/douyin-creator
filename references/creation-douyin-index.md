# 抖音指数

> **状态：预留模块，待实现。** 以下为接口设计草案，具体参数和流程需通过实际调试确认。

## 概述

通过抖音创作者平台查询抖音指数，了解关键词的搜索热度和趋势变化，辅助创作者选题和内容优化。

## 命令

### 关键词热度查询

```bash
douyin-creator creation douyin-index --keyword "关键词"
```

### 热门搜索榜

```bash
douyin-creator creation douyin-index --type trending
```

## 预留参数

| 参数 | 必填 | 默认值 | 说明 |
|------|------|--------|------|
| `--keyword` | 否* | - | 查询关键词 |
| `--type` | 否* | `search` | 查询类型：`search`（关键词搜索）/ `trending`（热搜榜） |
| `--period` | 否 | `7d` | 时间周期：`7d` / `30d` / `90d` |
| `--headless` | 否 | false | 无头模式运行 |

*`--keyword`（搜索模式）和 `--type trending`（热搜榜模式）二选一。

## 预期输出

### search（关键词搜索）

```json
{
  "success": true,
  "type": "search",
  "keyword": "人工智能",
  "index": {
    "overallIndex": 856432,
    "searchIndex": 234567,
    "videoIndex": 456789,
    "trend": "上升"
  },
  "relatedKeywords": [
    { "keyword": "AI", "index": 654321 },
    { "keyword": "ChatGPT", "index": 543210 }
  ],
  "period": "7d"
}
```

### trending（热搜榜）

```json
{
  "success": true,
  "type": "trending",
  "items": [
    {
      "rank": 1,
      "keyword": "热搜关键词",
      "index": 9876543,
      "trend": "上升",
      "category": "科技"
    }
  ],
  "count": 50
}
```

## 待确认事项

- [ ] 抖音指数的页面 URL 和入口位置
- [ ] 搜索关键词的输入方式和提交逻辑
- [ ] 热度数据的获取方式（API 拦截 / DOM 提取）
- [ ] 抖音指数的具体维度（综合指数、搜索指数、视频指数等）
- [ ] 热搜榜的更新频率和数据结构
- [ ] 趋势图表数据是否需要提取
- [ ] 相关关键词推荐的数据结构
