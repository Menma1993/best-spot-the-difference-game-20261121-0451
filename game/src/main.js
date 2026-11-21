import { SCENES, PANEL_W, PANEL_H } from './scenes.js';
import { drawReef } from './draw-reef.js';
import { drawCamp } from './draw-camp.js';
import { drawKitchen } from './draw-kitchen.js';
import { drawWorkshop } from './draw-workshop.js';
import { drawOasis } from './draw-oasis.js';
import { drawLodge } from './draw-lodge.js';
import { createGame, startScene, registerFind, registerMiss, useHint, tick, nextScene, totalStars } from './state.js';
import { createAudio } from './audio.js';
import { bindHud } from './hud.js';
import { attachInput } from './input.js';
import { ring, check, circle } from './render.js';

const DRAW = [drawReef, drawCamp, drawKitchen, drawWorkshop, drawOasis, drawLodge];
const GAP_X = 600;

// Where a difference sits on a panel: a 'moved' difference sits at (mx, my) on
// the right (changed) panel and at (x, y) on the left (original) panel.
function diffPos(d, panel) {
  if (panel === 1 && d.type === 'moved' && d.mx !== undefined) return { x: d.mx, y: d.my };
  return { x: d.x, y: d.y };
}

const canvas = document.getElementById('game');
canvas.width = 1160;
canvas.height = 420;
const ctx = canvas.getContext('2d');

let state = createGame();
startScene(state, 0);
const audio = createAudio();
let particles = [];
let wrongs = [];
let lastWholeSecond = -1;

function changedSet() {
  return new Set(SCENES[state.sceneIndex].diffs.map(d => d.id));
}

function hitTest(x, y) {
  for (const d of SCENES[state.sceneIndex].diffs) {
    if (state.found.has(d.id)) continue;
    const lim = d.r + 6;
    if (Math.hypot(x - d.x, y - d.y) <= lim) return d;
    if (d.type === 'moved' && d.mx !== undefined) {
      if (Math.hypot(x - d.mx, y - d.my) <= lim) return d;
    }
  }
  return null;
}

function spawnBurst(x, y, panel) {
  for (let i = 0; i < 14; i++) {
    const a = Math.random() * Math.PI * 2;
    const s = 50 + Math.random() * 150;
    particles.push({
      panel, x, y,
      vx: Math.cos(a) * s, vy: Math.sin(a) * s,
      life: 0.5 + Math.random() * 0.45,
      color: i % 2 ? '#f5b301' : '#22a06b'
    });
  }
}

function refreshHud() {
  const sc = SCENES[state.sceneIndex];
  hud.setScene(state.sceneIndex, sc, SCENES.length);
  hud.setRemaining(state.found.size, 8);
  hud.setTimer(state.timeLeft, sc.par);
  hud.setScore(state.score);
  hud.setCombo(state.combo);
  hud.setHints(state.hints);
  hud.setFoundList(state.foundOrder);
  hud.setPaused(state.paused);
  hud.setMuted(state.muted);
}

function handleGuess(panel, x, y) {
  if (!state.running || state.paused || state.sceneDone || state.over) return;
  const diff = hitTest(x, y);
  if (diff) {
    const gained = registerFind(state, diff);
    const rp = diffPos(diff, 1);
    spawnBurst(diff.x, diff.y, 0);
    spawnBurst(rp.x, rp.y, 1);
    audio.find();
    hud.setMessage('+' + gained + ' — ' + diff.name + '!');
    refreshHud();
    if (state.sceneDone) {
      audio.win();
      hud.showSceneComplete(SCENES[state.sceneIndex], state.sceneScore, state.stars[state.sceneIndex], state.sceneIndex + 1 < SCENES.length);
    }
  } else {
    registerMiss(state);
    wrongs.push({ panel, x, y, until: performance.now() + 450 });
    audio.miss();
    hud.setMessage('Nope — that spot matches. −5s');
    refreshHud();
  }
}

function doAction(action) {
  if (action === 'hint') {
    const d = useHint(state);
    if (d) {
      audio.hint();
      hud.setHints(state.hints);
      hud.setMessage('Hint: watch the pulsing ring!');
    } else {
      hud.setMessage(state.hints <= 0 ? 'No hints left!' : 'Finish this scene first.');
    }
  } else if (action === 'pause') {
    if (state.running && !state.over) {
      state.paused = !state.paused;
      hud.setPaused(state.paused);
    }
  } else if (action === 'sound') {
    state.muted = !state.muted;
    audio.setMuted(state.muted);
    hud.setMuted(state.muted);
  } else if (action === 'restart') {
    startScene(state, state.sceneIndex);
    particles = [];
    wrongs = [];
    hud.hideOverlay();
    refreshHud();
    hud.setMessage('Scene restarted — find all 8 differences!');
  } else if (action === 'next') {
    if (state.sceneDone) {
      if (nextScene(state)) {
        particles = [];
        wrongs = [];
        hud.hideOverlay();
        refreshHud();
        hud.setMessage('Find all 8 differences!');
      } else {
        hud.showResults(state.score, totalStars(state), state.foundTotal, state.bestCombo);
      }
    }
  } else if (action.indexOf('level-') === 0) {
    const i = Number(action.slice(6)) - 1;
    if (i >= 0 && i < SCENES.length) {
      startScene(state, i);
      particles = [];
      wrongs = [];
      hud.hideOverlay();
      refreshHud();
      hud.setMessage('Find all 8 differences!');
    }
  }
}

const hud = bindHud({
  onHint: () => doAction('hint'),
  onPause: () => doAction('pause'),
  onSound: () => doAction('sound'),
  onRestart: () => doAction('restart'),
  onLevel: (i) => doAction('level-' + (i + 1)),
  onNext: () => doAction('next'),
  onReplay: () => {
    state = createGame();
    startScene(state, 0);
    particles = [];
    wrongs = [];
    hud.hideOverlay();
    refreshHud();
    hud.setMessage('Find all 8 differences!');
  }
});

const input = attachInput(canvas, {
  onGuess: handleGuess,
  onHover: () => {},
  onLeave: () => {},
  onAction: doAction
});

let last = performance.now();

function frame(now) {
  const dt = Math.min(0.05, (now - last) / 1000);
  last = now;

  if (state.running && !state.paused) {
    const res = tick(state, dt);
    if (res === 'timeout') {
      hud.showTimeout(state.foundTotal);
      refreshHud();
    }
    const whole = Math.ceil(state.timeLeft);
    if (whole !== lastWholeSecond) {
      lastWholeSecond = whole;
      if (whole <= 10 && whole > 0) audio.tick();
    }
  }
  hud.setTimer(state.timeLeft, SCENES[state.sceneIndex].par);

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.save();
  ctx.translate(0, 0);
  DRAW[state.sceneIndex](ctx, new Set());
  ctx.restore();

  ctx.save();
  ctx.translate(GAP_X, 0);
  DRAW[state.sceneIndex](ctx, changedSet());
  ctx.restore();

  ctx.strokeStyle = '#16324f';
  ctx.lineWidth = 4;
  ctx.strokeRect(2, 2, 556, 416);
  ctx.strokeRect(602, 2, 556, 416);

  ctx.beginPath();
  ctx.arc(580, 210, 18, 0, Math.PI * 2);
  ctx.fillStyle = '#f5b301';
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 16px system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('VS', 580, 211);

  for (const d of state.foundOrder) {
    for (const panel of [0, 1]) {
      const ox = panel === 1 ? GAP_X : 0;
      const pos = diffPos(d, panel);
      circle(ctx, ox + pos.x, pos.y, d.r + 4, 'rgba(245,179,1,0.28)');
      ring(ctx, ox + pos.x, pos.y, d.r + 4, '#f5b301', 5);
      check(ctx, ox + pos.x, pos.y, 18, '#22a06b', 5);
    }
  }
  const latest = state.foundOrder[state.foundOrder.length - 1];
  if (latest) {
    for (const panel of [0, 1]) {
      const ox = panel === 1 ? GAP_X : 0;
      const pos = diffPos(latest, panel);
      ring(ctx, ox + pos.x, pos.y, latest.r + 8 + 3 * Math.sin(now / 150), '#22a06b', 3);
    }
  }

  if (state.hintTarget && Date.now() < state.hintUntil) {
    const t = state.hintTarget;
    const a = 0.55 + 0.45 * Math.sin(now / 120);
    const r = t.r + 6 + 5 * Math.sin(now / 120);
    ctx.globalAlpha = Math.max(0, a);
    for (const panel of [0, 1]) {
      const ox = panel === 1 ? GAP_X : 0;
      const pos = diffPos(t, panel);
      ring(ctx, ox + pos.x, pos.y, r, '#f5b301', 4);
    }
    ctx.globalAlpha = 1;
  }

  wrongs = wrongs.filter(w => now < w.until);
  ctx.strokeStyle = '#e0463f';
  ctx.lineWidth = 5;
  ctx.lineCap = 'round';
  for (const w of wrongs) {
    const wx = (w.panel === 1 ? GAP_X : 0) + w.x;
    const wy = w.y;
    const s = 16;
    ctx.beginPath();
    ctx.moveTo(wx - s, wy - s);
    ctx.lineTo(wx + s, wy + s);
    ctx.moveTo(wx + s, wy - s);
    ctx.lineTo(wx - s, wy + s);
    ctx.stroke();
  }
  ctx.lineCap = 'butt';

  for (const p of particles) {
    p.x += p.vx * dt;
    p.y += p.vy * dt;
    p.vy += 60 * dt;
    p.life -= dt;
  }
  particles = particles.filter(p => p.life > 0);
  for (const p of particles) {
    ctx.globalAlpha = Math.max(0, Math.min(1, p.life));
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc((p.panel === 1 ? GAP_X : 0) + p.x, p.y, 3, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;

  const hov = input.getHover();
  if (hov.panel >= 0 && !state.paused) {
    const ox = hov.panel === 1 ? GAP_X : 0;
    const cx = ox + hov.x;
    const cy = hov.y;
    const R = 70;
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, R, 0, Math.PI * 2);
    ctx.clip();
    ctx.drawImage(canvas, cx - 35, cy - 35, 70, 70, cx - R, cy - R, R * 2, R * 2);
    ctx.restore();
    ring(ctx, cx, cy, R, '#ffffff', 3);
    ring(ctx, cx, cy, R - 3, '#16324f', 2);
  }

  const ch = input.getCrosshair();
  if (ch.visible && !state.paused) {
    const ox = ch.panel === 1 ? GAP_X : 0;
    const cx = ox + ch.x;
    const cy = ch.y;
    ctx.strokeStyle = '#e0463f';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cx - 12, cy);
    ctx.lineTo(cx + 12, cy);
    ctx.moveTo(cx, cy - 12);
    ctx.lineTo(cx, cy + 12);
    ctx.stroke();
    ring(ctx, cx, cy, 8, '#e0463f', 2);
  }

  if (state.paused) {
    ctx.fillStyle = 'rgba(22, 50, 79, 0.72)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 28px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('Paused — press P to resume', canvas.width / 2, canvas.height / 2);
  }

  requestAnimationFrame(frame);
}

// Demo / deep-link params: ?scene=N, ?found=id1,id2, ?time=S, ?score=N, ?combo=N, ?demo=mid
{
  const q = new URLSearchParams(location.search);
  let demoScene = q.has('scene') ? Number(q.get('scene')) : 0;
  if (q.get('demo') === 'mid') demoScene = 0;
  if (demoScene) startScene(state, demoScene);
  if (q.get('demo') === 'mid' || q.has('found')) {
    const ids = q.get('demo') === 'mid'
      ? SCENES[state.sceneIndex].diffs.slice(0, 3).map(d => d.id)
      : q.get('found').split(',');
    for (const id of ids) {
      const d = SCENES[state.sceneIndex].diffs.find(x => x.id === id);
      if (d) registerFind(state, d);
    }
    if (q.has('time')) state.timeLeft = Number(q.get('time'));
    else if (q.get('demo') === 'mid') state.timeLeft = 107;
    if (q.has('score')) state.score = Number(q.get('score'));
    else if (q.get('demo') === 'mid') state.score = 350;
    if (q.has('combo')) state.combo = Number(q.get('combo'));
    else if (q.get('demo') === 'mid') state.combo = 2;
  }
}

// Screenshot / debug driving hook (same code path as a real click).
window.__spot = {
  get state() { return state; },
  clickAt(panel, x, y) { handleGuess(panel, x, y); },
  get input() { return input; }
};

// How-to-play toggle (button lives outside the HUD bindings).
{
  const howtoBtn = document.getElementById('howto-btn');
  const howto = document.getElementById('howto');
  if (howtoBtn && howto) {
    howtoBtn.onclick = () => {
      howto.classList.toggle('hidden');
      audio.click();
    };
  }
}

// Pre-fill every level button's name once, so the level row never shows
// placeholder 'Scene N' labels.
for (let i = 0; i < SCENES.length; i++) hud.setScene(i, SCENES[i], SCENES.length);

refreshHud();
hud.setMessage('Find all 8 differences!');
requestAnimationFrame(frame);
