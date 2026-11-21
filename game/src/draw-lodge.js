// Winter Ski Lodge — snowy lodge interior, 8 sneaky differences.
(function () {
  'use strict';

  const DIFFS = [
    { name: 'Fireplace glow', x: 320, y: 280, r: 30 },
    { name: 'Armchair', x: 500, y: 340, r: 40 },
    { name: 'Ski', x: 580, y: 200, r: 24 },
    { name: 'Book', x: 151, y: 349, r: 20 },
    { name: 'Mug', x: 354, y: 379, r: 20 },
    { name: 'Window streak', x: 130, y: 110, r: 26 },
    { name: 'Firewood', x: 90, y: 430, r: 20 },
    { name: 'Rug', x: 320, y: 440, r: 24 },
  ];

  function draw(ctx, W, H, shifted) {
    const h = window.H;
    const R = h.rng(83);

    // --- wood-panel wall ---
    ctx.fillStyle = h.lg(ctx, 0, 0, 0, H, [[0, '#8a5f36'], [1, '#5d3f22']]);
    ctx.fillRect(0, 0, W, H);
    ctx.strokeStyle = 'rgba(40,25,10,0.4)';
    ctx.lineWidth = 2;
    for (let x = 0; x <= W; x += 80) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 400);
      ctx.stroke();
    }
    ctx.fillStyle = '#4a2f1d';
    ctx.fillRect(0, 0, W, 14);
    // floor
    ctx.fillStyle = '#6b4423';
    ctx.fillRect(0, 400, W, 80);
    ctx.strokeStyle = 'rgba(40,25,10,0.45)';
    for (let y = 420; y < H; y += 20) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(W, y);
      ctx.stroke();
    }

    // --- window with snowy night (left) ---
    ctx.save();
    ctx.translate(130, 120);
    ctx.fillStyle = '#3a2f22';
    h.rr(ctx, -58, -72, 116, 144, 6);
    ctx.fill();
    ctx.fillStyle = h.lg(ctx, 0, -64, 0, 64, [[0, '#0e1e3a'], [1, '#2a4a6b']]);
    ctx.fillRect(-50, -64, 100, 128);
    // snow ground + pines outside
    ctx.fillStyle = '#dfe9f2';
    ctx.fillRect(-50, 30, 100, 34);
    ctx.fillStyle = '#122615';
    for (const px of [-32, 0, 30]) {
      ctx.beginPath();
      ctx.moveTo(px, 30);
      ctx.lineTo(px - 14, -6);
      ctx.lineTo(px + 14, -6);
      ctx.closePath();
      ctx.fill();
    }
    // moon
    ctx.fillStyle = '#f4ecd0';
    h.circ(ctx, 28, -42, 12);
    ctx.fill();
    // snowflakes
    ctx.fillStyle = '#ffffff';
    for (let i = 0; i < 14; i++) {
      h.circ(ctx, -46 + R() * 92, -60 + R() * 80, 1.6);
      ctx.fill();
    }
    // faint light streak across the glass (moves down when shifted)
    ctx.save();
    ctx.globalAlpha = 0.35;
    ctx.fillStyle = '#fff3c9';
    const sy = shifted ? 20 : -20;
    ctx.beginPath();
    ctx.moveTo(-50, sy - 6);
    ctx.lineTo(50, sy - 26);
    ctx.lineTo(50, sy - 16);
    ctx.lineTo(-50, sy + 4);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
    ctx.strokeStyle = '#3a2f22';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(0, -64);
    ctx.lineTo(0, 64);
    ctx.moveTo(-50, 0);
    ctx.lineTo(50, 0);
    ctx.stroke();
    ctx.restore();

    // --- bookshelf (left-bottom) ---
    ctx.save();
    ctx.translate(150, 400);
    ctx.fillStyle = '#5d3f22';
    h.rr(ctx, -62, -76, 124, 76, 4);
    ctx.fill();
    const spineColors = ['#d64545', '#4a7ac2', '#5a9e52', '#e8a83d', '#8a5fd0'];
    for (let s = 0; s < 2; s++) {
      const y0 = -66 + s * 36;
      for (let i = 0; i < 5; i++) {
        let col = spineColors[(i + s * 2) % 5];
        if (s === 0 && i === 2) col = shifted ? '#3f9e52' : '#d64545'; // one spine swaps red -> green
        ctx.fillStyle = col;
        ctx.fillRect(-54 + i * 23, y0, 19, 30);
        ctx.fillStyle = 'rgba(255,255,255,0.35)';
        ctx.fillRect(-54 + i * 23, y0 + 4, 19, 3);
      }
      ctx.fillStyle = '#4a2f1d';
      ctx.fillRect(-62, y0 + 30, 124, 5);
    }
    ctx.restore();

    // --- fireplace (centre) ---
    ctx.save();
    ctx.translate(320, 280);
    // stone surround
    ctx.fillStyle = '#8a8f98';
    h.rr(ctx, -78, -84, 156, 168, 8);
    ctx.fill();
    ctx.strokeStyle = '#6a6f78';
    ctx.lineWidth = 2;
    for (let i = 0; i < 3; i++) {
      ctx.beginPath();
      ctx.moveTo(-78, -44 + i * 40);
      ctx.lineTo(78, -44 + i * 40);
      ctx.stroke();
    }
    for (let i = 0; i < 3; i++) {
      ctx.beginPath();
      ctx.moveTo(-26 + i * 52, -84);
      ctx.lineTo(-26 + i * 52, 84);
      ctx.stroke();
    }
    // firebox
    ctx.fillStyle = '#1e1410';
    h.rr(ctx, -52, -30, 104, 90, 6);
    ctx.fill();
    // logs
    ctx.fillStyle = '#6b4423';
    h.rr(ctx, -34, 34, 68, 12, 6);
    ctx.fill();
    ctx.fillStyle = '#7d5230';
    h.rr(ctx, -30, 24, 60, 11, 5);
    ctx.fill();
    // flames
    const flame = function (x, y, s, color) {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(x, y - 44 * s);
      ctx.quadraticCurveTo(x + 22 * s, y - 8 * s, x + 10 * s, y + 6 * s);
      ctx.quadraticCurveTo(x, y + 13 * s, x - 10 * s, y + 6 * s);
      ctx.quadraticCurveTo(x - 22 * s, y - 8 * s, x, y - 44 * s);
      ctx.fill();
    };
    flame(0, 44, 1.1, '#ff5a1f');
    flame(0, 44, 0.8, '#ff9a1f');
    flame(0, 44, 0.5, '#ffd23d');
    // glow + pool of light on the floor (the glow itself is a difference:
    // brighter, wider and yellower when shifted, so the spot reads clearly)
    h.glow(ctx, 0, 10, shifted ? 158 : 130, shifted ? '#ffe14d' : '#ff9a3d', shifted ? 0.55 : 0.45);
    ctx.save();
    ctx.globalAlpha = 0.28;
    ctx.fillStyle = shifted ? '#ffd23d' : '#ff9a3d';
    h.el(ctx, 0, 150, 120, 22);
    ctx.fill();
    ctx.restore();
    // mantel + stockings
    ctx.fillStyle = '#5d3f22';
    ctx.fillRect(-86, -96, 172, 14);
    ctx.fillStyle = '#d64545';
    for (const sx of [-48, 0, 48]) {
      ctx.beginPath();
      ctx.moveTo(sx - 8, -82);
      ctx.lineTo(sx + 8, -82);
      ctx.lineTo(sx + 8, -62);
      ctx.lineTo(sx + 16, -62);
      ctx.lineTo(sx + 16, -54);
      ctx.lineTo(sx - 8, -54);
      ctx.closePath();
      ctx.fill();
    }
    ctx.restore();

    // --- firewood stack (one extra log when shifted) ---
    ctx.save();
    ctx.translate(90, 430);
    ctx.fillStyle = '#6b4423';
    for (const lx of [-16, 16]) {
      h.rr(ctx, lx - 16, -8, 32, 12, 6);
      ctx.fill();
    }
    h.rr(ctx, 0, -20, 32, 12, 6);
    ctx.fill();
    ctx.fillStyle = '#8a5a30';
    h.el(ctx, 16, -14, 5, 6);
    ctx.fill();
    if (shifted) {
      ctx.fillStyle = '#6b4423';
      h.rr(ctx, -32, -20, 30, 12, 6);
      ctx.fill();
      ctx.strokeStyle = '#4a2f1d';
      ctx.lineWidth = 1.5;
      h.rr(ctx, -32, -20, 30, 12, 6);
      ctx.stroke();
      ctx.fillStyle = '#d9b878';
      h.el(ctx, -2, -14, 5, 6);
      ctx.fill();
    }
    ctx.restore();

    // --- rug (stripes swap when shifted) ---
    ctx.save();
    ctx.translate(320, 440);
    ctx.fillStyle = '#7a2f2f';
    h.rr(ctx, -110, -16, 220, 32, 8);
    ctx.fill();
    if (shifted) {
      ctx.fillStyle = '#e8dcc0';
      ctx.fillRect(-100, -10, 200, 5);
      ctx.fillStyle = '#4a7ac2';
      ctx.fillRect(-100, 4, 200, 5);
    } else {
      ctx.fillStyle = '#4a7ac2';
      ctx.fillRect(-100, -10, 200, 5);
      ctx.fillStyle = '#e8dcc0';
      ctx.fillRect(-100, 4, 200, 5);
    }
    ctx.restore();

    // --- table with mugs (centre-bottom) ---
    ctx.save();
    ctx.translate(380, 400);
    ctx.fillStyle = '#5d3f22';
    ctx.fillRect(-52, -8, 104, 10);
    ctx.fillRect(-44, 2, 8, 26);
    ctx.fillRect(36, 2, 8, 26);
    // mug 1: handle flips side when shifted
    ctx.fillStyle = '#d64545';
    h.rr(ctx, -38, -34, 24, 26, 4);
    ctx.fill();
    ctx.strokeStyle = '#d64545';
    ctx.lineWidth = 4;
    ctx.beginPath();
    if (shifted) ctx.arc(-38, -21, 8, Math.PI / 2, Math.PI * 1.5);
    else ctx.arc(-14, -21, 8, -Math.PI / 2, Math.PI / 2);
    ctx.stroke();
    // mug 2
    ctx.fillStyle = '#4a7ac2';
    h.rr(ctx, 8, -34, 24, 26, 4);
    ctx.fill();
    ctx.strokeStyle = '#4a7ac2';
    ctx.beginPath();
    ctx.arc(32, -21, 8, -Math.PI / 2, Math.PI / 2);
    ctx.stroke();
    ctx.restore();

    // --- armchair, sitting on the floor (grows when shifted) ---
    ctx.save();
    ctx.translate(500, 340);
    const as = shifted ? 1.2 : 1;
    ctx.scale(as, as);
    ctx.fillStyle = '#8a2f2f';
    h.rr(ctx, -46, -52, 92, 66, 12);
    ctx.fill();
    h.rr(ctx, -46, -52, 92, 30, 12);
    ctx.fill();
    ctx.fillStyle = '#a83a3a';
    h.rr(ctx, -38, -46, 76, 24, 8);
    ctx.fill();
    // arms
    ctx.fillStyle = '#6e2424';
    h.rr(ctx, -52, -16, 18, 44, 8);
    ctx.fill();
    h.rr(ctx, 34, -16, 18, 44, 8);
    ctx.fill();
    // cushion + legs on the floor
    ctx.fillStyle = '#c24545';
    h.rr(ctx, -34, -8, 68, 18, 6);
    ctx.fill();
    ctx.fillStyle = '#4a2f1d';
    ctx.fillRect(-40, 26, 8, 10);
    ctx.fillRect(32, 26, 8, 10);
    ctx.restore();

    // --- skis leaning on the wall (one goes missing when shifted) ---
    ctx.save();
    ctx.translate(580, 200);
    ctx.rotate(0.22);
    ctx.fillStyle = '#d64545';
    h.rr(ctx, -8, -84, 16, 168, 8);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(-8, -30, 16, 10);
    if (!shifted) {
      ctx.fillStyle = '#4a7ac2';
      h.rr(ctx, 12, -84, 16, 168, 8);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(12, -30, 16, 10);
    }
    // poles
    ctx.strokeStyle = '#5d6b7a';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(-22, -70);
    ctx.lineTo(-30, 80);
    ctx.moveTo(36, -70);
    ctx.lineTo(44, 80);
    ctx.stroke();
    ctx.restore();

    // --- moonlight pool, mantel books, wall picture, mug steam (identical in both) ---
    ctx.save();
    ctx.globalAlpha = 0.1;
    ctx.fillStyle = '#a8c8e8';
    h.el(ctx, 200, 445, 50, 10);
    ctx.fill();
    ctx.restore();
    ctx.fillStyle = '#4a7ac2';
    ctx.fillRect(250, 170, 16, 14);
    ctx.fillStyle = '#5a9e52';
    ctx.fillRect(380, 172, 14, 12);
    ctx.save();
    ctx.fillStyle = '#3a2f22';
    h.rr(ctx, 540, 50, 60, 44, 4);
    ctx.fill();
    ctx.fillStyle = '#2a4a6b';
    ctx.fillRect(545, 55, 50, 34);
    ctx.fillStyle = '#dfe9f2';
    ctx.beginPath();
    ctx.moveTo(545, 89);
    ctx.lineTo(565, 66);
    ctx.lineTo(580, 89);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(570, 89);
    ctx.lineTo(590, 70);
    ctx.lineTo(595, 89);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
    ctx.strokeStyle = 'rgba(255,255,255,0.6)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(400, 348);
    ctx.quadraticCurveTo(406, 338, 400, 330);
    ctx.stroke();
  }

  window.DrawLodge = draw;
  window.LODGE_DIFFS = DIFFS;
})();
