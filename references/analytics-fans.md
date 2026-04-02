# 粉丝分析

> **状态：预留模块，待实现。** 以下为接口设计草案，具体参数和流程需通过实际调试确认。

## 概述

从抖音创作者平台获取粉丝数据分析，包括核心指标、粉丝画像（性别/年龄/地域/活跃时段分布）、粉丝增长趋势等。

## 命令

```bash
douyin-creator analytics fans
```

## 预留参数

| 参数 | 必填 | 默认值 | 说明 |
|------|------|--------|------|
| `--period` | 否 | `7d` | 时间周期：`7d` / `30d` |
| `--headless` | 否 | false | 无头模式运行 |

## 预期输出

```json
{
  "success": true,
  "category": "fans",
  "metrics": {
    "总粉丝数": 6764,
    "新增粉丝": "xxx",
    "取关粉丝": "xxx",
    "净增粉丝": "xxx"
  },
  "distributions": {
    "gender": [
      { "label": "男性", "percent": "xx%" },
      { "label": "女性", "percent": "xx%" }
    ],
    "age": [
      { "label": "18-23", "percent": "xx%" },
      { "label": "24-30", "percent": "xx%" },
      { "label": "31-40", "percent": "xx%" },
      { "label": "41-50", "percent": "xx%" },
      { "label": "50+", "percent": "xx%" }
    ],
    "region": [
      { "label": "广东", "percent": "xx%" },
      { "label": "北京", "percent": "xx%" }
    ],
    "activeTime": [
      { "label": "09:00-12:00", "percent": "xx%" },
      { "label": "18:00-21:00", "percent": "xx%" }
    ]
  },
  "period": "7d"
}
```

## 待确认事项

- [ ] 粉丝分析页面 URL
- [ ] 粉丝画像的具体维度（性别、年龄、地域、兴趣、活跃时段等）
- [ ] 数据获取方式（API 拦截 / DOM 提取 / echarts 图表数据）
- [ ] 粉丝增长趋势数据结构
- [ ] 时间周期切换的交互方式
- [ ] 是否有设备分布数据
