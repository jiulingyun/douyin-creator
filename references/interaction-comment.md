# 评论管理

> **状态：预留模块，待实现。** 以下为接口设计草案，具体参数和流程需通过实际调试确认。

## 概述

管理抖音作品的评论，包括查看评论列表、回复评论、删除评论、点赞评论等操作。查看评论使用浏览器内 API 拦截获取结构化数据，回复和点赞使用浏览器自动化操作。

## 命令

### 查看评论列表

```bash
douyin-creator interaction comment list [--with-replies]
```

### 回复评论

```bash
douyin-creator interaction comment reply --comment-id "评论ID或内容片段" --content "回复内容"
```

### 点赞评论

```bash
douyin-creator interaction comment like --comment-id "评论ID或内容片段"
```

### 删除评论

```bash
douyin-creator interaction comment delete --comment-id "评论ID或内容片段"
```

### 置顶评论

```bash
douyin-creator interaction comment pin --comment-id "评论ID或内容片段"
```

## 预留参数

### comment list

| 参数 | 必填 | 默认值 | 说明 |
|------|------|--------|------|
| `--work-id` | 否 | - | 指定作品 ID 的评论 |
| `--page` | 否 | `1` | 页码 |
| `--with-replies` | 否 | false | 同时获取子评论/回复 |
| `--headless` | 否 | false | 无头模式运行 |

### comment reply

| 参数 | 必填 | 说明 |
|------|------|------|
| `--comment-id` | 是 | 评论 ID、内容片段、或序号 |
| `--content` | 是 | 回复内容 |
| `--headless` | 否 | 无头模式运行 |

### comment like / delete / pin

| 参数 | 必填 | 说明 |
|------|------|------|
| `--comment-id` | 是 | 评论 ID、内容片段、或序号 |
| `--headless` | 否 | 无头模式运行 |

## 评论定位方式

`--comment-id` 支持三种定位方式：

1. **精确 ID**：传入评论的唯一 ID
2. **内容片段**：传入评论内容中的关键字（匹配第一条包含该文本的评论）
3. **序号**：传入数字 `1`~`N`，表示列表中的第 N 条评论

## 预期输出

### comment list

```json
{
  "success": true,
  "comments": [
    {
      "id": "xxx",
      "author": "用户昵称",
      "authorId": "xxx",
      "content": "评论内容",
      "time": "04-03 10:30",
      "likeCount": 5,
      "replyCount": 2,
      "workTitle": "视频标题",
      "replies": []
    }
  ],
  "count": 20
}
```

### comment reply

```json
{
  "success": true,
  "action": "replied",
  "commentId": "xxx",
  "replyContent": "回复内容",
  "message": "回复成功"
}
```

## 待确认事项

- [ ] 评论管理页面 URL 和页面布局结构
- [ ] 评论列表的数据获取方式（API 拦截 / DOM 提取）
- [ ] 回复评论的输入框定位和提交方式
- [ ] 子评论（回复）的加载和提取逻辑
- [ ] 删除和置顶评论的操作方式
- [ ] 点赞评论的 DOM 操作
