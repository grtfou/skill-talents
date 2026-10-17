import { readFile, writeFile } from 'node:fs/promises';
import { isUtf8 } from 'node:buffer';

// ditto 的檔名位元組已是 UTF-8，但未必有 ZIP bit 11；補齊標記，不重壓資料。
// 只處理由本專案產生、未加密且小於 ZIP64 門檻的壓縮檔。
export async function normalizeZipUtf8(file) {
  const data = await readFile(file);
  let end = -1;
  for (let i = data.length - 22; i >= Math.max(0, data.length - 65557); i--) {
    if (data.readUInt32LE(i) === 0x06054b50 && i + 22 + data.readUInt16LE(i + 20) === data.length) { end = i; break; }
  }
  if (end < 0) throw new Error('無法找到完整 ZIP 目錄。');
  const count = data.readUInt16LE(end + 10), size = data.readUInt32LE(end + 12);
  let offset = data.readUInt32LE(end + 16);
  if (count === 0xffff || size === 0xffffffff || offset === 0xffffffff) throw new Error('目前不支援 ZIP64，請使用較小的發行包。');
  if (data.readUInt16LE(end + 4) || data.readUInt16LE(end + 6) || offset + size > end) throw new Error('不支援分卷或不完整的 ZIP。');
  const directoryEnd = offset + size;
  let changed = 0;
  for (let entry = 0; entry < count; entry++) {
    if (offset + 46 > directoryEnd || data.readUInt32LE(offset) !== 0x02014b50) throw new Error('ZIP 目錄損毀。');
    const nameLength = data.readUInt16LE(offset + 28), extraLength = data.readUInt16LE(offset + 30), commentLength = data.readUInt16LE(offset + 32);
    const next = offset + 46 + nameLength + extraLength + commentLength;
    if (next > directoryEnd) throw new Error('ZIP 檔名範圍不正確。');
    const name = data.subarray(offset + 46, offset + 46 + nameLength);
    const comment = data.subarray(next - commentLength, next);
    const local = data.readUInt32LE(offset + 42);
    if (!isUtf8(name) || !isUtf8(comment)) throw new Error('ZIP 原始檔名或註解不是 UTF-8，不能直接改標記。');
    if (local + 30 > offset || data.readUInt32LE(local) !== 0x04034b50) throw new Error('ZIP 本機檔案標頭不正確。');
    const localNameLength = data.readUInt16LE(local + 26);
    if (!data.subarray(local + 30, local + 30 + localNameLength).equals(name)) throw new Error('ZIP 本機與目錄檔名不一致。');
    const flags = data.readUInt16LE(offset + 8), localFlags = data.readUInt16LE(local + 6);
    if ((flags | localFlags) & 1) throw new Error('不處理加密 ZIP。');
    if (!(flags & 0x800) || !(localFlags & 0x800)) changed++;
    data.writeUInt16LE(flags | 0x800, offset + 8);
    data.writeUInt16LE(localFlags | 0x800, local + 6);
    offset = next;
  }
  if (offset !== directoryEnd) throw new Error('ZIP 目錄長度不一致。');
  if (changed) await writeFile(file, data);
  return changed;
}
