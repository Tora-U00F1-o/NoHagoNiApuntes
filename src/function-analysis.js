import { compileExpression, constantValue, dependsOnX, functions, ungroup } from './math-expression.js';

const interval = (lo, hi, lc = false, rc = false) => ({ lo, hi, lc, rc });
const all = () => [interval(-Infinity, Infinity)];
const point = x => interval(x, x, true, true);
const valid = ({ lo, hi, lc, rc }) => lo < hi || (lo === hi && lc && rc && Number.isFinite(lo));
const contains = ({ lo, hi, lc, rc }, x) => (x > lo || (lc && x === lo)) && (x < hi || (rc && x === hi));

function union(intervals) {
  const result = [];
  for (const next of intervals.filter(valid).sort((a, b) => a.lo - b.lo || Number(b.lc) - Number(a.lc))) {
    const last = result.at(-1);
    if (!last || next.lo > last.hi || (next.lo === last.hi && !next.lc && !last.rc)) {
      result.push({ ...next });
    } else if (next.hi > last.hi) {
      last.hi = next.hi;
      last.rc = next.rc;
    } else if (next.hi === last.hi) {
      last.rc ||= next.rc;
    }
  }
  return result;
}

function intersect(a, b) {
  if (a?.length === 0 || b?.length === 0) return [];
  if (!a || !b) return null;
  return union(a.flatMap(left => b.map(right => {
    const lo = Math.max(left.lo, right.lo);
    const hi = Math.min(left.hi, right.hi);
    return interval(lo, hi, contains(left, lo) && contains(right, lo), contains(left, hi) && contains(right, hi));
  })));
}

const trim = p => {
  while (p.length > 1 && p.at(-1) === 0) p.pop();
  return p;
};
const isZero = p => p.length === 1 && p[0] === 0;
const scale = (p, c) => trim(p.map(value => value * c));
const add = (a, b) => trim(Array.from({ length: Math.max(a.length, b.length) }, (_, i) => (a[i] || 0) + (b[i] || 0)));
const derivative = p => p.length === 1 ? [0] : p.slice(1).map((value, i) => value * (i + 1));
const at = (p, x) => p.reduceRight((sum, coefficient) => sum * x + coefficient, 0);

function multiply(a, b) {
  const values = new Array(a.length + b.length - 1).fill(0);
  a.forEach((value, i) => b.forEach((other, j) => { values[i + j] += value * other; }));
  return trim(values);
}

function rationalForm(node) {
  const n = ungroup(node);
  if (!dependsOnX(n)) {
    const value = constantValue(n);
    return Number.isFinite(value) ? { p: [value], q: [1] } : null;
  }
  if (n.type === 'variable') return { p: [0, 1], q: [1] };
  if (n.type === 'unary') {
    const r = rationalForm(n.arg);
    return r && { p: scale(r.p, n.op === '-' ? -1 : 1), q: r.q };
  }
  if (n.type !== 'binary') return null;
  const a = rationalForm(n.left);
  const b = rationalForm(n.right);
  if (!a || !b) return null;
  let p, q;
  if (n.op === '+' || n.op === '-') {
    p = add(multiply(a.p, b.q), scale(multiply(b.p, a.q), n.op === '+' ? 1 : -1));
    q = multiply(a.q, b.q);
  } else if (n.op === '*') {
    p = multiply(a.p, b.p);
    q = multiply(a.q, b.q);
  } else if (n.op === '/') {
    p = multiply(a.p, b.q);
    q = multiply(a.q, b.p);
  } else {
    const exponent = constantValue(n.right);
    if (!Number.isInteger(exponent) || Math.abs(exponent) > 16) return null;
    if (Math.max(a.p.length - 1, a.q.length - 1) * Math.abs(exponent) > 16) return null;
    p = [1];
    q = [1];
    for (let i = 0; i < Math.abs(exponent); i++) {
      p = multiply(p, exponent < 0 ? a.q : a.p);
      q = multiply(q, exponent < 0 ? a.p : a.q);
    }
  }
  if (Math.max(p.length, q.length) > 17 || !p.every(Number.isFinite) || !q.every(Number.isFinite)) return null;
  return { p, q };
}

const sameX = (a, b) => a === b || (Number.isFinite(a) && Number.isFinite(b)
  && Math.abs(a - b) <= 8e-12 * Math.max(1e-10, Math.abs(a), Math.abs(b)));

function distinct(xs) {
  return xs.sort((a, b) => a - b).filter((x, i, sorted) => !i || !sameX(x, sorted[i - 1]));
}

function polynomialZero(p, x) {
  const magnitude = at(p.map(Math.abs), Math.abs(x));
  return Math.abs(at(p, x)) <= 64 * Number.EPSILON * magnitude;
}

function roots(p) {
  if (p.length === 1) return [];
  if (p.length === 2) {
    const root = -p[0] / p[1];
    return Number.isFinite(root) ? [root === 0 ? 0 : root] : null;
  }
  const bound = 1 + Math.max(...p.slice(0, -1).map(c => Math.abs(c / p.at(-1))));
  const critical = roots(derivative(p));
  if (!Number.isFinite(bound) || !critical || !Number.isFinite(at(p, bound)) || !Number.isFinite(at(p, -bound))) return null;
  const breaks = [-bound, ...critical.filter(x => Math.abs(x) < bound), bound];
  const result = breaks.filter(x => polynomialZero(p, x));
  for (let i = 1; i < breaks.length; i++) {
    let a = breaks[i - 1], b = breaks[i];
    if (polynomialZero(p, a) || polynomialZero(p, b)) continue;
    const sign = Math.sign(at(p, a));
    if (sign === Math.sign(at(p, b))) continue;
    for (let step = 0; step < 128; step++) {
      const mid = a / 2 + b / 2;
      if (mid === a || mid === b || at(p, mid) === 0) { a = b = mid; break; }
      if (Math.sign(at(p, mid)) === sign) a = mid;
      else b = mid;
    }
    result.push(a / 2 + b / 2);
  }
  return distinct(result);
}

function middle(a, b) {
  if (a === -Infinity && b === Infinity) return 0;
  if (a === -Infinity) return b - Math.max(1, Math.abs(b));
  if (b === Infinity) return a + Math.max(1, Math.abs(a));
  return a / 2 + b / 2;
}

const compare = (value, relation) => {
  if (relation === '>') return value > 0;
  if (relation === '≥') return value >= 0;
  if (relation === '≤') return value <= 0;
  if (relation === '<') return value < 0;
  return value !== 0;
};
const reverse = { '>': '<', '<': '>', '≥': '≤', '≤': '≥', '≠': '≠' };

function rationalConstraint(r, relation, target) {
  if (isZero(r.q)) return [];
  const p = add(r.p, scale(r.q, -target));
  if (isZero(p) && !compare(0, relation)) return [];
  const zeroes = roots(p), poles = roots(r.q);
  if (!zeroes || !poles) return null;
  const cuts = [-Infinity, ...distinct([...zeroes, ...poles]), Infinity];
  const result = [];
  for (let i = 1; i < cuts.length; i++) {
    const x = middle(cuts[i - 1], cuts[i]);
    const sign = Math.sign(at(p, x)) * Math.sign(at(r.q, x));
    if (!Number.isFinite(sign)) return null;
    if (compare(sign, relation)) result.push(interval(cuts[i - 1], cuts[i]));
  }
  if (compare(0, relation)) {
    for (const x of zeroes) if (!poles.some(pole => sameX(pole, x))) result.push(point(x));
  }
  return union(result);
}

// Resuelve restricciones de dominio mediante cambios monótonos o polinomios.
function constraint(node, relation, target = 0) {
  if (!Number.isFinite(target)) return null;
  const rational = rationalForm(node);
  if (rational) return rationalConstraint(rational, relation, target);
  const n = ungroup(node);
  if (n.type === 'unary') return constraint(n.arg, n.op === '-' ? reverse[relation] : relation, n.op === '-' ? -target : target);
  if (n.type === 'call') {
    if (n.name === 'log' || n.name === 'log10') {
      const bound = n.name === 'log' ? Math.exp(target) : 10 ** target;
      return bound > 0 ? constraint(n.arg, relation, bound) : null;
    }
    if (n.name === 'cbrt') return constraint(n.arg, relation, target ** 3);
    if (n.name === 'exp') return target <= 0 ? (compare(1, relation) ? all() : []) : constraint(n.arg, relation, Math.log(target));
    if (n.name === 'sqrt' || n.name === 'abs') {
      if (target < 0) return compare(1, relation) ? all() : [];
      if (n.name === 'sqrt') return constraint(n.arg, relation, target ** 2);
      const positive = constraint(n.arg, relation, target);
      const negative = constraint(n.arg, reverse[relation], -target);
      if (relation === '<' || relation === '≤' || relation === '≠') return intersect(positive, negative);
      return positive && negative ? union([...positive, ...negative]) : null;
    }
  }
  if (n.type === 'binary') {
    const a = constantValue(n.left);
    const b = constantValue(n.right);
    if (Number.isFinite(b)) {
      if (n.op === '+' || n.op === '-') return constraint(n.left, relation, n.op === '+' ? target - b : target + b);
      if (n.op === '*' && b !== 0) return constraint(n.left, b < 0 ? reverse[relation] : relation, target / b);
      if (n.op === '/' && b !== 0) return constraint(n.left, b < 0 ? reverse[relation] : relation, target * b);
    }
    if (Number.isFinite(a)) {
      if (n.op === '+') return constraint(n.right, relation, target - a);
      if (n.op === '-') return constraint(n.right, reverse[relation], a - target);
      if (n.op === '*' && a !== 0) return constraint(n.right, a < 0 ? reverse[relation] : relation, target / a);
    }
  }
  return null;
}

function tangentFamily(node) {
  const n = ungroup(node);
  if (n.type !== 'call' || n.name !== 'tg') return null;
  const arg = rationalForm(n.arg);
  if (!arg || arg.q.length !== 1 || arg.q[0] === 0 || arg.p.length !== 2) return null;
  const a = arg.p[1] / arg.q[0];
  const b = arg.p[0] / arg.q[0];
  const first = (Math.PI / 2 - b) / a;
  const period = Math.PI / Math.abs(a);
  return Number.isFinite(first) && period > 0 && Number.isFinite(period) ? { first, period, a, b } : null;
}

function transformedTangent(node) {
  const n = ungroup(node);
  if (n.type === 'unary') return transformedTangent(n.arg);
  if (n.type !== 'binary') return tangentFamily(n);
  const a = constantValue(n.left), b = constantValue(n.right);
  if (Number.isFinite(a) && (n.op === '+' || n.op === '-' || (n.op === '*' && a !== 0))) return transformedTangent(n.right);
  if (Number.isFinite(b) && (n.op === '+' || n.op === '-' || (['*', '/'].includes(n.op) && b !== 0))) return transformedTangent(n.left);
  return null;
}

function findDomain(node, singularities) {
  const n = ungroup(node);
  if (n.type === 'number' || n.type === 'variable') return all();
  if (n.type === 'unary') return findDomain(n.arg, singularities);
  if (n.type === 'binary') {
    let domain = intersect(findDomain(n.left, singularities), findDomain(n.right, singularities));
    if (n.op === '/') {
      const allowed = constraint(n.right, '≠');
      if (allowed) singularities.points.push(...allowed.flatMap(({ lo, hi }) => [lo, hi]).filter(Number.isFinite));
      domain = intersect(domain, allowed);
    }
    if (n.op === '^') {
      const exponent = constantValue(n.right);
      if (exponent < 0 && Number.isInteger(exponent)) domain = intersect(domain, constraint(n.left, '≠'));
      else if (exponent < 0 || dependsOnX(n.right)) domain = intersect(domain, constraint(n.left, '>'));
      else if (!Number.isInteger(exponent)) domain = intersect(domain, constraint(n.left, '≥'));
    }
    return domain;
  }
  const domain = findDomain(n.arg, singularities);
  if (n.name === 'sqrt') return intersect(domain, constraint(n.arg, '≥'));
  if (n.name === 'log' || n.name === 'log10') return intersect(domain, constraint(n.arg, '>'));
  if (n.name === 'arcsen' || n.name === 'arccos') {
    return intersect(domain, intersect(constraint(n.arg, '≥', -1), constraint(n.arg, '≤', 1)));
  }
  if (n.name === 'tg') {
    const family = tangentFamily(n);
    if (family) singularities.families.push(family);
    else if (dependsOnX(n.arg)) return domain?.length === 0 ? [] : null;
    else return Number.isFinite(constantValue(n)) ? domain : [];
  }
  return domain;
}

function leadingAt(p, x) {
  if (isZero(p)) return { order: Infinity, value: 0 };
  let order = 0, factorial = 1;
  while (p.length > 1 && polynomialZero(p, x)) {
    p = derivative(p);
    factorial *= ++order;
  }
  return { order, value: at(p, x) / factorial };
}

function rationalLimit({ p, q }, x, from) {
  if (isZero(p)) return 0;
  if (!Number.isFinite(x)) {
    const order = p.length - q.length;
    const ratio = p.at(-1) / q.at(-1);
    if (order < 0) return 0;
    if (order === 0) return ratio;
    return Math.sign(ratio) * (x < 0 && order % 2 ? -Infinity : Infinity);
  }
  const a = leadingAt(p, x), b = leadingAt(q, x);
  const order = a.order - b.order;
  if (order > 0) return 0;
  const ratio = a.value / b.value;
  if (order === 0) return ratio;
  return Math.sign(ratio) * (from < 0 && order % 2 ? -Infinity : Infinity);
}

function between(a, b, ac, bc) {
  if (Number.isNaN(a) || Number.isNaN(b)) return null;
  if (a === b) return Number.isFinite(a) ? point(a) : null;
  return a < b ? interval(a, b, ac && Number.isFinite(a), bc && Number.isFinite(b))
    : interval(b, a, bc && Number.isFinite(b), ac && Number.isFinite(a));
}

function rationalRange(r, domain) {
  if (isZero(r.q)) return [];
  const critical = roots(add(multiply(derivative(r.p), r.q), scale(multiply(r.p, derivative(r.q)), -1)));
  if (!critical) return null;
  const result = [];
  for (const part of domain) {
    const cuts = [part.lo, ...critical.filter(x => x > part.lo && x < part.hi), part.hi];
    for (let i = 1; i < cuts.length; i++) {
      const [a, b] = [cuts[i - 1], cuts[i]];
      const image = between(rationalLimit(r, a, 1), rationalLimit(r, b, -1), i > 1 || part.lc, i < cuts.length - 1 || part.rc);
      if (!image) return null;
      result.push(image);
    }
  }
  return union(result);
}

function mapMonotone(domain, transform) {
  const result = domain.map(({ lo, hi, lc, rc }) => between(transform(lo), transform(hi), lc, rc));
  return result.every(Boolean) ? union(result) : null;
}

function waveRange(domain, name) {
  const offset = name === 'sen' ? Math.PI / 2 : 0;
  const f = functions[name];
  const result = [];
  for (const { lo, hi, lc, rc } of domain) {
    if (hi - lo > 2 * Math.PI) {
      result.push(interval(-1, 1, true, true));
      continue;
    }
    const values = [[f(lo), lc], [f(hi), rc]];
    // Cada máximo o mínimo interior aporta su valor exacto.
    const k = Math.ceil((lo - offset) / Math.PI);
    if (!Number.isSafeInteger(k) || Math.abs(k) > 1e12) return null;
    for (let i = k; i <= k + 2; i++) {
      const x = offset + i * Math.PI;
      if (contains({ lo, hi, lc, rc }, x)) values.push([i % 2 ? -1 : 1, true]);
    }
    const min = Math.min(...values.map(([value]) => value));
    const max = Math.max(...values.map(([value]) => value));
    result.push(interval(min, max, values.some(([y, closed]) => y === min && closed), values.some(([y, closed]) => y === max && closed)));
  }
  return union(result);
}

function exactRange(node, domain) {
  if (!domain) return null;
  if (!domain.length) return [];
  const r = rationalForm(node);
  if (r) return rationalRange(r, domain);
  const n = ungroup(node);
  if (n.type === 'unary') {
    const image = exactRange(n.arg, domain);
    return image && mapMonotone(image, x => n.op === '-' ? -x : x);
  }
  if (n.type === 'call') {
    const input = exactRange(n.arg, domain);
    if (!input) return null;
    if (n.name === 'sen' || n.name === 'cos') return waveRange(input, n.name);
    if (n.name === 'tg') return null;
    if (n.name === 'abs') {
      const positive = intersect(input, [interval(0, Infinity, true)]);
      const negative = intersect(input, [interval(-Infinity, 0, false, true)]);
      return union([...positive, ...mapMonotone(negative, x => -x)]);
    }
    if (n.name === 'log' || n.name === 'log10') {
      return mapMonotone(input, x => x === 0 ? -Infinity : functions[n.name](x));
    }
    return mapMonotone(input, functions[n.name]);
  }
  if (n.type !== 'binary') return null;
  const a = constantValue(n.left), b = constantValue(n.right);
  if (Number.isFinite(b)) {
    const input = exactRange(n.left, domain);
    if (!input) return null;
    if (n.op === '+') return mapMonotone(input, x => x + b);
    if (n.op === '-') return mapMonotone(input, x => x - b);
    if (n.op === '*') return b === 0 ? [point(0)] : mapMonotone(input, x => x * b);
    if (n.op === '/' && b !== 0) return mapMonotone(input, x => x / b);
    if (n.op === '^') {
      if (b === 0) return [point(1)];
      const positive = intersect(input, [interval(0, Infinity, true)]);
      const images = mapMonotone(positive, x => Math.pow(x, b));
      if (!Number.isInteger(b)) return images;
      const negative = intersect(input, [interval(-Infinity, 0)]);
      const reflected = mapMonotone(negative, x => x === 0 && b < 0 && b % 2 ? -Infinity : Math.pow(x, b));
      return images && reflected ? union([...images, ...reflected]) : null;
    }
  }
  if (Number.isFinite(a) && ['+', '-', '*', '/'].includes(n.op)) {
    const input = exactRange(n.right, domain);
    if (!input) return null;
    if (n.op === '+') return mapMonotone(input, x => a + x);
    if (n.op === '-') return mapMonotone(input, x => a - x);
    if (a === 0) return [point(0)];
    if (n.op === '*') return mapMonotone(input, x => a * x);
    const pos = mapMonotone(intersect(input, [interval(0, Infinity)]), x => a / x);
    const neg = mapMonotone(intersect(input, [interval(-Infinity, 0)]), x => a / (x === 0 ? -0 : x));
    return pos && neg ? union([...pos, ...neg]) : null;
  }
  return null;
}

function converges(values) {
  if (!values.every(Number.isFinite)) return null;
  const final = values.at(-1);
  const tail = values.slice(-4);
  const spread = Math.max(...tail) - Math.min(...tail);
  const firstSpread = Math.max(...values.slice(0, 4)) - Math.min(...values.slice(0, 4));
  if (spread > 3e-5 * Math.max(1, Math.abs(final))) return null;
  if (spread !== 0 && spread >= .35 * firstSpread) return null;
  return final;
}

function escapes(values) {
  if (!values.every(Number.isFinite)) return false;
  const tail = values.slice(-5);
  const sign = Math.sign(tail.at(-1));
  const differences = tail.slice(1).map((value, i) => sign * (value - tail[i]));
  return Math.abs(tail.at(-1)) > 12 && differences.every((delta, i) => delta > .06 && (!i || delta >= .78 * differences[i - 1]));
}

const snap = (value, epsilon = 1e-7) => Math.abs(value - Math.round(value)) < epsilon ? Math.round(value) : value;

function numericalLine(f, side) {
  const xs = Array.from({ length: 8 }, (_, i) => side * (1.137 + .0127 * i) * 10 ** (i + 2));
  const ys = xs.map(f);
  const flat = converges(ys);
  if (flat !== null) return { axis: 'y', m: 0, b: snap(flat, 3e-7), sides: [side], approximate: true };
  if (!ys.every(Number.isFinite)) return null;
  const m = (ys.at(-1) - ys.at(-2)) / (xs.at(-1) - xs.at(-2));
  if (!Number.isFinite(m) || Math.abs(m) < 1e-8) return null;
  const slope = snap(m, 1e-10);
  const b = converges(xs.map((x, i) => ys[i] - slope * x));
  if (b === null) return null;
  return { axis: 'y', m: slope, b: snap(b, 3e-7), sides: [side], approximate: true };
}

function exactRationalLine({ p, q }) {
  const delta = p.length - q.length;
  if (delta < 0) return isZero(p) ? null : { m: 0, b: 0 };
  if (delta > 1 || q.length === 1) return null;
  const leading = p.at(-1) / q.at(-1);
  const m = delta ? leading : 0;
  const b = delta ? ((p.at(-2) ?? 0) - m * (q.at(-2) ?? 0)) / q.at(-1) : leading;
  const remainder = add(p, scale(multiply([b, m], q), -1));
  return isZero(remainder) ? null : { m, b };
}

function rationalSign({ p, q }, x, from) {
  if (!Number.isFinite(x)) return Math.sign(p.at(-1) / q.at(-1)) * (x < 0 && (p.length - q.length) % 2 ? -1 : 1);
  const a = leadingAt(p, x), b = leadingAt(q, x);
  return Math.sign(a.value / b.value) * (from < 0 && (a.order - b.order) % 2 ? -1 : 1);
}

function logQuotient(node) {
  const n = ungroup(node);
  const quotient = n.type === 'binary' && n.op === '/';
  const numerator = quotient ? ungroup(n.left) : n;
  if (numerator.type !== 'call' || !['log', 'log10'].includes(numerator.name)) return null;
  const u = rationalForm(numerator.arg), v = quotient ? rationalForm(n.right) : { p: [1], q: [1] };
  if (!u || !v || [u.q, v.p, v.q].some(isZero)) return null;
  const log = functions[numerator.name];
  const shifted = add(u.p, scale(u.q, -1));
  return {
    limit(x, from) {
      const a = rationalLimit(u, x, from), b = rationalLimit(v, x, from);
      if (Number.isNaN(a) || Number.isNaN(b) || a < 0) return NaN;
      // Un crecimiento racional divergente domina el crecimiento logarítmico.
      if (!Number.isFinite(b)) return 0;
      const value = a === 0 ? -Infinity : log(a);
      if (b !== 0) return value / b;
      if (a === 1) {
        // log(u) ~ u−1 en base e y log10(u) ~ (u−1)/ln(10).
        const ratio = rationalLimit({ p: multiply(shifted, v.q), q: multiply(u.q, v.p) }, x, from);
        return numerator.name === 'log' ? ratio : ratio / Math.LN10;
      }
      return Math.sign(value) * rationalSign(v, x, from) * Infinity;
    },
    zeroes: roots(shifted) || []
  };
}

function logQuotientCoversReals(logarithmic, domain) {
  if (!logarithmic || !domain) return false;
  // En un tramo continuo se alcanzan los valores estrictamente entre sus límites.
  const guaranteed = domain.flatMap(({ lo, hi, lc, rc }) => {
    const a = logarithmic.limit(lo, 1), b = logarithmic.limit(hi, -1);
    return a === b ? [] : [between(a, b, lc, rc)].filter(Boolean);
  });
  if (logarithmic.zeroes.some(x => domain.some(part => contains(part, x)))) guaranteed.push(point(0));
  return union(guaranteed).some(part => part.lo === -Infinity && part.hi === Infinity);
}

export function familyPoints({ first, period }, lo, hi) {
  const start = Math.ceil((lo - first) / period), end = Math.floor((hi - first) / period);
  if (!Number.isSafeInteger(start) || !Number.isSafeInteger(end) || end - start > 300) return [];
  return Array.from({ length: Math.max(0, end - start + 1) }, (_, i) => first + (start + i) * period);
}

export function rationalZeroSets(tree, domain) {
  const r = rationalForm(tree);
  if (!r || !domain || isZero(r.q)) return null;
  // Tras n derivadas, el denominador es q^(n+1). Basta operar con el numerador.
  let p = r.p;
  const dq = derivative(r.q);
  return Array.from({ length: 4 }, (_, order) => {
    if (order) p = add(multiply(derivative(p), r.q), scale(multiply(p, dq), -order));
    if (!p.every(Number.isFinite)) return null;
    if (!domain.length) return { xs: [], everywhere: false };
    if (isZero(p)) return { xs: [], everywhere: true };
    const candidates = roots(p);
    if (!candidates) return null;
    const xs = candidates.filter(x => domain.some(part => contains(part, x)) && !polynomialZero(r.q, x));
    return { xs, everywhere: false };
  });
}

export function analyzeExpression(tree) {
  const evaluate = compileExpression(tree);
  const singularities = { points: [], families: [] };
  const domain = findDomain(tree, singularities);
  const ownFamily = transformedTangent(tree);
  const rational = rationalForm(tree);
  const logarithmic = logQuotient(tree);
  const ends = domain?.flatMap(({ lo, hi }) => [lo, hi]).filter(Number.isFinite) || [];
  const boundaries = distinct([...ends, ...singularities.points]);
  const poles = [], holes = [];
  if (domain?.length !== 0) {
    for (const x of boundaries) {
      const sides = [-1, 1].filter(side => !domain || domain.some(part => side < 0 ? part.lo < x && part.hi >= x : part.lo <= x && part.hi > x));
      if (!sides.length || domain?.some(part => contains(part, x))) continue;
      const limits = rational && !isZero(rational.q) ? sides.map(side => rationalLimit(rational, x, side))
        : logarithmic ? sides.map(side => logarithmic.limit(x, side)) : [];
      if (limits.some(value => Math.abs(value) === Infinity)) poles.push({ axis: 'x', x });
      else if (limits.length && limits.every(value => Number.isFinite(value) && value === limits[0])) holes.push({ x, y: limits[0] });
      else if (!limits.length && sides.some(side => {
        const part = domain?.find(item => side < 0 ? item.lo < x && item.hi >= x : item.lo <= x && item.hi > x);
        const width = part ? (side < 0 ? x - part.lo : part.hi - x) : Infinity;
        const radius = Math.min(width, Math.max(1, Math.abs(x)));
        return escapes(Array.from({ length: 9 }, (_, i) => evaluate(x + side * radius * 10 ** (-i - 1))));
      })) poles.push({ axis: 'x', x, approximate: true });
    }
  }

  const lines = [];
  if (domain?.length !== 0 && !ownFamily) {
    if (rational && !isZero(rational.q)) {
      const line = exactRationalLine(rational);
      if (line) lines.push({ ...line, axis: 'y', sides: [-1, 1] });
    } else {
      for (const side of [-1, 1]) {
        if (domain && !domain.some(part => side < 0 ? part.lo === -Infinity : part.hi === Infinity)) continue;
        const limit = logarithmic?.limit(side * Infinity, -side);
        const line = Number.isFinite(limit) ? { axis: 'y', m: 0, b: limit, sides: [side] } : numericalLine(evaluate, side);
        if (!line) continue;
        const previous = lines.find(item => Math.abs(item.m - line.m) < 1e-8 && Math.abs(item.b - line.b) < 1e-7);
        if (previous) previous.sides.push(side);
        else lines.push(line);
      }
    }
  }
  let range = domain?.length === 0 ? [] : singularities.families.length ? null : exactRange(tree, domain);
  if (ownFamily && domain?.length === 1 && domain[0].lo === -Infinity && domain[0].hi === Infinity) range = all();
  if (!range && logQuotientCoversReals(logarithmic, domain)) range = all();
  return {
    evaluate, domain, range, boundaries, holes, families: singularities.families,
    asymptotes: [...poles, ...lines, ...(ownFamily ? [{ axis: 'x', family: ownFamily }] : [])]
  };
}

const rounded = new Intl.NumberFormat('es-ES', { maximumSignificantDigits: 7, useGrouping: false });
const scientific = new Intl.NumberFormat('es-ES', { notation: 'scientific', maximumSignificantDigits: 5 });
export function formatNumber(n) {
  if (n === Infinity) return '+∞';
  if (n === -Infinity) return '−∞';
  if (!Number.isFinite(n)) return '—';
  const formatter = n !== 0 && (Math.abs(n) < .0001 || Math.abs(n) >= 1e7) ? scientific : rounded;
  return formatter.format(n === 0 ? 0 : n).replaceAll('-', '−');
}

export function formatIntervals(intervals) {
  if (!intervals?.length) return '∅';
  return intervals.map(({ lo, hi, lc, rc }) => {
    if (lo === -Infinity && hi === Infinity) return 'ℝ';
    if (lo === hi) return '{' + formatNumber(lo) + '}';
    return (lc ? '[' : '(') + formatNumber(lo) + '; ' + formatNumber(hi) + (rc ? ']' : ')');
  }).join(' ∪ ');
}

export function formatFamily({ a, b }) {
  if (a === 1 && b === 0) return 'π/2 + kπ';
  if (a === -1 && b === 0) return 'π/2 + kπ';
  const shift = b === 0 ? '' : (b < 0 ? ' + ' : ' − ') + formatNumber(Math.abs(b));
  return '(π/2 + kπ' + shift + ')/(' + formatNumber(a) + ')';
}
