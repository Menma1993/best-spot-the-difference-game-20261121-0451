// Shared procedural-drawing helpers for Spot the Shift.
// Every helper is deterministic: the seeded RNG makes both panels match
// pixel for pixel except for the differences themselves.
(function () {
  'use strict';

  // mulberry32: small deterministic PRNG.
  function rng(seed) {
    let a = seed >>> 0;
    return function () {
      a |= 0;
      a = (a + 0x6d2b79f5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function pick(rand, arr) {
    return arr[Math.floor(rand() * arr.length)];
  }

  // Rounded-rectangle path (does not fill or stroke by itself).
  function rr(ctx, x, y, w, h, r) {
    const rad = Math.max(0, Math.min(r, w / 2, h / 2));
    ctx.beginPath();
    ctx.moveTo(x + rad, y);
    ctx.arcTo(x + w, y, x + w, y + h, rad);
    ctx.arcTo(x + w, y + h, x, y + h, rad);
    ctx.arcTo(x, y + h, x, y, rad);
    ctx.arcTo(x, y, x + w, y, rad);
    ctx.closePath();
  }

  function el(ctx, x, y, rx, ry) {
    ctx.beginPath();
    ctx.ellipse(x, y, Math.max(0.5, rx), Math.max(0.5, ry), 0, 0, Math.PI * 2);
  }

  function circ(ctx, x, y, r) {
    ctx.beginPath();
    ctx.arc(x, y, Math.max(0.5, r), 0, Math.PI * 2);
  }

  function poly(ctx, pts) {
    ctx.beginPath();
    ctx.moveTo(pts[0][0], pts[0][1]);
    for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
    ctx.closePath();
  }

  function star(ctx, x, y, rOuter, rInner, points) {
    ctx.beginPath();
    for (let i = 0; i < points * 2; i++) {
      const r = i % 2 === 0 ? rOuter : rInner;
      const a = (i / (points * 2)) * Math.PI * 2 - Math.PI / 2;
      const px = x + Math.cos(a) * r;
      const py = y + Math.sin(a) * r;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();
  }

  // Lighten (amt > 0) or darken (amt < 0) a #rrggbb colour by percent.
  function shade(hex, amt) {
    const n = parseInt(hex.slice(1), 16);
    const r0 = (n >> 16) & 255;
    const g0 = (n >> 8) & 255;
    const b0 = n & 255;
    const t = amt < 0 ? 0 : 255;
    const p = Math.abs(amt) / 100;
    const r = Math.round(r0 + (t - r0) * p);
    const g = Math.round(g0 + (t - g0) * p);
    const b = Math.round(b0 + (t - b0) * p);
    return 'rgb(' + r + ',' + g + ',' + b + ')';
  }

  function lg(ctx, x0, y0, x1, y1, stops) {
    const g = ctx.createLinearGradient(x0, y0, x1, y1);
    for (const s of stops) g.addColorStop(s[0], s[1]);
    return g;
  }

  function rg(ctx, x, y, r0, r1, stops) {
    const g = ctx.createRadialGradient(x, y, r0, x, y, r1);
    for (const s of stops) g.addColorStop(s[0], s[1]);
    return g;
  }

  // Soft round glow: a radial wash of one colour fading to transparent.
  function glow(ctx, x, y, r, color, alpha) {
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = rg(ctx, x, y, 0, r, [[0, color], [1, 'rgba(0,0,0,0)']]);
    circ(ctx, x, y, r);
    ctx.fill();
    ctx.restore();
  }

  // Scatter of small dots inside a rectangle (texture, sand, stars...).
  function speckle(ctx, rand, x, y, w, h, n, color, rMin, rMax, alpha) {
    ctx.save();
    ctx.globalAlpha = alpha === undefined ? 0.5 : alpha;
    ctx.fillStyle = color;
    for (let i = 0; i < n; i++) {
      circ(ctx, x + rand() * w, y + rand() * h, rMin + rand() * (rMax - rMin));
      ctx.fill();
    }
    ctx.restore();
  }

  // A wavy strand (seaweed, tentacle, smoke): quadratic segments along points.
  function wavy(ctx, x, y, len, amp, segs, width, color) {
    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(x, y);
    for (let i = 1; i <= segs; i++) {
      const yy = y - (len * i) / segs;
      const xx = x + Math.sin((i / segs) * Math.PI * 2) * amp * (i / segs);
      ctx.lineTo(xx, yy);
    }
    ctx.stroke();
    ctx.restore();
  }

  window.H = { rng, pick, rr, el, circ, poly, star, shade, lg, rg, glow, speckle, wavy };
})();
