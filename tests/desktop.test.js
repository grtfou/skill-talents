import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { readFile } from 'node:fs/promises';
import { EventEmitter } from 'node:events';
import vm from 'node:vm';

const require = createRequire(import.meta.url);
const { APP_URL, HELP_URL, SCHEME, resolveAsset, isAppPage, CONTENT_SECURITY_POLICY } = require('../desktop/protocol.cjs');
const config = require('../electron-builder.cjs');
const root = fileURLToPath(new URL('../app', import.meta.url));

test('桌面資源保留相對網址及版本參數，根目錄對應首頁', () => {
  assert.deepEqual(resolveAsset(APP_URL, root), { file: path.join(root, 'index.html'), type: 'text/html; charset=utf-8' });
  assert.deepEqual(resolveAsset('skill-talents://app/js/app.js?v=0.2.0', root), { file: path.join(root, 'js/app.js'), type: 'text/javascript; charset=utf-8' });
  assert.equal(resolveAsset('skill-talents://app/', root).file, path.join(root, 'index.html'));
  assert.equal(resolveAsset('skill-talents://app/assets/icons/f01.svg', root).type, 'image/svg+xml');
});

test('桌面資源不允許外部來源、帳密、跨目錄、反斜線與不支援的檔案', () => {
  for (const url of [
    'https://app/index.html', 'file:///etc/passwd', 'skill-talents://other/index.html',
    'skill-talents://app:123/index.html', 'skill-talents://user:pass@app/index.html',
    'skill-talents://app/..%2f..%2fsecret.html', 'skill-talents://app/%5c..%5csecret.html',
    'skill-talents://app/file%00.js', 'skill-talents://app/private.txt', 'skill-talents://app/%zz.js',
  ]) assert.throws(() => resolveAsset(url, root), url);
});

test('導覽只允許首頁及操作說明，拒絕任意網頁與執行碼', () => {
  assert.equal(isAppPage(APP_URL), true);
  assert.equal(isAppPage(`${APP_URL}#tree`), true);
  assert.equal(isAppPage(HELP_URL), true);
  for (const url of ['https://example.com', 'javascript:alert(1)', 'file:///tmp/a.html', 'skill-talents://app/js/app.js', 'skill-talents://user@app/help.html']) assert.equal(isAppPage(url), false);
});

test('桌面設定只打包應用資產，內含執行環境且不自動發布', () => {
  assert.equal(config.asar, true);
  assert.equal(config.appId, 'io.skilltalents.desktop');
  assert.equal(config.publish, null);
  assert.deepEqual(config.files, ['app/**/*', 'desktop/**/*', 'package.json']);
  assert.equal(config.mac.minimumSystemVersion, '12.0.0');
  assert.deepEqual(config.mac.target[0].arch, ['x64']);
  assert.equal(config.win.executableName, 'SkillTalents');
  assert.equal(config.win.requestedExecutionLevel, 'asInvoker');
});

test('操作說明可離線讀取，包含開啟、加退點、備份和舊進度搬移', async () => {
  const guide = await readFile(path.join(root, 'help.html'), 'utf8');
  for (const text of ['第一次玩就上手', '解壓縮全部', 'SkillTalents.exe', 'Mac Intel', '3 / 20', '先把小寫字母', '匯入備份', '以前用網頁版', '無法儲存']) assert.ok(guide.includes(text), text);
  assert.match(guide, /無需先備技能/);
  assert.doesNotMatch(guide, /初始字母之印|雙生字母契約/);
  assert.doesNotMatch(guide, /<(?:script|link)\b[^>]*(?:src|href)=["']https?:/i);
  assert.match(CONTENT_SECURITY_POLICY, /script-src 'self'/);
  assert.match(CONTENT_SECURITY_POLICY, /connect-src 'none'/);
});

// 執行真正的桌面入口，用 Electron 介面的替身檢查設定和資源處理，不開啟視窗。
async function loadDesktop({ loadURL = () => Promise.resolve() } = {}) {
  const windows = [], handlers = {}, dialogs = [];
  const app = Object.assign(new EventEmitter(), {
    getPath: key => handlers[key] || path.join('/profile', key),
    setPath: (key, value) => {
      assert.equal(handlers.createdPath, value, '設定儲存路徑前需先建立資料夾');
      handlers[key] = value;
    },
    setName: name => { handlers.name = name; },
    requestSingleInstanceLock: () => true,
    whenReady: () => Promise.resolve(),
    quit: () => { handlers.quit = true; },
  });
  class Window extends EventEmitter {
    constructor(options) {
      super(); this.options = options; this.webContents = new EventEmitter();
      this.webContents.setWindowOpenHandler = handler => { this.openHandler = handler; };
      windows.push(this);
    }
    loadURL(url) { this.url = url; return loadURL(url, this); }
    show() { this.shown = true; }
    focus() { this.focused = true; }
    isDestroyed() { return Boolean(this.destroyed); }
    isMinimized() { return false; }
    close() { this.destroyed = true; this.emit('closed'); }
  }
  const session = { defaultSession: {
    flushStorageData: () => { handlers.flushed = true; },
    setPermissionRequestHandler: handler => { handlers.permission = handler; },
    setPermissionCheckHandler: handler => { handlers.permissionCheck = handler; },
    on: (name, handler) => { handlers[name] = handler; },
  } };
  const electron = {
    app, BrowserWindow: Window, session,
    Menu: { buildFromTemplate: items => items, setApplicationMenu: items => { handlers.menu = items; } },
    dialog: { showErrorBox: (...args) => dialogs.push(args) },
    protocol: {
      registerSchemesAsPrivileged: schemes => { handlers.schemes = schemes; },
      handle: (scheme, handler) => { handlers[scheme] = handler; },
    },
  };
  const source = await readFile(new URL('../desktop/main.cjs', import.meta.url), 'utf8');
  vm.runInNewContext(source, {
    require: id => id === 'electron' ? electron : id === './protocol.cjs' ? require('../desktop/protocol.cjs') : id === 'node:fs' ? { mkdirSync(folder, options) { assert.equal(options.recursive, true); handlers.createdPath = folder; } } : require(id),
    __dirname: fileURLToPath(new URL('../desktop', import.meta.url)), process, Response,
  });
  await new Promise(resolve => setImmediate(resolve));
  return { app, windows, handlers, dialogs };
}

test('桌面入口使用固定存檔位置、隔離視窗、標準來源且拒絕權限請求', async () => {
  const { app, windows, handlers, dialogs } = await loadDesktop();
  assert.deepEqual(dialogs, []);
  assert.equal(handlers.userData, path.join('/profile', 'appData', 'SkillTalents'));
  assert.equal(handlers.sessionData, handlers.userData);
  assert.equal(handlers.schemes[0].privileges.standard, true);
  assert.equal(handlers.schemes[0].privileges.secure, true);
  const main = windows[0];
  assert.equal(main.url, APP_URL);
  assert.equal(main.options.webPreferences.nodeIntegration, false);
  assert.equal(main.options.webPreferences.contextIsolation, true);
  assert.equal(main.options.webPreferences.sandbox, true);
  assert.equal(handlers.permissionCheck(), false);
  let allowed;
  handlers.permission(null, 'camera', value => { allowed = value; });
  assert.equal(allowed, false);
  app.emit('before-quit');
  assert.equal(handlers.flushed, true);
});

test('桌面入口提供首頁、模組和說明，正確拒絕無效要求', async () => {
  const { handlers } = await loadDesktop();
  for (const url of [APP_URL, HELP_URL, `${SCHEME}://app/js/app.js?v=0.2.0`, `${SCHEME}://app/assets/icons/f01.svg`]) {
    const response = await handlers[SCHEME]({ method: 'GET', url });
    assert.equal(response.status, 200, url);
    assert.ok((await response.text()).length > 0);
    assert.equal(response.headers.get('Content-Security-Policy'), CONTENT_SECURITY_POLICY);
  }
  const head = await handlers[SCHEME]({ method: 'HEAD', url: APP_URL });
  assert.equal(head.status, 200); assert.equal(await head.text(), '');
  assert.equal((await handlers[SCHEME]({ method: 'POST', url: APP_URL })).status, 405);
  assert.equal((await handlers[SCHEME]({ method: 'GET', url: 'https://example.com/index.html' })).status, 403);
  assert.equal((await handlers[SCHEME]({ method: 'GET', url: `${SCHEME}://app/missing.html` })).status, 404);
});

test('說明視窗可從程式開啟，其他網址不能開新視窗或導覽', async () => {
  const { windows } = await loadDesktop();
  const main = windows[0];
  assert.equal(main.openHandler({ url: 'https://example.com' }).action, 'deny');
  assert.equal(windows.length, 1);
  assert.equal(main.openHandler({ url: HELP_URL }).action, 'deny');
  assert.equal(windows[1].url, HELP_URL);
  assert.equal(windows[1].options.webPreferences.sandbox, true);
  main.openHandler({ url: HELP_URL });
  assert.equal(windows.length, 2);
  assert.equal(windows[1].focused, true);
  let blocked = false;
  main.webContents.emit('will-navigate', { preventDefault() { blocked = true; } }, 'https://example.com');
  assert.equal(blocked, true);
});

test('首頁載入失敗會提示並結束程式，避免隱藏視窗阻止重新開啟', async () => {
  const { handlers, windows, dialogs } = await loadDesktop({
    loadURL: () => Promise.reject(Object.assign(new Error('ERR_FILE_NOT_FOUND'), { code: 'ERR_FILE_NOT_FOUND' })),
  });
  assert.equal(handlers.quit, true);
  assert.equal(windows[0].shown, undefined);
  assert.equal(dialogs.length, 1);
  assert.equal(dialogs[0][0], '無法開啟符文之路');
});

test('說明載入失敗只關閉說明視窗，主程式仍可使用並重新開啟說明', async () => {
  let failHelp = true;
  const { handlers, windows, dialogs } = await loadDesktop({
    loadURL: url => url === HELP_URL && failHelp ? Promise.reject(new Error('ERR_FILE_NOT_FOUND')) : Promise.resolve(),
  });
  windows[0].openHandler({ url: HELP_URL });
  await new Promise(resolve => setImmediate(resolve));
  assert.equal(windows[1].isDestroyed(), true);
  assert.equal(windows[0].isDestroyed(), false);
  assert.equal(handlers.quit, undefined);
  assert.equal(dialogs.length, 1);
  assert.equal(dialogs[0][0], '無法開啟操作說明');
  failHelp = false;
  windows[0].openHandler({ url: HELP_URL });
  await new Promise(resolve => setImmediate(resolve));
  assert.equal(windows[2].url, HELP_URL);
  assert.equal(windows[2].isDestroyed(), false);
  assert.equal(dialogs.length, 1);
});

test('使用者在載入完成前關閉視窗，不會另跳錯誤或再次顯示已關閉視窗', async () => {
  const { windows, dialogs } = await loadDesktop({
    loadURL: (_url, window) => {
      window.close();
      return Promise.reject(Object.assign(new Error('ERR_ABORTED'), { code: 'ERR_ABORTED', errno: -3 }));
    },
  });
  windows[0].emit('ready-to-show');
  assert.deepEqual(dialogs, []);
  assert.equal(windows[0].shown, undefined);
});
