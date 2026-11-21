import { circle, ellipse, rect, rrect, poly, star, line, vgrad, text, check, ring, softShadow, vignette, speck } from './render.js';

export function drawLodge(ctx, changed) {
  // ===== BACKGROUND =====
  rect(ctx, 0, 0, 560, 420, '#c98f5f');

  for (let y = 40; y < 420; y += 46) {
    line(ctx, 0, y, 560, y, '#a5713f', 2);
  }

  const g = vgrad(ctx, 0, 0, 560, 420, 'rgba(255,255,255,0.06)', 'rgba(90,50,20,0.12)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 560, 420);

  const knots = [[60, 300], [500, 200], [330, 40]];
  for (const [kx, ky] of knots) {
    circle(ctx, kx, ky, 6, '#5a3a1a');
    ring(ctx, kx, ky, 9, '#3f2912', 2);
  }

  ctx.strokeStyle = '#2f5d3a';
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.moveTo(0, 12);
  ctx.quadraticCurveTo(280, 44, 560, 12);
  ctx.stroke();

  const ox = [40, 110, 180, 250, 320, 390, 460, 530];
  for (const x of ox) {
    const gy = 12 + Math.sin(x / 560 * Math.PI) * 26;
    circle(ctx, x, gy, 7, '#c0392b');
  }
  for (let i = 0; i < ox.length - 1; i++) {
    const mx = (ox[i] + ox[i + 1]) / 2 + 6;
    const my = 12 + Math.sin(mx / 560 * Math.PI) * 26 + 4;
    circle(ctx, mx, my, 5, '#d4af37');
  }

  // ===== MIDGROUND =====
  // window
  rect(ctx, 380, 60, 150, 120, '#bfe4f5');
  drawSnowPine(ctx, 425, 150);
  drawSnowPine(ctx, 465, 145);
  drawSnowPine(ctx, 505, 155);
  rect(ctx, 380, 170, 150, 10, '#ffffff');
  speck(ctx, [[400, 80, 3], [440, 100, 3], [500, 75, 3], [470, 140, 3]], '#ffffff');
  ctx.strokeStyle = '#8a5a35';
  ctx.lineWidth = 6;
  ctx.strokeRect(380, 60, 150, 120);
  line(ctx, 455, 60, 455, 180, '#8a5a35', 6);

  // picture frame
  rect(ctx, 200, 60, 80, 60, '#8a5a35');
  rect(ctx, 206, 66, 68, 48, '#bfe4f5');
  poly(ctx, [[210, 110], [230, 80], [250, 110]], '#8d99ae');
  poly(ctx, [[235, 110], [255, 75], [275, 110]], '#9aa7b8');
  circle(ctx, 260, 75, 4, '#f4d35e');

  // fireplace surround
  rrect(ctx, 52, 70, 96, 110, 6, '#8d99ae');
  rrect(ctx, 64, 82, 72, 60, 4, '#5a3a22');
  rect(ctx, 44, 62, 112, 10, '#6b5a4a');
  drawCandle(ctx, 60, 52);
  drawCandle(ctx, 140, 52);
  drawStocking(ctx, 70, 150, '#c0392b');
  drawStocking(ctx, 100, 152, '#2f5d3a');
  drawStocking(ctx, 130, 150, '#d4af37');

  // rug
  ellipse(ctx, 280, 385, 190, 26, '#a93226');
  ellipse(ctx, 280, 385, 150, 18, '#c0392b');
  ellipse(ctx, 280, 385, 110, 11, '#e07b39');
  ctx.strokeStyle = '#f0d64a';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.ellipse(280, 385, 170, 22, 0, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.ellipse(280, 385, 130, 14, 0, 0, Math.PI * 2);
  ctx.stroke();

  // side table
  rect(ctx, 430, 320, 70, 12, '#6b4a2f');
  rect(ctx, 435, 332, 8, 48, '#5a3a2f');
  rect(ctx, 487, 332, 8, 48, '#5a3a2f');
  rect(ctx, 435, 360, 60, 6, '#6b4a2f');
  const drawMug = (c, x, y) => {
    rrect(c, x, y, 22, 20, 4, '#e8e2d6');
    rrect(c, x + 2, y + 2, 18, 16, 3, '#8a3b2a');
    ring(c, x + 23, y + 10, 6, '#e8e2d6', 2);
    line(c, x + 7, y - 5, x + 5, y - 15, 'rgba(255,255,255,0.55)', 2);
    line(c, x + 15, y - 5, x + 13, y - 17, 'rgba(255,255,255,0.45)', 2);
  };
  drawMug(ctx, 465, 305);
  rect(ctx, 440, 308, 30, 5, '#c0392b');
  rect(ctx, 442, 303, 26, 5, '#3f7fe0');
  rect(ctx, 444, 298, 22, 5, '#2f5d3a');
  // ---- foreground ----
  ellipse(ctx, 100, 180, 110, 90, 'rgba(255,150,60,0.10)');

  // --- lighting (identical in both panels) ---
  circle(ctx, 100, 120, 34, 'rgba(255,150,60,0.12)');

  const fireGlow = ctx.createRadialGradient(100, 385, 0, 100, 385, 130);
  fireGlow.addColorStop(0, 'rgba(255,170,80,0.20)');
  fireGlow.addColorStop(1, 'rgba(255,170,80,0)');
  ctx.save();
  ctx.fillStyle = fireGlow;
  ctx.fillRect(0, 300, 280, 120);
  ctx.restore();

  poly(ctx, [[400, 360], [470, 360], [500, 408], [430, 408]], 'rgba(191,228,245,0.16)');

  line(ctx, 430, 320, 500, 320, 'rgba(255,255,255,0.35)', 2);

  ctx.save();
  ctx.strokeStyle = 'rgba(240,214,74,0.55)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.ellipse(280, 385, 170, 22, 0, Math.PI * 1.05, Math.PI * 1.95);
  ctx.stroke();
  ctx.restore();
  softShadow(ctx, 90, 376, 50, 8);
  softShadow(ctx, 160, 398, 50, 6);
  vignette(ctx, 560, 420);

  // 1. fireplace — same flames, only the core and the log shift colour
  poly(ctx, [[76, 142], [100, 96], [124, 142]], '#ff7b24');
  if (changed.has('fireplace')) {
    poly(ctx, [[86, 142], [100, 112], [114, 142]], '#ffedb0');
    line(ctx, 72, 138, 128, 138, '#6b4226', 4);
  } else {
    poly(ctx, [[86, 142], [100, 112], [114, 142]], '#ffd23f');
    line(ctx, 72, 138, 128, 138, '#4a2e16', 4);
  }

  // 2. moose head — gone in one panel
  if (!changed.has('moose-head')) {
    line(ctx, 298, 72, 286, 56, '#5a3a1e', 3);
    line(ctx, 286, 56, 274, 50, '#5a3a1e', 3);
    line(ctx, 322, 72, 334, 56, '#5a3a1e', 3);
    line(ctx, 334, 56, 346, 50, '#5a3a1e', 3);
    ellipse(ctx, 310, 86, 16, 21, '#8a5a30');
    ellipse(ctx, 310, 102, 9, 8, '#7a4c26');
    circle(ctx, 304, 82, 2, '#2a1a10');
    circle(ctx, 316, 82, 2, '#2a1a10');
    ellipse(ctx, 310, 104, 4, 3, '#2a1a10');
  }

  // 3. skis — leaning crossed against the right wall, below the window
  const skiPath = () => {
    line(ctx, 508, 208, 542, 392, '#c0392b', 7);
    line(ctx, 508, 208, 542, 392, '#ffffff', 2);
    line(ctx, 542, 208, 508, 392, '#3f7fe0', 7);
    line(ctx, 542, 208, 508, 392, '#ffffff', 2);
  };
  ctx.save();
  if (changed.has('skis')) {
    ctx.translate(525, 300);
    ctx.scale(-1, 1);
    ctx.translate(-525, -300);
  }
  skiPath();
  ctx.restore();

  // 4. armchair — a touch smaller, feet planted on the floor
  const armScale = changed.has('armchair') ? 0.8 : 1;
  ctx.save();
  ctx.translate(90, 374);
  ctx.scale(armScale, armScale);
  ctx.translate(-90, -374);
  rrect(ctx, 62, 300, 56, 52, 10, '#6b3fa0');
  rrect(ctx, 52, 330, 16, 34, 8, '#7d4cb8');
  rrect(ctx, 112, 330, 16, 34, 8, '#7d4cb8');
  rrect(ctx, 62, 340, 56, 24, 8, '#9a63d4');
  line(ctx, 72, 350, 108, 350, '#6b3fa0', 2);
  line(ctx, 72, 357, 108, 357, '#6b3fa0', 2);
  rect(ctx, 66, 364, 8, 10, '#4a2e6b');
  rect(ctx, 106, 364, 8, 10, '#4a2e6b');
  ctx.restore();

  // 5. clock — hung on a different nail
  const clkX = changed.has('clock') ? 344 : 280;
  const clkY = changed.has('clock') ? 176 : 220;
  ctx.save();
  ctx.translate(clkX, clkY);
  circle(ctx, 0, 0, 22, '#3b2a1a');
  circle(ctx, 0, 0, 19, '#f7efdc');
  for (let i = 0; i < 12; i++) {
    const tickA = (i / 12) * Math.PI * 2;
    circle(ctx, Math.cos(tickA) * 15, Math.sin(tickA) * 15, 1.2, '#5a4632');
  }
  line(ctx, 0, 0, 0, -11, '#3b2a1a', 2);
  line(ctx, 0, 0, 8, 5, '#3b2a1a', 2);
  ctx.restore();

  // 6. snowboard — only in one panel
  if (changed.has('snowboard')) {
    ctx.save();
    ctx.translate(490, 300);
    ctx.rotate(0.12);
    rrect(ctx, -12, -48, 24, 96, 12, '#2ec4b6');
    line(ctx, 0, -40, 0, 40, '#ffffff', 2);
    circle(ctx, 0, -28, 3, '#ffffff');
    circle(ctx, 0, 28, 3, '#ffffff');
    ctx.restore();
  }

  // 7. log pile — one log short
  const logList = [[132, 386], [158, 386], [184, 386], [145, 370], [171, 370]];
  if (changed.has('log-pile')) logList.pop();
  for (let i = 0; i < logList.length; i++) {
    ellipse(ctx, logList[i][0], logList[i][1], 15, 9, '#8a5a30');
    circle(ctx, logList[i][0] - 11, logList[i][1], 5, '#d9b878');
  }

  // 8. frost pattern — same ice colour, different crystals
  ctx.save();
  ctx.translate(390, 350);
  if (changed.has('frosty-window')) {
    line(ctx, -15, -5, 15, 5, '#dff3ff', 2);
    line(ctx, -5, 14, 5, -14, '#dff3ff', 2);
    line(ctx, 0, 0, -14, 7, '#dff3ff', 2);
    circle(ctx, -10, -14, 2.5, '#dff3ff');
    circle(ctx, 14, 10, 2.5, '#dff3ff');
  } else {
    line(ctx, -16, 0, 16, 0, '#dff3ff', 2);
    line(ctx, -8, -13.9, 8, 13.9, '#dff3ff', 2);
    line(ctx, -8, 13.9, 8, -13.9, '#dff3ff', 2);
    circle(ctx, -16, 12, 2.5, '#dff3ff');
    circle(ctx, 16, 12, 2.5, '#dff3ff');
  }
  ctx.restore();
}
function drawStocking(ctx, x, y, color) {
  line(ctx, x, y - 4, x, y, '#5a3a22', 2);
  rrect(ctx, x - 7, y, 14, 18, 4, color);
  poly(ctx, [[x - 7, y + 12], [x + 7, y + 12], [x + 7, y + 18], [x + 12, y + 18], [x + 12, y + 22], [x - 7, y + 22]], color);
  rect(ctx, x - 8, y - 2, 16, 5, '#fdf7ec');
}

function drawCandle(ctx, x, y) {
  rect(ctx, x - 3, y - 14, 6, 14, '#fdf7ec');
  ellipse(ctx, x, y - 18, 3, 5, '#ffd23f');
  circle(ctx, x, y - 18, 7, 'rgba(255,210,63,0.25)');
  line(ctx, x, y - 14, x, y - 16, '#5a3a22', 1.5);
}

function drawSnowPine(ctx, x, y) {
  rect(ctx, x - 2, y - 8, 4, 8, '#6b4226');
  poly(ctx, [[x, y - 34], [x - 11, y - 14], [x + 11, y - 14]], '#2f5d3a');
  poly(ctx, [[x, y - 26], [x - 9, y - 8], [x + 9, y - 8]], '#35704a');
  poly(ctx, [[x, y - 18], [x - 7, y - 2], [x + 7, y - 2]], '#3f7f57');
  ellipse(ctx, x, y - 32, 4, 2, '#ffffff');
  ellipse(ctx, x - 4, y - 12, 4, 2, '#ffffff');
  ellipse(ctx, x + 4, y - 6, 4, 2, '#ffffff');
}
