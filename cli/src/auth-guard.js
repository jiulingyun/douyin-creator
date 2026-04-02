const CREATOR_HOME = 'https://creator.douyin.com/';
const DASHBOARD_PATH = '/creator-micro/home';

/**
 * 确保当前页面已登录抖音创作者平台。
 * 导航到首页后等待重定向到 dashboard；超时则判定未登录。
 */
export async function ensureLoggedIn(page) {
  await page.goto(CREATOR_HOME, { waitUntil: 'domcontentloaded', timeout: 30000 });

  try {
    await page.waitForURL(
      (url) => url.toString().includes(DASHBOARD_PATH),
      { timeout: 15000 }
    );
  } catch {}

  if (!page.url().includes(DASHBOARD_PATH)) {
    throw new Error('未登录抖音创作者平台，请先执行: douyin-creator auth login');
  }
}
