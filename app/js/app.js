import curriculum from '../data/curriculum.js?v=2026.10.1';
import { createEngine } from './domain.js';
import { createStorage, STORAGE_KEY } from './storage.js';
import { saveProgress, isProgressStorageEvent } from './progress.js';
import { createSkillPopover } from './skill-popover.js';

const $ = id => document.getElementById(id);
const desktopMode = window.location.protocol === 'skill-talents:';
const escapeHTML = text => String(text).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
const engine = createEngine(curriculum);
const persistence = createStorage(engine, curriculum, {
  getItem: key => window.localStorage.getItem(key),
  setItem: (key, value) => window.localStorage.setItem(key, value),
});
const initial = persistence.read();
let points = initial.points;
let branchId = 'foundation';
let selectedId = 'f01';
let query = '';
let listView = false;
let protectedSave = !!initial.raw && !!initial.error;
let recoveryRaw = initial.raw;
let storageError = initial.error;
let toastTimer;
let lastSaved = '';
const roman = ['I', 'II', 'III', 'IV', 'V', 'VI'];
const number = value => value.toLocaleString('zh-TW');
const branchFor = id => curriculum.branches.find(branch => branch.id === id);
const pointText = skill => `${engine.value(points, skill.id)} / ${skill.hours}`;
const status = skill => engine.value(points, skill.id) === skill.hours ? 'complete' : !engine.unlocked(points, skill.id) ? 'locked' : engine.value(points, skill.id) > 0 ? 'in-progress' : 'available';
const statusLabel = state => ({ complete: '已完成時數', locked: '尚未解鎖', 'in-progress': '學習中', available: '可以開始學習' })[state];

function toast(message) {
  $('toast').textContent = message;
  $('toast').hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { $('toast').hidden = true; }, 4200);
}

function showModal(html) {
  popover.hide();
  if ($('modal').open) $('modal').close();
  $('modal-content').innerHTML = html;
  $('modal').showModal();
}

function download(text, name) {
  const url = URL.createObjectURL(new Blob([text], { type: 'application/json;charset=utf-8' }));
  const link = document.createElement('a');
  link.href = url;
  link.download = name;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 10000);
}

function renderWarning() {
  const warning = $('storage-warning');
  warning.hidden = !storageError;
  if (!storageError) return;
  warning.textContent = protectedSave
    ? `原有進度無法讀取，已保留原始資料並暫停加退點。${storageError} 請先下載原始資料，再匯入有效備份或使用重置。`
    : `無法自動儲存：${storageError}。本次變更暫存在記憶體，關閉前請匯出旅程備份。`;
  const button = document.createElement('button');
  button.textContent = recoveryRaw ? '下載原始資料' : '匯出目前進度';
  button.addEventListener('click', () => recoveryRaw
    ? download(recoveryRaw, 'skill-talents-recovery.json')
    : exportProgress());
  warning.append(button);
}

function commit(next, message) {
  const result = saveProgress(persistence, next, message);
  points = result.points;
  if (result.saved) {
    protectedSave = false;
    storageError = null;
    recoveryRaw = null;
    lastSaved = new Date(result.updatedAt).toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit' });
  } else {
    storageError = result.error;
  }
  render();
  if (result.message) toast(result.message);
}

function allocate(id, delta) {
  selectedId = id;
  if (protectedSave) { render(); toast('請先下載原始進度，再匯入有效備份或重置，避免覆蓋原有資料。'); return; }
  const result = engine.change(points, id, delta);
  if (!result.ok) { render(); toast(result.message); return; }
  const completionMessage = delta > 0 && engine.value(result.points, id) === engine.skills.get(id).hours
    ? `「${engine.skills.get(id).title}」時數已滿！記得完成自我檢核。` : '';
  commit(result.points, completionMessage);
}

function renderNavigation() {
  $('branch-nav').innerHTML = curriculum.branches.map(branch => {
    const first = curriculum.skills.find(skill => skill.branch === branch.id);
    const summary = engine.summary(points, branch.id);
    return `<button class="branch-button ${branch.id === branchId && !query ? 'active' : ''}" data-branch="${branch.id}" ${branch.id === branchId && !query ? 'aria-current="page"' : ''}><img src="${first.icon}" alt=""><span>${branch.name}</span><span class="branch-count">${summary.completed}/${summary.count}</span></button>`;
  }).join('');
}

function renderHeader() {
  const summary = engine.summary(points);
  $('total-hours').innerHTML = `${number(summary.hours)} <em>小時</em>`;
  $('completed-skills').innerHTML = `${summary.completed} <em>/ ${summary.count}</em>`;
  $('available-skills').innerHTML = `${summary.available} <em>項技能</em>`;
  $('sidebar-completed').textContent = summary.completed;
  $('sidebar-count').textContent = `/ ${summary.count} 技能`;
  $('sidebar-progress').style.width = `${summary.hours / summary.total * 100}%`;
  $('save-status').textContent = storageError ? '進度尚未儲存' : '進度自動儲存';
  $('save-detail').textContent = storageError ? '請匯出備份保留進度' : lastSaved ? `上次儲存 ${lastSaved}` : desktopMode ? '儲存在這台電腦' : '儲存於這個瀏覽器';
  const branch = branchFor(branchId);
  $('branch-number').textContent = query ? '⌕' : roman[curriculum.branches.indexOf(branch)];
  $('branch-english').textContent = query ? 'SEARCH THE ARCHIVES' : branch.english;
  $('branch-title').textContent = query ? '探索技能' : branch.name;
  $('branch-description').textContent = query ? `在所有路線搜尋「${query}」` : branch.description;
  const local = engine.summary(points, branchId);
  $('branch-stats').textContent = query ? '' : `${local.completed}/${local.count} 完成 · ${local.hours}/${local.total} 小時`;
  document.documentElement.style.setProperty('--accent', branch.color);
  $('view-button').textContent = listView ? '◇' : '☷';
  $('view-button').setAttribute('aria-label', listView ? '切換技能樹檢視' : '切換清單檢視');
  $('view-button').title = listView ? '切換技能樹檢視' : '切換清單檢視';
}

function renderTree() {
  const branch = branchFor(branchId);
  const list = query ? curriculum.skills.filter(skill => `${skill.id} ${skill.title} ${skill.topic} ${skill.description} ${branchFor(skill.branch).name}`.toLocaleLowerCase().includes(query.toLocaleLowerCase())) : curriculum.skills.filter(skill => skill.branch === branchId);
  if (query || listView) {
    $('tree-content').innerHTML = `<div class="skill-list">${query ? `<h3>找到 ${list.length} 項技能</h3>` : ''}${list.length ? list.map(skill => `<button class="list-item ${skill.id === selectedId ? 'selected' : ''}" data-select="${skill.id}" data-preview="${skill.id}" aria-haspopup="dialog" aria-controls="skill-popover" aria-expanded="false"><img src="${skill.icon}" alt=""><span><strong>${skill.title}</strong><small>${skill.topic} · ${branchFor(skill.branch).name} · ${statusLabel(status(skill))}</small></span><b>${pointText(skill)}</b></button>`).join('') : '<div class="empty-state"><strong>尚未找到這道符文</strong>試試「字母」、「假設句」或「聽力」。</div>'}</div>`;
    return;
  }
  const width = 760, columnWidth = 190, rowHeight = 159, top = 65;
  const height = Math.max(...list.map(skill => skill.level)) * rowHeight + top + 165;
  const x = skill => skill.lane * columnWidth + 95;
  const y = skill => top + skill.level * rowHeight + 33;
  const edges = list.flatMap(skill => skill.prerequisites.map(id => {
    const parent = engine.skills.get(id);
    if (parent.branch !== branchId) return '';
    const mid = (y(parent) + y(skill)) / 2;
    const active = engine.value(points, parent.id) === parent.hours;
    return `<path class="${active ? 'active-line' : ''}" d="M${x(parent)} ${y(parent) + 30} C${x(parent)} ${mid},${x(skill)} ${mid},${x(skill)} ${y(skill) - 30}"/>`;
  })).join('');
  $('tree-content').innerHTML = `<div class="tree-canvas" style="width:${width}px;height:${height}px"><svg class="tree-lines" width="${width}" height="${height}" aria-hidden="true">${edges}</svg>${branch.lanes.map((lane, i) => `<div class="lane-title" style="left:${i * columnWidth + 8}px">${lane}</div>`).join('')}${list.map(skill => {
    const state = status(skill), amount = engine.value(points, skill.id);
    return `<article class="skill-node ${state} ${skill.id === selectedId ? 'selected' : ''}" style="left:${skill.lane * columnWidth + 8}px;top:${top + skill.level * rowHeight}px" data-node="${skill.id}" data-preview="${skill.id}"><div class="node-icon-wrap"><button class="node-icon" data-add="${skill.id}" aria-label="${skill.title}，${pointText(skill)} 小時，${state === 'locked' ? '查看先備條件' : state === 'complete' ? '已滿點' : '投入一小時'}" aria-disabled="${state === 'locked' || state === 'complete'}"><img src="${skill.icon}" alt="">${state === 'locked' ? '<span class="node-status" aria-hidden="true"><svg viewBox="0 0 16 16"><rect x="4" y="7" width="8" height="6" rx="1"/><path d="M5 7V5a3 3 0 0 1 6 0v2"/></svg></span>' : state === 'complete' ? '<span class="node-status">✓</span>' : '<span class="node-add">+</span>'}</button></div><button class="node-title" data-select="${skill.id}" aria-haspopup="dialog" aria-controls="skill-popover" aria-expanded="false">${skill.title}</button><div class="node-points"><button class="node-minus" data-subtract="${skill.id}" aria-label="收回${skill.title}一小時" ${amount === 0 ? 'disabled' : ''}>−</button><strong>${amount}</strong><span>/ ${skill.hours}</span></div></article>`;
  }).join('')}</div>`;
}

function renderSkillDetails(id) {
  const skill = engine.skills.get(id);
  const state = status(skill), amount = engine.value(points, skill.id);
  const branch = branchFor(skill.branch);
  const blockedBy = engine.blockers(points, skill.id);
  $('skill-popover').innerHTML = `<div class="popover-toolbar"><span class="popover-hint"></span><button data-close-popover aria-label="關閉技能詳情">×</button></div><div class="detail-kicker">${branch.name} ／ ${branch.lanes[skill.lane]}</div><div class="detail-hero"><img src="${skill.icon}" alt=""><div><h3 id="skill-popover-title">${skill.title}</h3><p>${skill.topic}</p></div></div><span class="status-badge ${state}">${statusLabel(state)}</span><div class="detail-points"><span>學習時數</span><strong>${amount} <small>/ ${skill.hours} 小時</small></strong></div><div class="detail-progress"><i style="width:${amount / skill.hours * 100}%"></i></div><div class="point-buttons"><button data-subtract="${skill.id}" ${amount === 0 || blockedBy.length || protectedSave ? 'disabled' : ''}>− 收回 1 小時</button><button data-add="${skill.id}" class="primary-button" ${state === 'locked' || state === 'complete' || protectedSave ? 'disabled' : ''}>＋ 投入 1 小時</button></div><p class="detail-note">${blockedBy.length ? '退點前，請先收回已投入的後續技能。' : '完成實際學習後，再為自己記上一點。'}</p><section class="detail-section"><h4>◇ 學習內容</h4><p>${skill.description}</p></section><section class="detail-section"><h4>◇ 自我檢核</h4><p class="checkpoint">${skill.checkpoint}</p></section><section class="detail-section"><h4>◇ 先備技能${skill.prerequisites.length > 1 ? '（全部完成）' : ''}</h4>${skill.prerequisites.length ? `<div class="prereq-list">${skill.prerequisites.map(id => { const parent = engine.skills.get(id); return `<button class="prereq-button" data-jump="${id}"><span>${engine.value(points, id) === parent.hours ? '✓' : '◇'} ${parent.title}</span><span>${pointText(parent)}</span></button>`; }).join('')}</div>` : '<p>無需先備技能，現在就能開始冒險。</p>'}</section><p class="detail-footnote">規劃時數包含練習與複習，採初學且學得較慢者的保守預算。時數不是能力認證，也不能換算為 TOEIC 分數。</p>`;
}

function render() {
  const active = document.activeElement;
  const focusAction = active?.dataset ? ['add', 'subtract', 'select', 'branch'].find(key => active.dataset[key]) : null;
  const focusId = focusAction ? active.dataset[focusAction] : null;
  const inPopover = active && $('skill-popover').contains(active);
  renderNavigation();
  renderHeader();
  renderTree();
  popover.refresh();
  renderWarning();
  if (focusAction && focusId) {
    const root = inPopover ? $('skill-popover') : document;
    root.querySelector(`[data-${focusAction}="${focusId}"]:not(:disabled)`)?.focus({ preventScroll: true });
  }
}

function jump(id) {
  popover.hide();
  const skill = engine.skills.get(id);
  selectedId = id;
  branchId = skill.branch;
  query = '';
  $('search').value = '';
  render();
  if (!listView) {
    $('tree').scrollTop = Math.max(0, 65 + skill.level * 159 - 80);
    $('tree').scrollLeft = Math.max(0, skill.lane * 190 - $('tree').clientWidth / 2 + 95);
  }
  // Wait for programmatic scrolling before anchoring the next detail card.
  requestAnimationFrame(() => {
    $('tree').querySelector(`[data-select="${id}"]`)?.focus({ preventScroll: true });
    popover.show(id, true);
  });
}

function exportProgress() {
  download(JSON.stringify(persistence.envelope(points), null, 2), `Eng-TOEIC-${new Date().toISOString().slice(0, 10)}.json`);
  toast('旅程備份已匯出，請保留下載的 JSON 檔案。');
}

function selectSkill(id) {
  selectedId = id;
  render();
  popover.show(id, true);
  // Move focus into the card for keyboard and touch users.
  $('skill-popover').querySelector('[data-close-popover]').focus({ preventScroll: true });
}

document.addEventListener('click', event => {
  const target = event.target.closest('button');
  if (!target || target.disabled) return;
  if (target.dataset.branch) {
    popover.hide();
    branchId = target.dataset.branch;
    query = '';
    $('search').value = '';
    if (engine.skills.get(selectedId).branch !== branchId) selectedId = curriculum.skills.find(skill => skill.branch === branchId).id;
    $('tree').scrollTop = 0;
    $('tree').scrollLeft = 0;
    render();
  } else if (target.dataset.select) {
    selectSkill(target.dataset.select);
  } else if (target.dataset.add) {
    const skill = engine.skills.get(target.dataset.add);
    if (target.classList.contains('node-icon') && status(skill) === 'locked') selectSkill(skill.id);
    else allocate(skill.id, 1);
  }
  else if (target.dataset.subtract) allocate(target.dataset.subtract, -1);
  else if (target.dataset.jump) jump(target.dataset.jump);
});

$('search').addEventListener('input', event => {
  popover.hide();
  query = event.target.value.trim().slice(0, 100);
  $('tree').scrollTop = 0;
  render();
});
$('view-button').addEventListener('click', () => { popover.hide(); listView = !listView; $('tree').scrollTop = 0; render(); });
$('export-button').addEventListener('click', exportProgress);
$('import-button').addEventListener('click', () => $('import-file').click());
$('import-file').addEventListener('change', async event => {
  const file = event.target.files[0];
  event.target.value = '';
  if (!file) return;
  try {
    if (file.size > 100000) throw new Error('備份不可超過 100 KB。');
    const imported = persistence.parse(await file.text());
    const summary = engine.summary(imported);
    showModal(`<div class="eyebrow">RESTORE YOUR JOURNEY</div><h2>接續這段旅程？</h2><p>將匯入 <strong>${escapeHTML(file.name)}</strong> 的 Eng-TOEIC 進度，取代目前紀錄。</p><p class="dialog-meta">${summary.hours} 小時投入 · ${summary.completed} 項完成</p><p>建議先匯出目前旅程，保留原本的紀錄。</p><div class="dialog-actions"><button id="cancel-import">取消</button><button id="confirm-import" class="confirm-import">確認匯入</button></div>`);
    $('cancel-import').addEventListener('click', () => $('modal').close());
    $('confirm-import').addEventListener('click', () => { $('modal').close(); commit(imported, '已匯入旅程備份。'); });
  } catch (error) { toast(`無法匯入：${error.message}`); }
});
$('reset-button').addEventListener('click', () => {
  const summary = engine.summary(points);
  showModal(`<div class="eyebrow">A NEW BEGINNING</div><h2>重新開始這場冒險？</h2><p>這會把 Eng-TOEIC 的 <strong>${summary.hours} 小時、${summary.completed} 項完成技能</strong>全部歸零。${protectedSave ? '無法讀取的原始資料也會被新進度取代。' : ''}</p><p>重置無法復原；如需保留紀錄，請先「匯出旅程」。</p><div class="dialog-actions"><button id="cancel-reset">保留進度</button><button id="confirm-reset" class="confirm-danger">確認全部歸零</button></div>`);
  $('cancel-reset').addEventListener('click', () => $('modal').close());
  $('confirm-reset').addEventListener('click', () => { $('modal').close(); protectedSave = false; commit({}, '已重置，新的旅程從這裡開始。'); });
});
$('help-button').addEventListener('click', () => showModal(`<div class="eyebrow">YOUR FIRST ADVENTURE</div><h2>先學習，再幫自己加一點。</h2><ol><li><strong>先選技能。</strong>第一次學英文，可以從「符文基礎」的「初始字母之印」開始。</li><li><strong>查看技能詳情。</strong>滑鼠移到技能上，或用 Tab 聚焦即可預覽；點名稱可固定浮窗，查看學習內容、自我檢核及先備技能，按 Esc 或 × 關閉。</li><li><strong>學滿一小時，加一點。</strong>點一次圖案，或按「＋ 投入 1 小時」。不用連續學一小時，可以分幾次累計。</li><li><strong>點錯不用怕。</strong>按「−」減一點。如果後面的技能已經加過點，要先把後面的點數退回來。</li><li><strong>未解鎖的技能先等等。</strong>看看它的「先備技能」，把前面的時數記滿，就能往前走。</li></ol><p>${desktopMode ? '程式會記住這台電腦、這個使用者帳號的進度。' : '網頁會記住這個瀏覽器、這個網址的進度。'}每週按一次「匯出旅程」，把備份留好。換電腦時，就能帶著紀錄繼續學。</p><p>這是記錄學習的工具。課本、影片和題目要另外準備；點滿不等於已學會或考到 900 分。</p><p><a href="help.html" target="_blank" rel="noopener">完整操作說明：開啟、加點、備份與換電腦 ↗</a></p>`));
$('class-button').addEventListener('click', () => showModal('<div class="eyebrow">CHOOSE YOUR PATH</div><h2>下一段旅程，等待展開。</h2><div class="class-option active"><strong>Eng-TOEIC</strong><small>目前職業 · 聽力與閱讀 900+</small></div><div class="class-option"><strong>日語</strong><small>規劃中</small></div><div class="class-option"><strong>素描畫</strong><small>規劃中</small></div><p>初版提供 Eng-TOEIC。其他職業可沿用同一套技能與先備資料結構新增；英語交流會獨立成另一套 Eng- 職業。</p>'));
window.addEventListener('storage', event => {
  if (!isProgressStorageEvent(event, window.localStorage, STORAGE_KEY)) return;
  // 儲存失敗的本分頁可能有尚未匯出的紀錄，禁止被其他分頁靜默覆蓋。
  if (storageError) { toast('其他分頁有進度變更，請先匯出本分頁紀錄，再重新整理。'); return; }
  // 事件可能排隊延遲；重新讀取目前值，避免舊事件蓋回較新的進度。
  const latest = persistence.read();
  if (!latest.error) {
    points = latest.points;
    render();
    toast('已同步此瀏覽器另一個分頁的進度。');
  } else {
    protectedSave = true;
    recoveryRaw = latest.raw;
    storageError = latest.error;
    render();
  }
});
const popover = createSkillPopover({ tree: $('tree'), panel: $('skill-popover'), renderDetails: renderSkillDetails });
render();
