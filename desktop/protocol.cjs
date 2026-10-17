const path = require('node:path');

const SCHEME = 'skill-talents';
const APP_URL = `${SCHEME}://app/index.html`;
const HELP_URL = `${SCHEME}://app/help.html`;
const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
};
const CONTENT_SECURITY_POLICY = "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'none'; object-src 'none'; base-uri 'none'; form-action 'none'; frame-src 'none'";

function resolveAsset(urlText, root) {
  const url = new URL(urlText);
  if (url.protocol !== `${SCHEME}:` || url.host !== 'app' || url.username || url.password) throw new Error('不允許的資源來源。');
  const pathname = decodeURIComponent(url.pathname === '/' ? '/index.html' : url.pathname);
  if (pathname.includes('\\') || pathname.includes('\0')) throw new Error('不允許的檔案路徑。');
  const file = path.resolve(root, `.${pathname}`);
  const relative = path.relative(root, file);
  if (relative === '..' || relative.startsWith(`..${path.sep}`) || path.isAbsolute(relative)) throw new Error('不允許離開應用程式目錄。');
  const type = MIME[path.extname(file).toLowerCase()];
  if (!type) throw new Error('不支援的資源類型。');
  return { file, type };
}

function isAppPage(urlText) {
  try {
    const url = new URL(urlText);
    return url.protocol === `${SCHEME}:` && url.host === 'app' && !url.username && !url.password
      && ['/', '/index.html', '/help.html'].includes(url.pathname);
  } catch { return false; }
}

module.exports = { SCHEME, APP_URL, HELP_URL, CONTENT_SECURITY_POLICY, resolveAsset, isAppPage };
