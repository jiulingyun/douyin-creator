import { launchBrowser, closeBrowser, sleep, waitForStable, dismissOverlays } from './browser.js';
import { ensureLoggedIn } from './auth-guard.js';

/**
 * 发布视频。
 * 状态：预留，待调试实现。
 */
export async function publishVideo(opts) {
  throw new Error(
    '视频发布功能尚未实现，请等待后续版本更新。\n' +
    '需要确认：发布页面 URL、视频上传交互、封面选择逻辑等。'
  );
}
