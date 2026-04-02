import { launchBrowser, closeBrowser, sleep, waitForStable, dismissOverlays } from './browser.js';
import { ensureLoggedIn } from './auth-guard.js';

/**
 * 发布文章（长文）。
 * 状态：预留，待调试实现。
 */
export async function publishArticle(opts) {
  throw new Error(
    '文章发布功能尚未实现，请等待后续版本更新。\n' +
    '需要确认：抖音是否支持长文发布、编辑器类型、富文本粘贴方式等。'
  );
}
