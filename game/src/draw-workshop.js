// Toy Workshop — workbench of wooden toys, 8 sneaky differences.
(function () {
  'use strict';

  const DIFFS = [
    { name: "Teddy's bow", x: 120, y: 322, r: 20 },
    { name: 'Rocking horse', x: 500, y: 350, r: 40 },
    { name: 'Wall gear', x: 380, y: 74, r: 22 },
    { name: 'Paint jar', x: 180, y: 270, r: 20 },
    { name: 'Toy block', x: 280, y: 320, r: 20 },
    { name: 'Hammer', x: 420, y: 165, r: 24 },
    { name: 'Train car', x: 380, y: 300, r: 24 },
    { name: 'Screwdriver', x: 240, y: 360, r: 20 },
  ];

  function gear(ctx, x, y, r, teeth, color) {
    ctx.save();
    ctx.translate(x, y);
    ctx.fillStyle = color;
    for (let i = 0; i < teeth; i++) {
      const a = (i / teeth) * Math.PI * 2;
      ctx.save();
      ctx.rotate(a);
      ctx.fillRect(-3, -r - 6, 6, 10);
      ctx.restore();
    }
    ctx.beginPath();
    ctx.arc(0, 0, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#3a3f4a';
    ctx.beginPath();
    ctx.arc(0, 0, r * 0.35, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  function draw(ctx, W, H, shifted) {
    const h = window.H;
    const R = h.rng(51);

    // --- plank wall + floor ---
    ctx.fillStyle = h.lg(ctx, 0, 0, 0, H, [[0, '#c08a54'], [1, '#8a5f36']]);
    ctx.fillRect(0, 0, W, H);
    ctx.strokeStyle = 'rgba(70,45,20,0.35)';
    ctx.lineWidth = 2;
    for (let x = 0; x <= W; x += 64) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 380);
      ctx.stroke();
    }
    ctx.fillStyle = '#7a5230';
    ctx.fillRect(0, 380, W, 100);
    ctx.strokeStyle = 'rgba(60,35,15,0.4)';
    for (let y = 402; y < H; y += 26) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(W, y);
      ctx.stroke();
    }

    // --- window (left) ---
    ctx.save();
    ctx.translate(90, 110);
    ctx.fillStyle = '#5a4632';
    h.rr(ctx, -58, -70, 116, 140, 6);
    ctx.fill();
    ctx.fillStyle = h.lg(ctx, 0, -62, 0, 62, [[0, '#a8d8f0'], [1, '#e8f4fc']]);
    ctx.fillRect(-50, -62, 100, 124);
    ctx.fillStyle = '#ffd23d';
    h.circ(ctx, 26, -36, 13);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    h.el(ctx, -18, -14, 20, 8);
    ctx.fill();
    ctx.strokeStyle = '#5a4632';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(0, -62);
    ctx.lineTo(0, 62);
    ctx.moveTo(-50, 0);
    ctx.lineTo(50, 0);
    ctx.stroke();
    ctx.restore();

    // --- shelves with paint jars (top-right) ---
    ctx.fillStyle = '#6b4423';
    ctx.fillRect(430, 120, 180, 10);
    ctx.fillRect(430, 200, 180, 10);
    const shelfJars = ['#d64545', '#e8a83d', '#5a9e52', '#4a7ac2'];
    for (let i = 0; i < 4; i++) {
      ctx.fillStyle = shelfJars[i];
      h.rr(ctx, 440 + i * 42, 88, 26, 32, 5);
      ctx.fill();
      ctx.fillStyle = '#3a3f4a';
      ctx.fillRect(444 + i * 42, 82, 18, 7);
    }
    ctx.fillStyle = '#c27a4a';
    h.rr(ctx, 446, 168, 60, 32, 4);
    ctx.fill();
    ctx.fillStyle = '#8a5a30';
    ctx.fillRect(446, 178, 60, 4);

    // --- wall gears (one goes missing when shifted) ---
    gear(ctx, 320, 90, 26, 8, '#9aa0aa');
    if (!shifted) gear(ctx, 380, 74, 18, 7, '#7a7f8a');
    gear(ctx, 268, 66, 15, 6, '#b0b6c0');

    // --- hammer hanging (moves down when shifted) ---
    ctx.save();
    ctx.translate(420, shifted ? 180 : 150);
    ctx.rotate(0.5);
    ctx.fillStyle = '#8a6a45';
    h.rr(ctx, -4, 0, 8, 46, 3);
    ctx.fill();
    ctx.fillStyle = '#5d6b7a';
    h.rr(ctx, -16, -14, 32, 16, 4);
    ctx.fill();
    ctx.restore();

    // --- workbench ---
    ctx.save();
    ctx.translate(320, 330);
    ctx.fillStyle = '#a87a48';
    ctx.fillRect(-190, -16, 380, 26);
    ctx.fillStyle = '#8a5f36';
    ctx.fillRect(-190, 10, 380, 8);
    ctx.fillStyle = '#6b4423';
    ctx.fillRect(-176, 18, 16, 110);
    ctx.fillRect(160, 18, 16, 110);
    ctx.restore();

    // --- paint jar on the bench (recolours when shifted) ---
    ctx.save();
    ctx.translate(180, 270);
    ctx.fillStyle = shifted ? '#3f9e52' : '#d64545';
    h.rr(ctx, -14, -22, 28, 44, 5);
    ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    ctx.fillRect(-10, -18, 5, 34);
    ctx.fillStyle = '#3a3f4a';
    ctx.fillRect(-14, -26, 28, 6);
    ctx.restore();

    // --- toy train (an extra car appears when shifted) ---
    ctx.save();
    ctx.translate(300, 300);
    ctx.fillStyle = '#d64545';
    h.rr(ctx, -46, -22, 44, 30, 6);
    ctx.fill();
    ctx.fillStyle = '#ffd23d';
    h.rr(ctx, -46, -22, 44, 10, 6);
    ctx.fill();
    ctx.fillStyle = '#3a3f4a';
    h.circ(ctx, -34, 10, 7);
    ctx.fill();
    h.circ(ctx, -12, 10, 7);
    ctx.fill();
    ctx.fillStyle = '#4a7ac2';
    h.rr(ctx, 4, -18, 38, 26, 5);
    ctx.fill();
    ctx.fillStyle = '#3a3f4a';
    h.circ(ctx, 14, 10, 7);
    ctx.fill();
    h.circ(ctx, 32, 10, 7);
    ctx.fill();
    if (shifted) {
      ctx.fillStyle = '#5a9e52';
      h.rr(ctx, 48, -18, 34, 26, 5);
      ctx.fill();
      ctx.fillStyle = '#3a3f4a';
      h.circ(ctx, 58, 10, 7);
      ctx.fill();
      h.circ(ctx, 74, 10, 7);
      ctx.fill();
    }
    ctx.restore();

    // --- toy blocks (one rotates when shifted) ---
    const blocks = [
      [250, 330, '#e8a83d', 'A'],
      [280, 320, '#4a7ac2', 'B'],
      [310, 330, '#5a9e52', 'C'],
    ];
    for (let i = 0; i < blocks.length; i++) {
      const b = blocks[i];
      ctx.save();
      ctx.translate(b[0], b[1]);
      if (shifted && i === 1) ctx.rotate(Math.PI / 4);
      ctx.fillStyle = b[2];
      ctx.fillRect(-13, -13, 26, 26);
      ctx.strokeStyle = 'rgba(0,0,0,0.25)';
      ctx.lineWidth = 2;
      ctx.strokeRect(-13, -13, 26, 26);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 16px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(b[3], 0, 1);
      ctx.restore();
    }

    // --- screwdriver on the bench (handle pattern changes) ---
    ctx.save();
    ctx.translate(240, 360);
    ctx.rotate(-0.4);
    ctx.fillStyle = '#c0c8d0';
    h.rr(ctx, -4, -30, 8, 34, 3);
    ctx.fill();
    ctx.fillStyle = '#e8a83d';
    h.rr(ctx, -7, 4, 14, 26, 6);
    ctx.fill();
    if (shifted) {
      ctx.fillStyle = '#ffffff';
      h.circ(ctx, 0, 12, 2.5);
      ctx.fill();
      h.circ(ctx, 0, 22, 2.5);
      ctx.fill();
    } else {
      ctx.strokeStyle = '#b5763a';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(-7, 12);
      ctx.lineTo(7, 12);
      ctx.moveTo(-7, 22);
      ctx.lineTo(7, 22);
      ctx.stroke();
    }
    ctx.restore();

    // --- teddy bear (bow swaps colour when shifted) ---
    ctx.save();
    ctx.translate(120, 330);
    ctx.fillStyle = '#a8763e';
    h.el(ctx, 0, 0, 26, 22);
    ctx.fill();
    h.circ(ctx, 0, -26, 16);
    ctx.fill();
    h.circ(ctx, -14, -38, 6);
    ctx.fill();
    h.circ(ctx, 14, -38, 6);
    ctx.fill();
    h.el(ctx, -24, -6, 9, 14);
    ctx.fill();
    h.el(ctx, 24, -6, 9, 14);
    ctx.fill();
    ctx.fillStyle = '#7a5230';
    h.circ(ctx, -6, -28, 2);
    ctx.fill();
    h.circ(ctx, 6, -28, 2);
    ctx.fill();
    h.el(ctx, 0, -20, 5, 3.5);
    ctx.fill();
    // bow
    ctx.fillStyle = shifted ? '#4a7ac2' : '#d64545';
    ctx.beginPath();
    ctx.moveTo(0, -8);
    ctx.lineTo(-12, -16);
    ctx.lineTo(-12, -2);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(0, -8);
    ctx.lineTo(12, -16);
    ctx.lineTo(12, -2);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    // --- rocking horse (grows when shifted) ---
    ctx.save();
    ctx.translate(500, 350);
    const hs = shifted ? 1.2 : 1;
    ctx.scale(hs, hs);
    ctx.strokeStyle = '#8a5a30';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.arc(0, 26, 46, 0.25, Math.PI - 0.25);
    ctx.stroke();
    ctx.fillStyle = '#c27a4a';
    ctx.beginPath();
    ctx.moveTo(-28, -18);
    ctx.quadraticCurveTo(-34, 6, -18, 8);
    ctx.lineTo(18, 8);
    ctx.quadraticCurveTo(34, 6, 28, -18);
    ctx.quadraticCurveTo(0, -30, -28, -18);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(26, -14);
    ctx.lineTo(40, -34);
    ctx.lineTo(46, -30);
    ctx.lineTo(34, -8);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = '#5a4632';
    h.circ(ctx, 34, -30, 3);
    ctx.fill();
    ctx.strokeStyle = '#5a4632';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(-24, 8);
    ctx.lineTo(-24, 24);
    ctx.moveTo(24, 8);
    ctx.lineTo(24, 24);
    ctx.stroke();
    ctx.fillStyle = '#d64545';
    ctx.beginPath();
    ctx.moveTo(-8, -26);
    ctx.lineTo(8, -26);
    ctx.lineTo(0, -14);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    // --- sawdust + wood shavings (camouflage) ---
    h.speckle(ctx, R, 60, 400, 520, 70, 60, '#e8dcc0', 1, 3, 0.6);
    ctx.strokeStyle = '#d9c08a';
    ctx.lineWidth = 2;
    for (let i = 0; i < 8; i++) {
      const sx = 120 + R() * 420;
      const sy = 420 + R() * 40;
      ctx.beginPath();
      ctx.arc(sx, sy, 5 + R() * 4, R() * 3, R() * 3 + 2);
      ctx.stroke();
    }
    // small offcut blocks
    ctx.fillStyle = '#b98a56';
    ctx.fillRect(560, 420, 34, 16);
    ctx.fillStyle = '#8a5f36';
    ctx.fillRect(80, 430, 28, 14);

    // --- hanging lamp + dust motes + bench grain (identical in both) ---
    ctx.save();
    ctx.strokeStyle = '#3a2f1d';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(110, 0);
    ctx.lineTo(110, 18);
    ctx.stroke();
    ctx.fillStyle = '#3a3f4a';
    ctx.beginPath();
    ctx.moveTo(94, 34);
    ctx.lineTo(126, 34);
    ctx.lineTo(118, 16);
    ctx.lineTo(102, 16);
    ctx.closePath();
    ctx.fill();
    h.glow(ctx, 110, 36, 60, '#ffe9a8', 0.5);
    ctx.fillStyle = '#ffe9a8';
    h.circ(ctx, 110, 34, 6);
    ctx.fill();
    ctx.restore();
    ctx.fillStyle = 'rgba(255,240,200,0.55)';
    for (const d of [[200, 80], [300, 60], [250, 140], [150, 200], [350, 120]]) {
      h.circ(ctx, d[0], d[1], 1.5);
      ctx.fill();
    }
    // bench grain, split around the toy blocks (x 237..323)
    ctx.strokeStyle = 'rgba(70,45,20,0.28)';
    ctx.lineWidth = 2;
    for (const gy of [322, 332]) {
      ctx.beginPath();
      ctx.moveTo(140, gy);
      ctx.lineTo(230, gy);
      ctx.moveTo(330, gy);
      ctx.lineTo(500, gy);
      ctx.stroke();
    }
  }

  window.DrawWorkshop = draw;
  window.WORKSHOP_DIFFS = DIFFS;
})();
