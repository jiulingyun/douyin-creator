import { sleep } from './browser.js';

const CREATOR_HOME = 'https://creator.douyin.com/';
const DASHBOARD_PATH = '/creator-micro/home';

/**
 * 确保当前页面已登录抖音创作者平台。
 * 等待完整重定向链后再判断。
 */
export async function ensureLoggedIn(page) {
  await page.goto(CREATOR_HOME, { waitUntil: 'domcontentloaded', timeout: 30000 });

  // 等待重定向完成
  try {
    await page.waitForURL((url) => {
      const s = url.toString();
      return s.includes(DASHBOARD_PATH) || s.includes('login') || s.includes('passport');
    }, { timeout: 15000 });
  } catch {}

  // 如果到了 dashboard，等待可能的 JS 跳转回登录页
  if (page.url().includes(DASHBOARD_PATH)) {
    try {
      await page.waitForURL(
        (url) => !url.toString().includes(DASHBOARD_PATH),
        { timeout: 6000 }
      );
    } catch {
      // 没跳转说明确实已登录
      return;
    }
  }

  const url = page.url();
  const isLogin = (
    url === 'https://creator.douyin.com/' ||
    url === 'https://creator.douyin.com' ||
    url.includes('login') ||
    url.includes('passport')
  );

  if (isLogin) {
    throw new Error('未登录抖音创作者平台，请先执行: douyin-creator auth login');
  }
}
