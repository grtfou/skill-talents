import { listPackage, extractFile } from '@electron/asar';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const required = ['app/index.html', 'app/help.html', 'app/styles.css', 'app/js/app.js', 'app/js/domain.js', 'app/js/storage.js', 'app/js/progress.js', 'app/data/curriculum.js', 'desktop/main.cjs', 'desktop/protocol.cjs'];

export function normalizeAsarPath(entry) { return entry.replaceAll('\\', '/'); }

export async function verifyDesktopPackage(file) {
  const entries = new Set(listPackage(file).map(normalizeAsarPath));
  for (const asset of required) {
    if (!entries.has(`/${asset}`)) throw new Error(`打包缺少必要檔案：${asset}`);
    if (!extractFile(file, asset).equals(await readFile(path.join(root, asset)))) throw new Error(`打包檔案與來源不一致：${asset}`);
  }
  const { default: curriculum } = await import('../app/data/curriculum.js');
  for (const skill of curriculum.skills) if (!entries.has(`/app/${skill.icon}`)) throw new Error(`打包缺少技能圖示：${skill.id}`);
  for (const entry of entries) if (/^\/(?:tests|docs|scripts|node_modules|\.git)(?:\/|$)/.test(entry)) throw new Error(`打包不應包含開發資料：${entry}`);
  const packaged = JSON.parse(extractFile(file, 'package.json').toString('utf8'));
  const source = JSON.parse(await readFile(path.join(root, 'package.json'), 'utf8'));
  if (packaged.version !== source.version || packaged.main !== source.main) throw new Error('打包版本或啟動入口不一致。');
  console.log(`${file}：必要資源、操作說明、168 個圖示與版本檢查通過。`);
}

export function packagePaths(target) {
  const files = [];
  if (['mac', 'all'].includes(target)) files.push(path.join(root, 'release/mac/符文之路.app/Contents/Resources/app.asar'));
  if (['win', 'all'].includes(target)) files.push(path.join(root, 'release/win-unpacked/resources/app.asar'));
  if (target === 'win32') files.push(path.join(root, 'release/win-ia32-unpacked/resources/app.asar'));
  if (!files.length) throw new Error('請選擇 mac、win、win32 或 all。');
  return files;
}

if (process.argv[1] && pathToFileURL(path.resolve(process.argv[1])).href === import.meta.url) {
  for (const file of packagePaths(process.argv[2] || 'all')) await verifyDesktopPackage(file);
}
