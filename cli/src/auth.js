import { launchBrowser, closeBrowser, sleep, waitForStable, getAccountDir, getScreenshotDir } from './browser.js';
import { homedir } from 'os';
import { join } from 'path';
import { mkdirSync, rmSync, existsSync, readdirSync, readFileSync, writeFileSync } from 'fs';

const CREATOR_HOME = 'https://creator.douyin.com/';
const DASHBOARD_PATH = '/creator-micro/home';
const LOGIN_INDICATORS = ['扫码登录', '扫一扫登录', 'qrcode', 'scan'];

/**
 * 导航到抖音创作者平台首页并等待重定向完成。
 * - 未登录：停留在 creator.douyin.com/ 显示扫码二维码
 * - 已登录：跳转到 creator.douyin.com/creator-micro/home
 *
 * 关键：抖音首页 URL 本身就是登录页（显示二维码），不能用首页 URL 来判断
 * "已到达登录页"，必须等待看是否会重定向到 dashboard。
 */
async function navigateAndSettle(page) {
  await page.goto(CREATOR_HOME, { waitUntil: 'domcontentloaded', timeout: 30000 });

  // 只等 dashboard 跳转；如果超时说明停留在登录页
  try {
    await page.waitForURL(
      (url) => url.toString().includes(DASHBOARD_PATH),
      { timeout: 15000 }
    );
  } catch {}
}

function isOnLoginPage(url) {
  return (
    url === 'https://creator.douyin.com/' ||
    url === 'https://creator.douyin.com' ||
    url.includes('login') ||
    url.includes('passport')
  );
}

function isOnDashboard(url) {
  return url.includes(DASHBOARD_PATH);
}

function accountLabel(opts) {
  return opts.account || 'default';
}

/**
 * 检测指定账号是否已登录。
 */
export async function checkLogin(opts = {}) {
  const { context, page } = await launchBrowser(opts);
  try {
    await navigateAndSettle(page);
    const url = page.url();

    if (isOnDashboard(url)) {
      const userInfo = await extractUserInfo(page);
      return { logged_in: true, account: accountLabel(opts), ...userInfo };
    }

    // 检查页面上是否有已登录的标志
    const hasUserInfo = await page.$('[class*="container-vEyGlK"], [class*="avatar"], [class*="name-"]').catch(() => null);
    if (hasUserInfo && !isOnLoginPage(url)) {
      const userInfo = await extractUserInfo(page);
      return { logged_in: true, account: accountLabel(opts), ...userInfo };
    }

    return { logged_in: false, account: accountLabel(opts), message: '未登录，请执行 auth login 扫码登录' };
  } finally {
    await closeBrowser(context);
  }
}

/**
 * 扫码登录流程。
 */
export async function doLogin(opts = {}) {
  const { context, page } = await launchBrowser({ ...opts, headless: false });
  const screenshotDir = getScreenshotDir(opts.account);
  try {
    await navigateAndSettle(page);
    const url = page.url();

    if (isOnDashboard(url)) {
      const userInfo = await extractUserInfo(page);
      return { logged_in: true, account: accountLabel(opts), message: '已登录，无需重复登录', ...userInfo };
    }

    // 确保在登录页面
    if (!isOnLoginPage(url)) {
      await page.goto(CREATOR_HOME, { waitUntil: 'load', timeout: 30000 });
    }

    const QR_REFRESH_MS = 50000;
    const MAX_ATTEMPTS = 6;
    let loggedIn = false;

    for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
      await waitForStable(page);
      await sleep(1000, 2000);

      const qrScreenshot = await captureQrCode(page, screenshotDir);
      const isRefresh = attempt > 1;
      console.log(JSON.stringify({
        status: 'waiting_for_scan',
        account: accountLabel(opts),
        message: isRefresh
          ? `二维码已刷新（第 ${attempt} 次），请重新扫码`
          : '请使用抖音 APP 扫描二维码登录',
        qr_screenshot: qrScreenshot,
        attempt,
        max_attempts: MAX_ATTEMPTS,
      }));

      if (attempt === 1) {
        console.error(`[${accountLabel(opts)}] 请扫描二维码登录（二维码每 50 秒自动刷新，最长等待 5 分钟）...`);
      } else {
        console.error(`[${accountLabel(opts)}] 二维码已刷新（第 ${attempt}/${MAX_ATTEMPTS} 次），请重新扫码...`);
      }

      try {
        await page.waitForURL(
          (u) => u.toString().includes(DASHBOARD_PATH),
          { timeout: QR_REFRESH_MS }
        );
        loggedIn = true;
        break;
      } catch {
        if (attempt < MAX_ATTEMPTS) {
          await page.reload({ waitUntil: 'load', timeout: 15000 }).catch(() => {});
        }
      }
    }

    if (!loggedIn) {
      throw new Error('登录超时（5 分钟内未完成扫码）');
    }

    await waitForStable(page);
    await sleep(1000, 2000);

    const userInfo = await extractUserInfo(page);
    saveAccountMeta(opts.account, userInfo);

    return {
      logged_in: true,
      account: accountLabel(opts),
      message: '登录成功，会话已保存',
      ...userInfo,
    };
  } finally {
    await closeBrowser(context);
  }
}

/**
 * 清除指定账号的浏览器缓存和会话数据。
 */
export async function doLogout(opts = {}) {
  const accountDir = getAccountDir(opts.account);
  const cleared = [];

  if (existsSync(accountDir)) {
    rmSync(accountDir, { recursive: true, force: true });
    cleared.push(accountLabel(opts));
  }

  return {
    success: true,
    account: accountLabel(opts),
    message: `已清除账号 [${accountLabel(opts)}] 的登录缓存`,
    cleared,
  };
}

/**
 * 列出所有已保存的账号及其状态。
 */
export async function listAccounts() {
  const accountsBase = join(homedir(), '.douyin-creator', 'accounts');
  if (!existsSync(accountsBase)) {
    return { accounts: [], count: 0 };
  }

  const dirs = readdirSync(accountsBase, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name);

  const accounts = dirs.map(name => {
    const metaPath = join(accountsBase, name, 'meta.json');
    let meta = {};
    if (existsSync(metaPath)) {
      try {
        meta = JSON.parse(readFileSync(metaPath, 'utf-8'));
      } catch {}
    }
    const hasBrowserData = existsSync(join(accountsBase, name, 'browser-data'));
    return {
      account: name,
      has_session: hasBrowserData,
      ...meta,
    };
  });

  return { accounts, count: accounts.length };
}

// ── 内部工具函数 ──

function saveAccountMeta(account, userInfo) {
  try {
    const dir = getAccountDir(account);
    mkdirSync(dir, { recursive: true });
    const metaPath = join(dir, 'meta.json');
    const meta = {
      username: userInfo.username || '',
      douyinId: userInfo.douyinId || '',
      avatar: userInfo.avatar || '',
      followers: userInfo.followers || 0,
      following: userInfo.following || 0,
      likes: userInfo.likes || 0,
      lastLogin: new Date().toISOString(),
    };
    writeFileSync(metaPath, JSON.stringify(meta, null, 2));
  } catch {}
}

async function captureQrCode(page, screenshotDir) {
  mkdirSync(screenshotDir, { recursive: true });
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const filePath = join(screenshotDir, `qrcode-${timestamp}.png`);

  try {
    // 抖音登录页二维码区域
    const qrEl = await page.$(
      '[class*="qrcode"], [class*="qr-code"], [class*="scan"], ' +
      '[class*="QRCode"], [class*="qr_code"], [class*="web-login"], ' +
      'canvas[class*="qr"], img[class*="qr"]'
    );

    if (qrEl) {
      await qrEl.screenshot({ path: filePath });
    } else {
      const loginPanel = await page.$(
        '[class*="login-panel"], [class*="login-container"], ' +
        '[class*="login-wrapper"], [class*="content"], main, #app'
      );
      if (loginPanel) {
        await loginPanel.screenshot({ path: filePath });
      } else {
        await page.screenshot({ path: filePath });
      }
    }
  } catch {
    await page.screenshot({ path: filePath });
  }

  return filePath;
}

/**
 * 从创作者中心首页提取账号信息。
 * 基于用户提供的 DOM 结构：
 *   .container-vEyGlK > .avatar-XoPjK6 > .img-PeynF_
 *   .content-fFY6HC > .header-_F2uzl > .name-_lSSDc / .unique_id-EuH8eA / .signature-HLGxt7
 *   .statics-kyUhqC > .statics-item-MDWoNA > .number-No6ev9
 */
async function extractUserInfo(page) {
  await sleep(500, 1000);
  try {
    await page.waitForSelector(
      '[class*="container-"] [class*="name-"], [class*="content-"] [class*="name-"]',
      { timeout: 8000 }
    ).catch(() => {});

    const info = await page.evaluate(() => {
      // 优先使用已知的 class 结构
      const nameEl = document.querySelector('[class*="name-_lSSDc"]')
        || document.querySelector('[class*="content-"] [class*="name-"]')
        || document.querySelector('[class*="header-"] [class*="name-"]');
      const username = nameEl?.textContent?.trim() || '';

      const avatarEl = document.querySelector('[class*="img-PeynF_"]')
        || document.querySelector('[class*="avatar-"] img');
      const avatar = avatarEl?.src || '';

      const idEl = document.querySelector('[class*="unique_id-"]');
      const idText = idEl?.textContent?.trim() || '';
      const douyinId = idText.replace(/^抖音号[：:]\s*/, '');

      const signature = document.querySelector('[class*="signature-"]')?.textContent?.trim() || '';

      // 提取粉丝、关注、获赞数据
      const statsItems = document.querySelectorAll('[class*="statics-item-"]');
      let followers = 0, following = 0, likes = 0;
      for (const item of statsItems) {
        const text = item.textContent || '';
        const numEl = item.querySelector('[class*="number-"]');
        const num = parseInt((numEl?.textContent || '0').replace(/,/g, '')) || 0;
        if (text.includes('粉丝')) followers = num;
        else if (text.includes('关注')) following = num;
        else if (text.includes('获赞')) likes = num;
      }

      return {
        username,
        douyinId,
        avatar,
        signature,
        followers,
        following,
        likes,
        url: window.location.href,
      };
    });
    return info;
  } catch {
    return { username: '', douyinId: '', avatar: '', signature: '', followers: 0, following: 0, likes: 0, url: page.url() };
  }
}
