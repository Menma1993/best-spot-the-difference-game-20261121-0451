import { circle, ellipse, rect, rrect, poly, star, line, vgrad, text, check, ring, softShadow, vignette, speck } from './render.js';

export function drawKitchen(ctx, changed) {
  // ============================== BACKGROUND ==============================
  rect(ctx, 0, 0, 560, 420, '#f7ead7');

  const dots = [];
  for (let y = 22; y < 300; y += 44) {
    for (let x = 20; x < 560; x += 44) {
      if (x > 390 && y < 130) continue;
      dots.push([x, y, 2.2]);
    }
  }
  speck(ctx, dots, '#e8d3ae');

  // ---- window, top right ----
  rrect(ctx, 400, 10, 130, 110, 6, '#bfe4f5');
  ctx.save();
  ctx.beginPath();
  ctx.rect(400, 10, 130, 110);
  ctx.clip();
  for (let i = 0; i < 8; i++) {
    const a = (i * Math.PI) / 4;
    line(ctx, 500 + Math.cos(a) * 18, 40 + Math.sin(a) * 18, 500 + Math.cos(a) * 25, 40 + Math.sin(a) * 25, '#ffe066', 2);
  }
  circle(ctx, 500, 40, 14, '#ffe066');
  ellipse(ctx, 431, 42, 15, 6, '#ffffff');
  ellipse(ctx, 445, 38, 10, 6, '#ffffff');
  ellipse(ctx, 471, 76, 13, 6, '#ffffff');
  ellipse(ctx, 485, 72, 9, 5, '#ffffff');
  ellipse(ctx, 428, 124, 42, 26, '#7fae8c');
  ellipse(ctx, 470, 128, 34, 22, '#8fbf9a');
  ellipse(ctx, 512, 124, 38, 24, '#7fae8c');
  ctx.restore();
  ctx.strokeStyle = '#8a5a35';
  ctx.lineWidth = 6;
  ctx.strokeRect(400, 10, 130, 110);
  line(ctx, 465, 10, 465, 120, '#8a5a35', 4);
  line(ctx, 400, 65, 530, 65, '#8a5a35', 4);

  // ---- hanging rail (bare, pots come later) ----
  rect(ctx, 180, 60, 140, 6, '#5a3a22');
  for (const hx of [196, 216, 236]) {
    line(ctx, hx, 66, hx, 74, '#5a3a22', 3);
    ring(ctx, hx, 77, 4, '#5a3a22', 2.5);
  }

  // ---- picture frame ----
  rect(ctx, 250, 30, 90, 60, '#8a5a35');
  rect(ctx, 256, 36, 78, 48, '#bfe4f5');
  circle(ctx, 270, 48, 6, '#ffe066');
  poly(ctx, [[256, 84], [286, 58], [312, 84]], '#7fae8c');
  poly(ctx, [[296, 84], [318, 64], [334, 84]], '#6c9c7b');

  // ---- wall clock, 10:10 ----
  circle(ctx, 330, 60, 22, '#fdf7ec');
  ring(ctx, 330, 60, 21, '#5a3a22', 3);
  line(ctx, 330, 42, 330, 45, '#5a3a22', 2);
  line(ctx, 330, 75, 330, 78, '#5a3a22', 2);
  line(ctx, 312, 60, 315, 60, '#5a3a22', 2);
  line(ctx, 345, 60, 348, 60, '#5a3a22', 2);
  line(ctx, 330, 60, 323, 55, '#5a3a22', 3);
  line(ctx, 330, 60, 341, 54, '#5a3a22', 2);

  // ============================== MIDGROUND ===============================
  // ---- shelves, left ----
  softShadow(ctx, 85, 44, 74, 6);
  rect(ctx, 10, 30, 150, 10, '#8a5a35');
  softShadow(ctx, 85, 124, 74, 6);
  rect(ctx, 10, 110, 150, 10, '#8a5a35');
  drawJar(ctx, 40, 18, '#f2c14e');
  drawJar(ctx, 72, 16, '#e05a4f');
  drawCup(ctx, 110, 20, '#7fae8c');
  drawPlate(ctx, 140, 18);
  drawJar(ctx, 40, 98, '#8fbf9a');
  drawCup(ctx, 75, 100, '#6fa8d6');
  drawCup(ctx, 105, 100, '#e08b3f');
  drawPlate(ctx, 135, 98);

  // ---- tiled backsplash ----
  rect(ctx, 0, 300, 560, 20, '#a8d8c8');
  for (let x = 17; x < 560; x += 35) line(ctx, x, 302, x, 318, '#8fc2b0', 1.5);
  line(ctx, 0, 310, 560, 310, '#8fc2b0', 1.5);
  for (const [tx, ty] of [[50, 306], [140, 314], [230, 306], [330, 314]]) {
    circle(ctx, tx, ty, 3, '#e79ab0');
    circle(ctx, tx - 3.5, ty - 2, 1.6, '#f3c3d0');
    circle(ctx, tx + 3.5, ty + 2, 1.6, '#f3c3d0');
  }

  // ---- counter ----
  const cg = vgrad(ctx, 0, 320, 0, 420, '#d59c6b', '#bd8455');
  ctx.fillStyle = cg;
  ctx.fillRect(0, 320, 560, 100);
  rect(ctx, 0, 398, 560, 22, '#a96f45');

  // ---- fruit bowl ----
  ellipse(ctx, 200, 305, 25, 8, '#8fbf9a');
  ellipse(ctx, 200, 311, 26, 13, '#7fae8c');
  ellipse(ctx, 189, 299, 7, 7, '#d9534f');
  ellipse(ctx, 209, 297, 7, 7, '#c9473f');
  ellipse(ctx, 207, 289, 4, 2, '#5c8f5f');
  ellipse(ctx, 199, 289, 7, 7, '#f2953f');
  ellipse(ctx, 216, 305, 6, 4, '#f2d14e');
  circle(ctx, 184, 305, 6, '#8e5b9a');

  // ---- spice jars ----
  drawJar(ctx, 300, 305, '#e0a03c');
  drawJar(ctx, 325, 305, '#c0603f');
  drawJar(ctx, 350, 305, '#8fbf9a');

  // ---- cookbook on stand ----
  rect(ctx, 228, 318, 44, 7, '#8a5a35');
  poly(ctx, [[250, 300], [210, 307], [210, 318], [250, 311]], '#fdf7ec');
  poly(ctx, [[250, 300], [290, 307], [290, 318], [250, 311]], '#f2ebdc');
  line(ctx, 218, 309, 244, 304, '#c9c1b4', 1.6);
  line(ctx, 218, 313, 244, 308, '#c9c1b4', 1.6);
  line(ctx, 218, 317, 244, 312, '#c9c1b4', 1.6);
  line(ctx, 256, 304, 282, 309, '#c9c1b4', 1.6);
  line(ctx, 256, 308, 282, 313, '#c9c1b4', 1.6);
  line(ctx, 256, 312, 282, 317, '#c9c1b4', 1.6);

  // ---- herb pots ----
  drawHerbPot(ctx, 430, 305);
  drawHerbPot(ctx, 460, 305);
  drawHerbPot(ctx, 490, 305);

  // ---- kettle ----
  ring(ctx, 507, 310, 8, '#3a434d', 3);
  poly(ctx, [[534, 306], [545, 299], [547, 304], [536, 313]], '#4a5560');
  rrect(ctx, 506, 300, 28, 25, 6, '#4a5560');
  rect(ctx, 512, 296, 16, 5, '#5d6a76');
  circle(ctx, 538, 322, 3, '#3a434d');
    // ---- foreground: wood floor planks ----
  for (const y of [350, 380, 410]) line(ctx, 0, y, 560, y, '#a96f45', 2);
  for (const x of [70, 186, 300, 414, 528]) {
    line(ctx, x, 320, x + 18, 350, '#a96f45', 2);
    line(ctx, x - 22, 380, x - 4, 410, '#a96f45', 2);
    line(ctx, x + 12, 410, x + 28, 420, '#a96f45', 2);
  }
  // ---- patterned rug ----
  ellipse(ctx, 200, 385, 90, 24, '#d97b5f');
  ellipse(ctx, 200, 385, 65, 16, '#f2b49a');
  for (const dy of [-9, 0, 9]) line(ctx, 152, 385 + dy, 248, 385 + dy, '#e8937a', 2);
  // ---- warm light pool + vignette ----
  ellipse(ctx, 450, 380, 110, 30, 'rgba(255,240,200,0.10)');
  vignette(ctx, 560, 420);

  // ---- diff 1: hanging-pots (removed) ----
  if (!changed.has('hanging-pots')) {
    line(ctx, 50, 43, 110, 43, '#5a3a22', 6);
    for (const p of [{ x: 65, y: 70, r: 16 }, { x: 95, y: 72, r: 14 }]) {
      line(ctx, p.x, 43, p.x, p.y - p.r + 2, '#6b4a2e', 2);
      circle(ctx, p.x, p.y - p.r + 2, 2, '#4a2f1c');
      circle(ctx, p.x, p.y, p.r, '#c87f4a');
      circle(ctx, p.x - 3, p.y - 3, p.r * 0.55, '#d99a63');
      line(ctx, p.x - p.r, p.y - 2, p.x - p.r - 7, p.y - 2, '#a9663a', 3);
    }
  }

  // ---- diff 2: rolling-pin (moved) ----
  ctx.save();
  if (changed.has('rolling-pin')) ctx.translate(314, 104);
  else ctx.translate(250, 60);
  ctx.rotate(-0.3);
  circle(ctx, -33, 0, 5, '#c89a63');
  circle(ctx, 33, 0, 5, '#c89a63');
  rrect(ctx, -30, -6, 60, 12, 6, '#d8ae7a');
  line(ctx, -18, -3, 18, -3, '#e8c79a', 2);
  ctx.restore();

  // ---- diff 3: cat (recoloured stripes + collar only) ----
  const catMark = changed.has('cat') ? '#8d99ae' : '#b8651a';
  ellipse(ctx, 480, 140, 26, 20, '#e8912d');
  line(ctx, 504, 152, 514, 138, '#e8912d', 6);
  line(ctx, 514, 138, 510, 126, '#e8912d', 6);
  line(ctx, 468, 106, 470, 92, '#e8912d', 6);
  line(ctx, 470, 92, 481, 102, '#e8912d', 6);
  line(ctx, 492, 106, 490, 92, '#e8912d', 6);
  line(ctx, 490, 92, 479, 102, '#e8912d', 6);
  circle(ctx, 480, 112, 16, '#e8912d');
  circle(ctx, 474, 110, 2, '#3a2a1c');
  circle(ctx, 486, 110, 2, '#3a2a1c');
  circle(ctx, 480, 116, 1.5, '#c96a5a');
  line(ctx, 462, 138, 472, 132, catMark, 3);
  line(ctx, 466, 147, 477, 141, catMark, 3);
  line(ctx, 473, 154, 484, 148, catMark, 3);
  ellipse(ctx, 480, 124, 11, 4, catMark);

  // ---- diff 4: teapot (flipped) ----
  ctx.save();
  ctx.translate(140, 210);
  if (changed.has('teapot')) ctx.scale(-1, 1);
  ellipse(ctx, 0, 8, 19, 16, '#d8536a');
  circle(ctx, 0, 4, 18, '#d8536a');
  circle(ctx, -6, -2, 9, '#e07084');
  line(ctx, -18, 2, -33, -4, '#d8536a', 5);
  line(ctx, -33, -4, -21, 12, '#d8536a', 5);
  ring(ctx, 19, 4, 10, '#d8536a', 4);
  ellipse(ctx, 0, -13, 12, 4, '#c0455a');
  circle(ctx, 0, -18, 4, '#c0455a');
  ctx.restore();

  // ---- diff 5: cake-stand (topping pattern) ----
  const cakeChg = changed.has('cake-stand');
  ellipse(ctx, 330, 246, 28, 7, '#c9ccd1');
  rect(ctx, 326, 230, 8, 16, '#b7bac0');
  ellipse(ctx, 330, 231, 14, 4, '#c9ccd1');
  rrect(ctx, 306, 208, 48, 24, 5, '#f2a7b8');
  rrect(ctx, 306, 205, 48, 9, 5, '#f7c6d1');
  for (const dx of (cakeChg ? [-18, -9, 0, 9, 18] : [-12, 0, 12])) circle(ctx, 330 + dx, 201, 4, '#c0392b');
  if (cakeChg) {
    for (const dx of [-20, -10, 0, 10]) line(ctx, 330 + dx, 214, 330 + dx + 10, 209, '#fff0f3', 2);
  } else {
    line(ctx, 312, 213, 348, 213, '#fff0f3', 2);
    line(ctx, 316, 219, 344, 219, '#fff0f3', 2);
  }

  // ---- diff 6: apron (added) ----
  if (changed.has('apron')) {
    circle(ctx, 500, 243, 3, '#8a8f98');
    line(ctx, 500, 246, 500, 254, '#8a8f98', 2);
    rrect(ctx, 477, 254, 46, 66, 8, '#f2efe8');
    for (let i = 0; i < 5; i++) line(ctx, 484 + i * 8, 258, 484 + i * 8, 316, '#d9a3a3', 2);
    rrect(ctx, 487, 288, 26, 20, 4, '#e8e3d8');
  }

  // ---- diff 7: stool (resized) ----
  ctx.save();
  ctx.translate(90, 362);
  const stoolS = changed.has('stool') ? 0.8 : 1;
  ctx.scale(stoolS, stoolS);
  line(ctx, -16, -22, -24, 26, '#9a6539', 5);
  line(ctx, -8, -24, -10, 26, '#9a6539', 5);
  line(ctx, 8, -24, 10, 26, '#9a6539', 5);
  line(ctx, 16, -22, 24, 26, '#9a6539', 5);
  line(ctx, -14, 10, 14, 10, '#9a6539', 3);
  ellipse(ctx, 0, -26, 27, 9, '#b07a4a');
  ellipse(ctx, 0, -29, 27, 9, '#c98f5c');
  ctx.restore();

  // ---- diff 8: cookie-jar (removed) ----
  if (!changed.has('cookie-jar')) {
    ellipse(ctx, 280, 381, 13, 3, 'rgba(120,90,60,0.20)');
    rrect(ctx, 266, 342, 28, 40, 8, 'rgba(214,235,240,0.62)');
    rrect(ctx, 262, 333, 36, 10, 4, '#c9b79a');
    circle(ctx, 280, 338, 2, '#8a7a5e');
    circle(ctx, 274, 356, 4, '#a9713f');
    circle(ctx, 287, 354, 4, '#a9713f');
    circle(ctx, 280, 368, 4, '#a9713f');
  }
}
function drawJar(ctx, x, y, color) {
  rrect(ctx, x - 8, y - 8, 16, 20, 3, color);
  rect(ctx, x - 6, y - 6, 3, 16, 'rgba(255,255,255,0.25)');
  rect(ctx, x - 9, y - 12, 18, 5, '#8a7a5e');
  rect(ctx, x - 5, y - 1, 10, 8, '#fdf7ec');
}

function drawCup(ctx, x, y, color) {
  rrect(ctx, x - 8, y - 8, 16, 18, 3, color);
  ring(ctx, x + 9, y + 1, 5, color, 2.5);
  ellipse(ctx, x, y - 8, 8, 3, 'rgba(255,255,255,0.3)');
}

function drawPlate(ctx, x, y) {
  circle(ctx, x, y, 11, '#fdf7ec');
  ring(ctx, x, y, 8, '#7fae8c', 2);
  circle(ctx, x, y, 3, '#e79ab0');
}

function drawHerbPot(ctx, x, y) {
  rrect(ctx, x - 9, y - 2, 18, 14, 3, '#c96a3f');
  rect(ctx, x - 10, y - 6, 20, 5, '#b85a30');
  ellipse(ctx, x - 5, y - 9, 4, 6, '#4a7a32');
  ellipse(ctx, x, y - 12, 4, 7, '#5c8f4f');
  ellipse(ctx, x + 5, y - 9, 4, 6, '#4a7a32');
  softShadow(ctx, x, y + 13, 12, 4);
}
