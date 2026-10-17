import { marked } from 'marked';
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

// 操作說明只有一份來源；網頁與桌面版使用同一份兒童版說明。
const root = new URL('../', import.meta.url);
const markdown = await readFile(new URL('docs/操作說明.md', root), 'utf8');
const html = `<!doctype html>
<html lang="zh-Hant"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>符文之路・操作說明</title><style>
*{box-sizing:border-box}body{margin:0;background:#f7f3e9;color:#273326;font:18px/1.95 -apple-system,BlinkMacSystemFont,"PingFang TC","Microsoft JhengHei",sans-serif}main{max-width:850px;margin:auto;padding:44px 30px 70px}h1{font-size:32px;line-height:1.5;color:#304b30;margin:0 0 25px}h2{font-size:25px;line-height:1.6;margin-top:50px;padding-top:20px;border-top:2px solid #d7d8c5;color:#304b30}h3{font-size:21px;margin-top:24px}p,li{margin-top:12px;margin-bottom:12px}strong{color:#64451a;background:#eee1b955;padding:1px 3px}code{font-size:16px;color:#684a22;background:#eae4d5;padding:2px 5px;border-radius:4px;overflow-wrap:anywhere}ol,ul{padding-left:28px}li{padding-left:4px}a{color:#365b3a}::selection{background:#e3c993}footer{margin-top:55px;border-top:1px solid #d7d8c5;padding-top:16px;color:#64705b;font-size:14px}@media(max-width:600px){main{padding:28px 20px}h1{font-size:28px}body{font-size:17px}h2{font-size:23px}}@media print{body{background:white;font-size:13pt}main{max-width:none;padding:0}h2{break-after:avoid}li,p{orphans:3;widows:3}}
</style></head><body><main>${marked.parse(markdown)}<footer>符文之路・這份說明和程式放在一起，沒有網路也能看。</footer></main></body></html>
`;
const output = new URL('app/help.html', root);
await writeFile(output, html);
console.log(`已產生操作說明：${fileURLToPath(output)}`);
