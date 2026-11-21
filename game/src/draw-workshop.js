import { circle, ellipse, rect, rrect, poly, star, line, vgrad, text, check, ring, softShadow, vignette, speck } from './render.js';

export function drawWorkshop(ctx, changed) {
  // ---------- BACKGROUND : wall ----------
  rect(ctx, 0, 0, 560, 420, '#ffe8a3');
  const wallDots = [];
  for (let wy = 20; wy < 300; wy += 40) {
    for (let wx = 20; wx < 560; wx += 40) wallDots.push([wx, wy, 1.6]);
  }
  speck(ctx, wallDots, '#f0d48c');
  rect(ctx, 0, 0, 560, 10, '#e9cf8a');
  rect(ctx, 0, 292, 560, 8, '#f0d48c');

  // ---------- MIDGROUND : pegboard + hanging tools ----------
  softShadow(ctx, 100, 160, 84, 8);
  rrect(ctx, 20, 20, 160, 140, 10, '#f3d48c');
  rect(ctx, 20, 20, 160, 8, '#f7dfa2');
  const holes = [];
  for (let hy = 36; hy <= 148; hy += 24) {
    for (let hx = 36; hx <= 172; hx += 24) holes.push([hx, hy, 2]);
  }
  speck(ctx, holes, '#d9ad5f');
  drawHammer(ctx, 60, 60);
  drawWrench(ctx, 110, 55);
  drawSaw(ctx, 150, 100);

  // ---------- MIDGROUND : window ----------
  rect(ctx, 200, 15, 90, 80, '#cfefff');
  circle(ctx, 275, 35, 10, '#ffd95e');
  ring(ctx, 275, 35, 14, '#ffeaa6', 2);
  ellipse(ctx, 231, 34, 14, 8, '#ffffff');
  ellipse(ctx, 241, 32, 10, 7, '#ffffff');
  poly(ctx, [[200, 84], [224, 62], [248, 84]], '#8ecf6a');
  poly(ctx, [[242, 86], [266, 60], [290, 86]], '#6fb84f');
  rect(ctx, 200, 84, 90, 11, '#8ecf6a');
  const wf = '#8a5a30';
  line(ctx, 200, 15, 290, 15, wf, 4);
  line(ctx, 200, 95, 290, 95, wf, 4);
  line(ctx, 200, 15, 200, 95, wf, 4);
  line(ctx, 290, 15, 290, 95, wf, 4);
  line(ctx, 245, 15, 245, 95, wf, 3);
  line(ctx, 200, 55, 290, 55, wf, 3);
  rect(ctx, 194, 95, 102, 7, '#8a5a30');
  rect(ctx, 194, 95, 102, 2, '#a5713c');

  // ---------- MIDGROUND : shelves ----------
  softShadow(ctx, 280, 74, 300, 9);
  rect(ctx, 0, 60, 560, 10, '#8a5a30');
  rect(ctx, 0, 60, 560, 3, '#a5713c');
  softShadow(ctx, 280, 184, 300, 9);
  rect(ctx, 0, 170, 560, 10, '#8a5a30');
  rect(ctx, 0, 170, 560, 3, '#a5713c');

  softShadow(ctx, 100, 124, 92, 7);
  rect(ctx, 20, 110, 160, 10, '#8a5a30');
  rect(ctx, 20, 110, 160, 3, '#a5713c');
  softShadow(ctx, 95, 288, 84, 7);
  rect(ctx, 20, 274, 150, 10, '#8a5a30');
  rect(ctx, 20, 274, 150, 3, '#a5713c');
  softShadow(ctx, 290, 252, 58, 7);
  rect(ctx, 240, 238, 100, 10, '#8a5a30');
  rect(ctx, 240, 238, 100, 3, '#a5713c');
  softShadow(ctx, 505, 136, 42, 6);
  rect(ctx, 470, 124, 70, 8, '#8a5a30');
  rect(ctx, 470, 124, 70, 2, '#a5713c');

  // ---------- MIDGROUND : shelf contents ----------
  drawPaintCan(ctx, 330, 50, '#c0392b');
  drawPaintCan(ctx, 365, 50, '#3f9d54');
  drawPaintCan(ctx, 400, 50, '#3d6fc4');
  drawPaintCan(ctx, 435, 50, '#e8b62c');

  drawPaintCan(ctx, 40, 158, '#bfe6f0');
  drawPaintCan(ctx, 75, 158, '#f0d6e6');
  drawPaintCan(ctx, 110, 158, '#d8f0c0');

  drawBlock(ctx, 200, 158, '#e8453c');
  drawBlock(ctx, 228, 158, '#f2a03d');
  drawBlock(ctx, 256, 158, '#f5d341');
  drawBlock(ctx, 284, 158, '#6fb84f');
  drawBlock(ctx, 312, 158, '#4a90d9');

  // ---------- MIDGROUND : workbench ----------
  rect(ctx, 0, 300, 560, 20, '#8a5a30');
  rect(ctx, 0, 300, 560, 5, '#a5713c');
  rect(ctx, 0, 320, 560, 100, '#b07a45');
  rect(ctx, 0, 320, 560, 6, '#9c6639');
  line(ctx, 140, 330, 140, 420, '#9c6639', 3);
  line(ctx, 280, 330, 280, 420, '#9c6639', 3);
  line(ctx, 420, 330, 420, 420, '#9c6639', 3);

  const shavings = [[40, 308], [96, 314], [152, 306], [214, 313], [272, 308], [338, 315], [402, 307], [468, 313]];
  for (let i = 0; i < shavings.length; i++) {
    ellipse(ctx, shavings[i][0], shavings[i][1], 6, 2.5, '#d9ad5f');
  }

  rect(ctx, 420, 290, 20, 30, '#bfe6f0');
  rect(ctx, 448, 285, 20, 35, '#f0d6e6');
  rect(ctx, 424, 294, 3, 22, '#ffffff');
  rect(ctx, 452, 289, 3, 26, '#ffffff');
  drawBrushJar(ctx, 500, 288);

  rrect(ctx, 330, 290, 50, 20, 4, '#c0392b');
  rect(ctx, 330, 290, 50, 4, '#d9584a');
  ring(ctx, 355, 292, 9, '#8f2b20', 3);
  circle(ctx, 342, 300, 2, '#f2c14e');
  circle(ctx, 368, 300, 2, '#f2c14e');

  // foreground: warm light pool over the train/top area
  ellipse(ctx, 280, 360, 180, 40, 'rgba(255,240,200,0.08)');
  softShadow(ctx, 140, 386, 60, 8);
  softShadow(ctx, 350, 372, 24, 6);
  vignette(ctx, 560, 420);

  // 1. rocking-horse (resized) - shelf y=110
  ctx.save();
  ctx.translate(100, 90);
  const hs = changed.has('rocking-horse') ? 1.25 : 1;
  ctx.scale(hs, hs);
  poly(ctx, [[-20, 14], [20, 14], [16, 20], [-16, 20]], '#5a3a1b');
  line(ctx, -10, 10, -10, 16, '#5a3a1b', 3);
  line(ctx, 10, 10, 10, 16, '#5a3a1b', 3);
  ellipse(ctx, 0, 2, 16, 9, '#8b5a2b');
  circle(ctx, 15, -7, 7, '#8b5a2b');
  line(ctx, 14, -13, 8, -5, '#5a3a1b', 2);
  line(ctx, 17, -13, 12, -4, '#5a3a1b', 2);
  ctx.restore();

  // 2. paint-tins (pattern)
  rect(ctx, 287, 70, 26, 16, '#e0463f');
  rect(ctx, 287, 70, 26, 3, '#ffffff');
  rect(ctx, 287, 54, 26, 16, '#3fae55');
  rect(ctx, 287, 54, 26, 3, '#ffffff');
  rect(ctx, 287, 38, 26, 16, '#3f7fe0');
  rect(ctx, 287, 38, 26, 3, '#ffffff');
  if (changed.has('paint-tins')) {
    line(ctx, 287, 62, 293, 66, '#2a6b3a', 2);
    line(ctx, 293, 66, 300, 62, '#2a6b3a', 2);
    line(ctx, 300, 62, 307, 66, '#2a6b3a', 2);
    line(ctx, 307, 66, 313, 62, '#2a6b3a', 2);
    circle(ctx, 295, 45, 1.4, '#ffffff');
    circle(ctx, 300, 45, 1.4, '#ffffff');
    circle(ctx, 305, 45, 1.4, '#ffffff');
  }

  // 3. teddy-bear (moved)
  const tbX = changed.has('teddy-bear') ? 436 : 500;
  const tbY = changed.has('teddy-bear') ? 154 : 110;
  ctx.save();
  ctx.translate(tbX, tbY);
  circle(ctx, -8, -6, 5, '#8b5a2b');
  circle(ctx, 8, -6, 5, '#8b5a2b');
  circle(ctx, 0, -2, 10, '#9c6b3a');
  ellipse(ctx, 0, 12, 11, 9, '#9c6b3a');
  ellipse(ctx, -11, 10, 4, 6, '#9c6b3a');
  ellipse(ctx, 11, 10, 4, 6, '#9c6b3a');
  circle(ctx, -3, -4, 1.1, '#2a1a0a');
  circle(ctx, 3, -4, 1.1, '#2a1a0a');
  circle(ctx, 0, 0, 1.3, '#2a1a0a');
  ctx.restore();

  // 4. dollhouse (removed)
  if (!changed.has('dollhouse')) {
    rect(ctx, 72, 260, 36, 14, '#e08fb0');
    poly(ctx, [[70, 260], [108, 260], [90, 246]], '#c0392b');
    rect(ctx, 86, 266, 8, 8, '#8b4a2b');
    rect(ctx, 76, 264, 6, 6, '#ffffff');
    rect(ctx, 96, 264, 6, 6, '#ffffff');
  }

  // 5. robot (flipped)
  ctx.save();
  ctx.translate(280, 238);
  if (changed.has('robot')) ctx.scale(-1, 1);
  rect(ctx, -10, -24, 20, 24, '#9aa0a6');
  rect(ctx, -8, -34, 16, 10, '#b0b6bc');
  circle(ctx, -4, -29, 1.6, '#263238');
  circle(ctx, 4, -29, 1.6, '#263238');
  line(ctx, 0, -34, 0, -40, '#6b7076', 2);
  circle(ctx, 0, -41, 2, '#d9453f');
  rect(ctx, -5, -18, 10, 8, '#5c6166');
  line(ctx, 10, -20, 17, -14, '#9aa0a6', 4);
  rect(ctx, -9, 0, 6, 8, '#5c6166');
  rect(ctx, 3, 0, 6, 8, '#5c6166');
  ctx.restore();

  // 6. kite (added)
  if (changed.has('kite')) {
    poly(ctx, [[500, 230], [516, 250], [500, 250]], '#6c8fbf');
    poly(ctx, [[500, 230], [484, 250], [500, 250]], '#c9b25a');
    poly(ctx, [[500, 250], [516, 250], [500, 272]], '#b0564f');
    poly(ctx, [[500, 250], [484, 250], [500, 272]], '#7a9a6b');
    line(ctx, 484, 250, 516, 250, '#ffffff', 1);
    line(ctx, 500, 230, 500, 272, '#ffffff', 1);
    line(ctx, 500, 272, 500, 300, '#9a9a9a', 1);
    circle(ctx, 500, 284, 2, '#b0564f');
    circle(ctx, 500, 292, 2, '#6c8fbf');
    circle(ctx, 500, 300, 2, '#c9b25a');
  }

  // 7. toy-train (resized)
  ctx.save();
  ctx.translate(140, 360);
  const ts = changed.has('toy-train') ? 0.8 : 1;
  ctx.scale(ts, ts);
  rrect(ctx, -40, -20, 36, 24, 4, '#d0453f');
  rect(ctx, -28, -40, 14, 20, '#d0453f');
  rect(ctx, -28, -40, 14, 6, '#2b2b2b');
  rrect(ctx, 0, -14, 32, 18, 4, '#3f6fd0');
  rrect(ctx, 40, -14, 32, 18, 4, '#e0c23f');
  circle(ctx, -34, 6, 8, '#2b2b2b');
  circle(ctx, -14, 6, 8, '#2b2b2b');
  circle(ctx, 6, 6, 8, '#2b2b2b');
  circle(ctx, 26, 6, 8, '#2b2b2b');
  circle(ctx, 46, 6, 8, '#2b2b2b');
  circle(ctx, 66, 6, 8, '#2b2b2b');
  ctx.restore();

  // 8. spinning-top (flipped)
  ctx.save();
  poly(ctx, [[332, 340], [368, 340], [350, 370]], '#f0d64a');
  const dir = changed.has('spinning-top') ? -1 : 1;
  for (let i = -1; i <= 1; i++) {
    line(ctx, 350 + i * 10, 340, 350 + i * 10 + dir * 8, 364, '#e0463f', 2);
  }
  rect(ctx, 348, 328, 4, 12, '#8a5a30');
  circle(ctx, 350, 326, 3, '#e0463f');
  ctx.restore();
}
function drawHammer(ctx, x, y) {
  line(ctx, x - 4, y + 18, x + 2, y - 6, '#8a5a30', 5);
  rrect(ctx, x - 8, y - 14, 22, 10, 2, '#9aa0a6');
  poly(ctx, [[x + 14, y - 14], [x + 20, y - 10], [x + 14, y - 6]], '#9aa0a6');
}

function drawWrench(ctx, x, y) {
  line(ctx, x, y + 16, x, y - 8, '#8a8f98', 6);
  circle(ctx, x, y - 12, 7, '#8a8f98');
  rect(ctx, x - 2, y - 22, 4, 6, '#f3d48c');
  circle(ctx, x, y + 18, 5, '#8a8f98');
}

function drawSaw(ctx, x, y) {
  rrect(ctx, x - 14, y - 6, 10, 16, 3, '#8a5a30');
  poly(ctx, [[x - 4, y - 10], [x + 22, y - 4], [x + 22, y + 6], [x - 4, y + 10]], '#c0c6cc');
  line(ctx, x - 2, y + 9, x + 6, y + 5, '#8a8f98', 1);
  line(ctx, x + 6, y + 5, x + 14, y + 7, '#8a8f98', 1);
  line(ctx, x + 14, y + 7, x + 21, y + 5, '#8a8f98', 1);
  line(ctx, x - 3, y - 9, x + 21, y - 3, '#e8ecef', 1);
}

function drawPaintCan(ctx, x, y, color) {
  rrect(ctx, x - 13, y - 8, 26, 18, 3, color);
  rect(ctx, x - 13, y - 11, 26, 4, '#d8d8d8');
  rect(ctx, x - 10, y - 5, 3, 14, 'rgba(255,255,255,0.35)');
  ctx.save();
  ctx.globalAlpha = 0.8;
  ellipse(ctx, x + 6, y + 10, 2.5, 4, color);
  ctx.restore();
}

function drawBlock(ctx, x, y, color) {
  rect(ctx, x - 11, y - 10, 22, 22, color);
  rect(ctx, x - 8, y - 7, 16, 16, 'rgba(255,255,255,0.25)');
  star(ctx, x, y + 1, 5, 5, '#ffffff');
}

function drawBrushJar(ctx, x, y) {
  rrect(ctx, x - 11, y - 4, 22, 16, 3, '#bfe6f0');
  line(ctx, x - 6, y - 2, x - 8, y - 20, '#8a5a30', 3);
  line(ctx, x, y - 2, x + 1, y - 24, '#c96a3f', 3);
  line(ctx, x + 6, y - 2, x + 9, y - 18, '#3f7fe0', 3);
  circle(ctx, x - 8, y - 20, 2.5, '#6e4423');
  circle(ctx, x + 1, y - 24, 2.5, '#a4502b');
  circle(ctx, x + 9, y - 18, 2.5, '#2c5fb8');
}
