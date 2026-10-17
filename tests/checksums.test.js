import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { mkdtemp, readFile, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { writeBuildChecksums } from '../scripts/write-checksums.mjs';

async function fixture(t) {
  const directory = await mkdtemp(path.join(tmpdir(), 'skill-talents-checksums-'));
  t.after(() => rm(directory, { recursive: true, force: true }));
  return directory;
}

for (const [target, expected] of Object.entries({
  mac: ['SkillTalents-0.2.0-mac-x64.zip'],
  win: ['SkillTalents-0.2.0-win-x64.zip'],
  win32: ['SkillTalents-0.2.0-win-ia32.zip'],
  all: ['SkillTalents-0.2.0-mac-x64.zip', 'SkillTalents-0.2.0-win-x64.zip'],
})) {
  test(`${target} 校驗清單只含目前版本與指定平台，排除舊版本及其他架構`, async t => {
    const directory = await fixture(t);
    const files = [
      'SkillTalents-0.2.0-mac-x64.zip', 'SkillTalents-0.2.0-win-x64.zip', 'SkillTalents-0.2.0-win-ia32.zip',
      'SkillTalents-0.1.0-mac-x64.zip', 'SkillTalents-0.1.0-win-x64.zip', 'SkillTalents-0.2.0-mac-arm64.zip',
    ];
    for (const name of files) await writeFile(path.join(directory, name), `測試產物：${name}`);
    await writeFile(path.join(directory, 'SHA256SUMS.txt'), '舊清單，不應保留\n');
    await writeBuildChecksums(directory, '0.2.0', target);
    const manifest = await readFile(path.join(directory, 'SHA256SUMS.txt'), 'utf8');
    assert.equal(manifest, expected.map(name => `${createHash('sha256').update(`測試產物：${name}`).digest('hex')}  ${name}\n`).join(''));
    for (const name of files) assert.equal(await readFile(path.join(directory, name), 'utf8'), `測試產物：${name}`, '不刪除或修改其他產物');
  });
}

test('缺少本次必要產物時回報失敗，不產生部分清單或覆寫原清單', async t => {
  const directory = await fixture(t);
  await writeFile(path.join(directory, 'SkillTalents-0.2.0-mac-x64.zip'), '目前 Mac 套件');
  await writeFile(path.join(directory, 'SkillTalents-0.1.0-win-x64.zip'), '舊 Windows 套件不可代替');
  await writeFile(path.join(directory, 'SHA256SUMS.txt'), '原本的完整清單\n');
  await assert.rejects(writeBuildChecksums(directory, '0.2.0', 'all'), { code: 'ENOENT' });
  assert.equal(await readFile(path.join(directory, 'SHA256SUMS.txt'), 'utf8'), '原本的完整清單\n');
});
