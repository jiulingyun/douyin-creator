import { launchBrowser, closeBrowser, sleep, waitForStable, dismissOverlays, browserFetch } from './browser.js';
import { ensureLoggedIn } from './auth-guard.js';

/**
 * 获取创作灵感。
 * 状态：预留，待调试实现。
 */
export async function getInspiration(opts) {
  throw new Error(
    '创作灵感功能尚未实现，请等待后续版本更新。\n' +
    '需要确认：创作灵感页面 URL、灵感类型、数据获取方式。'
  );
}

/**
 * 查询抖音指数。
 * 状态：预留，待调试实现。
 */
export async function getDouyinIndex(opts) {
  throw new Error(
    '抖音指数功能尚未实现，请等待后续版本更新。\n' +
    '需要确认：抖音指数页面 URL、搜索交互、数据获取方式。'
  );
}
