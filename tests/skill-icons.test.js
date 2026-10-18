import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import curriculum from '../app/data/curriculum.js';

const icons = new Map(curriculum.skills.map(skill => [skill.id,
  readFileSync(new URL(`../app/${skill.icon}`, import.meta.url), 'utf8')]));
const attribute = (svg, name) => svg.match(new RegExp(`data-${name}="([^"]+)"`))?.[1];

test('各路線的小技能具備多種物件與配色，不以細小文字區分圖示', () => {
  for (const branch of curriculum.branches) {
    const group = curriculum.skills.filter(skill => skill.branch === branch.id).map(skill => icons.get(skill.id));
    assert.ok(new Set(group.map(svg => attribute(svg, 'motif'))).size >= 10, branch.name);
    assert.ok(new Set(group.map(svg => attribute(svg, 'palette'))).size >= 5, branch.name);
    for (const svg of group) {
      assert.doesNotMatch(svg, /<text[\s>]/);
      assert.match(svg, /<title>.+<\/title>/);
      assert.match(svg, /viewBox="0 0 64 64"/);
    }
  }
});

test('拼讀、動作、母音、資訊與時間等技能保留對應的語意圖樣', () => {
  for (const [id, motif] of Object.entries({
    f03: 'flame', f04: 'key', f08: 'crystal', f15: 'hourglass',
    f17: 'spark', v22: 'terminal', l23: 'crystal', e11: 'hourglass',
  })) assert.equal(attribute(icons.get(id), 'motif'), motif, id);
});

test('所有圖示使用小技能來源指定的圖樣、配色與新版名稱主題', () => {
  const source = JSON.parse(readFileSync(new URL('../scripts/curriculum_source.json', import.meta.url), 'utf8'));
  for (const skill of source.skills) {
    const svg = icons.get(skill.id);
    assert.equal(attribute(svg, 'motif'), skill.art.motif, skill.id);
    assert.equal(attribute(svg, 'palette'), skill.art.palette, skill.id);
    assert.ok(svg.includes(`<title>${skill.title}：${skill.topic}</title>`), skill.id);
  }
  for (const [id, motif] of Object.entries({
    f07: 'ear', l01: 'ear', v31: 'rewind', g18: 'chart', g26: 'table', g27: 'quill',
  })) assert.equal(attribute(icons.get(id), 'motif'), motif, id);
});
