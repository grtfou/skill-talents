import test from 'node:test';
import assert from 'node:assert/strict';
import curriculum from '../app/data/curriculum.js';
import { createEngine } from '../app/js/domain.js';
import { createStorage, STORAGE_KEY } from '../app/js/storage.js';
import { saveProgress, isProgressStorageEvent } from '../app/js/progress.js';

const engine = createEngine(curriculum);
function memory() {
  const values = new Map();
  return {
    getItem: key => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value),
    clear: () => values.clear(),
  };
}

test('成功儲存才回傳成功提示與儲存時間', () => {
  const persistence = createStorage(engine, curriculum, memory());
  const result = saveProgress(persistence, { f01: 1 }, '已記錄學習時數。');
  assert.equal(result.saved, true);
  assert.equal(result.message, '已記錄學習時數。');
  assert.equal(result.error, null);
  assert.ok(Number.isFinite(Date.parse(result.updatedAt)));
  assert.deepEqual(persistence.read().points, { f01: 1 });
});

for (const [operation, next, message] of [
  ['匯入', { f01: 2 }, '已匯入旅程備份。'],
  ['重置', {}, '已重置，新的旅程從這裡開始。'],
  ['滿點', { f01: 8 }, '技能時數已滿！'],
]) {
  test(`${operation}儲存失敗時只回傳失敗提示，保留記憶體進度與原始儲存值`, () => {
    const storage = memory();
    const persistence = createStorage(engine, curriculum, storage);
    persistence.write({ f01: 1 });
    const original = storage.getItem(STORAGE_KEY);
    storage.setItem = () => { throw new Error('容量不足'); };
    const result = saveProgress(persistence, next, message);
    assert.equal(result.saved, false);
    assert.equal(result.error, '容量不足');
    assert.match(result.message, /無法儲存.*匯出/);
    assert.notEqual(result.message, message);
    assert.deepEqual(result.points, next);
    assert.equal(storage.getItem(STORAGE_KEY), original);
  });
}

test('辨識進度變更、移除及 clear 事件，但排除其他儲存空間和無關鍵', () => {
  const local = memory(), session = memory();
  assert.equal(isProgressStorageEvent({ storageArea: local, key: STORAGE_KEY }, local, STORAGE_KEY), true);
  assert.equal(isProgressStorageEvent({ storageArea: local, key: STORAGE_KEY, newValue: null }, local, STORAGE_KEY), true);
  assert.equal(isProgressStorageEvent({ storageArea: local, key: null }, local, STORAGE_KEY), true);
  assert.equal(isProgressStorageEvent({ storageArea: session, key: STORAGE_KEY }, local, STORAGE_KEY), false);
  assert.equal(isProgressStorageEvent({ storageArea: session, key: null }, local, STORAGE_KEY), false);
  assert.equal(isProgressStorageEvent({ storageArea: local, key: 'other-class' }, local, STORAGE_KEY), false);
});

test('另一分頁清除儲存後重新讀取為零，不會恢復舊點數', () => {
  const storage = memory();
  const persistence = createStorage(engine, curriculum, storage);
  persistence.write({ f01: 8, f02: 1 });
  const event = { storageArea: storage, key: null };
  storage.clear();
  assert.equal(isProgressStorageEvent(event, storage, STORAGE_KEY), true);
  assert.deepEqual(persistence.read().points, {});
  const result = engine.change(persistence.read().points, 'f01', 1);
  assert.deepEqual(saveProgress(persistence, result.points).points, { f01: 1 });
  assert.deepEqual(persistence.read().points, { f01: 1 });
});

test('延遲的舊事件到達時，採用儲存空間的最新值', () => {
  const storage = memory();
  const persistence = createStorage(engine, curriculum, storage);
  persistence.write({ f01: 1 });
  const delayedEvent = { storageArea: storage, key: STORAGE_KEY, newValue: storage.getItem(STORAGE_KEY) };
  persistence.write({ f01: 2 });
  assert.equal(isProgressStorageEvent(delayedEvent, storage, STORAGE_KEY), true);
  assert.deepEqual(persistence.parse(delayedEvent.newValue), { f01: 1 });
  assert.deepEqual(persistence.read().points, { f01: 2 });
});
