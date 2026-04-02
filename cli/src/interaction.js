import { launchBrowser, closeBrowser, sleep, waitForStable, dismissOverlays, browserFetch } from './browser.js';
import { ensureLoggedIn } from './auth-guard.js';

// ── 关注管理 ──

/**
 * 查看关注列表。
 * 状态：预留，待调试实现。
 */
export async function listFollowing(opts) {
  throw new Error(
    '关注列表功能尚未实现，请等待后续版本更新。\n' +
    '需要确认：关注列表页面 URL、数据获取方式、分页逻辑。'
  );
}

/**
 * 取消关注。
 * 状态：预留，待调试实现。
 */
export async function unfollowUser(opts) {
  throw new Error(
    '取消关注功能尚未实现，请等待后续版本更新。\n' +
    '需要确认：取消关注按钮定位、确认弹窗逻辑。'
  );
}

// ── 粉丝管理 ──

/**
 * 查看粉丝列表。
 * 状态：预留，待调试实现。
 */
export async function listFans(opts) {
  throw new Error(
    '粉丝列表功能尚未实现，请等待后续版本更新。\n' +
    '需要确认：粉丝列表页面 URL、数据获取方式、筛选功能。'
  );
}

/**
 * 移除粉丝。
 * 状态：预留，待调试实现。
 */
export async function removeFan(opts) {
  throw new Error(
    '移除粉丝功能尚未实现，请等待后续版本更新。\n' +
    '需要确认：移除粉丝操作方式、确认弹窗。'
  );
}

/**
 * 拉黑用户。
 * 状态：预留，待调试实现。
 */
export async function blockUser(opts) {
  throw new Error(
    '拉黑用户功能尚未实现，请等待后续版本更新。\n' +
    '需要确认：拉黑操作方式、确认弹窗。'
  );
}

// ── 评论管理 ──

/**
 * 查看评论列表。
 * 状态：预留，待调试实现。
 */
export async function listComments(opts) {
  throw new Error(
    '评论列表功能尚未实现，请等待后续版本更新。\n' +
    '需要确认：评论管理页面 URL、数据获取方式（API 拦截 / DOM 提取）。'
  );
}

/**
 * 回复评论。
 * 状态：预留，待调试实现。
 */
export async function replyComment(opts) {
  throw new Error(
    '回复评论功能尚未实现，请等待后续版本更新。\n' +
    '需要确认：回复输入框定位、提交方式。'
  );
}

/**
 * 点赞评论。
 * 状态：预留，待调试实现。
 */
export async function likeComment(opts) {
  throw new Error(
    '点赞评论功能尚未实现，请等待后续版本更新。\n' +
    '需要确认：点赞按钮 DOM 定位。'
  );
}

/**
 * 删除评论。
 * 状态：预留，待调试实现。
 */
export async function deleteComment(opts) {
  throw new Error(
    '删除评论功能尚未实现，请等待后续版本更新。\n' +
    '需要确认：删除操作方式、确认弹窗。'
  );
}

/**
 * 置顶评论。
 * 状态：预留，待调试实现。
 */
export async function pinComment(opts) {
  throw new Error(
    '置顶评论功能尚未实现，请等待后续版本更新。\n' +
    '需要确认：置顶操作方式。'
  );
}

// ── 弹幕管理 ──

/**
 * 查看弹幕列表。
 * 状态：预留，待调试实现。
 */
export async function listDanmaku(opts) {
  throw new Error(
    '弹幕列表功能尚未实现，请等待后续版本更新。\n' +
    '需要确认：弹幕管理页面 URL、数据获取方式。'
  );
}

/**
 * 删除弹幕。
 * 状态：预留，待调试实现。
 */
export async function deleteDanmaku(opts) {
  throw new Error(
    '删除弹幕功能尚未实现，请等待后续版本更新。\n' +
    '需要确认：弹幕删除操作方式。'
  );
}

// ── 私信管理 ──

/**
 * 查看私信列表。
 * 状态：预留，待调试实现。
 */
export async function listMessages(opts) {
  throw new Error(
    '私信列表功能尚未实现，请等待后续版本更新。\n' +
    '需要确认：私信管理页面 URL、消息分类切换方式。'
  );
}

/**
 * 查看对话详情。
 * 状态：预留，待调试实现。
 */
export async function getMessageDetail(opts) {
  throw new Error(
    '对话详情功能尚未实现，请等待后续版本更新。\n' +
    '需要确认：对话加载方式、翻页逻辑。'
  );
}

/**
 * 发送私信。
 * 状态：预留，待调试实现。
 */
export async function sendMessage(opts) {
  throw new Error(
    '发送私信功能尚未实现，请等待后续版本更新。\n' +
    '需要确认：发送输入框定位、提交方式、是否支持非文本消息。'
  );
}
