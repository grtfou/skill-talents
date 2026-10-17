import test from 'node:test';
import assert from 'node:assert/strict';
import { createPackage } from '@electron/asar';
import { mkdtemp, cp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { verifyDesktopPackage, normalizeAsarPath } from '../scripts/verify-desktop.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
async function fixture(t) {
  const folder = await mkdtemp(path.join(tmpdir(), 'skill-talents-package-'));
  t.after(() => rm(folder, { recursive: true, force: true }));
  const source = path.join(folder, 'source');
  for (const name of ['app', 'desktop', 'package.json']) await cp(path.join(root, name), path.join(source, name), { recursive: true });
  return { folder, source };
}

test('打包驗證可讀取真實 ASAR，確認完整課程、說明與來源一致', async t => {
  assert.equal(normalizeAsarPath('\\app\\help.html'), '/app/help.html');
  assert.equal(normalizeAsarPath('/app/help.html'), '/app/help.html');
  const { folder, source } = await fixture(t);
  const archive = path.join(folder, 'app.asar');
  await createPackage(source, archive);
  await verifyDesktopPackage(archive);
});

test('若說明被打包設定排除，建置驗證會直接失敗', async t => {
  const { folder, source } = await fixture(t);
  await rm(path.join(source, 'app/help.html'));
  const archive = path.join(folder, 'broken.asar');
  await createPackage(source, archive);
  await assert.rejects(verifyDesktopPackage(archive), /缺少必要檔案：app\/help.html/);
});
