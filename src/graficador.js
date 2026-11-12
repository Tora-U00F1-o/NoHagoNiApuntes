import { parseExpression, ungroup } from './math-expression.js';
import { analyzeExpression, formatFamily, formatIntervals, formatNumber } from './function-analysis.js';
import { defaultView, drawGraph, fitView, sampleImage } from './graph-canvas.js';
import { pointFinder } from './function-points.js';

const examples = [
  ['Polinomio', 'x^4-4x^2+3', { xmin: -2.55, xmax: 2.55, ymin: -3, ymax: 16 }],
  ['Logaritmo y cociente', 'log(x^6)/(7x)'],
  ['Parábola', 'x^2'],
  ['Recíproca', '1/(x-2)'],
  ['Semicírculo', 'sqrt(4-x^2)'],
  ['Tangente', 'tg(x)']
];
const keyGroups = [
  ['functions', 'Funciones', [
    ['sen', 'sen('], ['cos', 'cos('], ['tg', 'tg('], ['log', 'log('], ['log₁₀', 'log10('], ['eˣ', 'exp('],
    ['arcsen', 'arcsen('], ['arccos', 'arccos('], ['arctg', 'arctg('], ['√', 'sqrt(', 'Raíz cuadrada'],
    ['∛', 'cbrt(', 'Raíz cúbica'], ['|x|', 'abs(', 'Valor absoluto']
  ]],
  ['numbers', 'Números', [...'7894561230,'].map(digit => [digit, digit])],
  ['operators', 'Operaciones', [
    ['+', '+', 'Sumar'], ['−', '-', 'Restar'], ['×', '*', 'Multiplicar'], ['÷', '/', 'Dividir'],
    ['xⁿ', 'power', 'Insertar potencia'], ['x²', 'square', 'Elevar al cuadrado'], ['a/b', 'fraction', 'Insertar fracción']
  ]],
  ['symbols', 'Símbolos', [
    ['(', '('], [')', ')'], ['π', 'π', 'Pi'], ['e', 'e', 'Número e'], ['x', 'x', 'Variable x'], ['⌫', 'erase', 'Borrar a la izquierda']
  ]]
];
const pointLayers = [
  ['x', 'Cortes con X', 'Corte con el eje X'],
  ['y', 'Corte con Y', 'Corte con el eje Y'],
  ['d1', 'f′ = 0', 'Punto estacionario (f′ = 0)'],
  ['d2', 'f″ = 0', 'Segunda derivada nula (f″ = 0)'],
  ['d3', 'f‴ = 0', 'Tercera derivada nula (f‴ = 0)']
];
const plotHelp = 'Arrastra para mover la gráfica. Pulsa un punto para ver sus datos.';
const emptyPlot = { evaluate: () => NaN, domain: [], range: [], boundaries: [], holes: [], families: [], asymptotes: [] };
const mathNS = 'http://www.w3.org/1998/Math/MathML';

function math(tag, ...children) {
  const element = document.createElementNS(mathNS, tag);
  element.append(...children);
  return element;
}

const symbol = value => math('mo', value);
const row = (...items) => math('mrow', ...items);
const parentheses = inner => row(symbol('('), inner, symbol(')'));

function renderMath(node) {
  switch (node.type) {
    case 'hole': {
      const placeholder = math('mi', '□');
      placeholder.setAttribute('class', 'graph-math-placeholder');
      return placeholder;
    }
    case 'number': {
      const constant = node.text === 'π' || node.text === 'e';
      const element = math(constant ? 'mi' : 'mn', node.text);
      if (constant) element.setAttribute('mathvariant', 'normal');
      return element;
    }
    case 'variable': return math('mi', 'x');
    case 'group': return parentheses(renderMath(node.arg));
    case 'unary': return row(symbol(node.op === '-' ? '−' : '+'), renderMath(node.arg));
    case 'binary': {
      if (node.op === '/') return math('mfrac', renderMath(ungroup(node.left)), renderMath(ungroup(node.right)));
      if (node.op === '^') return math('msup', renderMath(node.left), renderMath(ungroup(node.right)));
      const op = node.implicit ? '\u2062' : ({ '*': '·', '-': '−' }[node.op] || node.op);
      return row(renderMath(node.left), symbol(op), renderMath(node.right));
    }
    case 'call': {
      const arg = renderMath(node.arg);
      if (node.name === 'sqrt') return math('msqrt', arg);
      if (node.name === 'cbrt') return math('mroot', arg, math('mn', '3'));
      if (node.name === 'exp') return math('msup', math('mi', 'e'), arg);
      if (node.name === 'abs') return row(symbol('|'), arg, symbol('|'));
      const fn = math('mi', node.name === 'log10' ? 'log' : node.name);
      fn.setAttribute('mathvariant', 'normal');
      const label = node.name === 'log10' ? math('msub', fn, math('mn', '10')) : fn;
      return row(label, parentheses(arg));
    }
  }
}

function mathEquation(tree) {
  return math('math', row(math('mi', 'f'), parentheses(math('mi', 'x')), symbol('='), renderMath(tree)));
}

function isViewValid(view) {
  const x = view.xmax - view.xmin, y = view.ymax - view.ymin;
  return Number.isFinite(x) && Number.isFinite(y) && x > 0 && y > 0;
}

function lineLabel(a) {
  if (a.axis === 'x') return 'x = ' + (a.family ? formatFamily(a.family) + ' (k ∈ ℤ)' : formatNumber(a.x));
  if (a.m === 0) return 'y = ' + formatNumber(a.b);
  const term = a.m === 1 ? 'x' : a.m === -1 ? '−x' : formatNumber(a.m) + 'x';
  const constant = a.b === 0 ? '' : (a.b < 0 ? ' − ' : ' + ') + formatNumber(Math.abs(a.b));
  return 'y = ' + term + constant;
}

class FunctionGrapher extends HTMLElement {
  connectedCallback() {
    if (this.events) return;
    this.events = new AbortController();
    const { signal } = this.events;
    this.view = { ...defaultView };
    this.innerHTML = `
      <div class="graph-workspace">
        <form class="graph-editor" aria-label="Editor de la función">
          <div class="graph-preview" data-preview aria-label="Vista matemática"></div>
          <label class="graph-input-label">
            Expresión
            <input data-expression type="text" maxlength="320" spellcheck="false" autocomplete="off" autocapitalize="off" placeholder="Ej. log(x^6)/(7x)">
          </label>
          <div class="graph-keypad" role="group" aria-label="Teclado científico"></div>
          <div class="graph-edit-actions">
            <div class="graph-caret" role="group" aria-label="Mover el cursor">
              <button type="button" data-key="left" aria-label="Cursor a la izquierda">←</button>
              <button type="button" data-key="right" aria-label="Cursor a la derecha">→</button>
            </div>
            <button type="button" class="graph-clear" data-key="clear">Limpiar</button>
            <button type="submit" class="graph-primary">Graficar <span aria-hidden="true">↵</span></button>
          </div>
          <div class="graph-status" role="status" data-status></div>
          <div class="graph-examples" role="group" aria-label="Funciones de ejemplo"><span>Prueba con</span></div>
        </form>
        <section class="graph-display" aria-label="Gráfica y controles">
          <div class="graph-toolbar">
            <div data-plotted class="graph-plotted" aria-label="Función representada"></div>
            <div class="graph-view-buttons" role="group" aria-label="Ajustar la vista">
              <button type="button" data-zoom="in" aria-label="Acercar">+</button>
              <button type="button" data-zoom="out" aria-label="Alejar">−</button>
              <button type="button" data-zoom="fit">Ajustar</button>
            </div>
          </div>
          <div class="graph-surface">
            <canvas class="graph-canvas" role="img" aria-label="Gráfica de la función. Arrastra para moverla. Usa las flechas izquierda y derecha para consultar coordenadas." tabindex="0"></canvas>
            <div class="graph-point-card" hidden>
              <div data-point-info role="status"></div>
              <button type="button" data-close-point aria-label="Cerrar datos del punto">×</button>
            </div>
          </div>
          <output class="graph-coordinates" data-coordinates aria-live="off"></output>
          <div class="graph-overlay-controls">
            <label><input type="checkbox" data-asymptotes checked> Asíntotas</label>
            <label><input type="checkbox" data-projections checked> Dominio e imagen</label>
          </div>
          <div class="graph-point-toggles" role="group" aria-label="Puntos visibles"></div>
          <details class="graph-window">
            <summary>Ventana de la gráfica</summary>
            <form data-window class="graph-bounds" aria-label="Límites de los ejes">
              <label>x mín. <input name="xmin" inputmode="decimal" required></label>
              <label>x máx. <input name="xmax" inputmode="decimal" required></label>
              <label>y mín. <input name="ymin" inputmode="decimal" required></label>
              <label>y máx. <input name="ymax" inputmode="decimal" required></label>
              <button type="submit">Aplicar</button>
            </form>
            <div data-window-status class="graph-window-status" role="status"></div>
          </details>
        </section>
      </div>
      <dl class="graph-results" aria-live="polite" hidden>
        <div class="graph-result-domain">
          <dt>Dominio</dt><dd data-domain></dd><dd class="graph-result-note" data-domain-note></dd>
        </div>
        <div class="graph-result-range">
          <dt>Imagen</dt><dd data-range></dd><dd class="graph-result-note" data-range-note></dd>
        </div>
        <div class="graph-result-asymptotes">
          <dt>Asíntotas</dt><dd data-lines></dd>
        </div>
      </dl>
      <details class="graph-point-details" open hidden>
        <summary>Puntos de la función</summary>
        <dl class="graph-point-list"></dl>
      </details>
    `;
    this.input = this.querySelector('[data-expression]');
    this.preview = this.querySelector('[data-preview]');
    this.status = this.querySelector('[data-status]');
    this.canvas = this.querySelector('canvas');
    this.coordinates = this.querySelector('[data-coordinates]');
    this.pointCard = this.querySelector('.graph-point-card');
    this.windowForm = this.querySelector('[data-window]');
    this.windowStatus = this.querySelector('[data-window-status]');
    const keypad = this.querySelector('.graph-keypad');
    for (const [kind, name, keys] of keyGroups) {
      const group = document.createElement('div');
      group.className = 'graph-key-group';
      group.dataset.keyGroup = kind;
      group.setAttribute('role', 'group');
      group.setAttribute('aria-label', name);
      const title = document.createElement('span');
      title.className = 'graph-key-title';
      title.textContent = name;
      group.append(title);
      for (const [label, key, description] of keys) {
        const button = document.createElement('button');
        button.type = 'button';
        button.dataset.key = key;
        button.textContent = label;
        if (description) button.setAttribute('aria-label', description);
        group.append(button);
      }
      keypad.append(group);
    }
    const toggles = this.querySelector('.graph-point-toggles');
    for (const [key, title] of pointLayers) {
      const label = document.createElement('label');
      label.dataset.pointLayer = key;
      const input = document.createElement('input');
      input.type = 'checkbox';
      input.checked = true;
      input.dataset.pointToggle = key;
      label.append(input, title);
      toggles.append(label);
    }
    for (const [label, expression] of examples) {
      const button = document.createElement('button');
      button.type = 'button';
      button.dataset.example = expression;
      button.textContent = label;
      this.querySelector('.graph-examples').append(button);
    }

    this.addEventListener('click', event => this.onClick(event), { signal });
    this.input.addEventListener('input', () => this.refreshPreview(true), { signal });
    this.querySelector('.graph-editor').addEventListener('submit', event => {
      event.preventDefault();
      this.submit(true);
    }, { signal });
    this.windowForm.addEventListener('submit', event => {
      event.preventDefault();
      this.applyWindow();
    }, { signal });
    this.querySelector('.graph-overlay-controls').addEventListener('change', () => this.schedulePaint(), { signal });
    toggles.addEventListener('change', () => {
      this.refreshPointList();
      this.clearCursor();
    }, { signal });
    this.canvas.addEventListener('pointerdown', event => this.startDrag(event), { signal });
    this.canvas.addEventListener('pointermove', event => this.movePointer(event), { signal });
    this.canvas.addEventListener('pointerup', event => this.endDrag(event), { signal });
    this.canvas.addEventListener('pointercancel', event => this.endDrag(event), { signal });
    this.canvas.addEventListener('lostpointercapture', event => this.endDrag(event), { signal });
    const clearHover = () => {
      if (!this.drag && !this.selectedPoint) this.clearCursor();
    };
    this.canvas.addEventListener('pointerleave', clearHover, { signal });
    this.canvas.addEventListener('blur', clearHover, { signal });
    this.addEventListener('keydown', event => {
      if (event.key === 'Escape' && this.selectedPoint) this.clearCursor();
    }, { signal });
    this.canvas.addEventListener('keydown', event => {
      if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
      event.preventDefault();
      const { xmin, xmax } = this.view;
      const step = (xmax - xmin) * (event.shiftKey ? .05 : .01) * (event.key === 'ArrowLeft' ? -1 : 1);
      const x = (this.cursor?.x ?? (xmin / 2 + xmax / 2)) + step;
      if (this.selectedPoint) this.clearCursor();
      this.inspect(Math.max(xmin, Math.min(xmax, x)));
    }, { signal });

    this.resize = new ResizeObserver(() => this.schedulePaint());
    this.resize.observe(this.canvas);
    this.theme = new MutationObserver(() => this.schedulePaint());
    this.theme.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    this.theme.observe(document.body, { attributes: true, attributeFilter: ['class'] });

    this.clearPlot();
  }

  disconnectedCallback() {
    this.events?.abort();
    this.events = null;
    this.resize?.disconnect();
    this.theme?.disconnect();
    this.drag = null;
    cancelAnimationFrame(this.frame);
    this.frame = 0;
  }

  onClick(event) {
    const button = event.target.closest('button');
    if (!button || !this.contains(button)) return;
    const { key, example, zoom, pointLayer, pointIndex } = button.dataset;
    if (button.hasAttribute('data-close-point')) {
      this.clearCursor();
      this.canvas.focus({ preventScroll: true });
    } else if (key) {
      this.insert(key);
      if (event.detail > 0 && event.pointerType === 'mouse') this.input.focus({ preventScroll: true });
    } else if (example) {
      this.input.value = example;
      this.input.setSelectionRange(example.length, example.length);
      this.submit(true, examples.find(([, expression]) => expression === example)?.[2]);
    } else if (pointLayer) {
      this.revealPoint(this.points[pointLayer].items[Number(pointIndex)], pointLayer);
    } else if (zoom && this.model) {
      if (zoom === 'fit') this.setView(fitView(this.model));
      else {
        const factor = zoom === 'in' ? .72 : 1 / .72;
        const scale = (lo, hi) => {
          const center = lo / 2 + hi / 2, radius = (hi - lo) * factor / 2;
          return [center - radius, center + radius];
        };
        const { xmin, xmax, ymin, ymax } = this.view;
        const [x0, x1] = scale(xmin, xmax), [y0, y1] = scale(ymin, ymax);
        this.setView({ xmin: x0, xmax: x1, ymin: y0, ymax: y1 });
      }
    }
  }

  insert(key) {
    const input = this.input;
    const value = input.value;
    let start = input.selectionStart ?? value.length, end = input.selectionEnd ?? value.length;
    const selected = value.slice(start, end);
    let insertion = key, caret = null;
    if (key === 'left' || key === 'right') {
      const next = key === 'left' ? Math.max(0, start - 1)
        : Math.min(value.length, value.startsWith(')/(', end) ? end + 3 : end + 1);
      input.setSelectionRange(next, next);
      return;
    }
    if (key === 'erase') {
      if (start === end) start = Math.max(0, start - 1);
      insertion = '';
    } else if (key === 'clear') {
      input.value = '';
      this.clearPlot();
      return;
    } else if (key === 'fraction') {
      const entire = !selected && start === value.length ? value.trim() : '';
      const numerator = selected || entire;
      if (entire) start = 0;
      insertion = '(' + numerator + ')/()';
      caret = numerator ? insertion.length - 1 : 1;
    } else if (key === 'power' || key === 'square') {
      const prefix = selected ? '(' + selected + ')' : /[\d)xπe⁰¹²³⁴⁵⁶⁷⁸⁹]\s*$/u.test(value.slice(0, start)) ? '' : 'x';
      insertion = prefix + (key === 'square' ? '^2' : '^()');
      if (key === 'power') caret = insertion.length - 1;
    } else if (key.length > 1 && key.endsWith('(')) {
      insertion = key + selected + ')';
      if (!selected) caret = key.length;
    }
    if (value.length - (end - start) + insertion.length > input.maxLength) return;
    input.setRangeText(insertion, start, end, 'end');
    if (caret !== null) input.setSelectionRange(start + caret, start + caret);
    this.refreshPreview(true);
  }

  refreshPreview(draft) {
    const source = this.input.value;
    try {
      this.preview.replaceChildren(mathEquation(parseExpression(source, { incomplete: true })));
    } catch {
      this.preview.textContent = 'f(x) = ' + source;
    }
    this.input.removeAttribute('aria-invalid');
    const message = draft && source.trim() && this.plottedSource !== source.trim() ? 'Pulsa Graficar para actualizar.' : '';
    if (this.status.textContent !== message) this.status.textContent = message;
    this.status.classList.remove('graph-error');
  }

  submit(reveal = false, exampleView) {
    const source = this.input.value.trim();
    this.refreshPreview(false);
    try {
      const tree = parseExpression(source);
      this.model = analyzeExpression(tree);
      this.findPoints = pointFinder(tree, this.model);
      this.canvas.classList.add('is-interactive');
      this.plottedSource = source;
      this.querySelector('[data-plotted]').replaceChildren(mathEquation(tree));
      this.querySelector('.graph-results').hidden = false;
      this.setView(exampleView || fitView(this.model));
      this.refreshResults();
      if (reveal) this.revealGraph();
    } catch (error) {
      this.input.setAttribute('aria-invalid', 'true');
      this.status.classList.add('graph-error');
      this.status.textContent = error instanceof SyntaxError ? error.message : 'No se pudo calcular esta expresión.';
    }
  }

  applyWindow() {
    const view = {};
    for (const [key, value] of new FormData(this.windowForm)) {
      const raw = value.trim().replace(',', '.').replace('−', '-');
      view[key] = raw ? Number(raw) : NaN;
    }
    if (!this.setView(view)) {
      this.windowStatus.textContent = 'Introduce límites finitos. El mínimo debe ser menor que el máximo en cada eje.';
    }
  }

  setView(view) {
    if (!isViewValid(view)) return false;
    this.view = view;
    this.windowStatus.textContent = '';
    for (const [key, value] of Object.entries(view)) {
      this.windowForm.elements.namedItem(key).value = String(Number(value.toPrecision(10))).replace('.', ',');
    }
    this.clearCursor();
    this.refreshRange();
    this.points = this.findPoints ? this.findPoints(view) : null;
    this.refreshPointList();
    return true;
  }

  clearPlot() {
    this.model = null;
    this.findPoints = null;
    this.canvas.classList.remove('is-interactive');
    this.plottedSource = '';
    this.querySelector('[data-plotted]').textContent = 'Introduce una función para graficarla.';
    this.querySelector('.graph-results').hidden = true;
    this.refreshPreview(false);
    this.setView({ ...defaultView });
  }

  pointerPosition(event) {
    const bounds = this.canvas.getBoundingClientRect();
    return {
      x: event.clientX - bounds.left - this.canvas.clientLeft,
      y: event.clientY - bounds.top - this.canvas.clientTop
    };
  }

  nearestMarker({ x, y }) {
    let hit;
    let distance = 12;
    for (const marker of this.axes.markers) {
      const gap = Math.hypot(marker.px - x, marker.py - y);
      if (gap < distance) {
        hit = marker;
        distance = gap;
      }
    }
    return hit;
  }

  startDrag(event) {
    if (!this.axes || !this.model || this.drag || !event.isPrimary || event.button !== 0) return;
    this.drag = {
      id: event.pointerId, x: event.clientX, y: event.clientY,
      view: this.view, axes: this.axes, moved: false
    };
    this.canvas.setPointerCapture(event.pointerId);
  }

  movePointer(event) {
    if (!this.axes || !this.model) return;
    const drag = this.drag;
    if (!drag) {
      if (event.pointerType === 'touch' || this.selectedPoint) return;
      const position = this.pointerPosition(event);
      if (position.x < this.axes.left || position.x > this.axes.right) return;
      const hit = this.nearestMarker(position);
      this.inspect(hit?.x ?? this.axes.worldX(position.x), hit);
      return;
    }
    if (drag.id !== event.pointerId) return;
    const dx = event.clientX - drag.x, dy = event.clientY - drag.y;
    if (!drag.moved) {
      if (Math.hypot(dx, dy) < 5) return;
      drag.moved = true;
      this.canvas.classList.add('is-dragging');
      this.clearCursor();
    }
    const { xmin, xmax, ymin, ymax } = drag.view;
    const { left, right, top, bottom } = drag.axes;
    const xOffset = -(dx / (right - left)) * (xmax - xmin);
    const yOffset = (dy / (bottom - top)) * (ymax - ymin);
    const view = { xmin: xmin + xOffset, xmax: xmax + xOffset, ymin: ymin + yOffset, ymax: ymax + yOffset };
    if (isViewValid(view)) {
      this.view = view;
      this.schedulePaint();
    }
  }

  endDrag(event) {
    const drag = this.drag;
    if (!drag || drag.id !== event.pointerId) return;
    const tapped = event.type === 'pointerup';
    if (tapped) this.movePointer(event);
    this.drag = null;
    this.canvas.classList.remove('is-dragging');
    if (this.canvas.hasPointerCapture(event.pointerId)) this.canvas.releasePointerCapture(event.pointerId);
    if (drag.moved) {
      this.setView(this.view);
    } else if (tapped && this.axes && this.model) {
      const position = this.pointerPosition(event);
      const hit = this.nearestMarker(position);
      if (hit) this.selectPoint(hit, hit.layer);
      else {
        this.clearCursor();
        if (position.x >= this.axes.left && position.x <= this.axes.right) {
          this.inspect(this.axes.worldX(position.x));
        }
      }
    }
  }

  revealGraph() {
    const plot = this.canvas.getBoundingClientRect();
    if (plot.bottom < 60 || plot.top + Math.min(plot.height, 150) > window.innerHeight) {
      this.querySelector('.graph-display').scrollIntoView({ block: 'start' });
    }
  }

  revealPoint(point, layer) {
    let { xmin, xmax, ymin, ymax } = this.view;
    if (point.x < xmin || point.x > xmax) {
      const half = (xmax - xmin) / 2;
      [xmin, xmax] = [point.x - half, point.x + half];
    }
    if (point.y < ymin || point.y > ymax) {
      const half = (ymax - ymin) / 2;
      [ymin, ymax] = [point.y - half, point.y + half];
    }
    if (xmin !== this.view.xmin || ymin !== this.view.ymin) this.setView({ xmin, xmax, ymin, ymax });
    this.selectPoint(point, layer);
    this.revealGraph();
  }

  selectPoint(point, layer) {
    const { x, y } = point;
    this.selectedPoint = point;
    const info = this.pointCard.querySelector('[data-point-info]');
    const value = document.createElement('strong');
    const equals = this.points[layer].approximate ? ' ≈ ' : ' = ';
    value.textContent = 'x' + equals + formatNumber(x) + ' · f(x)' + equals + formatNumber(y);
    info.replaceChildren(value);
    for (const [key, , title] of this.visiblePointLayers()) {
      const coincides = this.points[key].items.some(candidate =>
        Math.abs(candidate.x - x) <= 1e-10 * Math.max(1, Math.abs(x)) &&
        Math.abs(candidate.y - y) <= 1e-10 * Math.max(1, Math.abs(y)));
      if (key === layer || coincides) {
        const condition = document.createElement('span');
        condition.dataset.pointLayer = key;
        condition.textContent = title;
        info.append(condition);
      }
    }
    this.pointCard.hidden = false;
    this.inspect(x, point);
  }

  positionPointCard() {
    if (!this.selectedPoint || !this.axes) return;
    const { x, y } = this.axes.screenPoint(this.selectedPoint);
    const gap = 9;
    const card = this.pointCard;
    const width = card.offsetWidth, height = card.offsetHeight;
    const maxX = this.canvas.clientWidth - width - gap;
    const maxY = this.canvas.clientHeight - height - gap;
    const rightOfPoint = x + 14 <= maxX;
    const leftOfPoint = x - width - 14 >= gap;
    const beside = rightOfPoint || leftOfPoint;
    const left = rightOfPoint ? x + 14 : leftOfPoint ? x - width - 14 : x - width / 2;
    const top = beside ? y - height / 2 : y - height - 14 >= gap ? y - height - 14 : y + 14;
    card.style.left = Math.max(gap, Math.min(left, maxX)) + 'px';
    card.style.top = Math.max(gap, Math.min(top, maxY)) + 'px';
  }

  inspect(x, point) {
    if (!this.model) return;
    const y = point?.y ?? this.model.evaluate(x);
    this.cursor = { x, y };
    this.coordinates.textContent = 'x = ' + formatNumber(x) + '   ·   ' + (Number.isFinite(y) ? 'f(x) = ' + formatNumber(y) : 'f(x) sin valor real');
    this.schedulePaint();
  }

  clearCursor() {
    this.cursor = null;
    this.selectedPoint = null;
    this.pointCard.hidden = true;
    this.coordinates.textContent = this.model ? plotHelp : '';
    this.schedulePaint();
  }

  schedulePaint() {
    if (this.frame) return;
    this.frame = requestAnimationFrame(() => {
      this.frame = 0;
      if (!this.isConnected) return;
      const style = getComputedStyle(this);
      const colors = Object.fromEntries(['background', 'grid', 'axis', 'text', 'curve', 'asymptote', 'domain', 'range']
        .map(key => [key, style.getPropertyValue('--plot-' + key).trim()]));
      const markers = this.visiblePointLayers().flatMap(([key]) => this.points[key].items.map(point => ({
        ...point, layer: key, color: style.getPropertyValue('--point-' + key).trim()
      })));
      this.axes = drawGraph(this.canvas, this.model || emptyPlot, this.view, {
        colors, cursor: this.cursor, asymptotes: this.querySelector('[data-asymptotes]').checked,
        projections: this.querySelector('[data-projections]').checked, markers,
        left: this.drag?.moved ? this.drag.axes.left : undefined
      });
      this.positionPointCard();
    });
  }

  visiblePointLayers() {
    return this.points ? pointLayers.filter(([key]) => this.querySelector('[data-point-toggle="' + key + '"]').checked) : [];
  }

  refreshPointList() {
    const details = this.querySelector('.graph-point-details');
    const list = this.querySelector('.graph-point-list');
    const layers = this.visiblePointLayers();
    details.hidden = !layers.length;
    list.replaceChildren();
    for (const [key, title] of layers) {
      const { items, approximate, everywhere } = this.points[key];
      const group = document.createElement('div');
      group.dataset.pointLayer = key;
      const name = document.createElement('dt');
      name.textContent = title;
      const coordinates = document.createElement('dd');
      if (everywhere) coordinates.textContent = key === 'x' ? 'Coincide con el eje X en su dominio.' : 'Vale 0 en todo el dominio.';
      else if (!items.length) coordinates.textContent = approximate ? 'Sin ceros aislados detectados en la ventana.' : 'Sin puntos.';
      else {
        for (const [index, { x, y }] of items.entries()) {
          const button = document.createElement('button');
          button.type = 'button';
          button.dataset.pointLayer = key;
          button.dataset.pointIndex = index;
          button.textContent = (approximate ? '≈ ' : '') + '(' + formatNumber(x) + '; ' + formatNumber(y) + ')';
          button.title = title + ' · ' + button.textContent;
          coordinates.append(button);
        }
      }
      group.append(name, coordinates);
      list.append(group);
    }
  }

  refreshRange() {
    if (!this.model) return;
    const range = this.querySelector('[data-range]'), note = this.querySelector('[data-range-note]');
    if (this.model.range) {
      range.textContent = formatIntervals(this.model.range);
      note.textContent = '';
    } else {
      const sample = sampleImage(this.model, this.view);
      range.textContent = sample ? '≈ [' + sample.map(formatNumber).join('; ') + ']' : 'Sin valores visibles';
      note.textContent = sample ? 'Valores muestreados en la ventana de x.' : 'Prueba con otra ventana de x.';
    }
  }

  refreshResults() {
    const { domain, families, asymptotes } = this.model;
    const exclusions = families.length ? ' ∖ {' + families.map(formatFamily).join(' ; ') + ' : k ∈ ℤ}' : '';
    const domainLabel = domain?.length > 1 && exclusions ? '(' + formatIntervals(domain) + ')' : formatIntervals(domain);
    this.querySelector('[data-domain]').textContent = domain ? domainLabel + (domain.length ? exclusions : '') : 'Sin intervalos calculados';
    this.querySelector('[data-domain-note]').textContent = domain ? '' : 'La curva se dibuja donde se encuentran valores reales.';
    const lines = this.querySelector('[data-lines]');
    lines.replaceChildren();
    if (!asymptotes.length) {
      lines.textContent = 'No se detectan';
      return;
    }
    const list = document.createElement('div');
    list.className = 'graph-lines';
    for (const a of asymptotes) {
      const item = document.createElement('div');
      item.textContent = (a.approximate ? '≈ ' : '') + lineLabel(a)
        + (a.sides?.length === 1 ? ' en ' + (a.sides[0] < 0 ? '−∞' : '+∞') : '');
      if (a.approximate) item.title = 'Estimación numérica';
      list.append(item);
    }
    lines.append(list);
  }
}

customElements.define('function-grapher', FunctionGrapher);
