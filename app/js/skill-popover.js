// An interactive detail popover: hover/focus to preview, click a name to pin.
export function createSkillPopover({ tree, panel, renderDetails }) {
  let skillId = null;
  let pinned = false;
  let closeTimer;
  let dismissedId = null;
  let pointerPosition = null;
  const anchor = () => tree.querySelector(`[data-preview="${skillId}"]`);
  const trigger = node => node?.closest?.('[data-preview]');
  const markExpanded = expanded => {
    const node = anchor();
    node?.classList.toggle('previewing', expanded);
    node?.querySelectorAll('[data-select]').forEach(button => button.setAttribute('aria-expanded', String(expanded)));
    if (node?.matches('[data-select]')) node.setAttribute('aria-expanded', String(expanded));
  };

  function position() {
    const node = anchor();
    if (panel.hidden || !node) return;
    const box = node.getBoundingClientRect();
    const margin = 12, gap = 12;
    const width = panel.offsetWidth, height = panel.offsetHeight;
    const viewportWidth = document.documentElement.clientWidth;
    const viewportHeight = window.innerHeight;
    let left = box.right + gap;
    if (left + width > viewportWidth - margin) left = box.left - width - gap;
    // List rows span the viewport. Place a hover preview beside the pointer
    // so that opening the card cannot intercept the intended name click.
    if (pointerPosition && (node.matches('.list-item') || left < margin)) {
      left = pointerPosition.x + gap;
      if (left + width > viewportWidth - margin) left = pointerPosition.x - width - gap;
    }
    if (left < margin) left = Math.min(viewportWidth - width - margin, Math.max(margin, box.left + (box.width - width) / 2));
    // On narrow screens the detail card uses the available viewport width.
    let top = Math.max(margin, Math.min(box.top - 24, viewportHeight - height - margin));
    if (viewportWidth <= 620) {
      left = (viewportWidth - width) / 2;
      top = viewportHeight - height - margin;
    }
    panel.style.left = `${left}px`;
    panel.style.top = `${top}px`;
  }

  function refresh() {
    if (!skillId || panel.hidden) return;
    if (!anchor()) { hide(); return; }
    const active = document.activeElement;
    const action = panel.contains(active) && ['add', 'subtract', 'jump'].find(key => active.dataset[key]);
    const actionId = action && active.dataset[action];
    const closeFocused = active?.matches('[data-close-popover]');
    const scrollTop = panel.scrollTop;
    renderDetails(skillId);
    panel.dataset.pinned = String(pinned);
    panel.querySelector('.popover-hint').textContent = pinned ? '已固定詳情 · Esc 關閉' : '點技能名稱可固定詳情';
    panel.scrollTop = scrollTop;
    markExpanded(true);
    position();
    if (action) {
      const next = panel.querySelector(`[data-${action}="${actionId}"]:not(:disabled)`);
      (next || panel.querySelector('[data-close-popover]')).focus({ preventScroll: true });
    } else if (closeFocused) panel.querySelector('[data-close-popover]').focus({ preventScroll: true });
  }

  function show(id, pin = false, pointer = null) {
    clearTimeout(closeTimer);
    if (pinned && !pin) return;
    markExpanded(false);
    const changed = skillId !== id || panel.hidden;
    skillId = id;
    pinned = pin;
    pointerPosition = pointer;
    dismissedId = null;
    panel.hidden = false;
    if (changed) panel.scrollTop = 0;
    refresh();
  }

  function hide(restoreFocus = false) {
    clearTimeout(closeTimer);
    const returnTo = anchor();
    dismissedId = skillId;
    markExpanded(false);
    pinned = false;
    skillId = null;
    panel.hidden = true;
    if (restoreFocus) (returnTo?.querySelector('[data-select]') || returnTo)?.focus({ preventScroll: true });
  }

  function scheduleClose() {
    clearTimeout(closeTimer);
    closeTimer = setTimeout(() => {
      if (!pinned && !panel.matches(':hover') && !panel.contains(document.activeElement)) hide();
    }, 200);
  }

  tree.addEventListener('pointerover', event => {
    // A narrow-screen card covers the tree, so only open it on an explicit tap.
    if (event.pointerType === 'touch' || window.innerWidth <= 620) return;
    const node = trigger(event.target);
    if (!node) return;
    clearTimeout(closeTimer);
    if (node !== trigger(event.relatedTarget)) dismissedId = null;
    if (node.dataset.preview !== dismissedId && (skillId !== node.dataset.preview || panel.hidden)) show(node.dataset.preview, false, { x: event.clientX });
  });
  tree.addEventListener('pointerout', event => {
    if (trigger(event.target) !== trigger(event.relatedTarget) && !panel.contains(event.relatedTarget)) scheduleClose();
  });
  tree.addEventListener('focusin', event => {
    const node = trigger(event.target);
    if (node && event.target.matches(':focus-visible') && node.dataset.preview !== dismissedId) show(node.dataset.preview);
  });
  tree.addEventListener('focusout', event => {
    if (trigger(event.target) !== trigger(event.relatedTarget) && !panel.contains(event.relatedTarget)) scheduleClose();
  });
  panel.addEventListener('pointerenter', () => clearTimeout(closeTimer));
  panel.addEventListener('pointerleave', scheduleClose);
  panel.addEventListener('focusout', event => {
    if (!panel.contains(event.relatedTarget)) scheduleClose();
  });
  panel.addEventListener('click', event => {
    if (event.target.closest('[data-close-popover]')) hide(true);
  });
  document.addEventListener('pointerdown', event => {
    if (!panel.hidden && !panel.contains(event.target) && !trigger(event.target)) hide();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !panel.hidden) {
      event.preventDefault();
      hide(panel.contains(document.activeElement));
    }
  });
  tree.addEventListener('scroll', () => hide(), { passive: true });
  window.addEventListener('scroll', position, { passive: true });
  window.addEventListener('resize', position);
  return { show, hide, refresh };
}
