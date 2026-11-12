import { compileExpression, dependsOnX, functions, ungroup } from './math-expression.js';
import { familyPoints, rationalZeroSets } from './function-analysis.js';

// Coeficientes de Taylor en x. El de orden n es f^(n)(x)/n!.
// Usamos también el orden cuatro para buscar ceros tangentes de f‴.
const size = 5;
const orders = [0, 1, 2, 3];
const series = (value, slope = 0) => [value, slope, 0, 0, 0];
const invalid = value => [value, NaN, NaN, NaN, NaN];
const scale = (a, value) => a.map(c => c * value);
const add = (a, b, factor = 1) => a.map((c, i) => c + factor * b[i]);

function product(a, b) {
  return a.map((_, n) => {
    let coefficient = 0;
    for (let i = 0; i <= n; i++) coefficient += a[i] * b[n - i];
    return coefficient;
  });
}

function quotient(a, b) {
  if (!Number.isFinite(b[0]) || b[0] === 0) return invalid(a[0] / b[0]);
  const result = [a[0] / b[0]];
  for (let n = 1; n < size; n++) {
    let coefficient = a[n];
    for (let i = 1; i <= n; i++) coefficient -= b[i] * result[n - i];
    result.push(coefficient / b[0]);
  }
  return result;
}

function compose(a, outer) {
  const delta = [0, ...a.slice(1)];
  let result = series(outer[0]), power = series(1);
  for (let n = 1; n < size; n++) {
    power = product(power, delta);
    for (let i = n; i < size; i++) result[i] += outer[n] * power[i];
  }
  return result;
}

function power(a, exponent, realCubeRoot = false) {
  const x = a[0];
  const value = realCubeRoot ? Math.cbrt(x) : x ** exponent;
  if (!Number.isFinite(value)) return invalid(value);
  if (exponent === 0) return series(1);
  if (x === 0 && !Number.isInteger(exponent)) return invalid(value);
  const outer = [value];
  let coefficient = 1;
  for (let n = 1; n < size; n++) {
    coefficient *= (exponent - n + 1) / n;
    outer.push(coefficient === 0 ? 0 : coefficient * (x === 0 ? x ** (exponent - n) : value / x ** n));
  }
  return compose(a, outer);
}

const one = series(1);

function log(a) {
  const x = a[0];
  if (x <= 0) return invalid(NaN);
  return compose(a, [Math.log(x), 1 / x, -.5 / x ** 2, 1 / (3 * x ** 3), -.25 / x ** 4]);
}

function exp(a) {
  const value = Math.exp(a[0]);
  return compose(a, [value, value, value / 2, value / 6, value / 24]);
}

function sine(a) {
  const s = Math.sin(a[0]), c = Math.cos(a[0]);
  return compose(a, [s, c, -s / 2, -c / 6, s / 24]);
}

function cosine(a) {
  const s = Math.sin(a[0]), c = Math.cos(a[0]);
  return compose(a, [c, -s, -c / 2, s / 6, c / 24]);
}

function inverseTrig(a, name) {
  const x = a[0], value = functions[name](x);
  if (name !== 'arctg' && Math.abs(x) >= 1) return invalid(value);
  // Integramos la serie de la derivada de la función exterior.
  const u = series(x, 1);
  const squared = product(u, u);
  const denominator = name === 'arctg' ? add(one, squared) : power(add(one, squared, -1), .5);
  const d = quotient(series(name === 'arccos' ? -1 : 1), denominator);
  return compose(a, [value, ...d.slice(0, size - 1).map((c, i) => c / (i + 1))]);
}

function absolute(a) {
  if (a[0] !== 0) return scale(a, a[0] < 0 ? -1 : 1);
  const first = a.findIndex(c => c !== 0);
  if (first === -1 || !Number.isFinite(a[first])) return first === -1 ? a : invalid(0);
  if (first % 2 === 0) return scale(a, Math.sign(a[first]));
  return a.map((c, i) => i < first ? c : NaN);
}

const calls = {
  sen: sine, cos: cosine,
  tg: a => Number.isFinite(functions.tg(a[0])) ? quotient(sine(a), cosine(a)) : invalid(NaN),
  exp, log, log10: a => scale(log(a), 1 / Math.LN10),
  sqrt: a => power(a, .5), cbrt: a => power(a, 1 / 3, true), abs: absolute,
  arcsen: a => inverseTrig(a, 'arcsen'), arccos: a => inverseTrig(a, 'arccos'), arctg: a => inverseTrig(a, 'arctg')
};

function seriesEvaluator(tree) {
  const n = ungroup(tree);
  if (!dependsOnX(n)) {
    const constant = compileExpression(n)(0);
    return () => series(constant);
  }
  if (n.type === 'variable') return x => series(x, 1);
  if (n.type === 'call' || n.type === 'unary') {
    const evaluate = seriesEvaluator(n.arg);
    if (n.type === 'call') return x => calls[n.name](evaluate(x));
    return n.op === '-' ? x => scale(evaluate(x), -1) : evaluate;
  }
  const a = seriesEvaluator(n.left), b = seriesEvaluator(n.right);
  switch (n.op) {
    case '+': return x => add(a(x), b(x));
    case '-': return x => add(a(x), b(x), -1);
    case '*': return x => product(a(x), b(x));
    case '/': return x => quotient(a(x), b(x));
    case '^': {
      if (!dependsOnX(n.right)) {
        const exponent = b(0)[0];
        const base = ungroup(n.left);
        if (Number.isInteger(exponent / 2) && base.type === 'call' && base.name === 'abs') {
          const inner = seriesEvaluator(base.arg);
          return x => power(inner(x), exponent);
        }
        return x => power(a(x), exponent);
      }
      return x => exp(product(b(x), log(a(x))));
    }
  }
}

function refine(value, left, right, order) {
  let a = left, b = right;
  let best = Math.abs(a.values[order]) < Math.abs(b.values[order]) ? a : b;
  const initial = Math.abs(best.values[order]);
  for (let step = 0; step < 56; step++) {
    const x = a.x / 2 + b.x / 2;
    if (x === a.x || x === b.x) break;
    const mid = value(x);
    const y = mid.values[order];
    if (!Number.isFinite(y)) return null;
    if (y === 0) return mid;
    if (Math.abs(y) < Math.abs(best.values[order])) best = mid;
    if (Math.sign(y) === Math.sign(a.values[order])) a = mid;
    else b = mid;
  }
  // Un salto puede cambiar de signo sin que el valor se acerque a cero.
  return Math.abs(best.values[order]) <= initial * 1e-5 ? best : null;
}

function changesSign(a, b) {
  return Number.isFinite(a) && Number.isFinite(b) && a !== 0 && b !== 0 && Math.sign(a) !== Math.sign(b);
}

function numericZeroes(value, model, xmin, xmax, requested) {
  const results = orders.map(() => []);
  const cuts = [...new Set([...model.boundaries,
    ...model.families.flatMap(family => familyPoints(family, xmin, xmax))])]
    .filter(x => x >= xmin && x <= xmax);
  const excluded = new Set(cuts);
  for (const { lo, hi, lc, rc } of model.domain || []) {
    for (const x of [lc ? lo : NaN, rc ? hi : NaN]) {
      if (x >= xmin && x <= xmax && model.evaluate(x) === 0) results[0].push(x);
    }
  }
  const parts = model.domain ?? [{ lo: -Infinity, hi: Infinity }];
  for (const { lo, hi } of parts) {
    const start = Math.max(xmin, lo), end = Math.min(xmax, hi);
    if (start >= end) continue;
    const edges = [start, ...cuts.filter(x => x > start && x < end).sort((a, b) => a - b), end];
    for (let segment = 1; segment < edges.length; segment++) {
      const a = edges[segment - 1], b = edges[segment];
      const pad = Math.min((b - a) * 1e-7, (xmax - xmin) * 1e-8);
      const left = a + (excluded.has(a) ? pad : 0), right = b - (excluded.has(b) ? pad : 0);
      if (left >= right) continue;
      const count = Math.max(8, Math.ceil(960 * ((right - left) / (xmax - xmin))));
      const samples = Array.from({ length: count + 1 }, (_, i) => value(i === count ? right : left + (right - left) * (i / count)));
      if (left < 0 && right > 0 && !samples.some(sample => sample.x === 0)) {
        samples.push(value(0));
        samples.sort((p, q) => p.x - q.x);
      }
      for (const order of requested) {
        for (let i = 0; i < samples.length; i++) {
          const current = samples[i], previous = samples[i - 1], next = samples[i + 1];
          const y = current.values[order];
          const before = previous?.values[order], after = next?.values[order];
          const neighbors = [before, after].filter(Number.isFinite);
          if (y === 0 && neighbors.length && neighbors.every(v => v !== 0)) results[order].push(current.x);
          if (!previous || !Number.isFinite(before) || !Number.isFinite(y)) continue;
          if (changesSign(before, y)) {
            const root = refine(value, previous, current, order);
            if (root) results[order].push(root.x);
          } else if (before !== 0 && y !== 0 && changesSign(previous.values[order + 1], current.values[order + 1])) {
            const turn = refine(value, previous, current, order + 1);
            if (turn && Math.abs(turn.values[order]) <= Math.max(Math.abs(before), Math.abs(y)) * 1e-10) results[order].push(turn.x);
          }
        }
      }
    }
  }
  return results;
}

export function pointFinder(tree, model) {
  const rational = rationalZeroSets(tree, model.domain);
  const missing = orders.filter(order => !rational?.[order]);
  const coefficients = missing.length ? seriesEvaluator(tree) : null;
  const y0 = model.domain && !model.domain.some(({ lo, hi, lc, rc }) => (lo < 0 || (lo === 0 && lc)) && (hi > 0 || (hi === 0 && rc)))
    ? NaN : model.evaluate(0);
  return ({ xmin, xmax }) => {
    const numeric = missing.length ? numericZeroes(x => {
      const values = coefficients(x);
      values[0] = model.evaluate(x);
      return { x, values };
    }, model, xmin, xmax, missing) : null;
    const points = {};
    const keys = ['x', 'd1', 'd2', 'd3'];
    for (const order of orders) {
      const exact = rational?.[order];
      const xs = exact?.xs ?? numeric[order].sort((a, b) => a - b);
      const tolerance = 1e-10 * (xmax - xmin);
      const items = xs.filter((x, i) => exact || !i || x - xs[i - 1] > tolerance)
        .flatMap(x => {
          const y = model.evaluate(x);
          return Number.isFinite(y) ? [{ x, y: order === 0 ? 0 : y }] : [];
        });
      points[keys[order]] = { items, everywhere: exact?.everywhere ?? false, approximate: !exact };
    }
    points.y = { items: Number.isFinite(y0) ? [{ x: 0, y: y0 }] : [], everywhere: false, approximate: false };
    return points;
  };
}
