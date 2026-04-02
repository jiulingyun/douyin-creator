# 作品分析

> **状态：预留模块，待实现。** 以下为接口设计草案，具体参数和流程需通过实际调试确认。

## 概述

从抖音创作者平台获取作品数据分析，包括播放量、互动数据、完播率等。支持按内容类型筛选和查看单个作品详情。

## 命令

### 作品数据概览

```bash
douyin-creator analytics works [--type all]
```

### 单个作品详细数据

```bash
douyin-creator analytics works detail [--work-id "作品ID"]
```

## 预留参数

### analytics works

| 参数 | 必填 | 默认值 | 说明 |
|------|------|--------|------|
| `--type` | 否 | `all` | 内容类型：`all`（全部）/ `video`（视频）/ `image-text`（图文） |
| `--period` | 否 | `7d` | 时间周期：`7d` / `30d` |
| `--headless` | 否 | false | 无头模式运行 |

### analytics works detail

| 参数 | 必填 | 默认值 | 说明 |
|------|------|--------|------|
| `--work-id` | 否 | - | 作品 ID；不提供则获取最近一个作品的详情 |
| `--headless` | 否 | false | 无头模式运行 |

## 预期输出

### analytics works

```json
{
  "success": true,
  "category": "works",
  "type": "all",
  "metrics": {
    "总播放量": "xxx",
    "总点赞量": "xxx",
    "总评论量": "xxx",
    "总分享量": "xxx",
    "总收藏量": "xxx"
  },
  "works": [
    {
      "workId": "xxx",
      "title": "作品标题",
      "type": "video",
      "publishTime": "2026-04-01",
      "playCount": 1000,
      "likeCount": 50,
      "commentCount": 10,
      "shareCount": 5
    }
  ],
  "period": "7d"
}
```

### analytics works detail

```json
{
  "success": true,
  "category": "work_detail",
  "workId": "xxx",
  "title": "作品标题",
  "data": {
    "playCount": 5000,
    "likeCount": 200,
    "commentCount": 30,
    "shareCount": 15,
    "collectCount": 25,
    "completionRate": "45.2%",
    "averagePlayDuration": "12.5s"
  }
}
```

## 待确认事项

- [ ] 作品分析页面 URL
- [ ] 可用的指标字段（播放量、完播率、平均播放时长等）
- [ ] 数据获取方式（API 拦截 / DOM 提取）
- [ ] 作品列表的排序和筛选方式
- [ ] 单个作品详情页面的数据结构
- [ ] 内容类型筛选的交互方式
