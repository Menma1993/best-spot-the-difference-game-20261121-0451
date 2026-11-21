export function circle(ctx, x, y, r, fill) {
  if (fill === null || fill === undefined) return;
  ctx.beginPath();
  ctx.fillStyle = fill;
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();
}

export function ring(ctx, x, y, r, color, width) {
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.stroke();
}

export function ellipse(ctx, x, y, rx, ry, fill) {
  ctx.beginPath();
  ctx.fillStyle = fill;
  ctx.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2);
  ctx.fill();
}

export function rect(ctx, x, y, w, h, fill) {
  ctx.beginPath();
  ctx.fillStyle = fill;
  ctx.rect(x, y, w, h);
  ctx.fill();
}

export function rrect(ctx, x, y, w, h, r, fill) {
  ctx.beginPath();
  ctx.fillStyle = fill;
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
  ctx.fill();
}

export function poly(ctx, points, fill) {
  ctx.beginPath();
  ctx.fillStyle = fill;
  ctx.moveTo(points[0][0], points[0][1]);
  for (let i = 1; i < points.length; i++) {
    ctx.lineTo(points[i][0], points[i][1]);
  }
  ctx.closePath();
  ctx.fill();
}

export function star(ctx, x, y, r, points, fill) {
  const spikes = points || 5;
  const outerR = r;
  const innerR = r / 2.5;
  const step = Math.PI / spikes;
  ctx.beginPath();
  ctx.fillStyle = fill;
  let rot = -Math.PI / 2;
  ctx.moveTo(x + Math.cos(rot) * outerR, y + Math.sin(rot) * outerR);
  for (let i = 0; i < spikes; i++) {
    rot += step;
    ctx.lineTo(x + Math.cos(rot) * innerR, y + Math.sin(rot) * innerR);
    rot += step;
    ctx.lineTo(x + Math.cos(rot) * outerR, y + Math.sin(rot) * outerR);
  }
  ctx.closePath();
  ctx.fill();
}

export function line(ctx, x1, y1, x2, y2, color, width) {
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}

export function vgrad(ctx, x, y, w, h, top, bottom) {
  const g = ctx.createLinearGradient(x, y, x, y + h);
  g.addColorStop(0, top);
  g.addColorStop(1, bottom);
  return g;
}

export function text(ctx, str, x, y, size, color, align) {
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.font = 'bold ' + size + 'px sans-serif';
  ctx.textAlign = align || 'left';
  ctx.textBaseline = 'middle';
  ctx.fillText(str, x, y);
}

export function check(ctx, x, y, s, color, width) {
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.moveTo(x - s * 0.5, y);
  ctx.lineTo(x - s * 0.15, y + s * 0.4);
  ctx.lineTo(x + s * 0.5, y - s * 0.4);
  ctx.stroke();
}

// Soft ground shadow: a translucent dark ellipse under an object.
export function softShadow(ctx, x, y, rx, ry) {
  ctx.beginPath();
  ctx.fillStyle = 'rgba(20, 40, 60, 0.18)';
  ctx.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2);
  ctx.fill();
}

// Gentle vignette: darkens the panel corners so the middle reads first.
export function vignette(ctx, w, h) {
  const g = ctx.createRadialGradient(w / 2, h / 2, Math.min(w, h) * 0.35, w / 2, h / 2, Math.max(w, h) * 0.72);
  g.addColorStop(0, 'rgba(0, 0, 0, 0)');
  g.addColorStop(1, 'rgba(10, 25, 45, 0.20)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);
}

// Deterministic speckles: dots from a fixed list of [x, y, r] triples.
export function speck(ctx, pts, color) {
  ctx.beginPath();
  ctx.fillStyle = color;
  for (const p of pts) {
    ctx.moveTo(p[0] + p[2], p[1]);
    ctx.arc(p[0], p[1], p[2], 0, Math.PI * 2);
  }
  ctx.fill();
}
