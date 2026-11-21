import {
  circle,
  ellipse,
  rect,
  rrect,
  poly,
  star,
  line,
  vgrad,
  text,
  check,
  ring,
  softShadow,
  vignette,
  speck
} from './render.js';

export function drawReef(ctx, changed) {
  // ---------- FAR BACKGROUND ----------
  const water = ctx.createLinearGradient(0, 0, 0, 360);
  water.addColorStop(0, '#6fd3f2');
  water.addColorStop(0.55, '#2f9fd0');
  water.addColorStop(1, '#14699e');
  ctx.fillStyle = water;
  ctx.fillRect(0, 0, 560, 360);

  // wide soft light rays from the surface
  const ray = (x, top, bot) => {
    poly(ctx, [
      [x - top / 2, 0],
      [x + top / 2, 0],
      [x + bot / 2, 360],
      [x - bot / 2, 360]
    ], 'rgba(255,255,255,0.10)');
  };
  ray(86, 26, 150);
  ray(205, 18, 104);
  ray(332, 30, 176);
  ray(474, 22, 84);

  // pale caustic blobs
  ellipse(ctx, 140, 96, 78, 34, 'rgba(255,255,255,0.08)');
  ellipse(ctx, 352, 150, 96, 40, 'rgba(255,255,255,0.08)');
  ellipse(ctx, 470, 62, 62, 26, 'rgba(255,255,255,0.08)');

  // distant rock silhouette, left edge
  poly(ctx, [
    [-10, 358], [-10, 210], [24, 196], [58, 216], [76, 250],
    [104, 268], [96, 310], [72, 340], [86, 358]
  ], '#1d5f86');
  poly(ctx, [
    [-10, 358], [-10, 300], [30, 290], [66, 306], [88, 332], [70, 358]
  ], '#1a5478');

  // distant coral silhouette, right edge
  poly(ctx, [
    [570, 358], [570, 178], [536, 166], [518, 196], [528, 228],
    [498, 244], [506, 292], [470, 314], [486, 344], [456, 358]
  ], '#1d5f86');
  poly(ctx, [
    [570, 358], [570, 262], [540, 250], [524, 278], [540, 312],
    [512, 334], [530, 358]
  ], '#1a5478');

  // ---------- MIDGROUND ----------
  // sandy floor
  rect(ctx, 0, 360, 560, 60, '#f2d8a0');
  rect(ctx, 0, 356, 560, 5, '#f8e4b8');
  rect(ctx, 0, 404, 560, 16, '#e3c58d');

  // sand ripples
  ctx.strokeStyle = '#e0bd7e';
  ctx.lineWidth = 3;
  ctx.lineCap = 'round';
  const ripple = (x, y, w) => {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.quadraticCurveTo(x + w / 2, y - 9, x + w, y);
    ctx.stroke();
  };
  ripple(34, 376, 156);
  ripple(226, 398, 188);
  ripple(398, 372, 124);

  // shells
  drawShell(ctx, 66, 392, 8);
  drawShell(ctx, 246, 372, 7);
  drawShell(ctx, 392, 404, 9);
  drawShell(ctx, 508, 386, 8);

  // pebbles
  drawPebble(ctx, 44, 408, 5);
  drawPebble(ctx, 118, 362, 4);
  drawPebble(ctx, 188, 402, 6);
  drawPebble(ctx, 322, 414, 5);
  drawPebble(ctx, 436, 396, 4);
  drawPebble(ctx, 540, 410, 6);

  // small starfish
  star(ctx, 300, 388, 8, 5, '#ef8354');
  star(ctx, 470, 366, 6, 5, '#e2734a');

  // rock arch
  drawRock(ctx, 250, 300, 150, 68);

  // big brain coral cluster
  drawBrainCoral(ctx, 90, 330, 1);

  // tube coral cluster
  drawTubeCoral(ctx, 430, 320, 1);

  // seaweed forest
  drawSeaweed(ctx, 20, 366, 52, '#1f9d55');
  drawSeaweed(ctx, 150, 368, 68, '#178a49');
  drawSeaweed(ctx, 300, 366, 45, '#2bb673');
  drawSeaweed(ctx, 480, 368, 62, '#1f9d55');
  drawSeaweed(ctx, 545, 366, 58, '#178a49');

  // sea anemones
  drawAnemone(ctx, 200, 345, 1);
  drawAnemone(ctx, 380, 350, 1);

  // sea urchins
  drawUrchin(ctx, 130, 375, 12);
  drawUrchin(ctx, 470, 380, 11);

  // school of distant fish
  drawSmallFish(ctx, 60, 120, 1, 0.35);
  drawSmallFish(ctx, 150, 180, 1.1, 0.35);
  drawSmallFish(ctx, 320, 90, 0.9, 0.35);
  drawSmallFish(ctx, 420, 150, 1, 0.35);
  drawSmallFish(ctx, 500, 230, 1.15, 0.35);

  // jellyfish drifting
  ctx.save();
  ctx.fillStyle = '#e8b4d9';
  ellipse(ctx, 255, 120, 16, 12, '#e8b4d9');
  ellipse(ctx, 255, 117, 9, 5, '#f5d0ea');
  ctx.strokeStyle = '#d18fc0';
  ctx.lineWidth = 2;
  ctx.lineCap = 'round';
  for (let i = 0; i < 5; i++) {
    const tx = 246 + i * 4.5;
    const len = 26 + i * 2;
    ctx.beginPath();
    ctx.moveTo(tx, 128);
    ctx.quadraticCurveTo(tx + (i % 2 === 0 ? 4 : -4), 128 + len * 0.6, tx + (i % 2 === 0 ? -2 : 2), 128 + len);
    ctx.stroke();
  }
  ctx.restore();

  // extra distant fish
  drawSmallFish(ctx, 200, 140, 1.0, 0.35);
  drawSmallFish(ctx, 430, 110, 0.9, 0.35);
  drawSmallFish(ctx, 90, 210, 1.2, 0.35);

  // caustic light dappling on sand floor
  ctx.save();
  ctx.fillStyle = 'rgba(255,250,220,0.10)';
  [[90, 380, 26, 7], [210, 398, 34, 8], [330, 375, 24, 6], [450, 405, 30, 7], [520, 382, 20, 6], [160, 412, 28, 6]].forEach((c) => {
    ellipse(ctx, c[0], c[1], c[2], c[3], 'rgba(255,250,220,0.10)');
  });
  ctx.restore();

  // top-light highlight arc on rock arch
  ctx.save();
  ctx.strokeStyle = 'rgba(255,244,214,0.35)';
  ctx.lineWidth = 3;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.ellipse(250, 300, 62, 28, 0, Math.PI * 1.15, Math.PI * 1.75);
  ctx.stroke();
  ctx.restore();

  // decor bubble column
  ring(ctx, 326, 292, 3, 'rgba(255,255,255,0.85)', 1.2);
  ring(ctx, 335, 274, 4.5, 'rgba(255,255,255,0.8)', 1.2);
  ring(ctx, 322, 252, 3.5, 'rgba(255,255,255,0.8)', 1.2);
  ring(ctx, 338, 232, 5, 'rgba(255,255,255,0.75)', 1.2);
  circle(ctx, 336, 230, 1.4, 'rgba(255,255,255,0.7)');

  // ---- foreground layer ----
  const fgBlade = (bx, bh, lean, w, col) => {
    ctx.strokeStyle = col;
    ctx.lineWidth = w;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(bx, 404);
    ctx.quadraticCurveTo(bx + lean * 40, 404 - bh * 0.55, bx + lean * 70, 404 - bh);
    ctx.stroke();
  };
  fgBlade(8, 112, 0.9, 10, '#173d24');
  fgBlade(19, 120, -0.7, 9, '#1d4a2b');
  fgBlade(33, 94, 1.3, 8, '#153a22');
  fgBlade(552, 104, -1.0, 9, '#173d24');
  fgBlade(544, 118, -0.6, 8, '#1d4a2b');

  ellipse(ctx, 505, 395, 46, 22, '#26343f');
  ellipse(ctx, 497, 387, 29, 10, '#35485a');
  line(ctx, 466, 382, 542, 381, 'rgba(200,225,240,0.30)', 2);

  const fgShell = (x, y) => {
    ellipse(ctx, x, y, 27, 17, '#c8a279');
    ellipse(ctx, x, y - 3, 25, 12, '#e6c9a4');
    for (let k = -2; k <= 2; k++) {
      line(ctx, x + k * 4, y - 13, x + k * 10, y + 12, 'rgba(140,104,66,0.55)', 1.5);
    }
  };
  fgShell(30, 405);
  fgShell(530, 405);

  ellipse(ctx, 280, 395, 150, 24, 'rgba(255,249,214,0.10)');
  vignette(ctx, 560, 420);

  // 1. blue-fish — body and belly stay blue, only the tail fin warms up
  const fishFin = changed.has('blue-fish') ? '#ff7b54' : '#2a6fc7';
  const fishBelly = '#5ea0ea';
  poly(ctx, [[100, 90], [74, 74], [74, 106]], fishFin);
  ellipse(ctx, 122, 90, 24, 16, '#2f7fe0');
  ellipse(ctx, 120, 100, 17, 6, fishBelly);
  poly(ctx, [[110, 76], [126, 76], [120, 68]], '#2a6fc7');
  circle(ctx, 136, 85, 3.2, '#0d2b45');

  // 2. sea-turtle — same turtle, quietly repositioned
  const tp = changed.has('sea-turtle') ? [458, 62] : [400, 70];
  ellipse(ctx, tp[0] - 20, tp[1] - 15, 13, 7, '#3f8f5a');
  ellipse(ctx, tp[0] - 20, tp[1] + 15, 13, 7, '#3f8f5a');
  ellipse(ctx, tp[0] + 18, tp[1] - 14, 12, 6, '#3f8f5a');
  ellipse(ctx, tp[0] + 18, tp[1] + 14, 12, 6, '#3f8f5a');
  ellipse(ctx, tp[0], tp[1], 28, 22, '#357a4b');
  ellipse(ctx, tp[0], tp[1] - 5, 21, 12, '#57a86e');
  ellipse(ctx, tp[0] + 30, tp[1], 11, 9, '#3f8f5a');
  circle(ctx, tp[0] + 34, tp[1] - 2, 2, '#12331f');

  // 3. red-coral — a touch larger (1.0 -> 1.25)
  const rcS = changed.has('red-coral') ? 1.25 : 1;
  ctx.save();
  ctx.translate(60, 230);
  ctx.scale(rcS, rcS);
  ctx.strokeStyle = '#e0453f';
  ctx.lineCap = 'round';
  const rcArms = [[0, 22, 0, -26], [-4, 6, -20, -12], [-14, -6, -23, -23], [3, 4, 20, -9], [14, -4, 24, -22], [-2, 14, -9, 28], [5, 14, 11, 28]];
  for (let i = 0; i < rcArms.length; i++) {
    const a = rcArms[i];
    ctx.lineWidth = i === 0 ? 6 : 4;
    ctx.beginPath();
    ctx.moveTo(a[0], a[1]);
    ctx.quadraticCurveTo((a[0] + a[2]) / 2 - 3, (a[1] + a[3]) / 2, a[2], a[3]);
    ctx.stroke();
  }
  ctx.restore();

  // 4. giant-clam — base only
  if (!changed.has('giant-clam')) {
    ellipse(ctx, 250, 195, 24, 12, '#7a5f9a');
    ellipse(ctx, 250, 187, 22, 11, '#b49ad0');
    for (let k = -2; k <= 2; k++) {
      line(ctx, 250, 182, 250 + k * 9, 196, 'rgba(110,86,150,0.5)', 1.2);
    }
    circle(ctx, 250, 192, 5, '#f2eef8');
  }

  // 5. diver-mask — appears only when changed
  if (changed.has('diver-mask')) {
    line(ctx, 458, 222, 500, 214, '#3a4048', 4);
    rrect(ctx, 467, 207, 31, 23, 8, '#4a5460');
    rrect(ctx, 471, 211, 23, 15, 6, '#1d2a36');
    line(ctx, 495, 233, 502, 207, '#5a6470', 5);
    line(ctx, 502, 207, 493, 200, '#5a6470', 5);
  }

  // 6. starfish — rotated, spot rides along
  ctx.save();
  ctx.translate(150, 350);
  ctx.rotate((changed.has('starfish') ? 40 : 0) * Math.PI / 180);
  const sfPts = [];
  for (let i = 0; i < 10; i++) {
    const a = -Math.PI / 2 + i * Math.PI / 5;
    const rr = i % 2 === 0 ? 25 : 10;
    sfPts.push([Math.cos(a) * rr, Math.sin(a) * rr]);
  }
  poly(ctx, sfPts, '#f28a3c');
  circle(ctx, 6, -17, 3, '#ffffff');
  ctx.restore();

  // 7. air-bubbles — radius 4 -> 7
  const bubR = changed.has('air-bubbles') ? 7 : 4;
  circle(ctx, 325, 342, bubR, 'rgba(208,238,255,0.50)');
  circle(ctx, 335, 326, bubR * 0.85, 'rgba(208,238,255,0.45)');
  circle(ctx, 321, 312, bubR * 0.68, 'rgba(208,238,255,0.40)');

  // 8. treasure-chest — base only, half sunk
  if (!changed.has('treasure-chest')) {
    rrect(ctx, 446, 348, 48, 16, 6, '#8b5a2b');
    rrect(ctx, 446, 362, 48, 22, 4, '#a06a33');
    line(ctx, 470, 348, 470, 384, '#6b4520', 3);
    line(ctx, 446, 364, 494, 364, '#6b4520', 2);
    circle(ctx, 458, 379, 5, '#ffd35c');
    circle(ctx, 470, 382, 5, '#ffd35c');
    circle(ctx, 482, 379, 5, '#ffd35c');
    ellipse(ctx, 470, 392, 34, 10, '#e8d3a5');
  }
}
function drawSeaweed(ctx, x, baseY, h, color) {
  softShadow(ctx, x, baseY + 3, 15, 4);
  const blades = [
    { lean: -9, len: h * 0.76, w: 5 },
    { lean: 0, len: h, w: 6 },
    { lean: 9, len: h * 0.68, w: 5 }
  ];
  for (const b of blades) {
    const topY = baseY - b.len;
    ctx.save();
    ctx.lineCap = 'round';
    ctx.strokeStyle = color;
    ctx.lineWidth = b.w;
    ctx.beginPath();
    ctx.moveTo(x + b.lean * 0.15, baseY);
    ctx.quadraticCurveTo(x - b.lean * 1.6, baseY - b.len * 0.45, x + b.lean, topY);
    ctx.stroke();
    ctx.globalAlpha = 0.32;
    ctx.strokeStyle = '#dcf7c4';
    ctx.lineWidth = 1.7;
    ctx.beginPath();
    ctx.moveTo(x + b.lean * 0.15 - 1.6, baseY - 5);
    ctx.quadraticCurveTo(x - b.lean * 1.6 - 1.6, baseY - b.len * 0.45, x + b.lean - 1.4, topY + 5);
    ctx.stroke();
    ctx.restore();
  }
}

function drawBrainCoral(ctx, x, y, s) {
  softShadow(ctx, x, y + 3 * s, 32 * s, 8 * s);
  const dome = [['#f08ab0', 30], ['#e5779f', 23], ['#d96a94', 16]];
  for (const [fill, rx] of dome) {
    ctx.fillStyle = fill;
    ctx.beginPath();
    ctx.ellipse(x, y, rx * s, rx * 0.72 * s, 0, Math.PI, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  }
  ctx.fillStyle = '#c85a82';
  ctx.beginPath();
  ctx.ellipse(x, y, 31 * s, 4 * s, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.save();
  ctx.strokeStyle = '#c85a82';
  ctx.lineWidth = 2 * s;
  ctx.lineCap = 'round';
  for (let i = -2; i <= 2; i++) {
    const gx = x + i * 10 * s;
    const gy = y - (20 - Math.abs(i) * 3) * s;
    ctx.beginPath();
    ctx.moveTo(gx, gy);
    ctx.quadraticCurveTo(gx + 4 * s, gy + 8 * s, gx - 3 * s, gy + 14 * s);
    ctx.stroke();
  }
  ctx.restore();
}

function drawTubeCoral(ctx, x, y, s) {
  softShadow(ctx, x, y + 3, 26 * s, 6 * s);
  const tubes = [
    { dx: -18, hh: 26, w: 10, lean: -5 },
    { dx: -9, hh: 38, w: 12, lean: -2 },
    { dx: 0, hh: 44, w: 13, lean: 0 },
    { dx: 9, hh: 34, w: 11, lean: 2 },
    { dx: 18, hh: 27, w: 10, lean: 5 }
  ];
  for (const t of tubes) {
    const bx = x + t.dx * s;
    const w = t.w * s;
    const hh = t.hh * s;
    const tx = bx + t.lean * s;
    ctx.fillStyle = '#ff9e57';
    ctx.beginPath();
    ctx.moveTo(bx - w / 2, y);
    ctx.quadraticCurveTo(tx - w / 2, y - hh * 0.55, tx - w / 2, y - hh);
    ctx.lineTo(tx + w / 2, y - hh);
    ctx.quadraticCurveTo(bx + w / 2, y - hh * 0.55, bx + w / 2, y);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = '#e07f35';
    ctx.beginPath();
    ctx.ellipse(bx, y - 1, w * 0.46, 3 * s, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#ffc27d';
    ctx.beginPath();
    ctx.arc(tx, y - hh + 1, w * 0.4, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawRock(ctx, x, y, w, h) {
  softShadow(ctx, x, y + h * 0.44, w * 0.55, h * 0.17);
  ctx.fillStyle = '#8a7a66';
  ctx.beginPath();
  ctx.ellipse(x, y, w * 0.5, h * 0.5, 0, 0, Math.PI * 2);
  ctx.ellipse(x - w * 0.24, y + h * 0.06, w * 0.3, h * 0.36, 0, 0, Math.PI * 2);
  ctx.ellipse(x + w * 0.25, y + h * 0.04, w * 0.31, h * 0.38, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#6e6152';
  ctx.beginPath();
  ctx.ellipse(x, y + h * 0.33, w * 0.43, h * 0.19, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.save();
  ctx.strokeStyle = '#a89478';
  ctx.lineWidth = 2;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.ellipse(x, y + h * 0.02, w * 0.43, h * 0.42, 0, Math.PI * 1.14, Math.PI * 1.8);
  ctx.stroke();
  ctx.restore();
}

function drawShell(ctx, x, y, r) {
  softShadow(ctx, x, y + 2, r * 0.85, r * 0.2);
  ctx.fillStyle = '#f5e6d3';
  ctx.beginPath();
  ctx.ellipse(x, y, r, r * 0.86, 0, Math.PI, Math.PI * 2);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = '#e8c6a0';
  ctx.beginPath();
  ctx.ellipse(x, y, r * 0.34, r * 0.2, 0, Math.PI, Math.PI * 2);
  ctx.fill();
  ctx.save();
  ctx.strokeStyle = '#e8c6a0';
  ctx.lineWidth = 1.4;
  ctx.lineCap = 'round';
  for (let i = 0; i < 5; i++) {
    const a = Math.PI + (i + 1) * (Math.PI / 6);
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + Math.cos(a) * r * 0.94, y + Math.sin(a) * r * 0.8);
    ctx.stroke();
  }
  ctx.strokeStyle = '#d9b78f';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.ellipse(x, y, r, r * 0.86, 0, Math.PI, Math.PI * 2);
  ctx.stroke();
  ctx.restore();
}

function drawPebble(ctx, x, y, r) {
  softShadow(ctx, x, y + r * 0.55, r * 0.95, r * 0.26);
  ctx.fillStyle = '#b8ab98';
  ctx.beginPath();
  ctx.ellipse(x, y, r, r * 0.72, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#d6cbb6';
  ctx.beginPath();
  ctx.ellipse(x - r * 0.22, y - r * 0.26, r * 0.48, r * 0.3, -0.3, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#9c8f7c';
  ctx.beginPath();
  ctx.ellipse(x + r * 0.18, y + r * 0.32, r * 0.5, r * 0.18, 0, 0, Math.PI * 2);
  ctx.fill();
}

function drawAnemone(ctx, x, y, s) {
  softShadow(ctx, x, y + 2 * s, 14 * s, 4 * s);
  ctx.fillStyle = '#9d4edd';
  ctx.beginPath();
  ctx.ellipse(x, y, 13 * s, 5 * s, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#7a35b8';
  ctx.beginPath();
  ctx.ellipse(x, y + 1.5 * s, 12 * s, 3 * s, 0, 0, Math.PI * 2);
  ctx.fill();
  for (let i = 0; i < 9; i++) {
    const a = -Math.PI / 2 + (i - 4) * 0.27;
    const len = (17 + (i % 3) * 4) * s;
    const tx = x + Math.cos(a) * len * 1.35;
    const ty = y - 3 * s + Math.sin(a) * len;
    ctx.save();
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#c77dff';
    ctx.lineWidth = 3 * s;
    ctx.beginPath();
    ctx.moveTo(x, y - 2 * s);
    ctx.quadraticCurveTo(x + Math.cos(a) * len * 0.5, y - 2 * s + Math.sin(a) * len * 0.5, tx, ty);
    ctx.stroke();
    ctx.fillStyle = '#e0aaff';
    ctx.beginPath();
    ctx.arc(tx, ty, 1.9 * s, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

function drawUrchin(ctx, x, y, r) {
  softShadow(ctx, x, y + r * 0.9, r * 0.85, r * 0.24);
  ctx.save();
  ctx.lineCap = 'round';
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2 + 0.14;
    const ex = x + Math.cos(a) * r * 1.75;
    const ey = y + Math.sin(a) * r * 1.75;
    ctx.strokeStyle = '#4a3f9e';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x + Math.cos(a) * r * 0.7, y + Math.sin(a) * r * 0.7);
    ctx.lineTo(x + Math.cos(a) * r * 1.75, y + Math.sin(a) * r * 1.75);
    ctx.stroke();
    circle(ctx, x + Math.cos(a) * r * 1.75, y + Math.sin(a) * r * 1.75, 1.6, '#6c5ec4');
  }
  ctx.restore();

  circle(ctx, x, y, r * 0.75, '#3d348b');
  circle(ctx, x - r * 0.18, y - r * 0.2, r * 0.4, '#4a3f9e');
}

function drawSmallFish(ctx, x, y, s, alpha) {
  ctx.save();
  ctx.globalAlpha = alpha;
  ellipse(ctx, x, y, 11 * s, 5.5 * s, '#0a4f73');
  poly(ctx, [
    [x - 9.5 * s, y],
    [x - 18 * s, y - 5 * s],
    [x - 18 * s, y + 5 * s]
  ], '#0a4f73');
  ctx.restore();
}
