import test from 'node:test';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import { makeCatalog } from './catalog.mjs';
import { parseExpression, compileExpression } from '../src/math-expression.js';
import { analyzeExpression, formatIntervals, familyPoints } from '../src/function-analysis.js';
import { fitView, sampleImage } from '../src/graph-canvas.js';
import { pointFinder } from '../src/function-points.js';

const valueAt = (expression, x) => compileExpression(parseExpression(expression))(x);
const analyze = expression => analyzeExpression(parseExpression(expression));
const domainOf = expression => formatIntervals(analyze(expression).domain);
const rangeOf = expression => formatIntervals(analyze(expression).range);
const pointsOf = (expression, xmin = -8, xmax = 8) => {
  const tree = parseExpression(expression);
  return pointFinder(tree, analyzeExpression(tree))({ xmin, xmax });
};

test('los cortes y los ceros de cada derivada usan coordenadas de la curva', () => {
  const points = pointsOf('x^4-4x^2+3');
  assert.deepEqual(points.x.items.map(({ x, y }) => [x.toFixed(5), y]), [
    ['-1.73205', 0], ['-1.00000', 0], ['1.00000', 0], ['1.73205', 0]
  ]);
  assert.deepEqual(points.y.items, [{ x: 0, y: 3 }]);
  assert.deepEqual(points.d1.items.map(({ x, y }) => [x.toFixed(5), Math.round(y)]), [
    ['-1.41421', -1], ['0.00000', 3], ['1.41421', -1]
  ]);
  assert.deepEqual(points.d2.items.map(({ x }) => x.toFixed(5)), ['-0.81650', '0.81650']);
  assert.deepEqual(points.d3.items, [{ x: 0, y: 3 }]);
  assert.equal(points.d3.approximate, false);
  assert.equal(pointsOf('x^2').d3.everywhere, true);
  assert.deepEqual(pointsOf('x-20').x.items, [{ x: 20, y: 0 }]);
});

test('los ceros muestreados incluyen tangencias y evitan saltos y puntos excluidos', () => {
  const root = Math.asin(.2);
  const points = pointsOf('(sen(x)-0.2)^5', -.7, .7);
  for (const key of ['x', 'd1', 'd3']) {
    assert.ok(points[key].approximate);
    assert.ok(points[key].items.some(({ x }) => Math.abs(x - root) < 1e-9), key);
  }
  assert.deepEqual(pointsOf('abs(x)').d1.items, []);
  assert.deepEqual(pointsOf('1/sen(x-0.01)', -.5, .5).x.items, []);
  const removed = pointsOf('x^3/x');
  assert.deepEqual(removed.x.items, []);
  assert.deepEqual(removed.y.items, []);
  assert.deepEqual(removed.d1.items, []);
  assert.deepEqual(pointsOf('sqrt(4-x^2)').x.items, [{ x: -2, y: 0 }, { x: 2, y: 0 }]);
});

test('graficador aparece como unidad 0 antes de los apuntes', async () => {
  const root = fileURLToPath(new URL('../contenido/', import.meta.url));
  const { subjects } = await makeCatalog(root);
  const subject = subjects.find(item => item.id === 'calculo');
  assert.equal(subject.tree[0].id, 'graficador');
  assert.equal(subject.units[0].number, 0);
  assert.equal(subject.units[1].parte, 1);
});

test('precedencia, multiplicación implícita y sintaxis del teclado científico', () => {
  assert.equal(valueAt('−x²', 3), -9);
  assert.equal(valueAt('(−x)²', 3), 9);
  assert.equal(valueAt('2^3^2', 0), 512);
  assert.equal(valueAt('8/2x', 2), 8);
  assert.equal(valueAt('8/(2x)', 2), 2);
  assert.equal(valueAt('√(9)+∛(−8)+0,5+log10(100)', 0), 3.5);
  assert.equal(valueAt('2sen(π/2)', 0), 2);
  assert.ok(Number.isNaN(valueAt('x^-1', 0)));
  assert.throws(() => parseExpression('window.alert(1)'), SyntaxError);
  assert.throws(() => parseExpression('(x)/()'), SyntaxError);
  assert.equal(parseExpression('(x)/()', { incomplete: true }).right.arg.type, 'hole');
  assert.equal(parseExpression('x^()', { incomplete: true }).right.arg.type, 'hole');
});

test('el cociente del logaritmo conserva su hueco de dominio, imagen y dos asíntotas', () => {
  const result = analyze('log(x^6)/(7x)');
  assert.equal(formatIntervals(result.domain), '(−∞; 0) ∪ (0; +∞)');
  assert.equal(formatIntervals(result.range), 'ℝ');
  assert.ok(Number.isNaN(result.evaluate(0)));
  assert.ok(Math.abs(result.evaluate(2) - 6 * Math.log(2) / 14) < 1e-12);
  assert.deepEqual(result.asymptotes, [{ axis: 'x', x: 0 }, { axis: 'y', m: 0, b: 0, sides: [-1, 1] }]);
});

test('los extremos abiertos, cerrados y aislados dependen de la expresión original', () => {
  assert.equal(domainOf('sqrt(4-x^2)'), '[−2; 2]');
  assert.equal(rangeOf('sqrt(4-x^2)'), '[0; 2]');
  assert.equal(domainOf('sqrt(-x^2)'), '{0}');
  assert.equal(rangeOf('sqrt(-x^2)'), '{0}');
  assert.equal(domainOf('sqrt(-1-x^2)'), '∅');
  assert.deepEqual(analyze('log(-1)+tg(x)').range, []);
  assert.equal(domainOf('1/sqrt(x)'), '(0; +∞)');
  assert.equal(rangeOf('1/sqrt(x)'), '(0; +∞)');
  assert.equal(rangeOf('1/(exp(x)-1)'), '(−∞; −1) ∪ (0; +∞)');
  assert.equal(rangeOf('cos(1/x)'), '[−1; 1]');
});

test('los factores cancelados dejan agujeros y las oblicuas tienen pendiente y ordenada correctas', () => {
  const hole = analyze('(x^2-1)/(x-1)');
  assert.equal(formatIntervals(hole.domain), '(−∞; 1) ∪ (1; +∞)');
  assert.equal(formatIntervals(hole.range), '(−∞; 2) ∪ (2; +∞)');
  assert.deepEqual(hole.holes, [{ x: 1, y: 2 }]);
  assert.deepEqual(hole.asymptotes, []);
  assert.deepEqual(analyze('(x^2+1)/(x-1)').asymptotes, [
    { axis: 'x', x: 1 }, { axis: 'y', m: 1, b: 1, sides: [-1, 1] }
  ]);
  assert.deepEqual(analyze('1/(x-2)^2').asymptotes, [
    { axis: 'x', x: 2 }, { axis: 'y', m: 0, b: 0, sides: [-1, 1] }
  ]);
});

test('la tangente conserva su familia periódica tras un cambio afín', () => {
  const model = analyze('2tg(3x)+1');
  const [family] = model.families;
  assert.equal(formatIntervals(model.range), 'ℝ');
  assert.deepEqual(model.asymptotes, [{ axis: 'x', family }]);
  assert.deepEqual(familyPoints(family, -1, 1), [-Math.PI / 6, Math.PI / 6]);
  assert.ok(Number.isNaN(valueAt('tg(5π/2)', 0)));
});

test('las aproximaciones y las muestras no se presentan como resultados globales exactos', () => {
  const model = analyze('sqrt(x^2+1)');
  assert.equal(formatIntervals(model.range), '[1; +∞)');
  assert.equal(model.asymptotes.length, 2);
  assert.ok(model.asymptotes.every(line => line.approximate));
  assert.deepEqual(analyze('sen(x)').asymptotes, []);
  assert.deepEqual(analyze('sen(1/x)').asymptotes.map(line => line.axis), ['y']);
  const mixed = analyze('x+sen(x)');
  assert.equal(mixed.range, null);
  assert.deepEqual(sampleImage(mixed, { xmin: 0, xmax: 1 }), [0, 1 + Math.sin(1)]);
  const view = fitView(analyze('sqrt(4-x^2)'));
  assert.ok(view.xmin < -2 && view.xmax > 2 && view.ymin < 0 && view.ymax > 2);
});
