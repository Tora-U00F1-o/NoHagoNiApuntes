import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, readFile, writeFile, rm } from 'node:fs/promises';
import { join, resolve, sep } from 'node:path';
import { tmpdir } from 'node:os';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';
import { makeCatalog } from './catalog.mjs';
import { readQuizCsv, scanQuestionnaires } from './cuestionarios.mjs';
import { validateUnitQuizzes } from './quiz-validation.mjs';

const root = fileURLToPath(new URL('..', import.meta.url));

test('todos los niveles SEW tienen 50 preguntas válidas y referencias exactas, sin prácticas', async () => {
  const catalog = await makeCatalog(join(root, 'contenido'));
  assert.deepEqual(await validateUnitQuizzes(root, catalog), { units: 15, tests: 45, questions: 2250 });
});

test('el escáner distingue comas en metadatos, ; en texto, comillas y saltos en celdas', async () => {
  const parsed = readQuizCsv('# titulo: Uno, dos; tres\npregunta,correcta,explicacion,referencia,opcion_1,opcion_2\n"Línea 1\nLínea 2",1,"Dice ""sí""; aquí",ref,"Sí; claro",No\n');
  assert.equal(parsed.metadata.titulo, 'Uno, dos; tres');
  assert.equal(parsed.rows.length, 2);
  assert.equal(parsed.rows[1][0], 'Línea 1\nLínea 2');
  assert.equal(parsed.rows[1][2], 'Dice "sí"; aquí');
  const semicolon = readQuizCsv('pregunta;correcta;opcion_1;opcion_2\n"¿Uno, dos?";2;Uno;Dos\n');
  assert.equal(semicolon.rows[1][0], '¿Uno, dos?');
  assert.equal(readQuizCsv('pregunta,correcta,opcion_1,opcion_2\n"Texto\n# titulo: contenido literal",1,Sí,No').rows[1][0], 'Texto\n# titulo: contenido literal');
});

test('catálogo anidado: ID distinto por unidad y compatibilidad de identificadores antiguos', async () => {
  const temporary = await mkdtemp(join(tmpdir(), 'apuntes-quiz-'));
  try {
    for (const dir of ['01-uno', '02-dos']) {
      const path = join(temporary, 'contenido', 'asignatura', dir);
      await mkdir(join(path, 'test', 'anteriores'), { recursive: true });
      await writeFile(join(path, 'unidad.md'), '---\ntitulo: Tema\nresumen: Contenido\n---\n\n## Tema\n');
      await writeFile(join(path, 'test', 'facil.csv'), '# dificultad: facil\npregunta,correcta,explicacion,referencia,opcion_1,opcion_2\nPregunta,1,Explicación,,Sí,No\n');
    }
    await writeFile(join(temporary, 'contenido', 'asignatura', '01-uno', 'test', 'anteriores', 'antiguo.csv'), 'pregunta,correcta,opcion_1,opcion_2\nPregunta,1,Sí,No\n');
    const catalog = await makeCatalog(join(temporary, 'contenido'));
    const quizzes = await scanQuestionnaires(join(temporary, 'contenido'), catalog);
    assert.equal(new Set(quizzes.map(q => q.id)).size, 3);
    assert.equal(quizzes.find(q => q.isArchive).id, 'antiguo');
    assert.ok(quizzes.every(q => q.optionsRange === '2-2'));
    assert.ok(quizzes.every(q => q.path.startsWith('contenido/asignatura/')));
  } finally {
    assert.ok(resolve(temporary).startsWith(resolve(tmpdir()) + sep));
    await rm(temporary, { recursive: true, force: true });
  }
});

test('el parser del navegador lee las 2250 preguntas sin omitir filas ni alterar respuestas', async () => {
  const context = vm.createContext({ console, window: { addEventListener() {} } });
  const source = await readFile(join(root, 'src', 'quiz.js'), 'utf8');
  vm.runInContext(source + '\nglobalThis.parse = parseQuizCSV; globalThis.sortCatalog = sortQuizCatalog;', context);
  const catalog = await makeCatalog(join(root, 'contenido'));
  const quizzes = await scanQuestionnaires(join(root, 'contenido'), catalog);
  const sorted = context.sortCatalog([...quizzes].reverse());
  const sew = sorted.filter(q => q.subject === 'software-estandares-web');
  assert.ok(sew[0].unitId.endsWith('diseno-con-estandares'));
  assert.deepEqual(sew.slice(0, 3).map(q => q.difficulty), ['facil', 'medio', 'dificil']);
  for (const quiz of quizzes.filter(q => q.difficulty)) {
    const text = await readFile(join(root, quiz.path), 'utf8');
    const browser = context.parse(text, quiz.filename);
    const rows = readQuizCsv(text).rows.slice(1);
    assert.equal(browser.questions.length, 50, quiz.path);
    for (const [i, question] of browser.questions.entries()) {
      assert.equal(question.question, rows[i][0]);
      assert.equal(question.correctIndices.length, 1);
      assert.equal(question.correctIndices[0], Number(rows[i][1]) - 1);
      assert.equal(question.options.length, rows[i].slice(4).filter(Boolean).length);
      assert.equal(question.reference, rows[i][3]);
    }
  }
});
