import { createHash } from 'node:crypto';
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

export async function writeBuildChecksums(directory, version, target) {
  const suffixes = {
    mac: ['mac-x64'],
    win: ['win-x64'],
    win32: ['win-ia32'],
    all: ['mac-x64', 'win-x64'],
  }[target];
  if (!suffixes) throw new Error('請選擇 mac、win、win32 或 all。');
  // 只為本次版本與平台產生清單；保留目錄中的其他產物，但不替它們背書。
  const archives = suffixes.map(suffix => `SkillTalents-${version}-${suffix}.zip`);
  const checksums = await Promise.all(archives.map(async name => {
    const digest = createHash('sha256').update(await readFile(path.join(directory, name))).digest('hex');
    return `${digest}  ${name}`;
  }));
  // 所有必要產物都可讀取後才覆寫，避免以不完整的新清單取代原清單。
  await writeFile(path.join(directory, 'SHA256SUMS.txt'), checksums.join('\n') + '\n');
}
