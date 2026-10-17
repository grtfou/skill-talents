const { app, BrowserWindow, Menu, dialog, protocol, session } = require('electron');
const { readFile } = require('node:fs/promises');
const { mkdirSync } = require('node:fs');
const path = require('node:path');
const { SCHEME, APP_URL, HELP_URL, CONTENT_SECURITY_POLICY, resolveAsset, isAppPage } = require('./protocol.cjs');

// 固定名稱與來源，更新程式或移動 .app／免安裝資料夾都能保留進度。
app.setName('符文之路');
const userDataPath = path.join(app.getPath('appData'), 'SkillTalents');
mkdirSync(userDataPath, { recursive: true });
app.setPath('userData', userDataPath);
app.setPath('sessionData', app.getPath('userData'));
protocol.registerSchemesAsPrivileged([{ scheme: SCHEME, privileges: { standard: true, secure: true, supportFetchAPI: true } }]);

const root = path.join(__dirname, '..', 'app');
let mainWindow;
let helpWindow;
const webPreferences = { nodeIntegration: false, contextIsolation: true, sandbox: true, webSecurity: true };

function guardWindow(window) {
  window.webContents.on('will-navigate', (event, url) => { if (!isAppPage(url)) event.preventDefault(); });
  window.webContents.on('will-redirect', (event, url) => { if (!isAppPage(url)) event.preventDefault(); });
  window.webContents.setWindowOpenHandler(({ url }) => {
    if (url === HELP_URL) openHelp();
    return { action: 'deny' };
  });
  window.webContents.on('will-attach-webview', event => event.preventDefault());
}

function loadPage(window, url, isMain = false) {
  // loadURL 會回傳拒絕的 Promise；載入失敗時不可留下隱藏視窗占用啟動鎖。
  window.loadURL(url).catch(error => {
    if (window.isDestroyed() || error.code === 'ERR_ABORTED' || error.errno === -3) return;
    dialog.showErrorBox(isMain ? '無法開啟符文之路' : '無法開啟操作說明', `請重新開啟程式，或重新解壓縮下載的完整檔案。\n${error.message}`);
    if (isMain) app.quit();
    else window.close();
  });
}

function openHelp() {
  if (helpWindow && !helpWindow.isDestroyed()) { helpWindow.show(); helpWindow.focus(); return; }
  helpWindow = new BrowserWindow({ width: 880, height: 780, minWidth: 600, minHeight: 500, title: '符文之路・操作說明', backgroundColor: '#f7f3e9', webPreferences });
  guardWindow(helpWindow);
  helpWindow.on('closed', () => { helpWindow = null; });
  loadPage(helpWindow, HELP_URL);
}

function createWindow() {
  const window = new BrowserWindow({ width: 1380, height: 940, minWidth: 760, minHeight: 580, show: false, title: '符文之路', backgroundColor: '#101612', webPreferences });
  mainWindow = window;
  guardWindow(window);
  window.once('ready-to-show', () => { if (!window.isDestroyed()) window.show(); });
  window.on('closed', () => {
    mainWindow = null;
    if (helpWindow && !helpWindow.isDestroyed()) helpWindow.close();
  });
  loadPage(window, APP_URL, true);
}

const hasLock = app.requestSingleInstanceLock();
if (!hasLock) app.quit();
else {
  app.on('second-instance', () => {
    if (!mainWindow || mainWindow.isDestroyed()) return;
    if (mainWindow.isMinimized()) mainWindow.restore();
    mainWindow.show();
    mainWindow.focus();
  });
  app.whenReady().then(() => {
    protocol.handle(SCHEME, async request => {
      if (!['GET', 'HEAD'].includes(request.method)) return new Response(null, { status: 405 });
      let asset;
      try { asset = resolveAsset(request.url, root); }
      catch { return new Response('無法讀取這個資源。', { status: 403 }); }
      try {
        const body = await readFile(asset.file);
        return new Response(request.method === 'HEAD' ? null : body, { headers: { 'Content-Type': asset.type, 'Content-Security-Policy': CONTENT_SECURITY_POLICY, 'Cache-Control': 'no-store' } });
      } catch (error) { return new Response('找不到檔案。', { status: error.code === 'ENOENT' ? 404 : 500 }); }
    });
    session.defaultSession.setPermissionRequestHandler((_contents, _permission, callback) => callback(false));
    session.defaultSession.setPermissionCheckHandler(() => false);
    app.on('before-quit', () => session.defaultSession.flushStorageData());
    session.defaultSession.on('will-download', (_event, item) => {
      item.setSaveDialogOptions({ title: '儲存學習備份', defaultPath: path.join(app.getPath('downloads'), path.basename(item.getFilename())) });
    });
    const items = [
      ...(process.platform === 'darwin' ? [{ label: '符文之路', submenu: [{ role: 'about', label: '關於符文之路' }, { type: 'separator' }, { role: 'hide', label: '隱藏符文之路' }, { role: 'unhide', label: '全部顯示' }, { type: 'separator' }, { role: 'quit', label: '結束符文之路' }] }] : []),
      { label: '編輯', submenu: [{ role: 'undo', label: '復原' }, { role: 'redo', label: '重做' }, { type: 'separator' }, { role: 'cut', label: '剪下' }, { role: 'copy', label: '複製' }, { role: 'paste', label: '貼上' }, { role: 'selectAll', label: '全選' }] },
      { label: '檢視', submenu: [{ role: 'resetZoom', label: '恢復原本大小' }, { role: 'zoomIn', label: '放大文字' }, { role: 'zoomOut', label: '縮小文字' }, { type: 'separator' }, { role: 'togglefullscreen', label: '全螢幕' }] },
      { label: '說明', submenu: [{ label: '操作說明：第一次使用', click: openHelp }, { type: 'separator' }, { role: 'close', label: '關閉視窗' }, ...(process.platform === 'darwin' ? [] : [{ role: 'quit', label: '結束程式' }])] },
    ];
    Menu.setApplicationMenu(Menu.buildFromTemplate(items));
    createWindow();
  }).catch(error => { dialog.showErrorBox('符文之路無法啟動', error.message); app.quit(); });
  app.on('window-all-closed', () => app.quit());
}
