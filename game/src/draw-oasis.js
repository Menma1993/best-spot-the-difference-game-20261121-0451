// Desert Oasis Caravan — dusk oasis, 8 sneaky differences.
(function () {
  'use strict';

  const DIFFS = [
    { name: 'Lantern', x: 252, y: 199, r: 22 },
    { name: 'Camel', x: 480, y: 300, r: 40 },
    { name: 'Palm frond', x: 124, y: 220, r: 24 },
    { name: 'Rug', x: 320, y: 420, r: 26 },
    { name: 'Tent flag', x: 140, y: 220, r: 20 },
    { name: 'Rock', x: 555, y: 420, r: 22 },
    { name: 'Bird', x: 400, y: 90, r: 18 },
    { name: 'Pool ripple', x: 360, y: 340, r: 22 },
  ];

  function palm(ctx, x, y, s, flip, skipFrond) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(flip ? -1 : 1, 1);
    ctx.strokeStyle = '#7a5230';
    ctx.lineWidth = 10 * s;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.quadraticCurveTo(8 * s, -50 * s, 22 * s, -86 * s);
    ctx.stroke();
    ctx.strokeStyle = '#3f7a3a';
    ctx.lineWidth = 5 * s;
    for (let i = 0; i < 6; i++) {
      if (skipFrond && i === 2) continue;
      const a = -0.4 - i * 0.42;
      ctx.beginPath();
      ctx.moveTo(22 * s, -86 * s);
      ctx.quadraticCurveTo(
        22 * s + Math.cos(a) * 34 * s,
        -86 * s + Math.sin(a) * 22 * s - 8 * s,
        22 * s + Math.cos(a) * 52 * s,
        -86 * s + Math.sin(a) * 34 * s + 12 * s
      );
      ctx.stroke();
    }
    ctx.restore();
  }

  function draw(ctx, W, H, shifted) {
    const h = window.H;
    const R = h.rng(67);

    // --- dusk sky ---
    ctx.fillStyle = h.lg(ctx, 0, 0, 0, H, [
      [0, '#7a4a8a'],
      [0.45, '#ff6b8a'],
      [0.75, '#ff9a56'],
      [1, '#ffc46b'],
    ]);
    ctx.fillRect(0, 0, W, H);
    // low sun + glow
    h.glow(ctx, 480, 210, 120, '#ffe9a8', 0.55);
    ctx.fillStyle = '#fff3c9';
    h.circ(ctx, 480, 210, 34);
    ctx.fill();
    // birds (one extra appears when shifted)
    ctx.strokeStyle = '#4a2a4a';
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    const birds = [
      [150, 80],
      [220, 110],
      [300, 70],
    ];
    for (const b of birds) {
      ctx.beginPath();
      ctx.moveTo(b[0] - 9, b[1]);
      ctx.quadraticCurveTo(b[0] - 3, b[1] - 7, b[0], b[1]);
      ctx.quadraticCurveTo(b[0] + 3, b[1] - 7, b[0] + 9, b[1]);
      ctx.stroke();
    }
    if (shifted) {
      ctx.beginPath();
      ctx.moveTo(391, 90);
      ctx.quadraticCurveTo(397, 83, 400, 90);
      ctx.quadraticCurveTo(403, 83, 409, 90);
      ctx.stroke();
    }

    // --- distant dunes + haze ---
    ctx.fillStyle = '#c97b4a';
    ctx.beginPath();
    ctx.moveTo(0, 260);
    ctx.quadraticCurveTo(160, 200, 320, 252);
    ctx.quadraticCurveTo(480, 300, 640, 240);
    ctx.lineTo(640, 340);
    ctx.lineTo(0, 340);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = '#a85a34';
    ctx.beginPath();
    ctx.moveTo(0, 300);
    ctx.quadraticCurveTo(200, 260, 400, 300);
    ctx.quadraticCurveTo(540, 330, 640, 290);
    ctx.lineTo(640, 360);
    ctx.lineTo(0, 360);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = 'rgba(255,180,120,0.25)';
    ctx.fillRect(0, 250, W, 30);

    // --- sand ---
    ctx.fillStyle = h.lg(ctx, 0, 340, 0, H, [[0, '#f0c98a'], [1, '#d9a55e']]);
    ctx.fillRect(0, 340, W, 140);
    ctx.strokeStyle = 'rgba(160,110,50,0.4)';
    ctx.lineWidth = 2;
    for (let i = 0; i < 6; i++) {
      const y = 360 + i * 18;
      ctx.beginPath();
      for (let x = 0; x <= W; x += 20) {
        const yy = y + Math.sin(x / 70 + i * 2) * 3;
        if (x === 0) ctx.moveTo(x, yy);
        else ctx.lineTo(x, yy);
      }
      ctx.stroke();
    }
    // footprints
    ctx.fillStyle = 'rgba(120,80,30,0.5)';
    for (let i = 0; i < 7; i++) {
      h.el(ctx, 90 + i * 22, 440 + (i % 2) * 8, 6, 3.5);
      ctx.fill();
    }

    // --- pool (centre) ---
    ctx.save();
    ctx.fillStyle = '#2f8fc2';
    h.el(ctx, 320, 330, 130, 34);
    ctx.fill();
    ctx.fillStyle = '#5ab0dd';
    h.el(ctx, 320, 326, 110, 24);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.65)';
    ctx.lineWidth = 2;
    h.el(ctx, 300, 326, 60, 12);
    ctx.stroke();
    // ripples: one swaps colour when shifted
    ctx.strokeStyle = shifted ? '#ffd23d' : 'rgba(255,255,255,0.8)';
    ctx.lineWidth = 2;
    h.el(ctx, 360, 340, 26, 7);
    ctx.stroke();
    ctx.strokeStyle = 'rgba(255,255,255,0.6)';
    h.el(ctx, 280, 338, 18, 5);
    ctx.stroke();
    ctx.restore();

    // --- caravan tents (left) ---
    ctx.save();
    ctx.translate(140, 300);
    ctx.fillStyle = '#e8dcc0';
    ctx.beginPath();
    ctx.moveTo(0, -70);
    ctx.lineTo(-58, 10);
    ctx.lineTo(58, 10);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = '#d64545';
    ctx.beginPath();
    ctx.moveTo(0, -70);
    ctx.lineTo(-30, 10);
    ctx.lineTo(-10, 10);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(0, -70);
    ctx.lineTo(10, 10);
    ctx.lineTo(30, 10);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = '#5a2d12';
    ctx.beginPath();
    ctx.moveTo(0, -22);
    ctx.lineTo(-14, 10);
    ctx.lineTo(14, 10);
    ctx.closePath();
    ctx.fill();
    // flag pole + flag (flag flips when shifted)
    ctx.strokeStyle = '#5a4632';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, -70);
    ctx.lineTo(0, -96);
    ctx.stroke();
    ctx.fillStyle = '#ffd23d';
    ctx.beginPath();
    if (shifted) {
      ctx.moveTo(0, -96);
      ctx.lineTo(-24, -90);
      ctx.lineTo(0, -82);
    } else {
      ctx.moveTo(0, -96);
      ctx.lineTo(24, -90);
      ctx.lineTo(0, -82);
    }
    ctx.closePath();
    ctx.fill();
    ctx.restore();
    // second smaller tent
    ctx.fillStyle = '#4a7ac2';
    ctx.beginPath();
    ctx.moveTo(230, 250);
    ctx.lineTo(190, 310);
    ctx.lineTo(270, 310);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = '#e8dcc0';
    ctx.beginPath();
    ctx.moveTo(230, 250);
    ctx.lineTo(214, 310);
    ctx.lineTo(246, 310);
    ctx.closePath();
    ctx.fill();

    // --- palm trees ---
    palm(ctx, 90, 330, 1.1, false, shifted);
    palm(ctx, 570, 340, 0.9, true, false);
    palm(ctx, 250, 300, 0.7, false, false);
    // coconuts
    ctx.fillStyle = '#6b4423';
    h.circ(ctx, 108, 232, 6);
    ctx.fill();
    h.circ(ctx, 120, 236, 6);
    ctx.fill();

    // --- camels (right, one grows when shifted) ---
    ctx.save();
    ctx.translate(480, 300);
    const cs = shifted ? 1.3 : 1;
    ctx.scale(cs, cs);
    ctx.fillStyle = '#d9a55e';
    // body
    h.el(ctx, 0, 0, 52, 26);
    ctx.fill();
    // humps
    h.el(ctx, -18, -22, 18, 14);
    ctx.fill();
    h.el(ctx, 16, -22, 18, 14);
    ctx.fill();
    // saddle blanket
    ctx.fillStyle = '#d64545';
    h.rr(ctx, -30, -26, 60, 14, 4);
    ctx.fill();
    // neck + head
    ctx.strokeStyle = '#d9a55e';
    ctx.lineWidth = 12;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(44, -8);
    ctx.quadraticCurveTo(62, -34, 58, -52);
    ctx.stroke();
    h.el(ctx, 58, -56, 14, 8);
    ctx.fill();
    ctx.fillStyle = '#5a4632';
    h.circ(ctx, 62, -58, 2);
    ctx.fill();
    // legs
    ctx.strokeStyle = '#d9a55e';
    ctx.lineWidth = 8;
    for (const lx of [-34, -14, 14, 34]) {
      ctx.beginPath();
      ctx.moveTo(lx, 18);
      ctx.lineTo(lx, 52);
      ctx.stroke();
    }
    // tail
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(-50, -6);
    ctx.quadraticCurveTo(-60, 14, -54, 30);
    ctx.stroke();
    ctx.restore();
    // second camel, smaller, behind
    ctx.save();
    ctx.translate(560, 320);
    ctx.fillStyle = '#c08a4a';
    h.el(ctx, 0, 0, 38, 20);
    ctx.fill();
    h.el(ctx, 0, -16, 13, 10);
    ctx.fill();
    ctx.strokeStyle = '#c08a4a';
    ctx.lineWidth = 9;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(32, -6);
    ctx.quadraticCurveTo(44, -26, 42, -40);
    ctx.stroke();
    h.el(ctx, 42, -42, 10, 6);
    ctx.fill();
    ctx.restore();

    // --- lantern pole + lanterns (glow recolours when shifted) ---
    ctx.save();
    ctx.strokeStyle = '#5a4632';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(220, 330);
    ctx.lineTo(220, 170);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(220, 170);
    ctx.lineTo(260, 170);
    ctx.stroke();
    h.glow(ctx, 252, 200, 30, shifted ? '#7affc9' : '#ffd23d', 0.6);
    ctx.fillStyle = '#3a3f4a';
    h.rr(ctx, 244, 186, 16, 26, 5);
    ctx.fill();
    ctx.fillStyle = shifted ? '#7affc9' : '#ffd23d';
    h.rr(ctx, 247, 192, 10, 14, 3);
    ctx.fill();
    ctx.restore();

    // --- rugs (foreground, pattern changes when shifted) ---
    ctx.save();
    ctx.translate(320, 420);
    ctx.fillStyle = '#b03a3a';
    h.rr(ctx, -70, -18, 140, 36, 6);
    ctx.fill();
    ctx.fillStyle = '#e8dcc0';
    if (shifted) {
      ctx.fillRect(-60, -8, 120, 5);
      ctx.fillRect(-60, 6, 120, 5);
    } else {
      for (let i = -2; i <= 2; i++) {
        ctx.save();
        ctx.translate(i * 26, 0);
        ctx.rotate(Math.PI / 4);
        ctx.fillRect(-7, -7, 14, 14);
        ctx.restore();
      }
    }
    ctx.restore();
    ctx.fillStyle = '#4a7ac2';
    h.rr(ctx, 430, 428, 90, 26, 5);
    ctx.fill();
    ctx.fillStyle = '#e8dcc0';
    ctx.fillRect(444, 438, 62, 4);

    // --- rock (moves when shifted) ---
    const rx = shifted ? 570 : 540;
    ctx.fillStyle = '#8a7a6a';
    h.el(ctx, rx, 420, 20, 12);
    ctx.fill();
    ctx.fillStyle = '#a89a8a';
    h.el(ctx, rx - 5, 416, 9, 5);
    ctx.fill();
    // small stones + tufts
    h.speckle(ctx, R, 40, 400, 560, 60, 40, '#8a6a45', 1, 3, 0.5);

    // --- extra sky life, light streaks, ground shadows, stones (identical in both) ---
    ctx.strokeStyle = '#4a2a4a';
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    for (const b of [[80, 60], [550, 60]]) {
      ctx.beginPath();
      ctx.moveTo(b[0] - 9, b[1]);
      ctx.quadraticCurveTo(b[0] - 3, b[1] - 7, b[0], b[1]);
      ctx.quadraticCurveTo(b[0] + 3, b[1] - 7, b[0] + 9, b[1]);
      ctx.stroke();
    }
    ctx.fillStyle = 'rgba(255,255,255,0.22)';
    ctx.beginPath();
    ctx.moveTo(120, 100);
    ctx.lineTo(180, 88);
    ctx.lineTo(182, 96);
    ctx.lineTo(122, 108);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(250, 60);
    ctx.lineTo(300, 50);
    ctx.lineTo(302, 58);
    ctx.lineTo(252, 68);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(560, 120);
    ctx.lineTo(610, 110);
    ctx.lineTo(612, 118);
    ctx.lineTo(562, 128);
    ctx.closePath();
    ctx.fill();
    ctx.save();
    ctx.globalAlpha = 0.12;
    ctx.fillStyle = '#4a2a1a';
    h.el(ctx, 150, 400, 70, 10);
    ctx.fill();
    h.el(ctx, 560, 375, 50, 8);
    ctx.fill();
    ctx.restore();
    ctx.fillStyle = '#8a7a6a';
    h.el(ctx, 60, 380, 9, 6);
    ctx.fill();
    h.el(ctx, 420, 460, 11, 6);
    ctx.fill();
    h.el(ctx, 620, 380, 10, 6);
    ctx.fill();
  }

  window.DrawOasis = draw;
  window.OASIS_DIFFS = DIFFS;
})();
