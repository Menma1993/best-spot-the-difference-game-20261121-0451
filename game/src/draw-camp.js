import { circle, ellipse, rect, rrect, poly, star, line, vgrad, text, check, ring, softShadow, vignette, speck } from './render.js';

export function drawCamp(ctx, changed) {
  // ---------- BACKGROUND ----------
  // dusk sky
  const sky = ctx.createLinearGradient(0, 0, 0, 240);
  sky.addColorStop(0, '#f7b267');
  sky.addColorStop(0.5, '#c97b84');
  sky.addColorStop(1, '#3d5a80');
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, 560, 240);

  // fixed stars
  const stars = [
    [30, 20], [80, 42], [140, 15], [205, 50], [260, 24], [320, 60],
    [378, 18], [422, 46], [482, 14], [522, 56], [60, 72], [360, 80]
  ];
  stars.forEach(([x, y]) => circle(ctx, x, y, 1.4, 'rgba(255,255,255,0.8)'));

  // distant treeline silhouette, varied heights and lean
  const treeline = [
    [10, 35, 0], [45, 50, 3], [80, 40, -2], [115, 55, 0], [150, 32, 4],
    [185, 48, -3], [220, 38, 0], [255, 52, 2], [290, 34, 0], [325, 46, -4],
    [360, 40, 0], [395, 55, 3], [430, 36, -2], [465, 50, 0], [500, 42, 4],
    [535, 33, 0]
  ];
  treeline.forEach(([x, h, lean]) => {
    poly(ctx, [[x - 8, 240], [x + 8, 240], [x + lean, 240 - h]], '#2b3a4a');
  });

  // lake
  const lake = ctx.createLinearGradient(0, 240, 0, 310);
  lake.addColorStop(0, '#7fa8c9');
  lake.addColorStop(1, '#4a7a9e');
  ctx.fillStyle = lake;
  ctx.fillRect(0, 240, 560, 70);
  rect(ctx, 90, 254, 180, 2, 'rgba(255,255,255,0.12)');
  rect(ctx, 220, 270, 220, 2, 'rgba(255,255,255,0.12)');
  rect(ctx, 120, 290, 260, 2, 'rgba(255,255,255,0.12)');

  // shore
  rect(ctx, 0, 310, 560, 20, '#e8dcc0');

  // ---------- MIDGROUND ----------
  // grass field
  rect(ctx, 0, 330, 560, 90, '#5a8f3e');
  rect(ctx, 0, 405, 560, 15, '#4a7a32');

  // fire-pit stone ring (decor only, fire itself is a diff in part 2)
  for (let i = 0; i < 8; i++) {
    const a = (i * Math.PI) / 4;
    const sx = 270 + 22 * Math.cos(a);
    const sy = 315 + 14 * Math.sin(a);
    circle(ctx, sx, sy, 4, '#8a8a8a');
  }

  // log seats
  drawLogSeat(ctx, 180, 335);
  drawLogSeat(ctx, 365, 340);

  // stump
  drawStump(ctx, 90, 345);

  // bushes
  drawBush(ctx, 55, 305);
  drawBush(ctx, 505, 312);
  drawBush(ctx, 425, 345);

  // mushrooms
  drawMushroom(ctx, 140, 385);
  drawMushroom(ctx, 230, 400);
  drawMushroom(ctx, 340, 390);
  drawMushroom(ctx, 470, 400);

  // midground pines, varied height and green
  drawPine(ctx, 40, 285, 70, '#3a6b2e');
  drawPine(ctx, 120, 275, 58, '#356528');
  drawPine(ctx, 200, 288, 66, '#3f7030');
  drawPine(ctx, 330, 278, 62, '#386b2a');
  drawPine(ctx, 450, 288, 70, '#3c6d2f');

  // scattered stones
  drawStone(ctx, 250, 380);
  drawStone(ctx, 320, 405);
  drawStone(ctx, 520, 390);

  // fireflies
  speck(ctx, [[90, 180, 2], [200, 150, 2], [350, 170, 2], [450, 140, 2], [520, 200, 2]], '#ffe66d');

  // fern tufts, bottom corners
  line(ctx, 15, 418, 5, 395, '#2f5a22', 2);
  line(ctx, 15, 418, 20, 390, '#2f5a22', 2);
  line(ctx, 15, 418, 30, 400, '#2f5a22', 2);
  line(ctx, 545, 418, 555, 395, '#2f5a22', 2);
  line(ctx, 545, 418, 530, 390, '#2f5a22', 2);
  line(ctx, 545, 418, 520, 400, '#2f5a22', 2);

  const needleL = (x, y, s) => poly(ctx, [[x, y], [x + s, y - s * 0.5], [x + s * 1.35, y + s * 0.4], [x + s * 0.45, y + s * 0.35]], '#1d3a24');
  const needleR = (x, y, s) => poly(ctx, [[x, y], [x - s, y - s * 0.5], [x - s * 1.35, y + s * 0.4], [x - s * 0.45, y + s * 0.35]], '#1d3a24');
  line(ctx, -10, 14, 104, 62, '#1d3a24', 6);
  line(ctx, -10, 52, 92, 96, '#1d3a24', 5);
  line(ctx, 570, 14, 456, 62, '#1d3a24', 6);
  line(ctx, 570, 52, 468, 96, '#1d3a24', 5);
  for (const [x, y, s] of [[14, 24, 18], [38, 34, 20], [62, 44, 16], [18, 60, 15], [42, 72, 17], [64, 84, 14]]) needleL(x, y, s);
  for (const [x, y, s] of [[546, 24, 18], [522, 34, 20], [498, 44, 16], [542, 60, 15], [518, 72, 17], [496, 84, 14]]) needleR(x, y, s);
  for (const gx of [60, 200, 380, 520]) {
    line(ctx, gx, 420, gx - 9, 398, '#16281a', 2.5);
    line(ctx, gx, 420, gx + 1, 392, '#16281a', 2.5);
    line(ctx, gx, 420, gx + 10, 400, '#16281a', 2.5);
  }
  ellipse(ctx, 270, 300, 120, 120, 'rgba(255,150,60,0.05)');
  ellipse(ctx, 270, 300, 90, 90, 'rgba(255,150,60,0.07)');
  ellipse(ctx, 270, 300, 60, 60, 'rgba(255,150,60,0.10)');
  vignette(ctx, 560, 420);

  // moon — crescent identical, craters differ
  ctx.save();
  ctx.beginPath();
  ctx.arc(300, 50, 26, 0, Math.PI * 2);
  ctx.arc(312, 42, 22, 0, Math.PI * 2);
  ctx.fillStyle = '#fff3b0';
  ctx.fill('evenodd');
  ctx.restore();
  if (changed.has('moon')) {
    circle(ctx, 283, 52, 2.4, '#e8d88a');
    circle(ctx, 290, 66, 2.2, '#e8d88a');
    circle(ctx, 296, 74, 1.8, '#e8d88a');
  } else {
    circle(ctx, 288, 58, 2.4, '#e8d88a');
    circle(ctx, 296, 68, 2.2, '#e8d88a');
  }

  // tent — body constant, stripes + flap recolour
  const tentBlue = changed.has('tent');
  poly(ctx, [[110, 91], [144, 146], [76, 146]], '#e4572e');
  line(ctx, 110, 96, 90, 146, tentBlue ? '#3a86ff' : '#b8431f', 4);
  line(ctx, 110, 96, 130, 146, tentBlue ? '#3a86ff' : '#b8431f', 4);
  line(ctx, 110, 96, 110, 146, '#7a2a12', 1.5);
  poly(ctx, [[110, 122], [122, 146], [98, 146]], tentBlue ? '#3a86ff' : '#8a2f13');

  // pine-tree — one among many
  if (!changed.has('pine-tree')) drawPine(ctx, 520, 278, 56, '#2f5d3a');

  // owl — mirrored
  line(ctx, 430, 104, 492, 100, '#4a3222', 5);
  ctx.save();
  ctx.translate(460, 90);
  if (changed.has('owl')) ctx.scale(-1, 1);
  ellipse(ctx, 0, 0, 15, 20, '#8a5a34');
  poly(ctx, [[-12, -15], [-7, -26], [-3, -14]], '#6b4526');
  poly(ctx, [[12, -15], [7, -26], [3, -14]], '#6b4526');
  ellipse(ctx, 4, 9, 10, 8, '#6b4526');
  circle(ctx, -6, -6, 5, '#fdf6e3');
  circle(ctx, 6, -6, 5, '#fdf6e3');
  circle(ctx, -6, -6, 2.2, '#241a12');
  circle(ctx, 6, -6, 2.2, '#241a12');
  poly(ctx, [[2, -1], [-6, 4], [2, 9]], '#f4a259');
  ctx.restore();

  // lantern — only when changed, muted glow
  if (changed.has('lantern')) {
    ellipse(ctx, 390, 200, 26, 26, 'rgba(255,200,120,0.06)');
    line(ctx, 390, 176, 390, 184, '#3a2a1c', 2);
    rrect(ctx, 378, 184, 24, 32, 5, '#4a3624');
    rect(ctx, 382, 190, 16, 20, '#e8b84b');
    line(ctx, 390, 186, 390, 214, '#4a3624', 1.5);
  }

  // campfire — flame subtly taller
  const flameH = changed.has('campfire') ? 34 : 26;
  ctx.save();
  ctx.translate(270, 308);
  ctx.rotate(-0.18);
  rect(ctx, -26, -4, 52, 8, '#6b3f22');
  ctx.restore();
  ctx.save();
  ctx.translate(270, 308);
  ctx.rotate(0.18);
  rect(ctx, -26, -4, 52, 8, '#5a341c');
  ctx.restore();
  poly(ctx, [[257, 306], [263, 306 - flameH * 0.7], [270, 306 - flameH], [277, 306 - flameH * 0.7], [283, 306]], '#f2762e');
  poly(ctx, [[263, 306], [270, 306 - flameH * 0.58], [277, 306]], '#ffd166');

  // marshmallow-stick — one of two positions
  const sm = changed.has('marshmallow-stick');
  const sx = sm ? 214 : 150;
  const sy = sm ? 216 : 260;
  line(ctx, sx - 20, sy + 14, sx + 18, sy - 12, '#7a5230', 3);
  circle(ctx, sx + 3, sy + 2, 5, '#fdfaf0');
  circle(ctx, sx + 12, sy - 3, 5, '#fdfaf0');

  // backpack — slightly smaller
  const bp = changed.has('backpack') ? 0.8 : 1;
  ctx.save();
  ctx.translate(60, 370);
  ctx.scale(bp, bp);
  rrect(ctx, -18, -20, 36, 40, 7, '#c0392b');
  rrect(ctx, -18, -20, 36, 14, 6, '#8e2418');
  line(ctx, -11, -20, -11, 6, '#8e2418', 3);
  line(ctx, 11, -20, 11, 6, '#8e2418', 3);
  rect(ctx, -6, -15, 12, 5, '#5a1610');
  ctx.restore();
}
function drawPine(ctx, x, baseY, h, color) {
  softShadow(ctx, x, baseY, h * 0.24, h * 0.07);
  rect(ctx, x - 3, baseY - h * 0.24, 6, h * 0.24, '#6b4226');
  const w = h * 0.3;
  poly(ctx, [[x, baseY - h * 0.62], [x - w * 1.5, baseY - h * 0.04], [x + w * 1.5, baseY - h * 0.04]], color);
  poly(ctx, [[x, baseY - h * 0.82], [x - w * 1.15, baseY - h * 0.3], [x + w * 1.15, baseY - h * 0.3]], color);
  poly(ctx, [[x, baseY - h], [x - w * 0.78, baseY - h * 0.56], [x + w * 0.78, baseY - h * 0.56]], color);
  ctx.globalAlpha = 0.14;
  poly(ctx, [[x, baseY - h], [x - w * 0.42, baseY - h * 0.6], [x + w * 0.16, baseY - h * 0.6]], '#ffffff');
  ctx.globalAlpha = 1;
}

function drawBush(ctx, x, y) {
  softShadow(ctx, x, y + 9, 20, 6);
  circle(ctx, x - 11, y + 2, 11, '#356528');
  circle(ctx, x + 11, y + 2, 11, '#356528');
  circle(ctx, x, y - 4, 14, '#3f7030');
  circle(ctx, x - 4, y - 7, 9, '#4a7a32');
  circle(ctx, x - 8, y - 10, 2.2, '#6a9e4f');
  circle(ctx, x + 1, y - 14, 2.2, '#6a9e4f');
  circle(ctx, x + 9, y - 7, 2.2, '#6a9e4f');
}

function drawMushroom(ctx, x, y) {
  softShadow(ctx, x, y + 2, 10, 3);
  rrect(ctx, x - 3, y - 9, 6, 11, 3, '#e8dcc0');
  ellipse(ctx, x, y - 8, 11, 7.5, '#d64545');
  rect(ctx, x - 11, y - 8, 22, 2.5, '#d64545');
  circle(ctx, x - 5, y - 10, 1.8, '#ffffff');
  circle(ctx, x + 3, y - 12, 1.8, '#ffffff');
  circle(ctx, x + 7, y - 8, 1.6, '#ffffff');
}

function drawLogSeat(ctx, x, y) {
  softShadow(ctx, x, y + 9, 36, 5);
  rrect(ctx, x - 35, y - 7, 70, 14, 7, '#7a5230');
  line(ctx, x - 30, y - 3, x + 30, y - 3, '#a9744f', 2);
  circle(ctx, x - 35, y, 7, '#5a341c');
  circle(ctx, x - 35, y, 3, '#a9744f');
  circle(ctx, x + 35, y, 7, '#5a341c');
  circle(ctx, x + 35, y, 3, '#a9744f');
}

function drawStump(ctx, x, y) {
  softShadow(ctx, x, y + 11, 22, 5);
  rect(ctx, x - 18, y - 11, 36, 22, '#6b4226');
  ellipse(ctx, x, y - 11, 18, 6, '#c9a06a');
  ring(ctx, x, y - 11, 11, '#8a6a42');
  ring(ctx, x, y - 11, 6, '#8a6a42');
  ellipse(ctx, x - 7, y - 11, 4, 2, '#a9744f');
}

function drawStone(ctx, x, y) {
  softShadow(ctx, x, y + 6, 15, 4);
  ellipse(ctx, x, y, 13, 9, '#9a9a9a');
  ellipse(ctx, x - 3, y - 3, 9, 6, '#c2c2c2');
  ellipse(ctx, x + 6, y + 2, 4.5, 3, '#b0b0b0');
}
