import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { normalizeZipUtf8 } from '../scripts/zip-utf8.mjs';

// 一個空內容的 ZIP 項目；名稱位元組為 UTF-8，但起初沒有 bit 11。
function zip(name) {
  const local = Buffer.alloc(30), central = Buffer.alloc(46), end = Buffer.alloc(22);
  local.writeUInt32LE(0x04034b50); local.writeUInt16LE(20, 4); local.writeUInt16LE(name.length, 26);
  central.writeUInt32LE(0x02014b50); central.writeUInt16LE(20, 4); central.writeUInt16LE(20, 6); central.writeUInt16LE(name.length, 28);
  end.writeUInt32LE(0x06054b50); end.writeUInt16LE(1, 8); end.writeUInt16LE(1, 10); end.writeUInt32LE(46 + name.length, 12); end.writeUInt32LE(30 + name.length, 16);
  return Buffer.concat([local, name, central, name, end]);
}
async function fixture(t, data) {
  const folder = await mkdtemp(path.join(tmpdir(), 'skill-talents-zip-'));
  t.after(() => rm(folder, { recursive: true, force: true }));
  const file = path.join(folder, 'app.zip'); await writeFile(file, data); return file;
}

test('中文 ZIP 同時標記本機與中央目錄為 UTF-8，重跑不更動', async t => {
  const name = Buffer.from('符文之路.app/'), original = zip(name), file = await fixture(t, original);
  assert.equal(await normalizeZipUtf8(file), 1);
  const result = await readFile(file);
  assert.equal(result.readUInt16LE(6), 0x800);
  assert.equal(result.readUInt16LE(30 + name.length + 8), 0x800);
  assert.ok(result.subarray(30, 30 + name.length).equals(name));
  assert.equal(result.length, original.length);
  assert.equal(await normalizeZipUtf8(file), 0);
  assert.ok(result.equals(await readFile(file)));
});
test('不把非 UTF-8 檔名靜默改成 UTF-8，也不寫壞原檔', async t => {
  const original = zip(Buffer.from([0xff])), file = await fixture(t, original);
  await assert.rejects(normalizeZipUtf8(file), /不是 UTF-8/);
  assert.ok(original.equals(await readFile(file)));
});
test('截斷的 ZIP 不能產生看似正常的中文壓縮包', async t => {
  const file = await fixture(t, zip(Buffer.from('app/')).subarray(0, 40));
  await assert.rejects(normalizeZipUtf8(file), /完整 ZIP/);
});
