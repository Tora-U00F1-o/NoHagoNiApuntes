import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve, join } from 'node:path';
import { makeCatalog } from './catalog.mjs';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const subject = (await makeCatalog(join(root, 'contenido'))).subjects.find(s => s.id === 'software-estandares-web');
export const slug = title => title.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const csv = value => '"' + String(value).replace(/"/g, '""') + '"';
const inline = text => text.replace(/<\/?!?[a-z][^>\n]*>/gi, code => '`' + code + '`');

// Semilla estable: los índices de respuesta no dependen del orden de lectura.
function shuffled(values, seed) {
  const result = [...values];
  let state = [...seed].reduce((h, c) => Math.imul(h ^ c.charCodeAt(0), 16777619) >>> 0, 2166136261);
  for (let i = result.length - 1; i > 0; i--) {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
    const j = state % (i + 1);
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

for (const unit of subject.units.filter(u => !u.id.startsWith('practicas-'))) {
  const source = await readFile(join(root, 'scripts', 'sew-banks', unit.id + '.txt'), 'utf8');
  const cards = source.split(/\r?\n/).filter(line => line && !line.startsWith('#')).map((line, i) => {
    const fields = line.split('§').map(s => s.trim());
    if (fields.length !== 7 || fields.some(s => !s)) throw new Error(`${unit.id}:${i + 1}: se esperan siete campos`);
    const [anchor, topic, truth, error, situation, answer, misconception] = fields;
    return { anchor, topic, truth, error, situation, answer, misconception };
  });
  const extraReview = source.split(/\r?\n/).filter(line => line.startsWith('# repaso: ')).map(line => line.slice('# repaso: '.length));
  if (cards.length !== 25) throw new Error(`${unit.id}: se esperan 25 fichas, hay ${cards.length}`);
  const markdown = await readFile(join(root, unit.path), 'utf8');
  const anchors = new Set([...markdown.matchAll(/^#{2,3} (.+)$/gm)].map(m => slug(m[1])));
  for (const card of cards) if (!anchors.has(card.anchor)) throw new Error(`${unit.id}: ancla inexistente ${card.anchor}`);
  const ref = card => `${subject.id}/${unit.id}#${card.anchor}`;
  const directory = join(root, unit.path, '..');
  await mkdir(join(directory, 'test'), { recursive: true });
  const names = { facil: 'Fácil', medio: 'Medio', dificil: 'Difícil' };
  const tests = { facil: [], medio: [], dificil: [] };
  const add = (level, question, options, correct, explanation, card) => {
    const choices = shuffled(options, `${unit.id}/${level}/${tests[level].length}`);
    if (new Set(choices).size !== choices.length || !choices.includes(correct)) throw new Error('Opciones inválidas');
    tests[level].push([question, choices.indexOf(correct) + 1, explanation, ref(card), ...choices, ...Array(5 - choices.length).fill('')]);
  };
  const labels = ['I', 'II', 'III', 'IV'];
  const advancedSource = await readFile(join(root, 'scripts', 'sew-banks', unit.id + '.advanced.txt'), 'utf8');
  const advanced = advancedSource.split(/\r?\n/).filter(line => line && !line.startsWith('#')).map(line => line.split('§').map(s => s.trim()));
  if (advanced.length !== 10 || advanced.some(fields => fields.length !== 8 || fields.some(s => !s))) throw new Error(`${unit.id}: se esperan diez casos avanzados con ocho campos`);
  for (const [anchor, question, correct, ...rest] of advanced) {
    if (!anchors.has(anchor)) throw new Error(`${unit.id}: ancla avanzada inexistente ${anchor}`);
    add('dificil', question, [correct, ...rest.slice(0, 4)], correct, rest[4], { anchor });
  }
  const evaluation = (claims, kind = 'set') => {
    const mask = claims.reduce((n, c, i) => n | (c.valid ? 1 << i : 0), 0);
    const describe = n => n === 0 ? 'Todas las afirmaciones anteriores son falsas.' : n === (1 << claims.length) - 1 ? 'Todas las afirmaciones anteriores son correctas.' : 'Son correctas únicamente: ' + labels.filter((_, i) => n & 1 << i).join(', ') + '.';
    const masks = kind === 'count' ? null : [...new Set([mask, 0, (1 << claims.length) - 1, mask ^ 1, mask ^ 2, mask ^ 4])].slice(0, 5);
    return kind === 'count' ? {
      options: [0, 1, 2, 3, 4].map(n => n === 0 ? 'Todas son falsas: ninguna es correcta.' : n === 4 ? 'Todas son correctas: ninguna es falsa.' : `Hay exactamente ${n} afirmaciones correctas y ${4 - n} incorrectas.`),
      correct: mask.toString(2).replace(/0/g, '').length,
    } : { options: masks.map(describe), correct: describe(mask) };
  };
  for (let i = 0; i < 25; i++) {
    const c = cards[i];
    const neighbors = [c, cards[(i + 1) % 25], cards[(i + 2) % 25], cards[(i + 3) % 25]];
    add('facil', `${c.topic}: señala la afirmación correcta según la unidad.`, [c.truth, ...neighbors.map(x => x.error)], c.truth,
      `${c.truth} Las otras alternativas confunden estas reglas: ${neighbors.map(x => x.truth).join(' ')}`, c);
    const positive = i % 2 === 0;
    add('facil', `${c.situation} Verdadero o falso: ${positive ? c.misconception : c.answer}`, ['Verdadero', 'Falso'], positive ? 'Falso' : 'Verdadero', `${c.answer} Fundamento: ${c.truth}`, c);

    const second = cards[(i + 1) % 25];
    const caseFlags = [[true, false], [false, true], [true, true], [false, false]][i % 4];
    const caseClaims = [c, second].map((x, k) => `${x.situation} Conclusión: ${caseFlags[k] ? x.answer : x.misconception}`);
    const correct = caseFlags.every(Boolean) ? 'Ambas conclusiones son correctas.' : caseFlags.every(f => !f) ? 'Ambas conclusiones son falsas.' : caseFlags[0] ? 'Solo la conclusión I es correcta.' : 'Solo la conclusión II es correcta.';
    add('medio', `Aplica las reglas a dos casos independientes. I: ${caseClaims[0]} II: ${caseClaims[1]}`, [
      'Ambas conclusiones son correctas.', 'Ambas conclusiones son falsas.', 'Solo la conclusión I es correcta.', 'Solo la conclusión II es correcta.', 'El enunciado no aporta información para evaluar ninguna de las dos.',
    ], correct, [c, second].map((x, k) => `${labels[k]} es ${caseFlags[k] ? 'correcta' : 'incorrecta'}: ${x.answer} Fundamento: ${x.truth} Referencia: ${ref(x)}.`).join(' '), c);

    const other = cards[(i + 7) % 25];
    const flags = [[true, true], [false, false], [true, false], [false, true]][i % 4];
    const claims = [c, other].map((x, k) => ({ text: flags[k] ? x.truth : x.error, valid: flags[k], card: x }));
    const ev = evaluation(claims);
    // Cuatro combinaciones posibles + una respuesta de indeterminación, siempre falsa con el enunciado completo.
    const allPairOptions = [0, 1, 2, 3].map(n => n === 0 ? 'Todas las afirmaciones anteriores son falsas.' : n === 3 ? 'Todas las afirmaciones anteriores son correctas.' : `Son correctas únicamente: ${n === 1 ? 'I' : 'II'}.`);
    add('medio', `Contrasta las reglas de la unidad. ${claims.map((x, k) => `${labels[k]}: ${x.text}`).join(' ')}`, [...allPairOptions, 'No es posible decidir con las reglas de esta unidad.'], ev.correct,
      claims.map((x, k) => `${labels[k]} es ${x.valid ? 'verdadera' : 'falsa'}: ${x.card.truth} Referencia: ${ref(x.card)}.`).join(' '), c);
  }
  // Mezcla conceptos cercanos y casos límite. Cada afirmación se explica por separado.
  for (let i = 0; i < 40; i++) {
    const indices = [i % 25, (i + 1) % 25, (i + 7) % 25, (i + 13) % 25];
    const pattern = [15, 0, 1, 14, 5, 10, 7, 8, 3, 12, 6, 9, 11, 4, 13, 2][i % 16];
    const claims = indices.map((idx, k) => ({ text: pattern & 1 << k ? cards[idx].truth : cards[idx].error, valid: Boolean(pattern & 1 << k), card: cards[idx] }));
    const kind = i < 20 ? 'set' : 'count';
    const ev = evaluation(claims, kind);
    const question = kind === 'set' ? 'Selecciona el conjunto EXACTO de afirmaciones correctas; una sola excepción invalida una afirmación.' : 'Comprueba si alguna afirmación es incorrecta y determina el número EXACTO de correctas.';
    add('dificil', `${question} ${claims.map((x, k) => `${labels[k]}: ${x.text}`).join(' ')}`, ev.options, kind === 'count' ? ev.options[ev.correct] : ev.correct,
      claims.map((x, k) => `${labels[k]} es ${x.valid ? 'verdadera' : 'falsa'}: ${x.card.truth} Referencia: ${ref(x.card)}.`).join(' '), cards[i % 25]);
  }
  for (const [level, questions] of Object.entries(tests)) {
    const minutes = { facil: 30, medio: 45, dificil: 60 }[level];
    const description = { facil: 'Conceptos y reglas fundamentales', medio: 'Casos de aplicación y comparación de reglas', dificil: 'Discriminación de afirmaciones, excepciones y combinaciones de conceptos' }[level];
    const text = `# titulo: ${unit.title} — ${names[level]}\n# asignatura: ${subject.title}\n# unidad: ${unit.id}\n# dificultad: ${level}\n# descripcion: ${description}. 50 preguntas con una sola respuesta correcta y explicación.\n# tiempo: ${minutes}\npregunta,correcta,explicacion,referencia,opcion_1,opcion_2,opcion_3,opcion_4,opcion_5\n` + questions.map(q => q.map(csv).join(',')).join('\n') + '\n';
    await writeFile(join(directory, 'test', level + '.csv'), text);
  }
  const groups = new Map();
  for (const card of cards) {
    if (!groups.has(card.anchor)) groups.set(card.anchor, []);
    groups.get(card.anchor).push(card);
  }
  const unitUrl = `?u=${encodeURIComponent(subject.id + '/' + unit.id)}`;
  const guide = `---\nasignatura: ${subject.title}\ntitulo: ${unit.title} — claves de examen\nresumen: Lista de comprobación para repasar conceptos, detalles y errores de esta unidad.\n---\n\n# ${unit.title}: claves de examen\n\nGuía de repaso basada en los apuntes, sin garantizar qué preguntará el profesor. Estudia también tablas, código, figuras y advertencias del [desarrollo completo](${unitUrl}). Las fechas y estados documentales se entienden según el material docente.\n\n` +
    [...groups].map(([anchor, list]) => `## ${list[0].topic}\n\n[Apartado de los apuntes](${unitUrl}#${anchor}).\n\n` + list.map(c => `- **${c.topic}:** ${inline(c.truth)}`).join('\n')).join('\n\n') +
    (extraReview.length ? `\n\n## Completar el repaso del temario\n\n` + extraReview.map(text => '- ' + inline(text)).join('\n') : '') +
    `\n\n## Casos y matices que debes justificar\n\n` + advanced.map(([anchor, , , , , , , explanation]) => `- ${inline(explanation)} [Revisar](${unitUrl}#${anchor}).`).join('\n') +
    `\n\n## Cómo afrontar opciones combinadas\n\n- Decide por separado si cada afirmación es verdadera, incluida su condición, cuantificador y contexto. Una fecha histórica no describe necesariamente el estado actual.\n- «Todas las anteriores son correctas» exige que no haya ninguna excepción; «todas son falsas» exige que no haya ninguna verdadera.\n- «Alguna es incorrecta» significa al menos una; no equivale a «todas son incorrectas» ni a «exactamente una».\n- En preguntas de conjunto exacto, marca una sola opción que enumere todas y solo las verdaderas. Justifica también las falsas.\n- En código, identifica primero contexto, orden, tipos, cardinalidad, nombres y límites inclusivos/exclusivos; después calcula el resultado.\n\n## Autoevaluación\n\n` + Object.entries(names).map(([level, label]) => `- [Test ${label.toLowerCase()}: 50 preguntas](?cuestionario=${encodeURIComponent(subject.id + '--' + unit.id + '--' + level)})`).join('\n') + '\n';
  await writeFile(join(directory, 'examen.md'), guide);
  console.log(`${unit.title}: 3 × 50 preguntas y examen.md`);
}
