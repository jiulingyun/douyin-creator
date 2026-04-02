#!/usr/bin/env node

import { Command } from 'commander';
import { checkLogin, doLogin, doLogout, listAccounts } from './src/auth.js';
import { publishVideo } from './src/publish-video.js';
import { publishImageText } from './src/publish-image-text.js';
import { publishArticle } from './src/publish-article.js';
import {
  listFollowing, unfollowUser,
  listFans, removeFan, blockUser,
  listComments, replyComment, likeComment, deleteComment, pinComment,
  listDanmaku, deleteDanmaku,
  listMessages, getMessageDetail, sendMessage,
} from './src/interaction.js';
import { getOverview, getWorksAnalytics, getWorkDetail, getFansAnalytics } from './src/analytics.js';
import { getInspiration, getDouyinIndex } from './src/creation.js';
import { checkForUpdates } from './src/update-check.js';

const program = new Command();

program
  .name('douyin-creator')
  .description('抖音创作者平台运营自动化工具')
  .version('0.1.0')
  .option('--account <name>', '指定操作的账号（默认 default）', 'default');

// ═══════════════════════════════════
// auth — 登录与会话管理
// ═══════════════════════════════════
const auth = program.command('auth');

auth
  .command('check')
  .description('检测抖音创作者平台登录状态')
  .option('--headless', '无头模式运行')
  .action(async (opts) => {
    await run(checkLogin, opts);
  });

auth
  .command('login')
  .description('打开浏览器扫码登录抖音创作者平台')
  .action(async (opts) => {
    await run(doLogin, opts);
  });

auth
  .command('logout')
  .description('清除登录缓存（退出登录）')
  .action(async (opts) => {
    await run(doLogout, opts);
  });

auth
  .command('list')
  .description('列出所有已保存的账号')
  .action(async () => {
    await run(listAccounts, {});
  });

// ═══════════════════════════════════
// publish — 内容发布
// ═══════════════════════════════════
const publish = program.command('publish');

publish
  .command('video')
  .description('发布视频')
  .requiredOption('--file <path>', '视频文件路径')
  .requiredOption('--title <title>', '视频标题/描述')
  .option('--topic <topic>', '话题名称（不含 #）')
  .option('--cover <path>', '自定义封面图片路径')
  .option('--location <location>', '添加位置信息')
  .option('--visibility <mode>', '可见性: public / friends / private', 'public')
  .option('--schedule <datetime>', '定时发布时间')
  .option('--draft', '存为草稿')
  .option('--headless', '无头模式运行')
  .action(async (opts) => {
    await run(publishVideo, opts);
  });

publish
  .command('image-text')
  .description('发布图文')
  .requiredOption('--title <title>', '图文标题/描述文案')
  .requiredOption('--images <paths>', '图片文件路径，逗号分隔')
  .option('--topic <topic>', '话题名称（不含 #）')
  .option('--location <location>', '添加位置信息')
  .option('--visibility <mode>', '可见性: public / friends / private', 'public')
  .option('--schedule <datetime>', '定时发布时间')
  .option('--draft', '存为草稿')
  .option('--headless', '无头模式运行')
  .action(async (opts) => {
    await run(publishImageText, opts);
  });

publish
  .command('article')
  .description('发布文章（长文）')
  .requiredOption('--title <title>', '文章标题')
  .option('--content <content>', '文章正文（支持 Markdown）')
  .option('--content-file <path>', '从文件读取正文')
  .option('--format <format>', '正文格式: markdown / text', 'markdown')
  .option('--cover <path>', '封面图片路径')
  .option('--topic <topic>', '话题名称（不含 #）')
  .option('--visibility <mode>', '可见性: public / friends / private', 'public')
  .option('--draft', '存为草稿')
  .option('--headless', '无头模式运行')
  .action(async (opts) => {
    await run(publishArticle, opts);
  });

// ═══════════════════════════════════
// interaction — 互动管理
// ═══════════════════════════════════
const interaction = program.command('interaction');

// ── 关注管理 ──
const follow = interaction.command('follow');

follow
  .command('list')
  .description('查看关注列表')
  .option('--page <n>', '页码', '1')
  .option('--headless', '无头模式运行')
  .action(async (opts) => {
    await run(listFollowing, opts);
  });

follow
  .command('unfollow')
  .description('取消关注')
  .requiredOption('--user-id <id>', '用户 ID 或昵称')
  .option('--headless', '无头模式运行')
  .action(async (opts) => {
    await run(unfollowUser, opts);
  });

// ── 粉丝管理 ──
const fans = interaction.command('fans');

fans
  .command('list')
  .description('查看粉丝列表')
  .option('--page <n>', '页码', '1')
  .option('--headless', '无头模式运行')
  .action(async (opts) => {
    await run(listFans, opts);
  });

fans
  .command('remove')
  .description('移除粉丝')
  .requiredOption('--user-id <id>', '用户 ID 或昵称')
  .option('--headless', '无头模式运行')
  .action(async (opts) => {
    await run(removeFan, opts);
  });

fans
  .command('block')
  .description('拉黑用户')
  .requiredOption('--user-id <id>', '用户 ID 或昵称')
  .option('--headless', '无头模式运行')
  .action(async (opts) => {
    await run(blockUser, opts);
  });

// ── 评论管理 ──
const comment = interaction.command('comment');

comment
  .command('list')
  .description('查看评论列表')
  .option('--work-id <id>', '指定作品 ID')
  .option('--page <n>', '页码', '1')
  .option('--with-replies', '同时获取子评论/回复')
  .option('--headless', '无头模式运行')
  .action(async (opts) => {
    await run(listComments, opts);
  });

comment
  .command('reply')
  .description('回复评论')
  .requiredOption('--comment-id <id>', '评论 ID、内容片段、或序号')
  .requiredOption('--content <content>', '回复内容')
  .option('--headless', '无头模式运行')
  .action(async (opts) => {
    await run(replyComment, opts);
  });

comment
  .command('like')
  .description('点赞评论')
  .requiredOption('--comment-id <id>', '评论 ID、内容片段、或序号')
  .option('--headless', '无头模式运行')
  .action(async (opts) => {
    await run(likeComment, opts);
  });

comment
  .command('delete')
  .description('删除评论')
  .requiredOption('--comment-id <id>', '评论 ID、内容片段、或序号')
  .option('--headless', '无头模式运行')
  .action(async (opts) => {
    await run(deleteComment, opts);
  });

comment
  .command('pin')
  .description('置顶评论')
  .requiredOption('--comment-id <id>', '评论 ID、内容片段、或序号')
  .option('--headless', '无头模式运行')
  .action(async (opts) => {
    await run(pinComment, opts);
  });

// ── 弹幕管理 ──
const danmaku = interaction.command('danmaku');

danmaku
  .command('list')
  .description('查看弹幕列表')
  .option('--work-id <id>', '指定作品 ID')
  .option('--page <n>', '页码', '1')
  .option('--headless', '无头模式运行')
  .action(async (opts) => {
    await run(listDanmaku, opts);
  });

danmaku
  .command('delete')
  .description('删除弹幕')
  .requiredOption('--danmaku-id <id>', '弹幕 ID 或序号')
  .option('--headless', '无头模式运行')
  .action(async (opts) => {
    await run(deleteDanmaku, opts);
  });

// ── 私信管理 ──
const message = interaction.command('message');

message
  .command('list')
  .description('查看私信列表')
  .option('--type <type>', '消息类型: friends / strangers / groups', 'friends')
  .option('--page <n>', '页码', '1')
  .option('--headless', '无头模式运行')
  .action(async (opts) => {
    await run(listMessages, opts);
  });

message
  .command('detail')
  .description('查看对话详情')
  .requiredOption('--conversation-id <id>', '对话 ID 或用户昵称')
  .option('--limit <n>', '获取最近 N 条消息', '20')
  .option('--headless', '无头模式运行')
  .action(async (opts) => {
    await run(getMessageDetail, opts);
  });

message
  .command('send')
  .description('发送私信')
  .requiredOption('--to <id>', '目标用户 ID 或昵称')
  .requiredOption('--content <content>', '消息内容')
  .option('--headless', '无头模式运行')
  .action(async (opts) => {
    await run(sendMessage, opts);
  });

// ═══════════════════════════════════
// analytics — 数据管理
// ═══════════════════════════════════
const analytics = program.command('analytics');

analytics
  .command('overview')
  .description('账号数据总览')
  .option('--period <period>', '时间周期: 7d / 30d', '7d')
  .option('--headless', '无头模式运行')
  .action(async (opts) => {
    await run(getOverview, opts);
  });

analytics
  .command('works')
  .description('作品数据分析')
  .option('--type <type>', '内容类型: all / video / image-text', 'all')
  .option('--period <period>', '时间周期: 7d / 30d', '7d')
  .option('--headless', '无头模式运行')
  .action(async (opts) => {
    await run(getWorksAnalytics, opts);
  });

analytics
  .command('work-detail')
  .description('单个作品详细数据')
  .option('--work-id <id>', '作品 ID')
  .option('--headless', '无头模式运行')
  .action(async (opts) => {
    await run(getWorkDetail, opts);
  });

analytics
  .command('fans')
  .description('粉丝数据分析')
  .option('--period <period>', '时间周期: 7d / 30d', '7d')
  .option('--headless', '无头模式运行')
  .action(async (opts) => {
    await run(getFansAnalytics, opts);
  });

// ═══════════════════════════════════
// creation — 创作中心
// ═══════════════════════════════════
const creation = program.command('creation');

creation
  .command('inspiration')
  .description('获取创作灵感')
  .option('--type <type>', '灵感类型: hot-topic / task / hot-music / template', 'hot-topic')
  .option('--category <category>', '分类筛选')
  .option('--headless', '无头模式运行')
  .action(async (opts) => {
    await run(getInspiration, opts);
  });

creation
  .command('douyin-index')
  .description('查询抖音指数')
  .option('--keyword <keyword>', '查询关键词')
  .option('--type <type>', '查询类型: search / trending', 'search')
  .option('--period <period>', '时间周期: 7d / 30d / 90d', '7d')
  .option('--headless', '无头模式运行')
  .action(async (opts) => {
    await run(getDouyinIndex, opts);
  });

// ═══════════════════════════════════
// runner — 统一执行入口
// ═══════════════════════════════════
async function run(fn, subOpts) {
  const updateCheck = checkForUpdates();
  try {
    const globalOpts = program.opts();
    const opts = { ...subOpts, account: globalOpts.account };
    const result = await fn(opts);
    await updateCheck;
    console.log(JSON.stringify(result, null, 2));
    process.exit(0);
  } catch (err) {
    await updateCheck.catch(() => {});
    console.error(JSON.stringify({ error: err.message, stack: err.stack }, null, 2));
    process.exit(1);
  }
}

program.parse();
