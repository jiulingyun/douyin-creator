import { launchBrowser, closeBrowser, sleep, waitForStable, dismissOverlays } from './browser.js';
import { ensureLoggedIn } from './auth-guard.js';

/**
 * 发布图文。
 * 状态：预留，待调试实现。
 */
export async function publishImageText(opts) {
  throw new Error(
    '图文发布功能尚未实现，请等待后续版本更新。\n' +
    '需要确认：图文发布页面 URL、多图上传逻辑、描述输入方式等。'
  );
}
