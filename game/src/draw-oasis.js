import { circle, ellipse, rect, rrect, poly, star, line, vgrad, text, check, ring, softShadow, vignette, speck } from './render.js';

export function drawOasis(ctx, changed) {
  // ---------- BACKGROUND: sky, sun, clouds, birds ----------
  const sky = vgrad(ctx, 0, 0, 560, 240, '#ffe3a3', '#ffb36b');
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, 560, 240);

  circle(ctx, 490, 70, 54, '#ffd98a');
  circle(ctx, 490, 70, 42, '#ffe9b5');
  circle(ctx, 490, 70, 30, '#fff6d8');

  const clouds = [[90, 60], [300, 35], [440, 40]];
  for (const [cx, cy] of clouds) {
    ellipse(ctx, cx - 20, cy, 26, 13, '#fffdf6');
    ellipse(ctx, cx + 16, cy + 3, 21, 10, '#fff6e4');
  }

  const birds = [[150, 90], [220, 70], [380, 100]];
  for (const [bx, by] of birds) {
    line(ctx, bx - 7, by - 2, bx, by + 4, '#8a5a24', 2);
    line(ctx, bx, by + 4, bx + 7, by - 2, '#8a5a24', 2);
  }

  // ---------- DISTANT DUNES ----------
  ellipse(ctx, -20, 300, 260, 70, '#e8b45c');
  ellipse(ctx, -20, 284, 232, 50, '#f2c879');
  ellipse(ctx, 560, 310, 260, 70, '#e8b45c');
  ellipse(ctx, 560, 294, 232, 50, '#f2c879');
  line(ctx, 30, 272, 210, 268, '#f7d79a', 3);
  line(ctx, 360, 282, 520, 276, '#f7d79a', 3);

  // distant camel silhouette, far away and small
  ellipse(ctx, 430, 180, 12, 6, '#c98f2e');
  circle(ctx, 424, 173, 5, '#c98f2e');
  circle(ctx, 437, 173, 5, '#c98f2e');
  line(ctx, 419, 178, 413, 167, '#c98f2e', 3);
  circle(ctx, 412, 165, 3, '#c98f2e');
  line(ctx, 425, 185, 425, 192, '#c98f2e', 2);
  line(ctx, 434, 185, 434, 192, '#c98f2e', 2);
  line(ctx, 442, 179, 449, 184, '#c98f2e', 2);

  // ---------- MIDGROUND: ground dunes ----------
  ellipse(ctx, 280, 390, 420, 130, '#f2c879');
  ellipse(ctx, 140, 350, 300, 90, '#e8b45c');
  ellipse(ctx, 420, 360, 280, 80, '#e8b45c');
  ellipse(ctx, 130, 330, 210, 14, '#e0aa52');
  ellipse(ctx, 300, 342, 190, 12, '#e0aa52');
  ellipse(ctx, 410, 384, 250, 16, '#e0aa52');

  // ---------- MIDGROUND: water pool ----------
  ellipse(ctx, 330, 255, 95, 52, '#4fc3e8');
  ellipse(ctx, 330, 255, 70, 36, '#7fd4ef');
  ellipse(ctx, 330, 262, 44, 18, '#a9e4f7');
  line(ctx, 296, 244, 320, 244, '#ffffff', 3);
  line(ctx, 350, 268, 368, 268, '#ffffff', 2);
  line(ctx, 250, 236, 268, 240, '#e8b45c', 3);
  line(ctx, 392, 286, 412, 290, '#e8b45c', 3);

  // reeds along the pool edge
  for (let i = 0; i < 6; i++) {
    const rx = 260 + i * 10;
    line(ctx, rx, 220, rx - 4, 250, '#3e9b4f', 3);
    circle(ctx, rx, 220, 3, '#7a5230');
  }

  // rocks at the pool edge
  drawRock(ctx, 240, 290);
  drawRock(ctx, 424, 284);

  // ---------- MIDGROUND: palms ----------
  drawPalm(ctx, 180, 120, '#3e9b4f', []);
  drawPalm(ctx, 520, 130, '#3e9b4f', []);

  // ---------- MIDGROUND: cacti, rocks, grass ----------
  drawCactus(ctx, 40, 200);
  drawCactus(ctx, 540, 300);
  drawRock(ctx, 60, 330);
  drawRock(ctx, 500, 340);
  drawRock(ctx, 230, 320);
  drawGrassTuft(ctx, 120, 300);
  drawGrassTuft(ctx, 200, 380);
  drawGrassTuft(ctx, 420, 390);
  drawGrassTuft(ctx, 520, 180);

  // dotted caravan trail curving toward the pool
  const trail = [
    [60, 400, 3], [94, 392, 3], [128, 380, 3], [162, 366, 3],
    [196, 352, 3], [230, 338, 3], [264, 322, 3], [298, 306, 3]
  ];
  speck(ctx, trail, '#d9b878');

  // ---- foreground ----
  ellipse(ctx, 100, 410, 60, 5, '#e0aa52');
  ellipse(ctx, 300, 415, 70, 5, '#e0aa52');
  ellipse(ctx, 480, 405, 50, 5, '#e0aa52');
  ellipse(ctx, 200, 395, 40, 4, '#e0aa52');

  // footprints near the trail end
  circle(ctx, 280, 320, 2, '#d9b878');
  circle(ctx, 285, 316, 2, '#d9b878');
  circle(ctx, 294, 311, 2, '#d9b878');
  circle(ctx, 299, 307, 2, '#d9b878');
  circle(ctx, 309, 303, 2, '#d9b878');
  circle(ctx, 314, 299, 2, '#d9b878');

  // warm light pool
  ellipse(ctx, 490, 120, 120, 50, 'rgba(255,220,150,0.08)');

  vignette(ctx, 560, 420);

  // ---- diffs ----
  // 1. palms recoloured
  drawPalm(ctx, 90, 100, '#3e9b4f', changed.has('palm-tree') ? [1, 3] : []);

  // 2. camel moved
  const camX = changed.has('camel') ? 364 : 300;
  const camY = changed.has('camel') ? 66 : 110;
  ctx.save();
  ctx.translate(camX, camY);
  ellipse(ctx, 0, 0, 24, 12, '#b08a5a');
  ellipse(ctx, -9, -11, 10, 9, '#b08a5a');
  ellipse(ctx, 8, -12, 10, 9, '#b08a5a');
  poly(ctx, [[16, -4], [24, -20], [31, -18], [24, 2]], '#b08a5a');
  ellipse(ctx, 31, -21, 7, 5, '#b08a5a');
  rect(ctx, 36, -22, 6, 4, '#a07a4c');
  rect(ctx, -12, -10, 22, 6, '#c0392b');
  rect(ctx, -6, -9, 4, 4, '#f0d64a');
  rect(ctx, -18, 10, 3, 14, '#8a6a42');
  rect(ctx, -8, 10, 3, 14, '#8a6a42');
  rect(ctx, 6, 10, 3, 14, '#8a6a42');
  rect(ctx, 16, 10, 3, 14, '#8a6a42');
  ctx.restore();

  // 3. sun resized
  const sunScale = changed.has('sun') ? 1.25 : 1;
  ctx.save();
  ctx.translate(490, 70);
  ctx.scale(sunScale, sunScale);
  for (let i = 0; i < 8; i++) {
    ctx.save();
    ctx.rotate((i * Math.PI) / 4);
    rect(ctx, -2, -34, 4, 10, '#ffd76e');
    ctx.restore();
  }
  circle(ctx, 0, 0, 22, '#ffd76e');
  ctx.restore();

  // 4. tent halves swapped
  const tentLeft = changed.has('tent') ? '#f7ead7' : '#c0392b';
  const tentRight = changed.has('tent') ? '#c0392b' : '#f7ead7';
  ctx.save();
  ctx.translate(80, 260);
  poly(ctx, [[-30, 16], [0, -22], [0, 16]], tentLeft);
  poly(ctx, [[0, 16], [0, -22], [30, 16]], tentRight);
  poly(ctx, [[-8, 16], [0, -2], [8, 16]], '#3a2a22');
  rect(ctx, -1, -34, 2, 54, '#8a6a42');
  poly(ctx, [[1, -34], [14, -29], [1, -24]], '#f0d64a');
  ctx.restore();

  // 5. water jug removed
  if (!changed.has('water-jug')) {
    ctx.save();
    ctx.translate(240, 250);
    ellipse(ctx, 0, 4, 12, 11, '#a9673e');
    rect(ctx, -5, -14, 10, 10, '#a9673e');
    ellipse(ctx, 0, -14, 6, 3, '#8a522f');
    ring(ctx, 13, 0, 6, '#8a522f', 2);
    ctx.restore();
  }

  // 6. wagon added
  if (changed.has('wagon')) {
    ctx.save();
    ctx.translate(470, 220);
    rect(ctx, -26, -6, 52, 14, '#7a5a3a');
    rect(ctx, -20, -18, 40, 12, '#8f6b45');
    rect(ctx, -20, -18, 40, 3, '#6b4d30');
    circle(ctx, -16, 12, 9, '#4a3520');
    circle(ctx, 16, 12, 9, '#4a3520');
    circle(ctx, -16, 12, 3, '#8f6b45');
    circle(ctx, 16, 12, 3, '#8f6b45');
    line(ctx, -25, 12, -7, 12, '#8f6b45', 1.5);
    line(ctx, -16, 3, -16, 21, '#8f6b45', 1.5);
    line(ctx, 7, 12, 25, 12, '#8f6b45', 1.5);
    line(ctx, 16, 3, 16, 21, '#8f6b45', 1.5);
    ctx.restore();
  }

  // 7. woven rug pattern
  ctx.save();
  ctx.translate(150, 370);
  rrect(ctx, -30, -14, 60, 28, 4, '#c0392b');
  rrect(ctx, -24, -10, 48, 20, 3, '#3f7fe0');
  if (changed.has('woven-rug')) {
    poly(ctx, [[-16, 0], [-10, -6], [-4, 0], [-10, 6]], '#f0d64a');
    poly(ctx, [[4, 0], [10, -6], [16, 0], [10, 6]], '#f0d64a');
  } else {
    line(ctx, -22, -5, 22, -5, '#c0392b', 2);
    line(ctx, -22, 0, 22, 0, '#c0392b', 2);
    line(ctx, -22, 5, 22, 5, '#c0392b', 2);
  }
  ctx.restore();

  // 8. falcon moved
  const falX = changed.has('falcon') ? 316 : 380;
  const falY = changed.has('falcon') ? 394 : 350;
  ctx.save();
  ctx.translate(falX, falY);
  ellipse(ctx, 0, 0, 14, 11, '#8a7a5a');
  ellipse(ctx, 8, -12, 7, 6, '#8a7a5a');
  poly(ctx, [[14, -13], [22, -10], [14, -7]], '#c9a227');
  ellipse(ctx, -2, 0, 9, 7, '#6b5a3a');
  rect(ctx, -4, 9, 2, 9, '#c9a227');
  rect(ctx, 4, 9, 2, 9, '#c9a227');
  ctx.restore();
}
function drawPalm(ctx, x, y, frondColor, orangeIdx) {
  ctx.strokeStyle = '#8a5a2b';
  ctx.lineWidth = 8;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(x, y + 32);
  ctx.quadraticCurveTo(x + 6, y, x + 2, y - 30);
  ctx.stroke();
  for (let i = 0; i < 5; i++) {
    const a = -Math.PI * (0.15 + i * 0.175);
    const tipX = x + 2 + Math.cos(a) * 34;
    const tipY = y - 30 + Math.sin(a) * 16;
    ctx.beginPath();
    ctx.moveTo(x + 2, y - 30);
    ctx.quadraticCurveTo(x + 2 + Math.cos(a) * 20, y - 30 + Math.sin(a) * 4, tipX, tipY);
    ctx.quadraticCurveTo(x + 2 + Math.cos(a) * 16, y - 30 + Math.sin(a) * 12, x + 2, y - 30);
    ctx.fillStyle = orangeIdx.includes(i) ? '#e07b39' : frondColor;
    ctx.fill();
  }
  circle(ctx, x - 4, y - 24, 5, '#6b4226');
  circle(ctx, x + 6, y - 22, 5, '#6b4226');
}

function drawCactus(ctx, x, y) {
  softShadow(ctx, x, y + 16, 14, 4);
  rrect(ctx, x - 5, y - 18, 10, 34, 5, '#3e9b4f');
  rrect(ctx, x - 14, y - 8, 8, 14, 4, '#3e9b4f');
  rect(ctx, x - 14, y - 2, 10, 6, '#3e9b4f');
  rrect(ctx, x + 6, y - 12, 8, 16, 4, '#357f43');
  rect(ctx, x + 4, y - 2, 10, 6, '#357f43');
  circle(ctx, x - 2, y - 10, 1, '#7fbf8a');
  circle(ctx, x + 1, y, 1, '#7fbf8a');
  circle(ctx, x - 1, y + 8, 1, '#7fbf8a');
}

function drawRock(ctx, x, y) {
  softShadow(ctx, x, y + 5, 13, 3.5);
  ellipse(ctx, x, y, 13, 9, '#9a9a9a');
  ellipse(ctx, x - 3, y - 3, 9, 6, '#c2c2c2');
  ellipse(ctx, x + 6, y + 2, 4.5, 3, '#b0b0b0');
}

function drawGrassTuft(ctx, x, y) {
  const tips = [
    [x - 10, y - 12],
    [x - 5, y - 15],
    [x, y - 16],
    [x + 5, y - 15],
    [x + 10, y - 12]
  ];
  for (let i = 0; i < tips.length; i++) {
    line(ctx, x, y, tips[i][0], tips[i][1], i % 2 === 0 ? '#3e9b4f' : '#5c8f4f', 2);
  }
}
