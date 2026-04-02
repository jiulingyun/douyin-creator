# 弹幕管理

> **状态：预留模块，待实现。** 以下为接口设计草案，具体参数和流程需通过实际调试确认。

## 概述

管理抖音视频作品的弹幕，包括查看弹幕列表、删除弹幕等操作。

## 命令

### 查看弹幕列表

```bash
douyin-creator interaction danmaku list [--work-id "作品ID"]
```

### 删除弹幕

```bash
douyin-creator interaction danmaku delete --danmaku-id "弹幕ID"
```

## 预留参数

### danmaku list

| 参数 | 必填 | 默认值 | 说明 |
|------|------|--------|------|
| `--work-id` | 否 | - | 指定作品 ID |
| `--page` | 否 | `1` | 页码 |
| `--headless` | 否 | false | 无头模式运行 |

### danmaku delete

| 参数 | 必填 | 说明 |
|------|------|------|
| `--danmaku-id` | 是 | 弹幕 ID 或序号 |
| `--headless` | 否 | 无头模式运行 |

## 预期输出

### danmaku list

```json
{
  "success": true,
  "danmakuList": [
    {
      "id": "xxx",
      "author": "用户昵称",
      "content": "弹幕内容",
      "time": "04-03 10:30",
      "videoTime": "00:15",
      "workTitle": "视频标题"
    }
  ],
  "count": 10
}
```

## 待确认事项

- [ ] 弹幕管理页面 URL 和入口位置
- [ ] 弹幕数据的获取方式（API 拦截 / DOM 提取）
- [ ] 弹幕删除的操作方式
- [ ] 抖音创作者平台是否有独立的弹幕管理页面
- [ ] 弹幕是否支持按作品筛选
