// Grandma's Kitchen — cozy kitchen, 8 sneaky differences.
(function () {
  'use strict';

  const DIFFS = [
    { name: "Cat's tail", x: 555, y: 300, r: 24 },
    { name: 'Teapot', x: 400, y: 330, r: 28 },
    { name: 'Clock', x: 120, y: 90, r: 26 },
    { name: 'Apple', x: 354, y: 312, r: 20 },
    { name: 'Ladle', x: 300, y: 140, r: 20 },
    { name: 'Curtain', x: 413, y: 120, r: 24 },
    { name: 'Pot lid', x: 250, y: 380, r: 20 },
    { name: 'Plant leaf', x: 480, y: 300, r: 20 },
  ];

  function draw(ctx, W, H, shifted) {
    const h = window.H;
    const R = h.rng(37);

    // --- wall + floor ---
    ctx.fillStyle = h.lg(ctx, 0, 0, 0, H, [[0, '#f7e8c8'], [0.7, '#ecd9a8'], [1, '#d9b878']]);
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#b98a56';
    ctx.fillRect(0, 380, W, 100);
    ctx.strokeStyle = 'rgba(90,60,20,0.35)';
    ctx.lineWidth = 2;
    for (let y = 396; y < H; y += 22) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(W, y);
      ctx.stroke();
    }
    // wainscot line
    ctx.fillStyle = '#c9a86a';
    ctx.fillRect(0, 372, W, 8);
    // subtle wall tiles (painted before the furniture, so they show only in gaps)
    ctx.strokeStyle = 'rgba(168,132,90,0.10)';
    ctx.lineWidth = 1;
    for (let x = 80; x < W; x += 80) {
      ctx.beginPath();
      ctx.moveTo(x, 200);
      ctx.lineTo(x, 360);
      ctx.stroke();
    }
    for (let y = 200; y <= 360; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(W, y);
      ctx.stroke();
    }

    // --- window with daylight (right) ---
    ctx.save();
    ctx.translate(480, 120);
    ctx.fillStyle = '#ffffff';
    h.rr(ctx, -62, -72, 124, 144, 6);
    ctx.fill();
    ctx.fillStyle = h.lg(ctx, 0, -64, 0, 64, [[0, '#a8d8f0'], [1, '#e8f4fc']]);
    ctx.fillRect(-54, -64, 108, 128);
    ctx.fillStyle = '#ffd23d';
    h.circ(ctx, 28, -38, 16);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    h.el(ctx, -20, -20, 22, 9);
    ctx.fill();
    h.el(ctx, -4, -12, 18, 8);
    ctx.fill();
    ctx.fillStyle = '#7ec850';
    ctx.beginPath();
    ctx.moveTo(-54, 64);
    ctx.quadraticCurveTo(-20, 30, 10, 64);
    ctx.quadraticCurveTo(40, 40, 54, 64);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(0, -64);
    ctx.lineTo(0, 64);
    ctx.moveTo(-54, 0);
    ctx.lineTo(54, 0);
    ctx.stroke();
    // curtains: stripes normally, dots when shifted
    ctx.fillStyle = '#d64545';
    h.rr(ctx, -78, -78, 22, 156, 6);
    ctx.fill();
    h.rr(ctx, 56, -78, 22, 156, 6);
    ctx.fill();
    if (shifted) {
      ctx.fillStyle = '#ffffff';
      for (const cx of [-67, 67]) {
        for (let cy = -60; cy < 70; cy += 26) {
          h.circ(ctx, cx, cy, 3);
          ctx.fill();
        }
      }
    } else {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(-78, -40, 22, 6);
      ctx.fillRect(-78, 6, 22, 6);
      ctx.fillRect(-78, 52, 22, 6);
      ctx.fillRect(56, -40, 22, 6);
      ctx.fillRect(56, 6, 22, 6);
      ctx.fillRect(56, 52, 22, 6);
    }
    ctx.restore();

    // --- wall clock (hands move when shifted) ---
    ctx.save();
    ctx.translate(120, 90);
    ctx.fillStyle = '#ffffff';
    h.circ(ctx, 0, 0, 34);
    ctx.fill();
    ctx.strokeStyle = '#5a4632';
    ctx.lineWidth = 4;
    h.circ(ctx, 0, 0, 34);
    ctx.stroke();
    ctx.fillStyle = '#5a4632';
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * Math.PI * 2;
      h.circ(ctx, Math.cos(a) * 27, Math.sin(a) * 27, 2);
      ctx.fill();
    }
    ctx.strokeStyle = '#333333';
    ctx.lineCap = 'round';
    const hourA = shifted ? -Math.PI / 2 + 0.6 : -Math.PI / 2;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(Math.cos(hourA) * 16, Math.sin(hourA) * 16);
    ctx.stroke();
    const minA = shifted ? Math.PI / 2 : 0;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(Math.cos(minA) * 24, Math.sin(minA) * 24);
    ctx.stroke();
    ctx.fillStyle = '#d64545';
    h.circ(ctx, 0, 0, 3);
    ctx.fill();
    ctx.restore();

    // --- shelf with jars (top-left) ---
    ctx.fillStyle = '#8a5a30';
    ctx.fillRect(30, 168, 150, 10);
    const jarColors = ['#d64545', '#e8a83d', '#5a9e52'];
    for (let i = 0; i < 3; i++) {
      ctx.fillStyle = jarColors[i];
      h.rr(ctx, 44 + i * 48, 132, 32, 36, 6);
      ctx.fill();
      ctx.fillStyle = '#5a4632';
      ctx.fillRect(48 + i * 48, 126, 24, 8);
    }

    // --- hanging utensil rail ---
    ctx.fillStyle = '#5a4632';
    ctx.fillRect(230, 96, 180, 8);
    // ladle: handle recolours when shifted
    ctx.save();
    ctx.translate(300, 140);
    ctx.strokeStyle = shifted ? '#2f7fd0' : '#d64545';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(0, -32);
    ctx.lineTo(0, 6);
    ctx.stroke();
    ctx.fillStyle = '#c0c8d0';
    h.el(ctx, 0, 16, 12, 10);
    ctx.fill();
    ctx.restore();
    // spatula
    ctx.save();
    ctx.translate(340, 140);
    ctx.strokeStyle = '#8a6a45';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(0, -32);
    ctx.lineTo(0, 0);
    ctx.stroke();
    ctx.fillStyle = '#c0a060';
    h.rr(ctx, -8, 0, 16, 24, 4);
    ctx.fill();
    ctx.restore();
    // pan
    ctx.save();
    ctx.translate(380, 142);
    ctx.strokeStyle = '#5a4632';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(0, -34);
    ctx.lineTo(0, -6);
    ctx.stroke();
    ctx.fillStyle = '#3a3f4a';
    h.el(ctx, 0, 8, 20, 14);
    ctx.fill();
    ctx.restore();

    // --- stove (centre-left) ---
    ctx.save();
    ctx.translate(220, 300);
    ctx.fillStyle = '#f2f2f2';
    h.rr(ctx, -80, -40, 160, 130, 8);
    ctx.fill();
    ctx.strokeStyle = '#c0c0c0';
    ctx.lineWidth = 2;
    h.rr(ctx, -80, -40, 160, 130, 8);
    ctx.stroke();
    ctx.fillStyle = '#222222';
    h.el(ctx, -38, -14, 26, 8);
    ctx.fill();
    h.el(ctx, 38, -14, 26, 8);
    ctx.fill();
    // pots on burners
    ctx.fillStyle = '#7a7f8a';
    h.rr(ctx, -62, -46, 48, 34, 6);
    ctx.fill();
    ctx.fillStyle = '#9aa0aa';
    h.el(ctx, -38, -46, 24, 6);
    ctx.fill();
    ctx.fillStyle = '#5a7a9a';
    h.rr(ctx, 16, -48, 46, 36, 6);
    ctx.fill();
    ctx.fillStyle = '#8ab0d0';
    h.el(ctx, 39, -48, 23, 6);
    ctx.fill();
    // steam curls
    ctx.strokeStyle = 'rgba(255,255,255,0.7)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(-38, -52);
    ctx.quadraticCurveTo(-30, -66, -38, -78);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(39, -54);
    ctx.quadraticCurveTo(47, -68, 39, -80);
    ctx.stroke();
    // oven door
    ctx.fillStyle = '#333a44';
    h.rr(ctx, -62, 34, 124, 44, 6);
    ctx.fill();
    ctx.fillStyle = '#8ab0d0';
    h.rr(ctx, -52, 42, 104, 28, 4);
    ctx.fill();
    ctx.restore();

    // --- counter with fruit bowl + teapot ---
    ctx.fillStyle = '#a87a48';
    ctx.fillRect(0, 372, W, 10);
    // fruit bowl
    ctx.save();
    ctx.translate(330, 330);
    ctx.fillStyle = '#4a7ac2';
    ctx.beginPath();
    ctx.moveTo(-44, -14);
    ctx.quadraticCurveTo(0, 26, 44, -14);
    ctx.closePath();
    ctx.fill();
    const fruits = [
      [-24, -18, '#d64545'],
      [0, -22, '#e8a83d'],
      [24, -18, '#d64545'],
    ];
    for (let i = 0; i < fruits.length; i++) {
      if (shifted && i === 2) continue; // one apple goes missing
      const f = fruits[i];
      ctx.fillStyle = f[2];
      h.circ(ctx, f[0], f[1], 12);
      ctx.fill();
      ctx.strokeStyle = '#5a7a3a';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(f[0], f[1] - 11);
      ctx.lineTo(f[0] + 4, f[1] - 17);
      ctx.stroke();
    }
    ctx.restore();
    // teapot (grows when shifted)
    ctx.save();
    ctx.translate(400, 330);
    const tp = shifted ? 1.25 : 1;
    ctx.scale(tp, tp);
    ctx.fillStyle = '#4a7ac2';
    h.el(ctx, 0, 0, 30, 22);
    ctx.fill();
    ctx.fillStyle = '#3a62a0';
    h.el(ctx, 0, -14, 16, 10);
    ctx.fill();
    ctx.strokeStyle = '#4a7ac2';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(28, -6);
    ctx.quadraticCurveTo(44, -14, 40, -26);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(-28, -4);
    ctx.quadraticCurveTo(-42, 2, -34, 12);
    ctx.stroke();
    ctx.fillStyle = '#ffd23d';
    h.circ(ctx, 0, -24, 4);
    ctx.fill();
    ctx.restore();
    // extra pot lid appears when shifted
    if (shifted) {
      ctx.fillStyle = '#9aa0aa';
      h.el(ctx, 250, 380, 22, 6);
      ctx.fill();
      h.circ(ctx, 250, 374, 4);
      ctx.fill();
    }
    // plant pot (one leaf swaps colour when shifted)
    ctx.save();
    ctx.translate(480, 330);
    ctx.fillStyle = '#c27a4a';
    h.rr(ctx, -16, -8, 32, 26, 4);
    ctx.fill();
    ctx.fillStyle = '#3f7a3a';
    for (let i = -1; i <= 1; i++) {
      ctx.beginPath();
      ctx.ellipse(i * 10, -22, 6, 16, i * 0.4, 0, Math.PI * 2);
      ctx.fill();
    }
    if (shifted) {
      ctx.fillStyle = '#e8c83d';
      ctx.beginPath();
      ctx.ellipse(10, -22, 6, 16, 0.4, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();

    // --- cat sitting on the counter (right) ---
    ctx.save();
    ctx.translate(520, 330);
    ctx.fillStyle = '#e8a83d';
    h.el(ctx, 0, 0, 30, 24);
    ctx.fill();
    h.circ(ctx, 0, -28, 18);
    ctx.fill();
    // ears
    ctx.beginPath();
    ctx.moveTo(-14, -40);
    ctx.lineTo(-8, -54);
    ctx.lineTo(-2, -42);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(14, -40);
    ctx.lineTo(8, -54);
    ctx.lineTo(2, -42);
    ctx.closePath();
    ctx.fill();
    // stripes
    ctx.strokeStyle = '#c07f1f';
    ctx.lineWidth = 3;
    for (let i = -1; i <= 1; i++) {
      ctx.beginPath();
      ctx.moveTo(i * 10 - 4, -14);
      ctx.lineTo(i * 10 + 4, -14);
      ctx.stroke();
    }
    // eyes + nose
    ctx.fillStyle = '#222222';
    h.circ(ctx, -7, -30, 2.5);
    ctx.fill();
    h.circ(ctx, 7, -30, 2.5);
    ctx.fill();
    ctx.fillStyle = '#d64545';
    ctx.beginPath();
    ctx.moveTo(-3, -22);
    ctx.lineTo(3, -22);
    ctx.lineTo(0, -18);
    ctx.closePath();
    ctx.fill();
    // tail: curled down normally, raised when shifted
    ctx.strokeStyle = '#e8a83d';
    ctx.lineWidth = 7;
    ctx.lineCap = 'round';
    ctx.beginPath();
    if (shifted) {
      ctx.moveTo(28, 8);
      ctx.quadraticCurveTo(48, -6, 42, -26);
    } else {
      ctx.moveTo(28, 8);
      ctx.quadraticCurveTo(44, 16, 34, 24);
    }
    ctx.stroke();
    ctx.restore();

    // --- rug (foreground) ---
    ctx.fillStyle = '#c24545';
    ctx.fillRect(180, 428, 280, 52);
    ctx.fillStyle = '#e8dcc0';
    ctx.fillRect(200, 442, 240, 6);
    ctx.fillRect(200, 460, 240, 6);
    h.speckle(ctx, R, 0, 428, W, 52, 30, '#8a2f2f', 1, 2, 0.4);

    // --- daylight wash, floor light pool, dust motes, herb bundle (identical in both) ---
    h.glow(ctx, 500, 90, 80, '#fff3c9', 0.12);
    ctx.save();
    ctx.globalAlpha = 0.1;
    ctx.fillStyle = '#fff3c9';
    h.el(ctx, 480, 430, 90, 18);
    ctx.fill();
    ctx.restore();
    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    h.circ(ctx, 450, 200, 1.6);
    ctx.fill();
    h.circ(ctx, 510, 160, 1.4);
    ctx.fill();
    ctx.save();
    ctx.translate(200, 140);
    ctx.strokeStyle = '#8a6a45';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, -14);
    ctx.lineTo(0, 14);
    ctx.stroke();
    ctx.strokeStyle = '#3f7a3a';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    for (const a of [-0.5, 0, 0.5]) {
      ctx.beginPath();
      ctx.moveTo(0, 12);
      ctx.quadraticCurveTo(Math.sin(a) * 10, 0, Math.sin(a) * 14, -12);
      ctx.stroke();
    }
    ctx.restore();
  }

  window.DrawKitchen = draw;
  window.KITCHEN_DIFFS = DIFFS;
})();
