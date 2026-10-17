import { build, Platform, Arch } from 'electron-builder';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { readFile, copyFile, rm } from 'node:fs/promises';
import path from 'node:path';
import { verifyDesktopPackage, packagePaths } from './verify-desktop.mjs';
import { normalizeZipUtf8 } from './zip-utf8.mjs';
import { writeBuildChecksums } from './write-checksums.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const target = process.argv[2];
if (!['mac', 'win', 'win32', 'all'].includes(target)) throw new Error('請選擇 mac、win、win32 或 all。');
if (['mac', 'all'].includes(target) && process.platform !== 'darwin') throw new Error('Mac 應用程式請在 macOS 建置。Windows 可在 Windows 或 Mac 建置。');
const help = spawnSync(process.execPath, [path.join(root, 'scripts/build-help.mjs')], { cwd: root, stdio: 'inherit' });
if (help.status !== 0) process.exit(help.status ?? 1);
const targets = new Map();
// Mac 使用系統 ditto 壓縮，保留中文檔名、權限與 Framework 符號連結。
if (['mac', 'all'].includes(target)) targets.set(Platform.MAC, new Map([[Arch.x64, ['dir']]]));
if (['win', 'all'].includes(target)) targets.set(Platform.WINDOWS, new Map([[Arch.x64, ['zip']]]));
if (target === 'win32') targets.set(Platform.WINDOWS, new Map([[Arch.ia32, ['zip']]]));
await build({ projectDir: root, config: path.join(root, 'electron-builder.cjs'), targets, publish: 'never' });
for (const file of packagePaths(target)) await verifyDesktopPackage(file);
const release = path.join(root, 'release');
const { version } = JSON.parse(await readFile(path.join(root, 'package.json'), 'utf8'));
if (['mac', 'all'].includes(target)) {
  const archive = path.join(release, `SkillTalents-${version}-mac-x64.zip`);
  await rm(archive, { force: true });
  await rm(`${archive}.blockmap`, { force: true });
  const compressed = spawnSync('/usr/bin/ditto', ['-c', '-k', '--sequesterRsrc', '--keepParent', path.join(release, 'mac', '符文之路.app'), archive], { stdio: 'inherit' });
  if (compressed.status !== 0) process.exit(compressed.status ?? 1);
  await normalizeZipUtf8(archive);
}
await copyFile(path.join(root, 'app/help.html'), path.join(release, '操作說明.html'));
await writeBuildChecksums(release, version, target);
console.log('應用程式與 SHA256SUMS.txt 已產生於 release/。');
