const names = {
  sin: 'sen', sen: 'sen', cos: 'cos', tan: 'tg', tg: 'tg',
  asin: 'arcsen', arcsin: 'arcsen', arcsen: 'arcsen', acos: 'arccos', arccos: 'arccos',
  atan: 'arctg', arctan: 'arctg', arctg: 'arctg',
  log: 'log', ln: 'log', log10: 'log10', exp: 'exp',
  sqrt: 'sqrt', '√': 'sqrt', cbrt: 'cbrt', '∛': 'cbrt', abs: 'abs'
};
const words = [...Object.keys(names), 'pi', 'π', 'e', 'x'].sort((a, b) => b.length - a.length);
const superscripts = { '⁰': '0', '¹': '1', '²': '2', '³': '3', '⁴': '4', '⁵': '5',
  '⁶': '6', '⁷': '7', '⁸': '8', '⁹': '9', '⁺': '+', '⁻': '-' };

export function parseExpression(source, { incomplete = false } = {}) {
  if (source.length > 320) throw new SyntaxError('La expresión admite hasta 320 caracteres.');
  const input = source.toLowerCase().replace(/−/g, '-').replace(/[·×]/g, '*').replace(/÷/g, '/')
    .replace(/\*\*/g, '^').replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹⁺⁻]+/g, text => '^(' + [...text].map(c => superscripts[c]).join('') + ')');
  const tokens = [];
  for (let rest = input.trim(); rest; rest = rest.trimStart()) {
    const number = /^(?:\d+(?:[.,]\d*)?|[.,]\d+)(?:e[+-]?\d+)?/.exec(rest)?.[0];
    const word = number ? null : words.find(name => rest.startsWith(name));
    const token = number || word || rest[0];
    if (!number && !word && !'+-*/^()'.includes(token)) {
      throw new SyntaxError('Símbolo desconocido «' + token + '». Usa x para la variable.');
    }
    tokens.push({ value: token, type: number ? 'number' : word ? 'word' : token });
    rest = rest.slice(token.length);
  }
  tokens.push({ value: '', type: 'end' });
  let cursor = 0;
  const peek = () => tokens[cursor];
  const take = () => tokens[cursor++];
  const binary = (op, left, right, implicit = false) => ({ type: 'binary', op, left, right, implicit });

  function group() {
    const arg = additive();
    if (peek().type === ')') take();
    else if (!incomplete || peek().type !== 'end') throw new SyntaxError('Falta un paréntesis de cierre.');
    return arg;
  }

  function atom() {
    const { type, value } = peek();
    if (incomplete && (type === 'end' || type === ')')) return { type: 'hole' };
    if (type === 'number') {
      take();
      const number = Number(value.replace(',', '.'));
      if (!Number.isFinite(number)) throw new SyntaxError('Ese número queda fuera del rango de la calculadora.');
      return { type: 'number', value: number, text: value.replace('.', ',') };
    }
    if (type === '(') {
      take();
      return { type: 'group', arg: group() };
    }
    if (type === 'word') {
      take();
      if (value === 'x') return { type: 'variable' };
      if (value === 'e') return { type: 'number', value: Math.E, text: 'e' };
      if (value === 'pi' || value === 'π') return { type: 'number', value: Math.PI, text: 'π' };
      if (peek().type !== '(') {
        if (incomplete && peek().type === 'end') return { type: 'call', name: names[value], arg: { type: 'hole' } };
        throw new SyntaxError('Escribe el argumento de ' + value + ' entre paréntesis.');
      }
      take();
      return { type: 'call', name: names[value], arg: group() };
    }
    throw new SyntaxError(type === 'end' ? 'Falta completar la expresión.' : 'Se esperaba un número, x o un paréntesis.');
  }

  function prefix() {
    if (peek().type === '+' || peek().type === '-') {
      return { type: 'unary', op: take().value, arg: prefix() };
    }
    const base = atom();
    if (peek().type !== '^') return base;
    take();
    return binary('^', base, prefix());
  }

  function product() {
    let left = prefix();
    while (['*', '/', '(', 'number', 'word'].includes(peek().type)) {
      const explicit = peek().type === '*' || peek().type === '/';
      const op = explicit ? take().value : '*';
      left = binary(op, left, prefix(), !explicit);
    }
    return left;
  }

  function additive() {
    let left = product();
    while (peek().type === '+' || peek().type === '-') {
      left = binary(take().value, left, product());
    }
    return left;
  }

  const tree = additive();
  if (peek().type !== 'end') throw new SyntaxError('Hay un paréntesis de cierre sin abrir.');
  return tree;
}

export const ungroup = node => node.type === 'group' ? ungroup(node.arg) : node;

export function dependsOnX(node) {
  if (node.type === 'variable') return true;
  if (node.type === 'binary') return dependsOnX(node.left) || dependsOnX(node.right);
  return node.arg ? dependsOnX(node.arg) : false;
}

function tangent(x) {
  // Math.cos(π/2) es un residuo de redondeo, no un denominador válido.
  const periods = (x - Math.PI / 2) / Math.PI;
  return Math.abs(Math.cos(x)) <= Number.EPSILON || (Math.abs(periods) < 1e6 && Number.isInteger(periods)) ? NaN : Math.tan(x);
}

export const functions = {
  sen: Math.sin, cos: Math.cos, tg: tangent,
  arcsen: Math.asin, arccos: Math.acos, arctg: Math.atan,
  log: x => x > 0 ? Math.log(x) : NaN,
  log10: x => x > 0 ? Math.log10(x) : NaN,
  exp: Math.exp, sqrt: Math.sqrt, cbrt: Math.cbrt, abs: Math.abs
};

export function compileExpression(node) {
  if (node.type === 'number') return () => node.value;
  if (node.type === 'variable') return x => x;
  if (node.type === 'hole') return () => NaN;
  if (node.type === 'binary') {
    const left = compileExpression(node.left);
    const right = compileExpression(node.right);
    switch (node.op) {
      case '+': return x => left(x) + right(x);
      case '-': return x => left(x) - right(x);
      case '*': return x => left(x) * right(x);
      case '/': return x => { const d = right(x); return d === 0 ? NaN : left(x) / d; };
      case '^': {
        const variable = dependsOnX(node.right);
        return x => {
          const base = left(x);
          const exponent = right(x);
          if (Number.isNaN(base) || (variable && base <= 0) || (base === 0 && exponent < 0)) return NaN;
          return Math.pow(base, exponent);
        };
      }
    }
  }
  const arg = compileExpression(node.arg);
  if (node.type === 'call') return x => functions[node.name](arg(x));
  if (node.type === 'unary' && node.op === '-') return x => -arg(x);
  return arg;
}

export function constantValue(node) {
  return dependsOnX(node) ? NaN : compileExpression(node)(0);
}
