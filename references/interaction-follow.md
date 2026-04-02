# 关注管理

> **状态：预留模块，待实现。** 以下为接口设计草案，具体参数和流程需通过实际调试确认。

## 概述

管理抖音创作者账号的关注列表，包括查看关注列表、取消关注等操作。

## 命令

### 查看关注列表

```bash
douyin-creator interaction follow list [--page 1]
```

### 取消关注

```bash
douyin-creator interaction follow unfollow --user-id "用户ID或昵称"
```

## 预留参数

### follow list

| 参数 | 必填 | 默认值 | 说明 |
|------|------|--------|------|
| `--page` | 否 | `1` | 页码 |
| `--headless` | 否 | false | 无头模式运行 |

### follow unfollow

| 参数 | 必填 | 说明 |
|------|------|------|
| `--user-id` | 是 | 用户 ID 或昵称 |
| `--headless` | 否 | 无头模式运行 |

## 预期输出

### follow list

```json
{
  "success": true,
  "following": [
    {
      "userId": "xxx",
      "username": "用户昵称",
      "avatar": "https://...",
      "douyinId": "xxx",
      "signature": "个人签名"
    }
  ],
  "count": 67,
  "page": 1
}
```

## 待确认事项

- [ ] 关注列表的页面 URL 或 API 接口
- [ ] 关注列表的数据获取方式（API 拦截 / DOM 提取）
- [ ] 取消关注的操作方式和确认弹窗
- [ ] 分页加载逻辑（滚动加载 / 分页器）
