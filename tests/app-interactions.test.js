import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import curriculum from '../app/data/curriculum.js';
import { createEngine } from '../app/js/domain.js';
import { createStorage, STORAGE_KEY } from '../app/js/storage.js';
import { saveProgress, isProgressStorageEvent } from '../app/js/progress.js';

// Exercise the real app's event routing and persistence with DOM boundary stubs.
function loadApp() {
  const elements = new Map(), handlers = new Map(), storage = new Map(), previews = [];
  let focused = null;
  function element(id) {
    if (!elements.has(id)) elements.set(id, {
      style: {}, dataset: {}, innerHTML: '', textContent: '', hidden: false,
      addEventListener() {}, setAttribute() {}, contains() { return false; },
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
    document, window, curriculum, createEngine, createStorage, STORAGE_KEY,
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
  assert.match(app.element('skill-popover').innerHTML, /雙生字母契約/);
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
