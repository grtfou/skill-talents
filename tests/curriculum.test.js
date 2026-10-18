import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, readFileSync, writeFileSync, existsSync, readdirSync, rmSync, copyFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import curriculum from '../app/data/curriculum.js';
import { createEngine } from '../app/js/domain.js';

const root = fileURLToPath(new URL('../', import.meta.url));
const source = JSON.parse(readFileSync(join(root, 'scripts/curriculum_source.json'), 'utf8'));
const fixture = () => ({
  ...structuredClone(source),
  skills: [
    ['a', 'foundation', []], ['b', 'foundation', ['a']], ['c', 'foundation', ['b']],
    ['x', 'grammar', []], ['y', 'grammar', ['x', 'b']],
  ].map(([id, branch, prerequisites]) => ({
    id, branch, lane: 0, title: id, topic: '測試主題', hours: 1,
    description: '測試內容。', checkpoint: '測試檢核。', prerequisites,
  })),
});

function workspace(t) {
  const dir = mkdtempSync(join(tmpdir(), 'skill-curriculum-'));
  t.after(() => rmSync(dir, { recursive: true, force: true }));
  const path = relative => join(dir, relative);
  const read = relative => readFileSync(path(relative), 'utf8');
  function run(data) {
    writeFileSync(path('source.json'), JSON.stringify(data));
    return spawnSync('python3', ['-B', join(root, 'scripts/build_curriculum.py'),
      '--source', path('source.json'), '--output-root', dir], { encoding: 'utf8' });
  }
  function build(data) {
    const result = run(data);
    assert.equal(result.status, 0, result.stderr || result.error?.message);
    const text = read('app/data/curriculum.js');
    return JSON.parse(text.slice(text.indexOf('export default ') + 15).trim().replace(/;$/, ''));
  }
  return { path, read, run, build };
}

test('明確來源重建後，現有課程、168 個圖示與技能目錄逐位元一致', t => {
  const work = workspace(t);
  assert.deepEqual(work.build(source), curriculum);
  for (const relative of ['app/data/curriculum.js', 'docs/技能目錄.md', ...curriculum.skills.map(s => `app/${s.icon}`)]) {
    assert.equal(work.read(relative), readFileSync(join(root, relative), 'utf8'), relative);
  }
});

function ancestors(id, found = new Set()) {
  for (const parent of curriculum.skills.find(skill => skill.id === id).prerequisites) {
    if (found.has(parent)) continue;
    found.add(parent);
    ancestors(parent, found);
  }
  return found;
}

test('成人起點、回想與生活聽說可立即開始，辨音不被整套拼讀鎖住', () => {
  const engine = createEngine(curriculum);
  for (const id of ['e01', 'v31', 'f13']) assert.equal(engine.unlocked({}, id), true, id);
  assert.equal(engine.skills.get('v31').level, 0, '回想工具需顯示在欄位起點');
  for (const id of ['f01', 'f02', 'f05', 'f06', 'f09']) {
    assert.equal(ancestors('l01').has(id), false, id);
  }
  for (const id of ['f13', 'f15', 'f19', 'f23']) assert.ok(ancestors('f24').has(id), id);
});

test('最終整合涵蓋說寫任務，但不強迫修完低頻文法與無關產業詞彙', () => {
  const required = ancestors('e16');
  for (const id of ['g18', 'g26', 'g27', 'g32', 'g36', 'g40', 'l21', 'r14', 'v31', 'v32', 'e04']) {
    assert.ok(required.has(id), id);
  }
  for (const id of ['g17', 'g25', 'g29', 'g34', 'v02', 'v06', 'v24']) {
    assert.equal(required.has(id), false, id);
  }
});

test('自主聽後重述與詞彙遷移不能跳過初階四技基礎', () => {
  const engine = createEngine(curriculum);
  for (const id of ['l06', 'v32']) {
    assert.ok(ancestors(id).has('f24'), id);
    const skill = engine.skills.get(id);
    const points = Object.fromEntries(skill.prerequisites
      .filter(parent => parent !== 'f24')
      .map(parent => [parent, engine.skills.get(parent).hours]));
    assert.equal(engine.unlocked(points, id), false, id);
    assert.equal(engine.unlocked({ ...points, f24: engine.skills.get('f24').hours }, id), true, id);
  }
});

test('插入任意 ID 的技能不會重編其他 ID 或隱含改接先備，且自動產生圖示', t => {
  const work = workspace(t), data = fixture();
  const added = { ...data.skills[0], id: 'new-skill', art: { motif: 'key', palette: 'jade' } };
  data.skills.splice(1, 0, added);
  const built = work.build(data), engine = createEngine(built);
  for (const skill of fixture().skills) {
    assert.deepEqual(engine.skills.get(skill.id).prerequisites, skill.prerequisites);
  }
  assert.equal(engine.summary({}).count, 6);
  assert.equal(engine.unlocked({}, 'new-skill'), true);
  assert.equal(engine.unlocked({}, 'b'), false);
  assert.match(work.read('app/assets/icons/new-skill.svg'), /data-motif="key" data-palette="jade"/);
  assert.match(work.read('app/assets/icons/a.svg'), /<svg/);
  assert.equal('art' in engine.skills.get('new-skill'), false);
});

test('合法 ID 與 Object 原型屬性同名時，仍可正常加退點與驗證', t => {
  const work = workspace(t), data = fixture();
  data.skills = [{ ...data.skills[0], id: 'constructor' }, { ...data.skills[0], id: 'toString' }];
  const engine = createEngine(work.build(data));
  let points = {};
  for (const id of ['constructor', 'toString']) {
    assert.equal(engine.value(points, id), 0);
    const result = engine.change(points, id, 1);
    assert.equal(result.ok, true);
    points = result.points;
  }
  assert.deepEqual(engine.validatePoints(points), { constructor: 1, toString: 1 });
  for (const id of ['constructor', 'toString']) points = engine.change(points, id, -1).points;
  assert.deepEqual(points, {});
});

test('刪除中間節點後明確重連，後續與跨分支規則及舊圖示同步更新', t => {
  const work = workspace(t), data = fixture();
  work.build(data);
  data.skills = data.skills.filter(s => s.id !== 'b');
  for (const skill of data.skills) skill.prerequisites = skill.prerequisites.map(id => id === 'b' ? 'a' : id);
  const engine = createEngine(work.build(data));
  assert.equal(engine.skills.has('b'), false);
  assert.deepEqual(engine.dependents.get('a'), ['c', 'y']);
  assert.equal(engine.unlocked({ a: 1 }, 'c'), true);
  assert.equal(engine.unlocked({ a: 1 }, 'y'), false);
  assert.equal(engine.unlocked({ a: 1, x: 1 }, 'y'), true);
  assert.equal(existsSync(work.path('app/assets/icons/b.svg')), false);
  assert.doesNotMatch(work.read('docs/技能目錄.md'), /### b /);
});

test('同欄可重連到來源後方節點，排版依先備調整並維持加退點規則', t => {
  const work = workspace(t), data = fixture();
  data.skills[0].prerequisites = ['c'];
  data.skills[1].prerequisites = [];
  const built = work.build(data), engine = createEngine(built);
  assert.ok(engine.skills.get('b').level < engine.skills.get('c').level);
  assert.ok(engine.skills.get('c').level < engine.skills.get('a').level);
  assert.equal(engine.change({}, 'a', 1).ok, false);
  let points = {};
  for (const id of ['b', 'c', 'a']) {
    const result = engine.change(points, id, 1);
    assert.equal(result.ok, true);
    points = result.points;
  }
  assert.deepEqual(engine.validatePoints(points), points);
  assert.equal(engine.change(points, 'b', -1).ok, false);
  for (const id of ['a', 'c', 'b']) points = engine.change(points, id, -1).points;
  assert.deepEqual(points, {});
});

test('重新排列來源不會改變 ID、先備或進度認列；多先備與跨分支仍採 AND', t => {
  const work = workspace(t), data = fixture();
  data.skills.reverse();
  const engine = createEngine(work.build(data));
  assert.deepEqual(engine.validatePoints({ a: 1, b: 1, x: 1, y: 1 }), { a: 1, b: 1, x: 1, y: 1 });
  assert.equal(engine.change({ a: 1, b: 1 }, 'y', 1).ok, false);
  assert.equal(engine.change({ a: 1, b: 1, x: 1 }, 'y', 1).ok, true);
  assert.deepEqual(engine.blockers({ y: 1 }, 'x'), ['y']);
});

test('刪光技能可建置空課程，並清理產生器管理的圖示', t => {
  const work = workspace(t), data = fixture();
  work.build(data);
  data.skills = [];
  const engine = createEngine(work.build(data));
  assert.equal(engine.summary({}).count, 0);
  assert.equal(engine.summary({}).total, 0);
  assert.deepEqual(readdirSync(work.path('app/assets/icons')), []);
});

test('技能 ID 只改大小寫後，圖示仍存在且使用正確檔名與內容', t => {
  const work = workspace(t), data = fixture();
  data.skills = [{ ...data.skills[0], id: 'case-skill' }];
  work.build(data);
  data.skills[0].id = 'CASE-SKILL';
  data.skills[0].title = '更新後的技能';
  const built = work.build(data);
  assert.deepEqual(readdirSync(work.path('app/assets/icons')), ['CASE-SKILL.svg']);
  assert.match(work.read(`app/${built.skills[0].icon}`), /<title>更新後的技能/);
  assert.equal(createEngine(built).change({}, 'CASE-SKILL', 1).ok, true);
});

test('刪除 e16 或全部技能後，首頁引用的職業圖示仍完整', t => {
  const work = workspace(t), data = structuredClone(source);
  work.build(data);
  for (const asset of ['app/index.html', 'app/assets/class-emblem.svg']) {
    copyFileSync(join(root, asset), work.path(asset));
  }
  const emblem = work.read('app/assets/class-emblem.svg');
  const references = [...work.read('app/index.html').matchAll(/\b(?:href|src)="(assets\/[^\"]+\.svg)"/g)].map(match => match[1]);
  assert.equal(references.length, 2, 'favicon 與職業卡片都需有圖示');
  for (const skills of [data.skills.filter(skill => skill.id !== 'e16'), []]) {
    work.build({ ...data, skills });
    assert.equal(existsSync(work.path('app/assets/icons/e16.svg')), false);
    for (const asset of references) assert.equal(work.read(`app/${asset}`), emblem);
  }
});

test('遺留引用、重複 ID、非法先備與循環在寫入前拒絕，既有產物保持完整', t => {
  const work = workspace(t), data = fixture();
  const built = work.build(data);
  const files = ['app/data/curriculum.js', 'docs/技能目錄.md', ...built.skills.map(s => `app/${s.icon}`)];
  const before = files.map(work.read);
  const cases = [
    [d => d.skills.splice(1, 1), /找不到先備技能/],
    [d => d.skills.push(d.skills[0]), /識別碼重複/],
    [d => d.skills.push({ ...d.skills[0], id: 'A' }), /圖示檔名重複/],
    [d => { d.skills[0].id = 'NUL'; }, /Windows 保留檔名/],
    [d => { d.skills[0].id = 'cOm1'; }, /Windows 保留檔名/],
    [d => { d.skills[0].prerequisites = ['a']; }, /循環/],
    [d => { d.skills[0].prerequisites = ['y']; }, /循環/],
    [d => { d.skills[1].prerequisites = ['a', 'a']; }, /先備技能重複/],
    [d => { d.skills[0].prerequisites = 'b'; }, /識別碼陣列/],
    [d => { d.skills[0].lane = 9; }, /欄位超出範圍/],
    [d => { d.skills[0].hours = 21; }, /1–20/],
    [d => { d.skills[0].id = '../escape'; }, /識別碼僅允許/],
  ];
  for (const [edit, error] of cases) {
    const changed = structuredClone(data);
    edit(changed);
    const result = work.run(changed);
    assert.notEqual(result.status, 0);
    assert.match(result.stderr, error);
    assert.deepEqual(files.map(work.read), before);
    assert.deepEqual(readdirSync(work.path('app/assets/icons')).sort(), built.skills.map(s => `${s.id}.svg`).sort());
  }
});
