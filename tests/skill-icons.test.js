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

test('具體物件名稱與圖示相符：火種、火花、水晶、終端、鑰匙與沙漏', () => {
  for (const [id, motif] of Object.entries({
    f03: 'flame', f04: 'key', f08: 'crystal', f15: 'hourglass',
    f17: 'spark', v22: 'terminal', l23: 'crystal', e11: 'hourglass',
  })) assert.equal(attribute(icons.get(id), 'motif'), motif, id);
});
