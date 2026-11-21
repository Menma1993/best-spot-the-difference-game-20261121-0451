const PANEL_W = 560;
const PANEL_H = 420;
const GAP_X = 600;
const STEP = 12;
const STEP_FAST = 40;

function clamp(value, lo, hi) {
  if (value < lo) return lo;
  if (value > hi) return hi;
  return value;
}

// Returns 0 for the left panel, 1 for the right panel, -1 for the gap / outside.
function panelAt(x, y) {
  if (y < 0 || y > PANEL_H) return -1;
  if (x >= 0 && x <= PANEL_W) return 0;
  if (x >= GAP_X && x <= GAP_X + PANEL_W) return 1;
  return -1;
}

function localX(panel, x) {
  return panel === 1 ? x - GAP_X : x;
}

function isTypingTarget(target) {
  if (!target || !target.tagName) return false;
  const tag = target.tagName.toLowerCase();
  return tag === 'input' || tag === 'textarea' || tag === 'select' || tag === 'button';
}

export function attachInput(canvas, hooks) {
  const api = hooks || {};
  const crosshair = { panel: 0, x: PANEL_W / 2, y: PANEL_H / 2, visible: false };
  let hover = { panel: -1, x: 0, y: 0 };

  function emit(name, a, b, c) {
    const fn = api[name];
    if (typeof fn === 'function') fn(a, b, c);
  }

  function pointerPos(e) {
    if (typeof e.offsetX === 'number' && typeof e.offsetY === 'number') {
      return { x: e.offsetX, y: e.offsetY };
    }
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width ? canvas.width / rect.width : 1;
    const scaleY = canvas.height ? canvas.height / rect.height : 1;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY
    };
  }

  function syncCrosshair(panel, x, y) {
    crosshair.panel = panel;
    crosshair.x = x;
    crosshair.y = y;
    crosshair.visible = true;
    hover = { panel, x, y };
  }

  function handleMove(e) {
    const pos = pointerPos(e);
    const panel = panelAt(pos.x, pos.y);
    if (panel === -1) {
      hover = { panel: -1, x: 0, y: 0 };
      emit('onHover', -1, 0, 0);
      return;
    }
    const x = clamp(localX(panel, pos.x), 0, PANEL_W);
    const y = clamp(pos.y, 0, PANEL_H);
    syncCrosshair(panel, x, y);
    emit('onHover', panel, x, y);
  }

  function handleDown(e) {
    const pos = pointerPos(e);
    const panel = panelAt(pos.x, pos.y);
    if (panel === -1) return;
    const x = clamp(localX(panel, pos.x), 0, PANEL_W);
    const y = clamp(pos.y, 0, PANEL_H);
    syncCrosshair(panel, x, y);
    emit('onGuess', panel, x, y);
  }

  function handleLeave() {
    hover = { panel: -1, x: 0, y: 0 };
    emit('onLeave');
  }

  function moveCrosshair(dx, dy) {
    crosshair.x = clamp(crosshair.x + dx, 0, PANEL_W);
    crosshair.y = clamp(crosshair.y + dy, 0, PANEL_H);
    crosshair.visible = true;
    hover = { panel: crosshair.panel, x: crosshair.x, y: crosshair.y };
    emit('onHover', crosshair.panel, crosshair.x, crosshair.y);
  }

  function switchPanel(delta) {
    const next = clamp(crosshair.panel + delta, 0, 1);
    if (next === crosshair.panel) return;
    syncCrosshair(next, crosshair.x, crosshair.y);
    emit('onHover', next, crosshair.x, crosshair.y);
  }

  function handleKey(e) {
    if (isTypingTarget(e.target)) return;
    const key = e.key;
    const step = e.shiftKey ? STEP_FAST : STEP;

    if (key === ' ' || key === 'Spacebar' || key.indexOf('Arrow') === 0) {
      e.preventDefault();
    }

    switch (key) {
      case 'ArrowLeft':
        moveCrosshair(-step, 0);
        return;
      case 'ArrowRight':
        moveCrosshair(step, 0);
        return;
      case 'ArrowUp':
        moveCrosshair(0, -step);
        return;
      case 'ArrowDown':
        moveCrosshair(0, step);
        return;
      case '[':
        switchPanel(-1);
        return;
      case ']':
        switchPanel(1);
        return;
      case 'Enter':
      case ' ':
      case 'Spacebar':
        crosshair.visible = true;
        emit('onGuess', crosshair.panel, crosshair.x, crosshair.y);
        return;
      case 'Escape':
        emit('onAction', 'pause');
        return;
      default:
        break;
    }

    if (key.length === 1 && key >= '1' && key <= '6') {
      emit('onAction', 'level-' + key);
      return;
    }

    const lower = key.length === 1 ? key.toLowerCase() : '';
    if (lower === 'h') emit('onAction', 'hint');
    else if (lower === 'p') emit('onAction', 'pause');
    else if (lower === 'm') emit('onAction', 'sound');
    else if (lower === 'r') emit('onAction', 'restart');
    else if (lower === 'n') emit('onAction', 'next');
  }

  canvas.addEventListener('pointermove', handleMove);
  canvas.addEventListener('pointerdown', handleDown);
  canvas.addEventListener('pointerleave', handleLeave);
  window.addEventListener('keydown', handleKey);

  return {
    getCrosshair() {
      return {
        panel: crosshair.panel,
        x: crosshair.x,
        y: crosshair.y,
        visible: crosshair.visible
      };
    },
    getHover() {
      return { panel: hover.panel, x: hover.x, y: hover.y };
    },
    detach() {
      canvas.removeEventListener('pointermove', handleMove);
      canvas.removeEventListener('pointerdown', handleDown);
      canvas.removeEventListener('pointerleave', handleLeave);
      window.removeEventListener('keydown', handleKey);
    }
  };
}
