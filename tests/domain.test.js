import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import curriculum from '../app/data/curriculum.js';
import { createEngine } from '../app/js/domain.js';
import { createStorage, STORAGE_KEY } from '../app/js/storage.js';

const engine = createEngine(curriculum);
const seed = { f01: 8, f02: 8 };
function memory() {
  const values = new Map();
  return { getItem: key => values.get(key) ?? null, setItem: (key, value) => values.set(key, value) };
}
const clone = value => structuredClone(value);

test('課程有六分支、168 項技能，每項不超過 20 小時且圖示存在', () => {
  assert.equal(curriculum.branches.length, 6);
  assert.equal(curriculum.skills.length, 168);
  assert.equal(engine.summary({}).total, 2758);
  for (const skill of curriculum.skills) {
    assert.ok(skill.hours > 0 && skill.hours <= 20);
    assert.ok(skill.title && skill.topic && skill.description && skill.checkpoint);
    assert.ok(curriculum.branches.some(branch => branch.id === skill.branch));
    for (const id of skill.prerequisites) {
      const parent = engine.skills.get(id);
      if (parent.branch === skill.branch) assert.ok(parent.level < skill.level, '地圖連線需由上往下');
    }
    const path = fileURLToPath(new URL(`../app/${skill.icon}`, import.meta.url));
    assert.ok(existsSync(path), skill.icon);
    assert.match(readFileSync(path, 'utf8'), /<svg/);
  }
});
test('字母與 KK 可各自開始，未解鎖的技能無法投入', () => {
  assert.equal(engine.unlocked({}, 'f01'), true);
  assert.equal(engine.unlocked({}, 'f07'), true);
  assert.equal(engine.change({}, 'f02', 1).ok, false);
  assert.equal(engine.change({}, 'g01', 1).ok, false);
});
test('每次只投入一點，滿點後才解鎖，且不超過上限', () => {
  let points = {};
  for (let i = 1; i <= 8; i++) {
    points = engine.change(points, 'f01', 1).points;
    assert.equal(points.f01, i);
    assert.equal(engine.unlocked(points, 'f02'), i === 8);
  }
  assert.equal(engine.change(points, 'f01', 1).ok, false);
});
test('收回點數不會變負數，也不修改傳入物件', () => {
  assert.equal(engine.change({}, 'f01', -1).ok, false);
  const original = { f01: 1 };
  const result = engine.change(original, 'f01', -1);
  assert.deepEqual(result.points, {});
  assert.deepEqual(original, { f01: 1 });
});
test('已有後續投入時禁止收回先備點數，由後往前退點即可', () => {
  const points = { f01: 8, f02: 1 };
  assert.equal(engine.change(points, 'f01', -1).ok, false);
  assert.deepEqual(engine.blockers(points, 'f01'), ['f02']);
  const refunded = engine.change(points, 'f02', -1).points;
  assert.equal(engine.change(refunded, 'f01', -1).ok, true);
});
test('所有先備需全部滿點，部分完成不會解鎖', () => {
  const id = 'l01';
  const deps = engine.skills.get(id).prerequisites;
  assert.ok(deps.length > 1);
  const points = Object.fromEntries(deps.map(dep => [dep, engine.skills.get(dep).hours]));
  assert.equal(engine.unlocked(points, id), true);
  points[deps[0]]--;
  assert.equal(engine.unlocked(points, id), false);
});
test('無關詞彙主題不互相鎖住', () => {
  assert.deepEqual(engine.skills.get('v01').prerequisites, ['f18']);
  assert.deepEqual(engine.skills.get('v06').prerequisites, ['f18']);
  assert.deepEqual(engine.skills.get('v09').prerequisites, ['f18']);
});
test('全部課程都可由合法操作點滿，再合法退回零', () => {
  let points = {}, passes = 0;
  while (engine.summary(points).completed < curriculum.skills.length) {
    let progress = false;
    for (const skill of curriculum.skills) {
      if (!engine.unlocked(points, skill.id)) continue;
      while (engine.value(points, skill.id) < skill.hours) {
        const result = engine.change(points, skill.id, 1);
        assert.equal(result.ok, true);
        points = result.points;
        progress = true;
      }
    }
    assert.ok(progress, '不可存在無法抵達的技能');
    assert.ok(++passes < 20);
  }
  assert.equal(engine.summary(points).hours, 2758);
  assert.deepEqual(engine.validatePoints(points), points);
  while (Object.keys(points).length) {
    let progress = false;
    for (const skill of [...curriculum.skills].reverse()) {
      if (engine.blockers(points, skill.id).length) continue;
      while (engine.value(points, skill.id) > 0) {
        points = engine.change(points, skill.id, -1).points;
        progress = true;
      }
    }
    assert.ok(progress);
  }
  assert.deepEqual(points, {});
});
test('課程拒絕循環相依、遺失先備、重複識別碼和超時技能', () => {
  const cycle = clone(curriculum);
  cycle.skills[0].prerequisites = ['f02'];
  assert.throws(() => createEngine(cycle), /循環/);
  const missing = clone(curriculum);
  missing.skills[0].prerequisites = ['unknown'];
  assert.throws(() => createEngine(missing), /找不到/);
  const repeated = clone(curriculum);
  repeated.skills.push(repeated.skills[0]);
  assert.throws(() => createEngine(repeated), /重複/);
  const over = clone(curriculum);
  over.skills[0].hours = 21;
  assert.throws(() => createEngine(over), /1–20/);
});
test('無效的操作被拒絕', () => {
  assert.equal(engine.change({}, 'unknown', 1).ok, false);
  assert.equal(engine.change({}, 'f01', 2).ok, false);
});
test('儲存後重新讀取保持原進度，重置也會被保留', () => {
  const store = memory();
  const first = createStorage(engine, curriculum, store);
  first.write(seed);
  const reopened = createStorage(engine, curriculum, store);
  assert.deepEqual(reopened.read().points, seed);
  reopened.write({});
  assert.deepEqual(first.read().points, {});
});
test('JSON 匯出匯入保留所有資料並驗證版本', () => {
  const persistence = createStorage(engine, curriculum, memory());
  const data = persistence.envelope(seed);
  assert.deepEqual(persistence.parse(JSON.stringify(data)), seed);
  assert.throws(() => persistence.parse(JSON.stringify({ ...data, schemaVersion: 2 })), /不相容/);
  assert.throws(() => persistence.parse(JSON.stringify({ ...data, classId: 'Eng-Other' })), /不相容/);
  assert.throws(() => persistence.parse(JSON.stringify({ ...data, curriculumVersion: 'future' })), /課程版本不相容/);
});
test('拒絕未知技能、小數、負數、超過上限及違反先備的匯入', () => {
  const persistence = createStorage(engine, curriculum, memory());
  const valid = persistence.envelope({});
  for (const invalid of [{ other: 1 }, { f01: 1.5 }, { f01: -1 }, { f01: 9 }, { f02: 1 }, { f01: '3' }, [], null]) {
    assert.throws(() => persistence.parse(JSON.stringify({ ...valid, points: invalid })));
  }
});
test('損毀備份與超大檔案被拒絕，原儲存資料保持不變', () => {
  const store = memory();
  const persistence = createStorage(engine, curriculum, store);
  persistence.write(seed);
  const before = store.getItem(STORAGE_KEY);
  assert.throws(() => persistence.parse('{error'));
  assert.throws(() => persistence.parse(' '.repeat(100001)));
  assert.equal(store.getItem(STORAGE_KEY), before);
});
test('損毀的本機資料保留原文，不會自動覆蓋', () => {
  const store = memory();
  store.setItem(STORAGE_KEY, 'broken-json');
  const loaded = createStorage(engine, curriculum, store).read();
  assert.ok(loaded.error);
  assert.equal(loaded.raw, 'broken-json');
  assert.equal(store.getItem(STORAGE_KEY), 'broken-json');
});
test('瀏覽器拒絕存取或儲存時回報錯誤', () => {
  const broken = { getItem() { throw new Error('禁止存取'); }, setItem() { throw new Error('容量不足'); } };
  const persistence = createStorage(engine, curriculum, broken);
  assert.match(persistence.read().error, /禁止存取/);
  assert.throws(() => persistence.write(seed), /容量不足/);
});
