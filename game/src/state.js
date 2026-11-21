import { SCENES } from './scenes.js';

const HINT_COUNT = 3;
const HINT_MS = 3000;
const MISS_PENALTY = 5;
const BONUS_PER_SECOND = 5;
const DIFFS_PER_SCENE = 8;
const POINTS_PER_FIND = 100;

function comboMultiplier(combo) {
  return Math.min(1 + 0.25 * (combo - 1), 3);
}

export function createGame() {
  return {
    sceneIndex: 0,
    found: new Set(),
    foundOrder: [],
    foundTotal: 0,
    score: 0,
    sceneScore: 0,
    combo: 0,
    bestCombo: 0,
    hints: HINT_COUNT,
    timeLeft: 0,
    running: false,
    paused: false,
    muted: false,
    over: false,
    sceneDone: false,
    wrong: 0,
    stars: SCENES.map(() => 0),
    hintTarget: null,
    hintUntil: 0
  };
}

export function startScene(state, index) {
  state.sceneIndex = index;
  state.found = new Set();
  state.foundOrder = [];
  state.sceneScore = 0;
  state.hints = HINT_COUNT;
  state.timeLeft = SCENES[index].par;
  state.sceneDone = false;
  state.hintTarget = null;
  state.hintUntil = 0;
  state.running = true;
  state.paused = false;
  return state;
}

export function registerFind(state, diff) {
  if (!diff || state.found.has(diff.id)) return 0;

  state.found.add(diff.id);
  state.foundOrder.push(diff);
  state.foundTotal += 1;
  state.combo += 1;
  if (state.combo > state.bestCombo) state.bestCombo = state.combo;

  const points = Math.round(POINTS_PER_FIND * comboMultiplier(state.combo));
  state.score += points;
  state.sceneScore += points;

  let gained = points;

  if (state.found.size === DIFFS_PER_SCENE) {
    state.sceneDone = true;

    const bonus = Math.round(state.timeLeft) * BONUS_PER_SECOND;
    state.score += bonus;
    state.sceneScore += bonus;
    gained += bonus;

    const par = SCENES[state.sceneIndex].par;
    let stars = 1;
    if (state.timeLeft > par * 0.5) stars = 3;
    else if (state.timeLeft > par * 0.25) stars = 2;
    state.stars[state.sceneIndex] = stars;

    state.hintTarget = null;
    state.hintUntil = 0;
  }

  return gained;
}

export function registerMiss(state) {
  state.combo = 0;
  state.wrong += 1;
  state.timeLeft = Math.max(0, state.timeLeft - MISS_PENALTY);
}

export function useHint(state) {
  if (state.hints <= 0 || state.sceneDone || !state.running) return null;

  const diffs = SCENES[state.sceneIndex].diffs;
  let diff = null;
  for (let i = 0; i < diffs.length; i += 1) {
    if (!state.found.has(diffs[i].id)) {
      diff = diffs[i];
      break;
    }
  }
  if (!diff) return null;

  state.hints -= 1;
  state.hintTarget = diff;
  state.hintUntil = Date.now() + HINT_MS;
  return diff;
}

export function tick(state, dtSeconds) {
  if (!state.running || state.paused || state.over || state.sceneDone) return null;

  state.timeLeft -= dtSeconds;
  if (state.timeLeft <= 0) {
    state.timeLeft = 0;
    state.over = true;
    return 'timeout';
  }
  return null;
}

export function nextScene(state) {
  if (state.sceneIndex + 1 >= SCENES.length) return false;
  startScene(state, state.sceneIndex + 1);
  return true;
}

export function totalStars(state) {
  return state.stars.reduce((sum, s) => sum + s, 0);
}
