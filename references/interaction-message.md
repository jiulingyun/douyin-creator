# 私信管理

> **状态：预留模块，待实现。** 以下为接口设计草案，具体参数和流程需通过实际调试确认。

## 概述

管理抖音创作者的私信消息，包括朋友私信、陌生人私信和群消息三个分类。支持查看消息列表、发送消息、查看对话详情等操作。

## 消息分类

- **朋友私信**：互关好友的私信，无限制
- **陌生人私信**：非互关用户的私信请求
- **群消息**：群聊消息

## 命令

### 查看消息列表

```bash
douyin-creator interaction message list [--type friends]
```

### 查看对话详情

```bash
douyin-creator interaction message detail --conversation-id "对话ID或用户昵称"
```

### 发送私信

```bash
douyin-creator interaction message send --to "用户ID或昵称" --content "消息内容"
```

## 预留参数

### message list

| 参数 | 必填 | 默认值 | 说明 |
|------|------|--------|------|
| `--type` | 否 | `friends` | 消息类型：`friends`（朋友私信）/ `strangers`（陌生人私信）/ `groups`（群消息） |
| `--page` | 否 | `1` | 页码 |
| `--headless` | 否 | false | 无头模式运行 |

### message detail

| 参数 | 必填 | 说明 |
|------|------|------|
| `--conversation-id` | 是 | 对话 ID 或用户昵称 |
| `--limit` | 否 | 获取最近 N 条消息（默认 20） |
| `--headless` | 否 | 无头模式运行 |

### message send

| 参数 | 必填 | 说明 |
|------|------|------|
| `--to` | 是 | 目标用户 ID 或昵称 |
| `--content` | 是 | 消息内容 |
| `--headless` | 否 | 无头模式运行 |

## 预期输出

### message list

```json
{
  "success": true,
  "type": "friends",
  "conversations": [
    {
      "conversationId": "xxx",
      "username": "好友昵称",
      "avatar": "https://...",
      "lastMessage": "最后一条消息内容",
      "lastTime": "04-03 10:30",
      "unreadCount": 2
    }
  ],
  "count": 10
}
```

### message detail

```json
{
  "success": true,
  "conversationId": "xxx",
  "username": "好友昵称",
  "messages": [
    {
      "sender": "我",
      "content": "消息内容",
      "time": "04-03 10:30",
      "type": "text"
    },
    {
      "sender": "好友昵称",
      "content": "回复内容",
      "time": "04-03 10:31",
      "type": "text"
    }
  ],
  "count": 20
}
```

### message send

```json
{
  "success": true,
  "action": "sent",
  "to": "好友昵称",
  "content": "消息内容",
  "message": "发送成功"
}
```

## 待确认事项

- [ ] 私信管理页面 URL 和入口位置
- [ ] 朋友私信、陌生人私信、群消息的切换方式
- [ ] 消息列表的数据获取方式（API 拦截 / DOM 提取）
- [ ] 对话详情的加载和翻页逻辑
- [ ] 发送消息的输入框定位和提交方式
- [ ] 是否支持发送图片、表情等非文本消息
- [ ] 陌生人私信是否需要先接受请求
