# 粉丝管理

> **状态：预留模块，待实现。** 以下为接口设计草案，具体参数和流程需通过实际调试确认。

## 概述

管理抖音创作者账号的粉丝列表，包括查看粉丝列表、移除粉丝、拉黑等操作。

## 命令

### 查看粉丝列表

```bash
douyin-creator interaction fans list [--page 1]
```

### 移除粉丝

```bash
douyin-creator interaction fans remove --user-id "用户ID或昵称"
```

### 拉黑用户

```bash
douyin-creator interaction fans block --user-id "用户ID或昵称"
```

## 预留参数

### fans list

| 参数 | 必填 | 默认值 | 说明 |
|------|------|--------|------|
| `--page` | 否 | `1` | 页码 |
| `--headless` | 否 | false | 无头模式运行 |

### fans remove / fans block

| 参数 | 必填 | 说明 |
|------|------|------|
| `--user-id` | 是 | 用户 ID 或昵称 |
| `--headless` | 否 | 无头模式运行 |

## 预期输出

### fans list

```json
{
  "success": true,
  "fans": [
    {
      "userId": "xxx",
      "username": "粉丝昵称",
      "avatar": "https://...",
      "douyinId": "xxx",
      "isMutual": true,
      "followTime": "2026-03-15"
    }
  ],
  "totalFans": 6764,
  "count": 20,
  "page": 1
}
```

## 待确认事项

- [ ] 粉丝列表的页面 URL 或 API 接口
- [ ] 粉丝列表的数据获取方式（API 拦截 / DOM 提取）
- [ ] 移除粉丝和拉黑的操作方式和确认弹窗
- [ ] 是否支持筛选（互关粉丝、新增粉丝等）
- [ ] 分页加载逻辑
