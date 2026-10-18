import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import curriculum from '../app/data/curriculum.js';
import { createEngine } from '../app/js/domain.js';
import { createStorage, STORAGE_KEY } from '../app/js/storage.js';
import { saveProgress, isProgressStorageEvent } from '../app/js/progress.js';

// Exercise the real app's event routing and persistence with DOM boundary stubs.
function loadApp(data = curriculum) {
  const elements = new Map(), handlers = new Map(), storage = new Map(), previews = [];
  let focused = null;
  function element(id) {
    if (!elements.has(id)) elements.set(id, {
      style: {}, dataset: {}, innerHTML: '', textContent: '', hidden: false,
      listeners: new Map(),
      addEventListener(type, handler) { this.listeners.set(type, handler); },
      showModal() { this.open = true; }, close() { this.open = false; },
      setAttribute() {}, contains() { return false; },
      querySelector() { return { focus() { focused = id; } }; },
    });
    return elements.get(id);
  }
  const document = {
    activeElement: null,
    documentElement: { style: { setProperty() {} } },
    getElementById: element,
    addEventListener(type, handler) { handlers.set(type, handler); },
  };
  const window = {
    location: { protocol: 'http:' },
    addEventListener() {},
    localStorage: {
      getItem: key => storage.get(key) ?? null,
      setItem: (key, value) => storage.set(key, value),
    },
  };
  const source = readFileSync(new URL('../app/js/app.js', import.meta.url), 'utf8').replace(/^import .+;\n/gm, '');
  vm.runInNewContext(source, {
    document, window, curriculum: data, createEngine, createStorage, STORAGE_KEY,
    saveProgress, isProgressStorageEvent, setTimeout: () => 1, clearTimeout() {},
    createSkillPopover({ renderDetails }) {
      return {
        refresh() {}, hide() {},
        show(id, pinned) { previews.push({ id, pinned }); renderDetails(id); },
      };
    },
  });
  return {
    element, storage, previews,
    get focused() { return focused; },
    click(dataset, { icon = false } = {}) {
      const button = { dataset, disabled: false, classList: { contains: name => icon && name === 'node-icon' } };
      handlers.get('click')({ target: { closest: () => button } });
    },
  };
}

test('點未解鎖圖示會固定先備詳情，不投入或儲存點數', () => {
  const app = loadApp();
  app.click({ add: 'f02' }, { icon: true });
  assert.deepEqual(app.previews, [{ id: 'f02', pinned: true }]);
  assert.equal(app.focused, 'skill-popover');
  assert.match(app.element('skill-popover').innerHTML, /小寫字母配對/);
  assert.match(app.element('skill-popover').innerHTML, /先備技能/);
  assert.match(app.element('skill-popover').innerHTML, /data-jump="f01"/);
  assert.equal(app.storage.has(STORAGE_KEY), false);
});

test('點可學習圖示仍只投入一小時，點名稱查看詳情不再加點', () => {
  const app = loadApp();
  app.click({ add: 'f01' }, { icon: true });
  const saved = app.storage.get(STORAGE_KEY);
  assert.deepEqual(JSON.parse(saved).points, { f01: 1 });
  assert.equal(app.previews.length, 0);
  app.click({ select: 'f01' });
  assert.deepEqual(app.previews, [{ id: 'f01', pinned: true }]);
  assert.equal(app.storage.get(STORAGE_KEY), saved);
});

test('刪除原始首節點後，初始選取來自剩餘資料', () => {
  const data = structuredClone(curriculum);
  data.skills = data.skills.filter(skill => skill.id !== 'f01');
  data.skills.find(skill => skill.id === 'f02').prerequisites = [];
  const app = loadApp(data);
  assert.match(app.element('tree-content').innerHTML, /skill-node available selected[^>]+data-node="f02"/);
  app.element('help-button').listeners.get('click')();
  assert.match(app.element('modal-content').innerHTML, /可以從「符文基礎」的「小寫字母配對」開始/);
  assert.doesNotMatch(app.element('modal-content').innerHTML, /大寫字母辨識/);
  app.click({ add: 'f02' }, { icon: true });
  assert.deepEqual(JSON.parse(app.storage.get(STORAGE_KEY)).points, { f02: 1 });
});

test('刪光某分支或全部技能後，導覽、切換與進度條仍可顯示', () => {
  const data = structuredClone(curriculum);
  data.skills = data.skills.filter(skill => skill.branch !== 'foundation');
  for (const skill of data.skills) skill.prerequisites = skill.prerequisites.filter(id => !id.startsWith('f'));
  const app = loadApp(data);
  assert.match(app.element('tree-content').innerHTML, /這條路線尚無技能/);
  app.click({ branch: 'grammar' });
  assert.match(app.element('tree-content').innerHTML, /data-node="g01"/);
  app.click({ branch: 'foundation' });
  assert.match(app.element('tree-content').innerHTML, /這條路線尚無技能/);
  data.skills = [];
  const empty = loadApp(data);
  assert.equal(empty.element('sidebar-progress').style.width, '0%');
  assert.match(empty.element('sidebar-count').textContent, /0 技能/);
});

test('教學推薦無需先備的起點，安全顯示名稱，空課程則不推薦技能', () => {
  const data = structuredClone(curriculum);
  const root = { ...data.skills.find(skill => skill.id === 'f07'), title: '<新起點 & "技能">' };
  data.skills = [{ ...data.skills[1], prerequisites: [root.id] }, root];
  const app = loadApp(data);
  app.element('help-button').listeners.get('click')();
  assert.match(app.element('modal-content').innerHTML, /&lt;新起點 &amp; &quot;技能&quot;&gt;/);
  assert.doesNotMatch(app.element('modal-content').innerHTML, /小寫字母配對/);
  data.skills = [];
  const empty = loadApp(data);
  empty.element('help-button').listeners.get('click')();
  assert.match(empty.element('modal-content').innerHTML, /目前還沒有技能/);
  assert.doesNotMatch(empty.element('modal-content').innerHTML, /可以從「/);
});
