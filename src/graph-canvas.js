import { familyPoints, formatNumber } from './function-analysis.js';

export const defaultView = { xmin: -8, xmax: 8, ymin: -5, ymax: 5 };

export function sampleImage(model, { xmin, xmax }, count = 800) {
  let min = Infinity, max = -Infinity;
  const add = x => {
    const y = model.evaluate(x);
    if (Number.isFinite(y)) { min = Math.min(min, y); max = Math.max(max, y); }
  };
  for (let i = 0; i <= count; i++) add(xmin + (xmax - xmin) * (i / count));
  for (const part of model.domain || []) {
    if (part.lc && part.lo >= xmin && part.lo <= xmax) add(part.lo);
    if (part.rc && part.hi >= xmin && part.hi <= xmax) add(part.hi);
  }
  return min <= max ? [min, max] : null;
}

export function fitView(model) {
  let { xmin, xmax, ymin, ymax } = defaultView;
  const first = model.domain?.[0]?.lo, last = model.domain?.at(-1)?.hi;
  if (Number.isFinite(first) && Number.isFinite(last)) {
    const margin = Math.max(.5, (last - first) * .15);
    xmin = first - margin;
    xmax = last + margin;
  } else if (Number.isFinite(first) && first > 5) {
    xmin = first - 2;
    xmax = first + 14;
  } else if (Number.isFinite(last) && last < -5) {
    xmin = last - 14;
    xmax = last + 2;
  }
  if (!Number.isFinite(xmax - xmin) || xmax <= xmin) ({ xmin, xmax } = defaultView);

  const lower = model.range?.[0]?.lo, upper = model.range?.at(-1)?.hi;
  if (Number.isFinite(lower) && Number.isFinite(upper)) {
    const margin = Math.max(.25, (upper - lower) * .25, lower === upper ? Math.abs(lower) * .05 : 0);
    ymin = lower - margin;
    ymax = upper + margin;
  } else {
    const ys = [];
    for (let i = 0; i <= 300; i++) {
      const y = model.evaluate(xmin + (xmax - xmin) * (i / 300));
      if (Number.isFinite(y)) ys.push(y);
    }
    ys.sort((a, b) => a - b);
    if (ys.length) {
      const lo = ys[Math.floor((ys.length - 1) * .05)], hi = ys[Math.ceil((ys.length - 1) * .95)];
      const margin = Math.max(.6, (hi - lo) * .17);
      ymin = lo - margin;
      ymax = hi + margin;
      if (lo <= 0 && hi >= 0 && hi - lo < 4) {
        ymin = Math.min(ymin, -3);
        ymax = Math.max(ymax, 3);
      }
    }
  }
  if (!Number.isFinite(ymax - ymin) || ymax <= ymin) ({ ymin, ymax } = defaultView);
  return { xmin, xmax, ymin, ymax };
}

function ticks(lo, hi, count) {
  const raw = (hi - lo) / count;
  const scale = 10 ** Math.floor(Math.log10(raw));
  const step = ([1, 2, 2.5, 5, 10].find(n => n * scale >= raw) || 10) * scale;
  const start = Math.ceil(lo / step), end = Math.floor(hi / step);
  if (!Number.isSafeInteger(start) || !Number.isSafeInteger(end) || end - start > 20) return [];
  return Array.from({ length: Math.max(0, end - start + 1) }, (_, i) => (start + i) * step);
}

function clippedParts(model, { xmin, xmax }, breaks) {
  const parts = model.domain ?? [{ lo: -Infinity, hi: Infinity, lc: false, rc: false }];
  return parts.flatMap(part => {
    const lo = Math.max(xmin, part.lo), hi = Math.min(xmax, part.hi);
    if (lo >= hi) return [];
    const cuts = [lo, ...breaks.filter(x => x > lo && x < hi), hi];
    return cuts.slice(1).map((x, i) => ({
      lo: cuts[i], hi: x,
      lc: i === 0 && (lo > part.lo || part.lc) && !breaks.includes(lo),
      rc: i === cuts.length - 2 && (hi < part.hi || part.rc) && !breaks.includes(hi)
    }));
  });
}

export function drawGraph(canvas, model, view, options) {
  const width = canvas.clientWidth, height = canvas.clientHeight;
  if (width < 100 || height < 100) return null;
  const pixelRatio = Math.min(3, window.devicePixelRatio || 1);
  if (canvas.width !== Math.round(width * pixelRatio)) canvas.width = Math.round(width * pixelRatio);
  if (canvas.height !== Math.round(height * pixelRatio)) canvas.height = Math.round(height * pixelRatio);
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;
  ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

  const { xmin, xmax, ymin, ymax } = view;
  const xTicks = ticks(xmin, xmax, width < 420 ? 5 : 8);
  const yTicks = ticks(ymin, ymax, height < 300 ? 5 : 7);
  ctx.font = '11px system-ui, sans-serif';
  const labelWidth = Math.max(21, ...yTicks.map(n => ctx.measureText(formatNumber(n)).width));
  const box = { left: options.left ?? labelWidth + 14, right: width - 23, top: 19, bottom: height - 34 };
  if (box.right - box.left < 30) return null;
  const w = box.right - box.left, h = box.bottom - box.top;
  const px = x => box.left + w * ((x - xmin) / (xmax - xmin));
  const py = y => box.bottom - h * ((y - ymin) / (ymax - ymin));
  const worldX = pixel => xmin + (xmax - xmin) * ((pixel - box.left) / w);
  const colors = options.colors;

  const line = (x1, y1, x2, y2, color, lineWidth = 1) => {
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  };
  const dot = (x, y, color, filled, radius = 3.7) => {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = filled ? color : colors.background;
    ctx.fill();
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.7;
    ctx.stroke();
  };
  const visibleX = x => x >= xmin && x <= xmax;
  const visibleY = y => y >= ymin && y <= ymax;
  const cappedY = y => Math.max(box.top - 4 * h, Math.min(box.bottom + 4 * h, py(y)));
  ctx.fillStyle = colors.background;
  ctx.fillRect(0, 0, width, height);
  ctx.textBaseline = 'middle';
  for (const x of xTicks) line(px(x), box.top, px(x), box.bottom, colors.grid);
  for (const y of yTicks) line(box.left, py(y), box.right, py(y), colors.grid);
  if (visibleY(0)) line(box.left, py(0), box.right, py(0), colors.axis, 1.35);
  if (visibleX(0)) line(px(0), box.top, px(0), box.bottom, colors.axis, 1.35);

  ctx.fillStyle = colors.text;
  ctx.textAlign = 'center';
  for (const x of xTicks) ctx.fillText(formatNumber(x), px(x), height - 13);
  ctx.textAlign = 'right';
  for (const y of yTicks) ctx.fillText(formatNumber(y), box.left - 7, py(y));
  ctx.font = 'italic 13px Georgia, serif';
  ctx.fillText('x', width - 7, box.bottom + 2);
  ctx.textAlign = 'left';
  ctx.fillText('y', box.left + 2, 9);

  const periodic = model.families.flatMap(family => familyPoints(family, xmin, xmax));
  const cuts = [...new Set([...model.boundaries, ...periodic])].sort((a, b) => a - b);
  ctx.save();
  ctx.beginPath();
  ctx.rect(box.left, box.top, w, h);
  ctx.clip();

  if (options.asymptotes) {
    ctx.setLineDash([6, 5]);
    for (const a of model.asymptotes) {
      if (a.axis === 'x') {
        const xs = a.family ? familyPoints(a.family, xmin, xmax) : [a.x];
        for (const x of xs.filter(visibleX)) line(px(x), box.top, px(x), box.bottom, colors.asymptote, 1.6);
      } else {
        // Las oblicuas de una sola cola se dibujan hacia ese extremo.
        let lo = a.m !== 0 && !a.sides.includes(-1) ? Math.max(0, xmin) : xmin;
        let hi = a.m !== 0 && !a.sides.includes(1) ? Math.min(0, xmax) : xmax;
        if (a.m !== 0) {
          const a0 = (ymin - a.b) / a.m, a1 = (ymax - a.b) / a.m;
          lo = Math.max(lo, Math.min(a0, a1));
          hi = Math.min(hi, Math.max(a0, a1));
        }
        if (lo < hi) line(px(lo), cappedY(a.m * lo + a.b), px(hi), cappedY(a.m * hi + a.b), colors.asymptote, 1.6);
      }
    }
    ctx.setLineDash([]);
  }

  ctx.strokeStyle = colors.curve;
  ctx.lineWidth = 2.4;
  ctx.lineJoin = 'round';
  ctx.beginPath();
  for (const part of clippedParts(model, view, cuts)) {
    const length = part.hi - part.lo;
    const pad = Math.min(length / 10000, (xmax - xmin) / (w * 40));
    const lo = part.lo + (part.lc ? 0 : pad), hi = part.hi - (part.rc ? 0 : pad);
    const count = Math.max(3, Math.ceil((px(hi) - px(lo)) * 1.7));
    let previous = null;
    for (let i = 0; i <= count; i++) {
      const x = i === count ? hi : lo + (hi - lo) * (i / count);
      const y = model.evaluate(x);
      if (!Number.isFinite(y)) { previous = null; continue; }
      let split = !previous;
      if (previous && Math.abs(py(previous.y) - py(y)) > h * .65) {
        const mid = model.evaluate(x / 2 + previous.x / 2);
        split = !Number.isFinite(mid) || Math.abs(py(mid) - (py(previous.y) + py(y)) / 2) > h * .42;
      }
      if (split) ctx.moveTo(px(x), cappedY(y));
      else ctx.lineTo(px(x), cappedY(y));
      previous = { x, y };
    }
  }
  ctx.stroke();
  for (const { x, y } of model.holes) {
    if (visibleX(x) && visibleY(y)) dot(px(x), py(y), colors.curve, false);
  }
  for (const part of model.domain || []) {
    for (const x of new Set([...(part.lc ? [part.lo] : []), ...(part.rc ? [part.hi] : [])])) {
      if (!visibleX(x) || periodic.includes(x)) continue;
      const y = model.evaluate(x);
      if (Number.isFinite(y) && visibleY(y)) dot(px(x), py(y), colors.curve, true, 3);
    }
  }

  const markers = [];
  const groups = new Map();
  for (const marker of options.markers || []) {
    if (!visibleX(marker.x) || !visibleY(marker.y)) continue;
    const item = { ...marker, px: px(marker.x), py: py(marker.y) };
    markers.push(item);
    const key = Math.round(item.px / 2) + ':' + Math.round(item.py / 2);
    if (!groups.has(key)) groups.set(key, []);
    const group = groups.get(key);
    if (!group.some(point => point.color === item.color)) group.push(item);
  }
  for (const group of groups.values()) {
    // Anillos concéntricos para los puntos que pertenecen a varias capas.
    for (let i = group.length - 1; i >= 0; i--) {
      const { px: x, py: y, color } = group[i];
      dot(x, y, color, i === 0, 4 + i * 2.4);
    }
  }

  if (options.cursor && visibleX(options.cursor.x)) {
    const { x, y } = options.cursor;
    ctx.setLineDash([3, 4]);
    line(px(x), box.top, px(x), box.bottom, colors.axis);
    if (Number.isFinite(y) && visibleY(y)) {
      line(box.left, py(y), box.right, py(y), colors.axis);
      ctx.setLineDash([]);
      if (!markers.some(point => Math.hypot(point.px - px(x), point.py - py(y)) <= 2)) {
        dot(px(x), py(y), colors.curve, true, 4);
      }
    }
    ctx.setLineDash([]);
  }
  ctx.restore();

  if (options.projections) {
    const bandY = box.bottom + 8, bandX = box.right + 6;
    for (const { lo, hi, lc, rc } of model.domain || []) {
      if (hi < xmin || lo > xmax) continue;
      line(px(Math.max(xmin, lo)), bandY, px(Math.min(xmax, hi)), bandY, colors.domain, 2.8);
      if (visibleX(lo)) dot(px(lo), bandY, colors.domain, lc, 2.7);
      if (visibleX(hi)) dot(px(hi), bandY, colors.domain, rc, 2.7);
    }
    for (const x of periodic) if (model.domain?.some(part => x >= part.lo && x <= part.hi)) {
      dot(px(x), bandY, colors.domain, false, 2.7);
    }
    for (const { lo, hi, lc, rc } of model.range || []) {
      if (hi < ymin || lo > ymax) continue;
      line(bandX, py(Math.max(ymin, lo)), bandX, py(Math.min(ymax, hi)), colors.range, 2.8);
      if (visibleY(lo)) dot(bandX, py(lo), colors.range, lc, 2.7);
      if (visibleY(hi)) dot(bandX, py(hi), colors.range, rc, 2.7);
    }
  }
  return { ...box, worldX, markers, screenPoint: point => ({ x: px(point.x), y: py(point.y) }) };
}
