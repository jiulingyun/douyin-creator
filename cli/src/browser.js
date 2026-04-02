import { chromium } from 'playwright-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import { homedir } from 'os';
import { join } from 'path';
import { mkdirSync } from 'fs';

chromium.use(StealthPlugin());

const BASE_DIR = join(homedir(), '.douyin-creator');
const DEFAULT_ACCOUNT = 'default';

const DEFAULT_VIEWPORT = { width: 1440, height: 900 };

const LAUNCH_ARGS = [
  '--disable-blink-features=AutomationControlled',
  '--no-first-run',
  '--no-default-browser-check',
  '--disable-infobars',
];

export function getAccountDir(account) {
  return join(BASE_DIR, 'accounts', account || DEFAULT_ACCOUNT);
}

export function getBrowserDataDir(account) {
  return join(getAccountDir(account), 'browser-data');
}

export function getScreenshotDir(account) {
  return join(getAccountDir(account), 'screenshots');
}

/**
 * 启动持久化浏览器上下文。
 * 会话数据按账号隔离，保存在 ~/.douyin-creator/accounts/<name>/browser-data/。
 */
export async function launchBrowser(opts = {}) {
  const userDataDir = getBrowserDataDir(opts.account);
  mkdirSync(userDataDir, { recursive: true });

  const headless = Boolean(opts.headless);

  const context = await chromium.launchPersistentContext(userDataDir, {
    headless,
    viewport: DEFAULT_VIEWPORT,
    locale: 'zh-CN',
    timezoneId: 'Asia/Shanghai',
    args: LAUNCH_ARGS,
    ignoreDefaultArgs: ['--enable-automation'],
    permissions: [],
    geolocation: undefined,
  });

  try {
    await context.grantPermissions([], { origin: 'https://creator.douyin.com' });
  } catch {}

  const page = context.pages()[0] || await context.newPage();
  return { context, page };
}

export async function closeBrowser(context) {
  if (context) {
    await context.close();
  }
}

export function sleep(min = 200, max = 800) {
  const ms = Math.floor(Math.random() * (max - min + 1)) + min;
  return new Promise((r) => setTimeout(r, ms));
}

export async function humanType(page, selector, text) {
  await page.click(selector);
  for (const ch of text) {
    await page.keyboard.type(ch, { delay: 50 + Math.random() * 120 });
  }
}

export async function waitForStable(page, timeout = 10000) {
  await page.waitForLoadState('networkidle', { timeout }).catch(() => {});
}

/**
 * 关闭页面上所有弹窗、模态框等遮挡物。
 * 抖音创作者平台常见遮挡：引导弹窗、权限弹窗、活动推广等。
 */
export async function dismissOverlays(page) {
  page.context().on('page', () => {});
  try {
    await page.context().grantPermissions([], { origin: 'https://creator.douyin.com' });
  } catch {}

  for (let round = 0; round < 3; round++) {
    await sleep(500, 800);

    const closed = await page.evaluate(() => {
      let count = 0;

      const closeSelectors = [
        '[class*="modal"] [class*="close"]',
        '[class*="dialog"] [class*="close"]',
        '[class*="popup"] [class*="close"]',
        '[role="dialog"] [class*="close"]',
        '[class*="banner"] [class*="close"]',
        '[class*="toast"] [class*="close"]',
        '[class*="guide"] [class*="close"]',
        '[class*="tip"] [class*="close"]',
        '[class*="semi-modal"] [class*="close"]',
        '[class*="semi-sidesheet"] [class*="close"]',
      ];
      for (const sel of closeSelectors) {
        document.querySelectorAll(sel).forEach(el => {
          try { if (typeof el.click === 'function') el.click(); count++; } catch {}
        });
      }

      const dismissTexts = ['我知道了', '已知悉', '知道了', '关闭', '一律不允许', '不再提示', '稍后再说', '取消', '跳过', '不感兴趣'];
      const allButtons = document.querySelectorAll('button, [role="button"], a, span, div');
      for (const btn of allButtons) {
        const text = btn.textContent?.trim();
        if (text && dismissTexts.some(t => text === t || text.startsWith(t))) {
          try {
            const rect = btn.getBoundingClientRect();
            if (rect.width > 0 && rect.height > 0 && rect.width < 400) {
              btn.click();
              count++;
            }
          } catch {}
        }
      }

      document.querySelectorAll('[class*="modal-mask"], [class*="semi-modal"], [class*="drawer-mask"]').forEach(el => {
        el.style.display = 'none';
        count++;
      });

      return count;
    });

    if (closed === 0) break;
  }

  await page.keyboard.press('Escape').catch(() => {});
  await sleep(300, 500);
}

/**
 * 在浏览器上下文内发起 fetch 请求（自动携带 Cookie/Referer）
 */
export async function browserFetch(page, url, fetchOpts = {}) {
  return page.evaluate(async ({ url, opts }) => {
    const res = await fetch(url, {
      credentials: 'include',
      ...opts,
    });
    const contentType = res.headers.get('content-type') || '';
    if (contentType.includes('json')) {
      return { ok: res.ok, status: res.status, data: await res.json() };
    }
    return { ok: res.ok, status: res.status, data: await res.text() };
  }, { url, opts: fetchOpts });
}
