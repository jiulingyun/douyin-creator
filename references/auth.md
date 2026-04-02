# 登录与会话管理

## 概述

抖音创作者平台登录通过浏览器持久化上下文实现，支持多账号管理。每个账号的会话独立保存在 `~/.douyin-creator/accounts/<账号名>/` 下，互不影响。

- 创作者中心首页：`https://creator.douyin.com/`
- 未登录状态下首页直接显示抖音扫码登录二维码
- 登录成功后自动跳转到：`https://creator.douyin.com/creator-micro/home`

## 账号信息结构

登录成功后，创作者中心首页会展示账号信息，HTML 结构如下：

```html
<div class="container-vEyGlK">
  <div class="avatar-XoPjK6">
    <img class="img-PeynF_" src="头像URL">
  </div>
  <div class="content-fFY6HC">
    <div class="header-_F2uzl">
      <div class="name-_lSSDc">昵称</div>
      <div class="unique_id-EuH8eA">抖音号：xxx</div>
      <div class="signature-HLGxt7">个人签名</div>
    </div>
    <div class="statics-kyUhqC">
      <div class="statics-item-MDWoNA" id="guide_home_following">关注 <span class="number-No6ev9">数量</span></div>
      <div class="statics-item-MDWoNA" id="guide_home_fans">粉丝 <span class="number-No6ev9">数量</span></div>
      <div class="statics-item-MDWoNA">获赞 <span class="number-No6ev9">数量</span></div>
    </div>
  </div>
</div>
```

## 多账号

所有命令通过全局 `--account <name>` 参数指定账号，省略时使用 `default`。

```bash
# 操作默认账号
douyin-creator auth check

# 操作指定账号
douyin-creator --account work auth check
douyin-creator --account personal auth login
```

数据目录结构：

```
~/.douyin-creator/accounts/
├── default/
│   ├── browser-data/    # 浏览器会话
│   ├── screenshots/     # 二维码截图
│   └── meta.json        # 账号元信息（昵称、抖音号、头像、粉丝数、上次登录时间）
├── work/
│   ├── browser-data/
│   ├── screenshots/
│   └── meta.json
└── ...
```

## 命令

### 检测登录状态

```bash
douyin-creator [--account <name>] auth check
```

输出示例（已登录）：

```json
{
  "logged_in": true,
  "account": "default",
  "username": "OpenClaw中文社区",
  "douyinId": "openclaw_cn",
  "avatar": "https://p11.douyinpic.com/aweme/100x100/...",
  "followers": 6764,
  "following": 67,
  "likes": 1559,
  "url": "https://creator.douyin.com/creator-micro/home"
}
```

输出示例（未登录）：

```json
{ "logged_in": false, "account": "default", "message": "未登录，请执行 auth login 扫码登录" }
```

### 扫码登录

```bash
douyin-creator [--account <name>] auth login
```

登录流程分两阶段输出：

**阶段一：等待扫码（stdout 输出 JSON）**

```json
{
  "status": "waiting_for_scan",
  "account": "default",
  "message": "请使用抖音 APP 扫描二维码登录",
  "qr_screenshot": "/Users/xxx/.douyin-creator/accounts/default/screenshots/qrcode-xxx.png",
  "attempt": 1,
  "max_attempts": 6
}
```

**收到此输出后，必须立刻将 `qr_screenshot` 路径指向的图片发送/展示给用户，并提示用户打开抖音 APP 扫码登录。** 二维码有效期约 60 秒，过期后自动刷新并输出新截图路径。

**阶段二：登录结果（stdout 输出 JSON）**

```json
{
  "logged_in": true,
  "account": "default",
  "message": "登录成功，会话已保存",
  "username": "OpenClaw中文社区",
  "douyinId": "openclaw_cn",
  "avatar": "https://p11.douyinpic.com/aweme/100x100/...",
  "followers": 6764
}
```

登录成功后会自动保存账号元信息（昵称、抖音号、头像、粉丝数、登录时间）到 `meta.json`。

### 退出登录

```bash
douyin-creator [--account <name>] auth logout
```

清除指定账号的浏览器缓存、截图和元信息。

```json
{
  "success": true,
  "account": "work",
  "message": "已清除账号 [work] 的登录缓存",
  "cleared": ["work"]
}
```

### 列出所有账号

```bash
douyin-creator auth list
```

```json
{
  "accounts": [
    { "account": "default", "has_session": true, "username": "OpenClaw中文社区", "douyinId": "openclaw_cn", "lastLogin": "2026-04-03T..." },
    { "account": "work", "has_session": true, "username": "工作号", "douyinId": "work_xxx", "lastLogin": "2026-04-03T..." }
  ],
  "count": 2
}
```

## Agent 调用规范

1. 执行 `auth login` 后监听 stdout
2. 解析到 `status: "waiting_for_scan"` 的 JSON 行时，**读取 `qr_screenshot` 图片并发送给用户**，附带提示："请使用抖音 APP 扫描二维码登录"
3. 如果收到 `attempt > 1` 的输出，说明二维码已刷新，需再次将新截图发送给用户
4. 解析到 `logged_in: true` 时，登录完成
5. 如果命令以非零退出码结束，说明登录超时（5 分钟内未完成扫码）
6. 操作多账号时，始终在命令中带上 `--account <name>`

## 注意事项

- 任何其他操作前，都应先调用 `auth check` 确认登录状态
- 如果未登录，执行 `auth login` 并将二维码截图展示给用户
- 切换账号：直接用 `--account <新账号名>` 即可，无需先 logout
- 彻底删除某账号：`--account <name> auth logout`
- 不要对同一个账号同时运行多个命令（会争抢浏览器上下文锁文件）
- 不同账号的命令可以并行运行
- 二维码有效期约 60 秒，CLI 会自动刷新，每次刷新都会输出新截图路径
