# 账号总览

> **状态：预留模块，待实现。** 以下为接口设计草案，具体参数和流程需通过实际调试确认。

## 概述

从抖音创作者平台获取账号数据总览，包括核心指标概览、近期趋势等。

## 命令

```bash
douyin-creator analytics overview
```

## 预留参数

| 参数 | 必填 | 默认值 | 说明 |
|------|------|--------|------|
| `--period` | 否 | `7d` | 时间周期：`7d`（近7天）/ `30d`（近30天） |
| `--headless` | 否 | false | 无头模式运行 |

## 预期输出

```json
{
  "success": true,
  "category": "overview",
  "account": {
    "username": "OpenClaw中文社区",
    "douyinId": "openclaw_cn",
    "followers": 6764,
    "following": 67,
    "totalLikes": 1559
  },
  "metrics": {
    "播放量": "xxx",
    "主页访问量": "xxx",
    "新增粉丝": "xxx",
    "互动量": "xxx",
    "新增点赞": "xxx",
    "新增评论": "xxx",
    "新增分享": "xxx"
  },
  "period": "7d"
}
```

## 待确认事项

- [ ] 数据总览页面 URL（可能就是 `creator-micro/home` 首页）
- [ ] 核心指标的具体字段（播放量、粉丝增长、互动量等）
- [ ] 数据获取方式（API 拦截 / DOM 提取）
- [ ] 时间周期切换的交互方式
- [ ] 趋势图表数据是否需要提取
