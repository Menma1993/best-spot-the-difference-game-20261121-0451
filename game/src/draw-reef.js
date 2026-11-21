// Coral Reef Dive — underwater reef, 8 sneaky differences.
(function () {
  'use strict';

  const DIFFS = [
    { name: "Turtle's ring", x: 300, y: 132, r: 26 },
    { name: 'Fish tail', x: 520, y: 300, r: 24 },
    { name: 'Jellyfish tentacle', x: 520, y: 185, r: 24 },
    { name: 'Starfish', x: 430, y: 430, r: 24 },
    { name: 'Pink shell', x: 180, y: 435, r: 22 },
    { name: 'Coral branch', x: 95, y: 230, r: 24 },
    { name: 'Bubble', x: 380, y: 120, r: 26 },
    { name: 'Distant fish', x: 150, y: 80, r: 20 },
  ];

  function fish(ctx, x, y, s, color, flip) {
    const d = flip ? -1 : 1;
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(d * s, s);
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.ellipse(0, 0, 16, 9, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(-13, 0);
    ctx.lineTo(-24, -8);
    ctx.lineTo(-24, 8);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = '#10222e';
    ctx.beginPath();
    ctx.arc(8, -2, 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  function draw(ctx, W, H, shifted) {
    const h = window.H;
    const R = h.rng(11);

    // --- background: sunlit water ---
    ctx.fillStyle = h.lg(ctx, 0, 0, 0, H, [
      [0, '#8fd8ec'],
      [0.45, '#2f8fb8'],
      [1, '#0a3a5c'],
    ]);
    ctx.fillRect(0, 0, W, H);

    // Sunlit sheen near the surface.
    ctx.fillStyle = h.lg(ctx, 0, 0, 0, 90, [[0, 'rgba(255,255,255,0.20)'], [1, 'rgba(255,255,255,0)']]);
    ctx.fillRect(0, 0, W, 90);

    // Light rays from the surface.
    ctx.save();
    ctx.globalAlpha = 0.14;
    ctx.fillStyle = '#ffffff';
    for (let i = 0; i < 4; i++) {
      const x0 = 60 + i * 150;
      h.poly(ctx, [
        [x0, 0],
        [x0 + 46, 0],
        [x0 + 130, 300],
        [x0 + 70, 300],
      ]);
      ctx.fill();
    }
    ctx.restore();

    // --- distant reef silhouette (depth layer 1) ---
    ctx.fillStyle = '#0d4a6b';
    ctx.beginPath();
    ctx.moveTo(0, 340);
    ctx.quadraticCurveTo(120, 250, 260, 320);
    ctx.quadraticCurveTo(380, 380, 470, 310);
    ctx.quadraticCurveTo(560, 250, 640, 320);
    ctx.lineTo(640, 480);
    ctx.lineTo(0, 480);
    ctx.closePath();
    ctx.fill();

    // Distant small fish (one of them is a difference).
    ctx.fillStyle = '#0a2f47';
    const farFish = [
      [90, 70],
      [150, 80],
      [230, 60],
      [330, 95],
      [430, 65],
      [560, 90],
    ];
    for (let i = 0; i < farFish.length; i++) {
      if (shifted && i === 1) continue; // the distant fish goes missing
      const p = farFish[i];
      ctx.beginPath();
      ctx.ellipse(p[0], p[1], 9, 5, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(p[0] - 8, p[1]);
      ctx.lineTo(p[0] - 14, p[1] - 4);
      ctx.lineTo(p[0] - 14, p[1] + 4);
      ctx.closePath();
      ctx.fill();
    }

    // --- sand (depth layer 3 base) ---
    ctx.fillStyle = h.lg(ctx, 0, 405, 0, H, [[0, '#ecd9a4'], [1, '#c9a86a']]);
    ctx.fillRect(0, 405, W, 75);
    // Caustic light: wavy bright arcs on the sand.
    ctx.save();
    ctx.strokeStyle = 'rgba(255,250,210,0.65)';
    ctx.lineWidth = 2;
    for (let i = 0; i < 9; i++) {
      const y = 418 + i * 6;
      ctx.beginPath();
      for (let x = 0; x <= W; x += 16) {
        const yy = y + Math.sin(x / 55 + i) * 4;
        if (x === 0) ctx.moveTo(x, yy);
        else ctx.lineTo(x, yy);
      }
      ctx.stroke();
    }
    ctx.restore();
    h.speckle(ctx, R, 0, 410, W, 66, 90, '#8a6a35', 1, 3, 0.45);

    // --- seaweed strands ---
    for (let i = 0; i < 8; i++) {
      const x = 30 + i * 78 + R() * 20;
      h.wavy(ctx, x, 470, 70 + R() * 60, 14, 5, 5, i % 2 ? '#1f7a4d' : '#2a9d63');
    }

    // --- rocks ---
    ctx.fillStyle = '#5d6b7a';
    const rocks = [
      [60, 440, 34, 18],
      [250, 452, 44, 16],
      [600, 445, 38, 18],
    ];
    for (const rk of rocks) {
      h.el(ctx, rk[0], rk[1], rk[2], rk[3]);
      ctx.fill();
      ctx.fillStyle = h.shade('#5d6b7a', 18);
      h.el(ctx, rk[0] - 8, rk[1] - 5, rk[2] * 0.5, rk[3] * 0.45);
      ctx.fill();
      ctx.fillStyle = '#5d6b7a';
    }

    // --- pink branching coral (left) ---
    ctx.save();
    ctx.strokeStyle = '#ff7fa5';
    ctx.lineCap = 'round';
    const branch = function (x, y, len, ang, depth) {
      if (depth === 0) return;
      const x2 = x + Math.cos(ang) * len;
      const y2 = y + Math.sin(ang) * len;
      ctx.lineWidth = depth * 3;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x2, y2);
      ctx.stroke();
      branch(x2, y2, len * 0.72, ang - 0.5, depth - 1);
      branch(x2, y2, len * 0.72, ang + 0.45, depth - 1);
    };
    branch(95, 400, 52, -Math.PI / 2, 3);
    if (shifted) {
      // one extra branch appears
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.moveTo(95, 230);
      ctx.lineTo(72, 200);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(72, 200);
      ctx.lineTo(58, 182);
      ctx.stroke();
    }
    ctx.restore();

    // --- purple fan coral (centre) ---
    ctx.save();
    ctx.fillStyle = '#9b6dd6';
    ctx.globalAlpha = 0.9;
    ctx.beginPath();
    ctx.moveTo(300, 405);
    ctx.quadraticCurveTo(240, 300, 300, 285);
    ctx.quadraticCurveTo(360, 300, 300, 405);
    ctx.closePath();
    ctx.fill();
    ctx.globalAlpha = 0.35;
    ctx.strokeStyle = '#c9a6ef';
    ctx.lineWidth = 2;
    for (let i = -2; i <= 2; i++) {
      ctx.beginPath();
      ctx.moveTo(300, 400);
      ctx.quadraticCurveTo(300 + i * 22, 340, 300 + i * 30, 292);
      ctx.stroke();
    }
    ctx.restore();

    // --- orange tube corals (right) ---
    for (let i = 0; i < 4; i++) {
      const x = 560 + i * 18;
      const ht = 55 + (i % 2) * 22;
      ctx.fillStyle = i % 2 ? '#ff9e4d' : '#ff7a2f';
      h.rr(ctx, x, 405 - ht, 14, ht, 7);
      ctx.fill();
      ctx.fillStyle = '#ffd9a8';
      h.el(ctx, x + 7, 405 - ht, 7, 4);
      ctx.fill();
    }

    // --- turtle with its golden ring (centre-left) ---
    ctx.save();
    ctx.translate(300, 190);
    // flippers
    ctx.fillStyle = '#3d6b2f';
    h.el(ctx, -46, 22, 20, 9);
    ctx.fill();
    h.el(ctx, 46, 22, 20, 9);
    ctx.fill();
    h.el(ctx, -40, -26, 16, 8);
    ctx.fill();
    h.el(ctx, 40, -26, 16, 8);
    ctx.fill();
    // head
    h.circ(ctx, 58, -6, 13);
    ctx.fill();
    ctx.fillStyle = '#10222e';
    h.circ(ctx, 62, -10, 2.5);
    ctx.fill();
    // shell
    ctx.fillStyle = '#4a7c3a';
    h.el(ctx, 0, 0, 52, 38);
    ctx.fill();
    ctx.fillStyle = '#6da352';
    h.el(ctx, 0, -4, 42, 28);
    ctx.fill();
    ctx.strokeStyle = '#3d6b2f';
    ctx.lineWidth = 2;
    for (let i = -1; i <= 1; i++) {
      h.el(ctx, i * 22, 0, 12, 18);
      ctx.stroke();
    }
    // the ring: fully inside the panel
    ctx.strokeStyle = shifted ? '#2ec4b6' : '#f5c542';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.arc(0, 0, 58, 0, Math.PI * 2);
    ctx.stroke();
    ctx.strokeStyle = 'rgba(255,255,255,0.65)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(0, 0, 58, -2.4, -1.2);
    ctx.stroke();
    ctx.restore();

    // --- blue fish: only its orange tail shows behind the coral ---
    ctx.save();
    ctx.fillStyle = '#2f7fd0';
    h.el(ctx, 545, 300, 16, 10);
    ctx.fill();
    ctx.fillStyle = '#ff8c2f';
    const ts = shifted ? 1.3 : 1;
    ctx.beginPath();
    ctx.moveTo(528, 300);
    ctx.lineTo(512, 300 - 16 * ts);
    ctx.lineTo(512, 300 + 16 * ts);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    // --- jellyfish (right) ---
    ctx.save();
    ctx.translate(520, 140);
    ctx.fillStyle = 'rgba(255,150,200,0.9)';
    ctx.beginPath();
    ctx.arc(0, 0, 26, Math.PI, 0);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = 'rgba(255,210,230,0.7)';
    ctx.beginPath();
    ctx.arc(-6, -6, 9, Math.PI, 0);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,150,200,0.85)';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    for (let i = -2; i <= 2; i++) {
      if (shifted && i === 0) continue; // middle tentacle goes missing
      ctx.beginPath();
      ctx.moveTo(i * 10, 2);
      ctx.quadraticCurveTo(i * 10 + 6, 22, i * 10 - 4, 44);
      ctx.stroke();
    }
    ctx.restore();

    // --- starfish on the sand (rotates when shifted) ---
    ctx.save();
    ctx.translate(430, 430);
    ctx.rotate(shifted ? 0.7 : 0);
    ctx.fillStyle = '#ff9e4d';
    h.star(ctx, 0, 0, 20, 8, 5);
    ctx.fill();
    ctx.fillStyle = '#e07b28';
    for (let i = 0; i < 5; i++) {
      const a = (i / 5) * Math.PI * 2 - Math.PI / 2;
      h.circ(ctx, Math.cos(a) * 10, Math.sin(a) * 10, 2);
      ctx.fill();
    }
    ctx.restore();

    // --- shell on the sand (recolours when shifted) ---
    ctx.save();
    ctx.translate(180, 435);
    ctx.fillStyle = shifted ? '#b678e8' : '#ff9ebb';
    ctx.beginPath();
    ctx.arc(0, 0, 16, Math.PI, 0);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.6)';
    ctx.lineWidth = 2;
    for (let i = -1; i <= 1; i++) {
      ctx.beginPath();
      ctx.moveTo(i * 6, 0);
      ctx.lineTo(i * 9, -13);
      ctx.stroke();
    }
    ctx.restore();

    // --- the wandering bubble (moves when shifted) ---
    const bx = shifted ? 397 : 363;
    ctx.save();
    ctx.strokeStyle = 'rgba(255,255,255,0.8)';
    ctx.lineWidth = 1.5;
    h.circ(ctx, bx, 120, 9);
    ctx.stroke();
    ctx.fillStyle = 'rgba(255,255,255,0.35)';
    h.circ(ctx, bx - 3, 117, 3);
    ctx.fill();
    ctx.restore();

    // --- rising bubbles + tiny fish (camouflage, identical in both) ---
    ctx.save();
    ctx.strokeStyle = 'rgba(255,255,255,0.55)';
    ctx.lineWidth = 1.5;
    for (let i = 0; i < 12; i++) {
      const bx2 = 40 + R() * 560;
      const by2 = 90 + R() * 280;
      const br = 3 + R() * 6;
      h.circ(ctx, bx2, by2, br);
      ctx.stroke();
    }
    ctx.restore();
    fish(ctx, 210, 250, 0.8, '#ffd166', false);
    fish(ctx, 470, 210, 0.7, '#ff6b9d', true);
    fish(ctx, 120, 150, 0.6, '#7ee0c2', false);
    // anemone dots
    ctx.fillStyle = '#ff8fb0';
    for (let i = 0; i < 6; i++) {
      h.circ(ctx, 560 + R() * 60, 395, 3);
      ctx.fill();
    }

    // --- extra camouflage: small fish, bubbles, pebbles (identical in both) ---
    fish(ctx, 60, 200, 0.55, '#ff8fb0', false);
    fish(ctx, 600, 150, 0.6, '#7ee0c2', true);
    fish(ctx, 350, 55, 0.5, '#ffd166', false);
    ctx.save();
    ctx.strokeStyle = 'rgba(255,255,255,0.55)';
    ctx.lineWidth = 1.5;
    for (const b of [[90, 310, 4], [590, 260, 5], [260, 180, 3.5]]) {
      h.circ(ctx, b[0], b[1], b[2]);
      ctx.stroke();
    }
    ctx.restore();
    ctx.fillStyle = '#7a7f8a';
    h.el(ctx, 90, 452, 10, 6);
    ctx.fill();
    h.el(ctx, 330, 458, 12, 6);
    ctx.fill();
    h.el(ctx, 570, 448, 10, 6);
    ctx.fill();
  }

  window.DrawReef = draw;
  window.REEF_DIFFS = DIFFS;
})();
