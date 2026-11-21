// Forest Campfire — night forest clearing, 8 sneaky differences.
(function () {
  'use strict';

  const DIFFS = [
    { name: 'Marshmallow', x: 240, y: 301, r: 20 },
    { name: 'Tent', x: 150, y: 300, r: 40 },
    { name: 'Firefly', x: 476, y: 156, r: 18 },
    { name: 'Moon', x: 520, y: 70, r: 26 },
    { name: 'Sitting log', x: 515, y: 390, r: 26 },
    { name: 'Backpack', x: 540, y: 330, r: 24 },
    { name: 'Spark', x: 330, y: 240, r: 18 },
    { name: 'Mushroom', x: 110, y: 400, r: 20 },
  ];

  function pine(ctx, x, y, s, color) {
    ctx.fillStyle = color;
    for (let i = 0; i < 3; i++) {
      const w = (56 - i * 14) * s;
      const yy = y - i * 26 * s;
      hPoly(ctx, x, yy, w, 34 * s);
    }
    ctx.fillStyle = '#4a2f1d';
    ctx.fillRect(x - 4 * s, y + 4, 8 * s, 14 * s);
  }

  function hPoly(ctx, x, y, w, hgt) {
    ctx.beginPath();
    ctx.moveTo(x, y - hgt);
    ctx.lineTo(x - w / 2, y);
    ctx.lineTo(x + w / 2, y);
    ctx.closePath();
    ctx.fill();
  }

  function draw(ctx, W, H, shifted) {
    const h = window.H;
    const R = h.rng(23);

    // --- night sky ---
    ctx.fillStyle = h.lg(ctx, 0, 0, 0, H, [
      [0, '#0d1030'],
      [0.55, '#1b2a52'],
      [1, '#3a2b5c'],
    ]);
    ctx.fillRect(0, 0, W, H);

    // Stars.
    h.speckle(ctx, R, 0, 0, W, 220, 46, '#ffffff', 0.8, 2, 0.85);
    h.speckle(ctx, R, 0, 0, W, 220, 12, '#ffe9a8', 1.5, 2.6, 0.9);

    // Moon (grows and warms to orange when shifted).
    ctx.save();
    const mr = shifted ? 36 : 30;
    ctx.fillStyle = shifted ? '#ffd9a0' : '#f4ecd0';
    h.circ(ctx, 520, 70, mr);
    ctx.fill();
    h.glow(ctx, 520, 70, mr + 25, '#f4ecd0', 0.4);
    ctx.fillStyle = '#d9cba6';
    const craters = [[510, 60, 6], [530, 78, 4], [518, 84, 5]];
    for (const c of craters) {
      h.circ(ctx, c[0], c[1], c[2]);
      ctx.fill();
    }
    ctx.restore();

    // Far treeline + fog band.
    ctx.fillStyle = '#16243f';
    ctx.beginPath();
    ctx.moveTo(0, 250);
    for (let x = 0; x <= W; x += 40) {
      ctx.lineTo(x + 20, 250 - 26 - ((x * 7) % 23));
      ctx.lineTo(x + 40, 250);
    }
    ctx.lineTo(W, 320);
    ctx.lineTo(0, 320);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = 'rgba(180,190,230,0.10)';
    ctx.fillRect(0, 240, W, 40);

    // --- ground ---
    ctx.fillStyle = h.lg(ctx, 0, 320, 0, H, [[0, '#2c4a26'], [1, '#16240f']]);
    ctx.fillRect(0, 320, W, 160);
    h.speckle(ctx, R, 0, 330, W, 140, 70, '#0e1a0a', 1, 3, 0.5);

    // Pines framing the clearing.
    pine(ctx, 40, 330, 1.4, '#0e2012');
    pine(ctx, 600, 340, 1.6, '#0c1c10');
    pine(ctx, 90, 300, 0.9, '#122615');

    // --- tent (grows when shifted) ---
    ctx.save();
    ctx.translate(150, 300);
    const ts = shifted ? 1.2 : 1;
    ctx.scale(ts, ts);
    ctx.fillStyle = '#ff7a2f';
    ctx.beginPath();
    ctx.moveTo(0, -78);
    ctx.lineTo(-72, 22);
    ctx.lineTo(72, 22);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = '#e85d1f';
    ctx.beginPath();
    ctx.moveTo(0, -78);
    ctx.lineTo(-72, 22);
    ctx.lineTo(0, 22);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = '#5a2d12';
    ctx.beginPath();
    ctx.moveTo(0, -34);
    ctx.lineTo(-26, 22);
    ctx.lineTo(26, 22);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#c9b18a';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(-72, 22);
    ctx.lineTo(-92, 52);
    ctx.moveTo(72, 22);
    ctx.lineTo(92, 52);
    ctx.stroke();
    ctx.restore();

    // --- sitting log (moves when shifted) ---
    const lx = shifted ? 530 : 500;
    ctx.save();
    ctx.translate(lx, 390);
    ctx.fillStyle = '#6b4423';
    h.rr(ctx, -52, -14, 104, 28, 12);
    ctx.fill();
    ctx.fillStyle = '#8a5a30';
    h.el(ctx, -52, 0, 7, 14);
    ctx.fill();
    ctx.strokeStyle = '#4a2f1d';
    ctx.lineWidth = 2;
    h.el(ctx, -52, 0, 7, 14);
    ctx.stroke();
    ctx.restore();

    // --- backpack ---
    ctx.save();
    ctx.translate(540, 330);
    ctx.fillStyle = '#3f7a3a';
    h.rr(ctx, -26, -34, 52, 68, 14);
    ctx.fill();
    ctx.fillStyle = '#2c5a28';
    h.rr(ctx, -26, -34, 52, 18, 10);
    ctx.fill();
    ctx.fillStyle = shifted ? '#8a5fd0' : '#5a9e52';
    h.rr(ctx, -18, 2, 36, 22, 8);
    ctx.fill();
    ctx.strokeStyle = '#2c5a28';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(-14, -34);
    ctx.lineTo(-14, -44);
    ctx.moveTo(14, -34);
    ctx.lineTo(14, -44);
    ctx.stroke();
    ctx.restore();

    // --- campfire: glow, stones, logs, flames ---
    h.glow(ctx, 330, 360, 170, '#ff9a3d', 0.45);
    h.glow(ctx, 330, 360, 90, '#ffd23d', 0.35);
    // stone ring
    ctx.fillStyle = '#7a7f8a';
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2;
      h.el(ctx, 330 + Math.cos(a) * 46, 372 + Math.sin(a) * 12, 12, 8);
      ctx.fill();
    }
    // crossed logs
    ctx.save();
    ctx.translate(330, 366);
    ctx.rotate(0.5);
    ctx.fillStyle = '#6b4423';
    h.rr(ctx, -40, -7, 80, 14, 7);
    ctx.fill();
    ctx.rotate(-1);
    ctx.fillStyle = '#7d5230';
    h.rr(ctx, -40, -7, 80, 14, 7);
    ctx.fill();
    ctx.restore();
    // flames: three layered teardrops
    const flame = function (x, y, s, color) {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(x, y - 52 * s);
      ctx.quadraticCurveTo(x + 26 * s, y - 10 * s, x + 12 * s, y + 8 * s);
      ctx.quadraticCurveTo(x, y + 16 * s, x - 12 * s, y + 8 * s);
      ctx.quadraticCurveTo(x - 26 * s, y - 10 * s, x, y - 52 * s);
      ctx.fill();
    };
    flame(330, 366, 1.15, '#ff5a1f');
    flame(330, 366, 0.85, '#ff9a1f');
    flame(330, 366, 0.55, '#ffd23d');
    // embers
    ctx.fillStyle = '#ffb03d';
    for (let i = 0; i < 7; i++) {
      h.circ(ctx, 300 + R() * 60, 352 + R() * 14, 2 + R() * 2);
      ctx.fill();
    }
    // sparks rising (one extra appears when shifted, fixed spot: no RNG
    // inside the branch, so the fireflies and grass below stay identical)
    ctx.fillStyle = '#ffe9a8';
    for (let i = 0; i < 6; i++) {
      const sy = 300 - i * 12 - R() * 8;
      h.circ(ctx, 312 + R() * 36, sy, 1.6);
      ctx.fill();
    }
    if (shifted) {
      h.circ(ctx, 330, 240, 2.4);
      ctx.fill();
      h.circ(ctx, 338, 228, 1.8);
      ctx.fill();
    }

    // --- marshmallow sticks ---
    const stick = function (x, y, ang, toasted) {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(ang);
      ctx.strokeStyle = '#8a6a45';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, -58);
      ctx.stroke();
      ctx.fillStyle = toasted ? '#b5763a' : '#fff6e8';
      h.rr(ctx, -8, -76, 16, 18, 6);
      ctx.fill();
      ctx.restore();
    };
    stick(272, 360, -0.5, shifted);
    stick(400, 366, 0.45, false);

    // --- mushrooms ---
    ctx.save();
    ctx.translate(110, 400);
    ctx.fillStyle = '#e8dcc0';
    h.rr(ctx, -4, -16, 8, 18, 3);
    ctx.fill();
    ctx.fillStyle = '#d64545';
    ctx.beginPath();
    ctx.arc(0, -14, 14, Math.PI, 0);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    const spots = shifted ? [[-7, -18], [6, -22]] : [[-7, -18], [0, -24], [6, -22]];
    for (const s of spots) {
      h.circ(ctx, s[0], s[1], 2.5);
      ctx.fill();
    }
    ctx.restore();

    // --- fireflies (one goes missing when shifted) ---
    for (let i = 0; i < 10; i++) {
      const fx = 180 + R() * 340;
      const fy = 60 + R() * 150;
      if (shifted && i === 4) continue;
      h.glow(ctx, fx, fy, 10, '#d8ff7a', 0.7);
      ctx.fillStyle = '#e8ff9a';
      h.circ(ctx, fx, fy, 2.5);
      ctx.fill();
    }

    // --- grass tufts + foreground stones ---
    ctx.strokeStyle = '#1d3a17';
    ctx.lineWidth = 2;
    for (let i = 0; i < 14; i++) {
      const gx = 20 + R() * 600;
      const gy = 420 + R() * 50;
      ctx.beginPath();
      ctx.moveTo(gx, gy);
      ctx.lineTo(gx - 4, gy - 12);
      ctx.moveTo(gx, gy);
      ctx.lineTo(gx + 4, gy - 14);
      ctx.stroke();
    }
    ctx.fillStyle = '#3a3f4a';
    h.el(ctx, 200, 448, 22, 10);
    ctx.fill();
    h.el(ctx, 470, 452, 18, 8);
    ctx.fill();

    // --- extra sky: bright fixed stars + fireflies + grass (identical in both) ---
    ctx.fillStyle = '#ffffff';
    for (const s of [[60, 60], [300, 50], [620, 140], [420, 40]]) {
      ctx.fillRect(s[0] - 1, s[1] - 5, 2, 10);
      ctx.fillRect(s[0] - 5, s[1] - 1, 10, 2);
      h.circ(ctx, s[0], s[1], 2);
      ctx.fill();
    }
    for (const f of [[80, 120], [600, 200], [350, 120]]) {
      h.glow(ctx, f[0], f[1], 10, '#d8ff7a', 0.7);
      ctx.fillStyle = '#e8ff9a';
      h.circ(ctx, f[0], f[1], 2.5);
      ctx.fill();
    }
    ctx.strokeStyle = '#1d3a17';
    ctx.lineWidth = 2;
    for (const g of [[300, 460], [60, 460]]) {
      ctx.beginPath();
      ctx.moveTo(g[0], g[1]);
      ctx.lineTo(g[0] - 4, g[1] - 12);
      ctx.moveTo(g[0], g[1]);
      ctx.lineTo(g[0] + 4, g[1] - 14);
      ctx.stroke();
    }
    ctx.fillStyle = '#3a3f4a';
    h.el(ctx, 380, 455, 16, 7);
    ctx.fill();
  }

  window.DrawCampfire = draw;
  window.CAMPFIRE_DIFFS = DIFFS;
})();
